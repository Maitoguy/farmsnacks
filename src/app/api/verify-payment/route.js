import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { products } from '../../../../public/data';
import nodemailer from 'nodemailer';

// 1. Initialize Firebase Admin (This bypasses the 'if false' security rules)
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}
const db = getFirestore();

export async function POST(req) {
    try {
        const body = await req.json();
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature, 
            shippingDetails, 
            cartItems 
        } = body;

        // 2. Verify the cryptographic signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 3. Match cart items with public/data.js
        let subtotal = 0;
        const enrichedItems = cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            const itemPrice = product ? product.price : 0;
            subtotal += itemPrice * item.count;

            return {
                id: item.id,
                product_name: product ? product.product_name : 'Unknown Product',
                price: itemPrice,
                count: item.count
            };
        });

        const shippingFee = 10;
        const totalAmount = Number((subtotal + shippingFee).toFixed(2));

        // 4. Prepare order record
        const orderRecord = {
            customer: shippingDetails,
            items: enrichedItems,
            pricing: {
                subtotal: Number(subtotal.toFixed(2)),
                shippingFee,
                totalAmount,
                currency: 'INR',
            },
            paymentDetails: {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: 'PAID',
            },
            // Admin SDK uses a different timestamp method
            createdAt: FieldValue.serverTimestamp(),
        };

        // 5. Save to Firestore using Admin SDK syntax
        const docRef = await db.collection('orders').add(orderRecord);
        console.log("✅ Order saved to Firestore with ID:", docRef.id);
        
        // 6. Generate Email HTML
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Confirmed</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: sans-serif;">
          <h2>Thank you, ${shippingDetails.firstName}!</h2>
          <p>We've received your payment of ₹${orderRecord.pricing.totalAmount.toFixed(2)}.</p>
          <p>Your order ID is: ${docRef.id}</p>
        </body>
        </html>
        `;

        // 7. Send Email via Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASSWORD
                }
            });

            await transporter.sendMail({
                from: `"Farm Snacks" <${process.env.EMAIL_USER}>`,
                to: shippingDetails.email,
                subject: `Payment Confirmed, ${shippingDetails.firstName}!`,
                html: emailHtml
            });
            console.log("✅ Confirmation email sent");
        } catch (emailError) {
            console.error("🚨 NODEMAILER ERROR:", emailError);
        }

        return NextResponse.json({ 
            success: true, 
            orderId: docRef.id,
            message: 'Order placed successfully' 
        });
    } catch (error) {
        console.error("🚨 RAZORPAY CRASH DETECTED:", error);
        return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
    }
}