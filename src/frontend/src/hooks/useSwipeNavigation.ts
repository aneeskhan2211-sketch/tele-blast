import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef } from "react";

// The ordered primary nav tabs for swipe navigation
const SWIPE_ROUTES = [
  "/dashboard",
  "/leads",
  "/pipeline",
  "/queue",
  "/power-dialer",
] as const;

interface SwipeNavigationOptions {
  currentPath: string;
  enabled: boolean;
}

export function useSwipeNavigation({
  currentPath,
  enabled,
}: SwipeNavigationOptions) {
  const navigate = useNavigate();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (!enabled) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
    },
    [enabled],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (!enabled) return;

      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      // Only trigger if horizontal movement dominates
      if (Math.abs(deltaX) < 50) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.5) return;

      // Find current route index
      const currentIndex = SWIPE_ROUTES.findIndex(
        (r) => currentPath === r || currentPath.startsWith(`${r}/`),
      );
      if (currentIndex === -1) return;

      if (deltaX < 0) {
        // Swipe left → next tab
        const nextIndex = currentIndex + 1;
        if (nextIndex < SWIPE_ROUTES.length) {
          navigate({ to: SWIPE_ROUTES[nextIndex] });
        }
      } else {
        // Swipe right → previous tab
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          navigate({ to: SWIPE_ROUTES[prevIndex] });
        }
      }
    },
    [enabled, currentPath, navigate],
  );

  return { handleTouchStart, handleTouchEnd };
}
