import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, Calendar, Award, BookOpen, CheckCircle2, School } from 'lucide-react';
import { EducationItem } from '../types';
import { playSound } from '../utils/audio';

interface EducationModalProps {
  item: EducationItem | null;
  onClose: () => void;
}

export default function EducationModal({ item, onClose }: EducationModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 text-neutral-100 overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950"
        >
          {/* Header Close Button */}
          <button
            id="education-modal-close-btn"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors focus:outline-none cursor-pointer border border-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700 p-[1px] shadow-lg shrink-0 flex items-center justify-center text-white">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono mb-1.5 font-semibold bg-neutral-900 text-neutral-300 border border-neutral-700">
                {item.status === 'Running' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>CURRENTLY ENROLLED</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>ACADEMICALLY COMPLETED</span>
                  </>
                )}
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                {item.degree}
              </h3>
              <p className="text-sm font-medium text-neutral-300 flex items-center gap-1.5 mt-0.5">
                <School className="w-4 h-4 text-neutral-400" />
                {item.institution}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                TIMELINE / YEAR
              </div>
              <div className="text-base font-bold text-white mt-1">{item.year}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-white" />
                RESULT / GPA
              </div>
              <div className="text-base font-bold text-white mt-1">
                {item.gpa ? `GPA ${item.gpa} / 5.00` : 'Enrolled'}
              </div>
            </div>

            {item.group && (
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                  ACADEMIC GROUP
                </div>
                <div className="text-sm font-semibold text-neutral-200 mt-1">{item.group}</div>
              </div>
            )}

            {item.board && (
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-neutral-400" />
                  EDUCATION BOARD
                </div>
                <div className="text-sm font-semibold text-neutral-200 mt-1">{item.board}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-900 p-3.5 rounded-xl border border-neutral-800">
              {item.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
              Key Highlights & Achievements
            </h4>
            <div className="space-y-2">
              {item.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Close Action */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors focus:outline-none"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
