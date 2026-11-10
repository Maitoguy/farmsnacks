"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/userCart";
import { useSyncExternalStore } from "react";

// Hydration-safe "is this the client?" — no setState in effect, no extra render.
const emptySubscribe = () => () => {};
const useIsClient = () =>
    useSyncExternalStore(
        emptySubscribe,
        () => true,   // client snapshot
        () => false   // server snapshot (used during hydration)
    );

export function DroppingFruit() {
    const fallingFruits = useCartStore((state) => state.fallingFruits);
    const toggleCheckout = useCartStore((state) => state.toggleCheckout);
    const cartItems = useCartStore((state) => state.cartItems);

    const isMounted = useIsClient();

    const totalItems = isMounted
        ? cartItems.reduce((total, item) => total + item.count, 0)
        : 0;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <AnimatePresence>
                {fallingFruits.map((fruit) => (
                    <SingleFruit key={fruit.id} image={fruit.svg} />
                ))}
            </AnimatePresence>

            <button
                onClick={toggleCheckout}
                className="absolute bottom-6 right-8 z-10 text-7xl hover:scale-105 transition-transform cursor-pointer pointer-events-auto"
                aria-label="Open cart"
            >
                🧺
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-lg rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-hard">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>
    );
}

function SingleFruit({ image }) {
    const hasValidSvg =
        typeof image === "string" && image.trim().startsWith("<svg");

    const markup = hasValidSvg
        ? image
        : `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#F87171"/></svg>`;

    return (
        <motion.div
            className="absolute right-12 z-0 w-16 h-16 flex items-center justify-center overflow-hidden"
            initial={{ top: "-10vh", opacity: 1, scale: 1 }}
            animate={{
                top: ["-10vh", "85vh", "88vh"],
                opacity: [1, 1, 0],
                scale: [1, 1, 0.2],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
                duration: 2,
                times: [0, 0.7, 1],
                ease: ["easeIn", "easeOut"],
            }}
        >
            <div
                className="fruit-svg w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: markup }}
            />
        </motion.div>
    );
}