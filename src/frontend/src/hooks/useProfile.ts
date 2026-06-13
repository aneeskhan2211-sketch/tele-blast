import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProfileInput, UserProfile } from "../types";
import { useBackend } from "./useBackend";

export function useProfile() {
  const { actor } = useBackend();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserProfile();
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor,
    staleTime: 60_000,
  });
}

export function useSaveProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ProfileInput) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveUserProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}
