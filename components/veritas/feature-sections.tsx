"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Quote, Crown, Speech, Earth, MessagesSquare, Zap, Flame, Clock, Calendar, BookOpen, Sparkles, Mic, Globe } from "lucide-react";
import { ChapterTitle, RevealText } from "./ui-elements";

// ==================== QUOTES CAROUSEL ====================
export const ImpactfulQuotes = () => {
  const [index, setIndex] = useState(0);
  const quotes = [
    { text: "The only weapon more powerful than words is silence between them.", author: "Cicero", role: "Roman Statesman", image: "https://images.unsplash.com/photo-1701072478527-36ab86ab83c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { text: "He who has overcome his fears will truly be free.", author: "Aristotle", role: "Greek Philosopher", image: "https://media.istockphoto.com/id/105929520/photo/portrait-of-a-stones-statue-of-aristotle-on-a-sunny-day.jpg?s=2048x2048&w=is&k=20&c=Nlo8_06IpjFgTA8ZDYDFhDUuQViMu69bL7DzMU-fkHU=" },
    { text: "Words are the voice of the heart.", author: "Confucius", role: "Chinese Philosopher", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCpueg1Dz2H_nKzPVycERW2Yd_ompouNRy-KsO9__ZewNimg1q_e_SXSDs4wTGyzIvtBYDoYXtXtmUC3XDmpaCaMkyQ5zqTngF0ZIRVxa&s=10" },
    { text: "Speak in such a way that others love to listen to you.", author: "Rumi", role: "Persian Poet", image: "https://images.unsplash.com/photo-1765530398559-bea5415e1d42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ];

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % quotes.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=60')] bg-cover bg-center opacity-10" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <RevealText delay={0.2}><Quote className="w-20 h-20 text-amber-800/20 mx-auto mb-16 drop-shadow-2xl" /></RevealText>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, scale: 0.95, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <h3 className="text-4xl md:text-6xl font-serif font-light italic text-[#2a1c0f] leading-[1.1] max-w-3xl mx-auto drop-shadow-2xl">"{quotes[index].text}"</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-amber-900/90">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-amber-100/50 shadow-2xl" style={{ backgroundImage: `url(${quotes[index].image})`, backgroundSize: 'cover' }} />
              <div>
                <p className="text-xl font-serif font-bold uppercase tracking-wide">{quotes[index].author}</p>
                <p className="text-sm font-mono uppercase tracking-wider opacity-70">{quotes[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ==================== FORMATS ====================
export const EventFormats = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(".format-card",
      { y: 150, opacity: 0, rotateY: 30, scale: 0.8 },
      { y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.1, stagger: 0.2, ease: "back.out(1.4)", scrollTrigger: { trigger: cardsRef.current, start: "top 70%", toggleActions: "play none none reverse" } }
    );
  }, []);

  return (
    <section className="py-32 relative bg-gradient-to-b from-white/50 to-amber-50/70">
      <div className="max-w-7xl mx-auto px-6">
        <ChapterTitle num="03" title="Formats" subtitle="Master every battlefield of rhetoric and persuasion with regualar events." />
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Samvaad", icon: MessagesSquare, desc: "Battlefield of intellectuals and orators.", color: "from-purple-500 to-purple-600" },
            { title: "MahaSamvaad", icon: Speech, desc: "A batllefield of flowing words and sentences.", color: "from-blue-500 to-blue-600" },
            { title: "Off The BEat", icon: Earth, desc: "Escape reality and write your own story for your own world.", color: "from-orange-500 to-orange-600" },
            { title: "JAM Session", icon: Clock, desc: "Just A Minute. No notes, no hesitation, no repetition.", color: "from-green-500 to-green-600" },
            
          ].map((format, i) => (
            <motion.div key={i} className="format-card interactive group relative h-[450px] overflow-hidden rounded-4xl bg-white/90 backdrop-blur-xl border border-amber-200/50 shadow-2xl hover:shadow-amber-900/40 transition-all duration-1000 cursor-pointer" style={{ perspective: 1000 }} whileHover={{ y: -25, rotateY: 8, rotateX: 5, transition: { duration: 0.1, ease: "easeOut" } }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${format.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div className={`w-28 h-28 bg-gradient-to-br ${format.color} rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all mx-auto`}>
                  <format.icon className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-[#2a1c0f] mb-4 drop-shadow-lg group-hover:translate-y-2 transition-all text-center">{format.title}</h3>
                  <p className="text-lg text-[#4a3a2a]/90 font-light leading-relaxed text-center">{format.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== DEPARTMENTS ====================
export const Departments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(".dept-card",
      { x: -150, opacity: 0, rotation: -15 },
      { x: 0, opacity: 1, rotation: 0, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
    );
  }, []);

  return (
    <section className="py-32 relative bg-gradient-to-r from-amber-50/80 via-white/90 to-amber-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <ChapterTitle num="04" title="Our Council" subtitle="The architects of eloquence, guardians of truth, pillars of society." />
        <div ref={containerRef} className="grid md:grid-cols-2 gap-16">
          {[
            { name: "The Forum", role: "Events", icon: Calendar, desc: "Event logistics, adjudication, and motion crafting.", gradient: "from-blue-500 to-blue-600" },
            { name: "The Ledger", role: "Research", icon: BookOpen, desc: "Weekly digest, event transcripts, rhetorical analysis.", gradient: "from-purple-500 to-purple-600" },
            { name: "The Canvas", role: "Creative", icon: Sparkles, desc: "Visual identity, branding, and digital storytelling.", gradient: "from-pink-500 to-pink-600" },
            { name: "The Voice", role: "Outreach", icon: Mic, desc: "Collaborations, sponsorships, ambassador programs.", gradient: "from-green-500 to-green-600" },
            {
  name: "The WebOps",
  role: "Technology",
  icon: Globe,
  desc: "Infrastructure, website engineering, performance, security, and digital resilience of the society.",
  gradient: "from-slate-600 to-slate-700"
}
          ].map((dept, i) => (
            <motion.div key={i} className="dept-card interactive group relative h-[400px] overflow-hidden rounded-4xl bg-white/90 backdrop-blur-xl border-2 border-amber-200/50 shadow-2xl hover:shadow-amber-900/40 transition-all duration-1000 cursor-pointer" whileHover={{ scale: 1.03, rotateY: 5, transition: { duration: 0.1 } }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-5 group-hover:opacity-15 transition-opacity`} />
              <div className="relative z-10 p-12 h-full flex flex-col justify-center items-center text-center">
                <span className="text-lg font-mono uppercase tracking-[0.4em] text-amber-800/80 block mb-6 group-hover:translate-x-4 transition-all">{dept.role}</span>
                <div className={`w-32 h-32 bg-gradient-to-br ${dept.gradient} rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all`}>
                  <dept.icon className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-5xl font-serif font-bold text-[#2a1c0f] mb-8 drop-shadow-xl group-hover:text-amber-900 transition-all">{dept.name}</h3>
                <p className="text-xl text-[#4a3a2a]/80 font-serif font-light leading-relaxed max-w-md">{dept.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};