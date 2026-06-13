"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function GalleryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      className="py-16 md:py-24 bg-[#111111] text-white overflow-hidden relative"
      id="gallery"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.4))] z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 lg:pr-12"
          >
            <span className="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-bold mb-4 block">The Lookbook</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight font-bold">
              Masterpieces in Motion.
            </h2>
            <p className="text-gray-300 mb-7 text-base font-light leading-relaxed">
              Every client is a canvas. Browse our gallery of recent transformations, showcasing our dedication to modern femininity and cinematic style.
            </p>

            <ul className="space-y-3 mb-8">
              {["Lived-in Balayage", "Editorial Styling", "Signature Blowouts"].map((item) => (
                <li key={item} className="flex items-center text-gray-200 text-sm">
                  <span className="material-symbols-outlined text-[#D4AF37] mr-3 text-lg">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/gallery"
              className="inline-flex items-center text-[#D4AF37] text-sm uppercase font-semibold tracking-wider hover:text-white transition-colors duration-300 group"
            >
              Explore Gallery
              <span className="material-symbols-outlined ml-2 text-lg group-hover:translate-x-2 transition-transform">
                trending_flat
              </span>
            </Link>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative group"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#6B0000]/20 to-transparent blur-2xl rounded-full z-0 group-hover:from-[#6B0000]/40 transition-colors duration-700" />

            {/* Card */}
            <div className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-shadow duration-700">
              {/* Fixed-height container to prevent layout shift */}
              <div className="relative w-full" style={{ paddingBottom: "62%" }}>
                <motion.div
                  style={{ y }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <img
                    alt="Luxury hair styling at LB The Hair Studio"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                    src="/photos/unnamed2.png"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.35))] pointer-events-none" />
                </motion.div>

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-500 z-10">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white mb-2 border border-white/20 uppercase tracking-widest font-medium">
                    Signature Color
                  </span>
                  <h4 className="font-serif text-xl text-white font-bold">Crimson Cascade</h4>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
