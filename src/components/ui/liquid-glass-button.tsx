"use client";
/**
 * src/components/ui/liquid-glass-button.tsx
 * Three premium button styles for Luxurianc:
 *   - LiquidButton  →  frosted glass with backdrop distortion
 *   - MetalButton   →  sculpted metal, gold variant for hero CTAs
 *   - Button        →  standard utility button (Radix Slot / CVA)
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── 1. Standard Button ────────────────────────────────────────────────────────
const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
        outline:     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 rounded-md px-3 text-xs",
        lg:      "h-10 rounded-md px-8",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

// ─── 2. Liquid Glass Button ────────────────────────────────────────────────────
const liquidVariants = cva(
  "inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:   "bg-transparent hover:scale-105 duration-300 text-white",
        outline:   "border border-white/20 bg-white/5 text-white hover:bg-white/10",
      },
      size: {
        sm:  "h-9 px-5 text-xs",
        md:  "h-11 px-7",
        lg:  "h-12 px-8",
        xl:  "h-13 px-10",
        xxl: "h-14 px-12",
      },
    },
    defaultVariants: { variant: "default", size: "lg" },
  }
);

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn("relative", liquidVariants({ variant, size, className }))}
      {...props}
    >
      {/* Glass shadow shell */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full transition-all
          shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06)]
          dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06)]"
      />
      {/* Backdrop blur distortion */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#lux-glass")' }}
      />
      {/* Content */}
      <div className="pointer-events-none relative z-10 flex items-center gap-2">{children}</div>
      <GlassFilter />
    </Comp>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter id="lux-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="2" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="60" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// ─── 3. Metal Button ──────────────────────────────────────────────────────────
type MetalVariant = "default" | "gold" | "bronze" | "success" | "error";

interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MetalVariant;
}

const metalStyles: Record<MetalVariant, { outer: string; inner: string; face: string; text: string; shadow: string }> = {
  default: {
    outer:  "from-[#000] to-[#A0A0A0]",
    inner:  "from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    face:   "from-[#B9B9B9] to-[#969696]",
    text:   "text-white",
    shadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  gold: {
    outer:  "from-[#917100] to-[#EAD98F]",
    inner:  "from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    face:   "from-[#FFEBA1] to-[#9B873F]",
    text:   "text-[#1a1200]",
    shadow: "[text-shadow:_0_1px_0_rgba(255,235,120,0.6)]",
  },
  bronze: {
    outer:  "from-[#864813] to-[#E9B486]",
    inner:  "from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    face:   "from-[#FFE3C9] to-[#A36F3D]",
    text:   "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
  success: {
    outer:  "from-[#005A43] to-[#7CCB9B]",
    inner:  "from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    face:   "from-[#9ADBC8] to-[#3E8F7C]",
    text:   "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer:  "from-[#5A0000] to-[#FFAEB0]",
    inner:  "from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    face:   "from-[#F08D8F] to-[#A45253]",
    text:   "text-[#FFF7F0]",
    shadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
};

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const [pressed,  setPressed]  = React.useState(false);
    const [hovered,  setHovered]  = React.useState(false);
    const [isTouch,  setIsTouch]  = React.useState(false);

    React.useEffect(() => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const s = metalStyles[variant];
    const t = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

    return (
      <div
        className={cn("relative inline-flex transform-gpu rounded-md p-[1.25px] will-change-transform bg-gradient-to-b", s.outer)}
        style={{
          transform:  pressed ? "translateY(2px) scale(0.985)" : "translateY(0) scale(1)",
          boxShadow:  pressed
            ? "0 1px 2px rgba(0,0,0,0.2)"
            : hovered && !isTouch
            ? "0 6px 18px rgba(0,0,0,0.18)"
            : "0 3px 10px rgba(0,0,0,0.12)",
          transition: t,
        }}
      >
        {/* Inner bevel */}
        <div
          className={cn("absolute inset-[1px] rounded-[5px] bg-gradient-to-b", s.inner)}
          style={{ transition: t, filter: hovered && !pressed && !isTouch ? "brightness(1.06)" : "none" }}
        />
        <button
          ref={ref}
          className={cn(
            "relative z-10 m-[1px] rounded-md inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden px-7 py-2 text-sm leading-none font-semibold will-change-transform outline-none bg-gradient-to-b",
            s.face, s.text, s.shadow, className
          )}
          style={{
            transform:  pressed ? "scale(0.975)" : "scale(1)",
            transition: t,
            filter:     hovered && !pressed && !isTouch ? "brightness(1.03)" : "none",
          }}
          {...props}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => { setPressed(false); setHovered(false); }}
          onMouseEnter={() => { if (!isTouch) setHovered(true); }}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          onTouchCancel={() => setPressed(false)}
        >
          {/* Shine on press */}
          {pressed && (
            <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
          {/* Hover top sheen */}
          {hovered && !pressed && !isTouch && (
            <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-transparent to-white/10" />
          )}
          {children}
        </button>
      </div>
    );
  }
);
MetalButton.displayName = "MetalButton";

export { Button, buttonVariants };
