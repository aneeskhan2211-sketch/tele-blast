import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  CreditCard,
  Download,
  FolderKanban,
  Lock,
  Mail,
  MessageSquare,
  Monitor,
  Phone,
  Plus,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SmsQuickSendPopover } from "../components/SmsQuickSendPopover";
import { PIPELINE_STAGES, STRIPE_PAYMENT_LINK } from "../constants";
import { useBackendReady } from "../hooks/useBackendReady";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useGetPipelines } from "../hooks/useLeads";
import { useSubscription } from "../hooks/useSubscription";
import type { Lead, Pipeline, PipelineStage } from "../types";
import { handlePhoneCall, isGoogleVoiceEnabled } from "../utils/phoneActions";

// ── Pipeline filter selector ───────────────────────────────────────────────────
function PipelineFilter({
  pipelines,
  selectedId,
  onChange,
}: {
  pipelines: Pipeline[];
  selectedId: bigint | null;
  onChange: (id: bigint | null) => void;
}) {
  if (pipelines.length === 0) return null;
  return (
    <div className="relative">
      <select
        value={selectedId?.toString() ?? "all"}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "all" ? null : BigInt(val));
        }}
        className="appearance-none pl-8 pr-7 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[36px] min-w-[140px] transition-colors hover:border-primary/40"
        data-ocid="dashboard-pipeline-filter"
        aria-label="Filter dashboard by pipeline"
      >
        <option value="all">All Pipelines</option>
        {pipelines.map((p) => (
          <option key={p.id.toString()} value={p.id.toString()}>
            {p.name}
          </option>
        ))}
      </select>
      <FolderKanban className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary pointer-events-none" />
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: bigint | undefined;
  icon: React.ElementType;
  stageKey: string;
  accent: string;
  iconBg: string;
}

function StatCard({
  label,
  value,
  icon: Icon,
  stageKey,
  accent,
  iconBg,
}: StatCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/pipeline", search: { stage: stageKey } })}
      className="group w-full text-left bg-card border border-border rounded-xl p-3 shadow-sm hover:shadow-md hover:border-primary/30 active:scale-[0.97] transition-all duration-200 min-h-[80px]"
      data-ocid={`stat-card-${stageKey}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
      <div className="space-y-0.5">
        {value === undefined ? (
          <Skeleton className="h-7 w-10" />
        ) : (
          <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
            {Number(value)}
          </span>
        )}
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-tight">
          {label}
        </p>
      </div>
    </button>
  );
}

// ── Stage badge ────────────────────────────────────────────────────────────────
function StageBadge({ stage }: { stage: PipelineStage }) {
  const found = PIPELINE_STAGES.find((s) => s.value === stage);
  if (!found) return null;
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${found.color}`}
    >
      {found.label}
    </span>
  );
}

