import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.eliasjp.cz"),
};

export default function GlobalNotFound() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/404" />
      </head>
      <body></body>
    </html>
  );
}
