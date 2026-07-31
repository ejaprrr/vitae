"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Scribble } from "@/components/ui/Scribble";
import { navSections, siteConfig } from "@/config/site";
import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white text-black">
        <Container>
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* leva cast: logo */}
            <div className="flex-1 flex justify-start">
              <AnimatedLink
                href="#top"
                type="circle"
                className="text-2xl md:text-3xl font-normal tracking-tight"
                onClick={() => setIsMenuOpen(false)}
              >
                {siteConfig.shortName}
              </AnimatedLink>
            </div>

            {/* stred: menu toggle */}
            <div className="flex-1 flex justify-center">
              <Scribble
                as="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="underline"
                loops={2}
                className="group z-50 relative pointer-events-auto cursor-pointer"
                scribbleClassName="absolute left-0 w-full text-brand -bottom-1 h-3"
                aria-label={isMenuOpen ? t("global.close") : t("global.menu")}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black grid *:[grid-area:1/1] place-items-center">
                  <AnimatePresence mode="popLayout">
                    <m.span
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isMenuOpen ? t("global.close") : t("global.menu")}
                    </m.span>
                  </AnimatePresence>
                </span>
              </Scribble>
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
            exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.4, ease: "easeInOut" } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-white flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 md:gap-12 text-center">
              {navSections.map((section, index) => (
                <m.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: 30,
                    filter: "blur(8px)",
                    transition: {
                      duration: 0.6,
                      delay: (navSections.length - 1 - index) * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatedLink
                    href={section.href}
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 400)}
                    type="circle"
                    loops={3}
                    className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter lowercase text-black"
                  >
                    {t(`nav.${section.id}`)}
                  </AnimatedLink>
                </m.div>
              ))}
            </div>

            {/* sekce dalsich moznosti (cv, socials) */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 sm:bottom-16 w-full px-6 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm sm:text-base font-medium lowercase"
            >
              <AnimatedLink
                href="/cv"
                type="underline"
                onClick={() => setTimeout(() => setIsMenuOpen(false), 400)}
              >
                životopis (cv)
              </AnimatedLink>
              {siteConfig.social.map((link, i) => (
                <AnimatedLink key={i} href={link.href} type="underline" external>
                  {link.label}
                </AnimatedLink>
              ))}
              <AnimatedLink href={`mailto:${siteConfig.email}`} type="underline" external>
                email
              </AnimatedLink>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
