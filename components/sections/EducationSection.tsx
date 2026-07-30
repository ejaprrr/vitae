"use client";

import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EducationCard } from "@/components/ui/EducationCard";
import { ScribbleGroup } from "@/components/scribbles";

export function EducationSection() {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";

  return (
    <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto pb-24 sm:pb-32 md:pb-48">
      <div id="education" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={siteConfig.sections.education.title} number={siteConfig.sections.education.number} theme="light" />

      <ScribbleGroup className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 ${txt}`} holdDuration={2000} gapDuration={600}>
        {siteConfig.education.map((edu, index) => (
          <EducationCard
            key={index}
            delay={0.1 * index}
            year={edu.year}
            title={edu.title}
            description={edu.description}
            url={edu.url}
          />
        ))}
      </ScribbleGroup>
    </section>
  );
}
