import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/globalStyles.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Дилпур",
  description: " ",
};

import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextTopLoader color="#181818" showSpinner={false} />
        <Header />
        <main className="layout">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
