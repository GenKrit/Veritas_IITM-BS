"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Mail, Phone, MapPin, Send, Quote, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { ChapterTitle, RevealText } from "./ui-elements"; // Ensure this path is correct
import Image from "next/image";

gsap.registerPlugin(TextPlugin);

// ==================== CONTACT SECTION ====================
export const ContactSection = () => {
  const contactInfo = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "oratory.society@study.iitm.ac.in", 
      href: "mailto:oratory.society@study.iitm.ac.in" 
    },
    { 
      icon: Phone, 
      label: "WhatsApp", 
      value: "Veritas Podium", 
      href: "https://docs.google.com/forms/d/e/1FAIpQLSduNpnN_Le5odQy5O0s9uELmMGbnclxAbz-BN4Za1rLrF7rMw/viewform" 
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "IIT Madras BS Degree Office, Chennai", 
      href: "#" 
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative bg-gradient-to-b from-white/90 to-amber-50/90 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <ChapterTitle 
          num="07" 
          title="Contact" 
          subtitle="Reach out to the council. We are listening." 
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">
          
          {/* LEFT COLUMN: Contact Cards */}
          <RevealText delay={0.2}>
            <div className="space-y-6 md:space-y-8">
              {contactInfo.map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive flex items-center gap-4 md:gap-6 p-5 md:p-8 bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-4xl border border-amber-200/50 hover:shadow-2xl hover:shadow-amber-900/30 transition-all group"
                  whileHover={{ x: 10, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon Box */}
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <contact.icon className="w-6 h-6 md:w-10 md:h-10 text-white drop-shadow-md" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0"> 
                    <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-amber-800/70 mb-1">
                      {contact.label}
                    </p>
                    <p className="text-base md:text-2xl font-serif font-bold text-[#2a1c0f] group-hover:text-amber-900 transition-colors truncate">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </RevealText>

          {/* RIGHT COLUMN: Contact Form */}
          <RevealText delay={0.5}>
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-4xl p-6 md:p-10 border-2 border-amber-200/50 shadow-xl hover:shadow-amber-900/20 transition-all">
              <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#2a1c0f] mb-8 md:mb-10 text-center md:text-left">
                Send a Message
              </h4>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="interactive w-full p-4 md:p-6 rounded-2xl border-2 border-amber-200/50 bg-white/50 backdrop-blur-sm text-[#2a1c0f] placeholder-amber-500/60 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-base md:text-lg font-serif"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="interactive w-full p-4 md:p-6 rounded-2xl border-2 border-amber-200/50 bg-white/50 backdrop-blur-sm text-[#2a1c0f] placeholder-amber-500/60 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-base md:text-lg font-serif"
                  />
                </div>
                
                <textarea
                  placeholder="Why do you want to master the art of rhetoric?"
                  rows={5}
                  className="interactive w-full p-4 md:p-6 rounded-2xl border-2 border-amber-200/50 bg-white/50 backdrop-blur-sm text-[#2a1c0f] placeholder-amber-500/60 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-base md:text-lg font-serif resize-none"
                />

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="interactive w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#2a1c0f] font-serif font-bold text-lg md:text-xl py-4 md:py-6 px-8 rounded-xl md:rounded-3xl hover:shadow-lg hover:shadow-amber-900/40 transition-all flex items-center justify-center gap-3 group"
                >
                  Send Transmission
                  <Send className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </RevealText>

        </div>
      </div>
    </section>
  );
};

// ==================== TYPEWRITER QUOTES ====================
export const TypewriterQuotes = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const quotes = [
    '"I have a dream that one day..." — Martin Luther King Jr.',
    '"We shall fight on the beaches..." — Winston Churchill',
    '"Ask not what your country..." — John F. Kennedy',
    '"The only thing we have to fear..." — Franklin D. Roosevelt',
    '"Ich bin ein Berliner..." — John F. Kennedy'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const typeText = () => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          text: quotes[currentIndex],
          duration: 3,
          ease: "none",
          onComplete: () => {
            gsap.delayedCall(2, () => {
              gsap.to(textRef.current, {
                text: "",
                duration: 1,
                ease: "none",
                onComplete: () => {
                  currentIndex = (currentIndex + 1) % quotes.length;
                  typeText();
                }
              });
            });
          }
        });
      }
    };
    typeText();
  }, []); // Removed `quotes` from dependency array to prevent re-run loops

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-amber-900/15 via-amber-800/10 to-amber-900/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">
        
        <Quote className="w-16 h-16 md:w-28 md:h-28 text-amber-700/30 mx-auto mb-8 md:mb-16 drop-shadow-4xl animate-pulse" />
        
        <div className="bg-white/90 backdrop-blur-3xl rounded-3xl md:rounded-4xl p-8 md:p-20 border-4 border-amber-200/50 shadow-4xl min-h-[250px] md:min-h-[350px] flex flex-col items-center justify-center">
          <div 
            ref={textRef} 
            className="font-serif text-2xl md:text-5xl font-light italic text-[#2a1c0f]/95 leading-relaxed min-h-[120px] md:min-h-[150px] flex items-center justify-center w-full" 
          />
          <div className="mt-6 md:mt-8 flex justify-center">
            <span className="inline-block w-1.5 h-10 md:w-2 md:h-14 bg-gradient-to-b from-amber-600 to-amber-800 animate-pulse shadow-xl" />
          </div>
          <p className="text-xs md:text-xl font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-amber-800/80 mt-8 md:mt-12">
            Historic Speeches That Shaped Nations
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== FOOTER ====================
export const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/veritas_iitm/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/veritas-iitm-bs-oratory-club/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/veritas_iitmbs?t=WTIh86phqD4J1KDG68oLzA&s=09", label: "Twitter" },
    { icon: Youtube, href: "https://linktr.ee/veritasiitmbs", label: "YouTube" },
  ];

  return (
    <footer className="py-16 md:py-24 relative z-20 bg-gradient-to-t from-amber-900/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid: 1 Col Mobile -> 2 Col Tablet -> 4 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-[#4a3a2a]/80">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl md:rounded-4xl flex items-center justify-center shadow-4xl" 
                whileHover={{ scale: 1.1, rotate: 360 }} 
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/veritas-logo.png"
                  alt="Veritas Logo"
                  width={65}
                  height={65}
                  className="object-contain p-1"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-[#2a1c0f]">
                  VERITAS
                </h3>
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-amber-700/70">
                  ORATORY SOCIETY • MMXXV
                </p>
              </div>
            </div>
            <p className="text-base md:text-lg font-serif leading-relaxed max-w-lg">
              The oratory forum of IIT Madras BS Degree. Where truth is forged through fire, and eloquence becomes legend.
            </p>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#2a1c0f] mb-6 uppercase tracking-wide">
              The Forum
            </h4>
            <ul className="space-y-4 text-sm font-light">
              {["Events", "Legacy", "Council"].map((item) => (
                <li key={item} className="interactive group hover:text-amber-900 cursor-pointer transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-600/50 rounded-full group-hover:w-4 transition-all" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Social Column */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#2a1c0f] mb-6 uppercase tracking-wide">
              Connect
            </h4>
            <ul className="space-y-4 text-sm font-light mb-8">
              <li className="interactive flex items-start gap-3 hover:text-amber-900 transition-colors break-all">
                <Mail className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" /> 
                <a href="mailto:oratory.society@study.iitm.ac.in" className="hover:underline">
                  oratory.society@<br className="md:hidden"/>study.iitm.ac.in
                </a>
              </li>
              <li className="interactive flex items-center gap-3 hover:text-amber-900 transition-colors">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" /> 
                <span>IIT Madras BS Degree Office</span>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="interactive w-10 h-10 md:w-12 md:h-12 border border-amber-200/50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-700 hover:bg-amber-100 hover:border-amber-400 transition-all shadow-md hover:shadow-amber-900/20" 
                  whileHover={{ scale: 1.2, rotate: 360 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Bottom / Credits */}
        <div className="border-t border-amber-200/30 mt-12 md:mt-20 pt-8 md:pt-12 text-center">
          <motion.div 
            className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-gradient-to-r from-amber-50/80 to-white/90 backdrop-blur-xl px-4 md:px-6 py-3 rounded-2xl border border-amber-200/40 shadow-lg hover:shadow-amber-900/20 transition-all duration-300 group max-w-[90vw]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#4a3a2a]/60 text-xs md:text-sm font-mono uppercase tracking-widest text-center">
              © 2025 Veritas Oratory Society
            </span>
            
            <span className="hidden md:inline text-amber-300">|</span>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-[#4a3a2a]/60 text-xs md:text-sm font-mono uppercase tracking-widest">
                Made with
              </span>
              <span className="text-amber-700/90 font-semibold tracking-widest text-xs md:text-sm">
                ❤️
              </span>
              <span className="text-[#4a3a2a]/60 text-xs md:text-sm font-mono uppercase tracking-widest">
                by
              </span>
              
              {/* Developer Link */}
              <a
                href="https://www.linkedin.com/in/shashwat-pandey-13b682251/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif font-bold text-amber-800 hover:text-amber-600 underline decoration-amber-400/50 hover:decoration-amber-600/80 underline-offset-2 group/link inline-flex items-center gap-1 px-2 py-1 rounded transition-all duration-300 hover:bg-amber-100/50 hover:shadow-md text-sm md:text-base"
              >
                Shashwat Pandey
                <motion.span
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  ✨
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </footer>
  );
};