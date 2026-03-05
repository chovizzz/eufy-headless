import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";

export const metadata: Metadata = {
  title: "All Products | eufy",
  description:
    "Browse all eufy smart home products — security cameras, robot vacuums, video doorbells, smart locks, and more.",
  openGraph: {
    title: "All Products | eufy",
    description:
      "Browse all eufy smart home products — security cameras, robot vacuums, video doorbells, smart locks, and more.",
    url: `${SITE_URL}/products`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/products` },
};

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(48),
    getCollections(20),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-eufy-gray border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-eufy-text-light">
              <li><Link href="/" className="hover:text-eufy-blue transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><span className="text-eufy-text font-medium" aria-current="page">All Products</span></li>
            </ol>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-eufy-dark mb-2">All Products</h1>
          <p className="text-eufy-text-light">
            {products.length > 0 ? `${products.length} products` : "Explore our full range"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category pills */}
        {collections.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <Link
              href="/products"
              className="shrink-0 px-4 py-2 bg-eufy-dark text-white text-sm font-medium rounded-full"
            >
              All
            </Link>
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="shrink-0 px-4 py-2 bg-eufy-gray text-eufy-text text-sm font-medium rounded-full hover:bg-eufy-blue hover:text-white transition-colors"
              >
                {col.title}
              </Link>
            ))}
          </div>
        )}

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-eufy-text-light text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const price = product.priceRange.minVariantPrice;
              const comparePrice = product.variants.edges[0]?.node.compareAtPrice;
              const onSale =
                comparePrice &&
                parseFloat(comparePrice.amount) > parseFloat(price.amount);

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  aria-label={`View ${product.title}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square bg-eufy-gray">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📦
                      </div>
                    )}
                    {onSale && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-eufy-accent text-white text-xs font-bold rounded">
                        Sale
                      </span>
                    )}
                    {!product.availableForSale && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-gray-500 text-white text-xs font-bold rounded">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    {product.vendor && (
                      <p className="text-xs text-eufy-blue font-semibold uppercase tracking-wide">
                        {product.vendor}
                      </p>
                    )}
                    <h2 className="text-sm font-semibold text-eufy-dark leading-snug line-clamp-2 group-hover:text-eufy-blue transition-colors">
                      {product.title}
                    </h2>
                    <div className="flex items-baseline gap-2 mt-auto pt-2">
                      <span className="text-base font-bold text-eufy-dark">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      {onSale && comparePrice && (
                        <span className="text-sm text-eufy-text-light line-through">
                          {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
