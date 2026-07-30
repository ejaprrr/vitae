/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Easing } from "framer-motion";
import { ScribbleTrigger } from "@/types/scribbles";

const customEase: Easing = [0.16, 1, 0.3, 1];

export function useScribbleAnimation(trigger: ScribbleTrigger, isHovered: boolean = false, delay: number = 0, isInView: boolean = false) {
  const isActive = trigger === "hover" ? isHovered : 
                   (trigger === "scroll" ? isInView : 
                   (trigger === "sequence1" || trigger === "sequence2" ? !isHovered : true));

  const [loopKey, setLoopKey] = useState(0);
  const wasActive = useRef(isActive);
  const lastInactiveTime = useRef(Date.now());

  useEffect(() => {
    const justActivated = isActive && !wasActive.current;
    const justDeactivated = !isActive && wasActive.current;
    const fullyRetracted = Date.now() - lastInactiveTime.current > 350;

    if (trigger === "hover") {
      if (justActivated && fullyRetracted) {
        setLoopKey(k => k + 1);
      }
    } else if (trigger === "loop" || trigger === "sequence1" || trigger === "sequence2") {
      if (justActivated) {
        setLoopKey(k => k + 1);
      }
    }
    
    if (justDeactivated) {
      lastInactiveTime.current = Date.now();
    }
    wasActive.current = isActive;
  }, [isActive, trigger]);

  const motionProps = useMemo(() => {
    if (trigger === "scroll") {
      return {
        initial: { strokeDashoffset: 120, opacity: 0 },
        animate: { strokeDashoffset: isActive ? 0 : 120, opacity: isActive ? 1 : 0 },
        transition: { duration: 1.5, ease: "easeInOut" as Easing, delay }
      };
    }
    
    if (trigger === "sequence1" || trigger === "sequence2") {
      if (!isActive) {
         return {
           initial: { strokeDashoffset: 120, opacity: 0 },
           animate: { strokeDashoffset: 120, opacity: 0 },
           transition: {
             duration: 0.4,
             ease: "easeIn" as Easing,
             opacity: { duration: 0.4, ease: "easeIn" as Easing }
           }
         };
      }
      
      if (trigger === "sequence1") {
        return {
          initial: { strokeDashoffset: 120, opacity: 0 },
          animate: { strokeDashoffset: [120, 0, 0, 120], opacity: [0, 1, 1, 0] },
          transition: {
            duration: 7,
            times: [0, 0.15, 0.85, 1],
            ease: [ customEase, "linear", "easeIn" ] as Easing[],
            delay: 0
          },
          onAnimationComplete: () => setLoopKey(k => k + 1)
        };
      } else {
        // sequence2
        return {
          initial: { strokeDashoffset: 120, opacity: 0 },
          animate: { strokeDashoffset: [120, 0, 0, 120], opacity: [0, 1, 1, 0] },
          transition: {
            duration: 4.9,
            times: [0, 0.2, 0.8, 1],
            ease: [ customEase, "linear", "easeIn" ] as Easing[],
            delay: 2.1
          },
          onAnimationComplete: () => setLoopKey(k => k + 1)
        };
      }
    }
    
    if (trigger === "loop") {
      if (!isActive) {
         return {
           initial: { strokeDashoffset: 120, opacity: 0 },
           animate: { strokeDashoffset: 120, opacity: 0 },
           transition: {
             duration: 0.4,
             ease: "easeIn" as Easing,
             opacity: { duration: 0.4, ease: "easeIn" as Easing }
           }
         };
      }
      return {
        initial: { strokeDashoffset: 120, opacity: 0 },
        animate: { strokeDashoffset: [120, 0, 0, 120, 120], opacity: [1, 1, 1, 0, 0] },
        transition: {
          duration: 7,
          times: [0, 0.15, 0.8, 0.9, 1],
          ease: [ customEase, "linear", "easeIn", "linear" ] as Easing[],
          delay
        },
        onAnimationComplete: () => setLoopKey(k => k + 1)
      };
    }
    
    // hover and static
    return {
      initial: trigger === "static" ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: 120, opacity: 0 },
      animate: { strokeDashoffset: isActive ? 0 : 120, opacity: isActive ? 1 : 0 },
      transition: {
        duration: isActive ? 0.3 : 0.4,
        ease: (isActive ? "easeOut" : "easeIn") as Easing,
        opacity: { duration: isActive ? 0.05 : 0.4, ease: (isActive ? "linear" : "easeIn") as Easing },
        delay: trigger === "static" ? delay : 0
      }
    };
  }, [trigger, isActive, delay]);

  return { loopKey, motionProps };
}
