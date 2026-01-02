// veritas-website\components\navbar\Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  Award,
  BookOpen,
  Lock,
  Archive,
  Info,
  Sparkles,
  Menu,
  X,
  UserPlus
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = "home" }: NavbarProps) {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: "join", label: "Join Society", icon: UserPlus, path: "https://docs.google.com/forms/d/e/1FAIpQLSduNpnN_Le5odQy5O0s9uELmMGbnclxAbz-BN4Za1rLrF7rMw/viewform" },
    { id: "home", label: "Home", icon: Award, path: "/" },
    { id: "VSD", label: "VSD Archieve", icon: Archive, path: "/vsd" },
    { id: "Events", label: "Events", icon: Calendar, path: "/events" },
    { id: "council", label: "Council", icon: Users, path: "/team" },
    { id: "content", label: "Content", icon: BookOpen, path: "/content" },
    { id: "about", label: "About", icon: Info, path: "/about" },
    // { id: "contact", label: "Contact", icon: Sparkles, path: "/contact" },
  ];

  const handleNavigate = (item: typeof navItems[number]) => {
    // If already on target page → do nothing
    if (pathname === item.path) return;

    // Home page scroll support
    if (item.path === "/" && pathname === "/") {
      const el = document.getElementById(item.id);
      if (el) {
        gsap.to(window, {
          scrollTo: { y: el, offsetY: 100 },
          duration: 2,
          ease: "power3.inOut",
        });
      }
      setMobileMenuOpen(false);
      return;
    }

    // Otherwise route normally
    router.push(item.path);
    setMobileMenuOpen(false);
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // ==================== MOBILE VERSION ====================
if (isMobile) {
  return (
    <>
      {/* Mobile Top Bar: Hamburger Left + Logo Right */}
      <div className="fixed top-6 left-6 right-6 z-1001 flex items-center justify-between">
        {/* Hamburger Button - LEFT  */}
        <motion.button
          onClick={() => setMobileMenuOpen(prev => !prev)} // Toggle logic
          className="p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-amber-200/50 shadow-xl hover:shadow-amber-900/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-amber-900" />
          ) : (
            <Menu className="w-6 h-6 text-amber-900" />
          )}
        </motion.button>

        {/* Logo - RIGHT */}
        <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100/60 shadow-inner hover:scale-105 transition">
          <Image
            src="/veritas-logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Mobile Full-Screen Menu -  FIXED BOUNDS */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-1000 bg-gradient-to-br from-amber-50 via-white to-amber-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-x-0 top-24 bottom-0 flex flex-col items-center justify-center px-6 sm:px-8 py-8 overflow-y-auto" // ✅ Fixed bounds + scroll
              onClick={e => e.stopPropagation()}
            >
              {/* Logo at top */}
              <motion.div className="mb-12 sm:mb-16" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Image
                    src="/veritas-logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Nav Items - Responsive spacing */}
              <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-md w-full px-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      onClick={() => handleNavigate(item)}
                      className={`group w-full flex items-center gap-4 p-4 sm:p-6 rounded-2xl transition-all duration-300 shadow-xl ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xl'
                          : 'bg-white/90 backdrop-blur-xl text-amber-900 hover:bg-amber-100 border border-amber-200/50 hover:shadow-2xl'
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                        isActive ? 'bg-white/30' : 'bg-gradient-to-br from-amber-500 to-amber-600'
                      }`}>
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isActive ? 'text-white' : 'text-white'}`} />
                      </div>
                      <span className="text-xl sm:text-2xl font-bold font-serif">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Admin Button - Responsive */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-8 sm:mt-12 w-full max-w-md px-4"
              >
                <Link
                  href="/admin"
                  className="group flex items-center justify-center gap-4 w-full p-5 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl hover:shadow-gray-900/50 transition-all text-lg sm:text-xl font-bold font-serif"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span>Admin Portal</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


  // ==================== DESKTOP VERSION  ====================
  return (
    <>
      <div
        className="fixed left-0 top-0 bottom-0 z-1000 flex group"
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Hover trigger (fixed, non-blocking) */}
        <div className="w-20 h-full absolute left-0 top-0 z-999 pointer-events-none" />

        <motion.nav
          initial={{ x: "-100%" }}
          animate={{ x: sidebarHovered ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full w-20 border-r border-amber-200/40 
          bg-white/90 backdrop-blur-2xl flex flex-col items-center py-12 
          shadow-2xl pointer-events-auto
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="mb-2 flex items-center justify-center w-14 h-14 rounded-4xl bg-amber-100/60 
            shadow-inner hover:scale-105 transition"
          >
            <Image
              src="/veritas-logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* NAV ITEMS */}
          <div className="mb-auto flex flex-col gap-5 pt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className={`group relative p-4 rounded-2xl transition-all duration-500 cursor-pointer
                    ${
                      isActive
                        ? "bg-amber-100/50"
                        : "hover:bg-amber-100/50"
                    }`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={`w-6 h-6 relative z-10 ${
                      isActive
                        ? "text-amber-700"
                        : "text-amber-600/70 group-hover:text-amber-700"
                    }`}
                  />
                  <span className="absolute left-24 top-1/2 -translate-y-1/2  bg-white/95 border border-amber-200 
                  text-amber-900 text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full 
                  opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-lg z-1001">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
          

          {/* ADMIN */}
          <div className="mt-auto pt-10 ">
            <Link
              href="/admin"
              className="group relative p-4 rounded-2xl bg-linear-to-br from-amber-500 to-amber-600 text-white shadow-2xl hover:scale-110 transition-all duration-500 block"
            >
              <Lock className="w-6 h-6" />
              <span className="absolute left-24 bg-white/95 text-amber-900 text-[10px] 
              font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full opacity-0 
              group-hover:opacity-100 transition-all whitespace-nowrap shadow-lg z-1001 bottom-4">
                Admin Portal
              </span>
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* Header trigger */}
      <header className="fixed top-6 right-6 md:right-12 z-999 gap-4">
        {/* Sticky Join Society Button */}
        <Link 
          href="https://docs.google.com/forms/d/e/1FAIpQLSduNpnN_Le5odQy5O0s9uELmMGbnclxAbz-BN4Za1rLrF7rMw/viewform"
          className="hidden md:flex items-center gap-2 mb-3 bg-amber-900 text-white px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold uppercase tracking-widest text-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Join Society</span>
        </Link>
        <motion.div
          animate={{ opacity: sidebarHovered ? 0 : 1 }}
          onMouseEnter={() => setSidebarHovered(true)}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-amber-200/50 shadow-xl cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-amber-600 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900">
            Navigate
          </span>
        </motion.div>
      </header>
    </>
  );
}
