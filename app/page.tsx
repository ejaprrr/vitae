import Image from "next/image";
import { siteConfig } from "@/config/site";
import bkgEyes from "@/public/bkg-eyes.png";
import { CTAButton } from "@/components/CTAButton";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Scribble, ScribbleGroup } from "@/components/scribbles";
import { ContactCTA } from "@/components/ContactCTA";
import { Reveal, RevealStagger } from "@/components/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { SkillBlock } from "@/components/ui/SkillBlock";
import { EducationCard } from "@/components/ui/EducationCard";
import { Hero } from "@/components/layout/Hero";

export default function Home() {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";

  return (
    <div id="top" className="w-full flex flex-col relative overflow-hidden">
      <Navbar />

      <Hero />

      {/* Content */}
      <main className="w-full flex flex-col">
        {/* O MNĚ */}
        <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-24 sm:py-32 md:py-48">
          <div id="about" className="scroll-mt-16 md:scroll-mt-20" />

          <SectionHeader title="o mně" number="01" theme="light" />

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
                <Scribble type="circle" trigger="sequence2" loops={1} className="absolute inset-0 text-[#FF0000] -z-10" />
              </p>
            </RevealStagger>
            <RevealStagger className="md:col-span-4" delay={0.25}>
              <p className={`${txt} text-gray-500`}>
                {siteConfig.about.paragraphs[1].text}
                <Scribble type="underline" trigger="sequence1" className="absolute -bottom-1 left-0 w-full h-3 text-[#FF0000] -z-10" />
              </p>
            </RevealStagger>
          </div>
        </section>

        {/* ZKUŠENOSTI */}
        <section className="w-full bg-black text-white py-24 sm:py-32 md:py-48">
          <div className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
            <div id="experience" className="scroll-mt-16 md:scroll-mt-20" />

            <SectionHeader title="zkušenosti" number="02" theme="dark" />

            <ScribbleGroup className="flex flex-col gap-16 md:gap-24 mt-8" holdDuration={2000} gapDuration={600}>
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
            </ScribbleGroup>
          </div>
        </section>

        {/* DOVEDNOSTI */}
        <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-24 sm:py-32 md:py-48">
          <div id="skills" className="scroll-mt-16 md:scroll-mt-20" />

          <SectionHeader title="technologie a dovednosti" number="03" theme="light" />

          <ScribbleGroup holdDuration={2000} gapDuration={600} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-8">
            {siteConfig.skills.map((skillGroup, index) => (
              <RevealStagger key={index} delay={0.1 * index}>
                <SkillBlock category={skillGroup.category} skills={skillGroup.items} />
              </RevealStagger>
            ))}
          </ScribbleGroup>
        </section>

        {/* VZDĚLÁNÍ & ÚSPĚCHY */}
        <section className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto pb-24 sm:pb-32 md:pb-48">
          <div id="education" className="scroll-mt-16 md:scroll-mt-20" />
          <SectionHeader title="vzdělání a úspěchy" number="04" theme="light" />

          <ScribbleGroup className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 ${txt}`} holdDuration={2000} gapDuration={600}>
            {siteConfig.education.map((edu, index) => (
              <EducationCard
                key={index}
                delay={0.1 * index}
                year={edu.year}
                title={edu.title}
                description={edu.description}
              />
            ))}
          </ScribbleGroup>
        </section>
      </main>

      {/* Kontakt Section */}
      <section className="w-full bg-black text-white">
        <div className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto pt-24 sm:pt-32 md:pt-48 pb-24 sm:pb-32">
          <div id="contact" className="scroll-mt-16 md:scroll-mt-20" />

          <SectionHeader title="kontakt" number="05" theme="dark" />

          {/* Main Content */}
          <Reveal delay={0.15}>
            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 lg:gap-16">
              <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.05] lowercase tracking-tight">
                {siteConfig.contact.heading}
              </p>
              <ContactCTA />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}