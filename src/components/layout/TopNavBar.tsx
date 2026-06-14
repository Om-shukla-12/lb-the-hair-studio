"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, Moon, Sun, X } from "lucide-react";
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("lb-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("lb-theme", nextTheme);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const isDark = theme === "dark";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between rounded-xl border px-3 shadow-lg backdrop-blur-2xl md:h-16 md:px-5"
          style={{
            background: isDark ? "rgba(15,15,16,0.85)" : "rgba(255,255,255,0.92)",
            borderColor: isDark ? "rgba(212,175,55,0.15)" : "rgba(17,17,17,0.10)",
            boxShadow: isDark ? "0 16px 45px rgba(0,0,0,0.34)" : "0 8px 28px rgba(17,17,17,0.10)",
          }}
        >
          <Link className="group flex min-w-0 items-center gap-2.5" href="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0 pointer-events-none transition-transform duration-300 group-hover:scale-105"
            >
              <div
                className="w-72 h-20 md:w-96 md:h-24 bg-[var(--primary)]"
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
            </motion.div>
            {/* <div className="min-w-0 flex flex-col justify-center">
              <span className="hidden truncate font-[family-name:var(--font-raleway)] text-[8px] font-bold uppercase tracking-[0.22em] sm:block"
                style={{ color: "var(--accent-text)" }}>
                L&apos;Oreal Professionnel Partner
              </span>
            </div> */}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-3 py-2 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(139,0,0,0.14)" : "transparent",
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    boxShadow: isActive && isDark ? "inset 0 0 0 1px rgba(212,175,55,0.18)" : undefined,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text)";
                      (e.currentTarget as HTMLElement).style.background = "var(--border-soft)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-300"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {mounted ? <ThemeIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--accent-text)", background: "var(--surface)" }}
              aria-label="View location on Google Maps"
            >
              <MapPin className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/7878464710"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "#25D366", background: "var(--surface)" }}
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <Link
              href="/booking"
              className="btn-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-raleway)] text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              Book Now
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--text)", background: "var(--surface)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {mounted ? <ThemeIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href="/booking"
              className="btn-primary rounded-md px-3 py-2 font-[family-name:var(--font-raleway)] text-[9px] font-bold uppercase tracking-[0.14em]"
            >
              Book
            </Link>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)", background: "var(--surface)" }}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed left-0 right-0 bottom-0 z-40 px-5 pt-8 pb-8 backdrop-blur-2xl md:hidden"
            style={{
              top: "72px",
              background: isDark ? "rgba(15,15,16,0.97)" : "rgba(249,247,243,0.98)",
            }}
          >
            <nav className="mx-auto flex max-w-sm flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl border px-4 py-3.5 font-[family-name:var(--font-cormorant)] text-2xl transition-colors"
                    style={{
                      border: "1px solid var(--border)",
                      background: isActive ? "rgba(139,0,0,0.12)" : "var(--surface)",
                      color: isActive ? "var(--primary)" : "var(--text-muted)",
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/7878464710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors"
                  style={{ border: "1px solid var(--border)", color: "#25D366", background: "var(--surface)" }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="https://maps.app.goo.gl/WPvPqqJLptTuARLZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors"
                  style={{ border: "1px solid var(--border)", color: "var(--accent-text)", background: "var(--surface)" }}
                >
                  <MapPin className="h-4 w-4" />
                  Maps
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
