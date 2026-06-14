"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useServices } from "@/hooks/useBooking";
import { useMemo, useState } from "react";
import { Clock, Search } from "lucide-react";
import ScissorsLoader from "@/components/ui/ScissorsLoader";

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    if (!services) return ["All"];
    const tags = new Set(services.map((s) => s.tag || "Other"));
    return ["All", ...Array.from(tags)];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (!services) return [];
    let filtered = services;
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.tag || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((s) => (s.tag || "Other") === selectedCategory);
    }
    return filtered;
  }, [services, searchQuery, selectedCategory]);

  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-20" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {/* Hero banner */}
        <section className="relative py-20 bg-[#1A1A1A] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/30 via-transparent to-[#D4AF37]/10 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-4 block"
            >
              L'Oréal Professionnel Partner
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed"
            >
              Discover our complete range of luxury services, crafted with premium L'Oréal Professionnel products.
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Search & Filters */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto mb-3">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[var(--text-subtle)]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder-gray-400 focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 transition-all duration-300 shadow-sm text-sm"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Horizontal Scrollable Tag Slider */}
            <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-2 pb-2 px-2 -mx-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[var(--primary)] text-white shadow-md"
                      : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg-soft)] hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service Grid - Compact Apple Style */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <ScissorsLoader message="Loading services..." />
            </div>
          ) : filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16 bg-[var(--surface)] rounded-3xl border border-[var(--border)] max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-[var(--bg-soft)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-[var(--text-subtle)]" />
              </div>
              <h3 className="font-serif text-xl text-[var(--text)] mb-2 font-bold">No services found</h3>
              <p className="text-[var(--text-subtle)] text-sm">Try adjusting your search or category filter.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="bg-[var(--surface)] rounded-2xl p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-pointer flex flex-col h-full border border-[var(--border)]/80 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md">
                        {service.tag || "Other"}
                      </span>
                      <span className="font-bold text-[var(--text)]">
                        {service.currency === 'INR' ? '₹' : service.currency}{parseFloat(service.price).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base text-[var(--text)] mb-1.5 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className="text-[var(--text-subtle)] text-xs font-medium mb-4 line-clamp-2 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-center text-[var(--text-subtle)] text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {service.duration_minutes} min
                      </div>
                      <Link
                        href="/booking"
                        className="text-[var(--primary)] text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300 flex items-center bg-[var(--primary)]/5 px-3 py-1.5 rounded-full group-hover:bg-[var(--primary)]/10"
                      >
                        Book
                        <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_right_alt</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
