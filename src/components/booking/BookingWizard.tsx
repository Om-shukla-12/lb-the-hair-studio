"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormData } from "./schema";
import { motion, AnimatePresence } from "framer-motion";

// Steps
import Step1Service from "./Step1Service";
import Step2Stylist from "./Step2Stylist";
import Step3DateTime from "./Step3DateTime";
import Step4Details from "./Step4Details";
import Step5Confirmation from "./Step5Confirmation";
import BookingStatusModal, { ModalState } from "./BookingStatusModal";
import { getCustomerFriendlyError, CustomerFriendlyError } from "@/lib/errorHandling";

const steps = ["Service", "Stylist", "Date & Time", "Details", "Confirm"];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Modal State
  const [modalState, setModalState] = useState<ModalState>("hidden");
  const [modalError, setModalError] = useState<CustomerFriendlyError | null>(null);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      serviceId: "",
      stylistId: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ["serviceId"];
    if (currentStep === 1) fieldsToValidate = ["stylistId"];
    if (currentStep === 2) fieldsToValidate = ["date", "time"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Placeholder for API call
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setCurrentStep(4); // Move to confirmation step
      } else {
        const errorData = await res.json().catch(() => ({}));
        const friendlyError = getCustomerFriendlyError(errorData);
        setModalError(friendlyError);
        setModalState("error");
      }
    } catch (error) {
      console.error(error);
      const friendlyError = getCustomerFriendlyError(error);
      setModalError(friendlyError);
      setModalState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-surface-container-low p-6 md:p-10 rounded-2xl shadow-[0_20px_40px_rgba(87,0,0,0.05)] border border-outline/10">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step} className={`flex flex-col items-center ${index <= currentStep ? 'text-primary' : 'text-on-surface-variant opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors duration-300 ${index <= currentStep ? 'bg-primary text-on-primary' : 'bg-surface-variant'}`}>
                  {index < currentStep ? <span className="material-symbols-outlined text-sm">check</span> : index + 1}
                </div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider hidden md:block">{step}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-surface-variant rounded-full relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <Step1Service methods={methods} />}
              {currentStep === 1 && <Step2Stylist methods={methods} />}
              {currentStep === 2 && <Step3DateTime methods={methods} />}
              {currentStep === 3 && <Step4Details methods={methods} />}
              {currentStep === 4 && <Step5Confirmation methods={methods} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentStep < 4 && (
          <div className="mt-10 pt-6 border-t border-outline/20 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`font-label-sm text-label-sm uppercase tracking-wider px-6 py-2 rounded-full border border-outline transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-surface-variant'}`}
            >
              Back
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-8 py-2 rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-on-surface text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-8 py-2 rounded-full hover:scale-105 transition-transform shadow-lg disabled:opacity-70 flex items-center"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
            )}
          </div>
        )}
      </div>

      <BookingStatusModal 
        state={modalState} 
        error={modalError} 
        onClose={() => setModalState("hidden")}
        onRetry={() => setModalState("hidden")}
        onSelectAnotherTime={() => {
          setModalState("hidden");
          setCurrentStep(2); // Go back to Date & Time
        }}
      />
    </>
  );
}
