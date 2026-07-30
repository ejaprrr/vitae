"use client";

import Image from "next/image";
import bkgEyes from "@/public/bkg-eyes.jpg";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { m } from "framer-motion";

import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations();
  
  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center relative">
      {/* Hero Strip Section */}
      <div 
        className="relative w-full mx-auto flex flex-col z-10"
        style={{ maxWidth: `min(1600px, calc(65vh * ${bkgEyes.width / bkgEyes.height}))` }}
      >
        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          placeholder="blur"
          className="w-full h-auto z-0 select-none pointer-events-none" 
          priority 
          draggable={false} 
        />

        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          placeholder="blur"
          className="w-full h-auto z-0 block md:hidden select-none pointer-events-none" 
          priority 
          draggable={false} 
        />
        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          placeholder="blur"
          className="w-full h-auto z-0 block sm:hidden select-none pointer-events-none" 
          priority 
          draggable={false} 
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 text-white pointer-events-none z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('global.name').split(' ').map((word, i, arr) => (
              <span key={i}>
                {word}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
          >
            {(t.raw('global.roles') as string[]).map((role, i, arr) => (
              <span key={i}>
                {role}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </m.div>
        </div>

        {/* Floating CTA */}
        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-max"
        >
          <Button href="#contact">{t('contact.cta')}</Button>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 text-brand">
        <ScrollIndicator />
      </div>
    </div>
  );
}
