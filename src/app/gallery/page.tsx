"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Script from "next/script";

export default function Gallery() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      <TopNavBar />
      <main className="flex-grow">
        <PageHeader eyebrow="The Portfolio" title="Masterpieces in Motion" subtitle="Signature transformations, meticulous coloring, and editorial styling." />
        <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14 min-h-[500px]">
          <div className="elfsight-app-73a4e356-5e02-4757-bf5f-ec474a82ffbe" data-elfsight-app-lazy></div>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
