import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
// Social Icons
import githubSocialIcon from "@/assets/social-icons/GitHub_Invertocat_White.svg";
import linkedinSocialIcon from "@/assets/social-icons/InBug-White.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contacts — Amir" },
      { name: "description", content: "Reach out to me via LinkedIn, GitHub, or email." },
      { property: "og:title", content: "contacts — Amir" },
      { property: "og:description", content: "Reach out via LinkedIn, GitHub, or email." },
    ],
  }),
  component: Contact,
});

const links = [
  {
    label: "GitHub",
    logo: githubSocialIcon,
    href: "https://github.com/Ahmottie",
  },
  {
    label: "LinkedIn",
    logo: linkedinSocialIcon,
    href: "https://www.linkedin.com/in/amirhossein-mottie-108798324/",
  },
  { label: "Email", logo: null, href: "mailto:hello@bamshi.dev" },
];

function Contact() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">Say hi</h1>
      <div className="pixel-card space-y-5">
        <p className="leading-relaxed">
          Want to get in touch? I'm always open. Feel free to reach out via email, LinkedIn, or
          GitHub.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border rounded-md px-4 py-3 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
            >
              {l.logo ? (
                <img src={l.logo} alt={`${l.label} logo`} className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "1.25rem" }}>
                {l.label}
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <ContactForm />
      </div>
    </SiteLayout>
  );
}
