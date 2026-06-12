/**
 * src/app/blog/page.tsx
 * Journal / Blog listing page (/blog).
 * Uses blogPosts data — swap for CMS fetch in production.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { buildSEO } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import CTA from "@/components/CTA";

export const metadata: Metadata = buildSEO({
  title:       "Journal",
  description: "Dispatches on craft, culture, and the art of living well. The Luxurianc Journal.",
  keywords:    ["luxury journal", "craft", "lifestyle", "culture"],
  canonical:   "https://luxurianc.com/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-luxury">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-4 font-mono">✦ The Journal ✦</p>
            <h1 className="font-display text-5xl md:text-7xl font-light">
              Dispatches on the<br />
              <span className="text-gradient-gold italic">art of living</span>
            </h1>
            <div className="divider-gold mt-8" />
          </div>

          {/* Featured article */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block glass-card rounded-4xl p-10 md:p-14 mb-6 border border-[var(--border)] hover:border-gold-500/30 transition-all duration-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-500">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{featured.readTime} min read</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light group-hover:text-gold-500 transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-3 pt-2">
                  <p className="text-sm font-medium">{featured.author.name}</p>
                  <span className="text-[var(--border)]">·</span>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(featured.publishedAt)}</p>
                </div>
              </div>
              {/* Placeholder visual */}
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-gold-500/10 to-obsidian-950/20 flex items-center justify-center">
                <span className="font-display text-6xl text-gold-500/20">{featured.category[0]}</span>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group glass-card rounded-3xl p-8 space-y-4 border border-[var(--border)] hover:border-gold-500/30 transition-all duration-500"
              >
                {/* Visual */}
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-gold-500/8 to-obsidian-900/10 flex items-center justify-center mb-2">
                  <span className="font-display text-4xl text-gold-500/15">{post.category[0]}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-500">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{post.readTime} min</span>
                </div>

                <h3 className="font-display text-xl font-light group-hover:text-gold-500 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-2 pt-1">
                  <p className="text-xs font-medium">{post.author.name}</p>
                  <span className="text-[var(--border)]">·</span>
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(post.publishedAt, { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Private dispatches"
        heading="Receive the Journal by post"
        subheading="Subscribe to receive curated essays, delivered to your inbox — never more than once per month."
        cta={{ label: "Subscribe", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
