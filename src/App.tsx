import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollAmbientGlow } from './components/motion/ScrollReveal';
import { AmbientCursorGlow } from './components/motion/AmbientCursorGlow';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './sections/HeroSection';
import { HeroMetricHUD } from './components/HeroMetricHUD';
import { MarqueeTicker } from './components/MarqueeTicker';
import { IntroductionSection } from './sections/IntroductionSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { SelectedWorkSection } from './sections/SelectedWorkSection';
import { CybersecuritySection } from './sections/CybersecuritySection';
import { JourneySection } from './sections/JourneySection';
import { CertificatesSection } from './sections/CertificatesSection';
import { ExploringSection } from './sections/ExploringSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types/portfolio';

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  immediate?: boolean;
}

/**
 * SectionReveal: Wraps portfolio sections with smooth Framer Motion viewport entrance
 * animations that gracefully fade in and slide up as the user scrolls.
 */
const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delay = 0,
  yOffset = 36,
  className = '',
  immediate = false,
}) => {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '-40px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-zinc-100 selection:bg-rose-900/60 selection:text-white">
      {/* Viewport Scroll Progress Bar */}
      <ScrollProgress />

      {/* Ambient Parallax Scroll Glow */}
      <ScrollAmbientGlow />

      {/* Interactive Cursor Spotlight Glow */}
      <AmbientCursorGlow />

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Top Fixed Navigation */}
      <Navbar onTalkClick={() => scrollToSection('contact')} />

      {/* Main Content Sections with Framer Motion Entrance Animations */}
      <main className="relative z-10">
        <SectionReveal immediate yOffset={20}>
          <HeroSection
            onViewWork={() => scrollToSection('work')}
            onConnect={() => scrollToSection('contact')}
          />
        </SectionReveal>

        {/* Live System & Craft Telemetry Bar */}
        <SectionReveal delay={0.05} yOffset={24}>
          <HeroMetricHUD />
        </SectionReveal>

        {/* Cinematic Infinite Tech Ticker */}
        <SectionReveal delay={0.05} yOffset={20}>
          <MarqueeTicker />
        </SectionReveal>

        {/* Introduction / Thesis Statement */}
        <SectionReveal>
          <IntroductionSection />
        </SectionReveal>

        {/* About Section */}
        <SectionReveal>
          <AboutSection />
        </SectionReveal>

        {/* Core Skills & Technical Stack */}
        <SectionReveal>
          <SkillsSection />
        </SectionReveal>

        {/* Selected Work & Project Repositories */}
        <SectionReveal>
          <SelectedWorkSection
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </SectionReveal>

        {/* Cybersecurity Lab & Terminal Showcase */}
        <SectionReveal>
          <CybersecuritySection />
        </SectionReveal>

        {/* Second Subtle Cyber Ticker */}
        <SectionReveal yOffset={20}>
          <MarqueeTicker />
        </SectionReveal>

        {/* Journey & Experience Timeline */}
        <SectionReveal>
          <JourneySection />
        </SectionReveal>

        {/* Verified Credentials & Certificates */}
        <SectionReveal>
          <CertificatesSection />
        </SectionReveal>

        {/* Currently Exploring / Radar */}
        <SectionReveal>
          <ExploringSection />
        </SectionReveal>

        {/* Direct Contact & Collaboration Form */}
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>

      {/* Footer */}
      <SectionReveal yOffset={20}>
        <Footer />
      </SectionReveal>

      {/* Modals */}
      <CaseStudyModal
        project={selectedProject}
        allProjects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </div>
  );
}
