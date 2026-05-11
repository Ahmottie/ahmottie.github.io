import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contacts — Amir" },
      { name: "description", content: "Reach out to Amir via LinkedIn, GitHub, or email." },
      { property: "og:title", content: "contacts — Amir" },
      { property: "og:description", content: "Reach out via LinkedIn, GitHub, or email." },
    ],
  }),
  component: Contact,
});

const links = [
  { label: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff", href: "https://github.com/Ahmottie" },
  { label: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin", href: "https://www.linkedin.com/in/amirhossein-mottie-108798324/" },
  { label: "Email", logo: null, href: "mailto:hello@bamshi.dev" },
];

function Contact() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">Say hi</h1>
      <div className="pixel-card space-y-5">
        <p className="leading-relaxed">
          Want to chat about software, AI, or a project idea? Pick your favorite way to reach out —
          I'd love to hear from you.
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
