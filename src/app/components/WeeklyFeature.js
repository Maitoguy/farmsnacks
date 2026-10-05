"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Clock, Utensils, Zap, Play, Pause, Volume2, Maximize } from "lucide-react";

export default function WeeklyFeature({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-citrus-orange text-paper-white font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A]">
          Weekly Feature
        </span>
        <h2 className="text-3xl font-bold text-on-background">Recipe Spotlight</h2>
      </div>

      <div className="w-full bg-surface-container rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left: Interactive Video Player */}
        <div className="w-full lg:w-5/12 flex flex-col items-center">
          <div className="relative w-full max-w-sm aspect-9/16 rounded-xl overflow-hidden bg-deep-forest shadow-[4px_4px_0px_0px_#1A1A1A] flex flex-col justify-between p-4 group">
            <Image 
              src={data.videoPoster}
              alt="Recipe Video"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-deep-forest/90 via-transparent to-deep-forest/40 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-paper-white/90 text-on-surface font-bold text-xs uppercase tracking-wider shadow-sm">
                HD Snack Cam
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-citrus-orange animate-pulse"></span>
                <span className="text-xs text-paper-white font-bold uppercase">Featured</span>
              </div>
            </div>

            <div className="relative z-10 self-center my-auto">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[3px_3px_0px_0px_#1A1A1A] active:scale-90 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
            </div>

            <div className="relative z-10 flex flex-col gap-2 bg-deep-forest/60 backdrop-blur-md p-3 rounded-lg text-paper-white">
              <div className="w-full bg-paper-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-citrus-orange h-full rounded-full transition-all duration-300" style={{ width: isPlaying ? '60%' : '10%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Play size={16} className="cursor-pointer hover:text-citrus-orange" />
                  <Volume2 size={16} className="cursor-pointer hover:text-citrus-orange" />
                  <span>0:14 / 0:35</span>
                </div>
                <Maximize size={16} className="cursor-pointer hover:text-citrus-orange" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recipe Breakdown */}
        <div className="w-full lg:w-7/12 flex flex-col justify-start gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs uppercase tracking-wider">
                  Yogurt Crunch Layer
                </span>
                <div className="flex items-center text-citrus-orange text-xs">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="ml-1 text-on-surface-variant font-bold">({data.reviews} reviews)</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-on-surface">{data.title}</h3>
              <p className="text-base text-on-surface-variant">{data.description}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-surface-container-high rounded-xl">
              <div className="flex flex-col items-center text-center">
                <Clock className="text-primary mb-1" size={24} />
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Prep Time</span>
                <span className="font-bold text-base text-on-surface">{data.metrics.prepTime}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Utensils className="text-primary mb-1" size={24} />
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Servings</span>
                <span className="font-bold text-base text-on-surface">{data.metrics.servings}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="text-citrus-orange mb-1" size={24} fill="currentColor" />
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Crunch Factor</span>
                <span className="font-bold text-base text-citrus-orange">{data.metrics.crunchFactor}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-bold text-lg text-on-surface">Ingredients Required:</span>
              <div className="flex flex-col gap-2.5">
                {data.ingredients.map((ing, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group select-none">
                    <input defaultChecked type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-0 cursor-pointer border-deep-forest" />
                    <span className="text-base text-on-surface group-hover:text-primary transition-colors">
                      <strong>{ing.qty}</strong> {ing.item}
                    </span>
                    {ing.inStock && (
                      <span className="ml-auto text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">In Stock</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-bold text-lg text-on-surface">Crunch Steps:</span>
              <ol className="flex flex-col gap-3 text-base text-on-surface-variant list-none mt-1">
                {data.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}