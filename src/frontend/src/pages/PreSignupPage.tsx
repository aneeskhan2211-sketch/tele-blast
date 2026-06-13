/**
 * PreSignupPage — shown BEFORE Internet Identity.
 *
 * Flow:
 *  1. User fills in Business Name, Full Name, Phone, Email
 *  2. On submit: data saved to sessionStorage as 'pendingProfile' JSON
 *  3. login() from useInternetIdentity is called directly
 *  4. After II completes, LandingPage post-auth effect routes to /activate-new
 *
 * If the user is already authenticated, redirect immediately based on tier.
 * No cookies. Statically imported in App.tsx.
 */
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Mail,
  Phone,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSubscription } from "../hooks/useSubscription";

const BYPASS_EMAIL = "mikebendett@gmail.com";

interface FormData {
  businessName: string;
  fullName: string;
  phone: string;
  email: string;
}

interface FormErrors {
  businessName?: string;
  fullName?: string;
  phone?: string;
  email?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.businessName.trim())
    errors.businessName = "Business name is required.";
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  return errors;
}

export default function PreSignupPage() {
  const navigate = useNavigate();
  const { identity, loginStatus, login } = useInternetIdentity();
  const { subscriptionTier, isFreshlyLoaded } = useSubscription();

  const [form, setForm] = useState<FormData>({
    businessName: "",
    fullName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const loginCalledRef = useRef(false);

  // Already authenticated — route appropriately
  useEffect(() => {
    if (loginStatus === "initializing") return;
    if (!identity) return;
    if (!isFreshlyLoaded) return;

    if (subscriptionTier !== "none") {
      navigate({ to: "/dashboard", replace: true });
    } else {
      navigate({ to: "/activate-new", replace: true });
    }
  }, [identity, loginStatus, isFreshlyLoaded, subscriptionTier, navigate]);

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || loginCalledRef.current) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginCalledRef.current = true;
    setSubmitting(true);

    // Save form data to sessionStorage before triggering II
    try {
      sessionStorage.setItem(
        "pendingProfile",
        JSON.stringify({
          businessName: form.businessName.trim(),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
        }),
      );
      // Set the just-logged-in flag so ProtectedRoute and post-auth logic can
      // distinguish a fresh login from an already-authenticated page visit.
      sessionStorage.setItem("tele_blast_just_logged_in", "true");
      // Also set a flag so ActivateNewPage knows it came from this form
      sessionStorage.setItem("tele_blast_from_presignup", "true");
    } catch {
      // Private browsing — continue anyway
    }

    try {
      await login();
      // After login completes the useEffect above (or LandingPage post-auth effect)
      // will route to /activate-new. If already authenticated, navigate there now.
      if (identity) {
        navigate({ to: "/activate-new", replace: true });
      }
    } catch {
      // User cancelled II — reset
    } finally {
      loginCalledRef.current = false;
      setSubmitting(false);
    }
  }

  // Check if this is the bypass email
  const pendingEmail = form.email.trim().toLowerCase();
  const isBypass = pendingEmail === BYPASS_EMAIL;

  if (loginStatus === "initializing") {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
      >
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-10"
      style={{ minHeight: "100dvh", background: "oklch(0.22 0.12 264)" }}
      data-ocid="presignup.page"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
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
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "oklch(0.99 0 0)" }}
        data-ocid="presignup.card"
      >
        {/* Card header */}
        <div
          className="px-6 py-5 text-center"
          style={{ background: "oklch(0.24 0.10 264)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white mb-1">
            Create Your Account
          </h1>
          <p className="text-white/60 text-xs leading-relaxed">
            Tell us about yourself — then we'll set up your secure ID
          </p>
        </div>

        {/* Step indicator */}
        <div
          className="flex items-center gap-0 text-[11px] font-semibold"
          style={{ borderBottom: "1px solid oklch(0.92 0 0)" }}
        >
          {[
            { num: 1, label: "Your Profile", active: true },
            { num: 2, label: "Create ID", active: false },
            { num: 3, label: "Subscribe", active: false },
          ].map((step, i) => (
            <div
              key={step.num}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
              style={{
                background: step.active
                  ? "oklch(0.56 0.16 44 / 0.08)"
                  : undefined,
                color: step.active ? "oklch(0.46 0.16 44)" : "oklch(0.60 0 0)",
                borderRight: i < 2 ? "1px solid oklch(0.92 0 0)" : undefined,
              }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  background: step.active
                    ? "oklch(0.56 0.16 44)"
                    : "oklch(0.88 0 0)",
                  color: step.active ? "white" : "oklch(0.55 0 0)",
                }}
              >
                {step.num}
              </span>
              {step.label}
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-6 space-y-4"
          noValidate
        >
          {/* Business Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="presignup-business"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Business Name{" "}
              <span style={{ color: "oklch(0.46 0.18 22)" }}>*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="presignup-business"
                type="text"
                autoComplete="organization"
                placeholder="Acme Corp"
                value={form.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className={`h-11 pl-10 ${errors.businessName ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                disabled={submitting}
                data-ocid="presignup.business_name_input"
              />
            </div>
            {errors.businessName && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="presignup.business_name.field_error"
              >
                {errors.businessName}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="presignup-name"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Full Name <span style={{ color: "oklch(0.46 0.18 22)" }}>*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="presignup-name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={`h-11 pl-10 ${errors.fullName ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                disabled={submitting}
                data-ocid="presignup.full_name_input"
              />
            </div>
            {errors.fullName && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="presignup.full_name.field_error"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label
              htmlFor="presignup-phone"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Phone Number{" "}
              <span style={{ color: "oklch(0.46 0.18 22)" }}>*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="presignup-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`h-11 pl-10 ${errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                disabled={submitting}
                data-ocid="presignup.phone_input"
              />
            </div>
            {errors.phone && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="presignup.phone.field_error"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="presignup-email"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Email Address{" "}
              <span style={{ color: "oklch(0.46 0.18 22)" }}>*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="presignup-email"
                type="email"
                autoComplete="email"
                placeholder="jane@acmecorp.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`h-11 pl-10 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                disabled={submitting}
                data-ocid="presignup.email_input"
              />
            </div>
            {errors.email && (
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.46 0.18 22)" }}
                data-ocid="presignup.email.field_error"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[48px] text-white font-bold text-sm gap-2 mt-2"
            style={{
              background: submitting ? undefined : "oklch(0.56 0.16 44)",
            }}
            data-ocid="presignup.submit_button"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Opening Secure ID…
              </>
            ) : isBypass ? (
              <>
                <TrendingUp className="w-4 h-4" />
                Continue to Dashboard
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Continue to Create Your ID
              </>
            )}
          </Button>

          <p
            className="text-[11px] text-center"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Your data is private and stored securely on the Internet Computer.
          </p>
        </form>
      </div>

      {/* Back link */}
      <button
        type="button"
        className="mt-5 text-xs font-medium transition-opacity hover:opacity-80"
        style={{ color: "oklch(0.98 0 0 / 0.45)" }}
        onClick={() => navigate({ to: "/" })}
        data-ocid="presignup.back_link"
      >
        ← Back to home
      </button>
    </div>
  );
}
