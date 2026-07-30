import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { Container } from "@/components/layout/Container";

export function ExperienceSection() {
  return (
    <section className="w-full bg-black text-white py-24 sm:py-32 md:py-48">
      <Container>
        <div id="experience" className="scroll-mt-16 md:scroll-mt-20" />
        <SectionHeader title={siteConfig.sections.experience.title} number={siteConfig.sections.experience.number} theme="dark" />

        <div className="flex flex-col gap-16 md:gap-24 mt-8">
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
        </div>
      </Container>
    </section>
  );
}
