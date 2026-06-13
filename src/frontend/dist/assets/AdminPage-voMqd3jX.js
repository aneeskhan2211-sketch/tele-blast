import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { K as useAllAffiliates, M as useAdminEnsureAffiliateRecord, S as Skeleton, B as Button, N as useAdminEnrichedPayouts, O as useMarkPayoutPaid, Q as useAllUsers, U as useGrantAdmin, V as useRevokeUserAccess, W as useRestoreUserAccess, H as useBackend, I as Input, X as useIsAdmin, Y as useCreatePreRegisteredUser, Z as useSetUserTier, _ as useGetPreRegisteredUsers, $ as useDeletePreRegisteredUser, a0 as useGetPackageConfig, a1 as useSetPackageEnabled, a2 as useGetShowComingSoonTeaser, a3 as useSetShowComingSoonTeaser, a4 as useAdminDeleteAllLeads } from "./index-DsrDu9m3.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { u as useQueryClient } from "./vendor-router-gX3Sk5jz.js";
import { n as Shield, J as CircleCheck, b8 as Wallet, q as Users, b9 as Clock, af as DollarSign, M as Mail, P as Phone, H as Check, a0 as CircleX, l as Lock, a3 as Plus, ba as Circle, t as ue, m as ChevronDown, bb as Globe, T as TrendingUp, aq as EyeOff, ar as Eye, L as LogOut, bc as LayoutList, aa as UserPlus, av as Trash2, Z as Zap, W as TriangleAlert, bd as Coins } from "./vendor-DT3DREzx.js";
const ADMIN_USERNAME = "telemaster";
const ADMIN_PASSWORD = "poop8877";
const ADMIN_SESSION_KEY = "adminAuthenticated";
function formatDate(ns) {
  return new Date(Number(ns)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatAgreementDate(ns) {
  const ms = typeof ns === "bigint" ? Number(ns) / 1e6 : ns / 1e6;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  const datePart = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timePart = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
  return `${datePart} ${timePart}`;
}
function getTierLabel(tier) {
  if (tier === "pro") return "Pro $30/mo";
  return tier;
}
const TIER_OPTIONS = [
  { value: "none", label: "No Access" },
  { value: "pro", label: "Pro — $30/month" }
];
function normalizeTier(raw) {
  if (raw === "pro") return "pro";
  return "none";
}
function TierSelector({
  user,
  idx
}) {
  const setTier = useSetUserTier();
  const backendTier = normalizeTier(user.subscriptionTier ?? "");
  const [selected, setSelected] = reactExports.useState(backendTier);
  const [feedbackMsg, setFeedbackMsg] = reactExports.useState(null);
  const [confirming, setConfirming] = reactExports.useState(false);
  const prevBackendTier = reactExports.useRef(backendTier);
  reactExports.useEffect(() => {
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
      setTimeout(() => {
        setConfirming(false);
        setFeedbackMsg("Plan updated ✓");
        ue.success(
          `Plan set to ${TIER_OPTIONS.find((o) => o.value === selected)?.label ?? selected}`
        );
        setTimeout(() => setFeedbackMsg(null), 4e3);
      }, 1500);
    } catch (err) {
      setConfirming(false);
      const msg = err instanceof Error ? err.message : "Failed to update plan";
      ue.error(msg);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-2 pt-2 border-t border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value: selected,
        onChange: (e) => setSelected(e.target.value),
        className: "h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 min-w-0 flex-1 sm:flex-none sm:w-52",
        "aria-label": "Select subscription plan",
        "data-ocid": `admin.users.tier_select.${idx + 1}`,
        children: TIER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleSetPlan,
        disabled: setTier.isPending || confirming,
        className: "h-8 px-3 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0",
        style: { background: "oklch(0.22 0.12 264)" },
        "data-ocid": `admin.users.set_plan_button.${idx + 1}`,
        children: setTier.isPending || confirming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
          confirming ? "Applying…" : "Saving…"
        ] }) : "Set Plan"
      }
    ),
    feedbackMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs font-medium flex items-center gap-1",
        style: { color: "oklch(0.46 0.14 160)" },
        "data-ocid": `admin.users.tier_success_state.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
          feedbackMsg
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-full text-[10px] text-muted-foreground mt-0.5", children: "Changes take effect within 1–2 seconds for the user" })
  ] });
}
function isPaidUser(user) {
  return user.subscriptionTier !== "none" && user.subscriptionTier !== "" && user.subscribedAt != null;
}
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  green
}) {
  const bg = green ? "oklch(0.46 0.14 160 / 0.15)" : accent ? "oklch(0.56 0.16 44 / 0.15)" : "oklch(0.22 0.12 264 / 0.08)";
  const color = green ? "oklch(0.38 0.14 160)" : accent ? "oklch(0.56 0.16 44)" : "oklch(0.22 0.12 264)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
        style: { background: bg },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color } })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground leading-none", children: value })
    ] })
  ] });
}
function AdminLoginForm({ onSuccess }) {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try {
          localStorage.setItem(ADMIN_SESSION_KEY, "true");
        } catch {
        }
        onSuccess();
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 300);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen items-center justify-center px-5 py-10",
      style: { background: "oklch(0.22 0.12 264)" },
      "data-ocid": "admin.login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-11 h-11 rounded-xl flex items-center justify-center shadow-lg",
              style: { background: "oklch(0.56 0.16 44)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-2xl font-bold tracking-tight", children: "Tele-Blast" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl shadow-2xl px-8 py-10 flex flex-col",
            style: { background: "oklch(0.99 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md",
                  style: { background: "oklch(0.22 0.12 264)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-white" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-2xl font-bold text-center mb-1",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: "Admin Sign In"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-center leading-relaxed mb-8",
                  style: { color: "oklch(0.52 0 0)" },
                  children: "Restricted to authorized administrators only."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "admin-username",
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.32 0.08 264)" },
                      children: "Username"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "admin-username",
                      type: "text",
                      autoComplete: "username",
                      value: username,
                      onChange: (e) => {
                        setUsername(e.target.value);
                        setError("");
                      },
                      placeholder: "Enter username",
                      className: "h-11",
                      "data-ocid": "admin.login.username_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "admin-password",
                      className: "text-sm font-medium",
                      style: { color: "oklch(0.32 0.08 264)" },
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "admin-password",
                        type: showPassword ? "text" : "password",
                        autoComplete: "current-password",
                        value: password,
                        onChange: (e) => {
                          setPassword(e.target.value);
                          setError("");
                        },
                        placeholder: "Enter password",
                        className: "h-11 pr-11",
                        "data-ocid": "admin.login.password_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                        onClick: () => setShowPassword((v) => !v),
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        "data-ocid": "admin.login.show_password_toggle",
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                    style: {
                      background: "oklch(0.97 0.02 20)",
                      color: "oklch(0.46 0.18 22)"
                    },
                    "data-ocid": "admin.login.error_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 shrink-0" }),
                      error
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: loading || !username || !password,
                    className: "w-full h-12 text-base font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] hover:opacity-90 text-white flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed",
                    style: { background: "oklch(0.56 0.16 44)" },
                    "data-ocid": "admin.login.submit_button",
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                      "Signing in…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                      "Sign In"
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs text-center mt-6",
                  style: { color: "oklch(0.62 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "inline w-3 h-3 mr-1 -mt-0.5",
                        style: { color: "oklch(0.32 0.15 264)" }
                      }
                    ),
                    "Secured · Tele-Blast Admin Portal"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs mt-8 text-center",
            style: { color: "oklch(0.98 0 0 / 0.3)" },
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " Tele-Blast · tele-blast.com"
            ]
          }
        )
      ]
    }
  );
}
function CreateAccountModal({ onClose }) {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const createUser = useCreatePreRegisteredUser();
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address";
    if (!phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createUser.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
      });
      ue.success(`Account created for ${name.trim()}`);
      onClose();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to create account"
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.55)" },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-md rounded-2xl shadow-2xl overflow-hidden",
          style: { background: "oklch(0.99 0 0)" },
          "data-ocid": "admin.create_account.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 px-6 py-4",
                style: { background: "oklch(0.22 0.12 264)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                      style: { background: "oklch(0.56 0.16 44)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-white", children: "Create Account" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "Pre-register a user — they'll have $30 Pro access on login" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors",
                      "aria-label": "Close",
                      "data-ocid": "admin.create_account.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "ca-name",
                    className: "text-sm font-semibold text-foreground",
                    children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.56 0.18 22)" }, children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ca-name",
                    type: "text",
                    autoComplete: "name",
                    value: name,
                    onChange: (e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: void 0 }));
                    },
                    placeholder: "John Smith",
                    className: `h-11 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                    "data-ocid": "admin.create_account.name_input"
                  }
                ),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-medium",
                    style: { color: "oklch(0.46 0.18 22)" },
                    "data-ocid": "admin.create_account.name.field_error",
                    children: errors.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "ca-email",
                    className: "text-sm font-semibold text-foreground",
                    children: [
                      "Email Address",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.56 0.18 22)" }, children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ca-email",
                    type: "email",
                    autoComplete: "email",
                    value: email,
                    onChange: (e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((p) => ({ ...p, email: void 0 }));
                    },
                    placeholder: "john@example.com",
                    className: `h-11 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                    "data-ocid": "admin.create_account.email_input"
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-medium",
                    style: { color: "oklch(0.46 0.18 22)" },
                    "data-ocid": "admin.create_account.email.field_error",
                    children: errors.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "ca-phone",
                    className: "text-sm font-semibold text-foreground",
                    children: [
                      "Phone Number",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.56 0.18 22)" }, children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ca-phone",
                    type: "tel",
                    autoComplete: "tel",
                    value: phone,
                    onChange: (e) => {
                      setPhone(e.target.value);
                      if (errors.phone)
                        setErrors((p) => ({ ...p, phone: void 0 }));
                    },
                    placeholder: "(555) 123-4567",
                    className: `h-11 ${errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                    "data-ocid": "admin.create_account.phone_input"
                  }
                ),
                errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-medium",
                    style: { color: "oklch(0.46 0.18 22)" },
                    "data-ocid": "admin.create_account.phone.field_error",
                    children: errors.phone
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg px-4 py-3 text-xs leading-relaxed border",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.05)",
                    borderColor: "oklch(0.22 0.12 264 / 0.15)",
                    color: "oklch(0.38 0.06 264)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "How it works:" }),
                    " When this user logs in via Internet Identity, the app will check if their email matches this record and automatically grant them the $30 Pro plan — no payment required."
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: onClose,
                    className: "flex-1 min-h-[44px]",
                    "data-ocid": "admin.create_account.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "sm",
                    disabled: createUser.isPending,
                    className: "flex-1 min-h-[44px] text-white gap-1.5",
                    style: { background: "oklch(0.22 0.12 264)" },
                    "data-ocid": "admin.create_account.submit_button",
                    children: createUser.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                      "Creating…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                      "Create Account"
                    ] })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function formatPreRegDate(ns) {
  const ms = typeof ns === "bigint" ? Number(ns) / 1e6 : ns;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function PreRegisteredAccountsSection() {
  const { data: preRegistered = [], isLoading } = useGetPreRegisteredUsers();
  const { data: allUsers = [] } = useAllUsers();
  const deletePreReg = useDeletePreRegisteredUser();
  const [confirmDeleteEmail, setConfirmDeleteEmail] = reactExports.useState(
    null
  );
  const activatedEmails = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const u of allUsers) {
      const email = u.profile?.email?.toLowerCase();
      if (email) set.add(email);
    }
    return set;
  }, [allUsers]);
  async function handleConfirmDelete() {
    if (!confirmDeleteEmail) return;
    try {
      await deletePreReg.mutateAsync(confirmDeleteEmail);
      ue.success("Pre-registration deleted");
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete pre-registration"
      );
    } finally {
      setConfirmDeleteEmail(null);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-2 mt-6",
        "data-ocid": "admin.pre_registered.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" })
        ]
      }
    );
  }
  const list = preRegistered;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", "data-ocid": "admin.pre_registered.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserPlus,
        {
          className: "w-4 h-4 shrink-0",
          style: { color: "oklch(0.22 0.12 264)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Pre-Registered Accounts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold text-white",
          style: { background: "oklch(0.22 0.12 264)" },
          children: list.length
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Accounts created by admin. When these users log in via Internet Identity, they enter their email on the activation screen and receive Pro access automatically — no payment required." }),
    list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-10 text-center rounded-xl border border-dashed border-border",
        "data-ocid": "admin.pre_registered.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-8 h-8 text-muted-foreground/40 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "No pre-registered accounts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-0.5", children: 'Use the "Create Account" button above to add one' })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.pre_registered.list", children: list.map((u, idx) => {
      const isActivated = activatedEmails.has(u.email.toLowerCase());
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isActivated ? "border-green-200" : "border-border"}`,
          "data-ocid": `admin.pre_registered.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: u.name }),
                  isActivated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border",
                      style: {
                        background: "oklch(0.96 0.04 160)",
                        color: "oklch(0.34 0.14 160)",
                        borderColor: "oklch(0.82 0.1 160)"
                      },
                      "data-ocid": `admin.pre_registered.activated_badge.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
                        "Activated — see Users list"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-foreground truncate",
                    "data-ocid": `admin.pre_registered.email.${idx + 1}`,
                    children: u.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-foreground",
                    "data-ocid": `admin.pre_registered.phone.${idx + 1}`,
                    children: u.phone
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-medium", children: formatPreRegDate(u.createdAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setConfirmDeleteEmail(u.email),
                  className: "flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-red-50",
                  style: {
                    borderColor: "oklch(0.88 0.08 22)",
                    color: "oklch(0.50 0.18 22)"
                  },
                  "aria-label": `Delete pre-registration for ${u.name}`,
                  "data-ocid": `admin.pre_registered.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ]
        },
        u.id
      );
    }) }),
    confirmDeleteEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "rgba(0,0,0,0.5)" },
        "data-ocid": "admin.pre_registered.delete.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl shadow-2xl p-6",
            style: { background: "oklch(0.99 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    style: { background: "oklch(0.97 0.02 22)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Trash2,
                      {
                        className: "w-5 h-5",
                        style: { color: "oklch(0.50 0.18 22)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground", children: "Delete Pre-Registration?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This cannot be undone." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mb-1", children: "Remove pre-registration for:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-mono font-semibold mb-5 break-all",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: confirmDeleteEmail
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setConfirmDeleteEmail(null),
                    className: "flex-1 min-h-[40px]",
                    disabled: deletePreReg.isPending,
                    "data-ocid": "admin.pre_registered.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: handleConfirmDelete,
                    disabled: deletePreReg.isPending,
                    className: "flex-1 min-h-[40px] text-white",
                    style: { background: "oklch(0.50 0.18 22)" },
                    "data-ocid": "admin.pre_registered.delete.confirm_button",
                    children: deletePreReg.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                      "Deleting…"
                    ] }) : "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function UsersTab() {
  const queryClient = useQueryClient();
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useAllUsers();
  const grantAdmin = useGrantAdmin();
  const revokeAccess = useRevokeUserAccess();
  const restoreAccess = useRestoreUserAccess();
  const [search, setSearch] = reactExports.useState("");
  const [paymentFilter, setPaymentFilter] = reactExports.useState(
    "all"
  );
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [expandedRows, setExpandedRows] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [isExporting, setIsExporting] = reactExports.useState(false);
  const { actor } = useBackend();
  reactExports.useEffect(() => {
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
  function toggleExpand(principalStr) {
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
  function escapeCSV(val) {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }
  function nsToDateTime(ns) {
    if (ns == null || ns === BigInt(0)) return "";
    const ms = Number(ns) / 1e6;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  function formatCommission(val) {
    return `$${(Number(val) / 100).toFixed(2)}`;
  }
  async function handleExportCSV() {
    if (!actor) {
      ue.error("Not connected — please wait and try again");
      return;
    }
    setIsExporting(true);
    try {
      const result = await actor.generateUserExport();
      if (result.__kind__ !== "ok") {
        throw new Error(result.err ?? "Export failed");
      }
      const records = result.ok;
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
        "Pending Payouts"
      ];
      const rows = records.map((r) => {
        const agreementAccepted = r.agreementAcceptedAt != null && r.agreementAcceptedAt !== BigInt(0);
        const isAffiliate = r.isAffiliate;
        const referralLink = isAffiliate && r.referralCode ? `${window.location.origin}/affiliate-signup?ref=${r.referralCode}` : "";
        return [
          escapeCSV(r.principal),
          escapeCSV(r.name),
          escapeCSV(r.companyName),
          escapeCSV(r.email),
          escapeCSV(r.phone),
          escapeCSV(r.website),
          escapeCSV(r.referredBy),
          escapeCSV(r.hearAboutUs || ""),
          escapeCSV(nsToDateTime(r.createdAt)),
          escapeCSV(r.ipAddress || "Not captured"),
          agreementAccepted ? "Yes" : "No",
          escapeCSV(
            agreementAccepted ? nsToDateTime(r.agreementAcceptedAt) : ""
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
          escapeCSV(formatCommission(r.pendingPayouts))
        ].join(",");
      });
      const csvContent = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const today = /* @__PURE__ */ new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = `tele-blast-users-${dateStr}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      ue.success(
        `Exported ${records.length} user${records.length !== 1 ? "s" : ""} to CSV`
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Export failed — please try again"
      );
    } finally {
      setIsExporting(false);
    }
  }
  const typedUsers = users;
  const filtered = reactExports.useMemo(() => {
    return typedUsers.filter((u) => {
      const profile = u.profile;
      const name = profile ? `${profile.name} ${profile.companyName}`.toLowerCase() : "";
      const matchSearch = !search || name.includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || statusFilter === "active" && u.featureAccess || statusFilter === "revoked" && !u.featureAccess;
      const paid2 = isPaidUser(u);
      const matchPayment = paymentFilter === "all" || paymentFilter === "paid" && paid2 || paymentFilter === "unpaid" && !paid2;
      return matchSearch && matchStatus && matchPayment;
    });
  }, [typedUsers, search, statusFilter, paymentFilter]);
  const sortedFiltered = reactExports.useMemo(() => {
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
  const errorMsg = error instanceof Error ? error.message : "";
  const errorMsgLower = errorMsg.toLowerCase();
  const isIC0508Error = errorMsgLower.includes("ic0508") || errorMsgLower.includes("is stopped") || errorMsgLower.includes("canister stopped");
  const isAuthError = !isIC0508Error && isError && !isFetching && (errorMsgLower.includes("not authorized") || errorMsgLower.includes("authorization") || errorMsgLower.includes("admin access"));
  const isEmptyListRetryExhausted = !isIC0508Error && !isAuthError && isError && !isFetching && (errorMsgLower.includes("empty user list") || errorMsgLower.includes("actor not ready"));
  const isTransientRetrying = isFetching && typedUsers.length === 0 && !isIC0508Error;
  if (isLoading || isTransientRetrying) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "admin.users.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground animate-pulse", children: "Loading your users…" })
        ]
      }
    );
  }
  if (isIC0508Error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "admin.users.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-3 border-amber-200 border-t-amber-500 rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-5 py-4 border max-w-md text-left",
              style: {
                background: "oklch(0.97 0.04 80)",
                borderColor: "oklch(0.85 0.1 80)",
                color: "oklch(0.42 0.12 70)"
              },
              "data-ocid": "admin.users.ic0508_banner",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm mb-1", children: "Backend is restarting after deployment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed mb-3", children: "Retrying automatically every 10–30 seconds. Your user data is safe and will appear as soon as the backend comes back online." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: () => void handleRefresh(),
                    disabled: isRefreshing,
                    "data-ocid": "admin.users.retry_button",
                    children: isRefreshing ? "Refreshing…" : "↻ Refresh Now"
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
  if (isAuthError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "admin.users.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Admin access required — please log in as admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The backend did not recognize your session as an admin. Try refreshing or re-authenticating." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => void handleRefresh(),
              disabled: isRefreshing,
              "data-ocid": "admin.users.retry_button",
              children: isRefreshing ? "Refreshing…" : "↻ Refresh"
            }
          )
        ]
      }
    );
  }
  if (isEmptyListRetryExhausted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "admin.users.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Users haven't appeared yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "The backend responded but returned no users. Click Refresh to try again — your data is safe." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => void handleRefresh(),
              disabled: isRefreshing,
              "data-ocid": "admin.users.retry_button",
              children: isRefreshing ? "Refreshing…" : "↻ Refresh"
            }
          )
        ]
      }
    );
  }
  if (isError && !isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "admin.users.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Could not load users — click Refresh to try again" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: errorMsg || "Unknown error" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "User data is stored in the backend and is never erased by builds. This is a temporary connection issue." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => void handleRefresh(),
              disabled: isRefreshing,
              "data-ocid": "admin.users.retry_button",
              children: isRefreshing ? "Refreshing…" : "↻ Refresh"
            }
          )
        ]
      }
    );
  }
  if (!isLoading && !isFetching && !isError && typedUsers.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-4 py-16 text-center",
          "data-ocid": "admin.users.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Loading users…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "If this takes more than 30 seconds, use Refresh below." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => void handleRefresh(),
                disabled: isRefreshing,
                "data-ocid": "admin.users.retry_button",
                children: isRefreshing ? "Refreshing…" : "↻ Refresh"
              }
            )
          ]
        }
      ),
      showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateAccountModal, { onClose: () => setShowCreateModal(false) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Users", value: total, icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Paid", value: paid, icon: CircleCheck, green: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Unpaid", value: unpaid, icon: CircleX, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Revoked", value: revoked, icon: Lock })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 rounded-xl px-4 py-3 border",
        style: {
          background: "oklch(0.22 0.12 264 / 0.04)",
          borderColor: "oklch(0.22 0.12 264 / 0.12)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
            paid,
            " Paid"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-muted-foreground", children: [
            unpaid,
            " Unpaid"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            active,
            " Active · ",
            revoked,
            " Revoked"
          ] }),
          isFetching && !isRefreshing && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" }),
            "Updating…"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void handleExportCSV(),
                disabled: isExporting || !actor,
                className: "h-7 px-3 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                style: { background: "oklch(0.56 0.16 44)" },
                "data-ocid": "admin.users.export_csv_button",
                "aria-label": "Export all users as CSV",
                children: isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  "Exporting…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "w-3 h-3",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "7 10 12 15 17 10" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                      ]
                    }
                  ),
                  "Export CSV"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 px-2 text-xs",
                onClick: () => void handleRefresh(),
                disabled: isRefreshing || isFetching,
                "data-ocid": "admin.users.refresh_button",
                children: isRefreshing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" }),
                  "Refreshing…"
                ] }) : "↻ Refresh"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or company…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "flex-1",
          "data-ocid": "admin.users.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setShowCreateModal(true),
          className: "text-white gap-1.5 shrink-0 min-h-[40px] self-start sm:self-auto",
          style: { background: "oklch(0.22 0.12 264)" },
          "data-ocid": "admin.users.create_account_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Create Account"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-wrap", children: [
        ["all", "paid", "unpaid"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setPaymentFilter(s),
            className: `px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${paymentFilter === s ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`,
            style: paymentFilter === s ? {
              background: s === "paid" ? "oklch(0.46 0.14 160)" : s === "unpaid" ? "oklch(0.56 0.18 22)" : "oklch(0.22 0.12 264)"
            } : {},
            "data-ocid": `admin.users.payment-filter-${s}.tab`,
            children: s
          },
          s
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px self-stretch bg-border mx-0.5",
            "aria-hidden": "true"
          }
        ),
        ["all", "active", "revoked"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter(s),
            className: `px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${statusFilter === s ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`,
            style: statusFilter === s ? { background: "oklch(0.22 0.12 264)" } : {},
            "data-ocid": `admin.users.filter-${s}.tab`,
            children: s
          },
          s
        ))
      ] })
    ] }),
    sortedFiltered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "admin.users.empty_state",
        children: "No users match the current filter."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.users.list", children: sortedFiltered.map((user, idx) => {
      const profile = user.profile;
      const principalStr = user.principal.toString();
      const shortPrincipal = `${principalStr.slice(0, 8)}…${principalStr.slice(-4)}`;
      const signupDate = user.subscribedAt != null ? formatDate(user.subscribedAt) : "—";
      const paid2 = isPaidUser(user);
      const tierLabel = paid2 ? getTierLabel(user.subscriptionTier) : null;
      const isExpanded = expandedRows.has(principalStr);
      const email = user.profile?.email || "—";
      const phone = user.profile?.phone || "—";
      const agreementDate = user.agreementAcceptedAt != null ? formatAgreementDate(user.agreementAcceptedAt) : "—";
      const ipAddress = user.ipAddress ?? "—";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border transition-colors",
          style: {
            background: "oklch(0.99 0 0)",
            color: "oklch(0.15 0 0)",
            borderColor: paid2 ? "oklch(0.82 0.08 160)" : "oklch(0.88 0 0)",
            boxShadow: paid2 ? "0 1px 3px oklch(0.58 0.16 160 / 0.1)" : "none"
          },
          "data-ocid": `admin.users.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col sm:flex-row sm:items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "hidden sm:block w-1 self-stretch rounded-full shrink-0",
                  style: {
                    background: paid2 ? "oklch(0.58 0.16 160)" : "oklch(0.82 0 0)"
                  },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-semibold text-sm truncate",
                      style: { color: "oklch(0.15 0 0)" },
                      children: profile?.name ? profile.name : shortPrincipal
                    }
                  ),
                  profile?.companyName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-sm truncate",
                      style: { color: "oklch(0.48 0 0)" },
                      children: [
                        "· ",
                        profile.companyName
                      ]
                    }
                  ),
                  !profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-semibold",
                      style: {
                        background: "oklch(0.97 0.02 44)",
                        color: "oklch(0.52 0.1 44)",
                        borderColor: "oklch(0.88 0.06 44)"
                      },
                      children: "No profile"
                    }
                  ),
                  user.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium",
                      style: {
                        borderColor: "oklch(0.56 0.16 44)",
                        color: "oklch(0.56 0.16 44)",
                        background: "oklch(0.56 0.16 44 / 0.08)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                        "Admin"
                      ]
                    }
                  ),
                  paid2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-bold",
                      style: {
                        background: "oklch(0.96 0.04 160)",
                        color: "oklch(0.34 0.14 160)",
                        borderColor: "oklch(0.82 0.1 160)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                        "PAID",
                        tierLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium opacity-80", children: [
                          "· ",
                          tierLabel
                        ] })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-bold",
                      style: {
                        background: "oklch(0.97 0.02 22)",
                        color: "oklch(0.44 0.18 22)",
                        borderColor: "oklch(0.88 0.08 22)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                        "NOT PAID"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium",
                      style: user.featureAccess ? {
                        background: "oklch(0.96 0.03 264)",
                        color: "oklch(0.34 0.14 264)",
                        borderColor: "oklch(0.82 0.1 264)"
                      } : {
                        background: "oklch(0.97 0.02 22)",
                        color: "oklch(0.44 0.18 22)",
                        borderColor: "oklch(0.88 0.08 22)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-2 h-2 fill-current" }),
                        user.featureAccess ? "Active" : "Revoked"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono",
                      style: { color: "oklch(0.48 0 0)" },
                      children: shortPrincipal
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs",
                      style: {
                        color: profile?.email ? "oklch(0.48 0 0)" : "oklch(0.68 0 0)"
                      },
                      children: profile?.email || "No email on file"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs",
                      style: { color: "oklch(0.48 0 0)" },
                      children: [
                        "Subscribed: ",
                        signupDate
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TierSelector, { user, idx })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch sm:flex-row sm:items-center gap-2 shrink-0", children: [
                !user.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => grantAdmin.mutate(user.principal, {
                      onSuccess: () => ue.success("Admin access granted"),
                      onError: (err) => ue.error(err.message)
                    }),
                    disabled: grantAdmin.isPending,
                    className: "text-xs",
                    "data-ocid": `admin.users.grant_admin_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 mr-1" }),
                      "Grant Admin"
                    ]
                  }
                ),
                user.featureAccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => revokeAccess.mutate(user.principal, {
                      onSuccess: () => ue.success("Access revoked"),
                      onError: (err) => ue.error(err.message)
                    }),
                    disabled: revokeAccess.isPending,
                    className: "text-xs border-red-200 text-red-600 hover:bg-red-50",
                    "data-ocid": `admin.users.revoke_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                      "Revoke"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => restoreAccess.mutate(user.principal, {
                      onSuccess: () => ue.success("Access restored"),
                      onError: (err) => ue.error(err.message)
                    }),
                    disabled: restoreAccess.isPending,
                    className: "text-xs border-green-200 text-green-700 hover:bg-green-50",
                    "data-ocid": `admin.users.restore_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                      "Restore"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleExpand(principalStr),
                    "aria-label": isExpanded ? "Hide user details" : "Show user details",
                    "aria-expanded": isExpanded,
                    className: "h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 self-center",
                    "data-ocid": `admin.users.details_toggle.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronDown,
                      {
                        className: `w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`
                      }
                    )
                  }
                )
              ] })
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border-t px-4 py-3",
                style: {
                  background: "oklch(0.97 0 0)",
                  borderColor: "oklch(0.88 0 0)",
                  color: "oklch(0.15 0 0)"
                },
                "data-ocid": `admin.users.details_panel.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] font-bold uppercase tracking-widest mb-2",
                      style: { color: "oklch(0.52 0.06 264)" },
                      children: "User Details"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Mail,
                        {
                          className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                          style: { color: "oklch(0.42 0.12 264)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Email" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-foreground font-medium break-all",
                            "data-ocid": `admin.users.details_email.${idx + 1}`,
                            children: email
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Phone,
                        {
                          className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                          style: { color: "oklch(0.42 0.12 264)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Phone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-foreground font-medium",
                            "data-ocid": `admin.users.details_phone.${idx + 1}`,
                            children: phone
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Check,
                        {
                          className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                          style: { color: "oklch(0.46 0.14 160)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "Agreement Signed" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-foreground font-medium",
                            "data-ocid": `admin.users.details_agreement.${idx + 1}`,
                            children: agreementDate
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Globe,
                        {
                          className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                          style: { color: "oklch(0.42 0.12 264)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none mb-0.5", children: "IP Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-foreground font-mono",
                            "data-ocid": `admin.users.details_ip.${idx + 1}`,
                            children: ipAddress
                          }
                        )
                      ] })
                    ] })
                  ] })
                ]
              }
            ),
            user.profile?.hearAboutUs && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Source:" }),
              " ",
              user.profile.hearAboutUs
            ] })
          ]
        },
        principalStr
      );
    }) }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateAccountModal, { onClose: () => setShowCreateModal(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreRegisteredAccountsSection, {})
  ] });
}
function AffiliatesTab() {
  const { data: affiliates = [], isLoading } = useAllAffiliates();
  const ensureAdminRecord = useAdminEnsureAffiliateRecord();
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const [ensureSuccess, setEnsureSuccess] = reactExports.useState(false);
  const handleCopyLink = (referralCode, id) => {
    const link = `https://www.tele-blast.com?affiliate=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      ue.success("Referral link copied!");
      setTimeout(() => setCopiedId(null), 2e3);
    });
  };
  async function handleEnsureAdminRecord() {
    try {
      await ensureAdminRecord.mutateAsync({
        name: "Mike Bendett",
        email: "mikebendett@gmail.com"
      });
      setEnsureSuccess(true);
      ue.success("Admin affiliate record verified and restored.");
      setTimeout(() => setEnsureSuccess(false), 5e3);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to ensure admin record"
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.affiliates.loading_state", children: ["a1", "a2", "a3", "a4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-lg" }, k)) });
  }
  const list = affiliates;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between gap-3 rounded-xl border p-4",
        style: {
          background: "oklch(0.22 0.12 264 / 0.04)",
          borderColor: "oklch(0.22 0.12 264 / 0.15)"
        },
        "data-ocid": "admin.affiliates.ensure_admin.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Admin Affiliate Record" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Ensure ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "mikebendett@gmail.com" }),
              " has an affiliate record. Safe to run anytime — no-op if it already exists."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleEnsureAdminRecord,
              disabled: ensureAdminRecord.isPending,
              className: "text-white shrink-0 gap-1.5",
              style: { background: "oklch(0.22 0.12 264)" },
              "data-ocid": "admin.affiliates.ensure_admin_button",
              children: ensureAdminRecord.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                "Restoring…"
              ] }) : ensureSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                "Done ✓"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
                "Ensure Record"
              ] })
            }
          )
        ]
      }
    ),
    list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "admin.affiliates.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No affiliates yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Affiliates who sign up will appear here." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.affiliates.list", children: list.map((affiliate, idx) => {
      const referralLink = `https://www.tele-blast.com?affiliate=${affiliate.referralCode}`;
      const isCopied = copiedId === affiliate.id.toString();
      const isActive = affiliate.paypalEmail && affiliate.paypalEmail.trim() !== "";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4",
          "data-ocid": `admin.affiliates.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: affiliate.name }),
              isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700 border border-green-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                "Active"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200", children: "Pending Activation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full border font-medium ${affiliate.approved ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-muted text-muted-foreground border-border"}`,
                  children: affiliate.approved ? "Approved" : "Pending Approval"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Email:" }),
                " ",
                affiliate.email
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "PayPal:" }),
                " ",
                isActive ? affiliate.paypalEmail : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: "Not set" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Ref Code:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-foreground font-mono", children: affiliate.referralCode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Joined:" }),
                " ",
                formatDate(affiliate.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 min-w-0 rounded-lg border px-3 py-2 font-mono text-xs truncate select-all",
                  style: {
                    background: "oklch(0.97 0 0)",
                    borderColor: "oklch(0.88 0 0)",
                    color: "oklch(0.32 0 0)"
                  },
                  title: referralLink,
                  children: referralLink
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCopyLink(
                    affiliate.referralCode,
                    affiliate.id.toString()
                  ),
                  className: "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-muted",
                  style: {
                    borderColor: "oklch(0.88 0 0)",
                    color: isCopied ? "oklch(0.45 0.16 150)" : "oklch(0.22 0.12 264)"
                  },
                  "data-ocid": `admin.affiliates.copy_link.${idx + 1}`,
                  children: isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✓ Copied" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Copy Link" })
                }
              )
            ] })
          ]
        },
        affiliate.id.toString()
      );
    }) })
  ] });
}
function PayoutsTab() {
  const [filter, setFilter] = reactExports.useState("all");
  const { data: rawPayouts = [], isLoading } = useAdminEnrichedPayouts();
  const { data: affiliates = [] } = useAllAffiliates();
  const markPaid = useMarkPayoutPaid();
  const [markingId, setMarkingId] = reactExports.useState(null);
  const grouped = reactExports.useMemo(() => {
    const entries = rawPayouts;
    const map = /* @__PURE__ */ new Map();
    for (const e of entries) {
      const key = e.newUserPrincipal?.toString() ?? e.referredEmail ?? Math.random().toString();
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
          pendingEntries: []
        });
      }
      const row = map.get(key);
      const cents = Number(e.commissionAmount ?? 0);
      const isWaiting = e.status === "pending" || e.status === "ready";
      const isPaidStatus = e.status === "paid";
      if (isWaiting) {
        row.waitingCents += cents;
        row.pendingEntries.push(e);
      } else if (isPaidStatus) {
        row.paidCents += cents;
      }
      if (e.hasPurchased) row.hasPurchased = true;
    }
    return Array.from(map.values());
  }, [rawPayouts]);
  const list = reactExports.useMemo(() => {
    if (filter === "pending") return grouped.filter((r) => r.waitingCents > 0);
    if (filter === "paid")
      return grouped.filter((r) => r.paidCents > 0 && r.waitingCents === 0);
    return grouped;
  }, [grouped, filter]);
  const totalWaiting = reactExports.useMemo(
    () => grouped.reduce((sum, r) => sum + r.waitingCents, 0),
    [grouped]
  );
  const totalPaid = reactExports.useMemo(
    () => grouped.reduce((sum, r) => sum + r.paidCents, 0),
    [grouped]
  );
  function getAffiliateName(affiliateId) {
    const aff = affiliates.find(
      (a) => a.id.toString() === affiliateId
    );
    if (aff) return aff.name;
    return affiliateId ? `${affiliateId.slice(0, 8)}…` : "Unknown";
  }
  function getAffiliateEmail(affiliateId) {
    const aff = affiliates.find(
      (a) => a.id.toString() === affiliateId
    );
    return aff?.email ?? "";
  }
  function formatDollars(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }
  async function handleMarkAllPaid(row) {
    if (row.pendingEntries.length === 0) return;
    setMarkingId(row.key);
    try {
      for (const entry of row.pendingEntries) {
        const id = entry.newUserPrincipal?.toString() ?? entry.referredEmail ?? "";
        await markPaid.mutateAsync(id);
      }
      ue.success(`Marked ${formatDollars(row.waitingCents)} as paid`);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to mark as paid"
      );
    } finally {
      setMarkingId(null);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.payouts.loading_state", children: ["p1", "p2", "p3", "p4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Referred", value: grouped.length, icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Waiting to Be Paid",
          value: formatDollars(totalWaiting),
          icon: Clock,
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Paid Out",
          value: formatDollars(totalPaid),
          icon: CircleCheck,
          green: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", "data-ocid": "admin.payouts.filters", children: [
      { key: "all", label: "All Referrals" },
      { key: "pending", label: "Waiting to Be Paid" },
      { key: "paid", label: "Paid" }
    ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(key),
        className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === key ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`,
        style: filter === key ? {
          background: key === "pending" ? "oklch(0.56 0.16 44)" : key === "paid" ? "oklch(0.46 0.14 160)" : "oklch(0.22 0.12 264)"
        } : {},
        "data-ocid": `admin.payouts.filter-${key}.tab`,
        children: label
      },
      key
    )) }),
    list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "admin.payouts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: filter === "pending" ? "No referrals waiting to be paid" : filter === "paid" ? "No paid referrals yet" : "No referrals yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: filter === "all" ? "Referral commissions will appear here as affiliates make referrals." : 'Try switching to "All Referrals" to see everything.' })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-x-auto rounded-xl border",
        "data-ocid": "admin.payouts.list",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[700px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: {
                background: "oklch(0.22 0.12 264 / 0.06)",
                borderBottom: "1px solid oklch(0.88 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide", children: "Affiliate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide", children: "Referred Person" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide hidden md:table-cell", children: "Business" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide", children: "Purchased" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide",
                    style: { color: "oklch(0.56 0.16 44)" },
                    children: "Waiting to Be Paid"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-right px-4 py-3 font-semibold text-xs uppercase tracking-wide",
                    style: { color: "oklch(0.46 0.14 160)" },
                    children: "Paid"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground text-xs uppercase tracking-wide", children: "Action" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.map((row, idx) => {
            const isMarking = markingId === row.key;
            const hasWaiting = row.waitingCents > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b last:border-0 hover:bg-muted/20 transition-colors",
                "data-ocid": `admin.payouts.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate max-w-[120px]", children: getAffiliateName(row.affiliateId) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate max-w-[120px] mt-0.5", children: getAffiliateEmail(row.affiliateId) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: row.referredName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "No name" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 mt-0.5", children: [
                      row.referredEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
                        row.referredEmail
                      ] }),
                      row.referredPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
                        row.referredPhone
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: row.referredBizName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: row.hasPurchased ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border",
                      style: {
                        background: "oklch(0.96 0.04 160)",
                        color: "oklch(0.34 0.14 160)",
                        borderColor: "oklch(0.82 0.1 160)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        "Yes"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border",
                      style: {
                        background: "oklch(0.97 0.02 22)",
                        color: "oklch(0.54 0.12 22)",
                        borderColor: "oklch(0.88 0.08 22)"
                      },
                      children: "No"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: hasWaiting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg border",
                      style: {
                        background: "oklch(0.97 0.04 80)",
                        color: "oklch(0.48 0.14 60)",
                        borderColor: "oklch(0.88 0.1 70)"
                      },
                      "data-ocid": `admin.payouts.waiting_amount.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        formatDollars(row.waitingCents)
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: row.paidCents > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg border",
                      style: {
                        background: "oklch(0.96 0.04 160)",
                        color: "oklch(0.34 0.14 160)",
                        borderColor: "oklch(0.82 0.1 160)"
                      },
                      "data-ocid": `admin.payouts.paid_amount.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                        formatDollars(row.paidCents)
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: hasWaiting && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: () => void handleMarkAllPaid(row),
                      disabled: isMarking || markPaid.isPending,
                      className: "text-xs text-white gap-1.5 whitespace-nowrap",
                      style: { background: "oklch(0.56 0.16 44)" },
                      "data-ocid": `admin.payouts.mark_paid_button.${idx + 1}`,
                      children: isMarking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                        "Marking…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                        "Mark Paid"
                      ] })
                    }
                  ) })
                ]
              },
              row.key
            );
          }) }),
          list.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: {
                background: "oklch(0.22 0.12 264 / 0.04)",
                borderTop: "2px solid oklch(0.88 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    colSpan: 4,
                    className: "px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide",
                    children: [
                      "Totals (",
                      list.length,
                      " referral",
                      list.length !== 1 ? "s" : "",
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: "oklch(0.48 0.14 60)" },
                    children: formatDollars(
                      list.reduce((s, r) => s + r.waitingCents, 0)
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: "oklch(0.34 0.14 160)" },
                    children: formatDollars(list.reduce((s, r) => s + r.paidCents, 0))
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
              ]
            }
          ) })
        ] })
      }
    )
  ] });
}
const PACKAGE_DEFS = [
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
      "1 landing page (manual only)"
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
      "Bulk actions: multi-select leads for mass delete or DNC"
    ]
  }
];
function PackageCard({
  pkg,
  enabled,
  onToggle,
  isToggling
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 flex flex-col gap-4 transition-all duration-200",
      style: {
        borderColor: enabled ? `${pkg.accentColor.replace(")", " / 0.3)")}` : "oklch(0.88 0 0)",
        boxShadow: enabled ? `0 0 0 1px ${pkg.accentColor.replace(")", " / 0.12)")}` : "none"
      },
      "data-ocid": `admin.price_list.${pkg.tier}.card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: pkg.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm font-semibold px-2 py-0.5 rounded-full",
                  style: {
                    background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                    color: pkg.accentColor
                  },
                  children: pkg.price
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold",
                style: {
                  background: "oklch(0.96 0.04 160)",
                  color: "oklch(0.38 0.14 160)",
                  borderColor: "oklch(0.82 0.1 160)"
                },
                "data-ocid": `admin.price_list.${pkg.tier}.visible_badge`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  "Visible on landing page"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold",
                style: {
                  background: "oklch(0.96 0 0)",
                  color: "oklch(0.52 0 0)",
                  borderColor: "oklch(0.88 0 0)"
                },
                "data-ocid": `admin.price_list.${pkg.tier}.hidden_badge`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                  "Hidden from landing page"
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": enabled,
              "aria-label": `${enabled ? "Disable" : "Enable"} ${pkg.name} on landing page`,
              onClick: () => onToggle(pkg.tier, !enabled),
              disabled: isToggling,
              className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed",
              style: {
                background: isToggling ? "oklch(0.68 0 0)" : enabled ? pkg.accentColor : "oklch(0.82 0 0)"
              },
              "data-ocid": `admin.price_list.${pkg.tier}.toggle`,
              children: isToggling ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
                  style: {
                    transform: enabled ? "translateX(20px)" : "translateX(0)"
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border",
              style: {
                background: "oklch(0.22 0.12 264 / 0.08)",
                color: "oklch(0.22 0.12 264)",
                borderColor: "oklch(0.22 0.12 264 / 0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3 h-3" }),
                pkg.tAI,
                " tAI"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border",
              style: {
                background: pkg.ltAI > 0 ? "oklch(0.95 0.06 85)" : "oklch(0.96 0 0)",
                color: pkg.ltAI > 0 ? "oklch(0.46 0.12 85)" : "oklch(0.6 0 0)",
                borderColor: pkg.ltAI > 0 ? "oklch(0.88 0.1 85)" : "oklch(0.88 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
                pkg.ltAI === 0 ? "No LtAI" : `${pkg.ltAI} LtAI`
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border bg-muted text-muted-foreground border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "w-3 h-3" }),
            pkg.landingPages,
            " ",
            pkg.landingPages === 1 ? "Landing Page" : "Landing Pages"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: pkg.features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2 text-xs text-foreground leading-snug",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Check,
                {
                  className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                  style: { color: pkg.accentColor }
                }
              ),
              feat
            ]
          },
          feat
        )) })
      ]
    }
  );
}
function PriceListTab() {
  const {
    data: configs = [],
    isLoading,
    refetch: refetchConfigs
  } = useGetPackageConfig();
  const setPackageEnabled = useSetPackageEnabled();
  const [togglingTier, setTogglingTier] = reactExports.useState(null);
  const [optimisticOverrides, setOptimisticOverrides] = reactExports.useState({});
  const { data: showComingSoonTeaser = false } = useGetShowComingSoonTeaser();
  const setShowComingSoonTeaser = useSetShowComingSoonTeaser();
  const [togglingTeaser, setTogglingTeaser] = reactExports.useState(false);
  const enabledMap = reactExports.useMemo(() => {
    const map = {};
    for (const pkg of PACKAGE_DEFS) {
      map[pkg.tier] = pkg.tier === "pro";
    }
    if (configs.length > 0) {
      for (const cfg of configs) {
        map[cfg.tier] = cfg.enabled;
      }
    } else {
      for (const pkg of PACKAGE_DEFS) {
        try {
          const stored = localStorage.getItem(
            `tele-blast:pkg-enabled:${pkg.tier}`
          );
          if (stored !== null) map[pkg.tier] = stored === "true";
        } catch {
        }
      }
    }
    for (const [tier, val] of Object.entries(optimisticOverrides)) {
      map[tier] = val;
    }
    return map;
  }, [configs, optimisticOverrides]);
  async function handleToggle(tier, enabled) {
    setOptimisticOverrides((prev) => ({ ...prev, [tier]: enabled }));
    setTogglingTier(tier);
    try {
      try {
        localStorage.setItem(`tele-blast:pkg-enabled:${tier}`, String(enabled));
      } catch {
      }
      await setPackageEnabled.mutateAsync({ tier, enabled });
      setOptimisticOverrides((prev) => {
        const next = { ...prev };
        delete next[tier];
        return next;
      });
      await refetchConfigs();
      ue.success(
        enabled ? `${PACKAGE_DEFS.find((p) => p.tier === tier)?.name} is now visible on the landing page` : `${PACKAGE_DEFS.find((p) => p.tier === tier)?.name} is now hidden from the landing page`
      );
    } catch (err) {
      setOptimisticOverrides((prev) => {
        const next = { ...prev };
        delete next[tier];
        return next;
      });
      ue.error(
        err instanceof Error ? err.message : "Failed to update package visibility"
      );
    } finally {
      setTogglingTier(null);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid sm:grid-cols-2 gap-4",
        "data-ocid": "admin.price_list.loading_state",
        children: ["p1", "p2", "p3", "p4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }, k))
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "admin.price_list.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LayoutList,
          {
            className: "w-5 h-5",
            style: { color: "oklch(0.22 0.12 264)" }
          }
        ),
        "Package Visibility"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: "Toggle each package on or off to control which plans appear on the public pricing page. All packages are fully functional regardless of visibility." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid sm:grid-cols-2 gap-4",
        "data-ocid": "admin.price_list.packages_grid",
        children: PACKAGE_DEFS.map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PackageCard,
          {
            pkg,
            enabled: enabledMap[pkg.tier] ?? true,
            onToggle: handleToggle,
            isToggling: togglingTier === pkg.tier
          },
          pkg.tier
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-4",
        "data-ocid": "admin.price_list.feature_content.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  className: "w-5 h-5",
                  style: { color: "oklch(0.22 0.12 264)" }
                }
              ),
              "Package Feature Content"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: "These are the feature descriptions that auto-populate when a user subscribes to each tier. Content from lower tiers is always included in higher tier packages." })
          ] }),
          PACKAGE_DEFS.map((pkg, pkgIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl overflow-hidden",
              "data-ocid": `admin.price_list.feature_content.${pkg.tier}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 px-5 py-3",
                    style: {
                      background: `${pkg.accentColor.replace(")", " / 0.08)")}`,
                      borderBottom: `1px solid ${pkg.accentColor.replace(")", " / 0.15)")}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0",
                          style: { background: pkg.accentColor },
                          children: pkgIdx + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: pkg.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-2", children: pkg.price })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "ml-auto text-xs font-medium px-2 py-0.5 rounded-full",
                          style: {
                            background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                            color: pkg.accentColor
                          },
                          children: [
                            pkg.featureContent.length,
                            " feature descriptions"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: pkg.featureContent.map((content, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-3 px-5 py-3 text-sm",
                    "data-ocid": `admin.price_list.feature_content.${pkg.tier}.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold shrink-0 mt-0.5",
                          style: {
                            background: `${pkg.accentColor.replace(")", " / 0.1)")}`,
                            color: pkg.accentColor
                          },
                          children: i + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground leading-snug", children: content })
                    ]
                  },
                  content
                )) })
              ]
            },
            pkg.tier
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-4 border-t border-border pt-8",
        "data-ocid": "admin.price_list.landing_content.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5", style: { color: "oklch(0.56 0.16 44)" } }),
              "Landing Page Content"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: "Control optional content sections shown on the public landing page." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4",
              "data-ocid": "admin.price_list.coming_soon_teaser.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "AI Features Coming Soon teaser" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: 'Show the "Coming Soon — AI-Powered Features" section on the landing page. Hidden by default — enable when you want to tease upcoming AI features to visitors.' }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: showComingSoonTeaser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold",
                      style: {
                        background: "oklch(0.96 0.04 160)",
                        color: "oklch(0.38 0.14 160)",
                        borderColor: "oklch(0.82 0.1 160)"
                      },
                      "data-ocid": "admin.price_list.coming_soon_teaser.visible_badge",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        "Visible on landing page"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-semibold",
                      style: {
                        background: "oklch(0.96 0 0)",
                        color: "oklch(0.52 0 0)",
                        borderColor: "oklch(0.88 0 0)"
                      },
                      "data-ocid": "admin.price_list.coming_soon_teaser.hidden_badge",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                        "Hidden from landing page"
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    role: "switch",
                    "aria-checked": showComingSoonTeaser,
                    "aria-label": `${showComingSoonTeaser ? "Hide" : "Show"} AI Coming Soon teaser on landing page`,
                    onClick: async () => {
                      setTogglingTeaser(true);
                      try {
                        await setShowComingSoonTeaser.mutateAsync(
                          !showComingSoonTeaser
                        );
                        ue.success(
                          !showComingSoonTeaser ? "AI Coming Soon teaser is now visible on the landing page" : "AI Coming Soon teaser hidden from landing page"
                        );
                      } catch (err) {
                        ue.error(
                          err instanceof Error ? err.message : "Failed to update"
                        );
                      } finally {
                        setTogglingTeaser(false);
                      }
                    },
                    disabled: togglingTeaser,
                    className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
                    style: {
                      background: showComingSoonTeaser ? "oklch(0.56 0.16 44)" : "oklch(0.82 0 0)"
                    },
                    "data-ocid": "admin.price_list.coming_soon_teaser.toggle",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
                        style: {
                          transform: showComingSoonTeaser ? "translateX(20px)" : "translateX(0)"
                        }
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DangerZone() {
  const deleteAllLeads = useAdminDeleteAllLeads();
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  async function handleConfirmDelete() {
    try {
      const count = await deleteAllLeads.mutateAsync();
      setShowConfirm(false);
      ue.success(
        `Deleted ${count.toLocaleString()} lead${count !== 1 ? "s" : ""} successfully`
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete leads"
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-8 rounded-xl border-2 p-5 space-y-4",
      style: {
        borderColor: "oklch(0.7 0.18 22 / 0.4)",
        background: "oklch(0.99 0.005 22)"
      },
      "data-ocid": "admin.danger_zone.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "w-5 h-5 shrink-0",
              style: { color: "oklch(0.52 0.2 22)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-base font-bold",
              style: { color: "oklch(0.36 0.16 22)" },
              children: "Danger Zone"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border p-4",
            style: {
              borderColor: "oklch(0.7 0.18 22 / 0.25)",
              background: "oklch(0.98 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Delete All Leads" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Permanently delete every lead on the platform. This cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowConfirm(true),
                  className: "shrink-0 gap-1.5 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400",
                  "data-ocid": "admin.danger_zone.delete_all_leads_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    "Delete All Leads"
                  ]
                }
              )
            ]
          }
        ),
        showConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: { background: "rgba(0,0,0,0.55)" },
            "data-ocid": "admin.danger_zone.confirm.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-4",
                style: { background: "oklch(0.99 0 0)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                        style: { background: "oklch(0.95 0.04 22)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Trash2,
                          {
                            className: "w-5 h-5",
                            style: { color: "oklch(0.52 0.2 22)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground", children: "Delete All Leads?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This action is permanent and cannot be undone." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed rounded-lg border border-red-200 bg-red-50 px-4 py-3", children: [
                    "Are you sure you want to delete",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-red-700", children: "ALL leads" }),
                    " across the entire platform? This cannot be undone."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => setShowConfirm(false),
                        disabled: deleteAllLeads.isPending,
                        className: "flex-1",
                        "data-ocid": "admin.danger_zone.confirm.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        onClick: handleConfirmDelete,
                        disabled: deleteAllLeads.isPending,
                        className: "flex-1 text-white gap-1.5",
                        style: { background: "oklch(0.46 0.2 22)" },
                        "data-ocid": "admin.danger_zone.confirm.confirm_button",
                        children: deleteAllLeads.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                          "Deleting…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          "Confirm Delete"
                        ] })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const TABS = [
  { key: "users", label: "Users", icon: Users },
  { key: "affiliates", label: "Affiliates", icon: Wallet },
  { key: "payouts", label: "Payouts", icon: DollarSign },
  { key: "price_list", label: "Price List", icon: LayoutList }
];
function AdminPanel({ onSignOut }) {
  const { identity } = useInternetIdentity();
  const {
    data: isAdmin,
    isLoading: adminLoading,
    isError: adminError
  } = useIsAdmin();
  const grantAdmin = useGrantAdmin();
  const [activeTab, setActiveTab] = reactExports.useState("users");
  const [selfGranting, setSelfGranting] = reactExports.useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!adminLoading) return;
    const id = window.setTimeout(() => setLoadingTimedOut(true), 8e3);
    return () => window.clearTimeout(id);
  }, [adminLoading]);
  const hasTriggeredBootstrap = reactExports.useRef(false);
  const grantAdminRef = reactExports.useRef(grantAdmin);
  grantAdminRef.current = grantAdmin;
  const isLoadingResolved = !adminLoading || loadingTimedOut || adminError;
  reactExports.useEffect(() => {
    if (isLoadingResolved && isAdmin === false && !adminError && !loadingTimedOut && identity && !hasTriggeredBootstrap.current) {
      hasTriggeredBootstrap.current = true;
      setSelfGranting(true);
      grantAdminRef.current.mutateAsync(identity.getPrincipal()).catch(() => {
        hasTriggeredBootstrap.current = false;
      }).finally(() => {
        setSelfGranting(false);
      });
    }
  }, [isLoadingResolved, isAdmin, adminError, loadingTimedOut, identity]);
  if (!isLoadingResolved || selfGranting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-64 gap-3",
        "data-ocid": "admin.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Loading admin panel…" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Back Office" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Admin panel — manage users, affiliates, and payouts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs",
              onClick: onSignOut,
              "data-ocid": "admin.sign_out_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                "Sign Out"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex rounded-xl border border-border overflow-hidden",
            "data-ocid": "admin.tabs",
            children: TABS.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(key),
                className: `flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${activeTab === key ? "text-white" : "text-muted-foreground hover:text-foreground bg-card"}`,
                style: activeTab === key ? {
                  background: "oklch(0.22 0.12 264)",
                  borderBottom: "2px solid oklch(0.56 0.16 44)"
                } : {},
                "data-ocid": `admin.${key}.tab`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
                ]
              },
              key
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, {}),
          activeTab === "affiliates" && /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliatesTab, {}),
          activeTab === "payouts" && /* @__PURE__ */ jsxRuntimeExports.jsx(PayoutsTab, {}),
          activeTab === "price_list" && /* @__PURE__ */ jsxRuntimeExports.jsx(PriceListTab, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DangerZone, {})
      ]
    }
  );
}
function AdminPage() {
  const [passwordPassed, setPasswordPassed] = reactExports.useState(() => {
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
    }
    setPasswordPassed(false);
  }
  if (!passwordPassed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoginForm, { onSuccess: handlePasswordSuccess });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border px-4 h-14 flex items-center gap-3 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-7 h-7 rounded-lg flex items-center justify-center",
          style: { background: "oklch(0.22 0.12 264)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-bold text-sm tracking-tight",
          style: { color: "oklch(0.22 0.12 264)" },
          children: "Tele-Blast Admin"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPanel, { onSignOut: handleSignOut }) })
  ] });
}
export {
  AffiliatesTab,
  PayoutsTab,
  StatCard,
  UsersTab,
  AdminPage as default
};
