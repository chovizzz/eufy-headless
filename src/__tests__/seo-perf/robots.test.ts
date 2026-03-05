/**
 * robots.txt 格式与 SEO 规则测试
 * 确保 Sitemap 指令格式正确，不会被 Lighthouse 标记为语法错误
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://eufy-headless.vercel.app");

const { GET } = await import("@/app/robots.txt/route");

async function getRobotsText(): Promise<string> {
  const response = await GET();
  return response.text();
}

describe("robots.txt", () => {
  it("returns 200 with text/plain content type", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/plain");
  });

  it("Sitemap directive is on a single line with full URL", async () => {
    const text = await getRobotsText();
    const lines = text.split("\n");
    const sitemapLines = lines.filter((l) => l.startsWith("Sitemap:"));
    expect(sitemapLines).toHaveLength(1);
    expect(sitemapLines[0]).toBe("Sitemap: https://eufy-headless.vercel.app/sitemap.xml");
  });

  it("Sitemap line contains no embedded newline (Lighthouse syntax requirement)", async () => {
    const text = await getRobotsText();
    expect(text).not.toMatch(/Sitemap:\s*[^\n]*\n\s*\//);
  });

  it("Sitemap URL does not have double slashes", async () => {
    const text = await getRobotsText();
    const sitemapLine = text.split("\n").find((l) => l.startsWith("Sitemap:"))!;
    expect(sitemapLine).not.toContain("//sitemap.xml");
  });

  it("allows all user agents at root", async () => {
    const text = await getRobotsText();
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
  });

  it("disallows sensitive paths", async () => {
    const text = await getRobotsText();
    expect(text).toContain("Disallow: /api/");
    expect(text).toContain("Disallow: /account/");
    expect(text).toContain("Disallow: /checkout/");
    expect(text).toContain("Disallow: /cart/");
  });

  it("explicitly allows AI crawlers", async () => {
    const text = await getRobotsText();
    expect(text).toContain("User-Agent: GPTBot");
    expect(text).toContain("User-Agent: Google-Extended");
    expect(text).toContain("User-Agent: CCBot");
  });

  it("has no trailing slash before /sitemap.xml in Sitemap directive", async () => {
    const text = await getRobotsText();
    const sitemapLine = text.split("\n").find((l) => l.startsWith("Sitemap:"))!;
    expect(sitemapLine).toMatch(/^Sitemap: https?:\/\/[^/].*\/sitemap\.xml$/);
  });

  it("uses SITE_URL env variable for Sitemap", async () => {
    const text = await getRobotsText();
    expect(text).toContain("https://eufy-headless.vercel.app/sitemap.xml");
  });
});
