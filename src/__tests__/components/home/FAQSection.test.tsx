import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQSection } from "@/components/home/FAQSection";

describe("FAQSection", () => {
  it("renders heading", () => {
    render(<FAQSection />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders all FAQ questions", () => {
    render(<FAQSection />);
    expect(screen.getByText("Does eufy require a monthly subscription?")).toBeInTheDocument();
    expect(screen.getByText("How does eufy protect my privacy?")).toBeInTheDocument();
    expect(screen.getByText("Does eufy offer free shipping?")).toBeInTheDocument();
  });

  it("answers are hidden by default", () => {
    render(<FAQSection />);
    expect(screen.queryByText(/eufy uses on-device AI processing/)).not.toBeInTheDocument();
  });

  it("shows answer when question is clicked", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByText("How does eufy protect my privacy?"));
    expect(screen.getByText(/eufy uses on-device AI processing/)).toBeInTheDocument();
  });

  it("hides answer when clicked again", () => {
    render(<FAQSection />);
    const btn = screen.getByText("How does eufy protect my privacy?");
    fireEvent.click(btn);
    expect(screen.getByText(/eufy uses on-device AI processing/)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(/eufy uses on-device AI processing/)).not.toBeInTheDocument();
  });

  it("toggles aria-expanded attribute", () => {
    render(<FAQSection />);
    const btn = screen.getByText("How does eufy protect my privacy?").closest("button")!;
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders FAQ schema JSON-LD", () => {
    const { container } = render(<FAQSection />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const parsed = JSON.parse(script!.innerHTML);
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity.length).toBeGreaterThan(0);
  });
});
