import { createContext, useContext, useState, type ReactNode } from "react";
import { X, Minus, PanelLeft, PanelRight, Square } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

type DockState = "closed" | "left" | "right" | "minimized";

type Ctx = {
  dock: DockState;
  setDock: (v: DockState) => void;
  open: () => void;
  setOpen: (v: boolean) => void;
  hasDraft: boolean;
  prefix: string;
  setPrefix: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  reset: () => void;
};

const ContactCtx = createContext<Ctx | null>(null);

export function useContact() {
  const c = useContext(ContactCtx);
  if (!c) throw new Error("useContact must be used inside ContactProvider");
  return c;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [dock, setDock] = useState<DockState>("closed");
  const [prefix, setPrefix] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const hasDraft = Boolean(prefix || name || role || email || title || message);

  const value: Ctx = {
    dock,
    setDock,
    open: () => setDock((d) => (d === "minimized" ? "left" : d === "closed" ? "right" : d)),
    setOpen: (v) => setDock(v ? "right" : "closed"),
    hasDraft,
    prefix,
    setPrefix,
    name,
    setName,
    role,
    setRole,
    email,
    setEmail,
    title,
    setTitle,
    message,
    setMessage,
    reset: () => {
      setPrefix("");
      setName("");
      setRole("");
      setEmail("");
      setTitle("");
      setMessage("");
    },
  };

  return (
    <ContactCtx.Provider value={value}>
      {children}
      <ContactWindow />
    </ContactCtx.Provider>
  );
}

function ContactWindow() {
  const { dock, setDock, hasDraft, reset } = useContact();

  if (dock === "closed" || dock === "minimized") return null;

  // positioning: side docks pin to that edge, center floats
  const positionClass =
    dock === "left" ? "left-4 top-1/2 -translate-y-1/2" : "right-4 top-1/2 -translate-y-1/2";

  return (
    <div
      role="dialog"
      aria-label="Send a message"
      className={`fixed z-50 w-[min(92vw,32rem)] max-h-[90vh] flex flex-col border border-border bg-card rounded-md shadow-2xl ${positionClass}`}
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 select-none">
        <div
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "var(--font-pixel)", fontSize: "1rem" }}
        >
          ✉ send a message{hasDraft ? " — draft" : ""}
        </div>
        <div className="flex items-center gap-1">
          <WinBtn label="Dock left" onClick={() => setDock("left")} active={dock === "left"}>
            <PanelLeft className="w-3.5 h-3.5" />
          </WinBtn>
          <WinBtn label="Dock right" onClick={() => setDock("right")} active={dock === "right"}>
            <PanelRight className="w-3.5 h-3.5" />
          </WinBtn>
          <WinBtn label="Minimize" onClick={() => setDock("minimized")}>
            <Minus className="w-3.5 h-3.5" />
          </WinBtn>
          <WinBtn
            label="Close and clear"
            onClick={() => {
              reset();
              setDock("closed");
            }}
          >
            <X className="w-3.5 h-3.5" />
          </WinBtn>
        </div>
      </div>
      <div className="overflow-y-auto p-5">
        <ContactForm />
      </div>
    </div>
  );
}

function WinBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`p-1.5 rounded-sm hover:bg-muted transition-colors ${active ? "bg-muted" : ""}`}
    >
      {children}
    </button>
  );
}

export function ContactTrigger({ children }: { children: ReactNode }) {
  const { setDock, dock } = useContact();
  return (
    <span
      onClick={() => setDock(dock === "closed" || dock === "minimized" ? "right" : dock)}
      className="contents"
    >
      {children}
    </span>
  );
}
