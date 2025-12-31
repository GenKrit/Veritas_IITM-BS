// veritas-website\components\veritas\hero-section.tsx

"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronRight, ArrowUpRight } from "lucide-react";

// --- Components ---

// 1. Texture Overlay
const GrainTexture = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.8" 
          numOctaves="3" 
          stitchTiles="stitch" 
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// 2. Background Breathing Orb
const AmbientOrb = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] opacity-40 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 30, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 10,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // --- Parallax Scroll Effects (Framer Motion) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yButtons = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // --- Entrance Animations (GSAP) ---
  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-badge", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    // REMOVED BLUR FILTERS - They cause thickness change
    .fromTo(".hero-title-char", 
      { 
        y: 150, 
        opacity: 0, 
        rotateX: -45
      },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        stagger: 0.05, 
        duration: 1.2, 
        ease: "power4.out",
        // Force hardware acceleration
        force3D: true
      },
      "-=0.4"
    )
    .fromTo(".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, force3D: true },
      "-=0.8"
    )
    .fromTo(".hero-cta",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.2)" },
      "-=0.6"
    );

  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-[#fdfcf8]"
    >
      <GrainTexture />
      <AmbientOrb className="top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-200/30" />
      <AmbientOrb className="bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-200/30" delay={2} />

      <motion.div 
        style={{ opacity: opacityFade }}
        className="relative z-10 max-w-[90vw] mx-auto flex flex-col items-center justify-center h-full"
      >
        
        {/* 1. Badge */}
        <div className="hero-badge mb-8 sm:mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-amber-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-amber-600 to-amber-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-serif font-semibold text-amber-900/80 uppercase tracking-[0.2em]">
            IIT Madras BS Degree
          </span>
        </div>

        {/* 2. Title - Updated classes */}
{/* 2. EPIC Playfair Display Title */}
<motion.div style={{ y: yText }} className="relative mb-8 sm:mb-12">
  <h1 
    ref={textRef}
    className="hero-title flex justify-center overflow-hidden font-black tracking-tighter leading-[0.85]"
    style={{ fontFamily: "'Playfair Display', serif" }} // Hero only!
  >
    {"VERITAS".split("").map((char, i) => (
      <span 
        key={i} 
        className="hero-title-char inline-block origin-bottom 
        bg-gradient-to-br from-[#a08430] via-[#d38d1d] to-[#d68910] 
        bg-clip-text text-transparent 
        text-[16vw] sm:text-[14vw] xl:text-[13rem] 
        drop-shadow-[0_15px_20px_rgba(244,208,63,0.4)]
        tracking-[-0.05em] font-black"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900
        }}
      >
        {char}
      </span>
    ))}
    <span 
      className="hero-title-char inline-block 
      bg-gradient-to-br from-[#f4d03f] via-[#f39c12] to-[#d68910] 
      bg-clip-text text-transparent 
      text-[16vw] sm:text-[14vw] xl:text-[13rem] 
      drop-shadow-[0_15px_20px_rgba(244,208,63,0.4)]"
      style={{ 
        fontFamily: "'Playfair Display', serif",
        fontWeight: 900
      }}
    >.</span>
  </h1>
</motion.div>



        {/* 3. Subtitle */}
        <motion.div 
          style={{ y: yText }}
          className="hero-subtitle max-w-2xl px-4 mb-12 sm:mb-16 space-y-4"
        >
          <p className="text-xl sm:text-3xl font-serif italic text-amber-900/60 font-light">
            "Veritas omnia vincit"
          </p>
          <div className="h-[1px] w-12 bg-amber-900/20 mx-auto" />
          <p className="text-lg sm:text-2xl font-sans font-medium text-amber-950 uppercase tracking-[0.2em] opacity-90">
            Truth Conquers All
          </p>
        </motion.div>

        {/* 4. Interactive Buttons */}
        <motion.div 
          style={{ y: yButtons }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
        >
          <Link href="/events" className="w-full sm:w-auto">
            {/* Darkened button slightly to match new heavier title colors */}
            <div className="hero-cta group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-[#2a1c0f] px-8 py-5 sm:px-10 sm:py-6 text-white shadow-2xl transition-all hover:shadow-[0_20px_40px_-15px_rgba(42,28,15,0.5)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-3 font-serif text-lg font-bold tracking-widest uppercase">
                <span>Enter Arena</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
          
          <Link href="#about" className="w-full sm:w-auto">
            <div className="hero-cta group relative w-full sm:w-auto overflow-hidden rounded-2xl border border-amber-900/20 bg-white/50 px-8 py-5 sm:px-10 sm:py-6 text-amber-950 backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center justify-center gap-3 font-serif text-lg font-bold tracking-widest uppercase">
                <span>Our Legacy</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>

      </motion.div>

      {/* 5. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-amber-900">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-amber-900/0 via-amber-900/50 to-amber-900/0 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 w-full h-1/2 bg-amber-800"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
}