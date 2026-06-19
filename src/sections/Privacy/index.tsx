/**
 * src/sections/Privacy/index.tsx
 * Privacy Policy section — editorial dark luxury layout
 */

"use client";

import Link from "next/link";

const LAST_UPDATED = "June 2025";

export default function PrivacySection() {
  return (
    <main className="pt-40 pb-32" style={{ background: "var(--bg-primary)" }}>
      <div className="container-luxury max-w-3xl">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[0.6rem] tracking-[0.45em] uppercase font-mono mb-6" style={{ color: "var(--gold)" }}>
            Legal
          </p>
          <h1
            className="font-display font-light mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.05, color: "var(--text-primary)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px mb-16" style={{ background: "var(--gold)", opacity: 0.4 }} />

        {/* Body */}
        <div
          className="space-y-10 text-[var(--text-secondary)] leading-relaxed"
          style={{ fontSize: "0.95rem" }}
        >

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Who we are
            </h2>
            <p>
              Luxurianc (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a private community for individuals who
              believe wealth is a mindset. This policy explains what information we collect when you
              use luxurianc.co and how we use it.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              What we collect
            </h2>
            <p>
              When you join as a founding member, we collect your <strong className="text-[var(--text-primary)] font-normal">name</strong> and{" "}
              <strong className="text-[var(--text-primary)] font-normal">email address</strong>. We do not
              collect payment information, phone numbers, or any other personal data unless you
              choose to provide it.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              How we use it
            </h2>
            <p>
              We use your information solely to communicate with you about Luxurianc — early access
              updates, community launches, and invitations. We do not sell, rent, or share your data
              with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Data storage
            </h2>
            <p>
              Your data is stored securely via Supabase, a GDPR-compliant database infrastructure
              provider. We retain your data for as long as you remain a member or until you request
              deletion.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Your rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time
              by emailing us. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Cookies
            </h2>
            <p>
              We use only essential cookies required for the site to function. We do not use tracking
              or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Contact
            </h2>
            <p>
              For any privacy-related questions, reach us at{" "}
              <a
                href="mailto:reyaan2203@gmail.com"
                className="underline underline-offset-4 transition-colors duration-200"
                style={{ color: "var(--gold)" }}
              >
                reyaan2203@gmail.com
              </a>
              .
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-20">
          <Link
            href="/"
            className="text-[0.65rem] tracking-[0.3em] uppercase font-mono transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
          >
            ← Back to home
          </Link>
        </div>

      </div>
    </main>
  );
}
