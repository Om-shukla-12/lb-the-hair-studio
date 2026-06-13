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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl pointer-events-auto text-center"
            >
              <div className="mx-auto w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 bg-[#8B0000] rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Check size={32} strokeWidth={3} />
                </motion.div>
              </div>
              
              <h2 className="text-3xl font-bold text-[#111111] font-serif mb-3">Appointment Booked</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your appointment has been successfully scheduled. We look forward to seeing you.
              </p>
              
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #8B0000 0%, #111111 100%)",
                }}
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
