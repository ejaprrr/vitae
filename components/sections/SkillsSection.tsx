import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillBlock } from "@/components/ui/SkillBlock";
import { RevealStagger } from "@/components/ui/Reveal";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';

export function SkillsSection() {
  const t = useTranslations();
  const categoryKeys = ["programming", "web", "database", "design"];
  
  return (
    <Container as="section" className="pt-24 sm:pt-32 md:pt-48 pb-0">
      <div id="skills" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={t('skills.title')} number={siteConfig.sections.skills.number} theme="light" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {siteConfig.skills.map((skillGroup, index) => (
          <RevealStagger key={index} delay={0.1 * index}>
            <SkillBlock category={t(`skills.categories.${categoryKeys[index]}`)} skills={skillGroup.items} />
          </RevealStagger>
        ))}
      </div>

      <RevealStagger delay={0.4}>
        <div className="w-full text-center mt-12 md:mt-16 -mb-4">
          <span className="text-gray-500 lowercase">{t('skills.moreText')}</span>
        </div>
      </RevealStagger>
    </Container>
  );
}
