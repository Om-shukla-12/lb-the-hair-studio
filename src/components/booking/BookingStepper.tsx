"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6">
      <div className="relative flex w-full items-center justify-between">
        {/* Progress track */}
        <div
          className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2"
          style={{ background: "var(--hairline-cream)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "var(--m-gold)" }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    isCompleted || isActive ? "var(--wine)" : "var(--cream-soft)",
                  borderColor:
                    isCompleted || isActive ? "var(--wine)" : "var(--hairline-cream)",
                  scale: isActive ? 1.08 : 1,
                  boxShadow: isActive ? "0 0 20px rgba(110,26,43,0.25)" : "none",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-md border-2 transition-colors duration-300"
                style={{
                  color: isCompleted || isActive ? "#F3E4D8" : "var(--ink-subtle)",
                }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  >
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </motion.div>

              {/* Step label */}
              <div className="absolute top-10 hidden w-20 -translate-x-1/2 text-center sm:block" style={{ left: "50%" }}>
                <span
                  className="font-[family-name:var(--font-raleway)] text-[11px] font-semibold uppercase tracking-[0.10em]"
                  style={{
                    color: isActive || isCompleted ? "var(--m-gold-deep)" : "var(--ink-subtle)",
                  }}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
