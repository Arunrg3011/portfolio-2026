/**
 * SeoContent — Hidden semantic HTML for search engines & AI crawlers.
 * 
 * Renders keyword-rich, structured text that search engines
 * and AI bots can crawl, aligned with Arun R. G.'s real engineering identity.
 */
export default function SeoContent() {
  return (
    <div
      className="sr-only"
      aria-hidden="false"
      itemScope
      itemType="https://schema.org/Person"
    >
      <h1 itemProp="name">Arun R. G. — AI Engineer & Full-Stack Developer</h1>
      
      <p itemProp="description">
        AI Engineer and Full-Stack Developer studying Information Technology at K.L.N. College of Engineering (2024–2028).
        Specializing in Artificial Intelligence, Machine Learning, Computer Vision, Full-Stack Web Engineering, RESTful APIs,
        and high-performance interactive digital experiences.
      </p>

      <p itemProp="jobTitle">AI Engineer & Full-Stack Developer</p>

      <section aria-label="Core Engineering Domains">
        <h2>Engineering Disciplines — Arun R. G.</h2>
        
        <article>
          <h3>Artificial Intelligence & Machine Learning</h3>
          <p>
            Building intelligent applications, machine learning models, computer vision systems with YOLO and OpenCV,
            and integrating LLM APIs (Groq, Gemini, OpenAI) to power intelligent decision systems and automated document analysis.
          </p>
        </article>

        <article>
          <h3>Full-Stack Web Development</h3>
          <p>
            Architecting modern scalable web applications using React, Next.js, Node.js, Express, PostgreSQL, Supabase,
            Prisma ORM, and RESTful APIs with clean design systems, responsive interfaces, and cinematic animations.
          </p>
        </article>

        <article>
          <h3>Academic Research & Innovations</h3>
          <p>
            Author and presenter of the AI-Enabled Course Recommender System at ICSDET'26 (K.L.N. College of Engineering, March 2026),
            exploring multilingual NLP and intelligent educational pathways.
          </p>
        </article>
      </section>

      <section aria-label="Featured Projects">
        <h2>Key Projects</h2>
        <ul>
          <li><strong>ARISE:</strong> Personal AI Operating System unifying task management, scheduling, and Groq LLM assistance.</li>
          <li><strong>AI Resume Builder & Parser:</strong> Automated PDF parsing, ATS keyword alignment, and Gemini API enhancement.</li>
          <li><strong>SchemeLink:</strong> Citizen welfare scheme matching engine utilizing document OCR and intelligent profile evaluation.</li>
          <li><strong>Course Recommender System:</strong> Multilingual educational recommendation system presented at ICSDET'26.</li>
          <li><strong>INTERSECT AI:</strong> Smart traffic management prototype leveraging YOLO and computer vision for emergency vehicle priority.</li>
          <li><strong>AI Campus Media Studio:</strong> Automated campus media design workflows integrating Flutter, Laravel, and MySQL.</li>
        </ul>
      </section>

      <section aria-label="Technical Skills">
        <h2>Technical Competencies</h2>
        <p itemProp="knowsAbout">
          Python, JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Java, PHP, Laravel,
          PostgreSQL, Supabase, MySQL, MongoDB, Prisma, Git, GitHub, Vercel, REST APIs,
          Machine Learning, Computer Vision, YOLO, OpenCV, Groq API, Gemini API, OCR, Tailwind CSS
        </p>
      </section>

      <section aria-label="Education & Background">
        <h2>Education & Background</h2>
        <p>
          B.Tech in Information Technology at K.L.N. College of Engineering, Pottapalayam, Sivagangai, Tamil Nadu (2024–2028).
          Previous internship experience with Dream Yours Infotech Consulting & Services, CODSOFT, and OctaNet.
        </p>
      </section>

      <section aria-label="Profiles and Connect">
        <h2>Professional Profiles</h2>
        <p>
          <a href="https://linkedin.com/in/arunrg3011">LinkedIn: linkedin.com/in/arunrg3011</a> |
          <a href="https://github.com/Arunrg3011">GitHub: github.com/Arunrg3011</a> |
          <a href="https://portfolio-arun3011.vercel.app">Portfolio: portfolio-arun3011.vercel.app</a>
        </p>
      </section>
    </div>
  );
}
