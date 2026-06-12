/**
 * src/components/Footer/index.tsx
 * Luxurianc PE — refined dark footer
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";

// Instagram SVG (Lucide doesn't include it)
function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3.5"/>
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/>
    </svg>
  );
}
import { cn } from "@/lib/utils";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const footerLinks = {
  Group: [
    { label: "About",      href: "/about"     },
    { label: "Investment", href: "/services"  },
    { label: "Portfolio",  href: "/portfolio" },
    { label: "Access",     href: "/access"    },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms"   },
    { label: "Disclosures",      href: "/disclosures" },
  ],
};

export default function Footer() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="relative border-t border-[var(--border)] overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-luxury py-20">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >

          {/* Brand column */}
          <motion.div variants={fadeUpVariants} className="md:col-span-1 space-y-8">
            <Link href="/" aria-label="Luxurianc home">
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "var(--text-primary)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                LUXURIANC.CO
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              A private community for those who believe wealth is a mindset,
              purpose comes before profit, and the greatest things are built by
              people who refused the ordinary.
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/reyaann22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "border border-[var(--border)]",
                  "text-[var(--text-muted)] hover:text-[var(--gold)]",
                  "hover:border-[var(--gold)]/30 transition-all duration-300"
                )}
              >
                <InstagramIcon size={13} />
              </a>
              {[
                { Icon: Twitter,  href: "https://x.com/reyaann03", label: "X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    "border border-[var(--border)]",
                    "text-[var(--text-muted)] hover:text-[var(--gold)]",
                    "hover:border-[var(--gold)]/30 transition-all duration-300"
                  )}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <motion.div key={group} variants={fadeUpVariants} className="space-y-6">
              <h3 className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
                {group}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.65rem] text-[var(--text-muted)] tracking-wider">
            © {new Date().getFullYear()} Luxurianc. All rights reserved.
          </p>
          <p className="text-[0.65rem] text-[var(--text-muted)] tracking-wider">
            Investment involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
