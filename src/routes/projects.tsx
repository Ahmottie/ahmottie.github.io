import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import memoryGameImg from "@/assets/project-pics/memory-game.png";
import websiteImg from "@/assets/project-pics/website-head.png";

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

type Project = {
  desc: React.ReactNode;
  image?: string;
  live?: string;
  name: string;
  repo: string;
  tag: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "Coffee Break Games: Memory Game",
    tag: "Software Development",
    desc: "Retro 2D memory matching game. Part of my master's Software Engineering project.",
    repo: "https://github.com/Ahmottie/Coffee-Break-Games---Memory-Game",
    image: memoryGameImg,
    tags: ["Java", "Game Development", "Requirement Engineering", "Project Management", "Git"],
  },
  {
    name: "Bamshi.dev — Personal Website",
    tag: "Web Design",
    desc: (
      <>
        My personal portfolio and blog. Built with TanStack Start, React, TypeScript, and Tailwind.
        The theme is influenced by{" "}
        <a
          href="https://github.com/danapixels/digio-theme"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent transition-colors"
        >
          digio-theme
        </a>
      </>
    ),
    repo: "https://github.com/Ahmottie/ahmottie.github.io",
    image: websiteImg,
    live: "https://bamshi.dev",
    tags: ["Web Design", "TypeScript", "React", "Tailwind", "Git"],
  },
];

function Projects() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">Portfolio</h1>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div key={p.name} className="pixel-card flex flex-col">
            {p.image && (
              <img
                src={p.image}
                alt={`${p.name} screenshot`}
                className="w-full h-auto object-contain rounded-sm mb-3 border border-border"
                loading="lazy"
              />
            )}
            <div className="flex justify-between items-start gap-3 mb-2">
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem" }}>{p.name}</span>
              <span className="pixel-tag text-accent shrink-0">{p.tag}</span>
            </div>
            <p className="text-muted-foreground mb-3 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map((t) => (
                <span key={t} className="pixel-tag text-accent" style={{ fontSize: "0.85rem" }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-md px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.1rem" }}
              >
                Repository →
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-md px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
                  style={{ fontFamily: "var(--font-pixel)", fontSize: "1.1rem" }}
                >
                  Live Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
