/**
 * src/app/privacy/page.tsx
 * Privacy Policy — Luxurianc community
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import PrivacySection from "@/sections/Privacy";

export const metadata: Metadata = buildSEO({
  title:       "Privacy Policy",
  description: "How Luxurianc collects, uses, and protects your personal information.",
  canonical:   "https://luxurianc.co/privacy",
});

export default function PrivacyPage() {
  return <PrivacySection />;
}
