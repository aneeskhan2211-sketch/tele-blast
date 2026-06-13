import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

export function useAffiliate() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["affiliate"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAffiliate();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAffiliateStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["affiliateStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAffiliateStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}
export function useEnrichedAffiliateStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["enrichedAffiliateStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnrichedAffiliateStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useRegisterAffiliate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      paypalEmail,
    }: {
      name: string;
      email: string;
      paypalEmail: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      // registerAffiliate is an upsert — never errors on duplicate
      await actor.registerAffiliate(name, email, paypalEmail);
      const profile = await actor.getAffiliate();
      if (!profile) throw new Error("Profile not found after registration");
      return profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
      queryClient.invalidateQueries({ queryKey: ["affiliateStats"] });
    },
  });
}

/** Updates only the PayPal email on an existing affiliate record (activation flow). */
export function useUpdateAffiliatePaypalEmail() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paypalEmail: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateAffiliatePaypalEmail(paypalEmail);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
      queryClient.invalidateQueries({ queryKey: ["affiliateStats"] });
    },
  });
}

export function useTrackReferralClick() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) return;
      await actor.trackReferralClick(code);
    },
  });
}
