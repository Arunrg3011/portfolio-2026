import { NextResponse } from "next/server";

/**
 * GET /api/llms
 * 
 * Machine-readable JSON endpoint for AI chatbots and LLM crawlers.
 * This supplements llms.txt with structured data that AI systems
 * can programmatically consume.
 */
export async function GET() {
  const data = {
    name: "Arun R. G.",
    title: "AI Engineer & Full-Stack Developer",
    website: "https://portfolio-arun3011.vercel.app",
    linkedin: "https://linkedin.com/in/arunrg3011",
    github: "https://github.com/Arunrg3011",
    education: "B.Tech Information Technology, K.L.N. College of Engineering (2024–2028)",
    location: "Tamil Nadu, India",
    available_for_hire: true,
    summary:
      "Arun R. G. is an AI Engineer and Full-Stack Developer studying Information Technology at K.L.N. College of Engineering. He turns ideas into practical software combining AI, full-stack engineering, and thoughtful design.",
    
    services: [
      {
        name: "Artificial Intelligence & Machine Learning",
        description: "Intelligent systems, LLM integrations, AI agents, and computer vision pipelines",
        technologies: ["Python", "Groq API", "Gemini API", "YOLO", "OpenCV", "Machine Learning"],
      },
      {
        name: "Full-Stack Web Development",
        description: "Scalable modern web applications, performant REST APIs, and database engineering",
        technologies: ["React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Prisma"],
      },
      {
        name: "Creative Frontend Engineering",
        description: "Cinematic, interactive, and responsive web experiences with smooth animations",
        technologies: ["Next.js", "React", "Tailwind CSS", "GSAP", "JavaScript", "TypeScript"],
      },
    ],

    skills: {
      frontend: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
      backend: ["Node.js", "Express.js", "Python", "Java", "PHP", "Laravel", "REST APIs"],
      database_and_infra: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Prisma", "Git", "GitHub", "Vercel", "Render"],
      ai_and_ml: ["AI Application Development", "Machine Learning", "Computer Vision", "YOLO", "AI API Integration"],
    },

    featured_projects: [
      { name: "ARISE", category: "Personal AI Operating System", tech: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "pgvector", "Prisma", "Groq API"], github: "https://github.com/Arunrg3011/Arise_personal_AI" },
      { name: "RagGuard", category: "AI Incident Telemetry & Campus Safety", tech: ["TypeScript", "React", "Node.js", "Express", "AI Telemetry", "PostgreSQL"], github: "https://github.com/Arunrg3011/Ragguard" },
      { name: "AI Resume Builder & Parser", category: "AI-Powered Career Tools", tech: ["React", "Vite", "Node.js", "Express", "Gemini API"], github: "https://github.com/Arunrg3011/resume-maker" },
      { name: "Context-Aware Hashtag Generation", category: "Knowledge Graph NLP", tech: ["Python", "Machine Learning", "Knowledge Graphs", "NLP", "FastAPI"], github: "https://github.com/Arunrg3011/Context-Aware-Hashtag-Generation" },
      { name: "SchemeLink", category: "AI Government Welfare & OCR Matcher", tech: ["React", "OCR", "AI Matching"], github: "https://github.com/Arunrg3011/Scheme-link" },
      { name: "AI-Enabled Course Recommender System", category: "AI Research / EdTech", note: "Presented at ICSDET'26 at K.L.N. College of Engineering", github: "https://github.com/Arunrg3011/AI-Book-Online-Course-Recommender-System-" },
      { name: "TrendTrim Salon", category: "Full-Stack Booking Platform", tech: ["React", "Node.js", "Express", "Tailwind CSS"], github: "https://github.com/Arunrg3011/TrendTrim_Salon", demo: "https://trend-trim-salon.vercel.app" },
      { name: "Anii Gold Scheme Admin", category: "Administrative Management System", tech: ["PHP", "MySQL", "Authentication"], github: "https://github.com/Arunrg3011/Anii_Gold_Scheme_Admin" }
    ],

    experience: [
      { role: "Software Development Intern", company: "Dream Yours Infotech Consulting & Services" },
      { role: "Software Development Intern", company: "CODSOFT" },
      { role: "Web Development Intern", company: "OctaNet" },
      { role: "Research & Technical Projects", company: "K.L.N. College of Engineering" }
    ],

    pages: {
      home: "https://portfolio-arun3011.vercel.app/",
      about: "https://portfolio-arun3011.vercel.app/about",
      work: "https://portfolio-arun3011.vercel.app/work",
      projects: "https://portfolio-arun3011.vercel.app/projects",
      contact: "https://portfolio-arun3011.vercel.app/contact",
    },

    llms_txt: "https://portfolio-arun3011.vercel.app/llms.txt",
    llms_full_txt: "https://portfolio-arun3011.vercel.app/llms-full.txt",
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "application/json",
    },
  });
}
