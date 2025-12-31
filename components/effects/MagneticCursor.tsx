"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ==================== ENHANCED MAGNETIC CURSOR ====================
const MagneticCursor = () => {
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
        ease: "power2.out",
      });

      gsap.to(cursorRing.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDot.current, cursorRing.current], {
        scale: 2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDot.current, cursorRing.current], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "button, a, .interactive"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-full pointer-events-none z-99999 shadow-2xl shadow-amber-500/60"
        style={{ mixBlendMode: "difference" }}
      />

      {/* Outer Ring */}
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-amber-500/70 rounded-full pointer-events-none z-99998"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
};

export default MagneticCursor;
