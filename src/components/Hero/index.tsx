/**
 * src/components/Hero/index.tsx
 * Luxurianc PE Hero — cinematic dark opener
 *
 * "Built for the exceptional."
 *
 * Lines animate in word-by-word with stagger.
 * Radial olive glow behind headline.
 * Thin horizontal rule draws across after copy.
 * Two CTAs fade in last.
 */

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
interface HeroProps {
  eyebrow?:       string;
  headline?:      string[];
  subline?:       string;
  cta?:           { label: string; href: string };
  ctaSecondary?:  { label: string; href: string };
  showScroll?:    boolean;
  centered?:      boolean;
}

// ─── Word animation helper ────────────────────────────────────
const WORD_VARIANTS = {
  hidden:  { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y:       0,
    filter:  "blur(0px)",
    transition: {
      delay,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function AnimatedLine({ text, baseDelay }: { text: string; baseDelay: number }) {
  const words = text.split(" ");
  return (
    <span className="block overflow-hidden leading-[1.05]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={WORD_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={baseDelay + i * 0.07}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────
export default function Hero({
  eyebrow      = "Private Investment Group",
  headline     = ["Built for", "the exceptional."],
  subline      = "We partner with exceptional founders building companies that endure.",
  cta          = { label: "Apply for Access", href: "/access"  },
  ctaSecondary = { label: "Our Philosophy",   href: "/about"   },
  showScroll   = true,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yShift   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Radial olive glow — dead center behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 52%, rgba(122,148,69,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Very subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(240,239,233,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(240,239,233,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: yShift, opacity }}
        className="relative z-10 container-luxury text-center max-w-5xl mx-auto px-6"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[0.6rem] uppercase font-mono mb-10 text-[var(--text-muted)]"
          style={{ letterSpacing: "0.45em" }}
        >
          {eyebrow}
        </motion.p>

        {/* Headline */}
        <h1
          className="font-display font-light text-[var(--text-primary)] mb-0"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", lineHeight: 1.0 }}
        >
          {headline.map((line, i) => (
            <AnimatedLine
              key={i}
              text={line}
              baseDelay={0.35 + i * 0.35}
            />
          ))}
        </h1>

        {/* Animated horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="h-px my-10 mx-auto max-w-xs origin-left"
          style={{
            background: "linear-gradient(90deg, var(--gold), transparent)",
          }}
        />

        {/* Brand descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.4 }}
          className="text-[0.6rem] tracking-[0.35em] uppercase font-mono text-[var(--gold)] mb-6"
        >
          Luxurianc — Private Investment Group
        </motion.p>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.55 }}
          className="text-[var(--text-secondary)] text-base md:text-lg max-w-lg mx-auto leading-relaxed font-light mb-14"
        >
          {subline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={cta.href} className="btn-primary">
            {cta.label}
            <ArrowRight size={13} />
          </Link>
          <Link href={ctaSecondary.href} className="btn-ghost text-[var(--text-secondary)]">
            {ctaSecondary.label}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
