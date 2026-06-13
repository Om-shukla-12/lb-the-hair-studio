"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LorealPartnership() {
  return (
    <section className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#111111] rounded-3xl overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B0000]/20 via-transparent to-[#D4AF37]/10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6B0000]/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-1 h-8 bg-[#D4AF37] rounded-full"></div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold">Official Partnership</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-bold leading-tight"
              >
                Powered by <br />
                <span className="text-[#D4AF37]">L'Oréal Professionnel</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/60 text-lg font-light leading-relaxed mb-8 max-w-md"
              >
                As an exclusive L'Oréal Professionnel partner, we use only the finest professional-grade products and techniques to deliver transformative results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/booking"
                  className="btn-primary inline-flex items-center px-8 py-3.5 rounded-full text-white text-sm uppercase tracking-widest font-semibold"
                >
                  Experience the Difference
                </Link>
              </motion.div>
            </div>

            {/* Right: Feature cards */}
            <div className="space-y-4">
              {[
                {
                  icon: "verified",
                  title: "Certified Professionals",
                  desc: "Our stylists are L'Oréal certified, trained in the latest techniques and trends.",
                },
                {
                  icon: "science",
                  title: "Premium Formulations",
                  desc: "Access to exclusive professional-grade color systems and treatments.",
                },
                {
                  icon: "eco",
                  title: "Sustainable Beauty",
                  desc: "Committed to sustainability with L'Oréal's responsible beauty program.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#D4AF37] text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                    <p className="text-white/50 text-sm font-light leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
