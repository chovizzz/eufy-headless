export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  image: ShopifyImage | null;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  vendor: string;
  productType: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ProductVariant }[] };
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  seo: {
    title: string | null;
    description: string | null;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: Product }[];
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  content: string;
  contentHtml: string;
  publishedAt: string;
  image: ShopifyImage | null;
  blog: { title: string; handle: string };
  authorV2: { name: string } | null;
  seo: { title: string | null; description: string | null };
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface ShopInfo {
  name: string;
  description: string;
  brand: {
    logo: { image: ShopifyImage | null } | null;
  } | null;
}
