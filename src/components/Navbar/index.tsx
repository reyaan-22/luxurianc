/**
 * src/components/Navbar/index.tsx
 * Luxurianc Private Investment Group — minimal dark navigation
 * Transparent on hero → frosted glass on scroll
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";
import { drawerVariants, backdropVariants, fadeUpVariants } from "@/lib/animations";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function Navbar() {
  const pathname             = usePathname();
  const { theme, setTheme }  = useTheme();
  const { isTop }            = useScrollPosition(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHomePage = pathname === "/";
  const transparent = isTop && isHomePage;

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-700",
          transparent
            ? "bg-transparent border-transparent"
            : "bg-[var(--bg-primary)]/75 backdrop-blur-2xl border-b border-[var(--border)]"
        )}
        style={{ height: "var(--navbar-h)" }}
      >
        <div className="container-luxury h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label="Luxurianc home">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-colors duration-300",
                  pathname === item.href
                    ? "text-[var(--gold)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-5">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{   opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}

            {/* CTA — desktop */}
            <Link
              href="/#join"
              className="hidden md:inline-flex btn-primary"
              style={{ padding: "0.55rem 1.2rem", fontSize: "0.62rem" }}
            >
              Join
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-[var(--text-primary)]"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 z-50 w-72 md:hidden bg-[var(--bg-secondary)] flex flex-col border-l border-[var(--border)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-8 h-[var(--navbar-h)] border-b border-[var(--border)]">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "var(--text-primary)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  LUXURIANC.CO
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-8 py-10 flex-1 gap-0" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i * 0.08}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block py-5 text-[0.65rem] tracking-[0.25em] uppercase font-medium",
                        "border-b border-[var(--border)] transition-colors duration-200",
                        pathname === item.href
                          ? "text-[var(--gold)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-8 pb-12">
                <Link
                  href="/#join"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full justify-center"
                  style={{ fontSize: "0.62rem" }}
                >
                  Join Luxurianc
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
