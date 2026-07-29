"use client";

import { NavLink } from "@/components/NavLink";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black">
      <div className="w-full max-w-[1600px] mx-auto flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 py-2 sm:py-3 text-xs sm:text-sm md:text-base lowercase">
        <NavLink href="#top" type="circle" className="text-lg sm:text-2xl font-normal tracking-tight">
          {siteConfig.shortName}
        </NavLink>
        <div className="flex gap-1 sm:gap-2 md:gap-4">
          {siteConfig.nav.map((item, index) => (
            <NavLink key={index} href={item.href}>{item.label}</NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
