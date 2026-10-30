import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Cpu, Settings2, ShieldCheck, Monitor, Factory, ChevronDown, ChevronUp } from 'lucide-react';
import { experienceData, personalData } from '../data/portfolio';
import { playSound } from '../utils/audio';

const expIcons = [Cpu, Settings2, Factory, Monitor];

export default function ExperienceSection() {
  const exp = experienceData[0];

  const toggleMore = () => {
    playSound('click');
    setShowMore((prev) => !prev);
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-neutral-300" />
          <span>WORK EXPERIENCE</span>
        </div>
        <h2 className="font-heading font-black italic text-3xl sm:text-4xl text-white tracking-tight uppercase">
          Industry Experience
        </h2>
        <p className="text-neutral-400 text-sm mt-2">
          Hands-on CNC programming, CAD drafting, and precision manufacturing.
        </p>
      </motion.div>

      {/* Main Experience Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                ORGANIZATION
              </span>
              <h3 className="font-heading font-black italic text-2xl text-white uppercase">
                {exp.company}
              </h3>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            {exp.period}
          </div>
        </div>

        {/* Role & Summary */}
        <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase">ROLE &amp; POSITION</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">
              {exp.role}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono text-neutral-300">Active Senior Specialist</span>
          </div>
        </div>

        {/* 2 Core Highlight Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300">
              <strong>CNC 3-Axis &amp; 4-Axis Machining</strong>: Toolpath calculation, feed optimization &amp; zero defect cutting.
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex items-start gap-3">
            <Settings2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300">
              <strong>ArtCAM &amp; CAD Modeling</strong>: 2D/3D reliefs for solid wooden doors and decorative structures.
            </div>
          </div>
        </div>

        {/* Toggle Details Button */}
        <div className="pt-2 flex justify-between items-center border-t border-neutral-800">
          <button
            onClick={toggleMore}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>{showMore ? 'Less Details' : 'More Details & Responsibilities'}</span>
            {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[11px] font-mono text-neutral-400">
            Hajiganj, Chandpur
          </span>
        </div>

        {/* Expandable Extended Details */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-4 border-t border-neutral-800/80 overflow-hidden"
            >
              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                  Detailed Operational Scope:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                      • {resp}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Tools &amp; Software Used:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
