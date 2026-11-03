import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroPortraitVisual } from '../components/visuals/HeroPortraitVisual';
import { MagneticButton } from '../components/motion/MagneticButton';
import { soundManager } from '../lib/audio';

interface HeroSectionProps {
  onViewWork: () => void;
  onConnect: () => void;
}

const specialties = [
  { label: 'Development', icon: Code2 },
  { label: 'Product design', icon: Sparkles },
  { label: 'Security', icon: ShieldCheck },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onConnect }) => (
  <section
    id="hero"
    className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-16"
  >
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-rose-950/30 blur-[130px]" />
      <div className="absolute right-[-8rem] top-1/4 h-[26rem] w-[26rem] rounded-full bg-fuchsia-950/20 blur-[130px]" />
      <div className="absolute -bottom-40 right-1/4 h-[25rem] w-[25rem] rounded-full bg-cyan-950/20 blur-[130px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>

    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
      <div className="relative z-10 space-y-8 lg:col-span-7">
        <div className="inline-flex items-center gap-3 rounded-full border border-rose-300/15 bg-black/35 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-300 shadow-[0_0_30px_rgba(244,63,94,0.08)] backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Independent developer &amp; designer</span>
          <span className="hidden text-zinc-600 sm:inline">/</span>
          <span className="hidden text-zinc-400 sm:inline">Bhubaneswar, India</span>
        </div>

        <div className="space-y-5">
          <p className="flex items-center gap-3 text-xs font-mono tracking-[0.24em] text-rose-300">
            <span className="h-px w-8 bg-rose-400/70" /> HELLO, I&apos;M PREM POLAI
          </p>
          <h1 className="max-w-4xl text-5xl font-display font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-[5.8rem]">
            Thoughtful tech.
            <br />
            <span className="hero-neon-text bg-gradient-to-r from-rose-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
              Real-world impact.
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            I design and build digital products with a focus on useful experiences, clean engineering, and security from day one.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {specialties.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="hero-glass-chip inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3.5 py-2 text-xs text-zinc-300 backdrop-blur-xl"
            >
              <Icon className="h-3.5 w-3.5 text-rose-200" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <MagneticButton strength={0.16}>
            <button
              onClick={() => {
                soundManager.playClick();
                onViewWork();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-rose-300/30 bg-gradient-to-r from-rose-600 to-fuchsia-700 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_35px_rgba(225,29,72,0.22)] transition-all hover:-translate-y-0.5 hover:border-rose-200/50 hover:shadow-[0_12px_42px_rgba(217,70,239,0.3)]"
            >
              Explore my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </MagneticButton>
          <MagneticButton strength={0.12}>
            <button
              onClick={() => {
                soundManager.playClick();
                onConnect();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-200 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-cyan-950/20"
            >
              Let&apos;s connect
            </button>
          </MagneticButton>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 pt-3 text-xs font-mono uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-cyan-200"
        >
          Get to know me <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[390px] lg:col-span-5 lg:max-w-[430px]">
        <HeroPortraitVisual />
      </div>
    </div>
  </section>
);
