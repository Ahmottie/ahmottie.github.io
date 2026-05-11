import { Link, Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useContact } from "@/components/ContactDialog";

const nav = [
  { to: "/", label: "₍^. .^₎⟆" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const FOOTER_ASCII = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣬⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣶⠟⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⠏⣼⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣾⣿⡆⣿⣿⡃⣿⣧⣝⢿⡻⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀
⠀⠀⠀⠀⢸⣿⣿⣿⢸⣿⣴⣾⣿⣿⣯⣳⣜⢿⣿⣿⣿⣿⡇⠀⠀⠀
⠀⠀⠀⠀⡌⣿⣿⣿⡈⣿⢀⣤⣤⣭⡉⠙⢿⡏⣿⣿⣿⣿⡇⠀⠀⠀
⠀⠀⠀⢀⢸⡟⣿⣿⢷⡌⢸⣿⣿⣿⣿⣷⡜⢷⣿⣿⣿⣿⡇⠀⠀⠀
⠀⠀⠀⠸⢘⡀⢻⣿⣦⡀⣙⡛⠛⠛⠿⠿⠿⢸⣿⣿⣿⣿⠃⠀⠀⠀
⠀⠀⠀⠀⢰⠀⢠⣍⠙⠻⣿⣿⣿⣷⣶⣦⠀⣾⣿⣿⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢦⣾⢹⣿⣦⢘⣋⡁⠀⠀⢙⠃⣿⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢻⣾⣿⡏⠸⣿⡿⠿⠿⠟⢀⣡⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣾⠟⠀⠀⠠⢤⣼⣿⣆⢻⣿⣿⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⠁⣊⣐⡀⣴⣶⡼⠟⣡⣾⣿⣿⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⢀⣴⣿⣿⣿⠿⠋⠀⠘⣻⣿⡿⢻⣿⣿⣿⢆⠀⠀⠀
⠀⠀⠀⣠⡅⠐⢿⣙⠾⠿⠁⣰⣶⡾⢘⣋⣩⣾⡆⣿⣿⣿⣿⡆⠀⠀
⠀⠀⠀⣿⡇⠀⠀⠙⠷⢷⣶⣭⣍⡁⣾⣿⣿⣿⡗⣿⣿⣿⣿⠇⠀⠀
⠀⠀⠀⢿⡇⠀⠀⠀⠀⠀⣿⣶⣶⡄⢿⡛⠛⠛⠛⣸⠿⢏⠉⠀⠀⠀
⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠙⠛⠛⠁⠀⠈⠁⠀⠁⠀⠀⠀⠀⠀⠀⠀`;

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
                className="no-underline hover:text-accent click-area"
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "1.6rem",
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
          <pre className="ascii-divider mb-10 whitespace-pre leading-tight" aria-hidden="true">{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡤⠤⡤⠞⠁⠀⡀⠀⠨⡙⠦⡠⠤⠀⠀⠀
⠀⠀⠀⡛⢐⠉⡠⠂⠀⡰⠣⣀⠀⠑⠄⠈⡄⢃⠀⠀
⠀⠀⠀⡇⡸⠀⡄⣀⡾⠀⠀⢠⣽⢄⢀⠢⠸⠸⡀⠀
⠲⣒⢞⢺⡁⢸⠊⣠⡄⠀⠀⢠⣄⠈⡇⠰⣾⠚⢖⠖
⠀⠀⢑⡶⣙⣦⢣⠀⠀⡀⡀⡀⠀⠀⣅⢤⣜⠕⠉⠀
⠀⠀⡇⠃⢺⠞⠛⢧⣀⣉⣉⢀⣀⠭⠿⢬⣄⢘⠀⠀
⠀⢸⠁⢀⢻⠀⠀⡎⠀⠐⠒⠓⡄⠀⠹⠀⢸⢟⠿⠀`}</pre>
          {children ?? <Outlet />}
        </div>
      </main>
      {/* Always-visible floating contact button */}
      <FloatingContactButton />
      <footer className="px-6 md:px-10 py-8 text-center text-muted-foreground text-xs flex flex-col items-center gap-4">
        <pre className="footer-ascii" aria-hidden="true">{FOOTER_ASCII}</pre>
        <p>made with ♡ — © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function FloatingContactButton() {
  const { hasDraft, dock, setDock } = useContact();

  // Always show — the user can dismiss/minimize the panel itself
  const isOpen = dock === "right" || dock === "left";

  return (
    <button
      type="button"
      aria-label={isOpen ? "Contact panel open" : "Contact me"}
      title={isOpen ? "Contact panel open" : "Contact me"}
      onClick={() => {
        if (isOpen) {
          setDock("minimized");
        } else {
          setDock("right");
        }
      }}
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 flex items-center justify-center
        border border-border bg-background/95 backdrop-blur
        rounded-full shadow-lg
        hover:bg-accent hover:text-accent-foreground hover:border-accent
        transition-colors cursor-pointer
        ${isOpen ? "bg-accent text-accent-foreground border-accent" : ""}
      `}
      style={{ fontFamily: "var(--font-pixel)" }}
    >
      {isOpen ? (
        /* minimise icon when panel is open */
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ) : (
        /* envelope icon when panel is closed/minimised */
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )}
      {/* Draft indicator dot */}
      {hasDraft && !isOpen && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent border border-background" />
      )}
    </button>
  );
}
