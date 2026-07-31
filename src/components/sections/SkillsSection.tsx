import { SkillCard } from "@/components/cards/SkillCard";
import { Container } from "@/components/layout/Container";
import { RevealStagger } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sectionsConfig, skillsConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export function SkillsSection() {
  const t = useTranslations();

  return (
    <Container as="section" className="pt-24 sm:pt-32 md:pt-48 pb-0">
      <SectionHeader
        sectionId="skills"
        title={t("skills.title")}
        number={sectionsConfig.skills.number}
        theme="light"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {skillsConfig.map((group, index) => (
          <RevealStagger key={group.key} delay={0.1 * index}>
            <SkillCard category={t(`skills.categories.${group.key}`)} skills={group.items} />
          </RevealStagger>
        ))}
      </div>

      <RevealStagger delay={0.4}>
        <div className="w-full text-center mt-12 md:mt-16 -mb-4">
          <span className="text-gray-500 lowercase">{t("skills.moreText")}</span>
        </div>
      </RevealStagger>
    </Container>
  );
}
