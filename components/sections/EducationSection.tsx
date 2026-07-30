import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EducationCard } from "@/components/ui/EducationCard";
import { Container } from "@/components/layout/Container";

export function EducationSection() {
  return (
    <Container as="section" className="pb-24 sm:pb-32 md:pb-48">
      <div id="education" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={siteConfig.sections.education.title} number={siteConfig.sections.education.number} theme="light" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-body">
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
      </div>
    </Container>
  );
}
