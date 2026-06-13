import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  DollarSign,
  Mail,
  MousePointerClick,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CommissionEntry } from "../backend";
import { CommissionStatus } from "../backend";
import { PublicNavBar } from "../components/PublicNavBar";
import {
  useAffiliate,
  useAffiliateStats,
  useEnrichedAffiliateStats,
  useUpdateAffiliatePaypalEmail,
} from "../hooks/useAffiliate";

const NAVY = "oklch(0.22 0.12 264)";
const ORANGE = "#f97316";

function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className="bg-card rounded-xl border p-4 flex items-start gap-3"
      style={
        highlight ? { borderColor: ORANGE, background: `${ORANGE}08` } : {}
      }
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: highlight ? `${ORANGE}20` : `${NAVY}15` }}
      >
        <Icon
          className="w-4 h-4"
          style={{ color: highlight ? ORANGE : NAVY }}
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function formatUSD(cents: bigint) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

// ── PayPal Activation Panel ───────────────────────────────────────────────────
function ActivationPanel() {
  const [paypalEmail, setPaypalEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const { mutateAsync: updatePaypal, isPending } =
    useUpdateAffiliatePaypalEmail();

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    if (!paypalEmail.trim()) {
      toast.error("Please enter your PayPal email address.");
      return;
    }
    try {
      await updatePaypal(paypalEmail.trim());
      setConfirmed(true);
      toast.success(
        "Affiliate account activated! Your referral link is ready.",
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Activation failed. Try again.",
      );
    }
  }

  if (confirmed) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-6 text-center"
        data-ocid="affiliate-dashboard.activation.success_state"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: `${ORANGE}20` }}
        >
          <CheckCircle className="w-6 h-6" style={{ color: ORANGE }} />
        </div>
        <div>
          <p className="font-semibold text-foreground">Account Activated!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Refresh the page to see your full dashboard and referral link.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="gap-1.5"
          data-ocid="affiliate-dashboard.activation.reload_button"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleActivate}
      className="space-y-4"
      data-ocid="affiliate-dashboard.activation.form"
    >
      <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-200 bg-yellow-50">
        <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-800">
            One step to activate
          </p>
          <p className="text-xs text-yellow-700 mt-0.5">
            Your affiliate account was automatically created. Enter your PayPal
            email below to activate it and receive your referral link.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="activate-paypal" className="text-sm font-semibold">
          PayPal Email
        </Label>
        <Input
          id="activate-paypal"
          type="email"
          placeholder="you@paypal.com"
          value={paypalEmail}
          onChange={(e) => setPaypalEmail(e.target.value)}
          required
          data-ocid="affiliate-dashboard.activation.paypal_input"
        />
        <p className="text-xs text-muted-foreground">
          Commissions are sent to this PayPal address 30 days after each sale.
          Can differ from your login email.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending || !paypalEmail.trim()}
        className="w-full font-semibold text-white"
        style={{ background: ORANGE }}
        data-ocid="affiliate-dashboard.activation.submit_button"
      >
        {isPending ? (
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Activating…
          </span>
        ) : (
          "Activate Now"
        )}
      </Button>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AffiliateDashboardPage() {
  const { data: affiliate, isLoading: affiliateLoading } = useAffiliate();
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const { data: enrichedStats = [] } = useEnrichedAffiliateStats();
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const referralUrl = affiliate
    ? `https://www.tele-blast.com?affiliate=${affiliate.referralCode}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyCode = () => {
    if (!affiliate) return;
    navigator.clipboard.writeText(affiliate.referralCode).then(() => {
      setCodeCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  // ── Loading state ──
  if (affiliateLoading) {
    return (
      <div
        className="min-h-screen"
        data-ocid="affiliate-dashboard.loading_state"
      >
        <PublicNavBar activePath="/affiliate" ocidPrefix="affiliate" />
        <div className="max-w-3xl mx-auto px-4 pt-20 pb-8 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  // ── State 1: No affiliate record (should be rare — backend auto-creates) ──
  if (!affiliate) {
    return (
      <div className="min-h-screen" data-ocid="affiliate-dashboard.setup_state">
        <PublicNavBar activePath="/affiliate" ocidPrefix="affiliate" />
        <div className="max-w-lg mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: NAVY }}
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Setting up your affiliate account…
            </h1>
            <p className="text-muted-foreground text-sm">
              Your affiliate account is being created automatically. If this
              persists, try signing out and back in, or visit the sign-up page
              to register.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-1.5"
              data-ocid="affiliate-dashboard.setup.retry_button"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
            <Link to="/affiliate-signup">
              <Button
                className="font-semibold text-white"
                style={{ background: ORANGE }}
                data-ocid="affiliate-dashboard.setup.signup_link"
              >
                Set Up Manually
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isActive = affiliate.paypalEmail && affiliate.paypalEmail.trim() !== "";

  // ── State 2: Record exists but PayPal email not set (pending activation) ──
  if (!isActive) {
    return (
      <div
        className="min-h-screen"
        data-ocid="affiliate-dashboard.pending_state"
      >
        <PublicNavBar activePath="/affiliate" ocidPrefix="affiliate" />
        <div className="max-w-lg mx-auto px-4 pt-20 pb-8 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: NAVY }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground">
                Affiliate Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-muted-foreground">
                  {affiliate.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                  Pending Activation
                </span>
              </div>
            </div>
          </div>

          {/* Activation Card */}
          <Card data-ocid="affiliate-dashboard.activation.card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${ORANGE}20` }}
                >
                  <DollarSign className="w-4 h-4" style={{ color: ORANGE }} />
                </div>
                <span className="font-semibold text-foreground">
                  Activate Your Affiliate Account
                </span>
              </div>
              <ActivationPanel />
            </CardContent>
          </Card>

          {/* Info: what comes after activation */}
          <div
            className="rounded-xl p-4 text-sm"
            style={{
              background: `${NAVY}06`,
              border: `1px solid ${NAVY}20`,
              color: "oklch(0.38 0.06 264)",
            }}
          >
            <p className="font-semibold mb-1">Once activated you get:</p>
            <ul className="space-y-0.5 text-xs text-muted-foreground">
              <li>• Your unique referral link</li>
              <li>• Real-time click &amp; conversion tracking</li>
              <li>• 25% commission ($7.50/mo per $30 plan referral)</li>
              <li>• PayPal payouts 30 days after each sale</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── State 3: Active affiliate — full dashboard ──
  const pendingTotal = stats
    ? Number(stats.pendingAmount) + Number(stats.readyAmount)
    : 0;

  return (
    <div className="min-h-screen" data-ocid="affiliate-dashboard.page">
      <PublicNavBar activePath="/affiliate" ocidPrefix="affiliate" />

      <div className="max-w-3xl mx-auto px-4 pt-20 pb-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Affiliate Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back, {affiliate.name}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold bg-green-100 text-green-800 border border-green-200 shrink-0 mt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Active
          </span>
        </div>

        {/* Profile Card */}
        <Card data-ocid="affiliate-dashboard.profile.card">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: NAVY }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">
                Your Affiliate Profile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium text-foreground">
                  {affiliate.name}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  {affiliate.email}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">PayPal Email</p>
                <p className="text-sm font-medium text-foreground">
                  {affiliate.paypalEmail}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Referral Code</p>
                <div className="flex items-center gap-2">
                  <code
                    className="text-sm font-mono font-semibold px-2 py-0.5 rounded"
                    style={{ background: `${NAVY}10`, color: NAVY }}
                  >
                    {affiliate.referralCode}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy referral code"
                    data-ocid="affiliate-dashboard.referral-code.copy_button"
                  >
                    {codeCopied ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Referral Link */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Your Referral Link
              </p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={referralUrl}
                  className="font-mono text-sm bg-muted"
                  data-ocid="affiliate-dashboard.referral-link.input"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0 gap-1.5"
                  data-ocid="affiliate-dashboard.referral-link.copy_button"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link on social media, email, or your website. When
                someone subscribes using your link, you earn 25% commission.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        {statsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            data-ocid="affiliate-dashboard.stats.section"
          >
            <StatCard
              label="Total Clicks"
              value={Number(stats?.totalClicks ?? 0)}
              icon={MousePointerClick}
            />
            <StatCard
              label="Conversions"
              value={Number(stats?.totalConversions ?? 0)}
              icon={Users}
            />
            <StatCard
              label="Pending Earnings"
              value={`$${(pendingTotal / 100).toFixed(2)}`}
              icon={DollarSign}
              highlight={pendingTotal > 0}
            />
            <StatCard
              label="Total Paid"
              value={`$${(Number(stats?.paidAmount ?? 0) / 100).toFixed(2)}`}
              icon={CheckCircle}
            />
          </div>
        )}

        {/* Earnings Summary */}
        {!statsLoading && stats && (
          <div
            className="grid grid-cols-3 gap-3"
            data-ocid="affiliate-dashboard.earnings.section"
          >
            {[
              {
                label: "Pending",
                amount: stats.pendingAmount,
                style: "bg-yellow-50 border-yellow-200 text-yellow-800",
              },
              {
                label: "Ready to Pay",
                amount: stats.readyAmount,
                style: "border-orange-200 text-white",
                bgStyle: { background: ORANGE },
              },
              {
                label: "Paid Out",
                amount: stats.paidAmount,
                style: "bg-green-50 border-green-200 text-green-800",
              },
            ].map(({ label, amount, style, bgStyle }) => (
              <div
                key={label}
                className={`rounded-xl border p-4 text-center ${style}`}
                style={bgStyle}
                data-ocid={`affiliate-dashboard.earnings.${label.toLowerCase().replace(/\s/g, "_")}`}
              >
                <p className="text-xs font-medium opacity-80 mb-1">{label}</p>
                <p className="text-lg font-bold">{formatUSD(amount)}</p>
              </div>
            ))}
          </div>
        )}

        {/* PayPal Info */}
        <Card data-ocid="affiliate-dashboard.paypal.card">
          <CardContent className="p-4 flex items-start gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${ORANGE}20` }}
            >
              <DollarSign className="w-4 h-4" style={{ color: ORANGE }} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Payout Method
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                PayPal:{" "}
                <span className="font-mono text-foreground">
                  {affiliate.paypalEmail}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Payouts are sent manually to this address 30 days after each
                sale.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Waiting to Be Paid / Total Paid Out summary cards */}
        {(() => {
          const waitingCents = enrichedStats
            .filter((e) => e.status === "pending" || e.status === "ready")
            .reduce((sum, e) => sum + Number(e.commissionAmount), 0);
          const paidCents = enrichedStats
            .filter((e) => e.status === "paid")
            .reduce((sum, e) => sum + Number(e.commissionAmount), 0);
          return enrichedStats.length > 0 ? (
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="affiliate-dashboard.enriched-earnings.section"
            >
              <StatCard
                label="Waiting to Be Paid"
                value={`${(waitingCents / 100).toFixed(2)}`}
                icon={DollarSign}
                highlight={waitingCents > 0}
              />
              <StatCard
                label="Total Paid Out"
                value={`${(paidCents / 100).toFixed(2)}`}
                icon={CheckCircle}
              />
            </div>
          ) : null;
        })()}

        {/* Commissions Table */}
        <div data-ocid="affiliate-dashboard.commissions.section">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Commission History
          </h2>

          {statsLoading ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : enrichedStats.length === 0 ? (
            <div
              className="bg-muted/40 rounded-xl border p-8 text-center"
              data-ocid="affiliate-dashboard.commissions.empty_state"
            >
              <p className="text-muted-foreground text-sm">
                No commissions yet. Share your referral link to start earning!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Referred Person
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Business
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Purchased
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Waiting to Be Paid
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Paid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enrichedStats.map((e, idx) => {
                    const isPending =
                      e.status === "pending" || e.status === "ready";
                    const isPaid = e.status === "paid";
                    return (
                      <tr
                        key={e.newUserPrincipal || idx}
                        className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`affiliate-dashboard.commissions.item.${idx + 1}`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">
                            {e.referredName || "Unknown"}
                          </p>
                          {(e.referredEmail || e.referredPhone) && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {[e.referredEmail, e.referredPhone]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                          {e.referredBizName || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {e.hasPurchased ? (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700 border border-green-200">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-muted text-muted-foreground border border-border">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-foreground">
                          {isPending ? formatUSD(e.commissionAmount) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {isPaid ? (
                            <span className="text-green-700">
                              {formatUSD(e.commissionAmount)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
