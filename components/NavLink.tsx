"use client";

import React, { useState, useEffect } from "react";
import { Scribble, ScribbleTarget } from "@/components/scribbles";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
  type?: "underline" | "circle";
  onClick?: () => void;
}

export function NavLink({ href, children, className = "", disableAnimation = false, type = "underline", onClick }: NavLinkProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (disableAnimation) {
    return (
      <a 
        href={href} 
        onClick={handleClick} 
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <ScribbleTarget 
      as="a" 
      href={href}
      onClick={handleClick}
      className={`inline-block cursor-pointer px-2 sm:px-3 py-1 [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-200 md:hover:scale-105 active:scale-105 relative group ${className}`}
    >
      <span className="block">
        {children}
      </span>
      {type === "underline" ? (
        <Scribble type="underline" trigger="target" className="absolute -bottom-2 left-0 w-full h-4 text-[#FF0000]" />
      ) : (
        <Scribble type="circle" trigger="target" className="absolute inset-0 text-[#FF0000]" />
      )}
    </ScribbleTarget>
  );
}
