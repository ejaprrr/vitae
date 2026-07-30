"use client";

import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Scribble } from "@/components/ui/Scribble";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function MadeWithLove() {
  return (
    <div className="flex items-center text-base md:text-lg font-medium lowercase tracking-tight text-black">
      <span>made&nbsp;</span>
      <span>with&nbsp;</span>
      <div className="flex items-center ml-1">
        <Scribble
          type="heart"
          trigger="static"
          loops={2}
          className="inline-block w-6 h-6 text-brand translate-y-[-1px]"
        />
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full bg-white text-black">
      <Container className="pt-16 pb-8 sm:pt-24 sm:pb-10">
        <div className="flex flex-row justify-between items-start gap-4 text-body">

          {/* Left: Text */}
          <div className="flex flex-col gap-2">
            <span className="text-brand mb-1">—</span>
            <span>{t('global.name')}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Right: Links */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-2 items-end text-right">
              <span className="text-brand mb-1">{t('footer.socialTitle')}</span>
              {siteConfig.social.map((link, index) => (
                <AnimatedLink key={index} href={link.href} className="text-right" external>{link.label}</AnimatedLink>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Center: Made with love */}
        <div className="mt-20 md:mt-32 flex justify-center w-full py-4 overflow-hidden">
          <MadeWithLove />
        </div>

      </Container>
    </footer>
  );
}

