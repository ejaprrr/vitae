import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['cs', 'en'],
  defaultLocale: 'cs',
  // Always use locale prefix (e.g. /cs or /en)
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
