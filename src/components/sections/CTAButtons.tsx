"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function CTAButtons() {
  return (
    <section className="maison-cream px-5 pb-2 pt-4 md:px-8 md:pb-4 md:pt-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-3 md:flex-row md:gap-4"
      >
        <Link
          href="/booking"
          className="foil-bg flex w-full items-center justify-center gap-2 rounded-sm py-4 font-[family-name:var(--font-raleway)] text-[12px] font-bold uppercase tracking-[0.14em] md:flex-1"
        >
          Book Appointment
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href="https://wa.me/7878464710"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-sm py-4 font-[family-name:var(--font-raleway)] text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 md:flex-1"
          style={{
            border: "1px solid rgba(176,135,90,0.45)",
            color: "var(--ink)",
            background: "var(--cream-soft)",
          }}
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          Message on WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
