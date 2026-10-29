import { motion } from 'motion/react';
import { 
  Palette, 
  Cpu, 
  Layers, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Brain, 
  Lightbulb, 
  Wrench, 
  Target, 
  Workflow
} from 'lucide-react';
import { personalData } from '../data/portfolio';
import { playSound } from '../utils/audio';

const whatIDoIcons = [
  Palette,
  Sparkles,
  Cpu,
  Layers,
  Compass,
  Workflow
];

const mindsetIcons = [
  Brain,
  Lightbulb,
  Wrench,
  Target,
  CheckCircle2
];

export default function CinematicCharacterScene() {
  return (
    <section
      id="what-i-do"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-black"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-neutral-800/60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-neutral-900 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>CORE PROFICIENCIES & IDENTITY</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Crafting Digital & Physical Precision
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
          Synchronizing creative vector graphics, industrial CNC modeling, and futuristic design systems.
        </p>
      </div>

      {/* 3-Column Cinematic Layout (Left: What I Do | Center: Realistic Character Portrait | Right: My Mindset) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: WHAT I DO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4 space-y-4"
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">WHAT I DO</h3>
              <p className="text-xs font-mono text-neutral-400">Execution & Skillsets</p>
            </div>
          </div>

          <div className="space-y-3">
            {personalData.whatIDo.map((item, idx) => {
              const Icon = whatIDoIcons[idx % whatIDoIcons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => playSound('hover')}
                  className="glass-card p-4 rounded-2xl border border-neutral-800 hover:border-neutral-600 relative overflow-hidden group bg-neutral-950/80"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-100 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {/* Subtle hover gradient bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CENTER COLUMN: REALISTIC CHARACTER PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-center justify-center relative my-6 lg:my-0"
        >
          {/* Ambient Subtle Glow */}
          <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

          <div className="relative w-full max-w-sm rounded-3xl p-1 bg-neutral-800 border border-neutral-700 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="w-full bg-black rounded-[22px] overflow-hidden relative group">
              {/* Top Tech Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700 text-[11px] font-mono text-neutral-300">
                // ID: NAYEEM-2026
              </div>

              {/* Portrait Image (Using supplied high-quality photo) */}
              <div className="relative h-[440px] sm:h-[480px] w-full flex items-end justify-center overflow-hidden">
                <img
                  src={personalData.coverImage}
                  alt="Muhammad NAYEEM Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = personalData.profileImage;
                  }}
                />
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Bottom Holographic Overlay Plate */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-neutral-700 text-center shadow-xl">
                <div className="font-heading font-extrabold text-lg text-white">
                  Muhammad NAYEEM
                </div>
                <div className="text-xs font-mono text-neutral-300 mt-0.5">
                  Creative Designer • CNC Specialist
                </div>
                <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-400">
                  <span>Hajiganj, Bangladesh</span>
                  <span className="text-neutral-600">•</span>
                  <span>100% Precision</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: MY MINDSET */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4 space-y-4"
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">MY MINDSET</h3>
              <p className="text-xs font-mono text-neutral-400">Philosophy & Ethos</p>
            </div>
          </div>

          <div className="space-y-3">
            {personalData.mindset.map((item, idx) => {
              const Icon = mindsetIcons[idx % mindsetIcons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => playSound('hover')}
                  className="glass-card p-4 rounded-2xl border border-neutral-800 hover:border-neutral-600 relative overflow-hidden group bg-neutral-950/80"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-100 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {/* Hover bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
