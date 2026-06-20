"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
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
  const [modalState, setModalState] = useState<ModalState>("hidden");
  const [modalError, setModalError] = useState<CustomerFriendlyError | null>(null);
  const createBooking = useCreateBooking();
  const { data: servicesData } = useServices();

  const handleNext = () => { setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack = () => { setCurrentStep((p) => Math.max(p - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const n = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      if (prev.includes(serviceId)) { const b = { ...selectedBarbers }; delete b[serviceId]; setSelectedBarbers(b); }
      else setSelectedBarbers((b) => ({ ...b, [serviceId]: null }));
      return n;
    });
  };

  const handleBookingSubmit = async (customer: CustomerDetails) => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) return;
    try {
      let currentTime = selectedTime;
      const bookings: BookingPayload[] = selectedServices.map((serviceId) => {
        const service = servicesData?.find((s) => s.id === serviceId);
        const duration = service?.duration_minutes ?? 60;
        const thisStartTime = currentTime;
        currentTime = addMinutesToTime(currentTime, duration);
        return { service_id: serviceId, employee_id: selectedBarbers[serviceId] ?? null, customer_name: `${customer.firstName} ${customer.lastName || ""}`.trim(), customer_email: customer.email?.trim() || null, customer_phone: customer.phone, start_time: `${selectedDate}T${thisStartTime}:00`, notes: customer.notes?.trim() || null };
      });
      await createBooking.mutateAsync({ bookings } as BulkBookingPayload);
      setModalState("success");
    } catch (error: unknown) {
      setModalError(getCustomerFriendlyError(error));
      setModalState("error");
    }
  };

  return (
    <>
      <TopNavBar />
      <main className="flex-grow" style={{ background: "var(--cream)" }}>
        <PageHeader eyebrow="Reservations" title="Book Your Appointment" subtitle="Select your preferred date, time, and services." />

        <div className="mx-auto max-w-5xl px-5 py-6 md:px-8 md:py-10" style={{ color: "var(--ink)" }}>
          <Link href="/" className="mb-4 inline-flex items-center gap-1.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.10em] transition-colors duration-200" style={{ color: "var(--ink-muted)" }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <BookingStepper currentStep={currentStep} steps={STEPS} />
          <div className="relative mt-5 min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && <DateSelection key="step0" selectedDate={selectedDate} onSelectDate={setSelectedDate} onNext={handleNext} />}
              {currentStep === 1 && selectedDate && <SlotSelection key="step1" selectedDate={selectedDate} selectedTime={selectedTime} onSelectTime={setSelectedTime} onNext={handleNext} onBack={handleBack} />}
              {currentStep === 2 && selectedDate && selectedTime && <ServiceSelection key="step2" selectedDate={selectedDate} selectedTime={selectedTime} selectedServices={selectedServices} onToggleService={toggleService} selectedBarbers={selectedBarbers} onSetBarberForService={(s, b) => setSelectedBarbers((p) => ({ ...p, [s]: b }))} onReorderServices={setSelectedServices} onNext={handleNext} onBack={handleBack} />}
              {currentStep === 3 && <CustomerForm key="step3" onSubmit={handleBookingSubmit} onBack={handleBack} isSubmitting={createBooking.isPending} />}
            </AnimatePresence>
          </div>
        </div>
        <BookingStatusModal state={modalState} error={modalError} onClose={() => { const s = modalState === "success"; setModalState("hidden"); if (s) router.push("/"); }} onRetry={() => setModalState("hidden")} onSelectAnotherTime={() => { setModalState("hidden"); setCurrentStep(1); setSelectedTime(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      </main>
      <Footer />
    </>
  );
}
