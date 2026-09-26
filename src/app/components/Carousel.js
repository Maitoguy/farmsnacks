"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const carouselImages = [
  "/carousel/banner-1.png",
  "/carousel/banner-2.png",
  "/carousel/banner-3.png",
  "/carousel/banner-4.png",
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25 },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  
  const [selectedIndex, setSelectedIndex] = useState(0);

 
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); 
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

 
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      emblaApi.plugins()?.autoplay?.reset();
    },
    [emblaApi]
  );

  return (
    <div className="relative group w-full max-w-6xl mx-auto my-6">
      {/* Embla Viewport */}
      <div
        className="overflow-hidden rounded-xl border border-outline-variant shadow-hard"
        ref={emblaRef}
      >
        {/* Embla Container */}
        <div className="flex">
          {carouselImages.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-64 md:h-96"
            >
              <Image
                src={src}
                alt={`Farm Snacks Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left (<) Button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black font-bold shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
      >
        &#10094;
      </button>

      {/* Right (>) Button */}
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black font-bold shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
      >
        &#10095;
      </button>

      {/* Clickable Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
        {carouselImages.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-7 bg-white shadow-sm"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}