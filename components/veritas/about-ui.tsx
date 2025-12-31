"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowLeft, Target, Users, Lightbulb, Award, 
  BookOpen, Mic2, Feather 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUI() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".about-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Mission Card Animation
      gsap.fromTo(".mission-card",
        { y: 50, opacity: 0, scale: 0.98 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.1)",
          scrollTrigger: { trigger: ".mission-card", start: "top 80%" }
        }
      );

      // Values Stagger
      gsap.fromTo(".value-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8,
          scrollTrigger: { trigger: ".values-grid", start: "top 75%" }
        }
      );

      // Activities Animation
      gsap.fromTo(".activity-card",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.2, duration: 1,
          scrollTrigger: { trigger: ".activities-list", start: "top 70%" }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 max-w-5xl mx-auto px-6 py-32">
      
      {/* Header */}
      <div className="about-header text-center mb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-900/40 hover:text-amber-900 transition-colors mb-8 font-mono text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </Link>

        <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight text-[#2a1c0f] mb-6">
          ABOUT VERITAS
        </h1>
        <div className="w-24 h-1 bg-[#bc6c25] mx-auto mb-8" />
        <p className="text-xl md:text-2xl font-serif italic text-amber-900/60 max-w-2xl mx-auto">
          "Dismantling Echo Chambers Through Intellectual Discourse."
        </p>
      </div>

      {/* Mission Statement */}
      <section className="mb-32">
        <div className="mission-card relative p-8 md:p-12 bg-white border border-[#d4c5b0] shadow-xl shadow-amber-900/5 rounded-sm">
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#bc6c25] -mt-2 -ml-2 opacity-50" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#bc6c25] -mb-2 -mr-2 opacity-50" />

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-[#f4f1ea] rounded-full border border-[#d4c5b0]">
              <Target className="w-8 h-8 text-[#bc6c25]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#2a1c0f]">Our Mission</h2>
            <p className="text-lg md:text-xl font-serif leading-relaxed text-amber-900/80 max-w-3xl">
              VERITAS ORATORY SOCIETY is an intellectual society dedicated to fostering <span className="font-bold text-[#2a1c0f]">critical thinking</span>, 
              <span className="font-bold text-[#2a1c0f]"> rigorous discussions</span>, and the <span className="font-bold text-[#2a1c0f]">pursuit of truth</span> through structured discourse. 
              We believe that the best ideas emerge when challenged by diverse perspectives in an environment of mutual respect.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-32">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-amber-900/40 uppercase tracking-[0.3em]">Foundations</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2a1c0f] mt-3">Core Values</h2>
        </div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              icon: Lightbulb, 
              title: "Intellectual Honesty", 
              desc: "We prioritize truth over comfort, encouraging members to question assumptions." 
            },
            { 
              icon: Users, 
              title: "Diverse Perspectives", 
              desc: "We weave together varied backgrounds to create a rich tapestry of thought." 
            },
            { 
              icon: Target, 
              title: "Evidence-Based", 
              desc: "Our discussions are grounded in facts, logic, and rigorous analysis." 
            },
            { 
              icon: Award, 
              title: "Respectful Discourse", 
              desc: "We debate ideas vigorously while maintaining profound respect for the individual." 
            }
          ].map((val, i) => (
            <div key={i} className="value-card group p-8 bg-[#f4f1ea] border border-[#d4c5b0] hover:bg-white hover:border-[#bc6c25] hover:shadow-lg transition-all duration-500">
              <div className="mb-6 inline-flex p-3 bg-white border border-[#d4c5b0] rounded-full group-hover:border-[#bc6c25] transition-colors">
                <val.icon className="w-6 h-6 text-[#2a1c0f] group-hover:text-[#bc6c25] transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2a1c0f] mb-3 group-hover:text-[#bc6c25] transition-colors">
                {val.title}
              </h3>
              <p className="text-amber-900/70 font-serif leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-amber-900/10 flex-1" />
          <h2 className="text-4xl font-serif font-bold text-[#2a1c0f]">Methodology</h2>
          <div className="h-px bg-amber-900/10 flex-1" />
        </div>

        <div className="activities-list space-y-6">
          {[
            { 
              icon: Mic2, 
              title: "Structured Oratory Events", 
              desc: "Formal oratory events on contemporary issues, providing a platform for well-researched arguments." 
            },
            { 
              icon: Users, 
              title: "Discussion Forums", 
              desc: "Sessions where members explore complex topics through guided, collaborative conversations." 
            },
            { 
              icon: Feather, 
              title: "Publishing & Research", 
              desc: "Through the Veritas Speaking Digest, we publish essays that contribute to meaningful discourse." 
            }
          ].map((item, i) => (
            <div key={i} className="activity-card flex items-start gap-6 p-6 bg-white border-b border-[#d4c5b0] last:border-0 hover:bg-[#f4f1ea] transition-colors">
              <div className="shrink-0 p-4 bg-[#f8f4ed] rounded-full text-[#bc6c25]">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2a1c0f] mb-2">{item.title}</h3>
                <p className="text-amber-900/70 font-serif leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}