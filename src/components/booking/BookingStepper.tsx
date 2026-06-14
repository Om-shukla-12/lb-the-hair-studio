"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 sm:px-6">
      <div className="relative flex items-center justify-between w-full">
        {/* Progress track */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px]"
          style={{ background: "var(--border)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "var(--primary)" }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          return (
            <div key={step} className="relative flex flex-col items-center z-10">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    isCompleted || isActive ? "#8B0000" : "var(--surface)",
                  borderColor:
                    isCompleted || isActive ? "#8B0000" : "var(--border)",
                  scale: isActive ? 1.08 : 1,
                  boxShadow: isActive ? "0 0 20px rgba(139,0,0,0.25)" : "none",
                }}
                className="w-8 h-8 rounded-md border-2 flex items-center justify-center transition-colors duration-300 text-white"
                style={{
                  color: isCompleted || isActive ? "#fff" : "var(--text-subtle)",
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
              <div className="absolute top-10 hidden sm:block text-center w-20 -ml-10 left-1/2">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: isActive || isCompleted ? "var(--primary)" : "var(--text-subtle)",
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
