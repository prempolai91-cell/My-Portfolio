import React, { useState } from 'react';
import { AxonParticleCloud } from './AxonParticleCloud';
import { Sparkles, Activity, RefreshCw, Cpu, Layers, Zap } from 'lucide-react';
import { soundManager } from '../../lib/audio';

export const HeroInteractiveCloudViewer: React.FC = () => {
  const [fps, setFps] = useState<number>(60);
  const [activeColor, setActiveColor] = useState<string>('#f43f5e'); // Crimson rose
  const [particleKey, setParticleKey] = useState<number>(0);

  const colors = [
    { label: 'ROSE', value: '#f43f5e', class: 'bg-rose-500' },
    { label: 'VIOLET', value: '#aa88ff', class: 'bg-[#aa88ff]' },
    { label: 'CYAN', value: '#06b6d4', class: 'bg-cyan-500' },
    { label: 'EMERALD', value: '#10b981', class: 'bg-emerald-500' },
  ];

  const handlePulse = () => {
    soundManager.playClick();
    setParticleKey((prev) => prev + 1);
  };

  return (
    <div
      data-cursor="explore"
      className="group relative w-full max-w-[440px] aspect-[3/4] mx-auto rounded-3xl p-5 md:p-6 bg-gradient-to-b from-[#12141c] via-[#090b10] to-[#040508] border border-white/10 hover:border-rose-500/50 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between select-none transition-all duration-300 ease-out"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-600/25 transition-all duration-500" />

      {/* Cyber Corner Marks */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-500/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-500/50 pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider">GPU PARTICLE LAB</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] tracking-wider font-mono shadow-lg">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>{fps} FPS</span>
        </div>
      </div>

      {/* Center 3D Interactive GPU Particle Cloud Canvas */}
      <div className="absolute inset-0 z-0">
        <AxonParticleCloud
          key={particleKey}
          interactive={true}
          accentColor={activeColor}
          onFpsUpdate={(newFps) => setFps(newFps)}
          className="w-full h-full"
        />
        {/* Soft edge fade for glass card container */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />
      </div>

      {/* Mid Floating SDF Formula Telemetry */}
      <div className="relative z-10 flex justify-end pointer-events-none">
        <div className="hidden sm:flex flex-col gap-1 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl font-mono text-[10px] max-w-[210px]">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-zinc-800">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-rose-400" />
              <span>SDF NEXUS</span>
            </span>
            <span className="text-emerald-400">65,536 PTS</span>
          </div>
          <div className="text-zinc-300">
            <span className="text-zinc-500">sim:</span> CurlNoise &bull; Advection
          </div>
          <div className="text-zinc-400">
            <span className="text-zinc-500">shape:</span> TorusAttractor
          </div>
        </div>
      </div>

      {/* Bottom Controls Dock */}
      <div className="relative z-10 space-y-3 p-4 rounded-2xl bg-[#090b10]/90 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:border-rose-500/40 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              INTERACTIVE FLUID FIELD
            </span>
          </div>

          <button
            onClick={handlePulse}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-[10px] tracking-wider transition-colors border border-white/10"
            title="Reset & perturb particle field"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>DISPERSE</span>
          </button>
        </div>

        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
          Move your cursor or finger across the canvas to stir the fluid turbulence. Particles swirl along the flow and heal back onto the sculpted shape.
        </p>

        {/* Color Palette Switcher */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
            SPECTRUM:
          </span>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  soundManager.playClick();
                  setActiveColor(c.value);
                }}
                className={`w-4 h-4 rounded-full ${c.class} transition-all duration-200 ${
                  activeColor === c.value
                    ? 'ring-2 ring-white scale-125 shadow-md'
                    : 'opacity-60 hover:opacity-100 hover:scale-110'
                }`}
                title={`Switch accent color to ${c.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

