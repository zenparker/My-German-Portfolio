import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram,
  Twitter,
  Mail, 
  ExternalLink, 
  Code2, 
  MapPin, 
  ChevronRight, 
  ArrowDown,
  Sun,
  Moon,
  Flame,
  Target,
  BookOpen,
  Coffee,
  Globe,
  Clock,
  Activity,
  MessageCircle,
  Zap,
  Cpu,
  Layers,
  Box
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

// --- Types ---
interface Project {
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  tech: string[];
  link?: string;
  metrics?: string;
  tier: string;
  caseStudy?: {
    problem: string;
    approach: string;
    challenges: string;
    solutions: string;
    learnings: string;
  };
}



interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'career' | 'goal' | 'milestone';
  status: 'completed' | 'current' | 'future';
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: 'Personal Portfolio',
    status: 'completed',
    description: 'Minimalist Swiss-style portfolio built with React and Tailwind.',
    tech: ['React', 'Tailwind', 'Motion'],
    link: '#',
    metrics: 'Lighthouse: 95 | Load: <2s',
    tier: 'TIER 1 (Basics)',
    caseStudy: {
      problem: 'Needed a professional digital presence that stands out to German recruiters while showcasing technical precision.',
      approach: 'Adopted a "Swiss Design" philosophy—focusing on typography, grid systems, and minimalist aesthetics using React and Tailwind CSS.',
      challenges: 'Balancing high-performance animations with a clean, professional look without over-cluttering the UI.',
      solutions: 'Used Framer Motion for subtle, purposeful transitions and a strict monochrome palette with a single accent color.',
      learnings: 'Deepened understanding of responsive design systems and the importance of "white space" in professional branding.'
    }
  },
  {
    title: 'Calculator App',
    status: 'in-progress',
    description: 'A functional calculator with a clean UI, currently 50% complete.',
    tech: ['JavaScript', 'CSS'],
    metrics: '50% Done',
    tier: 'TIER 1 (Basics)',
    caseStudy: {
      problem: 'Mastering core JavaScript logic and DOM manipulation through a practical utility.',
      approach: 'Building a custom parser for mathematical expressions to handle operator precedence correctly.',
      challenges: 'Handling edge cases like division by zero and floating-point precision issues in JavaScript.',
      solutions: 'Implementing a state machine to track input sequences and using BigInt/Decimal libraries for precision.',
      learnings: 'Gained a solid grasp of event-driven programming and state management in vanilla JS.'
    }
  },
  {
    title: 'Todo App',
    status: 'planned',
    description: 'Task management system with persistence.',
    tech: ['Java', 'Spring Boot', 'React'],
    tier: 'TIER 2 (Full-Stack)',
    caseStudy: {
      problem: 'Need a reliable way to manage daily tasks with a focus on data persistence and user-specific lists.',
      approach: 'Building a RESTful API with Spring Boot and a responsive frontend with React, using PostgreSQL for data storage.',
      challenges: 'Implementing secure user authentication and ensuring real-time updates across multiple devices.',
      solutions: 'Using Spring Security with JWT for auth and exploring WebSockets for live synchronization.',
      learnings: 'Deepening knowledge of full-stack architecture and relational database design.'
    }
  },
  {
    title: 'Weather Dashboard',
    status: 'planned',
    description: 'Real-time weather tracking using external APIs.',
    tech: ['React', 'OpenWeather API'],
    tier: 'TIER 2 (Full-Stack)',
    caseStudy: {
      problem: 'Users need a quick, visual way to check weather conditions for multiple locations.',
      approach: 'Integrating the OpenWeather API to fetch live data and using Recharts for historical trend visualization.',
      challenges: 'Handling API rate limits and managing complex state for multiple location searches.',
      solutions: 'Implementing client-side caching and debounced search inputs to minimize API calls.',
      learnings: 'Improving skills in third-party API integration and asynchronous state management.'
    }
  },
  {
    title: 'Personal Blog',
    status: 'planned',
    description: 'A content management system for sharing learning insights.',
    tech: ['Next.js', 'Markdown', 'Tailwind'],
    tier: 'TIER 2 (Full-Stack)',
    caseStudy: {
      problem: 'Sharing technical knowledge effectively while maintaining a high-performance, SEO-friendly site.',
      approach: 'Using Next.js for static site generation and Markdown for content management.',
      challenges: 'Optimizing image loading and ensuring a smooth reading experience across all devices.',
      solutions: 'Leveraging Next.js Image component and a strict typography-focused design system.',
      learnings: 'Mastering modern SSG techniques and content-first design principles.'
    }
  },
  {
    title: 'E-commerce with Payments',
    status: 'planned',
    description: 'Full-stack shopping experience with Stripe integration.',
    tech: ['Spring Boot', 'PostgreSQL', 'React', 'Stripe'],
    metrics: '⭐⭐⭐',
    tier: 'TIER 3 (Fintech-Relevant)',
    caseStudy: {
      problem: 'Creating a secure and seamless online shopping experience with real payment processing.',
      approach: 'Developing a microservices-inspired architecture with a dedicated payment gateway service using Stripe.',
      challenges: 'Ensuring PCI compliance and handling complex order state transitions (pending, paid, failed).',
      solutions: 'Leveraging Stripe Elements for secure card handling and implementing robust webhook listeners.',
      learnings: 'Understanding the complexities of fintech integrations and secure transaction flows.'
    }
  },
  {
    title: 'Digital Wallet',
    status: 'planned',
    description: 'Secure transaction system for digital currency.',
    tech: ['Java', 'Spring Security', 'React'],
    metrics: '⭐⭐⭐⭐⭐',
    tier: 'TIER 3 (Fintech-Relevant)'
  },
  {
    title: 'Expense Tracker',
    status: 'planned',
    description: 'Personal finance management tool.',
    tech: ['React Native', 'Firebase'],
    tier: 'TIER 3 (Fintech-Relevant)'
  },
  {
    title: 'Real-time Chat App',
    status: 'planned',
    description: 'Instant messaging with WebSockets.',
    tech: ['Node.js', 'Socket.io', 'React'],
    tier: 'TIER 4 (Advanced)'
  },
  {
    title: 'Stock Trading Simulator',
    status: 'planned',
    description: 'Virtual trading platform with real-time data.',
    tech: ['Java', 'Spring Boot', 'WebSockets'],
    tier: 'TIER 4 (Advanced)'
  },
  {
    title: 'Loan Management System',
    status: 'planned',
    description: 'Automated loan processing and tracking.',
    tech: ['Spring Boot', 'PostgreSQL'],
    tier: 'TIER 4 (Advanced)'
  },
  {
    title: 'Healthcare System (Capstone)',
    status: 'planned',
    description: 'Comprehensive medical record and appointment system.',
    tech: ['Full Stack', 'Cloud Deployment'],
    tier: 'TIER 4 (Advanced)'
  }
];

