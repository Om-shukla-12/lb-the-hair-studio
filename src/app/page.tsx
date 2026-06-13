import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServiceCards from "@/components/sections/ServiceCards";
import LorealPartnership from "@/components/sections/LorealPartnership";
import GalleryTeaser from "@/components/sections/GalleryTeaser";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow">
        <HeroSection />
        <ServiceCards />
        <LorealPartnership />
        <GalleryTeaser />
      </main>
      <Footer />
    </>
  );
}
