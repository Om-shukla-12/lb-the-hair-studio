"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const values = [
  {
    mark: "✦",
    title: "Precision Craft",
    desc: "Every cut is architecturally considered — blending technique with individual bone structure and lifestyle.",
  },
  {
    mark: "✦",
    title: "Premium Products",
    desc: "Exclusively powered by L'Oréal Professionnel — the gold standard in salon-grade colour, care, and styling.",
  },
  {
    mark: "✦",
    title: "Personal Touch",
    desc: "No two clients leave looking the same. Every visit begins with a bespoke consultation tailored to you.",
  },
];

export default function StylistGrid() {
  return (
    <section className="px-5 py-12 md:px-8 md:py-20" style={{ background: "var(--cream-soft)" }}>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-14"
        >
          <span
            className="mb-2 block font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--m-gold-deep)" }}
          >
            Why LB
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold md:text-5xl"
            style={{ color: "var(--ink)" }}
          >
            The LB Difference
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 rounded-xl px-5 py-5"
              style={{ background: "var(--cream)", border: "1px solid rgba(176,135,90,0.2)" }}
            >
              <div className="foil-text flex-shrink-0 font-[family-name:var(--font-cormorant)] text-2xl">{value.mark}</div>
              <div>
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl"
                  style={{ color: "var(--ink)" }}
                >
                  {value.title}
                </h3>
                <p className="mt-1.5 text-[13px] font-light leading-relaxed md:text-sm" style={{ color: "var(--ink-muted)" }}>
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="mx-auto max-w-md font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed md:text-2xl" style={{ color: "var(--ink)" }}>
            &ldquo;Your hair is the crown you never take off.&rdquo;
          </div>
          <div className="mx-auto mt-4 h-px w-12" style={{ background: "linear-gradient(90deg, transparent, var(--m-gold), transparent)" }} />
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/booking"
            className="foil-bg inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            Book Your Visit
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
