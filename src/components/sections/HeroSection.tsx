'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowDown, Download, Layers, Box } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { GlowText, MagneticButton } from '@/components/ui/GlassCard';

// Dynamically import Three.js Canvas Scene without SSR to avoid compilation failure
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-dark-bg text-zinc-600 uppercase tracking-widest text-[10px] font-display">
      Drawing Ambient Matrix...
    </div>
  ),
});

export function HeroSection() {
  const [bgLight, setBgLight] = useState({ x: 0, y: 0 });
  const [is3DMode, setIs3DMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move follower lighting background overlay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      setBgLight({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNextSection = () => {
    const next = document.querySelector('#about');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-20 overflow-hidden isolate"
    >
      {/* 3D Canvas dynamic layer */}
      <HeroScene is3DMode={is3DMode} />

      {/* Mouse position-reactive spotlight backlight */}
      <div
        className="absolute w-[600px] h-[600px] bg-neon-blue/2 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-screen hidden lg:block"
        style={{
          left: bgLight.x - 300,
          top: bgLight.y - 300,
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      {/* Top spacer context matching navigation header offset and Mode Toggle */}
      <div className="w-full max-w-7xl flex justify-end z-20 pointer-events-auto h-10 mt-4">
        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className={`glass flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-display transition-all duration-300 ${
            is3DMode 
              ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue shadow-[0_0_15px_rgba(0,242,255,0.2)]' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {is3DMode ? <Box size={14} /> : <Layers size={14} />}
          {is3DMode ? 'Exit 3D Menu' : '3D Menu Mode'}
        </button>
      </div>

      {/* Hero central layout titles */}
      <AnimatePresence>
        {!is3DMode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl flex flex-col items-center text-center gap-6 z-10 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/5 bg-white/[0.02]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
              <span className="text-[10px] tracking-widest uppercase font-display text-zinc-300">
                Available for Projects & ML Collaborations
              </span>
            </motion.div>

            {/* Big Bold Headline title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold font-display text-white tracking-tight leading-[1.05]"
            >
              I build{' '}
              <GlowText text="intelligent" color="blue" italic={true} className="mx-2" />
              <br />
              products, interfaces &amp; experiences.
            </motion.h1>

            {/* Subtitles details */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-lg text-zinc-400 font-sans tracking-wide max-w-xl"
            >
              Creative Developer · ML Enthusiast · Problem Solver
            </motion.p>

            {/* Interactive Magnetic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-4 mt-4 pointer-events-auto"
            >
              <MagneticButton
                onClick={() => {
                  const target = document.querySelector('#projects');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-dark-bg font-bold border border-white hover:bg-transparent hover:text-white"
              >
                <span className="flex items-center gap-2">
                  Explore Work
                  <ArrowUpRight size={14} />
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  const target = document.querySelector('#contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/10 hover:border-white/35 text-zinc-300 hover:text-white"
              >
                Contact Me
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = PERSONAL_INFO.resumeUrl;
                  link.download = 'Mahesh_Saha_Resume.pdf';
                  link.click();
                }}
                className="border border-neon-purple/30 text-neon-purple hover:border-neon-purple/60 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  Download CV
                  <Download size={14} />
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scroll Indicator details */}
      <AnimatePresence>
        {!is3DMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col items-center gap-2 cursor-pointer z-10 group pointer-events-auto mt-auto"
            onClick={scrollToNextSection}
          >
            <span className="text-[9px] tracking-widest uppercase font-display text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-1 rounded-full border border-white/5 text-zinc-500 group-hover:text-zinc-300"
            >
              <ArrowDown size={12} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default HeroSection;
