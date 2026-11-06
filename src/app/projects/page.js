import { Suspense } from "react";
import Cursor from "../../components/Cursor";
import Navbar from "../../components/Navbar";
import ProjectsPage from "../../views/projects";

export const metadata = {
  title:       "Projects — AI & Full-Stack Projects by Arun R. G.",
  description: "Explore AI systems, full-stack applications, computer vision tools, and research projects built by Arun R. G.",
  keywords:    ["AI projects", "ARISE", "AI Resume Builder", "SchemeLink", "Course Recommender", "INTERSECT AI", "Full-Stack Developer", "Arun R. G."],
  alternates:  { canonical: "https://portfolio-arun3011.vercel.app/projects" },
  openGraph: {
    title: "Projects — Arun R. G. | AI Systems & Engineering",
    description: "Explore real AI, machine learning, and full-stack software built by Arun R. G.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
          <ProjectsPage />
        </Suspense>
      </div>
    </main>
  );
}
