/**
 * src/app/vision/page.tsx
 * Vision page route (/vision)
 */

import type { Metadata } from "next";
import { buildSEO } from "@/lib/seo";
import VisionSection from "@/sections/Vision";

export const metadata: Metadata = buildSEO({
  title:       "Our Vision",
  description: "Luxurianc is building a global luxury hospitality group — hotels, fine dining, and private members' spaces for a new generation of visionaries.",
  keywords:    ["luxury hospitality", "private members club", "fine dining", "luxury hotels"],
  canonical:   "https://luxurianc.co/vision",
});

export default function VisionPage() {
  return <VisionSection />;
}
