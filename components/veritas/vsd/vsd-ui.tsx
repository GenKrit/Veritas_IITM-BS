// veritas-website\components\veritas\vsd\vsd-ui.tsx

"use client";

import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { Search, ExternalLink, BookOpen, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Digest = {
  id: string;
  title: string;
  description: string | null;
  volume: number;
  issue: number;
  month: string;
  link: string;
};

type SortOption = "latest" | "oldest" | "title";

// === LINK HELPER FUNCTION ===
const getValidUrl = (url: string | null | undefined) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export function VSDListClient({ digests }: { digests: Digest[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // Filter and sort logic
  const filteredAndSortedDigests = useMemo(() => {
    let filtered = digests;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = digests.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.month.toLowerCase().includes(query) ||
          d.description?.toLowerCase().includes(query) ||
          `vol ${d.volume}`.includes(query) ||
          `issue ${d.issue}`.includes(query)
      );
    }

    const sorted = [...filtered];
    if (sortBy === "latest") {
      sorted.sort((a, b) => {
        if (b.volume !== a.volume) return b.volume - a.volume;
        return b.issue - a.issue;
      });
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => {
        if (a.volume !== b.volume) return a.volume - b.volume;
        return a.issue - b.issue;
      });
    } else if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [digests, searchQuery, sortBy]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".page-header", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(".controls-bar",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(".digest-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 py-24 relative z-10 space-y-12">
      
      {/* Header */}
      <div className="page-header text-center space-y-4">
        <div className="inline-block p-4 rounded-full bg-amber-900/5 border border-amber-900/10 mb-4">
          <BookOpen className="w-8 h-8 text-amber-900/40" />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight text-[#2a1c0f]">
          Veritas Speaking Digest
        </h1>
        <p className="text-xl font-serif italic text-amber-900/60 max-w-2xl mx-auto">
          "The weekly written chronicle for your rhetorical journey."
        </p>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar sticky top-6 z-30 bg-[#fdfcf8]/80 backdrop-blur-xl border border-[#d4c5b0] rounded-2xl p-2 shadow-xl shadow-amber-900/5">
        <div className="flex flex-col md:flex-row gap-2">
          
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/30 group-focus-within:text-amber-900/60 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-transparent hover:bg-amber-900/5 focus:bg-white rounded-xl outline-none text-[#2a1c0f] placeholder:text-amber-900/30 transition-all font-serif"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-900/40 hover:text-amber-900">✕</button>
            )}
          </div>

          {/* Divider (Desktop) */}
          <div className="hidden md:block w-px bg-amber-900/10 my-2" />

          {/* Sort Toggles */}
          <div className="flex bg-amber-900/5 rounded-xl p-1 gap-1">
            {(["latest", "oldest", "title"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                  sortBy === option 
                    ? "bg-white text-[#2a1c0f] shadow-sm" 
                    : "text-amber-900/40 hover:text-amber-900/70 hover:bg-white/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center text-xs font-mono uppercase tracking-widest text-amber-900/40">
        Showing {filteredAndSortedDigests.length} Editions
      </div>

      {/* Grid */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedDigests.length === 0 ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
               <p className="font-serif italic text-amber-900/40">No records found in the archives.</p>
               <button onClick={() => setSearchQuery("")} className="mt-4 text-amber-700 underline underline-offset-4 decoration-amber-900/30 hover:decoration-amber-900 font-serif">Clear Filters</button>
             </motion.div>
          ) : (
            filteredAndSortedDigests.map((digest) => (
              <DigestCard key={digest.id} digest={digest} />
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function DigestCard({ digest }: { digest: Digest }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="digest-card group relative bg-white border border-[#d4c5b0] rounded-xl p-6 hover:border-[#bc6c25] hover:shadow-[0_8px_30px_rgba(42,28,15,0.06)] transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        
        {/* Left Info */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-amber-900/50">
            <span className="bg-amber-900/5 px-2 py-1 rounded">Vol {digest.volume}</span>
            <span className="w-1 h-1 rounded-full bg-amber-900/30" />
            <span className="bg-amber-900/5 px-2 py-1 rounded">Issue {digest.issue}</span>
            <span className="w-1 h-1 rounded-full bg-amber-900/30" />
            <span className="text-[#bc6c25] font-bold">{digest.month}</span>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#2a1c0f] group-hover:text-[#bc6c25] transition-colors">
            {digest.title}
          </h3>
          
          {digest.description && (
            <p className="text-amber-900/70 font-serif leading-relaxed line-clamp-2">
              {digest.description}
            </p>
          )}
        </div>

        {/* Right Action */}
        <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-amber-900/5">
          <a
            href={getValidUrl(digest.link)} // PPLIED HELPER HERE
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#f4f1ea] border border-[#d4c5b0] text-[#2a1c0f] font-serif font-bold text-sm uppercase tracking-wide rounded-lg group-hover:bg-[#2a1c0f] group-hover:text-[#f4f1ea] group-hover:border-transparent transition-all duration-300"
          >
            <span>Read Issue</span>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}