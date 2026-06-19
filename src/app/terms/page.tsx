/**
 * src/app/terms/page.tsx
 * Terms of Service — Luxurianc community
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import TermsSection from "@/sections/Terms";

export const metadata: Metadata = buildSEO({
  title:       "Terms of Service",
  description: "Terms and conditions for using Luxurianc and joining our community.",
  canonical:   "https://luxurianc.co/terms",
});

export default function TermsPage() {
  return <TermsSection />;
}
