import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogArticles, getArticleByHandle } from "@/lib/shopify/api";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";
const DEFAULT_BLOG = "news";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const articles = await getBlogArticles(50);
  return articles.map((a) => ({ handle: a.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const article = await getArticleByHandle(DEFAULT_BLOG, handle);
  if (!article) return { title: "Article Not Found" };

  const title = article.seo.title || article.title;
  const description = article.seo.description || article.excerpt?.slice(0, 160) || "";

  return {
    title: `${title} | eufy Blog`,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${handle}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.authorV2 ? [article.authorV2.name] : [],
      images: article.image ? [{ url: article.image.url }] : [],
    },
    alternates: { canonical: `${SITE_URL}/blog/${handle}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { handle } = await params;
  const article = await getArticleByHandle(DEFAULT_BLOG, handle);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt || "",
    image: article.image?.url || "",
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.authorV2?.name || "eufy Team",
    },
    publisher: {
      "@type": "Organization",
      name: "eufy",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${handle}`,
    mainEntityOfPage: `${SITE_URL}/blog/${handle}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-eufy-gray border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-eufy-text-light">
              <li>
                <Link href="/" className="hover:text-eufy-blue transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-eufy-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-eufy-text font-medium line-clamp-1" aria-current="page">
                  {article.title}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-10">
            <span className="text-xs font-semibold text-eufy-blue uppercase tracking-widest">
              {article.blog.title}
            </span>
            <h1 className="mt-3 text-3xl lg:text-4xl xl:text-5xl font-bold text-eufy-dark leading-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-4 text-xl text-eufy-text-light leading-relaxed">
                {article.excerpt}
              </p>
            )}
            <div className="mt-6 flex items-center gap-4 text-sm text-eufy-text-light border-b border-gray-200 pb-6">
              {article.authorV2 && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-eufy-blue flex items-center justify-center text-white text-xs font-bold">
                    {article.authorV2.name.charAt(0)}
                  </div>
                  <span className="font-medium text-eufy-text">{article.authorV2.name}</span>
                </div>
              )}
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </header>

          {/* Hero image */}
          {article.image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={article.image.url}
                alt={article.image.altText || article.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-eufy-dark
              prose-p:text-eufy-text prose-p:leading-relaxed
              prose-a:text-eufy-blue prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md
              prose-blockquote:border-eufy-blue prose-blockquote:text-eufy-text-light
              prose-code:bg-eufy-gray prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-eufy-blue font-semibold hover:underline"
            >
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-eufy-text-light">Share:</span>
              {[
                {
                  label: "Twitter",
                  href: `https://twitter.com/intent/tweet?url=${SITE_URL}/blog/${handle}&text=${encodeURIComponent(article.title)}`,
                },
                {
                  label: "Facebook",
                  href: `https://www.facebook.com/sharer/sharer.php?u=${SITE_URL}/blog/${handle}`,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${s.label}`}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:border-eufy-blue hover:text-eufy-blue transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
