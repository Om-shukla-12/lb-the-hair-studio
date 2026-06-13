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

export const getSlots = async (date: string): Promise<DaySlots> => {
  const { data } = await apiClient.get<DaySlots>(`/v1/public/booking/slots`, {
    params: { date },
  });
  return data;
};

export const getServices = async (): Promise<Service[]> => {
  const { data } = await apiClient.get<Service[]>(`/v1/public/booking/services`);
  return data;
};

export const getBarbers = async (): Promise<Barber[]> => {
  const { data } = await apiClient.get<Barber[]>(`/v1/public/booking/barbers`);
  return data;
};

export const createBooking = async (payload: BookingPayload | BulkBookingPayload): Promise<any> => {
  if ('bookings' in payload) {
    const { data } = await apiClient.post(`/v1/public/booking/bookings/bulk`, payload.bookings);
    return data;
  } else {
    const { data } = await apiClient.post(`/v1/public/booking/bookings`, payload);
    return data;
  }
};
