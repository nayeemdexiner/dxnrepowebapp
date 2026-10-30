import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  MapPin, 
  Briefcase,
  Sparkles,
  ChevronUp,
  Quote
} from 'lucide-react';
import { personalData, experienceData } from '../data/portfolio';
import { playSound } from '../utils/audio';

// Word-by-word staggered reveal animation
const containerWordsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const singleWordVariant = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const exp = experienceData[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  const paragraphs = [
    "I am Muhammad Nayeem.",
    "While everyone is chasing the destination, I have learned to fall in love with the journey. Because I know every small step eventually builds a profound legacy.",
    "I don't speak loud. My work speaks for itself. The late-night hours learning new craft, the resilient mornings rising from failures, and an unshakable belief in myself—these are my true assets.",
    "My only competition is who I was yesterday. If I can outgrow that person, my day is already a victory."
  ];

  const quickStats = [
    { label: 'Specialty', value: 'Sr. Computerized Numerical Control Programmer & Designer', icon: Briefcase },
    { label: 'Practice', value: 'Independent Design Studio', icon: Sparkles },
    { label: 'Location', value: 'Hajiganj, Chandpur, BD', icon: MapPin },
    { label: 'Philosophy', value: 'Focus, Discipline & Daily Growth', icon: Quote },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-6 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-white/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* ================= GORGEOUS CAPSULE TRIGGER BUTTON ================= */}
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

          <span className="font-heading font-black italic tracking-wider text-xs sm:text-base whitespace-nowrap">
            {isExpanded ? 'CLOSE ABOUT' : 'ABOUT ME'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED ABOUT PROFILE ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 items-stretch">
              
              {/* Left: Bengali Poetic Bio & Reflections (Animated Word by Word) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.06, type: 'spring', damping: 16, stiffness: 150 }}
                className="md:col-span-8"
              >
                <div className="h-full glass-panel p-5 sm:p-7 rounded-2xl border border-neutral-800/80 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                        PERSONAL STATEMENT
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Muhammad Nayeem
                      </span>
                    </div>

                    {/* Word-by-Word Animated Bengali Statement */}
                    <motion.div
                      variants={containerWordsVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3.5 pt-1"
                    >
                      {/* Paragraph 1: Headline */}
                      <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {paragraphs[0].split(' ').map((word, wIdx) => (
                          <motion.span
                            key={`p0-${wIdx}`}
                            variants={singleWordVariant}
                            className="inline-block mr-1.5 text-white font-extrabold"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h3>

                      {/* Paragraph 2, 3, 4: Deep Personal Philosophy */}
                      {paragraphs.slice(1).map((para, pIdx) => (
                        <p
                          key={`p-block-${pIdx}`}
                          className="text-neutral-200 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose font-normal"
                        >
                          {para.split(' ').map((word, wIdx) => (
                            <motion.span
                              key={`p${pIdx + 1}-${wIdx}`}
                              variants={singleWordVariant}
                              className="inline-block mr-1.5 hover:text-white transition-colors"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </p>
                      ))}
                    </motion.div>
                  </div>

                  {/* Clean Personal Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-neutral-800/60">
                    {quickStats.map((st) => {
                      const Icon = st.icon;
                      return (
                        <div key={st.label} className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/60 flex items-center gap-2.5 min-w-0">
                          <Icon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <div className="truncate min-w-0">
                            <div className="text-[9px] font-mono text-neutral-500 uppercase">{st.label}</div>
                            <div className="text-xs font-semibold text-white truncate">{st.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Right: Portrait Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.14, type: 'spring', damping: 16, stiffness: 150 }}
                className="md:col-span-4"
              >
                <div className="h-full glass-panel p-4 sm:p-7 rounded-2xl border border-neutral-800/80 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-700/80 shadow-lg">
                    <img
                      src={personalData.profileImage}
                      alt="Muhammad Nayeem"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = personalData.fallbackImage;
                      }}
                    />
                  </div>
                  
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">Muhammad Nayeem</div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">Hajiganj, Chandpur, Bangladesh</div>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/60 text-center">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-700/60">
                      <div className="text-xs sm:text-sm font-bold text-white">Design & Code</div>
                      <div className="text-[9px] font-mono text-neutral-400">Specialist</div>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-700/60">
                      <div className="text-xs sm:text-sm font-bold text-white">3+ Years</div>
                      <div className="text-[9px] font-mono text-neutral-400">Experience</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Close About</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
