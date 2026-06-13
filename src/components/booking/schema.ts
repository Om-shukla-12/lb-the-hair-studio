import * as z from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().min(1, { message: "Please select a service." }),
  stylistId: z.string().min(1, { message: "Please select a stylist." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
