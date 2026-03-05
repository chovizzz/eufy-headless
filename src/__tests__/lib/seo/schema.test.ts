import { describe, it, expect } from "vitest";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildProductSchema,
  buildFAQSchema,
  buildVideoSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
} from "@/lib/seo/schema";
import type { Product } from "@/lib/shopify/types";

const mockProduct: Product = {
  id: "gid://shopify/Product/1",
  title: "eufy Robot Vacuum Omni C28",
  handle: "robot-vacuum-c28",
  description: "Self-cleaning robot vacuum",
  descriptionHtml: "<p>Self-cleaning robot vacuum</p>",
  tags: ["robot-vacuum", "cleaning"],
  vendor: "eufy",
  productType: "Robot Vacuum",
  availableForSale: true,
  featuredImage: {
    url: "https://cdn.shopify.com/test.jpg",
    altText: "C28 Robot Vacuum",
    width: 800,
    height: 800,
  },
  images: { edges: [] },
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/1",
          title: "Default",
          availableForSale: true,
          price: { amount: "399.99", currencyCode: "USD" },
          compareAtPrice: { amount: "599.99", currencyCode: "USD" },
          image: null,
        },
      },
    ],
  },
  priceRange: {
    minVariantPrice: { amount: "399.99", currencyCode: "USD" },
    maxVariantPrice: { amount: "399.99", currencyCode: "USD" },
  },
  seo: { title: null, description: null },
};

describe("buildOrganizationSchema", () => {
  it("returns valid Organization schema", () => {
    const schema = buildOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("eufy");
    expect(schema.sameAs).toBeInstanceOf(Array);
    expect(schema.sameAs.length).toBeGreaterThan(0);
  });

  it("includes brand info", () => {
    const schema = buildOrganizationSchema();
    expect(schema.brand).toBeDefined();
    expect(schema.brand.name).toBe("eufy");
    expect(schema.brand.slogan).toBe("Built with Care");
  });
});

describe("buildWebSiteSchema", () => {
  it("returns valid WebSite schema with SearchAction", () => {
    const schema = buildWebSiteSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.potentialAction["@type"]).toBe("SearchAction");
    expect(schema.potentialAction.target.urlTemplate).toContain("{search_term_string}");
  });
});

describe("buildProductSchema", () => {
  it("returns valid Product schema from Shopify product", () => {
    const schema = buildProductSchema(mockProduct);
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe("eufy Robot Vacuum Omni C28");
    expect(schema.brand.name).toBe("eufy");
    expect(schema.offers.price).toBe("399.99");
    expect(schema.offers.priceCurrency).toBe("USD");
  });

  it("sets availability based on availableForSale", () => {
    const schema = buildProductSchema(mockProduct);
    expect(schema.offers.availability).toBe("https://schema.org/InStock");

    const outOfStock = { ...mockProduct, availableForSale: false };
    const schemaOOS = buildProductSchema(outOfStock);
    expect(schemaOOS.offers.availability).toBe("https://schema.org/OutOfStock");
  });

  it("includes compareAtPrice when present", () => {
    const schema = buildProductSchema(mockProduct);
    expect(schema.offers.priceSpecification).toBeDefined();
    expect(schema.offers.priceSpecification.price).toBe("599.99");
  });

  it("includes product URL with handle", () => {
    const schema = buildProductSchema(mockProduct);
    expect(schema.url).toContain("/products/robot-vacuum-c28");
  });
});

describe("buildFAQSchema", () => {
  const faqs = [
    { question: "Does eufy require a subscription?", answer: "No, eufy offers no monthly fees." },
    { question: "Is shipping free?", answer: "Yes, free shipping on all orders." },
  ];

  it("returns valid FAQPage schema", () => {
    const schema = buildFAQSchema(faqs);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
  });

  it("maps questions and answers correctly", () => {
    const schema = buildFAQSchema(faqs);
    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].name).toBe("Does eufy require a subscription?");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("No, eufy offers no monthly fees.");
  });

  it("handles empty FAQ array", () => {
    const schema = buildFAQSchema([]);
    expect(schema.mainEntity).toHaveLength(0);
  });
});

describe("buildVideoSchema", () => {
  it("returns valid VideoObject schema", () => {
    const schema = buildVideoSchema({
      name: "eufy C28 Review",
      description: "A review of the eufy C28",
      thumbnailUrl: "https://img.youtube.com/thumb.jpg",
      uploadDate: "2025-01-01",
      embedUrl: "https://youtube.com/embed/abc",
    });
    expect(schema["@type"]).toBe("VideoObject");
    expect(schema.name).toBe("eufy C28 Review");
    expect(schema.embedUrl).toBe("https://youtube.com/embed/abc");
  });

  it("omits embedUrl when not provided", () => {
    const schema = buildVideoSchema({
      name: "Test",
      description: "Test",
      thumbnailUrl: "https://example.com/thumb.jpg",
      uploadDate: "2025-01-01",
    });
    expect(schema.embedUrl).toBeUndefined();
  });
});

describe("buildBreadcrumbSchema", () => {
  it("returns valid BreadcrumbList with positions", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Home", url: "https://example.com" },
      { name: "Products", url: "https://example.com/products" },
      { name: "Robot Vacuums", url: "https://example.com/collections/robot-vacuums" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[2].position).toBe(3);
    expect(schema.itemListElement[1].name).toBe("Products");
  });
});

describe("buildItemListSchema", () => {
  it("returns ItemList from products array", () => {
    const schema = buildItemListSchema([mockProduct]);
    expect(schema["@type"]).toBe("ItemList");
    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].url).toContain("/products/robot-vacuum-c28");
  });

  it("handles empty products array", () => {
    const schema = buildItemListSchema([]);
    expect(schema.itemListElement).toHaveLength(0);
  });
});
