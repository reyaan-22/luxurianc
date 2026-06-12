/**
 * src/sections/Home/FounderMessage.tsx
 * Personal letter from Reyaan Vig — the why behind Luxurianc
 */

"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

export default function FounderMessage() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20 relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Radial glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 20% 50%, rgba(122,148,69,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — label + attribution */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <motion.p
              variants={fadeUpVariants}
              custom={0}
              className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono"
            >
              A message from the founder
            </motion.p>

            <motion.div variants={fadeUpVariants} custom={0.1} className="space-y-2">
              <p className="font-display text-4xl font-light text-[var(--text-primary)]">
                Reyaan Vig
              </p>
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
                Founder & CEO — Luxurianc.co
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              custom={0.2}
              className="h-px"
              style={{ background: "linear-gradient(90deg, var(--gold), transparent)", width: "120px" }}
            />

            <motion.p
              variants={fadeUpVariants}
              custom={0.3}
              className="text-[var(--text-muted)] text-sm leading-relaxed font-light"
            >
              Luxurianc is not what most people build first. Most start with a
              product, a service, a pitch deck. I started with a belief —
              that there is a generation of people who deserve a home that
              matches how seriously they take their ambitions.
            </motion.p>

            <motion.p
              variants={fadeUpVariants}
              custom={0.35}
              className="text-[var(--text-muted)] text-sm leading-relaxed font-light"
            >
              You are early. Being early is everything.
            </motion.p>
          </motion.div>

          {/* Right — the actual letter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-10 md:p-14 space-y-7 relative overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-6 right-8 font-display text-[8rem] leading-none pointer-events-none select-none"
                style={{ color: "rgba(122,148,69,0.06)" }}
              >
                &ldquo;
              </span>

              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light relative z-10">
                I grew up obsessed with ambition — not money, but what money
                represents when it&apos;s built with intention. The freedom to
                create. The ability to shape your environment. A life lived
                entirely on your own terms.
              </p>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                I looked around and couldn&apos;t find a community that held
                that standard. Every space I found was either too corporate,
                too casual, or built for people who had already arrived — not
                for people in the process of building something worth arriving for.
              </p>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                So I built Luxurianc. Not as a brand first — as a belief.
                That wealth is a mindset before it&apos;s a number. That
                purpose comes before profit. That the greatest things are
                built by people who refused to accept the ordinary.
              </p>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light">
                The hotels, the restaurants, the private spaces — they&apos;re
                coming. But right now, this community is where it starts.
                And the people who are here at the beginning will always be
                the ones who helped build it.
              </p>

              <div className="pt-4 border-t border-[var(--border)]">
                <p className="font-display text-xl font-light italic text-[var(--text-primary)]">
                  Reyaan Vig
                </p>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--text-muted)] font-mono mt-1">
                  Founder, Luxurianc
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
