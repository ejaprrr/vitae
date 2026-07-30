"use client";

import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillBlock } from "@/components/ui/SkillBlock";
import { RevealStagger } from "@/components/ui/Reveal";
import { ScribbleGroup } from "@/components/scribbles";

export function SkillsSection() {
  return (
    <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto pt-24 sm:pt-32 md:pt-48 pb-16 sm:pb-24 md:pb-32">
      <div id="skills" className="scroll-mt-16 md:scroll-mt-20" />

      <SectionHeader title={siteConfig.sections.skills.title} number={siteConfig.sections.skills.number} theme="light" />

      <ScribbleGroup holdDuration={2000} gapDuration={600} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-8">
        {siteConfig.skills.map((skillGroup, index) => (
          <RevealStagger key={index} delay={0.1 * index}>
            <SkillBlock category={skillGroup.category} skills={skillGroup.items} />
          </RevealStagger>
        ))}
      </ScribbleGroup>

      <RevealStagger delay={0.4}>
        <div className="w-full text-center mt-12 md:mt-16 -mb-4">
          <span className="text-gray-500 lowercase">{siteConfig.sections.skills.moreText}</span>
        </div>
      </RevealStagger>
    </section>
  );
}
