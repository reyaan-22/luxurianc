/**
 * src/sections/About/index.tsx
 * About — Reyaan Vig & the Luxurianc story
 */

"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants, slideLeftVariants } from "@/lib/animations";
import CTA from "@/components/CTA";

const values = [
  {
    title: "Excellence",
    body:  "Not as a standard to meet, but as a way of being. Every decision, every detail, every interaction — held to the highest bar we can imagine.",
  },
  {
    title: "Freedom",
    body:  "True wealth is the freedom to create, build, and live on your own terms. That belief is at the foundation of everything Luxurianc stands for.",
  },
  {
    title: "Vision",
    body:  "We are drawn to people who see beyond what already exists. The ones who don't just adapt to the world — they build a new one.",
  },
  {
    title: "Discretion",
    body:  "The most important conversations happen privately. We protect the trust of everyone in our circle, absolutely and without exception.",
  },
];

const milestones = [
  {
    marker: "The Beginning",
    body:   "Reyaan Vig founded Luxurianc with a single conviction: there was no true home for a new generation of visionaries — people with bold ideas, refined taste, and an unwavering desire to build something meaningful.",
  },
  {
    marker: "The Movement",
    body:   "Luxurianc was never meant to be just a brand. From day one it was designed as the foundation of a movement — bringing together individuals who believe that true wealth is financial, personal, intellectual, and cultural.",
  },
  {
    marker: "The Community",
    body:   "The long-term vision: a private community where the most ambitious people can connect, grow, and shape the future together. Not a network. A home.",
  },
  {
    marker: "The Group",
    body:   "Beyond community — a world-class hospitality and investment group. Inspired by the elegance, exclusivity, and standards of the finest institutions in the world. This is where we are going.",
  },
];

