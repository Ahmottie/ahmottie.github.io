import { useEffect, useRef, memo } from "react";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADN_Pp9sfVcHxoDs";
const SCRIPT_ID = "cf-turnstile-script";

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: TurnstileOptions) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  theme?: "auto" | "light" | "dark";
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  theme?: "auto" | "light" | "dark";
  resetTrigger?: number; // Increment this to force a reset from the parent
}

export const Turnstile = memo(({ onVerify, theme = "auto", resetTrigger }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current);
    }
  }, [resetTrigger]);

  useEffect(() => {
    let isMounted = true;

    const initializeTurnstile = () => {
      if (!containerRef.current || !window.turnstile || !isMounted) return;

      // Avoid double-rendering
      if (widgetId.current) return;

      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme,
        callback: (token) => onVerify(token),
        "error-callback": () => onVerify(""),
        "expired-callback": () => onVerify(""),
      });
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = initializeTurnstile;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      initializeTurnstile();
    }


    return () => {
      isMounted = false;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [onVerify, theme]);

  return <div ref={containerRef} className="min-h-[65px] flex justify-start" />;
});

Turnstile.displayName = "Turnstile";
