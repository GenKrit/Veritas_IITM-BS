"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ==================== MAGNETIC CURSOR ====================
export const MagneticCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      gsap.to(cursorDot.current, {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(cursorRing.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDot.current, cursorRing.current], {
        scale: 2,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDot.current, cursorRing.current], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    
    // Slight delay to ensure DOM is ready
    setTimeout(() => {
      const interactiveElements = document.querySelectorAll("button, a, .interactive");
      interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="fixed top-0 left-0 w-[10px] h-[10px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full pointer-events-none z-[99999] shadow-2xl shadow-amber-500/60" style={{ mixBlendMode: 'difference' }} />
      <div ref={cursorRing} className="fixed top-0 left-0 w-[40px] h-[40px] border-2 border-amber-500/70 rounded-full pointer-events-none z-[99998]" style={{ mixBlendMode: 'difference' }} />
    </>
  );
};

// ==================== PARCHMENT BACKGROUND ====================
export const ParchmentBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parchment-layer", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
      
      gsap.utils.toArray<HTMLElement>(".parchment-particle").forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          rotation: "random(-180, 180)",
          duration: "random(15, 25)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 parchment-layer bg-[url('https://images.unsplash.com/photo-1544718044-9eae1d70e195?w=1920&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay" />
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="parchment-particle absolute w-[50px] h-[50px] bg-[url('https://images.unsplash.com/photo-1544718044-9eae1d70e195?w=400&q=80')] bg-cover opacity-20 rounded-2xl"
          style={{ left: `${5 + i * 7}%`, top: `${15 + i * 6}%` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e1]/80 via-transparent to-[#f5f0e1]/80" />
    </div>
  );
};

// ==================== REVEAL TEXT ====================
export const RevealText = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      gsap.set(ref.current, { opacity: 0, y: 80, rotationX: -20, filter: "blur(15px)", visibility: "visible" });
      gsap.to(ref.current, { opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)", duration: 1.5, delay, ease: "power4.out" });
    }
  }, [isInView, isVisible, delay]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200, visibility: 'hidden', opacity: 0 }}>
      {children}
    </div>
  );
};

// ==================== CHAPTER TITLE ====================
export const ChapterTitle = ({ num, title, subtitle }: any) => (
  <div className="mb-28 relative pl-8 border-l-4 border-amber-900/30 bg-gradient-to-r from-amber-50/20 to-transparent pr-8 py-8 rounded-r-xl">
    <RevealText delay={0.1}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-3 bg-amber-600 rounded-full shadow-lg animate-pulse" />
        <span className="font-mono text-[11px] text-amber-800/70 uppercase tracking-[0.4em] font-medium">Act {num}</span>
      </div>
    </RevealText>
    <RevealText delay={0.3}>
      <h2 className="text-6xl md:text-[8rem] font-serif font-black text-[#2a1c0f] tracking-[-0.05em] leading-[0.85] mb-4 drop-shadow-lg">{title}</h2>
    </RevealText>
    {subtitle && (
      <RevealText delay={0.5}>
        <p className="text-xl text-[#4a3a2a]/90 font-serif font-light max-w-2xl leading-relaxed tracking-wide italic">{subtitle}</p>
      </RevealText>
    )}
  </div>
);