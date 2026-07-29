import { SocialLink } from "@/components/ui/SocialLink";
import { siteConfig } from "@/config/site";

export function Footer() {
  const txt = "text-base md:text-lg lg:text-xl leading-[1.5] lowercase";
  
  return (
    <footer className="w-full bg-white text-black">
      <div className="w-full px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-16 sm:py-24">
        
        <div className={`flex flex-col-reverse lg:flex-row justify-between items-start gap-16 lg:gap-8 ${txt}`}>

          {/* Left: Text */}
          <div className="flex flex-col gap-2 lg:w-1/2">
            <span className="text-[#FF0000] mb-1">—</span>
            <span>{siteConfig.name}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Right: Links */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row lg:justify-end gap-16 sm:gap-24">
            <div className="flex flex-col gap-2">
              <span className="text-[#FF0000] mb-1">sociální sítě</span>
              {siteConfig.social.map((link, index) => (
                <SocialLink key={index} href={link.href}>{link.label}</SocialLink>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
