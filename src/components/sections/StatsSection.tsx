"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 2000, suffix: "+", label: "Transformations", desc: "Signature cuts & colour" },
  { value: 4.9, suffix: "", label: "Google Rated", decimal: true, desc: "Perfect score" },
  { value: 200, suffix: "+", label: "Loyal Clients", desc: "And growing" },
];

function AnimatedCounter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <span className="foil-text font-[family-name:var(--font-cormorant)] text-[2rem] font-semibold leading-none md:text-4xl">
        {decimal ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="maison-cream px-5 pb-10 pt-2 md:px-8 md:pb-14 md:pt-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-stretch justify-between">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-1 items-center">
              {i > 0 && <div className="h-12 w-px" style={{ background: "var(--hairline-cream)" }} />}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 text-center"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                <div
                  className="mt-2 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "var(--ink-subtle)" }}
                >
                  {stat.label}
                </div>
                <div
                  className="mt-1 hidden text-[12px] font-light md:block"
                  style={{ color: "var(--ink-subtle)" }}
                >
                  {stat.desc}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
