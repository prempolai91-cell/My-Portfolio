import React, { useState } from 'react';
import { Shield, Terminal, Sparkles, Code, Cpu, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';

export const HeroPortraitVisual: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      className="group relative w-full max-w-[440px] aspect-[3/4] mx-auto rounded-3xl p-5 md:p-6 bg-gradient-to-b from-[#12141c] via-[#090b10] to-[#040508] border border-white/10 hover:border-rose-500/50 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between select-none transition-all duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
    >
      {/* Background ambient crimson aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-600/30 transition-all duration-500" />
      <div className="absolute bottom-10 -right-10 w-60 h-60 bg-red-950/30 rounded-full blur-2xl pointer-events-none" />

      {/* Cyber Corner Marks */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-500/50 pointer-events-none" />

      {/* Hero Portrait Photo Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!imgError ? (
          <img
            src={PERSONAL_BRAND.heroPhotoUrl}
            alt="Prem Polai"
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98] transition-all duration-700 ease-out group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 font-mono text-xs">
            <Shield className="w-12 h-12 text-rose-500/60 mb-2" />
            <span>PREM POLAI // HERO</span>
          </div>
        )}

        {/* Cinematic Scrim Overlays */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#050608] via-[#050608]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Top HUD Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider">KERNEL ONLINE</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/70 backdrop-blur-md border border-rose-800/40 text-rose-300 text-[10px] tracking-wider font-semibold shadow-lg">
          <Shield className="w-3 h-3 text-rose-400" />
          <span>ZERO TRUST</span>
        </div>
      </div>

      {/* Mid Floating Code Inspection Badge */}
      <div className="relative z-10 flex justify-end">
        <div className="hidden sm:flex flex-col gap-1 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 shadow-2xl font-mono text-[10px] max-w-[200px]">
          <div className="flex items-center justify-between text-zinc-500 pb-1 border-b border-zinc-900">
            <span>core.config</span>
            <span className="text-emerald-400">ok</span>
          </div>
          <div className="text-zinc-300">
            <span className="text-rose-400">stack:</span> [&apos;Kotlin&apos;, &apos;Python&apos;, &apos;Laravel&apos;]
          </div>
          <div className="text-zinc-400">
            <span className="text-sky-400">security:</span> OWASP
          </div>
        </div>
      </div>

      {/* Bottom Editorial Profile Glass Dock */}
      <div className="relative z-10 space-y-3 p-4 rounded-2xl bg-[#090b10]/85 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:border-rose-500/40 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-white">
                Prem Polai
              </h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <p className="text-xs font-mono text-rose-400 tracking-wide mt-0.5">
              Code &times; Design &times; Security
            </p>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-white/5">
            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
            <span>NIT BBSR</span>
          </div>
        </div>

        {/* Micro Tech Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-zinc-300 pt-1">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Android Sec</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Port Recon</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">DFIR</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Simulation</span>
        </div>

        {/* Bottom Status Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Ready for Opportunities
          </span>
          <span className="text-zinc-500 font-semibold">2026 EDITION</span>
        </div>
      </div>
    </div>
  );
};
