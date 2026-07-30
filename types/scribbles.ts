import { ReactNode, ElementType, AllHTMLAttributes } from "react";

export type ScribbleType = "underline" | "circle" | "arrowUp" | "arrowDown" | "arrowLeft" | "arrowRight";
export type ScribbleTrigger = "hover" | "scroll" | "static" | "loop" | "sequence1" | "sequence2";

export interface ScribbleProps extends Omit<AllHTMLAttributes<HTMLElement>, "as" | "type"> {
  type: ScribbleType;
  trigger?: ScribbleTrigger;
  loops?: number;
  className?: string;
  scribbleClassName?: string;
  delay?: number;
  children?: ReactNode;
  as?: ElementType;
  isActive?: boolean;
}

