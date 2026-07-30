export const siteConfig = {
  name: "eliáš jan procházka",
  shortName: "ejp",
  url: "https://www.eliasjp.cz",
  domain: "www.eliasjp.cz",
  email: "e.japrrr@gmail.com",
  roles: ["vývojář", "designer", "analytik"],

  nav: [
    { label: "o mně", href: "#about" },
    { label: "zkušenosti", href: "#experience" },
    { label: "dovednosti", href: "#skills" },
    { label: "vzdělání", href: "#education" },
    { label: "kontakt", href: "#contact" }
  ],

  sections: {
    about: { title: "o mně", number: "01" },
    experience: { title: "zkušenosti", number: "02" },
    skills: { title: "technologie a dovednosti", number: "03", moreText: "a další..." },
    education: { title: "vzdělání a úspěchy", number: "04" },
    contact: { title: "kontakt", number: "05" }
  },

  location: "plzeň, cz",

  social: [
    { label: "github", handle: "ejaprrr", href: "https://github.com/ejaprrr" },
    { label: "linkedin", handle: "eliasjp", href: "https://linkedin.com/in/eliasjp" },
    { label: "instagram", handle: "e.jpqx", href: "https://instagram.com/e.jpqx" }
  ],

  skills: [
    {
      items: [
        { name: "typescript", url: "https://www.typescriptlang.org/" },
        { name: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "python", url: "https://www.python.org/" },
        { name: "c#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        { name: "java", url: "https://www.java.com/" }
      ]
    },
    {
      items: [
        { name: "react", url: "https://react.dev/" },
        { name: "svelte", url: "https://svelte.dev/" },
        { name: "tailwind", url: "https://tailwindcss.com/" },
        { name: "html / css", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "php", url: "https://www.php.net/" }
      ]
    },
    {
      items: [
        { name: "mongodb", url: "https://www.mongodb.com/" },
        { name: "postgresql", url: "https://www.postgresql.org/" },
        { name: "mysql", url: "https://www.mysql.com/" },
        { name: "git", url: "https://git-scm.com/" },
        { name: "unix", url: "https://en.wikipedia.org/wiki/Unix" }
      ]
    },
    {
      items: [
        { name: "figma", url: "https://www.figma.com/" },
        { name: "after effects", url: "https://www.adobe.com/products/aftereffects.html" },
        { name: "davinci resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
        { name: "capcut", url: "https://www.capcut.com/" },
        { name: "canva", url: "https://www.canva.com/" }
      ]
    }
  ]
};
