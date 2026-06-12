/**
 * src/sections/Home/FutureVision.tsx
 * Where Luxurianc is going — hotels, fine dining, members' spaces
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

const PILLARS = [
  {
    number: "01",
    title:  "Luxury Hotels",
    body:   "Properties that define their cities. Environments designed to make you feel exactly who you want to become. Every detail considered. Every surface earned.",
    tag:    "Coming",
  },
  {
    number: "02",
    title:  "Fine Dining",
    body:   "Restaurants worth traveling for. Food, atmosphere, and presence — the three things that tell you immediately whether a place understands excellence.",
    tag:    "Coming",
  },
  {
    number: "03",
    title:  "Members' Spaces",
    body:   "Private clubs where the most ambitious people gather. Not a co-working space. Not a lounge. A home for people who hold themselves to a different standard.",
    tag:    "Coming",
  },
  {
    number: "04",
    title:  "The Community",
    body:   "Before the properties and the restaurants — there is this. A founding community of people who were here before anyone else. That is where it starts.",
    tag:    "Open Now",
    open:   true,
    href:   "/#join",
  },
];

export default function FutureVision() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      className="py-20 relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-luxury">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
            <div>
              <motion.p
                variants={fadeUpVariants}
                custom={0}
                className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
              >
                The long-term vision
              </motion.p>
              <motion.h2
                variants={fadeUpVariants}
                custom={0.1}
                className="font-display font-light text-[var(--text-primary)]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
              >
                A global luxury<br />
                hospitality empire.
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className="text-[var(--text-secondary)] text-base leading-relaxed font-light max-w-md"
            >
              Inspired by Four Seasons, Nobu, and the finest private members&apos;
              clubs in the world. We are building toward this — and the community
              we gather now will be the first to experience it.
            </motion.p>
          </div>

          {/* Pillar grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                variants={fadeUpVariants}
                custom={0.1 + i * 0.08}
                className="p-10 md:p-12 relative group overflow-hidden rounded-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Large watermark number */}
                <span
                  className="absolute top-8 right-10 font-mono leading-none font-light pointer-events-none select-none"
                  style={{
                    fontSize: "6rem",
                    color: "var(--gold)",
                    opacity: 0.12,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {pillar.number}
                </span>

                {/* Tag */}
                <span
                  className={cn(
                    "inline-block mb-6 px-3 py-1 rounded-full text-[0.55rem] tracking-[0.25em] uppercase font-mono border",
                    pillar.open
                      ? "text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold)]/5"
                      : "text-[var(--text-muted)] border-[var(--border)]"
                  )}
                >
                  {pillar.tag}
                </span>

                <h3 className="font-display text-2xl font-light text-[var(--text-primary)] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                  {pillar.body}
                </p>

                {pillar.open && pillar.href && (
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 mt-8 text-[0.65rem] tracking-[0.2em] uppercase font-mono text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                  >
                    Join the founding community
                    <ArrowRight size={12} />
                  </Link>
                )}

                {/* Bottom olive hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 origin-left rounded-full"
                  style={{ background: "var(--gold)", width: "100%" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// cn helper inline to avoid import issues
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
