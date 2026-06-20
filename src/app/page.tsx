"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CTAButtons from "@/components/sections/CTAButtons";
import StatsSection from "@/components/sections/StatsSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LorealPartnership from "@/components/sections/LorealPartnership";
import GalleryTeaser from "@/components/sections/GalleryTeaser";
import ReviewsWidget from "@/components/sections/ReviewsWidget";
import VisitUs from "@/components/sections/VisitUs";
import MobileBookBar from "@/components/ui/MobileBookBar";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow">
        <HeroSection />
        <CTAButtons />
        <StatsSection />
        <ServiceCards />
        <LorealPartnership />
        <GalleryTeaser />
        <ReviewsWidget />
        <VisitUs />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
