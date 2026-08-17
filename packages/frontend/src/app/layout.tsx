import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import VFVSealBackground from '@/components/VFVSealBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ÒMEGA - Survival Universe on BASE",
  description: "A lore-driven survival universe built on BASE. Built in AI Studios. Owned by players. Ordained by ABBA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080B12] text-[#F5F1E8]">
        <Providers>
          <VFVSealBackground opacity={0.06}>
            <div className="flex-1 flex flex-col relative z-10">
              {children}
            </div>
          </VFVSealBackground>
        </Providers>
      </body>
    </html>
  );
}
