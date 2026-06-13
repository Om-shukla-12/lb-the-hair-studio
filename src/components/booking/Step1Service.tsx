"use client";

import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "./schema";

const services = [
  { id: "s1", name: "Precision Cutting", price: "From $150", duration: "60 min" },
  { id: "s2", name: "Luxury Color", price: "From $300", duration: "180 min" },
  { id: "s3", name: "Balayage / Foil", price: "From $350", duration: "210 min" },
  { id: "s4", name: "Hair Extensions", price: "Consultation", duration: "30 min" },
  { id: "s5", name: "Signature Blowout", price: "From $85", duration: "45 min" },
];

export default function Step1Service({ methods }: { methods: UseFormReturn<BookingFormData> }) {
  const { register, watch, setValue, formState: { errors } } = methods;
  const selectedId = watch("serviceId");

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Select a Service</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Choose the luxury treatment you desire.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => setValue("serviceId", service.id, { shouldValidate: true })}
            className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
              selectedId === service.id 
                ? "border-primary bg-primary-fixed/20 shadow-md" 
                : "border-outline/30 hover:border-primary/50 hover:bg-surface"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-headline-md text-xl text-on-surface">{service.name}</h4>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedId === service.id ? "border-primary" : "border-outline/50"
              }`}>
                {selectedId === service.id && <div className="w-3 h-3 bg-primary rounded-full"></div>}
              </div>
            </div>
            <div className="flex justify-between items-center text-sm font-label-sm uppercase tracking-widest text-on-surface-variant/80">
              <span>{service.duration}</span>
              <span className="text-primary font-bold">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Hidden input to register with react-hook-form */}
      <input type="hidden" {...register("serviceId")} />
      {errors.serviceId && <p className="text-error text-sm mt-4 text-center">{errors.serviceId.message}</p>}
    </div>
  );
}
