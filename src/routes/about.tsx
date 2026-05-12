import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — Amir" },
      {
        name: "description",
        content: "This is my about page.",
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
      <h1 className="text-3xl mb-6">About me</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="pixel-card md:col-span-2 space-y-4 leading-relaxed">
          <p>
            My name is Amirhossein Mottie and I study Computer Science Master's at RPTU
            Kaiserslautern.
          </p>
          <p>I enjoy solving puzzles and problems.</p>
          <p className="text-muted-foreground">Always looking for new projects and journey.</p>
        </div>
        <div className="space-y-5">
          <div className="pixel-card">
            <div className="pixel-tag mb-3">Topics</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>· Programming</li>
              <li>· Computer Science</li>
              <li>· Tech</li>
              <li>· Hobbies</li>
            </ul>
          </div>
          <div className="pixel-card">
            <div className="pixel-tag mb-3">Loves</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>♡ Cats</li>
              <li>♡ Playing Guitar</li>
              <li>♡ Java</li>
              <li>♡ Linux</li>
              <li>♡ kaiser Wilhelm II</li>
              <li>♡ Iranian Tea</li>
              <li>♡ Anime and Manga</li>
            </ul>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
