/**
 * src/sections/Access/index.tsx
 * Private Access — invitation-only introduction form
 * Dark luxury, minimal, editorial
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpVariants } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

const CONTEXT_OPTIONS = [
  "Founder / CEO",
  "Family Office",
  "Institutional Investor",
  "Operating Partner",
  "Other",
];

export default function AccessSection() {
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    context: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // Simulate send
    setSent(true);
    setLoading(false);
  };

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      {/* Hero */}
      <section
        className="pt-48 pb-32 relative overflow-hidden"
        style={{ background: "var(--bg-primary)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 40% 55%, rgba(122,148,69,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container-luxury relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-10"
          >
            Invitation only
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display font-light text-[var(--text-primary)]"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.0 }}
          >
            Introduce<br />
            <em>yourself.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-10 text-[var(--text-secondary)] text-lg leading-relaxed font-light max-w-xl"
          >
            We do not accept unsolicited applications. We extend invitations to
            people we have identified or been introduced to.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="mt-6 text-[var(--text-muted)] text-sm leading-relaxed max-w-xl"
          >
            If you believe there is a fit, you are welcome to reach us below. We
            read every message and respond to the relevant few.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section
        ref={ref}
        className="py-32"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

            {/* Left — context */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="space-y-12"
            >
              <div>
                <h2 className="font-display font-light text-[var(--text-primary)] text-3xl md:text-4xl mb-6">
                  What we look for.
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Exceptional founders",
                      body: "Founders building companies with genuine durability — not optimised for a quick exit.",
                    },
                    {
                      title: "Sophisticated allocators",
                      body: "Family offices and institutions seeking concentrated, long-duration private market exposure.",
                    },
                    {
                      title: "Operating partners",
                      body: "Operators with deep domain expertise who want to deploy alongside us in specific sectors.",
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="border-l-2 border-[var(--border)] pl-6">
                      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">{title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">{body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--border)]">
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-4">
                  Response time
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We respond within five business days to all messages we consider a
                  potential fit. If you do not hear from us, we ask that you respect
                  our process and not follow up.
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
            >
              {sent ? (
                <div className="h-full flex flex-col items-start justify-center space-y-6 py-20">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(122,148,69,0.15)" }}>
                    <Check size={20} className="text-[var(--gold)]" />
                  </div>
                  <h3 className="font-display text-3xl font-light text-[var(--text-primary)]">
                    Message received.
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
                    We have received your introduction. If there is a fit, you will
                    hear from us within five business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-3">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your full name"
                      className={cn(
                        "w-full px-0 py-4 text-sm bg-transparent border-b border-[var(--border)]",
                        "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                        "focus:outline-none focus:border-[var(--gold)] transition-colors duration-300"
                      )}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-3">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="your@email.com"
                      className={cn(
                        "w-full px-0 py-4 text-sm bg-transparent border-b border-[var(--border)]",
                        "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                        "focus:outline-none focus:border-[var(--gold)] transition-colors duration-300"
                      )}
                    />
                  </div>

                  {/* Context */}
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-3">
                      I am a *
                    </label>
                    <select
                      required
                      value={form.context}
                      onChange={update("context")}
                      className={cn(
                        "w-full px-0 py-4 text-sm bg-transparent border-b border-[var(--border)]",
                        "text-[form.context ? 'var(--text-primary)' : 'var(--text-muted)']",
                        "focus:outline-none focus:border-[var(--gold)] transition-colors duration-300",
                        "appearance-none cursor-pointer",
                        !form.context && "text-[var(--text-muted)]"
                      )}
                    >
                      <option value="" disabled>Select your context</option>
                      {CONTEXT_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[var(--bg-card)] text-[var(--text-primary)]">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mb-3">
                      Introduction *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us who you are, what you're building or allocating, and why you're reaching out."
                      className={cn(
                        "w-full px-0 py-4 text-sm bg-transparent border-b border-[var(--border)]",
                        "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                        "focus:outline-none focus:border-[var(--gold)] transition-colors duration-300",
                        "resize-none"
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary mt-4"
                  >
                    {loading ? "Sending…" : "Send Introduction"}
                    {!loading && <ArrowRight size={13} />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
