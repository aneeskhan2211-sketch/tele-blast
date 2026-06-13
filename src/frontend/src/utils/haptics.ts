/**
 * Trigger a brief haptic vibration on installed PWA only.
 * Gracefully degrades — never throws.
 */
export function triggerHaptic(pattern: number[] = [10]): void {
  try {
    const isInstalledPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (!isInstalledPWA) return;
    if (!navigator.vibrate) return;

    navigator.vibrate(pattern);
  } catch {
    // Silently ignore any errors
  }
}
