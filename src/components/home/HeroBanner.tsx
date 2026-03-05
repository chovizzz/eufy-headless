"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroSlide {
  id: string;
  badge?: string;
  heading: string;
  subheading: string;
  description?: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "c28",
    badge: "NEW",
    heading: "Self-Cleaning Roller. Mess Washed Away.",
    subheading: "eufy Robot Vacuum Omni C28",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=800&fit=crop",
    primaryCta: { label: "Learn More", href: "/products/robot-vacuum-c28" },
    secondaryCta: { label: "Shop Now", href: "/products/robot-vacuum-c28" },
  },
  {
    id: "nvr",
    heading: "eufy NVR Security System S4 Max",
    subheading: "The World's First NVR Security System with Local AI Agent",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1920&h=800&fit=crop",
    primaryCta: { label: "Learn More", href: "/products/nvr-s4-max" },
    secondaryCta: { label: "Shop Now", href: "/products/nvr-s4-max" },
  },
  {
    id: "bottle",
    badge: "NEW",
    heading: "eufy Bottle Washer S1 Pro",
    subheading: "World's first TUV-certified bottle washer. Spotless from every angle.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&h=800&fit=crop",
    primaryCta: { label: "Learn More", href: "/products/bottle-washer-s1-pro" },
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-eufy-dark">
      {/* Background Images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.heading}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl text-white">
          {slide.badge && (
            <span className="inline-block bg-eufy-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              {slide.badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
            {slide.heading}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
            {slide.subheading}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.primaryCta.href}
              className="inline-flex items-center px-8 py-3.5 bg-white text-eufy-dark font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              {slide.primaryCta.label}
            </Link>
            {slide.secondaryCta && (
              <Link
                href={slide.secondaryCta.href}
                className="inline-flex items-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                {slide.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
