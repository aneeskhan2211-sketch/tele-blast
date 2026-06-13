import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Phone,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

const LS_PHONE_PROVIDER = "phoneProvider";

type PhoneProvider = "google_voice" | "cell_phone";

function loadPhoneProvider(): PhoneProvider {
  try {
    const raw = localStorage.getItem(LS_PHONE_PROVIDER);
    if (raw === "google_voice" || raw === "cell_phone") return raw;
    // Migrate from old google_voice_enabled key
    const legacy = localStorage.getItem("google_voice_enabled");
    if (legacy === "true") {
      localStorage.setItem(LS_PHONE_PROVIDER, "google_voice");
      return "google_voice";
    }
  } catch {
    // ignore
  }
  return "cell_phone";
}

function savePhoneProvider(provider: PhoneProvider) {
  try {
    localStorage.setItem(LS_PHONE_PROVIDER, provider);
    // Keep the legacy key in sync so isGoogleVoiceEnabled() still works
    localStorage.setItem(
      "google_voice_enabled",
      String(provider === "google_voice"),
    );
  } catch {
    // ignore
  }
}

/** Build the URL to open when a user calls via Google Voice. */
export function buildGoogleVoiceUrl(phoneNumber?: string): string {
  if (phoneNumber) {
    const digits = phoneNumber.replace(/\D/g, "");
    const e164 = digits.length === 10 ? `1${digits}` : digits;
    if (e164.length >= 7) {
      return `https://voice.google.com/u/0/calls?a=nc,%2B${e164}`;
    }
  }
  return "https://voice.google.com";
}

export default function TwilioSetupPage() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState<PhoneProvider>(loadPhoneProvider);

  const handleSelect = (p: PhoneProvider) => {
    setProvider(p);
    savePhoneProvider(p);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate({ to: "/profile" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          data-ocid="phone-setup.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Phone/SMS Setup
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose how you want to make calls and send texts from Tele-Blast.
          </p>
        </div>

        {/* Provider choice */}
        <div className="space-y-3" data-ocid="phone-setup.provider_section">
          {/* Google Voice option */}
          <button
            type="button"
            onClick={() => handleSelect("google_voice")}
            className={`w-full rounded-xl border-2 transition-colors text-left ${
              provider === "google_voice"
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/40"
            }`}
            data-ocid="phone-setup.google_voice_option"
          >
            <div className="flex items-center gap-3 px-4 py-4 min-h-[72px]">
              {/* Radio indicator */}
              <span
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  provider === "google_voice"
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {provider === "google_voice" && (
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                  />
                )}
              </span>
              <Phone
                className="w-5 h-5 shrink-0"
                style={{
                  color:
                    provider === "google_voice"
                      ? "oklch(0.46 0.16 44)"
                      : "oklch(0.55 0 0)",
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Google Voice
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Clicking any phone number opens Google Voice in a new tab,
                  pre-filled to dial.
                </p>
              </div>
              {provider === "google_voice" && (
                <Badge className="shrink-0 flex items-center gap-1 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </Badge>
              )}
            </div>

            {/* Google Voice setup instructions */}
            {provider === "google_voice" && (
              <div
                className="px-4 pb-4 space-y-3 border-t pt-3"
                style={{ borderColor: "oklch(0.56 0.16 44 / 0.15)" }}
              >
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For one-click dialing, open Google Voice and register your
                  browser. A banner will appear — click{" "}
                  <strong className="font-semibold text-foreground">
                    Register
                  </strong>
                  , then{" "}
                  <strong className="font-semibold text-foreground">
                    Allow
                  </strong>{" "}
                  when prompted.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full min-h-[44px] gap-2 border-primary/30 text-primary hover:bg-primary/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      "https://voice.google.com/u/0/calls?forceBanner=tel-registration",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  data-ocid="phone-setup.google_voice_register_button"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Google Voice &amp; Register
                </Button>
                <p className="text-xs text-muted-foreground">
                  Don't have Google Voice?{" "}
                  <a
                    href="https://voice.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sign up for free at voice.google.com
                  </a>{" "}
                  — requires a Google account.
                </p>
              </div>
            )}
          </button>

          {/* Cell Phone option */}
          <button
            type="button"
            onClick={() => handleSelect("cell_phone")}
            className={`w-full rounded-xl border-2 transition-colors text-left ${
              provider === "cell_phone"
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/40"
            }`}
            data-ocid="phone-setup.cell_phone_option"
          >
            <div className="flex items-center gap-3 px-4 py-4 min-h-[72px]">
              {/* Radio indicator */}
              <span
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  provider === "cell_phone" ? "border-primary" : "border-border"
                }`}
              >
                {provider === "cell_phone" && (
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                  />
                )}
              </span>
              <Smartphone
                className="w-5 h-5 shrink-0"
                style={{
                  color:
                    provider === "cell_phone"
                      ? "oklch(0.46 0.16 44)"
                      : "oklch(0.55 0 0)",
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  My Cell Phone
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Clicking a phone number opens your cell phone dialer or
                  messages app directly.
                </p>
              </div>
              {provider === "cell_phone" && (
                <Badge className="shrink-0 flex items-center gap-1 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </Badge>
              )}
            </div>

            {provider === "cell_phone" && (
              <div
                className="px-4 pb-4 border-t pt-3"
                style={{ borderColor: "oklch(0.56 0.16 44 / 0.15)" }}
              >
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No setup required. Make sure your phone number is saved in
                  your{" "}
                  <button
                    type="button"
                    className="underline hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate({ to: "/profile" });
                    }}
                  >
                    Profile
                  </button>
                  . When you tap a phone number in the app, your device will
                  offer to call or text via your carrier.
                </p>
              </div>
            )}
          </button>
        </div>

        {/* How it works */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">How it works</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-none">
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              Select your preferred calling method above
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              Click any lead's phone number in the app
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              Complete the call or text, then return to log the outcome
            </li>
          </ul>
        </div>

        {/* Bottom spacing for mobile nav */}
        <div className="h-4" />
      </div>
    </div>
  );
}
