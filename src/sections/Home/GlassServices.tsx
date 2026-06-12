/**
 * src/sections/Home/GlassServices.tsx
 * Investment pillars over cinematic background — liquid glass cards
 */

"use client";

import { motion } from "framer-motion";
import { Shield, Gem, Crown, BarChart3 } from "lucide-react";
import { GlassFilter, GlassCard } from "@/components/ui/liquid-glass";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";
import { services } from "@/data/services";

const ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  Shield, Gem, Crown, Palette: BarChart3,
};

export default function GlassServices() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=75')",
        backgroundSize:       "cover",
        backgroundPosition:   "center",
        backgroundAttachment: "fixed",
      }}
    >
      <GlassFilter />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(8,9,6,0.72)" }} />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mb-20"
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
          >
            Investment pillars
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Four ways we deploy<br />
            permanent capital.
          </motion.h2>
        </motion.div>

        {/* Glass cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Gem;
            return (
              <motion.div
                key={service.id}
                variants={fadeUpVariants}
                custom={i * 0.1}
              >
                <GlassCard
                  icon={<Icon size={18} />}
                  title={service.title}
                  subtitle={service.subtitle}
                  className="h-full hover:scale-[1.02] transition-transform duration-500"
                >
                  <p className="text-sm leading-relaxed text-white/70 mt-2">
                    {service.description.slice(0, 100)}…
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.slice(0, 3).map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-[11px] tracking-wide text-white/60"
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
