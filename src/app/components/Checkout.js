"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/userCart";
import { useEffect, useState } from "react";
import { products } from "../../../public/data"; // Adjust path if needed
import { ShieldCheck, ShoppingCart, ArrowLeft, CreditCard, Receipt, X, Plus, Minus } from 'lucide-react';

export default function Checkout() {
    const isCheckoutOpen = useCartStore((state) => state.isCheckoutOpen);
    const toggleCheckout = useCartStore((state) => state.toggleCheckout);
    const cartItems = useCartStore((state) => state.cartItems);

    // Store Actions for quantity
    const addToCart = useCartStore((state) => state.addToCart);
    const decrementItem = useCartStore((state) => state.decrementItem);

    // Hydration fix
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (isCheckoutOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isCheckoutOpen]);

    if (!isMounted) return null;

    // Look up the full product details based on the saved IDs
    const populatedCart = cartItems.map((cartItem) => {
        const fullProduct = products.find((p) => p.id === cartItem.id);
        return { ...fullProduct, count: cartItem.count };
    }).filter(item => item.id);

    const totalPrice = populatedCart.reduce((total, item) => total + (item.price * item.count), 0);

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
                        onClick={toggleCheckout} // Closes when clicking background
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-surface-container-lowest border border-outline-variant shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="bg-primary text-on-primary p-6 flex justify-between items-center shadow-sm">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <ShieldCheck size={32} />
                                Your Basket
                            </h2>
                            <button onClick={toggleCheckout} className="hover:text-primary-fixed-dim transition-colors cursor-pointer">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4 bg-background">
                            {populatedCart.length === 0 ? (
                                <div className="text-center py-12 text-on-surface-variant flex flex-col items-center">
                                    <ShoppingCart size={48} className="mb-4 text-outline-variant" />
                                    <p>Your basket is empty.</p>
                                </div>
                            ) : (
                                populatedCart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-surface-container p-4 rounded-lg border border-outline-variant/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-surface-container-lowest rounded-md flex-shrink-0 p-2 overflow-hidden border border-outline-variant">
                                                <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-surface">{item.product_name}</h4>
                                                <p className="text-sm text-on-surface-variant">@ ${item.price.toFixed(2)} / ea</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="font-bold text-primary text-lg">
                                                ${(item.price * item.count).toFixed(2)}
                                            </div>
                                            <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm">
                                                <button
                                                    onClick={() => decrementItem(item.id)}
                                                    className="p-1.5 text-primary hover:bg-primary hover:text-on-primary transition-colors rounded-l-md cursor-pointer"
                                                >
                                                    <Minus size={16} strokeWidth={2.5} />
                                                </button>
                                                <span className="w-8 text-center font-bold text-on-surface text-sm">
                                                    {item.count}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="p-1.5 text-primary hover:bg-primary hover:text-on-primary transition-colors rounded-r-md cursor-pointer"
                                                >
                                                    <Plus size={16} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bg-surface p-6 border-t border-outline-variant">
                            <div className="flex justify-between items-center mb-6 text-xl font-bold text-on-surface">
                                <span className="flex items-center gap-2">
                                    <Receipt size={24} className="text-on-surface-variant" />
                                    Total:
                                </span>
                                <span className="text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={toggleCheckout}
                                    className="flex-1 bg-surface-container text-on-surface font-bold py-4 rounded-md border border-outline-variant hover:bg-surface-dim transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <ArrowLeft size={18} />
                                    Keep Shopping
                                </button>
                                <button
                                    disabled={populatedCart.length === 0}
                                    className="flex-1 bg-primary text-on-primary font-bold py-4 rounded-md shadow-hard hover:bg-surface-tint transition-colors disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <CreditCard size={20} />
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}