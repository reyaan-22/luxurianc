"use client";
/**
 * src/components/ui/lamp.tsx
 * Lamp container — adapted for Luxurianc (gold beam, dark bg).
 */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Lamp light mechanism ── */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]
            bg-gradient-conic from-[#b8960c] via-transparent to-transparent
            text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: "var(--bg-primary)" }} />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ background: "var(--bg-primary)" }} />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]
            bg-gradient-conic from-transparent via-transparent to-[#b8960c]
            text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ background: "var(--bg-primary)" }} />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: "var(--bg-primary)" }} />
        </motion.div>

        {/* Blur + mask layers */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ background: "var(--bg-primary)" }} />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Gold glow orb */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "#b8960c" }} />

        {/* Bright core blur */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ background: "#c9a84c" }}
        />

        {/* Horizontal line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ background: "#c9a84c" }}
        />

        {/* Bottom mask */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ background: "var(--bg-primary)" }} />
      </div>

      {/* ── Children rendered below lamp ── */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};
