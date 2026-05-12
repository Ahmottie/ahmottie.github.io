import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactTrigger } from "@/components/ContactDialog";
import logo from "@/assets/logo.png";
// Socials icons
import githubSocialIcon from "@/assets/social-icons/GitHub_Invertocat_White.svg";
import linkedinSocialIcon from "@/assets/social-icons/InBug-White.png";
// Icons
import htmlIcon from "@/assets/skill-icons/html5.svg";
import cssIcon from "@/assets/skill-icons/css.svg";
import jsIcon from "@/assets/skill-icons/javascript.svg";
import tsIcon from "@/assets/skill-icons/typescript.svg";
import pythonIcon from "@/assets/skill-icons/python.svg";
import rIcon from "@/assets/skill-icons/r.svg";
import javaIcon from "@/assets/skill-icons/Duke_Java.svg";
import nextflowIcon from "@/assets/skill-icons/nextflow.svg";
// Project images
import memoryGameImg from "@/assets/project-pics/memory-game.png";
import websiteImg from "@/assets/project-pics/website-head.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bamshi.dev" },
      {
        name: "description",
        content: "I forgot what's this part for lol",
      },
      { property: "og:title", content: "Amir Hossein Mottie — Computer Scientist" },
      {
        property: "og:description",
        content: "Hi, I'm Amir Hossein Mottie — computer scientist and guitarist.",
      },
    ],
  }),
  component: Index,
});

const CV_URL = "https://drive.google.com/file/d/1Qkm9ZNIzQmVlJ516em4m8l0sgZK1VJF7/view?usp=sharing";
const GITHUB_URL = "https://github.com/Ahmottie";
const LINKEDIN_URL = "https://www.linkedin.com/in/amirhossein-mottie-108798324/";

const skills = [
  { name: "Python", icon: pythonIcon },
  { name: "Java", icon: javaIcon },
  { name: "R", icon: rIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "TypeScript", icon: tsIcon },
  { name: "CSS", icon: cssIcon },
  { name: "HTML", icon: htmlIcon },
  { name: "Nextflow", icon: nextflowIcon },
];

const highlighted = [
  {
    slug: "memory-game",
    name: "Coffee Break Games: Memory Game",
    desc: "Retro 2D memory matching game. Part of my master's Software Engineering project.",
    repo: "https://github.com/Ahmottie/Coffee-Break-Games---Memory-Game",
    live: null as string | null,
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

const writings = [
  {
    slug: "hello-world",
    title: "hello world",
    excerpt: "First post in the new blog.",
  },
];

// ─── Timeline ───────────────────────────────────────────────────────────────
// Each entry has an ISO start date and optional ISO end date (null = ongoing).
// They are sorted by START DATE descending (most recent first).
// When multiple entries overlap (e.g. a degree and a job during that degree),
// they are rendered side-by-side so the reader can see they were concurrent.

type TimelineEntry = {
  kind: "education" | "work";
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null; // null = current/ongoing
  period: string; // human-readable label shown inside the card
  title: string;
  place: string;
  bullets?: string[];
};

const timelineEntries: TimelineEntry[] = [
  {
    kind: "education",
    startDate: "2025-04-21",
    endDate: null,
    period: "21/04/2025 — Present",
    title: "Master's in Computer Science",
    place: "RPTU Kaiserslautern-Landau · Kaiserslautern, Germany",
  },
  {
    kind: "work",
    startDate: "2026-01-02",
    endDate: "2026-05-31",
    period: "02/01/2026 — 31/05/2026",
    title: "University Student Research Assistant",
    place: "RPTU, Department of Biology · Kaiserslautern, Germany",
  },
  {
    kind: "education",
    startDate: "2020-11-15",
    endDate: "2024-07-15",
    period: "15/11/2020 — 15/07/2024",
    title: "Bachelor's in Computer Science",
    place: "University of Mazandaran · Babolsar, Iran",
  },
  {
    kind: "work",
    startDate: "2024-01-31",
    endDate: "2024-04-30",
    period: "31/01/2024 — 30/04/2024",
    title: "Teaching Assistant, Advanced Programming",
    place: "University of Mazandaran · Babolsar, Iran",
  },
  {
    kind: "work",
    startDate: "2023-08-31",
    endDate: "2023-12-31",
    period: "31/08/2023 — 31/12/2023",
    title: "Teaching Assistant, Artificial Intelligence",
    place: "University of Mazandaran · Babolsar, Iran",
  },
];

// Sort by start date descending (most recent first)
function parseDate(d: string) {
  return new Date(d).getTime();
}
const sorted = [...timelineEntries].sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate));

