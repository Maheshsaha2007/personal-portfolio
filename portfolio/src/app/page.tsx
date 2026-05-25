import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { ContactSection, Footer } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Background Matrix structure overlay */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none -z-20" />
      <div className="noise-overlay pointer-events-none" />

      {/* Assembly of sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
