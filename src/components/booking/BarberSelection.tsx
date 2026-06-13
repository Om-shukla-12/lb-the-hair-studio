"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useBarbers, useServices, useSlots } from "../../hooks/useBooking";
import { Check, User, Star, Scissors } from "lucide-react";
import ScissorsLoader from "../ui/ScissorsLoader";

interface BarberSelectionProps {
  selectedDate: string;
  selectedTime: string;
  selectedServices: string[];
  selectedBarbers: Record<string, string | null>;
  onSetBarberForService: (serviceId: string, barberId: string | null) => void;
  canProceed: boolean;
  onNext: () => void;
  onBack: () => void;
}

export default function BarberSelection({
  selectedDate,
  selectedTime,
  selectedServices,
  selectedBarbers,
  onSetBarberForService,
  canProceed,
  onNext,
  onBack,
}: BarberSelectionProps) {
  const { data: barbers, isLoading: loadingBarbers } = useBarbers();
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: slots, isLoading: loadingSlots } = useSlots(selectedDate);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const selectedServiceDetails = services?.filter((s) => selectedServices.includes(s.id)) || [];

  const activeBarbers = useMemo(() => {
    return (barbers || []).filter(b => b.is_active);
  }, [barbers]);

  // Determine available staff based on the selected slot's available_count
  const availableBarberIds = useMemo(() => {
    if (!slots || !selectedTime) return new Set<string>();
    const allSlots = [...slots.morning, ...slots.afternoon, ...slots.evening];
    const targetSlot = allSlots.find(s => s.time === selectedTime);
    
    if (targetSlot && targetSlot.available_count > 0) {
      // Map available_count to a slice of active barbers
      const available = activeBarbers.slice(0, targetSlot.available_count);
      return new Set(available.map(b => b.id));
    }
    return new Set<string>();
  }, [slots, selectedTime, activeBarbers]);

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 md:pb-0">
      <div className="mb-8 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] font-serif">Select Professional</h2>
        <p className="text-gray-500 mt-2 text-lg">Choose an available professional for each of your selected services.</p>
      </div>

      {(loadingBarbers || loadingServices || loadingSlots) ? (
        <div className="flex justify-center items-center py-20">
          <ScissorsLoader message="Checking staff availability..." />
        </div>
      ) : (
        <div className="space-y-8">
          {selectedServiceDetails.map((service, index) => {
            const currentSelectedBarber = selectedBarbers[service.id]; // string id or null for Any
            
            // "Any Staff" is available if at least one staff member is available
            const anyStaffAvailable = availableBarberIds.size > 0;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(17,17,17,0.03)]"
              >
                <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-[#8B0000]/10 rounded-xl flex items-center justify-center mr-4">
                    <Scissors className="w-5 h-5 text-[#8B0000]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111]">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.duration_minutes} min • ₹{parseFloat(service.price).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-2 px-2">
                  {/* "Any Staff" Card */}
                  <button
                    onClick={() => anyStaffAvailable && onSetBarberForService(service.id, null)}
                    disabled={!anyStaffAvailable}
                    className={`relative flex-shrink-0 w-36 p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                      !anyStaffAvailable 
                        ? "opacity-50 cursor-not-allowed bg-gray-50 border-transparent text-gray-400"
                        : currentSelectedBarber === null
                        ? "bg-[#8B0000]/5 border-[#8B0000] shadow-md scale-[1.02]"
                        : "bg-white border-gray-100 hover:border-[#8B0000]/30 hover:shadow-sm"
                    }`}
                  >
                    {currentSelectedBarber === null && anyStaffAvailable && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#8B0000] rounded-full flex items-center justify-center text-white z-10 shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      !anyStaffAvailable 
                        ? "bg-gray-200 text-gray-400"
                        : currentSelectedBarber === null 
                        ? "bg-[#8B0000] text-white" 
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}>
                      <User size={28} />
                    </div>
                    <span className={`font-bold text-sm leading-tight mb-1 ${!anyStaffAvailable ? "text-gray-400" : "text-[#111111]"}`}>Any Staff</span>
                    {anyStaffAvailable ? (
                      <span className="text-xs text-[#8B0000] font-medium tracking-wide">First Available</span>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full mt-1">Not Available</span>
                    )}
                  </button>

                  {/* Specific Barbers */}
                  {activeBarbers.map((barber) => {
                    const isSelected = currentSelectedBarber === barber.id;
                    const isAvailable = availableBarberIds.has(barber.id);
                    const initials = getInitials(barber.full_name);
                    const role = barber.roles && barber.roles.length > 0 
                      ? barber.roles[0].charAt(0).toUpperCase() + barber.roles[0].slice(1) 
                      : "Stylist";

                    return (
                      <button
                        key={barber.id}
                        onClick={() => isAvailable && onSetBarberForService(service.id, barber.id)}
                        disabled={!isAvailable}
                        className={`relative flex-shrink-0 w-36 p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 border-2 ${
                          !isAvailable
                            ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed grayscale"
                            : isSelected
                            ? "bg-white border-[#8B0000] shadow-md scale-[1.02]"
                            : "bg-white border-gray-100 hover:border-[#8B0000]/30 hover:shadow-sm"
                        }`}
                      >
                        {isSelected && isAvailable && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#8B0000] rounded-full flex items-center justify-center text-white z-10 shadow-sm">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 font-serif text-xl transition-colors shadow-inner ${
                          !isAvailable 
                            ? "bg-gray-300 text-gray-500" 
                            : isSelected 
                            ? "bg-[#8B0000] text-white" 
                            : "bg-[#111111] text-white"
                        }`}>
                          {initials}
                          {barber.roles?.includes('owner') && (
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center border-2 border-white shadow-sm ${!isAvailable && 'grayscale'}`}>
                              <Star size={10} fill="currentColor" className="text-white" />
                            </div>
                          )}
                        </div>
                        <span className={`font-bold text-sm leading-tight mb-1 ${!isAvailable ? "text-gray-500" : "text-[#111111]"}`}>
                          {barber.full_name}
                        </span>
                        
                        {isAvailable ? (
                          <span className="text-xs text-gray-500">{role}</span>
                        ) : (
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-gray-200 px-2 py-0.5 rounded-full mt-1">Not Available</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-10 py-4 rounded-full text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            canProceed
              ? "bg-[#8B0000] hover:bg-[#5C0000] shadow-[0_10px_20px_rgba(139,0,0,0.2)] hover:shadow-[0_15px_25px_rgba(139,0,0,0.3)] hover:-translate-y-1"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Details
        </button>
      </div>
    </div>
  );
}
