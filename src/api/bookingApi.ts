import { apiClient } from './axios';
import {
  CalendarAvailability,
  DaySlots,
  Service,
  Barber,
  BookingPayload,
  BulkBookingPayload,
} from '../types/booking';

export const getCalendarAvailability = async (
  startDate: string,
  endDate: string
): Promise<CalendarAvailability[]> => {
  const { data } = await apiClient.get<CalendarAvailability[]>(
    `/v1/public/booking/calendar-availability`,
    { params: { start_date: startDate, end_date: endDate } }
  );
  return data;
};

export const getSlots = async (date: string, employeeId?: string): Promise<DaySlots> => {
  const params: Record<string, string> = { date };
  if (employeeId) {
    params.employee_id = employeeId;
  }
  const { data } = await apiClient.get<DaySlots>(`/v1/public/booking/slots`, {
    params,
  });
  return data;
};

export const getServices = async (): Promise<Service[]> => {
  const { data } = await apiClient.get<Service[]>(`/v1/public/booking/services`);
  return data;
};

export const getBarbers = async (): Promise<Barber[]> => {
  const { data } = await apiClient.get<Barber[]>(`/v1/public/booking/staff`);
  return data;
};

export const getStaffAvailability = async (
  date: string,
  startTime: string,
  serviceIds: string
): Promise<Barber[]> => {
  const { data } = await apiClient.get<Barber[]>(`/v1/public/booking/staff-availability`, {
    params: { date, start_time: startTime, service_ids: serviceIds },
  });
  return data;
};

export const createBooking = async (payload: BookingPayload | BulkBookingPayload): Promise<any> => {
  if ('bookings' in payload) {
    const { data } = await apiClient.post(`/v1/public/booking/bookings/bulk`, payload);
    return data;
  } else {
    const { data } = await apiClient.post(`/v1/public/booking/bookings`, payload);
    return data;
  }
};
