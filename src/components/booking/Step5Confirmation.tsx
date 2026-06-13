"use client";

import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "./schema";

export default function Step5Confirmation({ methods }: { methods: UseFormReturn<BookingFormData> }) {
  const { getValues } = methods;
  const data = getValues();

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
      </div>
      
      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-4">Booking Confirmed</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
        Thank you, {data.firstName}! Your appointment has been successfully scheduled. We've sent a confirmation to your email and WhatsApp.
      </p>

      <div className="bg-surface border border-outline/20 rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
        <h4 className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-4 border-b border-outline/10 pb-2">Appointment Details</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Date</span>
            <span className="font-medium text-on-surface">{data.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Time</span>
            <span className="font-medium text-on-surface">{data.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Stylist</span>
            <span className="font-medium text-on-surface">{data.stylistId === "st4" ? "Any Available" : "Selected Stylist"}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/"}
        className="text-primary font-label-sm text-label-sm uppercase tracking-widest hover:underline"
      >
        Return to Home
      </button>
    </div>
  );
}
