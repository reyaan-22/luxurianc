/**
 * src/sections/Home/PortfolioPreview.tsx
 * Teaser of active portfolio companies — editorial list view
 * Links to /portfolio for full view
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { portfolio } from "@/data/portfolio";

const PREVIEW = portfolio.filter((c) => c.status === "Active").slice(0, 4);

const STAGE_COLORS: Record<string, string> = {
  "Growth":      "text-emerald-400",
  "Buyout":      "text-blue-400",
  "Venture":     "text-violet-400",
  "Real Assets": "text-amber-400",
};

export default function PortfolioPreview() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-40 relative"
      style={{ background: "#0a0b08" }}
    >
      <div className="container-luxury">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <motion.p
                variants={fadeUpVariants}
                custom={0}
                className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
              >
                Active portfolio
              </motion.p>
              <motion.h2
                variants={fadeUpVariants}
                custom={0.1}
                className="font-display font-light text-[var(--text-primary)]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
              >
                Companies we&apos;ve<br />
                backed with conviction.
              </motion.h2>
            </div>
            <motion.div variants={fadeUpVariants} custom={0.2}>
              <Link
                href="/portfolio"
                className="btn-ghost text-[var(--text-secondary)] flex items-center gap-2 whitespace-nowrap"
              >
                Full portfolio
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Company list */}
          <div className="divide-y divide-[var(--border)]">
            {PREVIEW.map((company, i) => (
              <motion.div
                key={company.id}
                variants={fadeUpVariants}
                custom={0.1 + i * 0.08}
                className="group py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-0 cursor-default"
              >
                {/* Number */}
                <span className="text-[0.55rem] tracking-[0.3em] font-mono text-[var(--text-muted)] md:w-16 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-light text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors duration-300">
                    {company.name}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mt-1 font-light">
                    {company.tagline}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-8 md:gap-12 flex-shrink-0">
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--text-muted)]">
                    {company.sector}
                  </span>
                  <span className={`text-[0.6rem] tracking-[0.25em] uppercase font-mono ${STAGE_COLORS[company.stage] ?? "text-[var(--text-muted)]"}`}>
                    {company.stage}
                  </span>
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--text-muted)]">
                    {company.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.5}
            className="mt-16 pt-8 border-t border-[var(--border)] flex justify-center"
          >
            <Link href="/portfolio" className="btn-ghost text-[var(--text-secondary)]">
              View all 47 companies
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
