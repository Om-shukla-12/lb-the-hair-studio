"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

export default function Gallery() {
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
    <div className="flex min-h-screen flex-col" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      <TopNavBar />
      <main className="flex-grow">
        <PageHeader eyebrow="The Portfolio" title="Masterpieces in Motion" subtitle="Signature transformations, meticulous coloring, and editorial styling." />
        <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14 min-h-[500px] relative">
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
          <div ref={widgetRef} className="elfsight-app-73a4e356-5e02-4757-bf5f-ec474a82ffbe relative z-10" data-elfsight-app-lazy></div>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
