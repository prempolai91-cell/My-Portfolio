import React from 'react';
import { Shield, Sparkles, Terminal, Code2 } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { label: 'CODE × DESIGN × SECURITY', icon: <Terminal className="w-3.5 h-3.5 text-rose-500" /> },
    { label: 'ANDROID REVERSE ENGINEERING', icon: <Shield className="w-3.5 h-3.5 text-rose-400" /> },
    { label: 'REACT 19 & NEXT.JS', icon: <Code2 className="w-3.5 h-3.5 text-rose-500" /> },
    { label: 'JETPACK COMPOSE UI', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'OWASP SECURE BY DESIGN', icon: <Shield className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'DARK LUXURY INTERFACES', icon: <Sparkles className="w-3.5 h-3.5 text-rose-400" /> },
    { label: 'TYPE-SAFE SYSTEMS', icon: <Terminal className="w-3.5 h-3.5 text-sky-400" /> },
  ];

  return (
    <div className="relative w-full py-4 bg-[#050608] border-y border-white/5 overflow-hidden select-none">
      {/* Left/Right soft vignette mask */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#07080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#07080a] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Double render for seamless infinite looping */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 text-xs font-mono tracking-widest uppercase text-zinc-400 whitespace-nowrap"
          >
            <span>{item.icon}</span>
            <span className="hover:text-white transition-colors">{item.label}</span>
            <span className="text-zinc-700 ml-3">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
};
