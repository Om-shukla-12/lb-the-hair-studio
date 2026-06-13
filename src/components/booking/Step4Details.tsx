"use client";

import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "./schema";

export default function Step4Details({ methods }: { methods: UseFormReturn<BookingFormData> }) {
  const { register, formState: { errors } } = methods;

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Your Details</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">We need a few details to confirm your appointment.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-2">First Name</label>
            <input 
              type="text" 
              {...register("firstName")}
              className={`w-full bg-surface border rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:border-primary transition-colors ${errors.firstName ? 'border-error focus:ring-error' : 'border-outline/30 focus:ring-primary'}`}
              placeholder="Jane"
            />
            {errors.firstName && <p className="text-error text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-2">Last Name</label>
            <input 
              type="text" 
              {...register("lastName")}
              className={`w-full bg-surface border rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:border-primary transition-colors ${errors.lastName ? 'border-error focus:ring-error' : 'border-outline/30 focus:ring-primary'}`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-error text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-2">Email</label>
          <input 
            type="email" 
            {...register("email")}
            className={`w-full bg-surface border rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:border-primary transition-colors ${errors.email ? 'border-error focus:ring-error' : 'border-outline/30 focus:ring-primary'}`}
            placeholder="jane@example.com"
          />
          {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-2">Phone Number</label>
          <input 
            type="tel" 
            {...register("phone")}
            className={`w-full bg-surface border rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:border-primary transition-colors ${errors.phone ? 'border-error focus:ring-error' : 'border-outline/30 focus:ring-primary'}`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant/80 mb-2">Notes for Stylist (Optional)</label>
          <textarea 
            {...register("notes")}
            rows={3}
            className="w-full bg-surface border border-outline/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
            placeholder="Any specific requests or hair history we should know about?"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
