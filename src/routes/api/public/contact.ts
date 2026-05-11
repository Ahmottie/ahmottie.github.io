import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  prefix: z.string().max(20).optional().default(""),
  name: z.string().min(1).max(60),
  role: z.string().max(80).optional().default(""),
  email: z.string().email().max(254),
  title: z.string().max(120).optional().default(""),
  message: z.string().min(1).max(500),
  token: z.string().min(1, "missing captcha token"),
  // honeypot
  website: z.string().optional().default(""),
});

// Cloudflare Turnstile test secret — always passes. Swap by setting TURNSTILE_SECRET_KEY.
const TEST_SECRET = "1x0000000000000000000000000000000AA";
const TO_EMAIL = "hello@bamshi.dev";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "contact@bamshi.dev";

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY || TEST_SECRET;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  return data.success;
}

async function sendEmailIfConfigured(payload: z.infer<typeof Body>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set — message received but not emailed:", {
      from: payload.email,
      name: payload.name,
      subject: payload.title,
    });
    return { delivered: false };
  }

  const fullName = `${payload.prefix ? payload.prefix + " " : ""}${payload.name}`;
  const subject = payload.title?.trim()
    ? payload.title
    : `hello from ${fullName}${payload.role ? ` (${payload.role})` : ""}`;

  const text = `${payload.message}\n\n— ${fullName}${payload.role ? `\n${payload.role}` : ""}\n${payload.email}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: payload.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Resend error:", res.status, err);
    return { delivered: false };
  }
  return { delivered: true };
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400 });
        }

        const parsed = Body.safeParse(json);
        if (!parsed.success) {
          return Response.json({ error: "invalid input", details: parsed.error.issues }, { status: 400 });
        }

        // honeypot
        if (parsed.data.website && parsed.data.website.trim() !== "") {
          return Response.json({ ok: true });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          null;

        const ok = await verifyTurnstile(parsed.data.token, ip);
        if (!ok) {
          return Response.json({ error: "captcha verification failed" }, { status: 403 });
        }

        const result = await sendEmailIfConfigured(parsed.data);
        return Response.json({ ok: true, ...result });
      },
    },
  },
});
