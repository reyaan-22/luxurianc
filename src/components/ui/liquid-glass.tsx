/**
 * src/components/ui/liquid-glass.tsx
 * Liquid glass morphism primitive components.
 * Provides: GlassFilter (SVG), GlassEffect (wrapper), GlassCard, GlassPill
 * Used in GlassServices section on the home page.
 *
 * The SVG filter creates a realistic glass distortion effect.
 * Must render <GlassFilter /> once in the DOM before using GlassEffect.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── SVG distortion filter ────────────────────────────────────
// Render this ONCE high in the component tree (not inside a map)
export const GlassFilter: React.FC = () => (
  <svg
    aria-hidden="true"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1"  offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1"  offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0" k2="1" k3="1" k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="150"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

// ─── Types ───────────────────────────────────────────────────
interface GlassEffectProps {
  children:   React.ReactNode;
  className?: string;
  style?:     React.CSSProperties;
  onClick?:   () => void;
}

interface GlassCardProps extends GlassEffectProps {
  icon?:     React.ReactNode;
  title?:    string;
  subtitle?: string;
}

interface GlassPillProps {
  children:   React.ReactNode;
  className?: string;
}

// ─── Base glass wrapper ───────────────────────────────────────
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  onClick,
}) => {
  const baseStyle: React.CSSProperties = {
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.4) inset",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  return (
    <div
      className={cn(
        "relative flex overflow-hidden cursor-pointer transition-all duration-500",
        className
      )}
      style={baseStyle}
      onClick={onClick}
    >
      {/* Backdrop blur layer */}
      <div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{
          backdropFilter:         "blur(16px) saturate(180%)",
          WebkitBackdropFilter:   "blur(16px) saturate(180%)",
          filter:                 "url(#glass-distortion)",
          isolation:              "isolate",
        }}
      />
      {/* White tint */}
      <div
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255,255,255,0.20)" }}
      />
      {/* Inner highlight border */}
      <div
        className="absolute inset-0 z-20 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 1.5px 1.5px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.35)",
        }}
      />
      {/* Actual content */}
      <div className="relative z-30 w-full">{children}</div>
    </div>
  );
};

// ─── Service card with glass effect ──────────────────────────
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  icon,
  title,
  subtitle,
  onClick,
}) => (
  <GlassEffect
    className={cn("rounded-3xl p-8 flex-col gap-4", className)}
    onClick={onClick}
  >
    <div className="flex flex-col gap-4">
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-[var(--text-primary)]">
          {icon}
        </div>
      )}
      {title && (
        <div className="space-y-1">
          <h3 className="font-display text-xl font-medium text-[var(--text-primary)]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs tracking-widest uppercase text-[var(--gold)] font-mono">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </GlassEffect>
);

// ─── Small pill / badge ───────────────────────────────────────
export const GlassPill: React.FC<GlassPillProps> = ({ children, className = "" }) => (
  <GlassEffect
    className={cn(
      "rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-primary)]",
      className
    )}
  >
    {children}
  </GlassEffect>
);
