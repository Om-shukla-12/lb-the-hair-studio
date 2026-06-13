"use client";

import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "./schema";

const availableDates = [
  { id: "d1", day: "Mon", date: "Oct 12" },
  { id: "d2", day: "Tue", date: "Oct 13" },
  { id: "d3", day: "Wed", date: "Oct 14" },
  { id: "d4", day: "Thu", date: "Oct 15" },
  { id: "d5", day: "Fri", date: "Oct 16" },
];

const availableTimes = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

export default function Step3DateTime({ methods }: { methods: UseFormReturn<BookingFormData> }) {
  const { register, watch, setValue, formState: { errors } } = methods;
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Date & Time</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Select when you'd like to visit us.</p>
      </div>

      <div className="mb-8">
        <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/80 mb-4">Select Date</h4>
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {availableDates.map((d) => (
            <div
              key={d.id}
              onClick={() => setValue("date", d.date, { shouldValidate: true })}
              className={`flex-shrink-0 w-20 py-4 rounded-xl border text-center cursor-pointer transition-all duration-300 ${
                selectedDate === d.date 
                  ? "border-primary bg-primary text-on-primary shadow-md" 
                  : "border-outline/30 text-on-surface hover:border-primary/50"
              }`}
            >
              <div className="text-xs uppercase tracking-widest mb-1 opacity-80">{d.day}</div>
              <div className="font-headline-md text-xl">{d.date.split(" ")[1]}</div>
              <div className="text-xs opacity-80 mt-1">{d.date.split(" ")[0]}</div>
            </div>
          ))}
        </div>
        {errors.date && <p className="text-error text-sm mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/80 mb-4">Select Time</h4>
        <div className="grid grid-cols-3 gap-3">
          {availableTimes.map((time) => (
            <div
              key={time}
              onClick={() => setValue("time", time, { shouldValidate: true })}
              className={`py-3 rounded-lg border text-center cursor-pointer transition-all duration-300 font-label-sm text-sm tracking-wider ${
                selectedTime === time 
                  ? "border-primary bg-primary-fixed/20 text-primary shadow-inner" 
                  : "border-outline/30 text-on-surface hover:border-primary/50"
              }`}
            >
              {time}
            </div>
          ))}
        </div>
        {errors.time && <p className="text-error text-sm mt-2">{errors.time.message}</p>}
      </div>

      <input type="hidden" {...register("date")} />
      <input type="hidden" {...register("time")} />
    </div>
  );
}
