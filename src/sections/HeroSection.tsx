import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Shield, Code, Sparkles, Clock, Layers, Cpu, Orbit } from 'lucide-react';
import { HeroPortraitVisual } from '../components/visuals/HeroPortraitVisual';
import { HeroInteractiveCloudViewer } from '../components/visuals/HeroInteractiveCloudViewer';
import { HeroWorkstationVisual } from '../components/visuals/HeroWorkstationVisual';
import { MagneticButton } from '../components/motion/MagneticButton';
import { soundManager } from '../lib/audio';

interface HeroSectionProps {
  onViewWork: () => void;
  onConnect: () => void;
}

type HeroVisualMode = 'portrait' | 'particles' | 'workstation';

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onConnect }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [activeVisualMode, setActiveVisualMode] = useState<HeroVisualMode>('portrait');
  const [activeChip, setActiveChip] = useState<string>('All');

  const chips = ['All', 'Web', 'App', 'Cybersecurity', 'GPU Shaders', 'Fluids', 'Recon'];

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex items-center justify-center pt-36 md:pt-40 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-950/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Bold Editorial Typography */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 z-10">
          {/* Header row: Live Clock + Status Counter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Small label with live clock */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="tracking-widest uppercase">HELLO, I&apos;M PREM POLAI</span>
              {timeStr && (
                <>
                  <span className="text-zinc-600">&bull;</span>
                  <span className="text-zinc-400 flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-rose-400" />
                    {timeStr}
                  </span>
                </>
              )}
            </div>

            {/* AXON-style Status Counter Pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] bg-[#0a0a0a] shadow-md font-mono text-xs cursor-default"
              title="07 Active Verified Systems & Disciplines"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400 text-[10px] uppercase tracking-wider">SYSTEM:</span>
              <span className="text-rose-400 font-bold tracking-widest">07 VERIFIED</span>
            </div>
          </div>

          {/* AXON-style Interactive Tag Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {chips.map((chip) => {
              const isActive = activeChip === chip;
              return (
                <button
                  key={chip}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveChip(chip);
                  }}
                  className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#e6e6e6] text-black border-[#e6e6e6] font-bold shadow-md'
                      : 'bg-[#1c1c1c] text-[#cfcfcf] border-[#2a2a2a] hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            I BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-600 drop-shadow-sm">
              DIGITAL
            </span>{' '}
            <br />
            <span className="italic font-light text-zinc-200">EXPERIENCES.</span>
          </h1>

          {/* Professional identity lockup */}
          <div className="space-y-2">
            <p className="text-sm md:text-base font-mono tracking-wider text-rose-400 font-semibold uppercase">
              Web &amp; App Developer &bull; UI/UX Designer &bull; Cybersecurity Enthusiast
            </p>
            <p className="text-base md:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl">
              I transform ideas into beautiful, functional and secure digital products. Where design, development, and cybersecurity come together.
            </p>
          </div>

          {/* CTA Buttons with Magnetic Spring Interaction */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton strength={0.28}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onViewWork();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-xl shadow-rose-950/60 border border-rose-500/50"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onConnect();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono text-xs font-semibold tracking-widest uppercase border border-white/10 hover:border-rose-500/40 transition-all duration-200 backdrop-blur-md"
              >
                <span>LET&apos;S CONNECT</span>
              </button>
            </MagneticButton>
          </div>

          {/* Subtle Cyber Status Telemetry */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-bold">IDENTITY:</span>
              <span>Code &times; Design &times; Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-zinc-400">STATUS:</span>
              <span className="text-emerald-400">Available For Opportunities</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Visual Deck with 3-Mode Switcher */}
        <div className="lg:col-span-5 relative z-10 w-full flex flex-col items-center">
          {/* Viewport Mode Switcher Tabs */}
          <div className="mb-4 inline-flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveVisualMode('portrait');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeVisualMode === 'portrait'
                  ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/60'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>PORTRAIT</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveVisualMode('particles');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeVisualMode === 'particles'
                  ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/60'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>GPU FIELD</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveVisualMode('workstation');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                activeVisualMode === 'workstation'
                  ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/60'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
          </div>

          <div className="relative w-full">
            {/* Floating Orbital Tag: CODE */}
            <div className="hidden sm:flex absolute -top-5 -left-6 z-20 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 shadow-xl text-[11px] font-mono text-rose-400 backdrop-blur-md animate-float-slow">
              <Code className="w-3 h-3 text-rose-400" />
              <span>&lt;/CODE&gt;</span>
            </div>

            {/* Floating Orbital Tag: DESIGN */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 shadow-xl text-[11px] font-mono text-amber-400 backdrop-blur-md animate-float-delayed">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>&lt;DESIGN&gt;</span>
            </div>

            {/* Floating Orbital Tag: SECURITY */}
            <div className="hidden sm:flex absolute -top-4 -right-4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 shadow-xl text-[11px] font-mono text-emerald-400 backdrop-blur-md animate-float-slow">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>&lt;SECURITY/&gt;</span>
            </div>

            {/* Active Visual Mode Renderer */}
            {activeVisualMode === 'portrait' && <HeroPortraitVisual />}
            {activeVisualMode === 'particles' && <HeroInteractiveCloudViewer />}
            {activeVisualMode === 'workstation' && <HeroWorkstationVisual />}
          </div>
        </div>
      </div>
    </section>
  );
};
