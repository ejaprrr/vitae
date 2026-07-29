import { ScribbleTarget, Scribble } from "@/components/scribbles";
import { RevealStagger } from "@/components/Reveal";

interface EducationCardProps {
  year: string;
  title: React.ReactNode;
  description: string;
  delay?: number;
}

export function EducationCard({ year, title, description, delay = 0 }: EducationCardProps) {
  return (
    <RevealStagger delay={delay}>
      <ScribbleTarget 
        as="div" 
        className="bg-black text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] cursor-default relative"
      >
        <Scribble 
          type="circle" 
          trigger="target" 
          className="absolute -inset-2 md:-inset-4 text-[#FF0000] z-20 pointer-events-none" 
        />
        <div>
          <span className="text-[#FF0000] text-lg font-medium">{year}</span>
        </div>
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4 tracking-tight transition-colors relative inline-block w-max">
            {title}
          </h3>
          <p className="leading-[1.4] text-base md:text-lg lg:text-xl lowercase">
            {description}
          </p>
        </div>
      </ScribbleTarget>
    </RevealStagger>
  );
}
