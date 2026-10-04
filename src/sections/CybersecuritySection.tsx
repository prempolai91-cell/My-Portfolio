import React, { useState } from 'react';
import { SECURITY_CONCEPTS } from '../data/portfolioData';
import { Terminal, Shield, CheckCircle2, ChevronRight, Lock, Play, Radio, Cpu } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { ThreatRadarVisual } from '../components/visuals/ThreatRadarVisual';

export const CybersecuritySection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(SECURITY_CONCEPTS[0]);
  const [viewMode, setViewMode] = useState<'terminal' | 'radar'>('terminal');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '> initialized defensive telemetry module v2026...',
    '> scanning application layer...',
    '> analyzing attack surface...',
    '> checking OWASP compliance parameters...',
    '> security layer initialized: DEFENSE_IN_DEPTH = TRUE',
  ]);
  const [customCommand, setCustomCommand] = useState('');

  const executeCommand = (cmd: string) => {
    soundManager.playClick();
    const cleanCmd = cmd.trim().toLowerCase();
    const newLogs = [...terminalLogs, `$ ${cmd}`];

    if (cleanCmd === 'clear') {
      setTerminalLogs(['> terminal cleared.', '> ready for command...']);
      return;
    }

    if (cleanCmd === 'help') {
      newLogs.push(
        '> available commands:',
        '  scan       - simulate OWASP vulnerability assessment',
        '  android    - inspect Android security checklist',
        '  headers    - verify HTTP security response headers',
        '  clear      - wipe terminal screen'
      );
    } else if (cleanCmd.includes('scan')) {
      newLogs.push(
        '> executing automated assessment...',
        '> [PASS] No hardcoded production secrets in client bundle',
        '> [PASS] Content-Security-Policy strict nonces verified',
        '> [PASS] Memory zeroization on sensitive cryptographic keys'
      );
    } else if (cleanCmd.includes('android')) {
      newLogs.push(
        '> checking android security profile...',
        '> exported receivers: 0 (restricted by default)',
        '> network security config: certificate pinning enforced',
        '> encrypted storage: Jetpack Security KeyStore active'
      );
    } else if (cleanCmd.includes('headers')) {
      newLogs.push(
        '> HTTP/2 200 OK',
        '> Content-Security-Policy: default-src \'self\'',
        '> Strict-Transport-Security: max-age=31536000; includeSubDomains',
        '> X-Content-Type-Options: nosniff',
        '> Referrer-Policy: strict-origin-when-cross-origin'
      );
    } else {
      newLogs.push(`> command '${cmd}' executed. Type 'help' for options.`);
    }

    setTerminalLogs(newLogs.slice(-10));
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCommand) return;
    executeCommand(customCommand);
    setCustomCommand('');
  };

  return (
    <section id="security" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                DEFENSIVE ARCHITECTURE // 06
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                BUILDING WITH <br />
                <span className="italic font-light text-zinc-400">SECURITY IN MIND.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              Application security is not a post-deployment checklist. I treat vulnerability analysis, attack surface scoping, and secure-by-design principles as foundational to modern development.
            </p>
          </div>
        </ScrollReveal>

        {/* Technical Split Layout: Interactive Terminal + Topic Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topics List */}
          <div className="lg:col-span-5 space-y-3">
            <ScrollReveal direction="left" distance={24}>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                CORE CYBERSECURITY FOCUS AREAS
              </span>
              <div className="space-y-2 pt-2">
                {SECURITY_CONCEPTS.map((concept) => {
                  const isSelected = selectedTopic.id === concept.id;
                  return (
                    <button
                      key={concept.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedTopic(concept);
                        executeCommand(concept.command);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group select-none ${
                        isSelected
                          ? 'bg-zinc-900/90 border-rose-500/60 shadow-lg shadow-rose-950/20'
                          : 'bg-[#090b10]/60 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold tracking-tight ${
                              isSelected ? 'text-rose-400' : 'text-zinc-200 group-hover:text-white'
                            }`}
                          >
                            {concept.title}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500">
                          {concept.category}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'text-rose-400 translate-x-1'
                            : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Terminal & Selected Topic Deep-Dive */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="right" distance={24} delay={0.1}>
              {/* Mode Toggle Controls */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('terminal');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'terminal'
                        ? 'bg-rose-600 text-white font-semibold shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>BASH SHELL</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('radar');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'radar'
                        ? 'bg-rose-600 text-white font-semibold shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>THREAT RADAR</span>
                  </button>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                  DEFENSIVE RECONNAISSANCE
                </span>
              </div>

              {viewMode === 'terminal' ? (
                /* Interactive Terminal Sandbox */
                <div className="cyber-terminal-screen rounded-2xl bg-[#050608] border border-white/10 p-5 font-mono text-xs shadow-2xl overflow-hidden space-y-3">
                  {/* Terminal Title Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-zinc-500 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-zinc-400">bash — prem@sec-sandbox:~</span>
                    </div>
                    <span className="text-[10px] text-zinc-600">SANDBOX SIMULATION</span>
                  </div>

                  {/* Terminal Logs */}
                  <div className="space-y-1.5 min-h-[140px] text-zinc-300 leading-relaxed overflow-x-auto">
                    {terminalLogs.map((log, index) => (
                      <div
                        key={index}
                        className={`${
                          log.startsWith('>')
                            ? 'text-zinc-400'
                            : log.startsWith('$')
                            ? 'text-rose-400 font-bold'
                            : log.includes('PASS')
                            ? 'text-emerald-400'
                            : 'text-zinc-200'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  {/* Terminal Prompt Form */}
                  <form
                    onSubmit={handleInputSubmit}
                    className="flex items-center gap-2 pt-2 border-t border-zinc-900"
                  >
                    <span className="text-rose-500 font-bold">$</span>
                    <input
                      type="text"
                      value={customCommand}
                      onChange={(e) => setCustomCommand(e.target.value)}
                      placeholder="Type a command (try 'scan', 'android', 'headers', or 'help')..."
                      className="w-full bg-transparent text-white focus:outline-hidden text-xs placeholder:text-zinc-600 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-rose-700 text-zinc-300 hover:text-white text-[11px] transition-colors"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Interactive Threat Radar */
                <ThreatRadarVisual />
              )}
            </ScrollReveal>

            {/* Deep-Dive Card for the Selected Topic */}
            <ScrollReveal distance={20} delay={0.15}>
              <div className="p-6 md:p-8 rounded-2xl bg-[#0a0c10] border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-rose-400" />
                      <h3 className="text-lg font-display font-bold text-white">
                        {selectedTopic.title}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-zinc-400">
                      {selectedTopic.category}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-rose-950/40 border border-rose-900/40 text-rose-400 text-xs font-mono">
                    OWASP ALIGNED
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedTopic.deepDive}
                </p>

                {/* Defensive Checklist */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Defensive Architecture Checklist</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedTopic.checklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-zinc-900/40 border border-white/5 flex items-start gap-2.5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

