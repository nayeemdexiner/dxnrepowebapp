import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  ExternalLink, 
  FolderGit2, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { projectsData } from '../data/portfolio';
import { playSound } from '../utils/audio';

const categories = [
  'All',
  'CNC Design',
  'Web Development',
  'UI/UX Design',
  'Graphic Design'
];

export default function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));

  return (
    <section
      id="projects"
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
          {/* Animated Glow */}
          {!isExpanded && (
            <span className="absolute -inset-1 rounded-full bg-white/25 blur-sm animate-pulse pointer-events-none" />
          )}

          {/* Title */}
          <span className="font-heading font-black italic tracking-wider text-xs sm:text-base whitespace-nowrap">
            {isExpanded ? 'CLOSE PROJECTS' : 'PROJECTS'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED PROJECTS GALLERY ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
          >
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playSound('tab');
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold font-mono transition-all duration-200 cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-white text-black shadow-md scale-105 border border-white'
                        : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
            >
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.82, y: -24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.88, y: -15 }}
                    transition={{
                      delay: 0.05 + idx * 0.08,
                      type: 'spring',
                      damping: 16,
                      stiffness: 150,
                    }}
                    className="glass-card rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-600 group flex flex-col justify-between"
                  >
                    {/* Project Image */}
                    <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-black">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700 text-[10px] font-mono text-neutral-200">
                        {project.category}
                      </div>
                    </div>

                    {/* Info & Link */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-neutral-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={project.demoUrl || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound('click')}
                        className="w-full py-1.5 rounded-xl bg-neutral-900 hover:bg-white text-neutral-300 hover:text-black border border-neutral-800 text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Close Projects</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
