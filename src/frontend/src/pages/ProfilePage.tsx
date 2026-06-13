import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Save,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useProfile, useSaveProfile } from "../hooks/useProfile";
import type { ProfileInput } from "../types";

// ── Profile Form ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const saveProfile = useSaveProfile();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  // 10-second timeout: if profileLoading is still true after 10s, stop waiting
  useEffect(() => {
    if (!profileLoading) return;
    const timer = setTimeout(() => setLoadingTimedOut(true), 10_000);
    return () => clearTimeout(timer);
  }, [profileLoading]);

  const isNewUser =
    (!profileLoading || loadingTimedOut) &&
    (!profile ||
      (!profile.name &&
        !profile.companyName &&
        !profile.phone &&
        !profile.email));

  // Read pending profile from sessionStorage (set by PreSignupPage / pendingProfileSave flow)
  const pendingProfileSave =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingProfileSave") === "true"
      : false;

  function readPendingSessionProfile(): Partial<ProfileInput> {
    try {
      const raw = sessionStorage.getItem("pendingProfile");
      if (!raw) return {};
      const p = JSON.parse(raw) as {
        businessName?: string;
        fullName?: string;
        phone?: string;
        email?: string;
      };
      return {
        name: p.fullName ?? "",
        companyName: p.businessName ?? "",
        phone: p.phone ?? "",
        email: p.email ?? "",
      };
    } catch {
      return {};
    }
  }

  const [form, setForm] = useState<ProfileInput & { hearAboutUs?: string }>(
    () => {
      // Pre-fill from localStorage pending flag + sessionStorage if available
      if (pendingProfileSave) {
        const pending = readPendingSessionProfile();
        return {
          name: pending.name ?? "",
          companyName: pending.companyName ?? "",
          phone: pending.phone ?? "",
          email: pending.email ?? "",
          website: "",
          referredBy: "",
          hearAboutUs: "",
        };
      }
      return {
        name: "",
        companyName: "",
        phone: "",
        email: "",
        website: "",
        referredBy: "",
        hearAboutUs: "",
      };
    },
  );

  // Only initialize the form from profile data ONCE — never overwrite user input after that.
  const hasInitializedForm = useRef(false);
  useEffect(() => {
    if (profile && !hasInitializedForm.current) {
      hasInitializedForm.current = true;
      setForm({
        name: profile.name ?? "",
        companyName: profile.companyName ?? "",
        phone: profile.phone ?? "",
        email: profile.email ?? "",
        website: profile.website ?? "",
        referredBy: profile.referredBy ?? "",
        hearAboutUs: (profile as any).hearAboutUs ?? "",
      });
    }
  }, [profile]);

  function goToDashboard() {
    navigate({ to: "/dashboard" });
  }

  async function handleSave() {
    setSaveError(null);
    try {
      await saveProfile.mutateAsync(form);
      // Clear any pending-save flag that was set when profile save failed during onboarding
      localStorage.removeItem("pendingProfileSave");
      toast.success("Profile saved successfully");
      navigate({ to: "/dashboard" });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to save profile.";
      setSaveError(msg);
      toast.error("Failed to save profile. Please try again.");
    }
  }

  const field = (
    id: keyof ProfileInput,
    label: string,
    type = "text",
    icon?: React.ReactNode,
    placeholder = "",
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <Input
          id={id}
          data-ocid={`profile.${id}_input`}
          type={type}
          value={form[id] ?? ""}
          placeholder={placeholder}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [id]: e.target.value }))
          }
          className={icon ? "pl-9" : ""}
        />
      </div>
    </div>
  );

  if (profileLoading && !loadingTimedOut) {
    return (
      <div
        data-ocid="profile.loading_state"
        className="flex items-center justify-center min-h-screen bg-background"
      >
        <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const showTimeoutNotice = loadingTimedOut && profileLoading;
  const showPendingNotice = pendingProfileSave && !profile;

  return (
    <div data-ocid="profile.page" className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div
        className="px-4 py-5 shadow-md flex items-center gap-3"
        style={{ background: "oklch(0.22 0.12 264)" }}
      >
        <div
          className="w-7 h-7 rounded flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-white tracking-tight">
            {isNewUser ? "Complete Your Profile" : "My Profile"}
          </h1>
          <p className="text-xs text-white/60 mt-0.5">
            {isNewUser
              ? "Tell us a bit about yourself — all fields are optional"
              : "Update your account information below."}
          </p>
        </div>
        <button
          type="button"
          data-ocid="profile.skip_button"
          onClick={goToDashboard}
          className="shrink-0 text-xs text-white/50 hover:text-white/80 transition-colors py-1 px-2"
        >
          {isNewUser ? "Skip for now" : "← Dashboard"}
        </button>
      </div>

      {/* New user progress indicator */}
      {isNewUser && (
        <div
          className="px-4 py-3 flex items-center gap-2 text-xs font-medium"
          style={{
            background: "oklch(0.56 0.16 44 / 0.08)",
            borderBottom: "1px solid oklch(0.56 0.16 44 / 0.15)",
            color: "oklch(0.46 0.16 44)",
          }}
          data-ocid="profile.new_user_banner"
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          Payment confirmed! Fill in your profile or skip — you can always
          update it later.
        </div>
      )}

      {/* Timeout notice — backend was slow to respond */}
      {showTimeoutNotice && (
        <div
          className="px-4 py-3 flex items-start gap-2 text-xs"
          style={{
            background: "oklch(0.97 0.015 50)",
            borderBottom: "1px solid oklch(0.85 0.04 50)",
            color: "oklch(0.40 0.08 50)",
          }}
          data-ocid="profile.timeout_notice"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Having trouble loading your profile — you can re-enter your details
            below and save them.
          </span>
        </div>
      )}

      {/* Pending save notice — profile save failed during onboarding */}
      {showPendingNotice && (
        <div
          className="px-4 py-3 flex items-start gap-2 text-xs"
          style={{
            background: "oklch(0.97 0.015 50)",
            borderBottom: "1px solid oklch(0.85 0.04 50)",
            color: "oklch(0.40 0.08 50)",
          }}
          data-ocid="profile.pending_notice"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Your profile details aren't saved yet — please fill them in below.
          </span>
        </div>
      )}

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        <Card data-ocid="profile.form_card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {field(
              "name",
              "Full Name",
              "text",
              <User className="h-4 w-4" />,
              "Jane Smith",
            )}
            {field(
              "companyName",
              "Company Name",
              "text",
              <Building2 className="h-4 w-4" />,
              "Acme Sales LLC",
            )}
            {field(
              "phone",
              "Phone Number",
              "tel",
              <Phone className="h-4 w-4" />,
              "(555) 000-0000",
            )}
            {field(
              "email",
              "Email Address",
              "email",
              <Mail className="h-4 w-4" />,
              "jane@acme.com",
            )}
            {field(
              "website",
              "Website (optional)",
              "url",
              undefined,
              "https://acme.com",
            )}
            {field(
              "referredBy",
              "Who Referred You? (optional)",
              "text",
              undefined,
              "Name or company",
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="hearAboutUs"
                className="text-sm font-medium text-gray-700"
              >
                How did you hear about us?{" "}
                <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <select
                id="hearAboutUs"
                value={
                  (form as unknown as Record<string, string>).hearAboutUs || ""
                }
                onChange={(e) =>
                  setForm((f) => ({ ...f, hearAboutUs: e.target.value }))
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select an option</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Perplexity">Perplexity</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral/Word of mouth">
                  Referral / Word of mouth
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Phone setup link */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 text-xs border-primary/30 text-primary hover:bg-primary/5 h-9"
            onClick={() => navigate({ to: "/twilio-setup" })}
            data-ocid="profile.phone_setup_link"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Phone &amp; Calling Setup
          </Button>
        </div>

        {/* Save error */}
        {saveError && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg text-sm"
            style={{
              background: "oklch(0.95 0.02 30)",
              border: "1px solid oklch(0.75 0.12 30)",
              color: "oklch(0.35 0.10 30)",
            }}
            data-ocid="profile.error_state"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium">Could not save profile</p>
              <p className="text-xs mt-0.5 opacity-80">{saveError}</p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              data-ocid="profile.retry_button"
              className="shrink-0 flex items-center gap-1 text-xs font-semibold underline"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}

        {/* Primary action */}
        <Button
          data-ocid="profile.save_button"
          className="w-full font-semibold py-5 text-base gap-2"
          style={{
            background: isNewUser ? "oklch(0.56 0.16 44)" : undefined,
          }}
          onClick={handleSave}
          disabled={saveProfile.isPending}
        >
          {saveProfile.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </span>
          ) : isNewUser ? (
            <span className="flex items-center gap-2">
              Save &amp; Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          )}
        </Button>

        {/* Skip to dashboard */}
        <button
          type="button"
          data-ocid="profile.skip_dashboard_button"
          onClick={goToDashboard}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          {isNewUser
            ? "Skip for now — go to Dashboard →"
            : "← Back to Dashboard"}
        </button>
      </div>
    </div>
  );
}
