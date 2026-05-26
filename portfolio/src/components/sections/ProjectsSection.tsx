'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Github, X } from 'lucide-react';
import { PROJECTS, Project } from '@/lib/data';
import { TiltCard } from '@/components/ui/GlassCard';
import { HorizontalScroll } from '@/components/animations/HorizontalScroll';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const CARD_WIDTH = 'min(85vw, 420px)';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative w-full bg-dark-bg/60 border-t border-white/5 overflow-hidden"
    >
      <div className="w-full py-24 px-6 flex flex-col gap-10 z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8 max-w-5xl">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase font-display text-neon-blue">
                03 // Featured Projects
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
                Creative Catalog
              </h2>
            </div>
            <p className="text-sm font-sans text-zinc-400 max-w-sm">
              Scroll horizontally through glass project windows. Click any card to open the 3D detail panel.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <HorizontalScroll className="relative w-full min-h-[520px]">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            style={{ width: CARD_WIDTH }}
            className="shrink-0"
            onClick={() => setSelectedProject(project)}
          >
            <TiltCard className="flex flex-col h-full overflow-hidden p-0 cursor-pointer group">
              <div className="relative w-full aspect-[16/10] bg-black/40 overflow-hidden border-b border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-neon-blue/30 pointer-events-none" />
              </div>

              <div className="p-6 flex flex-col gap-5 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-display uppercase tracking-widest text-neon-blue bg-neon-blue/5 border border-neon-blue/15 px-2 py-0.5 rounded-full w-max">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">{project.title}</h3>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto">
                  {project.tech.slice(0, 4).map((badge) => (
                    <span
                      key={badge}
                      className="text-[8px] font-display text-zinc-400 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </article>
        ))}
      </HorizontalScroll>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateX: 8, y: 24 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{ perspective: 1200 }}
              className="w-full max-w-3xl glass-card p-0 rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all z-20"
                aria-label="Close project details"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto flex-1">
                <div className="relative w-full aspect-video bg-black/60">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-6 bg-dark-surface/90">
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-display uppercase tracking-widest text-neon-blue bg-neon-blue/5 border border-neon-blue/20 px-3 py-1 rounded-full w-max">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {selectedProject.stats && (
                    <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4">
                      {selectedProject.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1 text-center">
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

                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((badge) => (
                      <span
                        key={badge}
                        className="text-[8px] font-display text-zinc-300 bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest px-4 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all"
                      >
                        <Github size={12} />
                        Source Code
                      </a>
                    )}
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
