import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { MotionProvider } from "@/components/providers/MotionProvider";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { getPersonJsonLd, getSiteUrl, siteConfig } from "@/config/site";

const font = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadataBase = new URL(getSiteUrl());

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  // Await getTranslations directly
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    icons: {
      apple: "/icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        cs: "/cs",
        en: "/en",
        "x-default": "/cs",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      url: `${siteUrl}/${locale}`,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image.png"],
    },
  };
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
            <main className="flex-1 flex flex-col">{children}</main>
          </MotionProvider>
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
