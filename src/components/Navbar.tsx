import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { PERSONAL_BRAND } from '../data/portfolioData';

interface NavbarProps {
  onTalkClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTalkClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['work', 'about', 'skills', 'security', 'journey', 'certificates', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'WORK', target: 'work' },
    { label: 'ABOUT', target: 'about' },
    { label: 'SKILLS', target: 'skills' },
    { label: 'SECURITY', target: 'security' },
    { label: 'JOURNEY', target: 'journey' },
    { label: 'CERTS', target: 'certificates' },
    { label: 'CONTACT', target: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080a]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Brand wordmark with portrait avatar */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-rose-500/50 shadow-md shadow-rose-950/40 group-hover:border-rose-400 transition-colors shrink-0">
            <img
              src={PERSONAL_BRAND.photoUrl}
              alt={PERSONAL_BRAND.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-base md:text-lg font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors duration-200">
            Prem
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative py-1 transition-colors duration-200 uppercase tracking-widest ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rose-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + sound feedback toggle */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Enable acoustic feedback' : 'Mute acoustic feedback'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all text-xs font-mono"
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="flex items-end gap-0.5 h-3 w-3">
                  <span className="w-0.5 h-full bg-rose-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2/3 bg-rose-400 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 h-4/5 bg-rose-400 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
                </span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onTalkClick();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider text-white bg-zinc-900 hover:bg-rose-700 border border-white/10 hover:border-rose-500 rounded-lg transition-all duration-200 shadow-sm"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-md border border-white/10 hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] bg-[#090b10]/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-left py-2.5 text-sm font-medium tracking-wider text-zinc-300 hover:text-rose-400 border-b border-zinc-900/60 uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(false);
              onTalkClick();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 mt-2 text-xs font-semibold tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
