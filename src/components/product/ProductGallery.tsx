"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify/types";

interface Props {
  images: ShopifyImage[];
  title: string;
}

export function ProductGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-eufy-gray rounded-2xl flex items-center justify-center">
        <span className="text-eufy-text-light text-sm">No image available</span>
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-eufy-gray rounded-2xl overflow-hidden">
        <Image
          src={active.url}
          alt={active.altText || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
          priority={activeIndex === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-eufy-blue"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${title} view ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
