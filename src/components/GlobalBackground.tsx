"use client";
/**
 * GlobalBackground — fixed neural noise that sits behind every page.
 * Lower opacity than the hero so body sections don't overwhelm content.
 */
import { NeuralNoise } from "@/components/ui/neural-noise";

export function GlobalBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <NeuralNoise
        color={[0.82, 0.68, 0.22]}
        opacity={0.55}
        speed={0.0006}
        fixed={false}
      />
    </div>
  );
}
