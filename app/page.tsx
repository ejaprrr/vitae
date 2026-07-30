import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div id="top" className="w-full flex flex-col relative overflow-hidden">
      <Navbar />
      <Hero />

      <main className="w-full flex flex-col">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
}