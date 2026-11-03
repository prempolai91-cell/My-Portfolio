import React, { useState } from 'react';
import { MapPin, RotateCw, ShieldCheck } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';

export const HeroPortraitVisual: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isSpinning, setIsSpinning] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: y * -14, y: x * 16 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="hero-portrait-shell relative mx-auto w-full" style={{ perspective: '1100px' }}>
      <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
      <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="hero-portrait-card group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-[#111217] p-2 shadow-2xl shadow-black/60"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.025 : 1})`,
        }}
      >
        <div aria-hidden="true" className="hero-card-edge pointer-events-none absolute inset-0 rounded-[2rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-rose-700/20 blur-3xl transition-colors duration-700 group-hover:bg-fuchsia-600/25" />
        <div className={`hero-portrait-stage relative h-full w-full overflow-hidden rounded-[1.55rem] bg-zinc-900 ${isSpinning ? 'is-spinning' : ''}`}>
          {!imgError ? (
            <img
              src={PERSONAL_BRAND.heroPhotoUrl}
              alt="Portrait of Prem Polai"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              onAnimationEnd={() => setIsSpinning(false)}
              className={`hero-portrait-image absolute inset-0 h-full w-full object-cover object-top transition-[opacity,filter] duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-rose-950/40 text-sm font-mono tracking-widest text-zinc-400">
              PREM POLAI
            </div>
          )}

          <div aria-hidden="true" className="hero-scanlines pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/90" />

          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-100 shadow-[0_0_24px_rgba(34,211,238,0.09)] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
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
              className="hero-rotate-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/25 bg-black/50 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-xl transition duration-300 hover:scale-110 hover:rotate-90 hover:border-fuchsia-200/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-default"
            >
              <RotateCw className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 space-y-3 p-5 sm:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200">Code × design × security</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">Prem Polai</h2>
              </div>
              <ShieldCheck className="mb-1 h-5 w-5 shrink-0 text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.6)]" aria-label="Security-minded developer" />
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
    </div>
  );
};
