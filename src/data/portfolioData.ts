import { Project, UIUXItem, SkillCategory, TimelineEntry, SecurityConcept, Certificate } from '../types/portfolio';

export const PERSONAL_BRAND = {
  name: 'PREM POLAI',
  role: 'Web & App Developer | UI/UX Designer | Cybersecurity Enthusiast',
  photoUrl: 'https://i.postimg.cc/2S0SYXbT/Whats-App-Image-2026-04-21-at-14-54-54.jpg',
  heroPhotoUrl: 'https://i.postimg.cc/50bJFBCX/Whats-App-Image-2026-10-02-at-11-29-33.jpg',
  titles: [
    'WEB & APP DEVELOPER',
    'UI/UX DESIGNER',
    'CYBERSECURITY ENTHUSIAST'
  ],
  heroTagline: 'DESIGNING DIGITAL EXPERIENCES.\nBUILDING THE TECHNOLOGY BEHIND THEM.\nSECURING WHAT MATTERS.',
  heroSecondary: 'I build modern web and mobile experiences where design, development, and cybersecurity come together.',
  brandTrio: 'Code × Design × Security',
  status: 'Open to internships & creative engineering collaborations',
  location: 'Global / Remote',
  aboutBio: `I'm Prem Polai, a developer and UI/UX designer passionate about turning ideas into meaningful digital experiences.

I enjoy working across the complete product journey — from understanding an idea and designing its interface to developing the application and thinking about how it can be made more secure.

My interests sit at the intersection of technology, creativity and cybersecurity.`,
  socialLinks: [
    {
      platform: 'GitHub',
      label: 'github.com/prempolai91-cell',
      url: 'https://github.com/prempolai91-cell',
      isPlaceholder: false,
    },
    {
      platform: 'LinkedIn',
      label: 'linkedin.com/in/prem-polai-411849378',
      url: 'https://www.linkedin.com/in/prem-polai-411849378',
      isPlaceholder: false,
    },
    {
      platform: 'Instagram',
      label: 'instagram.com/2819.prem',
      url: 'https://www.instagram.com/2819.prem/',
      isPlaceholder: false,
    },
    {
      platform: 'Email',
      label: 'prempolai66@gmail.com',
      url: 'mailto:prempolai66@gmail.com',
      isPlaceholder: false,
    },
  ],
};

