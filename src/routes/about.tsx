import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — Amir" },
      {
        name: "description",
        content:
          "About Amir — a passionate Computer Scientist focused on Software Engineering, AI, Data Analysis, and Automation.",
      },
      { property: "og:title", content: "about — Amir" },
      { property: "og:description", content: "About Amir — a passionate Computer Scientist." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <h1 className="text-3xl mb-6">{"> About"}</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="pixel-card md:col-span-2 space-y-4 leading-relaxed">
          <p>I'm a developer focused on Software Engineering, AI, Data Analysis, and Automation.</p>
          <p>I enjoy solving complex problems.</p>
          <p className="text-muted-foreground">
            Always curious, always tinkering — whether that's training a model, automating a boring
            workflow, or shipping a small side project.
          </p>
        </div>
        <div className="space-y-5">
          <div className="pixel-card">
            <div className="pixel-tag mb-3">topics</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>· Software Engineering</li>
              <li>· AI</li>
              <li>· Data Analysis</li>
              <li>· Automation</li>
            </ul>
          </div>
          <div className="pixel-card">
            <div className="pixel-tag mb-3">loves</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>♡ clean code</li>
              <li>♡ open source</li>
              <li>♡ hard problems</li>
              <li>♡ good coffee</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
