"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-[#111111]"
      style={{ minHeight: "100svh" }}
      id="home"
    >
      {/* Background image with smart positioning */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.30),rgba(0,0,0,0.50))] z-10" />
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/photos/lbimage.png')",
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-5 md:px-8 max-w-4xl mx-auto flex flex-col items-center pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] md:text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-bold mb-4 block"
        >
          L'Oréal Professionnel Partner Salon
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-5 drop-shadow-2xl font-bold leading-tight"
        >
          The Art of Hair,{" "}
          <br />
          <span className="italic text-[#D4AF37]">Perfected.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-lg text-white/85 mb-8 max-w-xl md:max-w-2xl font-light leading-relaxed"
        >
          Luxury hair transformations in a modern, elegant studio. Experience bespoke styling tailored to your unique essence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/booking"
            className="btn-primary inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white text-xs md:text-sm uppercase tracking-widest font-semibold"
          >
            Book Appointment
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <span className="material-symbols-outlined text-white/60 text-3xl">expand_more</span>
      </motion.div>
    </section>
  );
}
