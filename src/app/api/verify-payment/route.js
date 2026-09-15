import { NextResponse } from 'next/server';
import crypto from 'crypto';
// import { db } from '@/lib/firebaseAdmin'; 

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

        // 2. Payment is legitimate! Save to Firebase
        const orderRecord = {
            customer: shippingDetails,
            items: cartItems,
            paymentDetails: {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: 'PAID'
            },
            createdAt: new Date().toISOString()
        };

        console.log(orderRecord);

        // await db.collection('orders').add(orderRecord);

        return NextResponse.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
    }
}