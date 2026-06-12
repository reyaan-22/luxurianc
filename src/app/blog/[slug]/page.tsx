/**
 * src/app/blog/[slug]/page.tsx
 * Dynamic blog post page.
 * In production, replace static data with a CMS fetch.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { buildSEO } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// Generate per-post metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return buildSEO({
    title:       post.title,
    description: post.excerpt,
    keywords:    post.tags,
    canonical:   `https://luxurianc.com/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="pt-40 pb-32">
      <div className="container-luxury max-w-3xl">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-gold-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          The Journal
        </Link>

        {/* Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-500">
              {post.category}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{post.readTime} min read</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-light leading-tight">{post.title}</h1>

          <div className="divider-gold mr-auto" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
              <span className="text-gold-500 text-sm font-display">{post.author.name[0]}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {post.author.role} · {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Cover placeholder */}
        <div className="aspect-video rounded-3xl glass-card flex items-center justify-center mb-12 bg-gradient-to-br from-gold-500/8 to-transparent">
          <span className="font-display text-8xl text-gold-500/15">{post.category[0]}</span>
        </div>

        {/* Excerpt as intro (full content would come from CMS rich text) */}
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light italic border-l-2 border-gold-500 pl-6">
            {post.excerpt}
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            This article is a placeholder. Connect a CMS (Contentful, Sanity, or Notion) and replace this with your
            rich-text renderer. The data layer is ready — add a <code>content</code> field to the{" "}
            <code>BlogPost</code> type in <code>src/types/index.ts</code>.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
