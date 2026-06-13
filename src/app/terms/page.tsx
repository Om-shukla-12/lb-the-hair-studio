"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-6 block font-bold"
          >
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#111111] mb-8 font-bold leading-tight"
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-gray max-w-none text-[#5A5A5A] leading-relaxed space-y-6"
          >
            <p className="text-sm text-[#888] mb-8">Last updated: June 2025</p>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing and using our website or booking our services, you agree to these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">2. Appointments & Booking</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Appointments must be booked in advance via our website or WhatsApp.</li>
                <li>Please arrive on time. Late arrivals may result in a shortened service or rescheduling.</li>
                <li>We reserve the right to cancel or reschedule appointments with reasonable notice.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">3. Cancellation Policy</h2>
              <p>
                We kindly request that cancellations be made at least 24 hours in advance. Repeated no-shows may result in a requirement to pre-pay for future bookings. We understand emergencies happen and will always try to accommodate where possible.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">4. Pricing & Payments</h2>
              <p>
                All prices are as displayed on our Services page and are subject to change without prior notice. Payment is due upon completion of services. We accept cash and digital payment methods.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">5. Service Results</h2>
              <p>
                While we strive to achieve the best results, hair outcomes may vary depending on individual hair condition, prior chemical treatments, and other factors. Our stylists will advise you on realistic expectations during your consultation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">6. Limitation of Liability</h2>
              <p>
                LB The Hair Studio is not liable for any allergic reactions or sensitivities to products used during services. Please inform your stylist of any known allergies prior to your appointment. A patch test can be arranged upon request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">7. Contact</h2>
              <p>
                For any questions regarding these terms, please reach us at:{" "}
                <a href="https://wa.me/7878464710" className="text-[#8B0000] hover:underline font-medium">
                  WhatsApp: +91 78784 64710
                </a>
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
