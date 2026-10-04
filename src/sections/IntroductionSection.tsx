import React, { useState } from 'react';
import { THREE_WORLDS } from '../data/portfolioData';
import { Code2, Palette, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/motion/ScrollReveal';
import { SpotlightCard } from '../components/motion/SpotlightCard';

export const IntroductionSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Code2 className="w-5 h-5 text-rose-400" />;
      case 1:
        return <Palette className="w-5 h-5 text-rose-400" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      default:
        return <Code2 className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                PHILOSOPHY // 01
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                THREE WORLDS. <br />
                <span className="italic text-zinc-400 font-light">ONE CREATIVE MIND.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              I don&apos;t treat code, design, and security as isolated disciplines. True digital craftsmanship happens when all three inform every single decision from inception to release.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Large Interactive Cards with Staggered Scroll Animation */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {THREE_WORLDS.map((card, idx) => {
            const isHovered = activeCard === idx;
            return (
              <ScrollStaggerItem key={card.number} yOffset={32}>
                <SpotlightCard
                  enableTilt={true}
                  tiltIntensity={6}
                  spotlightColor="rgba(225, 29, 72, 0.18)"
                  onMouseEnter={() => {
                    soundManager.playHover();
                    setActiveCard(idx);
                  }}
                  className={`relative p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none border h-full ${
                    isHovered
                      ? 'bg-zinc-900/90 border-rose-500/50 shadow-2xl shadow-rose-950/30 -translate-y-1.5'
                      : 'bg-[#0b0c10]/70 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Subtle card glow */}
                  {isHovered && (
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <div className="space-y-6">
                    {/* Top indicator & number */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl md:text-4xl font-display font-extrabold text-zinc-500/60 font-mono">
                        {card.number}
                      </span>
                      <div className="p-3 rounded-xl bg-zinc-800/60 border border-white/10">
                        {getIcon(idx)}
                      </div>
                    </div>

                    {/* Title & headline */}
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-xs font-mono text-rose-400 uppercase tracking-wider">
                        {card.headline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-300 leading-relaxed font-light">
                      {card.description}
                    </p>

                    {/* Focus areas */}
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                        Key Disciplines
                      </span>
                      <div className="space-y-1.5 text-xs text-zinc-300">
                        {card.focusAreas.map((area) => (
                          <div key={area} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Monospace code preview ribbon */}
                  <div className="mt-8 pt-4 border-t border-white/5">
                    <div className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-[11px] text-zinc-400 truncate flex items-center justify-between">
                      <span className="truncate">{card.codeSnippet}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 shrink-0 ml-2" />
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>
      </div>
    </section>
  );
};

