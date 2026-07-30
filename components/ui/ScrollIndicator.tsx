/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { m, MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScribblePath } from "@/hooks/scribbles/useScribblePath";

export function ScrollIndicator() {
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [loopKey, setLoopKey] = useState(0);
  
  // Use the new headless hook! It handles resizing and generates the path
  const { ref, path } = useScribblePath('arrowDown', 2, loopKey);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
        router.push("#about");
      }, 300); // 300ms visual grace period
    }
  };

  return (
    <a 
      href="#about"
      onClick={handleClick}
      className="flex flex-col items-center justify-center p-4 group touch-manipulation cursor-pointer block [-webkit-tap-highlight-color:transparent]"
      aria-label="Scroll to about section"
    >
      <MotionConfig reducedMotion="never">
        <m.svg 
          ref={ref as unknown as React.RefObject<SVGSVGElement>}
          key={loopKey}
          width="32" 
          height="64" 
          viewBox="0 0 32 64" 
          fill="none" 
          stroke={isTouchDevice && isClicked ? "#000000" : "var(--brand)"} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="md:group-hover:stroke-black transition-colors duration-300 overflow-visible"
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, 0, 25], opacity: [1, 1, 0] }}
          transition={{ 
            duration: 4.5, 
            times: [0, 0.777, 1], // Hold for 3.5s, drop/fade for 1s
            ease: [ "linear", [0.76, 0, 0.24, 1] ]
          }}
          onAnimationComplete={() => setLoopKey(k => k + 1)}
          style={{ willChange: "opacity, transform" }}
        >
          {/* A highly organic, natural scribble. */}
          {path && (
            <m.path 
              d={path}
              pathLength={1}
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [1, 1, 1, 0, 0] }}
              transition={{
                duration: 4.5, 
                times: [0, 0.666, 0.95, 0.96, 1],
                ease: [ [0.16, 1, 0.3, 1], "linear", "linear", "linear" ]
              }}
              style={{ willChange: "stroke-dashoffset" }}
            />
          )}
        </m.svg>
      </MotionConfig>
    </a>
  );
}
