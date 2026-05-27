'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Award, Code, Brain, Palette, type LucideIcon } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Palette,
  Award,
};

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg/60 border-t border-white/5"
    >
      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase font-display text-neon-purple">
                05 // Certifications
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
                Credentials
              </h2>
            </div>
            <p className="text-sm font-sans text-zinc-400 max-w-sm">
              Verified learning paths across full-stack engineering, data science, and design systems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => {
            const Icon = iconMap[cert.icon] ?? Award;
            return (
              <ScrollReveal key={cert.title} delay={index * 0.1}>
                <GlassCard
                  glowColor="purple"
                  className="h-full flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-500"
                >
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 text-neon-purple group-hover:shadow-[0_0_24px_rgba(139,92,246,0.2)] transition-shadow">
                      <Icon size={20} />
                    </span>
                    <span className="text-[9px] font-display uppercase tracking-widest text-zinc-500">
                      {cert.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold font-display text-white leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] font-sans text-zinc-400">{cert.issuer}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
