"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const modelsY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <section
      className="relative isolate min-h-[65svh] overflow-hidden md:min-h-[90svh]"
      style={{ background: "linear-gradient(160deg, #2E2E2C 0%, #232321 55%, #1C1C1A 100%)" }}
      id="home"
    >
      {/* Warm amber glow + subtle vignette */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(200,146,74,0.10), transparent 62%)" }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, rgba(28,28,26,0.6) 0%, rgba(28,28,26,0) 28%, rgba(28,28,26,0) 70%, rgba(28,28,26,0.5) 100%)" }}
      />

      {/* Mobile eyebrow — top, in front */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-col items-center pt-24 md:hidden"
      >
        <span
          className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "rgba(241,236,224,0.65)" }}
        >
          Artistic Unisex Salon
        </span>
        <div
          className="mt-3 h-px w-16"
          style={{ background: "linear-gradient(90deg, transparent, #C8924A, transparent)" }}
        />
      </motion.div>

      {/* Mobile headline — bottom, in front of image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-40 flex justify-center px-4 md:hidden"
      >
        <h1
          className="text-center font-[family-name:var(--font-cormorant)] text-[2rem] font-semibold leading-[1.05] sm:text-4xl"
          style={{
            color: "#F1ECE0",
            letterSpacing: "-0.01em",
            textShadow: "0 3px 20px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          The <span className="italic" style={{ color: "#C8924A" }}>Story</span>{" "}
          of <span style={{ color: "#C8924A" }}>Limbachiya Brothers</span>
        </h1>
      </motion.div>

      {/* Brothers photo — foreground */}
      <motion.div
        style={{ y: modelsY }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: easeOutExpo }}
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/Twobrothers.png"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            if (!el.src.endsWith("hero-models.png")) el.src = "/photos/hero-models.png";
          }}
          alt="Nipam & Anand Limbachiya — Founders of LB The Hair Studio"
          className="h-auto w-full max-w-[600px] object-contain object-bottom"
          style={{ filter: "drop-shadow(0 20px 45px rgba(0,0,0,0.5))" }}
        />
      </motion.div>

      {/* Desktop eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden md:flex md:flex-col md:items-center md:pt-28"
      >
        <span
          className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "rgba(241,236,224,0.7)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          Artistic Unisex Salon
        </span>
        <div
          className="mt-3 h-px w-16"
          style={{ background: "linear-gradient(90deg, transparent, #C8924A, transparent)" }}
        />
      </motion.div>

      {/* Desktop headline — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-40 hidden md:flex md:justify-center md:px-6"
      >
        <h1
          className="text-center font-[family-name:var(--font-cormorant)] text-7xl font-semibold leading-[0.88] lg:text-8xl"
          style={{
            color: "#F1ECE0",
            letterSpacing: "-0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          The <span className="italic" style={{ color: "#C8924A" }}>Story</span>{" "}
          of <span style={{ color: "#C8924A" }}>Limbachiya Brothers</span>
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-x-0 bottom-6 z-40 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px"
          style={{ background: "linear-gradient(180deg, rgba(200,146,74,0.6), transparent)" }}
        />
      </motion.div>

      {/* Cream fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 h-32 md:h-40"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,239,232,0.4) 40%, var(--cream) 100%)" }}
      />
    </section>
  );
}
