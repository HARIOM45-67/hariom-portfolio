import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hariom Tiwari | Java Developer & Aspiring AI Engineer",
  description:
    "Portfolio of Hariom Tiwari — MCA student at MDU Rohtak, Java developer, and aspiring AI engineer building practical software and AI-powered projects.",
  openGraph: {
    title: "Hariom Tiwari | Java Developer & Aspiring AI Engineer",
    description:
      "Portfolio of Hariom Tiwari — MCA student at MDU Rohtak, Java developer, and aspiring AI engineer building practical software and AI-powered projects.",
    type: "website",
    siteName: "Hariom Tiwari Portfolio",
    images: [{ url: "/icon.svg", alt: "Hariom Tiwari portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariom Tiwari | Java Developer & Aspiring AI Engineer",
    description:
      "Portfolio of Hariom Tiwari — MCA student at MDU Rohtak, Java developer, and aspiring AI engineer building practical software and AI-powered projects.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#070812] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
