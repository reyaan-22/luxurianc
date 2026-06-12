/**
 * src/sections/Home/PrivateAccessTeaser.tsx
 * Invitation-only section teaser — dark, editorial, with animated olive accent
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

export default function PrivateAccessTeaser() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-40 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Asymmetric olive glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 70% 40%, rgba(122,148,69,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container-luxury relative z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-12"
          >
            Invitation only
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light text-[var(--text-primary)] mb-8"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.0 }}
          >
            Access is earned,<br />
            <span style={{ color: "var(--gold)" }}>not purchased.</span>
          </motion.h2>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="h-px mb-12 origin-left"
            style={{ width: "200px", background: "linear-gradient(90deg, var(--gold), transparent)" }}
          />

          <motion.p
            variants={fadeUpVariants}
            custom={0.3}
            className="text-[var(--text-secondary)] text-lg leading-relaxed font-light max-w-2xl mb-16"
          >
            Luxurianc does not accept unsolicited applications. We extend
            invitations to founders, operators, and capital allocators we have
            identified directly — or been introduced to by someone we trust.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            custom={0.4}
            className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xl mb-12"
          >
            If you believe there is a fit, you are welcome to introduce yourself.
            We read every message. We respond to the relevant few.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            custom={0.5}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link href="/access" className="btn-primary">
              Introduce Yourself
              <ArrowRight size={13} />
            </Link>
            <Link href="/about" className="btn-ghost text-[var(--text-secondary)]">
              Learn About Our Process
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