export const THREE_WORLDS = [
  {
    number: '01',
    title: 'DEVELOPMENT',
    headline: 'Engineering robust client & mobile foundations',
    description: 'Building scalable websites, web applications and mobile applications with modern technologies.',
    focusAreas: ['React & Next.js Ecosystem', 'Android Native (Kotlin & Jetpack Compose)', 'Type-Safe Architecture', 'REST & GraphQL Integration'],
    codeSnippet: 'const buildSecureApp = async (spec: ProductSpec): Promise<Deployment> => { return compile(spec, { securityHardened: true }); };',
  },
  {
    number: '02',
    title: 'DESIGN',
    headline: 'Crafting intentional human-centered interactions',
    description: 'Designing intuitive interfaces and digital experiences where usability meets visual storytelling.',
    focusAreas: ['Interaction Systems & Tokens', 'Dark Luxury Editorial Aesthetics', 'Micro-Interactions & Motion', 'Accessibility & Typography'],
    codeSnippet: ':root { --surface-elevation-1: #0e1014; --accent-crimson: #e11d48; --motion-curve: cubic-bezier(0.16, 1, 0.3, 1); }',
  },
  {
    number: '03',
    title: 'SECURITY',
    headline: 'Guarding digital perimeters from day zero',
    description: 'Exploring cybersecurity, application security and secure-by-design development.',
    focusAreas: ['OWASP Mobile & Web Top 10', 'Android Reverse Engineering & Frida', 'Vulnerability Assessment', 'Data Privacy & Cryptography'],
    codeSnippet: '$ jadx-gui target.apk --deobf && frida -U -f com.app.target -l bypass_pinning.js',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'android-pentest-lab',
    number: '01',
    title: 'ANDROID PENTEST LAB',
    category: 'Android Security & Pen Testing',
    filterCategories: ['App', 'Cybersecurity'],
    shortDescription: 'An Android security testing and learning platform designed around mobile application security, vulnerability analysis, and penetration-testing concepts.',
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Cybersecurity', 'Smali Reverse Engineering'],
    visualTheme: 'security',
    repoUrl: 'https://github.com/prempolai91-cell/Android-Pentest-Lab',
    caseStudy: {
      overview: 'Android Pentest Lab is an educational sandbox and analysis workbench designed for exploring mobile application security, testing intentional vulnerabilities, and understanding reverse-engineering challenges in modern Android runtimes.',
      theProblem: 'Learners entering Android application security often face a steep barrier: setting up complex emulator environments, finding vulnerable target code that mirrors real-world production architectures, and mapping vulnerabilities back to OWASP Mobile Top 10 guidelines.',
      theIdea: 'Design a self-contained, modular mobile laboratory built with modern Jetpack Compose. Each challenge demonstrates an isolated attack vector—such as insecure local storage, exported components, intent redirection, weak cryptographic hashing, and certificate pinning—coupled with explanatory source analysis.',
      myApproach: [
        'Surveyed OWASP Mobile Top 10 to isolate fundamental application vulnerabilities.',
        'Architected intentional vulnerability scenarios with accompanying mitigation modules.',
        'Engineered an in-app telemetry dashboard tracking test exploits, logcat output, and source inspection.',
        'Designed a dark, terminal-inspired interface that allows intuitive toggling between "Vulnerable" and "Mitigated" code paths.'
      ],
      designProcess: [
        {
          phase: 'Architecture & Information Flow',
          details: 'Designed discrete modules for Storage, IPC, Cryptography, and Network validation with clear danger indicators.'
        },
        {
          phase: 'Terminal-Inspired Dark Interface',
          details: 'Structured a high-contrast charcoal and ruby palette with monospace disassembly viewers and live log monitors.'
        },
        {
          phase: 'Dual-Path Code Comparator',
          details: 'Built side-by-side viewports comparing vulnerable Kotlin snippets against their OWASP-compliant secure counterparts.'
        }
      ],
      development: [
        'Built with Kotlin and Jetpack Compose utilizing Unidirectional Data Flow (UDF).',
        'Implemented custom Room database and EncryptedSharedPreferences test beds.',
        'Created dynamic Intent interception demonstrations to visualize inter-process vulnerabilities.',
        'Integrated automated APK static analysis heuristics checklist.'
      ],
      securityConsiderations: [
        'Strictly sandboxed: all intentionally vulnerable endpoints execute strictly on localhost and never leak external tokens.',
        'Clear educational boundaries prevent misuse on third-party packages.',
        'Demonstrates runtime integrity verification and Frida detection techniques.'
      ],
      technology: [
        { category: 'Platform', items: ['Android SDK 34', 'Kotlin 2.0', 'Jetpack Compose'] },
        { category: 'Security Tools', items: ['JADX Decompiler', 'Frida Hooking', 'OWASP Mobile Top 10', 'Burp Suite Proxy'] },
        { category: 'Architecture', items: ['Clean Architecture', 'StateFlow', 'Coroutines', 'Hilt DI'] }
      ],
      resultStatus: 'Active research project and learning workbench continuously updated on GitHub with new security modules.',
      keyLearnings: [
        'Deepened understanding of Android IPC and Binder transaction security.',
        'Mastered the balance between instructional clarity and realistic vulnerability replication.',
        'Learned how runtime hook frameworks interact with modern ART and native libraries.'
      ],
      metrics: [
        { label: 'Security Modules', value: '12+' },
        { label: 'OWASP Alignment', value: '100%' },
        { label: 'Decompilation Tests', value: '25+' }
      ]
    }
  },
  {
    id: 'cyberrecon-port-scanner',
    number: '02',
    title: 'CYBERRECON PORT SCANNER',
    category: 'Network Security & Reconnaissance',
    filterCategories: ['App', 'Cybersecurity'],
    shortDescription: 'A multi-threaded network port reconnaissance application built with Python and Tkinter for detecting open services across IPv4, IPv6, and hostnames with CSV/TXT export.',
    technologies: ['Python', 'Socket Programming', 'Tkinter GUI', 'Multi-Threading', 'Network Security'],
    visualTheme: 'scanner',
    repoUrl: 'https://github.com/prempolai91-cell/cyberrecon-port-scanner',
    caseStudy: {
      overview: 'CyberRecon Port Scanner is a Python-based network reconnaissance tool designed to provide fast, multi-threaded port discovery with an intuitive graphical user interface and automated audit report generation.',
      theProblem: 'Terminal-based scanners like Nmap are powerful but often complex for quick diagnostics or student demonstrations. Meanwhile, simple python socket scripts typically run synchronously on a single thread, taking minutes to probe common port ranges and lacking structured log export.',
      theIdea: 'Build an accessible yet performant desktop port scanner utilizing Python concurrent.futures thread pools, supporting both IPv4 and IPv6 target resolution, displaying real-time scan telemetry, and exporting findings to formatted TXT and CSV reports.',
      myApproach: [
        'Implemented socket connection timeout heuristics balancing speed against packet drop false negatives.',
        'Architected a concurrent worker thread pool ensuring the Tkinter UI thread remains silky-smooth and responsive during intensive scans.',
        'Engineered dynamic IP family detection automatically routing queries through AF_INET or AF_INET6 sockets.',
        'Built automated report formatting generating structured audit logs ready for penetration test deliverables.'
      ],
      designProcess: [
        {
          phase: 'Ergonomic Desktop Interface',
          details: 'Designed a clean, distraction-free Tkinter dark layout with dedicated input panes for IP/hostname, port ranges, and timeout sliders.'
        },
        {
          phase: 'Live Telemetry Output Pane',
          details: 'Structured a scrolling monospace terminal feed showing open ports in real-time as workers discover them, rather than waiting for scan completion.'
        },
        {
          phase: 'Export Management',
          details: 'Built single-click CSV and TXT export dialogs with automated timestamped file naming for auditing.'
        }
      ],
      development: [
        'Built with Python socket library and concurrent.futures ThreadPoolExecutor for high throughput.',
        'Engineered thread-safe queue communication between scanning workers and the Tkinter GUI loop.',
        'Implemented validation regex for IPv4, IPv6, and FQDN hostnames with graceful DNS failure handling.',
        'Added custom port ranges (Common Web, Database, Full 1-65535, or User-Defined ranges).'
      ],
      securityConsiderations: [
        'Designed strictly for authorized network auditing and educational lab environments.',
        'Included rate limiting and timeout configurations to avoid unintended service denial during intensive scans.',
        'No external telemetry sent: all host resolution and scan logs stay strictly local.'
      ],
      technology: [
        { category: 'Language & Core', items: ['Python 3.10+', 'Socket API', 'Concurrent Futures', 'Threading'] },
        { category: 'Interface', items: ['Tkinter GUI', 'Custom Dark Palette', 'Thread-Safe Event Dispatch'] },
        { category: 'Networking', items: ['IPv4 / IPv6 Resolution', 'TCP Handshake Verification', 'DNS Resolver'] }
      ],
      resultStatus: 'Publicly available on GitHub with complete source code, screenshots, and multi-threaded scanning support.',
      keyLearnings: [
        'Mastered multi-threading synchronization in Python and avoiding GUI freezing.',
        'Understood socket timeout tuning across diverse LAN vs WAN latency characteristics.',
        'Learned clean separation between networking engine and presentation layers.'
      ],
      metrics: [
        { label: 'Threading Model', value: 'ThreadPool' },
        { label: 'Protocols', value: 'IPv4 + IPv6' },
        { label: 'Exports', value: 'CSV / TXT' }
      ]
    }
  },
  {
    id: 'digital-forensics-investigation',
    number: '03',
    title: 'DIGITAL FORENSICS INVESTIGATION',
    category: 'Digital Forensics & Incident Response',
    filterCategories: ['Cybersecurity'],
    shortDescription: 'A DFIR case study demonstrating complete digital evidence acquisition, forensic imaging (AD1), MD5/SHA-1 cryptographic verification, and artifact recovery using FTK Imager and Autopsy.',
    technologies: ['Autopsy 4.23', 'FTK Imager 4.7', 'DFIR', 'Evidence Verification', 'Hash Integrity'],
    visualTheme: 'forensics',
    repoUrl: 'https://github.com/prempolai91-cell/Digital-Forensics-Investigation',
    caseStudy: {
      overview: 'A complete practical Digital Forensics & Incident Response (DFIR) case study developed during an internship, demonstrating forensic acquisition, bit-stream disk imaging, hash verification, artifact carving, and court-grade investigation reporting.',
      theProblem: 'In digital forensics and incident response, any failure in evidence handling or chain of custody invalidates findings in legal proceedings. Investigators must acquire bit-stream disk images without altering source media and rigorously prove evidence integrity through cryptographic hashes.',
      theIdea: 'Demonstrate a rigorous, end-to-end digital forensic investigation pipeline on target media: evidence collection with FTK Imager 4.7, forensic image creation (AD1 format), dual cryptographic hash matching (MD5 and SHA-1), in-depth artifact triage with Autopsy, and comprehensive documentation.',
      myApproach: [
        'Utilized AccessData FTK Imager 4.7 to acquire bit-stream evidence from target drives into validated AD1 forensic containers.',
        'Generated and verified baseline MD5 and SHA-1 cryptographic hashes to confirm byte-for-byte evidence immutability.',
        'Parsed evidence in Autopsy 4.23.1 to ingest, carve, and categorize documents, web history, system downloads, and image metadata.',
        'Documented chronological findings into a professional forensic report maintaining an unbroken chain of custody.'
      ],
      designProcess: [
        {
          phase: 'Evidence Acquisition Workflow',
          details: 'Structured standardized ingestion checklists: write-blocker verification, target imaging, and hash generation.'
        },
        {
          phase: 'Autopsy Ingest Modules',
          details: 'Configured automated carving rules for deleted file recovery, keyword searching, and EXIF metadata extraction.'
        },
        {
          phase: 'Forensic Report Architecture',
          details: 'Authored structured documentation detailing executive summary, evidence timeline, artifact recovery, and conclusions.'
        }
      ],
      development: [
        'AccessData FTK Imager 4.7 for forensic disk imaging and verification.',
        'Autopsy 4.23.1 open-source digital forensics platform for forensic case analysis.',
        'Cryptographic hash generation (MD5 and SHA-1) verifying zero data alteration between acquisition and analysis.',
        'Repository structured into Cases, Documentation, and Evidence directories on GitHub.'
      ],
      securityConsiderations: [
        'Strict adherence to forensic chain of custody standards.',
        'Verification of cryptographic hashes before and after every analysis session.',
        'Sanitized synthetic evidence scenarios preserving confidential test parameters.'
      ],
      technology: [
        { category: 'Forensic Suites', items: ['FTK Imager 4.7', 'Autopsy 4.23.1', 'The Sleuth Kit (TSK)'] },
        { category: 'Verification', items: ['MD5 Cryptographic Hash', 'SHA-1 Hash Digest', 'AD1 Container Format'] },
        { category: 'Artifacts Analyzed', items: ['Deleted Documents', 'Browser History', 'Image EXIF', 'Download Logs'] }
      ],
      resultStatus: 'Complete forensic documentation and analysis case published on GitHub with full methodology and screenshots.',
      keyLearnings: [
        'Deepened understanding of bit-stream imaging and filesystem metadata structures (MFT / FAT).',
        'Learned how deleted files leave recoverable residue in unallocated disk clusters.',
        'Mastered court-admissible forensic reporting and immutable verification workflows.'
      ],
      metrics: [
        { label: 'Hash Verification', value: 'MD5 & SHA-1' },
        { label: 'Container', value: 'AD1 Image' },
        { label: 'Forensic Suite', value: 'Autopsy 4.23' }
      ]
    }
  },
  {
    id: 'phishing-awareness-simulator',
    number: '04',
    title: 'PHISHING AWARENESS SIMULATOR',
    category: 'Cybersecurity Training & Web Platform',
    filterCategories: ['Web', 'Cybersecurity'],
    shortDescription: 'A Laravel-based phishing simulation and awareness platform for organizations to design campaigns, track user vulnerability metrics, and deliver security training.',
    technologies: ['Laravel 11', 'PHP', 'Blade', 'MySQL', 'Cybersecurity Education', 'Campaign Telemetry'],
    visualTheme: 'phishing',
    repoUrl: 'https://github.com/prempolai91-cell/phishing-awareness-simulator',
    caseStudy: {
      overview: 'Phishing Awareness Simulator is an educational web platform built with Laravel designed to help organizations test employee resilience against social engineering through controlled phishing campaigns, real-time vulnerability telemetry, and automated awareness training.',
      theProblem: 'Social engineering and phishing account for the vast majority of initial enterprise breaches. Traditional annual training videos fail to teach employees how to identify deceptive URLs, urgent pretexting, and credential harvesting landing pages in real inbox conditions.',
      theIdea: 'Build a full-featured Laravel simulation management dashboard where administrators can create customized email lure templates, launch targeted training campaigns, monitor click-through rates in real time, and automatically guide compromised users into immediate, constructive security micro-lessons.',
      myApproach: [
        'Architected a modular Laravel application with full CRUD capabilities for phishing campaign orchestration.',
        'Designed deceptive yet realistic email templates mirroring common pretexting tactics (password expiration, urgent corporate notice, invoice updates).',
        'Engineered click-tracking telemetry with unique tokenized URLs mapping interactions back to campaign databases.',
        'Built automated retraining triggers redirecting users who submitted credentials to an interactive educational debrief.'
      ],
      designProcess: [
        {
          phase: 'Admin Telemetry Dashboard',
          details: 'Designed visual campaign progress bars tracking Total Sent, Opened, Clicked, and Training Completed metrics.'
        },
        {
          phase: 'Lure Template Builder',
          details: 'Created an intuitive template manager supporting variable substitution (employee name, department, date) for realistic spear-phishing.'
        },
        {
          phase: 'Educational Landing Page',
          details: 'Designed non-punitive, positive reinforcement debrief screens explaining exactly which red flags were present in the email.'
        }
      ],
      development: [
        'Built with PHP 8.2 and Laravel framework utilizing Eloquent ORM and Blade templating.',
        'Implemented relational MySQL schemas for campaigns, employee cohorts, lure templates, and interaction audit logs.',
        'Engineered secure token generation ensuring each campaign link is unique, tamper-proof, and private.',
        'Created modular controllers and middleware ensuring role-based access for campaign administrators.'
      ],
      securityConsiderations: [
        'Safe educational simulation: simulated credentials submitted by users are immediately discarded and never stored in plain text.',
        'CSRF protection and strict request sanitization across all simulation endpoints.',
        'Role-Based Access Control (RBAC) preventing unauthorized campaign execution.'
      ],
      technology: [
        { category: 'Backend & Framework', items: ['Laravel 11', 'PHP 8.2', 'Eloquent ORM', 'Blade'] },
        { category: 'Database & Storage', items: ['MySQL', 'Schema Migrations', 'Audit Logs'] },
        { category: 'Security Focus', items: ['Social Engineering Defense', 'Campaign Analytics', 'User Education'] }
      ],
      resultStatus: 'Source code and active campaign management CRUD module published on GitHub with complete Laravel architecture.',
      keyLearnings: [
        'Learned how social engineering psychology operates and how to effectively highlight red flags in educational UI.',
        'Engineered robust relational models for campaign tracking in Laravel.',
        'Understood the ethical and privacy balance required when conducting organizational security tests.'
      ],
      metrics: [
        { label: 'Framework', value: 'Laravel 11' },
        { label: 'Campaign Engine', value: 'Full CRUD' },
        { label: 'Defense Focus', value: 'Social Engineering' }
      ]
    }
  }
];

