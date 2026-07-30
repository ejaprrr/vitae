import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable or fallback for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliasjp.cz';

  const routes = ['', '/cs', '/en', '/cs/cv', '/en/cv'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' || route === '/cs' || route === '/en' ? 1 : 0.8,
  }));
}
