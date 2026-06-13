"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-gray max-w-none text-[#5A5A5A] leading-relaxed space-y-6"
          >
            <p className="text-sm text-[#888] mb-8">Last updated: June 2025</p>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">1. Information We Collect</h2>
              <p>
                When you book an appointment or contact us, we collect personal information such as your name, phone number, email address, and any notes related to your appointment. This information is used solely to manage your bookings and communicate with you about your appointments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Confirm and manage your salon appointments</li>
                <li>Send appointment reminders and follow-ups via WhatsApp or email</li>
                <li>Improve our services and customer experience</li>
                <li>Respond to your inquiries</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">3. Data Security</h2>
              <p>
                We take the security of your personal data seriously. Your information is stored securely and is never sold, rented, or shared with third parties for marketing purposes. Only authorized staff have access to your booking data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">4. Cookies</h2>
              <p>
                Our website may use cookies to improve your browsing experience. These are small files stored on your device that help us understand how you use our site. You can disable cookies in your browser settings at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">5. Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us via WhatsApp or email.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#111111] font-semibold">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{" "}
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
