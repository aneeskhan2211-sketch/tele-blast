/**
 * Persists the "Send via iMessage" preference in localStorage.
 * When true, SMS is sent via the native sms: URI (iMessage on iPhone).
 * When false, Twilio round-robin is used (if configured), else sms: fallback.
 */

const LS_KEY = "imessage_send_preference";

export function getIMessagePreference(): boolean {
  try {
    return localStorage.getItem(LS_KEY) === "true";
  } catch {
    return false;
  }
}

export function setIMessagePreference(value: boolean): void {
  try {
    localStorage.setItem(LS_KEY, value ? "true" : "false");
  } catch {
    // ignore
  }
}
