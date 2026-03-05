import { describe, it, expect, vi, beforeEach } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN", "test-store.myshopify.com");
vi.stubEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN", "test-token-123");

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const { shopifyFetch } = await import("@/lib/shopify/client");

beforeEach(() => {
  mockFetch.mockReset();
});

describe("shopifyFetch", () => {
  it("sends correct headers and body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { shop: { name: "eufy" } } }),
    });

    await shopifyFetch("query { shop { name } }");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain("graphql.json");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(options.headers["X-Shopify-Storefront-Access-Token"]).toBeDefined();

    const body = JSON.parse(options.body);
    expect(body.query).toBe("query { shop { name } }");
  });

  it("returns data on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { products: [] } }),
    });

    const result = await shopifyFetch("query { products { edges { node { id } } } }");
    expect(result).toEqual({ products: [] });
  });

  it("throws on HTTP error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(shopifyFetch("query { shop { name } }")).rejects.toThrow(
      "Shopify API error: 500 Internal Server Error",
    );
  });

  it("throws on GraphQL errors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: null,
        errors: [{ message: "Field 'foo' not found" }],
      }),
    });

    await expect(shopifyFetch("query { foo }")).rejects.toThrow(
      "Shopify GraphQL errors",
    );
  });

  it("passes variables in request body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { products: [] } }),
    });

    await shopifyFetch("query Products($first: Int!) { products(first: $first) { edges { node { id } } } }", { first: 5 });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.variables).toEqual({ first: 5 });
  });
});
