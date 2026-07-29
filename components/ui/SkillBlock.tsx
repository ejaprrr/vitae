import { ScribbleTarget, Scribble } from "@/components/scribbles";

interface SkillBlockProps {
  category: string;
  skills: string[];
}

export function SkillBlock({ category, skills }: SkillBlockProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <span className="text-[#FF0000] text-base md:text-lg">{category}</span>
      <div className="flex flex-col items-start gap-1">
        {skills.map((skill) => (
          <ScribbleTarget 
            key={skill} 
            className="text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight inline-block transition-colors cursor-default px-2 -mx-2 relative"
          >
            {skill}
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
