"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";


const carouselImages = [
  "/carousel/banner-1.png",
  "/carousel/banner-2.png",
  "/carousel/banner-3.png",
  "/carousel/banner-4.png"
];

export default function HeroCarousel() {

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 8000, stopOnInteraction: false })]
  );

  return (
    <div className="w-full max-w-6xl mx-auto my-6 overflow-hidden rounded-xl border border-outline-variant shadow-hard" ref={emblaRef}>
     
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
  );
}