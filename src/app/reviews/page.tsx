"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The best salon experience I have ever had. The attention to detail is unmatched. Truly a luxury experience.",
    author: "Priya S.",
    service: "Balayage Color",
  },
  {
    quote: "LB The Hair Studio transformed my look completely. The L'Oréal products they use make such a difference in quality.",
    author: "Ananya M.",
    service: "Keratin Treatment",
  },
  {
    quote: "From the moment I walked in, I felt like a VIP. The stylists are incredibly talented and attentive.",
    author: "Rahul K.",
    service: "Precision Haircut",
  },
];

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

        {/* Testimonials Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--surface)] rounded-2xl p-8 border border-[#E6E0DA] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-[#D4AF37] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[var(--text)] text-lg font-light leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
                <div className="border-t border-[#E6E0DA] pt-4">
                  <p className="font-bold text-[var(--text)] text-sm">{t.author}</p>
                  <p className="text-[var(--text-muted)] text-xs">{t.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
