const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const projects = [
  {
    file: 'arise.png',
    num: '01',
    title: 'ARISE',
    category: 'PERSONAL AI OPERATING SYSTEM',
    badge: 'LLAMA 3.3 · PGVECTOR · REALTIME',
    accent: '#ff6b1a',
    accentLight: '#ff9d42',
    bgDark: '#0d0906',
    iconType: 'ai-core',
    metrics: ['STATUS: ACTIVE', 'LATENCY: < 12ms', 'SYNC: SOCKET.IO']
  },
  {
    file: 'ragguard.png',
    num: '02',
    title: 'RagGuard',
    category: 'AI INCIDENT TELEMETRY & SAFETY',
    badge: 'DECENTRALIZED SOS · RISK GRADING',
    accent: '#ef4444',
    accentLight: '#f87171',
    bgDark: '#0f0606',
    iconType: 'shield',
    metrics: ['RISK: TELEMETRY ACTIVE', 'ENCRYPTION: AES-256', 'PROTOCOL: P2P']
  },
  {
    file: 'resume-maker.png',
    num: '03',
    title: 'AI Resume Maker',
    category: 'CAREER TOOLS & ATS PARSER',
    badge: 'GOOGLE GEMINI · 98% ATS MATCH',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    bgDark: '#090611',
    iconType: 'doc',
    metrics: ['TEMPLATES: 13 STYLES', 'PARSER: PDF/LATEX', 'SCORE: 98/100']
  },
  {
    file: 'context-aware-hashtags.png',
    num: '04',
    title: 'Context Hashtags',
    category: 'KNOWLEDGE GRAPH & NLP PIPELINE',
    badge: 'ENTITY EXTRACTION · FASTAPI',
    accent: '#06b6d4',
    accentLight: '#38bdf8',
    bgDark: '#040b10',
    iconType: 'graph',
    metrics: ['NODES: 10K+ ENTITIES', 'MODEL: NLP HYBRID', 'SPEED: 4ms']
  },
  {
    file: 'schemelink.png',
    num: '05',
    title: 'SchemeLink',
    category: 'CITIZEN WELFARE & OCR MATCHER',
    badge: 'AADHAAR OCR · AI MATCHING',
    accent: '#10b981',
    accentLight: '#34d399',
    bgDark: '#040f0a',
    iconType: 'ocr',
    metrics: ['OCR: SMART EXTRACT', 'MATCH ACCURACY: 99%', 'REGISTRY: GOV']
  },
  {
    file: 'course-recommender.png',
    num: '06',
    title: 'Course & Book AI',
    category: 'MULTILINGUAL RECOMMENDATION',
    badge: 'ICSDET\'26 RESEARCH · NLP',
    accent: '#6366f1',
    accentLight: '#818cf8',
    bgDark: '#070714',
    iconType: 'book',
    metrics: ['RESEARCH: ICSDET\'26', 'LANGUAGES: MULTI', 'RECALL: 94.6%']
  },
  {
    file: 'trendtrim-salon.png',
    num: '07',
    title: 'TrendTrim Salon',
    category: 'FULL-STACK APPOINTMENT ENGINE',
    badge: 'REAL-TIME SLOTS · VERCEL LIVE',
    accent: '#ec4899',
    accentLight: '#f472b6',
    bgDark: '#12040c',
    iconType: 'salon',
    metrics: ['SLOTS: REAL-TIME SYNC', 'DB: POSTGRES', 'STATUS: LIVE']
  },
  {
    file: 'anii-gold-scheme.png',
    num: '08',
    title: 'Anii Gold Admin',
    category: 'GOLD SCHEME ADMINISTRATIVE LEDGER',
    badge: 'DUES TRACKING · SECURE RBAC',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    bgDark: '#110b02',
    iconType: 'gold',
    metrics: ['LEDGER: AUDITED', 'AUTH: MULTI-TIER', 'TRANSACTIONS: 10K+']
  },
  {
    file: 'cafe-menu-generator.png',
    num: '09',
    title: 'Cafe Menu Card',
    category: 'INTERACTIVE DESIGN GENERATOR',
    badge: 'TYPESCRIPT · REACT · TAILWIND',
    accent: '#d97706',
    accentLight: '#f59e0b',
    bgDark: '#100802',
    iconType: 'coffee',
    metrics: ['PREVIEW: DYNAMIC SVG', 'EXPORT: PRINT HD', 'LAYOUTS: 8']
  },
  {
    file: 'employee-management.png',
    num: '10',
    title: 'Employee System',
    category: 'ENTERPRISE JAVA BACKEND',
    badge: 'ROLE-BASED ACCESS · MODULAR OOP',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    bgDark: '#040812',
    iconType: 'enterprise',
    metrics: ['ARCHITECTURE: MODULAR', 'SECURITY: RBAC', 'DB: RELATIONAL']
  },
  {
    file: 'parallax-auth.png',
    num: '11',
    title: '3D Parallax Auth',
    category: 'CREATIVE 3D AUTH INTERFACE',
    badge: 'CSS 3D · MICRO-INTERACTIONS',
    accent: '#d946ef',
    accentLight: '#e879f9',
    bgDark: '#110414',
    iconType: 'parallax',
    metrics: ['PERSPECTIVE: 1000PX', 'FPS: 60FPS LOCKED', 'ACCENT: NEON']
  },
  {
    file: 'portfolio-2025.png',
    num: '12',
    title: 'Portfolio 2025',
    category: 'CINEMATIC CREATIVE PORTFOLIO',
    badge: 'NEXT.JS 15 · THREE.JS · LENIS',
    accent: '#ff6b1a',
    accentLight: '#ff9d42',
    bgDark: '#080808',
    iconType: 'portfolio',
    metrics: ['FPS: 120Hz ULTRA', 'SHADERS: OPTIMIZED', 'DEPLOY: VERCEL']
  },
  {
    file: 'kln-event-register.png',
    num: '13',
    title: 'KLN Event Portal',
    category: 'CAMPUS SYMPOSIUM REGISTRATION',
    badge: 'KLN COLLEGE OF ENG · LIVE PORTAL',
    accent: '#0284c7',
    accentLight: '#38bdf8',
    bgDark: '#030a10',
    iconType: 'ticket',
    metrics: ['ATTENDEES: 1500+', 'PASS: DIGITAL QR', 'STATUS: VERIFIED']
  }
];

