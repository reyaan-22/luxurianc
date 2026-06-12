/**
 * src/components/ui/text-reveal.tsx
 * Scroll-driven word-by-word text reveal.
 * Each word fades from near-invisible to full opacity as you scroll.
 * Used in BrandStatement section between hero and services.
 */

"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────
interface TextRevealByWordProps {
  text:      string;
  className?: string;
}

interface WordProps {
  children:  ReactNode;
  progress:  MotionValue<number>;
  range:     [number, number];
}

// ─── Single animated word ─────────────────────────────────────
const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-2">
      {/* Ghost – provides layout space */}
      <span className="absolute opacity-[0.12] select-none">{children}</span>
      {/* Animated reveal */}
      <motion.span
        style={{ opacity }}
        className="text-[var(--text-primary)]"
      >
        {children}
      </motion.span>
    </span>
  );
};

// ─── Main component ───────────────────────────────────────────
const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target:  targetRef,
    offset:  ["start 0.9", "end 0.25"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[180vh]", className)}
    >
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-5xl items-center px-6 py-20">
        <p className="flex flex-wrap font-display font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed">
          {words.map((word, i) => {
            const start = i / words.length;
            const end   = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export { TextRevealByWord };
