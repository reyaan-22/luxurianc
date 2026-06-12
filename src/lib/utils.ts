/**
 * src/lib/utils.ts
 * Pure utility functions shared across the project.
 * – cn()        : merges Tailwind classes without conflicts
 * – formatDate(): human-readable date strings
 * – slugify()   : URL-safe slugs
 * – clamp()     : numeric clamping
 * – truncate()  : string truncation
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution.
 * Usage: cn("px-4 py-2", isActive && "bg-gold-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string to a human-readable format.
 * e.g. "2024-03-15" → "March 15, 2024"
 */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(iso));
}

/**
 * Convert a string to a URL-safe slug.
 * e.g. "Hello World!" → "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Truncate a string to a maximum length, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Linear interpolation between two values.
 * Useful for scroll-driven animation calculations.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another.
 * e.g. mapRange(0.5, 0, 1, 0, 100) → 50
 */
export function mapRange(
  value: number,
  inMin:  number,
  inMax:  number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Pad a number with leading zeros to a given width.
 * e.g. padZero(3, 2) → "03"
 */
export function padZero(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/**
 * Stagger delay array for Framer Motion children.
 * e.g. staggerDelay(5, 0.1) → [0, 0.1, 0.2, 0.3, 0.4]
 */
export function staggerDelay(count: number, step = 0.1): number[] {
  return Array.from({ length: count }, (_, i) => i * step);
}
