'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Position coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for lagging ring inertia
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Inner core fast springs
  const innerSpringX = useSpring(cursorX, { damping: 100, stiffness: 1000 });
  const innerSpringY = useSpring(cursorY, { damping: 100, stiffness: 1000 });

  useEffect(() => {
    setMounted(true);
    setHidden(false);

    // Track real cursor movement
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px outer circle
      cursorY.set(e.clientY - 16);
    };

    // Track when mouse leaves browser window
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Track active hover states on interactive buttons/links
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.hoverable') ||
        target.getAttribute('role') === 'button';
      
      setHovered(!!isHoverable);
    };

    // Toggle high-level body helper class to hide default cursor
    document.documentElement.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Disable on mobile/tablet viewports completely
  if (!mounted) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-blue/60 pointer-events-none z-9999 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
          borderColor: hovered ? 'rgba(0, 242, 255, 0.9)' : 'rgba(0, 242, 255, 0.6)',
          opacity: hidden ? 0 : 1,
          transition: 'scale 0.2s, background-color 0.2s, border-color 0.2s, opacity 0.2s',
        }}
      />
      {/* Direct inner core dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon-purple rounded-full pointer-events-none z-9999 mix-blend-screen"
        style={{
          x: innerSpringX,
          y: innerSpringY,
          // Adjust offset to center inside the 32px outer ring
          transform: 'translate(13px, 13px)', 
          scale: hovered ? 2 : 1,
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
          opacity: hidden ? 0 : 1,
          transition: 'scale 0.2s, opacity 0.2s',
        }}
      />
    </>
  );
}
