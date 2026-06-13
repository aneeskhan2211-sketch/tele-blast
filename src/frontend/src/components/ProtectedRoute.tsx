import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useBackendReady } from "../hooks/useBackendReady";
import { useLiabilityAcceptance } from "../hooks/useLiabilityAcceptance";
import { useProfile } from "../hooks/useProfile";
import { useSubscription } from "../hooks/useSubscription";
import { LiabilityModal } from "./LiabilityModal";

// Owner bypass — this email always skips the payment gate regardless of subscription tier
const BYPASS_EMAIL = "mikebendett@gmail.com";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Set true on routes accessible to authenticated-but-unpaid users (payment, agreement, profile) */
  skipPaymentGate?: boolean;
  /**
   * Set true on /payment, /agreement, and /profile so the LiabilityModal does
   * NOT block those pages. The user accepts the agreement on the dedicated
   * /agreement page — not via the modal popup.
   */
  skipLiabilityGate?: boolean;
}

/** sessionStorage key for storing the intended route before auth redirect */
export const INTENDED_ROUTE_KEY = "tele_blast_intended_route";

/** Hard wall-clock limit (ms) — after this, always allow through regardless */
const GATE_HARD_TIMEOUT_MS = 15_000;

export function ProtectedRoute({
  children,
  skipPaymentGate = false,
  skipLiabilityGate = false,
}: ProtectedRouteProps) {
  const { identity, loginStatus } = useInternetIdentity();
  const {
    isLoading: liabilityLoading,
    hasAccepted,
    accept,
  } = useLiabilityAcceptance();
  const { isFreshlyLoaded } = useSubscription();
  const { data: profileData } = useProfile();
  const backendReady = useBackendReady();
  const routerState = useRouterState();

  // Hard wall-clock timer: after GATE_HARD_TIMEOUT_MS always allow through
  const [hardTimedOut, setHardTimedOut] = useState(false);
  const hardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (skipPaymentGate) return;
    // Start the hard timer when this component first mounts for a protected route
    hardTimerRef.current = setTimeout(() => {
      setHardTimedOut(true);
    }, GATE_HARD_TIMEOUT_MS);
    return () => {
      if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
    };
  }, [skipPaymentGate]);

  // ── Step 1: Wait for identity to resolve ────────────────────────────────────
  // During "initializing", identity is null but the user MAY be authenticated.
  // In PWA standalone mode, check localStorage for a cached active session so
  // the user doesn't see a loading screen every time they reopen the app.
  if (loginStatus === "initializing") {
    // Check if we have a locally persisted session that hasn't expired yet
    let hasCachedSession = false;
    try {
      const sessionActive =
        localStorage.getItem("ii_session_active") === "true";
      const expiryStr = localStorage.getItem("ii_session_expiry");
      const notExpired = expiryStr ? Date.now() < Number(expiryStr) : false;
      hasCachedSession = sessionActive && notExpired;
    } catch {
      // localStorage unavailable (private mode etc.)
    }
    if (hasCachedSession) {
      // Render children immediately — II is still initializing but we
      // know the user was recently authenticated. If II comes back
      // unauthenticated the effect below will clear localStorage and redirect.
      return <>{children}</>;
    }
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-background"
        data-ocid="auth.loading_state"
      >
        <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // ── Persist / clear session in localStorage based on auth state ─────────────
  // Use identity (not loginStatus string) so we are type-safe with the
  // underlying @caffeineai/core-infrastructure library.
  if (identity) {
    try {
      localStorage.setItem("ii_session_active", "true");
      // 24 h from now
      localStorage.setItem(
        "ii_session_expiry",
        String(Date.now() + 24 * 60 * 60 * 1000),
      );
      localStorage.setItem("ii_principal", identity.getPrincipal().toText());
    } catch {
      // ignore
    }
  } else if (loginStatus !== "logging-in") {
    // loginStatus is resolved and there's no identity — user is logged out
    try {
      localStorage.removeItem("ii_session_active");
      localStorage.removeItem("ii_session_expiry");
      localStorage.removeItem("ii_principal");
    } catch {
      // ignore
    }
  }

  // ── Step 2: Unauthenticated — save intended route and redirect to landing ───
  if (!identity) {
    try {
      const pathname = routerState.location.pathname;
      if (
        pathname &&
        pathname !== "/" &&
        pathname !== "/lander" &&
        pathname !== "/login" &&
        pathname !== "/security-login" &&
        pathname !== "/payment" &&
        pathname !== "/agreement"
      ) {
        sessionStorage.setItem(INTENDED_ROUTE_KEY, pathname);
      }
    } catch {
      // sessionStorage may be unavailable
    }
    return <Navigate to="/" />;
  }

  // ── Step 3: Liability check ──────────────────────────────────────────────────
  // Skip the modal for the onboarding flow pages — /payment, /agreement, /profile.
  if (!skipLiabilityGate) {
    if (liabilityLoading) {
      return (
        <div
          className="flex items-center justify-center min-h-screen bg-background"
          data-ocid="liability.loading_state"
        >
          <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }

    if (!hasAccepted) {
      return <LiabilityModal onAccept={accept} />;
    }
  }

  // ── Step 4: Payment gate ─────────────────────────────────────────────────────
  // The new flow no longer auto-redirects unpaid users to /payment.
  // Instead, unpaid users can reach /dashboard and see the subscribe banner.
  // The /payment page remains accessible directly but is no longer in the auto-routing.
  //
  // The ONLY gating still enforced here:
  //   - Routes with skipPaymentGate=true are always accessible (payment, agreement, profile).
  //   - Owner bypass always passes through.
  //   - All other authenticated users are allowed in regardless of subscription tier.
  //     The dashboard (and Layout) handles showing the locked/blurred UI.
  if (!skipPaymentGate) {
    // Owner bypass: BYPASS_EMAIL always passes
    const userEmail = profileData?.email ?? "";
    const isBypassUser = userEmail === BYPASS_EMAIL;

    if (isBypassUser) {
      // Allow through immediately
    } else if (hardTimedOut) {
      // Rule 2: Hard 15s wall-clock expired — always allow through
    } else if (!isFreshlyLoaded && !backendReady.timedOut) {
      // Still waiting for fresh data — show spinner
      return (
        <div
          className="flex items-center justify-center min-h-screen bg-background"
          data-ocid="subscription.loading_state"
        >
          <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }
    // All authenticated users pass through — no redirect to /payment
  }

  return <>{children}</>;
}
