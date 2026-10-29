import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface PendingSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PendingSecretModal({ isOpen, onClose }: PendingSecretModalProps) {
  useEffect(() => {
    if (isOpen) {
      playSound('unlock');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#e5e5e5', '#a3a3a3', '#737373']
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-lg glass-panel-glow rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center text-neutral-100 shadow-2xl border border-neutral-700 mx-2"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Unlocked Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-neutral-800 border border-neutral-600 p-[1px] mx-auto mb-4 sm:mb-5 shadow-[0_0_35px_rgba(255,255,255,0.15)] flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-[10px] sm:text-xs font-mono text-neutral-300 mb-2.5 sm:mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL VIP ACCESS</span>
          </div>

          <h3 className="font-heading font-black text-xl sm:text-3xl text-white">
            "Something Is Still Pending..."
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 mt-2 sm:mt-3 leading-relaxed">
            You've explored Muhammad Nayeem's portfolio! The pending element is <strong className="text-white">our next high-impact creative project</strong>.
          </p>

          <div className="my-4 sm:my-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900 border border-neutral-800 text-left space-y-2">
            <div className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase">PRIORITY VIP CHANNEL:</div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>Direct WhatsApp Access with 1-hour fast response</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>Exclusive CNC & Vector Design File Consultation</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
            <a
              href="https://wa.me/16137070221?text=Hello%20Muhammad%20Nayeem!%20I%20unlocked%20your%20portfolio%20pending%20secret."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Claim Priority VIP Chat</span>
            </a>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700 cursor-pointer active:scale-95"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
