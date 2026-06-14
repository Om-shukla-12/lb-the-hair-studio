"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-40"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl pointer-events-auto text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: "rgba(139,0,0,0.1)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  <Check size={32} strokeWidth={3} />
                </motion.div>
              </div>
              
              <h2 className="text-3xl font-bold font-serif mb-3" style={{ color: "var(--text)" }}>Appointment Booked</h2>
              <p className="mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Your appointment has been successfully scheduled. We look forward to seeing you.
              </p>
              
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "var(--primary)" }}
              >
                Done
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
