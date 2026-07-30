"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';

export function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  return (
    <section className="w-full bg-black text-white">
      <Container className="py-24 sm:py-32 md:py-48">
        <div id="contact" className="scroll-mt-16 md:scroll-mt-20" />
        <SectionHeader title={t('contact.title')} number={siteConfig.sections.contact.number} theme="dark" />

        {/* Main Content */}
        <Reveal delay={0.15}>
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 lg:gap-16">
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.05] lowercase tracking-tight">
              {t.rich('contact.heading', { 
                br: () => <br />, 
                highlight: (chunks) => <span className="text-brand">{chunks}</span> 
              })}
            </p>
            <div 
              className="mb-2 lg:mb-6 w-max relative z-10 mt-8 md:mt-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button href={`mailto:${t('global.email')}`} theme="light" className="relative z-10">
                {t('contact.cta')}
              </Button>
              <Scribble 
                type="circle"
                trigger="sequence2"
                isActive={isHovered}
                className="absolute -inset-2 md:-inset-3 text-brand z-20 pointer-events-none"
              />
              <Scribble 
                type="arrowDown"
                trigger="sequence1"
                isActive={isHovered}
                className="absolute -top-14 left-8 w-8 h-12 text-brand block md:hidden pointer-events-none"
              />
              <Scribble 
                type="arrowRight"
                trigger="sequence1"
                isActive={isHovered}
                className="absolute top-1/2 -left-24 w-24 h-12 text-brand -translate-y-1/2 hidden md:block pointer-events-none"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
