/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useGraceNavigation(delayMs: number = 400) {
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const navigateWithGrace = useCallback(
    (e: React.MouseEvent | React.TouchEvent, href?: string, external: boolean = false) => {
      if (!href) return;
      
      // Prevent default browser/Link routing so we can control the flow
      e.preventDefault();
      
      // If it's a touch device, add the grace delay for animations
      if (isTouchDevice) {
        setNavigatingTo(href);
        setTimeout(() => {
          setNavigatingTo(null);
          if (external) {
            window.open(href, '_blank');
          } else if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              router.push(href);
            }
          } else {
            router.push(href);
          }
        }, delayMs);
        return;
      }
      
      // Desktop behavior: instant navigation, but with smooth scroll support
      if (external) {
        window.open(href, '_blank');
      } else if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push(href);
        }
      } else {
        router.push(href);
      }
    },
    [isTouchDevice, router, delayMs]
  );

  return { navigateWithGrace, isTouchDevice, navigatingTo };
}