function getIconSvg(type, color) {
  switch (type) {
    case 'ai-core':
      return `
        <circle cx="400" cy="450" r="140" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
        <circle cx="400" cy="450" r="105" fill="none" stroke="${color}" stroke-width="3" opacity="0.8"/>
        <circle cx="400" cy="450" r="70" fill="${color}" fill-opacity="0.1" stroke="${color}" stroke-width="1.5"/>
        <circle cx="400" cy="450" r="30" fill="${color}" fill-opacity="0.9"/>
        <line x1="260" y1="450" x2="540" y2="450" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
        <line x1="400" y1="310" x2="400" y2="590" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
      `;
    case 'shield':
      return `
        <polygon points="400,310 520,360 520,490 400,580 280,490 280,360" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="3"/>
        <polygon points="400,345 490,380 490,475 400,545 310,475 310,380" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6" stroke-dasharray="6 4"/>
        <circle cx="400" cy="445" r="45" fill="${color}" fill-opacity="0.3"/>
        <path d="M380,445 L395,460 L425,430" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    case 'doc':
      return `
        <rect x="290" y="320" width="220" height="270" rx="16" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="3"/>
        <line x1="330" y1="380" x2="470" y2="380" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
        <line x1="330" y1="415" x2="450" y2="415" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <line x1="330" y1="440" x2="470" y2="440" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <line x1="330" y1="465" x2="410" y2="465" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <circle cx="440" cy="515" r="35" fill="${color}" fill-opacity="0.9"/>
        <text x="440" y="522" font-family="sans-serif" font-size="16" font-weight="bold" fill="#000" text-anchor="middle">98%</text>
      `;
    case 'graph':
      return `
        <line x1="320" y1="360" x2="480" y2="400" stroke="${color}" stroke-width="2" opacity="0.5"/>
        <line x1="320" y1="360" x2="380" y2="520" stroke="${color}" stroke-width="2" opacity="0.5"/>
        <line x1="480" y1="400" x2="450" y2="540" stroke="${color}" stroke-width="2" opacity="0.5"/>
        <line x1="380" y1="520" x2="450" y2="540" stroke="${color}" stroke-width="2" opacity="0.5"/>
        <circle cx="320" cy="360" r="28" fill="${color}" fill-opacity="0.8"/>
        <circle cx="480" cy="400" r="36" fill="${color}" fill-opacity="0.9"/>
        <circle cx="380" cy="520" r="24" fill="${color}" fill-opacity="0.7"/>
        <circle cx="450" cy="540" r="20" fill="${color}" fill-opacity="0.6"/>
        <circle cx="400" cy="440" r="16" fill="#fff" fill-opacity="0.9"/>
        <line x1="400" y1="440" x2="480" y2="400" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
      `;
    case 'ocr':
      return `
        <rect x="290" y="340" width="220" height="150" rx="12" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="2.5"/>
        <line x1="280" y1="415" x2="520" y2="415" stroke="${color}" stroke-width="4" opacity="0.9"/>
        <circle cx="340" cy="400" r="24" fill="${color}" fill-opacity="0.5"/>
        <rect x="380" y="380" width="100" height="10" rx="3" fill="${color}" opacity="0.8"/>
        <rect x="380" y="400" width="70" height="8" rx="3" fill="${color}" opacity="0.5"/>
        <rect x="380" y="418" width="85" height="8" rx="3" fill="${color}" opacity="0.5"/>
        <path d="M260,320 L290,320 M260,320 L260,350" stroke="${color}" stroke-width="3" fill="none"/>
        <path d="M540,320 L510,320 M540,320 L540,350" stroke="${color}" stroke-width="3" fill="none"/>
        <path d="M260,510 L290,510 M260,510 L260,480" stroke="${color}" stroke-width="3" fill="none"/>
        <path d="M540,510 L510,510 M540,510 L540,480" stroke="${color}" stroke-width="3" fill="none"/>
      `;
    case 'book':
      return `
        <path d="M400,490 Q340,450 280,460 L280,360 Q340,350 400,390 Q460,350 520,360 L520,460 Q460,450 400,490 Z" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="3"/>
        <line x1="400" y1="390" x2="400" y2="490" stroke="${color}" stroke-width="2.5"/>
        <circle cx="400" cy="330" r="20" fill="${color}" fill-opacity="0.9"/>
        <polygon points="400,315 407,328 420,330 410,340 412,352 400,345 388,352 390,340 380,330 393,328" fill="#fff"/>
      `;
    case 'salon':
      return `
        <circle cx="340" cy="420" r="35" fill="none" stroke="${color}" stroke-width="4"/>
        <circle cx="460" cy="420" r="35" fill="none" stroke="${color}" stroke-width="4"/>
        <line x1="365" y1="400" x2="480" y2="520" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
        <line x1="435" y1="400" x2="320" y2="520" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="400" cy="445" r="8" fill="#fff"/>
      `;
    case 'gold':
      return `
        <polygon points="340,460 460,460 500,510 300,510" fill="${color}" fill-opacity="0.8"/>
        <polygon points="300,510 500,510 480,540 280,540" fill="${color}" fill-opacity="0.5"/>
        <polygon points="360,390 480,390 520,440 320,440" fill="${color}" fill-opacity="0.9"/>
        <polygon points="320,440 520,440 500,470 300,470" fill="${color}" fill-opacity="0.6"/>
        <text x="400" y="420" font-family="sans-serif" font-size="14" font-weight="900" fill="#000" text-anchor="middle">999.9 FINE GOLD</text>
      `;
    case 'coffee':
      return `
        <path d="M310,380 L325,480 Q330,510 400,510 Q470,510 475,480 L490,380 Z" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="3.5"/>
        <path d="M485,400 Q530,405 525,445 Q520,470 478,465" fill="none" stroke="${color}" stroke-width="3.5"/>
        <path d="M350,350 Q360,320 350,290" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <path d="M400,350 Q410,320 400,290" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <path d="M450,350 Q460,320 450,290" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <ellipse cx="400" cy="520" rx="90" ry="8" fill="${color}" opacity="0.4"/>
      `;
    case 'enterprise':
      return `
        <rect x="340" y="330" width="120" height="50" rx="8" fill="${color}" fill-opacity="0.9"/>
        <line x1="400" y1="380" x2="400" y2="430" stroke="${color}" stroke-width="2.5"/>
        <line x1="300" y1="430" x2="500" y2="430" stroke="${color}" stroke-width="2.5"/>
        <line x1="300" y1="430" x2="300" y2="460" stroke="${color}" stroke-width="2.5"/>
        <line x1="500" y1="430" x2="500" y2="460" stroke="${color}" stroke-width="2.5"/>
        <rect x="250" y="460" width="100" height="45" rx="6" fill="${color}" fill-opacity="0.5"/>
        <rect x="450" y="460" width="100" height="45" rx="6" fill="${color}" fill-opacity="0.5"/>
        <circle cx="400" cy="355" r="10" fill="#fff"/>
        <circle cx="300" cy="482" r="8" fill="#fff"/>
        <circle cx="500" cy="482" r="8" fill="#fff"/>
      `;
    case 'parallax':
      return `
        <polygon points="400,320 540,380 400,440 260,380" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="2"/>
        <polygon points="400,390 540,450 400,510 260,450" fill="${color}" fill-opacity="0.45" stroke="${color}" stroke-width="2.5"/>
        <polygon points="400,460 540,520 400,580 260,520" fill="${color}" fill-opacity="0.75" stroke="${color}" stroke-width="3"/>
        <circle cx="400" cy="450" r="12" fill="#fff"/>
      `;
    case 'portfolio':
      return `
        <rect x="270" y="330" width="260" height="170" rx="14" fill="none" stroke="${color}" stroke-width="3"/>
        <circle cx="295" cy="350" r="4" fill="${color}"/>
        <circle cx="310" cy="350" r="4" fill="${color}" opacity="0.6"/>
        <circle cx="325" cy="350" r="4" fill="${color}" opacity="0.3"/>
        <line x1="270" y1="365" x2="530" y2="365" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
        <polygon points="380,410 440,440 380,470" fill="${color}"/>
        <rect x="360" y="500" width="80" height="20" rx="4" fill="${color}" opacity="0.5"/>
        <line x1="330" y1="520" x2="470" y2="520" stroke="${color}" stroke-width="3"/>
      `;
    case 'ticket':
      return `
        <rect x="270" y="340" width="260" height="160" rx="14" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="3"/>
        <line x1="430" y1="340" x2="430" y2="500" stroke="${color}" stroke-width="2" stroke-dasharray="6 6"/>
        <circle cx="430" cy="340" r="14" fill="#080808"/>
        <circle cx="430" cy="500" r="14" fill="#080808"/>
        <rect x="445" y="380" width="70" height="70" fill="${color}" fill-opacity="0.8"/>
        <text x="350" y="410" font-family="sans-serif" font-size="20" font-weight="900" fill="#fff">KLNCE</text>
        <text x="350" y="435" font-family="sans-serif" font-size="12" font-weight="bold" fill="${color}">VIP PASS 2026</text>
      `;
    default:
      return `<circle cx="400" cy="450" r="60" fill="${color}"/>`;
  }
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateSvg(p) {
  return `
<svg width="800" height="1000" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="${p.bgDark}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
    </radialGradient>

    <!-- Glowing Accent Gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.accentLight}"/>
      <stop offset="100%" stop-color="${p.accent}"/>
    </linearGradient>

    <!-- Subtle Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>

    <filter id="glowBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="35"/>
    </filter>
  </defs>

  <!-- Base Dark Canvas -->
  <rect width="800" height="1000" fill="#070707"/>
  <rect width="800" height="1000" fill="url(#bgGrad)"/>
  <rect width="800" height="1000" fill="url(#grid)"/>

  <!-- Border Card Frame -->
  <rect x="24" y="24" width="752" height="952" rx="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
  <rect x="24" y="24" width="752" height="952" rx="28" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.3"/>

  <!-- Corner Brackets -->
  <path d="M 48 36 L 36 36 L 36 48" fill="none" stroke="${p.accent}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 752 36 L 764 36 L 764 48" fill="none" stroke="${p.accent}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 48 964 L 36 964 L 36 952" fill="none" stroke="${p.accent}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 752 964 L 764 964 L 764 952" fill="none" stroke="${p.accent}" stroke-width="3" stroke-linecap="round"/>

  <!-- Header -->
  <g transform="translate(60, 80)">
    <!-- Number Tag -->
    <rect x="0" y="0" width="54" height="28" rx="6" fill="${p.accent}" fill-opacity="0.18" stroke="${p.accent}" stroke-width="1"/>
    <text x="27" y="19" font-family="monospace" font-size="13" font-weight="900" fill="${p.accentLight}" text-anchor="middle">${p.num}</text>

    <!-- Category -->
    <text x="70" y="19" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="${p.accent}" letter-spacing="3">${escapeXml(p.category)}</text>
  </g>

  <!-- Central Technical Graphic / Icon Area -->
  <g id="centerGraphic">
    <!-- Ambient Glow behind icon -->
    <circle cx="400" cy="450" r="150" fill="${p.accent}" fill-opacity="0.14" filter="url(#glowBlur)"/>
    ${getIconSvg(p.iconType, p.accent)}
  </g>

  <!-- Bottom Details & Typography -->
  <g transform="translate(60, 680)">
    <!-- Badge Pill -->
    <rect x="0" y="0" width="380" height="28" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <circle cx="14" cy="14" r="4" fill="${p.accent}"/>
    <text x="28" y="18" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#ffffff" fill-opacity="0.8" letter-spacing="1.5">${escapeXml(p.badge)}</text>

    <!-- Main Project Title -->
    <text x="0" y="80" font-family="'Inter', sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-1">
      ${escapeXml(p.title)}
    </text>

    <!-- Thin Divider -->
    <line x1="0" y1="120" x2="680" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- Telemetry Metrics Bar -->
    <g transform="translate(0, 155)">
      ${p.metrics.map((m, idx) => `
        <g transform="translate(${idx * 230}, 0)">
          <rect x="0" y="-14" width="6" height="6" rx="1" fill="${p.accent}"/>
          <text x="14" y="-8" font-family="monospace" font-size="10" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="1">${escapeXml(m)}</text>
        </g>
      `).join('')}
    </g>
  </g>

  <!-- Top Right Engineering Watermark -->
  <text x="730" y="90" font-family="monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.2)" text-anchor="end">ARUN // 2026</text>
  <line x1="680" y1="102" x2="730" y2="102" stroke="${p.accent}" stroke-width="2"/>
</svg>
`;
}

async function run() {
  console.log(`Generating ${projects.length} bespoke project artwork covers...`);
  for (const p of projects) {
    const svgStr = generateSvg(p);
    const dest = path.join(outDir, p.file);
    await sharp(Buffer.from(svgStr))
      .png({ quality: 90 })
      .toFile(dest);
    console.log(`✓ Generated ${p.file}`);
  }
  console.log('All 13 project covers generated successfully!');
}

run().catch(console.error);
