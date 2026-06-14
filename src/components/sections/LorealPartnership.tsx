"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LorealPartnership() {
  return (
    <section className="py-10 md:py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#111111] rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B0000]/20 via-transparent to-[#D4AF37]/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 bg-[#6B0000]/10 rounded-full blur-3xl -ml-8 -mb-8 pointer-events-none" />

          <div className="relative z-10 p-6 md:p-16">
            {/* Header row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 md:h-8 bg-[#D4AF37] rounded-full flex-shrink-0" />
              <span className="font-[family-name:var(--font-raleway)] text-[#D4AF37] text-[9px] md:text-[10px] uppercase tracking-[0.22em] font-bold">
                Official Partnership
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
              {/* Left: Content */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 font-semibold leading-tight"
                >
                  Powered by{" "}
                  <span className="italic text-[#D4AF37]">L'Oréal Professionnel</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white/60 text-sm md:text-base font-light leading-relaxed mb-6 max-w-md"
                >
                  As an exclusive L'Oréal Professionnel partner, we use only the finest professional-grade products and techniques to deliver transformative results.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link
                    href="/booking"
                    className="btn-primary inline-flex items-center px-6 py-3 rounded-full text-white text-[10px] uppercase tracking-[0.18em] font-semibold font-[family-name:var(--font-raleway)]"
                  >
                    Experience the Difference
                  </Link>
                </motion.div>
              </div>

              {/* Right: Feature cards */}
              <div className="space-y-3">
                {[
                  {
                    icon: "verified",
                    title: "Certified Professionals",
                    desc: "L'Oréal certified stylists trained in the latest techniques.",
                  },
                  {
                    icon: "science",
                    title: "Premium Formulations",
                    desc: "Exclusive professional-grade color systems and treatments.",
                  },
                  {
                    icon: "eco",
                    title: "Sustainable Beauty",
                    desc: "Committed to sustainability with L'Oréal's responsible program.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-raleway)] text-white font-bold text-xs mb-0.5 uppercase tracking-wide">{feature.title}</h4>
                      <p className="text-white/50 text-xs font-light leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
