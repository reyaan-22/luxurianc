/**
 * src/sections/Home/index.tsx
 * Luxurianc — home page composition
 *
 * 1. LuxHeroCanvas   — Immersive Three.js starfield / mountain scroll hero (300vh)
 * 2. MissionScroll   — Pinned scroll mission manifesto (5 chapters)
 * 3. JoinSection     — Founding members counter + email signup
 * 4. FounderMessage  — Personal letter from Reyaan Vig
 * 5. FutureVision    — Hotels, fine dining, members' spaces
 * 6. GlobeSection    — Global member network globe
 * 7. ProductShowcase — Cinematic 3D scroll reveal
 * 8. Testimonials    — Early member voices
 * 9. CTA             — Final join push
 */

import dynamic         from "next/dynamic";
import Testimonials    from "@/components/Testimonials";
import CTA             from "@/components/CTA";
import JoinSection     from "@/sections/Home/JoinSection";
import FounderMessage  from "@/sections/Home/FounderMessage";
import FutureVision    from "@/sections/Home/FutureVision";
import GlobeSection    from "@/sections/Home/GlobeSection";
import MissionScroll   from "@/sections/Home/MissionScroll";
import ProductShowcase from "@/sections/Home/ProductShowcase";
import { testimonials } from "@/data/testimonials";

// Three.js hero — client-only, skip SSR
const LuxHeroCanvas = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((m) => m.Component),
  { ssr: false }
);

export default function HomeSection() {
  return (
    <>
      {/* 1 — Immersive Three.js hero (300vh scroll journey) */}
      <LuxHeroCanvas />

      {/* 2 — Pinned scroll mission manifesto */}
      <MissionScroll />

      {/* 3 — Founding members counter + signup */}
      <JoinSection />

      {/* 4 — Reyaan Vig's personal message */}
      <FounderMessage />

      {/* 5 — Future vision: hotels, dining, members' clubs */}
      <FutureVision />

      {/* 6 — Global member network globe */}
      <GlobeSection />

      {/* 7 — Cinematic 3D scroll reveal */}
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
