"use client";

import Script from "next/script";
import { motion } from "framer-motion";

export default function ReviewsWidget() {
  return (
    <section
      className="relative overflow-hidden px-4 py-12 md:px-8 md:py-18"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span
            className="mb-3 block font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "var(--accent-text)" }}
          >
            Client Love
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-tight md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="min-h-[400px]"
        >
          {/* Elfsight Google Reviews | Lb the hair studio */}
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-cff80c6c-abd1-4f3b-bd0a-6353f6c883a5" data-elfsight-app-lazy></div>
        </motion.div>
      </div>
    </section>
  );
}
