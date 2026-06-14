export function addMinutesToTime(time: string, minutes: number): string {
  if (!time) return time;
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

export function formatTime12Hour(time24: string): string {
  if (!time24) return '';
  const [hoursStr, minsStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minsStr} ${ampm}`;
}

export interface TimelineService {
  serviceId: string;
  serviceName: string;
  duration: number;
  startTime: string;
  endTime: string;
  formattedStartTime: string;
  formattedEndTime: string;
}

export function calculateServiceTimeline(
  services: { id: string; name: string; duration_minutes?: number }[],
  appointmentStartTime: string
): TimelineService[] {
  if (!appointmentStartTime || !services || services.length === 0) return [];

  let currentTime = appointmentStartTime;
  return services.map((service) => {
    const duration = service.duration_minutes ?? 60;
    const startTime = currentTime;
    const endTime = addMinutesToTime(currentTime, duration);
    
    const timelineItem: TimelineService = {
      serviceId: service.id,
      serviceName: service.name,
      duration,
      startTime,
      endTime,
      formattedStartTime: formatTime12Hour(startTime),
      formattedEndTime: formatTime12Hour(endTime),
    };

    currentTime = endTime;
    return timelineItem;
  });
}
