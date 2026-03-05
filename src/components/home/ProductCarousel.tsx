"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

export function ProductCarousel({ title, subtitle, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-eufy-text-light text-lg">{subtitle}</p>
          )}
        </div>
        <div className="hidden sm:flex space-x-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-2.5 rounded-full border border-gray-200 hover:bg-eufy-gray transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-2.5 rounded-full border border-gray-200 hover:bg-eufy-gray transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
      >
        {products.map((product) => {
          const price = product.priceRange.minVariantPrice;
          const compareAt = product.variants.edges[0]?.node?.compareAtPrice;
          const image = product.featuredImage;

          return (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group shrink-0 w-[280px] snap-start"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-eufy-gray mb-4">
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="280px"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {compareAt && Number(compareAt.amount) > Number(price.amount) && (
                  <span className="absolute top-3 left-3 bg-eufy-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-eufy-dark group-hover:text-eufy-blue transition-colors line-clamp-2">
                {product.title}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-bold text-eufy-dark">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                {compareAt && Number(compareAt.amount) > Number(price.amount) && (
                  <span className="text-sm text-eufy-text-light line-through">
                    {formatPrice(compareAt.amount, compareAt.currencyCode)}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
