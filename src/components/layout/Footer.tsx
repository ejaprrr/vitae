"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Scribble } from "@/components/ui/Scribble";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-white text-black">
      <Container className="pt-20 pb-12 sm:pt-32 sm:pb-24 relative z-10 flex flex-col gap-16 md:gap-32">
        {/* Main Typography Row */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-8">
          {/* Big Name */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] lowercase tracking-tighter max-w-2xl">
            {siteConfig.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h2>

          {/* Big Links */}
          <div className="flex flex-col items-end gap-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter lowercase w-full xl:w-auto">
            {siteConfig.social.map((link, index) => (
              <AnimatedLink
                key={index}
                href={link.href}
                type="circle"
                loops={2}
                className="w-max text-right"
                external
              >
                {link.label}
              </AnimatedLink>
            ))}
            <AnimatedLink
              href={`mailto:${siteConfig.email}`}
              type="circle"
              loops={2}
              className="w-max text-right text-brand mt-2 xl:mt-4"
              external
            >
              {siteConfig.email}
            </AnimatedLink>
          </div>
        </div>

        {/* Bottom Bar: Pure Typography */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-xl sm:text-2xl md:text-3xl font-medium lowercase tracking-tight">
          {/* Left: Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 order-2 md:order-none">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span>{t("footer.reservedRights")}</span>
          </div>

          {/* Center: Scroll */}
          <div className="w-full md:w-1/3 flex justify-center order-1 md:order-none mb-2 md:mb-0">
            <ScrollIndicator direction="up" target="#top" />
          </div>

          {/* Right: Made with love */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-1/3 order-3 md:order-none">
            <span className="flex items-center">
              {t("footer.madeWithLove")}&nbsp;
              <Scribble
                type="heart"
                trigger="static"
                loops={2}
                className="w-6 h-6 text-brand translate-y-[-2px] ml-1"
              />
            </span>
            <AnimatedLink href="https://github.com/ejaprrr/vitae" type="underline" external>
              {t("footer.openSource")} github
            </AnimatedLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
