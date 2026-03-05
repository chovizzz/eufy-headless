"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/shopify/types";

const ICON_MAP: Record<string, string> = {
  "security": "🔐",
  "camera": "📷",
  "outdoor": "📷",
  "indoor": "📹",
  "robot": "🤖",
  "vacuum": "🤖",
  "lock": "🔒",
  "light": "💡",
  "mower": "🌿",
  "lawn": "🌿",
  "doorbell": "🔔",
  "homebase": "🏠",
  "baby": "👶",
  "monitor": "👶",
  "scale": "⚖️",
  "display": "📱",
  "tracker": "📍",
  "pump": "🍼",
};

function getIconForCollection(handle: string): string {
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (handle.includes(key)) return icon;
  }
  return "📦";
}

interface CategoryExplorerProps {
  collections?: Collection[];
}

const FALLBACK_CATEGORIES = [
  { title: "IP PoE Cameras", handle: "ip-poe-cameras" },
  { title: "Outdoor Cameras", handle: "outdoor-cameras" },
  { title: "Robot Vacuums", handle: "robot-vacuums" },
  { title: "Smart Locks", handle: "smart-locks" },
  { title: "Smart Lights", handle: "smart-lights" },
  { title: "Lawn Mowers", handle: "lawn-mowers" },
  { title: "Video Doorbells", handle: "video-doorbells" },
  { title: "HomeBase", handle: "homebase" },
  { title: "Indoor Cameras", handle: "indoor-cameras" },
  { title: "Baby Monitors", handle: "baby-monitors" },
  { title: "Smart Scales", handle: "smart-scales" },
  { title: "Smart Display", handle: "smart-display" },
];

export function CategoryExplorer({ collections }: CategoryExplorerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = collections && collections.length > 0
    ? collections.map((c) => ({ title: c.title, handle: c.handle, image: c.image }))
    : FALLBACK_CATEGORIES.map((c) => ({ title: c.title, handle: c.handle, image: null as Collection["image"] }));

  return (
    <section className="py-16 bg-eufy-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-8 text-center">
          Explore Top Choices by Category
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {categories.map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="group shrink-0 snap-start flex flex-col items-center gap-3 p-6 w-[140px] bg-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {cat.image ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={cat.image.url}
                    alt={cat.image.altText || cat.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <span className="text-3xl" role="img" aria-label={cat.title}>
                  {getIconForCollection(cat.handle)}
                </span>
              )}
              <span className="text-sm font-medium text-eufy-text text-center group-hover:text-eufy-blue transition-colors leading-tight">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
