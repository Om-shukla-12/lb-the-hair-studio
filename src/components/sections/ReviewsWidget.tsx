"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SectionMotif from "@/components/ui/SectionMotif";

export default function ReviewsWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (widgetRef.current && widgetRef.current.children.length > 0) {
        setIsLoading(false);
        observer.disconnect();
      }
    });
    if (widgetRef.current) {
      observer.observe(widgetRef.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="maison-cream px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <SectionMotif label="Client Love" tone="cream" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-none md:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          Kind Words
        </motion.h2>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 mb-8 flex w-fit items-center gap-3 px-5 py-3"
          style={{ background: "var(--cream-soft)", border: "1px solid rgba(198,160,106,0.3)" }}
        >
          <span
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold"
            style={{ color: "var(--ink)" }}
          >
            5.0
          </span>
          <div>
            <div className="text-sm tracking-widest" style={{ color: "var(--m-gold)" }}>
              ★★★★★
            </div>
            <div
              className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--ink-subtle)" }}
            >
              Google Reviews
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-[400px]"
        >
          {isLoading && (
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
              <div
                className="mb-4 h-8 w-8 animate-spin rounded-full border-2"
                style={{ borderColor: "var(--hairline-cream)", borderTopColor: "var(--m-gold)" }}
              />
              <p
                className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "var(--m-gold)" }}
              >
                loading reviews...
              </p>
            </div>
          )}
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div
            ref={widgetRef}
            className="elfsight-app-cff80c6c-abd1-4f3b-bd0a-6353f6c883a5 relative z-10 w-full"
            data-elfsight-app-lazy
          />
        </motion.div>
      </div>
    </section>
  );
}
