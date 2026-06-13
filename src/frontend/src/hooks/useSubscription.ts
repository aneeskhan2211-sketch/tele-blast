import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIPTION_TIER_KEY, type SubscriptionTier } from "../constants";
import { useBackend } from "./useBackend";
import { useBackendReady } from "./useBackendReady";

// ── Feature gate helper ────────────────────────────────────────────────────────

/**
 * Centralised tier-to-feature mapping.
 * Tele-Blast only offers the $30 Pro plan. All features gate on "pro" vs "none".
 * AI, advertise, seo, drip, cold_call, google_voice, and twilio are NOT available
 * on the $30 plan and return false for all tiers.
 */
export function tierHasFeature(
  tier: SubscriptionTier,
  feature:
    | "advertise"
    | "forms"
    | "seo"
    | "image_creator"
    | "core"
    | "ai"
    | "power_dialer"
    | "new_lead_queue"
    | "dialer"
    | "drip"
    | "cold_call"
    | "google_voice"
    | "twilio",
): boolean {
  const isPaid = tier === "pro";
  switch (feature) {
    // Core features: available to all paid plans
    case "core":
    case "power_dialer":
    case "dialer":
    case "new_lead_queue":
    case "forms":
      return isPaid;
    // AI and advanced features: NOT available ($30 plan only)
    case "ai":
    case "advertise":
    case "seo":
    case "image_creator":
    case "drip":
    case "cold_call":
    case "google_voice":
    case "twilio":
      return false;
    default:
      return false;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** All recognised paid tiers — only "pro" ($30) is active. */
const VALID_PAID_TIERS = new Set<string>(["pro"]);

/**
 * Map legacy / alternative tier strings to their canonical counterpart.
 */
function normalizeTierValue(raw: string): SubscriptionTier | null {
  if (VALID_PAID_TIERS.has(raw)) return raw as SubscriptionTier;
  // Legacy aliases — treat all higher tiers as "pro" since they all include $30 features
  if (
    raw === "pro_landing" ||
    raw === "pro_ads" ||
    raw === "pro_seo" ||
    raw === "ultimate"
  )
    return "pro";
  if (raw === "none" || raw === "") return "none";
  console.warn(
    `[useSubscription] Unexpected tier value from backend: "${raw}" — treating as "none".`,
  );
  return "none";
}

/** Write-through cache: persist tier locally for fast initial load only. */
function writeStoredTier(tier: SubscriptionTier) {
  try {
    if (tier === "none") {
      localStorage.removeItem(SUBSCRIPTION_TIER_KEY);
    } else {
      localStorage.setItem(SUBSCRIPTION_TIER_KEY, tier);
    }
  } catch {
    // ignore — private browsing / SSR guard
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useSubscription() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const backendReady = useBackendReady();

  const queryEnabled = backendReady.ready || backendReady.timedOut;

  const subscriptionQuery = useQuery<boolean>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkSubscription();
    },
    enabled: queryEnabled,
    staleTime: 30_000,
  });

  const tierQuery = useQuery<SubscriptionTier>({
    queryKey: ["subscriptionTier"],
    queryFn: async () => {
      if (!actor) {
        return "none";
      }
      try {
        const raw = await actor.getSubscriptionTier();
        const tier = normalizeTierValue(raw) ?? "none";
        writeStoredTier(tier);
        return tier;
      } catch {
        // If the call fails, fall through to "none"
      }
      return "none";
    },
    enabled: queryEnabled,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 2_000,
  });

  const markSubscribedMut = useMutation({
    mutationFn: async (tier: SubscriptionTier = "pro") => {
      if (!actor) throw new Error("Not connected");
      await actor.markSubscribed();
      writeStoredTier(tier);
      return tier;
    },
    onSuccess: (tier) => {
      queryClient.setQueryData<SubscriptionTier>(
        ["subscriptionTier"],
        tier ?? "pro",
      );
      queryClient.setQueryData<boolean>(["subscription"], true);
      queryClient.resetQueries({ queryKey: ["subscriptionTier"] });
      queryClient.resetQueries({ queryKey: ["subscription"] });
      queryClient.setQueryData<SubscriptionTier>(
        ["subscriptionTier"],
        tier ?? "pro",
      );
      queryClient.setQueryData<boolean>(["subscription"], true);
    },
  });

  const isSubscribed = subscriptionQuery.data ?? false;
  const subscriptionTier: SubscriptionTier = tierQuery.data ?? "none";

  const isFreshlyLoaded =
    (tierQuery.isFetched && !tierQuery.isLoading && !tierQuery.isFetching) ||
    backendReady.timedOut;

  const subscriptionLoaded = tierQuery.isFetched || backendReady.timedOut;

  const isLoading =
    (subscriptionQuery.isLoading ||
      tierQuery.isLoading ||
      tierQuery.isFetching ||
      !backendReady.ready) &&
    !backendReady.timedOut;

  return {
    isSubscribed,
    subscriptionTier,
    isLoading,
    isFreshlyLoaded,
    subscriptionLoaded,
    markSubscribed: (tier: SubscriptionTier = "pro") =>
      markSubscribedMut.mutateAsync(tier),
  };
}
