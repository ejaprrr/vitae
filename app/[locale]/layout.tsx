import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MotionProvider } from "@/components/providers/MotionProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const font = Outfit({
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Await getTranslations directly
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.eliasjp.cz"),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        cs: '/cs',
        en: '/en',
      },
    },
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      type: "website",
      siteName: "eliáš jan procházka",
      locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
      url: `https://www.eliasjp.cz/${locale}`,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t('openGraph.title'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('openGraph.title'),
      description: t('openGraph.description'),
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
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className={`${font.className} min-h-full flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
