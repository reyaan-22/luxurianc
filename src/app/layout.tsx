/**
 * src/app/layout.tsx
 * Root layout – wraps every page.
 * Responsibilities:
 * – Load fonts via next/font (zero CLS, self-hosted subset)
 * – Provide ThemeProvider (next-themes)
 * – Render Navbar + Footer consistently across all routes
 * – Inject site-wide <head> metadata
 */

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono, Pinyon_Script } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultSEO } from "@/lib/seo";
import "@/styles/globals.css";

// ─── Font definitions ─────────────────────────────────────────
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-sans",
  display:  "swap",
});

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  style:    ["normal", "italic"],
  variable: "--font-display",
  display:  "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  weight:   ["400", "500"],
  variable: "--font-mono",
  display:  "swap",
});

// Pinyon Script — ONLY used for "Luxurianc" wordmark in Navbar / Hero / Footer
const pinyonScript = Pinyon_Script({
  subsets:  ["latin"],
  weight:   "400",
  variable: "--font-script",
  display:  "swap",
});

// ─── Site metadata ────────────────────────────────────────────
export const metadata: Metadata = {
  ...defaultSEO,
  title: "Luxurianc — Private Investment Group",
  description:
    "An exclusive private equity and investment group. We partner with exceptional founders building companies that endure.",
};

// ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning     // Required by next-themes
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${pinyonScript.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Skip-to-content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-obsidian-950 focus:rounded-lg focus:text-sm"
          >
            Skip to content
          </a>

          <Navbar />

          <main id="main-content">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
