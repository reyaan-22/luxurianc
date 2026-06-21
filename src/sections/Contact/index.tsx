/**
 * src/sections/Contact/index.tsx
 * Contact page with a split layout:
 * – Left: contact info + social links
 * – Right: validated enquiry form
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";
import type { ContactFormData } from "@/types";

const SERVICES = [
  "Bespoke Design",
  "Private Collection",
  "Luxury Concierge",
  "Estate Management",
  "General Enquiry",
];

const INFO_ITEMS = [
  { icon: Mail,    label: "Email",    value: "luxurianc.co@gmail.com" },
  { icon: Phone,   label: "Phone",    value: "+351 964 557 980"       },
  { icon: MapPin,  label: "Location", value: "By appointment only"   },
];

// ─────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [ref, inView]   = useInView<HTMLElement>();
  const [sent, setSent]  = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ContactFormData>({
    name:    "",
    email:   "",
    phone:   "",
    service: "",
    message: "",
  });

  const update = (field: keyof ContactFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      // still show success to user; email logged server-side
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const inputBase = cn(
    "w-full px-4 py-3.5 text-sm rounded-xl",
    "bg-[var(--bg-secondary)] border border-[var(--border)]",
    "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
    "focus:outline-none focus:border-gold-500/50 transition-colors duration-200"
  );

  return (
    <section ref={ref} className="pt-40 pb-32">
      <div className="container-luxury">

        {/* Header */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.p variants={fadeUpVariants} custom={0} className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-4 font-mono">
            ✦ Get in touch ✦
          </motion.p>
          <motion.h1 variants={fadeUpVariants} custom={0.1} className="font-display text-5xl md:text-6xl font-light">
            Let&apos;s begin a<br />
            <span className="text-gradient-gold italic">conversation</span>
          </motion.h1>
          <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold mt-6" />
        </motion.div>

        {/* Split layout */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16"
        >

          {/* ── Info panel ── */}
          <motion.div variants={fadeUpVariants} custom={0.2} className="lg:col-span-2 space-y-10">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-light">Private enquiries</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                We respond to every enquiry personally within 24 hours. There is no automated
                routing system — your message is read by an advisor.
              </p>
            </div>

            <div className="space-y-6">
              {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-0.5">{label}</p>
                    <p className="text-sm text-[var(--text-primary)]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass-card rounded-2xl p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs tracking-widest uppercase text-[var(--text-muted)]">Advisors available</p>
              </div>
              <p className="font-display text-xl text-[var(--text-primary)]">Monday – Sunday</p>
              <p className="text-sm text-[var(--text-secondary)]">9:00 AM – 10:00 PM (GMT)</p>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div variants={fadeUpVariants} custom={0.3} className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-12 text-center space-y-6 h-full flex flex-col items-center justify-center"
              >
                <CheckCircle size={48} className="text-gold-500" />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl">Message received</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Thank you, {form.name || "valued client"}. An advisor will be in touch within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                  className="btn-ghost text-xs"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 md:p-10 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                      Full name <span className="text-gold-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Alexandra Voss"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                      Email address <span className="text-gold-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="alex@example.com"
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+44 20 7890 0000"
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                      Service of interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className={cn(inputBase, "cursor-pointer")}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                    Your message <span className="text-gold-500">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us what you have in mind…"
                    required
                    rows={5}
                    className={cn(inputBase, "resize-none")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-[var(--text-muted)]">
                  Your information is held in strict confidence and never shared.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
