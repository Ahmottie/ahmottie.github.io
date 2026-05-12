import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "write — pixel portfolio" },
      { name: "description", content: "Writings, notes, and small essays." },
      { property: "og:title", content: "write — pixel portfolio" },
      { property: "og:description", content: "Writings, notes, and small essays." },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    slug: "hello-world",
    title: "hello world",
    date: "2026-05-01",
    excerpt: "First post in the new blog.",
  },

];

function Blog() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">~ writings ~</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="pixel-card no-underline block hover:border-accent transition-colors"
          >
            <div className="flex justify-between flex-wrap gap-2">
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "1.4rem" }}>
                ✎ {p.title}
              </span>
              <span className="text-muted-foreground">{p.date}</span>
            </div>
            <p className="italic text-muted-foreground mt-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
