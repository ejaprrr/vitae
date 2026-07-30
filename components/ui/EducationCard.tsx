/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { Scribble } from "@/components/scribbles";
import { RevealStagger } from "@/components/ui/Reveal";

interface EducationCardProps {
  year: string;
  title: React.ReactNode;
  description: string;
  url?: string;
  delay?: number;
}

export function EducationCard({ year, title, description, url, delay = 0 }: EducationCardProps) {
  const isLink = !!url;
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLink || !url) return;
    if (isTouchDevice) {
      e.preventDefault();
      setTimeout(() => {
        window.open(url, "_blank");
      }, 400); // 400ms visual grace period to see the scribble
    }
  };
  
  return (
    <RevealStagger delay={delay}>
      <Scribble
        as={isLink ? "a" : "div"}
        href={isLink ? url : undefined}
        target={isLink ? "_blank" : undefined}
        rel={isLink ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className={`bg-black text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] relative ${isLink ? "cursor-pointer group" : "cursor-default"}`}
        type="circle" 
        trigger="hover" 
        scribbleClassName="absolute -inset-2 md:-inset-4 text-brand z-20 pointer-events-none" 
      >
        {/* Hover Panel */}
        <div className="absolute inset-0 z-10 flex flex-col p-6 sm:p-8 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-2xl sm:text-3xl leading-[1.1] lowercase tracking-tight mb-3 text-white">{title}</h3>
          <p className="text-body text-white/80">{description}</p>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-brand text-lg font-medium">{year}</span>
          {isLink && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-white transition-colors"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
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
