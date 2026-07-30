import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable or fallback for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://TODO-ADD-YOUR-DOMAIN-HERE.cz';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
