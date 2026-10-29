import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { educationData } from '../data/portfolio';
import { playSound } from '../utils/audio';

export default function EducationSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      id="education"
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
            {isExpanded ? 'CLOSE EDUCATION' : 'EDUCATION'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED EDUCATION CARDS ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {educationData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.82, y: -26, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.06 + idx * 0.09,
                    type: 'spring',
                    damping: 16,
                    stiffness: 150,
                  }}
                  className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-neutral-800/80 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                        {item.year}
                      </span>
                      {item.status === 'Running' ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Running
                        </span>
                      ) : item.gpa ? (
                        <span className="text-[10px] font-mono text-white font-semibold">
                          GPA {item.gpa}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                      {item.degree}
                    </h3>
                    
                    <p className="text-[11px] text-neutral-400">
                      {item.institution}
                    </p>
                  </div>

                  {item.group && (
                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>Group: {item.group}</span>
                      {item.board && <span>Board: {item.board}</span>}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-6 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              >
                CLOSE EDUCATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
