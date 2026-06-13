import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { c as useNavigate } from "./vendor-router-gX3Sk5jz.js";
import { d as useSubscription } from "./index-DsrDu9m3.js";
import { T as TrendingUp, a9 as LogIn, aa as UserPlus, X, ab as Menu } from "./vendor-DT3DREzx.js";
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Video", to: "/video" },
  { label: "Pricing", to: "/pricing" },
  { label: "Affiliate", to: "/affiliate-signup" }
];
function PublicNavBar({
  activePath,
  ocidPrefix = "public"
}) {
  const navigate = useNavigate();
  const { login } = useInternetIdentity();
  const { subscriptionTier, isLoading: subLoading } = useSubscription();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [authInProgress, setAuthInProgress] = reactExports.useState(false);
  const loginCalledRef = reactExports.useRef(false);
  async function handleAuth() {
    if (loginCalledRef.current || authInProgress) return;
    loginCalledRef.current = true;
    setAuthInProgress(true);
    try {
      await login();
      try {
        sessionStorage.setItem("tele_blast_just_logged_in", "true");
      } catch {
      }
      if (!subLoading && subscriptionTier && subscriptionTier !== "none") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/payment" });
      }
    } catch {
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "fixed top-0 left-0 right-0 z-50 border-b",
      style: {
        background: "oklch(0.22 0.12 264)",
        borderColor: "oklch(0.28 0.12 264)"
      },
      "data-ocid": `${ocidPrefix}.header`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 shrink-0",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": `${ocidPrefix}.header.logo_button`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-7 h-7 rounded flex items-center justify-center",
                    style: { background: "oklch(0.56 0.16 44)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-base tracking-tight", children: "Tele-Blast" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-6 flex-1 ml-8", children: NAV_LINKS.map(({ label, to }) => {
            const isActive = activePath === to;
            return isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-semibold text-white",
                "aria-current": "page",
                children: label
              },
              to
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                onClick: () => navigate({ to }),
                "data-ocid": `${ocidPrefix}.nav.${label.toLowerCase()}_link`,
                children: label
              },
              to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 min-h-[40px]",
                onClick: handleAuth,
                "data-ocid": `${ocidPrefix}.header.login_button`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Log In" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md",
                style: { background: "oklch(0.56 0.16 44)" },
                onClick: handleAuth,
                "data-ocid": `${ocidPrefix}.header.get_started_button`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Get Started" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                onClick: () => setMobileOpen((v) => !v),
                "aria-label": mobileOpen ? "Close menu" : "Open menu",
                "aria-expanded": mobileOpen,
                "data-ocid": `${ocidPrefix}.header.mobile_menu_toggle`,
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "md:hidden border-t px-4 py-3 flex flex-col gap-1",
            style: {
              background: "oklch(0.25 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            children: [
              NAV_LINKS.map(({ label, to }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                  onClick: () => {
                    setMobileOpen(false);
                    navigate({ to });
                  },
                  "data-ocid": `${ocidPrefix}.mobile_nav.${label.toLowerCase()}_link`,
                  children: label
                },
                to
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-2 pt-3 flex flex-col gap-2 border-t",
                  style: { borderColor: "oklch(0.98 0 0 / 0.1)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => {
                          setMobileOpen(false);
                          handleAuth();
                        },
                        "data-ocid": `${ocidPrefix}.mobile_nav.login_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                          "Log In"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95",
                        style: { background: "oklch(0.56 0.16 44)" },
                        onClick: () => {
                          setMobileOpen(false);
                          handleAuth();
                        },
                        "data-ocid": `${ocidPrefix}.mobile_nav.get_started_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                          "Get Started"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  PublicNavBar as P
};
