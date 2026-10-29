import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { socialMediaLinks } from '../data/portfolio';
import { playSound } from '../utils/audio';

// Clean SVG Logo Components for each social platform
function SocialPlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'facebook':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.78 1.47-.03 2.76-1.03 3.11-2.45.13-.57.14-1.16.14-1.75-.01-4.72-.01-9.44 0-14.16z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'telegram':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      );
    case 'x':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'threads':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.687 0 12.128 5.385 12.179 12.072v.228c-.027 3.327-1.393 6.44-3.847 8.766-2.42 2.296-5.69 3.565-9.208 3.573-.207 0-.414-.005-.621-.015l-.071-.004-.078-.005c-.177-.01-.354-.022-.531-.035zm.006-2.182c.162.012.324.023.487.032.19.01.38.015.57.015 3.013-.007 5.819-1.096 7.9-3.067 2.106-1.996 3.28-4.671 3.303-7.532-.043-5.503-4.521-9.928-10.074-9.928-5.573 0-10.106 4.533-10.106 10.106 0 5.573 4.533 10.106 10.106 10.106zm4.184-7.447c-.234 2.766-1.89 4.398-4.43 4.398-2.616 0-4.476-1.884-4.476-4.533 0-2.673 1.883-4.557 4.533-4.557 1.848 0 3.324.912 3.966 2.45l-1.97.904c-.37-.872-1.128-1.365-2.02-1.365-1.397 0-2.378 1.05-2.378 2.568 0 1.503.966 2.544 2.353 2.544 1.344 0 2.222-.84 2.378-2.409h-2.378v-1.989h4.422v1.989z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'github':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    default:
      return <ExternalLink className="w-5 h-5" />;
  }
}

// Letter-by-Letter and then Word Reveal Component ("ek okkhor kore uthbe then word hobe")
function TypewriterLetterWord({ 
  text, 
  delay = 0, 
  charSpeed = 0.018,
  className = "" 
}: { 
  text: string; 
  delay?: number; 
  charSpeed?: number;
  className?: string;
}) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
      {words.map((word, wordIndex) => {
        // Calculate cumulative character count up to this word
        const prevCharsCount = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);

        return (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split('').map((char, charIndex) => {
              const charGlobalIndex = prevCharsCount + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.18,
                    delay: delay + charGlobalIndex * charSpeed,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function SocialLinks() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="social-links" className="relative py-6 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-white/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* ================= GORGEOUS CAPSULE TRIGGER BUTTON (MATCHING TOP STYLE) ================= */}
      <div className="flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleExpand}
          className={`relative group px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 shadow-2xl cursor-pointer border active:scale-95 ${
            isExpanded
              ? 'bg-neutral-950 text-white border-neutral-600 hover:bg-neutral-900 shadow-[0_0_25px_rgba(255,255,255,0.12)]'
              : 'bg-white text-black border-white hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.28)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)]'
          }`}
        >
          {!isExpanded && (
            <span className="absolute -inset-1 rounded-full bg-white/25 blur-sm animate-pulse pointer-events-none" />
          )}

          {/* Title */}
          <span className="font-heading font-black italic tracking-wider text-xs sm:text-base whitespace-nowrap">
            {isExpanded ? 'CLOSE SOCIALS' : 'SOCIAL LINKS'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED SOCIAL CHANNELS WITH LETTER-BY-LETTER REVEAL ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mt-6 sm:mt-8 space-y-6 sm:space-y-8"
          >
            {/* Header with Letter-by-Letter Typewriter animation */}
            <div className="text-center max-w-2xl mx-auto px-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] sm:text-[11px] font-mono text-neutral-400 mb-2.5 sm:mb-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <TypewriterLetterWord text="12K+ ACTIVE COMMUNITY • VERIFIED CHANNELS" delay={0.05} charSpeed={0.015} />
              </div>

              <h2 className="font-heading font-black italic text-lg sm:text-3xl md:text-4xl text-white tracking-tight uppercase flex justify-center">
                <TypewriterLetterWord text="CONNECT ACROSS NETWORKS" delay={0.12} charSpeed={0.02} />
              </h2>

              <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 sm:mt-2 font-mono flex justify-center">
                <TypewriterLetterWord text="FOLLOW FOR DAILY CNC ARTWORK, WEB PROJECTS AND DESIGN DROPS." delay={0.3} charSpeed={0.012} />
              </p>
            </div>

            {/* Grid of Social Links (2 columns on mobile, 3 on md, 5 on lg) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
              {socialMediaLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.82, y: -24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.05 + idx * 0.06,
                    type: 'spring',
                    damping: 16,
                    stiffness: 150,
                  }}
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                  className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-400 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.08)] active:scale-95"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-white group-hover:text-black transition-all shadow-inner text-white">
                      <SocialPlatformIcon platform={social.platform} />
                    </div>

                    <div className="p-1 sm:p-1.5 rounded-lg bg-neutral-800 text-neutral-400 group-hover:text-white group-hover:bg-neutral-700 transition-colors">
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-3 sm:mt-4">
                    <h3 className="font-heading font-bold text-xs sm:text-base text-white group-hover:text-neutral-200 transition-colors uppercase tracking-tight truncate">
                      <TypewriterLetterWord text={social.name} delay={0.4 + idx * 0.03} charSpeed={0.02} />
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono text-neutral-400 mt-0.5 truncate">
                      {social.handle}
                    </p>
                  </div>

                  {/* Bottom line */}
                  <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                    <span>CONNECT</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
