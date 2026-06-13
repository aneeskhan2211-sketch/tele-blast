import { useNavigate } from "@tanstack/react-router";
import { Lock, TrendingUp } from "lucide-react";

interface UpgradeBannerProps {
  tierName: string;
  price: string;
  features: string[];
  ocid?: string;
}

/**
 * Inline upgrade banner shown when a feature requires a higher subscription tier.
 * Only rendered for genuinely gated features ($45+ for AI, $95+ for Advertise,
 * $200+ for Local SEO). Core features ($30) never show this.
 */
export function UpgradeBanner({
  tierName,
  price,
  features,
  ocid = "upgrade.banner",
}: UpgradeBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl overflow-hidden" data-ocid={ocid}>
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "oklch(0.97 0 0 / 0.85)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 10,
        }}
        aria-hidden="true"
      />

      {/* Banner card */}
      <div
        className="relative z-20 flex flex-col items-center gap-5 px-6 py-8 text-center"
        style={{
          background: "oklch(0.22 0.12 264 / 0.03)",
          border: "1.5px solid oklch(0.22 0.12 264 / 0.15)",
          borderRadius: "1rem",
        }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <Lock className="w-7 h-7 text-white" />
        </div>

        {/* Text */}
        <div className="space-y-2 max-w-sm">
          <h3 className="text-lg font-bold text-foreground">{tierName}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This feature is included in the{" "}
            <strong className="text-foreground">{tierName}</strong> at{" "}
            <strong className="text-foreground">{price}/month</strong>.
          </p>
          {features.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 text-left inline-block">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate({ to: "/pricing" })}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white min-h-[48px] transition-all hover:opacity-90 active:scale-95 shadow-sm"
          style={{ background: "oklch(0.56 0.16 44)" }}
          data-ocid={`${ocid}_see_plans_button`}
        >
          <TrendingUp className="w-4 h-4" />
          Upgrade now to use features
        </button>
      </div>
    </div>
  );
}

/**
 * Wrapper that conditionally renders children or the upgrade banner.
 * Only use for features genuinely gated above $30 plan.
 * Power Dialer, New Lead Queue, and core features MUST NOT use this.
 */
export function TierGate({
  hasAccess,
  tierName,
  price,
  features,
  ocid,
  children,
}: UpgradeBannerProps & { hasAccess: boolean; children: React.ReactNode }) {
  if (hasAccess) return <>{children}</>;
  return (
    <div className="relative min-h-[300px]">
      {/* Blurred content behind the banner */}
      <div
        className="absolute inset-0 select-none pointer-events-none overflow-hidden rounded-xl"
        aria-hidden="true"
        style={{ filter: "blur(3px)", opacity: 0.35 }}
      >
        {children}
      </div>
      {/* Banner overlay */}
      <div className="relative z-10 pt-4 px-2">
        <UpgradeBanner
          tierName={tierName}
          price={price}
          features={features}
          ocid={ocid}
        />
      </div>
    </div>
  );
}
