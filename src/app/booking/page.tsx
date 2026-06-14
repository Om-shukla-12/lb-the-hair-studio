"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import BookingStepper from "@/components/booking/BookingStepper";
import DateSelection from "@/components/booking/DateSelection";
import SlotSelection from "@/components/booking/SlotSelection";
import ServiceSelection from "@/components/booking/ServiceSelection";
import CustomerForm from "@/components/booking/CustomerForm";
import SuccessModal from "@/components/booking/SuccessModal";
import { useCreateBooking } from "@/hooks/useBooking";
import { CustomerDetails, BulkBookingPayload, BookingPayload } from "@/types/booking";

const STEPS = ["Date", "Time", "Services", "Details"];

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarbers, setSelectedBarbers] = useState<Record<string, string | null>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const createBooking = useCreateBooking();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newServices = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];

      if (prev.includes(serviceId)) {
        const newBarbers = { ...selectedBarbers };
        delete newBarbers[serviceId];
        setSelectedBarbers(newBarbers);
      } else {
        // Default new service to "Any" staff (null)
        setSelectedBarbers((b) => ({ ...b, [serviceId]: null }));
      }

      return newServices;
    });
  };

  const setBarberForService = (serviceId: string, barberId: string | null) => {
    setSelectedBarbers((prev) => ({ ...prev, [serviceId]: barberId }));
  };

  const handleBookingSubmit = async (customer: CustomerDetails) => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) return;

    try {
      const bookings: BookingPayload[] = selectedServices.map((serviceId) => ({
        service_id: serviceId,
        employee_id: selectedBarbers[serviceId] ?? null,
        customer_name: `${customer.firstName} ${customer.lastName || ""}`.trim(),
        // API rejects empty string for email — send null when not provided
        customer_email: customer.email && customer.email.trim() !== "" ? customer.email.trim() : null,
        customer_phone: customer.phone,
        start_time: `${selectedDate}T${selectedTime}:00`,
        notes: customer.notes && customer.notes.trim() !== "" ? customer.notes.trim() : null,
      }));

      const payload: BulkBookingPayload = { bookings };
      console.log("SENDING PAYLOAD:", JSON.stringify(payload, null, 2));
      await createBooking.mutateAsync(payload);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error("Booking failed:", error.response?.data || error);
      alert(`Failed to create booking. Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <TopNavBar />
      <div className="min-h-screen bg-gradient-to-b from-[#FCF9F8] to-[#F0EDEC] pt-16 pb-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* Back link */}
          <div className="mb-4">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B0000] transition-colors duration-200 group"
            >
              <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform duration-200">
                arrow_back
              </span>
              Back to Home
            </a>
          </div>

          {/* Page title */}
          <div className="text-center mb-5">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#111111] mb-2">
              Book Your Appointment
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Select your preferred date, time, and services to begin your luxury experience.
            </p>
          </div>

          {/* Stepper */}
          <BookingStepper currentStep={currentStep} steps={STEPS} />

          {/* Steps */}
          <div className="mt-5 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <DateSelection
                  key="step0"
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onNext={handleNext}
                />
              )}
              {currentStep === 1 && selectedDate && (
                <SlotSelection
                  key="step1"
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 2 && selectedDate && selectedTime && (
                <ServiceSelection
                  key="step2"
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedServices={selectedServices}
                  onToggleService={toggleService}
                  selectedBarbers={selectedBarbers}
                  onSetBarberForService={setBarberForService}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <CustomerForm
                  key="step3"
                  onSubmit={handleBookingSubmit}
                  onBack={handleBack}
                  isSubmitting={createBooking.isPending}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <SuccessModal isOpen={isSuccessModalOpen} onClose={handleModalClose} />
      </div>
      <Footer />
    </>
  );
}
