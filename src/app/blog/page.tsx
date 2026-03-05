import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogArticles } from "@/lib/shopify/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";

export const metadata: Metadata = {
  title: "Blog & News | eufy",
  description:
    "Stay up to date with the latest eufy product news, smart home tips, security guides, and technology insights.",
  openGraph: {
    title: "Blog & News | eufy",
    description:
      "Stay up to date with the latest eufy product news, smart home tips, security guides, and technology insights.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const articles = await getBlogArticles(24);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-eufy-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-eufy-blue text-sm font-semibold uppercase tracking-widest mb-4">
            eufy Blog
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Smart Home Insights
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Product guides, security tips, and the latest news from the world of
            eufy smart home technology.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-eufy-text-light text-lg">No articles found.</p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {articles[0] && (
              <article className="mb-16">
                <Link
                  href={`/blog/${articles[0].handle}`}
                  aria-label={`Read article: ${articles[0].title}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-eufy-gray rounded-3xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[360px]">
                    {articles[0].image ? (
                      <Image
                        src={articles[0].image.url}
                        alt={articles[0].image.altText || articles[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-eufy-blue/20 to-eufy-blue/5 flex items-center justify-center">
                        <span className="text-eufy-blue text-5xl">📰</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-eufy-blue uppercase tracking-widest mb-3">
                      {articles[0].blog.title} · Featured
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-eufy-dark mb-4 group-hover:text-eufy-blue transition-colors leading-snug">
                      {articles[0].title}
                    </h2>
                    {articles[0].excerpt && (
                      <p className="text-eufy-text-light leading-relaxed mb-6 line-clamp-3">
                        {articles[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-eufy-text-light">
                      {articles[0].authorV2 && (
                        <>
                          <span>{articles[0].authorV2.name}</span>
                          <span>·</span>
                        </>
                      )}
                      <time dateTime={articles[0].publishedAt}>
                        {formatDate(articles[0].publishedAt)}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Grid */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(1).map((article) => (
                  <article key={article.id}>
                    <Link
                      href={`/blog/${article.handle}`}
                      aria-label={`Read article: ${article.title}`}
                      className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-video bg-eufy-gray">
                        {article.image ? (
                          <Image
                            src={article.image.url}
                            alt={article.image.altText || article.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-eufy-blue/10 to-transparent">
                            <span className="text-3xl">📝</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold text-eufy-blue uppercase tracking-widest">
                          {article.blog.title}
                        </span>
                        <h3 className="mt-2 text-lg font-bold text-eufy-dark leading-snug group-hover:text-eufy-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="mt-2 text-sm text-eufy-text-light line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-2 text-xs text-eufy-text-light">
                          {article.authorV2 && (
                            <>
                              <span>{article.authorV2.name}</span>
                              <span>·</span>
                            </>
                          )}
                          <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
