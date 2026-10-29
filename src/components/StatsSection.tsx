import { motion } from 'motion/react';
import { FolderGit2, Award, FileCheck2, Smile, Users } from 'lucide-react';
import { statisticsData } from '../data/portfolio';
import { playSound } from '../utils/audio';

const iconMap: Record<string, typeof FolderGit2> = {
  FolderGit2,
  Award,
  FileCheck2,
  Smile,
  Users,
};

export default function StatsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl relative overflow-hidden bg-neutral-950 border border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-semibold">
            METRICS & REPUTATION
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-1">
            Proven Industry Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {statisticsData.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => playSound('hover')}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-center flex flex-col items-center justify-between group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all mb-3">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-white group-hover:text-neutral-300 transition-colors">
                    {stat.value}
                    <span className="text-neutral-400">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-200 mt-1">
                    {stat.label}
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 mt-2 line-clamp-1">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
