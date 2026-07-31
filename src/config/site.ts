import { navSections, sectionsConfig } from "./nav";
import { skillsConfig } from "./skills";
import { socialConfig } from "./social";

export const siteConfig = {
  name: "eliáš jan procházka",
  shortName: "ejp",
  url: "https://www.eliasjp.cz",
  domain: "www.eliasjp.cz",
  email: "e.japrrr@gmail.com",
  roles: ["vývojář", "designer", "analytik"],
  location: "plzeň, cz",
  nav: navSections,
  sections: sectionsConfig,
  social: socialConfig,
  skills: skillsConfig,
};

export * from "./nav";
export * from "./skills";
export * from "./social";
export * from "./seo";
