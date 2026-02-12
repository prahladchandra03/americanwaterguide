// src/app/layout.js
import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google"; // Roboto Slab survival niche ke liye best hai
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Joseph's Well Review: The Air Fountain System (2025 Survival Guide)",
  description: "Does Joseph's Well really work? Discover how this DIY Air Fountain system generates 50 gallons of water daily. Perfect for off-grid survival in USA.",
  keywords: ["Joseph's Well system", "Air Fountain system", "DIY water generator", "survival water solution", "off-grid water", "drought preparation USA"],
  openGraph: {
    title: "Joseph's Well: Infinite Water Source Secret?",
    description: "Don't rely on the grid. Create your own water source from thin air.",
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoSlab.variable} antialiased bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}