import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const BASE = "https://portfolio-arun3011.vercel.app";

export const viewport = {
  themeColor: "#F26A21",
};

export const metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Arunrg-portfolio",
    template: "%s — Arunrg-portfolio",
  },
  description:
    "Portfolio of Arun R. G., an AI Engineer and Full-Stack Developer specializing in artificial intelligence, machine learning, modern web applications, and interactive digital experiences.",
  keywords: [
    "Arun R. G.", "Arunrg-portfolio", "AI Engineer", "Full-Stack Developer", 
    "Machine Learning", "Computer Vision", "React", "Next.js", 
    "Node.js", "Python", "Tailwind CSS", "Supabase", "Prisma",
    "K.L.N. College of Engineering", "AI Portfolio", "Creative Developer India"
  ],
  authors: [{ name: "Arun R. G.", url: BASE }],
  creator: "Arun R. G.",
  publisher: "Arun R. G.",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "Arunrg-portfolio",
    title: "Arunrg-portfolio",
    description: "Portfolio of Arun R. G., an AI Engineer and Full-Stack Developer specializing in artificial intelligence, machine learning, modern web applications, and interactive digital experiences.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Arunrg-portfolio",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Arunrg-portfolio",
    description: "Portfolio of Arun R. G., an AI Engineer and Full-Stack Developer specializing in artificial intelligence, machine learning, modern web applications, and interactive digital experiences.",
    images: ["/og-image.png"],
    creator: "@arunrg3011",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",

  alternates: { canonical: BASE },

  category: "portfolio",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      "name": "Arun R. G.",
      "url": BASE,
      "jobTitle": "AI Engineer & Full-Stack Developer",
      "description": "AI Engineer and Full-Stack Developer turning ideas into practical software by combining AI, engineering, and thoughtful design.",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "K.L.N. College of Engineering",
        "department": "Information Technology"
      },
      "knowsAbout": [
        "Artificial Intelligence", "Machine Learning", "Computer Vision", "YOLO",
        "Full-Stack Web Development", "Next.js", "React", "Node.js", "Express.js",
        "Python", "Java", "PHP", "Laravel", "PostgreSQL", "Supabase", "Prisma",
        "MySQL", "MongoDB", "Tailwind CSS", "REST APIs", "Git", "GitHub"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "AI Engineer",
          "occupationLocation": { "@type": "Country", "name": "India" },
          "skills": "Python, Machine Learning, Computer Vision, YOLO, Groq, Gemini API, AI Agents"
        },
        {
          "@type": "Occupation",
          "name": "Full-Stack Developer",
          "occupationLocation": { "@type": "Country", "name": "India" },
          "skills": "React, Next.js, Node.js, Express, PostgreSQL, Supabase, Prisma, Tailwind CSS"
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Application Development",
            "description": "Intelligent workspaces, LLM integrations, computer vision systems, and custom AI tools"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Stack Web Development",
            "description": "Scalable web applications, robust REST APIs, modern relational and document databases"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Creative Frontend Engineering",
            "description": "Cinematic, interactive web interfaces with fluid animations, responsive layouts, and modern design"
          }
        }
      ],
      "sameAs": [
        "https://linkedin.com/in/arunrg3011",
        "https://github.com/Arunrg3011",
        "https://portfolio-arun3011.vercel.app"
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE}/#localbusiness`,
      "name": "Arun R. G. — AI Engineer & Full-Stack Developer",
      "image": `${BASE}/og-image.png`,
      "url": BASE,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "description": "AI Engineer and Full-Stack Developer building practical intelligent products.",
      "founder": { "@id": `${BASE}/#person` }
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "url": BASE,
      "name": "Arun R. G. — AI Engineer & Full-Stack Developer",
      "description": "Portfolio of Arun R. G., an AI Engineer and Full-Stack Developer building intelligent software and digital experiences.",
      "publisher": { "@id": `${BASE}/#person` },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#profilepage`,
      "url": BASE,
      "name": "Arun R. G. — Portfolio",
      "isPartOf": { "@id": `${BASE}/#website` },
      "about": { "@id": `${BASE}/#person` },
      "mainEntity": { "@id": `${BASE}/#person` },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${BASE}/projects` },
          { "@type": "ListItem", "position": 3, "name": "Work", "item": `${BASE}/work` },
          { "@type": "ListItem", "position": 4, "name": "About", "item": `${BASE}/about` },
          { "@type": "ListItem", "position": 5, "name": "Contact", "item": `${BASE}/contact` },
        ],
      },
    },
    {
      "@type": "ItemList",
      "name": "Engineering Focus Areas",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Artificial Intelligence & ML",
          "description": "Building intelligent systems with Groq, Gemini API, YOLO computer vision, and autonomous agents",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Full-Stack Development",
          "description": "Architecting performant web apps using React, Next.js, Node.js, PostgreSQL, Supabase, and Prisma",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Creative Frontend Engineering",
          "description": "Designing cinematic, interactive user experiences with precise motion and typography",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does Arun R. G. specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arun specializes in AI engineering and full-stack web development, creating practical intelligent applications, modern web platforms, computer vision pipelines, and interactive digital experiences."
          }
        },
        {
          "@type": "Question",
          "name": "What is Arun's educational background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arun is pursuing a B.Tech in Information Technology at K.L.N. College of Engineering (2024–2028), actively researching and building AI and full-stack software."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies does Arun work with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arun works with React, Next.js, Node.js, Express, Python, Java, PostgreSQL, Supabase, Prisma, MySQL, MongoDB, Tailwind CSS, YOLO, OpenCV, Groq API, and Gemini API."
          }
        },
        {
          "@type": "Question",
          "name": "What are some of Arun's featured projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key projects include ARISE (Personal AI Operating System), RagGuard (AI Incident Telemetry & Campus Safety), AI Resume Builder & Parser, Context-Aware Hashtag Generation (Knowledge Graph NLP), SchemeLink (OCR Government Scheme Matcher), and AI-Enabled Course Recommender System presented at ICSDET'26."
          }
        },
        {
          "@type": "Question",
          "name": "How can I connect with Arun R. G.?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can connect with Arun on LinkedIn at linkedin.com/in/arunrg3011, explore his code on GitHub at github.com/Arunrg3011, or submit a message via the portfolio contact section."
          }
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      "url": BASE,
      "name": "Arun R. G. — AI Engineer & Full-Stack Developer",
      "isPartOf": { "@id": `${BASE}/#website` },
      "about": { "@id": `${BASE}/#person` },
      "description": "Portfolio of Arun R. G., an AI Engineer and Full-Stack Developer building intelligent software and digital experiences.",
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".hero-tagline", ".about-summary", "article p"]
      }
    }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <title>Arunrg-portfolio</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* ── Resource hints ── */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ip-api.com" />

        {/* ── Structured Data for Google + AI bots ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── LLMs.txt discovery (AI chatbot standard) ── */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />

        {/* ── Custom Search/Keywords XML index for AEO ── */}
        <link rel="search" type="application/xml" href="/searchwords.xml" title="Search Keywords" />

        {/* ── Google Search Console verification ── */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}

        {/* ── Bing Webmaster Tools verification ── */}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
      </head>
      <body suppressHydrationWarning>
        <TrackVisit />
        {children}
        <Analytics />
        <NewsletterPopup />
      </body>
    </html>
  );
}

