"use client"

import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from "@/store/userCart";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
    const cartItems = useCartStore((state) => state.cartItems);
    const addToCart = useCartStore((state) => state.addToCart);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartItem = cartItems.find((item) => item.id === product.id);
    const count = isMounted && cartItem ? cartItem.count : 0;

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col shadow-sm">

            <div className="relative w-full aspect-square bg-surface-container/50 border-b border-outline-variant overflow-hidden">
                <Image src={product.image} alt={product.product_name} fill className="object-contain p-4" />
            </div>

            <div className="p-5 flex flex-col grow">
                <h3 className="font-bold text-primary text-xl mb-1">{product.product_name}</h3>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-dim">
                    <span className="font-bold text-on-surface text-lg">
                        ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center bg-surface-container border border-outline-variant rounded-md">
                        <button
                            onClick={() => { if(count > 0) decrementItem(product.id) }}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-l-md">
                            <Minus size={18} strokeWidth={2.5} />
                        </button>

                        <span className="w-8 text-center font-bold text-on-surface text-sm">
                            {count}
                        </span>

                        <button
                            // Simplified: Only passing the product object
                            onClick={() => addToCart(product)}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-r-md">
                            <Plus size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}