import React, { useState } from 'react';
import { CREATIVE_COMPANIONS } from '../data/portfolioData';
import { CreativeCompanion, CompanionSocialPlatform } from '../types/portfolio';
import { 
  Sparkles, 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Globe, 
  Mail, 
  Plus, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Heart, 
  User, 
  Code2, 
  Palette, 
  ShieldCheck,
  MessageSquareQuote,
  Maximize2
} from 'lucide-react';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { soundManager } from '../lib/audio';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/motion/ScrollReveal';

// Helper for accent color styles
const ACCENT_STYLES = {
  rose: {
    spotlight: 'rgba(225, 29, 72, 0.22)',
    border: 'border-rose-500/30 hover:border-rose-500/60',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    ring: 'ring-rose-500/40',
    gradient: 'from-rose-500/20 via-rose-500/5 to-transparent',
    glow: 'shadow-rose-950/40',
  },
  emerald: {
    spotlight: 'rgba(16, 185, 129, 0.22)',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/40',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    glow: 'shadow-emerald-950/40',
  },
  cyan: {
    spotlight: 'rgba(6, 182, 212, 0.22)',
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/40',
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    glow: 'shadow-cyan-950/40',
  },
  amber: {
    spotlight: 'rgba(245, 158, 11, 0.22)',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    ring: 'ring-amber-500/40',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    glow: 'shadow-amber-950/40',
  },
  violet: {
    spotlight: 'rgba(168, 85, 247, 0.22)',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    ring: 'ring-purple-500/40',
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    glow: 'shadow-purple-950/40',
  },
};

// Social icon renderer with fallback
const renderSocialIcon = (platform: CompanionSocialPlatform) => {
  switch (platform) {
    case 'GitHub':
      return <Github className="w-3.5 h-3.5" />;
    case 'LinkedIn':
      return <Linkedin className="w-3.5 h-3.5" />;
    case 'Instagram':
      return <Instagram className="w-3.5 h-3.5" />;
    case 'Twitter':
      return <Twitter className="w-3.5 h-3.5" />;
    case 'Website':
      return <Globe className="w-3.5 h-3.5" />;
    case 'Email':
      return <Mail className="w-3.5 h-3.5" />;
    default:
      return <ExternalLink className="w-3.5 h-3.5" />;
  }
};

