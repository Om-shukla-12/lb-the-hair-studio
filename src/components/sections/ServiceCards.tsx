"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useServices } from "@/hooks/useBooking";
import ScissorsLoader from "@/components/ui/ScissorsLoader";
import SectionMotif from "@/components/ui/SectionMotif";

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

export default function ServiceCards() {
  const { data: services, isLoading } = useServices();

  const groupedServices = useMemo(() => {
    if (!services) return {};
    const groups: Record<string, typeof services> = {};
    services.forEach((s) => {
      const cat = s.tag || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [services]);

  const displayCategories = useMemo(() => Object.keys(groupedServices).slice(0, 6), [groupedServices]);

  return (
    <section className="maison-cream-soft px-5 pb-20 pt-10 md:px-8 md:pb-16 md:pt-14" id="services">
      <div className="mx-auto max-w-6xl">
        <SectionMotif label="Services" tone="cream" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 mb-8 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-none md:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          The Menu
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* Salon interior image — landscape, sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:block"
          >
            <div className="sticky top-28">
              <div className="overflow-hidden" style={{ border: "1px solid rgba(198,160,106,0.4)" }}>
                <div className="p-1.5" style={{ background: "var(--cream)" }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src="/photos/hero-bg.jpg"
                      alt="LB The Hair Studio interior"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <div className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--m-gold)" }}>
                    Artistic Unisex Salon
                  </div>
                  <div className="mt-0.5 font-[family-name:var(--font-cormorant)] text-sm italic" style={{ color: "var(--ink-muted)" }}>
                    Premium products, expert hands
                  </div>
                </div>
                <Link
                  href="/booking"
                  className="foil-bg rounded-sm px-4 py-2 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.10em]"
                >
                  Book
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Service list — parallel to image on desktop */}
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <ScissorsLoader message="Loading services..." />
              </div>
            ) : (
              <div className="flex flex-col">
                {displayCategories.map((category, index) => {
                  const categoryServices = groupedServices[category];
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link
                        href="/services"
                        className="maison-row flex items-center gap-3.5 px-2 py-4 md:px-3 md:py-5"
                        style={{
                          borderTop: "1px solid var(--hairline-cream)",
                          borderBottom: index === displayCategories.length - 1 ? "1px solid var(--hairline-cream)" : "none",
                        }}
                      >
                        <span
                          className="w-7 flex-shrink-0 font-[family-name:var(--font-cormorant)] text-sm italic md:w-9 md:text-base"
                          style={{ color: "var(--m-gold)" }}
                        >
                          {ROMAN[index]}.
                        </span>
                        <div className="min-w-0 flex-1">
                          <div
                            className="font-[family-name:var(--font-cormorant)] text-lg font-semibold leading-tight md:text-xl"
                            style={{ color: "var(--ink)" }}
                          >
                            {category}
                          </div>
                          <div
                            className="mt-1 truncate font-[family-name:var(--font-raleway)] text-[11px] font-semibold uppercase tracking-[0.10em]"
                            style={{ color: "var(--ink-subtle)" }}
                          >
                            {categoryServices.length} {categoryServices.length === 1 ? "Service" : "Services"}
                          </div>
                        </div>
                        <ArrowRight
                          className="maison-row-arrow h-4 w-4 flex-shrink-0"
                          style={{ color: "var(--m-gold)" }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8 mt-16 pb-4 text-center md:mb-4 md:mt-16 md:text-left md:pl-3"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 pb-1 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em] transition-all"
                style={{ color: "var(--ink)", borderBottom: "1px solid var(--m-gold)" }}
              >
                View Full Menu
                <ArrowRight className="h-3 w-3" style={{ color: "var(--m-gold)" }} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
