import React, { useState } from 'react';
import { PERSONAL_BRAND } from '../data/portfolioData';
import { DigitalIdentityVisual } from '../components/visuals/DigitalIdentityVisual';
import { ArrowRight, Check, X, Shield, Code, Palette } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal } from '../components/motion/ScrollReveal';

export const AboutSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Profile Area (Abstract Professional Digital Identity) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <ScrollReveal direction="left" distance={30}>
              <DigitalIdentityVisual />
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Text & Values */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollReveal direction="up" distance={30} delay={0.1}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                    PROFILE // 02
                  </span>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                    MORE THAN <br />
                    <span className="italic font-light text-zinc-300">JUST CODE.</span>
                  </h2>
                </div>

                <div className="space-y-5 text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                  <p>
                    I&apos;m <strong className="text-white font-medium">Prem Polai</strong>, a developer and UI/UX designer passionate about turning ideas into meaningful digital experiences.
                  </p>
                  <p>
                    I enjoy working across the complete product journey — from understanding an idea and designing its interface to developing the application and thinking about how it can be made more secure.
                  </p>
                  <p>
                    My interests sit at the intersection of technology, creativity and cybersecurity. I believe that thoughtful architecture and defensive thinking should be standard engineering instincts, not last-minute patches.
                  </p>
                </div>

                {/* Quick Principles Triad */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-xs text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1">
                    <span className="text-rose-400 font-bold">01. CRAFT</span>
                    <p className="text-[11px] text-zinc-400">Pixel precision &amp; natural ergonomics.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1">
                    <span className="text-rose-400 font-bold">02. PERFORMANCE</span>
                    <p className="text-[11px] text-zinc-400">Clean state, low bundle, zero lag.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1">
                    <span className="text-rose-400 font-bold">03. SECURITY</span>
                    <p className="text-[11px] text-zinc-400">Defense-in-depth from day zero.</p>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setModalOpen(true);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-rose-700 text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-rose-500 transition-all duration-200"
                  >
                    <span>MORE ABOUT ME</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Expanded Philosophy Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>PREM POLAI // EXTENDED PROFILE</span>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalOpen(false);
                }}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                aria-label="Close extended profile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/10">
                <img
                  src={PERSONAL_BRAND.photoUrl}
                  alt={PERSONAL_BRAND.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top border border-rose-500/40 shadow-lg shrink-0"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-white">
                    {PERSONAL_BRAND.name}
                  </h3>
                  <p className="text-xs font-mono text-rose-400">
                    {PERSONAL_BRAND.role}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400">
                    NIT, Bhubaneswar &bull; Odisha, India
                  </p>
                </div>
              </div>

              <h4 className="text-lg font-display font-bold text-white pt-2">
                How I Approach Engineering &amp; Design
              </h4>
              <p>
                Digital products succeed when technical elegance matches human intuition. Many teams divide engineering and design into silos where the designer produces static frames without understanding state boundaries, and the developer implements interfaces without understanding visual hierarchy.
              </p>
              <p>
                By mastering both, I bridge that gap completely: writing declarative Kotlin and React components with fluid 60fps animations, structured TypeScript interfaces, and rigorous defensive security checks.
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                  <Palette className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Design Discipline:</strong> Typography hierarchy, accessibility (WCAG AA), deliberate spacing, and avoiding generic templates.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                  <Code className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Development Standard:</strong> Modular component trees, strict TypeScript types, unidirectional data flow, and minimal dependencies.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Security Mindset:</strong> Applying OWASP standards, sandboxed execution, least-privilege permissions, and secure credential handling.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs tracking-wider uppercase font-semibold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
