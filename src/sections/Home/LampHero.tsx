"use client";
/**
 * src/sections/Home/LampHero.tsx
 * Luxurianc lamp hero — white spotlight, gold accents, editorial luxury.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";

export default function LampHero() {
  return (
    <LampContainer>
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
        transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
        className="font-mono text-center"
        style={{
          fontSize:      "0.5rem",
          textTransform: "uppercase",
          color:         "var(--gold)",
          marginBottom:  "2rem",
        }}
      >
        The founding chapter is open
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
        className="font-display font-light text-center"
        style={{
          fontSize:      "clamp(3.2rem, 10vw, 8rem)",
          lineHeight:    1.0,
          letterSpacing: "-0.025em",
          marginBottom:  "2rem",
          background:    "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip: "text",
        }}
      >
        Wealth is a mindset.
      </motion.h1>

      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.9, ease: "easeOut" }}
        style={{
          width:          "2.5rem",
          height:         "1px",
          background:     "var(--gold)",
          marginBottom:   "2rem",
          transformOrigin: "center",
        }}
      />

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="font-light text-center"
        style={{
          fontSize:     "clamp(0.82rem, 1.2vw, 0.96rem)",
          color:        "rgba(255,255,255,0.45)",
          lineHeight:   1.8,
          maxWidth:     "30rem",
          marginBottom: "3rem",
          letterSpacing: "0.01em",
        }}
      >
        A private community for those who believe purpose comes before
        profit — and the greatest things are built by people who refused
        the ordinary.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            "2rem",
          flexWrap:       "wrap",
          justifyContent: "center",
        }}
      >
        {/* Primary — gold pill */}
        <Link
          href="/#join"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "0.45rem",
            padding:        "0.8rem 2rem",
            borderRadius:   "9999px",
            background:     "var(--gold)",
            color:          "#050508",
            fontSize:       "0.68rem",
            fontWeight:     600,
            letterSpacing:  "0.1em",
            textTransform:  "uppercase",
            textDecoration: "none",
            transition:     "transform 0.2s, opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.opacity   = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.opacity   = "1";
          }}
        >
          Join the Community
          <ArrowRight size={12} />
        </Link>

        {/* Secondary — clean text link, no box */}
        <Link
          href="/about"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "0.35rem",
            color:          "rgba(255,255,255,0.4)",
            fontSize:       "0.68rem",
            letterSpacing:  "0.1em",
            textTransform:  "uppercase",
            textDecoration: "none",
            transition:     "color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          Our Story
          <ArrowRight size={11} />
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          marginTop:      "4rem",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "0.5rem",
        }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "2rem", background: "linear-gradient(to bottom, rgba(122,148,69,0.6), transparent)" }}
        />
      </motion.div>
    </LampContainer>
  );
}
