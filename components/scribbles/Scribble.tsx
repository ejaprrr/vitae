"use client";

import { useState, useRef } from "react";
import { m, useInView } from "framer-motion";
import { ScribbleProps } from "@/types/scribbles";
import { useScribblePath } from "@/hooks/scribbles/useScribblePath";
import { useScribbleAnimation } from "@/hooks/scribbles/useScribbleAnimation";

export function Scribble({ type, trigger = "hover", loops = 2, className = "", scribbleClassName = "", delay = 0, children, as: Component = "span", isActive: externalIsActive, ...rest }: ScribbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  
  const effectiveIsHovered = externalIsActive !== undefined ? externalIsActive : isHovered;
  const { loopKey, motionProps } = useScribbleAnimation(trigger, effectiveIsHovered, delay, isInView);
  const { ref, dims, path } = useScribblePath(type, loops, loopKey);

  const svgContent = (
    <m.svg 
      viewBox={`0 0 ${dims.w} ${dims.h}`} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-full h-full overflow-visible"
    >
      <m.path 
        key={loopKey}
        d={path} 
        pathLength="100" 
        style={{ strokeDasharray: "100 120", willChange: "stroke-dashoffset, opacity" }}
        {...motionProps}
      />
    </m.svg>
  );

  // If children are provided, this Scribble automatically acts as a transparent wrapper
  if (children) {
    return (
      <Component 
        ref={containerRef as React.Ref<HTMLElement>}
        className={className} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
        onTouchCancel={() => setIsHovered(false)}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          setIsHovered(false);
          if (rest.onClick) rest.onClick(e);
        }}
        {...rest}
      >
        {children}
        <span 
          ref={ref as React.RefObject<HTMLSpanElement>} 
          className={`block ${scribbleClassName || "absolute inset-0 -z-10 pointer-events-none"}`}
        >
          {dims.w > 0 && dims.h > 0 && path && svgContent}
        </span>
      </Component>
    );
  }

  // Pure SVG render
  return (
    <span 
      ref={(node) => {
        // Assign both refs (ResizeObserver needs ref, useInView needs containerRef)
        if (typeof ref === 'function') {
          // React doesn't use function refs here, it's a MutableRefObject
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }
        (containerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }} 
      className={`pointer-events-none block ${className}`}
    >
      {dims.w > 0 && dims.h > 0 && path && svgContent}
    </span>
  );
}
