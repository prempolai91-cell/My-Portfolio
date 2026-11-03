import React, { useState } from 'react';
import { MapPin, RotateCw, ShieldCheck } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';

export const HeroPortraitVisual: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="hero-portrait-card group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111217] p-2 shadow-2xl shadow-black/50">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-rose-700/15 blur-3xl transition-colors duration-700 group-hover:bg-rose-600/25" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-zinc-900">
        {!imgError ? (
          <img
            src={PERSONAL_BRAND.heroPhotoUrl}
            alt="Portrait of Prem Polai"
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            onAnimationEnd={() => setIsSpinning(false)}
            className={`hero-portrait-image absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            } ${isSpinning ? 'is-spinning' : ''}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-rose-950/40 text-sm font-mono tracking-widest text-zinc-400">
            PREM POLAI
          </div>
        )}

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/85" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-100 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open to opportunities
          </div>
          <button
            type="button"
            aria-label="Rotate portrait 360 degrees"
            title="Rotate portrait 360°"
            onClick={() => {
              if (!isSpinning) setIsSpinning(true);
            }}
            disabled={isSpinning}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:rotate-45 hover:border-rose-300/50 hover:bg-rose-950/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 disabled:cursor-default"
          >
            <RotateCw className={`h-4 w-4 ${isSpinning ? 'text-rose-200' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 space-y-3 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.22em] text-rose-200">Code × design × security</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Prem Polai</h2>
            </div>
            <ShieldCheck className="mb-1 h-5 w-5 shrink-0 text-emerald-300" aria-label="Security-minded developer" />
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-300">
            Building useful digital experiences with care, curiosity, and a security-first mindset.
          </p>
          <div className="flex items-center gap-2 border-t border-white/15 pt-3 text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-300">
            <MapPin className="h-3.5 w-3.5 text-rose-200" aria-hidden="true" />
            Bhubaneswar, India
          </div>
        </div>
      </div>
    </div>
  );
};
