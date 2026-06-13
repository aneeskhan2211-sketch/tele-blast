/**
 * Centralized phone action utilities.
 *
 * Priority order for calls:
 *   1. Google Voice (if enabled) → opens in new tab
 *   2. tel: link (default / cell phone)
 *
 * Priority order for SMS sends:
 *   1. Google Voice (if enabled) → opens voice.google.com/messages in new tab
 *   2. sms: URI (default, opens native Messages app)
 */

import { buildGoogleVoiceUrl } from "../pages/TwilioSetupPage";

// ─── Google Voice helpers ─────────────────────────────────────────────────

/** Build a Google Voice messages URL. */
export function buildGoogleVoiceSmsUrl(_phoneNumber?: string): string {
  return "https://voice.google.com/u/0/messages";
}

/** Read the combined Google Voice enabled state from localStorage. */
export function isGoogleVoiceEnabled(): boolean {
  try {
    return (
      localStorage.getItem("googleVoiceEnabled") === "true" ||
      localStorage.getItem("google_voice_enabled") === "true" ||
      !!localStorage.getItem("google_voice_url")
    );
  } catch {
    return false;
  }
}

/**
 * No-op stub — Zoom OAuth removed.
 * Returns false always so callers don’t break at runtime.
 */
export function consumeZoomOAuthComplete(): boolean {
  return false;
}

// ─── Core action handlers ────────────────────────────────────────────────

/** Open a call using Google Voice or tel: depending on settings. */
export function handlePhoneCall(
  phoneNumber: string,
  _phoneLinkEnabled: boolean,
  googleVoiceEnabled: boolean,
  _zoomPhoneEnabled = false,
): void {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return;

  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  if (googleVoiceEnabled) {
    window.open(
      buildGoogleVoiceUrl(phoneNumber),
      "_blank",
      "noopener,noreferrer",
    );
    return;
  }

  // Cell phone fallback
  if (isMobile) {
    window.location.href = `tel:${digits}`;
  } else {
    window.open(`tel:${digits}`, "_blank");
  }
}

/**
 * Open an SMS compose using Google Voice or sms: URI.
 */
export function handleSmsSend(
  phoneNumber: string,
  body: string,
  _phoneLinkEnabled: boolean,
  googleVoiceEnabled = false,
  _zoomPhoneEnabled = false,
): void {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return;

  if (googleVoiceEnabled) {
    window.open(
      buildGoogleVoiceSmsUrl(phoneNumber),
      "_blank",
      "noopener,noreferrer",
    );
    return;
  }

  // Native sms: URI
  const encodedBody = body ? encodeURIComponent(body) : "";
  const smsUri = encodedBody
    ? `sms:${digits}?body=${encodedBody}`
    : `sms:${digits}`;
  window.location.href = smsUri;
}
