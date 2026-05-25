'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Apply a smooth spring transition to the scroll percentage value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink z-50 origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
