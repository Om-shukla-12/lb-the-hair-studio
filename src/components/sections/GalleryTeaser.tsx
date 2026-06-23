"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionMotif from "@/components/ui/SectionMotif";
import Script from "next/script";

export default function GalleryTeaser() {
  return (
    <section className="maison-cream-soft px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14" id="gallery">
      <div className="mx-auto max-w-6xl">
        <SectionMotif label="The Lookbook" tone="cream" />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 mb-8 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-none md:text-5xl"
          style={{ color: "var(--ink)" }}
        >
          Masterpieces in Motion
        </motion.h2>

        <div className="my-8 min-h-[400px]">
          <div className="elfsight-app-f28fd4f0-bb16-4fb0-a435-d09ecb6224e9" data-elfsight-app-lazy></div>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-9 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 pb-1 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--ink)", borderBottom: "1px solid var(--m-gold)" }}
          >
            Explore the Gallery
            <ArrowRight className="h-3 w-3" style={{ color: "var(--m-gold)" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
