/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScribble } from "./ScribbleTarget";
import { ScribbleProps, ScribbleTrigger } from "@/types/scribbles";
import { generateUnderline, generateCircle, generateArrow, generateArrowDown } from "@/utils/pathGenerators";

function useScribbleDimensions() {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDims(prev => {
          const newW = Math.round(entry.contentRect.width);
          const newH = Math.round(entry.contentRect.height);
          // Only update if dimensions changed significantly
          if (Math.abs(prev.w - newW) > 2 || Math.abs(prev.h - newH) > 2) {
            return { w: newW, h: newH };
          }
          return prev;
        });
      }
    });
    
    resizeObserver.observe(element);
    
    // Initial read
    const rect = element.getBoundingClientRect();
    setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
    
    return () => resizeObserver.disconnect();
  }, []);

  return { ref, dims };
}

function getSequenceAnimation(trigger: ScribbleTrigger, isPaused = false) {
  if (isPaused) {
    return {
      transition: { duration: 0.4, ease: "easeIn" as const },
      animate: { pathLength: 0, opacity: 0 }
    };
  }
  if (trigger === "sequence1") {
    return {
      transition: {
        duration: 5,
        times: [0, 0.3, 0.85, 0.9, 1],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [ [0.16, 1, 0.3, 1] as any, "linear", "linear", "linear" ],
      },
      animate: {
        pathLength: [0, 1, 1, 0, 0],
        opacity: [1, 1, 1, 0, 0]
      }
    };
  }
  if (trigger === "sequence2") {
    return {
      transition: {
        duration: 5,
        times: [0, 0.15, 0.3, 0.85, 0.9, 1],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [ "linear", [0.16, 1, 0.3, 1] as any, "linear", "linear", "linear" ],
      },
      animate: {
        pathLength: [0, 0, 1, 1, 0, 0],
        opacity: [0, 1, 1, 1, 0, 0]
      }
    };
  }
  return { animate: {}, transition: {} };
}

/**
 * The universal Scribble component.
 * It strictly handles SVG generation and animations, relying on external state or triggers.
 */
export function Scribble({ type, trigger = "target", loops = 2, className = "" }: ScribbleProps) {
  const { ref, dims } = useScribbleDimensions();
  const scribbleContext = useScribble();
  const [path, setPath] = useState("");

  // Determine active state based on trigger
  let isActive = false;
  if (trigger === "target" || trigger.startsWith("sequence")) {
    isActive = scribbleContext?.isActive ?? false;
  } else if (trigger === "static") {
    isActive = true;
  }

  const wasActive = useRef(isActive);
  const lastInactiveTime = useRef(Date.now());

  const [loopKey, setLoopKey] = useState(0);
  const lastLoopKey = useRef(-1);

  // Generate SVG path when dimensions change, or when it becomes active.
  useLayoutEffect(() => {
    if (dims.w === 0 || dims.h === 0) return;
    
    const justActivated = isActive && !wasActive.current;
    const fullyRetracted = Date.now() - lastInactiveTime.current > 450;
    const isNewLoop = loopKey !== lastLoopKey.current;
    
    if (path === "" || (justActivated && fullyRetracted) || isNewLoop) {
      if (type === "underline") setPath(generateUnderline(dims.w, dims.h, loops));
      else if (type === "circle") setPath(generateCircle(dims.w, dims.h, loops));
      else if (type === "arrow") setPath(generateArrow(dims.w, dims.h));
      else if (type === "arrowDown") setPath(generateArrowDown(dims.w, dims.h));
      lastLoopKey.current = loopKey;
    }
    
    if (!isActive && wasActive.current) {
      lastInactiveTime.current = Date.now();
    }
    wasActive.current = isActive;
  }, [dims.w, dims.h, type, loops, isActive, path, loopKey]);

  if (dims.w === 0 || dims.h === 0 || !path) {
    return <span ref={ref} className={`pointer-events-none block ${className}`} />;
  }

  return (
    <span ref={ref} className={`pointer-events-none block ${className}`}>
      {trigger === "scroll" || trigger.startsWith("sequence") ? (
        <motion.svg viewBox={`0 0 ${dims.w} ${dims.h}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full overflow-visible">
           {trigger === "scroll" ? (
              <motion.path 
                key={loopKey}
                d={path} 
                pathLength="100" 
                initial={{ strokeDashoffset: 120, opacity: 1 }}
                whileInView={{ 
                  strokeDashoffset: [120, 0, 0, 120],
                  opacity: [1, 1, 1, 0]
                }}
                onViewportLeave={() => setLoopKey(k => k + 1)}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ 
                  duration: 2.5, 
                  times: [0, 0.25, 0.75, 1],
                  ease: "easeInOut", 
                  delay: 0.2 
                }}
                style={{ strokeDasharray: "100 120", willChange: "stroke-dashoffset, opacity" }} 
              />
            ) : (
              <motion.path 
                key={loopKey}
                d={path} 
                pathLength={1} 
                animate={getSequenceAnimation(trigger, isActive).animate} 
                transition={getSequenceAnimation(trigger, isActive).transition} 
                onAnimationComplete={() => {
                  if (isActive) return; // If isActive is true, it means it's paused, so don't loop
                  setLoopKey(k => k + 1);
                }}
                style={{ willChange: "stroke-dashoffset" }} 
              />
            )}
        </motion.svg>
      ) : (
        <svg viewBox={`0 0 ${dims.w} ${dims.h}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full overflow-visible">
          <path 
            d={path} 
            pathLength="100" 
            style={{
              strokeDasharray: "100 120",
              strokeDashoffset: isActive ? 0 : 120,
              opacity: isActive ? 1 : 0,
              transition: isActive 
                ? "stroke-dashoffset 300ms ease-out, opacity 50ms linear 0s"
                : "stroke-dashoffset 400ms ease-in, opacity 400ms ease-in"
            }}
          />
        </svg>
      )}
    </span>
  );
}
