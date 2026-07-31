"use client";

import { useScribblePath } from "@/hooks/scribbles/useScribblePath";
import { useRouter } from "@/i18n/routing";
import { MotionConfig, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  direction: "up" | "down";
  target: string;
}

export function ScrollIndicator({ direction, target }: ScrollIndicatorProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [loopKey, setLoopKey] = useState(0);

  const { ref, path } = useScribblePath(direction === "down" ? "arrowDown" : "arrowUp", 2, loopKey);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
        if (target.startsWith("#")) {
          // Native smooth scroll for hash links if possible, else router push
          if (target === "#top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push(target as any);
          }
        } else {
          router.push(target as any);
        }
      }, 300);
    } else {
      if (target === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const ariaLabel = direction === "down" ? t("global.scrollToAbout") : t("global.scrollToTop");
  const yAnim = direction === "down" ? 25 : -25;

  return (
    <a
      href={target}
      onClick={handleClick}
      className="flex flex-col items-center justify-center p-4 group touch-manipulation cursor-pointer block [-webkit-tap-highlight-color:transparent]"
      aria-label={ariaLabel}
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
          animate={{ y: [0, 0, yAnim], opacity: [1, 1, 0] }}
          transition={{
            duration: 4.5,
            times: [0, 0.777, 1], // Hold for 3.5s, drop/fade for 1s
            ease: ["linear", [0.76, 0, 0.24, 1]],
          }}
          onAnimationComplete={() => setLoopKey((k) => k + 1)}
          style={{ willChange: "opacity, transform" }}
        >
          {path && (
            <m.path
              d={path}
              pathLength={1}
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [1, 1, 1, 0, 0] }}
              transition={{
                duration: 4.5,
                times: [0, 0.666, 0.95, 0.96, 1],
                ease: [[0.16, 1, 0.3, 1], "linear", "linear", "linear"],
              }}
              style={{ willChange: "stroke-dashoffset" }}
            />
          )}
        </m.svg>
      </MotionConfig>
    </a>
  );
}
