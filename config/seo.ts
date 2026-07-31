import { siteConfig } from "./site";
import { socialConfig } from "./social";

export function getSiteUrl(): string {
  return siteConfig.url;
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: socialConfig.map((s) => s.href),
    jobTitle: "vývojář, designer, analytik",
    knowsLanguage: ["cs", "en"],
  };
}
