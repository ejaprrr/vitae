"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { BackToTopIndicator } from "@/components/ui/BackToTopIndicator";
import { LocalTime } from "@/components/ui/LocalTime";
import { Scribble } from "@/components/ui/Scribble";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

function MadeWithLove() {
  const t = useTranslations();
  return (
    <div className="flex items-center text-base md:text-lg font-medium lowercase tracking-tight text-black">
      <span>{t("footer.madeWithLove")}&nbsp;</span>
      <div className="flex items-center ml-1">
        <Scribble
          type="heart"
          trigger="static"
          loops={2}
          className="inline-block w-6 h-6 text-brand translate-y-[-1px]"
        />
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-white text-black">
      <Container className="pt-12 pb-8 sm:pt-16 sm:pb-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 text-body">
          {/* Left: Identity & Status */}
          <div className="flex flex-col gap-2 w-full md:w-1/3 text-center md:text-left items-center md:items-start">
            <span className="text-brand mb-1 hidden md:block">—</span>
            <span>
              {siteConfig.name} © {new Date().getFullYear()}
            </span>
            <span>
              <AnimatedLink
                href={`mailto:${siteConfig.email}`}
                external
              >
                {siteConfig.email}
              </AnimatedLink>
            </span>
            <span>
              {siteConfig.location} – <LocalTime />
            </span>
          </div>

          {/* Center: Back to Top & Made with Love */}
          <div className="flex flex-col items-center justify-center gap-2 w-full md:w-1/3 order-first md:order-none">
            <BackToTopIndicator />
            <div className="flex flex-col items-center gap-1">
              <MadeWithLove />
              <span className="text-black/50 text-sm md:text-base">
                {t("footer.openSource")}{" "}
                <AnimatedLink
                  href="https://github.com/ejaprrr/art"
                  external
                >
                  github
                </AnimatedLink>
              </span>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right w-full md:w-1/3">
            <span className="text-brand mb-1 hidden md:block">{t("footer.socialTitle")}</span>
            {siteConfig.social.map((link, index) => (
              <AnimatedLink
                key={index}
                href={link.href}
                className="text-center md:text-right"
                external
              >
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
