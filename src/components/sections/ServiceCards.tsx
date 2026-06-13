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
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#FAF9F6]" id="services">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#8B0000]/10 rounded-full flex items-center justify-center">
            <Scissors className="w-8 h-8 text-[#8B0000]" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[#111111] mb-4 font-bold">Curated Services</h2>
        <div className="w-24 h-px bg-[#8B0000]/30 mx-auto mb-6"></div>
        <p className="text-[#5A5A5A] max-w-xl mx-auto text-lg font-light">
          Elevating your personal style through precision techniques and premium products.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/50 animate-pulse border border-[#E6E0DA]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GlassCard className="p-8 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(139,0,0,0.08)] transition-all duration-500 ease-out cursor-pointer group relative overflow-hidden h-full flex flex-col bg-white border-[#E6E0DA]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-[#D4AF37]/15 transition-colors duration-700"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#8B0000]/5 flex items-center justify-center text-[#8B0000] group-hover:bg-gradient-to-br group-hover:from-[#8B0000] group-hover:to-[#5C0000] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                    {service.tag || "Signature"}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl text-[#111111] mb-3 group-hover:text-[#8B0000] transition-colors font-bold">{service.name}</h3>
                
                <p className="text-[#5A5A5A] mb-6 flex-grow text-sm font-light leading-relaxed line-clamp-3">
                  {service.description || "Experience luxury styling tailored to your unique essence and lifestyle."}
                </p>
                
                <div className="flex items-center justify-between border-t border-[#E6E0DA] pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[#111111] font-bold">
                      {service.currency === 'INR' ? '₹' : service.currency}{parseFloat(service.price).toLocaleString()}
                    </span>
                    <span className="text-xs text-[#5A5A5A]">{service.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center text-[#8B0000] text-sm uppercase tracking-wider font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    <span>Book</span>
                    <span className="material-symbols-outlined text-sm ml-1">arrow_right_alt</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-16"
      >
        <Link href="/services" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-[#E6E0DA] text-[#111111] hover:bg-white hover:shadow-md transition-all duration-300 text-sm uppercase tracking-widest font-semibold">
          View Full Service Menu
        </Link>
      </motion.div>
    </section>
  );
}
