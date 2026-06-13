import { j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { c as useNavigate } from "./vendor-router-gX3Sk5jz.js";
import { P as PublicNavBar } from "./PublicNavBar-Dh9EDIh3.js";
import { a5 as useSEO, J as STRIPE_PAYMENT_LINK } from "./index-DsrDu9m3.js";
import { T as TrendingUp, H as Check } from "./vendor-DT3DREzx.js";
import "./vendor-ic-W9L5KZ_F.js";
const PRO_FEATURES = [
  "Leads & Pipeline Management",
  "Power Dialer — calls & texts only",
  "Manual SMS Templates",
  "CSV Lead Import (up to 500 leads)",
  "Lead Queues (New Lead, Follow-Up, Birthday)",
  "Multiple Pipelines",
  "Do Not Call (DNC) Management",
  "Google Voice & cell phone integration",
  "Affiliate Program — 25% commission"
];
function PricingPage() {
  const navigate = useNavigate();
  useSEO({
    title: "Pricing | Tele-Blast — $15/Month Cell Phone CRM for Sales Teams",
    description: "Tele-Blast utilizes your cell phone & turns into your own personal business CRM. Get full access to power dialer, SMS blast, lead management, and more for just $15/month. No contracts. Cancel anytime.",
    canonical: "https://www.tele-blast.com/pricing",
    ogTitle: "Tele-Blast Pricing — $15/Month Cell Phone CRM",
    ogDescription: "Everything you need to automate your business communication for $15/month. Leads, Pipeline, Power Dialer, SMS Blast, and more.",
    ogUrl: "https://www.tele-blast.com/pricing",
    ogType: "website",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Tele-Blast Pro",
      description: "Cell phone CRM with power dialer, SMS blast, lead management, pipeline tracking, and automated follow-up queues for sales teams.",
      brand: {
        "@type": "Brand",
        name: "Tele-Blast"
      },
      offers: {
        "@type": "Offer",
        price: "15",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://www.tele-blast.com/pricing",
        seller: {
          "@type": "Organization",
          name: "Tele-Blast"
        }
      }
    })
  });
  function handleGetStarted() {
    const link = STRIPE_PAYMENT_LINK;
    if (link.startsWith("#") || link.includes("REPLACE")) {
      navigate({ to: "/pre-signup" });
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col overflow-x-hidden",
      style: { minHeight: "100dvh", background: "oklch(0.97 0 0)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/pricing", ocidPrefix: "pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-14 px-5 text-center pt-28",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.12 264) 100%)"
            },
            "data-ocid": "pricing.hero.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider",
                  style: {
                    background: "oklch(0.56 0.16 44 / 0.18)",
                    color: "oklch(0.82 0.14 44)",
                    border: "1px solid oklch(0.56 0.16 44 / 0.3)"
                  },
                  children: "Simple, Transparent Pricing"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight",
                  "data-ocid": "pricing.hero.headline",
                  children: "One Plan. Everything Included. — $15/mo Cell Phone CRM"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mx-auto", children: "All the tools a sales team needs to close more deals — for a flat $15/month. No contracts. Cancel anytime." })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-12 sm:py-16",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "pricing.cards.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-3xl overflow-hidden shadow-xl",
                  style: {
                    border: "2.5px solid oklch(0.56 0.16 44)",
                    background: "oklch(0.99 0 0)"
                  },
                  "data-ocid": "pricing.tier_card.1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-7 pt-7 pb-5",
                        style: { borderBottom: "1px solid oklch(0.93 0 0)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                              style: { background: "oklch(0.22 0.12 264 / 0.08)" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                TrendingUp,
                                {
                                  className: "w-5 h-5",
                                  style: { color: "oklch(0.22 0.12 264)" }
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs font-bold uppercase tracking-widest mb-1",
                              style: { color: "oklch(0.56 0.16 44)" },
                              children: "Pro Plan"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-5xl font-extrabold leading-none",
                                style: { color: "oklch(0.22 0.12 264)" },
                                children: "$15"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-base font-medium pb-1",
                                style: { color: "oklch(0.52 0 0)" },
                                children: "/month"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm leading-relaxed",
                              style: { color: "oklch(0.48 0 0)" },
                              children: "Your cell phone becomes your own personal business CRM — power dialer, SMS blast, and lead pipeline in one."
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-7 py-5 space-y-2.5", children: PRO_FEATURES.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          style: { background: "oklch(0.56 0.16 44 / 0.12)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Check,
                            {
                              className: "w-3 h-3",
                              style: { color: "oklch(0.46 0.16 44)" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm font-medium leading-snug",
                          style: { color: "oklch(0.28 0 0)" },
                          children: feature
                        }
                      )
                    ] }, feature)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 pb-7 pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-full font-bold text-base py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white shadow-md min-h-[48px]",
                          style: { background: "oklch(0.22 0.12 264)" },
                          onClick: handleGetStarted,
                          "data-ocid": "pricing.tier_cta.1",
                          children: "Get Started — $15/mo"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-center mt-2.5",
                          style: { color: "oklch(0.58 0 0)" },
                          children: "Cancel anytime · Powered by Stripe"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/sales-agent-cell-phone-crm.dim_800x600.jpg",
                      alt: "Sales agent using cell phone CRM to manage leads and SMS blast campaigns on Tele-Blast",
                      className: "w-full h-44 object-cover object-center",
                      loading: "lazy",
                      width: "800",
                      height: "275"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Professional sales agent using Tele-Blast cell phone CRM" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/sales-rep-mobile-crm-calls.dim_800x600.jpg",
                      alt: "Professional sales representative using mobile CRM on smartphone for power dialer and lead pipeline management",
                      className: "w-full h-44 object-cover object-center",
                      loading: "lazy",
                      width: "800",
                      height: "275"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales rep using Tele-Blast mobile CRM for power dialing" })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "px-5 py-8 text-center mt-auto",
            style: { background: "oklch(0.22 0.12 264)" },
            "data-ocid": "pricing.footer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "oklch(0.98 0 0 / 0.5)" }, children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " Tele-Blast. All rights reserved. ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.hostname : ""
                  )}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:opacity-80 transition-opacity",
                  style: { color: "oklch(0.98 0 0 / 0.5)" },
                  children: "Built with love using caffeine.ai"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  PricingPage as default
};
