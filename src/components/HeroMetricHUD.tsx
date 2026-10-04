import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Layers, Sparkles, Activity, Wifi } from 'lucide-react';
import { ScrollReveal } from './motion/ScrollReveal';

export const HeroMetricHUD: React.FC = () => {
  const [ping, setPing] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic network jitter between 18ms and 28ms
      setPing(Math.floor(18 + Math.random() * 11));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'GITHUB REPOSITORIES',
      value: '04',
      sub: 'Open-Source Security',
      icon: <Layers className="w-4 h-4 text-rose-400" />,
    },
    {
      label: 'DEFENSE STANDARD',
      value: 'OWASP',
      sub: 'Secure-By-Design',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      label: 'EXPERIENCE CRAFT',
      value: '60 FPS',
      sub: 'Motion Ergonomics',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
    {
      label: 'EDGE LATENCY',
      value: `${ping}ms`,
      sub: 'Optimized Telemetry',
      icon: <Wifi className="w-4 h-4 text-rose-400" />,
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-2 pb-14">
      <ScrollReveal distance={20} delay={0.15}>
        <div className="relative rounded-2xl bg-gradient-to-r from-zinc-950/90 via-[#0a0c10]/95 to-zinc-950/90 border border-white/10 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Subtle top specular line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent pointer-events-none" />

          {/* Grid of stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {metrics.map((m, idx) => (
              <div
                key={m.label}
                className={`flex flex-col justify-between space-y-2 select-none group ${
                  idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                    {m.label}
                  </span>
                  <div className="p-1 rounded-md bg-zinc-900 border border-white/5 group-hover:border-rose-500/30 transition-colors">
                    {m.icon}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                    {m.value}
                  </span>
                  <p className="text-[11px] md:text-xs font-mono text-zinc-500">
                    {m.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom telemetry status row */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-300 font-semibold">KERNEL STATUS: ONLINE</span>
              <span className="text-zinc-700 hidden sm:inline">&bull;</span>
              <span className="text-zinc-500 hidden sm:inline">ZERO CRITICAL VULNERABILITIES</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-zinc-400">STACK: KOTLIN &bull; PYTHON &bull; LARAVEL &bull; AUTOPSY &bull; REACT &bull; TS</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
