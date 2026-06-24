"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (widgetRef.current && widgetRef.current.children.length > 0) { setIsLoading(false); observer.disconnect(); }
    });
    if (widgetRef.current) observer.observe(widgetRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopNavBar />
      <main className="flex-grow" style={{ background: "var(--cream)", color: "var(--ink)" }}>
        <PageHeader eyebrow="Testimonials" title="What Our Clients Say" subtitle="Real experiences from our valued clients at LB The Hair Studio." />

        <section className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <div className="relative min-h-[500px]">
            {isLoading && (
              <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: "var(--hairline-cream)", borderTopColor: "var(--m-gold)" }} />
                <p className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--m-gold)" }}>loading reviews...</p>
              </div>
            )}
            <div ref={widgetRef} className="elfsight-app-0c49a052-f991-40b3-a464-02f607783705 relative z-10 w-full" data-elfsight-app-lazy />
          </div>
        </section>
      </main>
      <Footer />
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
    </>
  );
}
