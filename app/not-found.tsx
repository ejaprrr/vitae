import { routing } from '@/i18n/routing';

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
          <p style={{ fontSize: '1.5rem', margin: '0 0 2rem 0' }}>tady nic není.</p>
          <a href="/" style={{ padding: '1rem 2rem', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
            zpět na hlavní stranu
          </a>
        </div>
      </body>
    </html>
  );
}
