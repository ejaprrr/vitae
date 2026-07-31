export interface SkillItem {
  name: string;
  url: string;
}

export interface SkillCategory {
  key: "programming" | "web" | "database" | "design";
  items: SkillItem[];
}

export const skillsConfig: SkillCategory[] = [
  {
    key: "programming",
    items: [
      { name: "typescript", url: "https://www.typescriptlang.org/" },
      { name: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "python", url: "https://www.python.org/" },
      { name: "c#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
      { name: "php", url: "https://www.php.net/" },
    ],
  },
  {
    key: "web",
    items: [
      { name: "react", url: "https://react.dev/" },
      { name: "next.js", url: "https://nextjs.org/" },
      { name: "svelte", url: "https://svelte.dev/" },
      { name: "tailwind", url: "https://tailwindcss.com/" },
      { name: "express", url: "https://expressjs.com/" },
    ],
  },
  {
    key: "database",
    items: [
      { name: "mongodb", url: "https://www.mongodb.com/" },
      { name: "postgresql", url: "https://www.postgresql.org/" },
      { name: "redis", url: "https://redis.io/" },
      { name: "docker", url: "https://www.docker.com/" },
      { name: "git", url: "https://git-scm.com/" },
    ],
  },
  {
    key: "design",
    items: [
      { name: "figma", url: "https://www.figma.com/" },
      { name: "photoshop", url: "https://www.adobe.com/products/photoshop.html" },
      { name: "blender", url: "https://www.blender.org/" },
      { name: "after effects", url: "https://www.adobe.com/products/aftereffects.html" },
      { name: "davinci resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
    ],
  },
];
