"use client";

import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Container } from "@/components/layout/Container";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations();
  
  const navKeys = ['about', 'experience', 'skills', 'education', 'contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset'; 
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white text-black">
        <Container>
          <div className="flex justify-between items-center py-3 md:py-4">
            
            {/* leva cast: logo */}
            <div className="flex-1 flex justify-start">
              <AnimatedLink href="#top" type="circle" className="text-2xl md:text-3xl font-normal tracking-tight" onClick={() => setIsMenuOpen(false)}>
                {t('global.shortName')}
              </AnimatedLink>
            </div>
            
            {/* stred: menu toggle */}
            <div className="flex-1 flex justify-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-sm md:text-base font-medium tracking-wider lowercase hover:text-brand transition-colors cursor-pointer"
              >
                {isMenuOpen ? (t('global.close') || 'zavrit') : 'menu'}
              </button>
            </div>

            {/* prava cast: jazyk */}
            <div className="flex-1 flex justify-end items-center">
              <LanguageSwitcher />
            </div>

          </div>
        </Container>
      </nav>

      {/* fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-white flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 md:gap-12 text-center">
              {navKeys.map((key, index) => (
                <m.div
                  key={key}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ 
                    opacity: 0, 
                    y: -20, 
                    filter: "blur(4px)",
                    transition: { duration: 0.4, delay: index * 0.05, ease: [0.32, 0, 0.67, 0] }
                  }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatedLink
                    href={`#${key}`}
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 400)}
                    type="circle"
                    loops={3}
                    className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter lowercase text-black"
                  >
                    {t(`nav.${key}`)}
                  </AnimatedLink>
                </m.div>
              ))}
            </div>

            {/* sekce dalsich moznosti (CV, socials) */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 sm:bottom-16 w-full px-6 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm sm:text-base font-medium lowercase"
            >
              <AnimatedLink href="/cv" type="underline" onClick={() => setTimeout(() => setIsMenuOpen(false), 400)}>
                životopis (cv)
              </AnimatedLink>
              {siteConfig.social.map((link, i) => (
                <AnimatedLink key={i} href={link.href} type="underline" external>
                  {link.label}
                </AnimatedLink>
              ))}
              <AnimatedLink href={`mailto:${t('global.email')}`} type="underline" external>
                email
              </AnimatedLink>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
