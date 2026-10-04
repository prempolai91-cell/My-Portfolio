import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Binary,
  Radio,
  Wifi,
  Search,
  FileCheck2,
  HardDrive,
  Hash,
  Mail,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const AndroidPentestVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[340px] bg-gradient-to-br from-[#0c0d12] via-[#08090c] to-[#040406] p-4 md:p-6 rounded-xl flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-rose-900/40 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-zinc-300 font-semibold">APK DECOMPILER // SMALI INSPECT</span>
        </div>
        <span className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded text-[10px] border border-rose-800/30">
          VULN DETECTED
        </span>
      </div>

      {/* Code disassembly visual */}
      <div className="my-3 p-3.5 rounded-lg bg-[#050608]/90 border border-white/5 font-mono text-[11px] space-y-1.5 shadow-inner">
        <div className="text-zinc-500 flex items-center justify-between">
          <span>com/target/auth/CryptoManager.smali</span>
          <span className="text-zinc-600">L84</span>
        </div>
        <div className="text-zinc-400">
          <span className="text-rose-400">const-string</span> v0, <span className="text-amber-300">&quot;AES/ECB/PKCS5Padding&quot;</span> <span className="text-rose-500 text-[10px]">// INSECURE CIPHER</span>
        </div>
        <div className="text-zinc-400">
          <span className="text-sky-400">invoke-static</span> &#123;v0&#125;, Ljavax/crypto/Cipher;-&gt;getInstance(Ljava/lang/String;)
        </div>
        <div className="text-emerald-400 pt-1">
          <span className="text-zinc-500">&gt; mitigation:</span> Enforce AES-GCM with hardware KeyStore
        </div>
      </div>

      {/* Mobile telemetry preview */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">ATTACK VECTOR</p>
            <p className="text-xs font-semibold text-zinc-200">Exported Receiver</p>
          </div>
        </div>
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <Binary className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">RUNTIME HOOK</p>
            <p className="text-xs font-semibold text-zinc-200">Frida Interceptor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CyberReconVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[340px] bg-gradient-to-br from-[#0a0d14] via-[#07090f] to-[#040508] p-4 md:p-6 rounded-xl flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-sky-900/40 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-zinc-300 font-semibold">CYBERRECON // SOCKET PROBER</span>
        </div>
        <span className="text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded text-[10px] border border-sky-800/30">
          CONCURRENT 32 THREADS
        </span>
      </div>

      {/* Target & socket telemetry console */}
      <div className="my-3 p-3.5 rounded-lg bg-[#04060a]/90 border border-white/5 font-mono text-[11px] space-y-1.5 shadow-inner">
        <div className="text-zinc-500 flex items-center justify-between pb-1 border-b border-zinc-900">
          <span>target: 192.168.1.1 (gateway)</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> SCANNING
          </span>
        </div>
        <div className="text-zinc-300 flex items-center justify-between">
          <span className="text-emerald-400">[OPEN] PORT 22/tcp</span>
          <span className="text-zinc-500">OpenSSH 8.9p1 (Ubuntu)</span>
        </div>
        <div className="text-zinc-300 flex items-center justify-between">
          <span className="text-emerald-400">[OPEN] PORT 80/tcp</span>
          <span className="text-zinc-500">nginx/1.18.0 (HTTP)</span>
        </div>
        <div className="text-zinc-300 flex items-center justify-between">
          <span className="text-emerald-400">[OPEN] PORT 443/tcp</span>
          <span className="text-zinc-500">TLSv1.3 (HTTPS)</span>
        </div>
        <div className="text-zinc-500 flex items-center justify-between pt-1">
          <span>[CLOSED] 65,532 ports filtered</span>
          <span className="text-sky-400">Duration: 1.42s</span>
        </div>
      </div>

      {/* Bottom feature telemetry chips */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">ENGINE</p>
            <p className="text-xs font-semibold text-zinc-200">Python Socket &bull; GUI</p>
          </div>
        </div>
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">EXPORT FORMATS</p>
            <p className="text-xs font-semibold text-zinc-200">CSV &amp; TXT Telemetry</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DigitalForensicsVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[340px] bg-gradient-to-br from-[#0d0c14] via-[#08080f] to-[#040407] p-4 md:p-6 rounded-xl flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-purple-900/40 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-zinc-300 font-semibold">DFIR AUTOPSY // FTK IMAGER 4.7</span>
        </div>
        <span className="text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded text-[10px] border border-purple-800/30">
          IMAGE VERIFIED (AD1)
        </span>
      </div>

      {/* Hash integrity & evidence triage */}
      <div className="my-3 p-3.5 rounded-lg bg-[#05050a]/90 border border-white/5 font-mono text-[11px] space-y-1.5 shadow-inner">
        <div className="text-zinc-500 flex items-center justify-between pb-1 border-b border-zinc-900">
          <span>Evidence Case: #DFIR-2026-INV</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> HASH MATCH
          </span>
        </div>
        <div className="text-zinc-300 space-y-0.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">MD5:</span>
            <span className="text-purple-300 truncate max-w-[200px]">e4d909c290d0fb1ca068ffaddf22cbd0</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">SHA-1:</span>
            <span className="text-purple-300 truncate max-w-[200px]">40bd001563085fc35165329ea1ff5c5e...</span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-zinc-900 text-zinc-400 flex items-center justify-between text-[10px]">
          <span>Artifacts Carved: 1,420 files</span>
          <span className="text-emerald-400">Chain of Custody Intact</span>
        </div>
      </div>

      {/* Forensic modules */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <Search className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">RECOVERY WORKBENCH</p>
            <p className="text-xs font-semibold text-zinc-200">Autopsy 4.23 Analysis</p>
          </div>
        </div>
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">REPORT GENERATION</p>
            <p className="text-xs font-semibold text-zinc-200">Court-Grade Audit Log</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PhishingSimulatorVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[340px] bg-gradient-to-br from-[#120a0d] via-[#0d0709] to-[#050304] p-4 md:p-6 rounded-xl flex flex-col justify-between overflow-hidden border border-white/5 group-hover:border-rose-900/40 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-zinc-300 font-semibold">PHISHING SIMULATOR // LARAVEL</span>
        </div>
        <span className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded text-[10px] border border-rose-800/30">
          CAMPAIGN ACTIVE
        </span>
      </div>

      {/* Campaign simulation telemetry */}
      <div className="my-3 p-3.5 rounded-lg bg-[#070305]/90 border border-white/5 font-mono text-[11px] space-y-2 shadow-inner">
        <div className="flex items-center justify-between pb-1 border-b border-zinc-900 text-zinc-500">
          <span>Template: Corporate Credential Reset</span>
          <span className="text-amber-400">SIMULATED PHISH</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Emails Dispatched:</span>
            <span className="text-zinc-200 font-semibold">250 Users</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Links Clicked:</span>
            <span className="text-rose-400 font-semibold">14 (5.6% Vulnerable)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Awareness Module Completed:</span>
            <span className="text-emerald-400 font-semibold">14 / 14 (100% Retrained)</span>
          </div>
        </div>
        <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden mt-1">
          <div className="bg-gradient-to-r from-emerald-500 to-rose-500 h-full rounded-full w-[94%]" />
        </div>
      </div>

      {/* Bottom framework & role telemetry */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-rose-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">FRAMEWORK</p>
            <p className="text-xs font-semibold text-zinc-200">Laravel 11 &bull; Blade</p>
          </div>
        </div>
        <div className="p-2.5 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="text-[10px] text-zinc-500">OUTCOME</p>
            <p className="text-xs font-semibold text-zinc-200">Security Awareness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectVisualThumbnail: React.FC<{ theme: string }> = ({ theme }) => {
  switch (theme) {
    case 'security':
      return <AndroidPentestVisual />;
    case 'scanner':
      return <CyberReconVisual />;
    case 'forensics':
      return <DigitalForensicsVisual />;
    case 'phishing':
      return <PhishingSimulatorVisual />;
    default:
      return <AndroidPentestVisual />;
  }
};
