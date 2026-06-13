import { TrendingUp } from "lucide-react";

interface FeatureLockOverlayProps {
  /** Optional extra class on the white card */
  cardClassName?: string;
}

/**
 * Rendered as position:absolute over gated content.
 * The parent must have `position: relative` and `overflow: hidden`.
 *
 * This is ONLY for features that require a subscription upgrade (Advertise,
 * Local SEO, Social Media = $95/$200 plans). Power Dialer, New Lead Queue,
 * and all $30 core features must NEVER be wrapped with this overlay.
 */
export function FeatureLockOverlay({
  cardClassName = "",
}: FeatureLockOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: "oklch(0.22 0.12 264 / 0.82)" }}
      data-ocid="feature-lock.overlay"
      aria-modal="true"
      role="alertdialog"
      aria-label="Feature access revoked"
    >
      <div
        className={`bg-card rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center space-y-5 border border-border ${cardClassName}`}
        data-ocid="feature-lock.card"
      >
        {/* Logo mark */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "oklch(0.22 0.12 264)" }}
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-foreground leading-snug">
            Tele-Blast
          </h2>
          <p className="text-base font-semibold text-foreground leading-snug">
            Your subscription has ended or contact client services.
          </p>
        </div>

        {/* CTA */}
        <a
          href="mailto:support@tele-blast.com"
          className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 min-h-[48px]"
          style={{ background: "oklch(0.56 0.16 44)" }}
          data-ocid="feature-lock.contact_support_button"
        >
          Contact Client Services
        </a>
      </div>
    </div>
  );
}
