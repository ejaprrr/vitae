"use client";

import { useState } from "react";
import { Scribble } from "@/components/scribbles";
import { RevealStagger } from "@/components/ui/Reveal";

interface ExperienceItemProps {
  year: string;
  title: string;
  role: string;
  location: React.ReactNode;
  description: string;
  delay?: number;
}

export function ExperienceItem({ delay, year, title, role, location, description }: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RevealStagger delay={delay}>
      <div 
        className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 text-body cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="md:col-span-2 text-brand mb-1 md:mb-0">{year}</div>
        <div className="md:col-span-4 mb-4 md:mb-0">
          <Scribble 
            type="underline" 
            trigger="hover" 
            loops={2}
            isActive={isHovered} 
            className="block text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2 relative w-max"
            scribbleClassName="absolute -bottom-1 -left-2 w-[calc(100%+16px)] h-3 text-brand"
          >
            {title}
          </Scribble>
          <span>{role}</span>
        </div>
        <div className="md:col-span-2 mb-4 md:mb-0">
          {location}
        </div>
        <div className="md:col-span-4 text-white/90">
          {description}
        </div>
      </div>
    </RevealStagger>
  );
}
