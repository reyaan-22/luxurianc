/**
 * src/app/page.tsx
 * Home page route (/).
 * Thin by design — all composition lives in HomeSection.
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import HomeSection from "@/sections/Home";

export const metadata: Metadata = buildSEO({
  title:       "Luxury Redefined",
  description: "Luxurianc — Where craftsmanship meets vision. Premium luxury products and experiences curated for the discerning few.",
  keywords:    ["luxury brand", "bespoke design", "private collection", "luxury concierge"],
  canonical:   "https://luxurianc.com",
});

export default function HomePage() {
  return <HomeSection />;
}
