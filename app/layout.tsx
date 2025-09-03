import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omrah - AI-Powered Umrah Planning",
  description: "Find your perfect Umrah trip in one sentence. AI-powered itinerary planning for the spiritual journey of a lifetime.",
  keywords: "Umrah, pilgrimage, AI, travel planning, Makkah, Madinah, Islamic travel",
  openGraph: {
    title: "Omrah - AI-Powered Umrah Planning",
    description: "Find your perfect Umrah trip in one sentence. AI-powered itinerary planning for the spiritual journey of a lifetime.",
    type: "website",
    url: "https://omrah.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omrah - AI-Powered Umrah Planning",
    description: "Find your perfect Umrah trip in one sentence. AI-powered itinerary planning for the spiritual journey of a lifetime.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
