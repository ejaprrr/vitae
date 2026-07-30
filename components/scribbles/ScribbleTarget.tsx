"use client";

import { createContext, useContext, useEffect, useRef, useState, useId, useMemo, type ReactNode } from "react";
import { useScribbleGroup } from "./ScribbleGroup";

export interface ScribbleContextType {
  isActive: boolean;
}

export const ScribbleContext = createContext<ScribbleContextType | null>(null);

export function useScribble() {
  return useContext(ScribbleContext);
}

export interface ScribbleTargetProps extends Omit<React.AllHTMLAttributes<HTMLElement>, "as"> {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * ScribbleTarget wraps an interactive element (e.g., a link or a skill).
 * It detects hover and touch events and maintains the active state.
 * If placed inside a ScribbleGroup, it defers to the group's state for standby mode.
 */
export function ScribbleTarget({ children, className = "", as: Component = "span", ...rest }: ScribbleTargetProps) {
  const [isLocalActive, setIsLocalActive] = useState(false);
  
  const id = useId();
  const group = useScribbleGroup();
  
  const isTouchRef = useRef(false);
  const graceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastTouchTime = useRef(0);

  // Link to group if available
  const isActive = group ? group.activeId === id : isLocalActive;
  const registerFn = group?.register;
  const activateFn = group?.activate;
  const deactivateFn = group?.deactivate;

  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    if (registerFn) {
      return registerFn(id);
    }
  }, [registerFn, id]);

  const handleActivate = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e?.type.startsWith('mouse') && Date.now() - lastTouchTime.current < 500) return;
    if (graceTimer.current) clearTimeout(graceTimer.current);
    
    if (activateFn) activateFn(id);
    else setIsLocalActive(true);
  };

  const handleDeactivate = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e?.type.startsWith('touch')) lastTouchTime.current = Date.now();
    
    // Add a grace period for touch devices to allow the user to see the interaction
    const delay = isTouchRef.current ? 1000 : 0;
    
    if (delay === 0) {
      if (deactivateFn) deactivateFn(id);
      else setIsLocalActive(false);
    } else {
      graceTimer.current = setTimeout(() => {
        if (deactivateFn) deactivateFn(id);
        else setIsLocalActive(false);
      }, delay);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastTouchTime.current = Date.now();
    handleActivate(e);
  };

  return (
    <Component
      className={className}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleDeactivate}
      onTouchCancel={handleDeactivate}
      {...rest}
    >
      <ScribbleContext.Provider value={useMemo(() => ({ isActive }), [isActive])}>
        {children}
      </ScribbleContext.Provider>
    </Component>
  );
}
