/**
 * src/sections/Services/index.tsx
 * Full services page content — expanded detail view of each offering.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Gem, Crown, Shield, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";
import { services } from "@/data/services";
import CTA from "@/components/CTA";

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Palette: Palette,
  Gem:     Gem,
  Crown:   Crown,
  Shield:  Shield,
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const Icon = ICON_MAP[service.icon] ?? Gem;
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={cn("py-20 border-b border-[var(--border)]")}>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={cn(
          "container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
          !isEven && "lg:direction-rtl"
        )}
      >
        {/* Text block */}
        <div className={cn("space-y-8", !isEven && "lg:order-2")}>
          <motion.div variants={fadeUpVariants} custom={0} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
              <Icon size={22} className="text-gold-500" />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold-500 font-mono">{service.subtitle}</p>
          </motion.div>

          <motion.h2 variants={fadeUpVariants} custom={0.1} className="font-display text-4xl md:text-5xl font-light">
            {service.title}
          </motion.h2>

          <motion.div variants={fadeUpVariants} custom={0.15} className="divider-gold mr-auto" />

          <motion.p variants={fadeUpVariants} custom={0.2} className="text-[var(--text-secondary)] leading-relaxed text-lg">
            {service.description}
          </motion.p>

          <motion.ul variants={staggerContainerVariants} className="space-y-3">
            {service.features.map((feat, i) => (
              <motion.li
                key={feat}
                variants={fadeUpVariants}
                custom={0.3 + i * 0.08}
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
              >
                <Check size={14} className="text-gold-500 flex-shrink-0" />
                {feat}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUpVariants} custom={0.6}>
            <Link href="/contact" className="btn-primary">
              {service.cta}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Visual block */}
        <motion.div
          variants={fadeUpVariants}
          custom={0.1}
          className={cn("relative", !isEven && "lg:order-1")}
        >
          <div className={cn(
            "aspect-square rounded-4xl glass-card flex items-center justify-center overflow-hidden",
            "bg-gradient-to-br",
            service.gradient
          )}>
            <Icon size={96} className="text-gold-500/20" />
          </div>
          {/* Floating accent */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass-card border border-gold-500/20 flex items-center justify-center">
            <span className="font-display text-3xl text-gradient-gold">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>();

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20">
        <div className="container-luxury text-center" ref={headerRef}>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.p variants={fadeUpVariants} custom={0} className="text-xs tracking-[0.4em] uppercase text-gold-500 font-mono">
              ✦ Our services ✦
            </motion.p>
            <motion.h1 variants={fadeUpVariants} custom={0.1} className="font-display text-5xl md:text-7xl font-light">
              Four disciplines.<br />
              <span className="text-gradient-gold italic">One house.</span>
            </motion.h1>
            <motion.div variants={fadeUpVariants} custom={0.2} className="divider-gold" />
            <motion.p variants={fadeUpVariants} custom={0.3} className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Each service is a world in itself. Together they constitute the most
              complete luxury offer available to private individuals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service detail cards */}
      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}

      {/* CTA */}
      <CTA
        eyebrow="Enquire now"
        heading="Every client begins with a conversation"
        subheading="Our advisors are available seven days a week. There is no sales team — only specialists."
        cta={{ label: "Begin the conversation", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
