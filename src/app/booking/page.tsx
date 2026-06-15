"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import BookingStepper from "@/components/booking/BookingStepper";
import DateSelection from "@/components/booking/DateSelection";
import SlotSelection from "@/components/booking/SlotSelection";
import ServiceSelection from "@/components/booking/ServiceSelection";
import CustomerForm from "@/components/booking/CustomerForm";
import BookingStatusModal, { ModalState } from "@/components/booking/BookingStatusModal";
import { useCreateBooking, useServices } from "@/hooks/useBooking";
import { CustomerDetails, BulkBookingPayload, BookingPayload } from "@/types/booking";
import { addMinutesToTime } from "@/lib/time";
import { getCustomerFriendlyError, CustomerFriendlyError } from "@/lib/errorHandling";

const STEPS = ["Date", "Time", "Services", "Details"];

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarbers, setSelectedBarbers] = useState<Record<string, string | null>>({});
  
  // Modal State
  const [modalState, setModalState] = useState<ModalState>("hidden");
  const [modalError, setModalError] = useState<CustomerFriendlyError | null>(null);

  const createBooking = useCreateBooking();
  const { data: servicesData } = useServices();

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

  const reorderServices = (newOrder: string[]) => {
    setSelectedServices(newOrder);
  };

  const handleBookingSubmit = async (customer: CustomerDetails) => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) return;

    try {
      // Build sequential start times: each service starts when the previous one ends
      let currentTime = selectedTime;
      const bookings: BookingPayload[] = selectedServices.map((serviceId) => {
        const service = servicesData?.find((s) => s.id === serviceId);
        const duration = service?.duration_minutes ?? 60; // fallback 60min
        const thisStartTime = currentTime;
        currentTime = addMinutesToTime(currentTime, duration);
        return {
          service_id: serviceId,
          employee_id: selectedBarbers[serviceId] ?? null,
          customer_name: `${customer.firstName} ${customer.lastName || ""}`.trim(),
          customer_email: customer.email && customer.email.trim() !== "" ? customer.email.trim() : null,
          customer_phone: customer.phone,
          start_time: `${selectedDate}T${thisStartTime}:00`,
          notes: customer.notes && customer.notes.trim() !== "" ? customer.notes.trim() : null,
        };
      });

      const payload: BulkBookingPayload = { bookings };
      console.log("SENDING PAYLOAD:", JSON.stringify(payload, null, 2));
      await createBooking.mutateAsync(payload);
      
      setModalState("success");
    } catch (error: unknown) {
      console.error("Booking failed:", error);
      const friendlyError = getCustomerFriendlyError(error);
      setModalError(friendlyError);
      setModalState("error");
    }
  };

  const handleModalClose = () => {
    const isSuccess = modalState === "success";
    setModalState("hidden");
    if (isSuccess) {
      router.push("/");
    }
  };

  const handleModalRetry = () => {
    setModalState("hidden");
    // User can just click 'Confirm Booking' again as the form state is preserved
  };

  const handleSelectAnotherTime = () => {
    setModalState("hidden");
    // Go back to the time selection step
    setCurrentStep(1);
    setSelectedTime(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <TopNavBar />
      <div className="luxury-shell min-h-screen pt-24 pb-10 md:pt-28">
        <div className="max-w-5xl mx-auto px-4">

          {/* Back link */}
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200 group"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform duration-200">
                arrow_back
              </span>
              Back to Home
            </Link>
          </div>

          {/* Page title */}
          <div className="text-center mb-5">
            <h1 className="text-4xl md:text-5xl font-semibold font-serif mb-2" style={{ color: 'var(--text)' }}>
              Book Your Appointment
            </h1>
            <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
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
                  onReorderServices={reorderServices}
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

        <BookingStatusModal 
          state={modalState} 
          error={modalError} 
          onClose={handleModalClose}
          onRetry={handleModalRetry}
          onSelectAnotherTime={handleSelectAnotherTime}
        />
      </div>
      <Footer />
    </>
  );
}