// ── Recent lead row ────────────────────────────────────────────────────────────
function RecentLeadRow({
  lead,
}: {
  lead: Lead;
}) {
  const [showSmsSend, setShowSmsSend] = useState(false);

  return (
    <>
      <Link
        to="/leads/$id"
        params={{ id: lead.id.toString() }}
        className="px-4 py-3.5 flex items-center gap-3 hover:bg-muted/30 active:bg-muted/50 transition-colors min-h-[64px]"
        data-ocid="lead-row"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-primary" />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground truncate min-w-0">
              {lead.name}
            </span>
            <StageBadge stage={lead.pipelineStage} />
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {lead.industry}
            {lead.city
              ? ` · ${lead.city}${lead.state ? `, ${lead.state}` : ""}`
              : ""}
          </p>
        </div>

        {/* Quick actions */}
        <div
          className="flex items-center gap-0.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {lead.phone && (
            <button
              type="button"
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20"
              title="Call"
              data-ocid="call-btn"
              aria-label={`Call ${lead.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePhoneCall(lead.phone, false, isGoogleVoiceEnabled());
              }}
            >
              <Phone className="w-4 h-4" />
            </button>
          )}
          {lead.phone && (
            <button
              type="button"
              className="p-2 min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10"
              title="Text"
              data-ocid="text-btn"
              aria-label={`Text ${lead.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSmsSend(true);
              }}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
          {lead.email && (
            <a
              href={`mailto:${encodeURIComponent(lead.email)}`}
              className="p-2 min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10"
              title="Email"
              data-ocid="email-btn"
              aria-label={`Email ${lead.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </Link>
      {showSmsSend && (
        <SmsQuickSendPopover
          leadName={lead.name}
          phone={lead.phone}
          onClose={() => setShowSmsSend(false)}
        />
      )}
    </>
  );
}

// ── Stat card config ───────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: "Prospects",
    key: "prospects" as const,
    stageKey: "Prospect",
    icon: Users,
    accent: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    label: "Contacted",
    key: "contacted" as const,
    stageKey: "Contacted",
    icon: TrendingUp,
    accent: "text-accent-foreground",
    iconBg: "bg-accent",
  },
  {
    label: "Qualified",
    key: "qualified" as const,
    stageKey: "Qualified",
    icon: UserCheck,
    accent: "text-primary",
    iconBg: "bg-primary/15",
  },
  {
    label: "Closed Won",
    key: "closedWon" as const,
    stageKey: "ClosedWon",
    icon: BadgeCheck,
    accent: "text-primary",
    iconBg: "bg-primary/20",
  },
  {
    label: "Closed Lost",
    key: "closedLost" as const,
    stageKey: "ClosedLost",
    icon: XCircle,
    accent: "text-muted-foreground",
    iconBg: "bg-muted",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [selectedPipelineId, setSelectedPipelineId] = useState<bigint | null>(
    null,
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const backendReady = useBackendReady();
  const { data: stats, isLoading: statsLoading } =
    useDashboardStats(selectedPipelineId);
  const { data: pipelines = [] } = useGetPipelines();
  const { subscriptionTier, markSubscribed } = useSubscription();
  const hasHandledStripeReturn = useRef(false);

  // Desktop warning banner
  const [showDesktopWarning, setShowDesktopWarning] = useState(() => {
    try {
      if (localStorage.getItem("desktopWarningDismissed") === "1") return false;
    } catch {
      /* ignore */
    }
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    return !isMobile && !isStandalone;
  });
  const dismissDesktopWarning = () => {
    try {
      localStorage.setItem("desktopWarningDismissed", "1");
    } catch {
      /* ignore */
    }
    setShowDesktopWarning(false);
  };

  // PWA install
  type DeferredPrompt = Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: string }>;
  };
  const isIosDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAlreadyInstalled =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true;
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPrompt | null>(
    null,
  );
  const [showPwaInstall, setShowPwaInstall] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [pwaDismissed, setPwaDismissed] = useState(() => {
    try {
      return localStorage.getItem("pwaInstallDismissed") === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile || isAlreadyInstalled || pwaDismissed) return;
    if (isIosDevice) {
      const t = setTimeout(() => setShowPwaInstall(true), 1500);
      return () => clearTimeout(t);
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as DeferredPrompt);
      setShowPwaInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [pwaDismissed, isIosDevice, isAlreadyInstalled]);
  const handlePwaInstall = async () => {
    if (isIosDevice) {
      setShowIosInstructions(true);
      setShowPwaInstall(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setShowPwaInstall(false);
      setDeferredPrompt(null);
    }
  };
  const dismissPwaInstall = () => {
    try {
      localStorage.setItem("pwaInstallDismissed", "1");
    } catch {
      /* ignore */
    }
    setPwaDismissed(true);
    setShowPwaInstall(false);
    setShowIosInstructions(false);
  };

  // isLoading: true while stats are fetching AND backend timeout has NOT fired.
  const isLoading = statsLoading && !backendReady.timedOut;

  // dataFailed: backend timed out AND we have no real stats — show retry UI
  const dataFailed =
    backendReady.timedOut && !stats?.prospects && stats?.prospects !== 0n;

  const isPaidTier = subscriptionTier !== "none";

  // Handle Stripe return — detect ?subscribed=true, call markSubscribed, navigate to /agreement
  useEffect(() => {
    if (hasHandledStripeReturn.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") !== "true") return;
    hasHandledStripeReturn.current = true;

    // Remove the query param so refresh doesn't re-trigger
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);

    // Mark subscribed on backend then navigate to agreement page
    markSubscribed()
      .then(() => {
        navigate({ to: "/agreement", replace: true });
      })
      .catch(() => {
        toast.error("Subscription activation failed. Please contact support.");
      });
  }, [markSubscribed, navigate]);

  const totalLeads = stats
    ? Number(stats.prospects) +
      Number(stats.contacted) +
      Number(stats.qualified) +
      Number(stats.closedWon) +
      Number(stats.closedLost)
    : undefined;

  const recentLeads: Lead[] = stats?.recentLeads ?? [];
  const isEmpty = !isLoading && totalLeads === 0 && !dataFailed;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
      {/* ── Desktop warning banner ── */}
      {showDesktopWarning && (
        <div
          className="w-full flex items-start justify-between gap-3 rounded-xl px-4 py-3 shadow-sm"
          style={{
            background: "oklch(0.97 0.04 60)",
            border: "1.5px solid oklch(0.75 0.10 60 / 0.5)",
          }}
          data-ocid="dashboard.desktop_warning_banner"
        >
          <div className="flex items-start gap-2">
            <Monitor
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "oklch(0.50 0.14 60)" }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.30 0.10 60)" }}
              >
                Tele-Blast is designed for your cell phone
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.45 0.08 60)" }}
              >
                To use it on a computer, you’ll need{" "}
                <a
                  href="https://voice.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:opacity-80"
                >
                  Google Voice
                </a>{" "}
                set up to make calls and send texts.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissDesktopWarning}
            className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Dismiss"
            data-ocid="dashboard.desktop_warning_dismiss"
          >
            <XCircle className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* ── PWA install banner (mobile only) ── */}
      {showPwaInstall && (
        <div
          className="w-full rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-sm"
          style={{ background: "oklch(0.56 0.16 44)" }}
          data-ocid="dashboard.pwa_install_banner"
        >
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-white shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">
                Add to Home Screen
              </p>
              {showIosInstructions ? (
                <p className="text-xs text-white/80">
                  Tap the Share button (□↑) at the bottom of Safari, then tap
                  “Add to Home Screen”
                </p>
              ) : (
                <p className="text-xs text-white/80">
                  Install Tele-Blast as an app for the best experience.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!showIosInstructions && (
              <button
                type="button"
                onClick={handlePwaInstall}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-white/90 transition-colors min-h-[36px]"
                style={{ color: "oklch(0.46 0.16 44)" }}
                data-ocid="dashboard.pwa_install_button"
              >
                Install
              </button>
            )}
            <button
              type="button"
              onClick={dismissPwaInstall}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Dismiss"
              data-ocid="dashboard.pwa_install_dismiss"
            >
              <XCircle className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      )}

      {/* ── Subscribe banner — shown when tier === 'none' ── */}
      {!isPaidTier && (
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          data-ocid="dashboard.subscribe_banner"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)",
            border: "1.5px solid oklch(0.56 0.16 44 / 0.4)",
          }}
        >
          {/* Banner top */}
          <div
            className="px-5 py-2 flex items-center gap-2 text-xs font-semibold"
            style={{ background: "oklch(0.56 0.16 44)", color: "white" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Subscribe to unlock all features
          </div>
          <div className="px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "oklch(0.56 0.16 44 / 0.25)" }}
              >
                <Lock
                  className="w-5 h-5"
                  style={{ color: "oklch(0.82 0.14 44)" }}
                />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-0.5">
                  Your account is not yet subscribed
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.98 0 0 / 0.6)" }}
                >
                  Subscribe to access Leads, Pipeline, Power Dialer, Templates,
                  Queues, and more.
                </p>
              </div>
            </div>
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 min-h-[44px] whitespace-nowrap shadow-lg"
              style={{ background: "oklch(0.56 0.16 44)" }}
              data-ocid="dashboard.subscribe_now_button"
            >
              <CreditCard className="w-4 h-4" />
              Subscribe Now — $15/month
            </a>
          </div>
        </div>
      )}
      {/* ── Page header ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">
            Your sales pipeline at a glance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PipelineFilter
            pipelines={pipelines}
            selectedId={selectedPipelineId}
            onChange={setSelectedPipelineId}
          />
          {/* PWA install button — shows when prompt is available or on iOS */}
          {(deferredPrompt || isIosDevice) && !isAlreadyInstalled && (
            <button
              type="button"
              onClick={handlePwaInstall}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold text-white min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm"
              style={{ background: "oklch(0.56 0.16 44)" }}
              data-ocid="dashboard.download_app_button"
              aria-label="Download app"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Get App</span>
            </button>
          )}
          {/* Desktop add button */}
          <Link
            to="/leads"
            search={{ addNew: "true" }}
            className="hidden sm:block"
          >
            <Button
              className="btn-primary gap-1.5 shrink-0"
              size="sm"
              data-ocid="add-lead-btn"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Backend timeout retry banner ── */}
      {dataFailed && (
        <div
          className="bg-muted/50 border border-border rounded-xl px-4 py-3 flex items-center justify-between gap-3"
          data-ocid="dashboard.error_state"
        >
          <p className="text-sm text-muted-foreground">
            Unable to load stats — connection timed out.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            data-ocid="dashboard.retry_button"
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: ["dashboardStats"],
              });
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </Button>
        </div>
      )}

      {/* ── Pipeline summary banner ── */}
      {!isLoading && totalLeads !== undefined && totalLeads > 0 && (
        <div className="bg-primary rounded-xl px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-primary-foreground/70 text-[10px] sm:text-xs font-medium uppercase tracking-widest mb-1">
              {selectedPipelineId === null
                ? "Total Pipeline"
                : (pipelines.find((p) => p.id === selectedPipelineId)?.name ??
                  "Pipeline")}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-primary-foreground tabular-nums">
                {totalLeads}
              </span>
              <span className="text-primary-foreground/70 text-sm">
                leads tracked
              </span>
            </div>
          </div>
          <Link to="/pipeline">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 font-medium shrink-0 min-h-[44px]"
              data-ocid="view-pipeline-btn"
            >
              <span className="hidden sm:inline">View Pipeline</span>
              <span className="sm:hidden">Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Pipeline Stages
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {STAT_CARDS.map((card) => (
            <StatCard
              key={card.key}
              label={card.label}
              value={isLoading ? undefined : stats?.[card.key]}
              icon={card.icon}
              stageKey={card.stageKey}
              accent={card.accent}
              iconBg={card.iconBg}
            />
          ))}
        </div>
      </div>

      {/* ── Recent activity ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Activity
          </h2>
          {recentLeads.length > 0 && (
            <Link
              to="/leads"
              className="text-xs font-medium text-primary hover:underline min-h-[44px] flex items-center"
              data-ocid="view-all-leads-link"
            >
              View all →
            </Link>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-3" data-ocid="dashboard.loading_state">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-16 rounded-lg" />
              ))}
            </div>
          ) : isEmpty ? (
            <div
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
              data-ocid="empty-state"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Your pipeline is empty
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-5">
                Add your first lead manually or import a list via CSV to get
                started.
              </p>
              <div className="flex flex-col items-stretch gap-3 w-full sm:flex-row sm:w-auto">
                <Link
                  to="/leads"
                  search={{ addNew: "true" }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="sm"
                    className="btn-primary gap-1.5 w-full min-h-[48px]"
                    data-ocid="empty-add-lead-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Lead
                  </Button>
                </Link>
                <Link
                  to="/leads"
                  search={{ import: "true" }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full min-h-[48px]"
                    data-ocid="empty-import-csv-btn"
                  >
                    Import CSV
                  </Button>
                </Link>
              </div>
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="p-8 text-center" data-ocid="empty-recent-leads">
              <p className="text-sm text-muted-foreground">
                No recent leads.{" "}
                <Link
                  to="/leads"
                  search={{ addNew: "true" }}
                  className="text-primary hover:underline"
                >
                  Add a lead →
                </Link>
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentLeads.slice(0, 5).map((lead) => (
                <RecentLeadRow key={lead.id.toString()} lead={lead} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── FAB (mobile only) ── */}
      <Link
        to="/leads"
        search={{ addNew: "true" }}
        className="sm:hidden fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+16px)] right-4 z-40"
        aria-label="Add lead"
        data-ocid="dashboard-fab"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <Plus className="w-6 h-6 text-white" />
        </div>
      </Link>
    </div>
  );
}
