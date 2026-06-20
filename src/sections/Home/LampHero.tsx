"use client";
/**
 * src/sections/Home/LampHero.tsx
 * Hero — rides the global NeuralNoise background.
 * Title uses Syne ExtraBold 800 for maximum impact.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MetalButton } from "@/components/ui/liquid-glass-button";

export default function LampHero() {
  return (
    <section
      style={{
        position:       "relative",
        width:          "100%",
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        background:     "transparent",
      }}
    >
      {/* ── Vignette — dark centre so text is readable over global noise ── */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse 75% 85% at 50% 50%, rgba(5,4,8,0.30) 0%, rgba(5,4,8,0.85) 100%)",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />

      {/* ── Text content ── */}
      <div
        style={{
          position:      "relative",
          zIndex:        2,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          textAlign:     "center",
          padding:       "0 1.5rem",
          maxWidth:      "60rem",
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
            color:         "#c9a84c",
            marginBottom:  "1.75rem",
          }}
        >
          The founding chapter is open
        </motion.p>

        {/* Logo treatment — Script + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
          style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Script wordmark */}
          <span
            style={{
              fontFamily:    "var(--font-script), cursive",
              fontWeight:    400,
              fontSize:      "clamp(5rem, 16vw, 13rem)",
              lineHeight:    1.0,
              color:         "#f5f0e8",
              display:       "block",
              letterSpacing: "0.01em",
            }}
          >
            Luxurianc
          </span>

          {/* Tagline beneath */}
          <span
            style={{
              fontFamily:    "var(--font-hero), sans-serif",
              fontWeight:    800,
              fontSize:      "clamp(0.55rem, 1.6vw, 1rem)",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color:         "rgba(245,240,232,0.55)",
              marginTop:     "0.25rem",
              display:       "block",
            }}
          >
            Not for the average
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
          style={{
            width:           "2.5rem",
            height:          "1px",
            background:      "#c9a84c",
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
            color:        "rgba(245,240,232,0.42)",
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
          {/* Primary — gold metal button */}
          <Link href="/#join" style={{ textDecoration: "none" }}>
            <MetalButton variant="gold">
              Join the Community&nbsp;&nbsp;<ArrowRight size={13} />
            </MetalButton>
          </Link>

          {/* Secondary */}
          <Link
            href="/about"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.35rem",
              color:          "rgba(245,240,232,0.32)",
              fontFamily:     "var(--font-sans)",
              fontSize:       "0.68rem",
              letterSpacing:  "0.1em",
              textTransform:  "uppercase",
              textDecoration: "none",
              transition:     "color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.75)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.32)"; }}
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
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.42rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(201,168,76,0.35)" }}>
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "2.5rem", background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
