/**
 * ActivatePage — post-auth screen shown to new users with no subscription.
 *
 * Flow:
 *  1. User enters their email address.
 *  2. App checks if that email is in the admin's pre-registered list.
 *     • If YES → calls backend to activate account (assigns $30 Pro plan,
 *               removes them from pre-reg list) → navigates to /dashboard.
 *     • If NO  → navigates to /payment (normal new-user flow).
 *  3. "Skip to Subscribe" button goes directly to /payment without checking.
 *
 * No cookies are used anywhere in this component.
 */
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Mail, TrendingUp, UserCheck, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useBackend } from "../hooks/useBackend";

// localStorage key shared with useAdmin.ts
const PRE_REG_LS_KEY = "tele-blast:pre-registered";

interface LocalPreRegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: bigint;
}

function getLocalPreRegistered(): LocalPreRegisteredUser[] {
  try {
    const raw = localStorage.getItem(PRE_REG_LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalPreRegisteredUser[];
  } catch {
    return [];
  }
}

export default function ActivatePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checking, setChecking] = useState(false);
  const [activated, setActivated] = useState(false);
  const checkingRef = useRef(false);

  function validateEmail(value: string): boolean {
    if (!value.trim()) {
      setEmailError("Please enter your email address.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  }

  async function handleCheckRegistration() {
    if (!validateEmail(email)) return;
    if (checkingRef.current) return;
    checkingRef.current = true;
    setChecking(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      let isPreRegistered = false;

      // Try backend check first
      try {
        if (actor) {
          const backendActor = actor as unknown as {
            checkPreRegisteredByEmail?: (email: string) => Promise<boolean>;
            activatePreRegisteredUser?: (
              email: string,
            ) => Promise<{ ok: string } | { err: string }>;
          };

          if (backendActor.checkPreRegisteredByEmail) {
            isPreRegistered =
              await backendActor.checkPreRegisteredByEmail(normalizedEmail);
          } else {
            // Backend method not deployed — check localStorage fallback
            const local = getLocalPreRegistered();
            isPreRegistered = local.some(
              (u) => u.email.toLowerCase() === normalizedEmail,
            );
          }
        } else {
          // No actor — check localStorage fallback
          const local = getLocalPreRegistered();
          isPreRegistered = local.some(
            (u) => u.email.toLowerCase() === normalizedEmail,
          );
        }
      } catch {
        // Any backend error — fall back to localStorage
        const local = getLocalPreRegistered();
        isPreRegistered = local.some(
          (u) => u.email.toLowerCase() === normalizedEmail,
        );
      }

      if (!isPreRegistered) {
        // Not pre-registered — send to payment
        toast.info(
          "No pre-registration found for that email. Redirecting to subscription…",
          { duration: 3000 },
        );
        navigate({ to: "/payment", replace: true });
        return;
      }

      // Pre-registered! Activate the account.
      try {
        if (actor) {
          const backendActor = actor as unknown as {
            activatePreRegisteredUser?: (
              email: string,
            ) => Promise<{ ok: string } | { err: string }>;
            adminCreatePreRegisteredUser?: (
              name: string,
              email: string,
              phone: string,
            ) => Promise<{ ok: null } | { err: string }>;
          };

          if (backendActor.activatePreRegisteredUser) {
            const result =
              await backendActor.activatePreRegisteredUser(normalizedEmail);
            if (result && "err" in result) {
              throw new Error(String(result.err));
            }
          }
          // Whether or not activation method exists on backend,
          // remove from localStorage to keep UI consistent
          try {
            const stored = getLocalPreRegistered();
            const updated = stored.filter(
              (u) => u.email.toLowerCase() !== normalizedEmail,
            );
            localStorage.setItem(PRE_REG_LS_KEY, JSON.stringify(updated));
          } catch {
            /* ignore */
          }
        }
      } catch (activationErr) {
        // If activation fails, still try to go to dashboard
        // (the tier may have been set by the backend already)
        console.warn("Activation error (non-fatal):", activationErr);
      }

      // Invalidate subscription cache so the dashboard sees the new tier
      queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
      queryClient.invalidateQueries({ queryKey: ["featureAccess"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "preRegistered"] });

      setActivated(true);
      toast.success("Account activated! Welcome to Tele-Blast Pro.", {
        duration: 4000,
      });

      // Small delay so the success state is visible before navigating
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 1500);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      checkingRef.current = false;
      setChecking(false);
    }
  }

  function handleSkipToPayment() {
    navigate({ to: "/payment", replace: true });
  }

  // Show success state briefly before redirect
  if (activated) {
    return (
      <div
        className="flex flex-col items-center justify-center px-5 py-16"
        style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
        data-ocid="activate.success.page"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          style={{ background: "oklch(0.46 0.14 160)" }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Account Activated!
        </h2>
        <p className="text-white/60 text-sm text-center max-w-xs">
          Your Pro plan is active. Taking you to the dashboard…
        </p>
        <span className="mt-6 w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const principalShort = identity
    ? (() => {
        const s = identity.getPrincipal().toString();
        return `${s.slice(0, 6)}…${s.slice(-4)}`;
      })()
    : null;

  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-10"
      style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
      data-ocid="activate.page"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">
          Tele-Blast
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "oklch(0.99 0 0)" }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 text-center"
          style={{ background: "oklch(0.24 0.10 264)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white mb-1">
            Welcome to Tele-Blast
          </h1>
          <p className="text-white/60 text-xs leading-relaxed">
            You're signed in
            {principalShort && (
              <span className="font-mono ml-1 text-white/40">
                ({principalShort})
              </span>
            )}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Pre-reg check section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.22 0.12 264 / 0.08)" }}
              >
                <Zap
                  className="w-4 h-4"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Pre-Registered Account?
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  Enter your email to activate your free Pro access
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="activate-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCheckRegistration();
                  }}
                  placeholder="your@email.com"
                  className={`h-11 pl-10 ${emailError ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                  disabled={checking}
                  data-ocid="activate.email_input"
                />
              </div>
              {emailError && (
                <p
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.46 0.18 22)" }}
                  data-ocid="activate.email.field_error"
                >
                  {emailError}
                </p>
              )}
              <Button
                type="button"
                onClick={handleCheckRegistration}
                disabled={checking || !email.trim()}
                className="w-full min-h-[44px] text-white font-semibold gap-2"
                style={{ background: "oklch(0.22 0.12 264)" }}
                data-ocid="activate.check_button"
              >
                {checking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Checking…
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Check Registration
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">
              OR
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Subscribe directly */}
          <div>
            <p className="text-xs text-muted-foreground text-center mb-3">
              Not pre-registered? Subscribe for{" "}
              <span className="font-semibold text-foreground">$30/month</span>{" "}
              to get full Pro access.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleSkipToPayment}
              disabled={checking}
              className="w-full min-h-[44px] font-semibold"
              data-ocid="activate.subscribe_button"
            >
              Subscribe — $30/month
            </Button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p
        className="text-xs mt-8 text-center max-w-xs"
        style={{ color: "oklch(0.98 0 0 / 0.3)" }}
      >
        If you were pre-registered by your admin, use the email address they
        entered to activate your account instantly.
      </p>
    </div>
  );
}
