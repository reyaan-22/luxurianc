"use client";
/**
 * src/sections/Home/LampHero.tsx
 * Gold lamp hero — Luxurianc branded.
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        className="font-mono text-center"
        style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color:         "var(--gold)",
          marginBottom:  "1.5rem",
        }}
      >
        The founding chapter is open
      </motion.p>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0.4, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
        className="font-display font-light text-center"
        style={{
          fontSize:      "clamp(3rem, 9vw, 7.5rem)",
          lineHeight:    1.0,
          letterSpacing: "-0.02em",
          color:         "var(--text-primary)",
          marginBottom:  "1.5rem",
        }}
      >
        Wealth is a mindset.
      </motion.h1>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        style={{
          width:          "3rem",
          height:         "1px",
          background:     "var(--gold)",
          opacity:        0.5,
          marginBottom:   "1.75rem",
          transformOrigin: "center",
        }}
      />

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
        className="font-light text-center"
        style={{
          fontSize:     "clamp(0.85rem, 1.3vw, 1rem)",
          color:        "var(--text-secondary)",
          lineHeight:   1.7,
          maxWidth:     "32rem",
          marginBottom: "2.5rem",
        }}
      >
        A private community for those who believe purpose comes before
        profit — and the greatest things are built by people who refused
        the ordinary.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Link
          href="/#join"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.5rem",
            padding:       "0.75rem 1.75rem",
            borderRadius:  "9999px",
            background:    "var(--gold)",
            color:         "#05050a",
            fontSize:      "0.75rem",
            fontWeight:    500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition:    "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Join the Community
          <ArrowRight size={13} />
        </Link>

        <Link
          href="/about"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.5rem",
            padding:       "0.75rem 1.75rem",
            borderRadius:  "9999px",
            border:        "1px solid var(--border)",
            color:         "var(--text-secondary)",
            fontSize:      "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition:    "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Our Story
        </Link>
      </motion.div>
    </LampContainer>
  );
}
