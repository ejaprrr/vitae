import { ScribbleTarget, Scribble } from "@/components/scribbles";
import { RevealStagger } from "@/components/Reveal";

interface ExperienceItemProps {
  year: string;
  title: string;
  role: string;
  location: React.ReactNode;
  description: string;
  delay?: number;
}

export function ExperienceItem({ year, title, role, location, description, delay = 0 }: ExperienceItemProps) {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";

  return (
    <RevealStagger delay={delay}>
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 group ${txt}`}>
        <div className="md:col-span-2 text-[#FF0000] mb-1 md:mb-0">{year}</div>
        <div className="md:col-span-4 mb-4 md:mb-0">
          <ScribbleTarget className="block text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2 relative w-max cursor-default">
            {title}
            <Scribble 
              type="underline" 
              trigger="target" 
              loops={2} 
              className="absolute -bottom-1 -left-2 w-[calc(100%+16px)] h-3 text-[#FF0000]" 
            />
          </ScribbleTarget>
          <span>{role}</span>
        </div>
        <div className="md:col-span-2 mb-4 md:mb-0">
          {location}
        </div>
        <div className="md:col-span-4 transition-colors">
          {description}
        </div>
      </div>
    </RevealStagger>
  );
}
