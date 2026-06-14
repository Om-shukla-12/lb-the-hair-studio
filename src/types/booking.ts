export interface CalendarAvailability {
  date: string;
  available_slots: number;
  total_slots: number;
  status: 'closed' | 'plenty' | 'few';
}

export interface TimeSlot {
  time: string;
  available_count: number;
  total_count: number;
  is_past: boolean;
}

export interface DaySlots {
  morning: TimeSlot[];
  afternoon: TimeSlot[];
  evening: TimeSlot[];
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: string;
  currency: string;
  tag: string;
  color_code: string;
  gender: string;
  is_active: boolean;
  created_at: string;
  buffer_time_override: number | null;
  advance_notice_hours: number;
  max_advance_days: number;
  max_bookings_per_day: number | null;
}

export interface Barber {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  roles: string[];
  service_ids: string[];
  created_at: string;
  skill_tags: string[];
  experience_months: number;
  max_daily_hours: number | null;
  max_end_time: string | null;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingPayload {
  service_id: string;
  employee_id?: string | null;
  customer_name: string;
  customer_email: string | null;     // null is OK; empty string causes 422
  customer_phone: string;
  start_time: string;
  notes?: string | null;
}

export interface BulkBookingPayload {
  bookings: BookingPayload[];
}
