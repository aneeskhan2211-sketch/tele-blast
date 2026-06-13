const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LeadsPage-xek8SRMx.js","assets/vendor-react-CYgLKadW.js","assets/dialog-qGLr7JS2.js","assets/vendor-DT3DREzx.js","assets/select-B4Jc19UW.js","assets/vendor-router-gX3Sk5jz.js","assets/TokenBalance-DS0BtRUo.js","assets/useAi-BlR_ZtV6.js","assets/vendor-ic-W9L5KZ_F.js","assets/usePhoneLinkPreference-DxhpuVQj.js","assets/LeadDetailPage-BqfEOBZ2.js","assets/PipelinePage-DPZcnXHH.js","assets/PowerDialerPage-C0pyUBHE.js","assets/textSpinner-7_PX0Sl3.js","assets/TemplatesPage-DLfwsUgA.js","assets/useTemplates-wZAhJOj1.js","assets/QueuePage-aZ-fntlG.js","assets/ColdCallScriptPage-CqlbB_gH.js","assets/VideoPage-CX8ooG4f.js","assets/PublicNavBar-Dh9EDIh3.js","assets/AdminPage-voMqd3jX.js","assets/AffiliateSignupPage-Bv1EOOHj.js","assets/useAffiliate-s2hD26ba.js","assets/AffiliateDashboardPage-2E5CTL1l.js","assets/PrivacyPolicyPage-uz3cnYJu.js","assets/DetailedPrivacyPolicyPage-BZ-EekYu.js","assets/TermsPage-BqinVdC7.js","assets/AdvertisePage-CMIODgfA.js","assets/useFeatureAccess-Mp1yBNjO.js","assets/SocialMediaPage-Dr0j4BIj.js","assets/LocalSeoPage-DqDy0W_h.js","assets/ImageCreatorPage-BE5kAS09.js","assets/DripPage-Db0OHO3l.js","assets/PricingPage-BAdi6Rby.js","assets/SupportPage-D6Tb34kK.js","assets/BlogPage-DHrlIqpU.js","assets/blogPosts-ge7YiFDG.js","assets/BlogPostPage-BFdepWqR.js","assets/ComparePostPage-DTQ8nY-P.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, d as ReactDOM } from "./vendor-react-CYgLKadW.js";
import { P as PipelineStage, u as useActor, c as createActor, a as useInternetIdentity, I as InternetIdentityProvider } from "./vendor-ic-W9L5KZ_F.js";
import { a as useQuery, u as useQueryClient, b as useMutation, c as useNavigate, d as useLocation, L as Link, e as useRouterState, N as Navigate, f as createRootRoute, g as createRoute, h as createRouter, O as Outlet, r as redirect, R as RouterProvider, Q as QueryClient, i as QueryClientProvider } from "./vendor-router-gX3Sk5jz.js";
import { z, $ as $e, S as Share, C as Cake, X, F as FileText, g as Share2, T as TrendingUp, j as CircleUser, U as User, k as CircleHelp, L as LogOut, l as Lock, m as ChevronDown, P as Phone, n as Shield, p as LayoutDashboard, q as Users, G as GitBranch, r as ListChecks, E as Ellipsis, t as ue, v as twMerge, x as clsx, y as Slot, A as cva, B as Checkbox$1, D as CheckboxIndicator, H as Check, I as ShieldCheck, J as CircleCheck, K as UserCheck, Z as Zap, M as Mail, N as ArrowLeft, O as CircleCheckBig, Q as ExternalLink, R as Smartphone, V as MessageCircle, W as TriangleAlert, Y as MessageSquare, _ as Monitor, a0 as CircleX, a1 as Download, a2 as CreditCard, a3 as Plus, a4 as RefreshCw, a5 as ArrowRight, a6 as BadgeCheck, a7 as FolderKanban, a8 as Building2, a9 as LogIn, aa as UserPlus, ab as Menu, ac as ChartColumn, ad as Bell, ae as Upload, af as DollarSign, ag as Star, ah as Save, ai as PhoneCall, aj as CircleAlert, ak as Root } from "./vendor-DT3DREzx.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const Toaster = ({ ...props }) => {
  const { theme = "system" } = z();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
const CHUNK_RELOAD_KEY$1 = "tb_chunk_reload_attempted";
function isChunkLoadError(error) {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return msg.includes("failed to fetch dynamically imported module") || msg.includes("loading chunk") || msg.includes("loading css chunk") || msg.includes("dynamically imported module") || error.name === "ChunkLoadError" || error.name === "TypeError" && msg.includes("fetch");
}
function reloadOnce() {
  const already = sessionStorage.getItem(CHUNK_RELOAD_KEY$1);
  if (already) {
    return false;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY$1, "1");
  window.location.reload();
  return true;
}
function ChunkErrorFallback({ loopDetected }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-64 gap-4 p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        className: "w-6 h-6 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        "aria-label": "Error",
        role: "img",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: loopDetected ? "The app was updated." : "Loading failed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: loopDetected ? "A new version of Tele-Blast is available. Please reload to continue." : "A page failed to load. Tap below to get the latest version." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          sessionStorage.removeItem(CHUNK_RELOAD_KEY$1);
          window.location.reload();
        },
        className: "px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
        "data-ocid": "error_boundary.reload_button",
        children: "Reload app"
      }
    )
  ] });
}
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    const reloadFailed = sessionStorage.getItem(CHUNK_RELOAD_KEY$1) === "1";
    if (reloadFailed) {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY$1);
    }
    this.state = { hasError: false, isChunkError: false, reloadFailed };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      isChunkError: isChunkLoadError(error)
    };
  }
  componentDidCatch(error, info) {
    if (isChunkLoadError(error)) {
      if (!reloadOnce()) {
        this.setState({ reloadFailed: true });
      }
      return;
    }
    console.error("[ErrorBoundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ChunkErrorFallback, { loopDetected: this.state.reloadFailed });
      }
      return this.props.fallback ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChunkErrorFallback, { loopDetected: false });
    }
    return this.props.children;
  }
}
const DISMISSED_KEY = "tele-blast-install-dismissed";
function isIOSSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isSafari = /safari/i.test(ua) && !/chrome|crios|fxios|opiOS/i.test(ua);
  return isIOS && isSafari;
}
function isAlreadyInstalled() {
  return !!navigator.standalone === true;
}
function InstallPrompt() {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed && isIOSSafari() && !isAlreadyInstalled()) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);
  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  }
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "install_prompt",
      className: "fixed bottom-20 left-4 right-4 z-50 rounded-xl border border-primary/30 bg-card shadow-lg px-4 py-3 flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300",
      role: "banner",
      "aria-label": "Install Tele-Blast",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: "Install Tele-Blast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: [
            "Tap",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 font-medium text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share, { className: "w-3 h-3 inline", "aria-hidden": "true" }),
              " Share"
            ] }),
            ", then",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Add to Home Screen"' })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "install_prompt.close_button",
            onClick: dismiss,
            className: "flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "aria-label": "Dismiss install prompt",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                className: "w-4 h-4",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Close" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const PIPELINE_STAGES = [
  {
    value: PipelineStage.Prospect,
    label: "Prospect",
    color: "bg-blue-100 text-blue-800"
  },
  {
    value: PipelineStage.Contacted,
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    value: PipelineStage.Qualified,
    label: "Qualified",
    color: "bg-green-100 text-green-800"
  },
  {
    value: PipelineStage.ClosedWon,
    label: "Closed Won",
    color: "bg-emerald-100 text-emerald-800"
  },
  {
    value: PipelineStage.ClosedLost,
    label: "Closed Lost",
    color: "bg-red-100 text-red-800"
  }
];
const REVENUE_RANGES = [
  "Under $100K",
  "$100K – $250K",
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M+"
];
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/fZu9AS7l31bR38A51RaIM1d";
const SUBSCRIPTION_TIER_KEY = "tele_blast_subscription_tier";
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = reactExports.useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint || window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  });
  reactExports.useEffect(() => {
    const update = () => setIsMobile(
      window.innerWidth < breakpoint || window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true
    );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);
  return isMobile;
}
function useBackend() {
  return useActor(createActor);
}
function useIsAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin", "isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4,
    retry: 1,
    retryDelay: 2e3
  });
}
function useAllUsers() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAdminUserList();
    },
    enabled: !!actor,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: false,
    retry: (failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 = msg.includes("ic0508") || msg.includes("is stopped") || msg.includes("canister stopped");
      if (isIC0508) return failureCount < 3;
      return failureCount < 1;
    },
    retryDelay: (_failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 = msg.includes("ic0508") || msg.includes("is stopped") || msg.includes("canister stopped");
      if (isIC0508) return 3e3;
      return 1e3;
    }
  });
}
function useAllAffiliates() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["admin", "affiliates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAffiliates();
    },
    enabled: !!actor
  });
}
function useAdminEnrichedPayouts() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin", "enrichedPayouts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetEnrichedPayouts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: "always"
  });
}
function useAdminEnsureAffiliateRecord() {
  const { actor } = useBackend();
  const { identity } = useInternetIdentity();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      name,
      email
    }) => {
      if (!actor) throw new Error("Not connected");
      const resolvedTarget = target ?? identity.getPrincipal();
      const result = await actor.adminEnsureAffiliateRecord(
        resolvedTarget,
        name,
        email
      );
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "affiliates"] });
      queryClient2.invalidateQueries({ queryKey: ["affiliate"] });
    }
  });
}
function useGrantAdmin() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.grantAdmin(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "users"] });
    }
  });
}
function useRevokeUserAccess() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.revokeUserAccess(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "users"] });
    }
  });
}
function useRestoreUserAccess() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.restoreUserAccess(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "users"] });
    }
  });
}
function useMarkPayoutPaid() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (commissionId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markPayoutPaid(commissionId);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "payouts"] });
      queryClient2.invalidateQueries({ queryKey: ["admin", "enrichedPayouts"] });
    }
  });
}
function useAdminDeleteAllLeads() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const leads = await actor.getLeads();
      if (leads.length === 0) return 0;
      const ids = leads.map((l) => l.id);
      const result = await actor.bulkDeleteLeads(ids);
      if (result.__kind__ === "err") throw new Error(result.err);
      return ids.length;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useGetPackageConfig() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["admin", "packageConfig"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getPackageConfig();
        return result;
      } catch {
        const tiers = ["pro"];
        return tiers.map((tier) => {
          try {
            const stored = localStorage.getItem(
              `tele-blast:pkg-enabled:${tier}`
            );
            if (stored !== null) return { tier, enabled: stored === "true" };
          } catch {
          }
          return { tier, enabled: true };
        });
      }
    },
    enabled: !!actor,
    staleTime: 5e3
  });
}
function useSetPackageEnabled() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tier,
      enabled
    }) => {
      if (!actor) throw new Error("Not connected");
      try {
        await actor.setPackageEnabled(tier, enabled);
      } catch {
        try {
          const key = `tele-blast:pkg-enabled:${tier}`;
          localStorage.setItem(key, String(enabled));
        } catch {
        }
      }
      return { tier, enabled };
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "packageConfig"] });
    }
  });
}
function useSetUserTier() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principal,
      tier
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.setUserTier(principal, tier);
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok.tier;
    },
    onSuccess: (_returnedTier) => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient2.invalidateQueries({ queryKey: ["subscriptionTier"] });
      queryClient2.invalidateQueries({ queryKey: ["featureAccess"] });
      queryClient2.invalidateQueries({ queryKey: ["tokenBalance"] });
      window.setTimeout(() => {
        void queryClient2.refetchQueries({
          queryKey: ["subscriptionTier"],
          exact: true
        });
        void queryClient2.refetchQueries({
          queryKey: ["featureAccess"],
          exact: true
        });
        void queryClient2.refetchQueries({
          queryKey: ["tokenBalance"],
          exact: true
        });
        void queryClient2.refetchQueries({ queryKey: ["admin", "users"] });
      }, 200);
    }
  });
}
const PRE_REG_LS_KEY$1 = "tele-blast:pre-registered";
function getLocalPreRegistered$1() {
  try {
    const raw = localStorage.getItem(PRE_REG_LS_KEY$1);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function useCreatePreRegisteredUser() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone
    }) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await actor.adminCreatePreRegisteredUser(
          name,
          email,
          phone
        );
        if ("err" in result) throw new Error(String(result.err));
        const stored = getLocalPreRegistered$1();
        const newEntry = {
          id: `pre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          email,
          phone,
          createdAt: BigInt(Date.now() * 1e6)
        };
        stored.push(newEntry);
        try {
          localStorage.setItem(PRE_REG_LS_KEY$1, JSON.stringify(stored));
        } catch {
        }
        return newEntry;
      } catch (err) {
        if (err instanceof Error && err.message === "Not connected") throw err;
        const stored = getLocalPreRegistered$1();
        const newEntry = {
          id: `pre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          email,
          phone,
          createdAt: BigInt(Date.now() * 1e6)
        };
        stored.push(newEntry);
        try {
          localStorage.setItem(PRE_REG_LS_KEY$1, JSON.stringify(stored));
        } catch {
        }
        return newEntry;
      }
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "preRegistered"] });
    }
  });
}
function useDeletePreRegisteredUser() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await actor.adminDeletePreRegisteredUser(email);
        if (result && "err" in result) throw new Error(String(result.err));
      } catch (backendErr) {
        if (backendErr instanceof Error && backendErr.message !== "Not connected") ;
        else {
          throw backendErr;
        }
      }
      try {
        const stored = getLocalPreRegistered$1();
        const updated = stored.filter((u) => u.email !== email);
        localStorage.setItem(PRE_REG_LS_KEY$1, JSON.stringify(updated));
      } catch {
      }
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["admin", "preRegistered"] });
    }
  });
}
function useGetPreRegisteredUsers() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["admin", "preRegistered"],
    queryFn: async () => {
      if (!actor) return getLocalPreRegistered$1();
      try {
        const result = await actor.adminGetPreRegisteredUsers();
        return result.map((u, i) => ({
          id: `backend-${i}-${u.email}`,
          name: u.name,
          email: u.email,
          phone: u.phone,
          createdAt: u.createdAt
        }));
      } catch {
        return getLocalPreRegistered$1();
      }
    },
    enabled: !!actor,
    staleTime: 3e4
  });
}
const COMING_SOON_KEY = "tele-blast:show-coming-soon-teaser";
function useGetShowComingSoonTeaser() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin", "showComingSoonTeaser"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        const result = await actor.getShowComingSoonTeaser();
        return result;
      } catch {
        try {
          const stored = localStorage.getItem(COMING_SOON_KEY);
          return stored === "true";
        } catch {
          return false;
        }
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useSetShowComingSoonTeaser() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (show) => {
      if (!actor) throw new Error("Not connected");
      try {
        await actor.setShowComingSoonTeaser(show);
      } catch {
        try {
          localStorage.setItem(COMING_SOON_KEY, String(show));
        } catch {
        }
      }
      return show;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({
        queryKey: ["admin", "showComingSoonTeaser"]
      });
    }
  });
}
function useLeads(pipelineId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["leads", pipelineId?.toString() ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getLeads();
      if (pipelineId == null) return all;
      return all.filter((l) => l.pipelineId === pipelineId);
    },
    enabled: !!actor && !isFetching
  });
}
function useLead(id) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["lead", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLead(id);
    },
    enabled: !!actor && !isFetching
  });
}
function useAddLead() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (lead) => {
      if (!actor) throw new Error("Not connected");
      return actor.addLead(lead);
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useUpdateLead() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateLead(id, updates);
    },
    onSuccess: (_data, { id }) => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["lead", id.toString()] });
      queryClient2.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useBulkImportLeads() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      csvLeads,
      stage,
      pipelineId
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bulkImportLeads(csvLeads, stage, pipelineId ?? null);
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useAddCallRecord() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      outcome
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCallRecord(leadId, outcome);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient2.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
function useAddTextRecord() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      messageBody
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTextRecord(leadId, messageBody);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient2.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
function useAddEmailRecord() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      timestamp
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEmailRecord(leadId, timestamp);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient2.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
function useEmailTemplates() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["emailTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmailTemplates();
    },
    enabled: !!actor && !isFetching
  });
}
function useSmsTemplates() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["smsTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSmsTemplates();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateLeadDnc() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      isDnc
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateLeadDnc(leadId, isDnc);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { leadId }) => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
    }
  });
}
function useBulkDeleteLeads() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (ids) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.bulkDeleteLeads(ids);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
      queryClient2.invalidateQueries({ queryKey: ["dashboardStats"] });
    }
  });
}
function useGetPipelines() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["pipelines"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPipelines();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreatePipeline() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createPipeline(name);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["pipelines"] });
    }
  });
}
function useUpdatePipeline() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updatePipeline(id, name);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["pipelines"] });
    }
  });
}
function useDeletePipeline() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deletePipeline(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["pipelines"] });
      queryClient2.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
