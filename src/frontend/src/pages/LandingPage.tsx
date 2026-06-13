import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  DollarSign,
  Download,
  LogIn,
  Menu,
  Phone,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INTENDED_ROUTE_KEY } from "../components/ProtectedRoute";
import { SiteFooter } from "../components/SiteFooter";
import { STRIPE_PAYMENT_LINK } from "../constants";
import {
  useGetPackageConfig,
  useGetShowComingSoonTeaser,
} from "../hooks/useAdmin";
import { useProfile } from "../hooks/useProfile";
import { useSEO } from "../hooks/useSEO";
import { useSubscription } from "../hooks/useSubscription";

// ── Owner bypass — this email always goes straight to dashboard, never to /payment ──
const BYPASS_EMAIL = "mikebendett@gmail.com";

// ── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

// ── Package Features — keyed by tier ──────────────────────────────────────────

const PACKAGE_FEATURES: Record<string, string[]> = {
  pro: [
    "Leads & Pipeline Management",
    "Power Dialer — calls & texts only",
    "Manual SMS Templates with Text Spinning",
    "CSV Lead Import (up to 500 leads)",
    "Google Voice or Cell Phone for calls & texts",
    "Lead Queues (New Lead, Follow-Up, Birthday)",
    "Multiple Pipelines",
    "Do Not Call (DNC) Management",
  ],
};

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Users,
    title: "Lead Management",
    description:
      "Store every detail: name, phone, email, business info, title, website, address, city/state/zip, industry, birthday, source, and 5 custom fields. Toggle between tiles, info-rich cards, or a full list view with one-tap call/text/email icons.",
    blogLink: "/blog/centralized-communication-dashboard",
    blogLabel: "Read: Centralized Dashboard Guide",
  },
  {
    icon: Phone,
    title: "Power Dialer",
    description:
      "Work through your lead list in sessions. Call or text leads one by one — the app auto-advances after each action. Log a disposition and set a follow-up date after every call.",
    blogLink: "/blog/automated-follow-ups",
    blogLabel: "Read: Automated Follow-Ups Guide",
  },
  {
    icon: BarChart3,
    title: "Pipeline Management",
    description:
      "Move leads through 4 stages: Prospect → Contacted → Qualified → Closed. View by pipeline or across all pipelines. Swipe to advance on mobile.",
    blogLink: "/blog/sms-broadcast-automation",
    blogLabel: "Read: SMS Automation Guide",
  },
  {
    icon: Bell,
    title: "Birthday & Follow-Up Queues",
    description:
      "Birthday Queue shows leads with birthdays in the next 60 days. Get an in-app reminder at 9am on their birthday. Follow-Up Queue tracks every lead with a follow-up date, sorted soonest first.",
    blogLink: "/blog/appointment-reminders",
    blogLabel: "Read: Reduce No-Shows Guide",
  },
  {
    icon: Upload,
    title: "CSV Import & Bulk Actions",
    description:
      "Import up to 500 leads at once with column matching and pipeline assignment. Select all and bulk send to dialer, mark as DNC, or delete. Industry column is mappable for instant search.",
    blogLink: "/blog/sms-broadcast-automation",
    blogLabel: "Read: SMS Broadcast Guide",
  },
  {
    icon: DollarSign,
    title: "Affiliate Program",
    description:
      "Earn 25% commission ($7.50/month) on every referral. Get a personal referral link. Payouts via PayPal 30 days after sale. Track clicks, conversions, and earnings on your dashboard.",
    blogLink: "/blog/centralized-communication-dashboard",
    blogLabel: "Read: One Platform Guide",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Tele-Blast cut my prospecting time in half. I close 40% more deals now because I spend time selling, not organizing.",
    name: "Marcus T.",
    title: "Commercial Sales Agent",
  },
  {
    quote:
      "The power dialer alone is worth every penny. I can blast through 50 follow-up calls in a morning.",
    name: "Diane R.",
    title: "Sales Specialist",
  },
  {
    quote:
      "Finally an app built for sales agents. The pipeline view keeps me focused and the drip campaigns run on autopilot.",
    name: "James K.",
    title: "Sales Professional",
  },
];

const FAQS: FAQItem[] = [
  {
    q: "What's included in the Pro plan?",
    a: "The $15 Pro plan includes leads and pipeline management, power dialer (calls & texts only — no email), manual SMS templates with local text spinning, CSV lead import (up to 500 leads), Google Voice or cell phone for calls & texts, lead queues (New Lead, Follow-Up, Birthday), multiple pipelines, and Do Not Call (DNC) management.",
  },
  {
    q: "Is there an affiliate program?",
    a: "Yes. Sign up at tele-blast.com/affiliate-signup to get your personal referral link. You earn 25% commission ($7.50/month) on every subscriber you refer, paid via PayPal 30 days after each sale.",
  },
  {
    q: "Is there a free trial?",
    a: "We don't offer a free trial at this time, but you can cancel any time from your billing portal.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel before your next billing cycle and you won't be charged again.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your data is stored on the Internet Computer blockchain — fully encrypted and private by design.",
  },
  {
    q: "Can I import my existing leads?",
    a: "Absolutely. Use the built-in CSV import tool to bring in your existing list in minutes. You can match columns, assign pipeline stages, and bulk-delete or archive as needed.",
  },
  {
    q: "Can I make calls and send texts from my computer?",
    a: "Yes — Tele-Blast's click-to-call and click-to-text links work on any device. On a computer, whether those links trigger your phone depends on your device pairing setup: iPhone + Mac users can enable iPhone Handoff/Continuity so clicking a phone number on your Mac routes the call through your iPhone. Android + Windows users can use Phone Link to make and receive calls and texts through their Android phone over Bluetooth or Wi-Fi.",
  },
];

const STATS = [
  { value: "100+", label: "Sales Agents" },
  { value: "10x", label: "Faster Outreach" },
  { value: "100%", label: "Data Privacy" },
];

// ── Pricing card definitions ──────────────────────────────────────────────────

