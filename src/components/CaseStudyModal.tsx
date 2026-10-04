import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, ArrowRight, ShieldCheck, CheckCircle2, Terminal, Github, ExternalLink } from 'lucide-react';
import { ProjectVisualThumbnail } from './visuals/ProjectVisuals';
import { soundManager } from '../lib/audio';

interface CaseStudyModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const handleNextClick = () => {
    soundManager.playClick();
    onSelectProject(nextProject);
    const scrollContainer = document.getElementById('case-study-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Top Floating Control Bar */}
      <div className="fixed top-0 left-0 right-0 z-60 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-zinc-300">
          <span className="text-rose-400 font-bold">{project.number}</span>
          <span>/</span>
          <span>{project.title}</span>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="pointer-events-auto p-2.5 rounded-full bg-zinc-900/90 hover:bg-rose-600 text-zinc-300 hover:text-white border border-white/10 transition-colors shadow-xl"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Scrollable Canvas */}
      <div
        id="case-study-scroll-container"
        className="w-full h-full overflow-y-auto pt-24 pb-32 px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header & Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-zinc-400">
              <span className="text-rose-400 font-semibold">{project.number}</span>
              <span aria-hidden="true">&bull;</span>
              <span>{project.category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Unboxed tech stack tags */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 uppercase tracking-widest text-[11px]">Stack</span>
              {project.technologies.map((tech) => (
                <span key={tech} className="text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Direct GitHub Link */}
            {project.repoUrl && (
              <div className="pt-2">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-rose-600 text-white font-mono text-xs font-semibold tracking-wider uppercase border border-white/10 hover:border-rose-500 transition-all duration-200 shadow-md group"
                >
                  <Github className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
                  <span>VIEW REPOSITORY ON GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </div>
            )}
          </div>

          {/* Large Project Visual Showcase */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
            <ProjectVisualThumbnail theme={project.visualTheme} />
          </div>

          {/* Quick Metrics Bar */}
          {project.caseStudy.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
              {project.caseStudy.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-2xl md:text-3xl font-display font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 1: PROJECT OVERVIEW */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-rose-400">
              01 // PROJECT OVERVIEW
            </h2>
            <p className="text-base md:text-lg text-zinc-200 leading-relaxed">
              {project.caseStudy.overview}
            </p>
          </section>

          {/* SECTION 2: THE PROBLEM & THE IDEA */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                THE PROBLEM
              </h2>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                {project.caseStudy.theProblem}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-rose-400">
                THE IDEA
              </h2>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                {project.caseStudy.theIdea}
              </p>
            </div>
          </section>

          {/* SECTION 3: MY APPROACH */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              MY APPROACH
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.caseStudy.myApproach.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2"
                >
                  <span className="text-xs font-mono text-rose-500 font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: DESIGN PROCESS */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              DESIGN PROCESS
            </h2>
            <div className="space-y-4">
              {project.caseStudy.designProcess.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-gradient-to-r from-zinc-900/60 to-zinc-950/60 border border-white/5 space-y-1.5"
                >
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {item.phase}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: DEVELOPMENT & ENGINEERING */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              DEVELOPMENT
            </h2>
            <ul className="space-y-3">
              {project.caseStudy.development.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 6: SECURITY CONSIDERATIONS */}
          <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-rose-950/20 via-zinc-900/60 to-zinc-950 border border-rose-900/30 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>SECURITY CONSIDERATIONS &amp; DEFENSE</span>
            </div>
            <ul className="space-y-3">
              {project.caseStudy.securityConsiderations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Terminal className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 7: TECHNOLOGY BREAKDOWN */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              TECHNOLOGY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.caseStudy.technology.map((cat) => (
                <div key={cat.category} className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 space-y-2">
                  <h3 className="text-xs font-mono text-rose-400 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <div className="space-y-1 text-sm text-zinc-300">
                    {cat.items.map((item) => (
                      <div key={item}>&bull; {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: RESULT / CURRENT STATUS */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              RESULT / CURRENT STATUS
            </h2>
            <p className="text-base text-zinc-200 leading-relaxed">
              {project.caseStudy.resultStatus}
            </p>
          </section>

          {/* SECTION 9: KEY LEARNINGS */}
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              KEY LEARNINGS
            </h2>
            <div className="space-y-3">
              {project.caseStudy.keyLearnings.map((learning, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-zinc-900/40 border border-white/5 text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-rose-500 font-mono font-bold">0{idx + 1}</span>
                  <span>{learning}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER BUTTON */}
          <div className="pt-12 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              {allProjects.length > 1 ? 'CONTINUE READING' : 'CASE STUDY COMPLETE'}
            </span>
            {allProjects.length > 1 ? (
              <button
                onClick={handleNextClick}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-rose-700 text-white font-mono text-xs tracking-wider border border-white/10 hover:border-rose-500 transition-all duration-200"
              >
                <span>NEXT PROJECT: {nextProject.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-rose-950/40"
              >
                <span>CLOSE CASE STUDY</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
