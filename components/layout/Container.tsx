import { ReactNode, ElementType } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}

export function Container({ children, className = "", as: Component = "div", id }: ContainerProps) {
  return (
    <Component 
      id={id}
      className={`w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto ${className}`}
    >
      {children}
    </Component>
  );
}