export const UIUX_COLLECTION: UIUXItem[] = [
  {
    id: 'mobile-crypto-vault',
    title: 'Aegis Mobile Security Key',
    category: 'Mobile Interface',
    shortDescription: 'Biometric authorization vault and transaction signing mobile UI with cryptographic visual confirmation.',
    screenCount: 8,
    previewColor: '#e11d48',
    process: {
      problemStatement: 'Users frequently approve malicious web3 transactions due to obfuscated hexadecimal contract data.',
      userArchetype: 'Security-conscious mobile users requiring clear transaction intent.',
      designPhilosophy: 'Zero-ambiguity visual typography with progressive disclosure of technical gas and recipient parameters.',
      tokens: ['#07080a Canvas', '#18181b Card', '#e11d48 Crimson Security Alert', '#22c55e Verified Token'],
      wireframeSteps: ['Intent Parsing Screen', 'Visual Asset Flow Chart', 'Biometric Confirmation Haptic Arc'],
      deliverables: ['High-Fidelity Figma Component Kit', 'Interactive Prototype with Micro-Interactions', 'Design Token JSON']
    }
  },
  {
    id: 'security-operations-dashboard',
    title: 'Specter SecOps Intelligence',
    category: 'Dashboard Concept',
    shortDescription: 'Dark luxury SOC analyst console displaying real-time endpoint telemetry, threat vectors, and MITRE ATT&CK mapping.',
    screenCount: 12,
    previewColor: '#9f1239',
    process: {
      problemStatement: 'SOC analysts experience alert fatigue from noisy dashboards with low information density and poor visual hierarchy.',
      userArchetype: 'Tier 2/3 Security Operations Analysts and Threat Hunters.',
      designPhilosophy: 'Dark editorial data presentation where critical anomalies command immediate optical focus.',
      tokens: ['#0a0b0e Root', '#1f242e Border', '#f43f5e High Severity', '#38bdf8 Network Inbound'],
      wireframeSteps: ['Global Threat Matrix', 'Single-Incident Forensic Deep Dive', 'Automated Containment Action Pane'],
      deliverables: ['Density-Optimized Data Grid Specs', 'Interactive Filter State Machine', 'Accessibility Audit']
    }
  },
  {
    id: 'developer-platform-landing',
    title: 'Synapse Core Developer Platform',
    category: 'Landing Page',
    shortDescription: 'Cinematic developer landing page featuring interactive code playground, SDK architecture diagrams, and live benchmarks.',
    screenCount: 6,
    previewColor: '#be123c',
    process: {
      problemStatement: 'Developer tools often suffer from dry, uninspiring marketing pages that fail to showcase the actual API developer experience.',
      userArchetype: 'Full-stack engineers, technical leads, and engineering directors.',
      designPhilosophy: 'Code-first visual narrative where the product experience is demonstrated live in the browser.',
      tokens: ['#050507 Dark Abyss', '#27272a Hairline', '#fb7185 Interactive Trigger', '#a1a1aa Muted Body'],
      wireframeSteps: ['Interactive Hero Code Split', 'Performance Benchmark Slider', 'Ecosystem Compatibility Grid'],
      deliverables: ['Responsive 1440px + Mobile Breakpoints', 'Motion Choreography Spec', 'Asset Export Suite']
    }
  },
  {
    id: 'fluid-design-tokens',
    title: 'Vanguard Design System',
    category: 'Design System',
    shortDescription: 'Cross-platform design token architecture unifying typography, fluid spacing scales, and dark-mode elevation tokens.',
    screenCount: 16,
    previewColor: '#881337',
    process: {
      problemStatement: 'Inconsistent design implementation across web and Android native applications causing brand dilution.',
      userArchetype: 'Cross-functional engineering and design squads.',
      designPhilosophy: 'Mathematical modular scales bridging Figma Styles to Kotlin Jetpack Compose and Tailwind CSS themes.',
      tokens: ['Scale 1.25 Modular Type', '8pt Hard Grid', '4-Tier Elevation System', 'Accessible Contrast Ratios'],
      wireframeSteps: ['Token Primitive Taxonomy', 'Component Semantic Mapping', 'Dark/Light Contrast Matrix'],
      deliverables: ['Figma Variable Library', 'Token Export Pipeline (Style Dictionary)', 'Component Storybook Spec']
    }
  },
  {
    id: 'habit-forge-wireframes',
    title: 'Habit Forge Core Experience',
    category: 'Wireframe & Flow',
    shortDescription: 'End-to-end low-fidelity UX architecture, task flow diagrams, and user mental model mapping for habit formation.',
    screenCount: 14,
    previewColor: '#e11d48',
    process: {
      problemStatement: 'First-time user onboarding drop-off in habit tracking apps exceeding 65% on day 1.',
      userArchetype: 'Individuals seeking structured daily routines without feeling overwhelmed.',
      designPhilosophy: 'Progressive habit stacking: start with one atomic action before introducing complex scheduling.',
      tokens: ['Low-Fidelity Greyscale', '16px Grid Wireframes', 'Annotations in Crimson Red'],
      wireframeSteps: ['First-Session Diagnostic Flow', 'Atomic Goal Definition', 'Daily Trigger & Reward Loop'],
      deliverables: ['User Flow Architecture Map', 'Low-Fidelity Interactive Wireframes', 'Usability Test Plan']
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'development',
    title: 'DEVELOPMENT',
    subtitle: 'Languages, frameworks & engineering foundations',
    skills: [
      { name: 'TypeScript & React', focus: 'Modern component architecture, strict contracts & fluid UI state' },
      { name: 'Kotlin & Jetpack Compose', focus: 'Declarative native Android engineering, UDF & coroutines' },
      { name: 'Python & Networking', focus: 'Socket programming, concurrent multi-threading & automation' },
      { name: 'Laravel & PHP', focus: 'MVC web platform architecture, Eloquent ORM & secure routing' },
      { name: 'REST & API Integration', focus: 'Contract design, asynchronous endpoints & error resilience' }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX DESIGN',
    subtitle: 'Human-centered interfaces, systems & interaction craft',
    skills: [
      { name: 'Figma Systems & Tokens', focus: 'Design token architecture, auto-layout & component variants' },
      { name: 'Interaction & Prototyping', focus: 'Fluid micro-interactions, motion curves & high-fidelity flows' },
      { name: 'UX Architecture', focus: 'Information hierarchy, user mental models & cognitive clarity' },
      { name: 'Responsive & Accessibility', focus: 'Mobile-first adaptations, WCAG AA contrast & typography scales' }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'CYBERSECURITY',
    subtitle: 'Application defense, penetration analysis & secure architecture',
    skills: [
      { name: 'Android Application Defense', focus: 'APK reverse engineering, IPC validation & runtime integrity' },
      { name: 'Network Recon & Port Auditing', focus: 'Socket discovery heuristics, attack surface mapping & diagnostics' },
      { name: 'Digital Forensics (DFIR)', focus: 'Bit-stream imaging (AD1), MD5/SHA-1 verification & artifact recovery' },
      { name: 'OWASP & Secure Architecture', focus: 'Threat modeling, input sanitization & defense-in-depth principles' }
    ]
  },
  {
    id: 'tools',
    title: 'TOOLS & ECOSYSTEM',
    subtitle: 'Workstations, environments & productivity stack',
    skills: [
      { name: 'Android Studio & JADX', focus: 'Native profiling, Logcat telemetry & decompilation analysis' },
      { name: 'Autopsy & FTK Imager', focus: 'Digital forensic suite, disk analysis & artifact carving' },
      { name: 'Git & GitHub Workflows', focus: 'Distributed version control, atomic branching & CI automation' },
      { name: 'Linux & Terminal', focus: 'Shell scripting, network diagnostic utilities & environment hardening' }
    ]
  }
];

export const SECURITY_CONCEPTS: SecurityConcept[] = [
  {
    id: 'android-sec',
    title: 'ANDROID SECURITY',
    category: 'Mobile Platform Defense',
    command: 'androguard analyze app-release.apk --permissions --manifest',
    outputSummary: 'Manifest inspected: 3 exported activities identified. Insecure broadcast receiver flagged for mitigation.',
    deepDive: 'Focusing on the Android runtime attack surface: preventing exported component hijacking, enforcing strict permissions, implementing certificate pinning, and protecting sensitive keys from APK decompilation.',
    checklist: [
      'Exported components audited (exported=false by default)',
      'EncryptedSharedPreferences / Jetpack Security KeyStore used',
      'Certificate pinning with Network Security Config',
      'Tamper detection and root/debugger evasion heuristics'
    ]
  },
  {
    id: 'web-sec',
    title: 'WEB APPLICATION SECURITY',
    category: 'Full-Stack Hardening',
    command: 'curl -I https://app.target.internal -H "X-Security-Scan: Active"',
    outputSummary: 'HTTP/2 200 OK | Content-Security-Policy: default-src \'self\' | HSTS: max-age=31536000 | X-Content-Type-Options: nosniff',
    deepDive: 'Building web architectures with defense-in-depth: strict Content Security Policy (CSP), Cross-Origin Resource Sharing (CORS) whitelisting, HTTP-only secure cookie sessions, and comprehensive input validation.',
    checklist: [
      'Strict Content Security Policy (CSP) headers without unsafe-inline',
      'SameSite=Strict, Secure, HttpOnly cookie flags enforced',
      'Parameterized SQL / ORM sanitization preventing injection',
      'Server-side rate limiting and origin verification'
    ]
  },
  {
    id: 'pentest',
    title: 'PENETRATION TESTING CONCEPTS',
    category: 'Ethical Offensive Analysis',
    command: 'nmap -sV -sC -T4 127.0.0.1 -p 80,443,8080',
    outputSummary: 'Open ports verified: 443/tcp (TLS 1.3), 8080/tcp (Reverse proxy active). Unnecessary daemon ports closed.',
    deepDive: 'Approaching applications with an ethical adversarial mindset: identifying blind spots, inspecting API endpoints via proxy tools (Burp Suite), and validating access-control enforcement before malicious actors can test them.',
    checklist: [
      'Target reconnaissance and attack surface scoping',
      'Automated and manual proxy traffic interception',
      'Broken object-level authorization (BOLA) verification',
      'Comprehensive vulnerability reporting with reproducible POCs'
    ]
  },
  {
    id: 'vulnerability-analysis',
    title: 'VULNERABILITY ANALYSIS',
    category: 'Static & Dynamic Assessment',
    command: 'npm audit && semgrep --config=p/owasp-top-ten ./src',
    outputSummary: 'Scan complete: 0 high vulnerabilities found in production dependencies. Codebase verified against OWASP rules.',
    deepDive: 'Systematic code auditing: combining Static Application Security Testing (SAST) with Software Bill of Materials (SBOM) dependency audits to eliminate outdated libraries and known CVEs before deployment.',
    checklist: [
      'Automated dependency vulnerability audits in CI',
      'Static code analysis targeting unsafe regex and desanitized inputs',
      'Secret scanning preventing hardcoded API tokens',
      'Third-party library version pinning and deprecation tracking'
    ]
  },
  {
    id: 'secure-dev',
    title: 'SECURE DEVELOPMENT',
    category: 'Lifecycle Integration',
    command: 'git commit -m "feat: enforce zero-trust authentication handshake"',
    outputSummary: 'Pre-commit hook passed: gitleaks check clean. Unit tests passing: 48/48.',
    deepDive: 'Shifting security left into every step of the development cycle. Security is not an afterthought added before release; it is an architectural principle embedded into data models, API schemas, and UI states.',
    checklist: [
      'Principle of Least Privilege across all API tokens',
      'Pre-commit automated security hooks',
      'Centralized validation and error-handling without stack trace leakage',
      'Zero-trust session authorization on sensitive mutations'
    ]
  },
  {
    id: 'owasp',
    title: 'OWASP FRAMEWORK',
    category: 'Standards & Compliance',
    command: 'cat /etc/security/owasp_coverage.json | jq .coverage',
    outputSummary: '"Top 10 Web & Mobile Coverage: Active. Mapping complete for Broken Auth, Injection, and Insecure Storage."',
    deepDive: 'Grounded in the internationally recognized OWASP foundations: studying both OWASP Top 10 for Web and OWASP Mobile Security Project to maintain rigorous, up-to-date threat defense comprehension.',
    checklist: [
      'M1: Insecure Data Storage mitigation',
      'M3: Insecure Communication safeguards',
      'A01: Broken Access Control architecture review',
      'A03: Cryptographic Failures prevention'
    ]
  }
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'journey-2026-internship',
    year: '2026',
    title: 'INTERNSHIP / PROJECT DEVELOPMENT',
    role: 'Software Development & Security Research',
    description: 'Building Android security and application-development projects while exploring modern UI/UX and cybersecurity. Focused on hands-on Kotlin architecture and mobile vulnerability testing.',
    isPlaceholder: false,
    keyPoints: [
      'Developing Jetpack Compose mobile security testing components.',
      'Studying OWASP mobile security guidelines and practical penetration-testing workflows.',
      'Refining full-stack web and mobile application prototypes with modern TypeScript.'
    ],
    category: 'Experience'
  },
  {
    id: 'journey-2026-ai-product',
    year: '2026',
    title: 'AI + PRODUCT EXPLORATION',
    role: 'Creative Technologist & Product Designer',
    description: 'Exploring AI-powered applications, product design and real-world technology solutions. Integrating human-in-the-loop UX patterns into clinical and productivity domains.',
    isPlaceholder: false,
    keyPoints: [
      'Prototyped clinical decision-support triage concepts with strict safety guardrails.',
      'Designed high-fidelity dark luxury design systems and micro-interactions.',
      'Explored generative intelligence APIs paired with robust client architectures.'
    ],
    category: 'Exploration'
  },
  {
    id: 'journey-future-placeholder',
    year: '2026+',
    title: 'UPCOMING MILESTONE',
    role: '[Placeholder for Future Role / Production Launch]',
    description: 'Dedicated slot for upcoming industry experience, production deployments, or academic milestones as professional journey evolves.',
    isPlaceholder: true,
    keyPoints: [
      'Configured as editable data structure in src/data/portfolioData.ts',
      'Ready to display production engineering milestones',
      'Open to software engineering and design opportunities'
    ],
    category: 'Experience'
  }
];

export const CURRENTLY_EXPLORING = [
  { name: 'Cybersecurity', desc: 'Mobile pentesting, reverse engineering, OWASP standards' },
  { name: 'Web Development', desc: 'React 19, TypeScript, Next.js architecture, performant styling' },
  { name: 'UI/UX Design', desc: 'Dark luxury aesthetics, design tokens, micro-motion choreography' }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-prem-internship',
    title: 'Certificate of Internship',
    issuer: 'Software & Technology Research Internship',
    issuerOrg: 'Engineering & Technology Development Division',
    issueDate: '2026',
    credentialId: 'INTERNSHIP-PREM-POLAI-2026',
    imageUrl: 'https://i.postimg.cc/QCxbddSG/Internship-Certificate-Prem-Polai.png',
    verificationUrl: 'https://i.postimg.cc/QCxbddSG/Internship-Certificate-Prem-Polai.png',
    category: 'Internship',
    skillsCovered: [
      'Production Software Engineering',
      'Mobile & Web Application Architecture',
      'Security Auditing & Code Hardening',
      'Agile Team Collaboration & Sprints',
      'Feature Implementation & Bug Mitigation'
    ],
    description: 'Official Internship Certificate awarded to Prem Polai in recognition of exemplary performance, technical dedication, and successful completion of the engineering internship program.',
    verifiedHours: 'Completed Internship',
    badgeType: 'internship',
    accentColor: 'rose'
  },
  {
    id: 'cert-prem-project-completion',
    title: 'Project Completion Certificate',
    issuer: 'Software & Engineering Evaluation Board',
    issuerOrg: 'Project Review & Engineering Board',
    issueDate: '2025',
    credentialId: 'PROJECT-COMPLETION-PREM-POLAI',
    imageUrl: 'https://i.postimg.cc/XY0b1MYf/Project-Completion-Certificate-Prem-Polai.png',
    verificationUrl: 'https://i.postimg.cc/XY0b1MYf/Project-Completion-Certificate-Prem-Polai.png',
    category: 'Development',
    skillsCovered: [
      'Full-Cycle Software Engineering',
      'System Architecture & Modular Design',
      'Production Implementation & Testing',
      'Secure Coding Best Practices',
      'Technical Documentation & Review'
    ],
    description: 'Official Project Completion Certificate awarded to Prem Polai in recognition of successfully architecting, implementing, and delivering the software project with high engineering standards.',
    verifiedHours: 'Verified Completion',
    badgeType: 'verified',
    accentColor: 'cyan'
  },
  {
    id: 'cert-prem-participation',
    title: 'Certificate of Participation',
    issuer: 'Technical Event & Hackathon',
    issuerOrg: 'Engineering & Technology Committee',
    issueDate: '2025',
    credentialId: 'CERT-PARTICIPATION-PREM-POLAI',
    imageUrl: 'https://i.postimg.cc/Pry49Yty/Certificate-of-Participation-Prem-Polai.png',
    verificationUrl: 'https://i.postimg.cc/Pry49Yty/Certificate-of-Participation-Prem-Polai.png',
    category: 'Hackathons & Events',
    skillsCovered: [
      'Collaborative Engineering',
      'Technical Problem Solving',
      'Rapid Prototyping',
      'Cybersecurity & App Architecture',
      'Technical Showcase & Defense'
    ],
    description: 'Official Certificate of Participation awarded to Prem Polai in recognition of successful participation, engineering dedication, and creative problem-solving during the technical event.',
    verifiedHours: 'Official Citation',
    badgeType: 'participation',
    accentColor: 'rose'
  }
];