interface PricingTier {
  tier: string;
  label: string;
  price: string;
  badge?: string;
  highlight?: boolean;
  dark?: boolean;
  onSubscribe: () => void;
  ocid: string;
  subscribeOcid: string;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {["s1", "s2", "s3", "s4", "s5"].map((k) => (
        <Star
          key={k}
          className="w-4 h-4 fill-current"
          style={{ color: "oklch(0.56 0.16 44)" }}
        />
      ))}
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y" style={{ borderColor: "oklch(0.88 0 0)" }}>
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            className="w-full flex items-center justify-between gap-4 py-4 px-0 text-left transition-colors duration-200 hover:opacity-80 min-h-[44px]"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            data-ocid={`faq.item.${i + 1}`}
          >
            <span
              className="text-base font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              {item.q}
            </span>
            <ChevronDown
              className="w-5 h-5 shrink-0 transition-transform duration-200"
              style={{
                color: "oklch(0.56 0.16 44)",
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {openIndex === i && (
            <p
              className="pb-4 text-sm leading-relaxed"
              style={{ color: "oklch(0.48 0 0)" }}
            >
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: dark
          ? "oklch(0.56 0.16 44 / 0.25)"
          : "oklch(0.56 0.16 44 / 0.12)",
      }}
    >
      <Check
        className="w-3 h-3"
        style={{ color: dark ? "oklch(0.82 0.14 44)" : "oklch(0.46 0.16 44)" }}
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

// ── PWA install helpers (shared between landing & dashboard) ─────────────────
type DeferredPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
};

function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<DeferredPromptEvent | null>(null);
  const [installState, setInstallState] = useState<
    "hidden" | "prompt" | "ios" | "installed"
  >("hidden");
  const [showIosSheet, setShowIosSheet] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setInstallState("installed");
      return;
    }
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      setInstallState("ios");
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as DeferredPromptEvent);
      setInstallState("prompt");
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerInstall = async () => {
    if (installState === "ios") {
      setShowIosSheet(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setInstallState("installed");
      setDeferredPrompt(null);
    }
  };

  return { installState, showIosSheet, setShowIosSheet, triggerInstall };
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { identity, loginStatus, login } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { installState, showIosSheet, setShowIosSheet, triggerInstall } =
    usePwaInstall();
  const {
    subscriptionTier,
    isLoading: subLoading,
    isFreshlyLoaded: subFreshlyLoaded,
  } = useSubscription();
  // Profile is used solely for the owner bypass email check
  const { data: profileData } = useProfile();

  // Track in-progress auth so buttons show a spinner while II popup is open
  const [authInProgress, setAuthInProgress] = useState(false);
  // Prevent double-triggering login if the user clicks twice quickly
  const loginCalledRef = useRef(false);
  // Track whether the user just completed the II login flow in this session.
  // This gates the post-auth redirect so returning authenticated users who
  // navigate back to "/" are NOT re-routed by the effect on every render.
  const justLoggedInRef = useRef(false);

  // Fetch which packages are enabled — falls back to all-enabled if backend not available
  const { data: packageConfig } = useGetPackageConfig();
  // Fetch whether "Coming Soon AI" teaser should be shown — hidden by default
  const { data: showComingSoonTeaser = false } = useGetShowComingSoonTeaser();

  // ── Page SEO ─────────────────────────────────────────────────────────────
  useSEO({
    title:
      "Tele-Blast | SMS Broadcast Automation and Lead Management for Small Businesses",
    description:
      "Tele-Blast helps small businesses save time and money with SMS broadcast automation, automated follow-ups, appointment reminders, and a centralized communication dashboard. Start for $15/month.",
    canonical: "https://www.tele-blast.com/",
    ogTitle:
      "Tele-Blast | SMS Broadcast Automation and Power Dialer for Sales Agents",
    ogDescription:
      "Reach more customers, close more deals, and reduce no-shows with Tele-Blast. SMS automation for small businesses starting at $15/month.",
    ogUrl: "https://www.tele-blast.com/",
    ogType: "website",
    ogImage: "https://www.tele-blast.com/og-image.png",
    twitterTitle: "Tele-Blast | SMS Broadcast Automation and Power Dialer",
    twitterDescription:
      "Reach more customers, close more deals, and reduce no-shows. SMS automation for small businesses starting at $15/month.",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: "Tele-Blast Navigation",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Home",
          url: "https://www.tele-blast.com/",
        },
        {
          "@type": "WebPage",
          name: "Pricing",
          url: "https://www.tele-blast.com/pricing",
        },
        {
          "@type": "WebPage",
          name: "Blog",
          url: "https://www.tele-blast.com/blog",
        },
        {
          "@type": "WebPage",
          name: "Support",
          url: "https://www.tele-blast.com/support",
        },
        {
          "@type": "WebPage",
          name: "Affiliate Program",
          url: "https://www.tele-blast.com/affiliate-signup",
        },
      ],
    }),
  });

  // ── JSON-LD structured data for SEO ──────────────────────────────────────
  useEffect(() => {
    const faqSchemaItems = FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }));

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tele-Blast",
        url: "https://www.tele-blast.com",
        description: "Sales pipeline and lead management app for sales agents",
        sameAs: [
          "https://www.linkedin.com/company/insurance-leads-ai/",
          "https://www.facebook.com/profile.php?id=61589120873004",
          "https://www.instagram.com/insuranceleadsai/",
          "https://x.com/insleadsAI",
        ],
        logo: "https://www.tele-blast.com/icons/icon-192.svg",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Tele-Blast",
        url: "https://www.tele-blast.com",
        description:
          "Track sales prospects, manage outreach on your mobile device & close more deals with less effort",
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Tele-Blast",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Sales pipeline management with power dialer, lead tracking, email/SMS templates, and sales tools for sales agents",
        featureList: [
          "Lead Management with 20+ custom fields including birthday, source, and 5 custom fields",
          "Power Dialer for Call and Text sessions with auto-advance",
          "Pipeline Management with 4 stages: Prospect, Contacted, Qualified, Closed",
          "Birthday Queue with 9am in-app reminders for next 60 days",
          "Follow-Up Queue sorted by soonest follow-up date",
          "CSV Import with column matching and bulk actions",
          "Google Voice or Cell Phone click-to-call",
          "Affiliate Program with 25% commission and PayPal payouts",
          "Admin Back Office with user management and access control",
        ],
        offers: [
          {
            "@type": "Offer",
            name: "Pro",
            price: "15",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchemaItems,
      },
    ];

    const scriptTags: HTMLScriptElement[] = schemas.map((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      for (const s of scriptTags) {
        if (s.parentNode) s.parentNode.removeChild(s);
      }
    };
  }, []);

  // ── Navigate to /pre-signup for new account creation ────────────────────────
  // "Create Account" and "Get Started" go to the pre-signup form FIRST so the
  // user fills in their profile before Internet Identity fires.
  function handleCreateAccount() {
    navigate({ to: "/pre-signup" });
  }

  // ── Auth handler — calls login() DIRECTLY for the Log In flow ────────────────
  // Log In bypasses the pre-signup form and calls II directly, then routes
  // returning users (with a paid plan) straight to the dashboard.
  async function handleAuth() {
    if (loginCalledRef.current || authInProgress) return;
    loginCalledRef.current = true;
    setAuthInProgress(true);
    try {
      await login();
      // Mark that the user just went through the II flow in this session.
      // The post-auth effect below uses this flag to know it should redirect.
      justLoggedInRef.current = true;
      // CRITICAL: Also set the sessionStorage flag so ProtectedRoute can
      // distinguish a fresh login from an already-authenticated page visit.
      // ProtectedRoute reads and immediately clears this flag, so it only
      // fires once per login session.
      try {
        sessionStorage.setItem("tele_blast_just_logged_in", "true");
      } catch {
        // Private browsing may throw — safe to ignore
      }
    } catch {
      // User cancelled II or error — silently reset
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }

  // ── Post-auth routing: fires once identity AND subscription are both loaded ─
  // CRITICAL RULE: This effect ONLY routes when justLoggedInRef is true — i.e.,
  // when the user just completed Internet Identity in THIS session. If the user
  // was already authenticated and navigated back to "/", we do NOT re-route them
  // here. Instead, the already-authenticated redirect block below handles it.
  //
  // We still gate on `subFreshlyLoaded` — NOT just `!subLoading` — because
  // `subLoading` can become false before the backend tier call returns.
  useEffect(() => {
    // ── GUARD: Public form URLs must NEVER be redirected away from. ──────────
    // Must be the very first check in every effect that calls navigate().
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/f/") ||
      currentPath.startsWith("/lead-forms/public/")
    ) {
      return;
    }

    if (!justLoggedInRef.current) return;
    if (loginStatus === "initializing") return;
    if (!identity) return;
    // Wait for BOTH: loading to stop AND fresh data to arrive from backend.
    if (subLoading || !subFreshlyLoaded) return;

    // Consume the flag so this only fires once per login.
    justLoggedInRef.current = false;

    // ── Owner bypass: this email always goes straight to dashboard ──────────
    const userEmail = profileData?.email ?? "";
    if (userEmail === BYPASS_EMAIL) {
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    // User is authenticated and subscription tier has been freshly confirmed
    // from the backend — route them now.
    if (subscriptionTier === "none") {
      // New user with no plan coming through the Log In path — send to /activate-new.
      // If they came through /pre-signup, that page already navigates to /activate-new.
      // This handles the case where they clicked Log In directly.
      navigate({ to: "/activate-new", replace: true });
    } else {
      // Restore intended route if set, else dashboard
      let destination = "/dashboard";
      try {
        const stored = sessionStorage.getItem(INTENDED_ROUTE_KEY);
        if (
          stored?.startsWith("/") &&
          stored !== "/payment" &&
          stored !== "/login" &&
          stored !== "/security-login" &&
          stored !== "/"
        ) {
          destination = stored;
          sessionStorage.removeItem(INTENDED_ROUTE_KEY);
        }
      } catch {
        // ignore
      }
      navigate({ to: destination as "/", replace: true });
    }
  }, [
    identity,
    loginStatus,
    subLoading,
    subFreshlyLoaded,
    subscriptionTier,
    profileData,
    navigate,
  ]);

  // ── Already-authenticated redirect: fires on mount if user is already logged in ─
  // CRITICAL RULE: If the user is already authenticated and lands on "/", send
  // them to /dashboard IMMEDIATELY — do NOT wait for subscription data here.
  // ProtectedRoute handles the loading spinner and subscription check from there.
  // This eliminates the race window where the landing page sits with isAuthenticated=true
  // while subscription is still loading, which was causing spurious /payment redirects.
  //
  // Exceptions:
  //   - current path starts with /f/ → public form, NEVER redirect away (checked FIRST)
  //   - current path starts with /lead-forms/public/ → legacy public form, NEVER redirect
  //   - justLoggedInRef.current === true → post-auth effect handles routing
  useEffect(() => {
    // ── GUARD: Public form URLs must NEVER be redirected away from. ──────────
    // This must be the very first check — before auth state, before anything.
    // If the user (authenticated or not) is on a /f/ or /lead-forms/public/ path,
    // this effect must do absolutely nothing.
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/f/") ||
      currentPath.startsWith("/lead-forms/public/")
    ) {
      return;
    }

    // Skip if just-logged-in — that case is handled by the post-auth effect above.
    if (justLoggedInRef.current) return;
    if (loginStatus === "initializing") return;
    if (!identity) return;

    // Already authenticated — go straight to /dashboard.
    // ProtectedRoute will show a spinner while subscription loads, then either
    // show the dashboard (has plan) or redirect to /payment (genuinely new user).
    // We NEVER send an already-authenticated user to /payment from the landing page.
    navigate({ to: "/dashboard", replace: true });
  }, [identity, loginStatus, navigate]);

  function scrollTo(id: string) {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // Determine which tiers to show — fall back to all 4 if config not loaded yet
  function isTierEnabled(tier: string): boolean {
    if (!packageConfig || packageConfig.length === 0) return true;
    const entry = packageConfig.find((e) => e.tier === tier);
    return entry ? entry.enabled : true;
  }

  const pricingTiers: PricingTier[] = [
    {
      tier: "pro",
      label: "Pro",
      price: "$15",
      onSubscribe: () => {
        navigate({ to: "/pre-signup" });
      },
      ocid: "landing.pricing.pro_card",
      subscribeOcid: "landing.pricing.subscribe_button",
    },
  ];

  const visibleTiers = pricingTiers.filter((t) => isTierEnabled(t.tier));

  // Show a fullscreen spinner while loginStatus is initializing
  if (loginStatus === "initializing") {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
        data-ocid="landing.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // If authenticated user lands back here (e.g. back button), show contextual CTA
  // rather than auto-redirecting. The useEffect above handles the actual redirect.
  const isAuthenticated = !!identity;
  const isLoadingPostAuth = isAuthenticated && subLoading;

  // Auth button label + icon — show spinner if II is opening or post-auth loading
  const authBusy = authInProgress || isLoadingPostAuth;

  return (
    <div
      className="flex flex-col bg-background overflow-x-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
        data-ocid="landing.header"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Tele-Blast
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 flex-1 ml-8">
            {[
              { label: "Features", id: "features" },
              { label: "Pricing", id: "pricing" },
              { label: "FAQ", id: "faq" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
                onClick={() => scrollTo(id)}
                data-ocid={`landing.nav.${id}`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
              onClick={() => navigate({ to: "/blog" })}
              data-ocid="landing.nav.blog"
            >
              Blog
            </button>
            <button
              type="button"
              className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
              onClick={() => navigate({ to: "/video" })}
              data-ocid="landing.nav.video"
            >
              Video
            </button>
            <button
              type="button"
              className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
              onClick={() => navigate({ to: "/affiliate-signup" })}
              data-ocid="landing.nav.affiliate"
            >
              Affiliate
            </button>
            <button
              type="button"
              className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
              onClick={() => navigate({ to: "/support" })}
              data-ocid="landing.nav.support"
            >
              Support
            </button>
          </nav>

          {/* Right side CTAs */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              /* Already logged in — always go to Dashboard.
                 New users who need to pay are redirected by the post-auth effect,
                 never by clicking a button on the landing page. */
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
                style={{ background: "oklch(0.56 0.16 44)" }}
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="landing.header.dashboard_button"
              >
                {subLoading || !subFreshlyLoaded ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <TrendingUp className="w-4 h-4 shrink-0" />
                )}
                <span className="hidden xs:inline sm:inline">Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 min-h-[40px] disabled:opacity-60"
                  onClick={handleAuth}
                  disabled={authBusy}
                  data-ocid="landing.header.login_button"
                >
                  {authBusy ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  <span>Log In</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                  onClick={handleCreateAccount}
                  data-ocid="landing.header.signup_button"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span className="hidden xs:inline sm:inline">
                    Create Account
                  </span>
                </button>
              </>
            )}

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="landing.mobile_menu_toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{
              background: "oklch(0.25 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)",
            }}
          >
            {[
              { label: "Features", id: "features" },
              { label: "Pricing", id: "pricing" },
              { label: "FAQ", id: "faq" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
                onClick={() => scrollTo(id)}
                data-ocid={`landing.mobile_nav.${id}`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ to: "/blog" });
              }}
              data-ocid="landing.mobile_nav.blog"
            >
              Blog
            </button>
            <button
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ to: "/video" });
              }}
              data-ocid="landing.mobile_nav.video"
            >
              Video
            </button>
            <button
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ to: "/affiliate-signup" });
              }}
              data-ocid="landing.mobile_nav.affiliate"
            >
              Affiliate
            </button>
            <button
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ to: "/support" });
              }}
              data-ocid="landing.mobile_nav.support"
            >
              Support
            </button>

            <div
              className="mt-2 pt-3 flex flex-col gap-2 border-t"
              style={{ borderColor: "oklch(0.98 0 0 / 0.1)" }}
            >
              {isAuthenticated ? (
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: "/dashboard" });
                  }}
                  data-ocid="landing.mobile_nav.dashboard_button"
                >
                  {subLoading || !subFreshlyLoaded ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] disabled:opacity-60"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAuth();
                    }}
                    disabled={authBusy}
                    data-ocid="landing.mobile_nav.login_button"
                  >
                    {authBusy ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    Log In
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCreateAccount();
                    }}
                    data-ocid="landing.mobile_nav.signup_button"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Your Account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center text-center px-5 pt-32 pb-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)",
          minHeight: "92dvh",
        }}
        data-ocid="landing.hero.section"
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.56 0.16 44 / 0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
            style={{
              background: "oklch(0.56 0.16 44 / 0.18)",
              color: "oklch(0.82 0.14 44)",
              border: "1px solid oklch(0.56 0.16 44 / 0.3)",
            }}
          >
            <TrendingUp className="w-3 h-3" />
            Built for Sales Agents
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 text-white"
            data-ocid="landing.hero.headline"
          >
            Power Dialer, SMS Blast &amp;{" "}
            <span style={{ color: "oklch(0.75 0.16 44)" }}>
              CRM for Sales Agents —{" "}
            </span>
            <span
              className="inline-flex items-center px-3 py-1 rounded-xl text-3xl sm:text-4xl md:text-5xl font-extrabold"
              style={{
                background: "oklch(0.56 0.16 44)",
                color: "white",
              }}
            >
              $15/mo
            </span>
          </h1>

          <p className="text-white/65 text-lg sm:text-xl max-w-xl mb-6 leading-relaxed">
            Track sales prospects, manage outreach on your mobile device &amp;
            close more deals with less effort.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "Power Dialer — calls & texts only",
              "SMS Templates & Lead Queues",
            ].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "oklch(0.98 0 0 / 0.08)",
                  color: "oklch(0.98 0 0 / 0.75)",
                  border: "1px solid oklch(0.98 0 0 / 0.12)",
                }}
              >
                <Check className="w-3 h-3" />
                {pill}
              </span>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5 sm:mb-6 w-full sm:w-auto px-2 sm:px-0">
            {isAuthenticated ? (
              /* Already signed in — always go to Dashboard.
                 The post-auth effect handles routing new (unpaid) users to /payment. */
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-xl min-h-[56px] sm:min-h-[52px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
                style={{ background: "oklch(0.56 0.16 44)" }}
                onClick={() => navigate({ to: "/dashboard" })}
                data-ocid="landing.hero.dashboard_button"
              >
                {subLoading || !subFreshlyLoaded ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <TrendingUp className="w-5 h-5" />
                )}
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl min-h-[52px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                  onClick={handleCreateAccount}
                  data-ocid="landing.hero.signup_button"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Your Account
                </button>

                <button
                  type="button"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold text-lg px-8 py-4 rounded-xl min-h-[56px] sm:min-h-[52px] transition-all duration-200 hover:bg-white/15 active:scale-95 disabled:opacity-70"
                  style={{
                    border: "1.5px solid oklch(0.98 0 0 / 0.3)",
                    background: "oklch(0.98 0 0 / 0.05)",
                  }}
                  onClick={handleAuth}
                  disabled={authBusy}
                  data-ocid="landing.hero.login_button"
                >
                  {authBusy ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-5 h-5" />
                  )}
                  {authBusy ? "Opening sign-in…" : "Log In"}
                </button>
              </>
            )}
          </div>

          {/* PWA Download button */}
          {installState !== "installed" && (
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={triggerInstall}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white text-base min-h-[56px] w-full sm:w-auto transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
                style={{
                  background: "oklch(0.56 0.16 44)",
                  boxShadow: "0 4px 20px oklch(0.56 0.16 44 / 0.45)",
                }}
                data-ocid="landing.hero.download_app_button"
                aria-label="Download Tele-Blast app"
              >
                <Smartphone className="w-5 h-5 shrink-0" />
                <span>
                  {installState === "ios"
                    ? "Add to Home Screen"
                    : "Download Free App"}
                </span>
                <Download className="w-4 h-4 shrink-0 opacity-80" />
              </button>
              {installState === "ios" && !showIosSheet && (
                <p
                  className="text-xs text-center"
                  style={{ color: "oklch(0.98 0 0 / 0.5)" }}
                >
                  Tap to see install instructions for iPhone/iPad
                </p>
              )}
              {showIosSheet && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs text-left"
                  style={{
                    background: "oklch(0.98 0 0 / 0.10)",
                    border: "1px solid oklch(0.98 0 0 / 0.2)",
                    color: "oklch(0.98 0 0 / 0.85)",
                  }}
                >
                  <span className="text-base">📲</span>
                  <span>
                    In Safari, tap the{" "}
                    <strong className="text-white">Share</strong> button (□↑) at
                    the bottom, then tap{" "}
                    <strong className="text-white">
                      &quot;Add to Home Screen&quot;
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowIosSheet(false)}
                    className="shrink-0 ml-1 opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Trust note */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs mb-10"
            style={{
              background: "oklch(0.98 0 0 / 0.06)",
              border: "1px solid oklch(0.98 0 0 / 0.1)",
              color: "oklch(0.98 0 0 / 0.6)",
            }}
          >
            <ShieldCheck
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "oklch(0.75 0.16 44)" }}
            />
            <span>No password required — secured by Internet Identity</span>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-12">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "oklch(0.75 0.16 44)" }}
                >
                  {value}
                </span>
                <span className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Hero visual — SMS broadcast automation dashboard illustration */}
          <div
            className="mt-8 sm:mt-12 w-full max-w-2xl mx-auto"
            aria-hidden="false"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                borderColor: "oklch(0.98 0 0 / 0.12)",
                background: "oklch(0.18 0.10 264)",
              }}
            >
              {/* Mock dashboard header */}
              <div
                className="px-4 py-3 flex items-center gap-2 border-b"
                style={{
                  background: "oklch(0.22 0.12 264)",
                  borderColor: "oklch(0.98 0 0 / 0.1)",
                }}
              >
                <div className="flex gap-1.5">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <div
                      key={c}
                      className="w-3 h-3 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-xs ml-2 font-mono">
                  tele-blast.com — SMS Broadcast Automation Dashboard
                </span>
              </div>
              {/* Mock dashboard body */}
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: "Leads Reached",
                    value: "1,240",
                    icon: "📲",
                    desc: "SMS broadcast automation",
                  },
                  {
                    label: "Calls Today",
                    value: "87",
                    icon: "📞",
                    desc: "Power dialer for sales agents",
                  },
                  {
                    label: "Deals Closed",
                    value: "23",
                    icon: "✅",
                    desc: "Lead management pipeline view",
                  },
                ].map(({ label, value, icon, desc }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 flex flex-col gap-1"
                    style={{ background: "oklch(0.25 0.10 264)" }}
                    aria-label={desc}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="text-white font-bold text-lg leading-none">
                      {value}
                    </span>
                    <span className="text-white/50 text-xs">{label}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4">
                <img
                  src="/icons/icon-192.svg"
                  alt="Automated follow-up system — Tele-Blast dashboard overview"
                  className="hidden"
                  width="1"
                  height="1"
                />
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ background: "oklch(0.25 0.10 264)" }}
                >
                  <div
                    className="p-3 flex items-center justify-between border-b"
                    style={{ borderColor: "oklch(0.98 0 0 / 0.07)" }}
                  >
                    <span className="text-white/70 text-xs font-medium">
                      Power Dialer — Active Session
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: "oklch(0.56 0.16 44 / 0.25)",
                        color: "oklch(0.82 0.14 44)",
                      }}
                    >
                      Live
                    </span>
                  </div>
                  {[
                    {
                      name: "Sarah Johnson",
                      phone: "(555) 234-5678",
                      status: "Follow Up",
                    },
                    {
                      name: "Mike Davis",
                      phone: "(555) 876-5432",
                      status: "New Lead",
                    },
                  ].map(({ name, phone, status }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between px-3 py-2.5 border-b last:border-b-0"
                      style={{ borderColor: "oklch(0.98 0 0 / 0.05)" }}
                    >
                      <div className="flex flex-col">
                        <span className="text-white/90 text-xs font-medium">
                          {name}
                        </span>
                        <span className="text-white/40 text-xs">{phone}</span>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: "oklch(0.22 0.12 264)",
                          color: "oklch(0.75 0.16 44)",
                        }}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="landing.features.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Everything you need to close more deals
            </h2>
            <p className="text-base" style={{ color: "oklch(0.48 0 0)" }}>
              Purpose-built tools for sales agents who move fast.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(
              ({ icon: Icon, title, description, blogLink, blogLabel }, i) => (
                <div
                  key={title}
                  className="bg-card rounded-2xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
                  style={{ borderColor: "oklch(0.91 0 0)" }}
                  data-ocid={`landing.features.item.${i + 1}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "oklch(0.22 0.12 264 / 0.08)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "oklch(0.22 0.12 264)" }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "oklch(0.48 0 0)" }}
                  >
                    {description}
                  </p>
                  {blogLink && (
                    <a
                      href={blogLink}
                      className="mt-3 text-xs font-semibold inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                      style={{ color: "oklch(0.46 0.16 44)" }}
                      data-ocid={`landing.features.blog_link.${i + 1}`}
                    >
                      {blogLabel} →
                    </a>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Feature Illustrations ─────────────────────────────────────── */}

      {/* Section A — Power Dialer in Action */}
      <section
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.22 0.12 264)" }}
        data-ocid="landing.illustrations.dialer_section"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* SVG Illustration */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "oklch(0.56 0.16 44 / 0.4)" }}
          >
            <svg
              viewBox="0 0 480 320"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="dialer-svg-title"
              className="w-full"
            >
              <title id="dialer-svg-title">
                Power dialer for sales teams — click to call leads automatically
              </title>
              <rect width="480" height="320" fill="oklch(0.18 0.10 264)" />
              {/* Header bar */}
              <rect width="480" height="44" fill="oklch(0.22 0.12 264)" />
              <circle cx="16" cy="22" r="5" fill="#ff5f57" />
              <circle cx="30" cy="22" r="5" fill="#ffbd2e" />
              <circle cx="44" cy="22" r="5" fill="#28c840" />
              <text
                x="68"
                y="27"
                fontFamily="monospace"
                fontSize="11"
                fill="rgba(255,255,255,0.5)"
              >
                Power Dialer — Active Session
              </text>
              <rect
                x="390"
                y="12"
                width="74"
                height="20"
                rx="10"
                fill="rgba(232,119,34,0.25)"
              />
              <text
                x="427"
                y="26"
                fontFamily="sans-serif"
                fontSize="10"
                fontWeight="700"
                fill="oklch(0.82 0.14 44)"
                textAnchor="middle"
              >
                ● LIVE
              </text>
              {/* Lead card 1 — current */}
              <rect
                x="20"
                y="60"
                width="440"
                height="72"
                rx="12"
                fill="oklch(0.25 0.10 264)"
                stroke="rgba(232,119,34,0.5)"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="96" r="18" fill="oklch(0.56 0.16 44 / 0.3)" />
              <text
                x="50"
                y="101"
                fontFamily="sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="oklch(0.82 0.14 44)"
                textAnchor="middle"
              >
                SJ
              </text>
              <text
                x="78"
                y="88"
                fontFamily="sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
              >
                Sarah Johnson
              </text>
              <text
                x="78"
                y="105"
                fontFamily="sans-serif"
                fontSize="11"
                fill="rgba(255,255,255,0.5)"
              >
                (555) 234-5678 · Insurance Lead
              </text>
              <rect
                x="294"
                y="76"
                width="60"
                height="24"
                rx="8"
                fill="oklch(0.56 0.16 44)"
              />
              <text
                x="324"
                y="92"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="white"
                textAnchor="middle"
              >
                📞 Call
              </text>
              <rect
                x="364"
                y="76"
                width="60"
                height="24"
                rx="8"
                fill="oklch(0.28 0.12 264)"
              />
              <text
                x="394"
                y="92"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="rgba(255,255,255,0.7)"
                textAnchor="middle"
              >
                💬 Text
              </text>
              <rect
                x="294"
                y="106"
                width="130"
                height="18"
                rx="5"
                fill="rgba(255,255,255,0.06)"
              />
              <text
                x="359"
                y="119"
                fontFamily="sans-serif"
                fontSize="9"
                fill="rgba(255,255,255,0.4)"
                textAnchor="middle"
              >
                Skip · DNC · Follow Up
              </text>
              {/* Lead card 2 */}
              <rect
                x="20"
                y="144"
                width="440"
                height="60"
                rx="12"
                fill="oklch(0.23 0.09 264)"
              />
              <circle cx="50" cy="174" r="15" fill="rgba(255,255,255,0.08)" />
              <text
                x="50"
                y="179"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="rgba(255,255,255,0.5)"
                textAnchor="middle"
              >
                MD
              </text>
              <text
                x="75"
                y="168"
                fontFamily="sans-serif"
                fontSize="12"
                fontWeight="600"
                fill="rgba(255,255,255,0.7)"
              >
                Mike Davis
              </text>
              <text
                x="75"
                y="183"
                fontFamily="sans-serif"
                fontSize="10"
                fill="rgba(255,255,255,0.35)"
              >
                (555) 876-5432 · New Lead
              </text>
              {/* Lead card 3 */}
              <rect
                x="20"
                y="216"
                width="440"
                height="60"
                rx="12"
                fill="oklch(0.23 0.09 264)"
              />
              <circle cx="50" cy="246" r="15" fill="rgba(255,255,255,0.08)" />
              <text
                x="50"
                y="251"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="rgba(255,255,255,0.5)"
                textAnchor="middle"
              >
                CR
              </text>
              <text
                x="75"
                y="240"
                fontFamily="sans-serif"
                fontSize="12"
                fontWeight="600"
                fill="rgba(255,255,255,0.7)"
              >
                Carol Rodriguez
              </text>
              <text
                x="75"
                y="255"
                fontFamily="sans-serif"
                fontSize="10"
                fill="rgba(255,255,255,0.35)"
              >
                (555) 112-3456 · Follow Up
              </text>
              {/* Progress bar */}
              <rect
                x="20"
                y="288"
                width="440"
                height="8"
                rx="4"
                fill="rgba(255,255,255,0.08)"
              />
              <rect
                x="20"
                y="288"
                width="146"
                height="8"
                rx="4"
                fill="oklch(0.56 0.16 44)"
              />
              <text
                x="20"
                y="310"
                fontFamily="sans-serif"
                fontSize="9"
                fill="rgba(255,255,255,0.4)"
              >
                33% complete · 3 of 9 leads
              </text>
            </svg>
          </div>
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{
                background: "oklch(0.56 0.16 44 / 0.2)",
                color: "oklch(0.82 0.14 44)",
                border: "1px solid oklch(0.56 0.16 44 / 0.35)",
              }}
            >
              Power Dialer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white leading-snug">
              Blast through your call list in half the time
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.98 0 0 / 0.6)" }}
            >
              Work through leads one by one — the dialer auto-advances after
              every action. Log a disposition, set a follow-up date, and never
              Work through leads one by one — the dialer auto-advances after
              every action. Log a disposition, set a follow-up date, and never
              lose your place. Works with Google Voice and your cell phone.
              Phone.
            </p>
            <ul className="space-y-3">
              {[
                "Click-to-call or click-to-text from any device",
                "Auto-advances to next lead after each action",
                "Same-day duplicate protection — no double-dialing",
                "Click-to-call or click-to-text from any device",
                "Auto-advances to next lead after each action",
                "Same-day duplicate protection — no double-dialing",
                "Works with Google Voice or your cell phone",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "oklch(0.98 0 0 / 0.75)" }}
                >
                  <span
                    className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "oklch(0.56 0.16 44 / 0.3)" }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke="oklch(0.82 0.14 44)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/blog/automated-follow-ups"
              className="mt-6 inline-flex items-center text-sm font-semibold gap-1 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.75 0.16 44)" }}
            >
              Read: How to stop losing leads →
            </a>
          </div>
        </div>
      </section>

      {/* Section C — CRM Pipeline View */}
      <section
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.20 0.13 264)" }}
        data-ocid="landing.illustrations.pipeline_section"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* SVG Illustration */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "oklch(0.98 0 0 / 0.1)" }}
          >
            <svg
              viewBox="0 0 480 300"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="pipeline-svg-title"
              className="w-full"
            >
              <title id="pipeline-svg-title">
                CRM pipeline for sales teams — manage leads from first contact
                to close
              </title>
              <rect width="480" height="300" fill="oklch(0.18 0.10 264)" />
              {/* Header */}
              <rect width="480" height="42" fill="oklch(0.22 0.12 264)" />
              <text
                x="20"
                y="27"
                fontFamily="sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
              >
                Sales Pipeline
              </text>
              <text
                x="400"
                y="27"
                fontFamily="sans-serif"
                fontSize="10"
                fill="rgba(255,255,255,0.5)"
                textAnchor="end"
              >
                4 leads this week
              </text>
              {/* Kanban columns */}
              {[
                {
                  label: "Prospect",
                  x: 8,
                  leads: ["Alex T.", "Maria S."],
                  color: "rgba(255,255,255,0.08)",
                },
                {
                  label: "Contacted",
                  x: 126,
                  leads: ["John B."],
                  color: "rgba(232,119,34,0.12)",
                },
                {
                  label: "Qualified",
                  x: 244,
                  leads: ["Lisa M.", "Ray C."],
                  color: "rgba(30,58,95,0.5)",
                },
                {
                  label: "Closed",
                  x: 362,
                  leads: ["Tony W."],
                  color: "rgba(40,200,64,0.12)",
                },
              ].map(({ label, x, leads, color }) => (
                <g key={label}>
                  <rect
                    x={x}
                    y={48}
                    width={110}
                    height={248}
                    rx="8"
                    fill={color}
                  />
                  <text
                    x={x + 55}
                    y={67}
                    fontFamily="sans-serif"
                    fontSize="10"
                    fontWeight="700"
                    fill="rgba(255,255,255,0.6)"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                  <rect
                    x={x + 94}
                    y={56}
                    width={18}
                    height={14}
                    rx="7"
                    fill="rgba(255,255,255,0.12)"
                  />
                  <text
                    x={x + 103}
                    y={67}
                    fontFamily="sans-serif"
                    fontSize="9"
                    fill="rgba(255,255,255,0.5)"
                    textAnchor="middle"
                  >
                    {leads.length}
                  </text>
                  {leads.map((name, li) => (
                    <g key={name}>
                      <rect
                        x={x + 6}
                        y={76 + li * 66}
                        width={98}
                        height={58}
                        rx="8"
                        fill="rgba(255,255,255,0.07)"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                      <circle
                        cx={x + 22}
                        cy={x > 300 ? 76 + li * 66 + 18 : 76 + li * 66 + 18}
                        r="10"
                        fill="oklch(0.56 0.16 44 / 0.3)"
                      />
                      <text
                        x={x + 22}
                        y={76 + li * 66 + 23}
                        fontFamily="sans-serif"
                        fontSize="8"
                        fontWeight="700"
                        fill="oklch(0.82 0.14 44)"
                        textAnchor="middle"
                      >
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </text>
                      <text
                        x={x + 38}
                        y={76 + li * 66 + 17}
                        fontFamily="sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="white"
                      >
                        {name}
                      </text>
                      <text
                        x={x + 38}
                        y={76 + li * 66 + 29}
                        fontFamily="sans-serif"
                        fontSize="8"
                        fill="rgba(255,255,255,0.4)"
                      >
                        Insurance Lead
                      </text>
                      <rect
                        x={x + 10}
                        y={76 + li * 66 + 36}
                        width={86}
                        height={14}
                        rx="4"
                        fill="oklch(0.56 0.16 44 / 0.15)"
                      />
                      <text
                        x={x + 53}
                        y={76 + li * 66 + 47}
                        fontFamily="sans-serif"
                        fontSize="8"
                        fill="oklch(0.75 0.16 44)"
                        textAnchor="middle"
                      >
                        📞 Call · 💬 Text
                      </text>
                    </g>
                  ))}
                </g>
              ))}
            </svg>
          </div>
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{
                background: "oklch(0.56 0.16 44 / 0.2)",
                color: "oklch(0.82 0.14 44)",
                border: "1px solid oklch(0.56 0.16 44 / 0.35)",
              }}
            >
              CRM Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white leading-snug">
              Every lead tracked from first contact to closed deal
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.98 0 0 / 0.6)" }}
            >
              Move leads through Prospect → Contacted → Qualified → Closed.
              Filter by pipeline, swipe to advance on mobile, and see your whole
              book of business at a glance.{" "}
              <a
                href="/blog/centralized-communication-dashboard"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.75 0.16 44)" }}
              >
                See the full CRM guide →
              </a>
            </p>
            <ul className="space-y-3">
              {[
                "Multiple pipelines for different products or territories",
                "CSV import up to 500 leads with column mapping",
                "Birthday & Follow-Up queues built in",
                "Do Not Call (DNC) management included",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "oklch(0.98 0 0 / 0.75)" }}
                >
                  <span
                    className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "oklch(0.56 0.16 44 / 0.3)" }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke="oklch(0.82 0.14 44)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "oklch(0.56 0.16 44)" }}
              data-ocid="landing.illustrations.pipeline_cta"
            >
              Get started for $15/mo →
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="landing.testimonials.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Trusted by sales professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
            {TESTIMONIALS.map(({ quote, name, title }, i) => (
              <div
                key={name}
                className="bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-3"
                style={{ borderColor: "oklch(0.91 0 0)" }}
                data-ocid={`landing.testimonials.item.${i + 1}`}
              >
                <StarRating />
                <p
                  className="text-sm leading-relaxed italic flex-1"
                  style={{ color: "oklch(0.35 0 0)" }}
                >
                  "{quote}"
                </p>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                  >
                    {name}
                  </p>
                  <p className="text-xs" style={{ color: "oklch(0.52 0 0)" }}>
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="landing.pricing.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Simple, transparent pricing
            </h2>
            <p className="text-base" style={{ color: "oklch(0.48 0 0)" }}>
              Pick the plan that fits where you are. Upgrade anytime.
            </p>
          </div>

          {/* Dynamic pricing cards — only show tiers where enabled=true */}
          <div
            className={`grid gap-4 sm:gap-5 ${
              visibleTiers.length === 1
                ? "grid-cols-1 max-w-sm mx-auto"
                : visibleTiers.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  : visibleTiers.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            }`}
            data-ocid="landing.pricing.grid"
          >
            {visibleTiers.map((tier, idx) => {
              const features = PACKAGE_FEATURES[tier.tier] ?? [];
              const isDark = tier.dark;
              const isHighlight = tier.highlight;

              return (
                <div
                  key={tier.tier}
                  className={`rounded-3xl p-6 shadow-md flex flex-col relative overflow-hidden ${isDark ? "shadow-lg" : ""}`}
                  style={{
                    border: isDark
                      ? "2.5px solid oklch(0.56 0.16 44)"
                      : isHighlight
                        ? "2px solid oklch(0.56 0.16 44 / 0.6)"
                        : idx === 1
                          ? "2px solid oklch(0.22 0.12 264 / 0.3)"
                          : "2px solid oklch(0.91 0 0)",
                    background: isDark ? "oklch(0.22 0.12 264)" : undefined,
                  }}
                  data-ocid={tier.ocid}
                >
                  {tier.badge && (
                    <div
                      className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                      style={{ background: "oklch(0.56 0.16 44)" }}
                    >
                      {tier.badge}
                    </div>
                  )}

                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 self-start"
                    style={
                      isDark
                        ? {
                            background: "oklch(0.56 0.16 44 / 0.25)",
                            color: "oklch(0.82 0.14 44)",
                          }
                        : isHighlight
                          ? {
                              background: "oklch(0.56 0.16 44 / 0.15)",
                              color: "oklch(0.36 0.16 44)",
                            }
                          : idx === 1
                            ? {
                                background: "oklch(0.22 0.12 264 / 0.1)",
                                color: "oklch(0.22 0.12 264)",
                              }
                            : {
                                background: "oklch(0.56 0.16 44 / 0.12)",
                                color: "oklch(0.46 0.16 44)",
                              }
                    }
                  >
                    {tier.label}
                  </div>

                  <div className="mb-4">
                    <span
                      className="text-4xl font-extrabold"
                      style={{
                        color: isDark
                          ? "oklch(0.98 0 0)"
                          : "oklch(0.22 0.12 264)",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="text-base font-medium ml-1"
                      style={{
                        color: isDark
                          ? "oklch(0.98 0 0 / 0.55)"
                          : "oklch(0.52 0 0)",
                      }}
                    >
                      / month
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <CheckIcon dark={isDark} />
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isDark
                              ? "oklch(0.98 0 0 / 0.85)"
                              : "oklch(0.28 0 0)",
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="w-full font-bold text-sm py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white shadow-md min-h-[44px]"
                    style={{
                      background:
                        isHighlight || isDark
                          ? "oklch(0.56 0.16 44)"
                          : "oklch(0.22 0.12 264)",
                    }}
                    onClick={tier.onSubscribe}
                    data-ocid={tier.subscribeOcid}
                  >
                    {tier.price === "$15"
                      ? "Get Started"
                      : `Get Started — ${tier.price}/mo`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Compare plans link */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.22 0.12 264)" }}
              onClick={() => navigate({ to: "/pricing" })}
              data-ocid="landing.pricing.compare_link"
            >
              Compare all plans →
            </button>
          </div>

          {/* Trust note below pricing cards */}
          <div
            className="mt-6 max-w-3xl mx-auto flex items-start gap-2.5 px-4 py-3 rounded-xl"
            style={{
              background: "oklch(0.22 0.12 264 / 0.06)",
              border: "1px solid oklch(0.22 0.12 264 / 0.12)",
            }}
          >
            <ShieldCheck
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "oklch(0.32 0.15 264)" }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.38 0.05 264)" }}
            >
              No password required. Your account is secured by{" "}
              <span className="font-semibold">Internet Identity</span> — the
              same technology trusted by thousands of decentralized apps.
            </p>
          </div>
        </div>
      </section>

      {/* ── Coming Soon AI Teaser — only shown when admin-enabled ────────── */}
      {showComingSoonTeaser && (
        <section
          className="px-5 py-14 sm:py-16"
          style={{ background: "oklch(0.20 0.13 264)" }}
          data-ocid="landing.coming_soon.section"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider"
              style={{
                background: "oklch(0.56 0.16 44 / 0.18)",
                color: "oklch(0.82 0.14 44)",
                border: "1px solid oklch(0.56 0.16 44 / 0.3)",
              }}
            >
              <Zap className="w-3 h-3" />
              Coming Soon
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              AI-Powered Features on the Way
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8"
              style={{ color: "oklch(0.98 0 0 / 0.65)" }}
            >
              We're building AI tools to supercharge your prospecting — smarter
              lead research, automated templates, and intelligent outreach
              campaigns.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "AI Template Generator",
                "Lead Research AI",
                "Smart Cold Call Scripts",
                "AI Ad Copy",
                "Social Media Tools",
              ].map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "oklch(0.98 0 0 / 0.07)",
                    color: "oklch(0.98 0 0 / 0.7)",
                    border: "1px solid oklch(0.98 0 0 / 0.12)",
                  }}
                >
                  <Zap
                    className="w-3 h-3"
                    style={{ color: "oklch(0.75 0.16 44)" }}
                  />
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Affiliate Callout ────────────────────────────────────────────── */}
      <section
        className="px-5 py-12"
        style={{ background: "oklch(0.22 0.12 264)" }}
        data-ocid="landing.affiliate.section"
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
              style={{
                background: "oklch(0.56 0.16 44 / 0.2)",
                color: "oklch(0.82 0.14 44)",
                border: "1px solid oklch(0.56 0.16 44 / 0.35)",
              }}
            >
              Affiliate Program
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Earn 25% commission on every referral
            </h2>
            <p style={{ color: "oklch(0.98 0 0 / 0.6)" }} className="text-sm">
              Share your link. When someone subscribes, you earn $7.50/month per
              referral — paid via PayPal 30 days after each sale.
            </p>
          </div>
          <a
            href="/affiliate-signup"
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap"
            style={{ background: "oklch(0.56 0.16 44)" }}
            data-ocid="landing.affiliate.cta_button"
          >
            Join Affiliate Program
          </a>
        </div>
      </section>

      {/* ── Blog Spotlight ────────────────────────────────────────────── */}
      <section
        className="px-5 py-14 sm:py-16"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="landing.blog.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Learn how to grow your business faster
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.48 0 0)" }}>
              Expert guides on SMS automation, lead follow-up, and closing more
              deals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "SMS Broadcast Automation: The Ultimate Time-Saver",
                excerpt:
                  "Text messages have a 98% open rate. Learn how SMS automation saves small businesses 5-10 hours per week.",
                href: "/blog/sms-broadcast-automation",
                color: "#1e3a5f",
              },
              {
                title: "Automated Follow-Ups: Stop Losing Leads",
                excerpt:
                  "Businesses that follow up within 5 minutes are 9x more likely to convert. See how Tele-Blast makes it automatic.",
                href: "/blog/automated-follow-ups",
                color: "#e87722",
              },
              {
                title: "Appointment Reminders: Reduce No-Shows",
                excerpt:
                  "Missed appointments cost thousands annually. Automated SMS reminders can reduce no-shows by 10-20%.",
                href: "/blog/appointment-reminders",
                color: "#1e3a5f",
              },
              {
                title: "Centralized Communication Dashboard",
                excerpt:
                  "Stop juggling multiple tools. Tele-Blast unifies SMS, follow-ups, and pipelines in one powerful dashboard.",
                href: "/blog/centralized-communication-dashboard",
                color: "#e87722",
              },
            ].map(({ title, excerpt, href, color }) => (
              <a
                key={href}
                href={href}
                className="group rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
                style={{ borderColor: "oklch(0.91 0 0)" }}
                data-ocid="landing.blog.article_link"
              >
                <div className="h-2 w-full" style={{ background: color }} />
                <div className="p-5">
                  <h3
                    className="font-semibold text-base mb-2 group-hover:underline underline-offset-2"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.48 0 0)" }}
                  >
                    {excerpt}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center text-xs font-semibold gap-1"
                    style={{ color: "oklch(0.46 0.16 44)" }}
                  >
                    Read article →
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.22 0.12 264)" }}
              onClick={() => navigate({ to: "/blog" })}
              data-ocid="landing.blog.view_all_button"
            >
              View all articles →
            </button>
          </div>
        </div>
      </section>

      {/* ── Industry Resources ───────────────────────────────────────────── */}
      <section
        className="px-5 py-12"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="landing.resources.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-lg font-bold mb-1"
            style={{ color: "oklch(0.22 0.12 264)" }}
          >
            Trusted Resources &amp; Compliance
          </h2>
          <p className="text-sm mb-5" style={{ color: "oklch(0.52 0 0)" }}>
            We follow industry best practices and FCC guidelines so your
            business stays compliant.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.fcc.gov/consumers/guides/protecting-your-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
              style={{
                background: "oklch(0.22 0.12 264 / 0.05)",
                borderColor: "oklch(0.22 0.12 264 / 0.15)",
                color: "oklch(0.22 0.12 264)",
              }}
              data-ocid="landing.resources.fcc_link"
            >
              🏛️ FCC SMS Compliance Guidelines
            </a>
            <a
              href="https://www.pewresearch.org/internet/fact-sheet/mobile/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
              style={{
                background: "oklch(0.56 0.16 44 / 0.05)",
                borderColor: "oklch(0.56 0.16 44 / 0.2)",
                color: "oklch(0.36 0.16 44)",
              }}
              data-ocid="landing.resources.pew_link"
            >
              📊 Pew Research: Mobile Usage Statistics
            </a>
            <a
              href="https://www.sba.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
              style={{
                background: "oklch(0.22 0.12 264 / 0.05)",
                borderColor: "oklch(0.22 0.12 264 / 0.15)",
                color: "oklch(0.22 0.12 264)",
              }}
              data-ocid="landing.resources.sba_link"
            >
              🏢 SBA Small Business Resources
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="px-5 py-16 sm:py-20"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="landing.faq.section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Frequently asked questions
            </h2>
          </div>

          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}
