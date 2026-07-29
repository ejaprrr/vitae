"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, type ReactNode } from "react";

export interface ScribbleGroupContextType {
  activeId: string | null;
  register: (id: string) => () => void;
  activate: (id: string) => void;
  deactivate: (id: string) => void;
}

export const ScribbleGroupContext = createContext<ScribbleGroupContextType | null>(null);

export function useScribbleGroup() {
  return useContext(ScribbleGroupContext);
}

export interface ScribbleGroupProps {
  children: ReactNode;
  /** How long each scribble stays visible (ms) */
  holdDuration?: number;
  /** Gap between scribbles (ms) */
  gapDuration?: number;
  /** Optional wrapper className */
  className?: string;
}

export function ScribbleGroup({ 
  children, 
  holdDuration = 2000, 
  gapDuration = 600, 
  className 
}: ScribbleGroupProps) {
  const [members, setMembers] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const isManualRef = useRef(false);
  const lastActiveRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const register = useCallback((id: string) => {
    setMembers(prev => prev.includes(id) ? prev : [...prev, id]);
    return () => setMembers(prev => prev.filter(m => m !== id));
  }, []);

  const activate = useCallback((id: string) => {
    // Manual mode (user interaction)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    isManualRef.current = true;
    setActiveId(id);
  }, []);

  const deactivate = useCallback((id: string) => {
    // Only retract if the calling element is still the active one!
    // This prevents race conditions when hovering directly from element A to element B
    setActiveId(prevId => {
      if (prevId === id) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          isManualRef.current = false;
        }, 1200);
        return null;
      }
      return prevId;
    });
  }, []);

  // Auto-cycle (standby mode)
  useEffect(() => {
    if (members.length === 0) return;
    
    let timeout: NodeJS.Timeout;
    let showing = false;
    
    const cycle = () => {
      if (isManualRef.current) {
        // In manual mode, check again later
        timeout = setTimeout(cycle, 500);
        return;
      }
      
      if (showing) {
        // Currently showing → retract
        setActiveId(null);
        showing = false;
        timeout = setTimeout(cycle, gapDuration);
      } else {
        // Pick next random member (avoid repeating if possible)
        const available = members.filter(id => id !== lastActiveRef.current);
        const next = available.length > 0 
          ? available[Math.floor(Math.random() * available.length)] 
          : members[0];
          
        lastActiveRef.current = next;
        setActiveId(next);
        showing = true;
        timeout = setTimeout(cycle, holdDuration);
      }
    };
    
    // Start after a random initial delay to desync multiple groups
    timeout = setTimeout(cycle, Math.random() * 1500 + 500);
    
    return () => clearTimeout(timeout);
  }, [members, holdDuration, gapDuration]);

  // Cleanup pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const contextValue = useMemo(() => ({ activeId, register, activate, deactivate }), [activeId, register, activate, deactivate]);

  const content = (
    <ScribbleGroupContext.Provider value={contextValue}>
      {children}
    </ScribbleGroupContext.Provider>
  );

  return className ? <div className={className}>{content}</div> : content;
}
