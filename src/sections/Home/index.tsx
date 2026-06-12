/**
 * src/sections/Home/index.tsx
 * Luxurianc — home page composition
 *
 * 1. Hero            — "The founding chapter is open."
 * 2. JoinSection     — Founding members counter + email signup
 * 3. FounderMessage  — Personal letter from Reyaan Vig
 * 4. BrandStatement  — Scroll-driven manifesto
 * 5. FutureVision    — Hotels, fine dining, members' spaces
 * 6. ProductShowcase — 3D scroll reveal
 * 7. Testimonials    — Early member voices
 * 8. CTA             — Final join push
 */

import Hero            from "@/components/Hero";
import Testimonials    from "@/components/Testimonials";
import CTA             from "@/components/CTA";
import JoinSection     from "@/sections/Home/JoinSection";
import FounderMessage  from "@/sections/Home/FounderMessage";
import FutureVision    from "@/sections/Home/FutureVision";
import GlobeSection    from "@/sections/Home/GlobeSection";
import MissionScroll   from "@/sections/Home/MissionScroll";
import ProductShowcase from "@/sections/Home/ProductShowcase";
import { testimonials } from "@/data/testimonials";

export default function HomeSection() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero
        eyebrow="Wealth is what you don't see"
        headline={["The founding chapter", "is open."]}
        subline="A private community for those who believe wealth is a mindset, purpose comes before profit, and the greatest things are built by people who refused to accept the ordinary."
        cta={{ label: "Join the Community", href: "/#join" }}
        ctaSecondary={{ label: "Our Vision", href: "/about" }}
        showScroll
      />

      {/* 2 — Pinned scroll mission manifesto */}
      <MissionScroll />

      {/* 3 — Founding members counter + signup */}
      <JoinSection />

      {/* 4 — Reyaan Vig's personal message */}
      <FounderMessage />

      {/* 5 — Future vision: hotels, dining, members' clubs */}
      <FutureVision />

      {/* 7 — Global member network globe */}
      <GlobeSection />

      {/* 8 — Cinematic 3D scroll reveal */}
      <ProductShowcase />

      {/* 9 — Early member testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* 10 — Final CTA */}
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
