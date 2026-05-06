import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "portfolio — Amir" },
      { name: "description", content: "Selected projects and experiments by Amir." },
      { property: "og:title", content: "portfolio — Amir" },
      { property: "og:description", content: "Selected projects and experiments." },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    name: "Coffee Break Games: Memory Game",
    tag: "Software Development",
    desc: "Retro 2D memory matching game. Built with a focus on game logic, pattern designs, and Requirement Engineering.",
    link: "https://github.com/Ahmottie/Coffee-Break-Games---Memory-Game",
  },
];

function Projects() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">{"> Portfolio"}</h1>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-card no-underline block hover:border-accent transition-colors"
          >
            <div className="flex justify-between items-start gap-3 mb-2">
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem" }}>{p.name}</span>
              <span className="pixel-tag text-accent shrink-0">{p.tag}</span>
            </div>
            <p className="text-muted-foreground mb-3">{p.desc}</p>
            <span className="text-accent">repository →</span>
          </a>
        ))}
      </div>
    </SiteLayout>
  );
}
