import type { Metadata } from "next";
import { Prata, Albert_Sans, Open_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Nashville & Memphis Real Estate — ROWE | WYSE Partners",
    template: "%s — ROWE | WYSE Partners",
  },
  description:
    "ROWE | WYSE Partners guides buyers, sellers, and investors through Nashville and Memphis real estate — residential sales, property management, and down payment assistance, under Onward Real Estate.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [{ url: "/images/placeholders/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/placeholders/og-image.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prata.variable} ${albertSans.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
