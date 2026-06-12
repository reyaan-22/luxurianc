/**
 * src/sections/Home/ServicesGrid.tsx
 * Bento-style service cards on the home page.
 * Each card links to the full service page.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Gem, Crown, Shield, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants, cardHoverVariants } from "@/lib/animations";
import { services } from "@/data/services";

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Palette: Palette,
  Gem:     Gem,
  Crown:   Crown,
  Shield:  Shield,
};

export default function ServicesGrid() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container-luxury">

        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeUpVariants} custom={0} className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-4 font-mono">
            ✦ What we offer ✦
          </motion.p>
          <motion.h2 variants={fadeUpVariants} custom={0.1} className="font-display text-4xl md:text-5xl font-light">
            Services curated for the singular few
          </motion.h2>
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mt-6 mb-6" />
          <motion.p variants={fadeUpVariants} custom={0.3} className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Four pillars. Each one a discipline unto itself. Together they form a
            complete vision of modern luxury.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Gem;

            return (
              <motion.div
                key={service.id}
                variants={fadeUpVariants}
                custom={i * 0.12}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div variants={cardHoverVariants}>
                  <Link
                    href={service.href}
                    className={cn(
                      "group block glass-card rounded-3xl p-10 h-full",
                      "bg-gradient-to-br",
                      service.gradient,
                      "border border-[var(--border)]",
                      "transition-colors duration-300"
                    )}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                        <Icon size={26} className="text-gold-500" />
                      </div>
                      <span className={cn(
                        "w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center",
                        "text-[var(--text-muted)] group-hover:text-gold-500 group-hover:border-gold-500/40",
                        "transition-all duration-300"
                      )}>
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                      <p className="text-xs tracking-widest uppercase text-gold-500/70 font-mono">
                        {service.subtitle}
                      </p>
                      <h3 className="font-display text-2xl font-medium">
                        {service.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Feature tags */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feat) => (
                        <span
                          key={feat}
                          className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-ghost text-xs">
            View all services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
