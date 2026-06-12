/**
 * src/sections/Portfolio/index.tsx
 * Full portfolio page — filterable company list
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";
import { portfolio, type PortfolioCompany } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const STAGES = ["All", "Venture", "Growth", "Buyout", "Real Assets"] as const;

const STAGE_DOT: Record<string, string> = {
  Growth:        "bg-emerald-400",
  Buyout:        "bg-blue-400",
  Venture:       "bg-violet-400",
  "Real Assets": "bg-amber-400",
};

export default function PortfolioSection() {
  const [filter, setFilter] = useState<string>("All");
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });

  const displayed = filter === "All"
    ? portfolio
    : portfolio.filter((c) => c.stage === filter);

  return (
    <>
      {/* Hero band */}
      <section
        className="pt-48 pb-32 relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(122,148,69,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container-luxury relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-10"
          >
            Active & exited investments
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display font-light text-[var(--text-primary)]"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.0 }}
          >
            The Portfolio.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-8 text-[var(--text-secondary)] text-lg leading-relaxed font-light max-w-2xl"
          >
            Forty-seven companies across private equity, venture capital, and real
            assets. Each one selected with conviction. None managed from a distance.
          </motion.p>
        </div>
      </section>

      {/* Filter + list */}
      <section
        ref={ref}
        className="py-24"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="container-luxury">
          {/* Stage filters */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap gap-3 mb-16"
          >
            {STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => setFilter(stage)}
                className={cn(
                  "px-5 py-2 rounded-full text-[0.6rem] tracking-[0.2em] uppercase font-mono transition-all duration-300 border",
                  filter === stage
                    ? "bg-[var(--gold)] text-white border-[var(--gold)]"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/40 hover:text-[var(--text-primary)]"
                )}
              >
                {stage}
              </button>
            ))}
            <span className="ml-auto text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)] font-mono self-center">
              {displayed.length} companies
            </span>
          </motion.div>

          {/* Companies */}
          <div className="divide-y divide-[var(--border)]">
            <AnimatePresence mode="popLayout">
              {displayed.map((company, i) => (
                <CompanyRow key={company.id} company={company} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function CompanyRow({ company, index }: { company: PortfolioCompany; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-0"
    >
      {/* Index */}
      <span className="text-[0.55rem] tracking-[0.3em] font-mono text-[var(--text-muted)] md:w-16 flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Stage dot */}
      <div className="md:w-8 flex-shrink-0 flex items-center justify-center">
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            STAGE_DOT[company.stage] ?? "bg-[var(--text-muted)]"
          )}
        />
      </div>

      {/* Name + tagline */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl md:text-2xl font-light text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors duration-300">
          {company.name}
        </h3>
        <p className="text-[var(--text-muted)] text-sm mt-1 font-light">
          {company.tagline}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-8 md:gap-12 flex-shrink-0 flex-wrap">
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--text-muted)]">
          {company.sector}
        </span>
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--text-muted)]">
          {company.region}
        </span>
        <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--text-muted)]">
          {company.year}
        </span>
        {company.moic && (
          <span className="text-[0.6rem] tracking-[0.25em] uppercase font-mono text-[var(--gold)]">
            {company.moic} MOIC
          </span>
        )}
        <span
          className={cn(
            "text-[0.6rem] tracking-[0.2em] uppercase font-mono px-3 py-1 rounded-full border",
            company.status === "Active"
              ? "text-emerald-400 border-emerald-400/20"
              : "text-[var(--text-muted)] border-[var(--border)]"
          )}
        >
          {company.status}
        </span>
      </div>
    </motion.div>
  );
}
