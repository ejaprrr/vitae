import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';
import React from 'react';

export function ExperienceSection() {
  const t = useTranslations();
  
  return (
    <section className="w-full bg-black text-white py-24 sm:py-32 md:py-48">
      <Container>
        <div id="experience" className="scroll-mt-16 md:scroll-mt-20" />
        <SectionHeader title={t('experience.title')} number={siteConfig.sections.experience.number} theme="dark" />

        <div className="flex flex-col gap-16 md:gap-24">
          {(t.raw('experience.items') as Array<{ year: string; title: string; role: string; description: string; url?: string }>).map((exp, index) => (
            <ExperienceItem
              key={index}
              delay={0.1 * (index + 1)}
              year={exp.year}
              title={exp.title}
              role={exp.role}
              location={t.rich(`experience.items.${index}.location`, { br: () => <br /> })}
              description={t.rich(`experience.items.${index}.description`, { 
                highlight: (chunks) => <span className="text-white font-medium">{chunks}</span> 
              })}
              url={exp.url}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
