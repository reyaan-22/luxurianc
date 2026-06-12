/**
 * src/components/CTA/index.tsx
 * Luxurianc PE — full-width closing CTA
 * Dark luxury, animated border, radial glow
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";

interface CTAProps {
  eyebrow?:      string;
  heading:       string;
  subheading?:   string;
  cta:           { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  variant?:      "dark" | "light" | "gold";
}

export default function CTA({
  eyebrow      = "Private access",
  heading,
  subheading,
  cta,
  ctaSecondary,
}: CTAProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Radial olive glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(122,148,69,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top border draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 inset-x-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, var(--gold), transparent 60%)" }}
      />

      <div className="container-luxury relative z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-10"
          >
            {eyebrow}
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light leading-tight mb-10 text-[var(--text-primary)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {heading}
          </motion.h2>

          {/* Divider */}
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mb-10" />

          {/* Subheading */}
          {subheading && (
            <motion.p
              variants={fadeUpVariants}
              custom={0.3}
              className="text-[var(--text-secondary)] text-lg leading-relaxed font-light mb-14 max-w-xl mx-auto"
            >
              {subheading}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.4}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href={cta.href} className="btn-primary">
              {cta.label}
              <ArrowRight size={13} />
            </Link>
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="btn-ghost text-[var(--text-secondary)]"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute bottom-0 inset-x-0 h-px origin-right"
        style={{ background: "linear-gradient(270deg, var(--gold), transparent 60%)" }}
      />
    </section>
  );
}
