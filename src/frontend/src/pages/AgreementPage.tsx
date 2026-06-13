import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLiabilityAcceptance } from "../hooks/useLiabilityAcceptance";

const AGREEMENT_ITEMS = [
  "You are 18 or older and a U.S.‑based professional authorized to use communication tools for business purposes.",
  "All information you provide during registration is accurate and complete.",
  "Tele‑Blast is a U.S. service, and your information will be stored in the United States.",
  "You will use Tele‑Blast only for lawful, compliant communication, including all federal and state rules related to privacy, data protection, and messaging laws (such as HIPAA and the Telephone Consumer Protection Act).",
  "You will not impersonate anyone, misrepresent your identity, or use misleading caller ID or sender information.",
  "You will not misuse, overload, or interfere with the Tele‑Blast platform.",
  "You will not send spam, junk messages, or unauthorized promotional content through Tele‑Blast.",
  "You will not violate any agreements you have with your employer or any other organization.",
];

export default function AgreementPage() {
  const navigate = useNavigate();
  const { accept } = useLiabilityAcceptance();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Fetch client IP on mount — best effort, never blocks the flow
  const [clientIp, setClientIp] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (res.ok) {
          const data = (await res.json()) as { ip?: string };
          if (data.ip) setClientIp(data.ip);
        }
      } catch {
        // IP fetch failed — agreement acceptance proceeds without IP
      }
    })();
  }, []);

  async function handleAccept() {
    if (!agreed || submitting) return;
    setSubmitting(true);

    // Call backend acceptLiability() AND update localStorage.
    // Pass captured IP so the hook can record it (best-effort).
    await accept(clientIp);

    // After agreement: go to /dashboard with full access
    // (profile was already saved during /activate-new or was already set)
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div
      className="flex flex-col min-h-dvh"
      style={{ background: "oklch(0.18 0.14 264)" }}
      data-ocid="agreement.page"
    >
      {/* Brand header */}
      <header
        className="flex items-center gap-3 px-5 py-4 shadow-md shrink-0"
        style={{ background: "oklch(0.22 0.12 264)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Tele-Blast
        </span>
      </header>

      {/* Step indicator */}
      <div
        className="px-5 py-3 flex items-center gap-2 text-xs font-medium shrink-0"
        style={{
          background: "oklch(0.22 0.12 264 / 0.6)",
          borderBottom: "1px solid oklch(0.56 0.16 44 / 0.2)",
          color: "oklch(0.82 0.14 44)",
        }}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        Step 2 of 2 — Review &amp; Accept Terms
      </div>

      {/* Main content — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Title */}
          <div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Terms of Use
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.98 0 0 / 0.6)" }}
            >
              Please read and accept the following terms before setting up your
              profile. By accepting, you agree to use Tele-Blast responsibly and
              in compliance with all applicable laws.
            </p>
          </div>

          {/* Terms card */}
          <div
            className="rounded-2xl p-5 space-y-4"
            style={{
              background: "oklch(0.22 0.12 264)",
              border: "1px solid oklch(0.30 0.12 264)",
            }}
            data-ocid="agreement.terms_card"
          >
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.98 0 0 / 0.85)" }}
            >
              By using Tele-Blast, you confirm that:
            </p>
            <ul className="space-y-3" data-ocid="agreement.terms_list">
              {AGREEMENT_ITEMS.map((item, i) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex gap-2.5 text-sm leading-relaxed"
                  style={{ color: "oklch(0.98 0 0 / 0.7)" }}
                  data-ocid={`agreement.term.${i + 1}`}
                >
                  <span
                    className="mt-0.5 shrink-0 font-bold"
                    style={{ color: "oklch(0.75 0.16 44)" }}
                  >
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div
            className="flex flex-wrap gap-4 text-xs"
            style={{ color: "oklch(0.98 0 0 / 0.45)" }}
          >
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              data-ocid="agreement.terms_link"
            >
              Full Terms &amp; Conditions
            </a>
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              data-ocid="agreement.privacy_link"
            >
              Privacy Policy
            </a>
          </div>

          {/* Agreement checkbox */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              background: "oklch(0.56 0.16 44 / 0.08)",
              border: "1px solid oklch(0.56 0.16 44 / 0.25)",
            }}
            data-ocid="agreement.agree_checkbox"
          >
            <Checkbox
              id="agreement-checkbox"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5 shrink-0"
            />
            <label
              htmlFor="agreement-checkbox"
              className="text-sm leading-relaxed select-none cursor-pointer"
              style={{ color: "oklch(0.98 0 0 / 0.85)" }}
            >
              I have read and agree to the Terms of Use and Privacy Policy
            </label>
          </div>

          {/* Accept button */}
          <button
            type="button"
            onClick={handleAccept}
            disabled={!agreed || submitting}
            className="w-full rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "oklch(0.56 0.16 44)",
              height: "3.25rem",
            }}
            data-ocid="agreement.accept_button"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Continuing…
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Accept &amp; Continue to Dashboard
              </>
            )}
          </button>

          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.98 0 0 / 0.3)" }}
          >
            © {new Date().getFullYear()} Tele-Blast · tele-blast.com
          </p>
        </div>
      </div>
    </div>
  );
}
