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
  title: 'Software Developer',
  shortTitle: 'Software Developer',
  subtitle: 'Fresher seeking internship opportunities.',
  email: 'maheshsaha2007@gmail.com',
  location: 'Jaipur, Rajasthan, India',
  github: 'https://github.com/Maheshsaha2007',
  linkedin: 'https://www.linkedin.com/in/mahesh-saha-a8438a377',
  techLanguages: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'React', 'MongoDB', 'Python', 'Flask', 'Django'],
  codingExperience: 'Fresher',
  projectCount: 2,
  bio: "I'm a Computer Science undergraduate with a passion for building things that work — clean, efficient, and purposeful software. My foundation is strong in Data Structures & Algorithms, Object-Oriented Programming, and core CS concepts. I'm actively looking for Software Developer internship opportunities where I can contribute, learn, and grow."
};

export const PROJECTS: Project[] = [
  {
    id: 'stock-predictor',
    title: 'Stock Predictor',
    description: 'A web app that predicts stock price trends using machine learning models.',
    longDescription: 'The Stock Predictor application leverages Python Flask backend with TensorFlow models to forecast stock movements, and a React/Next.js frontend for interactive visualizations. It demonstrates data ingestion, preprocessing, model training, and real-time prediction display.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'React', 'MongoDB', 'Python', 'Flask', 'Django'],
    image: '/assets/stock_predictor.png',
    github: 'https://github.com/Maheshsaha2007/stock-predictor',
    demo: 'https://stock-predictor.example.com',
    category: 'Full Stack'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'A secure password generator built with modern web technologies.',
    longDescription: 'The Password Generator provides client‑side cryptographically secure password creation using the Web Crypto API, packaged with a sleek Tailwind CSS UI and hosted on Vercel. It offers customizable length, character sets, and copy‑to‑clipboard functionality.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'React'],
    image: '/assets/password_generator.png',
    github: 'https://github.com/Maheshsaha2007/password-generator',
    demo: 'https://password-gen.example.com',
    category: 'Frontend'
  }
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
