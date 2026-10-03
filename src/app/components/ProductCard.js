"use client"

import Image from 'next/image';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from "@/store/userCart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }) {
    const cartItems = useCartStore((state) => state.cartItems);
    const addToCart = useCartStore((state) => state.addToCart);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const [isMounted, setIsMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const basePath = "/product-image";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartItem = cartItems.find((item) => item.id === product.id);
    const count = isMounted && cartItem ? cartItem.count : 0;

    const nextImage = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % product.image.length);
    };

    const prevImage = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            z: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            z: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col shadow-sm">

            <div className="relative w-full aspect-square bg-surface-container/50 border-b border-outline-variant overflow-hidden group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0"
                    >
                        <Image src={`${basePath}${product.image[currentIndex]}`} 
                            alt={product.product_name} 
                            fill 
                            className="object-contain p-4" 
                        />
                    </motion.div>
                </AnimatePresence>

                {product.image.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </>
                )}
            </div>

            <div className="p-5 flex flex-col grow">
                <h3 className="font-bold text-primary text-xl mb-1">{product.product_name}</h3>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-dim">
                    <span className="font-bold text-on-surface text-lg">
                        ₹{product.price.toFixed(2)}
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