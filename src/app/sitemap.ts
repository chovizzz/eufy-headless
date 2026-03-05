import type { MetadataRoute } from "next";
import { shopifyFetch } from "@/lib/shopify/client";
import { PRODUCTS_QUERY, COLLECTIONS_QUERY } from "@/lib/shopify/queries";
import type { Product, Collection } from "@/lib/shopify/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-seo-dev.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-commitment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  let collectionPages: MetadataRoute.Sitemap = [];

  try {
    const productsData = await shopifyFetch<{
      products: { edges: { node: Product }[] };
    }>(PRODUCTS_QUERY, { first: 250 });

    productPages = productsData.products.edges.map(({ node }) => ({
      url: `${SITE_URL}/products/${node.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    console.error("Failed to fetch products for sitemap");
  }

  try {
    const collectionsData = await shopifyFetch<{
      collections: { edges: { node: Collection }[] };
    }>(COLLECTIONS_QUERY, { first: 50 });

    collectionPages = collectionsData.collections.edges.map(({ node }) => ({
      url: `${SITE_URL}/collections/${node.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    console.error("Failed to fetch collections for sitemap");
  }

  return [...staticPages, ...productPages, ...collectionPages];
}
