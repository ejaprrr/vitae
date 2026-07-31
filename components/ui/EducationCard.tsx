"use client";

import { RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { useGraceNavigation } from "@/hooks/useGraceNavigation";

import { useState } from "react";

interface EducationCardProps {
  year: string;
  title: React.ReactNode;
  description: string;
  url?: string;
  delay?: number;
}

export function EducationCard({ year, title, description, url, delay = 0 }: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLink = !!url;
  const { navigateWithGrace, navigatingTo } = useGraceNavigation();
  const isClicked = url ? navigatingTo === url : false;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLink || !url) return;
    navigateWithGrace(e, url, true); // true for external link
  };

  return (
    <RevealStagger delay={delay} className="h-full">
      <Scribble
        as={isLink ? "a" : "div"}
        href={isLink ? url : undefined}
        target={isLink ? "_blank" : undefined}
        rel={isLink ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-black text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] h-full relative ${isLink ? "cursor-pointer group hover:bg-neutral-900 transition-colors" : "cursor-default"}`}
        type="circle"
        trigger="hover"
        isActive={isHovered || isClicked}
        scribbleClassName="absolute -inset-2 md:-inset-4 text-brand z-20 pointer-events-none"
      >
        <div className="flex justify-between items-start">
          <span className="text-brand text-lg font-medium">{year}</span>
          {isLink && (
            <div className="w-6 h-6 transition-all duration-300 opacity-100 translate-x-0 lg:opacity-0 lg:-translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
              <Scribble
                type="arrowRight"
                trigger="hover"
                loops={2}
                isActive={isHovered || isClicked}
                className="w-full h-full text-white -rotate-45"
              />
            </div>
          )}
        </div>
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4 tracking-tight transition-colors relative inline-block w-max">
            {title}
          </h3>
          <p className="text-body text-white/80 group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
      </Scribble>
    </RevealStagger>
  );
}
