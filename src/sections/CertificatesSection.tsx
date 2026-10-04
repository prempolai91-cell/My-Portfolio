import React, { useState, useMemo } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Certificate } from '../types/portfolio';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Layers, 
  X, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Palette,
  FileCheck2,
  Briefcase
} from 'lucide-react';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { soundManager } from '../lib/audio';
import { ScrollReveal } from '../components/motion/ScrollReveal';

type FilterCategory = 'All' | 'Internship' | 'Development' | 'Hackathons & Events';

export const CertificatesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: FilterCategory[] = [
    'All',
    'Internship',
    'Development',
    'Hackathons & Events',
  ];

  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'All') return CERTIFICATES;
    return CERTIFICATES.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  const handleCopyCredential = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Internship':
        return <Briefcase className="w-4 h-4 text-rose-400" />;
      case 'Hackathons & Events':
        return <Award className="w-4 h-4 text-rose-400" />;
      case 'Development':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      default:
        return <Award className="w-4 h-4 text-rose-400" />;
    }
  };

  const getSpotlightColor = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return 'rgba(6, 182, 212, 0.16)';
      case 'amber':
        return 'rgba(245, 158, 11, 0.16)';
      case 'emerald':
        return 'rgba(16, 185, 129, 0.16)';
      case 'rose':
      default:
        return 'rgba(244, 63, 94, 0.16)';
    }
  };

  const getAccentBorderClass = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return 'hover:border-cyan-500/40 text-cyan-400';
      case 'amber':
        return 'hover:border-amber-500/40 text-amber-400';
      case 'emerald':
        return 'hover:border-emerald-500/40 text-emerald-400';
      case 'rose':
      default:
        return 'hover:border-rose-500/40 text-rose-400';
    }
  };

  return (
    <section id="certificates" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-rose-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                CREDENTIALS &amp; SPECIALIZATIONS // 07
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                VERIFIED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-600">
                  CREDENTIALS.
                </span>{' '}
                <br />
                <span className="italic font-light text-zinc-300">VALIDATED PROWESS.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md leading-relaxed font-light">
              Official credentials, project completion milestones, and internship accreditations validating practical software engineering, architecture, and technical collaboration.
            </p>
          </div>
        </ScrollReveal>

        {/* Telemetry Metric Summary */}
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#090b10] border border-white/5 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">TOTAL CREDENTIALS</span>
              <div className="text-xl md:text-2xl font-bold font-display text-white">
                {String(CERTIFICATES.length).padStart(2, '0')}
              </div>
              <span className="text-zinc-400 text-[11px]">Officially Accredited</span>
            </div>

            <div className="space-y-1 border-l border-white/5 pl-4">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">DOMAINS</span>
              <div className="text-xl md:text-2xl font-bold font-display text-rose-400">
                03
              </div>
              <span className="text-zinc-400 text-[11px]">Intern · Dev · Events</span>
            </div>

            <div className="space-y-1 border-l border-white/5 pl-4">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">PRACTICAL WORK</span>
              <div className="text-xl md:text-2xl font-bold font-display text-cyan-400">
                Verified
              </div>
              <span className="text-zinc-400 text-[11px]">Real-World Engineering</span>
            </div>

            <div className="space-y-1 border-l border-white/5 pl-4">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">DOCUMENTS</span>
              <div className="text-xl md:text-2xl font-bold font-display text-emerald-400">
                100%
              </div>
              <span className="text-zinc-400 text-[11px]">Authenticated Records</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Controls */}
        <ScrollReveal delay={0.08}>
          <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
            {categories.map((category) => {
              const count = category === 'All' 
                ? CERTIFICATES.length 
                : CERTIFICATES.filter((c) => c.category === category).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(category);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/40 border border-rose-500/40'
                      : 'bg-[#090b10] text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/5'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] ${isActive ? 'text-rose-200' : 'text-zinc-600'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => {
            const isCopied = copiedId === cert.credentialId;

            return (
              <ScrollReveal key={cert.id} delay={index * 0.06}>
                <SpotlightCard
                  spotlightColor={getSpotlightColor(cert.accentColor)}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCert(cert);
                  }}
                  className={`group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0e1017] via-[#090b10] to-[#07080a] border border-white/10 ${getAccentBorderClass(
                    cert.accentColor
                  )} transition-all duration-300 cursor-pointer shadow-xl`}
                >
                  <div className="space-y-5">
                    {/* Top Meta Line: Issuer & Status */}
                    <div className="flex items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        {getCategoryIcon(cert.category)}
                        <span className="truncate max-w-[160px] uppercase tracking-wider">
                          {cert.issuer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-zinc-500">{cert.issueDate}</span>
                        <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Image Thumbnail Preview if available */}
                    {cert.imageUrl && (
                      <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 group-hover:border-rose-500/40 transition-all shadow-inner">
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/20" />
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-rose-300 flex items-center gap-1 font-semibold">
                          <FileCheck2 className="w-3 h-3 text-rose-400" />
                          <span>DOCUMENT</span>
                        </div>
                      </div>
                    )}

                    {/* Certificate Title */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-rose-300 transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    </div>

                    {/* Unboxed Skills / Topics List */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                        VERIFIED COMPETENCIES
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-zinc-300">
                        {cert.skillsCovered.slice(0, 4).map((skill, sIdx) => (
                          <React.Fragment key={skill}>
                            <span className="hover:text-rose-400 transition-colors">{skill}</span>
                            {sIdx < Math.min(cert.skillsCovered.length - 1, 3) && (
                              <span className="text-zinc-600">&bull;</span>
                            )}
                          </React.Fragment>
                        ))}
                        {cert.skillsCovered.length > 4 && (
                          <span className="text-zinc-500 text-[10px]">
                            +{cert.skillsCovered.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Credential ID & Actions */}
                  <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-zinc-500 truncate" title={`Credential ID: ${cert.credentialId}`}>
                        ID: {cert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyCredential(cert.credentialId, e)}
                        className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0"
                        title="Copy Credential ID"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs font-mono font-medium text-rose-400 group-hover:text-rose-300 transition-colors flex items-center gap-1">
                        <span>INSPECT DETAILS</span>
                        <span className="text-xs group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playClick();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                          title="Verify in external registry"
                        >
                          <span>VERIFY</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Certificate Detail Inspection Modal */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => {
              soundManager.playClick();
              setSelectedCert(null);
            }}
          >
            <div
              className="relative max-w-2xl w-full rounded-3xl bg-[#090b10] border border-white/15 p-6 sm:p-8 md:p-10 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCert(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-3 pr-8">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="tracking-widest uppercase">VERIFIED CERTIFICATE SPECIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                  {selectedCert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="text-white font-medium">{selectedCert.issuerOrg}</span>
                  <span className="text-zinc-600">&bull;</span>
                  <span>Issued: {selectedCert.issueDate}</span>
                  {selectedCert.verifiedHours && (
                    <>
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-cyan-400">{selectedCert.verifiedHours}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Full Certificate Visual Display */}
              {selectedCert.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-2xl group">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[360px] object-contain mx-auto"
                  />
                  <a
                    href={selectedCert.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/85 hover:bg-black text-white text-xs font-mono border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg"
                  >
                    <span>Open Full Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                  </a>
                </div>
              )}

              {/* Official Credential Key Bar */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    CREDENTIAL IDENTIFIER
                  </span>
                  <div className="text-sm font-mono text-rose-400 font-semibold break-all">
                    {selectedCert.credentialId}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyCredential(selectedCert.credentialId)}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono border border-white/5 shrink-0 self-start sm:self-auto"
                >
                  {copiedId === selectedCert.credentialId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scope & Detailed Curriculum Overview */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  CURRICULUM &amp; VALIDATED SCOPE
                </span>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Comprehensive Competencies Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  VERIFIED TECHNICAL PROFICIENCIES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCert.skillsCovered.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-2.5 text-xs font-mono text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-zinc-500">
                  Registered under Prem Polai
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-rose-950/40"
                    >
                      <span>VIEW OFFICIAL VERIFICATION</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCert(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors border border-white/5"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
