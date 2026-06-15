"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const stats = [
  { value: "500+", label: "Transformations" },
  { value: "200+", label: "Trusted by Clients" },
  { value: "5 star", label: "Client Rated" },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <section
      className="relative isolate min-h-[94svh] overflow-hidden pt-24 md:min-h-[96svh] md:pt-28"
      style={{ background: "var(--bg)", color: "#fff" }}
      id="home"
    >
      {/* Parallax background image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20">
        <Image
          src="/photos/lbimage.png"
          alt="Luxury hair styling at LB The Hair Studio"
          fill
          sizes="100vw"
          className="object-cover object-[54%_14%] md:object-center"
          priority
        />
      </motion.div>

      {/* Overlay — adapts to theme */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            var(--hero-overlay-h, linear-gradient(90deg, rgba(15,15,16,0.90) 0%, rgba(15,15,16,0.65) 42%, rgba(15,15,16,0.22) 100%)),
            var(--hero-overlay-v, linear-gradient(180deg, rgba(15,15,16,0.18) 0%, rgba(15,15,16,0.72) 78%, #0F0F10 100%))
          `,
        }}
      />
      {/* Fallback per-theme overlay via CSS class */}
      <style>{`
        :root {
          --hero-overlay-h: linear-gradient(90deg, rgba(15,15,16,0.90) 0%, rgba(15,15,16,0.65) 42%, rgba(15,15,16,0.22) 100%);
          --hero-overlay-v: linear-gradient(180deg, rgba(15,15,16,0.18) 0%, rgba(15,15,16,0.72) 78%, var(--bg) 100%);
        }
      `}</style>

      {/* Bottom fade removed as requested */}

      <div className="mx-auto grid min-h-[calc(94svh-6rem)] max-w-7xl grid-cols-1 items-center px-5 pb-20 md:min-h-[calc(96svh-7rem)] md:grid-cols-12 md:px-8 md:pb-16">
        <div className="max-w-3xl md:col-span-7">

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{
              borderLeft: "2px solid var(--primary)",
              color: "white",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
            }}
          >
            L&apos;Oreal Professionnel Partner Salon
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-cormorant)] text-[3.15rem] font-semibold leading-[0.96] sm:text-6xl md:text-7xl lg:text-[5.6rem]"
            style={{ color: "#fff" }}
          >
            LB The Hair Studio
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-xl text-base font-light leading-relaxed md:text-lg"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            Bespoke cuts, luminous color, and camera-ready styling in a refined salon experience designed around you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/booking"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/7878464710"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                backdropFilter: "blur(12px)",
              }}
            >
              <WhatsAppIcon className="h-4 w-4 text-green-500" />
              WhatsApp Consultation
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46 }}
            className="mt-8 grid max-w-xl grid-cols-3 py-4"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="px-3 first:pl-0"
                style={{ borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}
              >
                <div
                  className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold leading-none md:text-3xl"
                  style={{ color: "var(--accent-text)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 border-t px-4 py-2.5 backdrop-blur-xl sm:hidden"
        style={{ borderColor: "var(--border)", background: "var(--overlay)" }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between">
          <a
            href="tel:+917878464710"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-muted)" }}
          >
            <Phone className="h-4 w-4" style={{ color: "var(--primary)" }} />
            Call
          </a>
          <Link href="/booking" className="btn-primary rounded-md px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em]">
            Book Now
          </Link>
          <a
            href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-muted)" }}
          >
            <MapPin className="h-4 w-4" style={{ color: "var(--primary)" }} />
            Visit
          </a>
        </div>
      </div>
    </section>
  );
}
