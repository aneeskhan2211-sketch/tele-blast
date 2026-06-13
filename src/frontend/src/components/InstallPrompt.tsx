import { Share } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "tele-blast-install-dismissed";

function isIOSSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  // Safari on iOS: has Safari but not Chrome/CriOS/FxiOS/OPiOS
  const isSafari = /safari/i.test(ua) && !/chrome|crios|fxios|opiOS/i.test(ua);
  return isIOS && isSafari;
}

function isAlreadyInstalled(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !!(navigator as any).standalone === true;
}

export function InstallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed && isIOSSafari() && !isAlreadyInstalled()) {
      // Small delay so it doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      data-ocid="install_prompt"
      className="fixed bottom-20 left-4 right-4 z-50 rounded-xl border border-primary/30 bg-card shadow-lg px-4 py-3 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300"
      role="banner"
      aria-label="Install Tele-Blast"
    >
      {/* Icon */}
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
        <Share className="w-4 h-4 text-primary" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">
          Install Tele-Blast
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          Tap{" "}
          <span className="inline-flex items-center gap-0.5 font-medium text-foreground">
            <Share className="w-3 h-3 inline" aria-hidden="true" /> Share
          </span>
          , then{" "}
          <span className="font-medium text-foreground">
            "Add to Home Screen"
          </span>
        </p>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        data-ocid="install_prompt.close_button"
        onClick={dismiss}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Dismiss install prompt"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <title>Close</title>
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  );
}
