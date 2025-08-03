import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import LenisProvider from '@/components/LenisProvider';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Duque Performance - Entrenamiento y Nutrición",
  description: "Plataforma de venta de programas de entrenamiento y nutrición con Duque Performance",
  icons: {
    icon: '/images/logo.duque.jpg',
    shortcut: '/images/logo.duque.jpg',
    apple: '/images/logo.duque.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo.duque.jpg" />
        <link rel="shortcut icon" href="/images/logo.duque.jpg" />
        <link rel="apple-touch-icon" href="/images/logo.duque.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} antialiased responsive-width`}
      >
        <LenisProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
