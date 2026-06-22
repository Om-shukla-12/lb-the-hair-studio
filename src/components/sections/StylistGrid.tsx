"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

const founders = [
  {
    name: "Nipam Limbachiya",
    role: "Co-Founder",
    desc: "With a passion for precision and editorial craft, Nipam brings creative vision to every transformation at LB The Hair Studio.",
    src: "/photos/Nipam.png",
    instagram: "https://www.instagram.com/nipamlimbachiya/",
    handle: "@nipamlimbachiya",
  },
  {
    name: "Anand Limbachiya",
    role: "Co-Founder",
    desc: "Anand's dedication to client experience and premium grooming ensures every visit feels bespoke and effortlessly luxurious.",
    src: "/photos/Anand.png",
    instagram: "https://www.instagram.com/anand__limbachiya/",
    handle: "@anand__limbachiya",
  },
];

export default function StylistGrid() {
  return (
    <section className="px-5 py-12 md:px-8 md:py-20" style={{ background: "var(--cream-soft)" }}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-14"
        >
          <span
            className="mb-2 block font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--m-gold-deep)" }}
          >
            The Founders
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold md:text-5xl"
            style={{ color: "var(--ink)" }}
          >
            Meet the Limbachiya Brothers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group overflow-hidden"
              style={{ border: "1px solid rgba(176,135,90,0.25)", borderRadius: "12px" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden" style={{ background: "#2A2A2A" }}>
                <Image
                  src={founder.src}
                  alt={`Portrait of ${founder.name}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold md:text-3xl"
                    style={{ color: "#F1ECE0" }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="mt-1 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: "#C8924A" }}
                  >
                    {founder.role}
                  </p>
                </div>
              </div>
              <div className="px-5 py-4 md:px-6 md:py-5" style={{ background: "var(--cream)" }}>
                <p className="text-[13px] font-light leading-relaxed md:text-sm" style={{ color: "var(--ink-muted)" }}>
                  {founder.desc}
                </p>
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.10em] transition-colors duration-200 hover:opacity-75"
                  style={{ color: "var(--m-gold-deep)" }}
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  {founder.handle}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="mx-auto max-w-md font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed md:text-2xl" style={{ color: "var(--ink)" }}>
            &ldquo;Your hair is the crown you never take off.&rdquo;
          </div>
          <div className="mx-auto mt-4 h-px w-12" style={{ background: "linear-gradient(90deg, transparent, var(--m-gold), transparent)" }} />
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/booking"
            className="foil-bg inline-flex items-center gap-2 rounded-sm px-6 py-3.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
          >
            Book Your Visit
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
