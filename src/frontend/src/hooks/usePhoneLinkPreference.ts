/**
 * Phone Link has been removed from Tele-Blast.
 * These stubs are kept so any remaining import references compile without errors.
 */

export const LS_PHONE_LINK_ENABLED = "LS_PHONE_LINK_ENABLED";

/** Always returns false — Phone Link removed. */
export function isWindowsDesktop(): boolean {
  return false;
}

/** Always returns false — Phone Link removed. */
export function getPhoneLinkPreference(): boolean {
  return false;
}

/** No-op — Phone Link removed. */
export function setPhoneLinkPreference(_value: boolean): void {
  // no-op
}
