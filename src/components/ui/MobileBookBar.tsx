"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function MobileBookBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 500);
  });

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="px-4 pb-3 pt-2"
        style={{ background: "linear-gradient(180deg, transparent, rgba(245,239,232,0.95) 30%)" }}
      >
        <Link
          href="/booking"
          className="foil-bg flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-[family-name:var(--font-raleway)] text-[12px] font-bold uppercase tracking-[0.12em]"
          style={{ boxShadow: "0 -4px 20px rgba(110,26,43,0.2)" }}
        >
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
