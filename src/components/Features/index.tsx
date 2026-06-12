/**
 * src/components/Features/index.tsx
 * Brand differentiator grid with animated stat counters.
 * – Scroll-triggered entrance via useInView
 * – Individual card hover lifts
 * – Icon + stat + description layout
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hammer, Star, Leaf, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants, cardHoverVariants } from "@/lib/animations";
import type { Feature } from "@/types";

// Map icon name strings to Lucide components
const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Hammer:   Hammer,
  Star:     Star,
  History:  BookOpen, // fallback
  Leaf:     Leaf,
};

// ── Animated counter hook ────────────────────────────────────
function useCounter(target: string, active: boolean) {
  const numeric = parseInt(target.replace(/\D/g, ""), 10) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.round(numeric / (duration / 16)));
    const id = setInterval(() => {
      start += step;
      if (start >= numeric) { setCount(numeric); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [active, numeric]);

  return count;
}

// ── Single Feature Card ──────────────────────────────────────
function FeatureCard({ feature, index, active }: { feature: Feature; index: number; active: boolean }) {
  const Icon  = ICON_MAP[feature.icon] ?? Star;
  const count = useCounter(feature.stat ?? "0", active);
  const hasPrefix = feature.stat?.startsWith("1887");

  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index * 0.1}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={cardHoverVariants}
        className={cn(
          "glass-card rounded-3xl p-8 h-full",
          "flex flex-col gap-6 cursor-default"
        )}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
          <Icon size={22} className="text-gold-500" />
        </div>

        {/* Stat */}
        {feature.stat && (
          <div>
            <p className="font-display text-5xl font-light text-gradient-gold leading-none">
              {hasPrefix ? feature.stat : count + (feature.stat?.replace(/\d/g, "") ?? "")}
            </p>
            {feature.statLabel && (
              <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mt-1">
                {feature.statLabel}
              </p>
            )}
          </div>
        )}

        {/* Text */}
        <div className="space-y-2">
          <h3 className="font-display text-xl font-medium">{feature.title}</h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
interface FeaturesProps {
  features: Feature[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export default function Features({
  features,
  eyebrow    = "Why Luxurianc",
  heading    = "Built on four unbreakable principles",
  subheading = "We don't compete on price or volume. We compete on something far harder to replicate — an absolute refusal to compromise.",
}: FeaturesProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/3 blur-3xl pointer-events-none" />

      <div className="container-luxury">
        {/* Section header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeUpVariants} custom={0} className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-4 font-mono">
            ✦ {eyebrow} ✦
          </motion.p>
          <motion.h2 variants={fadeUpVariants} custom={0.1} className="font-display text-4xl md:text-5xl font-light">
            {heading}
          </motion.h2>
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mt-6 mb-6" />
          <motion.p variants={fadeUpVariants} custom={0.3} className="text-[var(--text-secondary)] text-lg leading-relaxed">
            {subheading}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} active={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
