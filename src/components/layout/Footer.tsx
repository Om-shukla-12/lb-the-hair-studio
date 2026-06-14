"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white w-full border-t border-white/5 mt-auto">
      {/* L'Oréal Partnership Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 flex items-center justify-center gap-3 md:gap-8 flex-wrap">
          <span className="font-[family-name:var(--font-raleway)] text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-bold">Official Partner</span>
          <div className="w-px h-4 bg-white/20"></div>
          <span className="text-white/60 text-[11px] md:text-sm">L'Oréal Professionnel</span>
          <div className="w-px h-4 bg-white/20 hidden md:block"></div>
          <span className="text-white/60 text-[11px] md:text-sm hidden md:inline">Premium Products &amp; Techniques</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-8 py-10 md:py-16 max-w-7xl mx-auto">
        
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-2">
          {/* Logo + Brand Name — mirrors the navbar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-[50px] w-[50px] flex-shrink-0">
              <Image 
                src="/photos/download.png" 
                alt="LB The Hair Studio Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-white tracking-wide leading-tight italic">
                LB The Hair Studio
              </span>
              <span className="font-[family-name:var(--font-raleway)] text-[8px] tracking-[0.25em] text-white/50 uppercase font-semibold mt-0.5">
                L'Oréal Professionnel Partner
              </span>
            </div>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-white/60 max-w-sm mb-4 text-sm font-light leading-relaxed">
            Elevating the art of hair through bespoke luxury and editorial precision. An exclusive L'Oréal Professionnel Partner Salon.
          </p>
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span className="font-[family-name:var(--font-raleway)] text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold">L'Oréal Partner Salon</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <a href="https://www.instagram.com/lbthehairstudio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#8B0000] hover:scale-110 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.facebook.com/lbthehairstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#8B0000] hover:scale-110 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>

          <p className="font-[family-name:var(--font-raleway)] text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} LB The Hair Studio. All rights reserved.
          </p>
        </div>

        {/* Studio Links */}
        <div className="col-span-1">
          <h4 className="font-[family-name:var(--font-raleway)] text-[9px] md:text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] mb-4 md:mb-6 font-bold">Studio</h4>
          <ul className="space-y-3 md:space-y-4">
            <li>
              <Link href="/about" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                Services
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/booking" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                Book Appointment
              </Link>
            </li>
            <li>
              <a 
                href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm"
              >
                Find Us on Maps
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="col-span-1">
          <h4 className="font-[family-name:var(--font-raleway)] text-[9px] md:text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] mb-4 md:mb-6 font-bold">Legal</h4>
          <ul className="space-y-3 md:space-y-4">
            <li>
              <Link href="/privacy" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="font-[family-name:var(--font-raleway)] text-white/70 hover:text-white transition-colors inline-block text-xs md:text-sm">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
