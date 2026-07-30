/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ScribbleType } from "@/types/scribbles";
import { generateUnderline, generateCircle, generateArrowDirectional } from "@/lib/scribbles/generators";

export function useScribblePath(type: ScribbleType | null, loops: number = 2, loopKey: number = 0) {
  const ref = useRef<HTMLElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [path, setPath] = useState("");

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    let timeoutId: NodeJS.Timeout;
    
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        for (const entry of entries) {
          setDims(prev => {
            const newW = Math.round(entry.contentRect.width);
            const newH = Math.round(entry.contentRect.height);
            if (Math.abs(prev.w - newW) > 2 || Math.abs(prev.h - newH) > 2) {
              return { w: newW, h: newH };
            }
            return prev;
          });
        }
      }, 50);
    });
    
    resizeObserver.observe(element);
    
    const rect = element.getBoundingClientRect();
    setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
    
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useLayoutEffect(() => {
    if (dims.w === 0 || dims.h === 0 || !type) return;
    
    if (type === "underline") setPath(generateUnderline(dims.w, dims.h, loops));
    else if (type === "circle") setPath(generateCircle(dims.w, dims.h, loops));
    else if (type === "arrowUp") setPath(generateArrowDirectional(dims.w, dims.h, 'up'));
    else if (type === "arrowDown") setPath(generateArrowDirectional(dims.w, dims.h, 'down'));
    else if (type === "arrowLeft") setPath(generateArrowDirectional(dims.w, dims.h, 'left'));
    else if (type === "arrowRight") setPath(generateArrowDirectional(dims.w, dims.h, 'right'));
  }, [dims.w, dims.h, type, loops, loopKey]);

  return { ref, dims, path };
}
