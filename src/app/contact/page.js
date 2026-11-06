import PageShell from "@/components/PageShell";
import ContactPage from "@/views/contact";

export const metadata = {
  title:       "Contact — Connect with Arun R. G. | AI Engineer & Full-Stack Developer",
  description: "Get in touch with Arun R. G. to collaborate on AI-powered products, full-stack web applications, and creative engineering projects.",
  keywords:    ["Contact Arun R. G.", "Hire AI Engineer", "Full-Stack Developer India", "AI developer contact", "K.L.N. College of Engineering"],
  alternates:  { canonical: "https://portfolio-arun3011.vercel.app/contact" },
  openGraph: {
    title: "Contact — Arun R. G. | AI Engineer & Full-Stack Developer",
    description: "Get in touch with Arun R. G. for meaningful projects, AI applications, and engineering opportunities.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
