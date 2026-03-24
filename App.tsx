import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Terminal, 
  User, 
  BookOpen, 
  Code, 
  Award, 
  Mail, 
  Cpu, 
  Zap, 
  Github, 
  Briefcase, 
  Layers,
  Globe,
  LucideIcon
} from 'lucide-react';

type Language = 'zh' | 'en';

// --- Types ---

interface Stat {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface Paper {
  year: string;
  title: string;
  conf: string;
  tags: string[];
  authors: string;
}

interface Project {
  name: string;
  desc: string;
  stack: string;
  subProjects?: string[];
}

interface TimelineItem {
  period: string;
  title: string;
  org: string;
}

interface ProfileData {
  name: string;
  title: string;
  level: string;
  bio: string;
  stats: Stat[];
  papers: Paper[];
  projects: Project[];
  email: string;
}

// --- Configuration & I18n ---

const BIRTHDAY = "2000-05-08";

const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const TRANSLATIONS = {
  zh: {
    name: "裴宇航",
    title: "东北大学博士 | 美团大模型实习",
    bio: "东北大学软件学院博士研究生，研究方向为时间序列分析与大模型应用。在美团实习期间参与大模型商业增值业务。发表多篇学术论文，包括SIGKDD、EMNLP等国际顶级会议。曾参与多个工业级AI系统研发，涵盖军工、能源、制造等领域。",
    stats: [
      { label: "工程落地", value: 99, max: 100, color: "bg-green-500" },
      { label: "模型创新", value: 92, max: 100, color: "bg-blue-500" },
      { label: "全栈能力", value: 95, max: 100, color: "bg-yellow-500" },
      { label: "睡眠时间", value: 15, max: 100, color: "bg-red-600" }, 
    ],
    nav: {
      profile: "个人信息",
      timeline: "履历",
      papers: "学术发表",
      projects: "核心项目",
      contact: "联系方式"
    },
    ui: {
      online: "在线",
      level: "等级",
      domains: "研究领域",
      timeline: "时间线",
      publications: "学术论文",
      projectsBuild: "项目落地",
      connectProtocol: "通信协议",
      systemNormal: "系统正常",
      mem: "内存",
      recommend: "建议: 桌面终端访问"
    },
    timeline: [
      { period: "2018 - 2022", title: "本科生", org: "东北大学软件学院" },
      { period: "2022 - 至今", title: "博士生", org: "东北大学软件学院" },
      { period: "2025.08 - 2026.03", title: "算法策略实习生", org: "美团" },
    ],
    projects: [
      { name: "中国航发沈阳发动机所", desc: "性能评判系统核心模块设计与实现。", stack: "Industrial / Java" },
      { name: "宁德时代 (CATL)", desc: "锂矿粒度识别系统算法建模与部署。", stack: "CV / Edge Computing" },
      { name: "中航工业", desc: "软件可靠性保障、缺陷检测及知识图谱分析。", stack: "Knowledge Graph" },
      { name: "鞍钢集团", desc: "数字总师系统研发，辅助高层决策。", stack: "Data Viz" },
      { name: "海军研究院", desc: "导弹测控方案自动优化与生成系统。", stack: "Algorithm / Military" },
      { name: "华电 & 中煤科", desc: "工业视觉巡检系统，多地煤矿实地部署。", stack: "CV / IoT" },
      { name: "知识库智能体 (Agent)", desc: "为中钢、电网等多企搭建 RAG 问答系统。", stack: "LLM / RAG" },
      { name: "626所", desc: "基于大模型的飞机外形智能设计平台。", stack: "Generative AI" },
      { name: "行业全栈研发 (Team Lead)", desc: "带领团队完成十余个大型系统开发。", stack: "Leadership", subProjects: ["成远矿业系统", "辽宁歌剧院APP", "刑事警察学院禁毒网"] }
    ]
  },
  en: {
    name: "Yuhang Pei",
    title: "PhD @ NEU | Intern @ Meituan LLM",
    bio: "PhD candidate at Software College, Northeastern University. Research focuses on time series analysis and LLM applications. Intern at Meituan working on LLM monetization. Published papers at top conferences including SIGKDD and EMNLP. Experienced in developing industrial AI systems across defense, energy, and manufacturing sectors.",
    stats: [
      { label: "Engineering", value: 99, max: 100, color: "bg-green-500" },
      { label: "Innovation", value: 92, max: 100, color: "bg-blue-500" },
      { label: "Full Stack", value: 95, max: 100, color: "bg-yellow-500" },
      { label: "Sleep Time", value: 15, max: 100, color: "bg-red-600" }, 
    ],
    nav: {
      profile: "Profile",
      timeline: "Timeline",
      papers: "Papers",
      projects: "Projects",
      contact: "Contact"
    },
    ui: {
      online: "ONLINE",
      level: "LV.",
      domains: "DOMAINS",
      timeline: "TIMELINE",
      publications: "PUBLICATIONS",
      projectsBuild: "PROJECT_BUILD",
      connectProtocol: "CONNECT_PROTOCOL",
      systemNormal: "SYSTEM_NORMAL",
      mem: "MEM",
      recommend: "RECOMMEND: DESKTOP TERMINAL"
    },
    timeline: [
      { period: "2018 - 2022", title: "Undergraduate", org: "Software College, Northeastern University" },
      { period: "2022 - Present", title: "PhD Candidate", org: "Software College, Northeastern University" },
      { period: "2025.08 - 2026.03", title: "Algorithm Strategy Intern", org: "Meituan" },
    ],
    projects: [
      { name: "AECC Shenyang", desc: "Performance evaluation system for engines.", stack: "Industrial / Java" },
      { name: "CATL", desc: "Lithium ore granularity recognition system.", stack: "CV / Edge Computing" },
      { name: "AVIC", desc: "Software reliability and defect detection analysis.", stack: "Knowledge Graph" },
      { name: "Ansteel Group", desc: "Digital Chief Engineer system for decision support.", stack: "Data Viz" },
      { name: "Navy Research", desc: "Missile test & control optimization system.", stack: "Algorithm / Military" },
      { name: "Huadian & CCTEG", desc: "Industrial visual inspection for coal mines.", stack: "CV / IoT" },
      { name: "RAG Agents", desc: "LLM Agents for Sinosteel, State Grid, etc.", stack: "LLM / RAG" },
      { name: "Institute 626", desc: "AI-based aircraft aerodynamic design platform.", stack: "Generative AI" },
      { name: "Lead Full Stack", desc: "Led team to deliver 10+ enterprise systems.", stack: "Leadership", subProjects: ["Mining Management", "Opera House App", "E-learning Platforms"] }
    ]
  }
};

const PAPERS = [
  { 
    year: "2026", 
    title: "Dual Data-centric Separation with Circular Mixup for Noise-resistant Time Series Learning", 
    conf: "SIGKDD 2026", 
    tags: ["Time Series", "Data-Centric"],
    authors: "Yuhang Pei, Fanchun Meng, Qinghua Ran, Tao Ren, Yifan Wang, Wei Ju, Zimo Wang, Xian-Sheng Hua, Xiao Luo"
  },
  { 
    year: "2025", 
    title: "LEAF: Large Language Diffusion Model for Time Series Forecasting", 
    conf: "EMNLP 2025 (Findings)", 
    tags: ["LLM", "Diffusion", "Forecasting"],
    authors: "Y Pei, T Ren, Y Wang, Z Sun, W Ju, C Chen, XS Hua, X Luo"
  },
  { 
    year: "2024", 
    title: "Policy distillation for efficient decentralized execution in multi-agent reinforcement learning", 
    conf: "Neurocomputing 626", 
    tags: ["MARL", "RL", "SCI Q1"],
    authors: "Y Pei, T Ren, Y Zhang, Z Sun, M Champeyrol"
  },
];

const EMAIL = "peiyh@mails.neu.edu.cn";

// --- Components ---

interface PixelButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
}

