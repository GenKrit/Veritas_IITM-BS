"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin here to keep component self-contained
gsap.registerPlugin(ScrollTrigger);

// ==================== PARALLAX PAPER TEXTURE ====================
const ParchmentBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax layer
      gsap.to(".parchment-layer", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".parchment-particle").forEach(
        (particle, i) => {
          gsap.to(particle, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-180, 180)",
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Main parchment layer */}
      <div
        className="absolute inset-0 parchment-layer bg-[url('https://images.unsplash.com/photo-1544718044-9eae1d70e195?w=1920&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay"
      />

      {/* Floating parchment particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="parchment-particle absolute w-12.5 h-12.5 bg-[url('https://images.unsplash.com/photo-1544718044-9eae1d70e195?w=400&q=80')] bg-cover opacity-20 rounded-2xl"
          style={{
            left: `${5 + i * 7}%`,
            top: `${15 + i * 6}%`,
          }}
        />
      ))}

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-linear-to-r from-[#f5f0e1]/80 via-transparent to-[#f5f0e1]/80" />
    </div>
  );
};

export default ParchmentBackground;
