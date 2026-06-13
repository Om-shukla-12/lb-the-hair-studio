"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: "styling" | "color" | "studio" | "transformation";
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    type: "image",
    src: "/photos/unnamed2.png",
    title: "Sleek Couture Waves",
    category: "styling",
  },
  {
    id: "2",
    type: "image",
    src: "/photos/unnamed3.png",
    title: "Radiant Golden Balayage",
    category: "color",
  },
  {
    id: "3",
    type: "image",
    src: "/photos/unnamed.png",
    title: "Lived-In Caramel Highlights",
    category: "color",
  },
  {
    id: "4",
    type: "video",
    src: "/photos/videoplayback.mp4",
    title: "Transformation in Motion",
    category: "transformation",
  },
  {
    id: "5",
    type: "image",
    src: "/photos/download.png",
    title: "Precision Styling Details",
    category: "styling",
  },
  {
    id: "6",
    type: "image",
    src: "/photos/unnamed.png",
    title: "Volume & Texture",
    category: "styling",
  },
  {
    id: "7",
    type: "image",
    src: "/photos/unnamed2.png",
    title: "Silky Smooth Finish",
    category: "styling",
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryItems.length
    );
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev, closeLightbox]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
      <TopNavBar />

      <main className="flex-grow pt-32 pb-16">
        {/* Header Section */}
        <section className="text-center px-4 md:px-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs text-[#D4AF37] uppercase tracking-[0.2em] mb-4 block font-bold"
            >
              The Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#8B0000] mb-6 font-bold tracking-tight"
            >
              Masterpieces in Motion
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Step into a visual journey showcasing our signature transformations,
              meticulous coloring, and custom-tailored editorial hair styles.
            </motion.p>
          </div>
        </section>

        {/* Masonry Gallery Grid */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {galleryItems.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative overflow-hidden rounded-xl bg-white cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 break-inside-avoid"
              >
                <div className="relative w-full overflow-hidden">
                  {item.type === "video" ? (
                    <VideoPreview src={item.src} />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle hover dim only — no text */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedItem && selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 text-white hover:text-[#D4AF37] transition-colors z-50 flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              {/* Counter */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase z-50 select-none">
                {selectedIndex + 1} / {galleryItems.length}
              </div>

              {/* Prev button */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined text-3xl">chevron_left</span>
              </button>

              {/* Next button */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined text-3xl">chevron_right</span>
              </button>

              {/* Media — animated on change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center w-full h-full px-16 md:px-24 py-14"
                >
                  {selectedItem.type === "video" ? (
                    <video
                      src={selectedItem.src}
                      controls
                      autoPlay
                      className="max-w-full max-h-[85vh] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.6)]"
                    />
                  ) : (
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.6)]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// Video preview card — hover to play, no text
function VideoPreview({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try { await videoRef.current.play(); } catch {}
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {!isPlaying && (
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full flex items-center justify-center border border-white/20">
          <span className="material-symbols-outlined text-sm">play_arrow</span>
        </div>
      )}
    </div>
  );
}
