import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

/* ─── Types ──────────────────────────────────────────────────────── */

export interface ColdCallScriptConfig {
  whatYouAreSelling: string;
  preQualifyingNeeds: string;
  packagesOrServices: string;
  goalType: string;
}

// The backend methods will exist after bindgen. Until then, cast actor to any
// so we don't break the build while backend methods are being added.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActorAny = Record<string, (...args: unknown[]) => Promise<unknown>>;

/* ─── Query ──────────────────────────────────────────────────────── */

export function useColdCallConfig() {
  const { actor, isFetching } = useBackend();

  return useQuery<ColdCallScriptConfig | null>({
    queryKey: ["coldCallConfig"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const actorAny = actor as unknown as ActorAny;
        const result = await actorAny.getColdCallConfig();
        // Backend returns [] (null option) or [config] (some option)
        if (Array.isArray(result) && result.length > 0) {
          return result[0] as ColdCallScriptConfig;
        }
        return null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

/* ─── Mutation ────────────────────────────────────────────────────── */

export function useSaveColdCallConfig() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  return useMutation<void, Error, ColdCallScriptConfig>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const actorAny = actor as unknown as ActorAny;
      await actorAny.saveColdCallConfig(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coldCallConfig"] });
    },
  });
}
