"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSlots, useBarbers } from "../../hooks/useBooking";
import { Check, Clock, Sun, Sunset, Moon } from "lucide-react";
import { TimeSlot } from "../../types/booking";
import ScissorsLoader from "../ui/ScissorsLoader";

interface SlotSelectionProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const BADGE_COLORS = [
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-[#D4AF37]/20 text-[#8B0000] border-[#D4AF37]/50",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-orange-100 text-orange-700 border-orange-200",
];

/** Convert "HH:mm" (24h) → "h:mm AM/PM" (12h) */
function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function SlotSelection({
  selectedDate,
  selectedTime,
  onSelectTime,
  onNext,
  onBack,
}: SlotSelectionProps) {
  const { data: slots, isLoading: loadingSlots, isError } = useSlots(selectedDate);
  const { data: barbers } = useBarbers();
  const continueRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to Continue button when a time is selected
  useEffect(() => {
    if (selectedTime && continueRef.current) {
      continueRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedTime]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const activeBarbers = useMemo(() => {
    return (barbers || []).filter((b) => b.is_active);
  }, [barbers]);

  const renderSlotGrid = (timeSlots: TimeSlot[], icon: React.ReactNode, title: string) => {
    if (!timeSlots || timeSlots.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center mb-2 text-[#111111]">
          {icon}
          <h3 className="ml-1.5 text-sm font-semibold font-serif">{title}</h3>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
        >
          {timeSlots.map((slot, idx) => {
            const isAvailable = !slot.is_past && slot.available_count > 0;
            const isSelected = selectedTime === slot.time;
            const availableStaff = activeBarbers.slice(0, slot.available_count);

            return (
              <motion.button
                variants={itemVariants}
                key={slot.time + idx}
                onClick={() => isAvailable && onSelectTime(slot.time)}
                disabled={!isAvailable}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 transition-all duration-200 ${
                  !isAvailable
                    ? "opacity-50 cursor-not-allowed bg-gray-50 border-transparent text-gray-400"
                    : isSelected
                    ? "border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000] shadow-md scale-[1.02]"
                    : "border-transparent bg-white shadow-sm hover:border-[#8B0000]/25 hover:shadow-md text-[#111111] hover:-translate-y-0.5"
                }`}
              >
                {/* Time in 12h format */}
                <span className={`font-bold text-sm leading-tight mb-1 ${isSelected ? 'text-[#8B0000]' : isAvailable ? 'text-[#111111]' : 'text-gray-400'}`}>
                  {to12h(slot.time)}
                </span>

                {/* Staff initials */}
                {isAvailable ? (
                  <div className="flex items-center justify-center gap-0.5 flex-wrap">
                    {availableStaff.map((staff, sIdx) => (
                      <span
                        key={staff.id}
                        className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold border ${BADGE_COLORS[sIdx % BADGE_COLORS.length]}`}
                        title={staff.full_name}
                      >
                        {getInitials(staff.full_name)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Unavailable</span>
                )}

                {/* Selected checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#8B0000] rounded-full flex items-center justify-center text-white shadow"
                  >
                    <Check size={10} strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(17,17,17,0.05)]"
    >
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#111111] font-serif">Select Time</h2>
        <p className="text-gray-500 mt-0.5 text-sm flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          Availability for{" "}
          {new Date(selectedDate).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="min-h-[280px]">
        {loadingSlots ? (
          <div className="flex justify-center items-center py-16">
            <ScissorsLoader message="Finding perfect slots..." />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-6 bg-red-50 rounded-2xl border border-red-100 text-sm">
            Failed to load time slots. Please try again.
          </div>
        ) : slots ? (
          <>
            {renderSlotGrid(slots.morning, <Sun className="w-4 h-4 text-amber-500" />, "Morning")}
            {renderSlotGrid(slots.afternoon, <Sunset className="w-4 h-4 text-orange-500" />, "Afternoon")}
            {renderSlotGrid(slots.evening, <Moon className="w-4 h-4 text-indigo-500" />, "Evening")}
          </>
        ) : (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-base font-medium text-[#111111]">No slots available for this date.</p>
            <p className="text-sm mt-1">Please select another date.</p>
          </div>
        )}
      </div>

      <div ref={continueRef} className="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors text-sm"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTime}
          className={`px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
            selectedTime
              ? "bg-[#8B0000] hover:bg-[#5C0000] shadow-[0_8px_20px_rgba(139,0,0,0.2)] hover:shadow-[0_12px_25px_rgba(139,0,0,0.3)] hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Service
        </button>
      </div>
    </motion.div>
  );
}
