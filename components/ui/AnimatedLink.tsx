"use client";

import React from "react";
import Link from "next/link";
import { Scribble } from "@/components/ui/Scribble";
import { useGraceNavigation } from "@/hooks/useGraceNavigation";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
  type?: "underline" | "circle";
  onClick?: () => void;
  external?: boolean;
  loops?: number;
}

export function AnimatedLink({ 
  href, 
  children, 
  className = "", 
  disableAnimation = false, 
  type = "underline", 
  onClick,
  external = false,
  loops = 1
}: AnimatedLinkProps) {
  const { navigateWithGrace, navigatingTo } = useGraceNavigation();
  const isClicked = navigatingTo === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    navigateWithGrace(e, href, external);
  };

  if (disableAnimation) {
    const Component = external ? "a" : Link;
    return (
      <Component 
        href={href} 
        onClick={handleClick} 
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Component>
    );
  }

  return (
    <Scribble
      as={external ? "a" : Link}
      href={href}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`relative group inline-block ${className}`}
      type={type}
      trigger="hover"
      loops={loops}
      {...(isClicked ? { isActive: true } : {})}
      scribbleClassName={type === "underline" ? `absolute left-0 w-full text-brand ${external ? "-bottom-1 h-3" : "-bottom-2 h-4"}` : "absolute inset-0 text-brand scale-[1.35]"}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </Scribble>
  );
}
