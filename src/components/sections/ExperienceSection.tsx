import { Container } from "@/components/layout/Container";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export function ExperienceSection() {
  const t = useTranslations();

  return (
    <section className="w-full bg-black text-white py-24 sm:py-32 md:py-48">
      <Container>
        <SectionHeader
          sectionId="experience"
          title={t("experience.title")}
          number={siteConfig.sections.experience.number}
          theme="dark"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {(
            t.raw("experience.items") as Array<{
              year: string;
              title: string;
              role: string;
              description: string;
              url?: string;
            }>
          ).map((exp, index) => (
            <ExperienceCard
              key={index}
              delay={0.1 * (index + 1)}
              year={exp.year}
              title={exp.title}
              role={exp.role}
              location={t.rich(`experience.items.${index}.location`, { br: () => <br /> })}
              description={t.rich(`experience.items.${index}.description`, {
                highlight: (chunks) => <span className="text-white font-medium">{chunks}</span>,
              })}
              url={exp.url}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
