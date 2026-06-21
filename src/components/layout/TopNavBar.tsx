"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
];

export default function TopNavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div
          className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between rounded-lg border px-3 backdrop-blur-2xl md:h-16 md:px-5"
          style={{ background: "rgba(251,247,239,0.86)", borderColor: "rgba(176,135,90,0.28)" }}
        >
          {/* Logo crest + wordmark */}
          <Link className="group flex min-w-0 flex-1 items-center gap-2" href="/">
            <div className="relative h-9 w-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 md:h-10 md:w-10">
              <Image src="/photos/download.png" alt="LB The Hair Studio" fill className="object-contain" />
            </div>
            <div className="min-w-0 flex-col justify-center leading-tight">
              <span
                className="block truncate font-[family-name:var(--font-cormorant)] text-base font-semibold tracking-wide sm:text-lg md:text-xl"
                style={{ color: "var(--ink)" }}
              >
                LB The Hair Studio
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-3 py-2 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300"
                  style={{ color: isActive ? "var(--m-gold-deep)" : "var(--ink-muted)" }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--ink-muted)";
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(176,135,90,0.4)", color: "var(--m-gold-deep)", background: "var(--cream-soft)" }}
              aria-label="View location on Google Maps"
            >
              <MapPin className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/7878464710"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(176,135,90,0.4)", color: "#25D366", background: "var(--cream-soft)" }}
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <Link
              href="/booking"
              className="foil-bg rounded-md px-5 py-2.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.14em]"
            >
              Book Now
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md transition-colors"
              style={{ border: "1px solid rgba(176,135,90,0.4)", color: "var(--ink-muted)", background: "var(--cream-soft)" }}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen light mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl md:hidden"
            style={{ background: "rgba(246,240,230,0.98)" }}
          >
            <div className="flex h-full flex-col justify-center px-8 pt-20">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-2 py-4 font-[family-name:var(--font-cormorant)] text-3xl transition-colors duration-200"
                        style={{ color: isActive ? "var(--m-gold-deep)" : "var(--ink)" }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hairline-gold my-6"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="grid grid-cols-2 gap-3"
              >
                <a
                  href="https://wa.me/7878464710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-sm py-3.5 text-sm font-semibold"
                  style={{ border: "1px solid rgba(176,135,90,0.4)", color: "#25D366", background: "var(--cream-soft)" }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-sm py-3.5 text-sm font-semibold"
                  style={{ border: "1px solid rgba(176,135,90,0.4)", color: "var(--m-gold-deep)", background: "var(--cream-soft)" }}
                >
                  <MapPin className="h-4 w-4" />
                  Maps
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="mt-auto pb-10 text-center"
              >
                <span
                  className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "var(--m-gold)" }}
                >
                  L&apos;Oréal Professionnel Partner Salon
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
