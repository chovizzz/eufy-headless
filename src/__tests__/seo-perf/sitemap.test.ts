/**
 * sitemap.xml 结构测试
 * 验证 sitemap 包含必要页面、URL 格式正确、优先级合理
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://eufy-headless.vercel.app");
vi.stubEnv("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN", "test.myshopify.com");
vi.stubEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN", "test-token");

vi.mock("@/lib/shopify/client", () => ({
  shopifyFetch: vi.fn().mockResolvedValue({
    products: {
      edges: [
        { node: { handle: "robot-vacuum-c28", title: "eufy C28" } },
        { node: { handle: "nvr-s4-max", title: "eufy NVR S4 Max" } },
      ],
    },
    collections: {
      edges: [
        { node: { handle: "robot-vacuums", title: "Robot Vacuums" } },
        { node: { handle: "security-cameras", title: "Security Cameras" } },
      ],
    },
  }),
}));

const { default: sitemap } = await import("@/app/sitemap");

describe("sitemap", () => {
  it("returns an array of sitemap entries", async () => {
    const entries = await sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes homepage with priority 1", async () => {
    const entries = await sitemap();
    const home = entries.find((e) => e.url === "https://eufy-headless.vercel.app");
    expect(home).toBeDefined();
    expect(home!.priority).toBe(1);
  });

  it("includes all required static pages", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://eufy-headless.vercel.app/about");
    expect(urls).toContain("https://eufy-headless.vercel.app/support");
    expect(urls).toContain("https://eufy-headless.vercel.app/privacy-commitment");
  });

  it("includes product pages from Shopify", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://eufy-headless.vercel.app/products/robot-vacuum-c28");
    expect(urls).toContain("https://eufy-headless.vercel.app/products/nvr-s4-max");
  });

  it("includes collection pages from Shopify", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://eufy-headless.vercel.app/collections/robot-vacuums");
    expect(urls).toContain("https://eufy-headless.vercel.app/collections/security-cameras");
  });

  it("all URLs use HTTPS", async () => {
    const entries = await sitemap();
    entries.forEach((entry) => {
      expect(entry.url).toMatch(/^https:\/\//);
    });
  });

  it("all URLs have no trailing slash (except homepage)", async () => {
    const entries = await sitemap();
    entries
      .filter((e) => e.url !== "https://eufy-headless.vercel.app")
      .forEach((entry) => {
        expect(entry.url).not.toMatch(/\/$/);
      });
  });

  it("product pages have higher priority than static pages", async () => {
    const entries = await sitemap();
    const productEntry = entries.find((e) => e.url.includes("/products/"));
    const aboutEntry = entries.find((e) => e.url.includes("/about"));
    expect(productEntry!.priority!).toBeGreaterThan(aboutEntry!.priority!);
  });

  it("all entries have lastModified date", async () => {
    const entries = await sitemap();
    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });

  it("all entries have valid changeFrequency", async () => {
    const validFrequencies = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
    const entries = await sitemap();
    entries.forEach((entry) => {
      if (entry.changeFrequency) {
        expect(validFrequencies).toContain(entry.changeFrequency);
      }
    });
  });

  it("returns static pages even when Shopify API fails", async () => {
    const { shopifyFetch } = await import("@/lib/shopify/client");
    vi.mocked(shopifyFetch).mockRejectedValueOnce(new Error("API down")).mockRejectedValueOnce(new Error("API down"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://eufy-headless.vercel.app");
    expect(urls).toContain("https://eufy-headless.vercel.app/about");
  });
});
