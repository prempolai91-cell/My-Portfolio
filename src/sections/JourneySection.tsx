import React, { useState } from 'react';
import { TIMELINE } from '../data/portfolioData';
import { Briefcase, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/motion/ScrollReveal';

export const JourneySection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(TIMELINE[0].id);

  const toggleExpand = (id: string) => {
    soundManager.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="journey" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                PROGRESSION // 07
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                MY <br />
                <span className="italic font-light text-zinc-400">JOURNEY.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              A chronological timeline of hands-on engineering projects, product research, and continuous exploration across design and application security.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Stack with Staggered Scroll Motion */}
        <div className="relative ml-4 md:ml-8 pl-8 md:pl-12">
          {/* Luminous laser line */}
          <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-rose-500 via-rose-700/60 to-zinc-800 shadow-[0_0_8px_rgba(225,29,72,0.4)]" />

          <ScrollStaggerContainer className="space-y-12" staggerDelay={0.15}>
          {TIMELINE.map((entry) => {
            const isExpanded = expandedId === entry.id;
            return (
              <ScrollStaggerItem key={entry.id} yOffset={24}>
                <div className="relative group">
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isExpanded
                        ? 'border-rose-500 bg-rose-950/80 shadow-lg shadow-rose-950/60 scale-125'
                        : 'border-zinc-700 bg-zinc-950 group-hover:border-zinc-500'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isExpanded ? 'bg-rose-400' : 'bg-zinc-600'
                      }`}
                    />
                  </div>

                  {/* Timeline Entry Card */}
                  <div
                    onClick={() => toggleExpand(entry.id)}
                    className={`p-6 md:p-8 rounded-2xl transition-all duration-300 border cursor-pointer select-none ${
                      isExpanded
                        ? 'bg-zinc-900/90 border-rose-500/40 shadow-xl shadow-rose-950/10'
                        : 'bg-[#090b10]/60 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold text-rose-400">
                          {entry.year}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">&bull;</span>
                        <span className="text-xs font-mono uppercase text-zinc-400">
                          {entry.role}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {entry.isPlaceholder && (
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
                            EDITABLE DATA SLOT
                          </span>
                        )}
                        <button
                          aria-label="Toggle details"
                          className="text-zinc-500 group-hover:text-zinc-300 transition-colors p-1"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                      {entry.title}
                    </h3>

                    <p className="mt-2 text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                      {entry.description}
                    </p>

                    {/* Expandable Key Highlights */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-white/5 space-y-3 animate-in fade-in duration-200">
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          {entry.category === 'Experience' ? (
                            <Briefcase className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Compass className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          <span>KEY TAKEAWAYS &amp; FOCUS</span>
                        </span>

                        <div className="space-y-2">
                          {entry.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 mt-1.5 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>
        </div>
      </div>
    </section>
  );
};

