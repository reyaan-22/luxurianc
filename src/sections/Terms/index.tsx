/**
 * src/sections/Terms/index.tsx
 * Terms of Service section — editorial dark luxury layout
 */

"use client";

import Link from "next/link";

const LAST_UPDATED = "June 2025";

export default function TermsSection() {
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
            Terms of Service
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
              Agreement
            </h2>
            <p>
              By accessing luxurianc.co or joining the Luxurianc community, you agree to these terms.
              If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Community membership
            </h2>
            <p>
              Joining Luxurianc as a founding member is free. Membership grants early access to
              community updates, events, and eventual product launches. We reserve the right to
              revoke membership for conduct that violates our values or the integrity of the community.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Intellectual property
            </h2>
            <p>
              All content on this site — including text, design, and the Luxurianc name and mark —
              is the property of Luxurianc. You may not reproduce or distribute any content without
              written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Disclaimers
            </h2>
            <p>
              The site is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee
              uninterrupted access or freedom from errors. Nothing on this site constitutes financial,
              legal, or investment advice.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by law, Luxurianc shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the site or community.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. We will notify members of material changes
              by email. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-display font-light text-[var(--text-primary)] mb-4" style={{ fontSize: "1.4rem" }}>
              Contact
            </h2>
            <p>
              For any questions about these terms, reach us at{" "}
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
