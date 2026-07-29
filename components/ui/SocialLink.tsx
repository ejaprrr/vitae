import { ScribbleTarget, Scribble } from "@/components/scribbles";

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SocialLink({ href, children }: SocialLinkProps) {
  return (
    <ScribbleTarget 
      as="a" 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="md:hover:text-[#FF0000] active:text-[#FF0000] transition-colors relative group w-max"
    >
      {children}
      <Scribble 
        type="underline" 
        trigger="target" 
        className="absolute -bottom-1 left-0 w-full h-3 text-[#FF0000]" 
      />
    </ScribbleTarget>
  );
}
