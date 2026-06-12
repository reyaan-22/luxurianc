/**
 * src/sections/Vision/index.tsx
 * The long-term vision of Luxurianc — where this is all going.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

// ─── Data ─────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    title:  "Luxury Hotels",
    body:   "Properties that define their cities. Not just a place to stay — an environment that makes you feel exactly who you want to become. Every surface considered. Every experience intentional.",
    status: "Building toward",
    eta:    "Phase III",
  },
  {
    number: "02",
    title:  "Fine Dining",
    body:   "Restaurants worth traveling for. Where food, atmosphere, and presence converge into something you remember. We are studying the greats — and building something that belongs among them.",
    status: "Building toward",
    eta:    "Phase III",
  },
  {
    number: "03",
    title:  "Members' Spaces",
    body:   "Private clubs where the most ambitious people in the world gather. Not a co-working space. Not a lounge. A home for people who hold themselves to a different standard entirely.",
    status: "Building toward",
    eta:    "Phase II",
  },
  {
    number: "04",
    title:  "The Community",
    body:   "Before the properties exist, before the first hotel opens — there is this. A founding community of people who believed in this vision before it became obvious. This is Phase I. This is now.",
    status: "Open now",
    eta:    "Phase I",
    open:   true,
    href:   "/#join",
  },
];

const ROADMAP = [
  {
    phase:     "Phase I",
    label:     "Now",
    title:     "The Community",
    body:      "Build the founding member community. Gather the people who share the vision. Free to join — rare to be part of.",
    active:    true,
  },
  {
    phase:     "Phase II",
    label:     "Next",
    title:     "Private Events & Spaces",
    body:      "Founding members get first access to curated events, private gatherings, and early access experiences as we build toward the physical spaces.",
    active:    false,
  },
  {
    phase:     "Phase III",
    label:     "The Future",
    title:     "The Hospitality Group",
    body:      "Hotels. Fine dining. Members' clubs. The global luxury hospitality group — inspired by Four Seasons and Nobu, built for the next generation.",
    active:    false,
  },
];

// ─── Section components ────────────────────────────────────────

function HeroBand() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      className="pt-40 pb-24 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 60%, rgba(122,148,69,0.07) 0%, transparent 70%)",
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
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-8"
          >
            The long-term vision
          </motion.p>

          <motion.h1
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light text-[var(--text-primary)] mb-8"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
          >
            A global luxury<br />
            hospitality empire.
          </motion.h1>

          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mb-10" />

          <motion.p
            variants={fadeUpVariants}
            custom={0.25}
            className="text-[var(--text-secondary)] font-light leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
          >
            Luxurianc is being built to become one of the world&apos;s great
            luxury hospitality groups. Hotels that define cities. Restaurants
            worth flying for. Members&apos; spaces for the people who shape the future.
            <br /><br />
            It starts with the community. It ends with something that lasts generations.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function PillarGrid() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });
  return (
    <section
      ref={ref}
      className="py-20 relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-luxury">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-14"
          >
            What we are building
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.number}
                variants={fadeUpVariants}
                custom={0.1 + i * 0.08}
                className="relative overflow-hidden rounded-2xl p-10 md:p-12 group"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Watermark number */}
                <span
                  className="absolute top-8 right-10 font-mono font-light pointer-events-none select-none"
                  style={{ fontSize: "6rem", color: "var(--gold)", opacity: 0.1, letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {p.number}
                </span>

                {/* Status badges */}
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="px-2.5 py-1 rounded-full text-[0.5rem] tracking-[0.3em] uppercase font-mono border"
                    style={{
                      color: p.open ? "var(--gold)" : "var(--text-muted)",
                      borderColor: p.open ? "rgba(122,148,69,0.3)" : "var(--border)",
                      background: p.open ? "rgba(122,148,69,0.06)" : "transparent",
                    }}
                  >
                    {p.status}
                  </span>
                  <span
                    className="text-[0.5rem] tracking-[0.25em] uppercase font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.eta}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-light text-[var(--text-primary)] mb-4">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  {p.body}
                </p>

                {p.open && p.href && (
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 mt-8 text-[0.62rem] tracking-[0.2em] uppercase font-mono transition-colors duration-200"
                    style={{ color: "var(--gold)" }}
                  >
                    Join the founding community
                    <ArrowRight size={12} />
                  </Link>
                )}

                {/* Hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 origin-left rounded-full"
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
  );
}

function Roadmap() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 });
  return (
    <section
      ref={ref}
      className="py-20 relative"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="container-luxury">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-[var(--gold)] font-mono mb-6"
          >
            The roadmap
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light text-[var(--text-primary)] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            How we get there.
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "var(--border)", marginLeft: "2.5rem" }}
            />

            <div className="space-y-0 md:pl-24">
              {ROADMAP.map((item, i) => (
                <motion.div
                  key={item.phase}
                  variants={fadeUpVariants}
                  custom={0.1 + i * 0.1}
                  className="relative flex flex-col md:flex-row gap-8 py-10 border-b border-[var(--border)] last:border-0"
                >
                  {/* Phase dot — desktop */}
                  <div
                    className="absolute hidden md:flex items-center justify-center w-5 h-5 rounded-full border-2 top-10"
                    style={{
                      left: "-5.65rem",
                      borderColor: item.active ? "var(--gold)" : "var(--border)",
                      background: item.active ? "var(--gold)" : "var(--bg-primary)",
                    }}
                  >
                    {item.active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Left col */}
                  <div className="w-full md:w-48 flex-shrink-0">
                    <p
                      className="text-[0.55rem] tracking-[0.35em] uppercase font-mono mb-1"
                      style={{ color: "var(--gold)" }}
                    >
                      {item.phase}
                    </p>
                    <p
                      className="text-[0.65rem] tracking-[0.2em] uppercase font-mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </p>
                  </div>

                  {/* Right col */}
                  <div className="flex-1">
                    <h3
                      className="font-display font-light mb-3"
                      style={{
                        fontSize: "1.25rem",
                        color: item.active ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.body}
                    </p>
                    {item.active && (
                      <Link
                        href="/#join"
                        className="inline-flex items-center gap-2 mt-5 text-[0.62rem] tracking-[0.2em] uppercase font-mono transition-colors"
                        style={{ color: "var(--gold)" }}
                      >
                        Join now — it&apos;s free
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VisionCTA() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });
  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(122,148,69,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="container-luxury relative z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-8"
          >
            Be part of the beginning
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            custom={0.1}
            className="font-display font-light text-[var(--text-primary)] mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            The founding chapter<br />is open now.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            custom={0.2}
            className="text-[var(--text-secondary)] text-base leading-relaxed font-light mb-12 max-w-lg mx-auto"
          >
            Free to join. Founding member status won&apos;t be available forever.
            Be one of the people who was here before it became obvious.
          </motion.p>
          <motion.div variants={fadeUpVariants} custom={0.3}>
            <Link href="/#join" className="btn-primary">
              Join Luxurianc — Free
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page composition ──────────────────────────────────────────

export default function VisionSection() {
  return (
    <>
      <HeroBand />
      <PillarGrid />
      <Roadmap />
      <VisionCTA />
    </>
  );
}
