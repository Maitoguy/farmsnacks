"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Farm-to-Snack Palette for Confetti
const CONFETTI_COLORS = [
  "#ff7f1f", 
  "#9a4600",  
  "#ffdbc9", 
  "#9ca78b", 
  "#e5e4c9", 
];

// Pure, deterministic PRNG (mulberry32) — same seed always yields the same sequence
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PaymentSuccess() {
  // Generate confetti data once on mount so it doesn't re-randomize on re-renders
  const confettiPieces = useMemo(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 60 + (rand() - 0.5) * 0.5;
      const distance = 120 + rand() * 220;

      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + rand() * 60,
        rotation: Math.round(rand() * 720 - 360),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        width: 6 + rand() * 6,
        height: 6 + rand() * 10,
        borderRadius: i % 3 === 0 ? "50%" : "2px",
        delay: 0.4 + rand() * 0.2,
        duration: 1.4 + rand() * 0.8,
      };
    });
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Confetti Layer */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0.4, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{
              x: piece.x,
              y: piece.y,
              scale: 0.8,
              opacity: 0,
              rotate: piece.rotation,
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: [0.15, 0.75, 0.35, 1], // Custom cubic-bezier for a "burst" feel
            }}
            style={{
              position: "absolute",
              backgroundColor: piece.color,
              width: piece.width,
              height: piece.height,
              borderRadius: piece.borderRadius,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-150 w-full">
        
        {/* Checkmark & Ripples Wrapper */}
        <div className="relative w-35 h-35 mb-8 flex items-center justify-center drop-shadow-[0_10px_25px_rgba(76,175,80,0.15)]">
          
          {/* Ripple Rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-[#4caf50]"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Main Checkmark Circle */}
          <motion.div
            className="w-full h-full rounded-full bg-[#e8f5e9] border-2 border-[#c8e6c9] flex items-center justify-center relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <svg viewBox="0 0 24 24" className="w-17.5 h-17.5">
              <motion.path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="#4caf50"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-[#4caf50] tracking-tight mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
          className="text-[clamp(1rem,2.5vw,1.15rem)] text-[#64748b] leading-relaxed"
        >
          Thank you for placing your order on our website.
          <span className="block font-semibold text-primary mt-1">
            We truly appreciate your trust in us!
          </span>
        </motion.p>

      </div>
    </main>
  );
}