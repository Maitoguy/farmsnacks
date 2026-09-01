"use client"

import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useState } from "react";
import { useCartStore } from "@/store/userCart";

export default function ProductCard({ product }) {
    const [count, setCount] = useState(0);

    // Bring in the store action
    const addToCart = useCartStore((state) => state.addToCart);

    const operation = (action) => {
        if(action === 'add'){
            setCount(count + 1);
            addToCart(product, product.svg_icon);
        } else if(action === 'remove'){
            setCount(Math.max(0, count - 1));
        }
    }

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col shadow-sm hover:shadow-hard transition-all duration-300 overflow-hidden group">
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-surface-container/50 border-b border-outline-variant overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.product_name}
                    fill
                    className="object-contain p-4 drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-bold text-xs z-10 shadow-sm">
                    {product.quantity}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col grow">
                <h3 className="font-bold text-primary text-xl mb-1">
                    {product.product_name}
                </h3>

                <p className="text-sm text-on-surface-variant mb-4 grow">
                    {product.description_card || "Delicious farm fresh snack."}
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-dim">
                    <span className="font-bold text-on-surface text-lg">
                        ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center bg-surface-container border border-outline-variant rounded-md">
                        <button
                            onClick={() => operation('remove')}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-l-md">
                            <Minus size={18} strokeWidth={2.5} />
                        </button>
                        <span className="w-8 text-center font-bold text-on-surface text-sm">
                            {count}
                        </span>
                        <button
                            onClick={() => operation('add')}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-r-md">
                            <Plus size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}