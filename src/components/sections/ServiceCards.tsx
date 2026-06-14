"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { useServices } from "@/hooks/useBooking";
import { Scissors } from "lucide-react";

export default function ServiceCards() {
  const { data: services, isLoading } = useServices();

  // Display top 3 services for homepage
  const displayServices = services?.slice(0, 3) || [];

  return (
    <section className="py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto" id="services">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <span className="font-[family-name:var(--font-raleway)] text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-bold mb-3 block">
          Our Offerings
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl text-[#111111] mb-3 font-semibold leading-tight">
          Curated Services
        </h2>
        <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-4" />
        <p className="text-[#5A5A5A] max-w-xs md:max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
          Elevating your personal style through precision techniques and premium products.
        </p>
      </motion.div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 md:h-72 rounded-2xl bg-white/50 animate-pulse border border-[#E6E0DA]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <GlassCard className="p-5 md:p-8 hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(139,0,0,0.08)] transition-all duration-500 ease-out cursor-pointer group relative overflow-hidden h-full flex flex-col bg-white border-[#E6E0DA]">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none group-hover:bg-[#D4AF37]/15 transition-colors duration-700" />

                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8B0000]/5 flex items-center justify-center text-[#8B0000] group-hover:bg-gradient-to-br group-hover:from-[#8B0000] group-hover:to-[#5C0000] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Scissors className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-[family-name:var(--font-raleway)] text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-2.5 py-1 rounded-full">
                    {service.tag || "Signature"}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-[#111111] mb-2 md:mb-3 group-hover:text-[#8B0000] transition-colors font-semibold leading-tight">
                  {service.name}
                </h3>

                <p className="text-[#5A5A5A] mb-4 md:mb-6 flex-grow text-xs md:text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                  {service.description || "Experience luxury styling tailored to your unique essence and lifestyle."}
                </p>

                <div className="flex items-center justify-between border-t border-[#E6E0DA] pt-3 md:pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-cormorant)] text-[#111111] text-lg md:text-xl font-semibold">
                      {service.currency === 'INR' ? '₹' : service.currency}{parseFloat(service.price).toLocaleString()}
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-[9px] text-[#5A5A5A] uppercase tracking-wider">{service.duration_minutes} min</span>
                  </div>
                  <Link
                    href="/booking"
                    className="flex items-center gap-1 bg-[#8B0000] text-white text-[9px] md:text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-full hover:bg-[#5C0000] transition-colors duration-300"
                  >
                    Book
                    <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="text-center mt-10 md:mt-16"
      >
        <Link
          href="/services"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#E6E0DA] text-[#111111] hover:bg-white hover:shadow-md transition-all duration-300 text-[10px] uppercase tracking-[0.18em] font-semibold font-[family-name:var(--font-raleway)]"
        >
          View Full Service Menu
        </Link>
      </motion.div>
    </section>
  );
}
