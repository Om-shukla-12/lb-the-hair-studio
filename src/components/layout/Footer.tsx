"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white w-full border-t border-white/5 mt-auto">
      {/* L'Oréal Partnership Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold">Official Partner</span>
          <div className="w-px h-6 bg-white/20 hidden md:block"></div>
          <span className="text-white/60 text-sm">L'Oréal Professionnel</span>
          <div className="w-px h-6 bg-white/20 hidden md:block"></div>
          <span className="text-white/60 text-sm">Premium Products & Techniques</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 md:px-8 py-16 max-w-7xl mx-auto">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <div className="relative h-[50px] w-[160px] mb-6">
            <Image 
              src="/photos/download.png" 
              alt="LB The Hair Studio" 
              fill 
              className="object-contain object-left brightness-0 invert"
            />
          </div>
          <p className="text-white/60 max-w-sm mb-4 text-sm font-light leading-relaxed">
            Elevating the art of hair through bespoke luxury and editorial precision. An exclusive L'Oréal Professionnel Partner Salon.
          </p>
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold">L'Oréal Partner Salon</span>
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

          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} LB The Hair Studio. All rights reserved.
          </p>
        </div>

        {/* Studio Links */}
        <div className="col-span-1 mt-4 md:mt-0">
          <h4 className="text-xs text-[#D4AF37] uppercase tracking-widest mb-6 font-bold">Studio</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                Services
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/booking" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                Book Appointment
              </Link>
            </li>
            <li>
              <a 
                href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm"
              >
                Find Us on Maps
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="col-span-1 mt-4 md:mt-0">
          <h4 className="text-xs text-[#D4AF37] uppercase tracking-widest mb-6 font-bold">Legal</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block text-sm">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
