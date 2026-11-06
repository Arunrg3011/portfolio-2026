// ─────────────────────────────────────────────
//  ABOUT SECTION — Arun R. G. Profile Content
// ─────────────────────────────────────────────

import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss,
  SiPython, SiHtml5, SiCss, SiTypescript, SiPhp,
  SiGit, SiGithub, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiVercel, SiPrisma, SiSupabase, SiOpencv, SiLaravel,
} from "react-icons/si";
import { FaJava, FaBrain } from "react-icons/fa";
import { TbApi, TbCpu } from "react-icons/tb";

export const SECTION = {
  label: "About Me",
};

export const HEADING = {
  line1: "Engineering",
  line2: "intelligence.",
  line3: "Building with purpose.", // ghost outline style
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I'm *Arun R. G.*, an *Information Technology* student at *K.L.N. College of Engineering* (2024–2028) with a strong foundation in *Artificial Intelligence* and *Full-Stack Development*.",
  "I enjoy turning complex ideas into *practical, intelligent products* — from AI-powered applications and scalable backend systems to *cinematic, interactive web experiences*. My focus is on learning by building, experimenting with emerging AI models, and creating software that solves meaningful problems.",
  "My engineering toolkit spans *Machine Learning*, *Computer Vision (YOLO/OpenCV)*, and *LLM API integrations*, paired with modern web engineering across *React*, *Next.js*, *Node.js*, *Express*, *PostgreSQL*, and *Supabase*.",
  "Whether building an intelligent personal operating system like *ARISE*, developing automated document parsers, or presenting academic research at *ICSDET'26*, I prioritize *technical depth*, *clean architecture*, and *purposeful engineering*."
];

export const RESUME_URL = "/resume.pdf";

// Technical Skills categorized by engineering domain
export const TECH = [
  // AI & ML
  { name: "Machine Learning",   icon: FaBrain },
  { name: "Computer Vision",    icon: SiOpencv },
  { name: "YOLO",               icon: TbCpu },
  { name: "AI APIs / LLMs",     icon: TbApi },

  // Frontend
  { name: "React",              icon: SiReact },
  { name: "Next.js",            icon: SiNextdotjs },
  { name: "JavaScript",         icon: SiJavascript },
  { name: "TypeScript",         icon: SiTypescript },
  { name: "Tailwind CSS",       icon: SiTailwindcss },
  { name: "HTML5 / CSS3",       icon: SiHtml5 },

  // Backend & Languages
  { name: "Python",             icon: SiPython },
  { name: "Node.js",            icon: SiNodedotjs },
  { name: "Express.js",         icon: SiExpress },
  { name: "Java",               icon: FaJava },
  { name: "PHP / Laravel",      icon: SiLaravel },
  { name: "REST APIs",          icon: TbApi },

  // Databases & Cloud
  { name: "PostgreSQL",         icon: SiPostgresql },
  { name: "Supabase",           icon: SiSupabase },
  { name: "MySQL",              icon: SiMysql },
  { name: "MongoDB",            icon: SiMongodb },
  { name: "Prisma ORM",         icon: SiPrisma },
  { name: "Git & GitHub",       icon: SiGithub },
  { name: "Vercel / Cloud",     icon: SiVercel },
];

export const SKILL_CATEGORIES = [
  {
    category: "Artificial Intelligence",
    skills: ["AI Application Design", "Machine Learning", "Computer Vision", "YOLO", "AI API Integration", "Document OCR Parsing"]
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 & Modern CSS", "Creative Animations"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express.js", "Python", "Java", "PHP / Laravel", "RESTful API Architecture", "Authentication & Middleware"]
  },
  {
    category: "Databases & Infrastructure",
    skills: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Prisma ORM", "Git & GitHub", "Vercel Deployment", "Render"]
  }
];

export const EXPERIENCE = [
  { 
    role: "Software Development Intern", 
    company: "Dream Yours Infotech Consulting & Services",
    period: "Internship" 
  },
  { 
    role: "Web Development Intern", 
    company: "CODSOFT",
    period: "Internship" 
  },
  { 
    role: "Web Development Intern", 
    company: "OctaNet",
    period: "Internship" 
  },
  { 
    role: "Research Presenter", 
    company: "ICSDET'26 — AI-Enabled Course Recommender System",
    period: "March 2026" 
  },
  { 
    role: "B.Tech Information Technology", 
    company: "K.L.N. College of Engineering",
    period: "2024 – 2028" 
  },
];
