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
  website: z.string().optional().default(""),
});

const TO_EMAIL = "hello@bamshi.dev";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "contact@bamshi.dev";

/**
 * Verifies the Turnstile token with Cloudflare.
 * No test-key fallback: forces environment configuration.
 */
async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("[AUTH] Missing TURNSTILE_SECRET_KEY in environment.");
    return false;
  }

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };

    if (!data.success) {
      console.error("[AUTH] Turnstile verification failed:", data["error-codes"]);
    }

    return data.success;
  } catch (err) {
    console.error("[AUTH] Network error during Turnstile verification:", err);
    return false;
  }
}

/**
 * Dispatches the email via Resend API.
 */
async function sendEmail(payload: z.infer<typeof Body>) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[MAIL] RESEND_API_KEY not set. Message dropped.");
    return { delivered: false, error: "Mail provider unconfigured" };
  }

  const fullName = `${payload.prefix ? payload.prefix + " " : ""}${payload.name}`;
  const subject = payload.title?.trim()
    ? `[Contact] ${payload.title}`
    : `Portfolio Contact from ${fullName}`;

  const text = `
New message from your portfolio site:

Name: ${fullName}
Role/Company: ${payload.role || "Not provided"}
Email: ${payload.email}
Subject: ${payload.title || "No subject"}

Message:
--------------------------------------------------
${payload.message}
--------------------------------------------------

Sent via: bamshi.dev
  `.trim();

  try {
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
      const errText = await res.text();
      console.error("[MAIL] Resend API error:", res.status, errText);
      return { delivered: false };
    }

    return { delivered: true };
  } catch (err) {
    console.error("[MAIL] Network error sending email:", err);
    return { delivered: false };
  }
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = Body.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", details: parsed.error.format() },
            { status: 400 },
          );
        }

        if (parsed.data.website) {
          console.warn("[SECURITY] Honeypot triggered by bot.");
          return Response.json({ ok: true, delivered: true });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          null;

        const isHuman = await verifyTurnstile(parsed.data.token, ip);
        if (!isHuman) {
          return Response.json({ error: "Captcha verification failed" }, { status: 403 });
        }

        const result = await sendEmail(parsed.data);

        if (!result.delivered) {
          return Response.json({ error: "Message verified but delivery failed" }, { status: 500 });
        }

        return Response.json({ ok: true, delivered: true });
      },
    },
  },
});
