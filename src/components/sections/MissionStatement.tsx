"use client";

import { motion } from "framer-motion";

export default function MissionStatement() {
  return (
    <section className="px-5 py-12 md:px-8 md:py-20" style={{ background: "var(--cream)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] overflow-hidden rounded-2xl md:h-[550px]"
          style={{ border: "1px solid rgba(176,135,90,0.3)" }}
        >
          <img
            alt="Interior view of LB The Hair Studio"
            className="absolute inset-0 h-full w-full object-cover"
            src="/photos/unnamed2.png"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(33,26,24,0.25), transparent)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-6 w-[3px] rounded-sm" style={{ background: "var(--m-gold)" }} />
            <span
              className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--m-gold-deep)" }}
            >
              The Mission
            </span>
          </div>

          <h2
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            Confidence and Elegance, Mastered.
          </h2>

          <p
            className="mt-4 text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            Our philosophy is rooted in the belief that true luxury is whispering, not shouting.
            We curate bespoke styles that enhance your natural beauty, ensuring every client leaves
            feeling empowered, sophisticated, and undeniably elegant.
          </p>
          <p
            className="mt-3 text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            We use only the finest professional-grade
            products and techniques to deliver transformative results.
          </p>
          <p
            className="mt-3 text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--ink-muted)" }}
          >
            Every appointment is a curated journey — from the moment you step into our sanctuary,
            you are enveloped in an atmosphere of serene exclusivity.
          </p>

          <div className="mt-6 h-px w-20" style={{ background: "linear-gradient(90deg, var(--m-gold), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
