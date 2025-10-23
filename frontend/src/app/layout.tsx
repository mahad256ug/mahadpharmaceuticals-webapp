import type { Metadata } from "next";
import { StoreProvider } from "@/store/context";
import { Geist_Mono, Inter } from "next/font/google";
import { QueryProviders } from "@/store/QueryContext";

import "./globals.css";

import { Suspense } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const interSan = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahadpharmaceuticals.com"),
  title: {
    default:
      "Mahad Pharmaceuticals | Women’s Health, Family Planning & Online Pharmacy UAE",
    template: "%s | Mahad Pharmaceuticals",
  },
  description:
    "Mahad Pharmaceuticals is a trusted online pharmacy in the UAE offering women’s health and family planning drugs, contraceptives, and secure online consultations. Enjoy fast delivery and cash on delivery across the UAE.",
  keywords:
    "online pharmacy UAE, women's health, family planning, contraceptives, reproductive care, health drugs, online consultation, cash on delivery pharmacy, Mahad Pharmaceuticals mahad's pharmacy, STD, sexual transmitted diseases",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title:
      "Mahad Pharmaceuticals | Trusted Online Pharmacy for Women’s Health & Family Planning",
    description:
      "Order women’s health and family planning drugs online from Mahad Pharmaceuticals. Licensed pharmacy offering fast delivery and cash on delivery across the UAE.",
    url: "https://mahadpharmaceuticals.com",
    siteName: "Mahad Pharmaceuticals",
    images: [
      {
        url: "/logo-og.png",
        width: 1200,
        height: 630,
        alt: "Mahad Pharmaceuticals",
      },
    ],
    locale: "en_AE", // UAE locale
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mahad Pharmaceuticals | Women’s Health & Family Planning Online in UAE",
    description:
      "Shop online for women’s health, family planning, and contraceptive drugs with Mahad Pharmaceuticals. Fast delivery & cash on delivery available in the UAE.",
    images: ["https://mahadpharmaceuticals.com/logo-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSan.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <QueryProviders>
            <StoreProvider>
              <Navbar />
              {children}
              <Footer />
            </StoreProvider>
          </QueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
