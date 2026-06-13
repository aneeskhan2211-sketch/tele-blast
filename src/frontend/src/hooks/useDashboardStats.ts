import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "../types";
import { useBackend } from "./useBackend";
import { useBackendReady } from "./useBackendReady";

const EMPTY_STATS: DashboardStats = {
  prospects: 0n,
  contacted: 0n,
  qualified: 0n,
  closedWon: 0n,
  closedLost: 0n,
  recentLeads: [],
};

export function useDashboardStats(pipelineId?: bigint | null) {
  const { actor } = useBackend();
  const backendReady = useBackendReady();

  // Enable the query once backend is ready OR the 8s timeout fires — whichever
  // comes first. This eliminates the old separate 5s timer that didn't
  // coordinate with the subscription or ProtectedRoute timeouts.
  const isEnabled = backendReady.ready || backendReady.timedOut;

  const query = useQuery<DashboardStats>({
    queryKey: ["dashboardStats", pipelineId?.toString() ?? "all"],
    queryFn: async () => {
      if (!actor) {
        // Actor still not ready after timeout — return empty stats immediately
        // so the UI renders rather than spinning.
        return EMPTY_STATS;
      }
      try {
        return await actor.getDashboardStats(pipelineId ?? null);
      } catch {
        return EMPTY_STATS;
      }
    },
    enabled: isEnabled,
    retry: 1,
    retryDelay: 2_000,
  });

  // isLoading is false after the backend timeout regardless of React Query's
  // own isLoading flag. This ensures DashboardPage never spins past 8s.
  const isLoading = query.isLoading && !backendReady.timedOut;

  return {
    ...query,
    isLoading,
  };
}
