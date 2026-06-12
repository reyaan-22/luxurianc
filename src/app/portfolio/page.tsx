/**
 * src/app/portfolio/page.tsx
 * Portfolio page — all companies with filters
 */

import type { Metadata } from "next";
import PortfolioSection from "@/sections/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Luxurianc",
  description:
    "Luxurianc's portfolio of private equity, venture, and real asset investments.",
};

export default function PortfolioPage() {
  return <PortfolioSection />;
}
