"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Script from "next/script";



export default function Reviews() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-24 pb-16" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {/* Hero */}
        <section className="relative py-20 bg-[#111111] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B0000]/30 via-transparent to-[#D4AF37]/10 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-4 block"
            >
              Testimonials
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl text-white font-bold mb-4"
            >
              What Our Clients Say
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 max-w-xl mx-auto text-lg font-light"
            >
              Real experiences from our valued clients at LB The Hair Studio.
            </motion.p>
          </div>
        </section>

        {/* Google Reviews Widget */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 min-h-[500px]">
          <div className="elfsight-app-0c49a052-f991-40b3-a464-02f607783705" data-elfsight-app-lazy></div>
        </section>
      </main>
      <Footer />
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
    </>
  );
}
