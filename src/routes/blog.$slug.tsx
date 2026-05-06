import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — write` },
      { name: "description", content: `Blog post: ${params.slug}` },
      { property: "og:title", content: `${params.slug} — write` },
      { property: "og:description", content: `Blog post: ${params.slug}` },
    ],
  }),
  component: Post,
});

function Post() {
  const { slug } = Route.useParams();
  return (
    <SiteLayout>
      <Link to="/blog" className="text-muted-foreground no-underline hover:text-accent">
        ← back to writings
      </Link>
      <article className="pixel-card mt-4 space-y-4 leading-relaxed">
        <h1 className="text-3xl">{slug.replace(/-/g, " ")}</h1>
        <p className="text-muted-foreground">
          a placeholder post — replace me with your own words.
        </p>
        <p>
          This is where the post body lives. Add your markdown, MDX, or plain JSX here. Until then,
          enjoy this little ASCII friend:
        </p>
        <pre className="bg-muted p-4 rounded-sm overflow-auto text-xs">{`   /\\_/\\
  ( o.o )
   > ^ <`}</pre>
      </article>
    </SiteLayout>
  );
}
