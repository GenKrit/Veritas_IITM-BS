// veritas-website\components\veritas\content-sections.tsx

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Plus, Clock, ArrowUpRight, Crown, Zap, Flame } from "lucide-react";
import Link from "next/link";
import { ChapterTitle, RevealText } from "./ui-elements";

// ==================== FAQ ====================
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".faq-item", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: faqRef.current, start: "top 80%" } });
  }, []);

  const faqs = [
    { q: "Who can join VERITAS?", a: "Any IITM BS Degree student regardless of year or branch. No prior experience required—70% of our champions were complete beginners who learned through our Genesis training program." },
    { q: "What's the time commitment?", a: "General members: 1 weekly session (2 hours). Core team: 5-8 hours/week during tournament seasons. Everything is designed to be flexible around your academic schedule." },
    { q: "Do I need debate experience?", a: "Absolutely not! We value logic, clarity, and courage over polish. Our structured workshops train you from zero to competition-ready in weeks, not years." },
    { q: "What will I gain from VERITAS?", a: "Tournament experience, elite alumni network access, leadership positions, public speaking mastery, and career-critical skills that land top consulting, tech, and leadership roles." }
  ];

  return (
    <section className="py-32 relative bg-gradient-to-b from-amber-50/50 to-white/90">
      <div className="max-w-5xl mx-auto px-6">
        <ChapterTitle num="06" title="Inquiries" subtitle="Common questions from aspiring orators." />
        <div ref={faqRef} className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="faq-item interactive group border-y-2 border-amber-200/40 bg-white/80 backdrop-blur-xl rounded-4xl hover:bg-amber-50/80 hover:shadow-amber-900/30 transition-all overflow-hidden cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)} whileHover={{ scale: 1.02, y: -4 }}>
              <div className="flex items-center justify-between p-12">
                <h4 className="text-2xl font-serif font-semibold text-[#2a1c0f] group-hover:text-amber-900 transition-all flex-1 pr-8">{faq.q}</h4>
                <motion.div animate={{ rotate: openIndex === i ? 45 : 0 }} className="w-12 h-12 border-4 border-amber-600 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0 shadow-xl group-hover:shadow-amber-900/50 transition-all">
                  <Plus className="w-6 h-6" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0, y: -20 }} animate={{ height: "auto", opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
                    <p className="px-12 pb-12 text-xl text-[#4a3a2a]/80 font-serif font-light leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== EVENTS ARENA ====================
// This is temprory workaround...we will implement live events pull up from db later
export const EventsArena = () => {
  const events = [
    { title: "Off The Beat", status: "UPCOMING", date: "TBD • 7:00 PM", speakers: "Open • Gmeet", image: "https://images.unsplash.com/photo-1544718044-9eae1d70e195?w=600&q=80" },
    { title: "Off The Beat", status: "UPCOMING", date: "TBD • 7:00 PM", speakers: "Open • Gmeet", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" },
    { title: "Samvaad", status: "UPCOMING", date: "TBD • 7:00 PM", speakers: "Open • Gmeet", image: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=600&q=80" }
  ];

  return (
    <section className="py-32 relative" id="events">
      <div className="max-w-7xl mx-auto px-6">
        <ChapterTitle num="05" title="The Arena" subtitle="Live battles. Real stakes. Join the discourse." />
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <RevealText key={i} delay={i * 0.2}>
              <motion.div className="interactive group relative h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50/30 to-amber-100/20 backdrop-blur-xl border border-amber-200/30 shadow-2xl hover:shadow-amber-900/20 transition-all duration-700 cursor-pointer" whileHover={{ y: -15, scale: 1.03 }}>
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1c0f]/95 via-[#2a1c0f]/60 to-transparent" />
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 ${event.status === "LIVE" ? "bg-amber-500 text-amber-950 border-amber-600 animate-pulse" : "bg-emerald-500/90 text-emerald-950 border-emerald-600"}`}>● {event.status}</div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Clock className="w-3 h-3" /><span>{event.date}</span><span className="w-1 h-1 bg-amber-400 rounded-full" /><span>{event.speakers}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 leading-tight mb-2 drop-shadow-lg group-hover:text-white group-hover:translate-x-2 transition-all">{event.title}</h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link href="/events" className="text-amber-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1">Enter Arena <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></Link>
                  </div>
                </div>
              </motion.div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
};


// ==================== ABOUT ====================
export const AboutCovenant = () => (
  <section id="about" className="py-32 relative bg-gradient-to-b from-white/70 to-amber-50/70">
    <div className="max-w-7xl mx-auto px-6">
      <ChapterTitle num="02" title="Our Covenant" subtitle="Three sacred pillars upon which VERITAS stands eternal." />
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: Crown, title: "Ethos", subtitle: "Character", desc: "In the forum of discourse, credibility is the foundation. Without trust, no argument endures.", gradient: "from-purple-500 to-purple-600" },
          { icon: Zap, title: "Logos", subtitle: "Reason", desc: "The architecture of truth. Logic, evidence, structure—the unassailable fortress of persuasion.", gradient: "from-blue-500 to-blue-600" },
          { icon: Flame, title: "Pathos", subtitle: "Passion", desc: "To stir the soul is to move the world. Emotion is the spark that ignites conviction.", gradient: "from-orange-500 to-orange-600" }
        ].map((pillar, i) => (
          <RevealText key={i} delay={i * 0.3}>
            <motion.div className="interactive group relative p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-amber-200/40 shadow-2xl hover:shadow-amber-900/30 hover:-translate-y-4 transition-all duration-700 cursor-pointer overflow-hidden" whileHover={{ scale: 1.05, rotateY: 5 }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-5 group-hover:opacity-15 transition-opacity`} />
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity w-24 h-24"><pillar.icon className="w-full h-full text-amber-700" /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}><pillar.icon className="w-6 h-6 text-white" /></div>
                  <span className="font-mono text-sm uppercase tracking-[0.3em] text-amber-800/70 font-medium">{pillar.subtitle}</span>
                </div>
                <h3 className="text-4xl font-serif font-bold text-[#2a1c0f] mb-6 leading-tight group-hover:text-amber-900 transition-colors drop-shadow-lg">{pillar.title}</h3>
                <p className="text-lg text-[#4a3a2a]/90 font-serif leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          </RevealText>
        ))}
      </div>
    </div>
  </section>
);

// ==================== STATS ====================
// IMplement dynamic number updation here from db later
export const StatsSection = () => (
  <section className="py-32 bg-gradient-to-b from-amber-50/50 to-white/70 relative">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
      {[ { value: "700", label: "Members", suffix: "+" }, { value: "70+", label: "Events", suffix: "+" }, { value: "5", label: "Teams", suffix: "+" }, { value: "18", label: "Team Members", suffix: "" } ].map((stat, i) => (
        <RevealText key={i} delay={i * 0.2}>
          <motion.div className="group" whileHover={{ scale: 1.1, y: -10 }}>
            <div className="text-7xl md:text-[8rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-900 to-amber-700 mb-6 drop-shadow-2xl">{stat.value}<span className="text-5xl">{stat.suffix}</span></div>
            <p className="text-amber-800/80 font-mono text-sm uppercase tracking-[0.4em] font-medium group-hover:text-amber-900 transition-colors">{stat.label}</p>
          </motion.div>
        </RevealText>
      ))}
    </div>
  </section>
);