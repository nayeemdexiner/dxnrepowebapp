import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { playSound } from '../utils/audio';

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenSecret?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navbar({
  currentPage = 'home',
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // The highlighted button is the one currently hovered, or the active section
  const currentSection = hoveredSection || activeSection;

  // Real-time scroll section tracker
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      if (currentPage !== 'home') return;

      const sections = ['home', 'about', 'education', 'skills', 'projects', 'services', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navLinks = [
    { label: 'Home', shortLabel: 'Home', href: '#home', id: 'home' },
    { label: 'About', shortLabel: 'About', href: '#about', id: 'about' },
    { label: 'Education', shortLabel: 'Edu', href: '#education', id: 'education' },
    { label: 'Skills', shortLabel: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', shortLabel: 'Work', href: '#projects', id: 'projects' },
    { label: 'Services', shortLabel: 'Service', href: '#services', id: 'services' },
    { label: 'Contact', shortLabel: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (link: (typeof navLinks)[0]) => {
    playSound('click');
    setActiveSection(link.id);
    setHoveredSection(null);

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const target = document.querySelector(link.href) || document.getElementById(link.id);
        if (target) {
          const targetTop = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 75;
          window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const target = document.querySelector(link.href) || document.getElementById(link.id);
    if (target) {
      const targetTop = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-2 sm:top-5 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
    >
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-6 flex items-center justify-center">
        {currentPage === 'skills' ? (
          <button
            onClick={() => onNavigate?.('home')}
            className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-950/90 text-white border border-white/20 hover:border-white/40 text-xs font-semibold backdrop-blur-xl shadow-xl cursor-pointer transition-all active:scale-95"
          >
            ← Back to Home
          </button>
        ) : (
          /* 
            UNIFIED FULL-WIDTH COMPACT SLIDING NAVBAR (No 3-dot button on phone):
            Spans gracefully across mobile screens with compact proportions, 
            smooth sliding white pill indicator, and zero lag.
          */
          <nav
            ref={navContainerRef}
            onMouseLeave={() => setHoveredSection(null)}
            className={`pointer-events-auto w-full sm:w-auto max-w-[97vw] sm:max-w-none flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1 bg-neutral-950/92 p-1 sm:p-1.5 rounded-full border border-white/20 backdrop-blur-2xl transition-all duration-300 overflow-x-auto no-scrollbar scroll-smooth ${
              isScrolled
                ? 'shadow-[0_10px_35px_rgba(0,0,0,0.95),0_0_20px_rgba(255,255,255,0.08)] border-white/30'
                : 'shadow-[0_8px_25px_rgba(0,0,0,0.85)]'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {navLinks.map((link) => {
              const isCurrent = currentSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => {
                    playSound('hover');
                    setHoveredSection(link.id);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  className={`relative flex-1 sm:flex-initial px-2 sm:px-4 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-tight sm:tracking-wide text-center whitespace-nowrap transition-colors duration-150 cursor-pointer select-none shrink-0 ${
                    isCurrent
                      ? 'text-black font-bold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {/* Automatic White Sliding Capsule Indicator (Buttery Smooth, 0 Lag) */}
                  {isCurrent && (
                    <motion.div
                      layoutId="autoSlidingWhitePillUnified"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_16px_rgba(255,255,255,0.5)]"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                  {/* Label: Short version on ultra-narrow phones, full version on desktop */}
                  <span className="relative z-10 block sm:hidden">
                    {link.shortLabel}
                  </span>
                  <span className="relative z-10 hidden sm:block">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
