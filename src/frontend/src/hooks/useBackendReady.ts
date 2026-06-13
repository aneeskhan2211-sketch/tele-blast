/**
 * useBackendReady — single source of truth for backend connection state.
 *
 * All hooks that previously had their own setTimeout/timedOut logic
 * should consume this hook instead of duplicating that logic.
 *
 * Returns:
 *   ready     — actor exists AND isFetching is false (normal operating state)
 *   timedOut  — 8 seconds elapsed without ready becoming true
 *
 * Invariants:
 *   - Once ready=true, timedOut is irrelevant (ready wins)
 *   - After 8s, timedOut=true REGARDLESS of actor state
 *   - This hook never causes an infinite loading state
 */
import { useEffect, useRef, useState } from "react";
import { useBackend } from "./useBackend";

const BACKEND_TIMEOUT_MS = 8_000;

export function useBackendReady(): { ready: boolean; timedOut: boolean } {
  const { actor, isFetching } = useBackend();

  // ready: actor is initialised and not in a fetching state
  const ready = !!actor && !isFetching;

  const [timedOut, setTimedOut] = useState(false);

  // We only need to start the timer once and only if not already ready.
  // Using a ref to ensure we don't restart the timer on every render.
  const timerStarted = useRef(false);

  useEffect(() => {
    // Already ready — no timer needed, and if it fired we can ignore it
    if (ready) return;

    // Don't start a second timer
    if (timerStarted.current) return;
    timerStarted.current = true;

    const id = window.setTimeout(() => {
      setTimedOut(true);
    }, BACKEND_TIMEOUT_MS);

    return () => {
      window.clearTimeout(id);
    };
  }, [ready]);

  return { ready, timedOut };
}
