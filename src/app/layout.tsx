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

function transformMenuItems(
  items: MenuItem[],
): { title: string; href: string; children?: { title: string; href: string }[] }[] {
  return items.map((item) => {
    const href = item.url
      ? new URL(item.url).pathname
      : "#";
    return {
      title: item.title,
      href,
      ...(item.items?.length > 0 && {
        children: item.items.map((child) => ({
          title: child.title,
          href: child.url ? new URL(child.url).pathname : "#",
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