const PixelButton: React.FC<PixelButtonProps> = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`
      relative group flex items-center gap-2 px-4 py-3 w-full font-mono text-sm uppercase tracking-widest transition-all duration-75 outline-none
      ${active 
        ? 'bg-indigo-600 text-white translate-x-[2px] translate-y-[2px] shadow-none' 
        : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-900'
      }
    `}
  >
    {Icon && <Icon size={16} className={active ? "animate-pulse" : ""} />}
    <span>{children}</span>
    {/* Pixel corner decoration */}
    {!active && (
      <>
        <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-black opacity-20"></div>
      </>
    )}
  </button>
);

interface PixelCardProps {
  children: React.ReactNode;
  title: string;
  color?: string;
}

const PixelCard: React.FC<PixelCardProps> = ({ children, title, color = "border-slate-700" }) => (
  <div className={`relative bg-slate-900 border-4 ${color} p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]`}>
    <div className="absolute -top-3 left-4 bg-slate-900 px-2 font-bold font-mono text-xs tracking-widest uppercase text-slate-300 border border-slate-700">
      {title}
    </div>
    {children}
  </div>
);

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => (
  <div className="h-4 w-full bg-slate-800 border-2 border-slate-900 relative mt-1">
    <div 
      className={`h-full ${color} transition-all duration-1000 ease-out`}
      style={{ width: `${(value / max) * 100}%` }}
    >
      <div className="w-full h-[2px] bg-white opacity-30 mt-[2px]"></div>
    </div>
    <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="w-[1px] h-full bg-slate-900 opacity-20"></div>
      ))}
    </div>
  </div>
);

