import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCalendarAvailability,
  getSlots,
  getServices,
  getBarbers,
  createBooking,
} from '../api/bookingApi';
import { BookingPayload, BulkBookingPayload } from '../types/booking';

export const useCalendarAvailability = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['calendarAvailability', startDate, endDate],
    queryFn: () => getCalendarAvailability(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export const useSlots = (date: string) => {
  return useQuery({
    queryKey: ['slots', date],
    queryFn: () => getSlots(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 2,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};

export const useBarbers = () => {
  return useQuery({
    queryKey: ['barbers'],
    queryFn: getBarbers,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (payload: BookingPayload | BulkBookingPayload) => createBooking(payload),
  });
};