// Safe Image Component with graceful fallback
const CompanionAvatar: React.FC<{
  src: string;
  name: string;
  accent: 'rose' | 'emerald' | 'cyan' | 'amber' | 'violet';
  className?: string;
}> = ({ src, name, accent, className = 'w-20 h-20' }) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const style = ACCENT_STYLES[accent] || ACCENT_STYLES.rose;

  if (hasError || !src) {
    return (
      <div
        className={`${className} rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white bg-gradient-to-br from-zinc-800 to-zinc-950 border ${style.border} ${style.glow} shadow-lg shrink-0`}
      >
        <span>{getInitials(name) || 'P'}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} shrink-0`}>
      <img
        src={src}
        alt={name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center rounded-2xl border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-md"
        loading="lazy"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};

export const CreativeCompanionsSection: React.FC = () => {
  const [companions, setCompanions] = useState<CreativeCompanion[]>(CREATIVE_COMPANIONS);
  const [selectedCompanion, setSelectedCompanion] = useState<CreativeCompanion | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // New Companion Form State
  const [newFriend, setNewFriend] = useState<{
    name: string;
    role: string;
    about: string;
    photoUrl: string;
    accentColor: 'rose' | 'emerald' | 'cyan' | 'amber' | 'violet';
    tags: string;
    collabHighlight: string;
  }>({
    name: '',
    role: '',
    about: '',
    photoUrl: '',
    accentColor: 'rose',
    tags: '',
    collabHighlight: '',
  });

  // Preset sample avatar URLs for easy testing
  const SAMPLE_AVATARS = [
    { label: 'Creative 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
    { label: 'Creative 2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop' },
    { label: 'Creative 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
    { label: 'Creative 4', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop' },
  ];

  const handleAddPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriend.name.trim() || !newFriend.about.trim()) return;

    soundManager.playClick();
    const newEntry: CreativeCompanion = {
      id: `companion-${Date.now()}`,
      name: newFriend.name.trim(),
      role: newFriend.role.trim() || 'Creative Collaborator',
      about: newFriend.about.trim(),
      photoUrl: newFriend.photoUrl.trim() || SAMPLE_AVATARS[0].url,
      accentColor: newFriend.accentColor,
      tags: newFriend.tags
        ? newFriend.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Creative Dev', 'Design'],
      collabHighlight: newFriend.collabHighlight.trim() || 'Creative Companion',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/' },
        { platform: 'GitHub', url: 'https://github.com/' },
      ],
    };

    setCompanions((prev) => [newEntry, ...prev]);
    setIsAddModalOpen(false);
    // Reset form
    setNewFriend({
      name: '',
      role: '',
      about: '',
      photoUrl: '',
      accentColor: 'rose',
      tags: '',
      collabHighlight: '',
    });
  };

  const generatedTsCode = `  {
    id: 'companion-${(newFriend.name || 'friend').toLowerCase().replace(/[^a-z0-9]/g, '-')}',
    name: '${newFriend.name || 'Friend Name'}',
    role: '${newFriend.role || 'Creative Developer / Designer'}',
    about: '${(newFriend.about || 'Write a brief description or about your friend here.').replace(/'/g, "\\'")}',
    photoUrl: '${newFriend.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'}',
    accentColor: '${newFriend.accentColor}',
    tags: [${(newFriend.tags || 'Collaboration, Design, Engineering')
      .split(',')
      .map((t) => `'${t.trim()}'`)
      .join(', ')}],
    collabHighlight: '${newFriend.collabHighlight || 'Creative Companion'}',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/' },
      { platform: 'GitHub', url: 'https://github.com/' }
    ]
  },`;

  const handleCopyCode = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(generatedTsCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <section id="companions" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#07080a]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                  ALLIES &amp; PEERS // 09
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  CREATIVE CIRCLE
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                MY CREATIVE <br />
                <span className="italic font-light text-zinc-300">COMPANIONS</span>
                <span className="text-rose-500 font-mono animate-pulse">|</span>
              </h2>
            </div>

            <div className="space-y-4 max-w-lg">
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                A tribute to the fellow creators, developers, designers, and hackers who inspire my journey, challenge my perspective, and build the future alongside me.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setIsAddModalOpen(true);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-rose-700 text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-rose-500 transition-all duration-200 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200 text-rose-400 group-hover:text-white" />
                  <span>ADD / PREVIEW COMPANION</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Companions Card Grid */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" staggerDelay={0.08}>
          {companions.map((companion) => {
            const style = ACCENT_STYLES[companion.accentColor || 'rose'];
            return (
              <ScrollStaggerItem key={companion.id} yOffset={24}>
                <SpotlightCard
                  enableTilt={true}
                  tiltIntensity={6}
                  spotlightColor={style.spotlight}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCompanion(companion);
                  }}
                  className={`group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1015]/90 to-[#090b0e]/95 border ${style.border} transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between h-full`}
                >
                  {/* Top Header: Avatar + Identity + Badge */}
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <CompanionAvatar
                          src={companion.photoUrl}
                          name={companion.name}
                          accent={companion.accentColor || 'rose'}
                          className="w-16 h-16 sm:w-20 sm:h-20"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-rose-300 transition-colors">
                              {companion.name}
                            </h3>
                            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active Creative Peer" />
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-zinc-400">
                            {companion.role}
                          </p>
                          {companion.location && (
                            <span className="text-[11px] font-mono text-zinc-400 block">
                              📍 {companion.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                          setSelectedCompanion(companion);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="View Full Profile & Story"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Collaboration highlight quote tag */}
                    {companion.collabHighlight && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300">
                        <Sparkles className={`w-3.5 h-3.5 ${style.text}`} />
                        <span className="truncate">{companion.collabHighlight}</span>
                      </div>
                    )}

                    {/* About Content */}
                    <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors">
                      {companion.about}
                    </p>

                    {/* Skill / Craft Tags */}
                    {companion.tags && companion.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {companion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900/80 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Footer: Social Links & Interaction */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {companion.socialLinks?.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => soundManager.playClick()}
                          onMouseEnter={() => soundManager.playHover()}
                          className="p-2 rounded-xl bg-zinc-900/60 hover:bg-rose-600/30 text-zinc-400 hover:text-white border border-white/5 hover:border-rose-500/40 transition-all text-xs"
                          title={`${companion.name} on ${social.platform}`}
                        >
                          {renderSocialIcon(social.platform)}
                        </a>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                      <span>READ STORY</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </SpotlightCard>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>

        {/* Informative Tip Box on How to customize */}
        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Heart className="w-4 h-4" />
            </span>
            <p>
              To customize your friends permanently, edit <code className="text-zinc-200">CREATIVE_COMPANIONS</code> in <span className="text-rose-400">src/data/portfolioData.ts</span>.
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              setIsAddModalOpen(true);
            }}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4 tracking-wider self-start sm:self-auto"
          >
            LAUNCH COMPANION GENERATOR →
          </button>
        </div>
      </div>

      {/* COMPANION DETAIL MODAL */}
      {selectedCompanion && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedCompanion(null)}
        >
          <div
            className="relative w-full max-w-xl bg-[#0b0d12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedCompanion(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-5 pt-2">
              <CompanionAvatar
                src={selectedCompanion.photoUrl}
                name={selectedCompanion.name}
                accent={selectedCompanion.accentColor || 'rose'}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                  CREATIVE COMPANION
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {selectedCompanion.name}
                </h3>
                <p className="text-sm text-zinc-300 font-medium">
                  {selectedCompanion.role}
                </p>
                {selectedCompanion.location && (
                  <p className="text-xs font-mono text-zinc-500">
                    📍 {selectedCompanion.location}
                  </p>
                )}
              </div>
            </div>

            {/* Collab Note */}
            {selectedCompanion.collabHighlight && (
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Collab Highlight: <strong className="text-white">{selectedCompanion.collabHighlight}</strong></span>
              </div>
            )}

            {/* About / Story */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <MessageSquareQuote className="w-3.5 h-3.5 text-rose-400" />
                <span>ABOUT &amp; PERSPECTIVE</span>
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed bg-zinc-950/40 p-4 rounded-2xl border border-white/5 whitespace-pre-line">
                {selectedCompanion.about}
              </p>
            </div>

            {/* Tags */}
            {selectedCompanion.tags && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  INTERESTS &amp; DISCIPLINES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {selectedCompanion.socialLinks && (
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {selectedCompanion.socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-rose-700 text-white font-mono text-xs border border-white/10 hover:border-rose-500 transition-colors"
                    >
                      {renderSocialIcon(s.platform)}
                      <span>{s.platform}</span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCompanion(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono uppercase transition-colors"
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD / PREVIEW / CODE GENERATOR MODAL */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0a0c10] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>CREATIVE COMPANIONS BUILDER</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Add Your Friend&apos;s Profile
                </h3>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsAddModalOpen(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Sample Avatars */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block">
                QUICK SAMPLE AVATARS (Click to try):
              </label>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {SAMPLE_AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setNewFriend((f) => ({ ...f, photoUrl: avatar.url }));
                    }}
                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl border transition-all text-xs font-mono ${
                      newFriend.photoUrl === avatar.url
                        ? 'border-rose-500 bg-rose-500/10 text-white'
                        : 'border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <img src={avatar.url} alt={avatar.label} className="w-6 h-6 rounded-lg object-cover" />
                    <span>{avatar.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddPreview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    FRIEND&apos;S NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newFriend.name}
                    onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    ROLE / CRAFT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UI/UX Designer &amp; Creative Dev"
                    value={newFriend.role}
                    onChange={(e) => setNewFriend({ ...newFriend, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  PHOTO URL (Direct Image Link or URL)
                </label>
                <input
                  type="url"
                  placeholder="https://... or sample avatar above"
                  value={newFriend.photoUrl}
                  onChange={(e) => setNewFriend({ ...newFriend, photoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* About */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  ABOUT YOUR FRIEND *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share who they are, what makes them a great friend, and the projects or ideas you explore together..."
                  value={newFriend.about}
                  onChange={(e) => setNewFriend({ ...newFriend, about: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Accent Color */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    ACCENT THEME
                  </label>
                  <select
                    value={newFriend.accentColor}
                    onChange={(e) =>
                      setNewFriend({
                        ...newFriend,
                        accentColor: e.target.value as 'rose' | 'emerald' | 'cyan' | 'amber' | 'violet',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="rose">Crimson Rose (Default)</option>
                    <option value="emerald">Emerald Green</option>
                    <option value="cyan">Cyber Cyan</option>
                    <option value="amber">Warm Amber</option>
                    <option value="violet">Electric Violet</option>
                  </select>
                </div>

                {/* Collab Highlight */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    COLLAB HIGHLIGHT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hackathon Teammate"
                    value={newFriend.collabHighlight}
                    onChange={(e) => setNewFriend({ ...newFriend, collabHighlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  TAGS (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Design Systems, Mobile, Security"
                  value={newFriend.tags}
                  onChange={(e) => setNewFriend({ ...newFriend, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Live Preview Box */}
              {newFriend.name && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 space-y-3">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    CARD REAL-TIME PREVIEW
                  </span>
                  <div className="flex items-start gap-3">
                    <CompanionAvatar
                      src={newFriend.photoUrl}
                      name={newFriend.name}
                      accent={newFriend.accentColor}
                      className="w-12 h-12"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{newFriend.name}</h4>
                      <p className="text-xs text-zinc-400">{newFriend.role || 'Creative Companion'}</p>
                      <p className="text-xs text-zinc-300 font-light mt-1 line-clamp-2">{newFriend.about}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs border border-white/10 transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'COPIED TO CLIPBOARD!' : 'COPY TYPESCRIPT CODE'}</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-mono transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs tracking-wider uppercase font-semibold transition-colors shadow-lg shadow-rose-950/40"
                  >
                    <Plus className="w-4 h-4" />
                    <span>PREVIEW ON PAGE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
