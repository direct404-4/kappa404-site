import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ConsentManagedAnalytics from "@/components/ConsentManagedAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kappa404.it"),
  title: {
    default: "Kappa404 — AI Visual Engineering",
    template: "%s | Kappa404"
  },
  description:
    "Kappa404 realizza sistemi digitali premium: web development, AI automation, software custom e direzione visuale ad alte prestazioni.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "Kappa404 — AI Visual Engineering",
    description:
      "Engineering luxury visuals through drone cinema, digital systems, and creative direction.",
    url: "https://www.kappa404.it",
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
      <body className="hud-grid">
        <Navbar />
        <main className="kappa-home min-h-screen pt-16">{children}</main>
        <Footer />
        <CookieBanner />
        <ConsentManagedAnalytics />
      </body>
    </html>
  );
}
