"use client";

import { Scribble } from "@/components/ui/Scribble";
import { useGraceNavigation } from "@/hooks/useGraceNavigation";

interface Skill {
  name: string;
  url: string;
}

interface SkillBlockProps {
  category: string;
  skills: Skill[];
}

export function SkillCard({ category, skills }: SkillBlockProps) {
  const { navigateWithGrace, navigatingTo } = useGraceNavigation();

  const handleSkillClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    navigateWithGrace(e, url, true); // external link
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <span className="text-brand text-base md:text-lg">{category}</span>
      <div className="flex flex-col items-start gap-1">
        {skills.map((skill) => (
          <Scribble
            key={skill.name}
            as="a"
            href={skill.url}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleSkillClick(e, skill.url)}
            target="_blank"
            rel="noopener noreferrer"
            type="underline"
            trigger="hover"
            {...(navigatingTo === skill.url ? { isActive: true } : {})}
            className="block text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight transition-colors cursor-pointer px-2 -mx-2 relative w-max hover:text-black focus:outline-none"
            scribbleClassName="absolute -bottom-1 left-0 w-full h-4 text-brand pointer-events-none"
          >
            {skill.name}
          </Scribble>
        ))}
      </div>
    </div>
  );
}
