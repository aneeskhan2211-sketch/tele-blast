import { j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { T as TrendingUp } from "./vendor-DT3DREzx.js";
import { a as useQuery } from "./vendor-router-gX3Sk5jz.js";
import { H as useBackend } from "./index-DsrDu9m3.js";
function FeatureLockOverlay({
  cardClassName = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm",
      style: { background: "oklch(0.22 0.12 264 / 0.82)" },
      "data-ocid": "feature-lock.overlay",
      "aria-modal": "true",
      role: "alertdialog",
      "aria-label": "Feature access revoked",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-card rounded-2xl shadow-2xl p-8 max-w-sm mx-4 text-center space-y-5 border border-border ${cardClassName}`,
          "data-ocid": "feature-lock.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                style: { background: "oklch(0.22 0.12 264)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-white" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground leading-snug", children: "Tele-Blast" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground leading-snug", children: "Your subscription has ended or contact client services." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "mailto:support@tele-blast.com",
                className: "inline-flex items-center justify-center w-full px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 min-h-[48px]",
                style: { background: "oklch(0.56 0.16 44)" },
                "data-ocid": "feature-lock.contact_support_button",
                children: "Contact Client Services"
              }
            )
          ]
        }
      )
    }
  );
}
function useFeatureAccess() {
  const { actor, isFetching } = useBackend();
  const query = useQuery({
    queryKey: ["featureAccess"],
    queryFn: async () => {
      if (!actor) return true;
      return actor.checkFeatureAccess();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchInterval: 1500,
    refetchOnMount: "always",
    refetchOnWindowFocus: true
  });
  return {
    hasAccess: query.data ?? true,
    isLoading: query.isLoading
  };
}
export {
  FeatureLockOverlay as F,
  useFeatureAccess as u
};
