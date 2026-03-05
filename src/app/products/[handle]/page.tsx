import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandle, getProducts } from "@/lib/shopify/api";
import { buildProductSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts(50);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };

  const title = product.seo.title || product.title;
  const description =
    product.seo.description || product.description.slice(0, 160);
  const imageUrl = product.featuredImage?.url;

  return {
    title: `${title} | eufy`,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${handle}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/products/${handle}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const variants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = variants[0]?.compareAtPrice
    ? parseFloat(variants[0].compareAtPrice.amount)
    : null;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const onSale = comparePrice !== null && comparePrice > price;

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.title, url: `${SITE_URL}/products/${handle}` },
  ];

  return (
    <>
      <JsonLd data={buildProductSchema(product)} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-eufy-gray border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-eufy-text-light">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.url} className="hover:text-eufy-blue transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-eufy-text font-medium" aria-current="page">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <ProductGallery images={images} title={product.title} />

            {/* Info */}
            <div className="flex flex-col gap-6">
              {product.vendor && (
                <p className="text-sm font-medium text-eufy-blue uppercase tracking-widest">
                  {product.vendor}
                </p>
              )}

              <h1 className="text-3xl lg:text-4xl font-bold text-eufy-dark leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-eufy-dark">
                  {currency} {price.toFixed(2)}
                </span>
                {onSale && comparePrice && (
                  <>
                    <span className="text-xl text-eufy-text-light line-through">
                      {currency} {comparePrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-eufy-accent text-white text-sm font-semibold rounded">
                      Save {Math.round(((comparePrice - price) / comparePrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.availableForSale ? "bg-eufy-green" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm font-medium text-eufy-text">
                  {product.availableForSale ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Variant Selector */}
              {variants.length > 1 && (
                <ProductVariantSelector variants={variants} />
              )}

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  disabled={!product.availableForSale}
                  className="flex-1 py-4 px-8 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {product.availableForSale ? "Add to Cart" : "Sold Out"}
                </button>
                <button className="flex-1 py-4 px-8 border-2 border-eufy-dark text-eufy-dark font-semibold rounded-full hover:bg-eufy-dark hover:text-white transition-colors text-base">
                  Buy Now
                </button>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-eufy-gray text-eufy-text-light text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-eufy-dark mb-3">
                    About This Product
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-eufy-text leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}

              {/* Brand Promise */}
              <div className="border-t border-gray-200 pt-6 grid grid-cols-3 gap-4">
                {[
                  { icon: "🚚", label: "Free Shipping", sub: "Orders over $35" },
                  { icon: "🔄", label: "30-Day Returns", sub: "Hassle-free" },
                  { icon: "🛡️", label: "2-Year Warranty", sub: "Included" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold text-eufy-dark">{item.label}</p>
                    <p className="text-xs text-eufy-text-light">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products placeholder */}
          <section className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-eufy-dark mb-2">You May Also Like</h2>
            <p className="text-eufy-text-light mb-8">Explore more from our collection</p>
            <div className="text-center py-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
