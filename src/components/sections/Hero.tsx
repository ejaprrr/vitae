"use client";

import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Reveal } from "@/components/ui/Reveal";
import bkgEyes from "@/public/bkg-eyes.jpg";
import { m } from "framer-motion";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

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
          alt="eliáš jan procházka"
          placeholder="blur"
          className="w-full h-auto z-0 select-none pointer-events-none"
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1600px) 90vw, 1600px"
          draggable={false}
        />
        <Image
          src={bkgEyes}
          alt=""
          aria-hidden="true"
          placeholder="blur"
          className="w-full h-auto z-0 block md:hidden select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, 100vw"
          draggable={false}
        />
        <Image
          src={bkgEyes}
          alt=""
          aria-hidden="true"
          placeholder="blur"
          className="w-full h-auto z-0 block sm:hidden select-none pointer-events-none"
          sizes="(max-width: 640px) 100vw, 100vw"
          draggable={false}
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 text-white pointer-events-none z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight">
          <h1 className="font-normal">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {siteConfig.name.split(" ").map((word, i, arr) => (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </m.div>
          </h1>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
          >
            {(t.raw("global.roles") as string[]).map((role, i, arr) => (
              <span key={i}>
                {role}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </m.div>
        </div>

        {/* Floating CTA */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-max"
        >
          <Button href="#contact" aria-label={t("nav.contact")}>
            {t("contact.cta")}
          </Button>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center no-print">
        <Reveal delay={1.2}>
          <ScrollIndicator direction="down" target="#about" />
        </Reveal>
      </div>
    </div>
  );
}
