"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import MissionStatement from "@/components/sections/MissionStatement";
import StylistGrid from "@/components/sections/StylistGrid";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-20">
        
        <section className="relative min-h-[50vh] flex items-center justify-center pt-20 px-4 md:px-8 overflow-hidden bg-[#FAF8F5]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6B0000]/5 rounded-full blur-[100px] opacity-50"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-6 block font-bold"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl text-gradient mb-8 leading-tight font-bold"
            >
              A Legacy of Luxury.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#5A5A5A] max-w-2xl mx-auto font-light leading-relaxed"
            >
              Founded on the principles of high-fashion artistry and uncompromising quality, LB The Hair Studio redefines the modern beauty experience as an exclusive L'Oréal Professionnel partner. We believe your hair is your ultimate accessory, deserving of editorial precision and quiet elegance.
            </motion.p>
          </div>
        </section>

        <MissionStatement />
        <StylistGrid />
      </main>
      <Footer />
    </>
  );
}
