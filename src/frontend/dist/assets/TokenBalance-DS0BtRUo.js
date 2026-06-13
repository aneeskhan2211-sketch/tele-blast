import { j as jsxRuntimeExports, r as reactExports } from "./vendor-react-CYgLKadW.js";
import { bd as Coins, X, Z as Zap, ag as Star, t as ue, bn as ShoppingCart } from "./vendor-DT3DREzx.js";
function usePurchaseTaiTokens() {
  return async (_packageId) => {
    throw new Error("Token purchases are not available on the $30 Pro plan.");
  };
}
function usePurchaseLtaiTokens() {
  return async (_packageId) => {
    throw new Error("Token purchases are not available on the $30 Pro plan.");
  };
}
const TAI_PACKAGES = [
  { packageId: "pkg_25", tokens: 25, price: 5, pricePerToken: "$0.20/token" },
  { packageId: "pkg_50", tokens: 50, price: 9, pricePerToken: "$0.18/token" },
  {
    packageId: "pkg_100",
    tokens: 100,
    price: 15,
    pricePerToken: "$0.15/token",
    highlight: true
  },
  {
    packageId: "pkg_200",
    tokens: 200,
    price: 25,
    pricePerToken: "$0.125/token"
  }
];
const LTAI_PACKAGES = [
  { packageId: "ltai_5", tokens: 5, price: 1.25, pricePerToken: "$0.25/token" },
  {
    packageId: "ltai_10",
    tokens: 10,
    price: 2.5,
    pricePerToken: "$0.25/token"
  },
  {
    packageId: "ltai_25",
    tokens: 25,
    price: 6.25,
    pricePerToken: "$0.25/token"
  }
];
function PackageCard({
  pkg,
  type,
  onPurchase
}) {
  const isHighlight = pkg.highlight;
  const [loading, setLoading] = reactExports.useState(false);
  async function handlePurchase() {
    setLoading(true);
    try {
      await onPurchase(pkg.packageId);
      ue.success(
        `${pkg.tokens} ${type === "ltai" ? "LtAI" : "tAI"} tokens added to your account!`
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Purchase failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative flex flex-col rounded-2xl border p-4 transition-all ${isHighlight ? "shadow-md" : "hover:shadow-sm"}`,
      style: isHighlight ? {
        border: "2px solid oklch(0.56 0.16 44)",
        background: "oklch(0.56 0.16 44 / 0.04)"
      } : {
        border: "1px solid oklch(0.91 0 0)",
        background: "oklch(0.99 0 0)"
      },
      "data-ocid": `buy-tokens.${type}-package-${pkg.packageId}`,
      children: [
        isHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold text-white",
            style: { background: "oklch(0.56 0.16 44)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
              "Best Value"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-lg flex items-center justify-center",
                style: {
                  background: type === "ltai" ? "oklch(0.95 0.06 85)" : "oklch(0.22 0.12 264 / 0.08)"
                },
                children: type === "ltai" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Zap,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.56 0.12 85)" }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Coins,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.22 0.12 264)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-foreground leading-none", children: [
                pkg.tokens,
                " ",
                type === "ltai" ? "LtAI" : "tAI",
                " tokens"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: pkg.pricePerToken })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-2xl font-extrabold",
              style: {
                color: isHighlight ? "oklch(0.56 0.16 44)" : "oklch(0.22 0.12 264)"
              },
              children: [
                "$",
                pkg.price % 1 === 0 ? pkg.price : pkg.price.toFixed(2)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handlePurchase,
            disabled: loading,
            className: "w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-95 mt-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            style: {
              background: isHighlight ? "oklch(0.56 0.16 44)" : "oklch(0.22 0.12 264)"
            },
            "data-ocid": `buy-tokens.purchase_button-${pkg.packageId}`,
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
              "Processing…"
            ] }) : "Purchase"
          }
        )
      ]
    }
  );
}
function BuyTokensModal({
  isOpen,
  onClose,
  showLtai = false
}) {
  const purchaseTai = usePurchaseTaiTokens();
  const purchaseLtai = usePurchaseLtaiTokens();
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.6)" },
      "data-ocid": "buy-tokens.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl",
          style: { background: "oklch(0.99 0 0)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4 sticky top-0 z-10",
                style: { background: "oklch(0.22 0.12 264)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5 text-white" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-white", children: "Buy AI Tokens" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "text-white/70 hover:text-white transition-colors rounded-lg p-1",
                      "aria-label": "Close",
                      "data-ocid": "buy-tokens.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-bold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Coins,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.22 0.12 264)" }
                      }
                    ),
                    "tAI Tokens — General AI"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Used for all AI features: templates, cold call scripts, ad copy, SEO, and smart search." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: TAI_PACKAGES.map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PackageCard,
                  {
                    pkg,
                    type: "tai",
                    onPurchase: purchaseTai
                  },
                  pkg.packageId
                )) })
              ] }),
              showLtai && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px w-full mb-6",
                    style: { background: "oklch(0.93 0 0)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-bold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.56 0.12 85)" }
                      }
                    ),
                    "LtAI Tokens — Landing Page AI"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Exclusively for AI-powered landing page customization (requires Pro + Landing plan or higher)." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: LTAI_PACKAGES.map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PackageCard,
                  {
                    pkg,
                    type: "ltai",
                    onPurchase: purchaseLtai
                  },
                  pkg.packageId
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-center rounded-xl px-4 py-3",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.05)",
                    color: "oklch(0.48 0.06 264)"
                  },
                  children: "Tokens are added immediately after payment. All purchases are final."
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function TokenBalance({ showLtai = false }) {
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-2",
        "data-ocid": "token-balance.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${"border-red-300 bg-red-50 text-red-700"}`,
              style: {},
              "data-ocid": "token-balance.tai",
              title: "General AI tokens (tAI)",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0 tAI tokens" })
              ]
            }
          ),
          showLtai && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${"border-red-300 bg-red-50 text-red-700"}`,
              "data-ocid": "token-balance.ltai",
              title: "Landing Page AI tokens (LtAI)",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0 LtAI tokens" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setModalOpen(true),
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90 active:scale-95",
              style: { background: "oklch(0.56 0.16 44)" },
              "data-ocid": "token-balance.buy_more_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5 shrink-0" }),
                "Buy More Credits"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-xs mt-1.5 flex items-center gap-1",
        style: { color: "oklch(0.52 0.18 22)" },
        "data-ocid": "token-balance.empty_state",
        children: [
          "You have 0 tAI tokens remaining.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "underline font-semibold hover:opacity-80",
              onClick: () => setModalOpen(true),
              children: "Purchase more to continue."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BuyTokensModal,
      {
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        showLtai
      }
    )
  ] });
}
export {
  TokenBalance as T
};