const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 20 }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}<span className="animate-blink">_</span></span>;
};

// --- Boot Sequence Component ---

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const bootLines = [
      "INITIALIZING ACADEMIC KERNEL...",
      "LOADING MODULES: [NEU_PHD] [MEITUAN_LLM] [PROJECTS]",
      "LOADING DATABASE: SIGKDD... EMNLP... LOADED.",
      "MOUNTING SYSTEM INTERFACE...",
      "WELCOME, PEI YUHANG.",
    ];

    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 150 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 400);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-sm p-8 z-50 flex flex-col items-start justify-end pb-20">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">{`> ${line}`}</div>
      ))}
      <div className="animate-pulse mt-2">_</div>
    </div>
  );
};

// --- Main App Component ---

export default function PixelPortfolio() {
  const [booted, setBooted] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState('profile');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const d = TRANSLATIONS[lang];
  const age = useMemo(() => calculateAge(BIRTHDAY), []);

  // References for scrolling
  const sectionRefs = {
    profile: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    papers: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 10,
        y: (e.clientY / window.innerHeight) * 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (key: keyof typeof sectionRefs) => {
    setActiveTab(key);
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleLang = () => setLang(prev => prev === 'zh' ? 'en' : 'zh');

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* 1. Background Grid & Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
           style={{ 
             backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`
           }}>
      </div>
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <filter id='noiseFilter'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
        </svg>
      </div>
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>

      {/* 2. Main Container */}
      <main className="relative z-10 container mx-auto max-w-6xl p-4 md:p-8 h-screen flex flex-col md:flex-row gap-6">
        
        {/* Sidebar (Fixed on Desktop) */}
        <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
          
          {/* Avatar Card */}
          <div className="bg-slate-900 border-4 border-slate-200 p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]">
            <div className="bg-indigo-600 h-48 w-full mb-4 flex items-center justify-center relative overflow-hidden group">
               {/* Pixel Avatar SVG Placeholder */}
              <svg viewBox="0 0 24 24" className="w-32 h-32 text-white fill-current transition-transform group-hover:scale-105" style={{ imageRendering: 'pixelated' }}>
                <path d="M4 4h16v2H4zM4 6h2v2h12V6h2v6h-2v4h-2v4h-2v-2h-4v2H6v-4H4V6z" opacity="0.2"/>
                <rect x="8" y="8" width="2" height="2" fill="black"/>
                <rect x="14" y="8" width="2" height="2" fill="black"/>
                <path d="M4 18h16v4H4z" opacity="0.5" />
              </svg>
               <div className="absolute bottom-2 right-2 bg-black text-green-400 text-xs px-1 border border-green-500 animate-pulse">{d.ui.online}</div>
              <div className="absolute top-2 left-2 text-[10px] text-white opacity-50 font-bold">{d.ui.level} {age}</div>
            </div>
            
            <h1 className="text-2xl font-bold text-center uppercase tracking-tighter mb-1">{d.name}</h1>
            <p className="text-xs text-center text-indigo-400 mb-4 font-bold px-2">{d.title}</p>
            
            <div className="space-y-4 text-xs px-1 mb-2">
              {d.stats.map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1 font-bold text-slate-300">
                    <span>{stat.label}</span>
                    <span className={stat.value < 30 ? "text-red-500 animate-pulse" : "text-slate-200"}>
                        {stat.value}/{stat.max}
                    </span>
                  </div>
                  <ProgressBar value={stat.value} max={stat.max} color={stat.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2">
            <PixelButton active={activeTab === 'profile'} onClick={() => scrollToSection('profile')} icon={User}>
              {d.nav.profile}
            </PixelButton>
            <PixelButton active={activeTab === 'timeline'} onClick={() => scrollToSection('timeline')} icon={Award}>
              {d.nav.timeline}
            </PixelButton>
            <PixelButton active={activeTab === 'papers'} onClick={() => scrollToSection('papers')} icon={BookOpen}>
              {d.nav.papers}
            </PixelButton>
            <PixelButton active={activeTab === 'projects'} onClick={() => scrollToSection('projects')} icon={Cpu}>
              {d.nav.projects}
            </PixelButton>
            <PixelButton active={activeTab === 'contact'} onClick={() => scrollToSection('contact')} icon={Mail}>
              {d.nav.contact}
            </PixelButton>
          </nav>

          <div className="flex flex-col gap-2 mt-auto md:mt-2">
            <PixelButton active={false} onClick={toggleLang} icon={Globe}>
              {lang === 'zh' ? 'Switch to English' : '切换为中文'}
            </PixelButton>
            
            <div className="flex justify-center gap-4 pb-20 md:pb-0 mt-2">
              <a href="https://github.com/YuhangPei" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-indigo-400 hover:-translate-y-1 transition-transform" title="Github"><Github size={20}/></a>
              <a href="https://scholar.google.com/citations?user=O959C4AAAAAJ" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-400 hover:-translate-y-1 transition-transform" title="Google Scholar"><BookOpen size={20}/></a>
              <a href={`mailto:${EMAIL}`} className="p-2 hover:text-green-400 hover:-translate-y-1 transition-transform" title="Email"><Mail size={20}/></a>
            </div>
          </div>
        </aside>

        {/* Main Screen (Scrollable) */}
        <section className="flex-1 h-full overflow-hidden relative">
          <div className="bg-slate-800/90 border-4 border-indigo-500/50 p-1 h-full flex flex-col shadow-[0_0_20px_rgba(79,70,229,0.2)] backdrop-blur-sm">
             {/* Screen Header / Status Bar */}
            <div className="bg-indigo-900/80 text-indigo-200 text-xs p-2 flex justify-between items-center mb-4 border-b-2 border-indigo-800/50 flex-shrink-0">
              <div className="flex gap-2 items-center">
                <Terminal size={12} />
                <span className="uppercase">SYS.ROOT@PEI_YUHANG:~/{activeTab}</span>
              </div>
              <div className="flex gap-3">
                 <span className="animate-pulse text-green-400">● {d.ui.systemNormal}</span>
                 <span className="hidden sm:inline">{d.ui.mem}: 64TB</span>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-4 md:p-8 flex-1 overflow-y-auto scrollbar-hide space-y-16 pb-24">
              
              {/* --- 1. Profile Section --- */}
              <div ref={sectionRefs.profile} className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-4">
                <div className="flex items-center gap-2 mb-4 text-green-400 border-b border-green-900/50 pb-2">
                  <User size={18} />
                  <h2 className="font-bold text-lg tracking-widest">PROFILE_MODULE</h2>
                </div>
                
                <PixelCard title="BIO_DATA" color="border-green-500">
                  <div className="font-mono text-sm leading-relaxed text-green-200 min-h-[80px]">
                    <span className="text-green-500 mr-2">{`>`}</span>
                    <TypewriterText text={d.bio} />
                  </div>
                </PixelCard>

                <div className="grid grid-cols-1 gap-4 mt-8">
                  <PixelCard title={d.ui.domains} color="border-yellow-500">
                    <ul className="space-y-3 text-sm pt-2 text-slate-200">
                      <li className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> LLM Commercialization</li>
                      <li className="flex items-center gap-2"><Briefcase size={14} className="text-yellow-500"/> Industrial AI Systems</li>
                      <li className="flex items-center gap-2"><Layers size={14} className="text-yellow-500"/> Multi-Agent RL</li>
                    </ul>
                  </PixelCard>
                </div>
              </div>

              {/* --- 2. Timeline Section --- */}
              <div ref={sectionRefs.timeline} className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-4">
                <div className="flex items-center gap-2 mb-4 text-orange-400 border-b border-orange-900/50 pb-2">
                  <Award size={18} />
                  <h2 className="font-bold text-lg tracking-widest">{d.ui.timeline}</h2>
                </div>
                
                <div className="space-y-6">
                  {d.timeline.map((item, idx) => (
                    <div key={idx} className="group relative pl-6 border-l-4 border-slate-700 hover:border-orange-500 transition-colors">
                      <div className="absolute -left-[10px] top-0 w-4 h-4 bg-slate-900 border-2 border-slate-600 group-hover:bg-orange-500 group-hover:border-orange-300 transition-colors rotate-45"></div>
                      <div className="flex items-start gap-4">
                        <span className="bg-slate-900 px-2 py-0.5 border border-slate-700 text-yellow-500 text-xs font-bold w-32 shrink-0 text-center">{item.period}</span>
                        <div>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-orange-400">{item.title}</h3>
                          <p className="text-sm text-slate-400">{item.org}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- 3. Papers Section --- */}
              <div ref={sectionRefs.papers} className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-4">
                <div className="flex items-center gap-2 mb-4 text-blue-400 border-b border-blue-900/50 pb-2">
                  <BookOpen size={18} />
                  <h2 className="font-bold text-lg tracking-widest">{d.ui.publications}</h2>
                </div>
                
                <div className="space-y-6">
                  {PAPERS.map((paper, idx) => (
                    <div key={idx} className="group relative pl-6 border-l-4 border-slate-700 hover:border-blue-500 transition-colors">
                      <div className="absolute -left-[10px] top-0 w-4 h-4 bg-slate-900 border-2 border-slate-600 group-hover:bg-blue-500 group-hover:border-blue-300 transition-colors rotate-45"></div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 cursor-pointer leading-snug">{paper.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs mt-2 text-slate-200 font-bold items-center">
                        <span className="bg-slate-900 px-2 py-0.5 border border-slate-700 text-yellow-500">[{paper.year}]</span>
                        <span className="text-indigo-400">{paper.conf}</span>
                      </div>
                      <div className="mt-2 text-xs text-slate-400 italic font-medium">
                        {paper.authors}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {paper.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-200 px-1 border border-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- 4. Projects Section --- */}
              <div ref={sectionRefs.projects} className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-4">
                <div className="flex items-center gap-2 mb-4 text-green-400 border-b border-green-900/50 pb-2">
                  <Cpu size={18} />
                  <h2 className="font-bold text-lg tracking-widest">{d.ui.projectsBuild} ({d.projects.length})</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {d.projects.map((proj, idx) => (
                    <div key={idx} className="bg-black border-2 border-slate-700 p-4 flex flex-col hover:border-green-500 transition-all group">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 flex items-center justify-center border border-slate-600 group-hover:animate-bounce shrink-0">
                           <span className="text-xl md:text-2xl font-bold text-slate-500 group-hover:text-green-500">0{idx+1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-green-400 mb-2">{proj.name}</h3>
                          <p className="text-base text-slate-200 mb-3 leading-relaxed font-medium">{proj.desc}</p>
                          
                          {/* Sub Projects Grid (If applicable) */}
                          {proj.subProjects && (
                            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                              {proj.subProjects.map((sub, sIdx) => (
                                  <div key={sIdx} className="bg-slate-900/60 border border-slate-700 p-2 text-xs text-slate-200 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-colors flex items-start gap-2 rounded-sm cursor-default">
                                  <div className="w-1.5 h-1.5 bg-indigo-500 mt-1 shrink-0"></div>
                                  <span className="leading-tight">{sub}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="text-xs text-slate-500 font-mono border-t border-slate-800 pt-2 mt-auto">
                            CORE: <span className="text-indigo-400 font-semibold">{proj.stack}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- 5. Contact Section --- */}
              <div ref={sectionRefs.contact} className="pb-20 scroll-mt-4">
                <div className="flex items-center gap-2 mb-4 text-indigo-400 border-b border-indigo-900/50 pb-2">
                  <Mail size={18} />
                  <h2 className="font-bold text-lg tracking-widest">{d.ui.connectProtocol}</h2>
                </div>

                <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                   <div className="w-full max-w-md bg-slate-900 border-4 border-indigo-500 p-8 text-center shadow-[10px_10px_0px_0px_rgba(79,70,229,0.3)]">
                      <Mail size={48} className="mx-auto text-indigo-400 mb-4" />
                      <h2 className="text-2xl font-bold mb-2">{lang === 'zh' ? '联系方式' : 'Contact Info'}</h2>
                      <p className="text-sm text-slate-400 mb-6">{lang === 'zh' ? '欢迎学术交流与合作。' : 'Welcome for academic exchange and collaboration.'}</p>
                      
                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700">
                          <Mail size={16} className="text-indigo-400 shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Email</div>
                            <div className="text-sm text-green-400 font-mono">{EMAIL}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700">
                          <Github size={16} className="text-indigo-400 shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">GitHub</div>
                            <a href="https://github.com/YuhangPei" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-100 font-mono hover:text-indigo-400 transition-colors">github.com/YuhangPei</a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700">
                          <BookOpen size={16} className="text-indigo-400 shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Google Scholar</div>
                            <a href="https://scholar.google.com/citations?user=O959C4AAAAAJ" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-100 font-mono hover:text-indigo-400 transition-colors">scholar.google.com/citations?user=O959C4AAAAAJ</a>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Mobile Notice */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 text-center text-[10px] text-slate-500 p-1 z-40 border-t border-slate-800">
        {d.ui.recommend}
      </div>
      
      {/* Dynamic Styles for specific animations not in standard Tailwind */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        /* Custom Scrollbar hiding */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
