'use client';
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

// ==========================================
// 1. GLASSCARD MOLECULE
// ==========================================
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'pink' | 'none';
}

export function GlassCard({ children, className, glowColor = 'none', ...props }: GlassCardProps) {
  const glowStyles = {
    blue: 'hover:border-neon-blue/20 hover:shadow-[0_0_40px_rgba(0,242,255,0.05)]',
    purple: 'hover:border-neon-purple/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.05)]',
    pink: 'hover:border-neon-pink/20 hover:shadow-[0_0_40px_rgba(236,72,153,0.05)]',
    none: ''
  };

  return (
    <div
      className={cn(
        'glass-card p-6 rounded-3xl relative overflow-hidden backdrop-blur-xl',
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Dynamic diagonal gloss shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

// ==========================================
// 2. MAGNETICBUTTON MOLECULE
// ==========================================
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // strength of pull
}

export function MagneticButton({ children, className, strength = 35, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate cursor distance from button center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Scale down pull amount based on strength props
    x.set((distanceX / (width / 2)) * strength);
    y.set((distanceY / (height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        'relative px-6 py-3 rounded-full font-display text-xs uppercase tracking-widest transition-all duration-300 hoverable',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ==========================================
// 3. GLOWTEXT MOLECULE
// ==========================================
interface GlowTextProps {
  text: string;
  className?: string;
  color?: 'blue' | 'purple' | 'pink';
  italic?: boolean;
}

export function GlowText({ text, className, color = 'blue', italic = false }: GlowTextProps) {
  const colorStyles = {
    blue: 'text-neon-blue glow-text-blue',
    purple: 'text-neon-purple glow-text-purple',
    pink: 'text-neon-pink shadow-neon-pink/40'
  };

  return (
    <span
      className={cn(
        'font-bold tracking-tight inline-block',
        italic ? 'italic font-serif' : 'font-display',
        colorStyles[color],
        className
      )}
    >
      {text}
    </span>
  );
}

// ==========================================
// 4. TILTCARD MOLECULE (MOUSE PERSPECTIVE TILT)
// ==========================================
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Locate cursor inside card grid
    const localX = clientX - left;
    const localY = clientY - top;
    
    // Normalize coordinates (-0.5 to +0.5)
    const normX = localX / width - 0.5;
    const normY = localY / height - 0.5;
    
    // Calculate 3D rotations (inverting X for standard perspective)
    rotateX.set(-normY * maxTilt); 
    rotateY.set(normX * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={cn('glass-card transition-all duration-200 cursor-pointer', className)}
    >
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}
