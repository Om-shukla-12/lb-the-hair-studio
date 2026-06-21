"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const modelsY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <section
      className="relative isolate min-h-[65svh] overflow-hidden md:min-h-[90svh]"
      style={{ background: "linear-gradient(160deg, #363B30 0%, #2C312A 55%, #262A23 100%)" }}
      id="home"
    >
      {/* Warm amber glow + subtle vignette on the olive backdrop */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(200,146,74,0.16), transparent 62%)" }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, rgba(38,42,35,0.55) 0%, rgba(38,42,35,0) 28%, rgba(38,42,35,0) 70%, rgba(38,42,35,0.45) 100%)" }}
      />

      {/* Eyebrow + Headline stacked tightly together */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: easeOutExpo }}
        className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-24 md:pt-28"
      >
        {/* L'Oréal partner label — mobile only */}
        <span
          className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.22em] md:hidden"
          style={{ color: "rgba(241,236,224,0.7)" }}
        >
          Artistic Unisex salon
        </span>

        {/* Gold divider — mobile only */}
        <div
          className="mt-3 h-px w-16 md:hidden"
          style={{ background: "linear-gradient(90deg, transparent, #C8924A, transparent)" }}
        />

        {/* Headline — mobile only (hidden on desktop) */}
        <h1
          className="mt-3 px-2 text-center font-[family-name:var(--font-cormorant)] text-[2.4rem] font-semibold leading-[1] sm:text-5xl md:hidden"
          style={{ color: "#F1ECE0", letterSpacing: "-0.01em" }}
        >
          The <span className="italic" style={{ color: "#C8924A" }}>Story</span>
          <br />
          of <span style={{ color: "#C8924A" }}>Limbachiya Brothers</span>
        </h1>
      </motion.div>

      {/* Models — FOREGROUND transparent cutout */}
      <motion.div
        style={{ y: modelsY }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: easeOutExpo }}
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/hero-models.png"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            if (!el.src.endsWith("lbimage.png")) el.src = "/photos/lbimage.png";
          }}
          alt="LB The Hair Studio — signature cuts and colour for men and women"
          className="h-auto w-full max-w-[680px] object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
        />
      </motion.div>

      {/* Desktop-only: L'Oréal label at top of hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden md:flex md:flex-col md:items-center md:pt-28"
      >
        <span
          className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "rgba(241,236,224,0.75)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          Artistic Unisex salon
        </span>
        <div
          className="mt-3 h-px w-16"
          style={{ background: "linear-gradient(90deg, transparent, #C8924A, transparent)" }}
        />
      </motion.div>

      {/* Desktop-only headline — bottom anchored with text shadow for readability */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: easeOutExpo }}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-40 hidden md:flex md:justify-center md:px-6"
      >
        <h1
          className="text-center font-[family-name:var(--font-cormorant)] text-8xl font-semibold leading-[0.84] lg:text-[7.5rem]"
          style={{
            color: "#F1ECE0",
            letterSpacing: "-0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)",
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

      {/* Extended cream fade — seamless handoff */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 h-32 md:h-40"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,239,232,0.4) 40%, var(--cream) 100%)" }}
      />
    </section>
  );
}
