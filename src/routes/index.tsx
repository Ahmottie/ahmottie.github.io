import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactTrigger } from "@/components/ContactDialog";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amir — Computer Scientist" },
      {
        name: "description",
        content:
          "Hey there, I'm Amir — a passionate Computer Scientist working on Software Engineering, AI, Data Analysis, and Automation.",
      },
      { property: "og:title", content: "Amir — Computer Scientist" },
      {
        property: "og:description",
        content: "Hey there, I'm Amir — a passionate Computer Scientist.",
      },
    ],
  }),
  component: Index,
});

const CV_URL = "https://drive.google.com/file/d/1Qkm9ZNIzQmVlJ516em4m8l0sgZK1VJF7/view?usp=sharing";

function Index() {
  return (
    <SiteLayout>
      <section className="mb-10 text-center">
        <h1
          className="leading-none tracking-tight"
          style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(4rem, 14vw, 10rem)" }}
        >
          Amir
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Computer Scientist · Software · AI · Automation
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
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.1rem" }}
              >
                <div className="text-muted-foreground">name:</div>
                <div>Amir</div>
              </div>
              <div
                className="border border-border rounded-sm px-2 py-1"
                style={{ fontFamily: "var(--font-pixel)", fontSize: "1.1rem" }}
              >
                <div className="text-muted-foreground">role:</div>
                <div>Computer Scientist</div>
              </div>
            </div>
          </div>
          <p className="leading-relaxed">
            <strong>Hey there, I'm Amir</strong> — a passionate Computer Scientist. I work across
            Software Engineering, AI, Data Analysis, and Automation, and I enjoy solving complex
            problems. <span className="blink" />
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <ContactTrigger>
              <button className="border border-border rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer">
                Let's connect!
              </button>
            </ContactTrigger>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-sm px-4 py-2 no-underline hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="pixel-card">
          <div className="pixel-tag mb-3">focus</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>· Software Engineering</li>
            <li>· AI</li>
            <li>· Data Analysis</li>
            <li>· Automation</li>
          </ul>
        </div>

        <div className="pixel-card">
          <div className="pixel-tag mb-3">status</div>
          <div className="text-accent mb-2">♥ ♥ ♡</div>
          <p className="text-muted-foreground">
            Currently building things, breaking things, and learning something new every week.
          </p>
        </div>
      </div>

      <div className="my-10 text-center">
        <span className="pixel-tag text-accent">latest writing</span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            slug: "hello-world",
            title: "hello world",
            excerpt: "First post in the new blog — why I rebuilt everything.",
          },
          {
            slug: "design-tools",
            title: "tools I love",
            excerpt: "A short list of small tools that make a big difference.",
          },
        ].map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="pixel-card no-underline block hover:border-accent transition-colors"
          >
            <div
              className="flex items-center gap-2 mb-2"
              style={{ fontFamily: "var(--font-pixel)", fontSize: "1.25rem" }}
            >
              ✎ {p.title}
            </div>
            <p className="italic text-muted-foreground mb-3">{p.excerpt}</p>
            <span className="text-accent">read more →</span>
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
