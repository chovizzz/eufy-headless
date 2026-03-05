import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/shopify/types";

interface BlogFeedProps {
  articles?: BlogArticle[];
}

const FALLBACK_POSTS = [
  {
    title: "Robot Vacuum Troubleshooting",
    category: "Robot Vacuums",
    excerpt: "Get quick advice about common robot vacuum problems and how to solve them efficiently.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop",
    href: "/blog/robot-vacuum-troubleshooting",
  },
  {
    title: "Your Guide to the Best NVR Camera System",
    category: "Security Cameras",
    excerpt: "Discover the best NVR camera system for ultimate security at home or business.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=250&fit=crop",
    href: "/blog/best-nvr-camera-system",
  },
  {
    title: "How to Detect Hidden Cameras",
    category: "Security Cameras",
    excerpt: "Learn how to detect hidden cameras and safeguard your privacy in any environment.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=250&fit=crop",
    href: "/blog/detect-hidden-cameras",
  },
  {
    title: "The Best Time to Buy a Lawn Mower",
    category: "Robot Lawn Mowers",
    excerpt: "Check out seasonal advice and timing tips for great lawn mower deals.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=250&fit=crop",
    href: "/blog/best-time-buy-lawn-mower",
  },
];

export function BlogFeed({ articles }: BlogFeedProps) {
  const hasArticles = articles && articles.length > 0;

  const posts = hasArticles
    ? articles.map((a) => ({
        title: a.title,
        category: a.blog?.title ?? "Blog",
        excerpt: a.excerpt || "",
        image: a.image?.url ?? null,
        href: `/blogs/${a.blog?.handle ?? "news"}/${a.handle}`,
      }))
    : FALLBACK_POSTS;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight">
          Featured Blogs and News
        </h2>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center text-sm font-semibold text-eufy-blue hover:underline"
        >
          View All
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className="group"
          >
            <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 bg-eufy-gray">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-eufy-blue uppercase tracking-wider">
              {post.category}
            </span>
            <h3 className="mt-1 font-semibold text-eufy-dark group-hover:text-eufy-blue transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-eufy-text-light line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
