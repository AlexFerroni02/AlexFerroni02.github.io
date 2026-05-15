"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Code2, Cpu, Database, Blocks, GraduationCap, Rocket, ArrowRight, ExternalLink, HardDrive, Gamepad2, Mail, Globe } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- DATA ARRAYS ---
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  tags: string[];
  link?: string;
}

const aiProjects: Project[] = [
  {
    id: "cancer-tissue",
    title: "Cancer Tissue Classification",
    subtitle: "Master Thesis (In Progress)",
    description: "Classifying cancer vs healthy tissue using Raman spectra data. Explored Data augmentation, pre-training, and fine-tuning of CNN and ViT architectures. Part of the EU-funded SPECTRA-BREAST project.",
    color: "brand",
    icon: <Rocket size={20} />,
    tags: ["Data Augmentation", "Pre-training & Fine-tuning", "CNN & ViT", "PyTorch"]
  },
  {
    id: "autonomous-drones",
    title: "Autonomous Drones",
    subtitle: "DRAFT Student Team",
    description: "Implemented and deployed an AI pipeline for robust hand gesture recognition and drone navigation. Strongly focused on model optimization for low-latency, real-time inference under tight hardware constraints.",
    color: "emerald",
    icon: <Cpu size={20} />,
    tags: ["Gesture Recognition", "Real-time Inference", "Optimization"]
  },
  {
    id: "xview",
    title: "xView Recognition & Detection",
    subtitle: "Advanced Computer Vision Pipeline",
    description: "End-to-end analysis of satellite imagery. Part 1: Image Classification using FFNNs and advanced CNNs with Focal Loss. Part 2: Object Detection implementing YOLO/SSD and Faster R-CNN for precise vehicle localization.",
    color: "cyan",
    icon: <Database size={20} />,
    tags: ["Image Classification", "Object Detection", "YOLO & R-CNN"]
  }
];

const softwareProjects: Project[] = [
  {
    id: "rust-fuse",
    title: "Rust Remote FUSE",
    subtitle: "Distributed Systems",
    description: "High-performance remote filesystem in Rust. Mounts remote directories locally with real-time sync via WebSocket and HTTP chunked reading.",
    color: "orange",
    icon: <HardDrive size={20} />,
    tags: ["Rust", "Tokio / Axum", "WebSocket"]
  },
  {
    id: "influencer-blog",
    title: "Influencer Website",
    subtitle: "Content-Driven Web App",
    description: "Full-stack production website developed for a creator. Focused on seamless user experience, fast loading times, dynamic content updates, and automated deployment pipelines.",
    color: "accent",
    icon: <Blocks size={20} />,
    tags: ["Next.js", "REST API", "CI/CD"],
    link: "https://www.giulianiraffaele.it/"
  },
  {
    id: "pacman",
    title: "Embedded Pacman",
    subtitle: "Microcontroller / LandTiger",
    description: "Hardware-level Pacman game developed for the LPC1768 board. Focus on resource optimization, CAN bus communication, and Real-Time Interrupts (RIT).",
    color: "yellow",
    icon: <Gamepad2 size={20} />,
    tags: ["Embedded C", "Keil", "CAN Bus"]
  },
  {
    id: "stuff-happens",
    title: "Stuff Happens Game",
    subtitle: "Logic-Driven Web App",
    description: "Interactive web game built with a strong focus on backend logic. Features a complete user authentication system, database session management, rounds, and game history tracking.",
    color: "rose",
    icon: <Database size={20} />,
    tags: ["React", "Node.js / Express", "SQLite"]
  }
];

// Color mapping utility
const colorClasses: Record<string, { bgGlow: string; textIcon: string; hoverBorder: string; hoverShadow: string; bgTag: string; textTag: string; borderTag: string }> = {
  brand: { bgGlow: "bg-brand-500/10 group-hover:bg-brand-500/30", textIcon: "text-brand-400", hoverBorder: "hover:border-brand-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]", bgTag: "bg-brand-500/10", textTag: "text-brand-400", borderTag: "border-brand-500/20" },
  emerald: { bgGlow: "bg-emerald-500/10 group-hover:bg-emerald-500/30", textIcon: "text-emerald-500", hoverBorder: "hover:border-emerald-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]", bgTag: "bg-emerald-500/10", textTag: "text-emerald-400", borderTag: "border-emerald-500/20" },
  cyan: { bgGlow: "bg-cyan-500/10 group-hover:bg-cyan-500/30", textIcon: "text-cyan-500", hoverBorder: "hover:border-cyan-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]", bgTag: "bg-cyan-500/10", textTag: "text-cyan-400", borderTag: "border-cyan-500/20" },
  blue: { bgGlow: "bg-blue-500/10 group-hover:bg-blue-500/30", textIcon: "text-blue-500", hoverBorder: "hover:border-blue-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]", bgTag: "bg-blue-500/10", textTag: "text-blue-400", borderTag: "border-blue-500/20" },
  orange: { bgGlow: "bg-orange-500/10 group-hover:bg-orange-500/30", textIcon: "text-orange-500", hoverBorder: "hover:border-orange-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]", bgTag: "bg-orange-500/10", textTag: "text-orange-400", borderTag: "border-orange-500/20" },
  yellow: { bgGlow: "bg-yellow-500/10 group-hover:bg-yellow-500/30", textIcon: "text-yellow-500", hoverBorder: "hover:border-yellow-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]", bgTag: "bg-yellow-500/10", textTag: "text-yellow-400", borderTag: "border-yellow-500/20" },
  accent: { bgGlow: "bg-accent-500/10 group-hover:bg-accent-500/30", textIcon: "text-accent-500", hoverBorder: "hover:border-accent-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]", bgTag: "bg-accent-500/10", textTag: "text-accent-400", borderTag: "border-accent-500/20" },
  rose: { bgGlow: "bg-rose-500/10 group-hover:bg-rose-500/30", textIcon: "text-rose-500", hoverBorder: "hover:border-rose-500/50", hoverShadow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]", bgTag: "bg-rose-500/10", textTag: "text-rose-400", borderTag: "border-rose-500/20" },
};

