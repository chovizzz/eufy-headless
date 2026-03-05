import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with application/ld+json type", () => {
    const data = { "@type": "Organization", name: "eufy" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
  });

  it("serializes data as JSON in the script content", () => {
    const data = { "@type": "Organization", name: "eufy", url: "https://example.com" };
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.innerHTML);
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.name).toBe("eufy");
    expect(parsed.url).toBe("https://example.com");
  });

  it("handles array data", () => {
    const data = [
      { "@type": "Organization", name: "eufy" },
      { "@type": "WebSite", name: "eufy" },
    ];
    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.innerHTML);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(2);
  });
});
