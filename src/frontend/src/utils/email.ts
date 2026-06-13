/**
 * Opens the device's native email app (or default mail client on desktop)
 * with the given address, subject, and body pre-filled.
 *
 * IMPORTANT: Both subject and body must be URL-encoded via encodeURIComponent.
 * Line breaks in the body should be represented as \n BEFORE encoding so they
 * become %0A in the final URL, which email clients correctly expand back to
 * newlines.
 *
 * - Mobile (iOS/Android): sets window.location.href = mailto: to trigger the
 *   native email app
 * - Desktop: uses window.open(mailto:, '_blank') to open the default mail client
 */
export function openEmailCompose(
  email: string,
  subject?: string,
  body?: string,
): void {
  if (!email) return;
  const href = buildMailtoHref(email, subject, body);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = href;
  } else {
    window.open(href, "_blank");
  }
}

/**
 * Builds a mailto: href string suitable for use directly in <a href="...">.
 * The browser/OS will intercept it and open the native email app on mobile.
 *
 * Both subject and body are URL-encoded. Line breaks in body are preserved
 * as %0A so email clients correctly display multi-line messages.
 */
export function buildMailtoHref(
  email: string,
  subject?: string,
  body?: string,
): string {
  if (!email) return "#";
  // encodeURIComponent encodes everything including spaces and special chars.
  // Email addresses must NOT be encoded (the @ and . are required plain).
  let mailtoUrl = `mailto:${email}`;
  const params: string[] = [];
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    // Normalize line endings to \n before encoding so %0A is used consistently
    const normalizedBody = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    params.push(`body=${encodeURIComponent(normalizedBody)}`);
  }
  if (params.length > 0) mailtoUrl += `?${params.join("&")}`;
  return mailtoUrl;
}
