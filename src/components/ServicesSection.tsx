import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Smartphone, 
  Sparkles, 
  Layers, 
  Palette,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { servicesData } from '../data/portfolio';
import { playSound } from '../utils/audio';

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Layout,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
};

export default function ServicesSection() {
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

  const handleInquire = () => {
    playSound('click');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
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
            {isExpanded ? 'CLOSE SERVICES' : 'SERVICES'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED SERVICES GRID BURST ================= */}
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
              {servicesData.map((service, idx) => {
                const Icon = iconMap[service.icon] || Code2;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.82, y: -24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.05 + idx * 0.08,
                      type: 'spring',
                      damping: 16,
                      stiffness: 150,
                    }}
                    onClick={handleInquire}
                    className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-neutral-800/80 hover:border-neutral-600 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-neutral-200 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {service.subtitle || service.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Close Services</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
