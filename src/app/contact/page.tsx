/**
 * src/app/contact/page.tsx
 * Contact page route (/contact).
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import ContactSection from "@/sections/Contact";

export const metadata: Metadata = buildSEO({
  title:       "Contact",
  description: "Begin a private conversation with a Luxurianc advisor. We respond personally within 24 hours.",
  keywords:    ["contact", "private enquiry", "luxury advisor"],
  canonical:   "https://luxurianc.com/contact",
});

export default function ContactPage() {
  return <ContactSection />;
}
