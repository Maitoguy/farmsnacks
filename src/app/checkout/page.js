"use client"

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/userCart";
import { products } from "../../../public/data"; // Adjust path if needed
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const cartItems = useCartStore((state) => state.cartItems);
    const [isMounted, setIsMounted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '', middleName: '', lastName: '',
        email: '', phone: '', state: '', city: '', pincode: '', address: ''
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isMounted) return null;

    // Calculate pricing
    const populatedCart = cartItems.map((cartItem) => {
        const fullProduct = products.find((p) => p.id === cartItem.id);
        return { ...fullProduct, count: cartItem.count };
    }).filter(item => item.id);

    const subtotal = populatedCart.reduce((total, item) => total + (item.price * item.count), 0);
    const shippingFee = 10;
    const finalTotal = subtotal + shippingFee;

    // Razorpay Script Loader
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Main Payment Handler
    const handlePayment = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you connected to the internet?');
            return;
        }

        // Step A: Ask backend to create an order
        const orderResponse = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: populatedCart })
        });
        
        if (!orderResponse.ok) {
            alert("Failed to initialize order. Please try again.");
            return;
        }
        
        const orderData = await orderResponse.json();

        // Step B: Open Razorpay Modal
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
            amount: orderData.amount,
            currency: "INR",
            name: "Farm Snacks",
            description: "Delicious farm fresh snacks",
            order_id: orderData.orderId,
            handler: async function (response) {
                
                // Step C: Send success details to backend for verification and Firebase storage
                const verificationResponse = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        shippingDetails: formData,
                        cartItems: populatedCart
                    })
                });

                const verifyData = await verificationResponse.json();
                if (verifyData.success) {
                    alert("Payment Successful! Order placed.");
                    // You can clear the cart and redirect here later
                } else {
                    alert("Payment verification failed. Please contact support.");
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                contact: formData.phone
            },
            theme: { color: "#9a4600" } // Farm Snacks primary color
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    // Empty Cart UI
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
            {/* The entire layout is wrapped in the form tag so the submit button works */}
            <form onSubmit={handlePayment} className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                
                {/* Left Side: Shipping Form */}
                <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-hard p-6 md:p-8">
                    <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-6">
                        <Truck size={28} className="text-primary" />
                        <h1 className="text-2xl font-bold text-primary">Shipping Details</h1>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Middle Name</label>
                                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Location Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-on-surface-variant">Pincode</label>
                                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" required />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-on-surface-variant">Full Address</label>
                            <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" className="p-3 bg-surface-container border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" required></textarea>
                        </div>
                    </div>
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

                        {/* Setting type="submit" will trigger the form's onSubmit handler */}
                        <button type="submit" className="w-full bg-primary text-on-primary font-bold py-4 rounded-md shadow-hard hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <CreditCard size={20} />
                            Pay ₹{finalTotal.toFixed(2)} Now
                        </button>
                    </div>

                    <Link href="/" className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-medium">
                        <ArrowLeft size={18} />
                        Back to Store
                    </Link>
                </div>
            </form>
        </main>
    );
}