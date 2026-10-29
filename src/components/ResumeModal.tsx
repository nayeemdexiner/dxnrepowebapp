import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, CheckCircle2, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { personalData, educationData, experienceData, skillCategories, contactInfo } from '../data/portfolio';
import { playSound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-4xl bg-neutral-950 border border-neutral-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 text-neutral-100 shadow-2xl my-3 sm:my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between pb-4 mb-4 sm:pb-6 sm:mb-6 border-b border-neutral-800 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-neutral-700 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="font-heading font-bold text-sm sm:text-lg text-white truncate">
                Curriculum Vitae
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-[11px] sm:text-xs font-bold shadow-lg transition-colors focus:outline-none cursor-pointer active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Print / Save PDF</span>
                <span className="xs:hidden">PDF</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Resume Paper Content */}
          <div id="printable-cv" className="space-y-6 sm:space-y-8 bg-black p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-neutral-800">
            
            {/* Header / Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-neutral-800 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-5">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black border-2 border-neutral-700 shrink-0 shadow-lg">
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
                  <h1 className="font-heading font-black text-xl sm:text-3xl md:text-4xl text-white">
                    Muhammad NAYEEM
                  </h1>
                  <p className="text-xs sm:text-base text-neutral-300 font-semibold mt-0.5">
                    Senior CNC Programmer &amp; Creative Designer
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
                    {personalData.details.careerObjective}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-[11px] sm:text-xs font-mono text-neutral-300 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-800/80 text-left">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="truncate">{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{contactInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold mb-4">
                <Briefcase className="w-4 h-4" />
                <span>Work Experience</span>
              </div>

              {experienceData.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-base text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-neutral-300">{exp.period}</span>
                  </div>
                  <div className="text-xs font-medium text-neutral-400 mt-0.5">{exp.company} • {exp.location}</div>
                  <ul className="mt-3 space-y-1 text-xs text-neutral-300">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education Timeline */}
            <div>
              <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold mb-4">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationData.map((edu) => (
                  <div key={edu.id} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{edu.degree}</h4>
                      <span className="text-[11px] font-mono text-neutral-400">{edu.year}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{edu.institution}</p>
                    {edu.gpa && (
                      <div className="text-xs font-semibold text-neutral-300 mt-2">
                        GPA: {edu.gpa} / 5.00
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-bold mb-4">
                <Award className="w-4 h-4" />
                <span>Skills & Competencies</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {skillCategories.map((cat) => (
                  <div key={cat.category} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h5 className="font-bold text-xs text-white mb-2">{cat.category}</h5>
                    <div className="space-y-1 text-xs text-neutral-300">
                      {cat.skills.map((s) => (
                        <div key={s.name} className="flex items-center justify-between">
                          <span>{s.name}</span>
                          <span className="font-mono text-neutral-500 text-[10px]">{s.level}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
