export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  category: string;
  stats?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools';
  description: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'achievement' | 'work';
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: 'Mahesh Saha',
  title: 'Creative AI Developer & Tech Architect',
  shortTitle: 'Software Developer',
  subtitle: 'I build intelligent products, interfaces & experiences.',
  taglines: ['Creative Developer', 'ML Enthusiast', 'Problem Solver'],
  email: 'maheshsaha2007@gmail.com',
  location: 'Jaipur, Rajasthan, India',
  github: 'https://github.com/Maheshsaha2007',
  linkedin: 'https://www.linkedin.com/in/mahesh-saha-a8438a377',
  twitter: 'https://x.com',
  instagram: 'https://instagram.com',
  resumeUrl: '/assets/Mahesh_Saha_Resume.pdf',
  photoUrl: '/assets/mahesh_pic.jpg',
  bio: 'I am a passionate software developer dedicated to crafting modern interactive web applications and data-driven systems. Focused on robust frontends and backend data engineering, I am constantly expanding my expertise into Machine Learning, Neural Networks, and Advanced AI.',
  stats: [
    { label: 'Major Projects Built', value: '10+' },
    { label: 'Technologies Mastered', value: '15+' },
    { label: 'Years Coding Experience', value: '2+' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'climavision',
    title: 'ClimaVision',
    description: 'Weather dashboard with cinematic data visualization and live forecast panels.',
    longDescription: 'ClimaVision is a responsive weather intelligence dashboard built with semantic HTML, CSS animations, and vanilla JavaScript. It surfaces multi-day forecasts, animated condition states, and glassmorphic UI panels optimized for quick environmental scanning.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Charts', 'Glass UI'],
    image: '/assets/stock_predictor.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'Frontend',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'This cinematic 3D portfolio — Next.js, R3F, GSAP, and Framer Motion.',
    longDescription: 'A production-grade personal portfolio featuring React Three Fiber hero scenes, Lenis smooth scrolling, GSAP ScrollTrigger storytelling, glassmorphism, and magnetic micro-interactions designed for award-level presentation.',
    tech: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'Three.js'],
    image: '/assets/data_analytics.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'Full Stack',
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'ML-powered conversational assistant with NLP inference pipelines.',
    longDescription: 'An intelligent assistant prototype combining Python backends with TensorFlow models for intent classification and response generation. Designed as a modular stack for experimenting with NLP workflows and model serving.',
    tech: ['Python', 'TensorFlow', 'NLP', 'Flask'],
    image: '/assets/stock_predictor.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'AI & ML',
    stats: [
      { label: 'Latency', value: '<300ms' },
      { label: 'Intents', value: '24+' },
      { label: 'Accuracy', value: '91%' },
    ],
  },
  {
    id: 'ecopulse',
    title: 'EcoPulse Prediction Hub',
    description: 'AI-powered environmental dashboard predicting ecological trends and metrics.',
    longDescription: 'EcoPulse is an environmental forecasting engine designed to predict critical climate metrics. Leveraging Machine Learning algorithms, it runs real-time simulations to aid in ecological decision-making with Flask and Pandas backends.',
    tech: ['Python', 'Flask', 'Pandas', 'Scikit-Learn', 'Plotly'],
    image: '/assets/stock_predictor.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'AI & ML',
    stats: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Process Speed', value: '<200ms' },
      { label: 'Data Points', value: '10k+' },
    ],
  },
  {
    id: 'zenith',
    title: 'Zenith Data Analytics Engine',
    description: 'Visual pipeline parser extracting patterns from complex datasets.',
    longDescription: 'Zenith is a modular analytics engine for heavy data manipulation and statistical forecasting. It delivers interactive charting, correlation discovery, and customizable layouts for operational and research workflows.',
    tech: ['Flask', 'Pandas', 'NumPy', 'Plotly', 'Tailwind CSS'],
    image: '/assets/data_analytics.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'Data Engineering',
    stats: [
      { label: 'Throughput', value: '2GB/s' },
      { label: 'Chart Render', value: '60fps' },
      { label: 'Parsers', value: '8' },
    ],
  },
  {
    id: 'snapframe',
    title: 'SnapFrame',
    description: 'Photo sharing experience with real-time sync and secure client utilities.',
    longDescription: 'SnapFrame combines a React interface with Firebase for media workflows, plus a local-first cryptographic utility for secure password generation using the Web Crypto API — zero server exposure for sensitive operations.',
    tech: ['React', 'Firebase', 'JavaScript', 'Web Crypto API'],
    image: '/assets/password_generator.png',
    github: 'https://github.com/Maheshsaha2007',
    category: 'Full Stack',
    stats: [
      { label: 'Client Processing', value: '100%' },
      { label: 'Realtime', value: 'Yes' },
      { label: 'Offline', value: 'Ready' },
    ],
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', description: 'Responsive Web Layouts & Premium Glassmorphic Styles' },
  { name: 'JavaScript (ES6+)', level: 90, category: 'frontend', description: 'Advanced Client-Side Architecture & Smooth DOM Interactions' },
  { name: 'React & Next.js', level: 85, category: 'frontend', description: 'Component Composition, SSR, Dynamic Hooks & Interactive Routing' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend', description: 'Modular CSS Design, Modern Utilities & Micro-Animations' },
  
  // Backend
  { name: 'Python', level: 88, category: 'backend', description: 'Data Structures, Numerical Computation & AI Modeling Pipelines' },
  { name: 'Flask & Express', level: 82, category: 'backend', description: 'RESTful API Engineering, Middleware & Database Handlers' },
  { name: 'Pandas & NumPy', level: 85, category: 'backend', description: 'Heavy Data Wrangling, Mathematical Parsing & Feature Selection' },
  { name: 'Machine Learning', level: 65, category: 'backend', description: 'Supervised Learning, Deep Neural Nets & Predictive Intelligence' },
  
  // Tools
  { name: 'Git & GitHub', level: 90, category: 'tools', description: 'Version Control, Collaborative Workflows & CI/CD Pipelines' },
  { name: 'Figma', level: 80, category: 'tools', description: 'Futuristic Prototyping, Glassmorphic Mockups & Vector Designs' },
  { name: 'Firebase', level: 75, category: 'tools', description: 'Real-time Datastore, Serverless Authentication & Web Hosting' },
  { name: 'Linux Terminal', level: 85, category: 'tools', description: 'Shell Scripting, Automated Tasks & System Administration' }
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2025 - Present',
    title: 'Advanced AI & Machine Learning Research',
    institution: 'Self-Directed / Community Lab',
    description: 'Deep diving into Neural Network architectures, Deep Learning paradigms, and integrating predictive model frameworks with web interfaces.',
    type: 'achievement'
  },
  {
    year: '2024 - Present',
    title: 'Full-Stack Software Development',
    institution: 'Freelance & Independent Projects',
    description: 'Developing professional analytical web engines, client dashboards, and responsive interactive designs emphasizing 3D/Cinematic UI layers.',
    type: 'work'
  },
  {
    year: '2023',
    title: 'Computer Science & Software Foundations',
    institution: 'Academic Curriculum',
    description: 'Mastered programming fundamentals including algorithm complexity, standard data structures, Object-Oriented Principles in Java/C, and relational data structures.',
    type: 'education'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Advanced Web Applications & React Frameworks',
    issuer: 'Tech Academy Hub',
    date: 'Dec 2024',
    icon: 'Code'
  },
  {
    title: 'Python for Data Science & Machine Learning Foundations',
    issuer: 'Data Intelligence Group',
    date: 'Oct 2024',
    icon: 'Brain'
  },
  {
    title: 'Modern UI/UX Design System Architectures',
    issuer: 'Design Elite Collective',
    date: 'Jul 2024',
    icon: 'Palette'
  }
];
export const TERMINAL_ABOUT = {
  bio: `## Mahesh Saha // Creative AI Developer

- Location: Jaipur, Rajasthan, India
- Core Focus: High-performance frontends (React, Next.js, R3F) combined with Python/Flask backend and predictive ML pipelines.
- Philosophy: "I believe technology should be visually captivating, buttery smooth, and intelligent at its core."
- Current Status: Available for select futuristic contracts and AI collaborations.`,
  
  stack: `{
  "languages": ["TypeScript", "JavaScript", "Python", "C", "Java", "SQL"],
  "frontend": ["Next.js", "React", "React Three Fiber", "GSAP", "Tailwind CSS"],
  "backend": ["Node.js", "Express", "Flask", "Pandas", "Scikit-Learn"],
  "tools": ["Git/GitHub", "Figma", "Docker", "Firebase", "Linux CLI"]
}`,

  goals: `## Strategic Goals // 2026-2027

1. Master WebGL / custom shader GLSL development for Awwwards-tier 3D interactivity.
2. Bridge Large Language Model (LLM) agents with client-side interactive visual canvases.
3. Deploy advanced real-time predictive ML engines that run entirely within standard edge environments.`
};
