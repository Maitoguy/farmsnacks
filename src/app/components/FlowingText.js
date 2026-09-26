"use client";

import { motion } from "framer-motion";
import { flowingText } from "../../../public/animation";

export default function FlowingText() {
  
  const content = (
    <div className="flex shrink-0 items-center">
      {flowingText.map((text, i) => (
        <div key={i} className="flex items-center">
          <span className="mx-8 text-lg md:text-xl font-bold whitespace-nowrap tracking-wide">
            {text}
          </span>
          <span className="text-2xl leading-none select-none">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Highlights"
      className="w-full overflow-hidden bg-primary-container text-on-primary-container border-y border-outline-variant py-4"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 800,        
          ease: "linear",     
          repeat: Infinity,
        }}
      >
        {content}
        {content}
      </motion.div>
    </section>
  );
}