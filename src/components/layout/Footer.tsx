"use client";

import Image from "next/image";
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
      {/* L'Oreal banner */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-4 text-center md:px-8">
          <span
            className="font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            Official Partner
          </span>
          <span className="h-4 w-px" style={{ background: "var(--border)" }} />
          <span className="text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>
            L&apos;Oreal Professionnel
          </span>
          <span className="hidden h-4 w-px md:block" style={{ background: "var(--border)" }} />
          <span className="hidden text-xs md:inline" style={{ color: "var(--text-muted)" }}>
            Premium products and precise technique
          </span>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4 md:px-8 md:py-12">
        {/* Brand */}
        <div className="col-span-2">
          <Link href="/" className="mb-5 flex items-center gap-3">
            <div
              className="w-80 h-24 md:w-96 md:h-28 bg-[var(--primary)]"
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
            <div className="flex flex-col justify-center">
              <span
                className="font-[family-name:var(--font-raleway)] text-[8px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--accent-text)" }}
              >
                L&apos;Oreal Professionnel Partner
              </span>
            </div>
          </Link>

          <p className="max-w-sm text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A premium salon experience for bespoke haircuts, luxury color, editorial styling, and polished finishing.
          </p>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-2">
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
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-200"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: color,
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Studio links */}
        <div>
          <h4
            className="mb-4 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            Studio
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
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
            className="mb-4 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent-text)" }}
          >
            Legal
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
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
        className="px-4 py-4 text-center font-[family-name:var(--font-raleway)] text-[10px] uppercase tracking-[0.16em]"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-subtle)" }}
      >
        Copyright {new Date().getFullYear()} LB The Hair Studio. All rights reserved.
      </div>
    </footer>
  );
}
