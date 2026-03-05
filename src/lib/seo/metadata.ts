import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-seo-dev.com";
const SITE_NAME = "eufy";
const DEFAULT_DESCRIPTION =
  "eufy - Built with Care. Smart home security cameras, robot vacuums, smart locks, and more. Local security, no monthly fees.";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  images?: { url: string; width: number; height: number; alt: string }[];
  noIndex?: boolean;
  keywords?: string[];
}

export function generateSiteMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  images,
  noIndex = false,
  keywords,
}: GenerateMetadataOptions = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Built with Care | Home Security System & Robovacs`;

  const defaultImage = {
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    alt: SITE_NAME,
  };

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? [
      "eufy",
      "smart home",
      "security camera",
      "robot vacuum",
      "smart lock",
      "home security",
      "no monthly fee",
    ],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: images ?? [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images?.map((i) => i.url) ?? [defaultImage.url],
    },
  };
}
