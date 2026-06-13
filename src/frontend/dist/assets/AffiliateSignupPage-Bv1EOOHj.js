import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { B as Button, L as Label, I as Input, F as Checkbox } from "./index-DsrDu9m3.js";
import { c as useNavigate, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { af as DollarSign, q as Users, Z as Zap, H as Check, aT as Copy, t as ue } from "./vendor-DT3DREzx.js";
import { P as PublicNavBar } from "./PublicNavBar-Dh9EDIh3.js";
import { u as useRegisterAffiliate } from "./useAffiliate-s2hD26ba.js";
import "./vendor-ic-W9L5KZ_F.js";
const NAVY = "oklch(0.22 0.12 264)";
const NAVY_BORDER = "oklch(0.30 0.12 264)";
const ORANGE = "#f97316";
const COMMISSION_HIGHLIGHTS = [
  {
    icon: DollarSign,
    title: "25% Commission",
    desc: "$3.75 per $15/mo referral"
  },
  {
    icon: Users,
    title: "Unlimited Referrals",
    desc: "No cap on how much you can earn"
  },
  {
    icon: Zap,
    title: "PayPal Payouts",
    desc: "Paid 30 days after each sale"
  }
];
function AffiliateSignupPage() {
  const { mutateAsync: register, isPending } = useRegisterAffiliate();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [paypalEmail, setPaypalEmail] = reactExports.useState("");
  const [agreed, setAgreed] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(null);
  const referralUrl = success ? `https://www.tele-blast.com?affiliate=${success.referralCode}` : "";
  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      ue.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      ue.error("Please agree to the affiliate terms to continue.");
      return;
    }
    try {
      const profile = await register({ name, email, paypalEmail });
      setSuccess({ referralCode: profile.referralCode });
      setTimeout(() => navigate({ to: "/affiliate" }), 3e3);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", style: { background: NAVY }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PublicNavBar,
      {
        activePath: "/affiliate-signup",
        ocidPrefix: "affiliate-signup"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 py-12 pt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4",
            style: { background: ORANGE },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-7 h-7 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-white mb-3", children: "Join the Tele-Blast Affiliate Program — Earn with Cell Phone CRM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-base sm:text-lg max-w-lg mx-auto", children: "Refer sales agents to Tele-Blast and earn 25% on every $15/month subscription — paid monthly via PayPal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10", children: COMMISSION_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-5 flex flex-col items-center text-center gap-2",
          style: {
            background: "oklch(0.28 0.12 264)",
            border: "1px solid oklch(0.35 0.12 264)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center mb-1",
                style: { background: `${ORANGE}25` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", style: { color: ORANGE } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs", children: desc })
          ]
        },
        title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
            {
              step: "1",
              title: "Sign up below",
              desc: "Enter your details and PayPal email."
            },
            {
              step: "2",
              title: "Get your link",
              desc: "Share your unique referral link anywhere — email, social, website."
            },
            {
              step: "3",
              title: "Earn 25%",
              desc: "When someone subscribes through your link, you earn $3.75/month."
            },
            {
              step: "4",
              title: "Get paid via PayPal",
              desc: "Commissions are paid to your PayPal address 30 days after each sale."
            }
          ].map(({ step, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                style: { background: ORANGE, color: "#fff" },
                children: step
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium text-sm", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs mt-0.5", children: desc })
            ] })
          ] }, step)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 mt-4",
              style: {
                background: "oklch(0.28 0.12 264)",
                border: "1px solid oklch(0.35 0.12 264)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm mb-3", children: "Payout breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70", children: "Pro Plan ($15/mo)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: ORANGE }, children: "$3.75/mo" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-3", children: "Paid via PayPal · 30 days after each sale" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/insurance-agent-mobile-leads.dim_800x600.jpg",
                  alt: "Professional insurance agent using cell phone CRM to manage leads and close more policies",
                  className: "w-full h-36 object-cover object-center",
                  loading: "lazy",
                  width: "800",
                  height: "225"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Insurance agent using Tele-Blast cell phone CRM" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/sales-manager-sms-blast-phone.dim_800x600.jpg",
                  alt: "Sales manager reviewing affiliate commission earnings on Tele-Blast cell phone CRM dashboard",
                  className: "w-full h-36 object-cover object-center",
                  loading: "lazy",
                  width: "800",
                  height: "225"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales manager reviewing Tele-Blast affiliate earnings" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-2xl border p-8 shadow-xl",
            style: { background: "#fff", borderColor: NAVY_BORDER },
            children: success ? (
              /* ── Success state ── */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center space-y-5",
                  "data-ocid": "affiliate-signup.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-full flex items-center justify-center mx-auto",
                        style: { background: `${ORANGE}20` },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-6 h-6", style: { color: ORANGE } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "You're in! 🎉" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your affiliate account is ready. Here's your referral link:" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex-1 rounded-lg border p-3 font-mono text-xs break-all text-left select-all",
                          style: {
                            background: "oklch(0.97 0 0)",
                            borderColor: "oklch(0.88 0 0)"
                          },
                          "data-ocid": "affiliate-signup.referral-link",
                          children: referralUrl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          onClick: handleCopy,
                          className: "shrink-0 gap-1.5",
                          "data-ocid": "affiliate-signup.copy_button",
                          children: [
                            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                            copied ? "Copied!" : "Copy"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Redirecting to your dashboard in a moment…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/affiliate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: "w-full font-semibold text-white",
                        style: { background: NAVY },
                        "data-ocid": "affiliate-signup.go-to-dashboard-btn",
                        children: "Go to Affiliate Dashboard"
                      }
                    ) })
                  ]
                }
              )
            ) : (
              /* ── Form ── */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "space-y-5",
                  "data-ocid": "affiliate-signup.form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", style: { color: NAVY }, children: "Join the Affiliate Program" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Create your account and get your referral link instantly" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "aff-name", className: "text-sm font-medium", children: [
                        "Full Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "aff-name",
                          type: "text",
                          placeholder: "Jane Smith",
                          value: name,
                          onChange: (e) => setName(e.target.value),
                          required: true,
                          "data-ocid": "affiliate-signup.name.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "aff-email", className: "text-sm font-medium", children: [
                        "Email ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "aff-email",
                          type: "email",
                          placeholder: "jane@example.com",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          required: true,
                          "data-ocid": "affiliate-signup.email.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "aff-paypal", className: "text-sm font-medium", children: [
                        "PayPal Email ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "aff-paypal",
                          type: "email",
                          placeholder: "jane@paypal.com",
                          value: paypalEmail,
                          onChange: (e) => setPaypalEmail(e.target.value),
                          required: true,
                          "data-ocid": "affiliate-signup.paypal-email.input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Commissions are paid to this PayPal address. Can be different from your login email." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "aff-terms",
                          checked: agreed,
                          onCheckedChange: (v) => setAgreed(v === true),
                          "data-ocid": "affiliate-signup.terms.checkbox"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "aff-terms",
                          className: "text-sm leading-relaxed text-muted-foreground cursor-pointer",
                          children: "I agree to the Tele-Blast Affiliate Terms and Conditions: 25% commission on referred subscriptions, paid manually via PayPal 30 days after each sale."
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "w-full font-semibold text-white mt-2",
                        style: { background: ORANGE },
                        disabled: isPending || !name || !email || !paypalEmail || !agreed,
                        "data-ocid": "affiliate-signup.submit_button",
                        children: isPending ? "Creating account…" : "Join & Get My Referral Link"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                      "Already an affiliate?",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/affiliate",
                          className: "underline hover:opacity-80",
                          style: { color: NAVY },
                          "data-ocid": "affiliate-signup.dashboard-link",
                          children: "View your dashboard"
                        }
                      )
                    ] })
                  ]
                }
              )
            )
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AffiliateSignupPage as default
};
