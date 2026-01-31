import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YieldCopilot | Real-time DeFi Yield Tracker",
  description:
    "Track, compare, and optimize your stablecoin yields across Aave protocol with real-time data and AI-powered insights.",
  keywords: [
    "DeFi",
    "Yield",
    "Aave",
    "Stablecoins",
    "APY",
    "USDC",
    "USDT",
    "USDe",
    "crvUSD",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
