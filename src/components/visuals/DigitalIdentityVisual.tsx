import React, { useState } from 'react';
import { Shield, Sparkles, Terminal, Cpu, CheckCircle2, MapPin } from 'lucide-react';
import { PERSONAL_BRAND } from '../../data/portfolioData';

export const DigitalIdentityVisual: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      className="group relative w-full max-w-[420px] aspect-[3/4] mx-auto rounded-3xl p-5 md:p-6 bg-gradient-to-b from-[#11131a] via-[#090a0f] to-[#040407] border border-white/10 hover:border-rose-500/50 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between select-none transition-all duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
    >
      {/* Background ambient crimson glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-600/30 transition-all duration-500" />

      {/* Cyber Brackets in Corners */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-500/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-500/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-500/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-500/40 pointer-events-none" />

      {/* Portrait Image Layer with Editorial Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!imgError ? (
          <img
            src={PERSONAL_BRAND.photoUrl}
            alt={PERSONAL_BRAND.name}
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
            <span>PREM POLAI // PROFILE</span>
          </div>
        )}

        {/* Cinematic Scrim Overlays */}
        {/* Top gradient for HUD contrast */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
        {/* Bottom deep gradient for typography readability */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050608] via-[#050608]/90 to-transparent pointer-events-none" />
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-200 font-semibold tracking-wide">VERIFIED IDENTITY</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/60 backdrop-blur-md border border-rose-800/40 text-rose-300 text-[10px] tracking-wider font-semibold shadow-lg">
          <Shield className="w-3 h-3 text-rose-400" />
          <span>CYBER RECON</span>
        </div>
      </div>

      {/* Mid Floating Accent Badge */}
      <div className="relative z-10 flex justify-end">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 shadow-md">
          <MapPin className="w-3 h-3 text-rose-400" />
          <span>BHUBANESWAR &bull; NIT</span>
        </div>
      </div>

      {/* Bottom Editorial Profile Glass Card */}
      <div className="relative z-10 space-y-3 p-4 rounded-2xl bg-[#090b10]/85 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:border-rose-500/40 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-white">
                {PERSONAL_BRAND.name}
              </h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <p className="text-xs font-mono text-rose-400 tracking-wide mt-0.5">
              Code &times; Design &times; Security
            </p>
          </div>

          <div className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 group-hover:text-rose-400 transition-colors shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
        </div>

        {/* Stack Micro Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-zinc-300 pt-1">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Kotlin</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Python</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">Laravel</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">DFIR</span>
        </div>

        {/* Bottom Status Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Available for Internships
          </span>
          <span className="text-zinc-500">2026 EDITION</span>
        </div>
      </div>
    </div>
  );
};
