import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Coins,
  Copy,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  LayoutList,
  Lock,
  LogOut,
  Mail,
  Phone,
  Plus,
  Shield,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CommissionStatus, type EnrichedCommissionEntry } from "../backend";
import type {
  AffiliateProfile,
  CommissionEntry,
  UserAdminView,
  UserExportRecord,
} from "../backend";

// The generated TypeScript binding already maps Motoko optional fields to
// scalar TypeScript optionals (undefined | T), so we use UserAdminView directly.
// No override needed — agreementAcceptedAt is bigint | undefined and
// ipAddress is string | undefined, matching how the backend.d.ts declares them.
type UserAdminViewExtended = UserAdminView;

// Local UI type for pre-registered accounts (includes generated id)
interface PreRegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: bigint;
}

import {
  useAdminDeleteAllLeads,
  useAdminEnrichedPayouts,
  useAdminEnsureAffiliateRecord,
  useAllAffiliates,
  useAllUsers,
  useCreatePreRegisteredUser,
  useDeletePreRegisteredUser,
  useExportUsers,
  useGetPackageConfig,
  useGetPreRegisteredUsers,
  useGetShowComingSoonTeaser,
  useGrantAdmin,
  useIsAdmin,
  useMarkPayoutPaid,
  useRestoreUserAccess,
  useRevokeUserAccess,
  useSetPackageEnabled,
  useSetShowComingSoonTeaser,
  useSetUserTier,
} from "../hooks/useAdmin";
import { useBackend } from "../hooks/useBackend";

