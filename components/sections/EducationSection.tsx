import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EducationCard } from "@/components/ui/EducationCard";

import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';
import React from 'react';

export function EducationSection() {
  const t = useTranslations();
  
  return (
    <Container as="section" className="py-24 sm:py-32 md:py-48">
      <div id="education" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={t('education.title')} number={siteConfig.sections.education.number} theme="light" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(t.raw('education.items') as Array<{ year: string; title: string; description: string; url?: string }>).map((edu, index) => (
          <EducationCard
            key={index}
            delay={0.1 * index}
            year={edu.year}
            title={t.rich(`education.items.${index}.title`, { 
              br: () => <br />, 
              highlight: (chunks) => <span>{chunks}</span> 
            })}
            description={edu.description}
            url={edu.url}
          />
        ))}
      </div>
    </Container>
  );
}
