import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { SearchPalette } from "@/components/search/SearchPalette";
import {
  CartDrawer,
} from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS",
  description: "Technology Beyond Tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <AnalyticsProvider>
        <body className="min-h-full flex flex-col">{children}</body>
        <SearchPalette />
        <CartDrawer />
        <WishlistDrawer />
      </AnalyticsProvider>
    </html>
  );
}
