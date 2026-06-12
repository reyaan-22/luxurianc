/**
 * src/app/services/page.tsx
 * Services page route (/services).
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import ServicesSection from "@/sections/Services";

export const metadata: Metadata = buildSEO({
  title:       "Our Services",
  description: "Four disciplines. One house. Bespoke design, private collection, concierge and estate management for the discerning few.",
  keywords:    ["bespoke design", "private collection", "luxury concierge", "estate management"],
  canonical:   "https://luxurianc.com/services",
});

export default function ServicesPage() {
  return <ServicesSection />;
}
