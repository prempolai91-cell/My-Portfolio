import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Palette, Shield, Wrench, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/motion/ScrollReveal';
import JellyRadio from '../components/JellyRadio/JellyRadio';
import { motion, AnimatePresence } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const radioItems = [
    { value: 'all', label: 'All Disciplines', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { value: 'development', label: 'Development', icon: <Code2 className="w-3.5 h-3.5" /> },
    { value: 'uiux', label: 'UI/UX Design', icon: <Palette className="w-3.5 h-3.5" /> },
    { value: 'cybersecurity', label: 'Cybersecurity', icon: <Shield className="w-3.5 h-3.5" /> },
    { value: 'tools', label: 'Tools & Ecosystem', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'development':
        return <Code2 className="w-4 h-4" />;
      case 'uiux':
        return <Palette className="w-4 h-4" />;
      case 'cybersecurity':
        return <Shield className="w-4 h-4" />;
      case 'tools':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Tabs with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                CAPABILITIES // 03
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                MY DIGITAL <br />
                <span className="italic font-light text-zinc-400">TOOLKIT.</span>
              </h2>
            </div>

            {/* Interactive Category JellyRadio Filter */}
            <div className="p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/40 overflow-x-auto max-w-full">
              <JellyRadio
                items={radioItems}
                value={selectedCategory}
                onChange={(val) => {
                  soundManager.playClick();
                  setSelectedCategory(val);
                }}
                chipColor="#11131a"
                activeColor="#e11d48"
                textColor="#9ca3af"
                activeTextColor="#ffffff"
                size="md"
                gap={8}
                radius={12}
                swell={0.16}
                barge={5}
                shrink={0.04}
                jelly={0.85}
                bounce={0.25}
                stiffness={550}
                stagger={20}
                ariaLabel="Filter skills by category"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Categorized Skills Grid with Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-rose-950/40 text-rose-400 border border-rose-900/30">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white tracking-wide">
                        {category.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono">{category.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {category.skills.length} Items
                  </span>
                </div>

                {/* Skills cards with Stagger */}
                <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.03}>
                  {category.skills.map((skill, sIdx) => {
                    const isHovered = activeSkill === skill.name;
                    return (
                      <ScrollStaggerItem key={skill.name} yOffset={12}>
                        <div
                          onMouseEnter={() => {
                            soundManager.playHover();
                            setActiveSkill(skill.name);
                          }}
                          onMouseLeave={() => setActiveSkill(null)}
                          className={`relative p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between border select-none h-full overflow-hidden ${
                            isHovered
                              ? 'bg-zinc-900/90 border-rose-500/50 shadow-xl shadow-rose-950/20 -translate-y-1'
                              : 'bg-zinc-950/60 border-white/5 hover:border-white/15'
                          }`}
                        >
                          {/* Subtle ambient hover glow */}
                          {isHovered && (
                            <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
                          )}

                          <div className="space-y-3 relative z-10">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                              <span className="text-rose-400 font-semibold">{String(sIdx + 1).padStart(2, '0')}</span>
                              <span className="text-[10px] tracking-widest uppercase text-zinc-400">PRACTICE</span>
                            </div>

                            <h4 className="text-base font-display font-bold text-white tracking-tight group-hover:text-rose-300 transition-colors">
                              {skill.name}
                            </h4>

                            <p className="text-xs text-zinc-400 font-light leading-relaxed">
                              {skill.focus}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 relative z-10">
                            <span className="text-zinc-400">DISCIPLINE</span>
                            <span className="text-rose-400/90 font-medium">CORE</span>
                          </div>
                        </div>
                      </ScrollStaggerItem>
                    );
                  })}
                </ScrollStaggerContainer>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};


