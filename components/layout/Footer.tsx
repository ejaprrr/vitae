import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { siteConfig } from "@/config/site";

export function Footer() {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";
  
  return (
    <footer className="w-full bg-white text-black">
      <div className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-16 sm:py-24">
        
        <div className={`flex flex-row justify-between items-start gap-4 ${txt}`}>

          {/* Left: Text */}
          <div className="flex flex-col gap-2">
            <span className="text-[#FF0000] mb-1">—</span>
            <span>{siteConfig.name}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Right: Links */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-2 items-end text-right">
              <span className="text-[#FF0000] mb-1">{siteConfig.footer.socialTitle}</span>
              {siteConfig.social.map((link, index) => (
                <AnimatedLink key={index} href={link.href} className="text-right">{link.label}</AnimatedLink>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
