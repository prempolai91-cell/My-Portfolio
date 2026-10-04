import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Activity, Eye, Zap } from 'lucide-react';
import { soundManager } from '../../lib/audio';

interface ThreatNode {
  id: string;
  name: string;
  angle: number; // degrees
  distance: number; // percentage from center 0 to 100
  severity: 'CRITICAL' | 'ELEVATED' | 'PROTECTED';
  defense: string;
  status: string;
  snippet: string;
}

export const ThreatRadarVisual: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('decomp');

  const nodes: ThreatNode[] = [
    {
      id: 'decomp',
      name: 'Bytecode Decompilation',
      angle: 45,
      distance: 65,
      severity: 'PROTECTED',
      defense: 'R8 / ProGuard Obfuscation & Native C++ Symbol Stripping',
      status: 'MITIGATED (ARM64 Binary Hardening)',
      snippet: 'minifyEnabled true\nshrinkResources true\nproguardFiles getDefaultProguardFile()',
    },
    {
      id: 'mitm',
      name: 'TLS / Network Interception',
      angle: 140,
      distance: 75,
      severity: 'PROTECTED',
      defense: 'Strict SHA-256 Certificate Pinning via network_security_config.xml',
      status: 'BLOCKED (Self-Signed Certificates Rejected)',
      snippet: '<pin-set expiration="2026-12-31">\n  <pin digest="SHA-256">47DEQpj8HBSa+/TImW+5JCeuQeRkm5N...=</pin>\n</pin-set>',
    },
    {
      id: 'keystore',
      name: 'Key Store Tampering',
      angle: 220,
      distance: 50,
      severity: 'PROTECTED',
      defense: 'Hardware-backed Android KeyStore with StrongBox Keymaster',
      status: 'ENCRYPTED (MasterKey AES-256-GCM)',
      snippet: 'MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC);\nEncryptedSharedPreferences.create(...)',
    },
    {
      id: 'xss',
      name: 'Client Script Injection',
      angle: 310,
      distance: 60,
      severity: 'PROTECTED',
      defense: 'Strict CSP Nonces, DOMPurify Sanitization, React Automatic Escaping',
      status: 'DEFENDED (Non-Executable Strings)',
      snippet: 'Content-Security-Policy: default-src \'self\'; script-src \'nonce-2726c\'',
    },
  ];

  const active = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="relative rounded-2xl bg-[#050608] border border-white/10 p-6 shadow-2xl overflow-hidden font-mono text-xs select-none">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-zinc-200 font-bold uppercase tracking-wider">
            RADAR // DEFENSIVE THREAT MATRIX
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span>SWEEP: ACTIVE</span>
          <span className="text-rose-400">360&deg; SCAN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4">
        {/* Left Column: Interactive Radar Canvas */}
        <div className="md:col-span-7 flex justify-center py-2">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-rose-900/40 bg-zinc-950/80 flex items-center justify-center shadow-inner overflow-hidden">
            {/* Concentric rings */}
            <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-rose-500/20" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-rose-500/25" />
            <div className="absolute w-1/4 h-1/4 rounded-full border border-rose-500/30" />

            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-rose-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-rose-500/20" />

            {/* Rotating radar sweep beam */}
            <div
              className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite] origin-center pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 270deg, rgba(225, 29, 72, 0.4) 360deg)',
              }}
            />

            {/* Center Core */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow-lg shadow-rose-500/80">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Interactive Threat Nodes */}
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              // Normalize distance to radius (max radius is roughly 110px)
              const r = (node.distance / 100) * 110;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              const isSelected = selectedNode === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedNode(node.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  title={node.name}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className={`absolute z-20 group -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`relative w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSelected
                        ? 'border-white bg-rose-500 shadow-lg shadow-rose-500'
                        : 'border-rose-400 bg-rose-950/80'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  {/* Tooltip on hover */}
                  <span className="hidden group-hover:block absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-zinc-900 border border-white/20 text-white px-2 py-0.5 rounded text-[10px] shadow-lg pointer-events-none">
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Diagnostics */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              VECTOR SELECTED
            </span>
            <h4 className="text-sm sm:text-base font-display font-bold text-white">
              {active.name}
            </h4>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">DEFENSE LAYER</span>
              <span className="text-emerald-400 font-semibold">{active.status}</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
              {active.defense}
            </p>
          </div>

          {/* Hardened Code Snippet */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              HARDENING RULE
            </span>
            <pre className="p-3 rounded-xl bg-black border border-white/10 text-rose-300 text-[10px] leading-relaxed overflow-x-auto whitespace-pre font-mono">
              {active.snippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
