"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionMotif from "@/components/ui/SectionMotif";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

export default function GalleryTeaser() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      if (widgetRef.current && widgetRef.current.children.length > 0) {
        setIsLoading(false);
        setHasError(false);
        observer.disconnect();
        clearTimeout(timeoutId);
      }
    });

    if (widgetRef.current) {
      observer.observe(widgetRef.current, { childList: true, subtree: true });
    }

    timeoutId = setTimeout(() => {
      if (widgetRef.current && widgetRef.current.children.length === 0) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="maison-cream-soft px-5 pb-8 pt-6 md:px-8 md:pb-16 md:pt-14" id="gallery">
      <div className="mx-auto max-w-6xl">
        <SectionMotif label="The Lookbook" tone="cream" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 mb-4 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-none md:mb-8 md:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          Masterpieces in Motion
        </motion.h2>

        <div className="my-4 min-h-[100px] md:my-8 md:min-h-[400px] relative">
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
                loading photos...
              </p>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
              <p
                className="font-[family-name:var(--font-raleway)] text-sm font-semibold uppercase tracking-widest text-center"
                style={{ color: "var(--ink-subtle)" }}
              >
                No photos found
              </p>
            </div>
          )}
          <div ref={widgetRef} className="elfsight-app-f28fd4f0-bb16-4fb0-a435-d09ecb6224e9 relative z-10" data-elfsight-app-lazy></div>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center md:mt-9"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 pb-1 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--ink)", borderBottom: "1px solid var(--m-gold)" }}
          >
            Explore the Gallery
            <ArrowRight className="h-3 w-3" style={{ color: "var(--m-gold)" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
