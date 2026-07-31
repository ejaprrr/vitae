import { HighlightedText } from "@/components/ui/HighlightedText";
import { PrintController } from "@/components/ui/PrintController";
import { Scribble } from "@/components/ui/Scribble";
import { getSiteUrl, siteConfig, skillsConfig } from "@/config/site";
import { parseHighlights } from "@/lib/text";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const siteUrl = getSiteUrl();

  const title = `cv — ${siteConfig.name}`;
  const description = tSeo("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cv`,
      languages: {
        cs: "/cs/cv",
        en: "/en/cv",
        "x-default": "/cs/cv",
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `${siteUrl}/${locale}/cv`,
      siteName: siteConfig.name,
    },
  };
}

export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const experienceItems = t.raw("experience.items") as Array<{
    year: string;
    title: string;
    role: string;
    location: string;
    description: string;
    url?: string;
  }>;
  const educationItems = t.raw("education.items") as Array<{
    year: string;
    title: string;
    description: string;
    url?: string;
  }>;

  return (
    <div className="bg-white min-h-screen print:min-h-0 text-black font-sans selection:bg-brand selection:text-white pb-20 print:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @page {
          margin: 0;
        }
        @media print {
          html, body {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `,
        }}
      />

      <PrintController />

      {/* hlavni kontejner cv */}
      <div className="max-w-[210mm] mx-auto p-8 md:p-12 lg:p-16 print:max-w-none print:w-full print:h-[100vh] print:p-8 md:print:p-12 lg:print:p-12 box-border print:text-[14px] print:overflow-hidden">
        <div className="grid grid-cols-12 gap-8 md:gap-12 print:gap-8 print:h-full">
          {/* levy sloupec (kontakt a dovednosti) */}
          <div className="col-span-12 md:col-span-4 print:col-span-4 flex flex-col gap-10 print:gap-8">
            <div className="relative inline-block self-start z-10 print-break-inside-avoid">
              <div className="relative w-32 h-40 md:w-36 md:h-48 print:w-[32mm] print:h-[40mm] overflow-hidden grayscale contrast-125">
                <Image
                  src="/portrait.jpg"
                  alt={siteConfig.name}
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  className="object-cover"
                />
              </div>
              <Scribble
                type="circle"
                trigger="static"
                loops={3}
                className="absolute -inset-2 text-brand z-20 pointer-events-none"
              />
            </div>

            <section>
              <h2 className="text-xl font-medium mb-6 print:mb-4 lowercase relative inline-block z-10 print:break-after-avoid">
                {t("contact.title")}
                <Scribble
                  type="underline"
                  trigger="static"
                  className="absolute -bottom-2 left-0 w-full h-3 text-brand -z-10"
                />
              </h2>
              <div className="flex flex-col gap-2.5 print:gap-1.5 text-base print:text-[14px] lowercase">
                <span className="font-medium text-black">{siteConfig.location}</span>

                <div className="flex flex-col gap-1 print:gap-0.5">
                  <a
                    href={siteConfig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors font-medium text-black"
                  >
                    {siteConfig.domain}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-brand transition-colors text-black/80"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-black/70 text-sm print:text-[13px] pt-1 print:pt-0.5 flex-wrap">
                  {(() => {
                    const gh = siteConfig.social.find((s) => s.label === "github");
                    const li = siteConfig.social.find((s) => s.label === "linkedin");
                    return (
                      <>
                        {gh && (
                          <a
                            href={gh.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand transition-colors"
                          >
                            {gh.label}/{gh.handle}
                          </a>
                        )}
                        {gh && li && <span className="text-black/30">/</span>}
                        {li && (
                          <a
                            href={li.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand transition-colors"
                          >
                            {li.label}/{li.handle}
                          </a>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6 print:gap-5 lowercase">
              {skillsConfig.map((group, i) => {
                const categoryName = t(`skills.categories.${group.key}`);
                return (
                  <div key={group.key} className="print-break-inside-avoid flex flex-col">
                    {i === 0 && (
                      <h2 className="text-xl font-medium mb-6 print:mb-4 lowercase relative inline-block z-10 self-start">
                        {t("skills.title")}
                        <Scribble
                          type="underline"
                          trigger="static"
                          className="absolute -bottom-2 left-0 w-full h-3 text-brand -z-10"
                        />
                      </h2>
                    )}
                    <h3 className="text-black/60 font-medium mb-2 print:mb-1 relative inline-block z-10 self-start">
                      {categoryName}
                    </h3>
                    <div className="flex flex-col gap-1 print:gap-0 text-base print:text-[14px] print:leading-tight">
                      {group.items.map((skill, j) => (
                        <span key={j} className="font-medium">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* pravy sloupec (hlavni obsah) */}
          <div className="col-span-12 md:col-span-8 print:col-span-8">
            <header className="mb-10 print:mb-8">
              <h1 className="text-5xl md:text-6xl print:text-5xl font-medium tracking-tight mb-2 print:mb-1 lowercase relative inline-block z-10">
                {siteConfig.name}
                <Scribble
                  type="underline"
                  trigger="static"
                  loops={2}
                  className="absolute -bottom-2 left-0 w-[calc(100%+16px)] h-4 text-brand -z-10"
                />
              </h1>
              <div className="text-xl print:text-lg text-brand font-medium lowercase mt-2 print:mt-1">
                {siteConfig.roles.join(" / ")}
              </div>
            </header>

            <section className="mb-10 print:mb-8 text-base print:text-[14px] leading-relaxed relative flex items-start gap-4">
              <Scribble
                type="arrowRight"
                trigger="static"
                className="w-8 h-8 text-brand shrink-0 mt-1"
              />
              <p className="relative z-10">
                {t.rich("about.cvProfile", {
                  highlight: (chunks) => (
                    <HighlightedText
                      type="underline"
                      trigger="static"
                      className="relative inline-block z-10 text-black font-medium"
                      scribbleClassName="absolute -bottom-1 left-0 w-full h-2 text-brand -z-10"
                    >
                      {chunks}
                    </HighlightedText>
                  ),
                })}
              </p>
            </section>

            <section className="mb-10 print:mb-8 flex flex-col gap-6 print:gap-5">
              {experienceItems.map((exp, i) => (
                <div key={i} className="lowercase print-break-inside-avoid flex flex-col">
                  {i === 0 && (
                    <h2 className="text-2xl print:text-xl font-medium mb-6 print:mb-4 lowercase relative inline-block z-10 self-start">
                      {t("experience.title")}
                      <Scribble
                        type="underline"
                        trigger="static"
                        className="absolute -bottom-2 left-0 w-full h-3 text-brand -z-10"
                      />
                    </h2>
                  )}
                  <div className="flex justify-between items-baseline mb-1 print:mb-0">
                    <h3 className="text-xl print:text-lg font-medium">{exp.title}</h3>
                    <span className="text-black/60 print:text-[14px] font-medium shrink-0 relative z-10">
                      {exp.year}
                    </span>
                  </div>
                  <div className="text-brand font-medium print:text-[14px] mb-2 print:mb-1 relative inline-block z-10 self-start">
                    {exp.role}
                  </div>
                  <p className="text-base print:text-[14px] leading-relaxed">
                    {parseHighlights(exp.description, (inner, idx) => (
                      <span key={idx} className="relative inline-block z-10 text-brand font-medium">
                        {inner}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-6 print:gap-5">
              {educationItems.map((edu, i) => (
                <div key={i} className="lowercase print-break-inside-avoid flex flex-col">
                  {i === 0 && (
                    <h2 className="text-2xl print:text-xl font-medium mb-6 print:mb-4 lowercase relative inline-block z-10 self-start">
                      {t("education.title")}
                      <Scribble
                        type="underline"
                        trigger="static"
                        className="absolute -bottom-2 left-0 w-full h-3 text-brand -z-10"
                      />
                    </h2>
                  )}
                  <div className="flex justify-between items-baseline mb-1 print:mb-0">
                    <h3 className="text-xl print:text-lg font-medium flex items-center gap-2 flex-wrap">
                      {edu.title.split("<br></br>").map((part, partIdx) => (
                        <span key={partIdx} className="flex items-center gap-2">
                          {partIdx > 0 && <span className="text-brand">/</span>}
                          {parseHighlights(part, (inner, hlIdx) => (
                            <span
                              key={hlIdx}
                              className="relative inline-block z-10 text-brand font-medium"
                            >
                              {inner}
                            </span>
                          ))}
                        </span>
                      ))}
                    </h3>
                    <span className="text-black/60 print:text-[14px] font-medium shrink-0 relative z-10">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-base print:text-[14px] leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
