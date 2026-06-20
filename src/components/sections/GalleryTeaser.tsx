"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionMotif from "@/components/ui/SectionMotif";

const galleryImages = [
  { src: "/photos/unnamed2.png", alt: "Luxury styled hair transformation", label: "Balayage" },
  { src: "/photos/unnamed3.png", alt: "Premium salon colour result", label: "Editorial" },
  { src: "/photos/unnamed.png", alt: "Signature blowout styling", label: "Blowout" },
  { src: "/photos/unnamed2.png", alt: "Couture colour transformation", label: "Colour" },
  { src: "/photos/unnamed3.png", alt: "Precision cut and finish", label: "Styling" },
];

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

        {/* Framed images */}
        <div className="hide-scrollbar snap-x-mandatory -mx-5 flex gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {galleryImages.slice(0, 5).map((img, i) => (
            <motion.div
              key={`${img.label}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="min-w-[55vw] flex-shrink-0 snap-start md:min-w-0"
            >
              {/* Gold mat frame */}
              <div className="p-1.5" style={{ background: "var(--cream-soft)", border: "1px solid rgba(198,160,106,0.55)" }}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 55vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div
                className="mt-3 text-center font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--m-gold)" }}
              >
                {img.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator dots — mobile only */}
        <div className="mt-4 flex items-center justify-center gap-1.5 md:hidden">
          {galleryImages.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === 0 ? "16px" : "6px",
                background: i === 0 ? "var(--m-gold)" : "var(--hairline-cream)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
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
