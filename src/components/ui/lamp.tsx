"use client";
/**
 * src/components/ui/lamp.tsx
 * Lamp container — white/silver beam, Luxurianc dark bg.
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
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full",
        className
      )}
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Light mechanism ── */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.2, duration: 1.0, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]
            bg-gradient-conic from-white/30 via-transparent to-transparent
            [--conic-position:from_70deg_at_center_top]"
        >
          <div
            className="absolute w-full left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: "var(--bg-primary)" }}
          />
          <div
            className="absolute w-40 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ background: "var(--bg-primary)" }}
          />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.2, duration: 1.0, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]
            bg-gradient-conic from-transparent via-transparent to-white/30
            [--conic-position:from_290deg_at_center_top]"
        >
          <div
            className="absolute w-40 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ background: "var(--bg-primary)" }}
          />
          <div
            className="absolute w-full right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ background: "var(--bg-primary)" }}
          />
        </motion.div>

        {/* Bg blur mask */}
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ background: "var(--bg-primary)" }}
        />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Soft white glow orb */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-white" />

        {/* Sharp core */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "14rem" }}
          transition={{ delay: 0.2, duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-56 -translate-y-[6rem] rounded-full blur-2xl bg-white/25"
        />

        {/* Horizontal line — the "lamp edge" */}
        <motion.div
          initial={{ width: "10rem", opacity: 0 }}
          whileInView={{ width: "28rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-px -translate-y-[7rem]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
        />

        {/* Bottom bg mask */}
        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ background: "var(--bg-primary)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};
