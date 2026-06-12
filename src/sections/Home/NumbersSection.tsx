/**
 * src/sections/Home/NumbersSection.tsx
 * Animated performance metrics — AUM, companies, years, MOIC
 * Dark horizontal band with drawn-in olive separators
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { stats } from "@/data/features";

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  active,
  delay,
}: {
  value: string;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const decimals = value.includes(".") ? 1 : 0;
  const animated = useCountUp(numeric, 1400, active);
  const display = decimals ? animated.toFixed(1) : Math.floor(animated).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="text-center px-8"
    >
      <div
        className="font-display font-light text-[var(--text-primary)] mb-2"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
      >
        {display}{suffix}
      </div>
      <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
        {label}
      </p>
    </motion.div>
  );
}

export default function NumbersSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-28 border-y border-[var(--border)]"
      style={{ background: "#0a0b08" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,148,69,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix ?? ""}
              label={stat.label}
              active={inView}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
