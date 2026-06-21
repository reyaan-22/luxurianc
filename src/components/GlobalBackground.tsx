"use client";
/**
 * GlobalBackground — fixed neural noise on desktop, static gradient on mobile.
 * WebGL is too GPU-heavy to run site-wide on phones.
 */
import { useEffect, useState } from "react";
import { NeuralNoise } from "@/components/ui/neural-noise";

export function GlobalBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
      }}
    >
      {isMobile ? (
        /* Mobile — static gold gradient, no WebGL */
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(180,140,30,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(140,110,20,0.12) 0%, transparent 60%)",
        }} />
      ) : (
        /* Desktop — full WebGL neural noise */
        <NeuralNoise
          color={[0.82, 0.68, 0.22]}
          opacity={0.55}
          speed={0.0006}
          fixed={false}
        />
      )}
    </div>
  );
}