// --- STRICT CAROUSEL COMPONENT ---
function ProjectCarousel({ title, projects }: { title: string, projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const showControls = projects.length > 3;

  const scrollLeft = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const cardWidth = scrollRef.current.children[0].clientWidth;
      // Scroll by exactly 1 card + gap (24px = gap-6)
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const cardWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <div className="h-[1px] bg-slate-800 flex-1 hidden sm:block"></div>
        </div>
        {showControls && (
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((p) => {
            const colors = colorClasses[p.color] || colorClasses.brand;
            return (
              <motion.div 
                key={p.id}
                variants={fadeInUp} 
                // Exactly 1/3 of the container width minus the gap logic, making 3 cards fit perfectly on md+
                // Add rounded-3xl for a less square look, and hover:-translate-y-2 for a floating effect
                className={`glass-card p-6 flex flex-col gap-3 relative overflow-hidden group w-full md:w-[calc(33.333%-1rem)] snap-start shrink-0 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:z-10 rounded-3xl border border-slate-800/60 min-h-[260px] ${colors.hoverBorder} ${colors.hoverShadow}`}
              >
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
                )}
                <div className={`absolute top-0 right-0 w-24 h-24 blur-[30px] rounded-full transition-all duration-700 ${colors.bgGlow}`}></div>
                <div className="flex items-start justify-between relative z-20">
                  <div className={`p-2 bg-slate-800/50 rounded-xl ${colors.textIcon}`}>
                    {p.icon}
                  </div>
                  {p.link && (
                    <ExternalLink size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="relative z-20 mt-2">
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">{p.title}</h3>
                  <p className={`${colors.textIcon} text-[10px] uppercase tracking-wider font-semibold mb-2`}>{p.subtitle}</p>
                  <p className="text-slate-400 text-xs leading-relaxed whitespace-normal">
                    {p.description}
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-800/50 flex flex-wrap gap-1.5 relative z-20">
                  {p.tags.map((tag, i) => (
                    <span key={i} className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wide font-bold border ${colors.bgTag} ${colors.textTag} ${colors.borderTag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Navigation / Contacts */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="text-xl font-bold text-white tracking-tight">AF<span className="text-accent-500">.</span></div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32 pt-12 flex flex-col gap-32">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col items-start gap-6 max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-accent-400 text-sm font-medium shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            Available for new opportunities
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Alex Ferroni <br />
            <span className="text-gradient">Software & AI Engineer</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Passionate about Computer Vision, Artificial Intelligence, and Software Engineering. 
            Currently seeking my first full-time role, I love building, training, and optimizing Deep Learning models, as well as developing robust software architectures and distributed systems.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
            <a href="mailto:alexferroni02@gmail.com" className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-slate-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
              <Mail size={18} /> alexferroni02@gmail.com
            </a>
            <a href="https://github.com/AlexFerroni02" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Globe size={18} /> GitHub Profile
            </a>
          </motion.div>
        </motion.section>

        {/* AI PROJECTS */}
        <ProjectCarousel title="AI & Deep Learning" projects={aiProjects} />

        {/* SOFTWARE PROJECTS */}
        <ProjectCarousel title="Software Engineering & Systems" projects={softwareProjects} />

        {/* SKILLS SECTION */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
            <div className="h-[1px] bg-slate-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div variants={fadeInUp} className="relative hover:z-10 glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 rounded-3xl hover:border-brand-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <div className="text-brand-400 bg-brand-500/10 p-3 rounded-2xl w-fit"><Cpu size={24} /></div>
              <h3 className="text-white font-bold text-lg">AI & Deep Learning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">PyTorch, TensorFlow, Keras, CNNs, ViT, Transfer Learning</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative hover:z-10 glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 rounded-3xl hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <div className="text-emerald-500 bg-emerald-500/10 p-3 rounded-2xl w-fit"><Code2 size={24} /></div>
              <h3 className="text-white font-bold text-lg">Computer Vision</h3>
              <p className="text-slate-400 text-sm leading-relaxed">OpenCV, YOLO, Faster R-CNN, Image Segmentation, Rasterio</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative hover:z-10 glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 rounded-3xl hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <div className="text-orange-500 bg-orange-500/10 p-3 rounded-2xl w-fit"><Blocks size={24} /></div>
              <h3 className="text-white font-bold text-lg">Programming</h3>
              <p className="text-slate-400 text-sm leading-relaxed">C (Extensive), Python, Java, Rust, TypeScript, JavaScript</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative hover:z-10 glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 rounded-3xl hover:border-accent-500/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <div className="text-accent-500 bg-accent-500/10 p-3 rounded-2xl w-fit"><Database size={24} /></div>
              <h3 className="text-white font-bold text-lg">Data & Web</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Next.js, REST APIs, MySQL, SQLite, SPARQL, Knowledge Graphs</p>
            </motion.div>
          </div>
        </motion.section>

        {/* EDUCATION & FOCUS */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Education</h2>
              <div className="h-[1px] bg-slate-800 flex-1"></div>
            </div>
            <div className="flex flex-col gap-6">
              <motion.div variants={fadeInUp} className="flex gap-5 group p-4 -ml-4 hover:bg-slate-800/30 rounded-3xl transition-all duration-300">
                <div className="p-3 bg-brand-500/10 rounded-2xl text-brand-400 h-fit group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-300"><GraduationCap size={24} /></div>
                <div>
                  <h3 className="text-white font-bold text-lg">M.Sc. in Computer Engineering (AI & Data)</h3>
                  <p className="text-brand-400 font-medium text-sm mt-1">Politecnico di Torino (Expected 2026)</p>
                  <p className="text-slate-400 text-sm mt-2">Erasmus Program: Universidad Politécnica de Madrid (2025-2026)</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex gap-5 group p-4 -ml-4 hover:bg-slate-800/30 rounded-3xl transition-all duration-300">
                <div className="p-3 bg-slate-800/50 rounded-2xl text-slate-400 h-fit group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-300"><GraduationCap size={24} /></div>
                <div>
                  <h3 className="text-white font-bold text-lg">B.Sc. in Computer Engineering</h3>
                  <p className="text-slate-400 font-medium text-sm mt-1">Politecnico di Torino</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="px-3 py-1 bg-slate-800 text-white rounded-full text-xs font-bold border border-slate-700">108/110</span>
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold border border-amber-500/20">Top 2% "Intraprendenti"</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Career Focus</h2>
              <div className="h-[1px] bg-slate-800 flex-1"></div>
            </div>
            <motion.div variants={fadeInUp} className="relative hover:z-10 glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-accent-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/10 blur-[50px] rounded-full group-hover:bg-accent-500/20 transition-all duration-700"></div>
              <p className="text-slate-300 leading-relaxed mb-6 relative z-10 text-lg">
                Targeting roles in <strong className="text-white font-bold">AI Deployment</strong>, <strong className="text-white font-bold">Computer Vision</strong>, and <strong className="text-white font-bold">Software Engineering</strong>.
              </p>
              <ul className="flex flex-col gap-4 text-sm text-slate-400 relative z-10">
                <li className="flex items-center gap-3 group/item">
                  <div className="p-1.5 bg-accent-500/10 rounded-full text-accent-400 group-hover/item:bg-accent-500 group-hover/item:text-slate-900 transition-colors"><ChevronRight size={14} /></div>
                  <span className="group-hover/item:text-white transition-colors">Building and optimizing models for real-world scenarios.</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="p-1.5 bg-accent-500/10 rounded-full text-accent-400 group-hover/item:bg-accent-500 group-hover/item:text-slate-900 transition-colors"><ChevronRight size={14} /></div>
                  <span className="group-hover/item:text-white transition-colors">Deploying AI on Edge/On-prem constraints (Quantization, Pruning).</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="p-1.5 bg-accent-500/10 rounded-full text-accent-400 group-hover/item:bg-accent-500 group-hover/item:text-slate-900 transition-colors"><ChevronRight size={14} /></div>
                  <span className="group-hover/item:text-white transition-colors">Developing robust distributed systems and backend architectures.</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="p-1.5 bg-accent-500/10 rounded-full text-accent-400 group-hover/item:bg-accent-500 group-hover/item:text-slate-900 transition-colors"><ChevronRight size={14} /></div>
                  <span className="group-hover/item:text-white transition-colors">Leveraging Agentic AI workflows for efficient engineering.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
