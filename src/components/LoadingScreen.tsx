import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';
import { playSound } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING QUANTUM CANVAS');

  useEffect(() => {
    playSound('whoosh');
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            playSound('unlock');
            onComplete();
          }, 350);
          return 100;
        }

        const step = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(100, prev + step);

        if (next > 25 && next < 55) {
          setStatusText('SYNCING DESIGN & CNC KINEMATICS');
        } else if (next >= 55 && next < 85) {
          setStatusText('CALIBRATING CINEMATIC 3D ENGINE');
        } else if (next >= 85) {
          setStatusText('READY: WELCOME TO MY WORLD');
        }

        return next;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loading-screen"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-slate-100"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background Radial Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
          {/* Holographic Logo Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 mb-6 rounded-2xl p-[1px] bg-gradient-to-br from-blue-400 via-sky-500 to-indigo-600 shadow-[0_0_40px_rgba(59,130,246,0.35)]"
          >
            <div className="w-full h-full bg-[#0b1329] rounded-2xl flex items-center justify-center">
              <span className="font-heading font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-100 to-indigo-300">
                MN
              </span>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>PORTFOLIO OS // V2026.8</span>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight">
              Muhammad NAYEEM
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Creative Designer • Computerized Design Specialist
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-full mt-8 bg-slate-900/80 border border-slate-800 rounded-full h-2 overflow-hidden p-[1px] shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Progress Meta */}
          <div className="w-full flex items-center justify-between mt-3 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-blue-400/80">
              <Sparkles className="w-3 h-3 text-sky-400" />
              {statusText}
            </span>
            <span className="text-sky-300 font-semibold">{progress}%</span>
          </div>

          <p className="text-[11px] text-slate-600 font-mono mt-6 italic">
            "Wait for the end... Something is still pending."
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
