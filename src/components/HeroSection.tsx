import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { personalData } from '../data/portfolio';
import { playSound } from '../utils/audio';

interface HeroSectionProps {
  onOpenResume?: () => void;
  onOpenSecret?: () => void;
}

const line1Words = ['Hay,', 'Assalamualaikum,'];
const line2Words = ["I'm", 'Muhammad', 'Nayeem'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: -25,
    scale: 0.85,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 120,
    },
  },
};

const underlineVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      delay: 0.95,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroSection({ onOpenResume, onOpenSecret }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll driven animation:
  // When scrolling down, smoothly fade out without harsh horizontal shifting
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScrollOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    playSound('click');
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center items-center pt-20 pb-8 sm:pt-28 sm:pb-10 md:pt-36 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-transparent text-white select-none"
    >
      {/* Ambient Soft Neutral Glow Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-white/[0.025] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Main 16:9 Balanced Viewport Layout (Responsive for Mobile & PC) */}
      <div className="relative z-10 w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-10 lg:gap-12 items-center">
        
        {/* ================= LEFT: PORTRAIT (CLEAN FADE-IN WITHOUT HORIZONTAL SLIDING) ================= */}
        <div className="lg:col-span-6 flex justify-center relative order-1">
          <motion.div
            style={{ 
              opacity: heroScrollOpacity
            }}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-end justify-center w-52 sm:w-72 md:w-80 lg:w-[420px] xl:w-[450px] h-[300px] sm:h-[420px] md:h-[480px] lg:h-[530px] xl:h-[560px]"
          >
            {/* Ground Contact Shadow (Confined strictly under feet/body, not sides) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-4 bg-black/80 rounded-[100%] blur-md pointer-events-none z-0" />

            {/* Back Glow Silhouette Halo */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.04] via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Portrait Image */}
            <div className="relative w-full h-full flex items-end justify-center overflow-visible z-10">
              <img
                src={personalData.profileImage}
                alt="Muhammad Nayeem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-bottom filter contrast-[1.06] brightness-[1.02] drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = personalData.fallbackImage;
                }}
              />

              {/* Natural Black Smudge strictly confined to feet & body width */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-40 h-10 sm:h-14 bg-gradient-to-t from-black via-black/85 to-transparent rounded-b-xl pointer-events-none z-20" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-44 h-4 bg-black rounded-[100%] blur-[3px] pointer-events-none z-30" />
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT: IDENTITY TEXT (CLEAN STABLE ENTRANCE) ================= */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left justify-center space-y-3 sm:space-y-4 order-2 px-2 sm:px-4">
          
          <motion.div
            style={{
              opacity: heroScrollOpacity
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 sm:space-y-3 relative w-full"
          >
            {/* Line 1: H2 Greeting Header with Staggered Word Reveal & Floating Letters */}
            <motion.h2
              aria-label="Hay, Assalamualaikum,"
              variants={wordVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 sm:gap-x-2.5 gap-y-1 text-neutral-300 font-sans font-medium text-base sm:text-2xl md:text-3xl tracking-tight"
            >
              {line1Words.map((word, wIdx) => (
                <motion.span
                  key={`l1-w-${wIdx}-${word}`}
                  variants={wordVariants}
                  className={`inline-flex whitespace-nowrap ${
                    word === 'Assalamualaikum,' ? 'text-white font-semibold' : 'text-neutral-300'
                  }`}
                >
                  {word.split('').map((char, cIdx) => (
                    <motion.span
                      key={`l1-c-${wIdx}-${cIdx}-${char}`}
                      variants={letterVariants}
                      className="inline-block transform-gpu"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h2>

            {/* Line 2: H1 Identity Header with Staggered Word Reveal & Floating Letters */}
            <motion.h1
              aria-label="I'm Muhammad Nayeem"
              variants={wordVariants}
              className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-1.5 sm:gap-x-3.5 gap-y-1 font-heading font-black italic uppercase tracking-tight"
            >
              {line2Words.map((word, wIdx) => {
                if (word === "I'm") {
                  return (
                    <motion.span
                      key={`l2-w-${wIdx}-${word}`}
                      variants={wordVariants}
                      className="inline-flex whitespace-nowrap text-neutral-400 font-sans font-normal not-italic text-base sm:text-2xl md:text-3xl normal-case mr-1"
                    >
                      {word.split('').map((char, cIdx) => (
                        <motion.span
                          key={`l2-c-${wIdx}-${cIdx}-${char}`}
                          variants={letterVariants}
                          className="inline-block transform-gpu"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  );
                }
                return (
                  <motion.span
                    key={`l2-w-${wIdx}-${word}`}
                    variants={wordVariants}
                    className="inline-flex whitespace-nowrap text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300 drop-shadow-[0_2px_15px_rgba(255,255,255,0.18)]"
                  >
                    {word.split('').map((char, cIdx) => (
                      <motion.span
                        key={`l2-c-${wIdx}-${cIdx}-${char}`}
                        variants={letterVariants}
                        className="inline-block transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Clean Underline Accent */}
            <motion.div
              variants={underlineVariants}
              className="pt-1 sm:pt-2 flex items-center justify-center lg:justify-start origin-left"
            >
              <div className="w-20 sm:w-48 h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-white via-neutral-300 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
