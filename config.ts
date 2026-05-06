export type Language = 'zh' | 'en';

export interface Stat {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface Paper {
  year: string;
  title: string;
  conf: string;
  tags: string[];
  authors: string;
  url?: string;
}

export interface Project {
  name: string;
  desc: string;
  stack: string;
  subProjects?: string[];
  github?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
}

export const BIRTHDAY = "2000-05-08";

export const EMAIL = "peiyh@mails.neu.edu.cn";

export const TRANSLATIONS = {
  zh: {
    name: "裴宇航",
    title: "东北大学博士",
    bio: "东北大学软件学院博士研究生，研究方向为时间序列分析与大模型应用。发表多篇学术论文，包括SIGKDD、EMNLP等国际顶级会议。曾参与多个工业级AI系统研发，涵盖军工、能源、制造等领域。",
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
      { name: "算力坟场 (Compute Graveyard)", desc: "实验室 GPU / 计算容器统一申请与调度平台。支持 GPU 与纯 CPU 容器申请、租期管理、工作区文件编辑与 Code Server（VS Code 浏览器版）直连。", stack: "Docker / GPU / DevOps", github: "https://github.com/YuhangPei/Compute-Graveyard" },
      { name: "中国航发沈阳发动机所", desc: "性能评判系统核心模块 design 与实现。", stack: "Industrial / Java" },
      { name: "宁德时代 (CATL)", desc: "锂矿粒度识别系统算法建模与部署。", stack: "CV / Edge Computing" },
      { name: "中航工业", desc: "软件可靠性保障、缺陷检测及知识图谱分析。", stack: "Knowledge Graph" },
      { name: "鞍钢集团", desc: "数字总师系统研发，辅助高层决策。", stack: "Data Viz" },
      { name: "**基地", desc: "**测控方案自动优化与生成系统。", stack: "Algorithm / Military" },
      { name: "华电 & 中煤科", desc: "工业视觉巡检系统，多地煤矿实地部署。", stack: "CV / IoT" },
      { name: "知识库智能体 (Agent)", desc: "为中钢、电网等多企搭建 RAG 问答系统。", stack: "LLM / RAG" },
      { name: "626所", desc: "基于大模型的飞机外形智能设计平台。", stack: "Generative AI" },
      { name: "行业全栈研发 (Team Lead)", desc: "带领团队完成十余个大型系统开发。", stack: "Leadership", subProjects: ["成远矿业系统", "辽宁歌剧院APP", "刑事警察学院禁毒网"] }
    ]
  },
  en: {
    name: "Yuhang Pei",
    title: "PhD Candidate @ NEU",
    bio: "PhD candidate at Software College, Northeastern University. Research focuses on time series analysis and LLM applications. Published papers at top conferences including SIGKDD and EMNLP. Experienced in developing industrial AI systems across defense, energy, and manufacturing sectors.",
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
      { name: "Compute Graveyard", desc: "Unified GPU / compute container application and scheduling platform for labs. Supports GPU and CPU container requests, lease management, workspace file editing, and direct Code Server (VS Code browser) access.", stack: "Docker / GPU / DevOps", github: "https://github.com/YuhangPei/Compute-Graveyard" },
      { name: "AECC Shenyang", desc: "Performance evaluation system for engines.", stack: "Industrial / Java" },
      { name: "CATL", desc: "Lithium ore granularity recognition system.", stack: "CV / Edge Computing" },
      { name: "AVIC", desc: "Software reliability and defect detection analysis.", stack: "Knowledge Graph" },
      { name: "Ansteel Group", desc: "Digital Chief Engineer system for decision support.", stack: "Data Viz" },
      { name: "** Institute", desc: "** test & control optimization system.", stack: "Algorithm / Military" },
      { name: "Huadian & CCTEG", desc: "Industrial visual inspection for coal mines.", stack: "CV / IoT" },
      { name: "RAG Agents", desc: "LLM Agents for Sinosteel, State Grid, etc.", stack: "LLM / RAG" },
      { name: "Institute 626", desc: "AI-based aircraft aerodynamic design platform.", stack: "Generative AI" },
      { name: "Lead Full Stack", desc: "Led team to deliver 10+ enterprise systems.", stack: "Leadership", subProjects: ["Mining Management", "Opera House App", "E-learning Platforms"] }
    ]
  }
};

export const PAPERS: Paper[] = [
  { 
    year: "2026", 
    title: "CURE: Context-driven Diffusion with Progressive Expansion for Single Domain Generalization in Time Series Classification", 
    conf: "ICML 2026 (CCF A|CORE A*|THCPL A)", 
    tags: ["Time Series", "Diffusion", "Domain Generalization"],
    authors: "Yuhang Pei, Fanchun Meng, Wenrui Wu, Tao Ren, Yifan Wang, Wei Ju, Chao Zheng, Xiao Luo",
  },
  { 
    year: "2026", 
    title: "Dual Data-centric Separation with Circular Mixup for Noise-resistant Time Series Learning", 
    conf: "SIGKDD 2026 (CCF A|CORE A*|THCPL A)", 
    tags: ["Time Series", "Data-Centric"],
    authors: "Yuhang Pei, Fanchun Meng, Qinghua Ran, Tao Ren, Yifan Wang, Wei Ju, Zimo Wang, Xian-Sheng Hua, Xiao Luo"
  },
  { 
    year: "2025", 
    title: "LEAF: Large Language Diffusion Model for Time Series Forecasting", 
    conf: "EMNLP 2025 (Findings, CCF B|CORE A*|THCPL A)", 
    tags: ["LLM", "Diffusion", "Forecasting"],
    authors: "Y Pei, T Ren, Y Wang, Z Sun, W Ju, C Chen, XS Hua, X Luo"
  },
  { 
    year: "2024", 
    title: "Policy distillation for efficient decentralized execution in multi-agent reinforcement learning", 
    conf: "Neurocomputing (JCR Q1|CCF C|中科院二区Top)", 
    tags: ["MARL", "RL"],
    authors: "Y Pei, T Ren, Y Zhang, Z Sun, M Champeyrol"
  },
];
