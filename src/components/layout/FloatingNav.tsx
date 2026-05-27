'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;

      // Simple active section detection based on page scroll coordinates
      const sections = NAV_ITEMS.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(NAV_ITEMS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full w-full max-w-4xl glass transition-all duration-300 ${
            scrolled ? 'bg-dark-bg/60 shadow-lg border-white/10' : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo Title */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-base font-bold text-white tracking-wider font-display flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-neon-blue animate-pulse" />
            MAHESH SAHA
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-3 py-1.5 text-xs tracking-widest font-display transition-colors duration-300 ${
                  activeSection === item.href ? 'text-neon-blue' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 w-full h-full bg-white/5 rounded-full -z-10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Email Call-To-Action (Desktop Only) */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hidden md:flex text-[10px] tracking-widest uppercase font-display border border-neon-purple/40 hover:border-neon-purple px-4 py-2 rounded-full text-zinc-300 hover:text-neon-purple transition-all duration-300 shadow-md shadow-neon-purple/5"
          >
            Ping Me
          </a>

          {/* Mobile Hamburger toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 w-full h-full bg-dark-bg/95 z-40 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`text-xl font-bold font-display tracking-widest ${
                  activeSection === item.href ? 'text-neon-blue glow-text-blue' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="mt-4 text-xs tracking-widest uppercase font-display border border-neon-purple px-6 py-3 rounded-full text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
