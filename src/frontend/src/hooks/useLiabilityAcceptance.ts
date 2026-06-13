import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { useBackend } from "./useBackend";

const STORAGE_KEY = "tele_blast_liability_accepted";

function getStorageKey(principalId: string) {
  return `${STORAGE_KEY}:${principalId}`;
}

export function useLiabilityAcceptance() {
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!identity) {
      setIsLoading(false);
      setHasAccepted(false);
      return;
    }

    const principalId = identity.getPrincipal().toText();
    const key = getStorageKey(principalId);
    const stored = localStorage.getItem(key);
    setHasAccepted(stored === "true");
    setIsLoading(false);
  }, [identity]);

  /**
   * Accept liability:
   * 1. Calls the backend acceptLiability() to record timestamp + IP server-side.
   * 2. Updates localStorage for fast reads (backward compat).
   * 3. Updates in-memory state immediately so the modal closes / nav proceeds.
   *
   * The ipAddress param is accepted for use by the AgreementPage (which fetches
   * the IP before calling accept) but the actual backend call uses no-arg form
   * since the current generated binding does not expose the ip parameter.
   */
  const accept = useCallback(
    async (_ipAddress?: string | null) => {
      if (!identity) return;

      // Update localStorage + in-memory state immediately so UX is instant
      const principalId = identity.getPrincipal().toText();
      const key = getStorageKey(principalId);
      localStorage.setItem(key, "true");
      setHasAccepted(true);

      // Best-effort backend call — don't block or throw on failure
      if (actor) {
        try {
          await actor.acceptLiability(_ipAddress ?? null);
        } catch {
          // Backend call failed — localStorage already updated so the user
          // can proceed. Admin audit trail may be incomplete but UX is unblocked.
        }
      }
    },
    [identity, actor],
  );

  return { isLoading, hasAccepted, accept };
}
