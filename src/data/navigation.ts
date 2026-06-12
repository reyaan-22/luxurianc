/**
 * src/data/navigation.ts
 * Luxurianc — navigation structure
 */

import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "About",   href: "/about"   },
  { label: "Vision",  href: "/vision"  },
  { label: "Journal", href: "/blog"    },
  { label: "Join",    href: "/#join"   },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "X",        href: "https://x.com",        icon: "Twitter"  },
  { label: "Instagram",href: "https://instagram.com", icon: "Instagram"},
];
