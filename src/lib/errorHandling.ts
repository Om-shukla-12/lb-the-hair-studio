export type ErrorType = "deposit_required" | "network_error" | "slot_unavailable" | "unknown";

export interface CustomerFriendlyError {
  title: string;
  message: string;
  type: ErrorType;
  primaryAction?: {
    label: string;
    action: "contact" | "retry" | "select_another";
  };
  secondaryAction?: {
    label: string;
    action: "close" | "contact";
  };
}

export function getCustomerFriendlyError(error: any): CustomerFriendlyError {
  // Extract error code and detail if it exists in the standard API format
  let code = "";
  
  if (error?.response?.data?.code) {
    code = error.response.data.code;
  } else if (error?.code) {
    code = error.code;
  } else if (typeof error === 'string') {
    code = error;
  }

  // Network error check (fetch failed, timeout, etc.)
  if (error?.message === "Network Error" || error?.name === "TypeError" && error?.message?.includes("fetch")) {
    return {
      title: "Connection Problem",
      message: "We're having trouble connecting to our booking system.\n\nPlease check your internet connection and try again.",
      type: "network_error",
      primaryAction: { label: "Try Again", action: "retry" }
    };
  }

  // Map API Error Codes
  switch (code) {
    case "402_ERROR":
    case "DEPOSIT_REQUIRED":
      return {
        title: "Booking Deposit Required",
        message: "To secure this appointment, a booking deposit is required before confirmation.\n\nPlease contact LB The Hair Studio and our team will assist you with the payment process.\n\nWe look forward to welcoming you.",
        type: "deposit_required",
        primaryAction: { label: "Contact Salon", action: "contact" },
        secondaryAction: { label: "Close", action: "close" }
      };
      
    case "409_ERROR":
    case "SLOT_UNAVAILABLE":
    case "DOUBLE_BOOKING":
      return {
        title: "Appointment No Longer Available",
        message: "Unfortunately, this time slot has just been booked by another customer.\n\nPlease choose another available time.",
        type: "slot_unavailable",
        primaryAction: { label: "Select Another Time", action: "select_another" }
      };
      
    // Add other specific error mappings here as needed
  }

  // Default / Unknown error (Booking Failed)
  return {
    title: "Unable To Complete Booking",
    message: "We couldn't complete your booking at this moment.\n\nPlease try again or contact the salon for assistance.",
    type: "unknown",
    primaryAction: { label: "Try Again", action: "retry" },
    secondaryAction: { label: "Contact Salon", action: "contact" }
  };
}
