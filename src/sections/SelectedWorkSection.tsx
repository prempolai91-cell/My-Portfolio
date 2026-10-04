import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ArrowUpRight, Github, Globe, Smartphone, Shield, Layers, X, Sparkles } from 'lucide-react';
import { ProjectVisualThumbnail } from '../components/visuals/ProjectVisuals';
import { soundManager } from '../lib/audio';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { SpotlightCard } from '../components/motion/SpotlightCard';

interface SelectedWorkSectionProps {
  onSelectProject: (p: Project) => void;
}

type FilterCategory = 'All' | 'Web' | 'App' | 'Cybersecurity';

interface CategoryOption {
  id: FilterCategory;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'All',
    label: 'ALL WORK',
    icon: Layers,
    description: 'Complete open-source engineering portfolio',
  },
  {
    id: 'Web',
    label: 'WEB',
    icon: Globe,
    description: 'Full-stack web applications & platforms',
  },
  {
    id: 'App',
    label: 'APP',
    icon: Smartphone,
    description: 'Android mobile & desktop applications',
  },
  {
    id: 'Cybersecurity',
    label: 'CYBERSECURITY',
    icon: Shield,
    description: 'Offensive, defensive & forensic security tools',
  },
];

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.filterCategories.includes(activeCategory));
  }, [activeCategory]);

  const getCategoryCount = (id: FilterCategory) => {
    if (id === 'All') return PROJECTS.length;
    return PROJECTS.filter((p) => p.filterCategories.includes(id)).length;
  };

  const handleCategoryChange = (category: FilterCategory) => {
    soundManager.playClick();
    setActiveCategory(category);
  };

  return (
    <section id="work" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                FEATURED WORK // 04 REPOSITORIES
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                SELECTED <br />
                <span className="italic font-light text-zinc-400">WORK.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              Engineered cybersecurity systems and software tools spanning Android mobile application security, concurrent network reconnaissance, digital forensics, and social engineering simulation.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Controls */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Segmented Filter Bar */}
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl"
              >
                {CATEGORY_OPTIONS.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = getCategoryCount(cat.id);

                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="project-list"
                      onClick={() => handleCategoryChange(cat.id)}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
                        isActive
                          ? 'bg-zinc-800 text-white border border-rose-500/50 shadow-md shadow-rose-950/20'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? 'text-rose-400' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                          isActive
                            ? 'bg-rose-500/20 text-rose-300 font-bold'
                            : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-400'
                        }`}
                      >
                        {count.toString().padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reset filter button if a specific category is active */}
              {activeCategory !== 'All' && (
                <button
                  onClick={() => handleCategoryChange('All')}
                  onMouseEnter={() => soundManager.playHover()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 hover:border-rose-500/30 font-mono text-xs transition-colors self-start sm:self-auto"
                >
                  <X className="w-3.5 h-3.5 text-rose-400" />
                  <span>RESET FILTER</span>
                </button>
              )}
            </div>

            {/* Filter Telemetry Metadata Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1 pt-1 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>FILTER:</span>
                <span className="text-zinc-300 font-semibold tracking-wider uppercase">
                  {activeCategory === 'All' ? 'ALL REPOSITORIES' : `${activeCategory} PROJECTS`}
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-zinc-400">
                  SHOWING {filteredProjects.length} OF {PROJECTS.length}
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-500 text-[11px]">
                CLICK ANY CARD TO EXPLORE ARCHITECTURE &amp; SOURCE
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Project Showcase Cards with Scroll Animation & Radial Cursor Spotlight */}
        <div id="project-list" className="space-y-16 lg:space-y-24">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={project.id}
                  className="animate-in fade-in duration-300 slide-in-from-bottom-2"
                >
                  <ScrollReveal distance={36} delay={idx * 0.05}>
                    <SpotlightCard
                      data-cursor="view"
                      spotlightColor="rgba(225, 29, 72, 0.18)"
                      onClick={() => {
                        soundManager.playClick();
                        onSelectProject(project);
                      }}
                      className="group relative rounded-3xl p-6 md:p-10 lg:p-12 bg-gradient-to-b from-[#0e1017] via-[#090b10] to-[#06070a] border border-white/10 hover:border-rose-500/50 transition-all duration-300 shadow-2xl hover:shadow-rose-950/30 cursor-pointer overflow-hidden"
                    >
                      {/* Subtle hover gradient bloom */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 group-hover:bg-rose-600/15 rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

                      <div
                        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center relative z-20`}
                      >
                        {/* Text Details Column */}
                        <div
                          className={`lg:col-span-6 min-w-0 space-y-6 ${
                            isReversed ? 'lg:order-2 lg:pl-6 xl:pl-8' : 'lg:order-1 lg:pr-6 xl:pr-8'
                          }`}
                        >
                          {/* Number, Category & Domain Tag */}
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono text-zinc-400">
                            <span className="text-rose-500 font-bold">{project.number}</span>
                            <span aria-hidden="true">&bull;</span>
                            <span className="uppercase tracking-wider">{project.category}</span>
                            <span aria-hidden="true" className="hidden sm:inline">&bull;</span>
                            <span className="hidden sm:inline text-[11px] text-zinc-500 font-medium">
                              [{project.filterCategories.join(' &bull; ')}]
                            </span>
                          </div>

                          {/* Title with subtle hover shift and wrap protection */}
                          <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15] group-hover:text-rose-400 group-hover:translate-x-1 transition-all duration-300 break-words">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                            {project.shortDescription}
                          </p>

                          {/* Unboxed Technology Tags */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-mono text-zinc-400">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="group-hover:text-zinc-200 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Interactive Buttons */}
                          <div className="pt-4 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 group-hover:bg-rose-600 text-white font-mono text-xs font-semibold tracking-wider uppercase border border-white/10 group-hover:border-rose-500 transition-all duration-300 shadow-md">
                              <span>EXPLORE CASE STUDY</span>
                              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soundManager.playClick();
                                }}
                                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-rose-500/50 transition-all"
                                title="View source on GitHub"
                              >
                                <Github className="w-4 h-4 text-rose-400" />
                                <span>GITHUB</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Large Visual Column with Subtle Hover Zoom & Key Metrics Overlay */}
                        <div
                          className={`lg:col-span-6 min-w-0 ${
                            isReversed ? 'lg:order-1' : 'lg:order-2'
                          }`}
                        >
                          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-rose-500/40 group-hover:scale-[1.01] transition-all duration-500">
                            <ProjectVisualThumbnail theme={project.visualTheme} />

                            {/* Top Corner Quick Spec Pill on Hover */}
                            <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                              <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-rose-500/40 font-mono text-[10px] text-rose-300 tracking-wider shadow-lg flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>QUICK SPEC</span>
                              </span>
                            </div>

                            {/* Bottom Key Metrics & Tech Stack Hover Overlay */}
                            <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-5 bg-gradient-to-t from-black/95 via-[#080a0f]/90 to-transparent backdrop-blur-md border-t border-white/10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                              <div className="space-y-2.5">
                                {/* Header Row: Project Type & Categories */}
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                  <div className="flex items-center gap-2 text-zinc-300">
                                    <span className="text-rose-400 font-bold">TYPE:</span>
                                    <span className="uppercase tracking-wider font-medium">{project.category}</span>
                                  </div>
                                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline">
                                    [{project.filterCategories.join(' &bull; ')}]
                                  </span>
                                </div>

                                {/* Tech Stack Row */}
                                <div className="flex items-center gap-2 text-xs font-mono">
                                  <span className="text-zinc-500 text-[10px] shrink-0 uppercase tracking-wider">STACK:</span>
                                  <span className="text-zinc-200 font-medium truncate">
                                    {project.technologies.slice(0, 4).join(' &bull; ')}
                                  </span>
                                </div>

                                {/* Key Metrics Chips */}
                                {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 && (
                                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono">
                                    {project.caseStudy.metrics.map((m, mIdx) => (
                                      <div key={mIdx} className="bg-zinc-900/80 rounded-lg p-1.5 px-2 border border-white/5">
                                        <p className="text-[9px] text-zinc-500 uppercase tracking-wider truncate">{m.label}</p>
                                        <p className="text-[11px] font-semibold text-rose-400 mt-0.5 truncate">{m.value}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </ScrollReveal>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center space-y-4 rounded-3xl bg-zinc-900/30 border border-dashed border-white/10">
              <Shield className="w-12 h-12 text-zinc-600 mx-auto" />
              <h4 className="text-lg font-display font-bold text-white">No projects found</h4>
              <p className="text-zinc-400 font-mono text-xs max-w-sm mx-auto">
                No projects currently match the &apos;{activeCategory}&apos; filter.
              </p>
              <button
                onClick={() => handleCategoryChange('All')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>SHOW ALL PROJECTS</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
