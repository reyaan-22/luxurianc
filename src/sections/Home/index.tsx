/**
 * src/sections/Home/index.tsx
 * Luxurianc — home page composition
 */

import LampHero        from "@/sections/Home/LampHero";
import Testimonials    from "@/components/Testimonials";
import CTA             from "@/components/CTA";
import JoinSection     from "@/sections/Home/JoinSection";
import FounderMessage  from "@/sections/Home/FounderMessage";
import FutureVision    from "@/sections/Home/FutureVision";
import GlobeSection    from "@/sections/Home/GlobeSection";

import ProductShowcase from "@/sections/Home/ProductShowcase";
import FlxshTeaser    from "@/sections/Home/FlxshTeaser";
import { testimonials } from "@/data/testimonials";

export default function HomeSection() {
  return (
    <>
      {/* 1 — Lamp hero */}
      <LampHero />

      {/* 2 — Founding members counter + signup */}
      <JoinSection />

      {/* 4 — Reyaan Vig's personal message */}
      <FounderMessage />

      {/* 5 — Future vision */}
      <FutureVision />

      {/* 6 — Global member network globe */}
      <GlobeSection />

      {/* 7 — FLXSH clothing sub-brand teaser */}
      <FlxshTeaser />

      {/* 8 — Cinematic scroll reveal */}
      <ProductShowcase />

      {/* 8 — Early member testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* 9 — Final CTA */}
      <CTA
        eyebrow="Join the founding chapter"
        heading="Be part of the beginning."
        subheading="Free to join. Rare to be part of. Founding member status is available now — it won't be forever."
        cta={{ label: "Join Luxurianc — Free", href: "/#join" }}
        ctaSecondary={{ label: "Read Our Story", href: "/about" }}
        variant="dark"
      />
    </>
  );
}
