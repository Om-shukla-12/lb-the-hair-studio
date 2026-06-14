"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlots, useBarbers } from "../../hooks/useBooking";
import { Check, Clock, Sun, Sunset, Moon, Users, ChevronDown, ChevronUp } from "lucide-react";
import { TimeSlot } from "../../types/booking";
import ScissorsLoader from "../ui/ScissorsLoader";

interface SlotSelectionProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/** Convert "HH:mm" (24h) → "h:mm AM/PM" (12h) */
function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Color-code the staff badge using API's available_count vs total_count */
function getStaffBadgeClass(availCount: number, totalCount: number, isSelected: boolean): string {
  if (isSelected) return "bg-[#8B0000]/10 border-[#8B0000]/20 text-[#8B0000]";
  if (availCount === 0) return "bg-gray-100 border-gray-200 text-gray-400";
  if (availCount <= 1) return "bg-red-50 border-red-100 text-red-500";
  if (availCount < totalCount) return "bg-amber-50 border-amber-100 text-amber-600";
  return "bg-green-50 border-green-100 text-green-600";
}

interface PeriodGroup {
  key: string;
  label: string;
  icon: React.ReactNode;
  slots: TimeSlot[];
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

  // Count staff who actually provide at least one service
  // API returns b.services as an array of service objects (empty [] = serves none)
  const serviceProvidingStaffCount = useMemo(() => {
    if (!barbers) return null; // not loaded yet — use raw API count
    const count = barbers.filter((b) =>
      b.is_active && Array.isArray(b.services) && b.services.length > 0
    ).length;
    return count > 0 ? count : null;
  }, [barbers]);

  // Adjust a slot's counts to cap at service-providing staff only
  const adjustedSlot = (slot: TimeSlot): { available: number; total: number } => {
    if (serviceProvidingStaffCount === null) {
      return { available: slot.available_count, total: slot.total_count };
    }
    const total = Math.min(slot.total_count, serviceProvidingStaffCount);
    const available = Math.min(slot.available_count, total);
    return { available, total };
  };

  const continueRef = useRef<HTMLDivElement>(null);

