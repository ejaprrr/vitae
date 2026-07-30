import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { siteConfig } from "@/config/site";
import { MotionProvider } from "@/components/providers/MotionProvider";

const font = Outfit({
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: siteConfig.seo.openGraph
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className="h-full antialiased"
    >
      <body className={`${font.className} min-h-full flex flex-col`}>
        <Script id="ios-touch-hack">
          {`document.addEventListener('touchstart', function() {}, {passive: true});`}
        </Script>
        <MotionProvider>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
