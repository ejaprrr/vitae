"use client";
import { siteConfig } from "@/config/site";

import Image from "next/image";
import bkgEyes from "@/public/bkg-eyes.jpg";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { motion } from "framer-motion";
import { useState } from "react";

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center relative">
      <style>{`
        @keyframes skeleton-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-bg {
          position: relative;
          overflow: hidden;
          background-color: #cc0000;
        }
        .skeleton-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0) 100%
          );
          animation: skeleton-sweep 2s infinite ease-in-out;
          pointer-events: none;
        }
      `}</style>

      {/* Hero Strip Section */}
      <div className={`relative w-full max-w-[1600px] mx-auto flex flex-col z-10 transition-colors duration-700 ease-in-out ${imageLoaded ? 'bg-transparent' : 'skeleton-bg'}`}>
        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          className="w-full h-auto z-0 select-none pointer-events-none transition-opacity duration-700 ease-in-out" 
          style={{ opacity: imageLoaded ? 1 : 0 }}
          priority 
          draggable={false} 
          onLoad={() => setImageLoaded(true)}
        />

        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          className="w-full h-auto z-0 block md:hidden select-none pointer-events-none transition-opacity duration-700 ease-in-out" 
          style={{ opacity: imageLoaded ? 1 : 0 }}
          priority 
          draggable={false} 
        />
        <Image 
          src={bkgEyes} 
          alt="Eyes" 
          className="w-full h-auto z-0 block sm:hidden select-none pointer-events-none transition-opacity duration-700 ease-in-out" 
          style={{ opacity: imageLoaded ? 1 : 0 }}
          priority 
          draggable={false} 
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 text-white pointer-events-none z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.1] lowercase tracking-tight">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            dangerouslySetInnerHTML={{ __html: siteConfig.name.replace(/ /g, "<br />") }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
            dangerouslySetInnerHTML={{ __html: siteConfig.roles.join("<br />") }}
          />
        </div>

        {/* Floating CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-max"
        >
          <Button />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 text-[#FF0000]">
        <ScrollIndicator />
      </div>
    </div>
  );
}
