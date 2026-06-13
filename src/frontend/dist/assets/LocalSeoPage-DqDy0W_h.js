import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a6 as useProfile, S as Skeleton, L as Label, I as Input, B as Button, T as Textarea, v as Badge } from "./index-DsrDu9m3.js";
import { k as useSearch } from "./vendor-router-gX3Sk5jz.js";
import { ay as MapPin, ao as Search, Q as ExternalLink, bm as Film, X, ae as Upload, bg as Image, m as ChevronDown, aB as LoaderCircle, a4 as RefreshCw, l as Lock, aj as CircleAlert, a1 as Download, t as ue, H as Check, aT as Copy } from "./vendor-DT3DREzx.js";
import { u as useFeatureAccess, F as FeatureLockOverlay } from "./useFeatureAccess-Mp1yBNjO.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { g as useAiGenerateGbpProfile, h as useAiGenerateOnPageSeo, i as useAiGenerateBacklinkSuggestions, j as useAiGenerateVideo, k as useAiGeneratePromoImage } from "./useAi-BlR_ZtV6.js";
import "./vendor-ic-W9L5KZ_F.js";
function CopyField({
  label,
  value,
  ocid,
  multiline,
  charCount
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      ue.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy to clipboard.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
        charCount && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `text-[11px] font-medium px-1.5 py-0.5 rounded ${value.length > 160 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
            children: [
              value.length,
              " chars"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground",
          "aria-label": `Copy ${label}`,
          "data-ocid": `${ocid}_copy_button`,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-emerald-500" }),
            "Copied"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
            "Copy"
          ] })
        }
      )
    ] }),
    multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed p-3 rounded-lg bg-muted/40 border border-border whitespace-pre-wrap break-words", children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground p-3 rounded-lg bg-muted/40 border border-border break-words", children: value })
  ] });
}
function KeywordsField({
  keywords,
  ocid
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(keywords.join(", "));
      setCopied(true);
      ue.success("Keywords copied!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy to clipboard.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Target Keywords" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleCopyAll,
          className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground",
          "data-ocid": `${ocid}_copy_button`,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-emerald-500" }),
            "Copied"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
            "Copy All"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 p-3 rounded-lg bg-muted/40 border border-border", children: keywords.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "secondary",
        className: "text-xs px-2.5 py-1 font-medium",
        children: kw
      },
      kw
    )) })
  ] });
}
function ListCopyField({
  label,
  items,
  ocid
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(items.join("\n"));
      setCopied(true);
      ue.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy to clipboard.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground",
          "data-ocid": `${ocid}_copy_button`,
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-emerald-500" }),
            "Copied"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
            "Copy All"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-start gap-2 text-sm text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5 bg-orange-500", children: idx + 1 }),
          item
        ]
      },
      item
    )) })
  ] });
}
function InstructionBanner({
  text,
  href,
  linkLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-4 rounded-xl border",
      style: {
        background: "oklch(0.22 0.12 264 / 0.06)",
        borderColor: "oklch(0.22 0.12 264 / 0.2)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
            style: { background: "oklch(0.22 0.12 264 / 0.15)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExternalLink,
              {
                className: "w-4 h-4",
                style: { color: "oklch(0.56 0.16 44)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: text }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1 text-xs font-semibold mt-1 hover:underline",
              style: { color: "oklch(0.56 0.16 44)" },
              children: [
                linkLabel,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function GbpTab({
  hasAccess,
  companyName
}) {
  const [businessName, setBusinessName] = reactExports.useState(companyName);
  const [services, setServices] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [hours, setHours] = reactExports.useState("Mon–Fri 9am–5pm");
  const [uniqueValue, setUniqueValue] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const generateGbp = useAiGenerateGbpProfile();
  const [nameSynced, setNameSynced] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (companyName && !nameSynced) {
      setBusinessName(companyName);
      setNameSynced(true);
    }
  }, [companyName, nameSynced]);
  const handleGenerate = async () => {
    if (!businessName.trim() || !services.trim()) {
      ue.error("Business name and services are required.");
      return;
    }
    setResult(null);
    try {
      const out = await generateGbp.mutateAsync({
        businessName: businessName.trim(),
        services: services.trim(),
        location: location.trim(),
        hours: hours.trim(),
        uniqueValue: uniqueValue.trim()
      });
      setResult(out);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate profile."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "local_seo.gbp_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.06)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Build Your Google Business Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Fill in your details to generate your complete GBP listing content" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gbp-biz-name", className: "text-sm font-semibold", children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gbp-biz-name",
                value: businessName,
                onChange: (e) => setBusinessName(e.target.value),
                placeholder: "Acme Sales Co.",
                "data-ocid": "local_seo.gbp_business_name_input",
                disabled: !hasAccess
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gbp-location", className: "text-sm font-semibold", children: "City, State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gbp-location",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                placeholder: "Miami, FL",
                "data-ocid": "local_seo.gbp_location_input",
                disabled: !hasAccess
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gbp-services", className: "text-sm font-semibold", children: "Services / What You Offer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "gbp-services",
              value: services,
              onChange: (e) => setServices(e.target.value),
              placeholder: "e.g. sales consulting, CRM setup, lead generation, outbound calling strategy",
              rows: 3,
              className: "resize-none text-sm",
              "data-ocid": "local_seo.gbp_services_input",
              disabled: !hasAccess
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gbp-hours", className: "text-sm font-semibold", children: "Business Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gbp-hours",
                value: hours,
                onChange: (e) => setHours(e.target.value),
                placeholder: "Mon–Fri 9am–5pm",
                "data-ocid": "local_seo.gbp_hours_input",
                disabled: !hasAccess
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gbp-unique", className: "text-sm font-semibold", children: "What Makes You Unique" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gbp-unique",
                value: uniqueValue,
                onChange: (e) => setUniqueValue(e.target.value),
                placeholder: "Same-day responses, 10+ years experience",
                "data-ocid": "local_seo.gbp_unique_input",
                disabled: !hasAccess
              }
            )
          ] })
        ] }),
        hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerate,
            disabled: !businessName.trim() || !services.trim() || generateGbp.isPending,
            className: "w-full font-bold min-h-[48px] gap-2 text-white",
            style: businessName.trim() && services.trim() && true ? { background: "oklch(0.56 0.16 44)" } : {},
            "data-ocid": "local_seo.gbp_generate_button",
            children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate Profile"
            ] }) : "Generate Profile"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20",
            "data-ocid": "local_seo.gbp_tier_gate",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to access GBP profile generation." })
            ]
          }
        )
      ] })
    ] }),
    generateGbp.isPending,
    generateGbp.isError,
    result && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InstructionBanner,
        {
          text: "Copy and paste each section directly into your Google Business Profile dashboard at business.google.com",
          href: "https://business.google.com",
          linkLabel: "Open Google Business Profile"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-5 py-4 border-b border-border",
            style: { background: "oklch(0.22 0.12 264 / 0.06)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Your GBP Content" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "Business Description",
              value: result.businessDescription,
              ocid: "local_seo.gbp_description_field",
              multiline: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "Tagline",
              value: result.tagline,
              ocid: "local_seo.gbp_tagline_field"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListCopyField,
            {
              label: "Suggested Categories",
              items: result.categories,
              ocid: "local_seo.gbp_categories_field"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListCopyField,
            {
              label: "Key Attributes",
              items: result.attributes,
              ocid: "local_seo.gbp_attributes_field"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-4 border-b border-border",
            style: { background: "oklch(0.22 0.12 264 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Ready-to-Post Templates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Copy and paste into Google Posts for immediate publishing" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 grid sm:grid-cols-2 gap-4", children: result.posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i }, `${post.type}-${i}`)) })
      ] })
    ] })
  ] });
}
function PostCard({
  post,
  index
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${post.title}

${post.content}`);
      setCopied(true);
      ue.success("Post copied!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy.");
    }
  };
  const typeColors = [
    "bg-primary/20 text-primary-foreground",
    "bg-orange-500/20 text-orange-200",
    "bg-accent/20 text-accent-foreground",
    "bg-muted text-muted-foreground"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-muted/30 border border-border rounded-xl p-4 space-y-3",
      "data-ocid": `local_seo.gbp_post.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColors[index % typeColors.length]}`,
              children: post.type
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCopy,
              className: "flex items-center gap-1 px-2 py-1 rounded text-xs border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": `local_seo.gbp_post_copy.${index + 1}`,
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                "Copy"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: post.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-4", children: post.content })
      ]
    }
  );
}
function OnPageSeoTab({
  hasAccess,
  companyName,
  initialSlug,
  initialName
}) {
  const [businessName, setBusinessName] = reactExports.useState(initialName || companyName);
  const [services, setServices] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [targetAudience, setTargetAudience] = reactExports.useState("");
  const [selectedSlug, setSelectedSlug] = reactExports.useState(initialSlug);
  const [result, setResult] = reactExports.useState(null);
  const generateSeo = useAiGenerateOnPageSeo();
  reactExports.useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
    if (initialName) setBusinessName(initialName);
  }, [initialSlug, initialName]);
  const handleGenerate = async () => {
    if (!businessName.trim() || !services.trim()) {
      ue.error("Business name and services are required.");
      return;
    }
    setResult(null);
    try {
      const out = await generateSeo.mutateAsync({
        businessName: businessName.trim(),
        services: services.trim(),
        location: location.trim(),
        targetAudience: targetAudience.trim(),
        formSlug: selectedSlug
      });
      setResult(out);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate SEO copy."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "local_seo.onpage_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.06)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "On-Page SEO Generator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Generate all on-page SEO copy for your landing page — title tags, meta, headings, and more" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-form-select", className: "text-sm font-semibold", children: "Page Slug (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "seo-form-select",
              value: selectedSlug,
              onChange: (e) => setSelectedSlug(e.target.value),
              placeholder: "e.g. my-landing-page",
              className: "text-sm",
              "data-ocid": "local_seo.onpage_form_select",
              disabled: !hasAccess
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-biz-name", className: "text-sm font-semibold", children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "seo-biz-name",
                value: businessName,
                onChange: (e) => setBusinessName(e.target.value),
                placeholder: "Acme Sales Co.",
                "data-ocid": "local_seo.onpage_business_name_input",
                disabled: !hasAccess
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-location", className: "text-sm font-semibold", children: "Location / City, State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "seo-location",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                placeholder: "Miami, FL",
                "data-ocid": "local_seo.onpage_location_input",
                disabled: !hasAccess
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-services", className: "text-sm font-semibold", children: "Services / Keywords" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "seo-services",
              value: services,
              onChange: (e) => setServices(e.target.value),
              placeholder: "e.g. sales consulting, CRM setup, lead generation, outbound sales training",
              rows: 3,
              className: "resize-none text-sm",
              "data-ocid": "local_seo.onpage_services_input",
              disabled: !hasAccess
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-audience", className: "text-sm font-semibold", children: "Target Audience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "seo-audience",
              value: targetAudience,
              onChange: (e) => setTargetAudience(e.target.value),
              placeholder: "e.g. small business owners in Miami looking to grow sales",
              "data-ocid": "local_seo.onpage_audience_input",
              disabled: !hasAccess
            }
          )
        ] }),
        hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerate,
            disabled: !businessName.trim() || !services.trim() || generateSeo.isPending,
            className: "w-full font-bold min-h-[48px] gap-2 text-white",
            style: businessName.trim() && services.trim() && true ? { background: "oklch(0.56 0.16 44)" } : {},
            "data-ocid": "local_seo.onpage_generate_button",
            children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate SEO Copy"
            ] }) : "Generate SEO Copy"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20",
            "data-ocid": "local_seo.onpage_tier_gate",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to access on-page SEO copy generation." })
            ]
          }
        )
      ] })
    ] }),
    generateSeo.isPending,
    generateSeo.isError,
    result && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InstructionBanner,
        {
          text: "Copy and paste these into your landing page builder settings. Apply each field to the corresponding section of your page.",
          href: "https://tele-blast.com/lead-forms",
          linkLabel: "Open Lead Forms"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-5 py-4 border-b border-border",
            style: { background: "oklch(0.22 0.12 264 / 0.06)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Your On-Page SEO Copy" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "Page Title",
              value: result.pageTitle,
              ocid: "local_seo.seo_page_title",
              charCount: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "Meta Description",
              value: result.metaDescription,
              ocid: "local_seo.seo_meta_description",
              charCount: true,
              multiline: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "H1 Heading",
              value: result.h1,
              ocid: "local_seo.seo_h1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListCopyField,
            {
              label: "Section Headings (H2s)",
              items: result.h2s,
              ocid: "local_seo.seo_h2s"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "Intro Paragraph",
              value: result.introParagraph,
              ocid: "local_seo.seo_intro",
              multiline: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CopyField,
            {
              label: "CTA Button Text",
              value: result.ctaText,
              ocid: "local_seo.seo_cta"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KeywordsField,
            {
              keywords: result.keywords,
              ocid: "local_seo.seo_keywords"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function BacklinkTab({ hasAccess }) {
  const [businessType, setBusinessType] = reactExports.useState("");
  const [industry, setIndustry] = reactExports.useState("");
  const generateBacklinks = useAiGenerateBacklinkSuggestions();
  const [result, setResult] = reactExports.useState(null);
  const handleGenerate = async () => {
    if (!businessType.trim()) {
      ue.error("Please describe your business type.");
      return;
    }
    setResult(null);
    try {
      const out = await generateBacklinks.mutateAsync({
        businessType: businessType.trim(),
        industry: industry.trim()
      });
      setResult(out);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate suggestions. Please try again."
      );
    }
  };
  const grouped = result ? result.sources.reduce((acc, src) => {
    const cat = src.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(src);
    return acc;
  }, {}) : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "local_seo.backlink_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.06)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Backlink Suggestions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Tell us about your business and we'll recommend quality backlink sources tailored to your industry" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "backlink-biztype",
                className: "text-sm font-semibold",
                children: "Business Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "backlink-biztype",
                value: businessType,
                onChange: (e) => setBusinessType(e.target.value),
                placeholder: "e.g. sales consulting firm, local agency",
                "data-ocid": "local_seo.backlink_business_type_input",
                disabled: !hasAccess
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "backlink-industry",
                className: "text-sm font-semibold",
                children: "Industry (optional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "backlink-industry",
                value: industry,
                onChange: (e) => setIndustry(e.target.value),
                placeholder: "e.g. B2B sales, real estate, healthcare",
                "data-ocid": "local_seo.backlink_industry_input",
                disabled: !hasAccess
              }
            )
          ] })
        ] }),
        hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerate,
            disabled: !businessType.trim() || generateBacklinks.isPending,
            className: "w-full font-bold min-h-[48px] gap-2 text-white",
            style: businessType.trim() && true ? { background: "oklch(0.56 0.16 44)" } : {},
            "data-ocid": "local_seo.backlink_generate_button",
            children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate Suggestions"
            ] }) : "Get Backlink Suggestions"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20",
            "data-ocid": "local_seo.backlink_tier_gate",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to access AI backlink suggestions." })
            ]
          }
        )
      ] })
    ] }),
    generateBacklinks.isPending,
    generateBacklinks.isError,
    result && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      result.strategy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-4 rounded-xl border",
          style: {
            background: "oklch(0.56 0.16 44 / 0.08)",
            borderColor: "oklch(0.56 0.16 44 / 0.25)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-sm", children: "💡" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Your Link-Building Strategy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mt-0.5", children: result.strategy })
            ] })
          ]
        }
      ),
      Object.entries(grouped).map(([category, sources]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
                style: { background: "oklch(0.22 0.12 264 / 0.06)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: category })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: sources.map((source, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 px-5 py-4",
                "data-ocid": `local_seo.backlink_source.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: source.name }),
                      source.domainAuthority && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "secondary",
                          className: `text-[10px] px-1.5 py-0 ${source.domainAuthority.toLowerCase().includes("very high") ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`,
                          children: [
                            "DA: ",
                            source.domainAuthority
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: source.description })
                  ] }),
                  source.url && source.url !== "#" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: source.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-muted-foreground hover:text-foreground",
                      "data-ocid": `local_seo.backlink_link.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        "Get Listed"
                      ]
                    }
                  )
                ]
              },
              `${source.name}-${idx}`
            )) })
          ]
        },
        category
      ))
    ] }),
    !result && true && hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center",
        "data-ocid": "local_seo.backlink_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-2xl flex items-center justify-center",
              style: { background: "oklch(0.22 0.12 264 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-6 h-6 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Enter your business type above" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Enter your business type and industry to find the best backlink opportunities for your niche" })
          ] })
        ]
      }
    )
  ] });
}
const PROMO_STYLES = [
  { value: "Modern & Clean", label: "Modern & Clean" },
  { value: "Bold & Vibrant", label: "Bold & Vibrant" },
  { value: "Professional", label: "Professional" },
  { value: "Warm & Friendly", label: "Warm & Friendly" }
];
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
async function compressUpload(file, maxDim = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(ev.target?.result);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = ev.target?.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function buildPromoCanvas(backgroundSrc, logoSrc, sentence, ctaText, brandingColors) {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  const bgImg = await loadImage(backgroundSrc);
  const bgRatio = bgImg.width / bgImg.height;
  const canvasRatio = W / H;
  let sx = 0;
  let sy = 0;
  let sw = bgImg.width;
  let sh = bgImg.height;
  if (bgRatio > canvasRatio) {
    sw = bgImg.height * canvasRatio;
    sx = (bgImg.width - sw) / 2;
  } else {
    sh = bgImg.width / canvasRatio;
    sy = (bgImg.height - sh) / 2;
  }
  ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, W, H);
  const overlayColor = brandingColors?.secondary ?? "rgba(0,0,0,0)";
  const grad = ctx.createLinearGradient(0, H * 0.45, 0, H);
  grad.addColorStop(
    0,
    overlayColor === "rgba(0,0,0,0)" ? "rgba(0,0,0,0)" : `${overlayColor}00`
  );
  grad.addColorStop(0.35, "rgba(0,0,0,0.55)");
  grad.addColorStop(1, "rgba(0,0,0,0.82)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, H * 0.45, W, H * 0.55);
  if (logoSrc) {
    try {
      const logoImg = await loadImage(logoSrc);
      const maxW = 120;
      const maxH = 60;
      const logoScale = Math.min(
        maxW / logoImg.width,
        maxH / logoImg.height,
        1
      );
      const lw = Math.round(logoImg.width * logoScale);
      const lh = Math.round(logoImg.height * logoScale);
      const pad = 8;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.beginPath();
      ctx.roundRect(24 - pad, 24 - pad, lw + pad * 2, lh + pad * 2, 8);
      ctx.fill();
      ctx.drawImage(logoImg, 24, 24, lw, lh);
    } catch {
    }
  }
  const textPad = 60;
  const maxTextW = W - textPad * 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  const sentenceLines = wrapText(ctx, sentence, maxTextW);
  const lineH = 42;
  const ctaH = 32;
  const ctaGap = 16;
  const totalTextH = sentenceLines.length * lineH + ctaGap + ctaH;
  let textY = H - 48 - totalTextH;
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  for (const line of sentenceLines) {
    ctx.fillText(line, W / 2, textY + lineH);
    textY += lineH;
  }
  ctx.fillStyle = brandingColors?.accent ?? "#F97316";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(ctaText, W / 2, textY + ctaGap + ctaH);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  return canvas.toDataURL("image/png");
}
function PromoCard({ variant, imageUrl, title }) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `promo-${variant}.png`;
    a.click();
  }
  if (variant === "clean") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden shadow-sm border border-border flex flex-col",
        "data-ocid": "local_seo.image_creator.card.clean",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Clean" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: "Clean style promo",
                className: "w-full rounded-lg border border-border shadow-sm",
                style: { aspectRatio: "1200/630", objectFit: "cover" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-2 text-center truncate", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownload,
                className: "mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border border-border bg-background hover:bg-muted text-foreground transition-colors min-h-[36px]",
                "data-ocid": "local_seo.image_creator.card.clean.download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  "Download"
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  if (variant === "bold") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden flex flex-col",
        style: { background: "#1a1a2e" },
        "data-ocid": "local_seo.image_creator.card.bold",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/50", children: "Bold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-lg overflow-hidden",
                style: { border: "2px solid #F97316" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imageUrl,
                    alt: "Bold style promo",
                    className: "w-full",
                    style: { aspectRatio: "1200/630", objectFit: "cover" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mt-2 text-center truncate", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownload,
                className: "mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-colors min-h-[36px]",
                style: { background: "#F97316" },
                "data-ocid": "local_seo.image_creator.card.bold.download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  "Download"
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden flex flex-col",
      style: {
        background: "linear-gradient(135deg, #F97316 0%, #1e2a5a 100%)"
      },
      "data-ocid": "local_seo.image_creator.card.vibrant",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/60", children: "Vibrant" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-2xl overflow-hidden",
              style: { boxShadow: "0 0 20px rgba(249,115,22,0.5)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: "Vibrant style promo",
                  className: "w-full",
                  style: { aspectRatio: "1200/630", objectFit: "cover" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mt-2 text-center truncate", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleDownload,
              className: "mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 min-h-[36px]",
              style: { background: "rgba(255,255,255,0.2)" },
              "data-ocid": "local_seo.image_creator.card.vibrant.download_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Download"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ImageCreatorTab({ hasAccess }) {
  const [logoFile, setLogoFile] = reactExports.useState(null);
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [sentence, setSentence] = reactExports.useState("");
  const [ctaText, setCtaText] = reactExports.useState("");
  const [style, setStyle] = reactExports.useState("Modern & Clean");
  const [compositing, setCompositing] = reactExports.useState(false);
  const [promoImage, setPromoImage] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [logoDrag, setLogoDrag] = reactExports.useState(false);
  const [photoDrag, setPhotoDrag] = reactExports.useState(false);
  const [brandingOpen, setBrandingOpen] = reactExports.useState(false);
  const [websiteUrl, setWebsiteUrl] = reactExports.useState("");
  const [fetchingBranding, setFetchingBranding] = reactExports.useState(false);
  const [brandingColors, setBrandingColors] = reactExports.useState(null);
  const generatePromoImage = useAiGeneratePromoImage();
  const canGenerate = !!logoFile && !!photoFile && sentence.trim().length > 0 && ctaText.trim().length > 0 && !compositing;
  async function handleLogoFile(files) {
    if (!files?.[0] || !files[0].type.startsWith("image/")) return;
    const compressed = await compressUpload(files[0], 600, 0.85);
    setLogoFile(compressed);
  }
  async function handlePhotoFile(files) {
    if (!files?.[0] || !files[0].type.startsWith("image/")) return;
    const compressed = await compressUpload(files[0], 1200, 0.85);
    setPhotoFile(compressed);
  }
  async function handleFetchBranding() {
    const url = websiteUrl.trim();
    if (!url) return;
    setFetchingBranding(true);
    setBrandingColors(null);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8e3) });
      const json = await res.json();
      const html = json.contents ?? "";
      const themeMatch = html.match(
        /name=["']theme-color["'][^>]+content=["']([^"']+)["']/i
      );
      const themeColor = themeMatch?.[1] ?? null;
      if (themeColor) {
        setBrandingColors({
          primary: themeColor,
          secondary: "rgba(0,0,0,0)",
          accent: themeColor
        });
        ue.success("Brand color detected from your website!");
      } else {
        ue.info("Couldn't detect a brand color — using default styling.");
      }
    } catch {
      ue.info(
        "Could not reach that website — using default styling instead."
      );
    } finally {
      setFetchingBranding(false);
    }
  }
  async function handleGenerate() {
    if (!canGenerate) return;
    setError(null);
    setPromoImage(null);
    setCompositing(true);
    try {
      let backgroundSrc = photoFile;
      if (!photoFile) {
        try {
          const generated = await generatePromoImage.mutateAsync({
            promoText: sentence.trim(),
            ctaText: ctaText.trim(),
            style
          });
          backgroundSrc = generated;
        } catch {
          throw new Error(
            "Please upload a background photo to create your promo image."
          );
        }
      }
      const dataUrl = await buildPromoCanvas(
        backgroundSrc,
        logoFile,
        sentence.trim(),
        ctaText.trim(),
        brandingColors ?? void 0
      );
      setPromoImage(dataUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to compose promo image. Please try again."
      );
    } finally {
      setCompositing(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "local_seo.image_creator_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.06)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Promo Image Creator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload your logo and a photo, write your message, and we'll compose a professional 1200×630 promo image in 3 styles" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
              "Your Logo ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            logoFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: logoFile,
                  alt: "Logo preview",
                  className: "w-16 h-10 object-contain rounded"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: "Logo uploaded ✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Placed top-left of image" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLogoFile(null),
                  className: "shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors",
                  "aria-label": "Remove logo",
                  "data-ocid": "local_seo.image_creator.logo_remove",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                onDrop: (e) => {
                  e.preventDefault();
                  setLogoDrag(false);
                  handleLogoFile(e.dataTransfer.files);
                },
                onDragOver: (e) => {
                  e.preventDefault();
                  setLogoDrag(true);
                },
                onDragLeave: () => setLogoDrag(false),
                className: `flex flex-col items-center justify-center gap-2 w-full min-h-[110px] rounded-xl border-2 border-dashed cursor-pointer transition-colors ${logoDrag ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"} ${!hasAccess ? "opacity-50 pointer-events-none" : ""}`,
                "data-ocid": "local_seo.image_creator.logo_dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      className: "sr-only",
                      onChange: (e) => handleLogoFile(e.target.files),
                      disabled: !hasAccess
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center px-3", children: [
                    "Drop logo or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold",
                        style: { color: "oklch(0.56 0.16 44)" },
                        children: "click to browse"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
              "Background Photo ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            photoFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photoFile,
                  alt: "Selected background",
                  className: "w-16 h-10 object-cover rounded"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: "Photo uploaded ✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Used as background" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPhotoFile(null),
                  className: "shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors",
                  "aria-label": "Remove photo",
                  "data-ocid": "local_seo.image_creator.photo_remove",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                onDrop: (e) => {
                  e.preventDefault();
                  setPhotoDrag(false);
                  handlePhotoFile(e.dataTransfer.files);
                },
                onDragOver: (e) => {
                  e.preventDefault();
                  setPhotoDrag(true);
                },
                onDragLeave: () => setPhotoDrag(false),
                className: `flex flex-col items-center justify-center gap-2 w-full min-h-[110px] rounded-xl border-2 border-dashed cursor-pointer transition-colors ${photoDrag ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"} ${!hasAccess ? "opacity-50 pointer-events-none" : ""}`,
                "data-ocid": "local_seo.image_creator.photo_dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      className: "sr-only",
                      onChange: (e) => handlePhotoFile(e.target.files),
                      disabled: !hasAccess
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center px-3", children: [
                    "Drop photo or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold",
                        style: { color: "oklch(0.56 0.16 44)" },
                        children: "click to browse"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "promo-sentence", className: "text-sm font-semibold", children: [
              "Your Message ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-[11px] font-medium px-1.5 py-0.5 rounded ${sentence.length > 100 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
                children: [
                  sentence.length,
                  "/100"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "promo-sentence",
              value: sentence,
              onChange: (e) => setSentence(e.target.value.slice(0, 100)),
              placeholder: "e.g. We help homeowners save thousands on insurance",
              "data-ocid": "local_seo.image_creator.sentence_input",
              disabled: !hasAccess,
              className: "text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "promo-cta", className: "text-sm font-semibold", children: [
              "Call to Action ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-[11px] font-medium px-1.5 py-0.5 rounded ${ctaText.length > 50 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
                children: [
                  ctaText.length,
                  "/50"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "promo-cta",
              value: ctaText,
              onChange: (e) => setCtaText(e.target.value.slice(0, 50)),
              placeholder: "e.g. Call us today! Free quote available.",
              "data-ocid": "local_seo.image_creator.cta_input",
              disabled: !hasAccess,
              className: "text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "promo-style", className: "text-sm font-semibold", children: "Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "promo-style",
              value: style,
              onChange: (e) => setStyle(e.target.value),
              className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px]",
              "data-ocid": "local_seo.image_creator.style_select",
              disabled: !hasAccess,
              children: PROMO_STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border overflow-hidden",
            "data-ocid": "local_seo.image_creator.branding_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setBrandingOpen((v) => !v),
                  className: "w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors min-h-[44px]",
                  "data-ocid": "local_seo.image_creator.branding_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-5 h-5 rounded-md flex items-center justify-center text-[10px]",
                          style: {
                            background: "oklch(0.56 0.16 44 / 0.12)",
                            color: "oklch(0.56 0.16 44)"
                          },
                          children: "🎨"
                        }
                      ),
                      "Match Website Branding",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                      brandingColors && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-2 py-0.5 rounded-full font-medium",
                          style: {
                            background: "oklch(0.96 0.04 160)",
                            color: "oklch(0.38 0.14 160)"
                          },
                          children: "Brand detected"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: "w-4 h-4 text-muted-foreground transition-transform duration-200",
                          style: {
                            transform: brandingOpen ? "rotate(180deg)" : "rotate(0deg)"
                          }
                        }
                      )
                    ] })
                  ]
                }
              ),
              brandingOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-4 pb-4 space-y-3 border-t border-border",
                  style: { background: "oklch(0.98 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-3 leading-relaxed", children: "We'll analyze your website's colors and style to match the design of your promo image." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: websiteUrl,
                          onChange: (e) => setWebsiteUrl(e.target.value),
                          placeholder: "https://yourwebsite.com",
                          className: "flex-1 text-sm",
                          disabled: !hasAccess || fetchingBranding,
                          "data-ocid": "local_seo.image_creator.branding_url_input",
                          onKeyDown: (e) => {
                            if (e.key === "Enter") handleFetchBranding();
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          onClick: handleFetchBranding,
                          disabled: !websiteUrl.trim() || fetchingBranding || !hasAccess,
                          className: "shrink-0 text-white min-h-[40px]",
                          style: websiteUrl.trim() && !fetchingBranding ? { background: "oklch(0.56 0.16 44)" } : {},
                          "data-ocid": "local_seo.image_creator.branding_fetch_button",
                          children: fetchingBranding ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : "Analyze"
                        }
                      )
                    ] }),
                    brandingColors && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Detected brand color:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-mono border border-border",
                          style: {
                            background: brandingColors.accent,
                            color: "#fff"
                          },
                          children: brandingColors.accent
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setBrandingColors(null),
                          className: "text-xs text-muted-foreground hover:text-foreground underline",
                          "data-ocid": "local_seo.image_creator.branding_clear",
                          children: "Clear"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        (!logoFile || !photoFile || !sentence.trim() || !ctaText.trim()) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-[11px]", children: [
          !logoFile && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: "Missing: logo" }),
          !photoFile && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: "Missing: photo" }),
          !sentence.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: "Missing: message" }),
          !ctaText.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border", children: "Missing: CTA" })
        ] }),
        hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerate,
            disabled: !canGenerate,
            className: "w-full font-bold min-h-[48px] gap-2 text-white",
            style: canGenerate ? { background: "oklch(0.56 0.16 44)" } : {},
            "data-ocid": "local_seo.image_creator.generate_button",
            children: compositing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Composing your promo image…"
            ] }) : promoImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate Promo Image"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
              "Create Promo Image"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20",
            "data-ocid": "local_seo.image_creator.tier_gate",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to access the Image Creator." })
            ]
          }
        )
      ] })
    ] }),
    compositing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center",
        "data-ocid": "local_seo.image_creator.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center",
              style: { background: "oklch(0.22 0.12 264 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-7 h-7 animate-spin text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Composing your promo image…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Placing your logo, overlaying text, and rendering in 3 styles" })
        ]
      }
    ),
    error && !compositing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-8 text-center",
        "data-ocid": "local_seo.image_creator.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleGenerate,
              disabled: !canGenerate,
              "data-ocid": "local_seo.image_creator.retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Try Again"
              ]
            }
          )
        ]
      }
    ),
    promoImage && !compositing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "local_seo.image_creator.result", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Your Promo Image — 3 Styles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Download your preferred presentation style below" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PromoCard, { variant: "clean", imageUrl: promoImage, title: sentence }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PromoCard, { variant: "bold", imageUrl: promoImage, title: sentence }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PromoCard,
          {
            variant: "vibrant",
            imageUrl: promoImage,
            title: sentence
          }
        )
      ] })
    ] }),
    !promoImage && !compositing && !error && hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center",
        "data-ocid": "local_seo.image_creator.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-2xl flex items-center justify-center",
              style: { background: "oklch(0.22 0.12 264 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Create your first promo image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-xs", children: `Upload your logo and a background photo, add your message and CTA, then hit "Create Promo Image" — you'll get 3 styled versions to choose from` })
          ] })
        ]
      }
    )
  ] });
}
function VideoGeneratorTab({ hasAccess }) {
  const [prompt, setPrompt] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [logoUrl, setLogoUrl] = reactExports.useState("");
  const [videoUrl, setVideoUrl] = reactExports.useState(null);
  const generateVideo = useAiGenerateVideo();
  const videoRef = reactExports.useRef(null);
  const canGenerate = prompt.trim().length > 0 && true;
  async function handleGenerate() {
    if (!canGenerate) return;
    setVideoUrl(null);
    try {
      const urls = imageUrl.trim() ? [imageUrl.trim()] : [];
      const result = await generateVideo.mutateAsync({
        promoText: prompt.trim(),
        imageUrls: urls,
        logoUrl: logoUrl.trim() || void 0
      });
      setVideoUrl(result);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Video generation failed."
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "local_seo.video_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 rounded-xl border",
        style: {
          background: "oklch(0.22 0.12 264 / 0.06)",
          borderColor: "oklch(0.22 0.12 264 / 0.2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Film,
            {
              className: "w-5 h-5 shrink-0 mt-0.5",
              style: { color: "oklch(0.56 0.16 44)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "Video generation uses",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Theta EdgeCloud's video API" }),
            ". Generation typically takes",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "1–2 minutes" }),
            ". Make sure your Theta Video credentials are saved in the Admin > AI Settings panel."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.06)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Video Generator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Describe your video, optionally add a background image and logo URL" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "video-prompt", className: "text-sm font-semibold", children: [
            "Describe your video ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "video-prompt",
              value: prompt,
              onChange: (e) => setPrompt(e.target.value),
              placeholder: "e.g. A professional sales agent making calls, upbeat and energetic, with logo overlay and contact info",
              rows: 3,
              className: "resize-none text-sm",
              disabled: !hasAccess,
              "data-ocid": "local_seo.video.prompt_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "video-image-url", className: "text-sm font-semibold", children: [
            "Background image URL",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "video-image-url",
              value: imageUrl,
              onChange: (e) => setImageUrl(e.target.value),
              placeholder: "https://example.com/image.jpg",
              disabled: !hasAccess,
              className: "text-sm font-mono",
              "data-ocid": "local_seo.video.image_url_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "video-logo-url", className: "text-sm font-semibold", children: [
            "Logo URL",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "video-logo-url",
              value: logoUrl,
              onChange: (e) => setLogoUrl(e.target.value),
              placeholder: "https://example.com/logo.png",
              disabled: !hasAccess,
              className: "text-sm font-mono",
              "data-ocid": "local_seo.video.logo_url_input"
            }
          )
        ] }),
        hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerate,
            disabled: !canGenerate,
            className: "w-full font-bold min-h-[48px] gap-2 text-white",
            style: canGenerate ? { background: "oklch(0.56 0.16 44)" } : {},
            "data-ocid": "local_seo.video.generate_button",
            children: videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Generate New Video"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
              "Generate Video"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20",
            "data-ocid": "local_seo.video.tier_gate",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscribe to access Video Generator." })
            ]
          }
        )
      ] })
    ] }),
    generateVideo.isPending,
    generateVideo.isError,
    videoUrl && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm",
        "data-ocid": "local_seo.video.result",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-4 border-b border-border flex items-center justify-between gap-3",
              style: { background: "oklch(0.22 0.12 264 / 0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Your Generated Video" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Powered by Theta EdgeCloud" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: videoUrl,
                    download: "promo-video.mp4",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white min-h-[40px] shrink-0 transition-opacity hover:opacity-90",
                    style: { background: "oklch(0.56 0.16 44)" },
                    "data-ocid": "local_seo.video.download_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      "Download"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "video",
            {
              ref: videoRef,
              src: videoUrl,
              controls: true,
              className: "w-full rounded-xl border border-border",
              style: { maxHeight: "360px" },
              "data-ocid": "local_seo.video.player",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }),
                "Your browser does not support video playback."
              ]
            }
          ) })
        ]
      }
    ),
    !videoUrl && true && true && hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center",
        "data-ocid": "local_seo.video.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-2xl flex items-center justify-center",
              style: { background: "oklch(0.22 0.12 264 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Generate a promo video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-xs", children: "Describe your video above and hit Generate. Optionally add a background image and logo URL for a branded result." })
          ] })
        ]
      }
    )
  ] });
}
const TABS = [
  { id: "gbp", label: "Google Business", icon: MapPin },
  { id: "onpage", label: "On-Page SEO", icon: Search },
  { id: "backlinks", label: "Backlink Sources", icon: ExternalLink },
  { id: "videogen", label: "Video Generator", icon: Film }
];
function LocalSeoPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const search = useSearch({ strict: false });
  const initialTab = search?.tab === "onpage" ? "onpage" : search?.tab === "backlinks" ? "backlinks" : "gbp";
  const [activeTab, setActiveTab] = reactExports.useState(initialTab);
  const companyName = profile?.companyName ?? "";
  const hasFeatureAccess = !accessLoading && hasAccess;
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden",
      "data-ocid": "local_seo.page",
      children: [
        !accessLoading && !hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureLockOverlay, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "Local SEO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Google Business Profile, on-page SEO, backlink guidance, image creator, and video generation" })
          ] })
        ] }),
        hasFeatureAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex rounded-xl overflow-x-auto border border-border",
            "data-ocid": "local_seo.tabs",
            role: "tablist",
            children: TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": active,
                  onClick: () => setActiveTab(tab.id),
                  className: "flex-1 flex items-center justify-center gap-1.5 py-3 px-2 text-xs sm:text-sm font-semibold transition-colors min-h-[44px] whitespace-nowrap",
                  style: active ? {
                    background: "oklch(0.22 0.12 264)",
                    color: "white"
                  } : {},
                  "data-ocid": `local_seo.tab.${tab.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: tab.id === "gbp" ? "GBP" : tab.id === "onpage" ? "On-Page" : tab.id === "videogen" ? "Video" : "Backlinks" })
                  ]
                },
                tab.id
              );
            })
          }
        ),
        activeTab === "gbp" && /* @__PURE__ */ jsxRuntimeExports.jsx(GbpTab, { hasAccess: hasFeatureAccess, companyName }),
        activeTab === "onpage" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnPageSeoTab,
          {
            hasAccess: hasFeatureAccess,
            companyName,
            initialSlug: search?.slug ?? "",
            initialName: search?.name ?? ""
          }
        ),
        activeTab === "backlinks" && /* @__PURE__ */ jsxRuntimeExports.jsx(BacklinkTab, { hasAccess: hasFeatureAccess }),
        activeTab === "videogen" && /* @__PURE__ */ jsxRuntimeExports.jsx(VideoGeneratorTab, { hasAccess: hasFeatureAccess })
      ]
    }
  );
}
export {
  ImageCreatorTab,
  LocalSeoPage as default
};
