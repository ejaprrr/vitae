import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations();

  return (
    <Container as="section" className="py-24 sm:py-32 md:py-48">
      <SectionHeader
        sectionId="about"
        title={t("about.title")}
        number={siteConfig.sections.about.number}
        theme="light"
      />

      {/* Big statement */}
      <Reveal delay={0.3}>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] lowercase mb-16 sm:mb-20 md:mb-32 max-w-[1200px]">
          {t.rich("about.statement", {
            highlight1: (chunks) => (
              <HighlightedText
                type="underline"
                delay={1.2}
                className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1"
                scribbleClassName="absolute -bottom-1 left-0 w-full h-4 text-brand -z-10"
              >
                {chunks}
              </HighlightedText>
            ),
            highlight2: (chunks) => (
              <HighlightedText
                type="circle"
                delay={2.2}
                className="relative inline-block z-10 px-2 py-1 -mx-2 -my-1"
                scribbleClassName="absolute inset-0 text-brand -z-10"
              >
                {chunks}
              </HighlightedText>
            ),
          })}
        </p>
      </Reveal>

      {/* Body columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 relative">
        {/* Desktop Scribbles: Column 1 (span 4) */}
        <div className="hidden md:flex md:col-span-4 justify-center items-center pointer-events-none z-10">
          <div className="relative w-56 h-56 -mt-8">
            <Scribble
              type="star"
              trigger="loop"
              loops={3}
              delay={1.5}
              className="w-40 h-40 text-brand -rotate-[15deg] absolute top-0 left-2"
            />
            <Scribble
              type="heart"
              trigger="loop"
              loops={3}
              delay={1.8}
              className="w-24 h-24 text-brand rotate-[20deg] absolute bottom-4 right-4 z-10"
            />
          </div>
        </div>

        <RevealStagger className="md:col-span-4" delay={0.5}>
          <p className="text-body text-gray-500">
            {t.rich("about.paragraphs.0", {
              highlight: (chunks) => <span className="text-black font-medium">{chunks}</span>,
              highlightScribble: (chunks) => (
                <HighlightedText
                  type="circle"
                  trigger="loop"
                  delay={2.1}
                  loops={1}
                  scribbleClassName="absolute inset-0 text-brand -z-10"
                >
                  {chunks}
                </HighlightedText>
              ),
            })}
          </p>
        </RevealStagger>
        <RevealStagger className="md:col-span-4" delay={0.7}>
          <p className="text-body text-gray-500 mb-8">
            {t.rich("about.paragraphs.1", {
              highlight: (chunks) => <span className="text-black font-medium">{chunks}</span>,
              highlightScribble: (chunks) => (
                <HighlightedText type="underline" trigger="loop">
                  {chunks}
                </HighlightedText>
              ),
            })}
          </p>
          <div className="flex items-center w-full">
            <Button href="/cv" theme="dark" aria-label={t("about.cvButton")}>
              {t("about.cvButton")}
            </Button>
            {/* Mobile Scribbles: Centered in remaining space next to CV button */}
            <div className="md:hidden flex-1 flex justify-center items-center pl-4">
              <div className="relative w-24 h-24 pointer-events-none z-10">
                <Scribble
                  type="star"
                  trigger="loop"
                  loops={3}
                  delay={1.5}
                  className="w-16 h-16 text-brand -rotate-[15deg] absolute top-0 left-0"
                />
                <Scribble
                  type="heart"
                  trigger="loop"
                  loops={3}
                  delay={1.8}
                  className="w-10 h-10 text-brand rotate-[20deg] absolute bottom-2 right-2 z-10"
                />
              </div>
            </div>
          </div>
        </RevealStagger>
      </div>
    </Container>
  );
}
