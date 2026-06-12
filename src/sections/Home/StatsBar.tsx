/**
 * src/sections/Home/StatsBar.tsx
 * Horizontal stats bar with animated counters.
 * Sits immediately below the hero as a trust signal.
 */

"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";
import { stats } from "@/data/features";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, active }: { value: string; active: boolean }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || isNaN(numeric)) return;
    let n = 0;
    const step     = Math.max(1, Math.round(numeric / 60));
    const interval = setInterval(() => {
      n += step;
      if (n >= numeric) { setDisplay(numeric); clearInterval(interval); }
      else setDisplay(n);
    }, 16);
    return () => clearInterval(interval);
  }, [active, numeric]);

  if (isNaN(numeric)) return <>{value}</>;
  return <>{display}</>;
}

export default function StatsBar() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="border-y border-[var(--border)] bg-[var(--bg-secondary)]"
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-luxury py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUpVariants}
            custom={i * 0.1}
            className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-[var(--border)] px-4"
          >
            <p className="font-display text-4xl md:text-5xl font-light text-gradient-gold">
              <AnimatedNumber value={stat.value} active={inView} />
              {stat.suffix}
            </p>
            <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
