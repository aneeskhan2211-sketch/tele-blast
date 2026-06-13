import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  FileText,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  MoreHorizontal,
  Phone,
  Share2,
  Shield,
  TrendingUp,
  User,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { STRIPE_PAYMENT_LINK } from "../constants";
import { useIsMobile } from "../hooks/use-mobile";
import { useIsAdmin } from "../hooks/useAdmin";
import { useLeads } from "../hooks/useLeads";
import { useSubscription } from "../hooks/useSubscription";
import { useSwipeNavigation } from "../hooks/useSwipeNavigation";
import { triggerHaptic } from "../utils/haptics";
import { BirthdayNotification } from "./BirthdayNotification";
import { OfflineBanner } from "./OfflineBanner";

interface LayoutProps {
  children: React.ReactNode;
}

// ── Tab definitions ────────────────────────────────────────────────────────────

const TAB_DASHBOARD = {
  to: "/dashboard",
  label: "Dashboard",
  icon: LayoutDashboard,
};
const TAB_LEADS = { to: "/leads", label: "Leads", icon: Users };
const TAB_PIPELINE = { to: "/pipeline", label: "Pipeline", icon: GitBranch };
const TAB_QUEUES = { to: "/queue", label: "Queues", icon: ListChecks };
const TAB_DIALER = { to: "/power-dialer", label: "Dialer", icon: Phone };
const TAB_TEMPLATES = { to: "/templates", label: "Templates", icon: FileText };
const TAB_SUPPORT = { to: "/support", label: "Support", icon: HelpCircle };
const TAB_AFFILIATE = { to: "/affiliate", label: "Affiliate", icon: Share2 };

type Tab = typeof TAB_DASHBOARD;

/** Desktop tabs for the $30 Pro plan */
function getDesktopTabs(_tier: string): { main: Tab[]; dropdown: Tab[] } {
  return {
    main: [
      TAB_DASHBOARD,
      TAB_LEADS,
      TAB_PIPELINE,
      TAB_QUEUES,
      TAB_DIALER,
      TAB_TEMPLATES,
      TAB_SUPPORT,
    ],
    dropdown: [TAB_AFFILIATE],
  };
}

// ── Mobile nav arrays ──────────────────────────────────────────────────────────

const PRIMARY_NAV_ITEMS = [
  TAB_DASHBOARD,
  TAB_LEADS,
  TAB_PIPELINE,
  TAB_QUEUES,
  TAB_DIALER,
] as const;

