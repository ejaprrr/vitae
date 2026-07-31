"use client";

import { RevealStagger } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { useGraceNavigation } from "@/hooks/useGraceNavigation";
import { useState } from "react";

interface ExperienceItemProps {
  year: string;
  title: string;
  role: string;
  location: React.ReactNode;
  description: React.ReactNode;
  url?: string;
  delay?: number;
}

export function ExperienceItem({
  delay,
  year,
  title,
  role,
  location,
  description,
  url,
}: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigateWithGrace, navigatingTo } = useGraceNavigation();

  const isLink = !!url;
  const isClicked = url ? navigatingTo === url : false;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isLink || !url) return;
    navigateWithGrace(e, url, true);
  };

  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer", onClick: handleClick }
    : {};

  return (
    <RevealStagger delay={delay}>
      <Wrapper
        {...wrapperProps}
        className={`group grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 text-body transition-all duration-300 relative ${
          url ? "cursor-pointer hover:bg-white/5 p-4 md:p-6 -m-4 md:-m-6" : "cursor-default"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {url && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none w-6 h-6 transition-all duration-300 opacity-100 translate-x-0 lg:opacity-0 lg:-translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
            <Scribble
              type="arrowRight"
              trigger="hover"
              loops={2}
              isActive={isHovered || isClicked}
              className="w-full h-full text-white -rotate-45"
            />
          </div>
        )}
        <div className="md:col-span-2 text-brand mb-1 md:mb-0">{year}</div>
        <div className="md:col-span-4 mb-4 md:mb-0">
          <Scribble
            as="h3"
            type="underline"
            trigger="hover"
            loops={2}
            isActive={isHovered || isClicked}
            className="block text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2 relative w-max"
            scribbleClassName="absolute -bottom-1 -left-2 w-[calc(100%+16px)] h-3 text-brand"
          >
            {title}
          </Scribble>
          <span>{role}</span>
        </div>
        <div className="md:col-span-2 mb-4 md:mb-0">{location}</div>
        <div className="md:col-span-4 text-white/90 flex flex-col justify-between pr-10 md:pr-12">
          <span>{description}</span>
        </div>
      </Wrapper>
    </RevealStagger>
  );
}
