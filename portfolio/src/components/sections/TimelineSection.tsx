'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { TIMELINE } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';

export function TimelineSection() {
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase size={14} className="text-neon-blue" />;
      case 'education': return <GraduationCap size={14} className="text-neon-purple" />;
      default: return <Award size={14} className="text-neon-pink" />;
    }
  };

  return (
    <section id="timeline" className="relative min-h-screen w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg">
      <div className="w-full max-w-4xl flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase font-display text-neon-blue">
              04 // Timeline
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              System Operations
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-sm">
            Milestones, academic operations and professional data tracking highlights.
          </p>
        </div>

        {/* Timeline path layout */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical core line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

          {TIMELINE.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                } w-full pl-10 md:pl-0`}
              >
                {/* Node Center Pointer Dot marker */}
                <div className="absolute left-3 md:left-1/2 top-4 w-3.5 h-3.5 rounded-full bg-dark-bg border border-neon-purple/40 z-10 flex items-center justify-center transform -translate-x-1.5 md:-translate-x-1.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                </div>

                {/* Main Node Card block (Half space span on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`w-full md:w-[46%]`}
                >
                  <GlassCard className="flex flex-col gap-4 border-white/10 hover:border-white/20 transition-all duration-300">
                    {/* Node Metadata block header */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-display uppercase tracking-widest text-neon-blue font-bold">
                          {entry.year}
                        </span>
                        <span className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                          {getTimelineIcon(entry.type)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-display text-white">
                        {entry.title}
                      </h3>
                      <span className="text-[10px] font-sans text-zinc-400 font-bold">
                        {entry.institution}
                      </span>
                    </div>

                    <p className="text-[10px] font-sans text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {entry.description}
                    </p>
                  </GlassCard>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default TimelineSection;
