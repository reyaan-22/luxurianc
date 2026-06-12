/**
 * src/sections/Home/ProductShowcase.tsx
 * Cinematic 3D scroll reveal — the future of Luxurianc
 */

"use client";

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ProductShowcase() {
  return (
    <section
      className="overflow-hidden -mt-20"
      style={{ background: "var(--bg-primary)" }}
    >
      <ContainerScroll
        titleComponent={
          <div className="space-y-5 pb-4">
            <p className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono">
              Where we are going
            </p>
            <h2
              className="font-display font-light leading-tight text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              Built for a life<br />
              <em>lived at the highest level.</em>
            </h2>
            <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              The hotels, the restaurants, the private spaces — this is the world
              Luxurianc is building. And founding members are the first to arrive.
            </p>
          </div>
        }
      >
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80"
            alt="Luxurianc — the future of luxury hospitality"
            fill
            className="object-cover object-center"
            draggable={false}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10">
            <p className="text-[0.55rem] tracking-[0.4em] uppercase text-white/50 font-mono mb-2">
              Luxurianc — The Future
            </p>
            <p className="font-display text-white text-2xl font-light italic">
              &ldquo;A global luxury hospitality group. Starting here.&rdquo;
            </p>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
