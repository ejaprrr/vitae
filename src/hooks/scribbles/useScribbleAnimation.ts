"use client";

import type { ScribbleTrigger } from "@/types/scribbles";
import type { Easing } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const customEase: Easing = [0.16, 1, 0.3, 1];

export function useScribbleAnimation(
  trigger: ScribbleTrigger,
  isHovered = false,
  delay = 0,
  isInView = false
) {
  const isActive =
    trigger === "hover"
      ? isHovered
      : trigger === "scroll" || trigger === "loop"
        ? isInView
        : trigger === "sequence1" || trigger === "sequence2"
          ? !isHovered
          : true;

  const [loopKey, setLoopKey] = useState(0);
  const wasActive = useRef(isActive);
  const lastInactiveTime = useRef(Date.now());

  useEffect(() => {
    const justActivated = isActive && !wasActive.current;
    const justDeactivated = !isActive && wasActive.current;
    const fullyRetracted = Date.now() - lastInactiveTime.current > 350;

    if (trigger === "hover" || trigger === "scroll") {
      if (justActivated && fullyRetracted) {
        setLoopKey((k) => k + 1);
      }
    } else if (trigger === "loop" || trigger === "sequence1" || trigger === "sequence2") {
      if (justActivated) {
        setLoopKey((k) => k + 1);
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
        transition: {
          duration: isActive ? 0.3 : 0.4,
          ease: (isActive ? "easeOut" : "easeIn") as Easing,
          delay: isActive ? delay : 0,
          opacity: {
            duration: isActive ? 0.01 : 0.4,
            ease: (isActive ? "linear" : "easeIn") as Easing,
          },
        },
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
            opacity: { duration: 0.4, ease: "easeIn" as Easing },
          },
        };
      }

      if (trigger === "sequence1") {
        return {
          initial: { strokeDashoffset: 120, opacity: 0 },
          animate: { strokeDashoffset: [120, 0, 0, 120], opacity: [1, 1, 1, 0] },
          transition: {
            duration: 7,
            times: [0, 0.15, 0.85, 1],
            ease: [customEase, "linear", "easeIn"] as Easing[],
            delay: 0,
          },
          onAnimationComplete: () => setLoopKey((k) => k + 1),
        };
      }
      // sekvence 2
      return {
        initial: { strokeDashoffset: 120, opacity: 0 },
        animate: { strokeDashoffset: [120, 0, 0, 120], opacity: [1, 1, 1, 0] },
        transition: {
          duration: 4.9,
          times: [0, 0.2, 0.8, 1],
          ease: [customEase, "linear", "easeIn"] as Easing[],
          delay: 2.1,
        },
        onAnimationComplete: () => setLoopKey((k) => k + 1),
      };
    }

    if (trigger === "loop") {
      if (!isActive) {
        return {
          initial: { strokeDashoffset: 120, opacity: 0 },
          animate: { strokeDashoffset: 120, opacity: 0 },
          transition: {
            duration: 0.4,
            ease: "easeIn" as Easing,
            opacity: { duration: 0.4, ease: "easeIn" as Easing },
          },
        };
      }
      return {
        initial: { strokeDashoffset: 120, opacity: 0 },
        animate: { strokeDashoffset: [120, 0, 0, 120, 120], opacity: [1, 1, 1, 0, 0] },
        transition: {
          duration: 7,
          times: [0, 0.15, 0.8, 0.9, 1],
          ease: [customEase, "linear", "easeIn", "linear"] as Easing[],
          delay,
        },
        onAnimationComplete: () => setLoopKey((k) => k + 1),
      };
    }

    // hover a staticky stav
    return {
      initial:
        trigger === "static"
          ? { strokeDashoffset: 0, opacity: 1 }
          : { strokeDashoffset: 120, opacity: 0 },
      animate: { strokeDashoffset: isActive ? 0 : 120, opacity: isActive ? 1 : 0 },
      transition: {
        duration: isActive ? 0.3 : 0.4,
        ease: (isActive ? "easeOut" : "easeIn") as Easing,
        opacity: {
          duration: isActive ? 0.01 : 0.4,
          ease: (isActive ? "linear" : "easeIn") as Easing,
        },
        delay: trigger === "static" ? delay : 0,
      },
    };
  }, [trigger, isActive, delay]);

  return { loopKey, motionProps };
}
