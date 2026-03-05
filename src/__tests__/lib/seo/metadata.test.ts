import { describe, it, expect } from "vitest";
import { generateSiteMetadata } from "@/lib/seo/metadata";

describe("generateSiteMetadata", () => {
  it("returns default metadata when no options provided", () => {
    const meta = generateSiteMetadata();
    expect(meta.title).toContain("eufy");
    expect(meta.description).toBeDefined();
    expect(meta.description).toContain("eufy");
  });

  it("generates correct title with custom title", () => {
    const meta = generateSiteMetadata({ title: "Robot Vacuums" });
    expect(meta.title).toBe("Robot Vacuums | eufy");
  });

  it("sets canonical URL from path", () => {
    const meta = generateSiteMetadata({ path: "/products/c28" });
    expect(meta.alternates?.canonical).toContain("/products/c28");
  });

  it("sets noIndex when specified", () => {
    const meta = generateSiteMetadata({ noIndex: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("allows indexing by default", () => {
    const meta = generateSiteMetadata();
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it("includes OpenGraph data", () => {
    const meta = generateSiteMetadata({ title: "Test Page" });
    expect(meta.openGraph).toBeDefined();
    expect(meta.openGraph?.type).toBe("website");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.openGraph?.siteName).toBe("eufy");
  });

  it("includes Twitter card data", () => {
    const meta = generateSiteMetadata();
    expect(meta.twitter).toBeDefined();
    expect(meta.twitter?.card).toBe("summary_large_image");
  });

  it("uses custom images when provided", () => {
    const images = [{ url: "https://example.com/og.png", width: 1200, height: 630, alt: "Test" }];
    const meta = generateSiteMetadata({ images });
    expect(meta.openGraph?.images).toEqual(images);
  });

  it("includes keywords", () => {
    const meta = generateSiteMetadata();
    expect(meta.keywords).toBeInstanceOf(Array);
    expect(meta.keywords?.length).toBeGreaterThan(0);
  });

  it("accepts custom keywords", () => {
    const meta = generateSiteMetadata({ keywords: ["test", "custom"] });
    expect(meta.keywords).toEqual(["test", "custom"]);
  });
});
