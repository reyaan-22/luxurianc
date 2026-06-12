/**
 * src/lib/seo.ts
 * SEO helper – generates consistent Next.js Metadata objects.
 * Used in every page's generateMetadata() or static metadata export.
 */

import type { Metadata } from "next";

const SITE_URL  = "https://luxurianc.com";
const SITE_NAME = "Luxurianc";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

interface SEOOptions {
  title:        string;
  description:  string;
  keywords?:    string[];
  ogImage?:     string;
  canonical?:   string;
  noIndex?:     boolean;
}

/**
 * Build a complete Metadata object for a page.
 * Usage:
 *   export const metadata = buildSEO({
 *     title:       "About Us",
 *     description: "Learn our story…",
 *   });
 */
export function buildSEO({
  title,
  description,
  keywords   = [],
  ogImage    = DEFAULT_OG_IMAGE,
  canonical,
  noIndex    = false,
}: SEOOptions): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;

  return {
    title:       fullTitle,
    description,
    keywords:    keywords.join(", "),
    robots:      noIndex ? "noindex,nofollow" : "index,follow",
    alternates:  canonical ? { canonical } : undefined,

    openGraph: {
      title:       fullTitle,
      description,
      url:         canonical ?? SITE_URL,
      siteName:    SITE_NAME,
      images:      [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type:        "website",
      locale:      "en_US",
    },

    twitter: {
      card:        "summary_large_image",
      title:       fullTitle,
      description,
      images:      [ogImage],
      creator:     "@luxurianc",
    },

    icons: {
      icon:         "/icons/favicon.ico",
      shortcut:     "/icons/favicon-16x16.png",
      apple:        "/icons/apple-touch-icon.png",
    },

    manifest: "/icons/site.webmanifest",

    metadataBase: new URL(SITE_URL),
  };
}

/** Site-wide default metadata (used in root layout) */
export const defaultSEO = buildSEO({
  title:       "Luxury Redefined",
  description: "Luxurianc — Where craftsmanship meets vision. Premium luxury products and experiences curated for the discerning few.",
  keywords:    ["luxury", "premium", "bespoke", "craftsmanship", "exclusive"],
  canonical:   SITE_URL,
});
