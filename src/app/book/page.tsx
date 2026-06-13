import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Book Appointment | LB The Hair Studio",
};

export default function Book() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop bg-surface min-h-screen">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase mb-4 block">Reservations</span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">Book Your Experience</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Reserve your time for an unparalleled luxury hair service. Please complete the form below to secure your appointment.
          </p>
        </div>
        
        <BookingWizard />
      </main>
      <Footer />
    </>
  );
}