const TIMELINE: TimelineItem[] = [
  { year: '2025', title: 'Diploma in CSE', description: 'Completed with 75% from MSBTE.', type: 'education', status: 'completed' },
  { year: 'Feb 2025', title: 'Technical Journey Start', description: 'Began focused learning on Java & DSA.', type: 'milestone', status: 'completed' },
  { year: 'July 2026', title: 'B.E Admission', description: 'Formal entry into degree program.', type: 'milestone', status: 'future' },
  { year: '2026 - 2029', title: 'B.E Computer Science', description: 'Pursuing Bachelor of Engineering.', type: 'education', status: 'current' },
  { year: '2027 - 2028', title: 'Internships', description: 'Gaining industry experience.', type: 'career', status: 'future' },
  { year: 'Oct 2029', title: 'Master\'s in Germany', description: 'Relocating to Germany for higher studies.', type: 'education', status: 'future' },
  { year: 'Sep 2031', title: 'Post Graduation', description: 'Completing Master\'s degree.', type: 'education', status: 'future' },
  { year: 'Oct 2031', title: 'Software Engineer (Germany)', description: 'Starting career with target €60k salary.', type: 'career', status: 'future' },
  { year: '2036', title: 'Senior Software Engineer', description: 'Targeting €110k salary and leadership roles.', type: 'career', status: 'future' },
];

// --- Translations ---
const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', journey: 'Journey', contact: 'Contact' },
    hero: { greeting: 'Hallo, I am', role: 'Full-Stack Developer', focus: 'Mastering Java & DSA', target: 'Mumbai → Germany' },
    stats: { days: 'Days Coding', solved: 'LeetCode Solved', german: 'German B1', live: 'Live Status', coding: 'Coding', next: 'Next Goal', updated: 'Updated' },
    projects: { caseStudy: 'Case Study', problem: 'Problem', approach: 'Approach', challenges: 'Challenges', solutions: 'Solutions', learnings: 'Learnings' },
    footer: { stats: 'Live Stats', focus: 'Current Focus', transparency: 'Transparency', transparencyBody: "This portfolio is an honest representation of a student's journey. All stats and progress are updated regularly to reflect real growth." },
    contact: { title: 'Get in Touch', name: 'Name', email: 'Email', message: 'Message', send: 'Send Message' },
    germany: { title: 'Aspiring to move to Germany too?', body: "Whether you're learning German, mastering Java, or planning your visa, I'd love to share insights and learn from your journey.", connect: "Let's Connect", message: 'Send a Message' }
  },
  de: {
    nav: { home: 'Startseite', about: 'Über mich', skills: 'Fähigkeiten', projects: 'Projekte', journey: 'Werdegang', contact: 'Kontakt' },
    hero: { greeting: 'Hallo, ich bin', role: 'Full-Stack Entwickler', focus: 'Java & DSA Experte', target: 'Mumbai → Deutschland' },
    stats: { days: 'Tage Programmieren', solved: 'LeetCode gelöst', german: 'Deutsch B1', live: 'Live-Status', coding: 'Programmieren', next: 'Nächstes Ziel', updated: 'Aktualisiert' },
    projects: { caseStudy: 'Fallstudie', problem: 'Problem', approach: 'Ansatz', challenges: 'Herausforderungen', solutions: 'Lösungen', learnings: 'Lerneffekte' },
    footer: { stats: 'Live-Statistiken', focus: 'Aktueller Fokus', transparency: 'Transparenz', transparencyBody: "Dieses Portfolio ist eine ehrliche Darstellung des Weges eines Studenten. Alle Statistiken und Fortschritte werden regelmäßig aktualisiert." },
    contact: { title: 'Kontakt aufnehmen', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden' },
    germany: { title: 'Möchten Sie auch nach Deutschland ziehen?', body: 'Egal ob Sie Deutsch lernen, Java meistern oder Ihr Visum planen, ich würde gerne Erfahrungen austauschen.', connect: 'Vernetzen wir uns', message: 'Nachricht senden' }
  }
};

// --- Components ---

const GitHubStats = ({ username }: { username: string }) => (
  <div className="pill-card border-pure-white/5 p-6 overflow-hidden h-full flex flex-col">
    <h5 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
      <Github size={14} /> GitHub Contributions
    </h5>
    <div className="grow flex items-center justify-center mb-4">
      <img 
        src={`https://ghchart.rshah.org/ed1a21/${username}`} 
        alt={`${username}'s GitHub chart`}
        className="w-full h-auto filter invert brightness-150"
        referrerPolicy="no-referrer"
      />
    </div>
    {/* Stats Summary */}
    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-pure-white/5 mt-auto">
      <div className="text-center">
        <div className="text-lg font-bold text-pure-white">12+</div>
        <div className="text-[8px] uppercase tracking-widest text-medium-gray">Repos</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-accent">150+</div>
        <div className="text-[8px] uppercase tracking-widest text-medium-gray">Commits</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-pure-white">2025</div>
        <div className="text-[8px] uppercase tracking-widest text-medium-gray">Started</div>
      </div>
    </div>
  </div>
);

const LeetCodeStats = ({ username }: { username: string }) => {
  return (
    <div className="pill-card border-pure-white/5 p-6 overflow-hidden h-full flex flex-col">
      <h5 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
        <Code2 size={14} /> LeetCode Progress
      </h5>
      <div className="grow flex items-center justify-center mb-4">
        <img 
          src={`https://leetcard.jacoblin.cool/${username}?theme=dark&font=Inter&ext=activity`} 
          alt={`${username}'s LeetCode stats`}
          className="w-full h-auto"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-pure-white/5 mt-auto">
        <div className="text-center">
          <div className="text-lg font-bold text-pure-white">50+</div>
          <div className="text-[8px] uppercase tracking-widest text-medium-gray">Solved</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent">7</div>
          <div className="text-[8px] uppercase tracking-widest text-medium-gray">Streak</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-pure-white">500</div>
          <div className="text-[8px] uppercase tracking-widest text-medium-gray">Target</div>
        </div>
      </div>
    </div>
  );
};

