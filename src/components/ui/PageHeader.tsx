"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36"
      style={{ background: "var(--cream-2)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(181,147,78,0.06), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 text-center md:px-8">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 block font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--m-gold-deep)" }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-tight md:text-6xl"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="mx-auto mt-5 h-px w-12"
          style={{ background: "linear-gradient(90deg, transparent, var(--m-gold), transparent)" }}
        />
      </div>
    </section>
  );
}
