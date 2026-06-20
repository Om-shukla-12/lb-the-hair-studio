"use client";

import { motion } from "framer-motion";

interface SectionMotifProps {
  label: string;
  tone?: "cream" | "noir";
  align?: "center" | "left";
}

export default function SectionMotif({ label, tone = "cream", align = "center" }: SectionMotifProps) {
  const ruleColor = tone === "cream" ? "#E0CBAE" : "rgba(197,163,107,0.4)";
  const labelColor = tone === "cream" ? "#9A7B3E" : "#C2A36B";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
    >
      {align === "center" && (
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${ruleColor})` }} />
      )}
      <span
        className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            align === "center"
              ? `linear-gradient(90deg, ${ruleColor}, transparent)`
              : `linear-gradient(90deg, ${ruleColor}, transparent)`,
        }}
      />
    </motion.div>
  );
}
