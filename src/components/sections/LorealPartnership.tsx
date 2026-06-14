"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: "verified",
    title: "Certified Professionals",
    desc: "Specialists trained in premium color, care, and finishing rituals.",
  },
  {
    icon: "science",
    title: "Professional Products",
    desc: "Salon-grade color systems and treatments selected for lasting polish.",
  },
  {
    icon: "workspace_premium",
    title: "Bespoke Consultation",
    desc: "Each appointment begins with a refined plan for your hair, routine, and occasion.",
  },
];

export default function LorealPartnership() {
  return (
    <section className="px-4 py-10 md:px-8 md:py-16" style={{ background: "var(--bg-soft)" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="luxury-card relative overflow-hidden rounded-2xl"
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(139,0,0,0.06) 0%, transparent 50%, rgba(139,0,0,0.03) 100%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 p-5 md:grid-cols-2 md:p-10 lg:p-12">
            {/* Left */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-px" style={{ background: "var(--primary)" }} />
                <span
                  className="font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.24em]"
                  style={{ color: "var(--accent-text)" }}
                >
                  Official Partnership
                </span>
              </div>

              <h2
                className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
                style={{ color: "var(--text)" }}
              >
                Powered by{" "}
                <span className="italic" style={{ color: "var(--primary)" }}>
                  L&apos;Oreal Professionnel
                </span>
              </h2>

              <p
                className="mt-4 max-w-md text-sm font-light leading-relaxed md:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                Professional products, precise consultation, and elevated finishing make every service feel considered from start to final reveal.
              </p>

              <Link
                href="/booking"
                className="btn-primary mt-6 inline-flex rounded-md px-5 py-3 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                Experience the Difference
              </Link>
            </div>

            {/* Right — feature list */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                  className="flex items-start gap-3 rounded-xl p-3.5 transition-colors duration-300"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md"
                    style={{ background: "rgba(139,0,0,0.10)" }}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ color: "var(--primary)" }}>
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--text)" }}
                    >
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
