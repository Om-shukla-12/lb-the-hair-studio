"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";

const socialLinks = [
  { href: "https://www.instagram.com/lbthehairstudio/", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/lbthehairstudio", label: "Facebook", icon: FacebookIcon },
  { href: "https://wa.me/7878464710", label: "WhatsApp", icon: WhatsAppIcon },
  { href: "https://maps.app.goo.gl/WPvPqqJLptTuARLZ8", label: "Maps", icon: MapPin },
];

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ background: "var(--cream-3)", color: "var(--ink)" }}>
      <div className="hairline-gold" />

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="group flex flex-col items-center">
            <div className="relative mb-3 h-14 w-14 transition-transform duration-300 group-hover:scale-105">
              <Image src="/photos/download.png" alt="LB The Hair Studio" fill className="object-contain" />
            </div>
            <span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold" style={{ color: "var(--ink)" }}>
              LB The Hair Studio
            </span>
          </Link>

          {/* Hours & Contact */}
          <div className="mt-5 flex items-center gap-5 text-center">
            <div>
              <div className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--m-gold-deep)" }}>
                Hours
              </div>
              <div className="mt-1 text-[13px] font-light" style={{ color: "var(--ink-muted)" }}>
                Mon – Sun: 10:00 AM – 11:30 PM<br />
                (Closed on Tuesdays)
              </div>
            </div>
            <div className="h-8 w-px" style={{ background: "var(--hairline-cream)" }} />
            <div>
              <div className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--m-gold-deep)" }}>
                Call
              </div>
              <a href="tel:+917878464710" className="mt-1 flex items-center gap-1.5 text-[13px] font-light transition-colors hover:underline" style={{ color: "var(--ink-muted)" }}>
                <Phone className="h-3 w-3" />
                +91 78784 64710
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(176,135,90,0.4)", color: "var(--m-gold-deep)", background: "var(--cream-soft)" }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="hairline-gold mb-6" />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { name: "Services", href: "/services" },
            { name: "Gallery", href: "/gallery" },
            { name: "About", href: "/about" },
            { name: "Reviews", href: "/reviews" },
            { name: "Book", href: "/booking" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ color: "var(--ink-muted)" }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="px-5 py-4 text-center font-[family-name:var(--font-raleway)] text-[11px] uppercase tracking-[0.10em]"
        style={{ borderTop: "1px solid rgba(176,135,90,0.18)", color: "var(--ink-subtle)" }}
      >
        © {new Date().getFullYear()} LB The Hair Studio. All Rights Reserved.
      </div>
    </footer>
  );
}
