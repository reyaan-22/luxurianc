"use client";
/**
 * Thin client wrapper so the Server Component home page
 * can load the Three.js hero (which needs ssr: false).
 */
import dynamic from "next/dynamic";

const LuxHeroCanvas = dynamic(
  () => import("./horizon-hero-section").then((m) => m.Component),
  { ssr: false }
);

export default function LuxHeroWrapper() {
  return <LuxHeroCanvas />;
}
