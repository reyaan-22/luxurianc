/**
 * src/sections/Home/FlxshTeaser.tsx
 * FLXSH — Luxurianc clothing sub-brand teaser.
 * Minimalist editorial reveal with notify-me CTA.
 */

"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

type NotifyStatus = "idle" | "loading" | "done" | "exists";

export default function FlxshTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inViewRef, inView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NotifyStatus>("idle");

  // Parallax on the wordmark
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/flxsh-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.error === "already_registered" ? "exists" : "done");
    } catch {
      setStatus("done"); // optimistic
    }
  };

  return (
    <section
      id="flxsh"
      ref={(el) => {
        sectionRef.current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 inset-x-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }}
      />

      {/* Sub-brand tag — top right */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-8 right-8 text-[0.55rem] tracking-[0.45em] uppercase font-mono text-[var(--gold)] opacity-60"
      >
        A Luxurianc brand
      </motion.p>

      <div className="container-luxury relative z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >

          {/* Season label */}
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.55rem] tracking-[0.5em] uppercase font-mono text-[var(--text-muted)] mb-10"
          >
            First Collection · 2026
          </motion.p>

          {/* FLXSH wordmark */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              style={{ y: wordmarkY, fontSize: "clamp(5rem, 18vw, 15rem)", letterSpacing: "-0.03em" }}
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-light text-[var(--text-primary)] leading-none select-none"
            >
              FLXSH
            </motion.h2>
          </div>

          {/* Descriptor row */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.25}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <p
              className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Quiet. Precise. Unapologetically rare.
              <br />
              Clothing that says nothing — and everything.
            </p>

            <p className="text-[0.6rem] tracking-[0.35em] uppercase font-mono text-[var(--text-muted)]">
              Minimalist editorial / Limited runs
            </p>
          </motion.div>

          {/* Horizontal rule */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.3}
            className="w-full h-px mb-16"
            style={{ background: "var(--border)" }}
          />

          {/* Notify CTA */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.35}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10"
          >
            <div className="space-y-2">
              <p className="text-[var(--text-primary)] font-light" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
                Be first to know.
              </p>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Drop access only. No restocks.
              </p>
            </div>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                <p className="text-sm font-light text-[var(--text-primary)] tracking-wide">
                  You&apos;re on the list.
                </p>
              </motion.div>
            ) : status === "exists" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] opacity-50" />
                <p className="text-sm font-light text-[var(--text-secondary)] tracking-wide">
                  Already registered.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleNotify}
                className="flex items-center gap-0 w-full sm:w-auto max-w-sm"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="
                    flex-1 px-5 py-3.5 text-sm bg-white/[0.05] backdrop-blur-sm
                    border border-white/[0.12] border-r-0
                    rounded-l-full text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-[var(--gold)]/40
                    transition-colors duration-300
                  "
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="
                    flex items-center gap-2 px-6 py-3.5 text-xs font-medium
                    tracking-[0.15em] uppercase rounded-r-full
                    bg-[var(--gold)] text-[#0a0800]
                    hover:bg-[#b8963e] transition-colors duration-300
                    disabled:opacity-60 whitespace-nowrap
                  "
                >
                  {status === "loading" ? (
                    <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Notify me <ArrowUpRight size={12} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute bottom-0 inset-x-0 h-px origin-right"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }}
      />
    </section>
  );
}
