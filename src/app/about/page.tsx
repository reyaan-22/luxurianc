/**
 * src/app/about/page.tsx
 * About page route (/about).
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import AboutSection from "@/sections/About";

export const metadata: Metadata = buildSEO({
  title:       "Our Story",
  description: "Since 1887, Luxurianc has stood for uncompromising craft and radical honesty. Discover the heritage behind the house.",
  keywords:    ["luxury brand story", "heritage", "craftsmanship", "bespoke"],
  canonical:   "https://luxurianc.com/about",
});

export default function AboutPage() {
  return <AboutSection />;
}
