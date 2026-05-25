'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { PROJECTS, Project } from '@/lib/data';
import { GlassCard, TiltCard, GlowText, MagneticButton } from '@/components/ui/GlassCard';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg/60 border-t border-white/5">
      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase font-display text-neon-blue">
              03 // Featured Projects
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              Creative Catalog
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-sm">
            Hover, tilt, and open each glass card interface to view full predictive systems specifications.
          </p>
        </div>

        {/* Vertical list of Projects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <TiltCard className="flex flex-col h-full overflow-hidden p-0">
                {/* Visual mockup thumbnail */}
                <div className="relative w-full aspect-video bg-black/40 overflow-hidden border-b border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card descriptions details */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    {/* Category tag */}
                    <span className="text-[8px] font-display uppercase tracking-widest text-neon-blue bg-neon-blue/5 border border-neon-blue/15 px-2 py-0.5 rounded-full w-max">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold font-display text-white">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-sans text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {project.tech.slice(0, 3).map((badge) => (
                      <span key={badge} className="text-[8px] font-display text-zinc-500 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[8px] font-display text-zinc-600 px-2 py-0.5">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating 3D Modal Detail Panel */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50 p-4 md:p-10">
            {/* Backdrop Blur layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 w-full h-full bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal central interface glass window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-3xl glass-card p-0 rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
            >
              {/* Close Button element */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all z-20"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto flex-1">
                {/* Visual Header Mockup */}
                <div className="relative w-full aspect-video bg-black/60">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Detail text details */}
                <div className="p-6 md:p-8 flex flex-col gap-6 bg-dark-surface/90">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-display uppercase tracking-widest text-neon-blue bg-neon-blue/5 border border-neon-blue/20 px-3 py-1 rounded-full">
                        {selectedProject.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Core specifications counter analytics grids */}
                  {selectedProject.stats && (
                    <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4 my-2">
                      {selectedProject.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1 text-center">
                          <span className="text-sm font-bold font-display text-neon-purple glow-text-purple">
                            {stat.value}
                          </span>
                          <span className="text-[7px] tracking-wider uppercase font-display text-zinc-500">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Complete Tech list */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-display uppercase tracking-widest text-zinc-500">
                      System Technologies Integration
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((badge) => (
                        <span key={badge} className="text-[8px] font-display text-zinc-300 bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-4 border-t border-white/5 pt-6 mt-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest px-4 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all bg-white/[0.01]"
                    >
                      <Github size={12} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default ProjectsSection;
