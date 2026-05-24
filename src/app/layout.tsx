import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/globalStyles.scss";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";


export const metadata: Metadata = {
  title: "Дилпур",
  description: " ",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body>
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
