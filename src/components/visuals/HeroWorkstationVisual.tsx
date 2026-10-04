import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Terminal, Cpu, Lock, Layers } from 'lucide-react';

export const HeroWorkstationVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'code' | 'design' | 'security'>('code');
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      className="relative w-full aspect-[4/3] md:aspect-[16/11] max-w-xl mx-auto rounded-2xl p-4 md:p-6 bg-gradient-to-b from-zinc-900/80 via-[#0b0c10]/95 to-[#07080a] border border-white/10 shadow-2xl shadow-black overflow-hidden group select-none transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
      }}
    >
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive Top Frame Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 animate-pulse" />
          <span className="text-zinc-400">STUDIO.ENV // 2026</span>
        </div>
        <div className="flex items-center gap-1.5 p-0.5 bg-black/50 rounded-lg border border-white/10 text-[11px]">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'code' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
            }`}
          >
            &lt;/CODE&gt;
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'design' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
            }`}
          >
            &lt;DESIGN&gt;
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'security' ? 'bg-zinc-800 text-rose-400 shadow-xs' : 'text-zinc-400 hover:text-rose-400'
            }`}
          >
            &lt;SECURITY/&gt;
          </button>
        </div>
      </div>

      {/* Main Interactive Visual Canvas */}
      <div className="relative mt-4 h-[calc(100%-48px)] flex flex-col justify-between">
        {/* Dynamic Display Pane */}
        {activeTab === 'code' && (
          <div className="h-full flex flex-col justify-between font-mono text-xs">
            <div className="bg-[#050608]/90 p-4 rounded-xl border border-white/5 space-y-2 overflow-hidden shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-1 border-b border-zinc-900">
                <span>app/core/architect.ts</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> COMPILED
                </span>
              </div>
              <p className="text-zinc-500">
                <span className="text-rose-400">interface</span> <span className="text-amber-300">DigitalProduct</span> &#123;
              </p>
              <p className="pl-4 text-zinc-300">
                design: <span className="text-sky-300">&apos;Intuitive &amp; Human&apos;</span>;
              </p>
              <p className="pl-4 text-zinc-300">
                engineering: <span className="text-sky-300">&apos;TypeScript &amp; Kotlin&apos;</span>;
              </p>
              <p className="pl-4 text-zinc-300">
                security: <span className="text-rose-400">SecureByDesign</span>;
              </p>
              <p className="text-zinc-500">&#125;</p>
              <div className="pt-2 text-[11px] text-zinc-500 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>$ build --target=production --zero-trust</span>
              </div>
            </div>

            {/* Bottom mini-metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase">Framework</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">React 19 &bull; Compose</p>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase">Type Safety</p>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5">100% Strict</p>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase">Runtime</p>
                <p className="text-xs font-semibold text-rose-400 mt-0.5">Zero-Latency</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="h-full flex flex-col justify-between text-xs">
            <div className="relative bg-[#050608]/90 p-4 rounded-xl border border-white/5 h-44 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>CANVAS // 1440 x 900</span>
                <span>RATIO: 1.618</span>
              </div>

              {/* Visual wireframe tokens representation */}
              <div className="relative w-full h-24 border border-dashed border-zinc-800 rounded-lg p-3 flex items-center justify-around">
                <div className="w-16 h-14 rounded-lg bg-zinc-900 border border-rose-500/40 p-1.5 flex flex-col justify-between shadow-lg">
                  <div className="w-6 h-1 bg-rose-400 rounded-full" />
                  <div className="w-10 h-1 bg-zinc-700 rounded-full" />
                  <div className="w-8 h-1 bg-zinc-800 rounded-full" />
                </div>
                <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 p-2 flex flex-col justify-between shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-1.5 bg-white/90 rounded-full" />
                    <Sparkles className="w-2.5 h-2.5 text-rose-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-16 h-1 bg-zinc-600 rounded-full" />
                    <div className="w-12 h-1 bg-zinc-700 rounded-full" />
                  </div>
                </div>
                <div className="w-14 h-14 rounded-lg bg-zinc-900 border border-white/10 p-2 flex flex-col items-center justify-center">
                  <Layers className="w-4 h-4 text-zinc-400 mb-1" />
                  <span className="text-[9px] font-mono text-zinc-500">TOKENS</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>COLOR: #07080A / #E11D48</span>
                <span>TYPOGRAPHY: SYNE + SATOSHI</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">CONTRAST</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">WCAG AAA</p>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">MOTION</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">Natural Spring</p>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">SPACING</p>
                <p className="text-xs font-semibold text-rose-400 mt-0.5">8pt Grid</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="h-full flex flex-col justify-between font-mono text-xs">
            <div className="bg-[#050608]/90 p-4 rounded-xl border border-rose-950/40 space-y-2 h-44 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <Shield className="w-3.5 h-3.5" /> DEFENSE SHIELD
                </span>
                <span className="text-emerald-400">ARMED</span>
              </div>

              {/* Simulated network & analysis flow */}
              <div className="space-y-1.5 py-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">&gt; apk.intent_filter:</span>
                  <span className="text-emerald-400">RESTRICTED</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">&gt; memory.key_store:</span>
                  <span className="text-emerald-400">HARDWARE_BACKED</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">&gt; network.tls_pinning:</span>
                  <span className="text-rose-400">ENFORCED (SHA256)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">&gt; attack_surface:</span>
                  <span className="text-zinc-300">MINIMAL</span>
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-900">
                <span>OWASP MOBILE M1-M10</span>
                <span className="text-rose-400">SCAN PASS</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">CIPHER</p>
                <p className="text-xs font-semibold text-zinc-200 mt-0.5">AES-256-GCM</p>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">INTEGRITY</p>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5">SECURE</p>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">
                <p className="text-[10px] text-zinc-500">DEOBFUSCATION</p>
                <p className="text-xs font-semibold text-rose-400 mt-0.5">GUARDED</p>
              </div>
            </div>
          </div>
        )}

        {/* Floating badge chips anchored inside */}
        <div className="flex items-center justify-between pt-3 text-[10px] font-mono text-zinc-500 border-t border-white/5">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-rose-400" /> SECURED CONTAINER
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Cpu className="w-3 h-3" /> ART // V8 READY
          </span>
        </div>
      </div>
    </div>
  );
};
