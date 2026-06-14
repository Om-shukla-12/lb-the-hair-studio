"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GalleryTeaser() {
  return (
    <section
      className="py-12 md:py-24 bg-[#111111] text-white overflow-hidden relative"
      id="gallery"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35))] z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Mobile: stacked layout — Image first, then text */}
        {/* Desktop: side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">

          {/* Image — on mobile comes first */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-7 lg:order-2 relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#6B0000]/20 to-transparent blur-2xl rounded-full z-0 group-hover:from-[#6B0000]/40 transition-colors duration-700" />

            <div className="relative z-10 w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-shadow duration-700">
              <div className="relative w-full" style={{ paddingBottom: "58%" }}>
                <img
                  alt="Luxury hair styling at LB The Hair Studio"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  src="/photos/unnamed2.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.4))] pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
                  <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] text-white mb-1.5 border border-white/20 uppercase tracking-widest font-medium">
                    Signature Color
                  </span>
                  <h4 className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-white font-semibold">Crimson Cascade</h4>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text — on mobile comes second */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:order-1 lg:pr-12"
          >
            <span className="font-[family-name:var(--font-raleway)] text-[9px] text-[#D4AF37] uppercase tracking-[0.22em] font-bold mb-3 block">
              The Lookbook
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-5 leading-tight font-semibold">
              Masterpieces in Motion.
            </h2>
            <p className="text-gray-300 mb-5 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Every client is a canvas. Browse our gallery of recent transformations showcasing modern femininity and cinematic style.
            </p>

            <ul className="space-y-2 mb-6">
              {["Lived-in Balayage", "Editorial Styling", "Signature Blowouts"].map((item) => (
                <li key={item} className="flex items-center text-gray-200 text-xs md:text-sm">
                  <span className="material-symbols-outlined text-[#D4AF37] mr-2 text-base md:text-lg">check_circle</span>
                  <span className="font-[family-name:var(--font-raleway)] tracking-wide">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/gallery"
              className="inline-flex items-center text-[#D4AF37] text-[10px] uppercase font-semibold tracking-[0.18em] hover:text-white transition-colors duration-300 group font-[family-name:var(--font-raleway)]"
            >
              Explore Gallery
              <span className="material-symbols-outlined ml-2 text-base group-hover:translate-x-2 transition-transform">
                trending_flat
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
