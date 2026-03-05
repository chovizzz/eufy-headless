import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollectionByHandle, getCollections } from "@/lib/shopify/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections(50);
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle, 1);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  const title = collection.title;
  const description =
    collection.description ||
    `Browse ${title} products from eufy — smart home technology built with care.`;

  return {
    title: `${title} | eufy`,
    description,
    openGraph: {
      title: `${title} | eufy`,
      description,
      url: `${SITE_URL}/collections/${handle}`,
      images: collection.image ? [{ url: collection.image.url }] : [],
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/collections/${handle}` },
  };
}

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;

  const [collection, allCollections] = await Promise.all([
    getCollectionByHandle(handle, 48),
    getCollections(20),
  ]);

  if (!collection) {
    // Graceful fallback: show all products page instead of hard 404
    // for handles that exist in nav but not yet in Shopify
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-eufy-gray border-b border-gray-200 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-eufy-text-light">
                <li><Link href="/" className="hover:text-eufy-blue transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/products" className="hover:text-eufy-blue transition-colors">Products</Link></li>
                <li aria-hidden="true">/</li>
                <li><span className="text-eufy-text font-medium capitalize" aria-current="page">{handle.replace(/-/g, " ")}</span></li>
              </ol>
            </nav>
            <h1 className="text-3xl font-bold text-eufy-dark capitalize mb-2">
              {handle.replace(/-/g, " ")}
            </h1>
            <p className="text-eufy-text-light">Explore our full product range</p>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-eufy-text-light mb-8">
            This collection is coming soon. Browse all products in the meantime.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </main>
    );
  }

  const products = collection.products.edges.map((e) => e.node);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-eufy-gray border-b border-gray-200">
        {/* Collection hero image */}
        {collection.image && (
          <div className="relative h-48 lg:h-64 overflow-hidden">
            <Image
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-eufy-dark/50" />
            <div className="absolute inset-0 flex items-end px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  {collection.title}
                </h1>
                {collection.description && (
                  <p className="mt-1 text-gray-300 text-sm max-w-xl">
                    {collection.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-sm text-eufy-text-light">
              <li><Link href="/" className="hover:text-eufy-blue transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:text-eufy-blue transition-colors">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li><span className="text-eufy-text font-medium" aria-current="page">{collection.title}</span></li>
            </ol>
          </nav>

          {!collection.image && (
            <>
              <h1 className="text-3xl font-bold text-eufy-dark mb-1">{collection.title}</h1>
              {collection.description && (
                <p className="text-eufy-text-light text-sm">{collection.description}</p>
              )}
            </>
          )}

          <p className="text-sm text-eufy-text-light mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Related collections pills */}
        {allCollections.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            <Link
              href="/products"
              className="shrink-0 px-4 py-2 bg-eufy-gray text-eufy-text text-sm font-medium rounded-full hover:bg-eufy-blue hover:text-white transition-colors"
            >
              All
            </Link>
            {allCollections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  col.handle === handle
                    ? "bg-eufy-dark text-white"
                    : "bg-eufy-gray text-eufy-text hover:bg-eufy-blue hover:text-white"
                }`}
              >
                {col.title}
              </Link>
            ))}
          </div>
        )}

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-eufy-text-light text-lg mb-6">
              No products in this collection yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Browse All Products
            </Link>
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
