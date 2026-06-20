"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface GalleryItem { id: string; type: "image" | "video"; src: string; title: string; }

const galleryItems: GalleryItem[] = [
  { id: "1", type: "image", src: "/photos/unnamed2.png", title: "Sleek Couture Waves" },
  { id: "2", type: "image", src: "/photos/unnamed3.png", title: "Radiant Golden Balayage" },
  { id: "3", type: "image", src: "/photos/unnamed.png", title: "Lived-In Caramel Highlights" },
  { id: "4", type: "video", src: "/photos/videoplayback.mp4", title: "Transformation in Motion" },
  { id: "6", type: "image", src: "/photos/unnamed.png", title: "Volume & Texture" },
  { id: "7", type: "image", src: "/photos/unnamed2.png", title: "Silky Smooth Finish" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;
  const goNext = useCallback(() => setSelectedIndex((p) => (p === null ? null : (p + 1) % galleryItems.length)), []);
  const goPrev = useCallback(() => setSelectedIndex((p) => (p === null ? null : (p - 1 + galleryItems.length) % galleryItems.length)), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") goNext(); else if (e.key === "ArrowLeft") goPrev(); else if (e.key === "Escape") close(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selectedIndex, goNext, goPrev, close]);

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      <TopNavBar />
      <main className="flex-grow">
        <PageHeader eyebrow="The Portfolio" title="Masterpieces in Motion" subtitle="Signature transformations, meticulous coloring, and editorial styling." />
        <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
          <div className="columns-2 gap-3 space-y-3 md:columns-3 md:gap-4 md:space-y-4 lg:columns-4">
            {galleryItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={() => setSelectedIndex(index)}
                className="group relative cursor-pointer overflow-hidden break-inside-avoid" style={{ border: "1px solid rgba(176,135,90,0.3)", borderRadius: "8px" }}>
                {item.type === "video" ? <VideoPreview src={item.src} /> : <img src={item.src} alt={item.title} className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}>
                  <span className="font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.10em]" style={{ color: "rgba(255,255,255,0.9)" }}>{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(33,26,24,0.95)", backdropFilter: "blur(8px)" }}>
            <button onClick={close} className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-80" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }} aria-label="Close"><X className="h-5 w-5" /></button>
            <div className="absolute left-1/2 top-5 -translate-x-1/2 select-none font-[family-name:var(--font-raleway)] text-[11px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedIndex + 1} / {galleryItems.length}</div>
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 md:left-5" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }} aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 md:right-5" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }} aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
            <AnimatePresence mode="wait">
              <motion.div key={selectedItem.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className="flex h-full w-full items-center justify-center px-14 py-14 md:px-20">
                {selectedItem.type === "video" ? <video src={selectedItem.src} controls autoPlay className="max-h-[85vh] max-w-full rounded-xl" /> : <img src={selectedItem.src} alt={selectedItem.title} className="max-h-[85vh] max-w-full rounded-xl object-contain" />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoPreview({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(false);
  return (
    <div onMouseEnter={async () => { setP(true); try { await ref.current?.play(); } catch {} }} onMouseLeave={() => { setP(false); if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }} className="relative">
      <video ref={ref} src={src} muted loop playsInline className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {!p && (
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.15)" }}>
          <Play className="h-3.5 w-3.5 text-white" fill="white" />
        </div>
      )}
    </div>
  );
}
