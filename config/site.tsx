import React from "react";

export const siteConfig = {
  name: "Eliáš Jan Procházka",
  shortName: "ejp",
  email: "e.japrrr@gmail.com",
  roles: ["vývojář", "grafik", "analytik"],
  
  seo: {
    title: "Eliáš Jan Procházka | Vývojář & Grafik",
    description: "Osobní portfolio. Komplexní vývoj aplikací, analytika a creative direction. Propojuji tvrdou logiku s funkčním vizuálem.",
    openGraph: {
      title: "Eliáš Jan Procházka | Vývojář & Grafik",
      description: "Komplexní vývoj aplikací, analytika a creative direction.",
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
  
  social: [
    { label: "github", href: "https://github.com/ejaprrr" },
    { label: "linkedin", href: "https://linkedin.com/in/ejaprrr" },
    { label: "instagram", href: "https://instagram.com/e.japrrr" }
  ],

  about: {
    statement: {
      part1: "stavím kvalitní a kreativní věci od nuly – kód, ",
      highlight1: "creative direction",
      part2: ", data. logika, co sedí. vizuál, co má ",
      highlight2: "názor."
    },
    paragraphs: [
      {
        text: (
          <>
            <span className="text-black font-medium">studuji informatiku a datovou analytiku.</span> píšu kvalitní kód, pracuji s daty a navrhuji architekturu, která unese zátěž. technologie bez designu je ale jen kostra — proto mám přesah i do <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">vizuální identity s ui/ux.</span> ne jako doplněk. jako součást řešení.
          </>
        )
      },
      {
        text: (
          <>
            jsem minimalista. u složitých problémů hledám <span className="text-black font-medium">nejpřímější cestu</span> a zakládám si na detailnosti. tahle práce je i mým koníčkem. jedu projekt od prvního nápadu až po <span className="relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium">ostré nasazení.</span> mířím do mezinárodního prostředí, na větší hřiště.
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
      description: "stavěl jsem responzivní weby a ui komponenty (react, typescript, tailwind) v mezinárodním týmu."
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
      description: "měl jsem na starosti vizuální identitu na sociálních sítích – střih videa, copywriting, komunitní management."
    }
  ],

  skills: [
    { category: "programování", items: ["typescript", "javascript", "python", "c#", "java"] },
    { category: "web & frameworky", items: ["react", "svelte", "tailwind", "html / css", "php"] },
    { category: "databáze & nástroje", items: ["mongodb", "postgresql", "mysql", "git", "unix"] },
    { category: "design & produkce", items: ["figma", "after effects", "davinci resolve", "capcut", "canva"] }
  ],

  education: [
    {
      year: "2023 – 2027",
      title: "voš a spše plzeň",
      description: "obor informační technologie se zaměřením na datovou analytiku."
    },
    {
      year: "2025",
      title: (
        <>
          aimtec hackathon<br /><span>3. místo</span>
        </>
      ),
      description: "týmový projekt s reálným zadáním – stavěli jsme appku, která má lidem skutečně pomoct."
    },
    {
      year: "2025",
      title: (
        <>
          cambridge<br /><span>c1 advanced</span>
        </>
      ),
      description: "angličtinu používám denně – mluvím plynule a technická dokumentace mi nedělá problém."
    }
  ],
  
  contact: {
    heading: (
      <>
        máte nápad?<br /><span className="text-[#FF0000]">pojďme ho rozjet.</span>
      </>
    )
  }
};