const BACKEND_TIMEOUT_MS = 8e3;
function useBackendReady() {
  const { actor, isFetching } = useBackend();
  const ready = !!actor && !isFetching;
  const [timedOut, setTimedOut] = reactExports.useState(false);
  const timerStarted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (ready) return;
    if (timerStarted.current) return;
    timerStarted.current = true;
    const id = window.setTimeout(() => {
      setTimedOut(true);
    }, BACKEND_TIMEOUT_MS);
    return () => {
      window.clearTimeout(id);
    };
  }, [ready]);
  return { ready, timedOut };
}
function tierHasFeature(tier, feature) {
  const isPaid = tier === "pro";
  switch (feature) {
    case "core":
    case "power_dialer":
    case "dialer":
    case "new_lead_queue":
    case "forms":
      return isPaid;
    case "ai":
    case "advertise":
    case "seo":
    case "image_creator":
    case "drip":
    case "cold_call":
    case "google_voice":
    case "twilio":
      return false;
    default:
      return false;
  }
}
const VALID_PAID_TIERS = /* @__PURE__ */ new Set(["pro"]);
function normalizeTierValue(raw) {
  if (VALID_PAID_TIERS.has(raw)) return raw;
  if (raw === "pro_landing" || raw === "pro_ads" || raw === "pro_seo" || raw === "ultimate")
    return "pro";
  if (raw === "none" || raw === "") return "none";
  console.warn(
    `[useSubscription] Unexpected tier value from backend: "${raw}" — treating as "none".`
  );
  return "none";
}
function writeStoredTier(tier) {
  try {
    if (tier === "none") {
      localStorage.removeItem(SUBSCRIPTION_TIER_KEY);
    } else {
      localStorage.setItem(SUBSCRIPTION_TIER_KEY, tier);
    }
  } catch {
  }
}
function useSubscription() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  const backendReady = useBackendReady();
  const queryEnabled = backendReady.ready || backendReady.timedOut;
  const subscriptionQuery = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkSubscription();
    },
    enabled: queryEnabled,
    staleTime: 3e4
  });
  const tierQuery = useQuery({
    queryKey: ["subscriptionTier"],
    queryFn: async () => {
      if (!actor) {
        return "none";
      }
      try {
        const raw = await actor.getSubscriptionTier();
        const tier = normalizeTierValue(raw) ?? "none";
        writeStoredTier(tier);
        return tier;
      } catch {
      }
      return "none";
    },
    enabled: queryEnabled,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 2e3
  });
  const markSubscribedMut = useMutation({
    mutationFn: async (tier = "pro") => {
      if (!actor) throw new Error("Not connected");
      await actor.markSubscribed();
      writeStoredTier(tier);
      return tier;
    },
    onSuccess: (tier) => {
      queryClient2.setQueryData(
        ["subscriptionTier"],
        tier ?? "pro"
      );
      queryClient2.setQueryData(["subscription"], true);
      queryClient2.resetQueries({ queryKey: ["subscriptionTier"] });
      queryClient2.resetQueries({ queryKey: ["subscription"] });
      queryClient2.setQueryData(
        ["subscriptionTier"],
        tier ?? "pro"
      );
      queryClient2.setQueryData(["subscription"], true);
    }
  });
  const isSubscribed = subscriptionQuery.data ?? false;
  const subscriptionTier = tierQuery.data ?? "none";
  const isFreshlyLoaded = tierQuery.isFetched && !tierQuery.isLoading && !tierQuery.isFetching || backendReady.timedOut;
  const subscriptionLoaded = tierQuery.isFetched || backendReady.timedOut;
  const isLoading = (subscriptionQuery.isLoading || tierQuery.isLoading || tierQuery.isFetching || !backendReady.ready) && !backendReady.timedOut;
  return {
    isSubscribed,
    subscriptionTier,
    isLoading,
    isFreshlyLoaded,
    subscriptionLoaded,
    markSubscribed: (tier = "pro") => markSubscribedMut.mutateAsync(tier)
  };
}
const SWIPE_ROUTES = [
  "/dashboard",
  "/leads",
  "/pipeline",
  "/queue",
  "/power-dialer"
];
function useSwipeNavigation({
  currentPath,
  enabled
}) {
  const navigate = useNavigate();
  const touchStartX = reactExports.useRef(0);
  const touchStartY = reactExports.useRef(0);
  const isSwiping = reactExports.useRef(false);
  const handleTouchStart = reactExports.useCallback(
    (e) => {
      if (!enabled) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
    },
    [enabled]
  );
  const handleTouchEnd = reactExports.useCallback(
    (e) => {
      if (!enabled) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaX) < 50) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.5) return;
      const currentIndex = SWIPE_ROUTES.findIndex(
        (r) => currentPath === r || currentPath.startsWith(`${r}/`)
      );
      if (currentIndex === -1) return;
      if (deltaX < 0) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < SWIPE_ROUTES.length) {
          navigate({ to: SWIPE_ROUTES[nextIndex] });
        }
      } else {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          navigate({ to: SWIPE_ROUTES[prevIndex] });
        }
      }
    },
    [enabled, currentPath, navigate]
  );
  return { handleTouchStart, handleTouchEnd };
}
function triggerHaptic(pattern = [10]) {
  try {
    const isInstalledPWA = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (!isInstalledPWA) return;
    if (!navigator.vibrate) return;
    navigator.vibrate(pattern);
  } catch {
  }
}
function isBirthdayToday(birthday) {
  if (!birthday) return false;
  const today = /* @__PURE__ */ new Date();
  const [, month, day] = birthday.split("-").map(Number);
  return today.getMonth() + 1 === month && today.getDate() === day;
}
function BirthdayNotification({
  leads,
  onDismiss
}) {
  const navigate = useNavigate();
  const now = /* @__PURE__ */ new Date();
  const isAfter9am = now.getHours() >= 9;
  if (!isAfter9am) return null;
  const todayBirthdays = leads.filter((lead) => isBirthdayToday(lead.birthday));
  if (todayBirthdays.length === 0) return null;
  const message = todayBirthdays.length === 1 ? `🎂 Don't forget — ${todayBirthdays[0].name || "A lead"} has a birthday today!` : `🎂 ${todayBirthdays.length} leads have birthdays today! Check your Birthday Queue.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center z-40 w-full shrink-0",
      style: { background: "oklch(0.65 0.20 44)" },
      role: "alert",
      "aria-live": "polite",
      "data-ocid": "birthday-notification-banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/birthday-queue" }),
            className: "flex-1 flex items-center gap-2 px-4 py-3 text-white font-medium text-sm min-w-0 text-left hover:bg-white/10 active:bg-white/20 transition-colors",
            "data-ocid": "birthday-notification-link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "w-4 h-4 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: message })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "flex items-center justify-center w-10 h-10 shrink-0 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors rounded",
            "aria-label": "Dismiss birthday reminder",
            "data-ocid": "birthday-notification-dismiss",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
function OfflineBanner() {
  const [isOffline, setIsOffline] = reactExports.useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );
  reactExports.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (!isOffline) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "alert",
      "aria-live": "assertive",
      className: "offline-banner",
      style: {
        background: "#f97316",
        color: "#ffffff",
        textAlign: "center",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.875rem",
        fontWeight: 500,
        width: "100%",
        zIndex: 100,
        position: "relative"
      },
      children: "You are offline — some features may not be available"
    }
  );
}
const TAB_DASHBOARD = {
  to: "/dashboard",
  label: "Dashboard",
  icon: LayoutDashboard
};
const TAB_LEADS = { to: "/leads", label: "Leads", icon: Users };
const TAB_PIPELINE = { to: "/pipeline", label: "Pipeline", icon: GitBranch };
const TAB_QUEUES = { to: "/queue", label: "Queues", icon: ListChecks };
const TAB_DIALER = { to: "/power-dialer", label: "Dialer", icon: Phone };
const TAB_TEMPLATES = { to: "/templates", label: "Templates", icon: FileText };
const TAB_SUPPORT = { to: "/support", label: "Support", icon: CircleHelp };
const TAB_AFFILIATE = { to: "/affiliate", label: "Affiliate", icon: Share2 };
function getDesktopTabs(_tier) {
  return {
    main: [
      TAB_DASHBOARD,
      TAB_LEADS,
      TAB_PIPELINE,
      TAB_QUEUES,
      TAB_DIALER,
      TAB_TEMPLATES,
      TAB_SUPPORT
    ],
    dropdown: [TAB_AFFILIATE]
  };
}
const PRIMARY_NAV_ITEMS = [
  TAB_DASHBOARD,
  TAB_LEADS,
  TAB_PIPELINE,
  TAB_QUEUES,
  TAB_DIALER
];
const MORE_NAV_ITEMS = [TAB_TEMPLATES, TAB_AFFILIATE];
function Layout({ children }) {
  const { clear } = useInternetIdentity();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: leads = [] } = useLeads();
  const { data: isAdmin } = useIsAdmin();
  const { subscriptionTier } = useSubscription();
  const [profileOpen, setProfileOpen] = reactExports.useState(false);
  const [moreOpen, setMoreOpen] = reactExports.useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = reactExports.useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = reactExports.useState(false);
  const [transitionClass, setTransitionClass] = reactExports.useState("");
  const prevRouteIndex = reactExports.useRef(-1);
  const profileRef = reactExports.useRef(null);
  const moreRef = reactExports.useRef(null);
  const desktopMoreRef = reactExports.useRef(null);
  const mobileProfileRef = reactExports.useRef(null);
  const mainRef = reactExports.useRef(null);
  const TRANSITION_ROUTES = [
    "/dashboard",
    "/leads",
    "/pipeline",
    "/queue",
    "/power-dialer"
  ];
  const currentRouteIndex = TRANSITION_ROUTES.findIndex(
    (r) => location.pathname === r || location.pathname.startsWith(`${r}/`)
  );
  const isMobile = useIsMobile();
  const isStandalone = typeof window !== "undefined" && (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true);
  const showMobileUI = isMobile || isStandalone;
  reactExports.useEffect(() => {
    if (!isMobile && !isStandalone || currentRouteIndex === -1) {
      prevRouteIndex.current = currentRouteIndex;
      return;
    }
    if (prevRouteIndex.current !== -1 && prevRouteIndex.current !== currentRouteIndex) {
      const dir = currentRouteIndex > prevRouteIndex.current ? "right" : "left";
      const cls = dir === "right" ? "page-enter-right" : "page-enter-left";
      setTransitionClass(cls);
      const timer = setTimeout(() => setTransitionClass(""), 220);
      prevRouteIndex.current = currentRouteIndex;
      return () => clearTimeout(timer);
    }
    prevRouteIndex.current = currentRouteIndex;
  }, [currentRouteIndex, isMobile, isStandalone]);
  reactExports.useEffect(() => {
    if (!profileOpen && !moreOpen && !desktopMoreOpen && !mobileProfileOpen)
      return;
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
      if (desktopMoreRef.current && !desktopMoreRef.current.contains(e.target)) {
        setDesktopMoreOpen(false);
      }
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(e.target)) {
        setMobileProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [profileOpen, moreOpen, desktopMoreOpen, mobileProfileOpen]);
  const todayKey = `bday-dismissed-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
  const [dismissed, setDismissed] = reactExports.useState(
    () => typeof localStorage !== "undefined" && localStorage.getItem(todayKey) === "1"
  );
  const handleBirthdayDismiss = () => {
    setDismissed(true);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(todayKey, "1");
    }
  };
  const isActive = (to) => location.pathname === to || location.pathname.startsWith(`${to}/`);
  const handleSignOut = () => {
    clear();
    navigate({ to: "/" });
  };
  const { main: desktopMainTabs, dropdown: desktopDropdownTabs } = getDesktopTabs();
  const hasDesktopDropdown = desktopDropdownTabs.length > 0;
  const isDesktopMoreActive = desktopDropdownTabs.some(
    (item) => isActive(item.to)
  );
  const isLocked = (to) => subscriptionTier === "none" && to !== "/dashboard";
  function handleLockedTabClick(e, label) {
    e.preventDefault();
    ue.info(`Subscribe to access ${label}`, {
      description: "Get full access for $15/month",
      duration: 3e3,
      action: {
        label: "Subscribe",
        onClick: () => window.open(STRIPE_PAYMENT_LINK, "_blank")
      }
    });
  }
  const moreNavItems = MORE_NAV_ITEMS;
  const isMoreActive = moreNavItems.some((item) => isActive(item.to));
  const { handleTouchStart, handleTouchEnd } = useSwipeNavigation({
    currentPath: location.pathname,
    enabled: isMobile || isStandalone
  });
  function spawnRipple(e) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const ripple = document.createElement("span");
    ripple.className = "nav-ripple";
    ripple.style.left = `${touch.clientX - rect.left}px`;
    ripple.style.top = `${touch.clientY - rect.top}px`;
    target.style.position = "relative";
    target.style.overflow = "hidden";
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col bg-background",
      style: {
        minHeight: "100dvh",
        height: "100dvh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OfflineBanner, {}),
        showMobileUI && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "header",
          {
            className: "sticky top-0 z-50 border-b shrink-0",
            style: {
              background: "oklch(0.22 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 h-12 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded flex items-center justify-center",
                    style: { background: "oklch(0.56 0.16 44)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm tracking-tight", children: "Tele-Blast" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: mobileProfileRef, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setMobileProfileOpen((v) => !v),
                    className: "flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                    "aria-haspopup": "true",
                    "aria-expanded": mobileProfileOpen,
                    "aria-label": "Profile menu",
                    "data-ocid": "mobile-profile-menu-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-5 h-5" })
                  }
                ),
                mobileProfileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]",
                    style: {
                      background: "white",
                      borderColor: "oklch(0.91 0 0)"
                    },
                    role: "menu",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/profile",
                          onClick: () => setMobileProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "mobile-profile-menu-profile-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              User,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Profile"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/support",
                          onClick: () => setMobileProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "mobile-profile-menu-support-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CircleHelp,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Support"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-px mx-3 my-1",
                          style: { background: "oklch(0.93 0 0)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setMobileProfileOpen(false);
                            handleSignOut();
                          },
                          className: "w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-red-50",
                          style: { color: "oklch(0.45 0.18 20)" },
                          "data-ocid": "mobile-profile-menu-signout-btn",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 shrink-0" }),
                            "Sign out"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "header",
          {
            className: `desktop-nav-header sticky top-0 z-50 border-b shrink-0${showMobileUI ? " hidden" : ""}`,
            style: {
              background: "oklch(0.22 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-7 h-7 rounded flex items-center justify-center",
                    style: { background: "oklch(0.56 0.16 44)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-base tracking-tight", children: "Tele-Blast" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "nav",
                {
                  className: "hidden md:flex items-center gap-3 flex-1 min-w-0",
                  "data-ocid": "main-nav",
                  children: [
                    desktopMainTabs.map((item) => {
                      const active = isActive(item.to);
                      const locked = isLocked(item.to);
                      if (locked) {
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "relative flex items-center gap-1.5 px-1.5 py-1 text-sm font-medium whitespace-nowrap shrink-0 text-white/30 cursor-pointer",
                            onClick: (e) => handleLockedTabClick(e, item.label),
                            "data-ocid": `nav-link-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                            "aria-label": `${item.label} — subscribe to access`,
                            title: "Subscribe to access",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { filter: "blur(3px)" }, children: item.label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 shrink-0 text-white/30" })
                            ]
                          },
                          item.to
                        );
                      }
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: item.to,
                          className: `relative flex items-center gap-1.5 px-1.5 py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${active ? "text-white" : "text-white/60 hover:text-white"}`,
                          "data-ocid": `nav-link-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                          "aria-current": active ? "page" : void 0,
                          children: [
                            item.label,
                            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                                style: { background: "oklch(0.56 0.16 44)" },
                                "aria-hidden": "true"
                              }
                            )
                          ]
                        },
                        item.to
                      );
                    }),
                    hasDesktopDropdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", ref: desktopMoreRef, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setDesktopMoreOpen((v) => !v),
                          className: `relative flex items-center gap-1 px-1.5 py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isDesktopMoreActive || desktopMoreOpen ? "text-white" : "text-white/60 hover:text-white"}`,
                          "aria-haspopup": "true",
                          "aria-expanded": desktopMoreOpen,
                          "data-ocid": "desktop-nav-more-btn",
                          children: [
                            "More",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ChevronDown,
                              {
                                className: `w-3.5 h-3.5 transition-transform duration-150 ${desktopMoreOpen ? "rotate-180" : ""}`
                              }
                            ),
                            isDesktopMoreActive && !desktopMoreOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                                style: { background: "oklch(0.56 0.16 44)" },
                                "aria-hidden": "true"
                              }
                            )
                          ]
                        }
                      ),
                      desktopMoreOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute left-0 top-full mt-2 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]",
                          style: {
                            background: "white",
                            borderColor: "oklch(0.91 0 0)"
                          },
                          role: "menu",
                          children: desktopDropdownTabs.map((item) => {
                            const active = isActive(item.to);
                            const Icon = item.icon;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Link,
                              {
                                to: item.to,
                                onClick: () => setDesktopMoreOpen(false),
                                className: "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                                style: {
                                  color: active ? "oklch(0.46 0.16 44)" : "oklch(0.22 0.12 264)",
                                  background: active ? "oklch(0.56 0.16 44 / 0.06)" : void 0
                                },
                                "data-ocid": `desktop-more-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                                role: "menuitem",
                                "aria-current": active ? "page" : void 0,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Icon,
                                    {
                                      className: "w-4 h-4 shrink-0",
                                      style: {
                                        color: active ? "oklch(0.46 0.16 44)" : "oklch(0.45 0.12 264)"
                                      }
                                    }
                                  ),
                                  item.label
                                ]
                              },
                              item.to
                            );
                          })
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: profileRef, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setProfileOpen((o) => !o),
                    className: "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors text-sm min-h-[44px] min-w-[44px] justify-center",
                    "aria-haspopup": "true",
                    "aria-expanded": profileOpen,
                    "aria-label": "Profile menu",
                    "data-ocid": "profile-menu-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                    ]
                  }
                ),
                profileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute right-0 top-full mt-1 w-56 rounded-xl shadow-xl border overflow-hidden z-[60]",
                    style: {
                      background: "white",
                      borderColor: "oklch(0.91 0 0)"
                    },
                    role: "menu",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/profile",
                          onClick: () => setProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "profile-menu-profile-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              User,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Profile"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/twilio-setup",
                          onClick: () => setProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "profile-menu-phone-sms-setup-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Phone,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Phone/SMS Setup"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/affiliate",
                          onClick: () => setProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "profile-menu-affiliate-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Share2,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Affiliate Dashboard"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/support",
                          onClick: () => setProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "profile-menu-support-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CircleHelp,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Support"
                          ]
                        }
                      ),
                      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/admin",
                          onClick: () => setProfileOpen(false),
                          className: "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-secondary/50",
                          style: { color: "oklch(0.22 0.12 264)" },
                          "data-ocid": "profile-menu-admin-link",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Shield,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: { color: "oklch(0.45 0.12 264)" }
                              }
                            ),
                            "Back Office Admin"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-px mx-3 my-1",
                          style: { background: "oklch(0.93 0 0)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setProfileOpen(false);
                            handleSignOut();
                          },
                          className: "w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] hover:bg-red-50",
                          style: { color: "oklch(0.45 0.18 20)" },
                          "data-ocid": "profile-menu-signout-btn",
                          role: "menuitem",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 shrink-0" }),
                            "Sign out"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] }) })
            ] })
          }
        ),
        !dismissed && /* @__PURE__ */ jsxRuntimeExports.jsx(BirthdayNotification, { leads, onDismiss: handleBirthdayDismiss }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "main",
          {
            ref: mainRef,
            className: `flex-1 bg-background${transitionClass ? ` ${transitionClass}` : ""}`,
            style: {
              paddingTop: showMobileUI ? 0 : void 0,
              paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))"
            },
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: `border-t bg-muted/40 py-4 px-6 text-center shrink-0${showMobileUI ? " hidden" : " hidden md:block"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ".",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.hostname : ""
                  )}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-foreground transition-colors",
                  children: "Built with love using caffeine.ai"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: `bottom-tab-bar fixed bottom-0 left-0 right-0 z-50 flex items-center${showMobileUI ? "" : " hidden"}`,
            style: {
              background: "oklch(0.22 0.12 264)",
              borderTop: "1px solid oklch(0.28 0.12 264)",
              height: "64px",
              paddingBottom: "env(safe-area-inset-bottom, 0px)"
            },
            "aria-label": "Bottom navigation",
            "data-ocid": "bottom-nav",
            children: [
              [...PRIMARY_NAV_ITEMS].map((item) => {
                const active = isActive(item.to);
                const locked = isLocked(item.to);
                const Icon = item.icon;
                if (locked) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] active:opacity-70 relative opacity-40",
                      onClick: (e) => handleLockedTabClick(e, item.label),
                      "data-ocid": `bottom-nav-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                      "aria-label": `${item.label} — subscribe to access`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center w-9 h-7 rounded-lg relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              className: "w-5 h-5",
                              style: { color: "oklch(0.98 0 0 / 0.35)" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Lock,
                            {
                              className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5",
                              style: { color: "oklch(0.98 0 0 / 0.35)" }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-medium leading-none",
                            style: {
                              color: "oklch(0.98 0 0 / 0.35)",
                              filter: "blur(2px)"
                            },
                            children: item.label
                          }
                        )
                      ]
                    },
                    item.to
                  );
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: item.to,
                    className: "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] transition-colors active:scale-95 relative",
                    "data-ocid": `bottom-nav-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                    "aria-current": active ? "page" : void 0,
                    onTouchStart: (e) => {
                      triggerHaptic();
                      spawnRipple(e);
                    },
                    children: [
                      active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full transition-all duration-200",
                          style: { background: "oklch(0.56 0.16 44)" },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `flex items-center justify-center w-9 h-7 rounded-lg transition-colors ${active ? "bg-white/15" : ""}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              className: "w-5 h-5",
                              style: {
                                color: active ? "oklch(0.75 0.16 44)" : "oklch(0.98 0 0 / 0.55)"
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-medium leading-none",
                          style: {
                            color: active ? "oklch(0.75 0.16 44)" : "oklch(0.98 0 0 / 0.55)"
                          },
                          children: item.label
                        }
                      )
                    ]
                  },
                  item.to
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", ref: moreRef, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setMoreOpen((v) => !v),
                    className: "w-full flex flex-col items-center justify-center gap-0.5 py-2 min-h-[64px] active:scale-95 relative transition-transform",
                    "aria-haspopup": "true",
                    "aria-expanded": moreOpen,
                    "data-ocid": "bottom-nav-more-btn",
                    onTouchStart: (e) => {
                      triggerHaptic();
                      spawnRipple(e);
                    },
                    children: [
                      isMoreActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full",
                          style: { background: "oklch(0.56 0.16 44)" },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `flex items-center justify-center w-9 h-7 rounded-lg ${isMoreActive ? "bg-white/15" : ""}`,
                          children: moreOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            X,
                            {
                              className: "w-5 h-5",
                              style: {
                                color: isMoreActive ? "oklch(0.75 0.16 44)" : "oklch(0.98 0 0 / 0.55)"
                              }
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Ellipsis,
                            {
                              className: "w-5 h-5",
                              style: {
                                color: isMoreActive ? "oklch(0.75 0.16 44)" : "oklch(0.98 0 0 / 0.55)"
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-medium leading-none",
                          style: {
                            color: isMoreActive ? "oklch(0.75 0.16 44)" : "oklch(0.98 0 0 / 0.55)"
                          },
                          children: "More"
                        }
                      )
                    ]
                  }
                ),
                moreOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-full right-0 mb-1 w-52 rounded-xl shadow-xl border overflow-hidden z-[60]",
                    style: {
                      background: "white",
                      borderColor: "oklch(0.91 0 0)"
                    },
                    role: "menu",
                    children: moreNavItems.map((item) => {
                      const active = isActive(item.to);
                      const Icon = item.icon;
                      const isTemplatesWebDisabled = item.to === "/templates" && typeof window !== "undefined" && !window.matchMedia("(display-mode: standalone)").matches && !navigator.standalone && window.innerWidth >= 768;
                      if (isTemplatesWebDisabled) {
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-3 px-4 py-3 text-sm font-medium min-h-[48px] opacity-40 cursor-not-allowed",
                            style: { color: "oklch(0.22 0.12 264)" },
                            title: "Use the mobile app to access templates",
                            tabIndex: 0,
                            role: "menuitem",
                            "aria-disabled": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Icon,
                                {
                                  className: "w-4 h-4 shrink-0",
                                  style: { color: "oklch(0.45 0.12 264)" }
                                }
                              ),
                              item.label,
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "(mobile only)" })
                            ]
                          },
                          item.to
                        );
                      }
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: item.to,
                          onClick: () => setMoreOpen(false),
                          className: "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors min-h-[48px] hover:bg-secondary/50",
                          style: {
                            color: active ? "oklch(0.46 0.16 44)" : "oklch(0.22 0.12 264)",
                            background: active ? "oklch(0.56 0.16 44 / 0.06)" : void 0
                          },
                          "data-ocid": `more-menu-${item.to.replace(/^\//, "").replace(/\//g, "-")}`,
                          role: "menuitem",
                          "aria-current": active ? "page" : void 0,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Icon,
                              {
                                className: "w-4 h-4 shrink-0",
                                style: {
                                  color: active ? "oklch(0.46 0.16 44)" : "oklch(0.45 0.12 264)"
                                }
                              }
                            ),
                            item.label
                          ]
                        },
                        item.to
                      );
                    })
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
const STORAGE_KEY = "tele_blast_liability_accepted";
function getStorageKey(principalId) {
  return `${STORAGE_KEY}:${principalId}`;
}
function useLiabilityAcceptance() {
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const [hasAccepted, setHasAccepted] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!identity) {
      setIsLoading(false);
      setHasAccepted(false);
      return;
    }
    const principalId = identity.getPrincipal().toText();
    const key = getStorageKey(principalId);
    const stored = localStorage.getItem(key);
    setHasAccepted(stored === "true");
    setIsLoading(false);
  }, [identity]);
  const accept = reactExports.useCallback(
    async (_ipAddress) => {
      if (!identity) return;
      const principalId = identity.getPrincipal().toText();
      const key = getStorageKey(principalId);
      localStorage.setItem(key, "true");
      setHasAccepted(true);
      if (actor) {
        try {
          await actor.acceptLiability(_ipAddress ?? null);
        } catch {
        }
      }
    },
    [identity, actor]
  );
  return { isLoading, hasAccepted, accept };
}
function useProfile() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserProfile();
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor,
    staleTime: 6e4
  });
}
function useSaveProfile() {
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveUserProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient2.invalidateQueries({ queryKey: ["userProfile"] });
    }
  });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const LIABILITY_ITEMS = [
  "You are 18 or older and a U.S.‑based professional authorized to use communication tools for business purposes.",
  "All information you provide during registration is accurate and complete.",
  "Tele‑Blast is a U.S. service, and your information will be stored in the United States.",
  "You will use Tele‑Blast only for lawful, compliant communication, including all federal and state rules related to privacy, data protection, and messaging laws (such as HIPAA and the Telephone Consumer Protection Act).",
  "You will not impersonate anyone, misrepresent your identity, or use misleading caller ID or sender information.",
  "You will not misuse, overload, or interfere with the Tele‑Blast platform.",
  "You will not send spam, junk messages, or unauthorized promotional content through Tele‑Blast.",
  "You will not violate any agreements you have with your employer or any other organization."
];
function LiabilityModal({ onAccept }) {
  const [agreed, setAgreed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4",
      style: { background: "rgba(18, 28, 56, 0.92)" },
      "data-ocid": "liability.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "\n          bg-card flex flex-col\n          w-full h-[100dvh]\n          md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-xl\n          rounded-t-2xl\n          border border-border shadow-2xl\n        ",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Terms of Use" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please review and accept before continuing" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 min-h-0 overflow-y-auto px-5 py-4",
                style: {
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-4", children: "By using Tele‑Blast, you confirm that:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "liability.terms_list", children: LIABILITY_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex gap-2.5 text-sm text-muted-foreground leading-relaxed",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0 text-primary font-bold", children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                      ]
                    },
                    item.slice(0, 40)
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-border space-y-4 pb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-3",
                        "data-ocid": "liability.agree_checkbox",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Checkbox,
                            {
                              id: "liability-agree",
                              checked: agreed,
                              onCheckedChange: (checked) => setAgreed(checked === true),
                              className: "mt-0.5 shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "liability-agree",
                              className: "text-sm text-foreground leading-relaxed select-none cursor-pointer",
                              children: "I have read and agree to the above terms"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: "w-full",
                        disabled: !agreed,
                        onClick: onAccept,
                        "data-ocid": "liability.accept_button",
                        children: "Accept & Continue"
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
const BYPASS_EMAIL$3 = "mikebendett@gmail.com";
const INTENDED_ROUTE_KEY = "tele_blast_intended_route";
const GATE_HARD_TIMEOUT_MS = 15e3;
function ProtectedRoute({
  children,
  skipPaymentGate = false,
  skipLiabilityGate = false
}) {
  const { identity, loginStatus } = useInternetIdentity();
  const {
    isLoading: liabilityLoading,
    hasAccepted,
    accept
  } = useLiabilityAcceptance();
  const { isFreshlyLoaded } = useSubscription();
  const { data: profileData } = useProfile();
  const backendReady = useBackendReady();
  const routerState = useRouterState();
  const [hardTimedOut, setHardTimedOut] = reactExports.useState(false);
  const hardTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (skipPaymentGate) return;
    hardTimerRef.current = setTimeout(() => {
      setHardTimedOut(true);
    }, GATE_HARD_TIMEOUT_MS);
    return () => {
      if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
    };
  }, [skipPaymentGate]);
  if (loginStatus === "initializing") {
    let hasCachedSession = false;
    try {
      const sessionActive = localStorage.getItem("ii_session_active") === "true";
      const expiryStr = localStorage.getItem("ii_session_expiry");
      const notExpired = expiryStr ? Date.now() < Number(expiryStr) : false;
      hasCachedSession = sessionActive && notExpired;
    } catch {
    }
    if (hasCachedSession) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-screen bg-background",
        "data-ocid": "auth.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" })
      }
    );
  }
  if (identity) {
    try {
      localStorage.setItem("ii_session_active", "true");
      localStorage.setItem(
        "ii_session_expiry",
        String(Date.now() + 24 * 60 * 60 * 1e3)
      );
      localStorage.setItem("ii_principal", identity.getPrincipal().toText());
    } catch {
    }
  } else if (loginStatus !== "logging-in") {
    try {
      localStorage.removeItem("ii_session_active");
      localStorage.removeItem("ii_session_expiry");
      localStorage.removeItem("ii_principal");
    } catch {
    }
  }
  if (!identity) {
    try {
      const pathname = routerState.location.pathname;
      if (pathname && pathname !== "/" && pathname !== "/lander" && pathname !== "/login" && pathname !== "/security-login" && pathname !== "/payment" && pathname !== "/agreement") {
        sessionStorage.setItem(INTENDED_ROUTE_KEY, pathname);
      }
    } catch {
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  }
  if (!skipLiabilityGate) {
    if (liabilityLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center min-h-screen bg-background",
          "data-ocid": "liability.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" })
        }
      );
    }
    if (!hasAccepted) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LiabilityModal, { onAccept: accept });
    }
  }
  if (!skipPaymentGate) {
    const userEmail = profileData?.email ?? "";
    const isBypassUser = userEmail === BYPASS_EMAIL$3;
    if (isBypassUser) ;
    else if (hardTimedOut) ;
    else if (!isFreshlyLoaded && !backendReady.timedOut) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center min-h-screen bg-background",
          "data-ocid": "subscription.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" })
        }
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function readPendingProfile() {
  try {
    const raw = sessionStorage.getItem("pendingProfile");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function clearPendingProfile() {
  try {
    sessionStorage.removeItem("pendingProfile");
    sessionStorage.removeItem("tele_blast_from_presignup");
  } catch {
  }
}
function ActivateNewPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  const saveProfile = useSaveProfile();
  const [status, setStatus] = reactExports.useState("saving");
  const [message, setMessage] = reactExports.useState("Saving your profile…");
  const hasRunRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (hasRunRef.current) return;
    if (!identity) return;
    if (!actor) return;
    hasRunRef.current = true;
    async function run() {
      const pending = readPendingProfile();
      if (pending) {
        try {
          setStatus("saving");
          setMessage("Saving your profile…");
          await saveProfile.mutateAsync({
            name: pending.fullName,
            companyName: pending.businessName,
            phone: pending.phone,
            email: pending.email
          });
        } catch {
          console.warn("[ActivateNewPage] Profile save failed (non-fatal)");
          try {
            localStorage.setItem("pendingProfileSave", "true");
          } catch {
          }
        }
      }
      const email = pending?.email ?? "";
      if (email) {
        try {
          setStatus("checking");
          setMessage("Checking your account status…");
          const backendActor = actor;
          let isPreRegistered = false;
          if (backendActor.checkPreRegisteredByEmail) {
            isPreRegistered = await backendActor.checkPreRegisteredByEmail(
              email.toLowerCase()
            );
          }
          if (isPreRegistered) {
            setStatus("activating");
            setMessage("Activating your Pro account…");
            if (backendActor.activatePreRegisteredUser) {
              await backendActor.activatePreRegisteredUser(email.toLowerCase());
            }
            queryClient2.invalidateQueries({ queryKey: ["subscriptionTier"] });
            queryClient2.invalidateQueries({ queryKey: ["subscription"] });
            queryClient2.invalidateQueries({
              queryKey: ["admin", "preRegistered"]
            });
          }
        } catch {
          console.warn("[ActivateNewPage] Pre-reg check failed (non-fatal)");
        }
      }
      clearPendingProfile();
      setStatus("done");
      setMessage("All set! Taking you to your dashboard…");
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 800);
    }
    run().catch(() => {
      clearPendingProfile();
      setStatus("error");
      setMessage("Something went wrong. Redirecting…");
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 1500);
    });
  }, [identity, actor, saveProfile, queryClient2, navigate]);
  const iconColor = status === "done" ? "oklch(0.46 0.14 160)" : status === "error" ? "oklch(0.46 0.18 22)" : "oklch(0.56 0.16 44)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center px-5 py-16",
      style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
      "data-ocid": "activate-new.page",
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
            className: "w-full max-w-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center gap-5",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "activate-new.status_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md",
                  style: { background: iconColor },
                  children: status === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-1", children: status === "done" ? "Welcome to Tele-Blast!" : status === "error" ? "Almost there…" : "Setting up your account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: message })
              ] }),
              status !== "done" && status !== "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-2 text-xs", children: [
                { key: "saving", label: "Saving profile" },
                { key: "checking", label: "Checking account status" },
                { key: "activating", label: "Activating plan" },
                { key: "done", label: "Redirecting to dashboard" }
              ].map((step) => {
                const steps = ["saving", "checking", "activating", "done", "error"];
                const currentIdx = steps.indexOf(status);
                const stepIdx = steps.indexOf(step.key);
                const isDone = currentIdx > stepIdx || status === "done";
                const isActive = step.key === status;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2",
                    style: {
                      color: isDone ? "oklch(0.46 0.14 160)" : isActive ? "oklch(0.22 0.12 264)" : "oklch(0.70 0 0)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0",
                          style: {
                            background: isDone ? "oklch(0.46 0.14 160)" : isActive ? "oklch(0.56 0.16 44)" : "oklch(0.91 0 0)",
                            color: isDone || isActive ? "white" : "oklch(0.55 0 0)"
                          },
                          children: isDone ? "✓" : stepIdx + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "font-semibold" : "", children: step.label })
                    ]
                  },
                  step.key
                );
              }) })
            ]
          }
        )
      ]
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const PRE_REG_LS_KEY = "tele-blast:pre-registered";
function getLocalPreRegistered() {
  try {
    const raw = localStorage.getItem(PRE_REG_LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function ActivatePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient2 = useQueryClient();
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [checking, setChecking] = reactExports.useState(false);
  const [activated, setActivated] = reactExports.useState(false);
  const checkingRef = reactExports.useRef(false);
  function validateEmail(value) {
    if (!value.trim()) {
      setEmailError("Please enter your email address.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  }
  async function handleCheckRegistration() {
    if (!validateEmail(email)) return;
    if (checkingRef.current) return;
    checkingRef.current = true;
    setChecking(true);
    const normalizedEmail = email.trim().toLowerCase();
    try {
      let isPreRegistered = false;
      try {
        if (actor) {
          const backendActor = actor;
          if (backendActor.checkPreRegisteredByEmail) {
            isPreRegistered = await backendActor.checkPreRegisteredByEmail(normalizedEmail);
          } else {
            const local = getLocalPreRegistered();
            isPreRegistered = local.some(
              (u) => u.email.toLowerCase() === normalizedEmail
            );
          }
        } else {
          const local = getLocalPreRegistered();
          isPreRegistered = local.some(
            (u) => u.email.toLowerCase() === normalizedEmail
          );
        }
      } catch {
        const local = getLocalPreRegistered();
        isPreRegistered = local.some(
          (u) => u.email.toLowerCase() === normalizedEmail
        );
      }
      if (!isPreRegistered) {
        ue.info(
          "No pre-registration found for that email. Redirecting to subscription…",
          { duration: 3e3 }
        );
        navigate({ to: "/payment", replace: true });
        return;
      }
      try {
        if (actor) {
          const backendActor = actor;
          if (backendActor.activatePreRegisteredUser) {
            const result = await backendActor.activatePreRegisteredUser(normalizedEmail);
            if (result && "err" in result) {
              throw new Error(String(result.err));
            }
          }
          try {
            const stored = getLocalPreRegistered();
            const updated = stored.filter(
              (u) => u.email.toLowerCase() !== normalizedEmail
            );
            localStorage.setItem(PRE_REG_LS_KEY, JSON.stringify(updated));
          } catch {
          }
        }
      } catch (activationErr) {
        console.warn("Activation error (non-fatal):", activationErr);
      }
      queryClient2.invalidateQueries({ queryKey: ["subscriptionTier"] });
      queryClient2.invalidateQueries({ queryKey: ["featureAccess"] });
      queryClient2.invalidateQueries({ queryKey: ["admin", "preRegistered"] });
      setActivated(true);
      ue.success("Account activated! Welcome to Tele-Blast Pro.", {
        duration: 4e3
      });
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 1500);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      checkingRef.current = false;
      setChecking(false);
    }
  }
  function handleSkipToPayment() {
    navigate({ to: "/payment", replace: true });
  }
  if (activated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center px-5 py-16",
        style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
        "data-ocid": "activate.success.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg",
              style: { background: "oklch(0.46 0.14 160)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Account Activated!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm text-center max-w-xs", children: "Your Pro plan is active. Taking you to the dashboard…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-6 w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" })
        ]
      }
    );
  }
  const principalShort = identity ? (() => {
    const s = identity.getPrincipal().toString();
    return `${s.slice(0, 6)}…${s.slice(-4)}`;
  })() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center px-5 py-10",
      style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
      "data-ocid": "activate.page",
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
            className: "w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",
            style: { background: "oklch(0.99 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-5 text-center",
                  style: { background: "oklch(0.24 0.10 264)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                        style: { background: "oklch(0.56 0.16 44)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6 text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-white mb-1", children: "Welcome to Tele-Blast" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs leading-relaxed", children: [
                      "You're signed in",
                      principalShort && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono ml-1 text-white/40", children: [
                        "(",
                        principalShort,
                        ")"
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        style: { background: "oklch(0.22 0.12 264 / 0.08)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Zap,
                          {
                            className: "w-4 h-4",
                            style: { color: "oklch(0.22 0.12 264)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Pre-Registered Account?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: "Enter your email to activate your free Pro access" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "activate-email",
                          type: "email",
                          autoComplete: "email",
                          value: email,
                          onChange: (e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          },
                          onKeyDown: (e) => {
                            if (e.key === "Enter") handleCheckRegistration();
                          },
                          placeholder: "your@email.com",
                          className: `h-11 pl-10 ${emailError ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                          disabled: checking,
                          "data-ocid": "activate.email_input"
                        }
                      )
                    ] }),
                    emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-medium",
                        style: { color: "oklch(0.46 0.18 22)" },
                        "data-ocid": "activate.email.field_error",
                        children: emailError
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        onClick: handleCheckRegistration,
                        disabled: checking || !email.trim(),
                        className: "w-full min-h-[44px] text-white font-semibold gap-2",
                        style: { background: "oklch(0.22 0.12 264)" },
                        "data-ocid": "activate.check_button",
                        children: checking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                          "Checking…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
                          "Check Registration"
                        ] })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "OR" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mb-3", children: [
                    "Not pre-registered? Subscribe for",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "$30/month" }),
                    " ",
                    "to get full Pro access."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: handleSkipToPayment,
                      disabled: checking,
                      className: "w-full min-h-[44px] font-semibold",
                      "data-ocid": "activate.subscribe_button",
                      children: "Subscribe — $30/month"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs mt-8 text-center max-w-xs",
            style: { color: "oklch(0.98 0 0 / 0.3)" },
            children: "If you were pre-registered by your admin, use the email address they entered to activate your account instantly."
          }
        )
      ]
    }
  );
}
const AGREEMENT_ITEMS = [
  "You are 18 or older and a U.S.‑based professional authorized to use communication tools for business purposes.",
  "All information you provide during registration is accurate and complete.",
  "Tele‑Blast is a U.S. service, and your information will be stored in the United States.",
  "You will use Tele‑Blast only for lawful, compliant communication, including all federal and state rules related to privacy, data protection, and messaging laws (such as HIPAA and the Telephone Consumer Protection Act).",
  "You will not impersonate anyone, misrepresent your identity, or use misleading caller ID or sender information.",
  "You will not misuse, overload, or interfere with the Tele‑Blast platform.",
  "You will not send spam, junk messages, or unauthorized promotional content through Tele‑Blast.",
  "You will not violate any agreements you have with your employer or any other organization."
];
function AgreementPage() {
  const navigate = useNavigate();
  const { accept } = useLiabilityAcceptance();
  const [agreed, setAgreed] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [clientIp, setClientIp] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (res.ok) {
          const data = await res.json();
          if (data.ip) setClientIp(data.ip);
        }
      } catch {
      }
    })();
  }, []);
  async function handleAccept() {
    if (!agreed || submitting) return;
    setSubmitting(true);
    await accept(clientIp);
    navigate({ to: "/dashboard", replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-dvh",
      style: { background: "oklch(0.18 0.14 264)" },
      "data-ocid": "agreement.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "flex items-center gap-3 px-5 py-4 shadow-md shrink-0",
            style: { background: "oklch(0.22 0.12 264)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-lg flex items-center justify-center",
                  style: { background: "oklch(0.56 0.16 44)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg tracking-tight", children: "Tele-Blast" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-3 flex items-center gap-2 text-xs font-medium shrink-0",
            style: {
              background: "oklch(0.22 0.12 264 / 0.6)",
              borderBottom: "1px solid oklch(0.56 0.16 44 / 0.2)",
              color: "oklch(0.82 0.14 44)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 shrink-0" }),
              "Step 2 of 2 — Review & Accept Terms"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-5 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-2xl font-bold mb-2",
                style: { color: "oklch(0.98 0 0)" },
                children: "Terms of Use"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm leading-relaxed",
                style: { color: "oklch(0.98 0 0 / 0.6)" },
                children: "Please read and accept the following terms before setting up your profile. By accepting, you agree to use Tele-Blast responsibly and in compliance with all applicable laws."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 space-y-4",
              style: {
                background: "oklch(0.22 0.12 264)",
                border: "1px solid oklch(0.30 0.12 264)"
              },
              "data-ocid": "agreement.terms_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "oklch(0.98 0 0 / 0.85)" },
                    children: "By using Tele-Blast, you confirm that:"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "agreement.terms_list", children: AGREEMENT_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex gap-2.5 text-sm leading-relaxed",
                    style: { color: "oklch(0.98 0 0 / 0.7)" },
                    "data-ocid": `agreement.term.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "mt-0.5 shrink-0 font-bold",
                          style: { color: "oklch(0.75 0.16 44)" },
                          children: "•"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                    ]
                  },
                  item.slice(0, 40)
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap gap-4 text-xs",
              style: { color: "oklch(0.98 0 0 / 0.45)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/terms",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "underline underline-offset-2 hover:opacity-80 transition-opacity",
                    "data-ocid": "agreement.terms_link",
                    children: "Full Terms & Conditions"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/privacy-policy",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "underline underline-offset-2 hover:opacity-80 transition-opacity",
                    "data-ocid": "agreement.privacy_link",
                    children: "Privacy Policy"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-4 rounded-xl",
              style: {
                background: "oklch(0.56 0.16 44 / 0.08)",
                border: "1px solid oklch(0.56 0.16 44 / 0.25)"
              },
              "data-ocid": "agreement.agree_checkbox",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: "agreement-checkbox",
                    checked: agreed,
                    onCheckedChange: (checked) => setAgreed(checked === true),
                    className: "mt-0.5 shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "agreement-checkbox",
                    className: "text-sm leading-relaxed select-none cursor-pointer",
                    style: { color: "oklch(0.98 0 0 / 0.85)" },
                    children: "I have read and agree to the Terms of Use and Privacy Policy"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleAccept,
              disabled: !agreed || submitting,
              className: "w-full rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed",
              style: {
                background: "oklch(0.56 0.16 44)",
                height: "3.25rem"
              },
              "data-ocid": "agreement.accept_button",
              children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                "Continuing…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                "Accept & Continue to Dashboard"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-xs text-center",
              style: { color: "oklch(0.98 0 0 / 0.3)" },
              children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " Tele-Blast · tele-blast.com"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const LS_KEY = "imessage_send_preference";
function getIMessagePreference() {
  try {
    return localStorage.getItem(LS_KEY) === "true";
  } catch {
    return false;
  }
}
function setIMessagePreference(value) {
  try {
    localStorage.setItem(LS_KEY, value ? "true" : "false");
  } catch {
  }
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const LS_PHONE_PROVIDER = "phoneProvider";
function loadPhoneProvider() {
  try {
    const raw = localStorage.getItem(LS_PHONE_PROVIDER);
    if (raw === "google_voice" || raw === "cell_phone") return raw;
    const legacy = localStorage.getItem("google_voice_enabled");
    if (legacy === "true") {
      localStorage.setItem(LS_PHONE_PROVIDER, "google_voice");
      return "google_voice";
    }
  } catch {
  }
  return "cell_phone";
}
function savePhoneProvider(provider) {
  try {
    localStorage.setItem(LS_PHONE_PROVIDER, provider);
    localStorage.setItem(
      "google_voice_enabled",
      String(provider === "google_voice")
    );
  } catch {
  }
}
function buildGoogleVoiceUrl(phoneNumber) {
  if (phoneNumber) {
    const digits = phoneNumber.replace(/\D/g, "");
    const e164 = digits.length === 10 ? `1${digits}` : digits;
    if (e164.length >= 7) {
      return `https://voice.google.com/u/0/calls?a=nc,%2B${e164}`;
    }
  }
  return "https://voice.google.com";
}
function TwilioSetupPage$1() {
  const navigate = useNavigate();
  const [provider, setProvider] = reactExports.useState(loadPhoneProvider);
  const handleSelect = (p) => {
    setProvider(p);
    savePhoneProvider(p);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/profile" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]",
        "data-ocid": "phone-setup.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Profile"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Phone/SMS Setup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Choose how you want to make calls and send texts from Tele-Blast." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "phone-setup.provider_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSelect("google_voice"),
          className: `w-full rounded-xl border-2 transition-colors text-left ${provider === "google_voice" ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
          "data-ocid": "phone-setup.google_voice_option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-4 min-h-[72px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${provider === "google_voice" ? "border-primary" : "border-border"}`,
                  children: provider === "google_voice" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full",
                      style: { background: "oklch(0.56 0.16 44)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Phone,
                {
                  className: "w-5 h-5 shrink-0",
                  style: {
                    color: provider === "google_voice" ? "oklch(0.46 0.16 44)" : "oklch(0.55 0 0)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Google Voice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Clicking any phone number opens Google Voice in a new tab, pre-filled to dial." })
              ] }),
              provider === "google_voice" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "shrink-0 flex items-center gap-1 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                "Active"
              ] })
            ] }),
            provider === "google_voice" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 pb-4 space-y-3 border-t pt-3",
                style: { borderColor: "oklch(0.56 0.16 44 / 0.15)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                    "For one-click dialing, open Google Voice and register your browser. A banner will appear — click",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: "Register" }),
                    ", then",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: "Allow" }),
                    " ",
                    "when prompted."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "w-full min-h-[44px] gap-2 border-primary/30 text-primary hover:bg-primary/5",
                      onClick: (e) => {
                        e.stopPropagation();
                        window.open(
                          "https://voice.google.com/u/0/calls?forceBanner=tel-registration",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      },
                      "data-ocid": "phone-setup.google_voice_register_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                        "Open Google Voice & Register"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Don't have Google Voice?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "https://voice.google.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline hover:text-foreground transition-colors",
                        onClick: (e) => e.stopPropagation(),
                        children: "Sign up for free at voice.google.com"
                      }
                    ),
                    " ",
                    "— requires a Google account."
                  ] })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSelect("cell_phone"),
          className: `w-full rounded-xl border-2 transition-colors text-left ${provider === "cell_phone" ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
          "data-ocid": "phone-setup.cell_phone_option",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-4 min-h-[72px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${provider === "cell_phone" ? "border-primary" : "border-border"}`,
                  children: provider === "cell_phone" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full",
                      style: { background: "oklch(0.56 0.16 44)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Smartphone,
                {
                  className: "w-5 h-5 shrink-0",
                  style: {
                    color: provider === "cell_phone" ? "oklch(0.46 0.16 44)" : "oklch(0.55 0 0)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "My Cell Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Clicking a phone number opens your cell phone dialer or messages app directly." })
              ] }),
              provider === "cell_phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "shrink-0 flex items-center gap-1 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                "Active"
              ] })
            ] }),
            provider === "cell_phone" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 pb-4 border-t pt-3",
                style: { borderColor: "oklch(0.56 0.16 44 / 0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                  "No setup required. Make sure your phone number is saved in your",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "underline hover:text-foreground transition-colors",
                      onClick: (e) => {
                        e.stopPropagation();
                        navigate({ to: "/profile" });
                      },
                      children: "Profile"
                    }
                  ),
                  ". When you tap a phone number in the app, your device will offer to call or text via your carrier."
                ] })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold", children: "1" }),
          "Select your preferred calling method above"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold", children: "2" }),
          "Click any lead's phone number in the app"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold", children: "3" }),
          "Complete the call or text, then return to log the outcome"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
  ] }) });
}
const TwilioSetupPage$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildGoogleVoiceUrl,
  default: TwilioSetupPage$1
}, Symbol.toStringTag, { value: "Module" }));
function buildGoogleVoiceSmsUrl(_phoneNumber) {
  return "https://voice.google.com/u/0/messages";
}
function isGoogleVoiceEnabled() {
  try {
    return localStorage.getItem("googleVoiceEnabled") === "true" || localStorage.getItem("google_voice_enabled") === "true" || !!localStorage.getItem("google_voice_url");
  } catch {
    return false;
  }
}
function handlePhoneCall(phoneNumber, _phoneLinkEnabled, googleVoiceEnabled, _zoomPhoneEnabled = false) {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return;
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  if (googleVoiceEnabled) {
    window.open(
      buildGoogleVoiceUrl(phoneNumber),
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }
  if (isMobile) {
    window.location.href = `tel:${digits}`;
  } else {
    window.open(`tel:${digits}`, "_blank");
  }
}
function handleSmsSend(phoneNumber, body, _phoneLinkEnabled, googleVoiceEnabled = false, _zoomPhoneEnabled = false) {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return;
  if (googleVoiceEnabled) {
    window.open(
      buildGoogleVoiceSmsUrl(),
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }
  const encodedBody = body ? encodeURIComponent(body) : "";
  const smsUri = encodedBody ? `sms:${digits}?body=${encodedBody}` : `sms:${digits}`;
  window.location.href = smsUri;
}
function IMessageCheckbox({
  checked,
  onChange,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      className: `flex items-center gap-2 cursor-pointer select-none group ${className}`,
      "data-ocid": "imessage.checkbox",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked,
              onChange: (e) => onChange(e.target.checked),
              className: "sr-only peer",
              "aria-label": "Send via iMessage"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-4 h-4 rounded border-2 transition-all duration-150 flex items-center justify-center
            ${checked ? "bg-accent border-accent" : "border-border bg-background group-hover:border-accent/60"}`,
              children: checked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-2.5 h-2.5 text-white",
                  fill: "none",
                  viewBox: "0 0 10 8",
                  stroke: "currentColor",
                  strokeWidth: 2.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  role: "img",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Checked" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 4l2.5 2.5L9 1" })
                  ]
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MessageCircle,
            {
              className: `w-4 h-4 transition-colors ${checked ? "text-[oklch(0.55_0.18_215)]" : "text-muted-foreground"}`,
              style: { color: checked ? "oklch(0.55 0.18 215)" : void 0 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-medium transition-colors ${checked ? "text-foreground" : "text-muted-foreground"}`,
              children: "Send via iMessage"
            }
          )
        ] })
      ]
    }
  );
}
function SmsQuickSendPopover({
  leadName,
  phone,
  onClose,
  onSent,
  isDnc = false
}) {
  const [useIMessage, setUseIMessage] = reactExports.useState(getIMessagePreference);
  const [step, setStep] = reactExports.useState(isDnc ? "choice" : "choice");
  const [customMessage, setCustomMessage] = reactExports.useState("");
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState(
    null
  );
  const overlayRef = reactExports.useRef(null);
  const { data: templates = [] } = useSmsTemplates();
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  const handleToggle = (v) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };
  const messageBody = selectedTemplate ? selectedTemplate.body : customMessage;
  const canSend = messageBody.trim().length > 0;
  const handleSend = () => {
    if (isDnc || !canSend) return;
    handleSmsSend(phone, messageBody.trim());
    onSent?.(messageBody.trim(), useIMessage);
    onClose();
  };
  const handleChooseNew = () => {
    setSelectedTemplate(null);
    setStep("compose");
  };
  const handleChooseTemplate = () => {
    if (templates.length === 0) {
      setStep("compose");
    } else {
      setStep("template");
    }
  };
  const handleSelectTemplate = (tpl) => {
    setSelectedTemplate(tpl);
    setStep("compose");
  };
  const handleBackToChoice = () => {
    setStep("choice");
    setSelectedTemplate(null);
    setCustomMessage("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: overlayRef,
      className: "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4",
      "data-ocid": "sms_quick_send.dialog",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col",
          style: {
            maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDnc ? "bg-destructive/10" : "bg-primary/10"}`,
                    children: isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: isDnc ? "Do Not Contact" : "Send Text" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "to ",
                    leadName
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
                  "aria-label": "Close",
                  "data-ocid": "sms_quick_send.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 min-h-0", children: isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3",
                "data-ocid": "sms_quick_send.dnc_banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-medium", children: "This lead is on the Do Not Call list. Texting is blocked." })
                ]
              }
            ) : step === "choice" ? (
              /* ── Step 1: New or Template ── */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "sms_quick_send.choice_step", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "How would you like to compose your message?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleChooseNew,
                    className: "w-full text-left px-4 py-3.5 rounded-xl border-2 border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "data-ocid": "sms_quick_send.new_message_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "New Message" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Type a fresh message" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleChooseTemplate,
                    className: "w-full text-left px-4 py-3.5 rounded-xl border-2 border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "data-ocid": "sms_quick_send.use_template_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Use Template" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: templates.length > 0 ? `Choose from ${templates.length} saved template${templates.length !== 1 ? "s" : ""}` : "No templates saved yet" })
                    ]
                  }
                )
              ] })
            ) : step === "template" ? (
              /* ── Step 2: Template Picker ── */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "sms_quick_send.template_step", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleBackToChoice,
                      className: "text-xs text-primary hover:underline",
                      "data-ocid": "sms_quick_send.back_button",
                      children: "← Back"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Choose a template" })
                ] }),
                templates.map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSelectTemplate(tpl),
                    className: `w-full text-left px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedTemplate?.id === tpl.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
                    "data-ocid": `sms_quick_send.template.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: tpl.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: [
                        tpl.body.slice(0, 80),
                        tpl.body.length > 80 ? "…" : ""
                      ] })
                    ]
                  },
                  tpl.id
                ))
              ] })
            ) : (
              /* ── Step 3: Compose + iMessage ── */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "sms_quick_send.compose_step", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleBackToChoice,
                      className: "text-xs text-primary hover:underline",
                      "data-ocid": "sms_quick_send.back_to_choice_button",
                      children: "← Back"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: selectedTemplate ? `Template: ${selectedTemplate.name}` : "New Message" })
                ] }),
                selectedTemplate ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/30 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: selectedTemplate.body }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    placeholder: "Type your message…",
                    value: customMessage,
                    onChange: (e) => setCustomMessage(e.target.value),
                    className: "min-h-24 resize-none text-base",
                    style: { fontSize: "16px" },
                    autoFocus: true,
                    "data-ocid": "sms_quick_send.message_textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IMessageCheckbox,
                  {
                    checked: useIMessage,
                    onChange: handleToggle
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: useIMessage ? "Opens your native Messages app (iMessage on iPhone). Blue bubbles confirm delivery." : "Opens your native Messages app with the message pre-filled." })
              ] })
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 px-5 border-t border-border shrink-0",
                style: {
                  paddingTop: "1rem",
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1 min-h-[48px]",
                      onClick: isDnc || step === "choice" ? onClose : handleBackToChoice,
                      "data-ocid": "sms_quick_send.cancel_button",
                      children: isDnc || step === "choice" ? "Cancel" : "Back"
                    }
                  ),
                  !isDnc && step === "compose" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "flex-1 min-h-[48px] font-semibold text-white bg-primary hover:bg-primary/90",
                      onClick: handleSend,
                      disabled: !canSend,
                      "data-ocid": "sms_quick_send.confirm_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                        "Send Text"
                      ]
                    }
                  ),
                  !isDnc && step === "template" && selectedTemplate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 min-h-[48px] font-semibold text-white bg-primary hover:bg-primary/90",
                      onClick: () => handleSelectTemplate(selectedTemplate),
                      "data-ocid": "sms_quick_send.use_selected_button",
                      children: "Use Template"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
const EMPTY_STATS = {
  prospects: 0n,
  contacted: 0n,
  qualified: 0n,
  closedWon: 0n,
  closedLost: 0n,
  recentLeads: []
};
function useDashboardStats(pipelineId) {
  const { actor } = useBackend();
  const backendReady = useBackendReady();
  const isEnabled = backendReady.ready || backendReady.timedOut;
  const query = useQuery({
    queryKey: ["dashboardStats", pipelineId?.toString() ?? "all"],
    queryFn: async () => {
      if (!actor) {
        return EMPTY_STATS;
      }
      try {
        return await actor.getDashboardStats(pipelineId ?? null);
      } catch {
        return EMPTY_STATS;
      }
    },
    enabled: isEnabled,
    retry: 1,
    retryDelay: 2e3
  });
  const isLoading = query.isLoading && !backendReady.timedOut;
  return {
    ...query,
    isLoading
  };
}
function PipelineFilter({
  pipelines,
  selectedId,
  onChange
}) {
  if (pipelines.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: selectedId?.toString() ?? "all",
        onChange: (e) => {
          const val = e.target.value;
          onChange(val === "all" ? null : BigInt(val));
        },
        className: "appearance-none pl-8 pr-7 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[36px] min-w-[140px] transition-colors hover:border-primary/40",
        "data-ocid": "dashboard-pipeline-filter",
        "aria-label": "Filter dashboard by pipeline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Pipelines" }),
          pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.name }, p.id.toString()))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  stageKey,
  accent,
  iconBg
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => navigate({ to: "/pipeline", search: { stage: stageKey } }),
      className: "group w-full text-left bg-card border border-border rounded-xl p-3 shadow-sm hover:shadow-md hover:border-primary/30 active:scale-[0.97] transition-all duration-200 min-h-[80px]",
      "data-ocid": `stat-card-${stageKey}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${accent}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-2xl font-bold text-foreground tabular-nums", children: Number(value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-tight", children: label })
        ] })
      ]
    }
  );
}
function StageBadge({ stage }) {
  const found = PIPELINE_STAGES.find((s) => s.value === stage);
  if (!found) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${found.color}`,
      children: found.label
    }
  );
}
function RecentLeadRow({
  lead
}) {
  const [showSmsSend, setShowSmsSend] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/leads/$id",
        params: { id: lead.id.toString() },
        className: "px-4 py-3.5 flex items-center gap-3 hover:bg-muted/30 active:bg-muted/50 transition-colors min-h-[64px]",
        "data-ocid": "lead-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate min-w-0", children: lead.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stage: lead.pipelineStage })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              lead.industry,
              lead.city ? ` · ${lead.city}${lead.state ? `, ${lead.state}` : ""}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-0.5 shrink-0",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: [
                lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20",
                    title: "Call",
                    "data-ocid": "call-btn",
                    "aria-label": `Call ${lead.name}`,
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePhoneCall(lead.phone, false, isGoogleVoiceEnabled());
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                  }
                ),
                lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "p-2 min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10",
                    title: "Text",
                    "data-ocid": "text-btn",
                    "aria-label": `Text ${lead.name}`,
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowSmsSend(true);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
                  }
                ),
                lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `mailto:${encodeURIComponent(lead.email)}`,
                    className: "p-2 min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10",
                    title: "Email",
                    "data-ocid": "email-btn",
                    "aria-label": `Email ${lead.name}`,
                    onClick: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    showSmsSend && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsQuickSendPopover,
      {
        leadName: lead.name,
        phone: lead.phone,
        onClose: () => setShowSmsSend(false)
      }
    )
  ] });
}
const STAT_CARDS = [
  {
    label: "Prospects",
    key: "prospects",
    stageKey: "Prospect",
    icon: Users,
    accent: "text-primary",
    iconBg: "bg-primary/10"
  },
  {
    label: "Contacted",
    key: "contacted",
    stageKey: "Contacted",
    icon: TrendingUp,
    accent: "text-accent-foreground",
    iconBg: "bg-accent"
  },
  {
    label: "Qualified",
    key: "qualified",
    stageKey: "Qualified",
    icon: UserCheck,
    accent: "text-primary",
    iconBg: "bg-primary/15"
  },
  {
    label: "Closed Won",
    key: "closedWon",
    stageKey: "ClosedWon",
    icon: BadgeCheck,
    accent: "text-primary",
    iconBg: "bg-primary/20"
  },
  {
    label: "Closed Lost",
    key: "closedLost",
    stageKey: "ClosedLost",
    icon: CircleX,
    accent: "text-muted-foreground",
    iconBg: "bg-muted"
  }
];
function DashboardPage() {
  const [selectedPipelineId, setSelectedPipelineId] = reactExports.useState(
    null
  );
  const navigate = useNavigate();
  const queryClient2 = useQueryClient();
  const backendReady = useBackendReady();
  const { data: stats, isLoading: statsLoading } = useDashboardStats(selectedPipelineId);
  const { data: pipelines = [] } = useGetPipelines();
  const { subscriptionTier, markSubscribed } = useSubscription();
  const hasHandledStripeReturn = reactExports.useRef(false);
  const [showDesktopWarning, setShowDesktopWarning] = reactExports.useState(() => {
    try {
      if (localStorage.getItem("desktopWarningDismissed") === "1") return false;
    } catch {
    }
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    return !isMobile && !isStandalone;
  });
  const dismissDesktopWarning = () => {
    try {
      localStorage.setItem("desktopWarningDismissed", "1");
    } catch {
    }
    setShowDesktopWarning(false);
  };
  const isIosDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAlreadyInstalled2 = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(
    null
  );
  const [showPwaInstall, setShowPwaInstall] = reactExports.useState(false);
  const [showIosInstructions, setShowIosInstructions] = reactExports.useState(false);
  const [pwaDismissed, setPwaDismissed] = reactExports.useState(() => {
    try {
      return localStorage.getItem("pwaInstallDismissed") === "1";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile || isAlreadyInstalled2 || pwaDismissed) return;
    if (isIosDevice) {
      const t = setTimeout(() => setShowPwaInstall(true), 1500);
      return () => clearTimeout(t);
    }
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPwaInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [pwaDismissed, isIosDevice, isAlreadyInstalled2]);
  const handlePwaInstall = async () => {
    if (isIosDevice) {
      setShowIosInstructions(true);
      setShowPwaInstall(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setShowPwaInstall(false);
      setDeferredPrompt(null);
    }
  };
  const dismissPwaInstall = () => {
    try {
      localStorage.setItem("pwaInstallDismissed", "1");
    } catch {
    }
    setPwaDismissed(true);
    setShowPwaInstall(false);
    setShowIosInstructions(false);
  };
  const isLoading = statsLoading && !backendReady.timedOut;
  const dataFailed = backendReady.timedOut && !stats?.prospects && stats?.prospects !== 0n;
  const isPaidTier = subscriptionTier !== "none";
  reactExports.useEffect(() => {
    if (hasHandledStripeReturn.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") !== "true") return;
    hasHandledStripeReturn.current = true;
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
    markSubscribed().then(() => {
      navigate({ to: "/agreement", replace: true });
    }).catch(() => {
      ue.error("Subscription activation failed. Please contact support.");
    });
  }, [markSubscribed, navigate]);
  const totalLeads = stats ? Number(stats.prospects) + Number(stats.contacted) + Number(stats.qualified) + Number(stats.closedWon) + Number(stats.closedLost) : void 0;
  const recentLeads = stats?.recentLeads ?? [];
  const isEmpty = !isLoading && totalLeads === 0 && !dataFailed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8", children: [
    showDesktopWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full flex items-start justify-between gap-3 rounded-xl px-4 py-3 shadow-sm",
        style: {
          background: "oklch(0.97 0.04 60)",
          border: "1.5px solid oklch(0.75 0.10 60 / 0.5)"
        },
        "data-ocid": "dashboard.desktop_warning_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Monitor,
              {
                className: "w-5 h-5 shrink-0 mt-0.5",
                style: { color: "oklch(0.50 0.14 60)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold",
                  style: { color: "oklch(0.30 0.10 60)" },
                  children: "Tele-Blast is designed for your cell phone"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs mt-0.5",
                  style: { color: "oklch(0.45 0.08 60)" },
                  children: [
                    "To use it on a computer, you’ll need",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "https://voice.google.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline font-medium hover:opacity-80",
                        children: "Google Voice"
                      }
                    ),
                    " ",
                    "set up to make calls and send texts."
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: dismissDesktopWarning,
              className: "shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors",
              "aria-label": "Dismiss",
              "data-ocid": "dashboard.desktop_warning_dismiss",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ]
      }
    ),
    showPwaInstall && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-sm",
        style: { background: "oklch(0.56 0.16 44)" },
        "data-ocid": "dashboard.pwa_install_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 text-white shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white", children: "Add to Home Screen" }),
              showIosInstructions ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80", children: "Tap the Share button (□↑) at the bottom of Safari, then tap “Add to Home Screen”" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80", children: "Install Tele-Blast as an app for the best experience." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            !showIosInstructions && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handlePwaInstall,
                className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-white/90 transition-colors min-h-[36px]",
                style: { color: "oklch(0.46 0.16 44)" },
                "data-ocid": "dashboard.pwa_install_button",
                children: "Install"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: dismissPwaInstall,
                className: "p-1 rounded-lg hover:bg-white/20 transition-colors",
                "aria-label": "Dismiss",
                "data-ocid": "dashboard.pwa_install_dismiss",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-white/70" })
              }
            )
          ] })
        ]
      }
    ),
    !isPaidTier && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl overflow-hidden shadow-lg",
        "data-ocid": "dashboard.subscribe_banner",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)",
          border: "1.5px solid oklch(0.56 0.16 44 / 0.4)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-2 flex items-center gap-2 text-xs font-semibold",
              style: { background: "oklch(0.56 0.16 44)", color: "white" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                "Subscribe to unlock all features"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                  style: { background: "oklch(0.56 0.16 44 / 0.25)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.82 0.14 44)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white text-sm mb-0.5", children: "Your account is not yet subscribed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs leading-relaxed",
                    style: { color: "oklch(0.98 0 0 / 0.6)" },
                    children: "Subscribe to access Leads, Pipeline, Power Dialer, Templates, Queues, and more."
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: STRIPE_PAYMENT_LINK,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 min-h-[44px] whitespace-nowrap shadow-lg",
                style: { background: "oklch(0.56 0.16 44)" },
                "data-ocid": "dashboard.subscribe_now_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  "Subscribe Now — $15/month"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg sm:text-2xl font-bold text-foreground tracking-tight", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 hidden sm:block", children: "Your sales pipeline at a glance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PipelineFilter,
          {
            pipelines,
            selectedId: selectedPipelineId,
            onChange: setSelectedPipelineId
          }
        ),
        (deferredPrompt || isIosDevice) && !isAlreadyInstalled2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handlePwaInstall,
            className: "w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold text-white min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm",
            style: { background: "oklch(0.56 0.16 44)" },
            "data-ocid": "dashboard.download_app_button",
            "aria-label": "Download app",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Get App" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/leads",
            search: { addNew: "true" },
            className: "hidden sm:block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "btn-primary gap-1.5 shrink-0",
                size: "sm",
                "data-ocid": "add-lead-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Add Lead"
                ]
              }
            )
          }
        )
      ] })
    ] }),
    dataFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-muted/50 border border-border rounded-xl px-4 py-3 flex items-center justify-between gap-3",
        "data-ocid": "dashboard.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unable to load stats — connection timed out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 shrink-0",
              "data-ocid": "dashboard.retry_button",
              onClick: () => {
                queryClient2.invalidateQueries({
                  queryKey: ["dashboardStats"]
                });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                "Retry"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && totalLeads !== void 0 && totalLeads > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary rounded-xl px-4 sm:px-6 py-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-[10px] sm:text-xs font-medium uppercase tracking-widest mb-1", children: selectedPipelineId === null ? "Total Pipeline" : pipelines.find((p) => p.id === selectedPipelineId)?.name ?? "Pipeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl sm:text-4xl font-bold text-primary-foreground tabular-nums", children: totalLeads }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-sm", children: "leads tracked" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pipeline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "secondary",
          size: "sm",
          className: "gap-1.5 font-medium shrink-0 min-h-[44px]",
          "data-ocid": "view-pipeline-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "View Pipeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Pipeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Pipeline Stages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5", children: STAT_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: card.label,
          value: isLoading ? void 0 : stats?.[card.key],
          icon: card.icon,
          stageKey: card.stageKey,
          accent: card.accent,
          iconBg: card.iconBg
        },
        card.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Recent Activity" }),
        recentLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/leads",
            className: "text-xs font-medium text-primary hover:underline min-h-[44px] flex items-center",
            "data-ocid": "view-all-leads-link",
            children: "View all →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-sm overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", "data-ocid": "dashboard.loading_state", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, k)) }) : isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-12 px-6 text-center",
          "data-ocid": "empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "Your pipeline is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-5", children: "Add your first lead manually or import a list via CSV to get started." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch gap-3 w-full sm:flex-row sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/leads",
                  search: { addNew: "true" },
                  className: "w-full sm:w-auto",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "btn-primary gap-1.5 w-full min-h-[48px]",
                      "data-ocid": "empty-add-lead-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                        "Add Lead"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/leads",
                  search: { import: "true" },
                  className: "w-full sm:w-auto",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "w-full min-h-[48px]",
                      "data-ocid": "empty-import-csv-btn",
                      children: "Import CSV"
                    }
                  )
                }
              )
            ] })
          ]
        }
      ) : recentLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", "data-ocid": "empty-recent-leads", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "No recent leads.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/leads",
            search: { addNew: "true" },
            className: "text-primary hover:underline",
            children: "Add a lead →"
          }
        )
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentLeads.slice(0, 5).map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecentLeadRow, { lead }, lead.id.toString())) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/leads",
        search: { addNew: "true" },
        className: "sm:hidden fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+16px)] right-4 z-40",
        "aria-label": "Add lead",
        "data-ocid": "dashboard-fab",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform",
            style: { background: "oklch(0.56 0.16 44)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6 text-white" })
          }
        )
      }
    )
  ] });
}
const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/insurance-leads-ai/",
    label: "LinkedIn",
    abbr: "in"
  },
  {
    href: "https://www.facebook.com/profile.php?id=61589120873004",
    label: "Facebook",
    abbr: "f"
  },
  {
    href: "https://www.instagram.com/insuranceleadsai/",
    label: "Instagram",
    abbr: "ig"
  },
  {
    href: "https://x.com/insleadsAI",
    label: "X",
    abbr: "𝕏"
  }
];
const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Affiliate Program", href: "/affiliate-signup" }
];
const RESOURCE_LINKS = [
  { label: "Support Center", href: "/support" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Blog", href: "/blog" }
];
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "pt-12 pb-6 px-5",
      style: { background: "oklch(0.22 0.12 264)" },
      "data-ocid": "site-footer",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  style: { background: "oklch(0.56 0.16 44)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg tracking-tight", children: "Tele-Blast" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm leading-relaxed max-w-[220px]",
                style: { color: "oklch(0.98 0 0 / 0.5)" },
                children: "Power Dialer, SMS Blast & CRM for Sales Teams"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-xs font-bold uppercase tracking-widest mb-4",
                style: { color: "oklch(0.75 0.16 44)" },
                children: "Product"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: PRODUCT_LINKS.map(({ label, href }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: href,
                className: "text-sm transition-colors duration-200 hover:text-white",
                style: { color: "oklch(0.98 0 0 / 0.6)" },
                "data-ocid": `footer.product.${label.toLowerCase().replace(/\s+/g, "_")}`,
                children: label
              }
            ) }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-xs font-bold uppercase tracking-widest mb-4",
                style: { color: "oklch(0.75 0.16 44)" },
                children: "Resources"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: RESOURCE_LINKS.map(({ label, href }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: href,
                className: "text-sm transition-colors duration-200 hover:text-white",
                style: { color: "oklch(0.98 0 0 / 0.6)" },
                "data-ocid": `footer.resources.${label.toLowerCase().replace(/\s+/g, "_")}`,
                children: label
              }
            ) }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-xs font-bold uppercase tracking-widest mb-4",
                style: { color: "oklch(0.75 0.16 44)" },
                children: "Connect"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: SOCIAL_LINKS.map(({ href, label, abbr }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": label,
                className: "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110",
                style: {
                  background: "oklch(0.98 0 0 / 0.08)",
                  border: "1px solid oklch(0.98 0 0 / 0.12)",
                  color: "oklch(0.98 0 0 / 0.7)"
                },
                "data-ocid": `footer.social.${label.toLowerCase()}`,
                children: abbr
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mt-4 text-xs leading-relaxed",
                style: { color: "oklch(0.98 0 0 / 0.4)" },
                children: "Follow us for tips on lead generation, SMS marketing, and sales productivity."
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-px mb-6",
            style: { background: "oklch(0.98 0 0 / 0.1)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.98 0 0 / 0.4)" }, children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Tele-Blast. All rights reserved."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.98 0 0 / 0.35)" }, children: [
            "Built with ❤️ for sales teams  · ",
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
                style: { color: "oklch(0.98 0 0 / 0.35)" },
                children: "Powered by caffeine.ai"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function setMeta(name, content, attribute = "name") {
  let el = document.querySelector(
    `meta[${attribute}="${name}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return () => {
    if (created && el) {
      el.remove();
    }
  };
}
const JSON_LD_ID = "tele-blast-page-jsonld";
function injectJsonLd(schema) {
  removeJsonLd();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = JSON_LD_ID;
  script.textContent = schema;
  document.head.appendChild(script);
  return removeJsonLd;
}
function removeJsonLd() {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
}
function useSEO({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = "website",
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd
}) {
  reactExports.useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = title;
    }
    if (description) setMeta("description", description);
    if (robots) setMeta("robots", robots);
    if (ogTitle ?? title) setMeta("og:title", ogTitle ?? title, "property");
    if (ogDescription ?? description)
      setMeta("og:description", ogDescription ?? description, "property");
    if (ogUrl ?? canonical)
      setMeta("og:url", ogUrl ?? canonical, "property");
    if (ogType) setMeta("og:type", ogType, "property");
    setMeta(
      "og:image",
      ogImage ?? "https://www.tele-blast.com/icons/icon-512.svg",
      "property"
    );
    setMeta("twitter:card", "summary_large_image");
    if (twitterTitle ?? ogTitle ?? title)
      setMeta("twitter:title", twitterTitle ?? ogTitle ?? title);
    if (twitterDescription ?? ogDescription ?? description)
      setMeta(
        "twitter:description",
        twitterDescription ?? ogDescription ?? description
      );
    if (twitterImage ?? ogImage)
      setMeta("twitter:image", twitterImage ?? ogImage);
    const removeCanonical = canonical ? setLink("canonical", canonical) : null;
    const removeSchema = jsonLd ? injectJsonLd(jsonLd) : null;
    return () => {
      document.title = prevTitle;
      removeCanonical?.();
      removeSchema?.();
    };
  }, [
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    jsonLd
  ]);
}
const BYPASS_EMAIL$2 = "mikebendett@gmail.com";
const PACKAGE_FEATURES = {
  pro: [
    "Leads & Pipeline Management",
    "Power Dialer — calls & texts only",
    "Manual SMS Templates with Text Spinning",
    "CSV Lead Import (up to 500 leads)",
    "Google Voice or Cell Phone for calls & texts",
    "Lead Queues (New Lead, Follow-Up, Birthday)",
    "Multiple Pipelines",
    "Do Not Call (DNC) Management"
  ]
};
const FEATURES$1 = [
  {
    icon: Users,
    title: "Lead Management",
    description: "Store every detail: name, phone, email, business info, title, website, address, city/state/zip, industry, birthday, source, and 5 custom fields. Toggle between tiles, info-rich cards, or a full list view with one-tap call/text/email icons.",
    blogLink: "/blog/centralized-communication-dashboard",
    blogLabel: "Read: Centralized Dashboard Guide"
  },
  {
    icon: Phone,
    title: "Power Dialer",
    description: "Work through your lead list in sessions. Call or text leads one by one — the app auto-advances after each action. Log a disposition and set a follow-up date after every call.",
    blogLink: "/blog/automated-follow-ups",
    blogLabel: "Read: Automated Follow-Ups Guide"
  },
  {
    icon: ChartColumn,
    title: "Pipeline Management",
    description: "Move leads through 4 stages: Prospect → Contacted → Qualified → Closed. View by pipeline or across all pipelines. Swipe to advance on mobile.",
    blogLink: "/blog/sms-broadcast-automation",
    blogLabel: "Read: SMS Automation Guide"
  },
  {
    icon: Bell,
    title: "Birthday & Follow-Up Queues",
    description: "Birthday Queue shows leads with birthdays in the next 60 days. Get an in-app reminder at 9am on their birthday. Follow-Up Queue tracks every lead with a follow-up date, sorted soonest first.",
    blogLink: "/blog/appointment-reminders",
    blogLabel: "Read: Reduce No-Shows Guide"
  },
  {
    icon: Upload,
    title: "CSV Import & Bulk Actions",
    description: "Import up to 500 leads at once with column matching and pipeline assignment. Select all and bulk send to dialer, mark as DNC, or delete. Industry column is mappable for instant search.",
    blogLink: "/blog/sms-broadcast-automation",
    blogLabel: "Read: SMS Broadcast Guide"
  },
  {
    icon: DollarSign,
    title: "Affiliate Program",
    description: "Earn 25% commission ($7.50/month) on every referral. Get a personal referral link. Payouts via PayPal 30 days after sale. Track clicks, conversions, and earnings on your dashboard.",
    blogLink: "/blog/centralized-communication-dashboard",
    blogLabel: "Read: One Platform Guide"
  }
];
const TESTIMONIALS = [
  {
    quote: "Tele-Blast cut my prospecting time in half. I close 40% more deals now because I spend time selling, not organizing.",
    name: "Marcus T.",
    title: "Commercial Sales Agent"
  },
  {
    quote: "The power dialer alone is worth every penny. I can blast through 50 follow-up calls in a morning.",
    name: "Diane R.",
    title: "Sales Specialist"
  },
  {
    quote: "Finally an app built for sales agents. The pipeline view keeps me focused and the drip campaigns run on autopilot.",
    name: "James K.",
    title: "Sales Professional"
  }
];
const FAQS = [
  {
    q: "What's included in the Pro plan?",
    a: "The $15 Pro plan includes leads and pipeline management, power dialer (calls & texts only — no email), manual SMS templates with local text spinning, CSV lead import (up to 500 leads), Google Voice or cell phone for calls & texts, lead queues (New Lead, Follow-Up, Birthday), multiple pipelines, and Do Not Call (DNC) management."
  },
  {
    q: "Is there an affiliate program?",
    a: "Yes. Sign up at tele-blast.com/affiliate-signup to get your personal referral link. You earn 25% commission ($7.50/month) on every subscriber you refer, paid via PayPal 30 days after each sale."
  },
  {
    q: "Is there a free trial?",
    a: "We don't offer a free trial at this time, but you can cancel any time from your billing portal."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel before your next billing cycle and you won't be charged again."
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe."
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your data is stored on the Internet Computer blockchain — fully encrypted and private by design."
  },
  {
    q: "Can I import my existing leads?",
    a: "Absolutely. Use the built-in CSV import tool to bring in your existing list in minutes. You can match columns, assign pipeline stages, and bulk-delete or archive as needed."
  },
  {
    q: "Can I make calls and send texts from my computer?",
    a: "Yes — Tele-Blast's click-to-call and click-to-text links work on any device. On a computer, whether those links trigger your phone depends on your device pairing setup: iPhone + Mac users can enable iPhone Handoff/Continuity so clicking a phone number on your Mac routes the call through your iPhone. Android + Windows users can use Phone Link to make and receive calls and texts through their Android phone over Bluetooth or Wi-Fi."
  }
];
const STATS = [
  { value: "100+", label: "Sales Agents" },
  { value: "10x", label: "Faster Outreach" },
  { value: "100%", label: "Data Privacy" }
];
function StarRating() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": "5 stars", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: "w-4 h-4 fill-current",
      style: { color: "oklch(0.56 0.16 44)" }
    },
    k
  )) });
}
function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", style: { borderColor: "oklch(0.88 0 0)" }, children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between gap-4 py-4 px-0 text-left transition-colors duration-200 hover:opacity-80 min-h-[44px]",
        onClick: () => setOpenIndex(openIndex === i ? null : i),
        "aria-expanded": openIndex === i,
        "data-ocid": `faq.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-base font-semibold",
              style: { color: "oklch(0.22 0.12 264)" },
              children: item.q
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: "w-5 h-5 shrink-0 transition-transform duration-200",
              style: {
                color: "oklch(0.56 0.16 44)",
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)"
              }
            }
          )
        ]
      }
    ),
    openIndex === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "pb-4 text-sm leading-relaxed",
        style: { color: "oklch(0.48 0 0)" },
        children: item.a
      }
    )
  ] }, item.q)) });
}
function CheckIcon({ dark }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
      style: {
        background: dark ? "oklch(0.56 0.16 44 / 0.25)" : "oklch(0.56 0.16 44 / 0.12)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Check,
        {
          className: "w-3 h-3",
          style: { color: dark ? "oklch(0.82 0.14 44)" : "oklch(0.46 0.16 44)" }
        }
      )
    }
  );
}
function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(null);
  const [installState, setInstallState] = reactExports.useState("hidden");
  const [showIosSheet, setShowIosSheet] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (isStandalone) {
      setInstallState("installed");
      return;
    }
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      setInstallState("ios");
      return;
    }
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallState("prompt");
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const triggerInstall = async () => {
    if (installState === "ios") {
      setShowIosSheet(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setInstallState("installed");
      setDeferredPrompt(null);
    }
  };
  return { installState, showIosSheet, setShowIosSheet, triggerInstall };
}
function LandingPage() {
  const navigate = useNavigate();
  const { identity, loginStatus, login } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const { installState, showIosSheet, setShowIosSheet, triggerInstall } = usePwaInstall();
  const {
    subscriptionTier,
    isLoading: subLoading,
    isFreshlyLoaded: subFreshlyLoaded
  } = useSubscription();
  const { data: profileData } = useProfile();
  const [authInProgress, setAuthInProgress] = reactExports.useState(false);
  const loginCalledRef = reactExports.useRef(false);
  const justLoggedInRef = reactExports.useRef(false);
  const { data: packageConfig } = useGetPackageConfig();
  const { data: showComingSoonTeaser = false } = useGetShowComingSoonTeaser();
  useSEO({
    title: "Tele-Blast | SMS Broadcast Automation and Lead Management for Small Businesses",
    description: "Tele-Blast helps small businesses save time and money with SMS broadcast automation, automated follow-ups, appointment reminders, and a centralized communication dashboard. Start for $15/month.",
    canonical: "https://www.tele-blast.com/",
    ogTitle: "Tele-Blast | SMS Broadcast Automation and Power Dialer for Sales Agents",
    ogDescription: "Reach more customers, close more deals, and reduce no-shows with Tele-Blast. SMS automation for small businesses starting at $15/month.",
    ogUrl: "https://www.tele-blast.com/",
    ogType: "website",
    ogImage: "https://www.tele-blast.com/og-image.png",
    twitterTitle: "Tele-Blast | SMS Broadcast Automation and Power Dialer",
    twitterDescription: "Reach more customers, close more deals, and reduce no-shows. SMS automation for small businesses starting at $15/month.",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: "Tele-Blast Navigation",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Home",
          url: "https://www.tele-blast.com/"
        },
        {
          "@type": "WebPage",
          name: "Pricing",
          url: "https://www.tele-blast.com/pricing"
        },
        {
          "@type": "WebPage",
          name: "Blog",
          url: "https://www.tele-blast.com/blog"
        },
        {
          "@type": "WebPage",
          name: "Support",
          url: "https://www.tele-blast.com/support"
        },
        {
          "@type": "WebPage",
          name: "Affiliate Program",
          url: "https://www.tele-blast.com/affiliate-signup"
        }
      ]
    })
  });
  reactExports.useEffect(() => {
    const faqSchemaItems = FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }));
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tele-Blast",
        url: "https://www.tele-blast.com",
        description: "Sales pipeline and lead management app for sales agents",
        sameAs: [
          "https://www.linkedin.com/company/insurance-leads-ai/",
          "https://www.facebook.com/profile.php?id=61589120873004",
          "https://www.instagram.com/insuranceleadsai/",
          "https://x.com/insleadsAI"
        ],
        logo: "https://www.tele-blast.com/icons/icon-192.svg"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Tele-Blast",
        url: "https://www.tele-blast.com",
        description: "Track sales prospects, manage outreach on your mobile device & close more deals with less effort"
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Tele-Blast",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Sales pipeline management with power dialer, lead tracking, email/SMS templates, and sales tools for sales agents",
        featureList: [
          "Lead Management with 20+ custom fields including birthday, source, and 5 custom fields",
          "Power Dialer for Call and Text sessions with auto-advance",
          "Pipeline Management with 4 stages: Prospect, Contacted, Qualified, Closed",
          "Birthday Queue with 9am in-app reminders for next 60 days",
          "Follow-Up Queue sorted by soonest follow-up date",
          "CSV Import with column matching and bulk actions",
          "Google Voice or Cell Phone click-to-call",
          "Affiliate Program with 25% commission and PayPal payouts",
          "Admin Back Office with user management and access control"
        ],
        offers: [
          {
            "@type": "Offer",
            name: "Pro",
            price: "15",
            priceCurrency: "USD"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchemaItems
      }
    ];
    const scriptTags = schemas.map((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => {
      for (const s of scriptTags) {
        if (s.parentNode) s.parentNode.removeChild(s);
      }
    };
  }, []);
  function handleCreateAccount() {
    navigate({ to: "/pre-signup" });
  }
  async function handleAuth() {
    if (loginCalledRef.current || authInProgress) return;
    loginCalledRef.current = true;
    setAuthInProgress(true);
    try {
      await login();
      justLoggedInRef.current = true;
      try {
        sessionStorage.setItem("tele_blast_just_logged_in", "true");
      } catch {
      }
    } catch {
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }
  reactExports.useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/f/") || currentPath.startsWith("/lead-forms/public/")) {
      return;
    }
    if (!justLoggedInRef.current) return;
    if (loginStatus === "initializing") return;
    if (!identity) return;
    if (subLoading || !subFreshlyLoaded) return;
    justLoggedInRef.current = false;
    const userEmail = profileData?.email ?? "";
    if (userEmail === BYPASS_EMAIL$2) {
      navigate({ to: "/dashboard", replace: true });
      return;
    }
    if (subscriptionTier === "none") {
      navigate({ to: "/activate-new", replace: true });
    } else {
      let destination = "/dashboard";
      try {
        const stored = sessionStorage.getItem(INTENDED_ROUTE_KEY);
        if (stored?.startsWith("/") && stored !== "/payment" && stored !== "/login" && stored !== "/security-login" && stored !== "/") {
          destination = stored;
          sessionStorage.removeItem(INTENDED_ROUTE_KEY);
        }
      } catch {
      }
      navigate({ to: destination, replace: true });
    }
  }, [
    identity,
    loginStatus,
    subLoading,
    subFreshlyLoaded,
    subscriptionTier,
    profileData,
    navigate
  ]);
  reactExports.useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/f/") || currentPath.startsWith("/lead-forms/public/")) {
      return;
    }
    if (justLoggedInRef.current) return;
    if (loginStatus === "initializing") return;
    if (!identity) return;
    navigate({ to: "/dashboard", replace: true });
  }, [identity, loginStatus, navigate]);
  function scrollTo(id) {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
  function isTierEnabled(tier) {
    if (!packageConfig || packageConfig.length === 0) return true;
    const entry = packageConfig.find((e) => e.tier === tier);
    return entry ? entry.enabled : true;
  }
  const pricingTiers = [
    {
      tier: "pro",
      label: "Pro",
      price: "$15",
      onSubscribe: () => {
        navigate({ to: "/pre-signup" });
      },
      ocid: "landing.pricing.pro_card",
      subscribeOcid: "landing.pricing.subscribe_button"
    }
  ];
  const visibleTiers = pricingTiers.filter((t) => isTierEnabled(t.tier));
  if (loginStatus === "initializing") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center",
        style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
        "data-ocid": "landing.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center",
              style: { background: "oklch(0.56 0.16 44)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" })
        ] })
      }
    );
  }
  const isAuthenticated = !!identity;
  const isLoadingPostAuth = isAuthenticated && subLoading;
  const authBusy = authInProgress || isLoadingPostAuth;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col bg-background overflow-x-hidden",
      style: { minHeight: "100dvh" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "fixed top-0 left-0 right-0 z-50 border-b",
            style: {
              background: "oklch(0.22 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            "data-ocid": "landing.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-7 rounded flex items-center justify-center",
                      style: { background: "oklch(0.56 0.16 44)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-base tracking-tight", children: "Tele-Blast" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6 flex-1 ml-8", children: [
                  [
                    { label: "Features", id: "features" },
                    { label: "Pricing", id: "pricing" },
                    { label: "FAQ", id: "faq" }
                  ].map(({ label, id }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                      onClick: () => scrollTo(id),
                      "data-ocid": `landing.nav.${id}`,
                      children: label
                    },
                    id
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                      onClick: () => navigate({ to: "/blog" }),
                      "data-ocid": "landing.nav.blog",
                      children: "Blog"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                      onClick: () => navigate({ to: "/video" }),
                      "data-ocid": "landing.nav.video",
                      children: "Video"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                      onClick: () => navigate({ to: "/affiliate-signup" }),
                      "data-ocid": "landing.nav.affiliate",
                      children: "Affiliate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white",
                      onClick: () => navigate({ to: "/support" }),
                      "data-ocid": "landing.nav.support",
                      children: "Support"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  isAuthenticated ? (
                    /* Already logged in — always go to Dashboard.
                       New users who need to pay are redirected by the post-auth effect,
                       never by clicking a button on the landing page. */
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md",
                        style: { background: "oklch(0.56 0.16 44)" },
                        onClick: () => navigate({ to: "/dashboard" }),
                        "data-ocid": "landing.header.dashboard_button",
                        children: [
                          subLoading || !subFreshlyLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline sm:inline", children: "Dashboard" })
                        ]
                      }
                    )
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 min-h-[40px] disabled:opacity-60",
                        onClick: handleAuth,
                        disabled: authBusy,
                        "data-ocid": "landing.header.login_button",
                        children: [
                          authBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
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
                        onClick: handleCreateAccount,
                        "data-ocid": "landing.header.signup_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline sm:inline", children: "Create Account" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                      onClick: () => setMobileMenuOpen((v) => !v),
                      "aria-label": "Toggle menu",
                      "data-ocid": "landing.mobile_menu_toggle",
                      children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
                    }
                  )
                ] })
              ] }),
              mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "md:hidden border-t px-4 py-3 flex flex-col gap-1",
                  style: {
                    background: "oklch(0.25 0.12 264)",
                    borderColor: "oklch(0.28 0.12 264)"
                  },
                  children: [
                    [
                      { label: "Features", id: "features" },
                      { label: "Pricing", id: "pricing" },
                      { label: "FAQ", id: "faq" }
                    ].map(({ label, id }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => scrollTo(id),
                        "data-ocid": `landing.mobile_nav.${id}`,
                        children: label
                      },
                      id
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => {
                          setMobileMenuOpen(false);
                          navigate({ to: "/blog" });
                        },
                        "data-ocid": "landing.mobile_nav.blog",
                        children: "Blog"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => {
                          setMobileMenuOpen(false);
                          navigate({ to: "/video" });
                        },
                        "data-ocid": "landing.mobile_nav.video",
                        children: "Video"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => {
                          setMobileMenuOpen(false);
                          navigate({ to: "/affiliate-signup" });
                        },
                        "data-ocid": "landing.mobile_nav.affiliate",
                        children: "Affiliate"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]",
                        onClick: () => {
                          setMobileMenuOpen(false);
                          navigate({ to: "/support" });
                        },
                        "data-ocid": "landing.mobile_nav.support",
                        children: "Support"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-2 pt-3 flex flex-col gap-2 border-t",
                        style: { borderColor: "oklch(0.98 0 0 / 0.1)" },
                        children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95",
                            style: { background: "oklch(0.56 0.16 44)" },
                            onClick: () => {
                              setMobileMenuOpen(false);
                              navigate({ to: "/dashboard" });
                            },
                            "data-ocid": "landing.mobile_nav.dashboard_button",
                            children: [
                              subLoading || !subFreshlyLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                              "Dashboard"
                            ]
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] disabled:opacity-60",
                              onClick: () => {
                                setMobileMenuOpen(false);
                                handleAuth();
                              },
                              disabled: authBusy,
                              "data-ocid": "landing.mobile_nav.login_button",
                              children: [
                                authBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
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
                                setMobileMenuOpen(false);
                                handleCreateAccount();
                              },
                              "data-ocid": "landing.mobile_nav.signup_button",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                                "Create Your Account"
                              ]
                            }
                          )
                        ] })
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "flex flex-col items-center justify-center text-center px-5 pt-32 pb-20 relative overflow-hidden",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)",
              minHeight: "92dvh"
            },
            "data-ocid": "landing.hero.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": "true",
                  className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none",
                  style: {
                    background: "radial-gradient(circle, oklch(0.56 0.16 44 / 0.12) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.18)",
                      color: "oklch(0.82 0.14 44)",
                      border: "1px solid oklch(0.56 0.16 44 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                      "Built for Sales Agents"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    className: "text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 text-white",
                    "data-ocid": "landing.hero.headline",
                    children: [
                      "Power Dialer, SMS Blast &",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.75 0.16 44)" }, children: [
                        "CRM for Sales Agents —",
                        " "
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center px-3 py-1 rounded-xl text-3xl sm:text-4xl md:text-5xl font-extrabold",
                          style: {
                            background: "oklch(0.56 0.16 44)",
                            color: "white"
                          },
                          children: "$15/mo"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-lg sm:text-xl max-w-xl mb-6 leading-relaxed", children: "Track sales prospects, manage outreach on your mobile device & close more deals with less effort." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-8", children: [
                  "Power Dialer — calls & texts only",
                  "SMS Templates & Lead Queues"
                ].map((pill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                    style: {
                      background: "oklch(0.98 0 0 / 0.08)",
                      color: "oklch(0.98 0 0 / 0.75)",
                      border: "1px solid oklch(0.98 0 0 / 0.12)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                      pill
                    ]
                  },
                  pill
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center gap-3 mb-5 sm:mb-6 w-full sm:w-auto px-2 sm:px-0", children: isAuthenticated ? (
                  /* Already signed in — always go to Dashboard.
                     The post-auth effect handles routing new (unpaid) users to /payment. */
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-xl min-h-[56px] sm:min-h-[52px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg",
                      style: { background: "oklch(0.56 0.16 44)" },
                      onClick: () => navigate({ to: "/dashboard" }),
                      "data-ocid": "landing.hero.dashboard_button",
                      children: [
                        subLoading || !subFreshlyLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
                        "Go to Dashboard"
                      ]
                    }
                  )
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl min-h-[52px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg",
                      style: { background: "oklch(0.56 0.16 44)" },
                      onClick: handleCreateAccount,
                      "data-ocid": "landing.hero.signup_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5" }),
                        "Create Your Account"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold text-lg px-8 py-4 rounded-xl min-h-[56px] sm:min-h-[52px] transition-all duration-200 hover:bg-white/15 active:scale-95 disabled:opacity-70",
                      style: {
                        border: "1.5px solid oklch(0.98 0 0 / 0.3)",
                        background: "oklch(0.98 0 0 / 0.05)"
                      },
                      onClick: handleAuth,
                      disabled: authBusy,
                      "data-ocid": "landing.hero.login_button",
                      children: [
                        authBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
                        authBusy ? "Opening sign-in…" : "Log In"
                      ]
                    }
                  )
                ] }) }),
                installState !== "installed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 w-full sm:w-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: triggerInstall,
                      className: "flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-white text-base min-h-[56px] w-full sm:w-auto transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg",
                      style: {
                        background: "oklch(0.56 0.16 44)",
                        boxShadow: "0 4px 20px oklch(0.56 0.16 44 / 0.45)"
                      },
                      "data-ocid": "landing.hero.download_app_button",
                      "aria-label": "Download Tele-Blast app",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: installState === "ios" ? "Add to Home Screen" : "Download Free App" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 shrink-0 opacity-80" })
                      ]
                    }
                  ),
                  installState === "ios" && !showIosSheet && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-center",
                      style: { color: "oklch(0.98 0 0 / 0.5)" },
                      children: "Tap to see install instructions for iPhone/iPad"
                    }
                  ),
                  showIosSheet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 px-4 py-3 rounded-xl text-xs text-left",
                      style: {
                        background: "oklch(0.98 0 0 / 0.10)",
                        border: "1px solid oklch(0.98 0 0 / 0.2)",
                        color: "oklch(0.98 0 0 / 0.85)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "📲" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "In Safari, tap the",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "Share" }),
                          " button (□↑) at the bottom, then tap",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: '"Add to Home Screen"' })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowIosSheet(false),
                            className: "shrink-0 ml-1 opacity-60 hover:opacity-100 transition-opacity",
                            "aria-label": "Dismiss",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs mb-10",
                    style: {
                      background: "oklch(0.98 0 0 / 0.06)",
                      border: "1px solid oklch(0.98 0 0 / 0.1)",
                      color: "oklch(0.98 0 0 / 0.6)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ShieldCheck,
                        {
                          className: "w-3.5 h-3.5 shrink-0",
                          style: { color: "oklch(0.75 0.16 44)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No password required — secured by Internet Identity" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4 sm:gap-12", children: STATS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-2xl sm:text-3xl font-bold",
                      style: { color: "oklch(0.75 0.16 44)" },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 mt-0.5 uppercase tracking-wide", children: label })
                ] }, label)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mt-8 sm:mt-12 w-full max-w-2xl mx-auto",
                    "aria-hidden": "false",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-2xl overflow-hidden shadow-2xl border",
                        style: {
                          borderColor: "oklch(0.98 0 0 / 0.12)",
                          background: "oklch(0.18 0.10 264)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "px-4 py-3 flex items-center gap-2 border-b",
                              style: {
                                background: "oklch(0.22 0.12 264)",
                                borderColor: "oklch(0.98 0 0 / 0.1)"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["#ff5f57", "#ffbd2e", "#28c840"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "w-3 h-3 rounded-full",
                                    style: { background: c }
                                  },
                                  c
                                )) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs ml-2 font-mono", children: "tele-blast.com — SMS Broadcast Automation Dashboard" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
                            {
                              label: "Leads Reached",
                              value: "1,240",
                              icon: "📲",
                              desc: "SMS broadcast automation"
                            },
                            {
                              label: "Calls Today",
                              value: "87",
                              icon: "📞",
                              desc: "Power dialer for sales agents"
                            },
                            {
                              label: "Deals Closed",
                              value: "23",
                              icon: "✅",
                              desc: "Lead management pipeline view"
                            }
                          ].map(({ label, value, icon, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "rounded-xl p-3 flex flex-col gap-1",
                              style: { background: "oklch(0.25 0.10 264)" },
                              "aria-label": desc,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: icon }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg leading-none", children: value }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs", children: label })
                              ]
                            },
                            label
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "/icons/icon-192.svg",
                                alt: "Automated follow-up system — Tele-Blast dashboard overview",
                                className: "hidden",
                                width: "1",
                                height: "1"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "rounded-xl overflow-hidden",
                                style: { background: "oklch(0.25 0.10 264)" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "div",
                                    {
                                      className: "p-3 flex items-center justify-between border-b",
                                      style: { borderColor: "oklch(0.98 0 0 / 0.07)" },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-xs font-medium", children: "Power Dialer — Active Session" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "px-2 py-0.5 rounded-full text-xs font-bold",
                                            style: {
                                              background: "oklch(0.56 0.16 44 / 0.25)",
                                              color: "oklch(0.82 0.14 44)"
                                            },
                                            children: "Live"
                                          }
                                        )
                                      ]
                                    }
                                  ),
                                  [
                                    {
                                      name: "Sarah Johnson",
                                      phone: "(555) 234-5678",
                                      status: "Follow Up"
                                    },
                                    {
                                      name: "Mike Davis",
                                      phone: "(555) 876-5432",
                                      status: "New Lead"
                                    }
                                  ].map(({ name, phone, status }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "div",
                                    {
                                      className: "flex items-center justify-between px-3 py-2.5 border-b last:border-b-0",
                                      style: { borderColor: "oklch(0.98 0 0 / 0.05)" },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 text-xs font-medium", children: name }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: phone })
                                        ] }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "px-2 py-0.5 rounded-full text-xs",
                                            style: {
                                              background: "oklch(0.22 0.12 264)",
                                              color: "oklch(0.75 0.16 44)"
                                            },
                                            children: status
                                          }
                                        )
                                      ]
                                    },
                                    name
                                  ))
                                ]
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            id: "features",
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "landing.features.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-3",
                    style: { color: "oklch(0.22 0.12 264)" },
                    children: "Everything you need to close more deals"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "oklch(0.48 0 0)" }, children: "Purpose-built tools for sales agents who move fast." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3", children: FEATURES$1.map(
                ({ icon: Icon, title, description, blogLink, blogLabel }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card rounded-2xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col",
                    style: { borderColor: "oklch(0.91 0 0)" },
                    "data-ocid": `landing.features.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                          style: { background: "oklch(0.22 0.12 264 / 0.08)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              className: "w-5 h-5",
                              style: { color: "oklch(0.22 0.12 264)" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-semibold text-base mb-2",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm leading-relaxed flex-1",
                          style: { color: "oklch(0.48 0 0)" },
                          children: description
                        }
                      ),
                      blogLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: blogLink,
                          className: "mt-3 text-xs font-semibold inline-flex items-center gap-1 transition-opacity hover:opacity-70",
                          style: { color: "oklch(0.46 0.16 44)" },
                          "data-ocid": `landing.features.blog_link.${i + 1}`,
                          children: [
                            blogLabel,
                            " →"
                          ]
                        }
                      )
                    ]
                  },
                  title
                )
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.22 0.12 264)" },
            "data-ocid": "landing.illustrations.dialer_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-2xl overflow-hidden shadow-2xl border",
                  style: { borderColor: "oklch(0.56 0.16 44 / 0.4)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      viewBox: "0 0 480 320",
                      xmlns: "http://www.w3.org/2000/svg",
                      role: "img",
                      "aria-labelledby": "dialer-svg-title",
                      className: "w-full",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "dialer-svg-title", children: "Power dialer for sales teams — click to call leads automatically" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "480", height: "320", fill: "oklch(0.18 0.10 264)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "480", height: "44", fill: "oklch(0.22 0.12 264)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "16", cy: "22", r: "5", fill: "#ff5f57" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "30", cy: "22", r: "5", fill: "#ffbd2e" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "44", cy: "22", r: "5", fill: "#28c840" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "68",
                            y: "27",
                            fontFamily: "monospace",
                            fontSize: "11",
                            fill: "rgba(255,255,255,0.5)",
                            children: "Power Dialer — Active Session"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "390",
                            y: "12",
                            width: "74",
                            height: "20",
                            rx: "10",
                            fill: "rgba(232,119,34,0.25)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "427",
                            y: "26",
                            fontFamily: "sans-serif",
                            fontSize: "10",
                            fontWeight: "700",
                            fill: "oklch(0.82 0.14 44)",
                            textAnchor: "middle",
                            children: "● LIVE"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "20",
                            y: "60",
                            width: "440",
                            height: "72",
                            rx: "12",
                            fill: "oklch(0.25 0.10 264)",
                            stroke: "rgba(232,119,34,0.5)",
                            strokeWidth: "1.5"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "96", r: "18", fill: "oklch(0.56 0.16 44 / 0.3)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "50",
                            y: "101",
                            fontFamily: "sans-serif",
                            fontSize: "13",
                            fontWeight: "700",
                            fill: "oklch(0.82 0.14 44)",
                            textAnchor: "middle",
                            children: "SJ"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "78",
                            y: "88",
                            fontFamily: "sans-serif",
                            fontSize: "13",
                            fontWeight: "700",
                            fill: "white",
                            children: "Sarah Johnson"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "78",
                            y: "105",
                            fontFamily: "sans-serif",
                            fontSize: "11",
                            fill: "rgba(255,255,255,0.5)",
                            children: "(555) 234-5678 · Insurance Lead"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "294",
                            y: "76",
                            width: "60",
                            height: "24",
                            rx: "8",
                            fill: "oklch(0.56 0.16 44)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "324",
                            y: "92",
                            fontFamily: "sans-serif",
                            fontSize: "11",
                            fontWeight: "700",
                            fill: "white",
                            textAnchor: "middle",
                            children: "📞 Call"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "364",
                            y: "76",
                            width: "60",
                            height: "24",
                            rx: "8",
                            fill: "oklch(0.28 0.12 264)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "394",
                            y: "92",
                            fontFamily: "sans-serif",
                            fontSize: "11",
                            fontWeight: "700",
                            fill: "rgba(255,255,255,0.7)",
                            textAnchor: "middle",
                            children: "💬 Text"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "294",
                            y: "106",
                            width: "130",
                            height: "18",
                            rx: "5",
                            fill: "rgba(255,255,255,0.06)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "359",
                            y: "119",
                            fontFamily: "sans-serif",
                            fontSize: "9",
                            fill: "rgba(255,255,255,0.4)",
                            textAnchor: "middle",
                            children: "Skip · DNC · Follow Up"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "20",
                            y: "144",
                            width: "440",
                            height: "60",
                            rx: "12",
                            fill: "oklch(0.23 0.09 264)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "174", r: "15", fill: "rgba(255,255,255,0.08)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "50",
                            y: "179",
                            fontFamily: "sans-serif",
                            fontSize: "11",
                            fontWeight: "700",
                            fill: "rgba(255,255,255,0.5)",
                            textAnchor: "middle",
                            children: "MD"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "75",
                            y: "168",
                            fontFamily: "sans-serif",
                            fontSize: "12",
                            fontWeight: "600",
                            fill: "rgba(255,255,255,0.7)",
                            children: "Mike Davis"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "75",
                            y: "183",
                            fontFamily: "sans-serif",
                            fontSize: "10",
                            fill: "rgba(255,255,255,0.35)",
                            children: "(555) 876-5432 · New Lead"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "20",
                            y: "216",
                            width: "440",
                            height: "60",
                            rx: "12",
                            fill: "oklch(0.23 0.09 264)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "246", r: "15", fill: "rgba(255,255,255,0.08)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "50",
                            y: "251",
                            fontFamily: "sans-serif",
                            fontSize: "11",
                            fontWeight: "700",
                            fill: "rgba(255,255,255,0.5)",
                            textAnchor: "middle",
                            children: "CR"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "75",
                            y: "240",
                            fontFamily: "sans-serif",
                            fontSize: "12",
                            fontWeight: "600",
                            fill: "rgba(255,255,255,0.7)",
                            children: "Carol Rodriguez"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "75",
                            y: "255",
                            fontFamily: "sans-serif",
                            fontSize: "10",
                            fill: "rgba(255,255,255,0.35)",
                            children: "(555) 112-3456 · Follow Up"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "20",
                            y: "288",
                            width: "440",
                            height: "8",
                            rx: "4",
                            fill: "rgba(255,255,255,0.08)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: "20",
                            y: "288",
                            width: "146",
                            height: "8",
                            rx: "4",
                            fill: "oklch(0.56 0.16 44)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "20",
                            y: "310",
                            fontFamily: "sans-serif",
                            fontSize: "9",
                            fill: "rgba(255,255,255,0.4)",
                            children: "33% complete · 3 of 9 leads"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.2)",
                      color: "oklch(0.82 0.14 44)",
                      border: "1px solid oklch(0.56 0.16 44 / 0.35)"
                    },
                    children: "Power Dialer"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-4 text-white leading-snug", children: "Blast through your call list in half the time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base leading-relaxed mb-6",
                    style: { color: "oklch(0.98 0 0 / 0.6)" },
                    children: "Work through leads one by one — the dialer auto-advances after every action. Log a disposition, set a follow-up date, and never Work through leads one by one — the dialer auto-advances after every action. Log a disposition, set a follow-up date, and never lose your place. Works with Google Voice and your cell phone. Phone."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                  "Click-to-call or click-to-text from any device",
                  "Auto-advances to next lead after each action",
                  "Same-day duplicate protection — no double-dialing",
                  "Click-to-call or click-to-text from any device",
                  "Auto-advances to next lead after each action",
                  "Same-day duplicate protection — no double-dialing",
                  "Works with Google Voice or your cell phone"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-3 text-sm",
                    style: { color: "oklch(0.98 0 0 / 0.75)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center",
                          style: { background: "oklch(0.56 0.16 44 / 0.3)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "svg",
                            {
                              width: "8",
                              height: "8",
                              viewBox: "0 0 8 8",
                              fill: "none",
                              "aria-hidden": "true",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M1.5 4L3.5 6L6.5 2",
                                  stroke: "oklch(0.82 0.14 44)",
                                  strokeWidth: "1.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                }
                              )
                            }
                          )
                        }
                      ),
                      item
                    ]
                  },
                  item
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/blog/automated-follow-ups",
                    className: "mt-6 inline-flex items-center text-sm font-semibold gap-1 transition-opacity hover:opacity-70",
                    style: { color: "oklch(0.75 0.16 44)" },
                    children: "Read: How to stop losing leads →"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.20 0.13 264)" },
            "data-ocid": "landing.illustrations.pipeline_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-2xl overflow-hidden shadow-2xl border",
                  style: { borderColor: "oklch(0.98 0 0 / 0.1)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      viewBox: "0 0 480 300",
                      xmlns: "http://www.w3.org/2000/svg",
                      role: "img",
                      "aria-labelledby": "pipeline-svg-title",
                      className: "w-full",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "pipeline-svg-title", children: "CRM pipeline for sales teams — manage leads from first contact to close" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "480", height: "300", fill: "oklch(0.18 0.10 264)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "480", height: "42", fill: "oklch(0.22 0.12 264)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "20",
                            y: "27",
                            fontFamily: "sans-serif",
                            fontSize: "13",
                            fontWeight: "700",
                            fill: "white",
                            children: "Sales Pipeline"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: "400",
                            y: "27",
                            fontFamily: "sans-serif",
                            fontSize: "10",
                            fill: "rgba(255,255,255,0.5)",
                            textAnchor: "end",
                            children: "4 leads this week"
                          }
                        ),
                        [
                          {
                            label: "Prospect",
                            x: 8,
                            leads: ["Alex T.", "Maria S."],
                            color: "rgba(255,255,255,0.08)"
                          },
                          {
                            label: "Contacted",
                            x: 126,
                            leads: ["John B."],
                            color: "rgba(232,119,34,0.12)"
                          },
                          {
                            label: "Qualified",
                            x: 244,
                            leads: ["Lisa M.", "Ray C."],
                            color: "rgba(30,58,95,0.5)"
                          },
                          {
                            label: "Closed",
                            x: 362,
                            leads: ["Tony W."],
                            color: "rgba(40,200,64,0.12)"
                          }
                        ].map(({ label, x, leads, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x,
                              y: 48,
                              width: 110,
                              height: 248,
                              rx: "8",
                              fill: color
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: x + 55,
                              y: 67,
                              fontFamily: "sans-serif",
                              fontSize: "10",
                              fontWeight: "700",
                              fill: "rgba(255,255,255,0.6)",
                              textAnchor: "middle",
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: x + 94,
                              y: 56,
                              width: 18,
                              height: 14,
                              rx: "7",
                              fill: "rgba(255,255,255,0.12)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: x + 103,
                              y: 67,
                              fontFamily: "sans-serif",
                              fontSize: "9",
                              fill: "rgba(255,255,255,0.5)",
                              textAnchor: "middle",
                              children: leads.length
                            }
                          ),
                          leads.map((name, li) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "rect",
                              {
                                x: x + 6,
                                y: 76 + li * 66,
                                width: 98,
                                height: 58,
                                rx: "8",
                                fill: "rgba(255,255,255,0.07)",
                                stroke: "rgba(255,255,255,0.08)",
                                strokeWidth: "1"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: x + 22,
                                cy: x > 300 ? 76 + li * 66 + 18 : 76 + li * 66 + 18,
                                r: "10",
                                fill: "oklch(0.56 0.16 44 / 0.3)"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: x + 22,
                                y: 76 + li * 66 + 23,
                                fontFamily: "sans-serif",
                                fontSize: "8",
                                fontWeight: "700",
                                fill: "oklch(0.82 0.14 44)",
                                textAnchor: "middle",
                                children: name.split(" ").map((n) => n[0]).join("")
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: x + 38,
                                y: 76 + li * 66 + 17,
                                fontFamily: "sans-serif",
                                fontSize: "10",
                                fontWeight: "600",
                                fill: "white",
                                children: name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: x + 38,
                                y: 76 + li * 66 + 29,
                                fontFamily: "sans-serif",
                                fontSize: "8",
                                fill: "rgba(255,255,255,0.4)",
                                children: "Insurance Lead"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "rect",
                              {
                                x: x + 10,
                                y: 76 + li * 66 + 36,
                                width: 86,
                                height: 14,
                                rx: "4",
                                fill: "oklch(0.56 0.16 44 / 0.15)"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: x + 53,
                                y: 76 + li * 66 + 47,
                                fontFamily: "sans-serif",
                                fontSize: "8",
                                fill: "oklch(0.75 0.16 44)",
                                textAnchor: "middle",
                                children: "📞 Call · 💬 Text"
                              }
                            )
                          ] }, name))
                        ] }, label))
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.2)",
                      color: "oklch(0.82 0.14 44)",
                      border: "1px solid oklch(0.56 0.16 44 / 0.35)"
                    },
                    children: "CRM Pipeline"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-4 text-white leading-snug", children: "Every lead tracked from first contact to closed deal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-base leading-relaxed mb-6",
                    style: { color: "oklch(0.98 0 0 / 0.6)" },
                    children: [
                      "Move leads through Prospect → Contacted → Qualified → Closed. Filter by pipeline, swipe to advance on mobile, and see your whole book of business at a glance.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "/blog/centralized-communication-dashboard",
                          className: "underline underline-offset-2 hover:opacity-70 transition-opacity",
                          style: { color: "oklch(0.75 0.16 44)" },
                          children: "See the full CRM guide →"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                  "Multiple pipelines for different products or territories",
                  "CSV import up to 500 leads with column mapping",
                  "Birthday & Follow-Up queues built in",
                  "Do Not Call (DNC) management included"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-3 text-sm",
                    style: { color: "oklch(0.98 0 0 / 0.75)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center",
                          style: { background: "oklch(0.56 0.16 44 / 0.3)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "svg",
                            {
                              width: "8",
                              height: "8",
                              viewBox: "0 0 8 8",
                              fill: "none",
                              "aria-hidden": "true",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M1.5 4L3.5 6L6.5 2",
                                  stroke: "oklch(0.82 0.14 44)",
                                  strokeWidth: "1.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                }
                              )
                            }
                          )
                        }
                      ),
                      item
                    ]
                  },
                  item
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/pricing",
                    className: "mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95",
                    style: { background: "oklch(0.56 0.16 44)" },
                    "data-ocid": "landing.illustrations.pipeline_cta",
                    children: "Get started for $15/mo →"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "landing.testimonials.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-2xl sm:text-3xl font-bold",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: "Trusted by sales professionals"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5", children: TESTIMONIALS.map(({ quote, name, title }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-3",
                  style: { borderColor: "oklch(0.91 0 0)" },
                  "data-ocid": `landing.testimonials.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-sm leading-relaxed italic flex-1",
                        style: { color: "oklch(0.35 0 0)" },
                        children: [
                          '"',
                          quote,
                          '"'
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.52 0 0)" }, children: title })
                    ] })
                  ]
                },
                name
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            id: "pricing",
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "landing.pricing.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-2",
                    style: { color: "oklch(0.22 0.12 264)" },
                    children: "Simple, transparent pricing"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", style: { color: "oklch(0.48 0 0)" }, children: "Pick the plan that fits where you are. Upgrade anytime." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `grid gap-4 sm:gap-5 ${visibleTiers.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : visibleTiers.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" : visibleTiers.length === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"}`,
                  "data-ocid": "landing.pricing.grid",
                  children: visibleTiers.map((tier, idx) => {
                    const features = PACKAGE_FEATURES[tier.tier] ?? [];
                    const isDark = tier.dark;
                    const isHighlight = tier.highlight;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `rounded-3xl p-6 shadow-md flex flex-col relative overflow-hidden ${isDark ? "shadow-lg" : ""}`,
                        style: {
                          border: isDark ? "2.5px solid oklch(0.56 0.16 44)" : isHighlight ? "2px solid oklch(0.56 0.16 44 / 0.6)" : idx === 1 ? "2px solid oklch(0.22 0.12 264 / 0.3)" : "2px solid oklch(0.91 0 0)",
                          background: isDark ? "oklch(0.22 0.12 264)" : void 0
                        },
                        "data-ocid": tier.ocid,
                        children: [
                          tier.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white",
                              style: { background: "oklch(0.56 0.16 44)" },
                              children: tier.badge
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 self-start",
                              style: isDark ? {
                                background: "oklch(0.56 0.16 44 / 0.25)",
                                color: "oklch(0.82 0.14 44)"
                              } : isHighlight ? {
                                background: "oklch(0.56 0.16 44 / 0.15)",
                                color: "oklch(0.36 0.16 44)"
                              } : idx === 1 ? {
                                background: "oklch(0.22 0.12 264 / 0.1)",
                                color: "oklch(0.22 0.12 264)"
                              } : {
                                background: "oklch(0.56 0.16 44 / 0.12)",
                                color: "oklch(0.46 0.16 44)"
                              },
                              children: tier.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-4xl font-extrabold",
                                style: {
                                  color: isDark ? "oklch(0.98 0 0)" : "oklch(0.22 0.12 264)"
                                },
                                children: tier.price
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-base font-medium ml-1",
                                style: {
                                  color: isDark ? "oklch(0.98 0 0 / 0.55)" : "oklch(0.52 0 0)"
                                },
                                children: "/ month"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6 flex-1", children: features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { dark: isDark }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-sm font-medium",
                                style: {
                                  color: isDark ? "oklch(0.98 0 0 / 0.85)" : "oklch(0.28 0 0)"
                                },
                                children: feature
                              }
                            )
                          ] }, feature)) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "w-full font-bold text-sm py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white shadow-md min-h-[44px]",
                              style: {
                                background: isHighlight || isDark ? "oklch(0.56 0.16 44)" : "oklch(0.22 0.12 264)"
                              },
                              onClick: tier.onSubscribe,
                              "data-ocid": tier.subscribeOcid,
                              children: tier.price === "$15" ? "Get Started" : `Get Started — ${tier.price}/mo`
                            }
                          )
                        ]
                      },
                      tier.tier
                    );
                  })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-70",
                  style: { color: "oklch(0.22 0.12 264)" },
                  onClick: () => navigate({ to: "/pricing" }),
                  "data-ocid": "landing.pricing.compare_link",
                  children: "Compare all plans →"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-6 max-w-3xl mx-auto flex items-start gap-2.5 px-4 py-3 rounded-xl",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.06)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.12)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShieldCheck,
                      {
                        className: "w-4 h-4 mt-0.5 shrink-0",
                        style: { color: "oklch(0.32 0.15 264)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs leading-relaxed",
                        style: { color: "oklch(0.38 0.05 264)" },
                        children: [
                          "No password required. Your account is secured by",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Internet Identity" }),
                          " — the same technology trusted by thousands of decentralized apps."
                        ]
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ),
        showComingSoonTeaser && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-14 sm:py-16",
            style: { background: "oklch(0.20 0.13 264)" },
            "data-ocid": "landing.coming_soon.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider",
                  style: {
                    background: "oklch(0.56 0.16 44 / 0.18)",
                    color: "oklch(0.82 0.14 44)",
                    border: "1px solid oklch(0.56 0.16 44 / 0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
                    "Coming Soon"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4", children: "AI-Powered Features on the Way" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8",
                  style: { color: "oklch(0.98 0 0 / 0.65)" },
                  children: "We're building AI tools to supercharge your prospecting — smarter lead research, automated templates, and intelligent outreach campaigns."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: [
                "AI Template Generator",
                "Lead Research AI",
                "Smart Cold Call Scripts",
                "AI Ad Copy",
                "Social Media Tools"
              ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                  style: {
                    background: "oklch(0.98 0 0 / 0.07)",
                    color: "oklch(0.98 0 0 / 0.7)",
                    border: "1px solid oklch(0.98 0 0 / 0.12)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        className: "w-3 h-3",
                        style: { color: "oklch(0.75 0.16 44)" }
                      }
                    ),
                    feat
                  ]
                },
                feat
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-12",
            style: { background: "oklch(0.22 0.12 264)" },
            "data-ocid": "landing.affiliate.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.2)",
                      color: "oklch(0.82 0.14 44)",
                      border: "1px solid oklch(0.56 0.16 44 / 0.35)"
                    },
                    children: "Affiliate Program"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl sm:text-2xl font-bold text-white mb-2", children: "Earn 25% commission on every referral" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "oklch(0.98 0 0 / 0.6)" }, className: "text-sm", children: "Share your link. When someone subscribes, you earn $7.50/month per referral — paid via PayPal 30 days after each sale." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/affiliate-signup",
                  className: "shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm min-h-[48px] transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap",
                  style: { background: "oklch(0.56 0.16 44)" },
                  "data-ocid": "landing.affiliate.cta_button",
                  children: "Join Affiliate Program"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-14 sm:py-16",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "landing.blog.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-2xl sm:text-3xl font-bold mb-2",
                    style: { color: "oklch(0.22 0.12 264)" },
                    children: "Learn how to grow your business faster"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.48 0 0)" }, children: "Expert guides on SMS automation, lead follow-up, and closing more deals." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
                {
                  title: "SMS Broadcast Automation: The Ultimate Time-Saver",
                  excerpt: "Text messages have a 98% open rate. Learn how SMS automation saves small businesses 5-10 hours per week.",
                  href: "/blog/sms-broadcast-automation",
                  color: "#1e3a5f"
                },
                {
                  title: "Automated Follow-Ups: Stop Losing Leads",
                  excerpt: "Businesses that follow up within 5 minutes are 9x more likely to convert. See how Tele-Blast makes it automatic.",
                  href: "/blog/automated-follow-ups",
                  color: "#e87722"
                },
                {
                  title: "Appointment Reminders: Reduce No-Shows",
                  excerpt: "Missed appointments cost thousands annually. Automated SMS reminders can reduce no-shows by 10-20%.",
                  href: "/blog/appointment-reminders",
                  color: "#1e3a5f"
                },
                {
                  title: "Centralized Communication Dashboard",
                  excerpt: "Stop juggling multiple tools. Tele-Blast unifies SMS, follow-ups, and pipelines in one powerful dashboard.",
                  href: "/blog/centralized-communication-dashboard",
                  color: "#e87722"
                }
              ].map(({ title, excerpt, href, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href,
                  className: "group rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col",
                  style: { borderColor: "oklch(0.91 0 0)" },
                  "data-ocid": "landing.blog.article_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full", style: { background: color } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-semibold text-base mb-2 group-hover:underline underline-offset-2",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm leading-relaxed",
                          style: { color: "oklch(0.48 0 0)" },
                          children: excerpt
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "mt-3 inline-flex items-center text-xs font-semibold gap-1",
                          style: { color: "oklch(0.46 0.16 44)" },
                          children: "Read article →"
                        }
                      )
                    ] })
                  ]
                },
                href
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-70",
                  style: { color: "oklch(0.22 0.12 264)" },
                  onClick: () => navigate({ to: "/blog" }),
                  "data-ocid": "landing.blog.view_all_button",
                  children: "View all articles →"
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-12",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "landing.resources.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-1",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: "Trusted Resources & Compliance"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-5", style: { color: "oklch(0.52 0 0)" }, children: "We follow industry best practices and FCC guidelines so your business stays compliant." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.fcc.gov/consumers/guides/protecting-your-privacy",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80",
                    style: {
                      background: "oklch(0.22 0.12 264 / 0.05)",
                      borderColor: "oklch(0.22 0.12 264 / 0.15)",
                      color: "oklch(0.22 0.12 264)"
                    },
                    "data-ocid": "landing.resources.fcc_link",
                    children: "🏛️ FCC SMS Compliance Guidelines"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.pewresearch.org/internet/fact-sheet/mobile/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.05)",
                      borderColor: "oklch(0.56 0.16 44 / 0.2)",
                      color: "oklch(0.36 0.16 44)"
                    },
                    "data-ocid": "landing.resources.pew_link",
                    children: "📊 Pew Research: Mobile Usage Statistics"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://www.sba.gov",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80",
                    style: {
                      background: "oklch(0.22 0.12 264 / 0.05)",
                      borderColor: "oklch(0.22 0.12 264 / 0.15)",
                      color: "oklch(0.22 0.12 264)"
                    },
                    "data-ocid": "landing.resources.sba_link",
                    children: "🏢 SBA Small Business Resources"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            id: "faq",
            className: "px-5 py-16 sm:py-20",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "landing.faq.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-2xl sm:text-3xl font-bold",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: "Frequently asked questions"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FAQAccordion, { items: FAQS })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
      ]
    }
  );
}
function LoginPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true });
}
const LS_ONBOARDING_DONE = "tele_blast_onboarding_done";
const LS_GOOGLE_VOICE_ENABLED = "googleVoiceEnabled";
const LS_GOOGLE_VOICE_NUMBER = "googleVoiceNumber";
function markDone() {
  try {
    localStorage.setItem(LS_ONBOARDING_DONE, "true");
  } catch {
  }
}
function readLS(key) {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function writeLS(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}
function toE164Digits(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits;
}
function buildGVTestUrl(number) {
  const digits = toE164Digits(number);
  return `https://voice.google.com/u/0/calls?a=nc,%2B${digits}`;
}
function OnboardingPage() {
  const navigate = useNavigate();
  const [gvEnabled, setGvEnabled] = reactExports.useState(false);
  const [gvNumber, setGvNumber] = reactExports.useState("");
  const [gvSavedNumber, setGvSavedNumber] = reactExports.useState("");
  const [gvSaved, setGvSaved] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const enabled = readLS(LS_GOOGLE_VOICE_ENABLED) === "true";
    const saved = readLS(LS_GOOGLE_VOICE_NUMBER);
    setGvEnabled(enabled);
    setGvSavedNumber(saved);
    setGvNumber(saved);
  }, []);
  function handleSaveNumber() {
    const trimmed = gvNumber.trim();
    if (!trimmed) return;
    writeLS(LS_GOOGLE_VOICE_NUMBER, trimmed);
    setGvSavedNumber(trimmed);
    setGvSaved(true);
    writeLS(LS_GOOGLE_VOICE_ENABLED, "true");
    writeLS("google_voice_enabled", "true");
    setGvEnabled(true);
    setTimeout(() => setGvSaved(false), 2500);
  }
  function handleToggleGV() {
    const next = !gvEnabled;
    writeLS(LS_GOOGLE_VOICE_ENABLED, next ? "true" : "false");
    writeLS("google_voice_enabled", next ? "true" : "false");
    setGvEnabled(next);
  }
  function handleOpenRegistration() {
    window.open(
      "https://voice.google.com/u/0/calls?forceBanner=tel-registration",
      "_blank",
      "noopener,noreferrer"
    );
  }
  function handleTestCall() {
    if (!gvSavedNumber) return;
    window.open(buildGVTestUrl(gvSavedNumber), "_blank", "noopener,noreferrer");
  }
  function handleGetStarted() {
    markDone();
    navigate({ to: "/dashboard" });
  }
  function handleSkip() {
    markDone();
    navigate({ to: "/dashboard" });
  }
  const hasConnectedNumber = gvSavedNumber.trim().length > 0;
  const canTestCall = gvEnabled && hasConnectedNumber;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col items-center justify-center px-5 py-10",
      style: { background: "oklch(0.22 0.12 264)" },
      "data-ocid": "onboarding.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
              style: { background: "oklch(0.56 0.16 44)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-7 h-7 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-3xl font-bold tracking-tight", children: "Tele-Blast" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white text-2xl font-bold mb-3", children: "Set Up Your Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: { color: "oklch(0.98 0 0 / 0.65)" },
              className: "text-base leading-relaxed",
              children: "Choose how you want to make calls and send texts directly from Tele-Blast."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-3xl grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 flex flex-col gap-4 shadow-xl",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "onboarding.google_voice_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                    style: { background: "oklch(0.56 0.16 44 / 0.12)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Phone,
                      {
                        className: "w-5 h-5",
                        style: { color: "oklch(0.46 0.16 44)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "text-base font-bold leading-tight",
                        style: { color: "oklch(0.22 0.12 264)" },
                        children: "Google Voice"
                      }
                    ),
                    hasConnectedNumber && gvEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                        style: {
                          background: "oklch(0.94 0.06 145)",
                          color: "oklch(0.35 0.1 145)"
                        },
                        "data-ocid": "onboarding.google_voice_connected_badge",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                          "Connected"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-0.5",
                      style: { color: "oklch(0.52 0 0)" },
                      children: "Make calls & texts from any browser — free, any device"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-4 space-y-2.5",
                  style: { background: "oklch(0.97 0.005 264)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold uppercase tracking-wide",
                        style: { color: "oklch(0.32 0.15 264)" },
                        children: "Step 1 — Get a Google Voice number"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.48 0 0)" }, children: "If you don't have a Google Voice number yet, click below to open Google Voice and claim one — it's free." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleOpenRegistration,
                        className: "w-full flex items-center justify-center gap-2 h-9 rounded-lg text-xs font-bold border-2 transition-all hover:opacity-80 active:scale-[0.98]",
                        style: {
                          borderColor: "oklch(0.56 0.16 44)",
                          color: "oklch(0.46 0.16 44)"
                        },
                        "data-ocid": "onboarding.register_google_voice_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                          "Open Google Voice"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1 pl-1", children: [
                      "Click the yellow banner in Google Voice.",
                      "Click Allow when your browser asks for permission."
                    ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex gap-1.5 text-xs",
                        style: { color: "oklch(0.52 0 0)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-bold shrink-0",
                              style: { color: "oklch(0.46 0.16 44)" },
                              children: [
                                i + 1,
                                "."
                              ]
                            }
                          ),
                          step
                        ]
                      },
                      step
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-4 space-y-2.5",
                  style: { background: "oklch(0.97 0.005 264)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold uppercase tracking-wide",
                        style: { color: "oklch(0.32 0.15 264)" },
                        children: "Step 2 — Save your Google Voice number"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.48 0 0)" }, children: "Enter the phone number assigned to your Google Voice account." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: inputRef,
                          type: "tel",
                          placeholder: "e.g. (555) 867-5309",
                          value: gvNumber,
                          onChange: (e) => setGvNumber(e.target.value),
                          onKeyDown: (e) => {
                            if (e.key === "Enter") handleSaveNumber();
                          },
                          className: "flex-1 min-w-0 h-9 rounded-lg px-3 text-sm border outline-none focus:ring-2 ring-offset-0",
                          style: {
                            border: "1.5px solid oklch(0.88 0.02 264)",
                            background: "oklch(0.99 0 0)",
                            color: "oklch(0.22 0.12 264)"
                          },
                          "aria-label": "Google Voice phone number",
                          "data-ocid": "onboarding.google_voice_number_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleSaveNumber,
                          disabled: !gvNumber.trim(),
                          className: "h-9 px-3 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0",
                          style: { background: "oklch(0.56 0.16 44)" },
                          "data-ocid": "onboarding.save_google_voice_number_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                            gvSaved ? "Saved!" : "Save"
                          ]
                        }
                      )
                    ] }),
                    hasConnectedNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs flex items-center gap-1",
                        style: { color: "oklch(0.40 0.1 145)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 shrink-0" }),
                          "Number saved: ",
                          gvSavedNumber
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-semibold",
                      style: { color: "oklch(0.22 0.12 264)" },
                      children: "Enable Google Voice"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.52 0 0)" }, children: "Use for all calls & texts in the app" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    role: "switch",
                    "aria-checked": gvEnabled,
                    onClick: handleToggleGV,
                    className: "relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    style: {
                      background: gvEnabled ? "oklch(0.56 0.16 44)" : "oklch(0.85 0 0)",
                      outlineColor: "oklch(0.56 0.16 44)"
                    },
                    "data-ocid": "onboarding.google_voice_toggle",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                        style: {
                          transform: gvEnabled ? "translateX(20px)" : "translateX(0)"
                        }
                      }
                    )
                  }
                )
              ] }),
              canTestCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleTestCall,
                  className: "w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md",
                  style: { background: "oklch(0.46 0.16 44)" },
                  "data-ocid": "onboarding.google_voice_test_call_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4" }),
                    "Test Call via Google Voice"
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 w-full max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleGetStarted,
              className: "w-full h-12 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg",
              style: { background: "oklch(0.56 0.16 44)" },
              "data-ocid": "onboarding.get_started_button",
              children: "Get Started →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleSkip,
              className: "text-sm transition-colors duration-200 hover:opacity-100",
              style: { color: "oklch(0.98 0 0 / 0.45)" },
              "data-ocid": "onboarding.skip_button",
              children: "Skip for now — go to Dashboard"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs mt-8 text-center max-w-sm",
            style: { color: "oklch(0.98 0 0 / 0.25)" },
            children: "You can change these settings anytime under your Profile page."
          }
        )
      ]
    }
  );
}
const BYPASS_EMAIL$1 = "mikebendett@gmail.com";
const FEATURES = [
  { icon: Users, text: "Leads & Pipeline management" },
  { icon: Zap, text: "Power Dialer — calls & texts" },
  { icon: Phone, text: "Manual Templates for SMS & calls" },
  { icon: CircleCheckBig, text: "CSV Import (up to 500 leads)" },
  { icon: Phone, text: "Phone Link for PC (Windows)" },
  { icon: CircleCheckBig, text: "Birthday & Follow-Up Queues" }
];
function PaymentPage() {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();
  const queryClient2 = useQueryClient();
  const {
    subscriptionTier,
    isLoading: subLoading,
    isFreshlyLoaded,
    markSubscribed
  } = useSubscription();
  const { data: profileData } = useProfile();
  const [stripeOpened, setStripeOpened] = reactExports.useState(false);
  const [activating, setActivating] = reactExports.useState(false);
  const [activationError, setActivationError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    queryClient2.invalidateQueries({ queryKey: ["subscriptionTier"] });
    queryClient2.invalidateQueries({ queryKey: ["subscription"] });
  }, [queryClient2]);
  reactExports.useEffect(() => {
    const userEmail = profileData?.email ?? "";
    if (userEmail === BYPASS_EMAIL$1) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [profileData, navigate]);
  reactExports.useEffect(() => {
    if (subLoading || !isFreshlyLoaded) return;
    if (subscriptionTier !== "none") {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [subLoading, isFreshlyLoaded, subscriptionTier, navigate]);
  const paymentCompletedHandledRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    let flag = "false";
    try {
      flag = sessionStorage.getItem("payment_completed") ?? "false";
    } catch {
      return;
    }
    if (flag !== "true") return;
    if (paymentCompletedHandledRef.current) return;
    paymentCompletedHandledRef.current = true;
    (async () => {
      try {
        await markSubscribed("pro");
      } catch {
      }
      try {
        sessionStorage.removeItem("payment_completed");
      } catch {
      }
      if (!cancelled) {
        navigate({ to: "/agreement", replace: true });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [markSubscribed, navigate]);
  const handleSubscribe = () => {
    window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
    setStripeOpened(true);
  };
  const handleConfirmPayment = async () => {
    setActivating(true);
    setActivationError(null);
    try {
      sessionStorage.setItem("payment_completed", "true");
    } catch {
    }
    try {
      await markSubscribed("pro");
    } catch {
      setActivationError(
        "Could not activate your subscription. Please try again — your payment was not affected."
      );
      setActivating(false);
      return;
    }
    setActivating(false);
    try {
      sessionStorage.removeItem("payment_completed");
    } catch {
    }
    navigate({ to: "/agreement", replace: true });
  };
  const handleSignOut = () => {
    try {
      clear();
    } catch {
    }
    navigate({ to: "/" });
  };
  if (subLoading || !isFreshlyLoaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-dvh",
        style: { background: "oklch(0.18 0.14 264)" },
        "data-ocid": "payment.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-dvh px-5 py-12",
      style: { background: "oklch(0.18 0.14 264)" },
      "data-ocid": "payment.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
              style: { background: "oklch(0.56 0.16 44)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-2xl font-bold tracking-tight", children: "Tele-Blast" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "payment.plan_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-8 pt-8 pb-6 text-center",
                  style: { borderBottom: "1px solid oklch(0.92 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4",
                        style: {
                          background: "oklch(0.56 0.16 44 / 0.12)",
                          color: "oklch(0.46 0.16 44)"
                        },
                        children: "Pro Plan"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-1 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-5xl font-extrabold leading-none",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: "$30"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-base font-medium mb-1.5",
                          style: { color: "oklch(0.52 0 0)" },
                          children: "/ month"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.62 0 0)" }, children: "Billed monthly. Cancel anytime." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-8 py-6 space-y-3", children: FEATURES.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                    style: { background: "oklch(0.56 0.16 44 / 0.12)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "oklch(0.46 0.16 44)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-medium",
                    style: { color: "oklch(0.28 0.10 264)" },
                    children: text
                  }
                )
              ] }, text)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pb-8 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSubscribe,
                    className: "w-full rounded-xl text-white text-sm font-bold shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2",
                    style: { background: "oklch(0.56 0.16 44)", height: "3.25rem" },
                    "data-ocid": "payment.subscribe_button",
                    children: stripeOpened ? "Open Stripe Again" : "Subscribe Now — $30/month"
                  }
                ),
                stripeOpened && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-4 space-y-3",
                    style: {
                      background: "oklch(0.56 0.16 44 / 0.07)",
                      border: "1px solid oklch(0.56 0.16 44 / 0.2)"
                    },
                    "data-ocid": "payment.confirm_section",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-center font-medium",
                          style: { color: "oklch(0.38 0.10 264)" },
                          children: "Stripe opened in a new tab. Complete your payment there, then come back here and click below."
                        }
                      ),
                      activationError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-start gap-2 p-3 rounded-lg text-xs",
                          style: {
                            background: "oklch(0.95 0.02 30)",
                            border: "1px solid oklch(0.75 0.12 30)",
                            color: "oklch(0.35 0.10 30)"
                          },
                          "data-ocid": "payment.error_state",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activationError })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleConfirmPayment,
                          disabled: activating,
                          className: "w-full rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60",
                          style: {
                            background: "oklch(0.38 0.14 160)",
                            height: "3rem"
                          },
                          "data-ocid": "payment.confirm_button",
                          children: activating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                            "Activating…"
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                            activationError ? "Try Again" : "I've completed payment"
                          ] })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-center",
                    style: { color: "oklch(0.62 0 0)" },
                    children: "Secure checkout powered by Stripe"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleSignOut,
            className: "mt-8 text-xs transition-opacity duration-200 hover:opacity-70",
            style: { color: "oklch(0.98 0 0 / 0.35)" },
            "data-ocid": "payment.signout_button",
            children: "Sign out"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs mt-4 text-center",
            style: { color: "oklch(0.98 0 0 / 0.25)" },
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
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const BYPASS_EMAIL = "mikebendett@gmail.com";
function validate(data) {
  const errors = {};
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
function PreSignupPage() {
  const navigate = useNavigate();
  const { identity, loginStatus, login } = useInternetIdentity();
  const { subscriptionTier, isFreshlyLoaded } = useSubscription();
  const [form, setForm] = reactExports.useState({
    businessName: "",
    fullName: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const loginCalledRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (loginStatus === "initializing") return;
    if (!identity) return;
    if (!isFreshlyLoaded) return;
    if (subscriptionTier !== "none") {
      navigate({ to: "/dashboard", replace: true });
    } else {
      navigate({ to: "/activate-new", replace: true });
    }
  }, [identity, loginStatus, isFreshlyLoaded, subscriptionTier, navigate]);
  const handleChange = reactExports.useCallback(
    (field, value) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: void 0 }));
      }
    },
    [errors]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting || loginCalledRef.current) return;
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    loginCalledRef.current = true;
    setSubmitting(true);
    try {
      sessionStorage.setItem(
        "pendingProfile",
        JSON.stringify({
          businessName: form.businessName.trim(),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase()
        })
      );
      sessionStorage.setItem("tele_blast_just_logged_in", "true");
      sessionStorage.setItem("tele_blast_from_presignup", "true");
    } catch {
    }
    try {
      await login();
      if (identity) {
        navigate({ to: "/activate-new", replace: true });
      }
    } catch {
    } finally {
      loginCalledRef.current = false;
      setSubmitting(false);
    }
  }
  const pendingEmail = form.email.trim().toLowerCase();
  const isBypass = pendingEmail === BYPASS_EMAIL;
  if (loginStatus === "initializing") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center",
        style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center px-4 py-10",
      style: { minHeight: "100dvh", background: "oklch(0.22 0.12 264)" },
      "data-ocid": "presignup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
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
            className: "w-full max-w-md rounded-2xl shadow-2xl overflow-hidden",
            style: { background: "oklch(0.99 0 0)" },
            "data-ocid": "presignup.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-5 text-center",
                  style: { background: "oklch(0.24 0.10 264)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                        style: { background: "oklch(0.56 0.16 44)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-6 h-6 text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-white mb-1", children: "Create Your Account" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs leading-relaxed", children: "Tell us about yourself — then we'll set up your secure ID" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-0 text-[11px] font-semibold",
                  style: { borderBottom: "1px solid oklch(0.92 0 0)" },
                  children: [
                    { num: 1, label: "Your Profile", active: true },
                    { num: 2, label: "Create ID", active: false },
                    { num: 3, label: "Subscribe", active: false }
                  ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex-1 flex items-center justify-center gap-1.5 py-2.5",
                      style: {
                        background: step.active ? "oklch(0.56 0.16 44 / 0.08)" : void 0,
                        color: step.active ? "oklch(0.46 0.16 44)" : "oklch(0.60 0 0)",
                        borderRight: i < 2 ? "1px solid oklch(0.92 0 0)" : void 0
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                            style: {
                              background: step.active ? "oklch(0.56 0.16 44)" : "oklch(0.88 0 0)",
                              color: step.active ? "white" : "oklch(0.55 0 0)"
                            },
                            children: step.num
                          }
                        ),
                        step.label
                      ]
                    },
                    step.num
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "px-6 py-6 space-y-4",
                  noValidate: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "presignup-business",
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: [
                            "Business Name",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.46 0.18 22)" }, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "presignup-business",
                            type: "text",
                            autoComplete: "organization",
                            placeholder: "Acme Corp",
                            value: form.businessName,
                            onChange: (e) => handleChange("businessName", e.target.value),
                            className: `h-11 pl-10 ${errors.businessName ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                            disabled: submitting,
                            "data-ocid": "presignup.business_name_input"
                          }
                        )
                      ] }),
                      errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-medium",
                          style: { color: "oklch(0.46 0.18 22)" },
                          "data-ocid": "presignup.business_name.field_error",
                          children: errors.businessName
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "presignup-name",
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: [
                            "Full Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.46 0.18 22)" }, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "presignup-name",
                            type: "text",
                            autoComplete: "name",
                            placeholder: "Jane Smith",
                            value: form.fullName,
                            onChange: (e) => handleChange("fullName", e.target.value),
                            className: `h-11 pl-10 ${errors.fullName ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                            disabled: submitting,
                            "data-ocid": "presignup.full_name_input"
                          }
                        )
                      ] }),
                      errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-medium",
                          style: { color: "oklch(0.46 0.18 22)" },
                          "data-ocid": "presignup.full_name.field_error",
                          children: errors.fullName
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "presignup-phone",
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: [
                            "Phone Number",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.46 0.18 22)" }, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "presignup-phone",
                            type: "tel",
                            autoComplete: "tel",
                            placeholder: "(555) 123-4567",
                            value: form.phone,
                            onChange: (e) => handleChange("phone", e.target.value),
                            className: `h-11 pl-10 ${errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                            disabled: submitting,
                            "data-ocid": "presignup.phone_input"
                          }
                        )
                      ] }),
                      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-medium",
                          style: { color: "oklch(0.46 0.18 22)" },
                          "data-ocid": "presignup.phone.field_error",
                          children: errors.phone
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "presignup-email",
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: [
                            "Email Address",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.46 0.18 22)" }, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "presignup-email",
                            type: "email",
                            autoComplete: "email",
                            placeholder: "jane@acmecorp.com",
                            value: form.email,
                            onChange: (e) => handleChange("email", e.target.value),
                            className: `h-11 pl-10 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`,
                            disabled: submitting,
                            "data-ocid": "presignup.email_input"
                          }
                        )
                      ] }),
                      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-medium",
                          style: { color: "oklch(0.46 0.18 22)" },
                          "data-ocid": "presignup.email.field_error",
                          children: errors.email
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: submitting,
                        className: "w-full min-h-[48px] text-white font-bold text-sm gap-2 mt-2",
                        style: {
                          background: submitting ? void 0 : "oklch(0.56 0.16 44)"
                        },
                        "data-ocid": "presignup.submit_button",
                        children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                          "Opening Secure ID…"
                        ] }) : isBypass ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                          "Continue to Dashboard"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                          "Continue to Create Your ID"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-[11px] text-center",
                        style: { color: "oklch(0.55 0 0)" },
                        children: "Your data is private and stored securely on the Internet Computer."
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "mt-5 text-xs font-medium transition-opacity hover:opacity-80",
            style: { color: "oklch(0.98 0 0 / 0.45)" },
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "presignup.back_link",
            children: "← Back to home"
          }
        )
      ]
    }
  );
}
function ZoomCallbackPage() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" }) });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function ProfilePage() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const saveProfile = useSaveProfile();
  const [saveError, setSaveError] = reactExports.useState(null);
  const [loadingTimedOut, setLoadingTimedOut] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!profileLoading) return;
    const timer = setTimeout(() => setLoadingTimedOut(true), 1e4);
    return () => clearTimeout(timer);
  }, [profileLoading]);
  const isNewUser = (!profileLoading || loadingTimedOut) && (!profile || !profile.name && !profile.companyName && !profile.phone && !profile.email);
  const pendingProfileSave = typeof window !== "undefined" ? localStorage.getItem("pendingProfileSave") === "true" : false;
  function readPendingSessionProfile() {
    try {
      const raw = sessionStorage.getItem("pendingProfile");
      if (!raw) return {};
      const p = JSON.parse(raw);
      return {
        name: p.fullName ?? "",
        companyName: p.businessName ?? "",
        phone: p.phone ?? "",
        email: p.email ?? ""
      };
    } catch {
      return {};
    }
  }
  const [form, setForm] = reactExports.useState(
    () => {
      if (pendingProfileSave) {
        const pending = readPendingSessionProfile();
        return {
          name: pending.name ?? "",
          companyName: pending.companyName ?? "",
          phone: pending.phone ?? "",
          email: pending.email ?? "",
          website: "",
          referredBy: "",
          hearAboutUs: ""
        };
      }
      return {
        name: "",
        companyName: "",
        phone: "",
        email: "",
        website: "",
        referredBy: "",
        hearAboutUs: ""
      };
    }
  );
  const hasInitializedForm = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (profile && !hasInitializedForm.current) {
      hasInitializedForm.current = true;
      setForm({
        name: profile.name ?? "",
        companyName: profile.companyName ?? "",
        phone: profile.phone ?? "",
        email: profile.email ?? "",
        website: profile.website ?? "",
        referredBy: profile.referredBy ?? "",
        hearAboutUs: profile.hearAboutUs ?? ""
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
      localStorage.removeItem("pendingProfileSave");
      ue.success("Profile saved successfully");
      navigate({ to: "/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save profile.";
      setSaveError(msg);
      ue.error("Failed to save profile. Please try again.");
    }
  }
  const field = (id, label, type = "text", icon, placeholder = "") => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          "data-ocid": `profile.${id}_input`,
          type,
          value: form[id] ?? "",
          placeholder,
          onChange: (e) => setForm((prev) => ({ ...prev, [id]: e.target.value })),
          className: icon ? "pl-9" : ""
        }
      )
    ] })
  ] });
  if (profileLoading && !loadingTimedOut) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "profile.loading_state",
        className: "flex items-center justify-center min-h-screen bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" })
      }
    );
  }
  const showTimeoutNotice = loadingTimedOut && profileLoading;
  const showPendingNotice = pendingProfileSave && !profile;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.page", className: "min-h-screen bg-background pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-5 shadow-md flex items-center gap-3",
        style: { background: "oklch(0.22 0.12 264)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-7 h-7 rounded flex items-center justify-center shrink-0",
              style: { background: "oklch(0.56 0.16 44)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-white tracking-tight", children: isNewUser ? "Complete Your Profile" : "My Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 mt-0.5", children: isNewUser ? "Tell us a bit about yourself — all fields are optional" : "Update your account information below." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "profile.skip_button",
              onClick: goToDashboard,
              className: "shrink-0 text-xs text-white/50 hover:text-white/80 transition-colors py-1 px-2",
              children: isNewUser ? "Skip for now" : "← Dashboard"
            }
          )
        ]
      }
    ),
    isNewUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 flex items-center gap-2 text-xs font-medium",
        style: {
          background: "oklch(0.56 0.16 44 / 0.08)",
          borderBottom: "1px solid oklch(0.56 0.16 44 / 0.15)",
          color: "oklch(0.46 0.16 44)"
        },
        "data-ocid": "profile.new_user_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 shrink-0" }),
          "Payment confirmed! Fill in your profile or skip — you can always update it later."
        ]
      }
    ),
    showTimeoutNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 flex items-start gap-2 text-xs",
        style: {
          background: "oklch(0.97 0.015 50)",
          borderBottom: "1px solid oklch(0.85 0.04 50)",
          color: "oklch(0.40 0.08 50)"
        },
        "data-ocid": "profile.timeout_notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Having trouble loading your profile — you can re-enter your details below and save them." })
        ]
      }
    ),
    showPendingNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 flex items-start gap-2 text-xs",
        style: {
          background: "oklch(0.97 0.015 50)",
          borderBottom: "1px solid oklch(0.85 0.04 50)",
          color: "oklch(0.40 0.08 50)"
        },
        "data-ocid": "profile.pending_notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your profile details aren't saved yet — please fill them in below." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.form_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Account Information" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          field(
            "name",
            "Full Name",
            "text",
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "Jane Smith"
          ),
          field(
            "companyName",
            "Company Name",
            "text",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
            "Acme Sales LLC"
          ),
          field(
            "phone",
            "Phone Number",
            "tel",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            "(555) 000-0000"
          ),
          field(
            "email",
            "Email Address",
            "email",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
            "jane@acme.com"
          ),
          field(
            "website",
            "Website (optional)",
            "url",
            void 0,
            "https://acme.com"
          ),
          field(
            "referredBy",
            "Who Referred You? (optional)",
            "text",
            void 0,
            "Name or company"
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "hearAboutUs",
                className: "text-sm font-medium text-gray-700",
                children: [
                  "How did you hear about us?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "hearAboutUs",
                value: form.hearAboutUs || "",
                onChange: (e) => setForm((f) => ({ ...f, hearAboutUs: e.target.value })),
                className: "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an option" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ChatGPT", children: "ChatGPT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Perplexity", children: "Perplexity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Google", children: "Google" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Facebook", children: "Facebook" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Instagram", children: "Instagram" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "LinkedIn", children: "LinkedIn" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Referral/Word of mouth", children: "Referral / Word of mouth" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2 text-xs border-primary/30 text-primary hover:bg-primary/5 h-9",
          onClick: () => navigate({ to: "/twilio-setup" }),
          "data-ocid": "profile.phone_setup_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
            "Phone & Calling Setup"
          ]
        }
      ) }),
      saveError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2 p-3 rounded-lg text-sm",
          style: {
            background: "oklch(0.95 0.02 30)",
            border: "1px solid oklch(0.75 0.12 30)",
            color: "oklch(0.35 0.10 30)"
          },
          "data-ocid": "profile.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Could not save profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5 opacity-80", children: saveError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleSave,
                "data-ocid": "profile.retry_button",
                className: "shrink-0 flex items-center gap-1 text-xs font-semibold underline",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  "Retry"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "profile.save_button",
          className: "w-full font-semibold py-5 text-base gap-2",
          style: {
            background: isNewUser ? "oklch(0.56 0.16 44)" : void 0
          },
          onClick: handleSave,
          disabled: saveProfile.isPending,
          children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
            "Saving…"
          ] }) : isNewUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            "Save & Go to Dashboard",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            "Save Changes"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "profile.skip_dashboard_button",
          onClick: goToDashboard,
          className: "w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2",
          children: isNewUser ? "Skip for now — go to Dashboard →" : "← Back to Dashboard"
        }
      )
    ] })
  ] });
}
function PublicFormPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-background gap-4 px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This form is no longer available." })
  ] });
}
function LeadFormsPage() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);
  return null;
}
const LeadsPage = reactExports.lazy(() => __vitePreload(() => import("./LeadsPage-xek8SRMx.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0));
const LeadDetailPage = reactExports.lazy(() => __vitePreload(() => import("./LeadDetailPage-BqfEOBZ2.js"), true ? __vite__mapDeps([10,1,4,3,5,7,8,9]) : void 0));
const PipelinePage = reactExports.lazy(() => __vitePreload(() => import("./PipelinePage-DPZcnXHH.js"), true ? __vite__mapDeps([11,1,2,3,5,9,8]) : void 0));
const PowerDialerPage = reactExports.lazy(() => __vitePreload(() => import("./PowerDialerPage-C0pyUBHE.js"), true ? __vite__mapDeps([12,1,8,5,3,13]) : void 0));
const TemplatesPage = reactExports.lazy(() => __vitePreload(() => import("./TemplatesPage-DLfwsUgA.js"), true ? __vite__mapDeps([14,1,3,15,5,13,8]) : void 0));
const QueuePage = reactExports.lazy(() => __vitePreload(() => import("./QueuePage-aZ-fntlG.js"), true ? __vite__mapDeps([16,1,5,3,9,8]) : void 0));
const ColdCallScriptPage = reactExports.lazy(() => __vitePreload(() => import("./ColdCallScriptPage-CqlbB_gH.js"), true ? __vite__mapDeps([17,1,4,3,5,6,7,8]) : void 0));
const VideoPage = reactExports.lazy(() => __vitePreload(() => import("./VideoPage-CX8ooG4f.js"), true ? __vite__mapDeps([18,1,8,5,3,19]) : void 0));
const TwilioSetupPage = reactExports.lazy(() => __vitePreload(() => Promise.resolve().then(() => TwilioSetupPage$2), true ? void 0 : void 0));
const AdminPage = reactExports.lazy(() => __vitePreload(() => import("./AdminPage-voMqd3jX.js"), true ? __vite__mapDeps([20,1,8,5,3]) : void 0));
const AffiliateSignupPage = reactExports.lazy(() => __vitePreload(() => import("./AffiliateSignupPage-Bv1EOOHj.js"), true ? __vite__mapDeps([21,1,5,3,19,8,22]) : void 0));
const AffiliateDashboardPage = reactExports.lazy(
  () => __vitePreload(() => import("./AffiliateDashboardPage-2E5CTL1l.js"), true ? __vite__mapDeps([23,1,5,3,19,8,22]) : void 0)
);
const PrivacyPolicyPage = reactExports.lazy(() => __vitePreload(() => import("./PrivacyPolicyPage-uz3cnYJu.js"), true ? __vite__mapDeps([24,1,5,3,8]) : void 0));
const DetailedPrivacyPolicyPage = reactExports.lazy(
  () => __vitePreload(() => import("./DetailedPrivacyPolicyPage-BZ-EekYu.js"), true ? __vite__mapDeps([25,1,5,3]) : void 0)
);
const TermsPage = reactExports.lazy(() => __vitePreload(() => import("./TermsPage-BqinVdC7.js"), true ? __vite__mapDeps([26,1,5,3,8]) : void 0));
const AdvertisePage = reactExports.lazy(() => __vitePreload(() => import("./AdvertisePage-CMIODgfA.js"), true ? __vite__mapDeps([27,1,5,3,28,6,7,8]) : void 0));
const SocialMediaPage = reactExports.lazy(() => __vitePreload(() => import("./SocialMediaPage-Dr0j4BIj.js"), true ? __vite__mapDeps([29,1,3,28,5,6,7,8]) : void 0));
const LocalSeoPage = reactExports.lazy(() => __vitePreload(() => import("./LocalSeoPage-DqDy0W_h.js"), true ? __vite__mapDeps([30,1,5,3,28,6,7,8]) : void 0));
const ImageCreatorPage = reactExports.lazy(() => __vitePreload(() => import("./ImageCreatorPage-BE5kAS09.js"), true ? __vite__mapDeps([31,1,28,3,5,6,30,7,8]) : void 0));
const DripPage = reactExports.lazy(() => __vitePreload(() => import("./DripPage-Db0OHO3l.js"), true ? __vite__mapDeps([32,1,3,5,15,8]) : void 0));
const PricingPage = reactExports.lazy(() => __vitePreload(() => import("./PricingPage-BAdi6Rby.js"), true ? __vite__mapDeps([33,1,5,3,19,8]) : void 0));
const SupportPage = reactExports.lazy(() => __vitePreload(() => import("./SupportPage-D6Tb34kK.js"), true ? __vite__mapDeps([34,1,5,3,19,8]) : void 0));
function PageLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" }) });
}
function PageShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children }) }) }) });
}
const rootRoute = createRootRoute({
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstallPrompt, {})
  ] })
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage
});
const landerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lander",
  component: LandingPage
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage
});
const securityLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/security-login",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPage, {}) }) }) })
});
const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsPage, {}) })
});
const leadDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads/$id",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadDetailPage, {}) })
});
const pipelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pipeline",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PipelinePage, {}) })
});
const powerDialerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/power-dialer",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PowerDialerPage, {}) })
});
const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/templates",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplatesPage, {}) })
});
const birthdayQueueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birthday-queue",
  beforeLoad: () => {
    throw redirect({ to: "/queue" });
  },
  component: () => null
});
const queueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/queue",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueuePage, {}) })
});
const leadFormsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lead-forms",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadFormsPage, {}) })
});
const shortPublicFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/f/$slug",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFormPage, {}) })
});
const publicFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lead-forms/public/$slug",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    // skipPaymentGate + skipLiabilityGate: newly-paid users coming from /agreement
    // must be able to reach profile without hitting the payment gate or modal.
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, skipLiabilityGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfilePage, {}) }) })
  )
});
const coldCallScriptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cold-call-script",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColdCallScriptPage, {}) })
});
const twilioSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/twilio-setup",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TwilioSetupPage, {}) })
});
const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPage, {}) }) })
});
const affiliateSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/affiliate-signup",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateSignupPage, {}) }) })
});
const affiliateDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/affiliate",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateDashboardPage, {}) })
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPage, {}) }) })
});
const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyPolicyPage, {}) }) })
});
const detailedPrivacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy-full",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DetailedPrivacyPolicyPage, {}) }) })
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TermsPage, {}) }) })
});
const advertiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advertise",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdvertisePage, {}) })
});
const socialMediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/social-media",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialMediaPage, {}) })
});
const localSeoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/local-seo",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocalSeoPage, {}) })
});
const imageCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-creator",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCreatorPage, {}) })
});
const dripRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drip",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DripPage, {}) })
});
const activateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activate",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, skipLiabilityGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivatePage, {}) }) })
});
const activateNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activate-new",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, skipLiabilityGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivateNewPage, {}) }) })
});
const preSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pre-signup",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreSignupPage, {}) })
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, skipLiabilityGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentPage, {}) }) })
});
const agreementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agreement",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, skipLiabilityGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgreementPage, {}) }) })
});
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { skipPaymentGate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingPage, {}) }) })
});
const zoomCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zoom-callback",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomCallbackPage, {}) })
});
const BlogPage = reactExports.lazy(() => __vitePreload(() => import("./BlogPage-DHrlIqpU.js"), true ? __vite__mapDeps([35,1,8,5,3,36]) : void 0));
const BlogPostPage = reactExports.lazy(() => __vitePreload(() => import("./BlogPostPage-BFdepWqR.js"), true ? __vite__mapDeps([37,1,8,5,3,36]) : void 0));
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, {}) }) })
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPostPage, {}) }) })
});
const ComparePostPage = reactExports.lazy(() => __vitePreload(() => import("./ComparePostPage-DTQ8nY-P.js"), true ? __vite__mapDeps([38,1,8,5,3,36]) : void 0));
const comparePostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare/$slug",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComparePostPage, {}) }) })
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPage, {}) }) })
});
const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SupportPage, {}) }) })
});
function NotFoundPage() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    navigate({ to: "/" });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Redirecting you home…" })
  ] });
}
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  landerRoute,
  loginRoute,
  securityLoginRoute,
  videoRoute,
  dashboardRoute,
  leadsRoute,
  leadDetailRoute,
  pipelineRoute,
  powerDialerRoute,
  templatesRoute,
  birthdayQueueRoute,
  queueRoute,
  leadFormsRoute,
  shortPublicFormRoute,
  publicFormRoute,
  profileRoute,
  coldCallScriptRoute,
  twilioSetupRoute,
  affiliateSignupRoute,
  affiliateDashboardRoute,
  adminRoute,
  privacyPolicyRoute,
  detailedPrivacyRoute,
  termsRoute,
  advertiseRoute,
  socialMediaRoute,
  localSeoRoute,
  imageCreatorRoute,
  dripRoute,
  paymentRoute,
  agreementRoute,
  activateRoute,
  activateNewRoute,
  preSignupRoute,
  onboardingRoute,
  zoomCallbackRoute,
  pricingRoute,
  supportRoute,
  blogRoute,
  blogPostRoute,
  comparePostRoute,
  notFoundRoute
]);
const router = createRouter({ routeTree });
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider, { router });
}
BigInt.prototype.toJSON = function() {
  return this.toString();
};
const CHUNK_RELOAD_KEY = "tb_chunk_reload_attempted";
function isChunkError(msg) {
  const m = msg.toLowerCase();
  return m.includes("failed to fetch dynamically imported module") || m.includes("loading chunk") || m.includes("loading css chunk") || m.includes("dynamically imported module");
}
function safeReloadOnce() {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  window.location.reload();
}
window.addEventListener("error", (event) => {
  const msg = event.message ?? "";
  if (isChunkError(msg)) {
    event.preventDefault();
    safeReloadOnce();
  }
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const msg = reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "";
  if (isChunkError(msg)) {
    event.preventDefault();
    safeReloadOnce();
  }
});
const queryClient = new QueryClient();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
    });
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InternetIdentityProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
export {
  useDeletePreRegisteredUser as $,
  CardHeader as A,
  Button as B,
  Card as C,
  CardTitle as D,
  CardContent as E,
  Checkbox as F,
  useEmailTemplates as G,
  useBackend as H,
  Input as I,
  STRIPE_PAYMENT_LINK as J,
  useAllAffiliates as K,
  Label as L,
  useAdminEnsureAffiliateRecord as M,
  useAdminEnrichedPayouts as N,
  useMarkPayoutPaid as O,
  PIPELINE_STAGES as P,
  useAllUsers as Q,
  REVENUE_RANGES as R,
  Skeleton as S,
  Textarea as T,
  useGrantAdmin as U,
  useRevokeUserAccess as V,
  useRestoreUserAccess as W,
  useIsAdmin as X,
  useCreatePreRegisteredUser as Y,
  useSetUserTier as Z,
  useGetPreRegisteredUsers as _,
  useGetPipelines as a,
  useGetPackageConfig as a0,
  useSetPackageEnabled as a1,
  useGetShowComingSoonTeaser as a2,
  useSetShowComingSoonTeaser as a3,
  useAdminDeleteAllLeads as a4,
  useSEO as a5,
  useProfile as a6,
  SiteFooter as a7,
  useCreatePipeline as b,
  cn as c,
  useSubscription as d,
  useBulkDeleteLeads as e,
  useUpdateLeadDnc as f,
  useAddLead as g,
  useBulkImportLeads as h,
  useUpdateLead as i,
  useUpdatePipeline as j,
  useDeletePipeline as k,
  handlePhoneCall as l,
  isGoogleVoiceEnabled as m,
  SmsQuickSendPopover as n,
  useLead as o,
  useAddCallRecord as p,
  useAddTextRecord as q,
  useAddEmailRecord as r,
  getIMessagePreference as s,
  tierHasFeature as t,
  useLeads as u,
  Badge as v,
  IMessageCheckbox as w,
  setIMessagePreference as x,
  handleSmsSend as y,
  useSmsTemplates as z
};
