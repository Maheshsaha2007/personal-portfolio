'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, MessageSquare, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { GlassCard, GlowText, MagneticButton, TiltCard } from '@/components/ui/GlassCard';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setStatus('idle');

    try {
      // Direct Formspree submission integration preserved
      const response = await fetch(`https://formspree.io/f/mqakayvo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-24 px-6 flex flex-col justify-center items-center bg-dark-bg/60 border-t border-white/5">
      <div className="w-full max-w-5xl flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase font-display text-neon-blue">
              06 // Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              Get In Touch
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-sm">
            Ping me using the Formspree secure visual interface below, or dispatch direct electronic mail.
          </p>
        </div>

        {/* Form + Meta layout grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Metadata Cards Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TiltCard className="flex flex-col justify-between h-full min-h-[220px]">
              <div className="flex flex-col gap-6">
                <span className="text-[9px] font-display uppercase tracking-widest text-neon-purple flex items-center gap-1.5 font-bold">
                  <ShieldAlert size={12} />
                  Operational Details
                </span>

                <div className="flex flex-col gap-6">
                  {/* Mail endpoint */}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <span className="p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-neon-blue/20 text-zinc-400 group-hover:text-neon-blue transition-all duration-300">
                      <Mail size={16} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-display uppercase tracking-wider text-zinc-500">
                        Electronic Mail
                      </span>
                      <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </a>

                  {/* Location endpoint */}
                  <div className="flex items-center gap-4">
                    <span className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-400">
                      <MapPin size={16} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-display uppercase tracking-wider text-zinc-500">
                        Location Coordinates
                      </span>
                      <span className="text-xs font-sans text-zinc-300">
                        {PERSONAL_INFO.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure status descriptor */}
              <div className="text-[8px] font-display uppercase tracking-wider text-zinc-600 mt-12 leading-relaxed border-t border-white/5 pt-4">
                Encryption Layer: Enabled (SSL Endpoint over Formspree node)
              </div>
            </TiltCard>
          </div>

          {/* Form Glass Panel Right Column */}
          <div className="lg:col-span-7">
            <GlassCard className="p-8">
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                
                {/* Name field */}
                <div className="flex flex-col gap-1.5 relative group">
                  <label htmlFor="name" className="text-[9px] font-display uppercase tracking-widest text-zinc-500 group-focus-within:text-neon-blue transition-colors">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your system identifier..."
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-neon-blue/30 focus:bg-white/[0.02] transition-all"
                    required
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5 relative group">
                  <label htmlFor="email" className="text-[9px] font-display uppercase tracking-widest text-zinc-500 group-focus-within:text-neon-blue transition-colors">
                    Secure Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your transmission node address..."
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-neon-blue/30 focus:bg-white/[0.02] transition-all"
                    required
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5 relative group">
                  <label htmlFor="message" className="text-[9px] font-display uppercase tracking-widest text-zinc-500 group-focus-within:text-neon-blue transition-colors">
                    Payload Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details of futuristic operational inquiries..."
                    rows={4}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-neon-blue/30 focus:bg-white/[0.02] transition-all resize-none"
                    required
                  />
                </div>

                {/* Dynamic Submission status alerting */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 text-[10px] uppercase tracking-widest font-display text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                    >
                      Transmission successful. I will respond to your coordinates soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 text-[10px] uppercase tracking-widest font-display text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl"
                    >
                      Transmission failed. Secure node error. Direct mail to maheshsaha2007@gmail.com
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit action button */}
                <div className="flex justify-end pt-2">
                  <MagneticButton
                    type="submit"
                    disabled={loading}
                    className="bg-white text-dark-bg font-bold border border-white hover:bg-transparent hover:text-white disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2">
                      {loading ? 'Dispatched...' : 'Dispatch'}
                      <Send size={12} className={loading ? 'animate-pulse' : ''} />
                    </span>
                  </MagneticButton>
                </div>

              </form>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-dark-bg/85 border-t border-white/5 flex flex-col items-center text-center gap-4 relative z-10">
      <span className="text-[10px] tracking-widest uppercase font-display text-zinc-500">
        MAHESH SAHA PORTFOLIO OS v2.0
      </span>
      <span className="text-[9px] font-sans text-zinc-600">
        © {new Date().getFullYear()} Mahesh Saha. Crafted with Next.js, Three.js, GSAP &amp; Framer Motion.
      </span>
    </footer>
  );
}
export default ContactSection;
