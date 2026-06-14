"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-[#111111]"
      style={{ minHeight: "100svh" }}
      id="home"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.55))] z-10" />
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
      <div className="relative z-20 text-center px-5 md:px-8 max-w-3xl mx-auto flex flex-col items-center pt-20 pb-28 md:pt-28 md:pb-20">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 backdrop-blur-sm text-[#D4AF37] text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          L'Oréal Professionnel Partner Salon
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-2xl font-semibold leading-[1.1] tracking-wide"
        >
          The Art of Hair,{" "}
          <span className="italic text-[#D4AF37]">Perfected.</span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-base text-white/75 mb-8 max-w-xs md:max-w-md font-light leading-relaxed"
        >
          Luxury hair transformations in a modern, elegant studio.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link
            href="/booking"
            className="w-full sm:w-auto btn-primary inline-flex items-center justify-center px-7 py-3 rounded-full text-white text-[11px] uppercase tracking-[0.2em] font-semibold"
          >
            Book Appointment
          </Link>
          <a
            href="https://wa.me/7878464710"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/20 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Quick stats strip — mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-6 mt-8 md:mt-10"
        >
          {[
            { val: "500+", label: "Happy Clients" },
            { val: "10+", label: "Expert Stylists" },
            { val: "5★", label: "Rated Salon" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-[family-name:var(--font-cormorant)] text-white text-xl md:text-2xl font-semibold leading-none">{stat.val}</div>
              <div className="font-[family-name:var(--font-raleway)] text-white/50 text-[8px] uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on very small screens */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <span className="material-symbols-outlined text-white/50 text-2xl">expand_more</span>
      </motion.div>

      {/* Mobile floating bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-30 sm:hidden"
      >
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-around">
          <a href="tel:+917878464710" className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">call</span>
            <span className="font-[family-name:var(--font-raleway)] text-[8px] uppercase tracking-wider">Call</span>
          </a>
          <Link href="/booking" className="flex flex-col items-center gap-1 bg-[#8B0000] text-white px-5 py-2 rounded-full">
            <span className="font-[family-name:var(--font-raleway)] text-[10px] uppercase tracking-wider font-bold">Book Now</span>
          </Link>
          <a href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span className="font-[family-name:var(--font-raleway)] text-[8px] uppercase tracking-wider">Find Us</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