// Group overlapping entries into "rows" so they render side-by-side.
// Two entries overlap when one starts before the other ends.
type TimelineRow = TimelineEntry[];

function buildRows(entries: TimelineEntry[]): TimelineRow[] {
  const rows: TimelineRow[] = [];

  for (const entry of entries) {
    const entryStart = parseDate(entry.startDate);
    const entryEnd = entry.endDate ? parseDate(entry.endDate) : Date.now() + 1e10;

    // Find an existing row where this entry overlaps with at least one existing member
    let placed = false;
    for (const row of rows) {
      const overlaps = row.some((existing) => {
        const eStart = parseDate(existing.startDate);
        const eEnd = existing.endDate ? parseDate(existing.endDate) : Date.now() + 1e10;
        // Intervals overlap when one starts before the other ends
        return entryStart < eEnd && eStart < entryEnd;
      });
      if (overlaps && row.length < 2) {
        row.push(entry);
        placed = true;
        break;
      }
    }
    if (!placed) {
      rows.push([entry]);
    }
  }

  return rows;
}

const timelineRows = buildRows(sorted);
// ─────────────────────────────────────────────────────────────────────────────

function Index() {
  return (
    <SiteLayout>
      <section className="mb-10 text-center">
        <h1
          className="leading-none tracking-tight"
          style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(4rem, 14vw, 10rem)" }}
        >
          Amir Hossein Mottie
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Computer Scientist · Software Engineer · Data Analyst
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="pixel-card md:row-span-2">
          <div className="flex gap-4 mb-4 items-center">
            <img
              src={logo}
              alt="Amir's logo"
              className="w-32 h-32 shrink-0 object-contain"
              style={{ filter: "invert(1)" }}
            />
            <div className="flex-1 space-y-3">
              <div
                className="border border-border rounded-sm px-2 py-1"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.3rem" }}
              >
                <div className="text-muted-foreground">name:</div>
                <div>Amirhossein Mottie</div>
              </div>
              <div
                className="border border-border rounded-sm px-2 py-1"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.3rem" }}
              >
                <div className="text-muted-foreground">role:</div>
                <div>Student</div>
              </div>
            </div>
          </div>
          <p className="leading-relaxed">
            <strong>Hey there, I'm Amir (You can call me Amir or Amir Hossein) </strong> — Computer
            Scientist and Guitarist. I study computer science specialised in Software Engineering,
            AI, and Data Analysis. I enjoy solving complex problems and doing projects.{" "}
            <span className="blink" />
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <ContactTrigger>
              <button className="border border-border rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer click-area">
                Let's connect!
              </button>
            </ContactTrigger>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
            >
              Download CV
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area inline-flex items-center gap-2"
            >
              <img src={githubSocialIcon} alt="GitHub" className="w-5 h-5 object-contain" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area inline-flex items-center gap-2"
            >
              <img src={linkedinSocialIcon} alt="LinkedIn" className="w-5 h-5 object-contain" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pixel-card">
          <div className="pixel-tag mb-3">Focus</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>· Software Engineering</li>
            <li>· AI and Data Science</li>
            <li>· Data Analysis</li>
          </ul>
        </div>

        <div className="pixel-card">
          <div className="pixel-tag mb-3">Status</div>
          <p className="text-muted-foreground">
            Currently looking for jobs, building projects, and learning new things in Java and
            JavaScript.
          </p>
        </div>
      </div>

      {/* ── Skills ── */}
      <div className="my-10 text-center">
        <span className="pixel-tag text-accent">Skills</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((s) => {
          const isJava = s.name === "Java";

          return (
            <div key={s.name} className="pixel-card flex items-center gap-3">
              {isJava ? (
                <div className="bg-white p-1.5 rounded-sm flex items-center justify-center w-10 h-10 shrink-0">
                  <img
                    src={s.icon}
                    alt={`${s.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <img
                  src={s.icon}
                  alt={`${s.name} logo`}
                  className="w-8 h-8 shrink-0 object-contain"
                  loading="lazy"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}

              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem" }}>{s.name}</span>
            </div>
          );
        })}
      </div>

      {/* ── Journey (Timeline) ── */}
      <div className="my-10 text-center">
        <span className="pixel-tag text-accent">Journey</span>
      </div>
      <Timeline rows={timelineRows} />

      {/* ── Highlighted Projects ── */}
      <div className="my-10 text-center">
        <span className="pixel-tag text-accent">Highlighted Projects</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {highlighted.map((p) => (
          <div key={p.slug} className="pixel-card flex flex-col">
            {p.image && (
              <img
                src={p.image}
                alt={`${p.name} screenshot`}
                /* Changed h-44 to h-auto and object-cover to object-contain */
                className="w-full h-auto object-contain rounded-sm mb-3 border border-border"
                loading="lazy"
              />
            )}
            <div className="mb-2" style={{ fontFamily: "var(--font-pixel)", fontSize: "1.5rem" }}>
              ★ {p.name}
            </div>
            <p className="italic text-muted-foreground mb-3 flex-1">{p.desc}</p>
            {p.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="pixel-tag text-accent" style={{ fontSize: "0.85rem" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-md px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.2rem" }}
              >
                Repository →
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-md px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
                  style={{ fontFamily: "var(--font-pixel)", fontSize: "1.2rem" }}
                >
                  Live Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Latest Writing ── */}
      <div className="my-10 text-center">
        <span className="pixel-tag text-accent">Latest Writing</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {writings.map((p) => (
          <div key={p.slug} className="pixel-card flex flex-col">
            <div
              className="flex items-center gap-2 mb-2"
              style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem" }}
            >
              ✎ {p.title}
            </div>
            <p className="italic text-muted-foreground mb-4 flex-1">{p.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="border border-border rounded-md px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors click-area"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.2rem" }}
              >
                read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}

// ── Timeline Component ──────────────────────────────────────────────────────

function Timeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex gap-6 text-xs text-muted-foreground mb-6">
        <span className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-accent" /> Education
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm border-2 border-accent" /> Work
        </span>
        <span className="inline-flex items-center gap-2 text-accent"></span>
      </div>

      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`grid gap-4 ${row.length === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}
        >
          {row.map((entry, entryIdx) => (
            <TimelineCard key={entryIdx} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const isEducation = entry.kind === "education";
  return (
    <div
      className={`pixel-card border-l-4 ${
        isEducation ? "border-l-accent" : "border-l-foreground/40"
      }`}
    >
      {/* Kind badge + period on same row */}
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <span
          className={`pixel-tag text-xs ${isEducation ? "text-accent" : "text-muted-foreground"}`}
          style={{ fontSize: "1.3rem" }}
        >
          {isEducation ? "education" : "work"}
        </span>
        <span
          className="text-muted-foreground"
          style={{ fontFamily: "var(--font-pixel)", fontSize: "1.5rem" }}
        >
          {entry.period}
        </span>
      </div>

      {/* Title */}
      <div className="mb-1" style={{ fontFamily: "var(--font-pixel)", fontSize: "1.5rem" }}>
        {entry.title}
      </div>

      {/* Place */}
      <div className="text-muted-foreground text-sm mb-2">{entry.place}</div>

      {/* Bullets */}
      {entry.bullets && entry.bullets.length > 0 && (
        <ul className="space-y-0.5 mt-2">
          {entry.bullets.map((b, i) => (
            <li key={i} className="text-muted-foreground text-sm">
              · {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
