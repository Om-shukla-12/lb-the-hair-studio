"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function GalleryTeaser() {
  return (
    <section
      className="relative overflow-hidden px-4 py-12 md:px-8 md:py-18"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
      id="gallery"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <span
            className="mb-3 block font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "var(--accent-text)" }}
          >
            The Lookbook
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-tight md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Masterpieces in motion.
          </h2>
          <p
            className="mt-4 max-w-md text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Explore recent transformations with polished color, movement, and finish created for real clients.
          </p>

          <ul className="mt-5 space-y-2">
            {["Lived-in balayage", "Editorial styling", "Signature blowouts"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
            style={{
              border: "1px solid var(--border)",
              color: "var(--accent-text)",
              background: "var(--surface)",
            }}
          >
            Explore Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Right images */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-5 gap-2 lg:col-span-7"
        >
          <div
            className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <Image
              src="/photos/unnamed2.png"
              alt="Luxury styled hair transformation"
              fill
              sizes="(min-width: 1024px) 45vw, 60vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="col-span-2 grid gap-2">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl"
              style={{ border: "1px solid var(--border)" }}
            >
              <Image
                src="/photos/unnamed3.png"
                alt="Premium salon color result"
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div
              className="luxury-card flex min-h-28 flex-col justify-end rounded-xl p-4"
            >
              <span
                className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold"
                style={{ color: "var(--accent-text)" }}
              >
                500+
              </span>
              <span
                className="font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--text-subtle)" }}
              >
                Client looks
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
