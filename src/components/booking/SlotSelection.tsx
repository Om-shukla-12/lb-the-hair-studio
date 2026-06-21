"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlots, useBarbers } from "../../hooks/useBooking";
import { Check, Clock, Sun, Sunset, Moon, Users, ChevronDown, ChevronUp, User } from "lucide-react";
import { TimeSlot } from "../../types/booking";
import ScissorsLoader from "../ui/ScissorsLoader";

interface SlotSelectionProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/** Convert "HH:mm" (24h) to "h:mm AM/PM" (12h). */
function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
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
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const { data: slots, isLoading: loadingSlots, isError } = useSlots(selectedDate, selectedStylist || undefined);
  const { data: barbers } = useBarbers();

  const handleStylistChange = (stylistId: string | null) => {
    setSelectedStylist(stylistId);
    onSelectTime("");
  };

  // Count staff who actually provide at least one service
  const serviceProvidingStaffCount = useMemo(() => {
    if (!barbers) return null;
    const count = barbers.filter((b) =>
      b.is_active && Array.isArray(b.services) && b.services.length > 0
    ).length;
    return count > 0 ? count : null;
  }, [barbers]);

  // Adjust a slot's counts to cap at service-providing staff only
  // When filtering by a specific stylist, skip the adjustment — API already returns per-employee data
  const adjustedSlot = (slot: TimeSlot): { available: number; total: number } => {
    if (selectedStylist) {
      return { available: slot.available_count, total: slot.total_count };
    }
    if (serviceProvidingStaffCount === null) {
      return { available: slot.available_count, total: slot.total_count };
    }
    const total = Math.min(slot.total_count, serviceProvidingStaffCount);
    const available = Math.min(slot.available_count, total);
    return { available, total };
  };

  const continueRef = useRef<HTMLDivElement>(null);
  const [expandedPeriod, setExpandedPeriod] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (selectedTime && continueRef.current) {
      continueRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedTime]);

  const periods = useMemo<PeriodGroup[]>(() => {
    return slots
      ? [
        { key: "morning", label: "Morning", icon: <Sun className="w-4 h-4 text-amber-500" />, slots: slots.morning },
        { key: "afternoon", label: "Afternoon", icon: <Sunset className="w-4 h-4 text-orange-500" />, slots: slots.afternoon },
        { key: "evening", label: "Evening", icon: <Moon className="w-4 h-4 text-indigo-500" />, slots: slots.evening },
      ].filter((p) => p.slots && p.slots.length > 0)
      : [];
  }, [slots]);

  const defaultExpandedPeriod = useMemo(() => {
    if (periods.length === 0) return null;
    if (selectedTime) {
      const containing = periods.find((p) => p.slots.some((s) => s.time === selectedTime));
      if (containing) return containing.key;
    }
    const firstAvailable = periods.find((p) => p.slots.some((s) => !s.is_past && s.available_count > 0));
    return firstAvailable?.key ?? periods[0]?.key ?? null;
  }, [periods, selectedTime]);

  const activeExpandedPeriod =
    expandedPeriod === undefined
      ? defaultExpandedPeriod
      : expandedPeriod && periods.some((p) => p.key === expandedPeriod)
        ? expandedPeriod
        : null;

  const togglePeriod = (key: string) => {
    setExpandedPeriod((prev) => {
      const current = prev === undefined ? activeExpandedPeriod : prev;
      return current === key ? null : key;
    });
  };

  const renderSlotGrid = (timeSlots: TimeSlot[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
      {timeSlots.map((slot, idx) => {
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
                ? "opacity-45 cursor-not-allowed"
                : isSelected
                ? "shadow-md scale-[1.02]"
                : "shadow-sm hover:-translate-y-0.5"
            }`}
            style={{
              background: isSelected ? 'var(--primary)' : !isAvailable ? 'var(--surface)' : 'var(--surface)',
              borderColor: isSelected ? 'var(--primary)' : !isAvailable ? 'transparent' : 'var(--border)',
            }}
          >
            {/* Time */}
            <span
              className={`font-bold text-sm leading-tight mb-2`}
              style={{ color: isSelected ? '#fff' : isAvailable ? 'var(--text)' : 'var(--text-subtle)' }}
            >
              {to12h(slot.time)}
            </span>

            {/* Slots count badge */}
            {isAvailable ? (
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold`}
                style={{
                  background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(139,0,0,0.10)',
                  color: isSelected ? '#fff' : 'var(--primary)',
                }}
              >
                {selectedStylist ? (
                  <span>Available</span>
                ) : (
                  <>
                    <Users className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{available}/{total} slots</span>
                  </>
                )}
              </div>
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                {slot.is_past ? "Past" : selectedStylist ? "Booked" : "Full"}
              </span>
            )}

            {/* Selected checkmark */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center shadow"
                style={{ background: 'var(--accent)', color: '#fff' }}
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
      className="luxury-card w-full max-w-4xl mx-auto p-4 md:p-5 rounded-lg"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold font-serif" style={{ color: 'var(--text)' }}>Select Time</h2>
        <p className="mt-0.5 text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
          <Clock className="w-3.5 h-3.5" />
          Availability for{" "}
          {new Date(selectedDate).toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Stylist Filter */}
        {barbers && barbers.filter(b => b.is_active && Array.isArray(b.services) && b.services.length > 0).length > 0 && (
          <div className="mt-5 mb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
              <User className="w-3.5 h-3.5" />
              Filter by Stylist
            </h3>
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 -mx-4 px-4 md:mx-0 md:px-0">
              <button
                onClick={() => handleStylistChange(null)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedStylist === null
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[rgba(139,0,0,0.05)] hover:text-[var(--primary)] hover:border-[rgba(139,0,0,0.2)]"
                }`}
              >
                Anyone Available
              </button>
              {barbers.filter(b => b.is_active && Array.isArray(b.services) && b.services.length > 0).map((barber) => (
                <button
                  key={barber.id}
                  onClick={() => handleStylistChange(barber.id)}
                  className={`whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    selectedStylist === barber.id
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[rgba(139,0,0,0.05)] hover:text-[var(--primary)] hover:border-[rgba(139,0,0,0.2)]"
                  }`}
                >
                  {barber.full_name?.split(' ')[0] || "Stylist"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--text-subtle)' }}>
            <Users className="w-3 h-3" />
            Staff available / total
          </span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-subtle)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>All free</span>
          </span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-subtle)' }}>
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Partially booked</span>
          </span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-subtle)' }}>
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>Almost full</span>
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
          <div className="text-center py-6 rounded-lg border text-sm" style={{ background: 'rgba(255,0,0,0.05)', borderColor: 'rgba(255,0,0,0.1)', color: 'red' }}>
            Failed to load time slots. Please try again.
          </div>
        ) : periods.length > 0 ? (
          <div className="rounded-lg overflow-hidden border shadow-sm divide-y" style={{ borderColor: 'var(--border)', borderTop: '1px solid var(--border)' }}>
            {periods.map((period, index) => {
              const isExpanded = activeExpandedPeriod === period.key;
              const availableInPeriod = period.slots.filter((s) => !s.is_past && s.available_count > 0).length;
              const totalInPeriod = period.slots.length;
              const selectedInPeriod = period.slots.some((s) => s.time === selectedTime);

              return (
                <div
                  key={period.key}
                  className={`transition-all duration-200`}
                  style={{
                    background: 'var(--surface)',
                    borderBottom: index === periods.length - 1 ? 'none' : '1px solid var(--border)',
                    borderLeft: selectedInPeriod ? '4px solid var(--primary)' : 'none',
                  }}
                >
                  <button
                    onClick={() => togglePeriod(period.key)}
                    className="w-full flex items-center justify-between px-4 py-3 transition-colors"
                    style={{
                      background: selectedInPeriod ? 'rgba(139,0,0,0.05)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      {selectedInPeriod && (
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: 'var(--primary)' }}>
                          ✓
                        </span>
                      )}
                      {period.icon}
                      <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: selectedInPeriod ? 'var(--primary)' : 'var(--text)' }}>
                        {period.label}
                      </h3>
                      <span className="text-[10px] font-medium" style={{ color: 'var(--text-subtle)' }}>
                        {availableInPeriod}/{totalInPeriod} slots open
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedInPeriod && selectedTime && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: 'var(--primary)', background: 'rgba(139,0,0,0.1)' }}>
                          {to12h(selectedTime)}
                        </span>
                      )}
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4" style={{ color: selectedInPeriod ? 'var(--primary)' : 'var(--text-subtle)' }} />
                        : <ChevronDown className="w-4 h-4" style={{ color: selectedInPeriod ? 'var(--primary)' : 'var(--text-subtle)' }} />
                      }
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t" style={{ background: 'rgba(0,0,0,0.02)', borderColor: 'var(--border)' }}>
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
          <div className="text-center py-10 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <p className="text-base font-medium" style={{ color: 'var(--text)' }}>No slots available for this date.</p>
            <p className="text-sm mt-1">Please try selecting another date.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-md font-medium text-sm transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          Back
        </button>

        <div ref={continueRef}>
          <button
            onClick={onNext}
            disabled={!selectedTime || (slots && ![...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0))}
            className="px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest text-xs transition-all duration-300"
            style={{
              background: selectedTime && (!slots || [...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0)) ? 'var(--primary)' : 'var(--surface)',
              color: selectedTime && (!slots || [...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0)) ? '#fff' : 'var(--text-subtle)',
              cursor: selectedTime && (!slots || [...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0)) ? 'pointer' : 'not-allowed',
              boxShadow: selectedTime && (!slots || [...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0)) ? '0 8px 20px rgba(139,0,0,0.22)' : undefined,
              border: selectedTime && (!slots || [...(slots.morning||[]), ...(slots.afternoon||[]), ...(slots.evening||[])].some(s => s.time === selectedTime && !s.is_past && s.available_count > 0)) ? 'none' : '1px solid var(--border)',
            }}
          >
            Continue to Services
          </button>
        </div>
      </div>
    </motion.div>
  );
}
