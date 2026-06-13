"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServices, useBarbers, useSlots } from "../../hooks/useBooking";
import { Search, Clock, Check, ChevronDown, ChevronUp, ShoppingBag, X, Trash2, User } from "lucide-react";
import { Service, Barber } from "../../types/booking";
import ScissorsLoader from "../ui/ScissorsLoader";

interface ServiceSelectionProps {
  selectedDate: string;
  selectedTime: string;
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  selectedBarbers: Record<string, string | null>;
  onSetBarberForService: (serviceId: string, barberId: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ServiceSelection({
  selectedDate,
  selectedTime,
  selectedServices,
  onToggleService,
  selectedBarbers,
  onSetBarberForService,
  onNext,
  onBack,
}: ServiceSelectionProps) {
  const { data: services, isLoading, isError } = useServices();
  const { data: barbers } = useBarbers();
  const { data: slots } = useSlots(selectedDate);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Active barbers
  const activeBarbers = useMemo(() => (barbers || []).filter((b) => b.is_active), [barbers]);

  // Available barbers for selected time slot
  const availableBarberIds = useMemo(() => {
    if (!slots || !selectedTime) return new Set<string>();
    const allSlots = [...slots.morning, ...slots.afternoon, ...slots.evening];
    const targetSlot = allSlots.find((s) => s.time === selectedTime);
    if (targetSlot && targetSlot.available_count > 0) {
      const available = activeBarbers.slice(0, targetSlot.available_count);
      return new Set(available.map((b) => b.id));
    }
    return new Set<string>();
  }, [slots, selectedTime, activeBarbers]);

  const anyStaffAvailable = availableBarberIds.size > 0;

  // Categories
  const categories = useMemo(() => {
    if (!services) return ["All"];
    const tags = new Set(services.map((s) => s.tag || "Other"));
    return ["All", ...Array.from(tags)];
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
    if (selectedCategoryFilter !== "All") {
      filtered = filtered.filter((s) => (s.tag || "Other") === selectedCategoryFilter);
    }
    const groups: Record<string, Service[]> = {};
    filtered.forEach((s) => {
      const tag = s.tag || "Other";
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(s);
    });
    return groups;
  }, [services, searchQuery, selectedCategoryFilter]);

  // Auto-expand first category
  useEffect(() => {
    if (expandedCategory === null && Object.keys(groupedServices).length > 0) {
      setExpandedCategory(Object.keys(groupedServices)[0]);
    }
  }, [groupedServices, expandedCategory]);

  // Selected service details
  const selectedServiceDetails = useMemo(() => {
    if (!services) return [];
    return services.filter((s) => selectedServices.includes(s.id));
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

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 md:pb-0">
      {/* Header */}
      <div className="mb-4 px-4 md:px-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B0000] transition-colors duration-200 group mb-2"
        >
          <span className="material-symbols-outlined text-[15px] group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
          Back to Time
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-[#111111] font-serif">Select Services</h2>
        <p className="text-gray-500 mt-0.5 text-sm">Choose services and preferred stylist for each.</p>
      </div>

      {/* Sticky top bar */}
      <div className="sticky top-20 z-30 bg-[#FAF9F6]/95 backdrop-blur-xl pt-3 pb-2 px-4 md:px-0 -mx-4 md:mx-0">
        {/* Search */}
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-[#1A1A1A] placeholder-gray-400 focus:bg-white focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/20 transition-all duration-300 shadow-sm text-sm"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                    ? "bg-[#8B0000] text-white shadow-sm"
                    : "bg-white/80 text-gray-600 border border-gray-200 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Desktop summary */}
        <div className="hidden md:flex mt-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
            <span>Selected: <span className="text-[#8B0000] font-bold">{selectedServices.length}</span></span>
            <span className="w-px h-3 bg-gray-200" />
            <span>Duration: <span className="text-[#8B0000] font-bold">{totalDuration} min</span></span>
            <span className="w-px h-3 bg-gray-200" />
            <span>Total: <span className="text-[#8B0000] font-bold">₹{totalPrice.toLocaleString()}</span></span>
          </div>
          <div className="flex gap-2">
            <button onClick={onBack} className="px-4 py-1.5 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors text-xs">Back</button>
            <button
              onClick={onNext}
              disabled={selectedServices.length === 0}
              className={`px-6 py-1.5 rounded-full text-white font-semibold transition-all duration-200 text-xs ${
                selectedServices.length > 0
                  ? "bg-[#8B0000] hover:bg-[#5C0000] shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-100">
            {Object.entries(groupedServices).map(([category, catServices]) => {
              const isExpanded = expandedCategory === category;
              const selectedCountInCategory = catServices.filter((s) => selectedServices.includes(s.id)).length;
              const hasSelections = selectedCountInCategory > 0;

              return (
                <div
                  key={category}
                  className={`bg-white transition-all duration-200 ${hasSelections ? "border-l-4 border-l-[#D4AF37]" : ""}`}
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                      hasSelections ? "bg-[#8B0000]/5 hover:bg-[#8B0000]/8" : "bg-white hover:bg-gray-50/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {hasSelections && (
                        <span className="w-4 h-4 rounded-full bg-[#8B0000] flex items-center justify-center text-white text-[9px] font-bold">
                          {selectedCountInCategory}
                        </span>
                      )}
                      <h3 className={`text-xs font-bold tracking-widest uppercase ${hasSelections ? "text-[#8B0000]" : "text-[#111111]"}`}>
                        {category}
                      </h3>
                    </div>
                    {isExpanded
                      ? <ChevronUp className={`w-4 h-4 ${hasSelections ? "text-[#8B0000]" : "text-gray-400"}`} />
                      : <ChevronDown className={`w-4 h-4 ${hasSelections ? "text-[#8B0000]" : "text-gray-400"}`} />
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
                        <div className="divide-y divide-gray-50">
                          {catServices.map((service) => {
                            const isSelected = selectedServices.includes(service.id);
                            const selectedBarberId = selectedBarbers[service.id];

                            return (
                              <div key={service.id}>
                                {/* Service Row */}
                                <div
                                  onClick={() => onToggleService(service.id)}
                                  className={`group flex items-center cursor-pointer transition-all duration-200 px-4 py-2.5 ${
                                    isSelected ? "bg-[#8B0000]/3" : "hover:bg-gray-50/70"
                                  }`}
                                >
                                  {/* Checkbox */}
                                  <div className="flex-shrink-0 mr-3">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                                      isSelected ? "bg-[#D4AF37] border-[#D4AF37]" : "border-2 border-gray-300 group-hover:border-[#D4AF37]"
                                    }`}>
                                      {isSelected && <Check size={11} strokeWidth={4} className="text-white" />}
                                    </div>
                                  </div>

                                  {/* Service info */}
                                  <div className="flex-grow min-w-0">
                                    <h4 className={`text-sm font-semibold truncate ${isSelected ? "text-[#8B0000]" : "text-[#1A1A1A]"}`}>
                                      {service.name}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                      <Clock className="w-2.5 h-2.5 mr-1" />
                                      {service.duration_minutes} min
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="flex-shrink-0 ml-2 text-right">
                                    <span className="font-bold text-sm text-[#1A1A1A]">
                                      {service.currency === 'INR' ? '₹' : service.currency}{parseFloat(service.price).toLocaleString()}
                                    </span>
                                  </div>
                                </div>

                                {/* Inline Stylist Tags — shown when service is selected */}
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-2.5 pt-1 bg-[#8B0000]/3 border-t border-[#8B0000]/8">
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">Preferred Stylist</p>
                                        <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                                          {/* Any Staff tag */}
                                          <button
                                            onClick={() => anyStaffAvailable && onSetBarberForService(service.id, null)}
                                            disabled={!anyStaffAvailable}
                                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                                              !anyStaffAvailable
                                                ? "opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400"
                                                : selectedBarberId === null
                                                ? "bg-[#8B0000] text-white border-[#8B0000] shadow-sm"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-[#8B0000]/40 hover:text-[#8B0000]"
                                            }`}
                                          >
                                            <span className="flex items-center gap-1">
                                              <User className="w-2.5 h-2.5" />
                                              Any Staff
                                            </span>
                                          </button>

                                          {/* Specific barber tags */}
                                          {activeBarbers.map((barber) => {
                                            const isAvail = availableBarberIds.has(barber.id);
                                            const isChosen = selectedBarberId === barber.id;
                                            return (
                                              <button
                                                key={barber.id}
                                                onClick={() => isAvail && onSetBarberForService(service.id, barber.id)}
                                                disabled={!isAvail}
                                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                                                  !isAvail
                                                    ? "opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400"
                                                    : isChosen
                                                    ? "bg-[#8B0000] text-white border-[#8B0000] shadow-sm"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#8B0000]/40 hover:text-[#8B0000]"
                                                }`}
                                              >
                                                {barber.full_name}
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
            className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <Search className="w-8 h-8 text-gray-300 mb-3" />
            <h3 className="text-base font-bold text-[#111111] mb-1">No services found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or category filter.</p>
          </motion.div>
        )}
      </div>

      {/* ─── FLOATING CART ─── */}

      {/* Desktop: Fixed cart button (bottom-right) */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex fixed bottom-8 right-8 z-50 items-center gap-2 bg-[#8B0000] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(139,0,0,0.35)] hover:bg-[#5C0000] transition-all duration-200 hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold text-sm">{selectedServices.length} Services</span>
            <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">₹{totalPrice.toLocaleString()}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile: Sticky bottom pill */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex-1 flex items-center justify-between bg-[#8B0000] text-white px-4 py-3 rounded-xl shadow-sm active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="font-bold text-sm">{selectedServices.length} Services · {totalDuration} min</span>
                </div>
                <span className="font-bold text-sm">₹{totalPrice.toLocaleString()}</span>
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
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-[#111111] font-serif">Your Selection</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedServices.length > 0 && (
                    <button
                      onClick={() => {
                        selectedServices.forEach((id) => onToggleService(id));
                      }}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Services List */}
              <div className="flex-1 overflow-y-auto p-4">
                {selectedServiceDetails.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No services selected</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedServiceDetails.map((service) => {
                      const chosenBarberId = selectedBarbers[service.id];
                      const chosenBarber = chosenBarberId
                        ? activeBarbers.find((b) => b.id === chosenBarberId)
                        : null;

                      return (
                        <motion.div
                          key={service.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex items-start justify-between bg-gray-50 rounded-xl p-3"
                        >
                          <div className="flex-grow min-w-0 pr-2">
                            <p className="text-sm font-semibold text-[#111111] truncate">{service.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {service.duration_minutes} min
                            </p>
                            {chosenBarber && (
                              <p className="text-[10px] text-[#8B0000] font-medium mt-1">✦ {chosenBarber.full_name}</p>
                            )}
                            {chosenBarberId === null && (
                              <p className="text-[10px] text-gray-400 font-medium mt-1">Any available staff</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-bold text-[#111111]">
                              ₹{parseFloat(service.price).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleRemoveService(service.id)}
                              className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                            >
                              <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 font-medium">Total ({totalDuration} min)</span>
                  <span className="text-xl font-bold text-[#8B0000]">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onBack}
                    className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { setIsCartOpen(false); onNext(); }}
                    disabled={selectedServices.length === 0}
                    className={`flex-[2] py-2.5 rounded-xl font-bold text-white text-sm transition-all ${
                      selectedServices.length > 0
                        ? "bg-[#8B0000] hover:bg-[#5C0000] shadow-sm"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Proceed to Details →
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile spacer */}
      <div className="md:hidden h-20" />
    </div>
  );
}
