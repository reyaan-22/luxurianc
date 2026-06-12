/**
 * src/app/not-found.tsx
 * Custom 404 page matching the luxury aesthetic.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <p className="font-mono text-xs tracking-[0.4em] uppercase text-gold-500">404</p>
        <h1 className="font-display text-7xl md:text-9xl font-light text-gradient-gold">
          Lost
        </h1>
        <div className="divider-gold" />
        <p className="text-[var(--text-secondary)] max-w-sm mx-auto">
          The page you are looking for does not exist, or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Return home
        </Link>
      </div>
    </section>
  );
}
