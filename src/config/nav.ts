export interface SectionConfig {
  id: string;
  number: string;
  href: string;
}

export const navSections: SectionConfig[] = [
  { id: "about", number: "01", href: "#about" },
  { id: "experience", number: "02", href: "#experience" },
  { id: "skills", number: "03", href: "#skills" },
  { id: "education", number: "04", href: "#education" },
  { id: "contact", number: "05", href: "#contact" },
];

export const sectionsConfig = {
  about: { number: "01" },
  experience: { number: "02" },
  skills: { number: "03", moreText: "a další..." },
  education: { number: "04" },
  contact: { number: "05" },
};
