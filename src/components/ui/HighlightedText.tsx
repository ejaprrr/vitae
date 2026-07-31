"use client";

import { Scribble } from "@/components/ui/Scribble";
import type { ScribbleTrigger, ScribbleType } from "@/types/scribbles";
import type { ElementType, ReactNode } from "react";

interface HighlightedTextProps {
  children: ReactNode;
  type?: ScribbleType;
  trigger?: ScribbleTrigger;
  loops?: number;
  delay?: number;
  className?: string;
  scribbleClassName?: string;
  as?: ElementType;
}

export function HighlightedText({
  children,
  type = "underline",
  trigger = "scroll",
  loops = 2,
  delay,
  className = "relative inline-block z-10 px-1 py-1 -mx-1 -my-1 text-black font-medium",
  scribbleClassName = "absolute -bottom-1 left-0 w-full h-3 text-brand -z-10",
  as: Component = "span",
}: HighlightedTextProps) {
  return (
    <Component className={className}>
      {children}
      <Scribble
        type={type}
        trigger={trigger}
        loops={loops}
        delay={delay}
        className={scribbleClassName}
      />
    </Component>
  );
}
