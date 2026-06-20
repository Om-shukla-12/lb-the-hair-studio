"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";

const featuredQuotes = [
  { text: "Best salon experience in Ahmedabad. The team truly understands premium grooming.", author: "Google Review" },
  { text: "L'Oréal products, immaculate hygiene, and a result that exceeded expectations.", author: "Google Review" },
];

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

        {/* Rating badge */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mx-auto -mt-4 mb-6 flex w-fit items-center gap-3 px-5 py-3" style={{ background: "var(--cream-soft)", border: "1px solid rgba(176,135,90,0.3)" }}>
          <span className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold" style={{ color: "var(--ink)" }}>5.0</span>
          <div>
            <div className="text-sm tracking-widest" style={{ color: "var(--m-gold)" }}>★★★★★</div>
            <div className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--ink-subtle)" }}>Google Reviews</div>
          </div>
        </motion.div>

        {/* Featured pull quotes */}
        <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-4 px-5 md:flex-row md:px-8">
          {featuredQuotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-1 px-5 py-5"
              style={{ background: "var(--cream-soft)", border: "1px solid rgba(176,135,90,0.2)" }}
            >
              <div className="foil-text mb-2 font-[family-name:var(--font-cormorant)] text-2xl leading-none">&ldquo;</div>
              <p className="text-[13px] font-light italic leading-relaxed" style={{ color: "var(--ink)" }}>
                {q.text}
              </p>
              <div className="mt-3 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--m-gold-deep)" }}>
                — {q.author}
              </div>
            </motion.div>
          ))}
        </div>

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
