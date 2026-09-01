"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/userCart"; // Adjust path if needed

export function DroppingFruit() {
    // Get Data from Zustand
    const fallingFruits = useCartStore((state) => state.fallingFruits);

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <AnimatePresence>
                {fallingFruits.map((fruit) => (
                    <SingleFruit key={fruit.id} image={fruit.svg} />
                ))}
            </AnimatePresence>

            <div className="absolute bottom-6 right-6 z-10 text-7xl">🧺</div>
        </div>
    )
}

function SingleFruit({ image }) {
    return (
        <motion.div
            className="absolute right-12 z-0 w-16 h-16 flex items-center justify-center"
            initial={{ top: "-10vh", opacity: 1, scale: 1 }}
            animate={{
                top: ["-10vh", "85vh", "88vh"],
                opacity: [1, 1, 0],
                scale: [1, 1, 0.2]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, times: [0, 0.7, 1], ease: ["easeIn", "easeOut"] }}
        >
            <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: image }}
            />
        </motion.div>
    );
}