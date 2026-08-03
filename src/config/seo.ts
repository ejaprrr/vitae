import { siteConfig } from "./site";
import { socialConfig } from "./social";

export function getSiteUrl(): string {
  return siteConfig.url;
}

export function getJsonLd(jobTitle: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        sameAs: socialConfig.map((s) => s.href),
        jobTitle,
        image: `${siteConfig.url}/opengraph-image.png`,
        description: "frontend developer, designer, and data analyst.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pilsen",
          addressCountry: "CZ",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "VOŠ a SPŠE Plzeň",
        },
        knowsLanguage: ["cs", "en", "es"],
        knowsAbout: ["Frontend Development", "UI/UX Design", "System Architecture", "Data Analytics", "React", "Next.js"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: "portfolio of eliáš jan procházka",
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: ["cs", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/${locale}/#webpage`,
        url: `${siteConfig.url}/${locale}`,
        name: `${siteConfig.name} | ${jobTitle}`,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: locale,
      },
    ],
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
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}
