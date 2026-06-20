"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  { mark: "✦", title: "Certified Colourists", desc: "Trained in premium colour & care" },
  { mark: "✦", title: "Salon-Grade Products", desc: "Professional L'Oréal systems" },
  { mark: "✦", title: "Bespoke Consultation", desc: "A refined plan for every visit" },
];

export default function LorealPartnership() {
  return (
    <section className="maison-cream px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14">
          {/* Left: Seal + headline */}
          <div className="text-center md:col-span-5 md:text-left">
            {/* Wax seal crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full md:mx-0 md:h-[110px] md:w-[110px]"
              style={{ border: "1px solid rgba(176,135,90,0.55)" }}
            >
              <div className="absolute rounded-full" style={{ inset: "6px", border: "1px dashed rgba(176,135,90,0.4)" }} />
              <div className="text-center">
                <div className="foil-text font-[family-name:var(--font-cormorant)] text-2xl italic leading-none">
                  L&apos;O
                </div>
                <div
                  className="mt-1 font-[family-name:var(--font-raleway)] text-[8px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--m-gold)" }}
                >
                  Partner
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "var(--m-gold-deep)" }}
            >
              The Partnership
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-tight md:text-5xl"
              style={{ color: "var(--ink)" }}
            >
              Powered by <span className="foil-text italic">L&apos;Oréal Professionnel</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed md:mx-0 md:text-base"
              style={{ color: "var(--ink-muted)" }}
            >
              Professional colour systems, precise consultation, and finishing rituals — refined over years of editorial craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/booking"
                className="foil-bg inline-flex items-center gap-2 rounded-sm px-6 py-3 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
              >
                Experience the Difference
              </Link>
            </motion.div>
          </div>

          {/* Right: Features */}
          <div className="md:col-span-7">
            <div className="flex flex-col gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
                  className="flex items-start gap-4 rounded-lg px-5 py-5 md:px-6 md:py-6"
                  style={{ background: "var(--cream-soft)", border: "1px solid rgba(176,135,90,0.15)" }}
                >
                  <div className="foil-text flex-shrink-0 font-[family-name:var(--font-cormorant)] text-2xl">{feature.mark}</div>
                  <div>
                    <div
                      className="font-[family-name:var(--font-raleway)] text-[12px] font-bold uppercase tracking-[0.12em] md:text-[13px]"
                      style={{ color: "var(--ink)" }}
                    >
                      {feature.title}
                    </div>
                    <div className="mt-1 text-[13px] font-light leading-relaxed md:text-sm" style={{ color: "var(--ink-subtle)" }}>
                      {feature.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