// More popup: Templates + extras
const MORE_NAV_ITEMS = [TAB_TEMPLATES, TAB_AFFILIATE] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export function Layout({ children }: LayoutProps) {
  const { clear } = useInternetIdentity();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: leads = [] } = useLeads();
  const { data: isAdmin } = useIsAdmin();
  const { subscriptionTier } = useSubscription();

  const [profileOpen, setProfileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  // Page transition direction tracking
  const [transitionClass, setTransitionClass] = useState("");
  const prevRouteIndex = useRef<number>(-1);

  const profileRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const desktopMoreRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Determine current route index for transitions
  const TRANSITION_ROUTES = [
    "/dashboard",
    "/leads",
    "/pipeline",
    "/queue",
    "/power-dialer",
  ];
  const currentRouteIndex = TRANSITION_ROUTES.findIndex(
    (r) => location.pathname === r || location.pathname.startsWith(`${r}/`),
  );

  // Reactive mobile check (updates on resize / orientation change)
  const isMobile = useIsMobile();

  // Standalone detection — synchronous at render time for SSR-safety
  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true);

  // Show mobile/bottom-nav UI when on small screen OR installed as PWA
  const showMobileUI = isMobile || isStandalone;

  // Page transition on route change (mobile / standalone only)
  useEffect(() => {
    if ((!isMobile && !isStandalone) || currentRouteIndex === -1) {
      prevRouteIndex.current = currentRouteIndex;
      return;
    }
    if (
      prevRouteIndex.current !== -1 &&
      prevRouteIndex.current !== currentRouteIndex
    ) {
      const dir = currentRouteIndex > prevRouteIndex.current ? "right" : "left";
      const cls = dir === "right" ? "page-enter-right" : "page-enter-left";
      setTransitionClass(cls);
      const timer = setTimeout(() => setTransitionClass(""), 220);
      prevRouteIndex.current = currentRouteIndex;
      return () => clearTimeout(timer);
    }
    prevRouteIndex.current = currentRouteIndex;
  }, [currentRouteIndex, isMobile, isStandalone]);

  // Close dropdowns when clicking/touching outside
  useEffect(() => {
    if (!profileOpen && !moreOpen && !desktopMoreOpen && !mobileProfileOpen)
      return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (
        desktopMoreRef.current &&
        !desktopMoreRef.current.contains(e.target as Node)
      ) {
        setDesktopMoreOpen(false);
      }
      if (
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(e.target as Node)
      ) {
        setMobileProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [profileOpen, moreOpen, desktopMoreOpen, mobileProfileOpen]);

  const todayKey = `bday-dismissed-${new Date().toISOString().slice(0, 10)}`;
  const [dismissed, setDismissed] = useState(
    () =>
      typeof localStorage !== "undefined" &&
      localStorage.getItem(todayKey) === "1",
  );

  const handleBirthdayDismiss = () => {
    setDismissed(true);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(todayKey, "1");
    }
  };

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  const handleSignOut = () => {
    clear();
    navigate({ to: "/" });
  };

  // Tier-gated desktop tabs
  const { main: desktopMainTabs, dropdown: desktopDropdownTabs } =
    getDesktopTabs(subscriptionTier);
  const hasDesktopDropdown = desktopDropdownTabs.length > 0;
  const isDesktopMoreActive = desktopDropdownTabs.some((item) =>
    isActive(item.to),
  );

  // When tier === 'none', all tabs except Dashboard are locked
  const isLocked = (to: string) =>
    subscriptionTier === "none" && to !== "/dashboard";

  function handleLockedTabClick(e: React.MouseEvent, label: string) {
    e.preventDefault();
    toast.info(`Subscribe to access ${label}`, {
      description: "Get full access for $15/month",
      duration: 3000,
      action: {
        label: "Subscribe",
        onClick: () => window.open(STRIPE_PAYMENT_LINK, "_blank"),
      },
    });
  }

  // Mobile More drawer — all items visible for paid users
  const moreNavItems = MORE_NAV_ITEMS;

  // Check if any mobile "More" item is currently active
  const isMoreActive = moreNavItems.some((item) => isActive(item.to));

  // Swipe navigation (mobile / standalone only)
  const { handleTouchStart, handleTouchEnd } = useSwipeNavigation({
    currentPath: location.pathname,
    enabled: isMobile || isStandalone,
  });

  // Ripple helper for bottom nav items
  function spawnRipple(e: React.TouchEvent<HTMLElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const ripple = document.createElement("span");
    ripple.className = "nav-ripple";
    ripple.style.left = `${touch.clientX - rect.left}px`;
    ripple.style.top = `${touch.clientY - rect.top}px`;
    target.style.position = "relative";
    target.style.overflow = "hidden";
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
  }

  return (
    <div
      className="flex flex-col bg-background"
      style={{
        minHeight: "100dvh",
        height: "100dvh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* ── Offline Banner ── */}
      <OfflineBanner />

      {/* ── Mobile Top Bar (mobile / standalone only) ── */}
      {showMobileUI && (
        <header
          className="sticky top-0 z-50 border-b shrink-0"
          style={{
            background: "oklch(0.22 0.12 264)",
            borderColor: "oklch(0.28 0.12 264)",
          }}
        >
          <div className="px-4 h-12 flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ background: "oklch(0.56 0.16 44)" }}
              >
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                Tele-Blast
              </span>
            </div>
            {/* Mobile profile dropdown */}
            <div className="relative" ref={mobileProfileRef}>
              <button
                type="button"
                onClick={() => setMobileProfileOpen((v) => !v)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-haspopup="true"
                aria-expanded={mobileProfileOpen}
                aria-label="Profile menu"
                data-ocid="mobile-profile-menu-btn"
              >
                <UserCircle className="w-5 h-5" />
              </button>
              {mobileProfileOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]"
                  style={{
                    background: "white",
                    borderColor: "oklch(0.91 0 0)",
                  }}
                  role="menu"
                >
                  <Link
                    to="/profile"
                    onClick={() => setMobileProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="mobile-profile-menu-profile-link"
                    role="menuitem"
                  >
                    <User
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Profile
                  </Link>
                  <Link
                    to="/support"
                    onClick={() => setMobileProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="mobile-profile-menu-support-link"
                    role="menuitem"
                  >
                    <HelpCircle
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Support
                  </Link>
                  <div
                    className="h-px mx-3 my-1"
                    style={{ background: "oklch(0.93 0 0)" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMobileProfileOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-red-50"
                    style={{ color: "oklch(0.45 0.18 20)" }}
                    data-ocid="mobile-profile-menu-signout-btn"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* ── Header (desktop only — hidden on mobile and in standalone PWA) ── */}
      <header
        className={`desktop-nav-header sticky top-0 z-50 border-b shrink-0${showMobileUI ? " hidden" : ""}`}
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">
              Tele-Blast
            </span>
          </div>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-3 flex-1 min-w-0"
            data-ocid="main-nav"
          >
            {desktopMainTabs.map((item) => {
              const active = isActive(item.to);
              const locked = isLocked(item.to);
              if (locked) {
                return (
                  <button
                    key={item.to}
                    type="button"
                    className="relative flex items-center gap-1.5 px-1.5 py-1 text-sm font-medium whitespace-nowrap shrink-0 text-white/30 cursor-pointer"
                    onClick={(e) => handleLockedTabClick(e, item.label)}
                    data-ocid={`nav-link-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
                    aria-label={`${item.label} — subscribe to access`}
                    title="Subscribe to access"
                  >
                    <span style={{ filter: "blur(3px)" }}>{item.label}</span>
                    <Lock className="w-2.5 h-2.5 shrink-0 text-white/30" />
                  </button>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-1.5 px-1.5 py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                  data-ocid={`nav-link-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "oklch(0.56 0.16 44)" }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}

            {/* Desktop "More" dropdown */}
            {hasDesktopDropdown && (
              <div className="relative shrink-0" ref={desktopMoreRef}>
                <button
                  type="button"
                  onClick={() => setDesktopMoreOpen((v) => !v)}
                  className={`relative flex items-center gap-1 px-1.5 py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isDesktopMoreActive || desktopMoreOpen
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={desktopMoreOpen}
                  data-ocid="desktop-nav-more-btn"
                >
                  More
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${desktopMoreOpen ? "rotate-180" : ""}`}
                  />
                  {isDesktopMoreActive && !desktopMoreOpen && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "oklch(0.56 0.16 44)" }}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {desktopMoreOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]"
                    style={{
                      background: "white",
                      borderColor: "oklch(0.91 0 0)",
                    }}
                    role="menu"
                  >
                    {desktopDropdownTabs.map((item) => {
                      const active = isActive(item.to);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDesktopMoreOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                          style={{
                            color: active
                              ? "oklch(0.46 0.16 44)"
                              : "oklch(0.22 0.12 264)",
                            background: active
                              ? "oklch(0.56 0.16 44 / 0.06)"
                              : undefined,
                          }}
                          data-ocid={`desktop-more-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                        >
                          <Icon
                            className="w-4 h-4 shrink-0"
                            style={{
                              color: active
                                ? "oklch(0.46 0.16 44)"
                                : "oklch(0.45 0.12 264)",
                            }}
                          />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors text-sm min-h-[44px] min-w-[44px] justify-center"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="Profile menu"
                data-ocid="profile-menu-btn"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-56 rounded-xl shadow-xl border overflow-hidden z-[60]"
                  style={{
                    background: "white",
                    borderColor: "oklch(0.91 0 0)",
                  }}
                  role="menu"
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="profile-menu-profile-link"
                    role="menuitem"
                  >
                    <User
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Profile
                  </Link>
                  <Link
                    to="/twilio-setup"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="profile-menu-phone-sms-setup-link"
                    role="menuitem"
                  >
                    <Phone
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Phone/SMS Setup
                  </Link>
                  {/* Affiliate Dashboard */}
                  <Link
                    to="/affiliate"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="profile-menu-affiliate-link"
                    role="menuitem"
                  >
                    <Share2
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Affiliate Dashboard
                  </Link>
                  <Link
                    to="/support"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                    data-ocid="profile-menu-support-link"
                    role="menuitem"
                  >
                    <HelpCircle
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.45 0.12 264)" }}
                    />
                    Support
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50"
                      style={{ color: "oklch(0.22 0.12 264)" }}
                      data-ocid="profile-menu-admin-link"
                      role="menuitem"
                    >
                      <Shield
                        className="w-4 h-4 shrink-0"
                        style={{ color: "oklch(0.45 0.12 264)" }}
                      />
                      Back Office Admin
                    </Link>
                  )}
                  <div
                    className="h-px mx-3 my-1"
                    style={{ background: "oklch(0.93 0 0)" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-red-50"
                    style={{ color: "oklch(0.45 0.18 20)" }}
                    data-ocid="profile-menu-signout-btn"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Birthday Notification Banner ── */}
      {!dismissed && (
        <BirthdayNotification leads={leads} onDismiss={handleBirthdayDismiss} />
      )}

      {/* ── Main content ── */}
      <main
        ref={mainRef}
        className={`flex-1 bg-background${transitionClass ? ` ${transitionClass}` : ""}`}
        style={{
          paddingTop: showMobileUI ? 0 : undefined,
          paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </main>

      {/* ── Footer (desktop only) ── */}
      <footer
        className={`border-t bg-muted/40 py-4 px-6 text-center shrink-0${showMobileUI ? " hidden" : " hidden md:block"}`}
      >
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>

      {/* ── Bottom Navigation (mobile only) ── */}
      <nav
        className={`bottom-tab-bar fixed bottom-0 left-0 right-0 z-50 flex items-center${showMobileUI ? "" : " hidden"}`}
        style={{
          background: "oklch(0.22 0.12 264)",
          borderTop: "1px solid oklch(0.28 0.12 264)",
          height: "64px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Bottom navigation"
        data-ocid="bottom-nav"
      >
        {([...PRIMARY_NAV_ITEMS] as Tab[]).map((item) => {
          const active = isActive(item.to);
          const locked = isLocked(item.to);
          const Icon = item.icon;
          if (locked) {
            return (
              <button
                key={item.to}
                type="button"
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] active:opacity-70 relative opacity-40"
                onClick={(e) => handleLockedTabClick(e, item.label)}
                data-ocid={`bottom-nav-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
                aria-label={`${item.label} — subscribe to access`}
              >
                <div className="flex items-center justify-center w-9 h-7 rounded-lg relative">
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.98 0 0 / 0.35)" }}
                  />
                  <Lock
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5"
                    style={{ color: "oklch(0.98 0 0 / 0.35)" }}
                  />
                </div>
                <span
                  className="text-[10px] font-medium leading-none"
                  style={{
                    color: "oklch(0.98 0 0 / 0.35)",
                    filter: "blur(2px)",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          }
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] transition-colors active:scale-95 relative"
              data-ocid={`bottom-nav-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
              aria-current={active ? "page" : undefined}
              onTouchStart={(e) => {
                triggerHaptic();
                spawnRipple(e);
              }}
            >
              {/* Active pill indicator */}
              {active && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full transition-all duration-200"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                  aria-hidden="true"
                />
              )}
              <div
                className={`flex items-center justify-center w-9 h-7 rounded-lg transition-colors ${
                  active ? "bg-white/15" : ""
                }`}
              >
                <Icon
                  className="w-5 h-5"
                  style={{
                    color: active
                      ? "oklch(0.75 0.16 44)"
                      : "oklch(0.98 0 0 / 0.55)",
                  }}
                />
              </div>
              <span
                className="text-[10px] font-medium leading-none"
                style={{
                  color: active
                    ? "oklch(0.75 0.16 44)"
                    : "oklch(0.98 0 0 / 0.55)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* ── More menu button (mobile) — Templates disabled on web ── */}
        <div className="flex-1 relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className="w-full flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] active:scale-95 relative transition-transform"
            aria-haspopup="true"
            aria-expanded={moreOpen}
            data-ocid="bottom-nav-more-btn"
            onTouchStart={(e) => {
              triggerHaptic();
              spawnRipple(e);
            }}
          >
            {isMoreActive && (
              <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full"
                style={{ background: "oklch(0.56 0.16 44)" }}
                aria-hidden="true"
              />
            )}
            <div
              className={`flex items-center justify-center w-9 h-7 rounded-lg ${
                isMoreActive ? "bg-white/15" : ""
              }`}
            >
              {moreOpen ? (
                <X
                  className="w-5 h-5"
                  style={{
                    color: isMoreActive
                      ? "oklch(0.75 0.16 44)"
                      : "oklch(0.98 0 0 / 0.55)",
                  }}
                />
              ) : (
                <MoreHorizontal
                  className="w-5 h-5"
                  style={{
                    color: isMoreActive
                      ? "oklch(0.75 0.16 44)"
                      : "oklch(0.98 0 0 / 0.55)",
                  }}
                />
              )}
            </div>
            <span
              className="text-[10px] font-medium leading-none"
              style={{
                color: isMoreActive
                  ? "oklch(0.75 0.16 44)"
                  : "oklch(0.98 0 0 / 0.55)",
              }}
            >
              More
            </span>
          </button>

          {/* More popup menu */}
          {moreOpen && (
            <div
              className="absolute bottom-full right-0 mb-1 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]"
              style={{
                background: "white",
                borderColor: "oklch(0.91 0 0)",
              }}
              role="menu"
            >
              {moreNavItems.map((item) => {
                const active = isActive(item.to);
                const Icon = item.icon;
                // Templates are non-clickable on web (non-standalone, screen >= 768px)
                const isTemplatesWebDisabled =
                  item.to === "/templates" &&
                  typeof window !== "undefined" &&
                  !window.matchMedia("(display-mode: standalone)").matches &&
                  !(navigator as { standalone?: boolean }).standalone &&
                  window.innerWidth >= 768;
                if (isTemplatesWebDisabled) {
                  return (
                    <div
                      key={item.to}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium min-h-[48px] opacity-40 cursor-not-allowed"
                      style={{ color: "oklch(0.22 0.12 264)" }}
                      title="Use the mobile app to access templates"
                      tabIndex={0}
                      role="menuitem"
                      aria-disabled="true"
                    >
                      <Icon
                        className="w-4 h-4 shrink-0"
                        style={{ color: "oklch(0.45 0.12 264)" }}
                      />
                      {item.label}
                      <span className="ml-auto text-xs text-muted-foreground">
                        (mobile only)
                      </span>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50"
                    style={{
                      color: active
                        ? "oklch(0.46 0.16 44)"
                        : "oklch(0.22 0.12 264)",
                      background: active
                        ? "oklch(0.56 0.16 44 / 0.06)"
                        : undefined,
                    }}
                    data-ocid={`more-menu-${item.to.replace(/^\//, "").replace(/\//g, "-")}`}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{
                        color: active
                          ? "oklch(0.46 0.16 44)"
                          : "oklch(0.45 0.12 264)",
                      }}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
