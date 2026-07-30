"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { CZ, GB } from 'country-flag-icons/react/3x2';
import { useState, useEffect, useTransition } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useState(locale);

  useEffect(() => {
    setOptimisticLocale(locale);
  }, [locale]);

  const toggleLocale = () => {
    const nextLocale = optimisticLocale === 'cs' ? 'en' : 'cs';
    setOptimisticLocale(nextLocale);
    startTransition(() => {
      // router.replace automaticky resi prefixy pri pouziti next-intl
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      className="ml-2 relative w-[22px] h-[15px] flex items-center justify-center"
      aria-label={`Switch to ${optimisticLocale === 'cs' ? 'English' : 'Czech'}`}
      disabled={isPending}
    >
      <AnimatePresence>
        {optimisticLocale === 'cs' ? (
          <m.div
            key="gb"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden flex items-center justify-center"
          >
            <GB className="w-[23px] h-auto block scale-[1.05]" />
          </m.div>
        ) : (
          <m.div
            key="cz"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden flex items-center justify-center"
          >
            <CZ className="w-[23px] h-auto block scale-[1.05]" />
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}
