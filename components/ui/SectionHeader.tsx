import { Reveal } from "@/components/Reveal";
import { Scribble } from "@/components/scribbles";

interface SectionHeaderProps {
  title: string;
  number: string;
  theme?: "light" | "dark"; // light = black text on white bg, dark = white text on black bg
}

export function SectionHeader({ title, number, theme = "light" }: SectionHeaderProps) {
  const borderColor = theme === "light" ? "border-black" : "border-white";
  
  return (
    <Reveal>
      <div className={`flex justify-between items-end border-b ${borderColor} pb-4 mb-12 sm:mb-16 md:mb-24`}>
        <h2 className="text-2xl md:text-4xl font-medium lowercase tracking-tight relative w-max group cursor-default">
          {title}
          <Scribble 
            type="underline" 
            trigger="scroll" 
            loops={2} 
            className="absolute -bottom-1 -left-2 w-[calc(100%+16px)] h-3 text-[#FF0000]" 
          />
        </h2>
        <span className="text-[#FF0000] text-xl md:text-2xl font-medium">{number}</span>
      </div>
    </Reveal>
  );
}
