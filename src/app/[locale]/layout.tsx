import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { constructMetadata, getPersonJsonLd } from "@/config/site";

const font = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

import type { Viewport } from "next";
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return constructMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  });
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const jsonLd = getPersonJsonLd();

  return (
    <html lang={locale} className="h-full antialiased" data-scroll-behavior="smooth">
      <body className={`${font.className} min-h-full flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <Script id="ios-touch-hack">
            {`document.addEventListener('touchstart', function() {}, {passive: true});`}
          </Script>
          <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <MotionProvider>
            <SmoothScroll>
              <main className="flex-1 flex flex-col">{children}</main>
            </SmoothScroll>
          </MotionProvider>
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
