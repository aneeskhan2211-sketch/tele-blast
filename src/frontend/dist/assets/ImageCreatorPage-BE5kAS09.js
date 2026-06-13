import { j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { S as Skeleton } from "./index-DsrDu9m3.js";
import { u as useFeatureAccess, F as FeatureLockOverlay } from "./useFeatureAccess-Mp1yBNjO.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { ImageCreatorTab } from "./LocalSeoPage-DqDy0W_h.js";
import { bg as Image } from "./vendor-DT3DREzx.js";
import "./vendor-ic-W9L5KZ_F.js";
import "./vendor-router-gX3Sk5jz.js";
import "./useAi-BlR_ZtV6.js";
function ImageCreatorPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const hasFeatureAccess = !accessLoading && hasAccess;
  if (accessLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden",
      "data-ocid": "image_creator.page",
      children: [
        !accessLoading && !hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureLockOverlay, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "Image Creator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create professional promo images with your logo, photo, and message" })
          ] })
        ] }),
        hasFeatureAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCreatorTab, { hasAccess: hasFeatureAccess })
      ]
    }
  );
}
export {
  ImageCreatorPage as default
};
