"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Check, ChevronDown, ChevronUp, ShoppingBag, X, Trash2, User, Filter } from "lucide-react";
import { useServices, useBarbers, useSlots, useStaffAvailability } from "../../hooks/useBooking";
import { Service, Barber } from "../../types/booking";
import ScissorsLoader from "../ui/ScissorsLoader";
import { calculateServiceTimeline, TimelineService } from "../../lib/time";

interface ServiceSelectionProps {
  selectedDate: string;
  selectedTime: string;
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  selectedBarbers: Record<string, string | null>;
  onSetBarberForService: (serviceId: string, barberId: string | null) => void;
  onReorderServices?: (newOrder: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

function CartItem({
  service,
  timelineItem,
  chosenBarber,
  chosenBarberId,
  isFirst,
  isLast,
  handleRemoveService,
  onMoveUp,
  onMoveDown,
}: {
  service: Service;
  timelineItem?: TimelineService;
  chosenBarber: Barber | null;
  chosenBarberId: string | null;
  isFirst: boolean;
  isLast: boolean;
  handleRemoveService: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex items-start justify-between bg-[var(--surface)] rounded-xl p-3 mb-2 border border-[var(--border)] shadow-sm"
    >
      <div className="flex items-start gap-3 flex-grow min-w-0 pr-2">
        <div className="flex flex-col gap-1 mt-0.5">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-1 rounded-md transition-colors ${
              isFirst ? "text-[var(--text-subtle)] cursor-not-allowed" : "text-[var(--text-subtle)] hover:bg-[rgba(139,0,0,0.05)] hover:text-[var(--primary)]"
            }`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-1 rounded-md transition-colors ${
              isLast ? "text-[var(--text-subtle)] cursor-not-allowed" : "text-[var(--text-subtle)] hover:bg-[rgba(139,0,0,0.05)] hover:text-[var(--primary)]"
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-grow min-w-0 mt-1">
          <p className="text-sm font-semibold text-[var(--text)] truncate">{service.name}</p>
          {timelineItem && (
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[var(--text-subtle)]" />
              {timelineItem.formattedStartTime} to {timelineItem.formattedEndTime}
            </p>
          )}
          {chosenBarber && (
            <p className="text-[10px] text-[var(--primary)] font-medium mt-1 bg-[rgba(139,0,0,0.05)] inline-block px-1.5 py-0.5 rounded">✦ {chosenBarber.full_name}</p>
          )}
          {chosenBarberId === null && (
            <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1 bg-[rgba(139,0,0,0.05)] inline-block px-1.5 py-0.5 rounded">Any available staff</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
        <button
          onClick={() => handleRemoveService(service.id)}
          className="w-6 h-6 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:bg-[rgba(255,0,0,0.05)] hover:border-[rgba(255,0,0,0.2)] transition-colors group"
        >
          <X className="w-3.5 h-3.5 text-[var(--text-subtle)] group-hover:text-red-500 transition-colors" />
        </button>
        <span className="text-sm font-bold text-[var(--text)] mt-2">
          {service.currency === "INR" ? "Rs. " : service.currency}
          {parseFloat(service.price).toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}

export default function ServiceSelection({
  selectedDate,
  selectedTime,
  selectedServices,
  onToggleService,
  selectedBarbers,
  onSetBarberForService,
  onReorderServices,
  onNext,
  onBack,
}: ServiceSelectionProps) {
  // ── All useState/useRef hooks first (React rules of hooks) ──
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // ── Data fetching hooks ──
  const { data: services, isLoading, isError } = useServices();
  const { data: barbers } = useBarbers();
  const { data: slots } = useSlots(selectedDate);

  // All active barbers who serve at least one service
  const activeBarbers = useMemo(() =>
    (barbers || []).filter((b) => {
      if (!b.is_active) return false;
      return Array.isArray(b.services) && b.services.length > 0;
    }),
  [barbers]);

  // Timeline calculation
  const timeline = useMemo(() => {
    if (!services || !selectedTime) return [];
    const selectedSvcObjects = selectedServices
      .map((id) => services.find((s) => s.id === id))
      .filter((s): s is Service => !!s);
    return calculateServiceTimeline(selectedSvcObjects, selectedTime);
  }, [services, selectedServices, selectedTime]);

  // Extract up to 3 service slot IDs for parallel hook calls (hooks must be unconditional)
  const svc0 = selectedServices[0] ?? null;
  const svc1 = selectedServices[1] ?? null;
  const svc2 = selectedServices[2] ?? null;

  const t0 = svc0 ? (timeline.find(t => t.serviceId === svc0)?.startTime ?? selectedTime) : selectedTime;
  const t1 = svc1 ? (timeline.find(t => t.serviceId === svc1)?.startTime ?? selectedTime) : selectedTime;
  const t2 = svc2 ? (timeline.find(t => t.serviceId === svc2)?.startTime ?? selectedTime) : selectedTime;

  // One API call per service slot — API requires exactly ONE service_id per call
  const { data: avail0 } = useStaffAvailability(selectedDate, t0, svc0 ? [svc0] : []);
  const { data: avail1 } = useStaffAvailability(selectedDate, t1, svc1 ? [svc1] : []);
  const { data: avail2 } = useStaffAvailability(selectedDate, t2, svc2 ? [svc2] : []);

  // Total slot count from slots API
  const slotTotalCount = useMemo(() => {
    if (!slots || !selectedTime) return activeBarbers.length;
    const allSlots = [...slots.morning, ...slots.afternoon, ...slots.evening];
    const targetSlot = allSlots.find((s) => s.time === selectedTime);
    return targetSlot?.total_count ?? activeBarbers.length;
  }, [slots, selectedTime, activeBarbers]);

  // Build map: serviceId → Set<barberId> | undefined (undefined = still loading)
  const availByService = useMemo((): Record<string, Set<string> | undefined> => {
    const m: Record<string, Set<string> | undefined> = {};
    if (svc0) m[svc0] = avail0 !== undefined ? new Set(avail0.map((b) => b.id)) : undefined;
    if (svc1) m[svc1] = avail1 !== undefined ? new Set(avail1.map((b) => b.id)) : undefined;
    if (svc2) m[svc2] = avail2 !== undefined ? new Set(avail2.map((b) => b.id)) : undefined;
    return m;
  }, [svc0, avail0, svc1, avail1, svc2, avail2]);

  /** Is barber available for service? Defaults to true while API is loading. */
  const isBarberAvailableForService = (barberId: string, serviceId: string): boolean => {
    const ids = availByService[serviceId];
    if (ids === undefined) return true; // loading → show all as available
    return ids.has(barberId);
  };

  /** Count of available staff for a service. Shows slotTotalCount while loading. */
  const countAvailableForService = (serviceId: string): number => {
    const ids = availByService[serviceId];
    if (ids === undefined) return slotTotalCount; // loading → show max
    return ids.size;
  };

  /** Whether any staff is available for a service. */
  const anyStaffAvailable = (serviceId: string): boolean => {
    const ids = availByService[serviceId];
    if (ids === undefined) return true; // loading → allow
    return ids.size > 0;
  };

  const dailyFirst = ["haircut", "beard", "shaving", "hair color", "haircolor", "color", "hair styling", "styling", "facial", "cleanup", "hair treatment", "treatment"];

  // Categories
  const categories = useMemo(() => {
    if (!services) return ["All"];
    const tags = Array.from(new Set(services.map((s) => s.tag || "Other")));
    tags.sort((a, b) => {
      const aIdx = dailyFirst.findIndex(p => a.toLowerCase().includes(p));
      const bIdx = dailyFirst.findIndex(p => b.toLowerCase().includes(p));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.localeCompare(b);
    });
    return ["All", ...tags];
  }, [services]);

  // Grouped services
  const groupedServices = useMemo(() => {
    if (!services) return {};
    let filtered = services;
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.tag || "Other").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (genderFilter !== "All") {
      filtered = filtered.filter((s) => !s.gender || s.gender.toLowerCase() === genderFilter.toLowerCase() || s.gender.toLowerCase() === "unisex" || s.gender.toLowerCase() === "both");
    }
    if (selectedCategoryFilter !== "All") {
      filtered = filtered.filter((s) => (s.tag || "Other") === selectedCategoryFilter);
    }
    const groups: Record<string, Service[]> = {};
    filtered.forEach((s) => {
      const tag = s.tag || "Other";
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(s);
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const aIdx = dailyFirst.findIndex(p => a.toLowerCase().includes(p));
      const bIdx = dailyFirst.findIndex(p => b.toLowerCase().includes(p));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.localeCompare(b);
    });

    const sorted: Record<string, Service[]> = {};
    sortedKeys.forEach(k => { sorted[k] = groups[k]; });
    return sorted;
  }, [services, searchQuery, genderFilter, selectedCategoryFilter]);

  // Auto-expand first category
  useEffect(() => {
    if (expandedCategory === null && Object.keys(groupedServices).length > 0) {
      setExpandedCategory(Object.keys(groupedServices)[0]);
    }
  }, [groupedServices, expandedCategory]);

  // Selected service details in the order of selectedServices
  const selectedServiceDetails = useMemo(() => {
    if (!services) return [];
    return selectedServices
      .map((id) => services.find((s) => s.id === id))
      .filter((s): s is Service => !!s);
  }, [services, selectedServices]);

  const { totalDuration, totalPrice } = useMemo(() => {
    const duration = selectedServiceDetails.reduce((acc, s) => acc + s.duration_minutes, 0);
    const price = selectedServiceDetails.reduce((acc, s) => acc + parseFloat(s.price), 0);
    return { totalDuration: duration, totalPrice: price };
  }, [selectedServiceDetails]);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  // Close cart on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isCartOpen]);

  const handleRemoveService = (serviceId: string) => {
    onToggleService(serviceId);
  };

  const moveServiceUp = (index: number) => {
    if (index > 0 && onReorderServices) {
      const newOrder = [...selectedServices];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      onReorderServices(newOrder);
    }
  };

  const moveServiceDown = (index: number) => {
    if (index < selectedServices.length - 1 && onReorderServices) {
      const newOrder = [...selectedServices];
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
      onReorderServices(newOrder);
    }
  };

  const overallStartTime = timeline[0]?.formattedStartTime;
  const overallEndTime = timeline[timeline.length - 1]?.formattedEndTime;

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 md:pb-0 relative">
      {/* Header */}
      <div className="mb-4 px-4 md:px-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-200 group mb-2"
        >
          <span className="material-symbols-outlined text-[15px] group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
          Back to Time
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text)] font-serif">Select Services</h2>
        <p className="text-[var(--text-muted)] mt-0.5 text-sm">Choose services and preferred stylist for each.</p>
      </div>

      {/* Sticky top bar */}
      <div className="sticky top-20 z-30 bg-[var(--bg)]/95 backdrop-blur-xl pt-3 pb-2 px-4 md:px-0 -mx-4 md:mx-0">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[var(--text-subtle)]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder-gray-400 focus:bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all duration-300 shadow-sm text-sm"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Gender Filter */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-shrink-0">
            <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1 shadow-sm h-[46px] items-center">
              {["All", "Male", "Female"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setGenderFilter(gender)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 h-full flex items-center ${
                    genderFilter === gender
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-[var(--text-muted)] hover:bg-[rgba(139,0,0,0.05)]"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-1.5 pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[rgba(139,0,0,0.03)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Desktop summary */}
        <div className="hidden md:flex mt-2 bg-[var(--surface)] rounded-xl px-4 py-2.5 border border-[var(--border)] shadow-sm items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium text-[var(--text-muted)]">
            <span>Selected: <span className="text-[var(--primary)] font-bold">{selectedServices.length}</span></span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <span>Time: <span className="text-[var(--primary)] font-bold">{overallStartTime ? `${overallStartTime} to ${overallEndTime}` : '0 min'}</span></span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <span>Total: <span className="text-[var(--primary)] font-bold">Rs. {totalPrice.toLocaleString()}</span></span>
          </div>
          <div className="flex gap-2">
            <button onClick={onBack} className="px-4 py-1.5 rounded-full font-medium text-[var(--text-muted)] hover:bg-[rgba(139,0,0,0.05)] transition-colors text-xs">Back</button>
            <button
              onClick={onNext}
              disabled={selectedServices.length === 0}
              className={`px-6 py-1.5 rounded-full text-white font-semibold transition-all duration-200 text-xs ${
                selectedServices.length > 0
                  ? "bg-[var(--primary)] hover:bg-[#5C0000] shadow-sm"
                  : "bg-[var(--border)] text-[var(--text-subtle)] cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Service Accordion */}
      <div className="mt-3 px-4 md:px-0 min-h-[350px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <ScissorsLoader message="Loading signature services..." />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-6 bg-red-50 rounded-2xl border border-red-100 text-sm">
            Failed to load services. Please try again.
          </div>
        ) : Object.keys(groupedServices).length > 0 ? (
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm divide-y divide-gray-100">
            {Object.entries(groupedServices).map(([category, catServices]) => {
              const isExpanded = expandedCategory === category;
              const selectedCountInCategory = catServices.filter((s) => selectedServices.includes(s.id)).length;
              const hasSelections = selectedCountInCategory > 0;

              return (
                <div
                  key={category}
                  className={`bg-[var(--surface)] transition-all duration-200 ${hasSelections ? "border-l-4 border-l-[#8B0000]" : ""}`}
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                      hasSelections ? "bg-[rgba(139,0,0,0.05)] hover:bg-[rgba(139,0,0,0.1)]" : "bg-[var(--surface)] hover:bg-[rgba(139,0,0,0.02)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {hasSelections && (
                        <span className="w-4 h-4 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-[9px] font-bold">
                          {selectedCountInCategory}
                        </span>
                      )}
                      <h3 className={`text-xs font-bold tracking-widest uppercase ${hasSelections ? "text-[var(--primary)]" : "text-[var(--text)]"}`}>
                        {category}
                      </h3>
                    </div>
                    {isExpanded
                      ? <ChevronUp className={`w-4 h-4 ${hasSelections ? "text-[var(--primary)]" : "text-[var(--text-subtle)]"}`} />
                      : <ChevronDown className={`w-4 h-4 ${hasSelections ? "text-[var(--primary)]" : "text-[var(--text-subtle)]"}`} />
                    }
                  </button>

                  {/* Category content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="divide-y divide-gray-100">
                          {catServices.map((service) => {
                            const isSelected = selectedServices.includes(service.id);
                            const selectedBarberId = selectedBarbers[service.id];
                            const timelineItem = timeline.find(t => t.serviceId === service.id);

                            return (
                              <div key={service.id}>
                                {/* Service Row */}
                                <div
                                  onClick={() => onToggleService(service.id)}
                                  className={`group flex items-center cursor-pointer transition-all duration-200 px-3.5 py-3 md:px-4 ${
                                    isSelected ? "bg-[rgba(139,0,0,0.05)]" : "hover:bg-[rgba(139,0,0,0.03)]"
                                  }`}
                                >
                                  {/* Checkbox */}
                                  <div className="flex-shrink-0 mr-3">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                                      isSelected ? "bg-[var(--primary)] border-[var(--primary)]" : "border-2 border-[var(--border)] group-hover:border-[var(--primary)]/50"
                                    }`}>
                                      {isSelected && <Check size={11} strokeWidth={4} className="text-white" />}
                                    </div>
                                  </div>

                                  {/* Service info */}
                                  <div className="flex-grow min-w-0">
                                    <h4 className={`text-sm font-semibold truncate ${isSelected ? "text-[var(--primary)]" : "text-[var(--text)]"}`}>
                                      {service.name}
                                    </h4>
                                    <div className="flex items-center text-xs text-[var(--text-muted)] mt-1 flex-wrap gap-x-2 gap-y-1">
                                      <span className="flex items-center">
                                        <Clock className="w-2.5 h-2.5 mr-1 text-[var(--text-subtle)]" />
                                        {service.duration_minutes} min
                                      </span>
                                      {service.tag && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[rgba(139,0,0,0.05)] text-[var(--primary)]">
                                          {service.tag}
                                        </span>
                                      )}
                                      {service.gender && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.05)] text-[var(--text-subtle)]">
                                          {service.gender}
                                        </span>
                                      )}
                                      {isSelected && timelineItem && (
                                        <span className="font-medium text-[var(--primary)] bg-[rgba(139,0,0,0.1)] px-1.5 py-0.5 rounded">
                                          {timelineItem.formattedStartTime} to {timelineItem.formattedEndTime}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="flex-shrink-0 ml-2 text-right flex flex-col justify-center">
                                    <span className="font-bold text-sm text-[var(--text)] leading-none">
                                      {service.currency === 'INR' ? 'Rs. ' : service.currency}{parseFloat(service.price).toLocaleString()}
                                    </span>
                                    <span className="text-[9px] text-[var(--text-subtle)] uppercase tracking-wider mt-1 block">
                                      on words
                                    </span>
                                  </div>
                                </div>

                                {/* Inline stylist tags shown when service is selected. */}
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-3 pt-2 bg-[var(--bg-soft)] border-t border-[var(--border)]">
                                          {/* Stylist header with available count from API */}
                                          <div className="flex items-center justify-between mb-2">
                                            <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-widest">Preferred Stylist</p>
                                            <span className="text-[10px] text-[var(--text-muted)] font-medium">
                                              {countAvailableForService(service.id)}/{slotTotalCount} slots available
                                            </span>
                                          </div>
                                          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                                            {/* Any Staff tag */}
                                            <button
                                              onClick={() => anyStaffAvailable(service.id) && onSetBarberForService(service.id, null)}
                                              disabled={!anyStaffAvailable(service.id)}
                                              title={!anyStaffAvailable(service.id) ? "No staff available at this time" : ""}
                                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                                                !anyStaffAvailable(service.id)
                                                  ? "opacity-40 cursor-not-allowed bg-[rgba(139,0,0,0.05)] border-[var(--border)] text-[var(--text-subtle)]"
                                                  : selectedBarberId === null
                                                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                                                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                                              }`}
                                            >
                                              <span className="flex items-center gap-1">
                                                <User className="w-2.5 h-2.5" />
                                                Any Available
                                              </span>
                                            </button>

                                            {/* Specific barber tags */}
                                            {activeBarbers.map((barber) => {
                                              const isAvail = isBarberAvailableForService(barber.id, service.id);
                                              const isChosen = selectedBarberId === barber.id;
                                              return (
                                                <button
                                                  key={barber.id}
                                                  onClick={() => isAvail && onSetBarberForService(service.id, barber.id)}
                                                  disabled={!isAvail}
                                                  title={!isAvail ? `${barber.full_name} is not available at this time` : ""}
                                                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                                                    !isAvail
                                                      ? "opacity-40 cursor-not-allowed bg-[var(--bg-soft)] border-dashed border-[var(--border)] text-[var(--text-subtle)]"
                                                      : isChosen
                                                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                                                      : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                                                  }`}
                                                >
                                                  <span className="flex items-center gap-1">
                                                    {barber.full_name}
                                                    {!isAvail && (
                                                      <span className="text-[8px] font-normal text-[var(--text-subtle)] ml-0.5">busy</span>
                                                    )}
                                                  </span>
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm"
          >
            <Search className="w-8 h-8 text-gray-300 mb-3" />
            <h3 className="text-base font-bold text-[var(--text)] mb-1">No services found</h3>
            <p className="text-[var(--text-muted)] text-sm">Try adjusting your search or category filter.</p>
          </motion.div>
        )}
      </div>

      {/* Floating booking summary */}

      {/* Desktop: Fixed cart button (bottom-right) */}
      <AnimatePresence>
        {selectedServices.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex fixed bottom-8 right-8 z-40 items-center gap-2 bg-[var(--primary)] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#5C0000] transition-all duration-200 hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold text-sm">{selectedServices.length} Services</span>
            <span className="text-xs font-semibold bg-[var(--surface)]/20 px-2 py-0.5 rounded-full">Rs. {totalPrice.toLocaleString()}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile: Sticky bottom pill */}
      <AnimatePresence>
        {selectedServices.length > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)] border-t border-[var(--border)] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3 pb-safe backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex-1 flex items-center justify-between bg-[var(--primary)] text-white px-4 py-3 rounded-xl shadow-sm active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-sm">{selectedServices.length} Services</span>
                    <span className="text-[10px] text-white/80">{overallStartTime} to {overallEndTime}</span>
                  </div>
                </div>
                <span className="font-bold text-sm">Rs. {totalPrice.toLocaleString()}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[var(--surface)] rounded-l-2xl shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)] z-10 relative rounded-tl-2xl">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] font-serif">Booking Summary</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Use arrows to reorder services</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedServices.length > 0 && (
                    <button
                      onClick={() => {
                        selectedServices.forEach((id) => onToggleService(id));
                      }}
                      className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-7 h-7 rounded-md bg-[rgba(139,0,0,0.05)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                  >
                    <X className="w-4 h-4 text-[var(--text-muted)]" />
                  </button>
                </div>
              </div>

              {/* Services List (Up/Down arrows) */}
              <div className="flex-1 overflow-y-auto p-4 bg-[var(--bg-soft)]/50 relative z-0">
                {selectedServiceDetails.length === 0 ? (
                  <div className="text-center py-12 text-[var(--text-subtle)]">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No services selected</p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {selectedServiceDetails.map((service, index) => {
                      const chosenBarberId = selectedBarbers[service.id];
                      const chosenBarber = chosenBarberId
                        ? activeBarbers.find((b) => b.id === chosenBarberId) ?? null
                        : null;
                      const timelineItem = timeline.find((t) => t.serviceId === service.id);

                      return (
                        <CartItem
                          key={service.id}
                          service={service}
                          timelineItem={timelineItem}
                          chosenBarber={chosenBarber}
                          chosenBarberId={chosenBarberId}
                          isFirst={index === 0}
                          isLast={index === selectedServiceDetails.length - 1}
                          handleRemoveService={handleRemoveService}
                          onMoveUp={() => moveServiceUp(index)}
                          onMoveDown={() => moveServiceDown(index)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer Summary */}
              <div className="border-t border-[var(--border)] p-4 bg-[var(--surface)] z-10 relative">
                <div className="mb-4 bg-[var(--bg-soft)] rounded-xl p-3 border border-[var(--border)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-[var(--text-muted)] font-medium">{selectedServices.length} Services</span>
                    <span className="text-sm font-bold text-[var(--primary)]">{totalDuration} min</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--border)] mt-2">
                    <span className="text-xs text-[var(--text-muted)] font-medium">Timeline</span>
                    <span className="text-xs text-[var(--text)] font-semibold">{overallStartTime} to {overallEndTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-sm text-[var(--text)] font-bold">Total Amount</span>
                  <span className="text-xl font-bold text-[var(--primary)]">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-3 rounded-xl font-medium text-[var(--text-muted)] bg-[rgba(139,0,0,0.05)] hover:bg-[var(--border)] transition-colors text-sm"
                  >
                    Add More
                  </button>
                  <button
                    onClick={() => { setIsCartOpen(false); onNext(); }}
                    disabled={selectedServices.length === 0}
                    className={`flex-[2] py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md ${
                      selectedServices.length > 0
                        ? "bg-[var(--primary)] hover:bg-[#5C0000] shadow-sm"
                        : "bg-[var(--border)] text-[var(--text-subtle)] cursor-not-allowed"
                    }`}
                  >
                    Confirm & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile spacer */}
      <div className="md:hidden h-24" />
    </div>
  );
}
