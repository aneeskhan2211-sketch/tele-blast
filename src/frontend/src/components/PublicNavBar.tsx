import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, Menu, TrendingUp, UserPlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSubscription } from "../hooks/useSubscription";

// ── Nav links definition ───────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Video", to: "/video" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "Affiliate", to: "/affiliate-signup" as const },
] as const;

// ── PublicNavBar ───────────────────────────────────────────────────────────────

interface PublicNavBarProps {
  /** The path string that should be highlighted as "active" (e.g. "/video") */
  activePath?: string;
  /** data-ocid prefix for deterministic markers (e.g. "video" → "video.header") */
  ocidPrefix?: string;
}

export function PublicNavBar({
  activePath,
  ocidPrefix = "public",
}: PublicNavBarProps) {
  const navigate = useNavigate();
  const { login } = useInternetIdentity();
  const { subscriptionTier, isLoading: subLoading } = useSubscription();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authInProgress, setAuthInProgress] = useState(false);
  const loginCalledRef = useRef(false);

  async function handleAuth() {
    if (loginCalledRef.current || authInProgress) return;
    loginCalledRef.current = true;
    setAuthInProgress(true);
    try {
      await login();
      try {
        sessionStorage.setItem("tele_blast_just_logged_in", "true");
      } catch {
        /* ignore */
      }
      if (!subLoading && subscriptionTier && subscriptionTier !== "none") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/payment" });
      }
    } catch {
      /* user cancelled */
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "oklch(0.22 0.12 264)",
        borderColor: "oklch(0.28 0.12 264)",
      }}
      data-ocid={`${ocidPrefix}.header`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 shrink-0"
          onClick={() => navigate({ to: "/" })}
          data-ocid={`${ocidPrefix}.header.logo_button`}
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Tele-Blast
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1 ml-8">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = activePath === to;
            return isActive ? (
              <span
                key={to}
                className="text-sm font-semibold text-white"
                aria-current="page"
              >
                {label}
              </span>
            ) : (
              <button
                key={to}
                type="button"
                className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
                onClick={() => navigate({ to })}
                data-ocid={`${ocidPrefix}.nav.${label.toLowerCase()}_link`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right side CTAs */}
        <div className="flex items-center gap-2">
          {/* Log In — hidden on smallest mobile, shown on sm+ */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 min-h-[40px]"
            onClick={handleAuth}
            data-ocid={`${ocidPrefix}.header.login_button`}
          >
            <LogIn className="w-4 h-4" />
            <span>Log In</span>
          </button>

          {/* Get Started CTA */}
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
            style={{ background: "oklch(0.56 0.16 44)" }}
            onClick={handleAuth}
            data-ocid={`${ocidPrefix}.header.get_started_button`}
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Get Started</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid={`${ocidPrefix}.header.mobile_menu_toggle`}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{
            background: "oklch(0.25 0.12 264)",
            borderColor: "oklch(0.28 0.12 264)",
          }}
        >
          {NAV_LINKS.map(({ label, to }) => (
            <button
              key={to}
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileOpen(false);
                navigate({ to });
              }}
              data-ocid={`${ocidPrefix}.mobile_nav.${label.toLowerCase()}_link`}
            >
              {label}
            </button>
          ))}

          <div
            className="mt-2 pt-3 flex flex-col gap-2 border-t"
            style={{ borderColor: "oklch(0.98 0 0 / 0.1)" }}
          >
            <button
              type="button"
              className="flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileOpen(false);
                handleAuth();
              }}
              data-ocid={`${ocidPrefix}.mobile_nav.login_button`}
            >
              <LogIn className="w-4 h-4" />
              Log In
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "oklch(0.56 0.16 44)" }}
              onClick={() => {
                setMobileOpen(false);
                handleAuth();
              }}
              data-ocid={`${ocidPrefix}.mobile_nav.get_started_button`}
            >
              <UserPlus className="w-4 h-4" />
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
