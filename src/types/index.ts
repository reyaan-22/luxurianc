/**
 * src/types/index.ts
 * Centralised TypeScript type definitions for the entire project.
 * Import from "@/types" in any component or data file.
 */

// ─── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href:  string;
  /** Optional badge label (e.g. "New") */
  badge?: string;
}

export interface NavGroup {
  label:    string;
  items:    NavItem[];
}

// ─── Services ──────────────────────────────────────────────────
export interface Service {
  id:          string;
  title:       string;
  subtitle:    string;
  description: string;
  icon:        string;          // Lucide icon name or custom SVG path
  features:    string[];
  cta:         string;
  href:        string;
  gradient:    string;          // Tailwind gradient classes
  image?:      string;
}

// ─── Testimonials ──────────────────────────────────────────────
export interface Testimonial {
  id:        string;
  name:      string;
  role:      string;
  company:   string;
  quote:     string;
  avatar?:   string;
  rating:    number;           // 1–5
}

// ─── Features ──────────────────────────────────────────────────
export interface Feature {
  id:          string;
  title:       string;
  description: string;
  icon:        string;
  stat?:       string;
  statLabel?:  string;
}

// ─── Blog / Articles ───────────────────────────────────────────
export interface BlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  category:    string;
  publishedAt: string;         // ISO date string
  readTime:    number;         // minutes
  cover?:      string;
  author:      Author;
  tags:        string[];
}

export interface Author {
  name:   string;
  role:   string;
  avatar?: string;
}

// ─── Team members ──────────────────────────────────────────────
export interface TeamMember {
  id:     string;
  name:   string;
  role:   string;
  bio:    string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    twitter?:  string;
    instagram?: string;
  };
}

// ─── Stats ─────────────────────────────────────────────────────
export interface Stat {
  value:  string;
  label:  string;
  suffix?: string;
}

// ─── SEO ───────────────────────────────────────────────────────
export interface SEOMeta {
  title:       string;
  description: string;
  keywords?:   string[];
  ogImage?:    string;
  canonical?:  string;
}

// ─── Contact Form ──────────────────────────────────────────────
export interface ContactFormData {
  name:    string;
  email:   string;
  phone?:  string;
  service?: string;
  message: string;
}

// ─── Motion Variants (Framer Motion) ───────────────────────────
export type MotionVariantKey = "hidden" | "visible" | "exit";
