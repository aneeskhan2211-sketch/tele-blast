import { u as useQueryClient, b as useMutation, a as useQuery } from "./vendor-router-gX3Sk5jz.js";
import { H as useBackend } from "./index-DsrDu9m3.js";
function useAffiliate() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["affiliate"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAffiliate();
    },
    enabled: !!actor && !isFetching
  });
}
function useAffiliateStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["affiliateStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAffiliateStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useEnrichedAffiliateStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["enrichedAffiliateStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnrichedAffiliateStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useRegisterAffiliate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      paypalEmail
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.registerAffiliate(name, email, paypalEmail);
      const profile = await actor.getAffiliate();
      if (!profile) throw new Error("Profile not found after registration");
      return profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
      queryClient.invalidateQueries({ queryKey: ["affiliateStats"] });
    }
  });
}
function useUpdateAffiliatePaypalEmail() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paypalEmail) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateAffiliatePaypalEmail(paypalEmail);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
      queryClient.invalidateQueries({ queryKey: ["affiliateStats"] });
    }
  });
}
export {
  useAffiliate as a,
  useAffiliateStats as b,
  useEnrichedAffiliateStats as c,
  useUpdateAffiliatePaypalEmail as d,
  useRegisterAffiliate as u
};
