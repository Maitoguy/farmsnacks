"use client";

import React, { useRef, useState } from "react";

import { snackShorts , weeklyFeature } from "../../../public/snackShorts";
import WeeklyFeature from "../components/WeeklyFeature";
import { PlayCircle, ArrowLeft, ArrowRight, Play, Share2, AudioLines } from "lucide-react";

// Sub-component to handle individual video play/pause states
const ShortCard = ({ short }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevents click from bubbling up
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="snap-start shrink-0 w-70 sm:w-[320px] flex flex-col gap-3 group">
      
      {/* Video Area */}
      <div 
        className="relative rounded-xl overflow-hidden aspect-9/16 shadow-[4px_4px_0px_0px_#1A1A1A] hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-inverse-surface"
        onClick={togglePlay}
      >
        {/* Render HTML5 Video instead of Next.js Image */}
        <video 
          ref={videoRef}
          src={short.bgImage} /* Uses the URL you pasted in your data file */
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-deep-forest/60 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Play Button Overlay (Hides when video is playing) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest/30 backdrop-blur-md flex items-center justify-center text-paper-white group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-md">
              <Play size={32} fill="currentColor" className="ml-1" />
            </div>
          </div>
        )}

        {/* Share Button (stopPropagation ensures clicking share doesn't pause the video) */}
        <div className="absolute right-3 bottom-4 z-10 flex flex-col items-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Add share logic here
            }} 
            className="flex flex-col items-center text-paper-white group/btn cursor-pointer"
          >
            <span className="w-9 h-9 rounded-full bg-deep-forest/50 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-secondary-container group-hover/btn:text-deep-forest transition-colors">
              <Share2 size={18} />
            </span>
            <span className="font-bold text-[10px] mt-0.5 drop-shadow">Share</span>
          </button>
        </div>
      </div>

      {/* Text Grouped Below Video */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${short.accentColor}`}>
            Uses {short.productUsed}
          </span>
          <span className="text-[10px] text-on-surface-variant font-bold">
            {short.meta ? short.meta : ""}{short.time}
          </span>
        </div>
        <h3 className="font-bold text-lg text-on-surface line-clamp-2 leading-snug">
          {short.title}
        </h3>
        {short.audio && (
          <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] truncate">
            <AudioLines size={12} />
            <span className="truncate">{short.audio}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default function RecipesPage() {
  const reelRef = useRef(null);

  const scrollReel = (direction) => {
    if (reelRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      reelRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <main className="grow flex flex-col items-center pt-8 pb-16 px-4 md:px-16 gap-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col w-full gap-16">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center text-center relative w-full pt-4">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-bold text-xs shadow-[2px_2px_0px_0px_#1A1A1A]">🌱 100% Plant-Based</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs shadow-[2px_2px_0px_0px_#1A1A1A]">✨ No Refined Sugar</span>
          </div>
          
          <div className="relative max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-bold text-on-background tracking-tight">
              Crunch in the <span className="text-primary relative inline-block">Kitchen
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary-container -z-10" preserveAspectRatio="none" viewBox="0 0 100 12">
                  <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="8"></path>
                </svg>
              </span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mt-4">
              Quick 30-second bites, creative snacks, and nourishing bowl toppers made with 100% freeze-dried farm fruit.
            </p>
          </div>
        </section>

        {/* --- SNACK SHORTS REELS FEED --- */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-xs text-citrus-orange uppercase tracking-widest">Feed the Feed</span>
              <h2 className="text-3xl font-bold text-on-background flex items-center gap-2">
                <span>Snack Shorts</span>
                <PlayCircle className="text-primary" fill="currentColor" size={28} />
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => scrollReel("left")} className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:scale-95 cursor-pointer">
                <ArrowLeft size={20} />
              </button>
              <button onClick={() => scrollReel("right")} className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:scale-95 cursor-pointer">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Reel Container */}
          <div ref={reelRef} className="flex gap-6 w-full overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {snackShorts.map((short) => (
              <ShortCard key={short.id} short={short} />
            ))}
          </div>
        </section>

        {/* --- WEEKLY FEATURE COMPONENT --- */}
        <WeeklyFeature data={weeklyFeature} />

      </div>
    </main>
  );
}