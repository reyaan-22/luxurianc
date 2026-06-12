/**
 * tailwind.config.ts
 * Luxurianc design tokens — Olive Green + White theme
 * Apple-inspired: clean, minimal, precise
 */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      colors: {
        // Primary: Olive green — the brand color
        // Keeping key name "gold" so existing classes work without mass rename
        gold: {
          50:  "#f5f7f0",
          100: "#e8edda",
          200: "#d0dbb5",
          300: "#b0c285",
          400: "#8da85a",
          500: "#6f8c3d",  // primary olive
          600: "#577030",
          700: "#435727",
          800: "#374721",
          900: "#2e3c1e",
          950: "#161f0e",
        },
        // Dark surfaces
        obsidian: {
          50:  "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#0a0a0a",
        },
        // Light surfaces
        ivory: {
          50:  "#fefefe",
          100: "#fafaf7",
          200: "#f5f7f0",
          300: "#e8edda",
          400: "#d0dbb5",
          500: "#b0c285",
          600: "#8da85a",
          700: "#6f8c3d",
          800: "#577030",
          900: "#435727",
          950: "#2e3c1e",
        },
      },
      spacing: {
        "18":  "4.5rem",
        "88":  "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-up":         "fadeUp 0.6s ease-out forwards",
        "fade-in":         "fadeIn 0.8s ease-out forwards",
        "slide-left":      "slideLeft 0.6s ease-out forwards",
        "shimmer":         "shimmer 2s linear infinite",
        "float":           "float 6s ease-in-out infinite",
        "move-background": "moveBackground 60s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        moveBackground: {
          "from": { backgroundPosition: "0% 0%" },
          "to":   { backgroundPosition: "0% -1000%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Olive shimmer replaces gold shimmer
        "olive-shimmer":   "linear-gradient(105deg, transparent 40%, rgba(111,140,61,0.3) 50%, transparent 60%)",
      },
      boxShadow: {
        "luxury":    "0 0 0 1px rgba(111,140,61,0.15), 0 4px 24px rgba(0,0,0,0.06)",
        "luxury-lg": "0 0 0 1px rgba(111,140,61,0.2),  0 8px 48px rgba(0,0,0,0.10)",
        "glow-gold": "0 0 40px rgba(111,140,61,0.30)",  // olive glow
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
