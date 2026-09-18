import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { products } from '../../../../public/data'; 

export async function POST(req) {
    try {
       
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { cartItems } = await req.json();

        let subtotal = 0;
        cartItems.forEach((cartItem) => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) subtotal += (product.price * cartItem.count);
        });

        const shippingFee = 10;
        const totalAmountInRupees = subtotal + shippingFee;
        const amountInPaise = Math.round(totalAmountInRupees * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return NextResponse.json({ orderId: order.id, amount: amountInPaise });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}