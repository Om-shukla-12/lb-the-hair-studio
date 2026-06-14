"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CustomerDetails } from "../../types/booking";
import { Plus, ChevronUp } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type FormData = {
  firstName: string;
  phone: string;
  email?: string;
  notes?: string;
};

interface CustomerFormProps {
  onSubmit: (data: CustomerDetails) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function CustomerForm({ onSubmit, onBack, isSubmitting }: CustomerFormProps) {
  const [noteOpen, setNoteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      firstName: data.firstName,
      lastName: "",
      email: data.email && data.email.trim() !== "" ? data.email.trim() : "",
      phone: data.phone,
      notes: data.notes || "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(17,17,17,0.05)]"
    >
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-[#111111] font-serif">Your Details</h2>
        <p className="text-gray-500 mt-0.5 text-sm">Just a couple of details to confirm your booking.</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className={`peer block w-full px-4 pt-5 pb-2 text-sm text-[#111111] bg-[#F8F8F8] border-2 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:bg-white transition-all duration-200 ${
              errors.firstName ? "border-red-400 focus:border-red-400" : "border-transparent focus:border-[#8B0000]"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="firstName"
            className={`absolute text-xs duration-200 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-2.5 font-medium ${
              errors.firstName ? "text-red-500" : "text-gray-500 peer-focus:text-[#8B0000]"
            }`}
          >
            Full Name
          </label>
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className={`peer block w-full px-4 pt-5 pb-2 text-sm text-[#111111] bg-[#F8F8F8] border-2 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:bg-white transition-all duration-200 ${
              errors.phone ? "border-red-400 focus:border-red-400" : "border-transparent focus:border-[#8B0000]"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className={`absolute text-xs duration-200 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-2.5 font-medium ${
              errors.phone ? "text-red-500" : "text-gray-500 peer-focus:text-[#8B0000]"
            }`}
          >
            Mobile Number
          </label>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email (optional) */}
        <div className="relative">
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`peer block w-full px-4 pt-5 pb-2 text-sm text-[#111111] bg-[#F8F8F8] border-2 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:bg-white transition-all duration-200 ${
              errors.email ? "border-red-400 focus:border-red-400" : "border-transparent focus:border-[#8B0000]"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className={`absolute text-xs duration-200 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-2.5 font-medium ${
              errors.email ? "text-red-500" : "text-gray-500 peer-focus:text-[#8B0000]"
            }`}
          >
            Email <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Add Note toggle */}
        <div>
          <button
            type="button"
            onClick={() => setNoteOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:text-[#8B0000] hover:border-[#8B0000]/30 transition-all duration-200"
          >
            {noteOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {noteOpen ? "Remove Note" : "+ Add Note"}
          </button>

          <AnimatePresence>
            {noteOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <textarea
                  id="notes"
                  {...register("notes")}
                  rows={3}
                  className="mt-2 block w-full px-4 py-3 text-sm text-[#111111] bg-[#F8F8F8] border-2 border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#8B0000] transition-all duration-200 resize-none"
                  placeholder="Special requests, preferred stylist, hair concerns..."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors text-sm"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 shadow-md ${
              isSubmitting ? "opacity-90 cursor-not-allowed" : "hover:shadow-xl hover:-translate-y-0.5"
            }`}
            style={{ background: "linear-gradient(135deg, #8B0000 0%, #111111 100%)" }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Booking...
              </div>
            ) : (
              "Book Appointment"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