export default function AboutSection() {
  const [storyRef,  storyInView]  = useInView<HTMLDivElement>();
  const [valuesRef, valuesInView] = useInView<HTMLDivElement>();
  const [roadRef,   roadInView]   = useInView<HTMLDivElement>();

  return (
    <>
      {/* ── Hero band ── */}
      <section
        className="pt-48 pb-32 relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 35% 55%, rgba(122,148,69,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container-luxury relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-10"
          >
            The founder
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display font-light text-[var(--text-primary)]"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.0 }}
          >
            Built by someone<br />
            <em>who refused to wait.</em>
          </motion.h1>
        </div>
      </section>

      {/* ── Founder story ── */}
      <section className="py-32" style={{ background: "var(--bg-primary)" }}>
        <div className="container-luxury">
          <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Text */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.p
                variants={fadeUpVariants}
                custom={0}
                className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono"
              >
                Reyaan Vig — Founder & CEO
              </motion.p>

              <motion.h2
                variants={fadeUpVariants}
                custom={0.1}
                className="font-display font-light text-[var(--text-primary)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                He didn&apos;t see wealth as money.<br />
                He saw it as freedom.
              </motion.h2>

              <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mr-auto" />

              <motion.p
                variants={fadeUpVariants}
                custom={0.3}
                className="text-[var(--text-secondary)] leading-relaxed font-light"
              >
                From a young age, Reyaan Vig was driven by a vision bigger than
                himself. While others measured success in numbers, he measured it in
                freedom — the freedom to create, to build, and to live entirely on
                his own terms.
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                custom={0.4}
                className="text-[var(--text-secondary)] leading-relaxed font-light"
              >
                He admired people who dared to dream in full scale. Who embraced
                struggle as part of the journey, not an obstacle to it. And as he
                grew, he noticed something: there was no real home for this new
                generation of visionaries. People with bold ideas, refined taste,
                and an unwillingness to build anything ordinary.
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                custom={0.5}
                className="text-[var(--text-secondary)] leading-relaxed font-light"
              >
                That gap became Luxurianc.
              </motion.p>
            </motion.div>

            {/* Visual block */}
            <motion.div
              variants={slideLeftVariants}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              custom={0.2}
              className="relative lg:sticky lg:top-32"
            >
              <div
                className="rounded-2xl p-12 relative overflow-hidden"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                {/* Olive glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(122,148,69,0.08) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 space-y-10">
                  {/* Name mark */}
                  <div>
                    <p className="font-display text-4xl font-light text-[var(--text-primary)]">
                      Reyaan Vig
                    </p>
                    <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--gold)] font-mono mt-2">
                      Founder & CEO, Luxurianc
                    </p>
                  </div>

                  <div
                    className="h-px"
                    style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
                  />

                  {/* Quote */}
                  <blockquote className="font-display text-xl font-light italic text-[var(--text-primary)] leading-relaxed">
                    &ldquo;Success is a journey, not a destination — and the greatest
                    legacy belongs to those who dare to dream beyond what already
                    exists.&rdquo;
                  </blockquote>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    {[
                      { n: "1",  label: "Founder" },
                      { n: "∞",  label: "Vision"  },
                    ].map(({ n, label }) => (
                      <div key={label}>
                        <p className="font-display text-3xl font-light text-[var(--gold)]">{n}</p>
                        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--text-muted)] font-mono mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What we stand for ── */}
      <section
        className="py-32"
        style={{ background: "#0a0b08" }}
      >
        <div className="container-luxury">
          <motion.div
            ref={valuesRef}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            <div className="max-w-2xl mb-20">
              <motion.p
                variants={fadeUpVariants}
                custom={0}
                className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
              >
                What we stand for
              </motion.p>
              <motion.h2
                variants={fadeUpVariants}
                custom={0.1}
                className="font-display font-light text-[var(--text-primary)]"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
              >
                True wealth is financial,<br />
                personal, intellectual, cultural.
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUpVariants}
                  custom={0.1 + i * 0.1}
                  className="p-12 md:p-14 space-y-5 relative group"
                  style={{ background: "#0a0b08" }}
                >
                  <span
                    className="absolute top-10 right-10 font-display text-[4rem] font-light pointer-events-none select-none leading-none"
                    style={{ color: "rgba(122,148,69,0.05)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-light text-[var(--gold)]">
                    {v.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                    {v.body}
                  </p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-px origin-left"
                    style={{ background: "var(--gold)", width: "100%" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The Road Ahead ── */}
      <section className="py-32" style={{ background: "var(--bg-primary)" }}>
        <div className="container-luxury max-w-3xl">
          <div ref={roadRef}>
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={roadInView ? "visible" : "hidden"}
            >
              <div className="mb-20">
                <motion.p
                  variants={fadeUpVariants}
                  custom={0}
                  className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-8"
                >
                  The vision
                </motion.p>
                <motion.h2
                  variants={fadeUpVariants}
                  custom={0.1}
                  className="font-display font-light text-[var(--text-primary)]"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
                >
                  This is only<br />
                  the beginning.
                </motion.h2>
              </div>

              <div className="relative pl-8 border-l border-[var(--border)]">
                {milestones.map((item, i) => (
                  <motion.div
                    key={item.marker}
                    variants={fadeUpVariants}
                    custom={i * 0.12}
                    className="relative mb-14 last:mb-0"
                  >
                    {/* Olive dot */}
                    <div
                      className="absolute -left-[calc(2rem+4px)] top-1.5 w-2 h-2 rounded-full"
                      style={{ background: "var(--gold)" }}
                    />

                    <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--gold)] font-mono mb-3">
                      {item.marker}
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed font-light text-sm">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA
        eyebrow="Join the movement"
        heading="Built for those who refuse to settle."
        subheading="If this resonates, you already know who you are. We'd like to meet you."
        cta={{ label: "Apply for Access", href: "/access" }}
        ctaSecondary={{ label: "Our Investment Approach", href: "/services" }}
        variant="dark"
      />
    </>
  );
}
