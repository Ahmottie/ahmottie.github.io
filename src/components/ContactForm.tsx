import { useEffect, useRef, useState, type FormEvent } from "react";
import { useContact } from "@/components/ContactDialog";
import { Turnstile } from "@/components/Turnstile";

const LIMITS = {
  name: 60,
  role: 80,
  emailTotal: 254,
  title: 120,
  message: 500,
};
const MIN_TIME_MS = 3000;
const EMAIL = "hello@bamshi.dev";

export function ContactForm() {
  const ctx = useContact();
  const {
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
    reset,
    setOpen,
  } = ctx;

  const mountedAt = useRef(Date.now());
  const [honey, setHoney] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [resetKey, setResetKey] = useState(0); // Added for Turnstile reset
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  function flash(msg: string) {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  }

  function handleReset() {
    setCaptchaToken("");
    setResetKey((prev) => prev + 1); // Triggers the Turnstile.tsx reset logic
  }

  function clamp(setter: (v: string) => void, max: number, label: string) {
    return (v: string) => {
      if (v.length > max) {
        setter(v.slice(0, max));
        flash(`${label} reached the ${max} character limit`);
      } else {
        setter(v);
      }
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // 1. Bot & Timing Checks
    if (honey.trim() !== "") return;
    if (Date.now() - mountedAt.current < MIN_TIME_MS) {
      return setError("Please take a moment before sending.");
    }

    // 2. Validation
    if (!name.trim()) return setError("Name is required.");
    if (!email.includes("@")) return setError("A valid email is required.");
    if (!message.trim()) return setError("Message can't be empty.");
    if (!captchaToken) return setError("Please complete the captcha.");

    setSubmitting(true);

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefix,
          name,
          role,
          email,
          title,
          message,
          token: captchaToken,
          website: honey, // honeypot
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitting(false);
        handleReset(); // Reset captcha on failure
        return setError(body.error || `Error (${res.status}). Please try again.`);
      }

      // 3. Success State
      setSent(true);
      setSubmitting(false);
      setTimeout(() => {
        reset();
        setSent(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
      setSubmitting(false);
      handleReset();
      setError("Network error. You can also email " + EMAIL);
    }
  }

  return (
    <section className="mt-2">
      <h2 className="text-2xl mb-1">send a message</h2>
      <p className="text-muted-foreground mb-5 text-sm">a quick note — i read everything.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot - hidden from users and screen readers */}
        <input
          type="text"
          name="website"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
        />

        <div className="grid md:grid-cols-[7rem_1fr_1fr] gap-4">
          <Field label="honorific">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className={inputClass}
            >
              <option value="">—</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
          </Field>
          <Field label="name *">
            <input
              value={name}
              onChange={(e) => clamp(setName, LIMITS.name, "Name")(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="role / company">
            <input
              value={role}
              onChange={(e) => clamp(setRole, LIMITS.role, "Role")(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="email *">
          <input
            type="email"
            value={email}
            onChange={(e) => clamp(setEmail, LIMITS.emailTotal, "Email")(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="subject">
          <input
            value={title}
            onChange={(e) => clamp(setTitle, LIMITS.title, "Subject")(e.target.value)}
            className={inputClass}
            placeholder="subject of your message"
          />
        </Field>

        <label className="block">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">message *</span>
            <span className="text-xs text-muted-foreground">
              {message.length} / {LIMITS.message}
            </span>
          </div>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => clamp(setMessage, LIMITS.message, "Message")(e.target.value)}
            className={`mt-1 ${inputClass} resize-none`}
          />
        </label>

        <div className="py-2">
          <span className="text-sm text-muted-foreground block mb-2">verify you're human</span>
          <Turnstile onVerify={setCaptchaToken} resetTrigger={resetKey} />
        </div>

        <div aria-live="polite">
          {error && <p className="text-destructive text-sm font-medium">!! {error}</p>}
          {sent && <p className="text-accent text-sm">message sent successfully. ♡</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !captchaToken}
            className="pixel-card px-6 py-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
          >
            {submitting ? "sending..." : "send →"}
          </button>
        </div>
      </form>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] border border-border bg-card px-4 py-2 rounded-md shadow-lg text-xs animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </section>
  );
}

const inputClass =
  "w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
