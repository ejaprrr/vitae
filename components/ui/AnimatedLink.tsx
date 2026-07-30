"use client";

import React from "react";
import { Scribble, ScribbleTarget } from "@/components/scribbles";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
  type?: "underline" | "circle";
  onClick?: () => void;
  external?: boolean;
}

export function AnimatedLink({ 
  href, 
  children, 
  className = "", 
  disableAnimation = false, 
  type = "underline", 
  onClick,
  external = false
}: AnimatedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    
    // Smooth scroll for internal links
    if (!external && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (disableAnimation) {
    return (
      <a 
        href={href} 
        onClick={handleClick} 
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  // Base classes for NavLink style or SocialLink style depending on external
  const baseClasses = external 
    ? "md:hover:text-[#FF0000] active:text-[#FF0000] transition-colors relative group w-max"
    : "inline-block cursor-pointer px-2 sm:px-3 py-1 [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-200 md:hover:scale-105 active:scale-105 relative group";

  return (
    <ScribbleTarget 
      as="a" 
      href={href}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${className}`}
    >
      <span className={external ? "" : "block"}>
        {children}
      </span>
      {type === "underline" ? (
        <Scribble type="underline" trigger="target" className={`absolute left-0 w-full text-[#FF0000] ${external ? "-bottom-1 h-3" : "-bottom-2 h-4"}`} />
      ) : (
        <Scribble type="circle" trigger="target" className="absolute inset-0 text-[#FF0000]" />
      )}
    </ScribbleTarget>
  );
}
