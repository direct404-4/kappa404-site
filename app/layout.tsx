import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kappa404.com"),
  title: {
    default: "Kappa404 — AI Visual Engineering",
    template: "%s | Kappa404"
  },
  description:
    "Kappa404 realizza sistemi digitali premium: web development, AI automation, software custom e direzione visuale ad alte prestazioni.",
  openGraph: {
    title: "Kappa404 — AI Visual Engineering",
    description:
      "Engineering luxury visuals through drone cinema, digital systems, and creative direction.",
    url: "https://kappa404.com",
    siteName: "Kappa404",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/intro-kappa404.jpg",
        width: 1536,
        height: 1024,
        alt: "Kappa404 Intro Visual"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kappa404 — AI Visual Engineering",
    description:
      "Sistemi digitali, visual engineering e automazioni AI per brand e business orientati alla crescita.",
    images: ["/intro-kappa404.jpg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
