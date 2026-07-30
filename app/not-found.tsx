import { Button } from "@/components/ui/Button";
import { Scribble } from "@/components/scribbles";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  return (
    <div className="w-full h-[100dvh] flex flex-col relative overflow-hidden">
      <main className="flex-1 flex flex-col justify-center items-center px-5 sm:px-8 text-center">
        <Reveal delay={0.1}>
          <h1 className="relative inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[1.05] lowercase tracking-tight mb-8 sm:mb-12 z-10">
            404
            <Scribble 
              type="underline" 
              trigger="static" 
              className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-6 text-brand -z-10" 
            />
          </h1>
        </Reveal>
        
        <Reveal delay={0.2}>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] lowercase mb-16 sm:mb-20 max-w-[800px] mx-auto">
            tady nic není. buď se stránka přesunula, nebo nikdy neexistovala.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="relative inline-block w-max mt-4">
            <Button href="/" theme="dark" className="text-base sm:text-lg px-8 py-3 relative z-10">
              zpět na hlavní stranu
            </Button>
            <Scribble 
              type="circle"
              trigger="static"
              className="absolute -inset-2 md:-inset-3 text-brand z-20 pointer-events-none"
            />
            <Scribble 
              type="arrowUp"
              trigger="static"
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-12 h-16 text-brand pointer-events-none"
            />
          </div>
        </Reveal>
      </main>
    </div>
  );
}
