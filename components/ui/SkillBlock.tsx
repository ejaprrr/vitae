import { ScribbleTarget, Scribble } from "@/components/scribbles";

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
      <span className="text-[#FF0000] text-base md:text-lg">{category}</span>
      <div className="flex flex-col items-start gap-1">
        {skills.map((skill) => (
          <ScribbleTarget 
            key={skill.name} 
            as="a"
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight inline-block transition-colors cursor-pointer px-2 -mx-2 relative hover:text-black focus:outline-none"
          >
            {skill.name}
            <Scribble 
              type="underline" 
              trigger="target" 
              className="absolute -bottom-1 left-0 w-full h-4 text-[#FF0000]" 
            />
          </ScribbleTarget>
        ))}
      </div>
    </div>
  );
}
