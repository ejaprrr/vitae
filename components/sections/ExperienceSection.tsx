"use client";

import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { ScribbleGroup } from "@/components/scribbles";

export function ExperienceSection() {
  return (
    <section className="w-full bg-black text-white py-24 sm:py-32 md:py-48">
      <div className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
        <div id="experience" className="scroll-mt-16 md:scroll-mt-20" />

        <SectionHeader title={siteConfig.sections.experience.title} number={siteConfig.sections.experience.number} theme="dark" />

        <ScribbleGroup className="flex flex-col gap-16 md:gap-24 mt-8" holdDuration={2000} gapDuration={600}>
          {siteConfig.experience.map((exp, index) => (
            <ExperienceItem
              key={index}
              delay={0.1 * (index + 1)}
              year={exp.year}
              title={exp.title}
              role={exp.role}
              location={exp.location}
              description={exp.description}
            />
          ))}
        </ScribbleGroup>
      </div>
    </section>
  );
}
