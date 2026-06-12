/**
 * src/sections/Home/BrandStatement.tsx
 * Scroll-driven manifesto — Luxurianc's core belief
 */

"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";

const MANIFESTO =
  "Wealth is a mindset before it is a number. Purpose comes before profit. And the greatest things are built by people who refused to accept the ordinary. This is what Luxurianc stands for.";

export default function BrandStatement() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(122,148,69,0.05) 0%, transparent 70%)",
        }}
      />
      <TextRevealByWord text={MANIFESTO} />
    </section>
  );
}
