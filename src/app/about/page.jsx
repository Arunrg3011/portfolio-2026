import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";

export const metadata = {
  title:       "About — Arun R. G. | AI Engineer & Full-Stack Developer",
  description: "About Arun R. G. — Information Technology student at K.L.N. College of Engineering specializing in Artificial Intelligence, Machine Learning, and Full-Stack Engineering.",
  keywords:    ["Arun R. G.", "AI Engineer", "Full-Stack Developer", "K.L.N. College of Engineering", "Machine Learning", "React", "Next.js", "Python", "Arun portfolio"],
  alternates:  { canonical: "https://portfolio-arun3011.vercel.app/about" },
  openGraph: {
    title: "About — Arun R. G. | AI Engineer & Full-Stack Developer",
    description: "AI Engineer and Full-Stack Developer turning ideas into practical software with AI, robust backends, and creative engineering.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <PageShell>
      <AboutPage />
    </PageShell>
  );
}