  // Auto-open the period containing the selected time; default open first period with slots
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);

  // Auto-scroll to Continue when a time is selected
  useEffect(() => {
    if (selectedTime && continueRef.current) {
      continueRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedTime]);

  // Build period groups from API data
  const periods: PeriodGroup[] = slots
    ? [
        { key: "morning", label: "Morning", icon: <Sun className="w-4 h-4 text-amber-500" />, slots: slots.morning },
        { key: "afternoon", label: "Afternoon", icon: <Sunset className="w-4 h-4 text-orange-500" />, slots: slots.afternoon },
        { key: "evening", label: "Evening", icon: <Moon className="w-4 h-4 text-indigo-500" />, slots: slots.evening },
      ].filter((p) => p.slots && p.slots.length > 0)
    : [];

  // Auto-expand: if a time is already selected, open that period; else open first available period
  useEffect(() => {
    if (!slots || periods.length === 0) return;
    if (expandedPeriod !== null) return; // user already made a choice

    if (selectedTime) {
      const containing = periods.find((p) => p.slots.some((s) => s.time === selectedTime));
      if (containing) { setExpandedPeriod(containing.key); return; }
    }
    // Open first period that has any available slot
    const firstAvailable = periods.find((p) => p.slots.some((s) => !s.is_past && s.available_count > 0));
    setExpandedPeriod(firstAvailable?.key ?? periods[0]?.key ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  const togglePeriod = (key: string) => {
    setExpandedPeriod((prev) => (prev === key ? null : key));
  };

  const renderSlotGrid = (timeSlots: TimeSlot[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
      {timeSlots.map((slot, idx) => {
        // Use adjusted counts that exclude non-service-providing staff
        const { available, total } = adjustedSlot(slot);
        const isAvailable = !slot.is_past && available > 0;
        const isSelected = selectedTime === slot.time;

        return (
          <motion.button
            key={slot.time + idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: idx * 0.03 }}
            onClick={() => isAvailable && onSelectTime(slot.time)}
            disabled={!isAvailable}
            className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
              !isAvailable
                ? "opacity-45 cursor-not-allowed bg-gray-50 border-transparent text-gray-400"
                : isSelected
                ? "border-[#8B0000] bg-[#8B0000]/5 shadow-md scale-[1.03]"
                : "border-transparent bg-white shadow-sm hover:border-[#8B0000]/25 hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            {/* Time */}
            <span
              className={`font-bold text-sm leading-tight mb-2 ${
                isSelected ? "text-[#8B0000]" : isAvailable ? "text-[#111111]" : "text-gray-400"
              }`}
            >
              {to12h(slot.time)}
            </span>

            {/* Slots count badge — filtered to service-providing staff only */}
            {isAvailable ? (
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStaffBadgeClass(
                  available,
                  total,
                  isSelected
                )}`}
              >
                <Users className="w-2.5 h-2.5 flex-shrink-0" />
                <span>{available}/{total} slots</span>
              </div>
            ) : (
              <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                {slot.is_past ? "Past" : "Full"}
              </span>
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
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(17,17,17,0.05)]"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#111111] font-serif">Select Time</h2>
        <p className="text-gray-500 mt-0.5 text-sm flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Availability for{" "}
          {new Date(selectedDate).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
            <Users className="w-3 h-3" />
            Staff available / total (from API)
          </span>
          <span className="flex items-center gap-1 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span className="text-gray-400">All free</span>
          </span>
          <span className="flex items-center gap-1 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span className="text-gray-400">Partially booked</span>
          </span>
          <span className="flex items-center gap-1 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            <span className="text-gray-400">Almost full</span>
          </span>
        </div>
      </div>

      {/* Accordion content */}
      <div className="min-h-[280px]">
        {loadingSlots ? (
          <div className="flex justify-center items-center py-16">
            <ScissorsLoader message="Finding perfect slots..." />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-6 bg-red-50 rounded-2xl border border-red-100 text-sm">
            Failed to load time slots. Please try again.
          </div>
        ) : periods.length > 0 ? (
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-100">
            {periods.map((period) => {
              const isExpanded = expandedPeriod === period.key;
              const availableInPeriod = period.slots.filter((s) => !s.is_past && s.available_count > 0).length;
              const totalInPeriod = period.slots.length;
              const selectedInPeriod = period.slots.some((s) => s.time === selectedTime);

              return (
                <div
                  key={period.key}
                  className={`bg-white transition-all duration-200 ${selectedInPeriod ? "border-l-4 border-l-[#D4AF37]" : ""}`}
                >
                  {/* Period header — clickable to toggle */}
                  <button
                    onClick={() => togglePeriod(period.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                      selectedInPeriod ? "bg-[#8B0000]/5 hover:bg-[#8B0000]/8" : "bg-white hover:bg-gray-50/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {selectedInPeriod && (
                        <span className="w-4 h-4 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                          ✓
                        </span>
                      )}
                      {period.icon}
                      <h3 className={`text-xs font-bold tracking-widest uppercase ${selectedInPeriod ? "text-[#8B0000]" : "text-[#111111]"}`}>
                        {period.label}
                      </h3>
                      {/* Available slots in this period */}
                      <span className="text-[10px] text-gray-400 font-medium">
                        {availableInPeriod}/{totalInPeriod} slots open
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Selected time badge */}
                      {selectedInPeriod && selectedTime && (
                        <span className="text-[10px] font-semibold text-[#8B0000] bg-[#8B0000]/10 px-2 py-0.5 rounded-full">
                          {to12h(selectedTime)}
                        </span>
                      )}
                      {isExpanded
                        ? <ChevronUp className={`w-4 h-4 ${selectedInPeriod ? "text-[#8B0000]" : "text-gray-400"}`} />
                        : <ChevronDown className={`w-4 h-4 ${selectedInPeriod ? "text-[#8B0000]" : "text-gray-400"}`} />
                      }
                    </div>
                  </button>

                  {/* Slots grid — accordion body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-50/50 border-t border-gray-100">
                          {renderSlotGrid(period.slots)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-base font-medium text-[#111111]">No slots available for this date.</p>
            <p className="text-sm mt-1">Please select another date.</p>
          </div>
        )}
      </div>

      {/* Footer nav */}
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
