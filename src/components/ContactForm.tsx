import { useEffect, useRef, useState, type FormEvent } from "react";
import { useContact } from "@/components/ContactDialog";
import { Turnstile } from "@/components/Turnstile";

const LIMITS = {
  name: 60,
  role: 80,
  emailLocal: 64,
  emailDomain: 255,
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
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  function flash(msg: string) {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  }

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

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

  function validEmail(e: string) {
    if (e.length > LIMITS.emailTotal) return false;
    const m = e.match(/^([^\s@]+)@([^\s@]+\.[^\s@]+)$/);
    if (!m) return false;
    return m[1].length <= LIMITS.emailLocal && m[2].length <= LIMITS.emailDomain;
  }

  const messageChars = message.length;
  const messageOver = messageChars > LIMITS.message;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (honey.trim() !== "") return;
    if (Date.now() - mountedAt.current < MIN_TIME_MS) {
      return setError("hold on a sec — please take a moment before sending.");
    }
    if (!name.trim()) return setError("name is required.");
    if (!validEmail(email.trim())) return setError("a valid email is required.");
    if (!message.trim()) return setError("message can't be empty.");
    if (messageOver) return setError(`message is too long (max ${LIMITS.message} characters).`);
    if (!captchaToken) return setError("please complete the captcha.");

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
          website: honey,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitting(false);
        return setError(body.error || `something went wrong (${res.status}).`);
      }
      setSent(true);
      setSubmitting(false);
      setTimeout(() => {
        reset();
        setSent(false);
        setOpen(false);
      }, 1500);
    } catch (err) {
      setSubmitting(false);
      setError("network error — please try again. you can also email " + EMAIL);
    }
  }

  return (
    <section className="mt-2">
      <h2 className="text-2xl mb-1">send a message</h2>
      <p className="text-muted-foreground mb-5 text-sm">
        a quick note — i read everything. drafts persist if you minimize.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input
          type="text"
          name="website"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
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
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
          </Field>
          <Field label="name *">
            <input
              required
              value={name}
              onChange={(e) => clamp(setName, LIMITS.name, "name")(e.target.value)}
              maxLength={LIMITS.name}
              className={inputClass}
            />
          </Field>
          <Field label="role / company">
            <input
              value={role}
              onChange={(e) => clamp(setRole, LIMITS.role, "role")(e.target.value)}
              maxLength={LIMITS.role}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="email *">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => clamp(setEmail, LIMITS.emailTotal, "email")(e.target.value)}
            maxLength={LIMITS.emailTotal}
            className={inputClass}
          />
        </Field>

        <Field label="subject">
          <input
            value={title}
            onChange={(e) => clamp(setTitle, LIMITS.title, "title")(e.target.value)}
            maxLength={LIMITS.title}
            className={inputClass}
            placeholder="subject of your message"
          />
        </Field>

        <label className="block">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">message *</span>
            <span
              className={`text-xs ${messageOver ? "text-destructive" : "text-muted-foreground"}`}
            >
              {messageChars} / {LIMITS.message}
            </span>
          </div>
          <textarea
            required
            rows={6}
            value={message}
            maxLength={LIMITS.message}
            onChange={(e) => {
              const v = e.target.value;
              if (v.length >= LIMITS.message) {
                setMessage(v.slice(0, LIMITS.message));
                if (v.length > message.length)
                  flash(`message reached the ${LIMITS.message} character limit`);
              } else {
                setMessage(v);
              }
            }}
            className={`mt-1 ${inputClass} resize-y`}
          />
        </label>

        <div>
          <span className="text-sm text-muted-foreground block mb-2">verify you're human</span>
          <Turnstile onVerify={setCaptchaToken} />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}
        {sent && !error && (
          <p className="text-accent text-sm">message sent — i'll get back to you soon. ♡</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={messageOver || submitting || !captchaToken}
            className="border border-border rounded-md px-5 py-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "sending…" : "send →"}
          </button>
        </div>
      </form>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] border border-border bg-card px-4 py-2 rounded-md shadow-lg text-sm"
        >
          {toast}
        </div>
      )}
    </section>
  );
}

const inputClass =
  "w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:border-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
