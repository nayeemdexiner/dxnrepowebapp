import { motion } from 'motion/react';
import { Sparkles, Send } from 'lucide-react';
import { personalData } from '../data/portfolio';
import { playSound } from '../utils/audio';

interface FinalCharacterSceneProps {
  onOpenSecret: () => void;
  onOpenResume: () => void;
}

export default function FinalCharacterScene({ onOpenSecret, onOpenResume }: FinalCharacterSceneProps) {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Background Deep Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Outer Card Frame */}
      <div className="relative z-10 glass-panel-glow p-8 sm:p-14 rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Mysterious Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-mono mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-widest uppercase font-semibold">DIRECT CREATIVE COLLABORATION</span>
        </motion.div>

        {/* Character Portrait with Solid High-Res Presence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-40 h-40 sm:w-52 sm:h-52 rounded-full p-1.5 bg-neutral-800 border border-neutral-700 shadow-[0_0_40px_rgba(255,255,255,0.08)] mb-8"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src={personalData.profileImage}
              alt="Muhammad NAYEEM"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = personalData.fallbackImage;
              }}
            />
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Muhammad <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">NAYEEM</span>
          </h2>
          <p className="text-base sm:text-xl text-neutral-300 font-medium mt-2">
            Creative Designer • Computerized Design Specialist
          </p>

          {/* Mysterious Climax Line */}
          <div className="my-6">
            <div className="inline-block p-4 rounded-2xl bg-neutral-900 border border-neutral-800 backdrop-blur-md">
              <span className="font-mono text-sm sm:text-base text-neutral-200 italic">
                "{personalData.tagline}"
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          {/* Main "LET'S CONNECT" Button */}
          <a
            href="https://wa.me/16137070221"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>LET'S CONNECT</span>
          </a>

          {/* Reveal Pending Secret */}
          <button
            onClick={() => {
              playSound('unlock');
              onOpenSecret();
            }}
            className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm border border-neutral-700 hover:border-neutral-500 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>VIP TERMINAL</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

