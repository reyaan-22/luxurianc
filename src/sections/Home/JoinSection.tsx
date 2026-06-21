/**
 * src/sections/Home/JoinSection.tsx
 * THE most important section — founding member signup with live counter.
 * Supabase-powered. Shows real member count.
 *
 * Anchor: id="join" — linked from nav and CTAs.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { joinCommunity, getMemberCount } from "@/lib/supabase";
import { LuxMemberBadge } from "@/components/ui/lux-member-badge";
import { AppleGlassButton } from "@/components/ui/apple-glass-button";

type Status = "idle" | "loading" | "success" | "duplicate" | "error" | "not_configured";

export default function JoinSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [memberCount, setMemberCount] = useState(0);
  const [form, setForm]   = useState({ name: "", email: "" });
  const [status, setStatus] = useState<Status>("idle");
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef  = useRef<HTMLFormElement>(null);

  // Fetch live count on mount
  useEffect(() => {
    getMemberCount().then(setMemberCount).catch(() => setMemberCount(0));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("loading");

    const { error } = await joinCommunity(form.email, form.name);

    if (!error) {
      setStatus("success");
      setMemberCount((c) => c + 1);
    } else if (error === "already_member") {
      setStatus("duplicate");
    } else if (error === "not_configured") {
      setStatus("not_configured");
    } else {
      setStatus("error");
    }
  };

  const update = (field: "name" | "email") =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <section
      id="join"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Radial olive glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(122,148,69,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Animated border top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 inset-x-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, var(--gold), transparent 60%)" }}
      />

      <div className="container-luxury relative z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            className="text-[0.6rem] tracking-[0.45em] uppercase text-[var(--gold)] font-mono mb-10"
          >
            Early access — free to join
          </motion.p>

          {/* Divider */}
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mb-12" />

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            custom={0.25}
            className="font-display font-light text-[var(--text-primary)] mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Be part of the beginning.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            custom={0.3}
            className="text-[var(--text-secondary)] text-base leading-relaxed font-light mb-14 max-w-xl mx-auto"
          >
            Founding members get early access to everything Luxurianc builds —
            the community, the events, the spaces, and eventually, the experiences.
            Free to join. Rare to be part of.
          </motion.p>

          {/* Form */}
          <motion.div variants={fadeUpVariants} custom={0.4} className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-6"
                >
                  <p
                    className="font-display font-light text-[var(--text-primary)] mb-8 text-center"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
                  >
                    Welcome, founding member.
                  </p>
                  <LuxMemberBadge memberNumber={memberCount} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className={cn(
                      "w-full px-6 py-4 rounded-full text-sm",
                      "bg-[var(--bg-card)] border border-[var(--border)]",
                      "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                      "focus:outline-none focus:border-[var(--gold)]/60 transition-colors duration-300"
                    )}
                  />
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="Your email address"
                    className={cn(
                      "w-full px-6 py-4 rounded-full text-sm",
                      "bg-[var(--bg-card)] border border-[var(--border)]",
                      "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                      "focus:outline-none focus:border-[var(--gold)]/60 transition-colors duration-300",
                      status === "duplicate" && "border-amber-500/50",
                      status === "error"     && "border-red-500/40"
                    )}
                  />

                  {status === "duplicate" && (
                    <p className="text-amber-400 text-xs text-center font-mono tracking-wide">
                      You&apos;re already a founding member.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center font-mono tracking-wide">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  {status === "not_configured" && (
                    <p className="text-amber-400 text-xs text-center font-mono tracking-wide">
                      Connect Supabase in .env.local to enable signups.
                    </p>
                  )}

                  <AppleGlassButton
                    type="submit"
                    loading={status === "loading"}
                    disabled={status === "loading"}
                  >
                    <span className="text-[#c9a84c] tracking-[0.2em]">
                      Join the Community
                    </span>
                  </AppleGlassButton>

                  <p className="text-[0.6rem] text-[var(--text-muted)] text-center tracking-wide font-mono">
                    No spam. No payment. Just early access.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
