/**
 * src/app/access/page.tsx
 * Private Access — invitation-only introduction page
 */

import type { Metadata } from "next";
import AccessSection from "@/sections/Access";

export const metadata: Metadata = {
  title: "Private Access — Luxurianc",
  description:
    "Luxurianc accepts introductions by referral. Introduce yourself to begin the conversation.",
};

export default function AccessPage() {
  return <AccessSection />;
}
