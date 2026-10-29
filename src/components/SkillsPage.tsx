import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Code2, 
  Palette, 
  Layers, 
  FileSpreadsheet, 
  Cpu, 
  Search, 
  SlidersHorizontal,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import { skillCategories, personalData } from '../data/portfolio';
import { playSound } from '../utils/audio';

interface SkillsPageProps {
  onBack: () => void;
}

const tabIcons: Record<string, typeof Code2> = {
  'Web & Frontend Development': Code2,
  'UI/UX & Graphic Design': Palette,
  'CNC & Computerized Engineering': Layers,
  'Productivity & Digital Operations': FileSpreadsheet,
};

export default function SkillsPage({ onBack }: SkillsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterLevel, setActiveFilterLevel] = useState<'All' | 'Expert' | 'Advanced'>('All');

  // Compute all skills with their parent category
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({
      ...s,
      categoryName: cat.category,
      categoryDesc: cat.description,
    }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCat =
      selectedCategory === 'All' || s.categoryName === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      activeFilterLevel === 'All'
        ? true
        : activeFilterLevel === 'Expert'
        ? s.level >= 90
        : s.level < 90;

    return matchesCat && matchesSearch && matchesLevel;
  });

  const totalExpertCount = allSkills.filter((s) => s.level >= 90).length;
  const averageMastery = Math.round(
    allSkills.reduce((acc, s) => acc + s.level, 0) / allSkills.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen pt-20 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10"
    >
      {/* Top Header & Back Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-neutral-800/80">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="group px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-white text-neutral-300 hover:text-black border border-neutral-800 hover:border-white transition-all duration-200 flex items-center gap-2 text-xs font-mono font-bold cursor-pointer shadow-lg active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Skills Hub</span>
        </div>
      </div>

      {/* Hero Banner for Skills Page */}
      <div className="py-6 sm:py-10 space-y-3 sm:space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] sm:text-[11px] font-mono text-neutral-300">
          <Cpu className="w-3.5 h-3.5 text-white" />
          <span>Technical Competencies &amp; Expertise</span>
        </div>

        <h1 className="font-heading font-black italic text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
          Skills &amp; Mastery
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans px-2">
          A comprehensive breakdown of industrial CNC tooling, 2D/3D CAD vectorization,
          modern frontend engineering, and computerized graphic workflows.
        </p>

        {/* Quick KPI Stat Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-3 sm:pt-4 max-w-3xl mx-auto">
          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-950/80 border border-neutral-800/80 text-center">
            <div className="text-lg sm:text-2xl font-mono font-black text-white">{allSkills.length}</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase mt-0.5">Total Skills</div>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-950/80 border border-neutral-800/80 text-center">
            <div className="text-lg sm:text-2xl font-mono font-black text-white">{totalExpertCount}</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase mt-0.5">Expert Level (90%+)</div>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-950/80 border border-neutral-800/80 text-center">
            <div className="text-lg sm:text-2xl font-mono font-black text-white">{averageMastery}%</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase mt-0.5">Average Score</div>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-neutral-950/80 border border-neutral-800/80 text-center">
            <div className="text-lg sm:text-2xl font-mono font-black text-white">{skillCategories.length}</div>
            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase mt-0.5">Domains</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Category Chips */}
      <div className="space-y-3 sm:space-y-4 my-4 sm:my-6 bg-neutral-950/70 p-3.5 sm:p-5 rounded-2xl border border-neutral-800/80 backdrop-blur-xl">
        {/* Search & Level Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search skills, tools, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Expert', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playSound('tab');
                  setActiveFilterLevel(lvl);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilterLevel === lvl
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {lvl} {lvl !== 'All' ? 'Level' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/60">
          <button
            onClick={() => {
              playSound('tab');
              setSelectedCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-white text-black shadow-md border border-white'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            All Categories ({allSkills.length})
          </button>

          {skillCategories.map((cat) => {
            const Icon = tabIcons[cat.category] || Code2;
            const isActive = selectedCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => {
                  playSound('tab');
                  setSelectedCategory(cat.category);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-md border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Display Grid */}
      <div className="space-y-8">
        {/* If 'All' is selected and no search query is active, show categorized sections */}
        {selectedCategory === 'All' && !searchQuery && activeFilterLevel === 'All' ? (
          skillCategories.map((cat, catIdx) => {
            const Icon = tabIcons[cat.category] || Code2;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.08 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-heading font-bold text-white">
                        {cat.category}
                      </h2>
                      <p className="text-[11px] text-neutral-400 font-sans">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -2 }}
                      className="glass-panel p-4 rounded-2xl border border-neutral-800/80 hover:border-neutral-600 transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-white truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-white transition-colors">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Clean Level Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-neutral-900 border border-neutral-800/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6, delay: sIdx * 0.05 }}
                          className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 rounded-full"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                          {skill.tag || 'Expert'}
                        </span>
                        <span>{skill.experience}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })
        ) : (
          /* Filtered or Flat Grid */
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-xs font-mono text-neutral-400">
              <span>Showing {filteredSkills.length} of {allSkills.length} skills</span>
              <span>{selectedCategory}</span>
            </div>

            {filteredSkills.length === 0 ? (
              <div className="text-center py-16 space-y-3 glass-panel rounded-2xl border border-neutral-800">
                <Search className="w-8 h-8 text-neutral-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No skills found</h3>
                <p className="text-xs text-neutral-400">Try adjusting your keyword or category filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setActiveFilterLevel('All');
                  }}
                  className="px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-white border border-neutral-800 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredSkills.map((skill, sIdx) => (
                  <motion.div
                    key={`${skill.categoryName}-${skill.name}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: sIdx * 0.03 }}
                    whileHover={{ y: -2 }}
                    className="glass-panel p-4 rounded-2xl border border-neutral-800/80 hover:border-neutral-600 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase truncate">
                          {skill.categoryName}
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-white transition-colors">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-white truncate">
                          {skill.name}
                        </span>
                      </div>
                    </div>

                    {/* Clean Level Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-neutral-900 border border-neutral-800/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, delay: sIdx * 0.03 }}
                        className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                        {skill.tag || 'Expert'}
                      </span>
                      <span>{skill.experience}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Floating Back Action */}
      <div className="flex justify-center pt-12">
        <button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Home</span>
        </button>
      </div>
    </motion.div>
  );
}
