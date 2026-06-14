"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  format, 
  addWeeks, 
  subWeeks, 
  addMonths, 
  subMonths,
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays, 
  isBefore, 
  startOfDay, 
  isSameDay,
  isSameMonth,
  eachDayOfInterval
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid, Rows3, Lock } from "lucide-react";
import { useCalendarAvailability } from "../../hooks/useBooking";
import ScissorsLoader from "../ui/ScissorsLoader";

interface DateSelectionProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onNext: () => void;
}

export default function DateSelection({ selectedDate, onSelectDate, onNext }: DateSelectionProps) {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [baseDate, setBaseDate] = useState(new Date());
  
  const { startDate, endDate, displayDays } = useMemo(() => {
    let start, end, days;
    
    if (viewMode === 'week') {
      start = startOfWeek(baseDate, { weekStartsOn: 1 });
      end = addDays(start, 6);
      days = eachDayOfInterval({ start, end });
    } else {
      const monthStart = startOfMonth(baseDate);
      const monthEnd = endOfMonth(baseDate);
      start = startOfWeek(monthStart, { weekStartsOn: 1 });
      end = endOfWeek(monthEnd, { weekStartsOn: 1 });
      days = eachDayOfInterval({ start, end });
    }
    
    return { startDate: start, endDate: end, displayDays: days };
  }, [baseDate, viewMode]);
  
  const startDateStr = format(startDate, "yyyy-MM-dd");
  const endDateStr = format(endDate, "yyyy-MM-dd");
  
  const { data: availability, isLoading, isError } = useCalendarAvailability(startDateStr, endDateStr);

  const daysData = useMemo(() => {
    return displayDays.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const dayAvailability = availability?.find((a) => a.date === dateStr);
      
      const isPast = isBefore(startOfDay(date), startOfDay(new Date()));
      // Use API's available_slots and total_slots directly
      const availableSlots = dayAvailability?.available_slots ?? 0;
      const totalSlots = dayAvailability?.total_slots ?? 0;
      const isAvailable = !isPast && dayAvailability && dayAvailability.status !== 'closed' && availableSlots > 0;
      const isCurrentMonth = isSameMonth(date, baseDate);

      // Status level based on API's available_slots vs total_slots ratio
      let statusLevel = 'full';
      if (isAvailable && totalSlots > 0) {
        const ratio = availableSlots / totalSlots;
        if (ratio >= 0.7) statusLevel = 'plenty';
        else if (ratio >= 0.3) statusLevel = 'filling';
        else statusLevel = 'almost';
      }

      return {
        date,
        dateStr,
        isAvailable,
        isCurrentMonth,
        dayName: format(date, "EEE"),
        dayNumber: format(date, "d"),
        monthName: format(date, "MMM"),
        availableSlots,
        totalSlots,
        statusLevel
      };
    });
  }, [displayDays, availability, baseDate]);

  const handlePrev = () => {
    if (viewMode === 'week') {
      const prev = subWeeks(baseDate, 1);
      if (!isBefore(startOfWeek(prev, { weekStartsOn: 1 }), startOfWeek(new Date(), { weekStartsOn: 1 }))) {
        setBaseDate(prev);
      }
    } else {
      const prev = subMonths(baseDate, 1);
      if (!isBefore(startOfMonth(prev), startOfMonth(new Date()))) {
        setBaseDate(prev);
      }
    }
  };

  const handleNext = () => {
    if (viewMode === 'week') {
      setBaseDate(addWeeks(baseDate, 1));
    } else {
      setBaseDate(addMonths(baseDate, 1));
    }
  };

  const isPrevDisabled = useMemo(() => {
    if (viewMode === 'week') {
      return isSameDay(startOfWeek(baseDate, { weekStartsOn: 1 }), startOfWeek(new Date(), { weekStartsOn: 1 }));
    } else {
      return isSameMonth(baseDate, new Date());
    }
  }, [baseDate, viewMode]);

  useEffect(() => {
    if (selectedDate && !isSameMonth(new Date(selectedDate), baseDate) && viewMode === 'month') {
      const frame = requestAnimationFrame(() => setBaseDate(new Date(selectedDate)));
      return () => cancelAnimationFrame(frame);
    }
  }, [selectedDate, viewMode, baseDate]);

  // Status indicator color
  const getIndicatorColor = (statusLevel: string) => {
    if (statusLevel === 'plenty') return 'bg-emerald-500';
    if (statusLevel === 'filling') return 'bg-amber-500';
    if (statusLevel === 'almost') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="luxury-card w-full max-w-4xl mx-auto p-4 md:p-5 rounded-lg"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold font-serif" style={{ color: 'var(--text)' }}>Select Date</h2>
          <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>Choose an available day for your appointment.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex p-0.5 rounded-md border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <button
              onClick={() => setViewMode('week')}
              className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${viewMode === 'week' ? 'bg-[#8B0000] text-white shadow-sm' : ''}`}
              style={viewMode !== 'week' ? { color: 'var(--text-muted)' } : {}}
            >
              <Rows3 className="w-3 h-3 mr-1" />
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${viewMode === 'month' ? 'bg-[#8B0000] text-white shadow-sm' : ''}`}
              style={viewMode !== 'month' ? { color: 'var(--text-muted)' } : {}}
            >
              <LayoutGrid className="w-3 h-3 mr-1" />
              Month
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center rounded-md border shadow-sm px-1" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`p-1.5 rounded-md transition-colors ${
                isPrevDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"
              }`}
              style={{ color: 'var(--text)' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center font-medium text-xs px-2" style={{ color: 'var(--text)' }}>
              <CalendarIcon className="w-3 h-3 mr-1.5" style={{ color: 'var(--primary)' }} />
              {viewMode === 'week' ? format(startOfWeek(baseDate, { weekStartsOn: 1 }), "MMM yyyy") : format(baseDate, "MMMM yyyy")}
            </div>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text)' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Availability Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-4 px-3 py-2 rounded-md" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        {[
          { label: 'Plenty', color: 'bg-emerald-500' },
          { label: 'Filling Fast', color: 'bg-amber-500' },
          { label: 'Almost Full', color: 'bg-red-500' },
          { label: 'Fully Booked', color: 'bg-gray-400' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
            <span className={`w-2 h-2 rounded-full ${color} mr-1.5`} />
            {label}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="mb-4">
        {/* Month view day header */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-1 mb-2 px-1 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day} className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>{day}</span>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode + baseDate.toString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`grid grid-cols-7 ${viewMode === 'week' ? 'gap-2' : 'gap-1'}`}
          >
            {isLoading ? (
              <div className="col-span-7 flex justify-center py-10">
                <ScissorsLoader message="Checking availability..." />
              </div>
            ) : isError ? (
              <div className="col-span-7 text-center text-red-500 py-6 text-sm">Failed to load calendar. Please try again.</div>
            ) : (
              daysData.map((day, idx) => {
                const isSelected = selectedDate === day.dateStr;
                const isDimmed = viewMode === 'month' && !day.isCurrentMonth;
                const indicatorColor = getIndicatorColor(day.statusLevel);

                return (
                  <button
                    key={`${day.dateStr}-${idx}`}
                    onClick={() => day.isAvailable && onSelectDate(day.dateStr)}
                    disabled={!day.isAvailable}
                    className={`relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 group
                      ${viewMode === 'week' ? 'py-3 px-1' : 'py-2 px-0.5'}
                      ${isSelected ? 'scale-[1.02]' : ''}
                      ${!day.isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}
                    `}
                    style={{
                      background: isSelected ? '#8B0000' : !day.isAvailable ? 'var(--surface)' : isDimmed ? 'var(--surface)' : 'var(--surface)',
                      border: isSelected ? '1px solid rgba(139,0,0,0.6)' : '1px solid var(--border)',
                      boxShadow: isSelected ? '0 6px 20px rgba(139,0,0,0.25)' : undefined,
                      opacity: isDimmed ? 0.45 : undefined,
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="selectedDate"
                        className="absolute inset-0 bg-[#8B0000] rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}

                    <span className="relative z-10 flex flex-col items-center gap-0.5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest leading-none`}
                        style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-subtle)' }}
                      >
                        {viewMode === 'week' ? day.dayName : day.monthName}
                      </span>
                      
                      <span
                        className={`font-serif font-bold leading-none ${viewMode === 'week' ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}
                        style={{ color: isSelected ? '#fff' : 'var(--text)' }}
                      >
                        {day.dayNumber}
                      </span>

                      {viewMode === 'week' && day.isAvailable && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                          style={{
                            background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(139,0,0,0.10)',
                            color: isSelected ? '#fff' : 'var(--primary)',
                          }}
                        >
                          {day.availableSlots}/{day.totalSlots}
                        </span>
                      )}

                      {!day.isAvailable && viewMode === 'week' && (
                        <Lock className="w-2.5 h-2.5 mt-0.5" style={{ color: 'var(--text-subtle)' }} />
                      )}
                    </span>

                    {day.isAvailable && !isSelected && (
                      <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${indicatorColor} ${isDimmed ? 'opacity-40' : ''}`} />
                    )}
                  </button>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className="px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: selectedDate ? '#8B0000' : 'var(--surface)',
            color: selectedDate ? '#fff' : 'var(--text-subtle)',
            cursor: selectedDate ? 'pointer' : 'not-allowed',
            boxShadow: selectedDate ? '0 8px 20px rgba(139,0,0,0.22)' : undefined,
          }}
        >
          Continue to Time
        </button>
      </div>
    </motion.div>
  );
}
