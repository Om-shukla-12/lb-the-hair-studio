"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
      <header className="bg-surface/80 backdrop-blur-xl dark:bg-surface-container-lowest/80 top-0 sticky border-b border-white/10 dark:border-outline-variant/10 shadow-[0_20px_40px_rgba(87,0,0,0.05)] z-50 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop max-w-container-max mx-auto h-16 md:h-20">
          <Link
            className="flex items-center gap-3 group"
            href="/"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[34px] md:h-[45px] lg:h-[52px] w-[34px] md:w-[45px] lg:w-[52px] flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
            >
              <Image 
                src="/photos/download.png"
                alt="LB The Hair Studio Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col justify-center">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-[family-name:var(--font-cormorant)] text-[17px] md:text-2xl lg:text-3xl font-semibold text-[#111111] tracking-wide leading-tight italic"
              >
                LB The Hair Studio
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-[family-name:var(--font-raleway)] hidden sm:block text-[8px] md:text-[9px] tracking-[0.25em] text-[#5A5A5A] uppercase font-semibold"
              >
                L'Oréal Professionnel Partner
              </motion.span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8 items-center h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-[family-name:var(--font-raleway)] text-[11px] uppercase tracking-[0.15em] font-semibold h-full flex items-center transition-all duration-300 ${
                    isActive
                      ? "text-[#8B0000] border-b-2 border-[#8B0000] opacity-100"
                      : "text-gray-600 hover:text-[#8B0000] opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8B0000]/10 text-[#8B0000] hover:bg-[#8B0000] hover:text-white hover:scale-110 transition-all duration-300 shadow-sm"
              title="View on Google Maps"
            >
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </a>
            <a 
              href="https://wa.me/7878464710" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shadow-md"
              title="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            <Link href="/booking" className="btn-primary bg-[#8B0000] hover:bg-[#5C0000] text-white font-[family-name:var(--font-raleway)] font-semibold text-[10px] uppercase px-8 py-3 rounded-full transition-all duration-300 tracking-[0.2em] shadow-[0_10px_30px_rgba(139,0,0,0.2)]">
              Book Now
            </Link>
          </div>

          {/* Mobile: compact book + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/booking"
              className="bg-[#8B0000] text-white font-[family-name:var(--font-raleway)] text-[9px] uppercase tracking-[0.15em] font-bold px-3.5 py-1.5 rounded-full"
            >
              Book
            </Link>
            <button
              className="text-[#8B0000] p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-2xl ${
                      isActive ? "text-[#8B0000]" : "text-[#111111]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="flex flex-col gap-4 mt-4 w-full max-w-xs">
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#8B0000] text-white text-center font-bold text-sm uppercase px-8 py-4 rounded-full w-full"
                >
                  Book Now
                </Link>
                <a
                  href="https://wa.me/7878464710" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white flex items-center justify-center gap-2 font-bold text-sm uppercase px-8 py-4 rounded-full w-full"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center gap-2 font-bold text-sm uppercase px-8 py-4 rounded-full w-full hover:bg-[#8B0000] hover:text-white transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                  Find on Maps
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
