"use client";

import { CTAButton } from "./CTAButton";
import { Scribble, ScribbleTarget } from "@/components/scribbles";
import { siteConfig } from "@/config/site";

export function ContactCTA() {
  return (
    <ScribbleTarget className="mb-2 lg:mb-6 w-max relative z-10 mt-8 md:mt-0" as="div">
      <CTAButton href={`mailto:${siteConfig.email}`} theme="light" className="text-lg sm:text-xl md:text-2xl px-8 py-4 md:px-10 md:py-5 relative z-10">
        {siteConfig.email}
      </CTAButton>
      <Scribble 
        type="circle"
        trigger="sequence2"
        className="absolute inset-0 text-[#FF0000] z-20 pointer-events-none"
      />
      <Scribble 
        type="arrow"
        trigger="sequence1"
        className="absolute top-1/2 -left-24 w-24 h-12 text-[#FF0000] -translate-y-1/2 hidden md:block pointer-events-none"
      />
    </ScribbleTarget>
  );
}
