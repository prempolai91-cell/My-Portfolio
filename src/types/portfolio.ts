/**
 * TypeScript types for Prem Polai's Portfolio
 */

export interface CaseStudy {
  overview: string;
  theProblem: string;
  theIdea: string;
  myApproach: string[];
  designProcess: {
    phase: string;
    details: string;
  }[];
  development: string[];
  securityConsiderations: string[];
  technology: {
    category: string;
    items: string[];
  }[];
  resultStatus: string;
  keyLearnings: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  filterCategories: ('Web' | 'App' | 'Cybersecurity')[];
  shortDescription: string;
  technologies: string[];
  caseStudy: CaseStudy;
  visualTheme: 'security' | 'scanner' | 'forensics' | 'phishing' | 'gaming' | 'eco' | 'healthcare';
  repoUrl?: string;
}

export interface UIUXItem {
  id: string;
  title: string;
  category: 'Mobile Interface' | 'Dashboard Concept' | 'Landing Page' | 'Design System' | 'Wireframe & Flow';
  shortDescription: string;
  screenCount: number;
  previewColor: string;
  process: {
    problemStatement: string;
    userArchetype: string;
    designPhilosophy: string;
    tokens: string[];
    wireframeSteps: string[];
    deliverables: string[];
  };
}

export interface SkillItem {
  name: string;
  focus: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  isPlaceholder: boolean;
  keyPoints: string[];
  category: 'Experience' | 'Exploration' | 'Education';
}

export interface SecurityConcept {
  id: string;
  title: string;
  category: string;
  command: string;
  outputSummary: string;
  deepDive: string;
  checklist: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerOrg: string;
  issueDate: string;
  credentialId: string;
  verificationUrl?: string;
  imageUrl?: string;
  category: 'Cybersecurity' | 'Development' | 'UI/UX Design' | 'Computer Science' | 'Hackathons & Events' | 'Internship';
  skillsCovered: string[];
  description: string;
  verifiedHours?: string;
  badgeType: 'verified' | 'specialization' | 'professional' | 'participation' | 'internship';
  accentColor: 'rose' | 'emerald' | 'cyan' | 'amber';
}
