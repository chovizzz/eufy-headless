import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/shopify/client", () => ({
  shopifyFetch: vi.fn(),
}));

import { shopifyFetch } from "@/lib/shopify/client";
import {
  getProducts,
  getCollections,
  getBlogArticles,
  getShopInfo,
  getMenu,
} from "@/lib/shopify/api";

const mockFetch = vi.mocked(shopifyFetch);

beforeEach(() => {
  mockFetch.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getProducts", () => {
  it("returns products from API", async () => {
    mockFetch.mockResolvedValueOnce({
      products: {
        edges: [
          { node: { id: "1", title: "Product A" } },
          { node: { id: "2", title: "Product B" } },
        ],
      },
    });

    const products = await getProducts(2);
    expect(products).toHaveLength(2);
    expect(products[0].title).toBe("Product A");
  });

  it("returns empty array on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    const products = await getProducts();
    expect(products).toEqual([]);
  });
});

describe("getCollections", () => {
  it("returns collections from API", async () => {
    mockFetch.mockResolvedValueOnce({
      collections: {
        edges: [{ node: { id: "c1", title: "Collection A", handle: "a" } }],
      },
    });

    const collections = await getCollections(1);
    expect(collections).toHaveLength(1);
    expect(collections[0].title).toBe("Collection A");
  });

  it("returns empty array on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));
    expect(await getCollections()).toEqual([]);
  });
});

describe("getBlogArticles", () => {
  it("flattens articles from blogs", async () => {
    mockFetch.mockResolvedValueOnce({
      blogs: {
        edges: [
          {
            node: {
              title: "Blog",
              handle: "blog",
              articles: {
                edges: [
                  { node: { id: "a1", title: "Article 1" } },
                  { node: { id: "a2", title: "Article 2" } },
                ],
              },
            },
          },
        ],
      },
    });

    const articles = await getBlogArticles(4);
    expect(articles).toHaveLength(2);
    expect(articles[0].title).toBe("Article 1");
  });

  it("returns empty array on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));
    expect(await getBlogArticles()).toEqual([]);
  });
});

describe("getShopInfo", () => {
  it("returns shop info", async () => {
    mockFetch.mockResolvedValueOnce({
      shop: { name: "eufy", description: "Smart home" },
    });

    const info = await getShopInfo();
    expect(info?.name).toBe("eufy");
  });

  it("returns null on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));
    expect(await getShopInfo()).toBeNull();
  });
});

describe("getMenu", () => {
  it("returns menu data", async () => {
    mockFetch.mockResolvedValueOnce({
      menu: { items: [{ title: "Home", url: "/" }] },
    });

    const menu = await getMenu("main-menu");
    expect(menu?.items).toHaveLength(1);
  });

  it("returns null on error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));
    expect(await getMenu("main-menu")).toBeNull();
  });
});
