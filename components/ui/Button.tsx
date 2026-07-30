/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";

import { siteConfig } from "@/config/site";

interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  theme?: "dark" | "light";
  className?: string;
}

export function Button({ href = "#contact", children = siteConfig.contact.cta, theme = "dark", className = "" }: ButtonProps) {
  const [hoverAngle, setHoverAngle] = useState(-3);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Randomize angle on desktop hover
  const handleHoverStart = () => {
    if (isTouchDevice) return; 
    const sign = Math.random() > 0.5 ? 1 : -1;
    setHoverAngle(sign * (Math.random() * 4 + 2));
  };

  // Randomize angle on mobile tap
  const handleTouchStart = () => {
    if (!isTouchDevice) return;
    const sign = Math.random() > 0.5 ? 1 : -1;
    setHoverAngle(sign * (Math.random() * 4 + 2));
  };

  // Intercept the click to hold the visual state before navigating
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
        window.location.href = href;
      }, 400); // 400ms visual grace period
    }
  };

  return (
    <MotionConfig reducedMotion="never">
      <motion.a
        href={href}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        className={`${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'} px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lowercase font-medium block cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent] ${className}`}
        onHoverStart={handleHoverStart}
        animate={isTouchDevice && isClicked ? {
          scale: 0.95,
          backgroundColor: "#FF0000",
          color: "#000000",
          rotate: hoverAngle
        } : {}}
        whileHover={!isTouchDevice ? { 
          scale: 1.05, 
          backgroundColor: "#FF0000",
          color: "#000000",
          rotate: hoverAngle
        } : {}}
        whileTap={{ 
          scale: 0.95, 
          backgroundColor: "#FF0000",
          color: "#000000",
          rotate: isTouchDevice ? hoverAngle : hoverAngle * -0.5 
        }}
        transition={{ 
          type: "spring", stiffness: 400, damping: 17,
          backgroundColor: { type: "tween", duration: 0.15, ease: "linear" },
          color: { type: "tween", duration: 0.15, ease: "linear" }
        }}
      >
        {children}
      </motion.a>
    </MotionConfig>
  );
}
