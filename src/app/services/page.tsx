"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useServices } from "@/hooks/useBooking";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Clock, Search, ChevronDown, Filter } from "lucide-react";
import ScissorsLoader from "@/components/ui/ScissorsLoader";

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const groupedServices = useMemo(() => {
    if (!services) return {};
    let filtered = services;
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.tag || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (genderFilter !== "All") {
      filtered = filtered.filter((s) => !s.gender || s.gender.toLowerCase() === genderFilter.toLowerCase() || s.gender.toLowerCase() === "unisex" || s.gender.toLowerCase() === "both");
    }
    if (selectedCategoryFilter !== "All") {
      filtered = filtered.filter((s) => (s.tag || "Other") === selectedCategoryFilter);
    }
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((s) => {
      const cat = s.tag || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [services, searchQuery, genderFilter, selectedCategoryFilter]);

  const allCategories = useMemo(() => {
    if (!services) return ["All"];
    const tags = Array.from(new Set(services.map((s) => s.tag || "Other")));
    const orderPriority = ["haircut", "beard", "hair color", "haircolor", "color", "styling", "treatment", "facial"];
    tags.sort((a, b) => {
      const aIdx = orderPriority.findIndex(p => a.toLowerCase().includes(p));
      const bIdx = orderPriority.findIndex(p => b.toLowerCase().includes(p));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.localeCompare(b);
    });
    return ["All", ...tags];
  }, [services]);

  const categories = useMemo(() => {
    const keys = Object.keys(groupedServices);
    const orderPriority = ["haircut", "beard", "hair color", "haircolor", "color", "styling", "treatment", "facial"];
    return keys.sort((a, b) => {
      const aIdx = orderPriority.findIndex(p => a.toLowerCase().includes(p));
      const bIdx = orderPriority.findIndex(p => b.toLowerCase().includes(p));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [groupedServices]);

  useEffect(() => {
    if (categories.length > 0 && openCategory === null) {
      setOpenCategory(categories[0]);
    }
  }, [categories, openCategory]);

  const toggleCategory = (cat: string) => {
    setOpenCategory((prev) => (prev === cat ? null : cat));
  };

  return (
    <>
      <TopNavBar />
      <main className="flex-grow" style={{ background: "var(--cream)", color: "var(--ink)" }}>
        <PageHeader
          eyebrow="Artistic Unisex Salon"
          title="Our Services"
          subtitle="Luxury treatments crafted with premium products."
        />

        <section className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-md space-y-4"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--ink-subtle)" }} />
              <input
                type="text"
                className="w-full rounded-lg py-3 pl-10 pr-4 text-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: "var(--cream-soft)",
                  border: "1px solid rgba(176,135,90,0.3)",
                  color: "var(--ink)",
                }}
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Gender Filter */}
            <div className="flex items-center gap-2 justify-center">
              <Filter className="h-4 w-4" style={{ color: "var(--ink-subtle)" }} />
              <div className="flex gap-2">
                {["All", "Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                      genderFilter === gender
                        ? "text-white shadow-sm"
                        : "border border-[rgba(176,135,90,0.3)] text-[var(--ink-subtle)] hover:bg-[rgba(176,135,90,0.1)]"
                    }`}
                    style={{
                      background: genderFilter === gender ? "var(--m-gold)" : "var(--cream-soft)",
                    }}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex overflow-x-auto hide-scrollbar gap-1.5 pb-1 -mx-5 px-5 md:mx-0 md:px-0 pt-2">
              {allCategories.map((cat) => {
                const isSelected = selectedCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? "text-white shadow-sm"
                        : "border border-[rgba(176,135,90,0.3)] text-[var(--ink-subtle)] hover:bg-[rgba(176,135,90,0.1)]"
                    }`}
                    style={{
                      background: isSelected ? "var(--m-gold)" : "var(--cream-soft)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Accordion categories */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <ScissorsLoader message="Loading services..." />
            </div>
          ) : categories.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-md py-16 text-center">
              <Search className="mx-auto mb-3 h-8 w-8" style={{ color: "var(--ink-subtle)" }} />
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold" style={{ color: "var(--ink)" }}>No services found</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-subtle)" }}>Try adjusting your search.</p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              {categories.map((category, catIndex) => {
                const isOpen = openCategory === category;
                const categoryServices = groupedServices[category];

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: catIndex * 0.05 }}
                    className="overflow-hidden rounded-lg"
                    style={{ border: "1px solid rgba(176,135,90,0.25)" }}
                  >
                    {/* Category header — clickable */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 md:px-6 md:py-5"
                      style={{
                        background: isOpen ? "var(--cream-2)" : "var(--cream-soft)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full"
                          style={{
                            background: isOpen ? "var(--m-gold-deep)" : "rgba(176,135,90,0.12)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <span
                            className="font-[family-name:var(--font-cormorant)] text-sm font-semibold italic"
                            style={{ color: isOpen ? "#F3E4D8" : "var(--m-gold)" }}
                          >
                            {categoryServices.length}
                          </span>
                        </div>
                        <div>
                          <h3
                            className="font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl"
                            style={{ color: "var(--ink)" }}
                          >
                            {category}
                          </h3>
                          <span
                            className="font-[family-name:var(--font-raleway)] text-[11px] font-semibold uppercase tracking-[0.10em]"
                            style={{ color: "var(--ink-subtle)" }}
                          >
                            {categoryServices.length} {categoryServices.length === 1 ? "service" : "services"}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ChevronDown className="h-5 w-5" style={{ color: "var(--m-gold)" }} />
                      </motion.div>
                    </button>

                    {/* Expanded service list */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 md:px-4 md:pb-4" style={{ background: "var(--cream-soft)" }}>
                            {categoryServices.map((service, idx) => (
                              <Link
                                key={service.id}
                                href="/booking"
                                className="maison-row flex items-center gap-3.5 px-2 py-3.5 md:px-3 md:py-4"
                                style={{
                                  borderTop: idx === 0 ? "none" : "1px solid var(--hairline-cream)",
                                }}
                              >
                                <span
                                  className="w-8 flex-shrink-0 font-[family-name:var(--font-cormorant)] text-sm italic"
                                  style={{ color: "var(--m-gold)" }}
                                >
                                  {ROMAN[idx % ROMAN.length]}.
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div
                                    className="font-[family-name:var(--font-cormorant)] text-lg font-semibold leading-tight md:text-xl"
                                    style={{ color: "var(--ink)" }}
                                  >
                                    {service.name}
                                  </div>
                                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                                    <span
                                      className="flex items-center font-[family-name:var(--font-raleway)] text-[11px] font-semibold uppercase tracking-[0.08em]"
                                      style={{ color: "var(--ink-subtle)" }}
                                    >
                                      <Clock className="h-3 w-3 mr-1" />
                                      {service.duration_minutes} min
                                    </span>
                                    {service.tag && (
                                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "rgba(176,135,90,0.1)", color: "var(--m-gold-deep)" }}>
                                        {service.tag}
                                      </span>
                                    )}
                                    {service.gender && (
                                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-subtle)" }}>
                                        {service.gender}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0 ml-2">
                                  <span
                                    className="font-[family-name:var(--font-cormorant)] text-base font-semibold md:text-lg leading-none"
                                    style={{ color: "var(--ink)" }}
                                  >
                                    {service.currency === "INR" ? "₹" : service.currency}
                                    {parseFloat(service.price).toLocaleString()}
                                  </span>
                                  <span className="text-[9px] uppercase tracking-wider mt-1" style={{ color: "var(--ink-subtle)" }}>on words</span>
                                </div>
                                <ArrowRight
                                  className="maison-row-arrow h-4 w-4 flex-shrink-0 ml-2"
                                  style={{ color: "var(--m-gold)" }}
                                />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 text-center">
            <Link href="/booking" className="foil-bg inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]">
              Book Appointment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
