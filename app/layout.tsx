// src/app/layout.js
import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google"; // Roboto Slab survival niche ke liye best hai
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Water Independence & Quantum Finance | Exclusive Offers 2026",
  description: "Secure your future with Joseph's Well DIY water system (50 gal/day) and the Quantum Computing & New Financial System video course. Limited time offers.",
  keywords: ["Joseph's Well system", "Air Fountain system", "DIY water generator", "quantum computing course", "quantum finance", "survival water", "off-grid water", "drought preparation"],
  openGraph: {
    title: "Water Independence & Quantum Finance — Secure Your Future",
    description: "From generating water out of thin air to mastering quantum computing & the new financial system. Arm yourself with the tools that define tomorrow.",
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