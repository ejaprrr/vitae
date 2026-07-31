"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useGraceNavigation(delayMs = 400) {
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const navigateWithGrace = useCallback(
    (e: React.MouseEvent | React.TouchEvent, href?: string, external = false) => {
      if (!href) return;

      // zamezeni vychoziho chovani prohlizece/linku, abychom meli plnou kontrolu nad navigaci
      e.preventDefault();

      // na dotykovych zarizenich pridame zpozdeni, aby dobehla animace
      if (isTouchDevice) {
        setNavigatingTo(href);
        setTimeout(() => {
          setNavigatingTo(null);
          if (external) {
            window.open(href, "_blank");
          } else if (href.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            } else {
              router.push(href);
            }
          } else {
            router.push(href);
          }
        }, delayMs);
        return;
      }

      // na desktopu se navigujeme hned, ale podporujeme plynule scrolovani
      if (external) {
        window.open(href, "_blank");
      } else if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
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
