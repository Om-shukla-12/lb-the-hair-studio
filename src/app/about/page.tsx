"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import MissionStatement from "@/components/sections/MissionStatement";
import StylistGrid from "@/components/sections/StylistGrid";

export default function About() {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow" style={{ background: "var(--cream)", color: "var(--ink)" }}>
        <PageHeader
          eyebrow="Our Story"
          title="A Legacy of Luxury."
          subtitle="Founded on the principles of high-fashion artistry and uncompromising quality, LB The Hair Studio redefines the modern beauty experience as an exclusive L'Oréal Professionnel partner."
        />
        <MissionStatement />
        <StylistGrid />
      </main>
      <Footer />
    </>
  );
}
