import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/interactive/CustomCursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safesquare — A Quiet Place for Considered Mental Healthcare",
  description:
    "Safesquare is the environment, place, and platform for mental-health practitioners to deliver exceptional, considered care — in Clifton, Karachi.",
  keywords: [
    "mental health",
    "psychotherapy",
    "clinic Karachi",
    "practitioner platform",
    "Clifton therapy",
    "Safesquare",
  ],
  authors: [{ name: "Safesquare" }],
  openGraph: {
    title: "Safesquare — A Quiet Place for Considered Care",
    description:
      "An environment, place, and platform for mental-health practitioners.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-ivory-100 text-ink-900">
        <CustomCursor />
        <Header />
        <main className="flex-1 pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