// ── Auth constants ─────────────────────────────────────────────────────────────
const ADMIN_USERNAME = "telemaster";
const ADMIN_PASSWORD = "poop8877";
const ADMIN_SESSION_KEY = "adminAuthenticated";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(ns: bigint): string {
  return new Date(Number(ns)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Convert nanosecond timestamp (bigint | number) to a readable date+time string */
function formatAgreementDate(ns: bigint | number): string {
  const ms = typeof ns === "bigint" ? Number(ns) / 1_000_000 : ns / 1_000_000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  const datePart = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} ${timePart}`;
}

function getTierLabel(tier: string): string {
  if (tier === "pro") return "Pro $30/mo";
  return tier;
}

const TIER_OPTIONS = [
  { value: "none", label: "No Access" },
  { value: "pro", label: "Pro — $30/month" },
] as const;

type TierValue = (typeof TIER_OPTIONS)[number]["value"];

function normalizeTier(raw: string): TierValue {
  if (raw === "pro") return "pro";
  return "none";
}

// ── Grant Tokens Modal removed — AI tokens are no longer part of the $30 plan

function TierSelector({
  user,
  idx,
}: { user: UserAdminViewExtended; idx: number }) {
  const setTier = useSetUserTier();
  // Keep `selected` in sync with the real tier from the user list.
  // When the admin list re-fetches after a tier change, this ensures the
  // dropdown reflects what the backend actually stored — not a stale init value.
  const backendTier = normalizeTier(user.subscriptionTier ?? "");
  const [selected, setSelected] = useState<TierValue>(backendTier);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Sync the dropdown whenever the backend tier changes (e.g. after refetch)
  // but only if the user is not mid-selection to avoid disrupting their input.
  const prevBackendTier = useRef(backendTier);
  useEffect(() => {
    if (prevBackendTier.current !== backendTier && !confirming) {
      setSelected(backendTier);
    }
    prevBackendTier.current = backendTier;
  }, [backendTier, confirming]);

  async function handleSetPlan() {
    setFeedbackMsg(null);
    setConfirming(true);
    try {
      await setTier.mutateAsync({ principal: user.principal, tier: selected });
      // Keep the spinner visible for ~1.5 s so the user sees that propagation
      // is in flight, then show the success label.
      setTimeout(() => {
        setConfirming(false);
        setFeedbackMsg("Plan updated ✓");
        toast.success(
          `Plan set to ${TIER_OPTIONS.find((o) => o.value === selected)?.label ?? selected}`,
        );
        setTimeout(() => setFeedbackMsg(null), 4000);
      }, 1500);
    } catch (err) {
      setConfirming(false);
      const msg = err instanceof Error ? err.message : "Failed to update plan";
      toast.error(msg);
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap mt-2 pt-2 border-t border-border/60">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as TierValue)}
        className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 min-w-0 flex-1 sm:flex-none sm:w-52"
        aria-label="Select subscription plan"
        data-ocid={`admin.users.tier_select.${idx + 1}`}
      >
        {TIER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleSetPlan}
        disabled={setTier.isPending || confirming}
        className="h-8 px-3 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
        style={{ background: "oklch(0.22 0.12 264)" }}
        data-ocid={`admin.users.set_plan_button.${idx + 1}`}
      >
        {setTier.isPending || confirming ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {confirming ? "Applying…" : "Saving…"}
          </>
        ) : (
          "Set Plan"
        )}
      </button>
      {feedbackMsg && (
        <span
          className="text-xs font-medium flex items-center gap-1"
          style={{ color: "oklch(0.46 0.14 160)" }}
          data-ocid={`admin.users.tier_success_state.${idx + 1}`}
        >
          <Check className="w-3 h-3" />
          {feedbackMsg}
        </span>
      )}
      <p className="w-full text-[10px] text-muted-foreground mt-0.5">
        Changes take effect within 1–2 seconds for the user
      </p>
    </div>
  );
}

function isPaidUser(user: UserAdminViewExtended): boolean {
  return (
    user.subscriptionTier !== "none" &&
    user.subscriptionTier !== "" &&
    user.subscribedAt != null
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  green,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: boolean;
  green?: boolean;
}) {
  const bg = green
    ? "oklch(0.46 0.14 160 / 0.15)"
    : accent
      ? "oklch(0.56 0.16 44 / 0.15)"
      : "oklch(0.22 0.12 264 / 0.08)";
  const color = green
    ? "oklch(0.38 0.14 160)"
    : accent
      ? "oklch(0.56 0.16 44)"
      : "oklch(0.22 0.12 264)";

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground leading-none mb-1">
          {label}
        </p>
        <p className="text-xl font-bold text-foreground leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Admin Login Form (password gate) ──────────────────────────────────────────
function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate slight delay for UX
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try {
          localStorage.setItem(ADMIN_SESSION_KEY, "true");
        } catch {
          // sessionStorage unavailable
        }
        onSuccess();
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 300);
  }

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center px-5 py-10"
      style={{ background: "oklch(0.22 0.12 264)" }}
      data-ocid="admin.login.page"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">
          Tele-Blast
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl shadow-2xl px-8 py-10 flex flex-col"
        style={{ background: "oklch(0.99 0 0)" }}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
            style={{ background: "oklch(0.22 0.12 264)" }}
          >
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1
          className="text-2xl font-bold text-center mb-1"
          style={{ color: "oklch(0.22 0.12 264)" }}
        >
          Admin Sign In
        </h1>
        <p
          className="text-sm text-center leading-relaxed mb-8"
          style={{ color: "oklch(0.52 0 0)" }}
        >
          Restricted to authorized administrators only.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-username"
              className="text-sm font-medium"
              style={{ color: "oklch(0.32 0.08 264)" }}
            >
              Username
            </label>
            <Input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              className="h-11"
              data-ocid="admin.login.username_input"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-password"
              className="text-sm font-medium"
              style={{ color: "oklch(0.32 0.08 264)" }}
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                className="h-11 pr-11"
                data-ocid="admin.login.password_input"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                data-ocid="admin.login.show_password_toggle"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{
                background: "oklch(0.97 0.02 20)",
                color: "oklch(0.46 0.18 22)",
              }}
              data-ocid="admin.login.error_state"
            >
              <XCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full h-12 text-base font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] hover:opacity-90 text-white flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "oklch(0.56 0.16 44)" }}
            data-ocid="admin.login.submit_button"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        <p
          className="text-xs text-center mt-6"
          style={{ color: "oklch(0.62 0 0)" }}
        >
          <Lock
            className="inline w-3 h-3 mr-1 -mt-0.5"
            style={{ color: "oklch(0.32 0.15 264)" }}
          />
          Secured · Tele-Blast Admin Portal
        </p>
      </div>

      <p
        className="text-xs mt-8 text-center"
        style={{ color: "oklch(0.98 0 0 / 0.3)" }}
      >
        © {new Date().getFullYear()} Tele-Blast · tele-blast.com
      </p>
    </div>
  );
}

// ── Create Account Modal ──────────────────────────────────────────────────────
function CreateAccountModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const createUser = useCreatePreRegisteredUser();

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address";
    if (!phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createUser.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      toast.success(`Account created for ${name.trim()}`);
      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create account",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="admin.create_account.dialog"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <UserPlus className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white">Create Account</h3>
            <p className="text-xs text-white/60">
              Pre-register a user — they'll have $30 Pro access on login
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
            data-ocid="admin.create_account.close_button"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="ca-name"
              className="text-sm font-semibold text-foreground"
            >
              Full Name <span style={{ color: "oklch(0.56 0.18 22)" }}>*</span>
            </label>
            <Input
              id="ca-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="John Smith"
              className={`h-11 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              data-ocid="admin.create_account.name_input"
            />
            {errors.name && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="admin.create_account.name.field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="ca-email"
              className="text-sm font-semibold text-foreground"
            >
              Email Address{" "}
              <span style={{ color: "oklch(0.56 0.18 22)" }}>*</span>
            </label>
            <Input
              id="ca-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="john@example.com"
              className={`h-11 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              data-ocid="admin.create_account.email_input"
            />
            {errors.email && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="admin.create_account.email.field_error"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="ca-phone"
              className="text-sm font-semibold text-foreground"
            >
              Phone Number{" "}
              <span style={{ color: "oklch(0.56 0.18 22)" }}>*</span>
            </label>
            <Input
              id="ca-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone)
                  setErrors((p) => ({ ...p, phone: undefined }));
              }}
              placeholder="(555) 123-4567"
              className={`h-11 ${errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              data-ocid="admin.create_account.phone_input"
            />
            {errors.phone && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="admin.create_account.phone.field_error"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Info note */}
          <div
            className="rounded-lg px-4 py-3 text-xs leading-relaxed border"
            style={{
              background: "oklch(0.22 0.12 264 / 0.05)",
              borderColor: "oklch(0.22 0.12 264 / 0.15)",
              color: "oklch(0.38 0.06 264)",
            }}
          >
            <span className="font-semibold">How it works:</span> When this user
            logs in via Internet Identity, the app will check if their email
            matches this record and automatically grant them the $30 Pro plan —
            no payment required.
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1 min-h-[44px]"
              data-ocid="admin.create_account.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createUser.isPending}
              className="flex-1 min-h-[44px] text-white gap-1.5"
              style={{ background: "oklch(0.22 0.12 264)" }}
              data-ocid="admin.create_account.submit_button"
            >
              {createUser.isPending ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating…
                </span>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  Create Account
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Pre-Registered Accounts section ───────────────────────────────────────────
function formatPreRegDate(ns: bigint | number): string {
  const ms = typeof ns === "bigint" ? Number(ns) / 1_000_000 : ns;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function PreRegisteredAccountsSection() {
  const { data: preRegistered = [], isLoading } = useGetPreRegisteredUsers();
  const { data: allUsers = [] } = useAllUsers();
  const deletePreReg = useDeletePreRegisteredUser();
  const [confirmDeleteEmail, setConfirmDeleteEmail] = useState<string | null>(
    null,
  );

  // Build a Set of emails that have already activated (appear in the users list)
  const activatedEmails = useMemo(() => {
    const set = new Set<string>();
    for (const u of allUsers as UserAdminViewExtended[]) {
      const email = u.profile?.email?.toLowerCase();
      if (email) set.add(email);
    }
    return set;
  }, [allUsers]);

  async function handleConfirmDelete() {
    if (!confirmDeleteEmail) return;
    try {
      await deletePreReg.mutateAsync(confirmDeleteEmail);
      toast.success("Pre-registration deleted");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete pre-registration",
      );
    } finally {
      setConfirmDeleteEmail(null);
    }
  }

  if (isLoading) {
    return (
      <div
        className="space-y-2 mt-6"
        data-ocid="admin.pre_registered.loading_state"
      >
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
      </div>
    );
  }

  const list = preRegistered as PreRegisteredUser[];

  return (
    <div className="mt-8 space-y-3" data-ocid="admin.pre_registered.section">
      <div className="flex items-center gap-2">
        <UserPlus
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.22 0.12 264)" }}
        />
        <h3 className="text-sm font-bold text-foreground">
          Pre-Registered Accounts
        </h3>
        <span
          className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold text-white"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          {list.length}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Accounts created by admin. When these users log in via Internet
        Identity, they enter their email on the activation screen and receive
        Pro access automatically — no payment required.
      </p>

      {list.length === 0 ? (
        <div
          className="flex flex-col items-center py-10 text-center rounded-xl border border-dashed border-border"
          data-ocid="admin.pre_registered.empty_state"
        >
          <UserPlus className="w-8 h-8 text-muted-foreground/40 mb-2" />
          <p className="text-sm text-muted-foreground font-medium">
            No pre-registered accounts yet
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Use the "Create Account" button above to add one
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.pre_registered.list">
          {list.map((u, idx) => {
            const isActivated = activatedEmails.has(u.email.toLowerCase());
            return (
              <div
                key={u.id}
                className={`bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isActivated ? "border-green-200" : "border-border"}`}
                data-ocid={`admin.pre_registered.item.${idx + 1}`}
              >
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                      Name
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {u.name}
                      </p>
                      {isActivated && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border"
                          style={{
                            background: "oklch(0.96 0.04 160)",
                            color: "oklch(0.34 0.14 160)",
                            borderColor: "oklch(0.82 0.1 160)",
                          }}
                          data-ocid={`admin.pre_registered.activated_badge.${idx + 1}`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Activated — see Users list
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                      Email
                    </p>
                    <p
                      className="text-xs text-foreground truncate"
                      data-ocid={`admin.pre_registered.email.${idx + 1}`}
                    >
                      {u.email}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                      Phone
                    </p>
                    <p
                      className="text-xs text-foreground"
                      data-ocid={`admin.pre_registered.phone.${idx + 1}`}
                    >
                      {u.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Created</p>
                    <p className="text-xs text-foreground font-medium">
                      {formatPreRegDate(u.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteEmail(u.email)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-red-50"
                    style={{
                      borderColor: "oklch(0.88 0.08 22)",
                      color: "oklch(0.50 0.18 22)",
                    }}
                    aria-label={`Delete pre-registration for ${u.name}`}
                    data-ocid={`admin.pre_registered.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {confirmDeleteEmail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          data-ocid="admin.pre_registered.delete.dialog"
        >
          <div
            className="w-full max-w-sm rounded-2xl shadow-2xl p-6"
            style={{ background: "oklch(0.99 0 0)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.97 0.02 22)" }}
              >
                <Trash2
                  className="w-5 h-5"
                  style={{ color: "oklch(0.50 0.18 22)" }}
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Delete Pre-Registration?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground mb-1">
              Remove pre-registration for:
            </p>
            <p
              className="text-sm font-mono font-semibold mb-5 break-all"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              {confirmDeleteEmail}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDeleteEmail(null)}
                className="flex-1 min-h-[40px]"
                disabled={deletePreReg.isPending}
                data-ocid="admin.pre_registered.delete.cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmDelete}
                disabled={deletePreReg.isPending}
                className="flex-1 min-h-[40px] text-white"
                style={{ background: "oklch(0.50 0.18 22)" }}
                data-ocid="admin.pre_registered.delete.confirm_button"
              >
                {deletePreReg.isPending ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting…
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Users Tab ─────────────────────────────────────────────────────────────────
export function UsersTab() {
  const queryClient = useQueryClient();
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useAllUsers();
  const grantAdmin = useGrantAdmin();
  const revokeAccess = useRevokeUserAccess();
  const restoreAccess = useRestoreUserAccess();
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "revoked"
  >("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { actor } = useBackend();

  // On mount: force a fresh fetch immediately
  useEffect(() => {
    void queryClient.refetchQueries({ queryKey: ["admin", "users"] });
  }, [queryClient]);

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }

  function toggleExpand(principalStr: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(principalStr)) {
        next.delete(principalStr);
      } else {
        next.add(principalStr);
      }
      return next;
    });
  }

  function escapeCSV(val: string): string {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }

  function nsToDateTime(ns: bigint | undefined): string {
    if (ns == null || ns === BigInt(0)) return "";
    const ms = Number(ns) / 1_000_000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function formatCommission(val: bigint): string {
    return `$${(Number(val) / 100).toFixed(2)}`;
  }

  async function handleExportCSV() {
    if (!actor) {
      toast.error("Not connected — please wait and try again");
      return;
    }
    setIsExporting(true);
    try {
      const result = await actor.generateUserExport();
      if (result.__kind__ !== "ok") {
        throw new Error(result.err ?? "Export failed");
      }
      const records = result.ok as UserExportRecord[];

      const headers = [
        "Principal",
        "Name",
        "Company Name",
        "Email",
        "Phone",
        "Website",
        "Referred By",
        "How Did You Hear About Us",
        "Date Signed Up",
        "IP Address",
        "Agreement Accepted",
        "Agreement Date",
        "Plan Status",
        "Is Paid",
        "Subscribed At",
        "Is Affiliate",
        "Referral Code",
        "Referral Link",
        "Affiliate Approved",
        "Total Commissions",
        "Total Payouts",
        "Pending Payouts",
      ];

      const rows = records.map((r) => {
        const agreementAccepted =
          r.agreementAcceptedAt != null && r.agreementAcceptedAt !== BigInt(0);
        const isAffiliate = r.isAffiliate;
        const referralLink =
          isAffiliate && r.referralCode
            ? `${window.location.origin}/affiliate-signup?ref=${r.referralCode}`
            : "";
        return [
          escapeCSV(r.principal),
          escapeCSV(r.name),
          escapeCSV(r.companyName),
          escapeCSV(r.email),
          escapeCSV(r.phone),
          escapeCSV(r.website),
          escapeCSV(r.referredBy),
          escapeCSV((r as any).hearAboutUs || ""),
          escapeCSV(nsToDateTime(r.createdAt)),
          escapeCSV(r.ipAddress || "Not captured"),
          agreementAccepted ? "Yes" : "No",
          escapeCSV(
            agreementAccepted ? nsToDateTime(r.agreementAcceptedAt) : "",
          ),
          escapeCSV(r.subscriptionTier === "pro" ? "pro/$15/month" : "Free"),
          r.isPaid ? "Yes" : "No",
          escapeCSV(nsToDateTime(r.subscribedAt)),
          isAffiliate ? "Yes" : "No",
          escapeCSV(r.referralCode),
          escapeCSV(referralLink),
          r.affiliateApproved ? "Yes" : "No",
          escapeCSV(formatCommission(r.totalCommissions)),
          escapeCSV(formatCommission(r.totalPayouts)),
          escapeCSV(formatCommission(r.pendingPayouts)),
        ].join(",");
      });

      const csvContent = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const today = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = `tele-blast-users-${dateStr}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(
        `Exported ${records.length} user${records.length !== 1 ? "s" : ""} to CSV`,
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Export failed — please try again",
      );
    } finally {
      setIsExporting(false);
    }
  }

  const typedUsers = users as UserAdminViewExtended[];

  const filtered = useMemo(() => {
    return typedUsers.filter((u) => {
      const profile = u.profile;
      const name = profile
        ? `${profile.name} ${profile.companyName}`.toLowerCase()
        : "";
      const matchSearch = !search || name.includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && u.featureAccess) ||
        (statusFilter === "revoked" && !u.featureAccess);
      const paid = isPaidUser(u);
      const matchPayment =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && paid) ||
        (paymentFilter === "unpaid" && !paid);
      return matchSearch && matchStatus && matchPayment;
    });
  }, [typedUsers, search, statusFilter, paymentFilter]);

  // Sort paid users to top
  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aPaid = isPaidUser(a) ? 1 : 0;
      const bPaid = isPaidUser(b) ? 1 : 0;
      return bPaid - aPaid;
    });
  }, [filtered]);

  const total = typedUsers.length;
  const paid = typedUsers.filter(isPaidUser).length;
  const unpaid = total - paid;
  const active = typedUsers.filter((u) => u.featureAccess).length;
  const revoked = total - active;

  // Robust IC0508 detection — case-insensitive, catches all known variants
  const errorMsg = error instanceof Error ? error.message : "";
  const errorMsgLower = errorMsg.toLowerCase();
  const isIC0508Error =
    errorMsgLower.includes("ic0508") ||
    errorMsgLower.includes("is stopped") ||
    errorMsgLower.includes("canister stopped");

  // Auth error — not IC0508, explicitly an authorization rejection
  const isAuthError =
    !isIC0508Error &&
    isError &&
    !isFetching &&
    (errorMsgLower.includes("not authorized") ||
      errorMsgLower.includes("authorization") ||
      errorMsgLower.includes("admin access"));

  // Transient empty list — retries exhausted but the cause was empty data
  const isEmptyListRetryExhausted =
    !isIC0508Error &&
    !isAuthError &&
    isError &&
    !isFetching &&
    (errorMsgLower.includes("empty user list") ||
      errorMsgLower.includes("actor not ready"));

  // Show spinner whenever loading OR fetching (includes retries for empty-list/actor-not-ready)
  const isTransientRetrying =
    isFetching && typedUsers.length === 0 && !isIC0508Error;
  if (isLoading || isTransientRetrying) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center"
        data-ocid="admin.users.loading_state"
      >
        <span className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading your users…
        </p>
      </div>
    );
  }

  // IC0508 state — backend restarting after deploy. Always show amber banner,
  // never a red error. Retries continue silently in the background.
  if (isIC0508Error) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center"
        data-ocid="admin.users.loading_state"
      >
        <span className="w-8 h-8 border-3 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
        <div
          className="rounded-xl px-5 py-4 border max-w-md text-left"
          style={{
            background: "oklch(0.97 0.04 80)",
            borderColor: "oklch(0.85 0.1 80)",
            color: "oklch(0.42 0.12 70)",
          }}
          data-ocid="admin.users.ic0508_banner"
        >
          <p className="font-semibold text-sm mb-1">
            Backend is restarting after deployment
          </p>
          <p className="text-xs leading-relaxed mb-3">
            Retrying automatically every 10–30 seconds. Your user data is safe
            and will appear as soon as the backend comes back online.
          </p>
          <Button
            size="sm"
            onClick={() => void handleRefresh()}
            disabled={isRefreshing}
            data-ocid="admin.users.retry_button"
          >
            {isRefreshing ? "Refreshing…" : "↻ Refresh Now"}
          </Button>
        </div>
      </div>
    );
  }

  // Real auth error — admin login not recognized by backend
  if (isAuthError) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center"
        data-ocid="admin.users.error_state"
      >
        <XCircle className="w-10 h-10 text-destructive" />
        <div>
          <p className="font-semibold text-foreground">
            Admin access required — please log in as admin
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            The backend did not recognize your session as an admin. Try
            refreshing or re-authenticating.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => void handleRefresh()}
          disabled={isRefreshing}
          data-ocid="admin.users.retry_button"
        >
          {isRefreshing ? "Refreshing…" : "↻ Refresh"}
        </Button>
      </div>
    );
  }

  // Transient empty-list retries exhausted — show a gentle retry panel (not a scary error)
  if (isEmptyListRetryExhausted) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center"
        data-ocid="admin.users.loading_state"
      >
        <Users className="w-10 h-10 text-muted-foreground/40" />
        <div>
          <p className="font-semibold text-foreground">
            Users haven&apos;t appeared yet
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            The backend responded but returned no users. Click Refresh to try
            again — your data is safe.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => void handleRefresh()}
          disabled={isRefreshing}
          data-ocid="admin.users.retry_button"
        >
          {isRefreshing ? "Refreshing…" : "↻ Refresh"}
        </Button>
      </div>
    );
  }

  // Generic non-IC0508 error — only show if NOT fetching (retries exhausted)
  if (isError && !isFetching) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-16 text-center"
        data-ocid="admin.users.error_state"
      >
        <XCircle className="w-10 h-10 text-destructive" />
        <div>
          <p className="font-semibold text-foreground">
            Could not load users — click Refresh to try again
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {errorMsg || "Unknown error"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            User data is stored in the backend and is never erased by builds.
            This is a temporary connection issue.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => void handleRefresh()}
          disabled={isRefreshing}
          data-ocid="admin.users.retry_button"
        >
          {isRefreshing ? "Refreshing…" : "↻ Refresh"}
        </Button>
      </div>
    );
  }

  // Empty list — retries exhausted AND still 0 users. Show spinner + refresh option
  // rather than a dead-end empty state, since useAllUsers now throws on 0 results
  // and retries automatically. If we reach here it means retries are truly exhausted.
  if (!isLoading && !isFetching && !isError && typedUsers.length === 0) {
    return (
      <div className="space-y-4">
        <div
          className="flex flex-col items-center gap-4 py-16 text-center"
          data-ocid="admin.users.empty_state"
        >
          <span className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
          <div>
            <p className="font-medium text-foreground">Loading users…</p>
            <p className="text-sm text-muted-foreground mt-1">
              If this takes more than 30 seconds, use Refresh below.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void handleRefresh()}
            disabled={isRefreshing}
            data-ocid="admin.users.retry_button"
          >
            {isRefreshing ? "Refreshing…" : "↻ Refresh"}
          </Button>
        </div>
        {showCreateModal && (
          <CreateAccountModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Users" value={total} icon={Users} />
        <StatCard label="Paid" value={paid} icon={CheckCircle2} green />
        <StatCard label="Unpaid" value={unpaid} icon={XCircle} accent />
        <StatCard label="Revoked" value={revoked} icon={Lock} />
      </div>

      {/* Paid / Unpaid summary bar + Refresh + Export */}
      <div
        className="flex items-center gap-4 rounded-xl px-4 py-3 border"
        style={{
          background: "oklch(0.22 0.12 264 / 0.04)",
          borderColor: "oklch(0.22 0.12 264 / 0.12)",
        }}
      >
        <span className="text-sm font-semibold text-foreground">
          {paid} Paid
        </span>
        <span className="text-muted-foreground text-sm">·</span>
        <span className="text-sm font-semibold text-muted-foreground">
          {unpaid} Unpaid
        </span>
        <span className="text-muted-foreground text-sm">·</span>
        <span className="text-sm text-muted-foreground">
          {active} Active · {revoked} Revoked
        </span>
        {isFetching && !isRefreshing && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
            <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Updating…
          </span>
        )}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          {/* Export CSV button */}
          <button
            type="button"
            onClick={() => void handleExportCSV()}
            disabled={isExporting || !actor}
            className="h-7 px-3 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "oklch(0.56 0.16 44)" }}
            data-ocid="admin.users.export_csv_button"
            aria-label="Export all users as CSV"
          >
            {isExporting ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exporting…
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export CSV
              </>
            )}
          </button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => void handleRefresh()}
            disabled={isRefreshing || isFetching}
            data-ocid="admin.users.refresh_button"
          >
            {isRefreshing ? (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                Refreshing…
              </span>
            ) : (
              "↻ Refresh"
            )}
          </Button>
        </div>
      </div>

      {/* Filters + Create Account button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search by name or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
          data-ocid="admin.users.search_input"
        />
        {/* Create Account button */}
        <Button
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="text-white gap-1.5 shrink-0 min-h-[40px] self-start sm:self-auto"
          style={{ background: "oklch(0.22 0.12 264)" }}
          data-ocid="admin.users.create_account_button"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Account
        </Button>
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "paid", "unpaid"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setPaymentFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                paymentFilter === s
                  ? "text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              style={
                paymentFilter === s
                  ? {
                      background:
                        s === "paid"
                          ? "oklch(0.46 0.14 160)"
                          : s === "unpaid"
                            ? "oklch(0.56 0.18 22)"
                            : "oklch(0.22 0.12 264)",
                    }
                  : {}
              }
              data-ocid={`admin.users.payment-filter-${s}.tab`}
            >
              {s}
            </button>
          ))}
          <div
            className="w-px self-stretch bg-border mx-0.5"
            aria-hidden="true"
          />
          {(["all", "active", "revoked"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              style={
                statusFilter === s ? { background: "oklch(0.22 0.12 264)" } : {}
              }
              data-ocid={`admin.users.filter-${s}.tab`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* User list */}
      {sortedFiltered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.users.empty_state"
        >
          No users match the current filter.
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.users.list">
          {sortedFiltered.map((user, idx) => {
            const profile = user.profile;
            const principalStr = user.principal.toString();
            const shortPrincipal = `${principalStr.slice(0, 8)}…${principalStr.slice(-4)}`;
            const signupDate =
              user.subscribedAt != null ? formatDate(user.subscribedAt) : "—";
            const paid = isPaidUser(user);
            const tierLabel = paid ? getTierLabel(user.subscriptionTier) : null;
            const isExpanded = expandedRows.has(principalStr);

            const email = user.profile?.email || "—";
            const phone = user.profile?.phone || "—";
            const agreementDate =
              user.agreementAcceptedAt != null
                ? formatAgreementDate(user.agreementAcceptedAt)
                : "—";
            const ipAddress = user.ipAddress ?? "—";

            return (
              <div
                key={principalStr}
                className="rounded-xl border transition-colors"
                style={{
                  background: "oklch(0.99 0 0)",
                  color: "oklch(0.15 0 0)",
                  borderColor: paid
                    ? "oklch(0.82 0.08 160)"
                    : "oklch(0.88 0 0)",
                  boxShadow: paid
                    ? "0 1px 3px oklch(0.58 0.16 160 / 0.1)"
                    : "none",
                }}
                data-ocid={`admin.users.item.${idx + 1}`}
              >
                {/* Main row */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Paid/Unpaid stripe on left */}
                  <div
                    className="hidden sm:block w-1 self-stretch rounded-full shrink-0"
                    style={{
                      background: paid
                        ? "oklch(0.58 0.16 160)"
                        : "oklch(0.82 0 0)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-semibold text-sm truncate"
                        style={{ color: "oklch(0.15 0 0)" }}
                      >
                        {profile?.name ? profile.name : shortPrincipal}
                      </span>
                      {profile?.companyName && (
                        <span
                          className="text-sm truncate"
                          style={{ color: "oklch(0.48 0 0)" }}
                        >
                          · {profile.companyName}
                        </span>
                      )}
                      {!profile && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-semibold"
                          style={{
                            background: "oklch(0.97 0.02 44)",
                            color: "oklch(0.52 0.1 44)",
                            borderColor: "oklch(0.88 0.06 44)",
                          }}
                        >
                          No profile
                        </span>
                      )}
                      {user.isAdmin && (
                        <span
                          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium"
                          style={{
                            borderColor: "oklch(0.56 0.16 44)",
                            color: "oklch(0.56 0.16 44)",
                            background: "oklch(0.56 0.16 44 / 0.08)",
                          }}
                        >
                          <Shield className="w-3 h-3" />
                          Admin
                        </span>
                      )}

                      {paid ? (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-bold"
                          style={{
                            background: "oklch(0.96 0.04 160)",
                            color: "oklch(0.34 0.14 160)",
                            borderColor: "oklch(0.82 0.1 160)",
                          }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          PAID
                          {tierLabel && (
                            <span className="font-medium opacity-80">
                              · {tierLabel}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-bold"
                          style={{
                            background: "oklch(0.97 0.02 22)",
                            color: "oklch(0.44 0.18 22)",
                            borderColor: "oklch(0.88 0.08 22)",
                          }}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          NOT PAID
                        </span>
                      )}

                      <span
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium"
                        style={
                          user.featureAccess
                            ? {
                                background: "oklch(0.96 0.03 264)",
                                color: "oklch(0.34 0.14 264)",
                                borderColor: "oklch(0.82 0.1 264)",
                              }
                            : {
                                background: "oklch(0.97 0.02 22)",
                                color: "oklch(0.44 0.18 22)",
                                borderColor: "oklch(0.88 0.08 22)",
                              }
                        }
                      >
                        <Circle className="w-2 h-2 fill-current" />
                        {user.featureAccess ? "Active" : "Revoked"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className="text-xs font-mono"
                        style={{ color: "oklch(0.48 0 0)" }}
                      >
                        {shortPrincipal}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color: profile?.email
                            ? "oklch(0.48 0 0)"
                            : "oklch(0.68 0 0)",
                        }}
                      >
                        {profile?.email || "No email on file"}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.48 0 0)" }}
                      >
                        Subscribed: {signupDate}
                      </span>
                    </div>
                    <TierSelector user={user} idx={idx} />
                  </div>

                  {/* Actions + expand toggle */}
                  <div className="flex flex-col items-stretch sm:flex-row sm:items-center gap-2 shrink-0">
                    {!user.isAdmin && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          grantAdmin.mutate(user.principal, {
                            onSuccess: () =>
                              toast.success("Admin access granted"),
                            onError: (err) => toast.error(err.message),
                          })
                        }
                        disabled={grantAdmin.isPending}
                        className="text-xs"
                        data-ocid={`admin.users.grant_admin_button.${idx + 1}`}
                      >
                        <Shield className="w-3.5 h-3.5 mr-1" />
                        Grant Admin
                      </Button>
                    )}
                    {user.featureAccess ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          revokeAccess.mutate(user.principal, {
                            onSuccess: () => toast.success("Access revoked"),
                            onError: (err) => toast.error(err.message),
                          })
                        }
                        disabled={revokeAccess.isPending}
                        className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                        data-ocid={`admin.users.revoke_button.${idx + 1}`}
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Revoke
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          restoreAccess.mutate(user.principal, {
                            onSuccess: () => toast.success("Access restored"),
                            onError: (err) => toast.error(err.message),
                          })
                        }
                        disabled={restoreAccess.isPending}
                        className="text-xs border-green-200 text-green-700 hover:bg-green-50"
                        data-ocid={`admin.users.restore_button.${idx + 1}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Restore
                      </Button>
                    )}
                    {/* Expand / collapse details */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(principalStr)}
                      aria-label={
                        isExpanded ? "Hide user details" : "Show user details"
                      }
                      aria-expanded={isExpanded}
                      className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 self-center"
                      data-ocid={`admin.users.details_toggle.${idx + 1}`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expandable detail panel */}
                {isExpanded && (
                  <div
                    className="border-t px-4 py-3"
                    style={{
                      background: "oklch(0.97 0 0)",
                      borderColor: "oklch(0.88 0 0)",
                      color: "oklch(0.15 0 0)",
                    }}
                    data-ocid={`admin.users.details_panel.${idx + 1}`}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: "oklch(0.52 0.06 264)" }}
                    >
                      User Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <Mail
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.42 0.12 264)" }}
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                            Email
                          </p>
                          <p
                            className="text-xs text-foreground font-medium break-all"
                            data-ocid={`admin.users.details_email.${idx + 1}`}
                          >
                            {email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 min-w-0">
                        <Phone
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.42 0.12 264)" }}
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                            Phone
                          </p>
                          <p
                            className="text-xs text-foreground font-medium"
                            data-ocid={`admin.users.details_phone.${idx + 1}`}
                          >
                            {phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 min-w-0">
                        <Check
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.46 0.14 160)" }}
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                            Agreement Signed
                          </p>
                          <p
                            className="text-xs text-foreground font-medium"
                            data-ocid={`admin.users.details_agreement.${idx + 1}`}
                          >
                            {agreementDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 min-w-0">
                        <Globe
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.42 0.12 264)" }}
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5">
                            IP Address
                          </p>
                          <p
                            className="text-xs text-foreground font-mono"
                            data-ocid={`admin.users.details_ip.${idx + 1}`}
                          >
                            {ipAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(user.profile as any)?.hearAboutUs && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="font-medium">Source:</span>{" "}
                    {(user.profile as any).hearAboutUs}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Create Account modal */}
      {showCreateModal && (
        <CreateAccountModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Pre-registered accounts section */}
      <PreRegisteredAccountsSection />
    </div>
  );
}

// ── Affiliates Tab ────────────────────────────────────────────────────────────
export function AffiliatesTab() {
  const { data: affiliates = [], isLoading } = useAllAffiliates();
  const ensureAdminRecord = useAdminEnsureAffiliateRecord();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ensureSuccess, setEnsureSuccess] = useState(false);

  const handleCopyLink = (referralCode: string, id: string) => {
    const link = `https://www.tele-blast.com?affiliate=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      toast.success("Referral link copied!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  async function handleEnsureAdminRecord() {
    try {
      await ensureAdminRecord.mutateAsync({
        name: "Mike Bendett",
        email: "mikebendett@gmail.com",
      });
      setEnsureSuccess(true);
      toast.success("Admin affiliate record verified and restored.");
      setTimeout(() => setEnsureSuccess(false), 5000);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to ensure admin record",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.affiliates.loading_state">
        {["a1", "a2", "a3", "a4"].map((k) => (
          <Skeleton key={k} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  const list = affiliates as AffiliateProfile[];

  return (
    <div className="space-y-4">
      {/* Ensure Admin Record button */}
      <div
        className="flex items-center justify-between gap-3 rounded-xl border p-4"
        style={{
          background: "oklch(0.22 0.12 264 / 0.04)",
          borderColor: "oklch(0.22 0.12 264 / 0.15)",
        }}
        data-ocid="admin.affiliates.ensure_admin.section"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Admin Affiliate Record
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ensure <span className="font-mono">mikebendett@gmail.com</span> has
            an affiliate record. Safe to run anytime — no-op if it already
            exists.
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleEnsureAdminRecord}
          disabled={ensureAdminRecord.isPending}
          className="text-white shrink-0 gap-1.5"
          style={{ background: "oklch(0.22 0.12 264)" }}
          data-ocid="admin.affiliates.ensure_admin_button"
        >
          {ensureAdminRecord.isPending ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Restoring…
            </>
          ) : ensureSuccess ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Done ✓
            </>
          ) : (
            <>
              <Shield className="w-3.5 h-3.5" />
              Ensure Record
            </>
          )}
        </Button>
      </div>

      {list.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.affiliates.empty_state"
        >
          <Wallet className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No affiliates yet</p>
          <p className="text-sm mt-1">
            Affiliates who sign up will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.affiliates.list">
          {list.map((affiliate, idx) => {
            const referralLink = `https://www.tele-blast.com?affiliate=${affiliate.referralCode}`;
            const isCopied = copiedId === affiliate.id.toString();
            const isActive =
              affiliate.paypalEmail && affiliate.paypalEmail.trim() !== "";
            return (
              <div
                key={affiliate.id.toString()}
                className="bg-card border border-border rounded-xl p-4"
                data-ocid={`admin.affiliates.item.${idx + 1}`}
              >
                {/* Name + activation status + approval */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-semibold text-foreground text-sm">
                    {affiliate.name}
                  </span>
                  {/* Activation status */}
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700 border border-green-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                      Pending Activation
                    </span>
                  )}
                  {/* Approval status */}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      affiliate.approved
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {affiliate.approved ? "Approved" : "Pending Approval"}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground mb-3">
                  <div>
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    {affiliate.email}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">PayPal:</span>{" "}
                    {isActive ? (
                      affiliate.paypalEmail
                    ) : (
                      <span className="italic text-muted-foreground">
                        Not set
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Ref Code:
                    </span>{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-foreground font-mono">
                      {affiliate.referralCode}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Joined:</span>{" "}
                    {formatDate(affiliate.createdAt)}
                  </div>
                </div>

                {/* Referral link row */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 min-w-0 rounded-lg border px-3 py-2 font-mono text-xs truncate select-all"
                    style={{
                      background: "oklch(0.97 0 0)",
                      borderColor: "oklch(0.88 0 0)",
                      color: "oklch(0.32 0 0)",
                    }}
                    title={referralLink}
                  >
                    {referralLink}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyLink(
                        affiliate.referralCode,
                        affiliate.id.toString(),
                      )
                    }
                    className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-muted"
                    style={{
                      borderColor: "oklch(0.88 0 0)",
                      color: isCopied
                        ? "oklch(0.45 0.16 150)"
                        : "oklch(0.22 0.12 264)",
                    }}
                    data-ocid={`admin.affiliates.copy_link.${idx + 1}`}
                  >
                    {isCopied ? <>✓ Copied</> : <>Copy Link</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Payouts Tab ───────────────────────────────────────────────────────────────
export function PayoutsTab() {
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
  const { data: rawPayouts = [], isLoading } = useAdminEnrichedPayouts();
  const { data: affiliates = [] } = useAllAffiliates();
  const markPaid = useMarkPayoutPaid();
  const [markingId, setMarkingId] = useState<string | null>(null);

  // Group entries by newUserPrincipal so each referred person is one row
  const grouped = useMemo(() => {
    const entries = rawPayouts as EnrichedCommissionEntry[];
    const map = new Map<
      string,
      {
        key: string;
        affiliateId: string;
        referredName: string;
        referredEmail: string;
        referredPhone: string;
        referredBizName: string;
        hasPurchased: boolean;
        waitingCents: number; // pending + ready
        paidCents: number; // paid
        pendingEntries: EnrichedCommissionEntry[]; // entries to mark paid
      }
    >();

    for (const e of entries) {
      const key =
        e.newUserPrincipal?.toString() ??
        e.referredEmail ??
        Math.random().toString();
      if (!map.has(key)) {
        map.set(key, {
          key,
          affiliateId: e.affiliateId?.toString() ?? "",
          referredName: e.referredName || "",
          referredEmail: e.referredEmail || "",
          referredPhone: e.referredPhone || "",
          referredBizName: e.referredBizName || "",
          hasPurchased: e.hasPurchased,
          waitingCents: 0,
          paidCents: 0,
          pendingEntries: [],
        });
      }
      const row = map.get(key)!;
      const cents = Number(e.commissionAmount ?? 0);
      const isWaiting = e.status === "pending" || e.status === "ready";
      const isPaidStatus = e.status === "paid";
      if (isWaiting) {
        row.waitingCents += cents;
        row.pendingEntries.push(e);
      } else if (isPaidStatus) {
        row.paidCents += cents;
      }
      // Keep hasPurchased as true if any entry has it
      if (e.hasPurchased) row.hasPurchased = true;
    }

    return Array.from(map.values());
  }, [rawPayouts]);

  // Apply filter
  const list = useMemo(() => {
    if (filter === "pending") return grouped.filter((r) => r.waitingCents > 0);
    if (filter === "paid")
      return grouped.filter((r) => r.paidCents > 0 && r.waitingCents === 0);
    return grouped;
  }, [grouped, filter]);

  // Summary totals
  const totalWaiting = useMemo(
    () => grouped.reduce((sum, r) => sum + r.waitingCents, 0),
    [grouped],
  );
  const totalPaid = useMemo(
    () => grouped.reduce((sum, r) => sum + r.paidCents, 0),
    [grouped],
  );

  function getAffiliateName(affiliateId: string): string {
    const aff = (affiliates as AffiliateProfile[]).find(
      (a) => a.id.toString() === affiliateId,
    );
    if (aff) return aff.name;
    return affiliateId ? `${affiliateId.slice(0, 8)}…` : "Unknown";
  }

  function getAffiliateEmail(affiliateId: string): string {
    const aff = (affiliates as AffiliateProfile[]).find(
      (a) => a.id.toString() === affiliateId,
    );
    return aff?.email ?? "";
  }

  function formatDollars(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
  }

  async function handleMarkAllPaid(row: (typeof list)[number]) {
    if (row.pendingEntries.length === 0) return;
    setMarkingId(row.key);
    try {
      for (const entry of row.pendingEntries) {
        const id =
          entry.newUserPrincipal?.toString() ?? entry.referredEmail ?? "";
        await markPaid.mutateAsync(id);
      }
      toast.success(`Marked ${formatDollars(row.waitingCents)} as paid`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to mark as paid",
      );
    } finally {
      setMarkingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.payouts.loading_state">
        {["p1", "p2", "p3", "p4"].map((k) => (
          <Skeleton key={k} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Total Referred" value={grouped.length} icon={Users} />
        <StatCard
          label="Waiting to Be Paid"
          value={formatDollars(totalWaiting)}
          icon={Clock}
          accent
        />
        <StatCard
          label="Total Paid Out"
          value={formatDollars(totalPaid)}
          icon={CheckCircle2}
          green
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap" data-ocid="admin.payouts.filters">
        {(
          [
            { key: "all", label: "All Referrals" },
            { key: "pending", label: "Waiting to Be Paid" },
            { key: "paid", label: "Paid" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? "text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            style={
              filter === key
                ? {
                    background:
                      key === "pending"
                        ? "oklch(0.56 0.16 44)"
                        : key === "paid"
                          ? "oklch(0.46 0.14 160)"
                          : "oklch(0.22 0.12 264)",
                  }
                : {}
            }
            data-ocid={`admin.payouts.filter-${key}.tab`}
          >
            {label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.payouts.empty_state"
        >
          <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">
            {filter === "pending"
              ? "No referrals waiting to be paid"
              : filter === "paid"
                ? "No paid referrals yet"
                : "No referrals yet"}
          </p>
          <p className="text-sm mt-1">
            {filter === "all"
              ? "Referral commissions will appear here as affiliates make referrals."
              : 'Try switching to "All Referrals" to see everything.'}
          </p>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border"
          data-ocid="admin.payouts.list"
        >
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr
                style={{
                  background: "oklch(0.22 0.12 264 / 0.06)",
                  borderBottom: "1px solid oklch(0.88 0 0)",
                }}
              >
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Affiliate
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Referred Person
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                  Business
                </th>
                <th className="text-center px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Purchased
                </th>
                <th
                  className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide"
                  style={{ color: "oklch(0.56 0.16 44)" }}
                >
                  Waiting to Be Paid
                </th>
                <th
                  className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide"
                  style={{ color: "oklch(0.46 0.14 160)" }}
                >
                  Paid
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((row, idx) => {
                const isMarking = markingId === row.key;
                const hasWaiting = row.waitingCents > 0;
                return (
                  <tr
                    key={row.key}
                    className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.payouts.item.${idx + 1}`}
                  >
                    {/* Affiliate */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-foreground truncate max-w-[120px]">
                        {getAffiliateName(row.affiliateId)}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[120px] mt-0.5">
                        {getAffiliateEmail(row.affiliateId)}
                      </p>
                    </td>

                    {/* Referred Person */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground text-sm">
                        {row.referredName || (
                          <span className="text-muted-foreground italic">
                            No name
                          </span>
                        )}
                      </p>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        {row.referredEmail && (
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3 shrink-0" />
                            {row.referredEmail}
                          </p>
                        )}
                        {row.referredPhone && (
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3 shrink-0" />
                            {row.referredPhone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Business */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-foreground">
                        {row.referredBizName || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </p>
                    </td>

                    {/* Purchased */}
                    <td className="px-4 py-3 text-center">
                      {row.hasPurchased ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border"
                          style={{
                            background: "oklch(0.96 0.04 160)",
                            color: "oklch(0.34 0.14 160)",
                            borderColor: "oklch(0.82 0.1 160)",
                          }}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Yes
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border"
                          style={{
                            background: "oklch(0.97 0.02 22)",
                            color: "oklch(0.54 0.12 22)",
                            borderColor: "oklch(0.88 0.08 22)",
                          }}
                        >
                          No
                        </span>
                      )}
                    </td>

                    {/* Waiting to Be Paid */}
                    <td className="px-4 py-3 text-right">
                      {hasWaiting ? (
                        <span
                          className="inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg border"
                          style={{
                            background: "oklch(0.97 0.04 80)",
                            color: "oklch(0.48 0.14 60)",
                            borderColor: "oklch(0.88 0.1 70)",
                          }}
                          data-ocid={`admin.payouts.waiting_amount.${idx + 1}`}
                        >
                          <Clock className="w-3 h-3" />
                          {formatDollars(row.waitingCents)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>

                    {/* Paid */}
                    <td className="px-4 py-3 text-right">
                      {row.paidCents > 0 ? (
                        <span
                          className="inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg border"
                          style={{
                            background: "oklch(0.96 0.04 160)",
                            color: "oklch(0.34 0.14 160)",
                            borderColor: "oklch(0.82 0.1 160)",
                          }}
                          data-ocid={`admin.payouts.paid_amount.${idx + 1}`}
                        >
                          <Check className="w-3 h-3" />
                          {formatDollars(row.paidCents)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      {hasWaiting && (
                        <Button
                          size="sm"
                          onClick={() => void handleMarkAllPaid(row)}
                          disabled={isMarking || markPaid.isPending}
                          className="text-xs text-white gap-1.5 whitespace-nowrap"
                          style={{ background: "oklch(0.56 0.16 44)" }}
                          data-ocid={`admin.payouts.mark_paid_button.${idx + 1}`}
                        >
                          {isMarking ? (
                            <>
                              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Marking…
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Mark Paid
                            </>
                          )}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Footer summary row */}
            {list.length > 0 && (
              <tfoot>
                <tr
                  style={{
                    background: "oklch(0.22 0.12 264 / 0.04)",
                    borderTop: "2px solid oklch(0.88 0 0)",
                  }}
                >
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide"
                  >
                    Totals ({list.length} referral{list.length !== 1 ? "s" : ""}
                    )
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.48 0.14 60)" }}
                    >
                      {formatDollars(
                        list.reduce((s, r) => s + r.waitingCents, 0),
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.34 0.14 160)" }}
                    >
                      {formatDollars(list.reduce((s, r) => s + r.paidCents, 0))}
                    </span>
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  );
}

// ── Price List Tab ─────────────────────────────────────────────────────────────
interface PackageDef {
  tier: string;
  name: string;
  price: string;
  tAI: number;
  ltAI: number;
  landingPages: number;
  accentColor: string;
  features: string[];
  featureContent: string[];
}

const PACKAGE_DEFS: PackageDef[] = [
  {
    tier: "pro",
    name: "Pro",
    price: "$30/mo",
    tAI: 6,
    ltAI: 0,
    landingPages: 1,
    accentColor: "oklch(0.22 0.12 264)",
    features: [
      "Lead management & CSV import (500/file)",
      "Multiple pipelines with drag-and-drop board",
      "Power Dialer (call, text, email modes)",
      "Drip SMS campaigns with round-robin",
      "Manual email & SMS templates",
      "Cold call scripts (manual)",
      "New Lead Queue",
      "Google Voice click-to-dial",
      "Phone Link (Windows PC calling)",
      "Twilio SMS & multi-number round-robin",
      "Bulk select & DNC management",
      "Promo Image Creator (logo + photo + message)",
      "1 landing page (manual only)",
    ],
    featureContent: [
      "Full lead list with custom columns, search, and pipeline filters",
      "CSV importer with column mapping supporting contact + business name, industry, phone, email, birthday",
      "Power Dialer session with call, SMS, and email modes — auto-advance through lead list",
      "Drip campaigns: select leads, pick a template, launch with randomized 1–5 min delays",
      "Templates section: create and save email/SMS templates manually",
      "Cold Call Scripts: generate or write scripts — lead attachment is optional",
      "New Lead Queue: see and act on freshly imported leads",
      "Twilio integration: add numbers, send SMS, round-robin across multiple numbers",
      "DNC flagging: mark leads Do Not Call, blocks all outreach, hides from active view",
      "Bulk actions: multi-select leads for mass delete or DNC",
    ],
  },
];

function PackageCard({
  pkg,
  enabled,
  onToggle,
  isToggling,
}: {
  pkg: PackageDef;
  enabled: boolean;
  onToggle: (tier: string, enabled: boolean) => void;
  isToggling: boolean;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 transition-all duration-200"
      style={{
        borderColor: enabled
          ? `${pkg.accentColor.replace(")", " / 0.3)")}`
          : "oklch(0.88 0 0)",
        boxShadow: enabled
          ? `0 0 0 1px ${pkg.accentColor.replace(")", " / 0.12)")}`
          : "none",
      }}
      data-ocid={`admin.price_list.${pkg.tier}.card`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-foreground">
              {pkg.name}
            </span>
            <span
              className="text-sm font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                color: pkg.accentColor,
              }}
            >
              {pkg.price}
            </span>
          </div>
          {/* Visibility badge */}
          <div className="mt-1.5">
            {enabled ? (
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold"
                style={{
                  background: "oklch(0.96 0.04 160)",
                  color: "oklch(0.38 0.14 160)",
                  borderColor: "oklch(0.82 0.1 160)",
                }}
                data-ocid={`admin.price_list.${pkg.tier}.visible_badge`}
              >
                <CheckCircle2 className="w-3 h-3" />
                Visible on landing page
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold"
                style={{
                  background: "oklch(0.96 0 0)",
                  color: "oklch(0.52 0 0)",
                  borderColor: "oklch(0.88 0 0)",
                }}
                data-ocid={`admin.price_list.${pkg.tier}.hidden_badge`}
              >
                <XCircle className="w-3 h-3" />
                Hidden from landing page
              </span>
            )}
          </div>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${enabled ? "Disable" : "Enable"} ${pkg.name} on landing page`}
          onClick={() => onToggle(pkg.tier, !enabled)}
          disabled={isToggling}
          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
          style={{
            background: isToggling
              ? "oklch(0.68 0 0)"
              : enabled
                ? pkg.accentColor
                : "oklch(0.82 0 0)",
          }}
          data-ocid={`admin.price_list.${pkg.tier}.toggle`}
        >
          {isToggling ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            </span>
          ) : (
            <span
              className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
              style={{
                transform: enabled ? "translateX(20px)" : "translateX(0)",
              }}
            />
          )}
        </button>
      </div>

      {/* Token / limits row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border"
          style={{
            background: "oklch(0.22 0.12 264 / 0.08)",
            color: "oklch(0.22 0.12 264)",
            borderColor: "oklch(0.22 0.12 264 / 0.2)",
          }}
        >
          <Coins className="w-3 h-3" />
          {pkg.tAI} tAI
        </span>
        <span
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border"
          style={{
            background:
              pkg.ltAI > 0 ? "oklch(0.95 0.06 85)" : "oklch(0.96 0 0)",
            color: pkg.ltAI > 0 ? "oklch(0.46 0.12 85)" : "oklch(0.6 0 0)",
            borderColor:
              pkg.ltAI > 0 ? "oklch(0.88 0.1 85)" : "oklch(0.88 0 0)",
          }}
        >
          <Zap className="w-3 h-3" />
          {pkg.ltAI === 0 ? "No LtAI" : `${pkg.ltAI} LtAI`}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border bg-muted text-muted-foreground border-border">
          <LayoutList className="w-3 h-3" />
          {pkg.landingPages}{" "}
          {pkg.landingPages === 1 ? "Landing Page" : "Landing Pages"}
        </span>
      </div>

      {/* Feature checklist */}
      <ul className="space-y-1.5">
        {pkg.features.map((feat) => (
          <li
            key={feat}
            className="flex items-start gap-2 text-xs text-foreground leading-snug"
          >
            <Check
              className="w-3.5 h-3.5 mt-0.5 shrink-0"
              style={{ color: pkg.accentColor }}
            />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceListTab() {
  const {
    data: configs = [],
    isLoading,
    refetch: refetchConfigs,
  } = useGetPackageConfig();
  const setPackageEnabled = useSetPackageEnabled();
  const [togglingTier, setTogglingTier] = useState<string | null>(null);
  // Optimistic overrides: tracks pending toggle changes so UI responds instantly
  const [optimisticOverrides, setOptimisticOverrides] = useState<
    Record<string, boolean>
  >({});
  const { data: showComingSoonTeaser = false } = useGetShowComingSoonTeaser();
  const setShowComingSoonTeaser = useSetShowComingSoonTeaser();
  const [togglingTeaser, setTogglingTeaser] = useState(false);

  // Build a map for quick enabled lookup.
  // Priority: optimistic overrides > backend/localStorage configs > hard defaults
  const enabledMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    // Seed defaults — only "pro" ($30) shown by default
    for (const pkg of PACKAGE_DEFS) {
      map[pkg.tier] = pkg.tier === "pro";
    }
    // Override with backend/localStorage-aware data from the hook (when loaded)
    if (configs.length > 0) {
      for (const cfg of configs) {
        map[cfg.tier] = cfg.enabled;
      }
    } else {
      // configs not loaded yet — read from localStorage directly so the UI
      // shows the last-saved state rather than resetting to defaults
      for (const pkg of PACKAGE_DEFS) {
        try {
          const stored = localStorage.getItem(
            `tele-blast:pkg-enabled:${pkg.tier}`,
          );
          if (stored !== null) map[pkg.tier] = stored === "true";
        } catch {
          /* ignore */
        }
      }
    }
    // Apply optimistic overrides last — these win over everything
    for (const [tier, val] of Object.entries(optimisticOverrides)) {
      map[tier] = val;
    }
    return map;
  }, [configs, optimisticOverrides]);

  async function handleToggle(tier: string, enabled: boolean) {
    // Apply optimistic update immediately so toggle responds on click
    setOptimisticOverrides((prev) => ({ ...prev, [tier]: enabled }));
    setTogglingTier(tier);
    try {
      // Persist to localStorage first so refetch reads the correct value
      try {
        localStorage.setItem(`tele-blast:pkg-enabled:${tier}`, String(enabled));
      } catch {
        /* ignore */
      }
      await setPackageEnabled.mutateAsync({ tier, enabled });
      // Clear optimistic override BEFORE refetch so the UI reflects server truth,
      // not a stale optimistic value overriding the freshly-loaded server data.
      setOptimisticOverrides((prev) => {
        const next = { ...prev };
        delete next[tier];
        return next;
      });
      // Force a fresh fetch so enabledMap updates from backend/localStorage truth
      await refetchConfigs();
      toast.success(
        enabled
          ? `${PACKAGE_DEFS.find((p) => p.tier === tier)?.name} is now visible on the landing page`
          : `${PACKAGE_DEFS.find((p) => p.tier === tier)?.name} is now hidden from the landing page`,
      );
    } catch (err) {
      // Revert optimistic update on error — server rejected the change
      setOptimisticOverrides((prev) => {
        const next = { ...prev };
        delete next[tier];
        return next;
      });
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to update package visibility",
      );
    } finally {
      setTogglingTier(null);
    }
  }

  if (isLoading) {
    return (
      <div
        className="grid sm:grid-cols-2 gap-4"
        data-ocid="admin.price_list.loading_state"
      >
        {["p1", "p2", "p3", "p4"].map((k) => (
          <Skeleton key={k} className="h-72 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8" data-ocid="admin.price_list.section">
      {/* Section header */}
      <div>
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <LayoutList
            className="w-5 h-5"
            style={{ color: "oklch(0.22 0.12 264)" }}
          />
          Package Visibility
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Toggle each package on or off to control which plans appear on the
          public pricing page. All packages are fully functional regardless of
          visibility.
        </p>
      </div>

      {/* Package cards grid */}
      <div
        className="grid sm:grid-cols-2 gap-4"
        data-ocid="admin.price_list.packages_grid"
      >
        {PACKAGE_DEFS.map((pkg) => (
          <PackageCard
            key={pkg.tier}
            pkg={pkg}
            enabled={enabledMap[pkg.tier] ?? true}
            onToggle={handleToggle}
            isToggling={togglingTier === pkg.tier}
          />
        ))}
      </div>

      {/* Package Feature Content section */}
      <div
        className="space-y-4"
        data-ocid="admin.price_list.feature_content.section"
      >
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <CheckCircle2
              className="w-5 h-5"
              style={{ color: "oklch(0.22 0.12 264)" }}
            />
            Package Feature Content
          </h2>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            These are the feature descriptions that auto-populate when a user
            subscribes to each tier. Content from lower tiers is always included
            in higher tier packages.
          </p>
        </div>

        {PACKAGE_DEFS.map((pkg, pkgIdx) => (
          <div
            key={pkg.tier}
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid={`admin.price_list.feature_content.${pkg.tier}`}
          >
            {/* Package header */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{
                background: `${pkg.accentColor.replace(")", " / 0.08)")}`,
                borderBottom: `1px solid ${pkg.accentColor.replace(")", " / 0.15)")}`,
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: pkg.accentColor }}
              >
                {pkgIdx + 1}
              </div>
              <div>
                <span className="font-bold text-foreground text-sm">
                  {pkg.name}
                </span>
                <span className="text-muted-foreground text-xs ml-2">
                  {pkg.price}
                </span>
              </div>
              <span
                className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                  color: pkg.accentColor,
                }}
              >
                {pkg.featureContent.length} feature descriptions
              </span>
            </div>

            {/* Feature content list */}
            <ul className="divide-y divide-border">
              {pkg.featureContent.map((content, i) => (
                <li
                  key={content}
                  className="flex items-start gap-3 px-5 py-3 text-sm"
                  data-ocid={`admin.price_list.feature_content.${pkg.tier}.item.${i + 1}`}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold shrink-0 mt-0.5"
                    style={{
                      background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                      color: pkg.accentColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-foreground leading-snug">
                    {content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Landing Page Content ── */}
      <div
        className="space-y-4 border-t border-border pt-8"
        data-ocid="admin.price_list.landing_content.section"
      >
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: "oklch(0.56 0.16 44)" }} />
            Landing Page Content
          </h2>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Control optional content sections shown on the public landing page.
          </p>
        </div>

        {/* Coming Soon Teaser toggle */}
        <div
          className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4"
          data-ocid="admin.price_list.coming_soon_teaser.card"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">
              AI Features Coming Soon teaser
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Show the "Coming Soon — AI-Powered Features" section on the
              landing page. Hidden by default — enable when you want to tease
              upcoming AI features to visitors.
            </p>
            <div className="mt-2">
              {showComingSoonTeaser ? (
                <span
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold"
                  style={{
                    background: "oklch(0.96 0.04 160)",
                    color: "oklch(0.38 0.14 160)",
                    borderColor: "oklch(0.82 0.1 160)",
                  }}
                  data-ocid="admin.price_list.coming_soon_teaser.visible_badge"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Visible on landing page
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold"
                  style={{
                    background: "oklch(0.96 0 0)",
                    color: "oklch(0.52 0 0)",
                    borderColor: "oklch(0.88 0 0)",
                  }}
                  data-ocid="admin.price_list.coming_soon_teaser.hidden_badge"
                >
                  <XCircle className="w-3 h-3" />
                  Hidden from landing page
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showComingSoonTeaser}
            aria-label={`${showComingSoonTeaser ? "Hide" : "Show"} AI Coming Soon teaser on landing page`}
            onClick={async () => {
              setTogglingTeaser(true);
              try {
                await setShowComingSoonTeaser.mutateAsync(
                  !showComingSoonTeaser,
                );
                toast.success(
                  !showComingSoonTeaser
                    ? "AI Coming Soon teaser is now visible on the landing page"
                    : "AI Coming Soon teaser hidden from landing page",
                );
              } catch (err) {
                toast.error(
                  err instanceof Error ? err.message : "Failed to update",
                );
              } finally {
                setTogglingTeaser(false);
              }
            }}
            disabled={togglingTeaser}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: showComingSoonTeaser
                ? "oklch(0.56 0.16 44)"
                : "oklch(0.82 0 0)",
            }}
            data-ocid="admin.price_list.coming_soon_teaser.toggle"
          >
            <span
              className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out"
              style={{
                transform: showComingSoonTeaser
                  ? "translateX(20px)"
                  : "translateX(0)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Danger Zone ───────────────────────────────────────────────────────────────
function DangerZone() {
  const deleteAllLeads = useAdminDeleteAllLeads();
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirmDelete() {
    try {
      const count = await deleteAllLeads.mutateAsync();
      setShowConfirm(false);
      toast.success(
        `Deleted ${count.toLocaleString()} lead${count !== 1 ? "s" : ""} successfully`,
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete leads",
      );
    }
  }

  return (
    <div
      className="mt-8 rounded-xl border-2 p-5 space-y-4"
      style={{
        borderColor: "oklch(0.7 0.18 22 / 0.4)",
        background: "oklch(0.99 0.005 22)",
      }}
      data-ocid="admin.danger_zone.section"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle
          className="w-5 h-5 shrink-0"
          style={{ color: "oklch(0.52 0.2 22)" }}
        />
        <h3
          className="text-base font-bold"
          style={{ color: "oklch(0.36 0.16 22)" }}
        >
          Danger Zone
        </h3>
      </div>

      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border p-4"
        style={{
          borderColor: "oklch(0.7 0.18 22 / 0.25)",
          background: "oklch(0.98 0 0)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Delete All Leads
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Permanently delete every lead on the platform. This cannot be
            undone.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(true)}
          className="shrink-0 gap-1.5 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          data-ocid="admin.danger_zone.delete_all_leads_button"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete All Leads
        </Button>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          data-ocid="admin.danger_zone.confirm.dialog"
        >
          <div
            className="w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-4"
            style={{ background: "oklch(0.99 0 0)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.95 0.04 22)" }}
              >
                <Trash2
                  className="w-5 h-5"
                  style={{ color: "oklch(0.52 0.2 22)" }}
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Delete All Leads?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground leading-relaxed rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-700">ALL leads</span> across
              the entire platform? This cannot be undone.
            </p>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirm(false)}
                disabled={deleteAllLeads.isPending}
                className="flex-1"
                data-ocid="admin.danger_zone.confirm.cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmDelete}
                disabled={deleteAllLeads.isPending}
                className="flex-1 text-white gap-1.5"
                style={{ background: "oklch(0.46 0.2 22)" }}
                data-ocid="admin.danger_zone.confirm.confirm_button"
              >
                {deleteAllLeads.isPending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Confirm Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Panel (authenticated + is admin) ────────────────────────────────────
const TABS = [
  { key: "users", label: "Users", icon: Users },
  { key: "affiliates", label: "Affiliates", icon: Wallet },
  { key: "payouts", label: "Payouts", icon: DollarSign },
  { key: "price_list", label: "Price List", icon: LayoutList },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function AdminPanel({ onSignOut }: { onSignOut: () => void }) {
  const { identity } = useInternetIdentity();
  const {
    data: isAdmin,
    isLoading: adminLoading,
    isError: adminError,
  } = useIsAdmin();
  const grantAdmin = useGrantAdmin();
  const [activeTab, setActiveTab] = useState<TabKey>("users");
  const [selfGranting, setSelfGranting] = useState(false);
  // Safety valve: if adminLoading hasn't resolved in 8s, force it to false
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  useEffect(() => {
    if (!adminLoading) return;
    const id = window.setTimeout(() => setLoadingTimedOut(true), 8_000);
    return () => window.clearTimeout(id);
  }, [adminLoading]);

  // Auto-bootstrap: first authenticated visitor becomes admin automatically
  const hasTriggeredBootstrap = useRef(false);
  const grantAdminRef = useRef(grantAdmin);
  grantAdminRef.current = grantAdmin;

  const isLoadingResolved = !adminLoading || loadingTimedOut || adminError;

  useEffect(() => {
    if (
      isLoadingResolved &&
      isAdmin === false &&
      !adminError &&
      !loadingTimedOut &&
      identity &&
      !hasTriggeredBootstrap.current
    ) {
      hasTriggeredBootstrap.current = true;
      setSelfGranting(true);
      grantAdminRef.current
        .mutateAsync(identity.getPrincipal())
        .catch(() => {
          hasTriggeredBootstrap.current = false;
        })
        .finally(() => {
          setSelfGranting(false);
        });
    }
  }, [isLoadingResolved, isAdmin, adminError, loadingTimedOut, identity]);

  if (!isLoadingResolved || selfGranting) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-64 gap-3"
        data-ocid="admin.loading_state"
      >
        <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-xs text-muted-foreground">
          Loading admin panel…
        </span>
      </div>
    );
  }

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-6 space-y-6"
      data-ocid="admin.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">Back Office</h1>
          <p className="text-sm text-muted-foreground">
            Admin panel — manage users, affiliates, and payouts
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={onSignOut}
          data-ocid="admin.sign_out_button"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <div
        className="flex rounded-xl border border-border overflow-hidden"
        data-ocid="admin.tabs"
      >
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === key
                ? "text-white"
                : "text-muted-foreground hover:text-foreground bg-card"
            }`}
            style={
              activeTab === key
                ? {
                    background: "oklch(0.22 0.12 264)",
                    borderBottom: "2px solid oklch(0.56 0.16 44)",
                  }
                : {}
            }
            data-ocid={`admin.${key}.tab`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "users" && <UsersTab />}
        {activeTab === "affiliates" && <AffiliatesTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "price_list" && <PriceListTab />}
      </div>

      <DangerZone />
    </div>
  );
}

// ── AdminPage (root export) — handles its own auth state ──────────────────────
export default function AdminPage() {
  // Local password-gate state — always check session storage on mount
  const [passwordPassed, setPasswordPassed] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  function handlePasswordSuccess() {
    setPasswordPassed(true);
  }

  function handleSignOut() {
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setPasswordPassed(false);
  }

  // ALWAYS show login form when not authenticated — no setup screen, no "Become Admin"
  if (!passwordPassed) {
    return <AdminLoginForm onSuccess={handlePasswordSuccess} />;
  }

  // Password passed — show admin panel directly
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal admin header */}
      <header className="border-b border-border px-4 h-14 flex items-center gap-3 bg-card">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span
          className="font-bold text-sm tracking-tight"
          style={{ color: "oklch(0.22 0.12 264)" }}
        >
          Tele-Blast Admin
        </span>
      </header>
      <main className="px-4 py-6">
        <AdminPanel onSignOut={handleSignOut} />
      </main>
    </div>
  );
}
