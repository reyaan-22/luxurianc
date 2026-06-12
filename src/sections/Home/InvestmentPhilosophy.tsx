/**
 * src/sections/Home/InvestmentPhilosophy.tsx
 * Four investment philosophy pillars — Patience, Selectivity, Conviction, Partnership
 * Editorial dark layout with card grid
 */

"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { features } from "@/data/features";

export default function InvestmentPhilosophy() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-40 relative"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="container-luxury">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <div className="max-w-3xl mb-20">
            <motion.p
              variants={fadeUpVariants}
              custom={0}
              className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
            >
              How we invest
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display font-light text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
            >
              Principles built over<br />
              two decades of investing.
            </motion.h2>
          </div>

          {/* Philosophy grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]">
            {features.map((feat, i) => (
              <motion.div
                key={feat.id}
                variants={fadeUpVariants}
                custom={0.1 + i * 0.1}
                className="p-12 md:p-16 relative group"
                style={{ background: "var(--bg-primary)" }}
              >
                {/* Index number */}
                <span
                  className="absolute top-10 right-12 font-display text-[4rem] leading-none font-light pointer-events-none select-none"
                  style={{ color: "rgba(122,148,69,0.06)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Stat */}
                <div
                  className="font-display font-light text-[var(--gold)] mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1 }}
                >
                  {feat.stat}
                </div>
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-8">
                  {feat.statLabel}
                </p>

                <h3 className="font-display text-2xl font-light text-[var(--text-primary)] mb-4">
                  {feat.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                  {feat.description}
                </p>

                {/* Bottom olive accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px origin-left"
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
