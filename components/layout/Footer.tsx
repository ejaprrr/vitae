import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-white text-black">
      <Container className="py-16 sm:py-24">
        <div className="flex flex-row justify-between items-start gap-4 text-body">

          {/* Left: Text */}
          <div className="flex flex-col gap-2">
            <span className="text-brand mb-1">—</span>
            <span>{t('global.name')}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Right: Links */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-2 items-end text-right">
              <span className="text-brand mb-1">{t('footer.socialTitle')}</span>
              {siteConfig.social.map((link, index) => (
                <AnimatedLink key={index} href={link.href} className="text-right" external>{link.label}</AnimatedLink>
              ))}
            </div>
          </div>
          
        </div>

      </Container>
    </footer>
  );
}
