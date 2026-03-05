import { NextResponse } from "next/server";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-seo-dev.com").replace(/\/$/, "").replace(/\s+/g, "").trim();

export function GET() {
  const content = [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /account/",
    "Disallow: /checkout/",
    "Disallow: /cart/",
    "",
    "User-Agent: GPTBot",
    "Allow: /",
    "",
    "User-Agent: Google-Extended",
    "Allow: /",
    "",
    "User-Agent: CCBot",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n");

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
