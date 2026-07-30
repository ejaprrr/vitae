import { Scribble } from "@/components/scribbles";

interface Skill {
  name: string;
  url: string;
}

interface SkillBlockProps {
  category: string;
  skills: Skill[];
}

export function SkillBlock({ category, skills }: SkillBlockProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <span className="text-brand text-base md:text-lg">{category}</span>
      <div className="flex flex-col items-start gap-1">
        {skills.map((skill) => (
          <Scribble 
            key={skill.name}
            as="a"
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            type="underline" 
            trigger="hover" 
            className="block text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight transition-colors cursor-pointer px-2 -mx-2 relative w-max hover:text-black focus:outline-none"
            scribbleClassName="absolute -bottom-1 left-0 w-full h-4 text-brand" 
          >
            {skill.name}
          </Scribble>
        ))}
      </div>
    </div>
  );
}
