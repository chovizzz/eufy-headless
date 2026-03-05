"use client";

import { useState } from "react";
import type { ProductVariant } from "@/lib/shopify/types";

interface Props {
  variants: ProductVariant[];
}

export function ProductVariantSelector({ variants }: Props) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");

  return (
    <div>
      <p className="text-sm font-semibold text-eufy-dark mb-3">
        Options:{" "}
        <span className="font-normal text-eufy-text-light">
          {variants.find((v) => v.id === selectedId)?.title}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelectedId(variant.id)}
            disabled={!variant.availableForSale}
            aria-pressed={variant.id === selectedId}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              variant.id === selectedId
                ? "border-eufy-blue bg-eufy-blue text-white"
                : "border-gray-300 text-eufy-text hover:border-eufy-blue"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {variant.title}
          </button>
        ))}
      </div>
    </div>
  );
}
