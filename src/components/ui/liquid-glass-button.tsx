/**
 * src/components/ui/liquid-glass-button.tsx
 * LiquidGlass — the signature Luxurianc CTA button.
 *
 * Dark mode: frosted dark glass with olive glow
 * Light mode: frosted white glass with olive glow
 * On hover: olive background sweeps in from left
 */

"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── CVA variants ─────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base
  [
    "relative isolate inline-flex items-center justify-center gap-2.5",
    "overflow-hidden rounded-full",
    "font-sans text-sm tracking-[0.08em] font-medium",
    "select-none cursor-pointer",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/60",
    "disabled:opacity-40 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        glass: [
          // Glass layer
          "border border-white/10",
          "backdrop-blur-xl",
          "text-[var(--text-primary)]",
        ],
        solid: [
          "bg-[var(--gold)] text-white border border-[var(--gold)]",
        ],
        ghost: [
          "border border-[var(--border)] text-[var(--text-secondary)]",
        ],
      },
      size: {
        sm:  "px-5 py-2.5 text-xs",
        md:  "px-7 py-3.5",
        lg:  "px-10 py-5 text-base tracking-[0.1em]",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "md",
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      className,
      variant = "glass",
      size = "md",
      asChild = false,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={{
          // Dark glass background
          background: hovered
            ? "rgba(122,148,69,0.85)"
            : variant === "glass"
            ? "rgba(255,255,255,0.04)"
            : undefined,
        }}
        onMouseEnter={(e) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        {/* Frosted glass inner highlight */}
        {variant === "glass" && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
              opacity: hovered ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Olive fill sweep on hover */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(122,148,69,0.15)",
            originX: "0%",
          }}
        />

        {/* Border glow */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: hovered
              ? "0 0 0 1px rgba(122,148,69,0.5), 0 0 20px rgba(122,148,69,0.12)"
              : "0 0 0 1px rgba(255,255,255,0.08)",
            transition: "box-shadow 0.3s ease",
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-300"
          style={{ color: hovered && variant === "glass" ? "#ffffff" : undefined }}
        >
          {children}
        </span>
      </Comp>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { LiquidButton, buttonVariants };
