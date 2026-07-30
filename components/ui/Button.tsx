"use client";

import { m, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useGraceNavigation } from "@/hooks/useGraceNavigation";
import { siteConfig } from "@/config/site";

interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  theme?: "dark" | "light";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Button({ href, children = "click me", theme = "dark", className = "", onClick }: ButtonProps) {
  const [hoverAngle, setHoverAngle] = useState(-3);
  const { navigateWithGrace, isTouchDevice, navigatingTo } = useGraceNavigation();
  const isClicked = navigatingTo === href;

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href) {
      navigateWithGrace(e, href);
    }
  };

  return (
    <MotionConfig reducedMotion="never">
      <m.a
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
      </m.a>
    </MotionConfig>
  );
}
