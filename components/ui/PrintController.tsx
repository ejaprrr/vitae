"use client";

import { Scribble } from "@/components/ui/Scribble";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function PrintController() {
  const router = useRouter();
  const t = useTranslations("cv");
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let printAttempted = false;

    const handleReturn = () => {
      router.push("/");
    };

    // standardni udalost pri zavreni okna tisku
    window.addEventListener("afterprint", handleReturn);

    // mobilni fallback: dialog tisku nebo popup s povolenim zpusobi ztratu focusu okna
    // kdyz se zavrou, okno ziska focus zpet a my presmerujeme
    const handleFocus = () => {
      if (printAttempted) {
        setTimeout(handleReturn, 300);
      }
    };
    window.addEventListener("focus", handleFocus);

    // zpozdeni, aby se stihly vyrenderovat fonty a obrazky pred tiskem
    const timer = setTimeout(() => {
      printAttempted = true;
      window.print();
    }, 1000);

    // zobrazi zachranna tlacitka pokud se tisk zasekne (napr. adblocker to zablokoval)
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("afterprint", handleReturn);
      window.removeEventListener("focus", handleFocus);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center print:hidden">
      <div className="relative inline-block px-8 py-4 md:px-10 md:py-5">
        <span className="relative z-10 text-xl md:text-2xl font-medium tracking-tight lowercase text-black">
          {t("preparing")}
        </span>
        <Scribble
          type="circle"
          trigger="loop"
          loops={3}
          className="absolute inset-0 w-full h-full text-brand -z-10"
        />
      </div>

      {/* zachranna brzda pro pripad, ze ios safari tisk potichu zablokuje */}
      <div
        className={`mt-12 flex items-center gap-6 transition-opacity duration-500 ${showFallback ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => window.print()}
          className="text-black/60 hover:text-brand font-medium lowercase transition-colors cursor-pointer"
        >
          zkusit znovu
        </button>
        <button
          onClick={() => router.push("/")}
          className="text-black/60 hover:text-black font-medium lowercase transition-colors cursor-pointer"
        >
          zpět na web
        </button>
      </div>
    </div>
  );
}
