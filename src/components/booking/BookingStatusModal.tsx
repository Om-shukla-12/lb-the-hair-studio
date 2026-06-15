"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, XCircle, AlertCircle, Phone, RotateCcw, CalendarClock } from "lucide-react";
import { CustomerFriendlyError } from "@/lib/errorHandling";

export type ModalState = "hidden" | "success" | "error";

interface BookingStatusModalProps {
  state: ModalState;
  error?: CustomerFriendlyError | null;
  onClose: () => void;
  onRetry?: () => void;
  onSelectAnotherTime?: () => void;
  salonPhone?: string;
}

export default function BookingStatusModal({
  state,
  error,
  onClose,
  onRetry,
  onSelectAnotherTime,
  salonPhone = "+1234567890" // You can replace this with actual config
}: BookingStatusModalProps) {
  const isOpen = state !== "hidden";
  const isSuccess = state === "success";

  const handleContact = () => {
    // You can switch to WhatsApp if configured
    window.location.href = `tel:${salonPhone}`;
  };

  const getErrorIcon = () => {
    switch (error?.type) {
      case "deposit_required":
        return <AlertCircle size={32} strokeWidth={2.5} />;
      case "network_error":
        return <RotateCcw size={32} strokeWidth={2.5} />;
      case "slot_unavailable":
        return <CalendarClock size={32} strokeWidth={2.5} />;
      default:
        return <XCircle size={32} strokeWidth={2.5} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md z-40"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="rounded-[2rem] p-8 md:p-10 max-w-md w-full shadow-2xl pointer-events-auto text-center relative overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Decorative top gradient */}
              <div 
                className="absolute top-0 left-0 right-0 h-2" 
                style={{ background: isSuccess ? "var(--primary)" : "#dc2626" }} 
              />

              <div
                className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: isSuccess ? "rgba(139,0,0,0.1)" : "rgba(220,38,38,0.1)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: isSuccess ? "var(--primary)" : "#dc2626", color: "#fff" }}
                >
                  {isSuccess ? <Check size={36} strokeWidth={3} /> : getErrorIcon()}
                </motion.div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4" style={{ color: "var(--text)" }}>
                {isSuccess ? "Appointment Requested" : error?.title}
              </h2>
              
              <div className="mb-8 leading-relaxed whitespace-pre-line text-[15px]" style={{ color: "var(--text-muted)" }}>
                {isSuccess 
                  ? "Thank you for choosing LB The Hair Studio.\n\nYour appointment request has been successfully submitted.\n\nOur team will contact you shortly if any confirmation is required." 
                  : error?.message}
              </div>
              
              <div className="flex flex-col gap-3">
                {isSuccess ? (
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-xl text-white font-bold text-[15px] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    style={{ background: "var(--primary)" }}
                  >
                    Done
                  </button>
                ) : (
                  <>
                    {/* Primary Action */}
                    {error?.primaryAction && (
                      <button
                        onClick={() => {
                          const action = error.primaryAction?.action;
                          if (action === "contact") handleContact();
                          else if (action === "retry") onRetry?.();
                          else if (action === "select_another") onSelectAnotherTime?.();
                        }}
                        className="w-full py-4 rounded-xl text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        style={{ background: error.primaryAction.action === "contact" ? "var(--primary)" : "#171717" }}
                      >
                        {error.primaryAction.action === "contact" && <Phone size={18} />}
                        {error.primaryAction.label}
                      </button>
                    )}

                    {/* Secondary Action */}
                    {error?.secondaryAction && (
                      <button
                        onClick={() => {
                          if (error.secondaryAction?.action === "contact") handleContact();
                          else onClose();
                        }}
                        className="w-full py-4 rounded-xl font-bold text-[15px] transition-all duration-300 hover:bg-black/5"
                        style={{ color: "var(--text)", border: "1px solid var(--border)" }}
                      >
                        {error.secondaryAction.label}
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
