/**
 * src/components/Testimonials/index.tsx
 * Infinite marquee / manual carousel for client testimonials.
 * – Auto-plays with pause-on-hover
 * – Accessible with prev/next controls
 * – Stars rendered dynamically per rating
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";
import type { Testimonial } from "@/types";

// ── Star rating ──────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={cn(
            i < rating ? "fill-gold-500 text-gold-500" : "text-[var(--border)]"
          )}
        />
      ))}
    </div>
  );
}

// ── Quote mark SVG ───────────────────────────────────────────
function QuoteMark() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-gold-500/30">
      <path
        d="M0 24V14.4C0 10.56 0.8 7.2 2.4 4.32C4 1.44 6.48 0 9.84 0L11.52 2.88C9.6 3.36 8.08 4.44 6.96 6.12C5.84 7.8 5.28 9.6 5.28 11.52H10.56V24H0ZM20.48 24V14.4C20.48 10.56 21.28 7.2 22.88 4.32C24.48 1.44 26.96 0 30.32 0L32 2.88C30.08 3.36 28.56 4.44 27.44 6.12C26.32 7.8 25.76 9.6 25.76 11.52H31.04V24H20.48Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
interface TestimonialsProps {
  testimonials: Testimonial[];
  eyebrow?: string;
  heading?: string;
}

export default function Testimonials({
  testimonials,
  eyebrow = "Client voices",
  heading = "Heard from those who know",
}: TestimonialsProps) {
  const [active,     setActive]     = useState(0);
  const [direction,  setDirection]  = useState(1); // 1 = forward, -1 = backward
  const [paused,     setPaused]     = useState(false);
  const intervalRef                  = useRef<NodeJS.Timeout | null>(null);
  const [ref, inView]               = useInView<HTMLElement>();

  const count = testimonials.length;

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + count) % count);
  };

  // Auto-advance
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => navigate(1), 5000);
    }
    return () => clearInterval(intervalRef.current ?? undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, active]);

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  const current = testimonials[active];

  return (
    <section
      ref={ref}
      className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-500/4 blur-3xl pointer-events-none" />

      <div className="container-luxury">
        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUpVariants} custom={0} className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-4 font-mono">
            ✦ {eyebrow} ✦
          </motion.p>
          <motion.h2 variants={fadeUpVariants} custom={0.1} className="font-display text-4xl md:text-5xl font-light">
            {heading}
          </motion.h2>
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mt-6" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center text-center gap-6 px-4 md:px-12"
              >
                <QuoteMark />
                <StarRating rating={current.rating} />

                <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)] italic">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="space-y-1">
                  <p className="font-medium text-sm text-[var(--text-primary)]">{current.name}</p>
                  <p className="text-xs text-[var(--text-muted)] tracking-wide">
                    {current.role} · {current.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 h-1.5 bg-gold-500"
                      : "w-1.5 h-1.5 bg-[var(--border)] hover:bg-gold-500/50"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
