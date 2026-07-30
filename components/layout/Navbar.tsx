"use client";

import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black">
      <Container className="flex justify-between items-center py-2 sm:py-3 text-xs sm:text-sm md:text-base lowercase">
        <AnimatedLink href="#top" type="circle" className="text-lg sm:text-2xl font-normal tracking-tight">
          {siteConfig.shortName}
        </AnimatedLink>
        <div className="flex gap-1 sm:gap-2 md:gap-4">
          {siteConfig.nav.map((item, index) => (
            <AnimatedLink key={index} href={item.href}>{item.label}</AnimatedLink>
          ))}
        </div>
      </Container>
    </nav>
  );
}
