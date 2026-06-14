"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}
    >
      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4 md:px-8 md:py-8">

        {/* Brand */}
        <div className="col-span-2">
          {/* Logo */}
          <Link href="/" className="mb-1 inline-block">
            <div
              className="w-80 h-20 md:w-96 md:h-24 bg-[var(--primary)]"
              style={{
                WebkitMaskImage: "url(/photos/lbthelogo.png)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskImage: "url(/photos/lbthelogo.png)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "left center",
              }}
              aria-label="LB The Hair Studio logo"
            />
          </Link>

          {/* L'Oreal partner line — sits just below the logo */}
          <p
            className="mb-3 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            L&apos;Oreal Professionnel Official Partner
          </p>

          <p className="max-w-xs text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Premium salon for bespoke haircuts, luxury color, editorial styling &amp; polished finishing.
          </p>

          {/* Social icons */}
          <div className="mt-4 flex items-center gap-2">
            {[
              { href: "https://www.instagram.com/lbthehairstudio/", label: "Instagram", icon: InstagramIcon, color: "#E1306C" },
              { href: "https://www.facebook.com/lbthehairstudio", label: "Facebook", icon: FacebookIcon, color: "#1877F2" },
              { href: "https://wa.me/7878464710", label: "WhatsApp", icon: WhatsAppIcon, color: "#25D366" },
              { href: "https://maps.app.goo.gl/WPvPqqJLptTuARLZ8", label: "Maps", icon: MapPin, color: "var(--accent-text)" },
            ].map(({ href, label, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: color,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Studio links */}
        <div>
          <h4
            className="mb-3 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            Studio
          </h4>
          <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
            {["Book Appointment:/booking"].map((item) => {
              const [name, href] = item.split(":");
              return (
                <li key={name}>
                  <Link href={href} className="transition-colors hover:opacity-80" style={{ color: "inherit" }}>
                    {name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:opacity-80"
                style={{ color: "inherit" }}
              >
                Find Us on Maps
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4
            className="mb-3 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            Legal
          </h4>
          <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <li>
              <Link href="/privacy" className="transition-colors hover:opacity-80" style={{ color: "inherit" }}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:opacity-80" style={{ color: "inherit" }}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-4 py-3 text-center font-[family-name:var(--font-raleway)] text-[9px] uppercase tracking-[0.14em]"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-subtle)" }}
      >
        Copyright {new Date().getFullYear()} LB The Hair Studio. All rights reserved.
      </div>
    </footer>
  );
}