const ACCENT_COLORS = [
  { name: 'Red', value: '#ed1a21' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
];

const Navbar = ({ accentColor, nextColor, lang, setLang, t }: { 
  accentColor: string, 
  nextColor: () => void, 
  lang: 'en' | 'de', 
  setLang: (l: 'en' | 'de') => void,
  t: any
}) => {
  const [times, setTimes] = useState({ mumbai: '', berlin: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const mumbai = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      const berlin = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setTimes({ mumbai, berlin });
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="pill-container bg-pure-black/80 flex items-center justify-between border-pure-white/10 px-6">
        <div className="flex items-center gap-8">
          <img 
            src="https://iili.io/qqRJFUl.md.png" 
            alt="ZS Logo" 
            className="h-8 w-auto object-contain hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="hidden lg:flex items-center gap-4 border-l border-pure-white/10 pl-4 text-[10px] font-mono text-medium-gray">
            <div className="flex items-center gap-2">
              <span className="uppercase opacity-50">BOM</span>
              <span className="text-pure-white">{times.mumbai}</span>
            </div>
            <div className="w-px h-3 bg-pure-white/10" />
            <div className="flex items-center gap-2">
              <span className="uppercase opacity-50">BER</span>
              <span className="text-accent">{times.berlin}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-4 text-sm font-medium text-medium-gray">
            {Object.entries(t.nav).map(([key, label]: [string, any]) => (
              <a key={key} href={`#${key}`} className="hover:text-pure-white transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className="p-2 rounded-full hover:bg-pure-white/5 transition-colors cursor-pointer group flex items-center gap-2"
            title="Switch Language"
          >
            <Globe size={16} className="text-medium-gray group-hover:text-accent transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{lang === 'en' ? 'DE' : 'EN'}</span>
          </button>
          <button 
            onClick={nextColor}
            className="p-2 rounded-full hover:bg-pure-white/5 transition-colors cursor-pointer group flex items-center gap-2"
            title="Change Accent Color"
          >
            <div 
              className="w-4 h-4 rounded-full transition-transform group-hover:scale-110 shadow-[0_0_10px_var(--accent-color)]" 
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Theme</span>
          </button>
          <a href="#contact" className="pill-button bg-pure-white text-pure-black text-xs py-2 px-4 no-underline border-none hover:bg-accent hover:text-pure-white">
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 flex items-center gap-4">
      <span className="w-1.5 h-10 bg-accent rounded-full hidden md:block" />
      {title}
    </h2>
    {subtitle && <p className="text-sm text-medium-gray max-w-2xl ml-0 md:ml-6">{subtitle}</p>}
  </div>
);

const InteractiveSkillMatrix = ({ accentColor }: { accentColor: string }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: 0,
      name: 'Languages',
      icon: <Globe size={18} />,
      skills: [
        { name: 'Java', level: 90, detail: 'Expert: 18+ months, 12+ projects, 50+ DSA problems' },
        { name: 'JavaScript', level: 75, detail: 'Intermediate-Advanced: 8+ React SPAs, API integration' },
        { name: 'TypeScript', level: 70, detail: 'Intermediate: Type-safe React development' },
        { name: 'SQL', level: 75, detail: 'Intermediate-Advanced: 12+ schemas, optimization' },
        { name: 'HTML/CSS', level: 70, detail: 'Intermediate: Responsive UI, Flexbox, Grid' },
      ]
    },
    {
      id: 1,
      name: 'Frontend',
      icon: <Code2 size={18} />,
      skills: [
        { name: 'React Fundamentals', level: 70, detail: 'Strong grasp of component lifecycle and hooks' },
        { name: 'React Router', level: 70, detail: 'SPA navigation and dynamic routing' },
        { name: 'State Management', level: 65, detail: 'Context API and basic Redux' },
        { name: 'Tailwind CSS', level: 85, detail: 'Utility-first styling and responsive design' },
        { name: 'API Integration', level: 75, detail: 'Fetching and handling asynchronous data' },
      ]
    },
    {
      id: 2,
      name: 'Backend',
      icon: <Target size={18} />,
      skills: [
        { name: 'Spring Boot', level: 75, detail: 'Intermediate-Advanced: RESTful services' },
        { name: 'REST API Design', level: 80, detail: 'Clean, scalable endpoint architecture' },
        { name: 'Authentication', level: 70, detail: 'JWT and role-based access control' },
        { name: 'WebSockets', level: 40, detail: 'Real-time communication basics' },
        { name: 'Docker', level: 35, detail: 'Basic containerization and deployment' },
      ]
    },
    {
      id: 3,
      name: 'DSA',
      icon: <Flame size={18} />,
      skills: [
        { name: 'Arrays & Strings', level: 95, detail: 'Advanced problem solving' },
        { name: 'Trees & BST', level: 90, detail: 'Advanced traversal and manipulation' },
        { name: 'Graphs', level: 75, detail: 'Intermediate: BFS, DFS, Dijkstra' },
        { name: 'Dynamic Programming', level: 65, detail: 'Intermediate: Memoization and Tabulation' },
        { name: 'Backtracking', level: 70, detail: 'Intermediate: Recursive exploration' },
      ]
    },
    {
      id: 4,
      name: 'Engineering',
      icon: <BookOpen size={18} />,
      skills: [
        { name: 'System Design', level: 45, detail: 'Basic scalability, caching, and load balancing' },
        { name: 'Git & GitHub', level: 75, detail: 'Version control and collaboration' },
        { name: 'Postman', level: 80, detail: 'API testing and documentation' },
        { name: 'Maven/npm', level: 70, detail: 'Dependency management and build tools' },
        { name: 'Clean Code', level: 80, detail: 'SOLID principles and maintainable architecture' },
      ]
    },
    {
      id: 5,
      name: 'Professional',
      icon: <Coffee size={18} />,
      skills: [
        { name: 'Communication', level: 65, detail: 'Effective technical and team communication' },
        { name: 'Self-Learning', level: 95, detail: 'Proactive skill acquisition and research' },
        { name: 'Problem Solving', level: 85, detail: 'Analytical thinking and logical reasoning' },
        { name: 'German (B1)', level: 45, detail: 'Currently learning for professional relocation' },
        { name: 'Agile/Scrum', level: 70, detail: 'Experience with modern project management' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-near-black/50 rounded-2xl border border-pure-white/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeCategory === cat.id 
                ? 'bg-accent text-pure-white shadow-lg' 
                : 'text-medium-gray hover:text-pure-white hover:bg-pure-white/5'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Skill List */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pill-card border-pure-white/5 p-8 space-y-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-pure-white flex items-center gap-3">
              <span className="p-2 bg-accent/10 rounded-lg text-accent">
                {categories[activeCategory].icon}
              </span>
              {categories[activeCategory].name} Proficiency
            </h3>
          </div>

          <div className="space-y-8">
            {categories[activeCategory].skills.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-pure-white group-hover:text-accent transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-medium-gray">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-pure-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full bg-accent relative"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-pure-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <p className="mt-2 text-xs text-medium-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Radar Chart */}
        <div className="pill-card border-pure-white/5 p-8 flex flex-col items-center justify-center min-h-100">
          <h4 className="text-xs font-bold uppercase tracking-widest text-medium-gray mb-8">Visualization Matrix</h4>
          <div className="w-full h-75">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categories[activeCategory].skills.map(s => ({ subject: s.name, value: s.level }))}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#8E9299', fontSize: 10, fontWeight: 'bold' }} 
                />
                <Radar
                  name="Proficiency"
                  dataKey="value"
                  stroke={accentColor}
                  fill={accentColor}
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-4 bg-accent/5 border border-accent/10 rounded-2xl text-center">
            <p className="text-xs text-accent font-medium italic">
              "Continuous learning is the minimum requirement for success in our field."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillRadar = ({ accentColor }: { accentColor: string }) => {
  const data = [
    { subject: 'DSA', A: 90, fullMark: 100 },
    { subject: 'Backend (Java)', A: 85, fullMark: 100 },
    { subject: 'Frontend (React)', A: 70, fullMark: 100 },
    { subject: 'German Language', A: 45, fullMark: 100 },
    { subject: 'System Design', A: 40, fullMark: 100 },
  ];

  return (
    <div className="w-full h-75">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#8E9299', fontSize: 10, fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke={accentColor}
            fill={accentColor}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ConsistencyHeatmap = () => {
  // Mock data for the last 12 weeks
  const weeks = 12;
  const days = 7;
  const heatmapData = useMemo(() => {
    return Array.from({ length: weeks * days }, (_, i) => ({
      value: Math.floor(Math.random() * 5), // 0 to 4 intensity
      day: i
    }));
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-1 min-w-max">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => {
              const intensity = heatmapData[w * days + d].value;
              return (
                <div 
                  key={d}
                  className={`w-3 h-3 rounded-sm transition-colors duration-500 ${
                    intensity === 0 ? 'bg-pure-white/5' :
                    intensity === 1 ? 'bg-accent/20' :
                    intensity === 2 ? 'bg-accent/40' :
                    intensity === 3 ? 'bg-accent/70' :
                    'bg-accent shadow-[0_0_8px_var(--accent-color)]'
                  }`}
                  title={`Intensity: ${intensity}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-medium-gray">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-sm ${
                i === 0 ? 'bg-pure-white/5' :
                i === 1 ? 'bg-accent/20' :
                i === 2 ? 'bg-accent/40' :
                i === 3 ? 'bg-accent/70' :
                'bg-accent'
              }`} 
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

const SkillLabel = ({ skill, position, color }: { skill: string, position: [number, number, number], color: string }) => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Make text always face the camera
      textRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={hovered ? 0.5 : 0.4}
        color={hovered ? "#ffffff" : color}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {skill}
      </Text>
    </Float>
  );
};

const SkillSphere = ({ accentColor, title, subtitle }: { accentColor: string, title?: string, subtitle?: string }) => {
  const skills = [
    'Java', 'Spring Boot', 'DSA', 'React', 'Tailwind', 
    'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Git',
    'German B1', 'Hibernate', 'REST API', 'Microservices',
    'Spring Security', 'JUnit', 'Maven', 'AWS', 'Linux'
  ];

  return (
    <div className="h-150 w-full bg-near-black/30 rounded-3xl border border-pure-white/5 overflow-hidden relative group">
      <div className="absolute top-8 left-8 z-10">
        <h4 className="text-2xl font-bold text-pure-white mb-2 tracking-tighter">{title || "Technical Ecosystem"}</h4>
        <p className="text-xs text-medium-gray max-w-xs">{subtitle || "Interactive 3D universe of my core competencies and evolving tech stack. Drag to explore."}</p>
      </div>
      
      <div className="w-full h-125 mt-12">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          makeDefault
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={accentColor} />
        
        <Suspense fallback={null}>
          <group>
            {skills.map((skill, i) => {
              const phi = Math.acos(-1 + (2 * i) / skills.length);
              const theta = Math.sqrt(skills.length * Math.PI) * phi;
              const x = 6 * Math.cos(theta) * Math.sin(phi);
              const y = 6 * Math.sin(theta) * Math.sin(phi);
              const z = 6 * Math.cos(phi);
              
              return (
                <SkillLabel key={skill} skill={skill} position={[x, y, z]} color={accentColor} />
              );
            })}
            
            <Sphere args={[3.5, 64, 64]}>
              <MeshDistortMaterial
                color={accentColor}
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
                opacity={0.1}
                transparent
              />
            </Sphere>
            
            {/* Subtle inner glow sphere */}
            <Sphere args={[3.2, 32, 32]}>
              <meshBasicMaterial color={accentColor} transparent opacity={0.05} />
            </Sphere>
          </group>
        </Suspense>
      </Canvas>
      </div>
      
      <div className="absolute bottom-8 right-8 text-[10px] font-bold uppercase tracking-widest text-medium-gray flex items-center gap-2">
        <Activity size={12} className="text-accent animate-pulse" />
        3D Interactive Universe
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -ml-16 -mb-16" />
    </div>
  );
};

const CoffeeChat = ({ t }: { t: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="pill-card border-accent/20 bg-accent/5 p-8 text-center relative overflow-hidden group"
    >
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <MessageCircle size={120} className="text-accent" />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Coffee className="text-accent" size={24} />
        </div>
        <h4 className="text-2xl font-bold text-pure-white mb-2">{t.germany.title}</h4>
        <p className="text-medium-gray text-sm mb-8 max-w-md mx-auto">
          {t.germany.body}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://www.linkedin.com/in/zenparker/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pill-button bg-accent text-pure-white flex items-center gap-2 hover:scale-105 transition-transform no-underline"
          >
            {t.germany.connect} <Linkedin size={16} />
          </a>
          <a 
            href="#contact" 
            className="pill-button border border-pure-white/10 hover:bg-pure-white/5 no-underline"
          >
            {t.germany.message}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [accentIndex, setAccentIndex] = useState(0);
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const t = translations[lang];

  const accentColor = ACCENT_COLORS[accentIndex].value;

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    // Convert hex to rgb for rgba usage
    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  }, [accentColor]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextColor = () => setAccentIndex((prev) => (prev + 1) % ACCENT_COLORS.length);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-pure-white relative overflow-hidden bg-pure-black">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(var(--pure-white) 1px, transparent 1px), linear-gradient(90deg, var(--pure-white) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Animated Blobs */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -150, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
          style={{ background: accentColor } as any}
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -100, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-15"
          style={{ background: accentColor } as any}
        />
        <motion.div
          animate={{
            x: [0, 50, -80, 0],
            y: [0, 80, 120, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-10"
          style={{ background: accentColor } as any}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Navbar 
        accentColor={accentColor} 
        nextColor={nextColor} 
        lang={lang} 
        setLang={setLang} 
        t={t} 
      />

      {/* Floating Scroll Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={scrollToTop}
              className="p-4 rounded-full bg-pure-white text-pure-black border border-pure-white/10 hover:scale-110 transition-transform cursor-pointer hover:bg-accent hover:text-pure-white"
              aria-label="Scroll to top"
            >
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowDown size={20} className="rotate-180" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={scrollToBottom}
          className="p-4 rounded-full bg-near-black text-pure-white border border-pure-white/10 hover:scale-110 transition-transform cursor-pointer hover:border-accent"
          aria-label="Scroll to bottom"
        >
          <motion.div animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown size={20} />
          </motion.div>
        </motion.button>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20 space-y-24">
        
        {/* SECTION 1: HERO */}
        <section id="home" className="min-h-[75vh] flex flex-col justify-center items-start relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="pill-badge bg-near-black border-accent/30 text-accent">{t.hero.focus}</span>
                  <span className="pill-badge bg-near-black border-pure-white/10">🇩🇪 {t.stats.german}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] text-pure-white">
                  {t.hero.greeting} <br />
                  <span className="text-accent">Zaheer Ali Shaikh</span> 👋
                </h1>
                <p className="text-xl md:text-2xl text-medium-gray max-w-2xl mb-10 leading-relaxed">
                  {t.hero.role} | {t.hero.target}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#projects" className="pill-button bg-accent text-pure-white flex items-center gap-2 no-underline hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow" style={{ boxShadow: `0 0 20px ${accentColor}44` }}>
                    {lang === 'en' ? 'View My Work' : 'Meine Projekte'} <ArrowDown size={18} />
                  </a>
                  <a href="#contact" className="pill-button border border-pure-white/10 hover:bg-pure-white/5 no-underline">
                    {lang === 'en' ? 'Contact Me' : 'Kontaktieren Sie mich'}
                  </a>
                </div>
              </div>

              {/* Integrated Live Status */}
              <div className="w-full lg:w-80">
                <div className="pill-card border-accent/20 bg-accent/5 p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity size={80} className="text-accent" />
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{t.stats.live}</span>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Code2 size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-medium-gray uppercase font-bold tracking-widest mb-1">{t.stats.coding}</div>
                        <div className="text-sm font-medium text-pure-white">{lang === 'en' ? 'Mastering Java Collections' : 'Java Collections meistern'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Globe size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-medium-gray uppercase font-bold tracking-widest mb-1">German</div>
                        <div className="text-sm font-medium text-pure-white">{lang === 'en' ? 'B1 Grammar: Passive Voice' : 'B1 Grammatik: Passiv'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Target size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] text-medium-gray uppercase font-bold tracking-widest mb-1">{t.stats.next}</div>
                        <div className="text-sm font-medium text-pure-white">{lang === 'en' ? 'Spring Security Integration' : 'Spring Security Integration'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-accent/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-accent/60 uppercase tracking-widest">{t.stats.updated}: {lang === 'en' ? 'Just Now' : 'Gerade eben'}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-accent/40" />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: ABOUT ME */}
        <section id="about" className="scroll-mt-32">
          <SectionHeading title={t.nav.about} subtitle={lang === 'en' ? "My journey from a Diploma student to an aspiring engineer in Germany." : "Mein Weg vom Diplomstudenten zum angehenden Ingenieur in Deutschland."} />
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div className="flex flex-col space-y-8 text-base leading-relaxed text-medium-gray h-full justify-center">
              <div className="space-y-6">
                <p>
                  {lang === 'en' 
                    ? "I am a dedicated Computer Science Engineering student with a clear vision: becoming a Software Engineer in Germany. My technical journey began in February 2025, following the completion of my Diploma."
                    : "Ich bin ein engagierter Informatikstudent mit einer klaren Vision: Softwareentwickler in Deutschland zu werden. Meine technische Reise begann im Februar 2025, nach Abschluss meines Diploms."}
                </p>
                <p>
                  {lang === 'en'
                    ? "I believe in transparency and continuous growth. My goal is to reach C1 proficiency in German by 2031, coinciding with my career start in Europe."
                    : "Ich glaube an Transparenz und kontinuierliches Wachstum. Mein Ziel ist es, bis 2031 das C1-Niveau in Deutsch zu erreichen, zeitgleich mit meinem Karrierestart in Europa."}
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="pill-card flex-1 flex flex-col border-accent/10 p-8">
                  <h4 className="font-bold mb-6 text-pure-white flex items-center gap-3 text-base">
                    <Target size={20} className="text-accent" /> Current Status
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm flex-1">
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">Education</span>
                      <span className="font-medium text-pure-white">B.E CSE</span>
                    </div>
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">Diploma</span>
                      <span className="font-medium text-pure-white">75%</span>
                    </div>
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">Location</span>
                      <span className="font-medium text-pure-white">Mumbai</span>
                    </div>
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">German</span>
                      <span className="font-medium text-pure-white">B1 Level</span>
                    </div>
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">Focus</span>
                      <span className="font-medium text-pure-white">Java/DSA</span>
                    </div>
                    <div className="flex justify-between border-b border-pure-white/5 pb-3">
                      <span className="text-medium-gray">Target</span>
                      <span className="font-medium text-pure-white">Germany 🇩🇪</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-pure-white/5 flex flex-col sm:flex-row gap-6 items-center justify-between">
                    <a 
                      href="https://jumpshare.com/share/ZSuPdKZGvXJN2Ujwb2Y4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pill-button bg-pure-white text-pure-black text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-pure-white transition-all px-8 py-3 inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download CV
                    </a>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-medium-gray">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                      Available
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-4xl overflow-hidden bg-near-black border border-pure-white/5 shadow-2xl group aspect-2/3 w-full max-w-125 mx-auto md:mx-0">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                src="https://iili.io/qKOcuFs.png" 
                alt="Zaheer Ali Shaikh" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-pure-black/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SECTION 3A: SKILLS */}
        <section id="skills" className="scroll-mt-32">
          <SectionHeading title="Complete Skill Matrix" subtitle="A refined and structured breakdown of my technical and professional capabilities." />
          
          <InteractiveSkillMatrix accentColor={accentColor} />
        </section>

        {/* SECTION 3B: LEARNING ROADMAP */}
        <section className="scroll-mt-32">
          <SectionHeading title="Learning Roadmap" subtitle="The phases of my technical evolution." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { phase: 'Foundations', date: 'Feb - June 2025', desc: 'Java Basics, Arrays, Strings, 50+ DSA, HTML/CSS.' },
              { phase: 'Backend Dev', date: 'June - Dec 2025', desc: 'Spring Boot, SQL, Advanced DSA, React Basics.' },
              { phase: 'Advanced Topics', date: '2026 - 2027', desc: 'System Design, Microservices, Cloud Basics, German B2/C1.' }
            ].map((p, i) => (
              <div key={i} className="pill-card flex flex-col justify-between border-pure-white/5 hover:border-accent/30">
                <div>
                  <div className="text-xs font-bold text-accent mb-2">PHASE 0{i+1}</div>
                  <h4 className="text-xl font-bold mb-2 text-pure-white">{p.phase}</h4>
                  <p className="text-sm text-medium-gray">{p.desc}</p>
                </div>
                <div className="mt-6 text-sm font-medium text-pure-white">{p.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="scroll-mt-32">
          <SectionHeading title="Projects" subtitle="From completed works to future ambitions, categorized by technical complexity." />
          <div className="space-y-16">
            {['TIER 1 (Basics)', 'TIER 2 (Full-Stack)', 'TIER 3 (Fintech-Relevant)', 'TIER 4 (Advanced)'].map(tier => (
              <div key={tier}>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-gray mb-8 border-b border-pure-white/5 pb-2 flex items-center gap-4">
                  <span className="w-1 h-4 bg-accent rounded-full" />
                  {tier}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {PROJECTS.filter(p => p.tier === tier).map((p, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="pill-card group border-pure-white/5 hover:border-accent/30 transition-all bg-near-black/50 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold group-hover:text-accent transition-colors text-pure-white">{p.title}</h3>
                        <span className={`pill-badge text-[10px] ${
                          p.status === 'completed' ? 'bg-accent text-pure-white border-none' : 
                          p.status === 'in-progress' ? 'border-accent/30 text-accent' : 
                          'text-medium-gray border-pure-white/10'
                        }`}>
                          {p.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-medium-gray mb-6 leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tech.map(t => <span key={t} className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-pure-white/5 text-medium-gray border border-pure-white/5">{t}</span>)}
                      </div>
                      {p.metrics && <div className="text-xs font-mono text-accent mb-4">{p.metrics}</div>}
                      {p.link && (
                        <a href={p.link} className="inline-flex items-center gap-2 text-sm font-bold border-b border-accent text-accent pb-1 no-underline hover:gap-3 transition-all">
                          Live Demo <ExternalLink size={14} />
                        </a>
                      )}
                      
                      {p.caseStudy && (
                        <div className="mt-8 pt-6 border-t border-pure-white/5 space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                            <Layers size={12} /> {t.projects.caseStudy}
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              { label: t.projects.problem, val: p.caseStudy.problem },
                              { label: t.projects.approach, val: p.caseStudy.approach },
                              { label: t.projects.challenges, val: p.caseStudy.challenges },
                              { label: t.projects.solutions, val: p.caseStudy.solutions },
                              { label: t.projects.learnings, val: p.caseStudy.learnings }
                            ].map(item => (
                              <div key={item.label} className="space-y-1">
                                <div className="text-[8px] font-bold uppercase tracking-widest text-medium-gray">{item.label}</div>
                                <p className="text-xs text-pure-white/80 leading-relaxed">{item.val}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-32">
          <SectionHeading title="Coding Journey" subtitle="Real-time tracking of my problem-solving progress and technical milestones." />
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <GitHubStats username="zenparker" />
            <LeetCodeStats username="zenparker" />
          </div>

          {/* Most Used Programming Languages */}
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-medium-gray mb-6 border-b border-pure-white/5 pb-2 flex items-center gap-4">
              <span className="w-1 h-4 bg-accent rounded-full" />
              Most Used Programming Languages
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Java', usage: '90%', projects: '12+', icon: '☕', color: 'from-orange-500 to-red-500' },
                { name: 'JavaScript', usage: '75%', projects: '8+', icon: '📜', color: 'from-yellow-400 to-yellow-600' },
                { name: 'TypeScript', usage: '70%', projects: '5+', icon: '🔷', color: 'from-blue-400 to-blue-600' },
                { name: 'SQL', usage: '75%', projects: '10+', icon: '🗄️', color: 'from-purple-400 to-purple-600' },
                { name: 'HTML/CSS', usage: '70%', projects: '8+', icon: '🎨', color: 'from-pink-400 to-orange-400' },
                { name: 'Python', usage: '40%', projects: '3+', icon: '🐍', color: 'from-blue-500 to-yellow-500' },
              ].map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pill-card border-pure-white/5 hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{lang.icon}</span>
                      <div>
                        <h4 className="font-bold text-pure-white group-hover:text-accent transition-colors">{lang.name}</h4>
                        <p className="text-xs text-medium-gray">{lang.projects} Projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{lang.usage}</div>
                      <div className="text-[8px] uppercase tracking-widest text-medium-gray">Proficiency</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-pure-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: lang.usage }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-linear-to-r ${lang.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="pill-card text-center border-pure-white/5">
              <div className="text-4xl font-bold mb-1 text-pure-white">50+</div>
              <div className="text-xs uppercase tracking-widest text-medium-gray">Solved</div>
            </div>
            <div className="pill-card text-center border-pure-white/5">
              <div className="text-4xl font-bold mb-1 text-pure-white">500</div>
              <div className="text-xs uppercase tracking-widest text-medium-gray">Target</div>
            </div>
            <div className="pill-card text-center border-accent/20 bg-accent/5">
              <div className="text-4xl font-bold mb-1 flex items-center justify-center gap-2 text-accent">7 <Flame size={24} /></div>
              <div className="text-xs uppercase tracking-widest text-accent/70">Day Streak</div>
            </div>
            <div className="pill-card text-center border-pure-white/5">
              <div className="text-4xl font-bold mb-1 text-pure-white">Feb 25</div>
              <div className="text-xs uppercase tracking-widest text-medium-gray">Started</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="pill-card border-pure-white/5">
              <h4 className="font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-pure-white">Consistency Heatmap</h4>
              <ConsistencyHeatmap />
              <div className="mt-6 pt-6 border-t border-pure-white/5">
                <h4 className="font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-pure-white">Topic-wise Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { topic: 'Arrays & Strings', count: 120, color: 'bg-accent' },
                    { topic: 'Searching & Sorting', count: 80, color: 'bg-medium-gray' },
                    { topic: 'Linked Lists', count: 45, color: 'bg-accent/60' },
                    { topic: 'Trees & Graphs', count: 60, color: 'bg-accent' },
                    { topic: 'Dynamic Programming', count: 30, color: 'bg-medium-gray' },
                    { topic: 'Recursion & Backtracking', count: 25, color: 'bg-accent/60' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1 text-medium-gray">
                        <span>{item.topic}</span>
                        <span className="font-bold text-pure-white">{item.count}</span>
                      </div>
                      <div className="h-1 w-full bg-pure-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 150) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pill-card border-pure-white/5">
              <h4 className="font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-pure-white">Recent Solved Problems</h4>
              <div className="space-y-3">
                {[
                  { id: '001', title: 'Two Sum', difficulty: 'Easy', date: '2025-02-22' },
                  { id: '015', title: '3Sum', difficulty: 'Medium', date: '2025-02-21' },
                  { id: '042', title: 'Trapping Rain Water', difficulty: 'Hard', date: '2025-02-20' },
                  { id: '121', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', date: '2025-02-19' },
                  { id: '200', title: 'Number of Islands', difficulty: 'Medium', date: '2025-02-18' },
                ].map((prob, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b border-pure-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-medium-gray">#{prob.id}</span>
                      <span className="font-medium text-pure-white">{prob.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                        prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-rose-500/10 text-rose-600'
                      }`}>{prob.difficulty}</span>
                      <span className="text-[10px] text-medium-gray">{prob.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pill-card border-accent/20 bg-accent/5">
            <h4 className="font-bold mb-4 text-accent">Learning Insights</h4>
            <p className="text-accent/80 italic">
              "Focusing on Arrays and Two-Pointer techniques this week. Understanding the time complexity of nested loops was a major breakthrough. Consistency is the only hack."
            </p>
          </div>
        </section>

        <section className="scroll-mt-32">
          <div className="pill-card bg-pure-white text-pure-black p-12 text-center border-none overflow-hidden relative group">
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 relative z-10">The 12-Year Manifesto</h2>
            <p className="text-lg md:text-xl text-pure-black/70 max-w-2xl mx-auto mb-10 relative z-10">
              I am not just building code; I am building a life. From Mumbai to Germany, every line of Java and every German word learned is a step toward excellence.
            </p>
            <div className="max-w-md mx-auto relative z-10">
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Join my journey (Email)" 
                  className="w-full rounded-full px-8 py-4 bg-pure-black/5 border border-pure-black/10 text-pure-black placeholder:text-pure-black/40 focus:outline-none focus:border-accent transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-accent text-pure-white font-bold text-sm hover:scale-105 transition-transform cursor-pointer">
                  Join
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="scroll-mt-32">
          <SectionHeading title="Resources" subtitle="The tools and mentors shaping my learning." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Courses', items: ['Kunal Kushwaha Java+DSA', 'Striver\'s A2Z', 'The Odin Project'] },
              { title: 'Books', items: ['Head First Java', 'Cracking the Coding Interview'] },
              { title: 'Tools', items: ['VS Code', 'IntelliJ IDEA', 'Git/GitHub'] },
              { title: 'Communities', items: ['LeetCode', 'Stack Overflow', 'Discord Dev Groups'] }
            ].map((r, i) => (
              <div key={i} className="pill-card border-pure-white/5 hover:border-accent/30 transition-colors">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-pure-white"><BookOpen size={16} className="text-accent" /> {r.title}</h4>
                <ul className="space-y-2 text-sm text-medium-gray">
                  {r.items.map(item => <li key={item} className="flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-32">
          <SectionHeading title="Learning Log" subtitle="Weekly reflections and technical updates." />
          <div className="space-y-4">
            {[
              { date: 'Feb 21, 2025', title: 'Week 2: Mastering Array Manipulations', type: 'Update' },
              { date: 'Feb 14, 2025', title: 'Day 1: The Beginning of the 12-Year Plan', type: 'Reflection' }
            ].map((post, i) => (
              <div key={i} className="pill-card flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-pure-white/5 hover:border-accent/30 transition-colors group">
                <div>
                  <div className="text-xs font-mono text-medium-gray mb-1">{post.date}</div>
                  <h4 className="text-xl font-bold text-pure-white group-hover:text-accent transition-colors">{post.title}</h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="pill-badge border-accent/20 text-accent">{post.type}</span>
                  <button className="p-2 rounded-full hover:bg-pure-white/5 cursor-pointer text-pure-white"><ChevronRight size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="journey" className="scroll-mt-32">
          <SectionHeading title="12-Year Roadmap" subtitle="A precise vision from Mumbai to Germany (2025 - 2036)." />
          
          {/* Archive Filters */}
          <div className="flex flex-wrap gap-2 mb-12 ml-0 md:ml-6">
            {['All', '2025', '2026-2029', '2030-2036'].map(filter => (
              <button key={filter} className="pill-badge hover:bg-accent hover:text-pure-white hover:border-accent transition-colors cursor-pointer text-medium-gray border-pure-white/10">
                {filter}
              </button>
            ))}
          </div>

          <div className="relative border-l border-pure-white/10 ml-4 md:ml-14 pl-8 space-y-12">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-13.25 top-0 w-10 h-10 rounded-full border-4 border-pure-black flex items-center justify-center text-[10px] font-bold transition-colors ${
                  item.status === 'completed' ? 'bg-accent text-pure-white' : 
                  item.status === 'current' ? 'bg-pure-white text-pure-black animate-pulse' : 
                  'bg-near-black text-medium-gray border-pure-white/10'
                }`}>
                  {i + 1}
                </div>
                <div className="pill-card border-pure-white/5 hover:border-accent/20 transition-colors">
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <span className="text-sm font-bold text-accent">{item.year}</span>
                    <span className="text-[10px] uppercase tracking-tighter pill-badge border-pure-white/10 text-medium-gray">{item.type}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-pure-white">{item.title}</h4>
                  <p className="text-sm text-medium-gray">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-32">
          <SectionHeading title="Contact" subtitle="Let's build something meaningful together." />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="pill-card border-pure-white/5">
                <h4 className="font-bold mb-6 text-pure-white">{t.contact.title}</h4>
                <div className="space-y-4">
                  <a href="mailto:zaheerocean@gmail.com" className="flex items-center gap-4 group no-underline text-inherit">
                    <div className="p-3 rounded-full bg-near-black border border-pure-white/5 group-hover:border-accent group-hover:scale-110 transition-all"><Mail size={20} className="text-accent" /></div>
                    <div>
                      <div className="text-xs text-medium-gray">Email</div>
                      <div className="font-medium text-pure-white">zaheerocean@gmail.com</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-near-black border border-pure-white/5"><MapPin size={20} className="text-accent" /></div>
                    <div>
                      <div className="text-xs text-medium-gray">Location</div>
                      <div className="font-medium text-pure-white">Mumbai → Germany</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {[
                  { icon: <Github size={20} />, link: 'https://github.com/zenparker' },
                  { icon: <Linkedin size={20} />, link: 'https://linkedin.com/in/zenparker' },
                  { icon: <Instagram size={20} />, link: 'https://instagram.com/zenpark3r' },
                  { icon: <Twitter size={20} />, link: 'https://twitter.com/zenpark3r' },
                  { icon: <Code2 size={20} />, link: 'https://leetcode.com/zenparker' }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="p-4 rounded-full border border-pure-white/10 hover:bg-accent hover:text-pure-white hover:border-accent transition-all duration-300 text-pure-white">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="pill-card border-pure-white/5">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 ml-4 text-medium-gray">{t.contact.name}</label>
                  <input type="text" placeholder="John Doe" className="w-full rounded-full px-6 py-3 bg-pure-black border border-pure-white/10 focus:outline-none focus:border-accent transition-colors text-pure-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 ml-4 text-medium-gray">{t.contact.email}</label>
                  <input type="email" placeholder="john@example.com" className="w-full rounded-full px-6 py-3 bg-pure-black border border-pure-white/10 focus:outline-none focus:border-accent transition-colors text-pure-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 ml-4 text-medium-gray">{t.contact.message}</label>
                  <textarea rows={4} placeholder={lang === 'en' ? "Your message here..." : "Ihre Nachricht hier..."} className="w-full rounded-2xl px-6 py-3 bg-pure-black border border-pure-white/10 focus:outline-none focus:border-accent transition-colors resize-none text-pure-white" />
                </div>
                <button className="pill-button w-full bg-accent text-pure-white mt-4 cursor-pointer hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all" style={{ boxShadow: `0 0 20px ${accentColor}44` }}>
                  {t.contact.send}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="scroll-mt-32">
          <CoffeeChat t={t} />
        </section>

        <footer className="pt-20 border-t border-pure-white/5">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-4 text-accent">{t.footer.stats}</h5>
              <ul className="space-y-2 text-sm text-medium-gray">
                <li className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {t.stats.days}: 15</li>
                <li className="flex items-center gap-2"><Flame size={14} className="text-accent" /> {t.stats.solved}: 50+ 🔥</li>
                <li className="flex items-center gap-2"><Coffee size={14} className="text-accent" /> {t.stats.german}: 30-day streak</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-4 text-accent">{t.footer.focus}</h5>
              <ul className="space-y-2 text-sm text-medium-gray">
                <li>Java Methods & Arrays</li>
                <li>Calculator App (50%)</li>
                <li>German A1 Vocabulary</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-4 text-accent">{t.footer.transparency}</h5>
              <p className="text-xs text-medium-gray leading-relaxed">
                {t.footer.transparencyBody}
              </p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <div className="text-2xl font-bold tracking-tighter text-pure-white">Zaheer Ali Shaikh</div>
              <div className="text-xs text-medium-gray">Last Updated: Feb 2025</div>
            </div>
          </div>
          <div className="text-center text-[10px] text-medium-gray uppercase tracking-[0.2em]">
            © 2025 Zaheer Ali Shaikh • Built with Precision
          </div>
        </footer>

      </main>
    </div>
  );
}
