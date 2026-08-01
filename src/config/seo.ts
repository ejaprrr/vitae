import { siteConfig } from "./site";
import { socialConfig } from "./social";

export function getSiteUrl(): string {
  return siteConfig.url;
}

export function getPersonJsonLd(jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: socialConfig.map((s) => s.href),
    jobTitle,
    knowsLanguage: ["cs", "en"],
  };
}

import type { Metadata } from "next";

export function constructMetadata({
  locale,
  title,
  description,
  path = "",
  noIndex = false,
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        cs: `/cs${path}`,
        en: `/en${path}`,
        "x-default": `/cs${path}`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      url,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}
