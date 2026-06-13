import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

export function useCallDispositions() {
  const { actor, isFetching } = useBackend();
  return useQuery<string[]>({
    queryKey: ["callDispositions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallDispositions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}
