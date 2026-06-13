/**
 * ActivateNewPage — post-auth screen after coming from /pre-signup.
 *
 * Flow:
 *  1. Reads 'pendingProfile' from sessionStorage
 *  2. Saves profile to backend via saveUserProfile()
 *  3. Checks pre-registration by email via checkPreRegisteredByEmail()
 *     • If pre-registered → activates account (calls activatePreRegisteredUser)
 *       → navigate to /dashboard (they have pro tier)
 *     • If not pre-registered → navigate to /dashboard with tier='none'
 *       (the dashboard shows the subscribe banner)
 *  4. Clears pendingProfile from sessionStorage
 *
 * No cookies. Statically imported in App.tsx.
 */
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useBackend } from "../hooks/useBackend";
import { useSaveProfile } from "../hooks/useProfile";

interface PendingProfile {
  businessName: string;
  fullName: string;
  phone: string;
  email: string;
}

function readPendingProfile(): PendingProfile | null {
  try {
    const raw = sessionStorage.getItem("pendingProfile");
    if (!raw) return null;
    return JSON.parse(raw) as PendingProfile;
  } catch {
    return null;
  }
}

function clearPendingProfile() {
  try {
    sessionStorage.removeItem("pendingProfile");
    sessionStorage.removeItem("tele_blast_from_presignup");
  } catch {
    // ignore
  }
}

export default function ActivateNewPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const saveProfile = useSaveProfile();

  const [status, setStatus] = useState<
    "saving" | "checking" | "activating" | "done" | "error"
  >("saving");
  const [message, setMessage] = useState("Saving your profile…");
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    if (!identity) return;
    // Wait until actor is available
    if (!actor) return;

    hasRunRef.current = true;

    async function run() {
      const pending = readPendingProfile();

      // ── Step 1: Save profile if pendingProfile exists ──────────────────────
      if (pending) {
        try {
          setStatus("saving");
          setMessage("Saving your profile…");
          await saveProfile.mutateAsync({
            name: pending.fullName,
            companyName: pending.businessName,
            phone: pending.phone,
            email: pending.email,
          });
        } catch {
          // Profile save failed — non-fatal, continue with activation check.
          // Mark flag so ProfilePage can prompt re-entry with pre-filled data.
          console.warn("[ActivateNewPage] Profile save failed (non-fatal)");
          try {
            localStorage.setItem("pendingProfileSave", "true");
          } catch {
            // ignore storage errors
          }
        }
      }

      // ── Step 2: Check pre-registration by email ────────────────────────────
      const email = pending?.email ?? "";
      if (email) {
        try {
          setStatus("checking");
          setMessage("Checking your account status…");

          const backendActor = actor as unknown as {
            checkPreRegisteredByEmail?: (email: string) => Promise<boolean>;
            activatePreRegisteredUser?: (
              email: string,
            ) => Promise<{ ok: string } | { err: string }>;
          };

          let isPreRegistered = false;
          if (backendActor.checkPreRegisteredByEmail) {
            isPreRegistered = await backendActor.checkPreRegisteredByEmail(
              email.toLowerCase(),
            );
          }

          if (isPreRegistered) {
            setStatus("activating");
            setMessage("Activating your Pro account…");

            if (backendActor.activatePreRegisteredUser) {
              await backendActor.activatePreRegisteredUser(email.toLowerCase());
            }

            // Refresh subscription cache so dashboard knows about new tier
            queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
            queryClient.invalidateQueries({
              queryKey: ["admin", "preRegistered"],
            });
          }
        } catch {
          // Pre-reg check failed — non-fatal, just go to dashboard
          console.warn("[ActivateNewPage] Pre-reg check failed (non-fatal)");
        }
      }

      // ── Step 3: Clear session data and navigate to dashboard ───────────────
      clearPendingProfile();
      setStatus("done");
      setMessage("All set! Taking you to your dashboard…");

      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 800);
    }

    run().catch(() => {
      clearPendingProfile();
      setStatus("error");
      setMessage("Something went wrong. Redirecting…");
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 1500);
    });
  }, [identity, actor, saveProfile, queryClient, navigate]);

  const iconColor =
    status === "done"
      ? "oklch(0.46 0.14 160)"
      : status === "error"
        ? "oklch(0.46 0.18 22)"
        : "oklch(0.56 0.16 44)";

  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-16"
      style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
      data-ocid="activate-new.page"
    >
      {/* Logo */}
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

      {/* Status card */}
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center gap-5"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="activate-new.status_card"
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: iconColor }}
        >
          {status === "done" ? (
            <CheckCircle2 className="w-8 h-8 text-white" />
          ) : (
            <TrendingUp className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Message */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            {status === "done"
              ? "Welcome to Tele-Blast!"
              : status === "error"
                ? "Almost there…"
                : "Setting up your account"}
          </h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

        {/* Spinner */}
        {status !== "done" && status !== "error" && (
          <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        )}

        {/* Progress steps */}
        <div className="w-full space-y-2 text-xs">
          {[
            { key: "saving", label: "Saving profile" },
            { key: "checking", label: "Checking account status" },
            { key: "activating", label: "Activating plan" },
            { key: "done", label: "Redirecting to dashboard" },
          ].map((step) => {
            const steps = ["saving", "checking", "activating", "done", "error"];
            const currentIdx = steps.indexOf(status);
            const stepIdx = steps.indexOf(step.key);
            const isDone = currentIdx > stepIdx || status === "done";
            const isActive = step.key === status;

            return (
              <div
                key={step.key}
                className="flex items-center gap-2"
                style={{
                  color: isDone
                    ? "oklch(0.46 0.14 160)"
                    : isActive
                      ? "oklch(0.22 0.12 264)"
                      : "oklch(0.70 0 0)",
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{
                    background: isDone
                      ? "oklch(0.46 0.14 160)"
                      : isActive
                        ? "oklch(0.56 0.16 44)"
                        : "oklch(0.91 0 0)",
                    color: isDone || isActive ? "white" : "oklch(0.55 0 0)",
                  }}
                >
                  {isDone ? "✓" : stepIdx + 1}
                </span>
                <span className={isActive ? "font-semibold" : ""}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
