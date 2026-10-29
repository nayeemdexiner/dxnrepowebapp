import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Code2, 
  Palette, 
  Layers, 
  FileSpreadsheet, 
  Sparkles, 
  ChevronDown,
  ChevronUp, 
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolio';
import { playSound } from '../utils/audio';

const tabIcons = [Code2, Palette, Layers, FileSpreadsheet];

interface SkillsSectionProps {
  onOpenSkillsPage?: () => void;
}

export default function SkillsSection({ onOpenSkillsPage }: SkillsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-6 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-white/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* ================= GORGEOUS CAPSULE TRIGGER BUTTON (MATCHING TOP STYLE) ================= */}
      <div className="flex flex-col items-center justify-center gap-2">
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
          {/* Animated Glow Border */}
          {!isExpanded && (
            <span className="absolute -inset-1 rounded-full bg-white/25 blur-sm animate-pulse pointer-events-none" />
          )}

          {/* Title */}
          <span className="font-heading font-black italic tracking-wider text-xs sm:text-base whitespace-nowrap">
            {isExpanded ? 'CLOSE SKILLS' : 'SKILLS'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED SKILLS BURST ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
          >
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {skillCategories.map((cat, idx) => {
                const isActive = activeTab === idx;
                const Icon = tabIcons[idx] || Code2;
                return (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={cat.category}
                    onClick={() => {
                      playSound('tab');
                      setActiveTab(idx);
                    }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold font-mono transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-105 border border-white'
                        : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span>{cat.category.split(' ')[0]}</span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                      {cat.skills.length}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active Category Skills Burst Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5"
            >
              {skillCategories[activeTab]?.skills.map((skill, sIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.82, y: -24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.04 + sIdx * 0.05,
                    type: 'spring',
                    damping: 16,
                    stiffness: 150,
                  }}
                  className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800/80 hover:border-neutral-600 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-white truncate">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-white transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Clean Level Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-900 border border-neutral-800/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.6, delay: sIdx * 0.05 }}
                      className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>{skill.tag || 'Expert'}</span>
                    <span>{skill.experience}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Mini Close Prompt */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Close Skills</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
