import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { products } from '../../../../public/data';

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

        // 1. Verify the cryptographic signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 2. Match cart items with public/data.js to record names & verified total
        let subtotal = 0;
        const enrichedItems = cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            const itemPrice = product ? product.price : 0;
            subtotal += itemPrice * item.count;

            return {
                id: item.id,
                product_name: product ? product.product_name : 'Unknown Product',
                price: itemPrice,
                count: item.count,
            };
        });

        const shippingFee = 10;
        const totalAmount = Number((subtotal + shippingFee).toFixed(2));

        // 3. Payment is legitimate! Prepare order record for Firestore
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
            createdAt: serverTimestamp(),
        };

        // 4. Save to Firestore 'orders' collection
        const docRef = await addDoc(collection(db, 'orders'), orderRecord);
        console.log("✅ Order saved to Firestore with ID:", docRef.id);
        
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