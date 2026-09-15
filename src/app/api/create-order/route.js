import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { products } from '../../../../public/data'; 

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const { cartItems } = await req.json();

        // 1. Securely recalculate the total on the server
        let subtotal = 0;
        cartItems.forEach((cartItem) => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) subtotal += (product.price * cartItem.count);
        });

        // 2. Add shipping and convert to paise (Razorpay expects smallest currency unit)
        const shippingFee = 10;
        const totalAmountInRupees = subtotal + shippingFee;
        const amountInPaise = Math.round(totalAmountInRupees * 100);

        // 3. Create the order in Razorpay
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