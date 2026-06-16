import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LB The Hair Studio | L'Oréal Partner Salon",
  description: "A Legacy of Luxury. LB The Hair Studio redefines the modern beauty experience as an exclusive L'Oréal Professionnel Partner Salon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${raleway.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-on-background selection:bg-[#D4AF37]/25 selection:text-[#FFF7EA]">
        <Script id="theme-script" strategy="beforeInteractive">
  {`
    try {
      var theme = localStorage.getItem('lb-theme') || 'dark';
      document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
    } catch (e) {
      document.documentElement.dataset.theme = 'dark';
    }
  `}
</Script>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
