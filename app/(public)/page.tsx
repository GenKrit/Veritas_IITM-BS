// veritas-website\app\(public)\page.tsx

"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Navbar from "@/components/navbar/Navbar";

// Component Imports
import { MagneticCursor, ParchmentBackground } from "@/components/veritas/ui-elements";
import HeroSection from "@/components/veritas/hero-section";
import { ImpactfulQuotes, EventFormats, Departments } from "@/components/veritas/feature-sections";
import { FAQSection, EventsArena, AboutCovenant, StatsSection } from "@/components/veritas/content-sections";
import { ContactSection, TypewriterQuotes, Footer } from "@/components/veritas/footer-contact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

export default function LandingPage() {
useEffect(() => {
  // Smooth anchor scrolling logic - ONLY for hash links (#about, #events)
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  const handler = function (this: HTMLAnchorElement, e: Event) {
    const targetAttr = this.getAttribute("href");
    
    // Safety check: only handle actual hash links
    if (!targetAttr?.startsWith("#")) {
      return; // Let Next.js handle /events routes normally
    }
    
    e.preventDefault();
    const target = document.querySelector(targetAttr) as HTMLElement;
    
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 2,
        ease: "power3.inOut",
      });
    }
  };

  anchors.forEach(anchor => anchor.addEventListener("click", handler));
  
  // Cleanup to prevent memory leaks
  return () => {
    anchors.forEach(anchor => anchor.removeEventListener("click", handler));
  };
}, []);


  return (
    <>
      {/* PRELOAD CRITICAL FONTS */}
      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com" 
      />
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700;900&family=Inter:wght@300;400;500;600&display=swap" 
        as="style"
      />
      
      <style jsx global>{`
        /* === CRITICAL: LOAD FONTS WITH SWAP === */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');
        
        /* === FONT FACE FALLBACK (PREVENTS FOUC) === */
        @font-face {
          font-family: 'Cormorant Garamond Fallback';
          src: local('Georgia'), local('Times New Roman');
          font-weight: 900;
          font-display: swap;
          ascent-override: 95%;
          descent-override: 25%;
          line-gap-override: 0%;
          size-adjust: 105%;
        }
        
        /* === PERFECT MOBILE VIEWPORT CONTROL === */
        html, body {
          width: 100vw !important;
          max-width: 100vw !important;
          min-height: 100vh !important;
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          position: relative !important;
          scroll-behavior: smooth !important;
        }
        
        /* === HIDE ALL SCROLLBARS === */
        ::-webkit-scrollbar { display: none !important; }
        body { scrollbar-width: none !important; -ms-overflow-style: none !important; }
        
        /* === PERFECT RESPONSIVE LAYOUT === */
        * { 
          box-sizing: border-box !important;
          cursor: none !important;
        }
        
        body { 
          background: linear-gradient(135deg, #f8f4ed 0%, #f0e9dc 50%, #e8ded0 100%);
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* === MOBILE VIEWPORT FIXES === */
        @media (max-width: 640px) {
          html, body {
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
          }
        }
        
        ::selection { 
          background: #d4a574 !important; 
          color: #2a1c0f !important; 
        }
        
        h1, h2, h3 { 
          font-family: 'Cormorant Garamond', 'Cormorant Garamond Fallback', Georgia, serif !important;
          font-weight: 900 !important;
        }
        
        /* === PREVENT FOUC ON GRADIENT TEXT === */
        .hero-title-char {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      <ParchmentBackground />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <ImpactfulQuotes />
        <AboutCovenant />
        <EventFormats />
        <Departments />
        <EventsArena />
        <FAQSection />
        <ContactSection />
        <TypewriterQuotes />
        <StatsSection />
        <Footer />
      </main>
    </>
  );
}