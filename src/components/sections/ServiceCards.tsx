"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Scissors } from "lucide-react";
import { useServices } from "@/hooks/useBooking";
import ScissorsLoader from "@/components/ui/ScissorsLoader";

export default function ServiceCards() {
  const { data: services, isLoading } = useServices();
  const displayServices = services?.slice(0, 4) || [];

  return (
    <section className="luxury-shell px-4 py-12 md:px-8 md:py-18" id="services">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex flex-col justify-between gap-4 md:mb-9 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span
              className="mb-2 block font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "var(--accent-text)" }}
            >
              Signature Services
            </span>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-tight md:text-5xl"
              style={{ color: "var(--text)" }}
            >
              Precision, color, and finish.
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed md:text-[15px]"
            style={{ color: "var(--text-muted)" }}
          >
            Compact, curated treatments using professional products and exacting salon technique.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex w-full items-center justify-center py-12">
            <ScissorsLoader message="Loading services..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {displayServices.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="luxury-card group flex min-h-[190px] flex-col rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
                style={{ cursor: "pointer" }}
              >
                {/* Top row */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-300"
                    style={{
                      background: "rgba(139,0,0,0.10)",
                      border: "1px solid rgba(139,0,0,0.14)",
                      color: "var(--primary)",
                    }}
                  >
                    <Scissors className="h-4 w-4" />
                  </div>
                  <span
                    className="rounded-md px-2 py-1 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.16em]"
                    style={{
                      background: "rgba(139,0,0,0.06)",
                      border: "1px solid rgba(139,0,0,0.12)",
                      color: "var(--primary)",
                    }}
                  >
                    {service.tag || "Signature"}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold leading-none transition-colors duration-300"
                  style={{ color: "var(--text)" }}
                >
                  {service.name}
                </h3>

                <p
                  className="mt-2 line-clamp-2 flex-grow text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {service.description}
                </p>

                {/* Footer */}
                <div
                  className="mt-4 flex items-end justify-between pt-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div>
                    <div
                      className="font-[family-name:var(--font-cormorant)] text-xl font-semibold leading-none"
                      style={{ color: "var(--text)" }}
                    >
                      {service.currency === "INR" ? "Rs. " : service.currency}
                      {parseFloat(service.price).toLocaleString()}
                    </div>
                    <div
                      className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <Clock className="h-3 w-3" />
                      {service.duration_minutes} min
                    </div>
                  </div>
                  <Link
                    href="/booking"
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)] text-white transition-all duration-300 hover:bg-[#6D071A]"
                    aria-label={`Book ${service.name}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 pb-1 font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-[0.18em] transition-colors"
            style={{
              borderBottom: "1px solid var(--primary)",
              color: "var(--primary)",
            }}
          >
            Explore all services
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
