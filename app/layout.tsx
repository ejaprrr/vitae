import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Script from "next/script";

import { siteConfig } from "@/config/site";

const font = Outfit({
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
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
      <body className={`${font.className} min-h-full flex flex-col select-none`}>
        <Script id="ios-touch-hack">
          {`document.addEventListener('touchstart', function() {}, {passive: true});`}
        </Script>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
