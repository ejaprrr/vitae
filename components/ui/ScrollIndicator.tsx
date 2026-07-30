/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";
import { generateArrowDown } from "@/utils/pathGenerators";

export function ScrollIndicator() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [path, setPath] = useState("");

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setPath(generateArrowDown(32, 64));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
        window.location.href = "#about";
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
        <motion.svg 
          width="32" 
          height="64" 
          viewBox="0 0 32 64" 
          fill="none" 
          stroke={isTouchDevice && isClicked ? "#000000" : "#FF0000"} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="md:group-hover:stroke-black transition-colors duration-300 overflow-visible"
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, 0, 25], opacity: [1, 1, 0] }}
          transition={{ 
            duration: 4.5, 
            times: [0, 0.777, 1], // Hold for 3.5s, drop/fade for 1s
            ease: [ "linear", [0.76, 0, 0.24, 1] ], // First segment linear hold, second is the buttery drop
            repeat: Infinity 
          }}
          style={{ willChange: "opacity, transform" }}
        >
          {/* A highly organic, natural scribble. */}
          {path && (
            <motion.path 
              d={path}
              pathLength={1}
              animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [1, 1, 1, 0, 0] }}
              transition={{
                duration: 4.5, 
                times: [0, 0.666, 0.95, 0.96, 1],
                ease: [ [0.16, 1, 0.3, 1], "linear", "linear", "linear" ],
                repeat: Infinity
              }}
              style={{ willChange: "stroke-dashoffset" }}
            />
          )}
        </motion.svg>
      </MotionConfig>
    </a>
  );
}
