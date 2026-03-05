import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import type { Product } from "@/lib/shopify/types";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props;
    return <img data-fill={fill ? "true" : undefined} {...rest} />;
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const mockProduct: Product = {
  id: "gid://shopify/Product/1",
  title: "eufy Robot Vacuum C28",
  handle: "robot-vacuum-c28",
  description: "Smart robot vacuum",
  descriptionHtml: "<p>Smart robot vacuum</p>",
  tags: [],
  vendor: "eufy",
  productType: "Robot Vacuum",
  availableForSale: true,
  featuredImage: {
    url: "https://cdn.shopify.com/c28.jpg",
    altText: "C28",
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
          price: { amount: "299.99", currencyCode: "USD" },
          compareAtPrice: { amount: "449.99", currencyCode: "USD" },
          image: null,
        },
      },
    ],
  },
  priceRange: {
    minVariantPrice: { amount: "299.99", currencyCode: "USD" },
    maxVariantPrice: { amount: "299.99", currencyCode: "USD" },
  },
  seo: { title: null, description: null },
};

describe("ProductCarousel", () => {
  it("renders nothing when products array is empty", () => {
    const { container } = render(
      <ProductCarousel title="Featured" products={[]} />,
    );
    expect(container.querySelector("section")).toBeNull();
  });

  it("renders title and subtitle", () => {
    render(
      <ProductCarousel title="Best Sellers" subtitle="Our top picks" products={[mockProduct]} />,
    );
    expect(screen.getByText("Best Sellers")).toBeInTheDocument();
    expect(screen.getByText("Our top picks")).toBeInTheDocument();
  });

  it("renders product title", () => {
    render(<ProductCarousel title="Products" products={[mockProduct]} />);
    expect(screen.getByText("eufy Robot Vacuum C28")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    render(<ProductCarousel title="Products" products={[mockProduct]} />);
    expect(screen.getByText("$299.99")).toBeInTheDocument();
  });

  it("renders sale badge when compare-at price is higher", () => {
    render(<ProductCarousel title="Products" products={[mockProduct]} />);
    expect(screen.getAllByText("Sale")).toHaveLength(1);
  });

  it("renders product link to correct handle", () => {
    render(<ProductCarousel title="Products" products={[mockProduct]} />);
    const link = screen.getByText("eufy Robot Vacuum C28").closest("a");
    expect(link).toHaveAttribute("href", "/products/robot-vacuum-c28");
  });

  it("renders product image with alt text", () => {
    render(<ProductCarousel title="Products" products={[mockProduct]} />);
    const img = screen.getByRole("img", { name: "C28" });
    expect(img).toHaveAttribute("src", "https://cdn.shopify.com/c28.jpg");
  });

  it("renders placeholder when product has no image", () => {
    const noImageProduct = { ...mockProduct, featuredImage: null };
    const { container } = render(
      <ProductCarousel title="Products" products={[noImageProduct]} />,
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
