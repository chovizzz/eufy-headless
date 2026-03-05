import { shopifyFetch } from "./client";
import {
  PRODUCTS_QUERY,
  COLLECTIONS_QUERY,
  BLOGS_QUERY,
  SHOP_QUERY,
  MENU_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  BLOG_ARTICLES_QUERY,
  ARTICLE_BY_HANDLE_QUERY,
} from "./queries";
import type { Product, Collection, BlogArticle, ShopInfo, Menu } from "./types";

export async function getProducts(count = 12): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: Product }[] };
    }>(PRODUCTS_QUERY, { first: count });
    return data.products.edges.map((e) => e.node);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getCollections(count = 20): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<{
      collections: { edges: { node: Collection }[] };
    }>(COLLECTIONS_QUERY, { first: count });
    return data.collections.edges.map((e) => e.node);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return [];
  }
}

export async function getBlogArticles(count = 4): Promise<BlogArticle[]> {
  try {
    const data = await shopifyFetch<{
      blogs: {
        edges: {
          node: {
            title: string;
            handle: string;
            articles: { edges: { node: BlogArticle }[] };
          };
        }[];
      };
    }>(BLOGS_QUERY, { first: count });

    return data.blogs.edges.flatMap((blog) =>
      blog.node.articles.edges.map((a) => a.node),
    ).slice(0, count);
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);
    return [];
  }
}

export async function getShopInfo(): Promise<ShopInfo | null> {
  try {
    const data = await shopifyFetch<{ shop: ShopInfo }>(SHOP_QUERY);
    return data.shop;
  } catch (error) {
    console.error("Failed to fetch shop info:", error);
    return null;
  }
}

export async function getMenu(handle: string): Promise<Menu | null> {
  try {
    const data = await shopifyFetch<{ menu: Menu }>(MENU_QUERY, { handle });
    return data.menu;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: Product | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle },
    );
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function getBlogArticlesByBlog(
  blogHandle: string,
  count = 20,
): Promise<{ blogTitle: string; articles: BlogArticle[] } | null> {
  try {
    const data = await shopifyFetch<{
      blog: {
        id: string;
        title: string;
        handle: string;
        articles: { edges: { node: BlogArticle }[] };
      } | null;
    }>(BLOG_ARTICLES_QUERY, { blogHandle, first: count });
    if (!data.blog) return null;
    return {
      blogTitle: data.blog.title,
      articles: data.blog.articles.edges.map((e) => e.node),
    };
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);
    return null;
  }
}

export async function getArticleByHandle(
  blogHandle: string,
  articleHandle: string,
): Promise<BlogArticle | null> {
  try {
    const data = await shopifyFetch<{
      blog: { articleByHandle: BlogArticle | null } | null;
    }>(ARTICLE_BY_HANDLE_QUERY, { blogHandle, articleHandle });
    return data.blog?.articleByHandle ?? null;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}
