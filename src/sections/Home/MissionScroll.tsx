/**
 * src/sections/Home/MissionScroll.tsx
 * Pinned scroll section — each scroll step reveals one mission statement.
 * 5 chapters × 100vh each = 500vh total scroll.
 * The inner container stays pinned; chapters swap via useScroll + useTransform.
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    index: "01",
    statement: "Wealth is a mindset.",
    sub: "Before it is a number, before it is a portfolio, before it is a title — it is a way of thinking that most people never learn.",
  },
  {
    index: "02",
    statement: "Purpose over profit.",
    sub: "The best companies, the best lives, the best legacies — they were never built by people chasing numbers. They were built by people chasing something real.",
  },
  {
    index: "03",
    statement: "Build for legacy.",
    sub: "We are not here for the quarter. We are here for the decade. For the thing you hand down. For the name that still means something in thirty years.",
  },
  {
    index: "04",
    statement: "Refuse the ordinary.",
    sub: "There is a version of your life that follows the path laid out for you. And there is the version where you decide that is not enough. We are for the second kind.",
  },
  {
    index: "05",
    statement: "A home for visionaries.",
    sub: "Every generation of exceptional people needs a place to gather. Luxurianc is being built to be that place — the community, the spaces, the experiences.",
  },
];

const N = CHAPTERS.length; // 5

export default function MissionScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress bar
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll-hint fade
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // ── Chapter opacity & y — all pre-computed at top level ──────────
  const ch0Start = 0 / N, ch0End = 1 / N, ch0Mid = (ch0Start + ch0End) / 2;
  const ch1Start = 1 / N, ch1End = 2 / N, ch1Mid = (ch1Start + ch1End) / 2;
  const ch2Start = 2 / N, ch2End = 3 / N, ch2Mid = (ch2Start + ch2End) / 2;
  const ch3Start = 3 / N, ch3End = 4 / N, ch3Mid = (ch3Start + ch3End) / 2;
  const ch4Start = 4 / N, ch4End = 5 / N, ch4Mid = (ch4Start + ch4End) / 2;

  const opacity0 = useTransform(scrollYProgress, [ch0Start, ch0Start+0.06, ch0Mid-0.04, ch0Mid+0.04, ch0End-0.06, ch0End], [0,1,1,1,1,0]);
  const y0       = useTransform(scrollYProgress, [ch0Start, ch0Start+0.08, ch0End-0.08, ch0End], [40,0,0,-40]);
  const opacity1 = useTransform(scrollYProgress, [ch1Start, ch1Start+0.06, ch1Mid-0.04, ch1Mid+0.04, ch1End-0.06, ch1End], [0,1,1,1,1,0]);
  const y1       = useTransform(scrollYProgress, [ch1Start, ch1Start+0.08, ch1End-0.08, ch1End], [40,0,0,-40]);
  const opacity2 = useTransform(scrollYProgress, [ch2Start, ch2Start+0.06, ch2Mid-0.04, ch2Mid+0.04, ch2End-0.06, ch2End], [0,1,1,1,1,0]);
  const y2       = useTransform(scrollYProgress, [ch2Start, ch2Start+0.08, ch2End-0.08, ch2End], [40,0,0,-40]);
  const opacity3 = useTransform(scrollYProgress, [ch3Start, ch3Start+0.06, ch3Mid-0.04, ch3Mid+0.04, ch3End-0.06, ch3End], [0,1,1,1,1,0]);
  const y3       = useTransform(scrollYProgress, [ch3Start, ch3Start+0.08, ch3End-0.08, ch3End], [40,0,0,-40]);
  const opacity4 = useTransform(scrollYProgress, [ch4Start, ch4Start+0.06, ch4Mid-0.04, ch4Mid+0.04, ch4End-0.06, ch4End], [0,1,1,1,1,0]);
  const y4       = useTransform(scrollYProgress, [ch4Start, ch4Start+0.08, ch4End-0.08, ch4End], [40,0,0,-40]);

  const chapterTransforms = [
    { opacity: opacity0, y: y0 },
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
  ];

  // ── Dot opacity & scale — pre-computed at top level ──────────────
  const dotOpacity0 = useTransform(scrollYProgress, [Math.max(0, 0/N-0.05), 0/N+0.05, 1/N-0.05, Math.min(1, 1/N+0.05)], [0.15,1,1,0.15]);
  const dotScale0   = useTransform(scrollYProgress, [0/N, 0.5/N, 1/N], [1,1.8,1]);
  const dotOpacity1 = useTransform(scrollYProgress, [Math.max(0, 1/N-0.05), 1/N+0.05, 2/N-0.05, Math.min(1, 2/N+0.05)], [0.15,1,1,0.15]);
  const dotScale1   = useTransform(scrollYProgress, [1/N, 1.5/N, 2/N], [1,1.8,1]);
  const dotOpacity2 = useTransform(scrollYProgress, [Math.max(0, 2/N-0.05), 2/N+0.05, 3/N-0.05, Math.min(1, 3/N+0.05)], [0.15,1,1,0.15]);
  const dotScale2   = useTransform(scrollYProgress, [2/N, 2.5/N, 3/N], [1,1.8,1]);
  const dotOpacity3 = useTransform(scrollYProgress, [Math.max(0, 3/N-0.05), 3/N+0.05, 4/N-0.05, Math.min(1, 4/N+0.05)], [0.15,1,1,0.15]);
  const dotScale3   = useTransform(scrollYProgress, [3/N, 3.5/N, 4/N], [1,1.8,1]);
  const dotOpacity4 = useTransform(scrollYProgress, [Math.max(0, 4/N-0.05), 4/N+0.05, 5/N-0.05, Math.min(1, 5/N+0.05)], [0.15,1,1,0.15]);
  const dotScale4   = useTransform(scrollYProgress, [4/N, 4.5/N, 5/N], [1,1.8,1]);

  const dotTransforms = [
    { opacity: dotOpacity0, scale: dotScale0 },
    { opacity: dotOpacity1, scale: dotScale1 },
    { opacity: dotOpacity2, scale: dotScale2 },
    { opacity: dotOpacity3, scale: dotScale3 },
    { opacity: dotOpacity4, scale: dotScale4 },
  ];

  return (
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(122,148,69,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Progress bar — left edge */}
        <div
          className="absolute left-8 top-1/4 bottom-1/4 w-px"
          style={{ background: "var(--border)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              scaleY: barScale,
              originY: 0,
              background: "var(--gold)",
            }}
          />
        </div>

        {/* Chapter stack */}
        <div className="relative w-full max-w-4xl mx-auto px-8 md:px-20 text-center">
          {CHAPTERS.map((ch, i) => {
            const { opacity, y } = chapterTransforms[i];
            return (
              <motion.div
                key={ch.index}
                style={{ opacity, y, position: "absolute", inset: 0 }}
                className="flex flex-col items-center justify-center gap-8 px-8 md:px-20"
              >
                <span
                  className="font-mono text-[0.6rem] tracking-[0.5em] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  {ch.index} / {String(N).padStart(2, "0")}
                </span>

                <h2
                  className="font-display font-light text-[var(--text-primary)] text-center"
                  style={{
                    fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ch.statement}
                </h2>

                <span
                  className="block w-10 h-px"
                  style={{ background: "rgba(122,148,69,0.4)" }}
                />

                <p
                  className="font-light text-center leading-relaxed max-w-xl"
                  style={{
                    fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {ch.sub}
                </p>
              </motion.div>
            );
          })}

          {/* Invisible height anchor */}
          <div className="invisible py-40">
            <p className="text-5xl">placeholder</p>
            <p>sub</p>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <span
            className="text-[0.55rem] tracking-[0.35em] uppercase font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: "var(--gold)", opacity: 0.4 }}
          />
        </motion.div>

        {/* Chapter dots — right edge */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {CHAPTERS.map((_, i) => {
            const { opacity, scale } = dotTransforms[i];
            return (
              <motion.span
                key={i}
                className="block w-1 h-1 rounded-full"
                style={{
                  background: "var(--gold)",
                  opacity,
                  scale,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
