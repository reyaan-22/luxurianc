/**
 * src/lib/animations.ts
 * Reusable Framer Motion variant objects.
 * Import these into any component that needs entrance/exit animations
 * to keep animation logic DRY and consistent.
 */

import type { Variants } from "framer-motion";

// ─── Fade Up (most common – hero text, section headings) ───────
export const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y:       0,
    transition: {
      delay,
      duration: 0.7,
      ease:     [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── Fade In (images, cards) ───────────────────────────────────
export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease:     "easeOut",
    },
  }),
};

// ─── Slide in from left ────────────────────────────────────────
export const slideLeftVariants: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    x:       0,
    transition: {
      delay,
      duration: 0.7,
      ease:     [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── Stagger container (wraps children with staggered delay) ───
export const staggerContainerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.12,
      delayChildren:    0.1,
    },
  },
};

// ─── Scale up (buttons, icons on hover) ───────────────────────
export const scaleVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale:   1,
    transition: {
      delay,
      duration: 0.5,
      ease:     [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── Card hover – lift with shadow ────────────────────────────
export const cardHoverVariants = {
  rest:  { y: 0,  boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  hover: {
    y:         -6,
    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(212,160,23,0.2)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Drawer / menu open-close ─────────────────────────────────
export const drawerVariants: Variants = {
  closed: { x: "100%", transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } },
  open:   { x: 0,      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1]  } },
};

// ─── Overlay backdrop ─────────────────────────────────────────
export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Line draw (SVG underline reveal) ────────────────────────
export const lineDrawVariants: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity:    1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

// ─── Number counter (used in stats) ──────────────────────────
export const counterVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
