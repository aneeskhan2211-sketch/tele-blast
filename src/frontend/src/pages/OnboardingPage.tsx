import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ExternalLink,
  Phone,
  PhoneCall,
  Save,
  Settings,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LS_ONBOARDING_DONE = "tele_blast_onboarding_done";
const LS_GOOGLE_VOICE_ENABLED = "googleVoiceEnabled";
const LS_GOOGLE_VOICE_NUMBER = "googleVoiceNumber";

function markDone() {
  try {
    localStorage.setItem(LS_ONBOARDING_DONE, "true");
  } catch {
    // ignore
  }
}

function readLS(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeLS(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

/** Normalize a phone number to E.164 digits only (strip leading +, spaces, dashes) */
function toE164Digits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // If 10 digits, assume US — prepend 1
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

function buildGVTestUrl(number: string): string {
  const digits = toE164Digits(number);
  return `https://voice.google.com/u/0/calls?a=nc,%2B${digits}`;
}

export default function OnboardingPage() {
  const navigate = useNavigate();

  // Google Voice state
  const [gvEnabled, setGvEnabled] = useState<boolean>(false);
  const [gvNumber, setGvNumber] = useState<string>("");
  const [gvSavedNumber, setGvSavedNumber] = useState<string>("");
  const [gvSaved, setGvSaved] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted values on mount
  useEffect(() => {
    const enabled = readLS(LS_GOOGLE_VOICE_ENABLED) === "true";
    const saved = readLS(LS_GOOGLE_VOICE_NUMBER);
    setGvEnabled(enabled);
    setGvSavedNumber(saved);
    setGvNumber(saved);
  }, []);

  function handleSaveNumber() {
    const trimmed = gvNumber.trim();
    if (!trimmed) return;
    writeLS(LS_GOOGLE_VOICE_NUMBER, trimmed);
    setGvSavedNumber(trimmed);
    setGvSaved(true);
    // Auto-enable when number is saved
    writeLS(LS_GOOGLE_VOICE_ENABLED, "true");
    writeLS("google_voice_enabled", "true");
    setGvEnabled(true);
    setTimeout(() => setGvSaved(false), 2500);
  }

  function handleToggleGV() {
    const next = !gvEnabled;
    writeLS(LS_GOOGLE_VOICE_ENABLED, next ? "true" : "false");
    writeLS("google_voice_enabled", next ? "true" : "false");
    setGvEnabled(next);
  }

  function handleOpenRegistration() {
    window.open(
      "https://voice.google.com/u/0/calls?forceBanner=tel-registration",
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleTestCall() {
    if (!gvSavedNumber) return;
    window.open(buildGVTestUrl(gvSavedNumber), "_blank", "noopener,noreferrer");
  }

  function handleGetStarted() {
    markDone();
    navigate({ to: "/dashboard" });
  }

  function handleSkip() {
    markDone();
    navigate({ to: "/dashboard" });
  }

  const hasConnectedNumber = gvSavedNumber.trim().length > 0;
  const canTestCall = gvEnabled && hasConnectedNumber;

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-5 py-10"
      style={{ background: "oklch(0.22 0.12 264)" }}
      data-ocid="onboarding.page"
    >
      {/* Brand header */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
        <span className="text-white text-3xl font-bold tracking-tight">
          Tele-Blast
        </span>
      </div>

      {/* Welcome text */}
      <div className="text-center mb-8 max-w-md">
        <h1 className="text-white text-2xl font-bold mb-3">
          Set Up Your Phone
        </h1>
        <p
          style={{ color: "oklch(0.98 0 0 / 0.65)" }}
          className="text-base leading-relaxed"
        >
          Choose how you want to make calls and send texts directly from
          Tele-Blast.
        </p>
      </div>

      {/* Option cards — responsive grid */}
      <div className="w-full max-w-3xl grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2">
        {/* ── Google Voice card ── */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-4 shadow-xl"
          style={{ background: "oklch(0.99 0 0)" }}
          data-ocid="onboarding.google_voice_card"
        >
          {/* Card header */}
          <div className="flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.56 0.16 44 / 0.12)" }}
            >
              <Phone
                className="w-5 h-5"
                style={{ color: "oklch(0.46 0.16 44)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="text-base font-bold leading-tight"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                >
                  Google Voice
                </h2>
                {hasConnectedNumber && gvEnabled && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.94 0.06 145)",
                      color: "oklch(0.35 0.1 145)",
                    }}
                    data-ocid="onboarding.google_voice_connected_badge"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </span>
                )}
              </div>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.52 0 0)" }}
              >
                Make calls &amp; texts from any browser — free, any device
              </p>
            </div>
          </div>

          {/* Step 1 — Register */}
          <div
            className="rounded-xl p-4 space-y-2.5"
            style={{ background: "oklch(0.97 0.005 264)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: "oklch(0.32 0.15 264)" }}
            >
              Step 1 — Get a Google Voice number
            </p>
            <p className="text-xs" style={{ color: "oklch(0.48 0 0)" }}>
              If you don't have a Google Voice number yet, click below to open
              Google Voice and claim one — it's free.
            </p>
            <button
              type="button"
              onClick={handleOpenRegistration}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-lg text-xs font-bold border-2 transition-all hover:opacity-80 active:scale-[0.98]"
              style={{
                borderColor: "oklch(0.56 0.16 44)",
                color: "oklch(0.46 0.16 44)",
              }}
              data-ocid="onboarding.register_google_voice_button"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Google Voice
            </button>
            <ol className="space-y-1 pl-1">
              {[
                "Click the yellow banner in Google Voice.",
                "Click Allow when your browser asks for permission.",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex gap-1.5 text-xs"
                  style={{ color: "oklch(0.52 0 0)" }}
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: "oklch(0.46 0.16 44)" }}
                  >
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Step 2 — Save number */}
          <div
            className="rounded-xl p-4 space-y-2.5"
            style={{ background: "oklch(0.97 0.005 264)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wide"
              style={{ color: "oklch(0.32 0.15 264)" }}
            >
              Step 2 — Save your Google Voice number
            </p>
            <p className="text-xs" style={{ color: "oklch(0.48 0 0)" }}>
              Enter the phone number assigned to your Google Voice account.
            </p>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="tel"
                placeholder="e.g. (555) 867-5309"
                value={gvNumber}
                onChange={(e) => setGvNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveNumber();
                }}
                className="flex-1 min-w-0 h-9 rounded-lg px-3 text-sm border outline-none focus:ring-2 ring-offset-0"
                style={{
                  border: "1.5px solid oklch(0.88 0.02 264)",
                  background: "oklch(0.99 0 0)",
                  color: "oklch(0.22 0.12 264)",
                }}
                aria-label="Google Voice phone number"
                data-ocid="onboarding.google_voice_number_input"
              />
              <button
                type="button"
                onClick={handleSaveNumber}
                disabled={!gvNumber.trim()}
                className="h-9 px-3 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
                style={{ background: "oklch(0.56 0.16 44)" }}
                data-ocid="onboarding.save_google_voice_number_button"
              >
                <Save className="w-3.5 h-3.5" />
                {gvSaved ? "Saved!" : "Save"}
              </button>
            </div>
            {hasConnectedNumber && (
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: "oklch(0.40 0.1 145)" }}
              >
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                Number saved: {gvSavedNumber}
              </p>
            )}
          </div>

          {/* Enable toggle */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.22 0.12 264)" }}
              >
                Enable Google Voice
              </p>
              <p className="text-xs" style={{ color: "oklch(0.52 0 0)" }}>
                Use for all calls &amp; texts in the app
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={gvEnabled}
              onClick={handleToggleGV}
              className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: gvEnabled
                  ? "oklch(0.56 0.16 44)"
                  : "oklch(0.85 0 0)",
                outlineColor: "oklch(0.56 0.16 44)",
              }}
              data-ocid="onboarding.google_voice_toggle"
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{
                  transform: gvEnabled ? "translateX(20px)" : "translateX(0)",
                }}
              />
            </button>
          </div>

          {/* Test Call button — only when enabled + number saved */}
          {canTestCall && (
            <button
              type="button"
              onClick={handleTestCall}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md"
              style={{ background: "oklch(0.46 0.16 44)" }}
              data-ocid="onboarding.google_voice_test_call_button"
            >
              <PhoneCall className="w-4 h-4" />
              Test Call via Google Voice
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={handleGetStarted}
          className="w-full h-12 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg"
          style={{ background: "oklch(0.56 0.16 44)" }}
          data-ocid="onboarding.get_started_button"
        >
          Get Started →
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm transition-colors duration-200 hover:opacity-100"
          style={{ color: "oklch(0.98 0 0 / 0.45)" }}
          data-ocid="onboarding.skip_button"
        >
          Skip for now — go to Dashboard
        </button>
      </div>

      {/* Fine print */}
      <p
        className="text-xs mt-8 text-center max-w-sm"
        style={{ color: "oklch(0.98 0 0 / 0.25)" }}
      >
        You can change these settings anytime under your Profile page.
      </p>
    </div>
  );
}
