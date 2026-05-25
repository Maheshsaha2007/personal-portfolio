'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Terminal, Settings } from 'lucide-react';
import { SKILLS } from '@/lib/data';
import { GlassCard, GlowText } from '@/components/ui/GlassCard';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter(skill => skill.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'frontend': return <Layers size={14} className="text-neon-blue" />;
      case 'backend': return <Terminal size={14} className="text-neon-purple" />;
      default: return <Settings size={14} className="text-neon-pink" />;
    }
  };

  return (
    <section id="skills" className="relative min-h-screen w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg">
      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase font-display text-neon-purple">
              02 // Core Competencies
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              Skills Matrix
            </h2>
          </div>

          {/* Staggered selector controls */}
          <div className="flex flex-wrap gap-2 text-[9px] font-display uppercase tracking-widest">
            {['all', 'frontend', 'backend', 'tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-neon-purple bg-neon-purple/10 text-white shadow-md shadow-neon-purple/5'
                    : 'border-white/5 bg-white/[0.01] text-zinc-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Skills display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GlassCard className="h-full flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  {/* Card category tags */}
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-display tracking-widest uppercase text-zinc-500 flex items-center gap-1.5">
                      {getCategoryIcon(skill.category)}
                      {skill.category}
                    </span>
                    <span className="text-[10px] font-display text-white glow-text-blue font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-white font-display">
                      {skill.name}
                    </h3>
                    <p className="text-[10px] font-sans text-zinc-400 leading-normal">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Simulated Glow proficiency slider bar */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-6">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className={`h-full rounded-full ${
                      skill.category === 'frontend' ? 'bg-neon-blue' :
                      skill.category === 'backend' ? 'bg-neon-purple' : 'bg-neon-pink'
                    }`}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default SkillsSection;
