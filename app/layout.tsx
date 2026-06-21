import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Display: a high-contrast luxury serif (fashion-house editorial feel).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

// UI: a precise neutral grotesk.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen — Rough notes, refined.",
  description:
    "Lumen is the writing studio that turns rough notes into finished prose. A quiet, precise instrument for documents, emails, and posts.",
  metadataBase: new URL("https://lumen.studio"),
  openGraph: {
    title: "Lumen — Rough notes, refined.",
    description:
      "The writing studio that turns rough notes into finished prose.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="relative antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
