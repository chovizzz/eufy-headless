import type { Product } from "@/lib/shopify/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-seo-dev.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "eufy",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "eufy makes smart home devices including security cameras, robot vacuums, smart locks, video doorbells and more. Built with care, offering local security with no monthly fees.",
    foundingDate: "2016",
    sameAs: [
      "https://www.facebook.com/eufyofficial",
      "https://twitter.com/eaboreufy",
      "https://www.instagram.com/eufy_official/",
      "https://www.youtube.com/@eufy",
      "https://www.tiktok.com/@eufy_official",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
    brand: {
      "@type": "Brand",
      name: "eufy",
      slogan: "Built with Care",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "eufy",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProductSchema(product: Product) {
  const variant = product.variants.edges[0]?.node;
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAtPrice = variant?.compareAtPrice;
  const image = product.featuredImage?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: image ? [image] : [],
    brand: { "@type": "Brand", name: product.vendor || "eufy" },
    url: `${SITE_URL}/products/${product.handle}`,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.handle}`,
      priceCurrency: price.currencyCode,
      price: price.amount,
      ...(compareAtPrice && {
        priceSpecification: {
          "@type": "PriceSpecification",
          price: compareAtPrice.amount,
          priceCurrency: compareAtPrice.currencyCode,
        },
      }),
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "eufy" },
    },
  };
}

export function buildFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    publisher: {
      "@type": "Organization",
      name: "eufy",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildItemListSchema(
  products: Product[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/products/${product.handle}`,
      name: product.title,
    })),
  };
}
