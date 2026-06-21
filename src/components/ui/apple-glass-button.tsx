"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppleGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
}

/**
 * Apple-style frosted glass button.
 * Works beautifully over dark/blurred backgrounds.
 */
const AppleGlassButton = forwardRef<HTMLButtonElement, AppleGlassButtonProps>(
  ({ className, loading, disabled, children, ...props }, ref) => {
    const [pressed, setPressed] = useState(false);

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={{ scale: 0.97 }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        disabled={disabled || loading}
        className={cn(
          // Base
          "relative w-full overflow-hidden rounded-full",
          "px-8 py-4 text-sm font-medium tracking-[0.12em] uppercase",
          "transition-all duration-300 ease-out",
          // Glass layer
          "bg-white/[0.07] backdrop-blur-2xl",
          "border border-white/[0.18]",
          // Shadow: inner highlight + soft drop shadow
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_0_rgba(0,0,0,0.4)]",
          // Text
          "text-white/90",
          // Hover
          "hover:bg-white/[0.13] hover:border-white/[0.28] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_40px_0_rgba(0,0,0,0.5)]",
          // Active
          pressed && "bg-white/[0.04] scale-[0.98]",
          // Disabled
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...(props as object)}
      >
        {/* Shimmer highlight stripe */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.45) 60%, transparent 100%)",
          }}
        />

        {/* Gold subtle tint at bottom */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-full opacity-20"
          style={{
            background:
              "linear-gradient(to top, rgba(201,168,76,0.3), transparent)",
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="size-4 animate-spin text-[#c9a84c]" />
          ) : (
            children
          )}
        </span>
      </motion.button>
    );
  }
);

AppleGlassButton.displayName = "AppleGlassButton";
export { AppleGlassButton };
export type { AppleGlassButtonProps };
