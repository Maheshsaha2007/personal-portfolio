'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

const SOCIAL_LINKS = [
  { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub', color: 'hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,242,255,0.4)]' },
  { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn', color: 'hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
  { icon: Twitter, href: PERSONAL_INFO.twitter, label: 'Twitter', color: 'hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]' },
  { icon: Instagram, href: PERSONAL_INFO.instagram, label: 'Instagram', color: 'hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]' },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email', color: 'hover:text-neon-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]' },
];

export function SocialDock() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-6 bottom-10 z-40 hidden lg:flex flex-col items-center gap-4"
    >
      {/* Decorative vertical connection line */}
      <div className="w-px h-16 bg-gradient-to-t from-white/15 to-transparent" />

      {/* Dock glass shell */}
      <div className="flex flex-col gap-3 p-2 rounded-2xl glass border-white/5 shadow-2xl">
        {SOCIAL_LINKS.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl text-zinc-400 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 ${link.color}`}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
            >
              <Icon size={18} />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
