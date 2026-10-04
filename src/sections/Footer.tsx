import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundManager } from '../lib/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#050608] select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Brand lockup */}
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">
              PREM POLAI
            </h3>
            <div className="space-y-1 text-xs font-mono text-zinc-400">
              <p>WEB &amp; APP DEVELOPER</p>
              <p>UI/UX DESIGNER</p>
              <p className="text-rose-400 font-semibold">CYBERSECURITY ENTHUSIAST</p>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-mono tracking-wider">
            <button
              onClick={() => scrollToSection('work')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              SKILLS
            </button>
            <button
              onClick={() => scrollToSection('certificates')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              CERTIFICATES
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              CONTACT
            </button>
            <a
              href="https://github.com/prempolai91-cell"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/prem-polai-411849378"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/2819.prem/"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 font-semibold"
            >
              INSTAGRAM
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors ml-auto sm:ml-0"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>&copy; 2026 PREM POLAI. ALL RIGHTS RESERVED.</p>
          <p className="text-zinc-400 tracking-wider">BUILT WITH CODE + CREATIVITY</p>
        </div>
      </div>
    </footer>
  );
};
