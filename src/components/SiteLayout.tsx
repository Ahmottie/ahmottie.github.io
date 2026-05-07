import { Link, Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useContact } from "@/components/ContactDialog";

const nav = [
  { to: "/", label: "₍^. .^₎⟆" },
  { to: "/about", label: "about me" },
  { to: "/blog", label: "blog" },
  { to: "/contact", label: "contacts" },
] as const;

export function SiteLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 md:px-10 py-5 border-b border-border/30">
        <nav className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base">
          {nav.map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className="no-underline hover:text-accent"
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "1.35rem",
                  color: active ? "var(--color-accent)" : undefined,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 px-6 md:px-10 py-10">
        <div className="max-w-5xl mx-auto w-full">
          <pre className="ascii-divider mb-10 whitespace-pre leading-tight">{`This website is currently being rebuilt. The information here is randomly generated and may be 
        inaccurate. Please completely ignore the texts here. For the most up-to-date information, please check my CV, LinkedIn, and GitHub.`}</pre>
          {children ?? <Outlet />}
        </div>
      </main>
      <FloatingContactButton />
      <footer className="px-6 md:px-10 py-8 text-center text-muted-foreground text-xs">
        <p>made with ♡ — © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function FloatingContactButton() {
  const { hasDraft, dock, setDock } = useContact();
  if (dock !== "closed") return null;
  return (
    <button
      type="button"
      aria-label="Contact me"
      onClick={() => setDock("right")}
      className="fixed bottom-6 right-6 z-40 border border-border bg-background/90 backdrop-blur rounded-md px-5 py-3 shadow-lg hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer"
      style={{ fontFamily: "var(--font-pixel)", fontSize: "1.15rem" }}
    >
      ✉ contact me{hasDraft ? " •" : ""}
    </button>
  );
}
