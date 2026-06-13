import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

/**
 * Polls checkFeatureAccess() every 10 seconds.
 * Returns false if admin has revoked access — independent of subscription status.
 * A user can be subscribed but still have access revoked by admin.
 */
export function useFeatureAccess() {
  const { actor, isFetching } = useBackend();

  const query = useQuery<boolean>({
    queryKey: ["featureAccess"],
    queryFn: async () => {
      if (!actor) return true; // default to true while loading
      return actor.checkFeatureAccess();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchInterval: 1_500,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return {
    hasAccess: query.data ?? true,
    isLoading: query.isLoading,
  };
}
