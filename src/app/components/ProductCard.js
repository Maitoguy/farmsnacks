"use client"

import Image from 'next/image';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from "@/store/userCart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BUNDLE_SIZE } from "../../../public/data";

const cloudinaryLoader = ({ src, width, quality }) => {
    if (!src.includes('res.cloudinary.com')) return src;
    
    const params = `w_${width},f_auto,q_${quality || 'auto'}`;
    return src.replace('/image/upload/', `/image/upload/${params}/`);
};

export default function ProductCard({ product }) {
    const cartItems = useCartStore((state) => state.cartItems);
    const addToCart = useCartStore((state) => state.addToCart);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const [isMounted, setIsMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const basePath = "/product-image";

    const isAvailable = product.available !== false;

    const step = product.isBundle ? BUNDLE_SIZE : 1;
    const isBundle = step > 1;

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
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

    const currentImage = product.image[currentIndex];
    const imageSrc = currentImage.startsWith('http') 
        ? currentImage 
        : `${basePath}${currentImage}`;

    return (
        <div className={`bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col shadow-sm ${isAvailable ? "" : "opacity-80"}`}>

            <div className="relative w-full aspect-square bg-surface-container/50 border-b border-outline-variant overflow-hidden group">
                
                <div className="absolute inset-0 opacity-0 pointer-events-none -z-10">
                    {product.image.map((img, idx) => {
                        if (idx === currentIndex) return null;
                        const preloadSrc = img.startsWith('http') ? img : `${basePath}${img}`;
                        return (
                            <Image 
                                key={idx}
                                loader={cloudinaryLoader}
                                src={preloadSrc} 
                                alt="preload"
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        );
                    })}
                </div>

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
                        className={`absolute inset-0 ${isAvailable ? "" : "grayscale"}`}
                    >
                        <Image 
                            loader={cloudinaryLoader}
                            src={imageSrc} 
                            alt={product.product_name} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                {!isAvailable && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <span className="bg-red-600 text-white text-xs md:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-md shadow-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col grow">
                <h3 className={`font-bold text-xl mb-1 ${isAvailable ? "text-primary" : "text-on-surface-variant"}`}>
                    {product.product_name}
                </h3>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-dim">
                    <span className={`font-bold text-lg ${isAvailable ? "text-on-surface" : "text-on-surface-variant"}`}>
                        ₹{product.price.toFixed(2)}
                        {isBundle && (
                            <span className="text-xs font-medium text-on-surface-variant">
                                {" "}/ {step} pcs
                            </span>
                        )}
                    </span>

                    <div className="flex items-center bg-surface-container border border-outline-variant rounded-md">
                        <button
                            onClick={() => { if(count > 0 && isAvailable) decrementItem(product.id) }}
                            disabled={!isAvailable}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-l-md disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none">
                            <Minus size={18} strokeWidth={2.5} />
                        </button>

                        <span className="w-8 text-center font-bold text-on-surface text-sm">
                            {count}
                        </span>

                        <button
                            onClick={() => { if (isAvailable) addToCart(product) }}
                            disabled={!isAvailable}
                            className="p-2 text-primary hover:bg-primary hover:text-on-primary hover:cursor-pointer transition-colors rounded-r-md disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none">
                            <Plus size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}