// components/veritas/events-ui.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Helper for status colors
const getStatusStyles = (status: string) => {
  switch (status) {
    case "LIVE": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "UPCOMING": return "bg-amber-100 text-amber-800 border-amber-200";
    case "CURRENT": return "bg-blue-100 text-blue-800 border-blue-200";
    default: return "bg-stone-100 text-stone-600 border-stone-200";
  }
};

// === FIX 1: NAMED EXPORT ===
export function EventsListClient({ events }: { events: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".page-header", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".event-card",
        { y: 100, opacity: 0, rotateX: -10 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-24 space-y-16 relative z-10">
      
      {/* Header */}
      <div className="page-header text-center space-y-6">
        <div className="inline-block border-b-2 border-amber-900/20 pb-2 mb-4">
          <span className="font-mono text-xs tracking-[0.4em] text-amber-900/60 uppercase">The Battleground</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-[0.85] text-[#2a1c0f]">
          <span className="bg-linear-to-br from-[#dda15e] via-[#bc6c25] to-[#603813] bg-clip-text text-transparent drop-shadow-sm contrast-125">
            EVENTS ARENA
          </span>
        </h1>
        <p className="text-xl font-serif italic text-amber-900/60 max-w-2xl mx-auto">
          "Join the events that shapes our oratory skills."
        </p>
      </div>

      {events.length === 0 && (
        <div className="text-center py-20 border-y border-amber-900/10">
          <p className="font-serif text-2xl text-amber-900/40 italic">The archives are currently silent.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, i) => (
          <Link key={event.id} href={`/events/${event.id}`} className="group">
            <motion.div 
              className="event-card relative h-full bg-[#f4f1ea] rounded-xl overflow-hidden border border-[#d4c5b0] shadow-[0_4px_20px_rgba(42,28,15,0.05)] transition-all duration-500"
              whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(42,28,15,0.15)" }}
            >
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden border-b border-[#d4c5b0]">
                {event.coverImageLink ? (
                  <motion.div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${event.coverImageLink}')` }}
                    initial={{ filter: "saturate(0.8) contrast(1.1) sepia(0.2)" }} 
                    whileHover={{ 
                      scale: 1.1, 
                      filter: "saturate(1) contrast(1) sepia(0)" 
                    }}
                    transition={{ duration: 0.7 }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8e4db] flex items-center justify-center pattern-paper">
                    <Calendar className="w-12 h-12 text-amber-900/20" />
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-sm ${getStatusStyles(event.status)}`}>
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 bg-[#f4f1ea] px-4 py-2 border-t border-r border-[#d4c5b0] rounded-tr-xl">
                  <span className="font-serif font-bold text-amber-900">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#2a1c0f] leading-tight group-hover:text-[#bc6c25] transition-colors line-clamp-2">
                  {event.name}
                </h2>

                <div className="space-y-2 text-sm font-sans text-amber-900/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-900/40">
                    {event.type.replace(/_/g, " ")}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-amber-900/20 flex items-center justify-center text-amber-900/40 group-hover:bg-[#2a1c0f] group-hover:text-[#f4f1ea] group-hover:border-transparent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}