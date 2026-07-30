"use client";

import { siteConfig } from "@/config/site";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/scribbles";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutSection() {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";

  return (
    <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-24 sm:py-32 md:py-48">
      <div id="about" className="scroll-mt-16 md:scroll-mt-20" />

      <SectionHeader title={siteConfig.sections.about.title} number={siteConfig.sections.about.number} theme="light" />

      {/* Big statement */}
      <Reveal delay={0.1}>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] lowercase mb-16 sm:mb-20 md:mb-32 max-w-[1200px]">
          {siteConfig.about.statement.part1}<span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{siteConfig.about.statement.highlight1}<Scribble type="underline" trigger="sequence1" className="absolute -bottom-1 left-0 w-full h-4 text-[#FF0000] -z-10" /></span>{siteConfig.about.statement.part2}<span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{siteConfig.about.statement.highlight2}<Scribble type="circle" trigger="sequence2" className="absolute inset-0 text-[#FF0000] -z-10" /></span>
        </p>
      </Reveal>

      {/* Body columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        <RevealStagger className="md:col-start-5 md:col-span-4" delay={0.15}>
          <p className={`${txt} text-gray-500`}>
            {siteConfig.about.paragraphs[0].text}
          </p>
        </RevealStagger>
        <RevealStagger className="md:col-span-4" delay={0.25}>
          <p className={`${txt} text-gray-500`}>
            {siteConfig.about.paragraphs[1].text}
          </p>
        </RevealStagger>
      </div>
    </section>
  );
}
