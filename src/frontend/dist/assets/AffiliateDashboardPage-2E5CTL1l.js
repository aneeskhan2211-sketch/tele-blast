import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { S as Skeleton, B as Button, C as Card, E as CardContent, I as Input, L as Label } from "./index-DsrDu9m3.js";
import { L as Link } from "./vendor-router-gX3Sk5jz.js";
import { T as TrendingUp, a4 as RefreshCw, af as DollarSign, O as CircleCheckBig, M as Mail, aT as Copy, be as MousePointerClick, q as Users, t as ue, aj as CircleAlert } from "./vendor-DT3DREzx.js";
import { P as PublicNavBar } from "./PublicNavBar-Dh9EDIh3.js";
import { a as useAffiliate, b as useAffiliateStats, c as useEnrichedAffiliateStats, d as useUpdateAffiliatePaypalEmail } from "./useAffiliate-s2hD26ba.js";
import "./vendor-ic-W9L5KZ_F.js";
const NAVY = "oklch(0.22 0.12 264)";
const ORANGE = "#f97316";
function StatCard({
  label,
  value,
  icon: Icon,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border p-4 flex items-start gap-3",
      style: highlight ? { borderColor: ORANGE, background: `${ORANGE}08` } : {},
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            style: { background: highlight ? `${ORANGE}20` : `${NAVY}15` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                className: "w-4 h-4",
                style: { color: highlight ? ORANGE : NAVY }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: value })
        ] })
      ]
    }
  );
}
function formatUSD(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function ActivationPanel() {
  const [paypalEmail, setPaypalEmail] = reactExports.useState("");
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const { mutateAsync: updatePaypal, isPending } = useUpdateAffiliatePaypalEmail();
  async function handleActivate(e) {
    e.preventDefault();
    if (!paypalEmail.trim()) {
      ue.error("Please enter your PayPal email address.");
      return;
    }
    try {
      await updatePaypal(paypalEmail.trim());
      setConfirmed(true);
      ue.success(
        "Affiliate account activated! Your referral link is ready."
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Activation failed. Try again."
      );
    }
  }
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-6 text-center",
        "data-ocid": "affiliate-dashboard.activation.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-full flex items-center justify-center",
              style: { background: `${ORANGE}20` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6", style: { color: ORANGE } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Account Activated!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Refresh the page to see your full dashboard and referral link." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => window.location.reload(),
              className: "gap-1.5",
              "data-ocid": "affiliate-dashboard.activation.reload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Reload Dashboard"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleActivate,
      className: "space-y-4",
      "data-ocid": "affiliate-dashboard.activation.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl border border-yellow-200 bg-yellow-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-yellow-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-yellow-800", children: "One step to activate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-700 mt-0.5", children: "Your affiliate account was automatically created. Enter your PayPal email below to activate it and receive your referral link." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "activate-paypal", className: "text-sm font-semibold", children: "PayPal Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "activate-paypal",
              type: "email",
              placeholder: "you@paypal.com",
              value: paypalEmail,
              onChange: (e) => setPaypalEmail(e.target.value),
              required: true,
              "data-ocid": "affiliate-dashboard.activation.paypal_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Commissions are sent to this PayPal address 30 days after each sale. Can differ from your login email." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending || !paypalEmail.trim(),
            className: "w-full font-semibold text-white",
            style: { background: ORANGE },
            "data-ocid": "affiliate-dashboard.activation.submit_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
              "Activating…"
            ] }) : "Activate Now"
          }
        )
      ]
    }
  );
}
function AffiliateDashboardPage() {
  const { data: affiliate, isLoading: affiliateLoading } = useAffiliate();
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const { data: enrichedStats = [] } = useEnrichedAffiliateStats();
  const [copied, setCopied] = reactExports.useState(false);
  const [codeCopied, setCodeCopied] = reactExports.useState(false);
  const referralUrl = affiliate ? `https://www.tele-blast.com?affiliate=${affiliate.referralCode}` : "";
  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      ue.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const handleCopyCode = () => {
    if (!affiliate) return;
    navigator.clipboard.writeText(affiliate.referralCode).then(() => {
      setCodeCopied(true);
      ue.success("Referral code copied!");
      setTimeout(() => setCodeCopied(false), 2e3);
    });
  };
  if (affiliateLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen",
        "data-ocid": "affiliate-dashboard.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/affiliate", ocidPrefix: "affiliate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 pt-20 pb-8 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" })
          ] })
        ]
      }
    );
  }
  if (!affiliate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "affiliate-dashboard.setup_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/affiliate", ocidPrefix: "affiliate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex items-center justify-center",
            style: { background: NAVY },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", children: "Setting up your affiliate account…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your affiliate account is being created automatically. If this persists, try signing out and back in, or visit the sign-up page to register." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => window.location.reload(),
              className: "gap-1.5",
              "data-ocid": "affiliate-dashboard.setup.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Retry"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/affiliate-signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "font-semibold text-white",
              style: { background: ORANGE },
              "data-ocid": "affiliate-dashboard.setup.signup_link",
              children: "Set Up Manually"
            }
          ) })
        ] })
      ] })
    ] });
  }
  const isActive = affiliate.paypalEmail && affiliate.paypalEmail.trim() !== "";
  if (!isActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen",
        "data-ocid": "affiliate-dashboard.pending_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/affiliate", ocidPrefix: "affiliate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 pt-20 pb-8 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  style: { background: NAVY },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Affiliate Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: affiliate.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200", children: "Pending Activation" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "affiliate-dashboard.activation.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-7 h-7 rounded-lg flex items-center justify-center",
                    style: { background: `${ORANGE}20` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4", style: { color: ORANGE } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Activate Your Affiliate Account" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ActivationPanel, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4 text-sm",
                style: {
                  background: `${NAVY}06`,
                  border: `1px solid ${NAVY}20`,
                  color: "oklch(0.38 0.06 264)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Once activated you get:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-0.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Your unique referral link" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Real-time click & conversion tracking" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 25% commission ($7.50/mo per $30 plan referral)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• PayPal payouts 30 days after each sale" })
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  const pendingTotal = stats ? Number(stats.pendingAmount) + Number(stats.readyAmount) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "affiliate-dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/affiliate", ocidPrefix: "affiliate" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 pt-20 pb-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Affiliate Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            "Welcome back, ",
            affiliate.name
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold bg-green-100 text-green-800 border border-green-200 shrink-0 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
          "Active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "affiliate-dashboard.profile.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-7 h-7 rounded-lg flex items-center justify-center",
              style: { background: NAVY },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Your Affiliate Profile" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: affiliate.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              affiliate.email
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PayPal Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: affiliate.paypalEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Referral Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "code",
                {
                  className: "text-sm font-mono font-semibold px-2 py-0.5 rounded",
                  style: { background: `${NAVY}10`, color: NAVY },
                  children: affiliate.referralCode
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyCode,
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Copy referral code",
                  "data-ocid": "affiliate-dashboard.referral-code.copy_button",
                  children: codeCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Your Referral Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                readOnly: true,
                value: referralUrl,
                className: "font-mono text-sm bg-muted",
                "data-ocid": "affiliate-dashboard.referral-link.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleCopy,
                className: "shrink-0 gap-1.5",
                "data-ocid": "affiliate-dashboard.referral-link.copy_button",
                children: [
                  copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                  copied ? "Copied!" : "Copy"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share this link on social media, email, or your website. When someone subscribes using your link, you earn 25% commission." })
        ] })
      ] }) }),
      statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
          "data-ocid": "affiliate-dashboard.stats.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Clicks",
                value: Number(stats?.totalClicks ?? 0),
                icon: MousePointerClick
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Conversions",
                value: Number(stats?.totalConversions ?? 0),
                icon: Users
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Pending Earnings",
                value: `$${(pendingTotal / 100).toFixed(2)}`,
                icon: DollarSign,
                highlight: pendingTotal > 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Paid",
                value: `$${(Number(stats?.paidAmount ?? 0) / 100).toFixed(2)}`,
                icon: CircleCheckBig
              }
            )
          ]
        }
      ),
      !statsLoading && stats && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-3 gap-3",
          "data-ocid": "affiliate-dashboard.earnings.section",
          children: [
            {
              label: "Pending",
              amount: stats.pendingAmount,
              style: "bg-yellow-50 border-yellow-200 text-yellow-800"
            },
            {
              label: "Ready to Pay",
              amount: stats.readyAmount,
              style: "border-orange-200 text-white",
              bgStyle: { background: ORANGE }
            },
            {
              label: "Paid Out",
              amount: stats.paidAmount,
              style: "bg-green-50 border-green-200 text-green-800"
            }
          ].map(({ label, amount, style, bgStyle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-4 text-center ${style}`,
              style: bgStyle,
              "data-ocid": `affiliate-dashboard.earnings.${label.toLowerCase().replace(/\s/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium opacity-80 mb-1", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: formatUSD(amount) })
              ]
            },
            label
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "affiliate-dashboard.paypal.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
            style: { background: `${ORANGE}20` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4", style: { color: ORANGE } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Payout Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            "PayPal:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: affiliate.paypalEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Payouts are sent manually to this address 30 days after each sale." })
        ] })
      ] }) }),
      (() => {
        const waitingCents = enrichedStats.filter((e) => e.status === "pending" || e.status === "ready").reduce((sum, e) => sum + Number(e.commissionAmount), 0);
        const paidCents = enrichedStats.filter((e) => e.status === "paid").reduce((sum, e) => sum + Number(e.commissionAmount), 0);
        return enrichedStats.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 gap-3",
            "data-ocid": "affiliate-dashboard.enriched-earnings.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Waiting to Be Paid",
                  value: `${(waitingCents / 100).toFixed(2)}`,
                  icon: DollarSign,
                  highlight: waitingCents > 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Total Paid Out",
                  value: `${(paidCents / 100).toFixed(2)}`,
                  icon: CircleCheckBig
                }
              )
            ]
          }
        ) : null;
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "affiliate-dashboard.commissions.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-3", children: "Commission History" }),
        statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, i)) }) : enrichedStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-muted/40 rounded-xl border p-8 text-center",
            "data-ocid": "affiliate-dashboard.commissions.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No commissions yet. Share your referral link to start earning!" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Referred Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell", children: "Business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground", children: "Purchased" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Waiting to Be Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground", children: "Paid" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: enrichedStats.map((e, idx) => {
            const isPending = e.status === "pending" || e.status === "ready";
            const isPaid = e.status === "paid";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b last:border-0 hover:bg-muted/20 transition-colors",
                "data-ocid": `affiliate-dashboard.commissions.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: e.referredName || "Unknown" }),
                    (e.referredEmail || e.referredPhone) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: [e.referredEmail, e.referredPhone].filter(Boolean).join(" · ") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: e.referredBizName || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: e.hasPurchased ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700 border border-green-200", children: "Yes" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-muted text-muted-foreground border border-border", children: "No" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-foreground", children: isPending ? formatUSD(e.commissionAmount) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold", children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-700", children: formatUSD(e.commissionAmount) }) : "—" })
                ]
              },
              e.newUserPrincipal || idx
            );
          }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AffiliateDashboardPage as default
};
