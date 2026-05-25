'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Circle, Sparkles, Folder, FileCode, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, TERMINAL_ABOUT } from '@/lib/data';
import { GlassCard, TiltCard, GlowText } from '@/components/ui/GlassCard';

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<'bio' | 'stack' | 'goals'>('bio');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'Welcome to Mahesh Saha OS v2.05-Edge',
    'Session initialized at: ' + new Date().toLocaleDateString(),
    'Type "help" to list available matrix diagnostics.',
    ''
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Command prompt interpreter
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let outputLog = [...terminalLog, `mahesh_shell@os:~$ ${terminalInput}`];

    switch (cmd) {
      case 'help':
        outputLog.push(
          'Available diagnostics system commands:',
          '  bio      - Detailed personal developer focus info',
          '  stack    - Structural developer tools json output',
          '  goals    - Next target research benchmarks',
          '  contact  - Secure secure endpoint mail details',
          '  clear    - Flush terminal console lines',
          '  system   - System metadata architecture logs'
        );
        break;
      case 'bio':
        outputLog.push(...TERMINAL_ABOUT.bio.split('\n'));
        break;
      case 'stack':
        outputLog.push(...TERMINAL_ABOUT.stack.split('\n'));
        break;
      case 'goals':
        outputLog.push(...TERMINAL_ABOUT.goals.split('\n'));
        break;
      case 'contact':
        outputLog.push(
          `Mail: ${PERSONAL_INFO.email}`,
          `GitHub: ${PERSONAL_INFO.github}`,
          `LinkedIn: ${PERSONAL_INFO.linkedin}`
        );
        break;
      case 'clear':
        outputLog = [];
        break;
      case 'system':
        outputLog.push(
          'OS: MaheshSahaOS v2.0.5 Edge Architecture',
          'Runtime: Node 24.15.0 - React 19.2.4 Client Engine',
          'Host: OneDrive V12 Edge Cloud Node',
          'Status: Active & Searching for Opportunities'
        );
        break;
      default:
        outputLog.push(`Command "${cmd}" not found. Type "help" for catalog list.`);
    }

    outputLog.push('');
    setTerminalLog(outputLog);
    setTerminalInput('');
  };

  // Scroll to terminal bottom automatically on additions
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLog]);

  return (
    <section id="about" className="relative min-h-screen w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg/60 border-t border-white/5">
      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase font-display text-neon-blue">
              01 // Core Archetype
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              Personal Profile
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-sm">
            Merging advanced responsive interfaces with edge intelligence backend architectures.
          </p>
        </div>

        {/* Section Content (Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio + Stats layout left (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TiltCard maxTilt={6} className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] tracking-widest text-neon-purple font-display uppercase">
                  <Sparkles size={12} />
                  Philosophical Axiom
                </div>
                <h3 className="text-xl font-bold font-display text-white leading-snug">
                  "Intelligent models require stunning interfaces."
                </h3>
                <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 mt-8">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 text-center">
                    <span className="text-lg md:text-2xl font-bold font-display text-white glow-text-blue">
                      {stat.value}
                    </span>
                    <span className="text-[8px] md:text-[9px] tracking-wider uppercase font-display text-zinc-500 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Interactive macOS Terminal Layout right (Col 7) */}
          <div className="lg:col-span-7 flex flex-col">
            <GlassCard className="p-0 border-white/10 shadow-2xl h-full flex flex-col min-h-[420px] overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Circle size={10} className="fill-red-500/80 stroke-none" />
                  <Circle size={10} className="fill-amber-500/80 stroke-none" />
                  <Circle size={10} className="fill-emerald-500/80 stroke-none" />
                </div>
                <span className="text-[10px] tracking-widest font-display text-zinc-500 uppercase flex items-center gap-1.5">
                  <Terminal size={10} />
                  mahesh_saha@server:~
                </span>
                <div className="w-12" /> {/* alignment balance spacer */}
              </div>

              {/* Terminal View Tabs selector */}
              <div className="flex bg-white/[0.01] border-b border-white/5 text-[9px] font-display uppercase tracking-widest">
                <button
                  onClick={() => setActiveTab('bio')}
                  className={`flex items-center gap-1.5 px-4 py-2 border-r border-white/5 transition-colors ${
                    activeTab === 'bio' ? 'bg-white/[0.03] text-neon-blue border-b-2 border-b-neon-blue' : 'text-zinc-500'
                  }`}
                >
                  <Folder size={10} />
                  bio.sh
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`flex items-center gap-1.5 px-4 py-2 border-r border-white/5 transition-colors ${
                    activeTab === 'stack' ? 'bg-white/[0.03] text-neon-purple border-b-2 border-b-neon-purple' : 'text-zinc-500'
                  }`}
                >
                  <FileCode size={10} />
                  stack.json
                </button>
                <button
                  onClick={() => setActiveTab('goals')}
                  className={`flex items-center gap-1.5 px-4 py-2 border-r border-white/5 transition-colors ${
                    activeTab === 'goals' ? 'bg-white/[0.03] text-neon-pink border-b-2 border-b-neon-pink' : 'text-zinc-500'
                  }`}
                >
                  <CheckCircle2 size={10} />
                  goals.md
                </button>
              </div>

              {/* Dynamic Interactive Panel / Tab Panel Content */}
              <div className="flex-1 p-5 font-mono text-xs overflow-y-auto leading-relaxed bg-black/40 min-h-[220px]">
                
                {/* Active static view data rendering */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-zinc-300 whitespace-pre-wrap font-mono mb-4 text-[10px] leading-relaxed"
                  >
                    {activeTab === 'bio' && TERMINAL_ABOUT.bio}
                    {activeTab === 'stack' && TERMINAL_ABOUT.stack}
                    {activeTab === 'goals' && TERMINAL_ABOUT.goals}
                  </motion.div>
                </AnimatePresence>

                {/* Shell Input logs history */}
                <div className="border-t border-white/5 pt-4 mt-6">
                  {terminalLog.map((line, i) => (
                    <div key={i} className="text-zinc-400 font-mono text-[9px] min-h-[12px]">
                      {line}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>

                {/* Interactive JS terminal form prompt */}
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2">
                  <span className="text-neon-blue font-mono text-[10px]">mahesh_shell@os:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder='Type diagnostics instruction (e.g. "help", "system", "clear")...'
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[10px] placeholder-zinc-700"
                    autoFocus
                  />
                </form>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}
export default AboutSection;
