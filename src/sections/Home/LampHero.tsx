"use client";
/**
 * src/sections/Home/LampHero.tsx
 * Shader hero — gold ripple background, editorial text stack.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function LampHero() {
  return (
    <section
      style={{
        position:   "relative",
        width:      "100%",
        minHeight:  "100vh",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow:   "hidden",
        background: "#05050a",
      }}
    >
      {/* ── Shader canvas — fills the whole section ── */}
      <ShaderAnimation />

      {/* ── Dark gradient overlay so text stays readable ── */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(5,5,10,0.35) 0%, rgba(5,5,10,0.78) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Text content — centered column ── */}
      <div
        style={{
          position:       "relative",
          zIndex:         10,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          textAlign:      "center",
          padding:        "0 1.5rem",
          maxWidth:       "52rem",
        }}
      >

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.5rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color:         "#7a9445",
            marginBottom:  "1.75rem",
          }}
        >
          The founding chapter is open
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
          style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    300,
            fontSize:      "clamp(3.2rem, 10vw, 8.5rem)",
            lineHeight:    1.0,
            letterSpacing: "-0.025em",
            color:         "#f5f0e8",
            marginBottom:  "2rem",
          }}
        >
          Wealth is a mindset.
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
          style={{
            width:           "2.5rem",
            height:          "1px",
            background:      "#7a9445",
            opacity:         0.6,
            marginBottom:    "2rem",
            transformOrigin: "center",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: "easeOut" }}
          style={{
            fontFamily:   "var(--font-sans)",
            fontWeight:   300,
            fontSize:     "clamp(0.85rem, 1.3vw, 1rem)",
            color:        "rgba(245,240,232,0.45)",
            lineHeight:   1.85,
            maxWidth:     "30rem",
            marginBottom: "3rem",
          }}
        >
          A private community for those who believe purpose comes before
          profit — and the greatest things are built by people who refused
          the ordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "2rem",
            flexWrap:       "wrap",
          }}
        >
          {/* Primary */}
          <Link
            href="/#join"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.45rem",
              padding:        "0.8rem 2.2rem",
              borderRadius:   "9999px",
              background:     "#7a9445",
              color:          "#05050a",
              fontFamily:     "var(--font-sans)",
              fontSize:       "0.68rem",
              fontWeight:     600,
              letterSpacing:  "0.1em",
              textTransform:  "uppercase",
              textDecoration: "none",
              transition:     "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Join the Community <ArrowRight size={12} />
          </Link>

          {/* Secondary — text only */}
          <Link
            href="/about"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.35rem",
              color:          "rgba(245,240,232,0.35)",
              fontFamily:     "var(--font-sans)",
              fontSize:       "0.68rem",
              letterSpacing:  "0.1em",
              textTransform:  "uppercase",
              textDecoration: "none",
              transition:     "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.8)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.35)"; }}
          >
            Our Story <ArrowRight size={11} />
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            marginTop:     "5rem",
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "0.5rem",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(122,148,69,0.4)" }}>
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "2.5rem", background: "linear-gradient(to bottom, #7a9445, transparent)" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
