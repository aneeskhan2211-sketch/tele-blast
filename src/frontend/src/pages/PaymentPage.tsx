import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Phone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { STRIPE_PAYMENT_LINK } from "../constants";
import { useProfile } from "../hooks/useProfile";
import { useSubscription } from "../hooks/useSubscription";

// Owner bypass — this email always skips the payment page and goes to dashboard
const BYPASS_EMAIL = "mikebendett@gmail.com";

/**
 * @deprecated No longer used — ProfilePage now detects new users by checking
 * whether a backend profile exists, rather than relying on a sessionStorage flag
 * that gets lost when the tab is closed. Kept as a no-op export so any lingering
 * import sites don't break until they're cleaned up.
 */
export const NEW_USER_AFTER_PAYMENT_KEY = "tele_blast_new_user_setup";

const FEATURES = [
  { icon: Users, text: "Leads & Pipeline management" },
  { icon: Zap, text: "Power Dialer — calls & texts" },
  { icon: Phone, text: "Manual Templates for SMS & calls" },
  { icon: CheckCircle, text: "CSV Import (up to 500 leads)" },
  { icon: Phone, text: "Phone Link for PC (Windows)" },
  { icon: CheckCircle, text: "Birthday & Follow-Up Queues" },
];

export default function PaymentPage() {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    subscriptionTier,
    isLoading: subLoading,
    isFreshlyLoaded,
    markSubscribed,
  } = useSubscription();
  const { data: profileData } = useProfile();

  const [stripeOpened, setStripeOpened] = useState(false);
  const [activating, setActivating] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);

  // On mount: bust any stale cache so the tier check is always fresh.
  // This ensures that if a user with a plan somehow lands on /payment,
  // the cache is immediately invalidated and the correct tier loads.
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
    queryClient.invalidateQueries({ queryKey: ["subscription"] });
  }, [queryClient]);

  // Safety net bypass: if this is the owner email, send to dashboard immediately
  // regardless of subscription tier. This prevents any edge case where the owner
  // somehow ends up on this page.
  useEffect(() => {
    const userEmail = profileData?.email ?? "";
    if (userEmail === BYPASS_EMAIL) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [profileData, navigate]);

  // If user is ALREADY subscribed when the page loads, skip to dashboard.
  // Gate on isFreshlyLoaded — never redirect based on stale "none" cache.
  useEffect(() => {
    if (subLoading || !isFreshlyLoaded) return;
    if (subscriptionTier !== "none") {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [subLoading, isFreshlyLoaded, subscriptionTier, navigate]);

  // BUG 2 FIX — Payment page loop prevention:
  // If the user already clicked "I've completed payment" in this browser session
  // (we wrote 'payment_completed' to sessionStorage at that point), silently
  // finalize the subscription and navigate forward without re-showing the form.
  // This handles the case where the user is bounced back to /payment by a
  // redirect loop AFTER they already confirmed payment.
  const paymentCompletedHandledRef = useRef(false);
  useEffect(() => {
    let cancelled = false;
    let flag = "false";
    try {
      flag = sessionStorage.getItem("payment_completed") ?? "false";
    } catch {
      return;
    }
    if (flag !== "true") return;
    // Only run once per mount — guard against StrictMode double-invoke
    if (paymentCompletedHandledRef.current) return;
    paymentCompletedHandledRef.current = true;

    (async () => {
      try {
        await markSubscribed("pro");
      } catch {
        // Ignore — subscription may already be active
      }
      try {
        sessionStorage.removeItem("payment_completed");
      } catch {
        // ignore
      }
      if (!cancelled) {
        navigate({ to: "/agreement", replace: true });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [markSubscribed, navigate]);

  /**
   * Open Stripe in a NEW TAB so the user can return to this page and confirm.
   */
  const handleSubscribe = () => {
    window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
    setStripeOpened(true);
  };

  /**
   * User clicked "I've completed payment":
   * 1. Await markSubscribed — this calls the backend AND optimistically updates
   *    the React Query cache to "pro" before we navigate.
   * 2. Only navigate AFTER the mutation fully resolves (or fails with retry).
   */
  const handleConfirmPayment = async () => {
    setActivating(true);
    setActivationError(null);

    // BUG 2 FIX: Write the flag to sessionStorage BEFORE calling markSubscribed.
    // If the page is somehow reloaded or redirected back to /payment after this
    // point, the mount effect above will detect the flag, silently finalize the
    // subscription, and navigate forward — preventing the loop.
    try {
      sessionStorage.setItem("payment_completed", "true");
    } catch {
      // Private browsing may throw — safe to ignore
    }

    try {
      // CRITICAL: await the full mutation so the optimistic cache update in
      // useSubscription.onSuccess fires BEFORE we navigate. This prevents the
      // race condition where ProtectedRoute sees subscriptionTier="none" and
      // redirects back to /payment.
      await markSubscribed("pro");
    } catch {
      // If markSubscribed fails, show a retry button rather than navigating
      // into a broken state. The user's payment is not lost — they can try again.
      setActivationError(
        "Could not activate your subscription. Please try again — your payment was not affected.",
      );
      setActivating(false);
      return;
    }

    setActivating(false);

    // Clear the flag — we're about to navigate successfully.
    try {
      sessionStorage.removeItem("payment_completed");
    } catch {
      // ignore
    }

    // Navigate only AFTER the cache is confirmed updated.
    // useSubscription.onSuccess has already called setQueryData("pro") by now.
    // Go to /agreement — the user must accept terms before profile setup.
    navigate({ to: "/agreement", replace: true });
  };

  const handleSignOut = () => {
    try {
      clear();
    } catch {
      // ignore
    }
    navigate({ to: "/" });
  };

  // While loading subscription, show spinner — never render UI with stale state
  if (subLoading || !isFreshlyLoaded) {
    return (
      <div
        className="flex items-center justify-center min-h-dvh"
        style={{ background: "oklch(0.18 0.14 264)" }}
        data-ocid="payment.loading_state"
      >
        <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-dvh px-5 py-12"
      style={{ background: "oklch(0.18 0.14 264)" }}
      data-ocid="payment.page"
    >
      {/* Brand header */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">
          Tele-Blast
        </span>
      </div>

      {/* Plan card */}
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="payment.plan_card"
      >
        {/* Card header */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ borderBottom: "1px solid oklch(0.92 0 0)" }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(0.56 0.16 44 / 0.12)",
              color: "oklch(0.46 0.16 44)",
            }}
          >
            Pro Plan
          </span>

          <div className="flex items-end justify-center gap-1 mb-1">
            <span
              className="text-5xl font-extrabold leading-none"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              $30
            </span>
            <span
              className="text-base font-medium mb-1.5"
              style={{ color: "oklch(0.52 0 0)" }}
            >
              / month
            </span>
          </div>

          <p className="text-xs" style={{ color: "oklch(0.62 0 0)" }}>
            Billed monthly. Cancel anytime.
          </p>
        </div>

        {/* Feature list */}
        <ul className="px-8 py-6 space-y-3">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.56 0.16 44 / 0.12)" }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.46 0.16 44)" }}
                />
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.28 0.10 264)" }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA section */}
        <div className="px-8 pb-8 space-y-3">
          {/* Step 1: Open Stripe */}
          <button
            type="button"
            onClick={handleSubscribe}
            className="w-full rounded-xl text-white text-sm font-bold shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ background: "oklch(0.56 0.16 44)", height: "3.25rem" }}
            data-ocid="payment.subscribe_button"
          >
            {stripeOpened ? "Open Stripe Again" : "Subscribe Now — $30/month"}
          </button>

          {/* Step 2: After Stripe opens, show confirmation prompt */}
          {stripeOpened && (
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "oklch(0.56 0.16 44 / 0.07)",
                border: "1px solid oklch(0.56 0.16 44 / 0.2)",
              }}
              data-ocid="payment.confirm_section"
            >
              <p
                className="text-xs text-center font-medium"
                style={{ color: "oklch(0.38 0.10 264)" }}
              >
                Stripe opened in a new tab. Complete your payment there, then
                come back here and click below.
              </p>

              {activationError && (
                <div
                  className="flex items-start gap-2 p-3 rounded-lg text-xs"
                  style={{
                    background: "oklch(0.95 0.02 30)",
                    border: "1px solid oklch(0.75 0.12 30)",
                    color: "oklch(0.35 0.10 30)",
                  }}
                  data-ocid="payment.error_state"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{activationError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={activating}
                className="w-full rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: "oklch(0.38 0.14 160)",
                  height: "3rem",
                }}
                data-ocid="payment.confirm_button"
              >
                {activating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Activating…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    {activationError ? "Try Again" : "I've completed payment"}
                  </>
                )}
              </button>
            </div>
          )}

          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.62 0 0)" }}
          >
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>

      {/* Sign out link */}
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-8 text-xs transition-opacity duration-200 hover:opacity-70"
        style={{ color: "oklch(0.98 0 0 / 0.35)" }}
        data-ocid="payment.signout_button"
      >
        Sign out
      </button>

      <p
        className="text-xs mt-4 text-center"
        style={{ color: "oklch(0.98 0 0 / 0.25)" }}
      >
        © {new Date().getFullYear()} Tele-Blast · tele-blast.com
      </p>
    </div>
  );
}
