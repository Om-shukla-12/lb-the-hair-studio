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


        {/* Rating badge */}

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
            className="elfsight-app-f54f5610-a497-4e20-8c55-f1be5b5e22c9 relative z-10 w-full"
            data-elfsight-app-lazy
          />
        </motion.div>
      </div>
    </section>
  );
}
