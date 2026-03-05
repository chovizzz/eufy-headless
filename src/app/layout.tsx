import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { getShopInfo, getMenu } from "@/lib/shopify/api";
import type { MenuItem } from "@/lib/shopify/types";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = generateSiteMetadata();

function toPathname(url: string | undefined | null): string {
  if (!url) return "#";
  try {
    // Absolute URL → extract pathname
    return new URL(url).pathname;
  } catch {
    // Already a relative path
    return url.startsWith("/") ? url : `/${url}`;
  }
}

// Map Shopify menu item URLs to local routes that actually exist.
// Shopify returns paths like /collections/xxx, /products/xxx, /pages/xxx, /blogs/xxx/articles/xxx.
// We rewrite known patterns to our Next.js routes; unknown ones fall back to /products.
function toLocalHref(shopifyPath: string): string {
  if (shopifyPath === "#") return "#";

  // /collections/xxx → /collections/xxx  (we have this route)
  if (shopifyPath.startsWith("/collections/")) return shopifyPath;

  // /products/xxx → /products/xxx
  if (shopifyPath.startsWith("/products/")) return shopifyPath;

  // /products (bare)
  if (shopifyPath === "/products") return "/products";

  // /blogs/xxx/articles/yyy → /blog/yyy
  const articleMatch = shopifyPath.match(/^\/blogs\/[^/]+\/articles\/(.+)$/);
  if (articleMatch) return `/blog/${articleMatch[1]}`;

  // /blogs/xxx → /blog
  if (shopifyPath.startsWith("/blogs/")) return "/blog";

  // /pages/contact, /pages/contact-us → /contact
  if (shopifyPath.match(/\/pages\/contact/)) return "/contact";

  // /pages/blog → /blog
  if (shopifyPath.match(/\/pages\/blog/)) return "/blog";

  // /pages/xxx → keep as-is (static pages may exist)
  if (shopifyPath.startsWith("/pages/")) return shopifyPath;

  // Anything else (/, /cart, /account, etc.) → keep as-is
  return shopifyPath;
}

function transformMenuItems(
  items: MenuItem[],
): { title: string; href: string; children?: { title: string; href: string }[] }[] {
  return items.map((item) => {
    const href = toLocalHref(toPathname(item.url));
    return {
      title: item.title,
      href,
      ...(item.items?.length > 0 && {
        children: item.items.map((child) => ({
          title: child.title,
          href: toLocalHref(toPathname(child.url)),
        })),
      }),
    };
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [shopInfo, menu] = await Promise.all([
    getShopInfo(),
    getMenu("main-menu"),
  ]);

  const navItems = menu?.items ? transformMenuItems(menu.items) : undefined;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
      </head>
      <body className="antialiased bg-white text-eufy-text">
        <Header shopName={shopInfo?.name} navItems={navItems} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
