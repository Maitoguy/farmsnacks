import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { products } from '../../../../public/data';
import nodemailer from 'nodemailer';

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
                count: item.count
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
        
        // 5. Generate Email HTML (Using Inline CSS for Gmail Compatibility)
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmed</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F0F2F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1d1c16; -webkit-font-smoothing: antialiased;">
          
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 20px;">
            <tr>
              <td align="center">
                
                <!-- Main Container -->
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e7e2d9; overflow: hidden;">
                  
                  <!-- Header Section -->
                  <tr>
                    <td align="center" style="background-color: #f8f3ea; padding: 30px; border-bottom: 1px solid #e7e2d9;">
                      <div style="background-color: #0d631b; color: #ffffff; width: 48px; height: 48px; line-height: 48px; border-radius: 50%; font-size: 24px; font-weight: bold; margin-bottom: 15px; margin-left: auto; margin-right: auto; text-align: center;">✓</div>
                      <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #1d1c16;">Thank you, ${shippingDetails.firstName}!</h2>
                      <p style="margin: 0; color: #40493d; font-size: 14px; line-height: 1.5;">We've received your payment and our orchard packhouse is preparing your crunchy snacks.</p>
                    </td>
                  </tr>

                  <!-- Order Items Section -->
                  <tr>
                    <td style="padding: 30px;">
                      
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                        <tr>
                          <td><strong style="font-size: 18px; color: #1d1c16;">Your Crispy Box</strong></td>
                          <td align="right"><span style="color: #707a6c; font-size: 13px;">${enrichedItems.length} Snack Packs</span></td>
                        </tr>
                      </table>

                      <!-- Items Loop -->
                      ${enrichedItems.map(item => `
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f3ea; border-radius: 8px; margin-bottom: 10px; border: 1px solid #e7e2d9;">
                        <tr>
                          <td style="padding: 15px;">
                            <div style="font-weight: bold; font-size: 15px; color: #1d1c16; margin-bottom: 4px;">${item.product_name}</div>
                            <div style="color: #FF8A00; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Qty: ${item.count}</div>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td><span style="font-weight: bold; font-size: 15px; color: #1d1c16;">₹${(item.price * item.count).toFixed(2)}</span></td>
                                <td align="right"><span style="color: #707a6c; font-size: 12px;">₹${item.price.toFixed(2)} each</span></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      `).join('')}
                      
                      <!-- Split Layout: Breakdown & Address -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px; border-top: 1px solid #e7e2d9; padding-top: 20px;">
                        <tr>
                          
                          <!-- Payment Breakdown -->
                          <td width="48%" valign="top">
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e7e2d9; min-height: 120px;">
                              <div style="font-size: 11px; font-weight: bold; color: #707a6c; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Breakdown</div>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 8px; font-size: 13px; color: #40493d;">
                                <tr>
                                  <td>Subtotal</td>
                                  <td align="right">₹${orderRecord.pricing.subtotal.toFixed(2)}</td>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px; font-size: 13px; color: #40493d;">
                                <tr>
                                  <td>Shipping</td>
                                  <td align="right" style="color: #0d631b; font-weight: bold;">₹${orderRecord.pricing.shippingFee.toFixed(2)}</td>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e7e2d9; padding-top: 10px;">
                                <tr>
                                  <td><strong style="font-size: 14px; color: #1d1c16;">Total Paid</strong></td>
                                  <td align="right"><strong style="font-size: 16px; color: #0d631b;">₹${orderRecord.pricing.totalAmount.toFixed(2)}</strong></td>
                                </tr>
                              </table>
                            </div>
                          </td>
                          
                          <td width="4%"></td> <!-- Spacer -->
                          
                          <!-- Shipping Address -->
                          <td width="48%" valign="top">
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e7e2d9; min-height: 120px;">
                              <div style="font-size: 11px; font-weight: bold; color: #FF8A00; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">📍 Shipping Address</div>
                              <div style="font-size: 13px; color: #40493d; line-height: 1.6;">
                                <strong style="color: #1d1c16; font-size: 14px;">${shippingDetails.firstName} ${shippingDetails.lastName}</strong><br/>
                                ${shippingDetails.flat}, ${shippingDetails.area}<br/>
                                ${shippingDetails.landmark}<br/>
                                ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}
                              </div>
                            </div>
                          </td>

                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>
                
              </td>
            </tr>
          </table>
        </body>
        </html>
        `;

        // 6. Send Email via Nodemailer
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
                subject: `Payment Confirmed, ${shippingDetails.firstName}! Your Farm Snacks order is on its way`,
                html: emailHtml
            });

            console.log("✅ Confirmation email sent to:", shippingDetails.email);
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