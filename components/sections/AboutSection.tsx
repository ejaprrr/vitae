import { siteConfig } from "@/config/site";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/scribbles";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations();
  
  return (
    <Container as="section" className="py-24 sm:py-32 md:py-48">
      <div id="about" className="scroll-mt-16 md:scroll-mt-20" />
      <SectionHeader title={t('about.title')} number={siteConfig.sections.about.number} theme="light" />

      {/* Big statement */}
      <Reveal delay={0.3}>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] lowercase mb-16 sm:mb-20 md:mb-32 max-w-[1200px]">
          {t.rich('about.statement', {
            highlight1: (chunks) => <span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{chunks}<Scribble type="underline" trigger="scroll" loops={2} delay={1.2} className="absolute -bottom-1 left-0 w-full h-4 text-brand -z-10" /></span>,
            highlight2: (chunks) => <span className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1">{chunks}<Scribble type="circle" trigger="scroll" delay={2.2} className="absolute inset-0 text-brand -z-10" /></span>
          })}
        </p>
      </Reveal>

      {/* Body columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        <RevealStagger className="md:col-start-5 md:col-span-4" delay={0.5}>
          <p className="text-body text-gray-500">
            {t.rich('about.paragraphs.0', {
              highlight: (chunks) => <span className="text-black font-medium">{chunks}</span>,
              highlightScribble: (chunks) => <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">{chunks}<Scribble type="circle" trigger="loop" delay={2.1} loops={1} className="absolute inset-0 text-brand -z-10" /></span>
            })}
          </p>
        </RevealStagger>
        <RevealStagger className="md:col-span-4" delay={0.7}>
          <p className="text-body text-gray-500 mb-8">
            {t.rich('about.paragraphs.1', {
              highlight: (chunks) => <span className="text-black font-medium">{chunks}</span>,
              highlightScribble: (chunks) => <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">{chunks}<Scribble type="underline" trigger="loop" className="absolute -bottom-1 left-0 w-full h-3 text-brand -z-10" /></span>
            })}
          </p>
          <div className="flex">
            <Button href="/cv" theme="dark">
              {t('about.cvButton')}
            </Button>
          </div>
        </RevealStagger>
      </div>
    </Container>
  );
}
