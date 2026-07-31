"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { CZ, GB } from "country-flag-icons/react/3x2";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isExiting, setIsExiting] = useState(false);

  const [prevLocale, setPrevLocale] = useState(locale);

  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setIsExiting(false);
  }

  const toggleLocale = () => {
    if (isExiting || isPending) return;

    // nejdriv udelame blur-out
    setIsExiting(true);

    const nextLocale = locale === "cs" ? "en" : "cs";

    // pockame na dokonceni blur-out (300ms) a pak spustime fetch nove stranky
    setTimeout(() => {
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale, scroll: false });
      });
    }, 300);
  };

  return (
    <button
      onClick={toggleLocale}
      className="ml-2 relative w-[22px] h-[15px] flex items-center justify-center cursor-pointer"
      aria-label={t("global.switchLanguage", { lang: locale === "cs" ? "English" : "Česky" })}
      disabled={isPending || isExiting}
    >
      <m.div
        key={locale}
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{
          opacity: isExiting ? 0 : 1,
          filter: isExiting ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 overflow-hidden flex items-center justify-center"
      >
        {locale === "cs" ? (
          <CZ className="w-[23px] h-auto block scale-[1.05]" />
        ) : (
          <GB className="w-[23px] h-auto block scale-[1.05]" />
        )}
      </m.div>
    </button>
  );
}
