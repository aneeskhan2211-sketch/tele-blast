import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Check, Copy, DollarSign, Users, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PublicNavBar } from "../components/PublicNavBar";
import { useRegisterAffiliate } from "../hooks/useAffiliate";

const NAVY = "oklch(0.22 0.12 264)";
const NAVY_BORDER = "oklch(0.30 0.12 264)";
const ORANGE = "#f97316";

const COMMISSION_HIGHLIGHTS = [
  {
    icon: DollarSign,
    title: "25% Commission",
    desc: "$3.75 per $15/mo referral",
  },
  {
    icon: Users,
    title: "Unlimited Referrals",
    desc: "No cap on how much you can earn",
  },
  {
    icon: Zap,
    title: "PayPal Payouts",
    desc: "Paid 30 days after each sale",
  },
];

export default function AffiliateSignupPage() {
  const { mutateAsync: register, isPending } = useRegisterAffiliate();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState<{ referralCode: string } | null>(null);

  const referralUrl = success
    ? `https://www.tele-blast.com?affiliate=${success.referralCode}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the affiliate terms to continue.");
      return;
    }
    try {
      const profile = await register({ name, email, paypalEmail });
      setSuccess({ referralCode: profile.referralCode });
      // Redirect to dashboard after short delay
      setTimeout(() => navigate({ to: "/affiliate" }), 3000);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: NAVY }}>
      {/* Unified public nav — matches all other public pages */}
      <PublicNavBar
        activePath="/affiliate-signup"
        ocidPrefix="affiliate-signup"
      />

      {/* Content */}
      <div className="flex-1 px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: ORANGE }}
            >
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Join the Tele-Blast Affiliate Program — Earn with Cell Phone CRM
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-lg mx-auto">
              Refer sales agents to Tele-Blast and earn 25% on every $15/month
              subscription — paid monthly via PayPal.
            </p>
          </div>

          {/* Commission highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {COMMISSION_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-5 flex flex-col items-center text-center gap-2"
                style={{
                  background: "oklch(0.28 0.12 264)",
                  border: "1px solid oklch(0.35 0.12 264)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: `${ORANGE}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-white/60 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          {/* Two-column layout on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* How it works */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">How it works</h2>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Sign up below",
                    desc: "Enter your details and PayPal email.",
                  },
                  {
                    step: "2",
                    title: "Get your link",
                    desc: "Share your unique referral link anywhere — email, social, website.",
                  },
                  {
                    step: "3",
                    title: "Earn 25%",
                    desc: "When someone subscribes through your link, you earn $3.75/month.",
                  },
                  {
                    step: "4",
                    title: "Get paid via PayPal",
                    desc: "Commissions are paid to your PayPal address 30 days after each sale.",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-3 items-start">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: ORANGE, color: "#fff" }}
                    >
                      {step}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{title}</p>
                      <p className="text-white/60 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payout breakdown */}
              <div
                className="rounded-xl p-4 mt-4"
                style={{
                  background: "oklch(0.28 0.12 264)",
                  border: "1px solid oklch(0.35 0.12 264)",
                }}
              >
                <p className="text-white font-semibold text-sm mb-3">
                  Payout breakdown
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Pro Plan ($15/mo)</span>
                  <span className="font-bold" style={{ color: ORANGE }}>
                    $3.75/mo
                  </span>
                </div>
                <p className="text-white/40 text-xs mt-3">
                  Paid via PayPal · 30 days after each sale
                </p>
              </div>

              {/* Sales agent images */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <figure className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/assets/generated/insurance-agent-mobile-leads.dim_800x600.jpg"
                    alt="Professional insurance agent using cell phone CRM to manage leads and close more policies"
                    className="w-full h-36 object-cover object-center"
                    loading="lazy"
                    width="800"
                    height="225"
                  />
                  <figcaption className="sr-only">
                    Insurance agent using Tele-Blast cell phone CRM
                  </figcaption>
                </figure>
                <figure className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/assets/generated/sales-manager-sms-blast-phone.dim_800x600.jpg"
                    alt="Sales manager reviewing affiliate commission earnings on Tele-Blast cell phone CRM dashboard"
                    className="w-full h-36 object-cover object-center"
                    loading="lazy"
                    width="800"
                    height="225"
                  />
                  <figcaption className="sr-only">
                    Sales manager reviewing Tele-Blast affiliate earnings
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Signup card */}
            <div
              className="rounded-2xl border p-8 shadow-xl"
              style={{ background: "#fff", borderColor: NAVY_BORDER }}
            >
              {success ? (
                /* ── Success state ── */
                <div
                  className="text-center space-y-5"
                  data-ocid="affiliate-signup.success_state"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: `${ORANGE}20` }}
                  >
                    <Check className="w-6 h-6" style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      You're in! 🎉
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Your affiliate account is ready. Here's your referral
                      link:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 rounded-lg border p-3 font-mono text-xs break-all text-left select-all"
                      style={{
                        background: "oklch(0.97 0 0)",
                        borderColor: "oklch(0.88 0 0)",
                      }}
                      data-ocid="affiliate-signup.referral-link"
                    >
                      {referralUrl}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="shrink-0 gap-1.5"
                      data-ocid="affiliate-signup.copy_button"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Redirecting to your dashboard in a moment…
                  </p>

                  <Link to="/affiliate">
                    <Button
                      className="w-full font-semibold text-white"
                      style={{ background: NAVY }}
                      data-ocid="affiliate-signup.go-to-dashboard-btn"
                    >
                      Go to Affiliate Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                /* ── Form ── */
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="affiliate-signup.form"
                >
                  <div className="text-center mb-2">
                    <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                      Join the Affiliate Program
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Create your account and get your referral link instantly
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="aff-name" className="text-sm font-medium">
                      Full Name <span style={{ color: ORANGE }}>*</span>
                    </Label>
                    <Input
                      id="aff-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      data-ocid="affiliate-signup.name.input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="aff-email" className="text-sm font-medium">
                      Email <span style={{ color: ORANGE }}>*</span>
                    </Label>
                    <Input
                      id="aff-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-ocid="affiliate-signup.email.input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="aff-paypal" className="text-sm font-medium">
                      PayPal Email <span style={{ color: ORANGE }}>*</span>
                    </Label>
                    <Input
                      id="aff-paypal"
                      type="email"
                      placeholder="jane@paypal.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      required
                      data-ocid="affiliate-signup.paypal-email.input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Commissions are paid to this PayPal address. Can be
                      different from your login email.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                      id="aff-terms"
                      checked={agreed}
                      onCheckedChange={(v) => setAgreed(v === true)}
                      data-ocid="affiliate-signup.terms.checkbox"
                    />
                    <Label
                      htmlFor="aff-terms"
                      className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                    >
                      I agree to the Tele-Blast Affiliate Terms and Conditions:
                      25% commission on referred subscriptions, paid manually
                      via PayPal 30 days after each sale.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-semibold text-white mt-2"
                    style={{ background: ORANGE }}
                    disabled={
                      isPending || !name || !email || !paypalEmail || !agreed
                    }
                    data-ocid="affiliate-signup.submit_button"
                  >
                    {isPending
                      ? "Creating account…"
                      : "Join & Get My Referral Link"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Already an affiliate?{" "}
                    <Link
                      to="/affiliate"
                      className="underline hover:opacity-80"
                      style={{ color: NAVY }}
                      data-ocid="affiliate-signup.dashboard-link"
                    >
                      View your dashboard
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
