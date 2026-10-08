"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-on-background text-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <CheckCircle size={80} className="text-primary mb-6 mx-auto" />
            </motion.div>
            
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-4xl font-bold text-primary mb-4"
            >
                Payment Successful!
            </motion.h1>
            
            <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-xl text-on-surface-variant font-medium"
            >
                Thank you for your order.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8 flex flex-col items-center gap-3"
            >
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-on-surface-variant">Redirecting to home...</p>
            </motion.div>
        </main>
    );
}