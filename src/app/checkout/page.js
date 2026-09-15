"use client"

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/userCart";
import { products } from "../../../public/data"; // Adjust path if needed
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const cartItems = useCartStore((state) => state.cartItems);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Calculate pricing
    const populatedCart = cartItems.map((cartItem) => {
        const fullProduct = products.find((p) => p.id === cartItem.id);
        return { ...fullProduct, count: cartItem.count };
    }).filter(item => item.id);

    const subtotal = populatedCart.reduce((total, item) => total + (item.price * item.count), 0);
    const shippingFee = 10;
    const finalTotal = subtotal + shippingFee;

    // If the cart is empty, show a message instead of the form
    if (populatedCart.length === 0) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-on-background">
                <h1 className="text-2xl font-bold text-primary mb-4">Your basket is empty!</h1>
                <Link href="/" className="bg-primary text-on-primary font-bold py-3 px-6 rounded-md shadow-hard hover:bg-surface-tint transition-colors">
                    Return to Store
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-on-background p-6 md:p-12">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Left Side: Shipping Form */}
                <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-hard p-6 md:p-8">
                    <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-6">
                        <Truck size={28} className="text-primary" />
                        <h1 className="text-2xl font-bold text-primary">Shipping Details</h1>
                    </div>

                    <form className="flex flex-col gap-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">First Name</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Middle Name</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Last Name</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Email</label>
                                <input type="email" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Phone Number</label>
                                <input type="tel" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Location Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">State</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">City</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Pincode</label>
                                <input type="text" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-on-surface-variant">Full Address</label>
                            <textarea rows="3" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" required></textarea>
                        </div>
                    </form>
                </div>

                {/* Right Side: Order Summary & Payment */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-hard p-6">
                        <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-4">
                            <ShieldCheck size={24} className="text-primary" />
                            <h2 className="text-xl font-bold text-primary">Order Summary</h2>
                        </div>

                        <div className="flex flex-col gap-3 mb-6 max-h-60 overflow-y-auto pr-2">
                            {populatedCart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-on-surface-variant">{item.count}x {item.product_name}</span>
                                    <span className="font-bold text-on-surface">₹{(item.price * item.count).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 border-t border-outline-variant pt-4 mb-6">
                            <div className="flex justify-between items-center text-on-surface-variant">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-on-surface-variant">
                                <span>Shipping</span>
                                <span>₹{shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold text-primary mt-2 pt-2 border-t border-outline-variant">
                                <span>Total to Pay</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-on-primary font-bold py-4 rounded-md shadow-hard hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <CreditCard size={20} />
                            Pay ₹{finalTotal.toFixed(2)} Now
                        </button>
                    </div>

                    <Link href="/" className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-medium">
                        <ArrowLeft size={18} />
                        Back to Store
                    </Link>
                </div>

            </div>
        </main>
    );
}