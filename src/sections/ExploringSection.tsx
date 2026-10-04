import React from 'react';
import { CURRENTLY_EXPLORING } from '../data/portfolioData';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/motion/ScrollReveal';
import { SpotlightCard } from '../components/motion/SpotlightCard';

export const ExploringSection: React.FC = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#060709]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                RADAR // 0{CURRENTLY_EXPLORING.length}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                CURRENTLY <br />
                <span className="italic font-light text-zinc-400">EXPLORING.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              Continuous technical curiosity: emerging paradigms, defensive systems, and advanced human-centered interface patterns on my active research desk.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Animated Tags Grid with Stagger */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.06}>
          {CURRENTLY_EXPLORING.map((item, idx) => (
            <ScrollStaggerItem key={item.name} yOffset={20}>
              <SpotlightCard
                enableTilt={true}
                tiltIntensity={8}
                spotlightColor="rgba(225, 29, 72, 0.15)"
                onMouseEnter={() => soundManager.playHover()}
                className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-[#0a0c10] border border-white/5 hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between cursor-default select-none shadow-md hover:shadow-rose-950/20 h-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                    <Sparkles className="w-3.5 h-3.5 text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-rose-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="text-zinc-400">STATUS</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ACTIVE STUDY
                  </span>
                </div>
              </SpotlightCard>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </section>
  );
};

