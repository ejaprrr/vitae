import { getSiteUrl } from "@/config/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const pages = [
    { route: "/cs", priority: 1.0, altRoute: "/en" },
    { route: "/en", priority: 0.9, altRoute: "/cs" },
    { route: "/cs/cv", priority: 0.8, altRoute: "/en/cv" },
    { route: "/en/cv", priority: 0.8, altRoute: "/cs/cv" },
  ];

  return pages.map(({ route, priority, altRoute }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        cs: `${baseUrl}${route.startsWith("/cs") ? route : altRoute}`,
        en: `${baseUrl}${route.startsWith("/en") ? route : altRoute}`,
      },
    },
  }));
}
