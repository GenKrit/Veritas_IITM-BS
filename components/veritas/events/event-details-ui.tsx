// components/veritas/event-details-ui.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { 
  Calendar, Clock, MapPin, ArrowLeft, ExternalLink, Video, FileText, 
  CheckCircle2, XCircle, Feather 
} from "lucide-react";
import { motion } from "framer-motion";

// === 1. ADD THIS HELPER FUNCTION ===
const getValidUrl = (url: string | null | undefined) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export default function EventDetailsClient({ event }: { event: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpen = event.status?.toLowerCase() === "open" || event.status?.toLowerCase() === "upcoming";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".details-fade", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1 }
      )
      .fromTo(".details-image",
        { opacity: 0, scale: 0.95, rotate: -2 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.8"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-24">
      
      {/* Navigation */}
      <Link href="/events" className="details-fade inline-flex items-center text-sm font-mono text-amber-900/60 hover:text-amber-900 mb-12 group transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        RETURN TO ARCHIVES
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Visual Artifact */}
        <div className="details-image sticky top-24">
          <div className="relative p-3 bg-white shadow-2xl shadow-amber-900/10 rounded-sm rotate-1 transform transition-transform hover:rotate-0 duration-700">
            <div className="relative aspect-3/4 overflow-hidden bg-[#e8e4db] border border-[#d4c5b0]">
              {event.coverImageLink ? (
                <img 
                  src={event.coverImageLink} 
                  alt={event.name} 
                  className="w-full h-full object-cover sepia-[0.1] contrast-[1.1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-amber-900/20">
                  <div className="w-24 h-24 border-4 border-double border-amber-900/20 rounded-full flex items-center justify-center mb-4">
                    <Feather className="w-10 h-10" />
                  </div>
                  <p className="font-serif italic">No visual record found</p>
                </div>
              )}
              
              {/* Paper Texture Overlay for Image */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* "Tape" Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#fdfcf8]/80 backdrop-blur-sm border border-white/40 shadow-sm rotate-2" />
          </div>

          {/* Desktop Register Button */}
          {event.registrationLink && (
            <div className="hidden lg:block mt-8 details-fade">
              <a 
                href={getValidUrl(event.registrationLink)} // === 2. USE HELPER HERE ===
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 bg-[#2a1c0f] text-[#f4f1ea] font-serif font-bold text-lg py-4 px-8 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-amber-600/0 via-amber-600/30 to-amber-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Feather className="w-5 h-5" />
                <span>SIGN THE LEDGER</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Column: The Dossier */}
        <div className="space-y-10">
          
          {/* Header */}
          <div className="space-y-6 details-fade">
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider border ${isOpen ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-red-100 text-red-900 border-red-300'}`}>
                {isOpen ? <CheckCircle2 className="w-3 h-3 mr-2"/> : <XCircle className="w-3 h-3 mr-2"/>}
                {event.status}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-700 border border-stone-300">
                {event.type}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-black leading-[0.9] text-[#2a1c0f]">
              {event.name}
            </h1>
            
            <div className="h-1 w-24 bg-linear-to-r from-amber-700 to-transparent" />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 details-fade">
            {[
              { icon: Calendar, label: "Date", value: new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
              { icon: Clock, label: "Time", value: event.time },
              { icon: MapPin, label: "Location", value: event.venue, full: true },
            ].map((item, i) => (
              <div key={i} className={`p-5 bg-white border border-[#d4c5b0] shadow-sm ${item.full ? 'md:col-span-2' : ''}`}>
                <div className="flex items-center gap-3 mb-2 text-amber-900/60">
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest">{item.label}</span>
                </div>
                <p className="font-serif text-xl font-bold text-[#2a1c0f]">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="prose prose-stone prose-lg max-w-none details-fade">
            <h3 className="font-serif font-bold text-[#2a1c0f] uppercase tracking-widest text-sm border-b border-amber-900/10 pb-2">Details of the Matter</h3>
            <p className="font-serif text-amber-900/80 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {/* Action Links */}
          <div className="space-y-4 pt-8 border-t border-amber-900/10 details-fade">
            {[
              // === 3. USE HELPER HERE AS WELL ===
              { link: getValidUrl(event.meetLink), icon: Video, label: "Join Virtual Assembly", original: event.meetLink },
              { link: getValidUrl(event.eventDocLink), icon: FileText, label: "View Official Documentation", original: event.eventDocLink }
            ].map((action, i) => action.original && ( 
              <a key={i} href={action.link} target="_blank" className="flex items-center justify-between p-4 bg-[#f4f1ea] border border-[#d4c5b0] hover:bg-white hover:border-[#bc6c25] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#e8e4db] flex items-center justify-center rounded-full group-hover:bg-[#bc6c25] group-hover:text-white transition-colors">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-[#2a1c0f]">{action.label}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-amber-900/40 group-hover:text-[#bc6c25]" />
              </a>
            ))}

            {/* Mobile Register Button */}
            {event.registrationLink && (
              <div className="lg:hidden pt-4">
                <a href={getValidUrl(event.registrationLink)} target="_blank" className="w-full bg-[#2a1c0f] text-[#f4f1ea] font-serif font-bold py-4 flex items-center justify-center gap-2 shadow-lg">
                  <Feather className="w-5 h-5" /> REGISTER NOW
                </a>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="pt-12 details-fade">
            <p className="font-mono text-[10px] text-amber-900/30 uppercase tracking-[0.2em]">
              REF_ID: {event.id.substring(0,8)} • ARCHIVED: {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}