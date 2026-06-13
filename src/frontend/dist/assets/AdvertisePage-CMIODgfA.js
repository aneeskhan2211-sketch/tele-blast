import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a6 as useProfile, S as Skeleton, L as Label, T as Textarea, B as Button } from "./index-DsrDu9m3.js";
import { L as Link } from "./vendor-router-gX3Sk5jz.js";
import { bf as Megaphone, bg as Image, a5 as ArrowRight, a4 as RefreshCw, ap as Sparkles, a1 as Download, N as ArrowLeft, aj as CircleAlert, Q as ExternalLink, t as ue, H as Check, aT as Copy } from "./vendor-DT3DREzx.js";
import { u as useFeatureAccess, F as FeatureLockOverlay } from "./useFeatureAccess-Mp1yBNjO.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { c as useAiGenerateAdCopy, d as useAiGenerateImage, e as useAiGenerateAdCreatives } from "./useAi-BlR_ZtV6.js";
import "./vendor-ic-W9L5KZ_F.js";
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function StepIndicator({ step }) {
  const steps = ["Platform & Offer", "Ad Copy", "Launch"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0",
      "data-ocid": "advertise.step_indicator",
      children: steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isDone = step > num;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? "text-white" : isActive ? "text-white" : "text-muted-foreground border border-border bg-background"}`,
                style: isDone || isActive ? { background: "oklch(0.56 0.16 44)" } : {},
                "data-ocid": `advertise.step_indicator.${num}`,
                children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : num
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-medium whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`,
                children: label
              }
            )
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 sm:w-16 h-0.5 mb-4 mx-1",
              style: {
                background: step > i + 1 ? "oklch(0.56 0.16 44)" : "oklch(0.85 0 0)"
              }
            }
          )
        ] }, num);
      })
    }
  );
}
function PlatformCard({
  platform,
  selected,
  onSelect
}) {
  const isMeta = platform === "meta";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onSelect,
      className: `relative w-full flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-left ${selected ? "border-primary shadow-md" : "border-border hover:border-border/80 hover:shadow-sm"}`,
      style: selected ? { borderColor: "oklch(0.56 0.16 44)" } : {},
      "data-ocid": `advertise.platform_card.${platform}`,
      "aria-pressed": selected,
      children: [
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center",
            style: { background: "oklch(0.56 0.16 44)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-sm",
            style: {
              background: isMeta ? "linear-gradient(135deg, #1877F2, #42A5F5)" : "linear-gradient(135deg, #4285F4, #34A853)"
            },
            children: isMeta ? "f" : "G"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-base", children: isMeta ? "Meta Ads" : "Google Ads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isMeta ? "Facebook & Instagram campaigns" : "Search & display campaigns" })
        ] })
      ]
    }
  );
}
function CopyField({
  label,
  value,
  ocid,
  multiline
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
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
    multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed p-3 rounded-lg bg-muted/40 border border-border whitespace-pre-wrap break-words", children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground p-3 rounded-lg bg-muted/40 border border-border truncate", children: value })
  ] });
}
function CreativeField({
  label,
  value,
  ocid,
  multiline
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
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
function AdCreativesSection({
  platform,
  companyName
}) {
  const generateCreatives = useAiGenerateAdCreatives();
  const [conceptDescription, setConceptDescription] = reactExports.useState("");
  const [targetAudience, setTargetAudience] = reactExports.useState("");
  const [visualStyle, setVisualStyle] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const handleGenerate = async () => {
    if (!conceptDescription.trim()) {
      ue.error("Please describe your creative concept.");
      return;
    }
    setResult(null);
    try {
      const res = await generateCreatives.mutateAsync({
        platform,
        conceptDescription,
        targetAudience,
        visualStyle,
        companyName
      });
      setResult(res);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate creatives."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
      "data-ocid": "advertise.creatives_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
            style: { background: "oklch(0.22 0.12 264 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0",
                  style: { background: "oklch(0.56 0.16 44)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "AI Creatives" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Generate a visual creative brief for your",
                  " ",
                  platform === "meta" ? "Meta" : "Google",
                  " ad"
                ] })
              ] }),
              result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setResult(null);
                    handleGenerate();
                  },
                  disabled: generateCreatives.isPending,
                  className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[32px] text-muted-foreground hover:text-foreground disabled:opacity-50",
                  "data-ocid": "advertise.creatives_retry_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Retry" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "conceptDescription",
                className: "text-sm font-semibold text-foreground",
                children: [
                  "Describe your creative concept",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "What are you advertising? What feeling or message should the visual convey?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "conceptDescription",
                value: conceptDescription,
                onChange: (e) => setConceptDescription(e.target.value),
                placeholder: "e.g. A confident sales rep closing a deal on their phone, modern office setting…",
                rows: 3,
                className: "resize-none text-sm",
                "data-ocid": "advertise.creatives_concept_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "targetAudience",
                  className: "text-sm font-semibold text-foreground",
                  children: "Target audience"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "targetAudience",
                  value: targetAudience,
                  onChange: (e) => setTargetAudience(e.target.value),
                  placeholder: "e.g. Small business owners aged 30-55…",
                  rows: 2,
                  className: "resize-none text-sm",
                  "data-ocid": "advertise.creatives_audience_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "visualStyle",
                  className: "text-sm font-semibold text-foreground",
                  children: "Visual style"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "visualStyle",
                  value: visualStyle,
                  onChange: (e) => setVisualStyle(e.target.value),
                  placeholder: "e.g. Professional blue theme, bold orange CTA…",
                  rows: 2,
                  className: "resize-none text-sm",
                  "data-ocid": "advertise.creatives_style_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleGenerate,
              disabled: !conceptDescription.trim() || generateCreatives.isPending,
              className: "w-full font-bold text-sm min-h-[48px] gap-2 text-white",
              style: conceptDescription.trim() && true ? { background: "oklch(0.56 0.16 44)" } : {},
              "data-ocid": "advertise.creatives_generate_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                "Generate Creative Brief"
              ] })
            }
          ),
          generateCreatives.isPending,
          generateCreatives.isError,
          result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-4 pt-2 border-t border-border",
              "data-ocid": "advertise.creatives_results",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1", children: "Your Creative Brief" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CreativeField,
                  {
                    label: "Image Description",
                    value: result.imageDescription,
                    ocid: "advertise.creatives_image_desc_field",
                    multiline: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1.5",
                    "data-ocid": "advertise.creatives_headlines_field",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Headline Variations" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  result.headlines.join("\n")
                                );
                                ue.success("Headlines copied!");
                              } catch {
                                ue.error("Could not copy to clipboard.");
                              }
                            },
                            className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground",
                            "data-ocid": "advertise.creatives_headlines_copy_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                              "Copy All"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: result.headlines.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between gap-2 p-3 rounded-lg bg-muted/40 border border-border",
                          "data-ocid": "advertise.creatives_headline",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground break-words flex-1", children: h }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: async () => {
                                  try {
                                    await navigator.clipboard.writeText(h);
                                    ue.success("Headline copied!");
                                  } catch {
                                    ue.error("Could not copy.");
                                  }
                                },
                                className: "shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                                "aria-label": "Copy headline",
                                "data-ocid": "advertise.creatives_headline_copy_button",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" })
                              }
                            )
                          ]
                        },
                        h
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1.5",
                    "data-ocid": "advertise.creatives_palette_field",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Suggested Color Palette" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: result.colorPalette.map((hex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: async () => {
                            try {
                              await navigator.clipboard.writeText(hex);
                              ue.success(`${hex} copied!`);
                            } catch {
                              ue.error("Could not copy.");
                            }
                          },
                          title: `Copy ${hex}`,
                          className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-xs font-mono font-medium text-foreground min-h-[40px]",
                          "data-ocid": `advertise.creatives_color.${hex}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-5 h-5 rounded-md border border-border shrink-0",
                                style: { background: hex }
                              }
                            ),
                            hex
                          ]
                        },
                        hex
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CreativeField,
                  {
                    label: "Image Overlay Text",
                    value: result.overlayText,
                    ocid: "advertise.creatives_overlay_field"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CreativeField,
                  {
                    label: "Call to Action",
                    value: result.cta,
                    ocid: "advertise.creatives_cta_field"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdvertisePage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const generateAdCopy = useAiGenerateAdCopy();
  const generateImage = useAiGenerateImage();
  const [activeTab, setActiveTab] = reactExports.useState("ad_copy");
  const [step, setStep] = reactExports.useState(1);
  const [platform, setPlatform] = reactExports.useState("meta");
  const [offerDescription, setOfferDescription] = reactExports.useState("");
  const [adCopy, setAdCopy] = reactExports.useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = reactExports.useState(
    null
  );
  const companyName = profile?.companyName ?? "";
  const repName = profile?.name ?? "";
  const slug = companyName ? slugify(companyName) : "";
  const contactFormUrl = slug ? `https://tele-blast.com/lead-forms/public/${slug}` : null;
  const handleGenerateAndAdvance = async () => {
    if (!offerDescription.trim()) {
      ue.error("Please describe your offer before continuing.");
      return;
    }
    setAdCopy(null);
    setGeneratedImageUrl(null);
    try {
      const result = await generateAdCopy.mutateAsync({
        platform,
        offerDescription,
        repName,
        companyName
      });
      setAdCopy(result);
      setStep(2);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate ad copy."
      );
    }
  };
  const handleRetry = async () => {
    if (!offerDescription.trim()) return;
    setAdCopy(null);
    setGeneratedImageUrl(null);
    try {
      const result = await generateAdCopy.mutateAsync({
        platform,
        offerDescription,
        repName,
        companyName
      });
      setAdCopy(result);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate ad copy."
      );
    }
  };
  const handleGenerateImage = async () => {
    if (!adCopy) return;
    setGeneratedImageUrl(null);
    const prompt = `${platform === "meta" ? "Facebook/Instagram" : "Google display"} ad creative for: ${adCopy.headline}. ${adCopy.bodyCopy}. CTA: ${adCopy.cta}. Professional marketing style, vibrant colors, bold typography.`;
    try {
      const url = await generateImage.mutateAsync({
        prompt,
        style: "marketing"
      });
      setGeneratedImageUrl(url);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Image generation is temporarily unavailable. Please try again in a moment."
      );
    }
  };
  const metaAdsUrl = "https://www.facebook.com/adsmanager";
  const googleAdsUrl = "https://ads.google.com/home/";
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden",
      "data-ocid": "advertise.page",
      children: [
        !accessLoading && !hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureLockOverlay, {}),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "Advertise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create AI-generated ad copy or creative briefs for Meta or Google" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-1 p-1 rounded-xl bg-muted/40 border border-border",
            role: "tablist",
            "data-ocid": "advertise.tab_switcher",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeTab === "ad_copy",
                  onClick: () => setActiveTab("ad_copy"),
                  className: `flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "ad_copy" ? "text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  style: activeTab === "ad_copy" ? { background: "oklch(0.22 0.12 264)" } : {},
                  "data-ocid": "advertise.ad_copy.tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" }),
                    "Ad Copy"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeTab === "ai_creatives",
                  onClick: () => setActiveTab("ai_creatives"),
                  className: `flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${activeTab === "ai_creatives" ? "text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  style: activeTab === "ai_creatives" ? { background: "oklch(0.22 0.12 264)" } : {},
                  "data-ocid": "advertise.ai_creatives.tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
                    "AI Creatives"
                  ]
                }
              )
            ]
          }
        ),
        activeTab === "ad_copy" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step }) }),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
              "data-ocid": "advertise.step1_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
                    style: { background: "oklch(0.22 0.12 264 / 0.06)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                          style: { background: "oklch(0.56 0.16 44)" },
                          children: "1"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Choose Platform & Describe Your Offer" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Which ad platform?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PlatformCard,
                        {
                          platform: "meta",
                          selected: platform === "meta",
                          onSelect: () => setPlatform("meta")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PlatformCard,
                        {
                          platform: "google",
                          selected: platform === "google",
                          onSelect: () => setPlatform("google")
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "offerDescription",
                        className: "text-sm font-semibold text-foreground",
                        children: "Describe your offer"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "What are you promoting? Who is it for? What's the key benefit or call to action?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "offerDescription",
                        value: offerDescription,
                        onChange: (e) => setOfferDescription(e.target.value),
                        placeholder: "e.g. Sales consulting services for small business owners, free 30-min strategy call…",
                        rows: 4,
                        className: "resize-none text-sm min-h-[100px]",
                        "data-ocid": "advertise.offer_description_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleGenerateAndAdvance,
                      disabled: !offerDescription.trim() || generateAdCopy.isPending,
                      className: "w-full font-bold text-sm min-h-[48px] gap-2 text-white",
                      style: offerDescription.trim() && true ? { background: "oklch(0.56 0.16 44)" } : {},
                      "data-ocid": "advertise.generate_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Generate Ad Copy",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    }
                  )
                ] })
              ]
            }
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
              "data-ocid": "advertise.step2_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
                    style: { background: "oklch(0.22 0.12 264 / 0.06)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                          style: { background: "oklch(0.56 0.16 44)" },
                          children: "2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground", children: [
                        "Your ",
                        platform === "meta" ? "Meta" : "Google",
                        " Ad Copy"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleRetry,
                          disabled: generateAdCopy.isPending,
                          className: "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[32px] text-muted-foreground hover:text-foreground disabled:opacity-50",
                          "data-ocid": "advertise.retry_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Retry" })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-4", children: adCopy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyField,
                    {
                      label: "Headline",
                      value: adCopy.headline,
                      ocid: "advertise.headline_field"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyField,
                    {
                      label: "Body Copy",
                      value: adCopy.bodyCopy,
                      ocid: "advertise.body_copy_field",
                      multiline: true
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyField,
                    {
                      label: "Call to Action",
                      value: adCopy.cta,
                      ocid: "advertise.cta_field"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "pt-3 border-t border-border space-y-3",
                      "data-ocid": "advertise.generate_image_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            onClick: handleGenerateImage,
                            disabled: generateImage.isPending,
                            className: "w-full font-bold text-sm min-h-[48px] gap-2 text-white",
                            style: { background: "oklch(0.22 0.12 264)" },
                            "data-ocid": "advertise.generate_creative_button",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                              "Generate Creative"
                            ] })
                          }
                        ),
                        generateImage.isPending,
                        generateImage.isError,
                        generatedImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "space-y-2",
                            "data-ocid": "advertise.generated_image_preview",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Generated Creative" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "img",
                                {
                                  src: generatedImageUrl,
                                  alt: "AI-generated ad creative",
                                  className: "w-full h-auto block"
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "a",
                                {
                                  href: generatedImageUrl,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className: "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition-colors min-h-[44px]",
                                  "data-ocid": "advertise.download_image_button",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                                    "Download Image"
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] }) : null }),
                adCopy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => setStep(1),
                      className: "gap-1.5",
                      "data-ocid": "advertise.back_to_step1_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                        "Back"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => setStep(3),
                      className: "gap-1.5 text-white font-semibold",
                      style: { background: "oklch(0.56 0.16 44)" },
                      "data-ocid": "advertise.next_to_step3_button",
                      children: [
                        "Next: Launch",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
              "data-ocid": "advertise.step3_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
                    style: { background: "oklch(0.22 0.12 264 / 0.06)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                          style: { background: "oklch(0.56 0.16 44)" },
                          children: "3"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground", children: [
                        "Launch on",
                        " ",
                        platform === "meta" ? "Meta Ads Manager" : "Google Ads"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "space-y-2",
                      "data-ocid": "advertise.landing_page_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Your Landing Page URL" }),
                        contactFormUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CopyField,
                          {
                            label: "Contact Form URL",
                            value: contactFormUrl,
                            ocid: "advertise.contact_form_url_field"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-2.5 p-3 rounded-lg border border-amber-500/40 bg-amber-50 dark:bg-amber-900/10",
                            "data-ocid": "advertise.no_company_notice",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-600 mt-0.5 shrink-0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800 dark:text-amber-300", children: [
                                "Your contact form URL isn't ready yet. Please",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Link,
                                  {
                                    to: "/profile",
                                    className: "font-semibold underline hover:no-underline",
                                    children: "update your profile"
                                  }
                                ),
                                " ",
                                "with your company name to generate your unique form link."
                              ] })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "space-y-2",
                      "data-ocid": "advertise.instructions_section",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Step-by-Step Instructions" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl border border-border bg-muted/30 space-y-2", children: platform === "meta" ? /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2.5 list-none", children: [
                          "Go to Meta Ads Manager and click Create.",
                          "Choose a Campaign Objective (e.g. Leads or Traffic).",
                          "Set your audience, budget, and schedule, then click Next.",
                          "Under Ad Creative, in Primary Text paste your body copy.",
                          "In the Headline field paste your headline.",
                          "Set your CTA button to match the suggested Call to Action text.",
                          "Add the Landing Page URL from above as the destination link.",
                          "Review your ad and click Publish."
                        ].map((stepText, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "li",
                          {
                            className: "flex items-start gap-2.5 text-sm text-foreground",
                            "data-ocid": `advertise.instruction_step.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5",
                                  style: { background: "oklch(0.22 0.12 264)" },
                                  children: i + 1
                                }
                              ),
                              stepText
                            ]
                          },
                          stepText
                        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2.5 list-none", children: [
                          "Go to Google Ads and click New Campaign.",
                          "Select Search as your campaign type.",
                          "Choose your goal (e.g. Leads or Website Traffic).",
                          "Set your budget, bidding, and targeting, then continue.",
                          "Under Ad Creation, in the Headlines fields add your headline.",
                          "In the Descriptions fields paste your body copy.",
                          "Set the Final URL to the Landing Page URL from above.",
                          "Review your responsive search ad and click Save and Continue."
                        ].map((stepText, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "li",
                          {
                            className: "flex items-start gap-2.5 text-sm text-foreground",
                            "data-ocid": `advertise.instruction_step.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5",
                                  style: { background: "oklch(0.22 0.12 264)" },
                                  children: i + 1
                                }
                              ),
                              stepText
                            ]
                          },
                          stepText
                        )) }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => setStep(2),
                        className: "gap-1.5",
                        "data-ocid": "advertise.back_to_step2_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                          "Back to Ad Copy"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: platform === "meta" ? metaAdsUrl : googleAdsUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all min-h-[44px] shadow-sm",
                        style: { background: "oklch(0.56 0.16 44)" },
                        "data-ocid": "advertise.open_ads_manager_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                          "Open",
                          " ",
                          platform === "meta" ? "Meta Ads Manager" : "Google Ads"
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ] }),
        activeTab === "ai_creatives" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdCreativesSection, { platform, companyName })
      ]
    }
  );
}
export {
  AdvertisePage as default
};
