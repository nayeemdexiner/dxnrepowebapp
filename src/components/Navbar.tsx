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
    { label: 'Services', shortLabel: 'Serv', href: '#services', id: 'services' },
    { label: 'Contact', shortLabel: 'Mail', href: '#contact', id: 'contact' },
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
      className="fixed top-5 sm:top-6 md:top-8 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-center">
        {currentPage === 'skills' ? (
          <button
            onClick={() => onNavigate?.('home')}
            className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950/90 text-white border border-white/20 hover:border-white/40 text-xs sm:text-sm font-semibold backdrop-blur-2xl shadow-2xl cursor-pointer transition-all active:scale-95"
          >
            ← Back to Home
          </button>
        ) : (
          /* 
            ORGANIC MINIMAL NAVBAR:
            - Phone: Pushed comfortably downward (top-5) with compact width (max-w-[86vw]) so it floats naturally inside the curved bezel.
            - PC: Wide, luxurious, spacious pill with generous padding and breathability.
          */
          <nav
            ref={navContainerRef}
            onMouseLeave={() => setHoveredSection(null)}
            className={`pointer-events-auto w-auto max-w-[94vw] sm:max-w-none flex items-center justify-between sm:justify-center gap-[2px] xs:gap-1 sm:gap-2.5 md:gap-3.5 bg-neutral-950/85 px-1.5 sm:px-4 md:px-6 py-1 sm:py-2 md:py-2.5 rounded-full border border-white/[0.18] hover:border-white/35 backdrop-blur-2xl transition-all duration-300 ${
              isScrolled
                ? 'shadow-[0_14px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.1)] border-white/30 bg-neutral-950/90'
                : 'shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_15px_rgba(255,255,255,0.05)]'
            }`}
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
                  className={`relative px-1.5 xs:px-2 sm:px-4 md:px-5 py-1 sm:py-2 rounded-full text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium sm:font-semibold tracking-tighter xs:tracking-normal sm:tracking-wide text-center whitespace-nowrap transition-colors duration-200 cursor-pointer select-none shrink-0 ${
                    isCurrent
                      ? 'text-black font-bold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {/* Automatic White Sliding Capsule Indicator (Buttery Smooth, 0 Lag) */}
                  {isCurrent && (
                    <motion.div
                      layoutId="autoSlidingWhitePillUnified"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                  {/* Label: Short version on ultra-narrow phones, full version on tablet/desktop */}
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
