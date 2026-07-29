export type ScribbleType = "underline" | "circle" | "arrow" | "arrowDown";
export type ScribbleTrigger = "target" | "scroll" | "static" | "sequence1" | "sequence2";

export interface ScribbleProps {
  type: ScribbleType;
  trigger?: ScribbleTrigger;
  loops?: number;
  className?: string;
}

export interface ScribbleContextType {
  isActive: boolean;
}
