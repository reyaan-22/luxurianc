/**
 * src/components/ui/lux-member-badge.tsx
 * The "#LUX Member" badge — shown after a successful founding member signup.
 *
 * Dark glass card with animated olive shimmer and member number.
 * Entrance: scale in + fade up with spring physics.
 */

"use client";

import { motion } from "framer-motion";

interface LuxMemberBadgeProps {
  memberNumber?: number;
  className?: string;
}

export function LuxMemberBadge({ memberNumber, className = "" }: LuxMemberBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={`relative inline-flex flex-col items-center gap-5 ${className}`}
    >
      {/* Badge card */}
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(122,148,69,0.25)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 40px rgba(122,148,69,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
          minWidth: 220,
        }}
      >
        {/* Shimmer sweep — plays once on mount */}
        <motion.span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(122,148,69,0.18) 50%, transparent 60%)",
          }}
        />

        {/* Top highlight line */}
        <span
          aria-hidden
          className="absolute top-0 inset-x-8 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(122,148,69,0.5), transparent)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* "#LUX Member" wordmark */}
          <div className="flex items-center gap-2">
            <span
              className="text-[0.55rem] tracking-[0.5em] uppercase font-mono"
              style={{ color: "var(--gold)" }}
            >
              #LUX
            </span>
            <span
              className="w-px h-3 opacity-30"
              style={{ background: "var(--gold)" }}
            />
            <span
              className="text-[0.55rem] tracking-[0.5em] uppercase font-mono"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Member
            </span>
          </div>

          {/* Divider */}
          <span
            className="w-12 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(122,148,69,0.4), transparent)" }}
          />

          {/* Member number */}
          {memberNumber != null && (
            <p
              className="font-sans font-light text-[var(--text-primary)]"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1 }}
            >
              #{memberNumber.toLocaleString()}
            </p>
          )}

          {/* Subline */}
          <p
            className="text-[0.55rem] tracking-[0.3em] uppercase font-mono text-center"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Founding Member
          </p>
        </div>
      </div>

      {/* Confirmation line below badge */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xs font-light text-center"
        style={{ color: "var(--text-muted)" }}
      >
        You&apos;re in. We&apos;ll be in touch.
      </motion.p>
    </motion.div>
  );
}
