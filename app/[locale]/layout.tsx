import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MotionProvider } from "@/components/providers/MotionProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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
  const t = await import(`@/messages/${locale}.json`).then((m) => m.default.seo);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.openGraph.title,
      description: t.openGraph.description,
      type: "website",
      locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
    }
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
