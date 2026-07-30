import { siteConfig } from "@/config/site";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/scribbles";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <Container as="section" className="py-24 sm:py-32 md:py-48">
      <div id="about" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={siteConfig.sections.about.title} number={siteConfig.sections.about.number} theme="light" />

      {/* Big statement */}
      <Reveal delay={0.3}>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] lowercase mb-16 sm:mb-20 md:mb-32 max-w-[1200px]">
          {siteConfig.about.statement.part1}<span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{siteConfig.about.statement.highlight1}<Scribble type="underline" trigger="scroll" loops={2} delay={1.2} className="absolute -bottom-1 left-0 w-full h-4 text-brand -z-10" /></span>{siteConfig.about.statement.part2}<span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{siteConfig.about.statement.highlight2}<Scribble type="circle" trigger="scroll" delay={2.2} className="absolute inset-0 text-brand -z-10" /></span>
        </p>
      </Reveal>

      {/* Body columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        <RevealStagger className="md:col-start-5 md:col-span-4" delay={0.5}>
          <p className="text-body text-gray-500">
            {siteConfig.about.paragraphs[0].text}
          </p>
        </RevealStagger>
        <RevealStagger className="md:col-span-4" delay={0.7}>
          <p className="text-body text-gray-500">
            {siteConfig.about.paragraphs[1].text}
          </p>
        </RevealStagger>
      </div>
    </Container>
  );
}
