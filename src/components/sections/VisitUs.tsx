"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import SectionMotif from "@/components/ui/SectionMotif";

export default function VisitUs() {
  return (
    <section className="maison-cream-soft px-5 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <SectionMotif label="Visit Us" tone="cream" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 mb-8 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-none md:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          Find Your Studio
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
          {/* Map */}
          <motion.a
            href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group block overflow-hidden md:col-span-7"
            style={{ background: "var(--cream)", border: "1px solid rgba(176,135,90,0.4)" }}
          >
            <div className="relative overflow-hidden" style={{ height: "280px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.4963!3d23.0527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b2e5dbfffff%3A0xbfaf26d9c6e3e98a!2sLB%20The%20Hair%20Studio!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="280"
                style={{ border: 0, filter: "saturate(0.85) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LB The Hair Studio location"
              />
            </div>
          </motion.a>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center md:col-span-5"
          >
            <div className="font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl" style={{ color: "var(--ink)" }}>
              LB The Hair Studio
            </div>

            <div className="mt-3 flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--m-gold-deep)" }} />
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                26, 1st Floor, Gulab Tower, Saraswati Marg, Off Sola Rd, opp. JG International School, Thaltej, Ahmedabad 380061
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "var(--m-gold-deep)" }} />
              <p className="text-[13px]" style={{ color: "var(--ink-muted)" }}>
                Mon – Sun: 10:00 AM – 9:00 PM
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2.5">
              <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "var(--m-gold-deep)" }} />
              <a href="tel:+917878464710" className="text-[13px] transition-colors hover:underline" style={{ color: "var(--ink-muted)" }}>
                +91 78784 64710
              </a>
            </div>

            <div className="mt-3 h-px w-full" style={{ background: "linear-gradient(90deg, var(--hairline-cream), transparent)" }} />

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-sm py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(176,135,90,0.45)", color: "var(--ink)", background: "var(--cream)" }}
              >
                <MapPin className="h-4 w-4" style={{ color: "var(--m-gold-deep)" }} />
                Get Directions
              </a>
              <Link
                href="/booking"
                className="foil-bg flex flex-1 items-center justify-center gap-2 rounded-sm py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]"
              >
                Book Visit
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
