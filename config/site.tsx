import { Scribble } from "@/components/scribbles/Scribble";

export const siteConfig = {
  name: "eliáš jan procházka",
  shortName: "ejp",
  email: "e.japrrr@gmail.com",
  roles: ["vývojář", "designer", "analytik"],

  seo: {
    title: "eliáš jan procházka | vývojář, designer, analytik",
    description: "osobní portfolio. spojuji čistý kód s promyšleným designem. komplexní vývoj a analytika.",
    openGraph: {
      title: "eliáš jan procházka | vývojář, designer, analytik",
      description: "osobní portfolio. spojuji čistý kód s promyšleným designem.",
      type: "website",
      locale: "cs_CZ",
    }
  },

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

  footer: {
    socialTitle: "sociální sítě"
  },

  social: [
    { label: "github", href: "https://github.com/ejaprrr" },
    { label: "linkedin", href: "https://linkedin.com/in/ejaprrr" },
    { label: "instagram", href: "https://instagram.com/e.japrrr" }
  ],

  about: {
    statement: {
      part1: "tvořím digitální produkty od nuly. čistý kód, ",
      highlight1: "spolehlivá data",
      part2: " a design, co dává ",
      highlight2: "smysl."
    },
    paragraphs: [
      {
        text: (
          <>
            <span className="text-black font-medium">studuji informatiku a datovou analytiku.</span> baví mě řešit komplexní problémy a navrhovat architekturu, která funguje. vím ale, že stabilní backend je jen polovina úspěchu – proto se aktivně věnuji i <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">vizuální identitě a ui/ux.<Scribble type="circle" trigger="sequence2" loops={1} className="absolute inset-0 text-[#FF0000] -z-10" /></span> nevnímám design jen jako hezký obal, ale jako základ pro to, aby se produkt dobře používal.
          </>
        )
      },
      {
        text: (
          <>
            mám rád minimalismus a u složitých věcí hledám <span className="text-black font-medium">tu nejpřímější cestu.</span> dokážu projekt provést celým procesem – od prvotní myšlenky až po <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">finální nasazení.<Scribble type="underline" trigger="sequence1" className="absolute -bottom-1 left-0 w-full h-3 text-[#FF0000] -z-10" /></span> postupně směřuji do mezinárodního prostředí a chci se podílet na věcech, které mají reálný dopad.
          </>
        )
      }
    ]
  },

  experience: [
    {
      year: "jaro 2026",
      title: "alboránplus",
      role: "frontend developer",
      location: (
        <>
          málaga, es<br />erasmus+
        </>
      ),
      description: "vývoj moderních webových aplikací a interaktivních komponent (react, typescript, tailwind). skvělá zkušenost s prací v mezinárodním týmu."
    },
    {
      year: "2023 – 2025",
      title: "voš a spše plzeň",
      role: "social media creator",
      location: (
        <>
          plzeň, cz<br />part time
        </>
      ),
      description: "správa vizuální identity školy na sítích. měl jsem na starosti tvorbu obsahu od střihu videa přes copywriting až po komunikaci s komunitou."
    }
  ],

  skills: [
    {
      category: "programování",
      items: [
        { name: "typescript", url: "https://www.typescriptlang.org/" },
        { name: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "python", url: "https://www.python.org/" },
        { name: "c#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        { name: "java", url: "https://www.java.com/" }
      ]
    },
    {
      category: "web & frameworky",
      items: [
        { name: "react", url: "https://react.dev/" },
        { name: "svelte", url: "https://svelte.dev/" },
        { name: "tailwind", url: "https://tailwindcss.com/" },
        { name: "html / css", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "php", url: "https://www.php.net/" }
      ]
    },
    {
      category: "databáze & nástroje",
      items: [
        { name: "mongodb", url: "https://www.mongodb.com/" },
        { name: "postgresql", url: "https://www.postgresql.org/" },
        { name: "mysql", url: "https://www.mysql.com/" },
        { name: "git", url: "https://git-scm.com/" },
        { name: "unix", url: "https://en.wikipedia.org/wiki/Unix" }
      ]
    },
    {
      category: "design & produkce",
      items: [
        { name: "figma", url: "https://www.figma.com/" },
        { name: "after effects", url: "https://www.adobe.com/products/aftereffects.html" },
        { name: "davinci resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
        { name: "capcut", url: "https://www.capcut.com/" },
        { name: "canva", url: "https://www.canva.com/" }
      ]
    }
  ],

  education: [
    {
      year: "2023 – 2027",
      title: "voš a spše plzeň",
      description: "obor informační technologie, specializace na datovou analytiku.",
      url: "https://www.spseplzen.cz"
    },
    {
      year: "2025",
      title: (
        <>
          aimtec hackathon<br /><span>3. místo</span>
        </>
      ),
      description: "intenzivní týmová práce s tvrdým deadlinem. navrhli a postavili jsme reálnou aplikaci, která si odnesla třetí místo.",
      url: "https://www.aimtecglobal.com/tiskove-zpravy/vysledky-aimtechackathonu-2025-nejlepsi-projekty-pomohou-autistickym-detem-a-lekarum"
    },
    {
      year: "2025",
      title: (
        <>
          cambridge<br /><span>c1 advanced</span>
        </>
      ),
      description: "angličtinu používám naprosto přirozeně, ať už při čtení technické dokumentace nebo v komunikaci se zahraničním týmem.",
      url: "https://www.cambridgeenglish.org/exams-and-tests/advanced/"
    }
  ],

  contact: {
    heading: (
      <>
        máte nápad?<br /><span className="text-[#FF0000]">pojďme se o něm pobavit.</span>
      </>
    ),
    cta: "napsat zprávu"
  }
};
