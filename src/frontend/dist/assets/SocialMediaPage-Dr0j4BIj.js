import { j as jsxRuntimeExports, r as reactExports } from "./vendor-react-CYgLKadW.js";
import { S as Skeleton, L as Label, I as Input, B as Button, T as Textarea } from "./index-DsrDu9m3.js";
import { g as Share2, X, bh as BookmarkPlus, Q as ExternalLink, av as Trash2, bi as Facebook, bj as Instagram, bk as Linkedin, bl as Twitter, bb as Globe, a4 as RefreshCw, bg as Image, a1 as Download, t as ue, H as Check, aT as Copy, aU as CalendarClock } from "./vendor-DT3DREzx.js";
import { u as useFeatureAccess, F as FeatureLockOverlay } from "./useFeatureAccess-Mp1yBNjO.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { f as useAiGenerateSocialPost, d as useAiGenerateImage } from "./useAi-BlR_ZtV6.js";
import "./vendor-ic-W9L5KZ_F.js";
import "./vendor-router-gX3Sk5jz.js";
const PLATFORMS = [
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    color: "oklch(0.52 0.18 264)",
    accent: "oklch(0.92 0.05 264)"
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "oklch(0.56 0.20 16)",
    accent: "oklch(0.96 0.04 16)"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    color: "oklch(0.48 0.16 230)",
    accent: "oklch(0.93 0.04 230)"
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: Twitter,
    charLimit: 280,
    color: "oklch(0.18 0.01 264)",
    accent: "oklch(0.94 0 264)"
  },
  {
    id: "google",
    label: "Google Business",
    icon: Globe,
    color: "oklch(0.52 0.18 44)",
    accent: "oklch(0.96 0.05 44)"
  }
];
function detectPlatform(url) {
  const lower = url.toLowerCase();
  if (lower.includes("facebook.com") || lower.includes("fb.com"))
    return "facebook";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "x";
  if (lower.includes("google.com") || lower.includes("business.google"))
    return "google";
  return "facebook";
}
function PlatformIcon({
  platform,
  size = 16
}) {
  const found = PLATFORMS.find((p) => p.id === platform);
  if (!found) return /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { style: { width: size, height: size } });
  const Icon = found.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Icon,
    {
      style: { width: size, height: size, color: found.color, flexShrink: 0 }
    }
  );
}
const ACCOUNTS_KEY = "tele-blast:social-accounts";
function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
  }
}
function SocialAccountsSidebar() {
  const [accounts, setAccounts] = reactExports.useState(
    () => loadAccounts()
  );
  const [label, setLabel] = reactExports.useState("");
  const [url, setUrl] = reactExports.useState("");
  const handleAdd = () => {
    const trimLabel = label.trim();
    const trimUrl = url.trim();
    if (!trimLabel || !trimUrl) {
      ue.error("Please enter both a label and a URL.");
      return;
    }
    if (accounts.length >= 10) {
      ue.error("You can save up to 10 social accounts.");
      return;
    }
    const newAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      label: trimLabel,
      url: trimUrl.startsWith("http") ? trimUrl : `https://${trimUrl}`,
      platform: detectPlatform(trimUrl)
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    saveAccounts(updated);
    setLabel("");
    setUrl("");
    ue.success("Account saved!");
  };
  const handleDelete = (id) => {
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    saveAccounts(updated);
    ue.success("Account removed.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: "flex flex-col gap-4",
      "data-ocid": "social_media.accounts_sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 rounded-xl border border-border",
            style: { background: "oklch(0.22 0.12 264 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 shrink-0" }),
                "My Social Accounts"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Save links to open your profiles instantly" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-label", className: "text-xs font-semibold", children: "Account Label" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-label",
                value: label,
                onChange: (e) => setLabel(e.target.value),
                placeholder: "e.g. Business Facebook Page",
                className: "text-sm h-9",
                "data-ocid": "social_media.account_label_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-url", className: "text-xs font-semibold", children: "Profile URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-url",
                type: "url",
                value: url,
                onChange: (e) => setUrl(e.target.value),
                placeholder: "https://facebook.com/yourbusiness",
                className: "text-sm h-9",
                "data-ocid": "social_media.account_url_input",
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleAdd();
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAdd,
              disabled: !label.trim() || !url.trim(),
              className: "w-full h-9 text-sm font-semibold gap-1.5 text-white",
              style: label.trim() && url.trim() ? { background: "oklch(0.22 0.12 264)" } : {},
              "data-ocid": "social_media.save_account_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-3.5 h-3.5" }),
                "Save Account"
              ]
            }
          )
        ] }),
        accounts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "social_media.accounts_list", children: accounts.map((account, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md transition-shadow",
            "data-ocid": `social_media.account.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { platform: account.platform, size: 15 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: account.label }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: account.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[30px] text-muted-foreground hover:text-foreground",
                  "data-ocid": `social_media.account_link.${idx + 1}`,
                  "aria-label": `Open ${account.label}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                    "Open"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDelete(account.id),
                  className: "p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors min-h-[30px] min-w-[30px] flex items-center justify-center",
                  "aria-label": `Remove ${account.label}`,
                  "data-ocid": `social_media.delete_account.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          },
          account.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 py-6 text-center text-muted-foreground",
            "data-ocid": "social_media.accounts_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-8 h-8 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
                "No accounts saved yet.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Add your first above."
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ScheduleButton() {
  const [showTip, setShowTip] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowTip(true), 300);
  };
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowTip(false);
  };
  reactExports.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: true,
        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-muted text-muted-foreground opacity-60 cursor-not-allowed min-h-[36px]",
        "aria-disabled": "true",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleMouseEnter,
        onBlur: handleMouseLeave,
        onTouchStart: handleMouseEnter,
        onTouchEnd: handleMouseLeave,
        "data-ocid": "social_media.schedule_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-3.5 h-3.5" }),
          "Schedule to Calendar"
        ]
      }
    ),
    showTip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-52 rounded-lg px-3 py-2 text-xs text-center shadow-xl border border-border",
        style: { background: "oklch(0.22 0.12 264)", color: "white" },
        role: "tooltip",
        "data-ocid": "social_media.schedule_tooltip",
        children: [
          "Coming soon — Facebook API integration",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-1/2 -translate-x-1/2 top-full w-0 h-0",
              style: {
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid oklch(0.22 0.12 264)"
              }
            }
          )
        ]
      }
    )
  ] });
}
function CopyButton({
  text,
  ocid
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      ue.success("Post copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      ue.error("Could not copy to clipboard.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[34px] text-muted-foreground hover:text-foreground",
      "data-ocid": ocid,
      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
        "Copied!"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
        "Copy Post"
      ] })
    }
  );
}
function PostGenerator({ hasAccess }) {
  const [activePlatform, setActivePlatform] = reactExports.useState("facebook");
  const [topic, setTopic] = reactExports.useState("");
  const [generatedPost, setGeneratedPost] = reactExports.useState(null);
  const [generatedImage, setGeneratedImage] = reactExports.useState(null);
  const generatePost = useAiGenerateSocialPost();
  const generateImage = useAiGenerateImage();
  const platform = PLATFORMS.find((p) => p.id === activePlatform);
  const handleGeneratePost = async () => {
    if (!topic.trim()) {
      ue.error("Please describe your post topic first.");
      return;
    }
    setGeneratedPost(null);
    setGeneratedImage(null);
    try {
      const result = await generatePost.mutateAsync({
        platform: platform.label,
        topic: topic.trim()
      });
      setGeneratedPost(result);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate post."
      );
    }
  };
  const handleGenerateCreative = async () => {
    if (!generatedPost) return;
    setGeneratedImage(null);
    try {
      const prompt = `Professional ${platform.label} social media creative visual for a sales agent: ${topic.trim()}. Clean, modern, vibrant design.`;
      const imageUrl = await generateImage.mutateAsync({
        prompt,
        style: "modern professional social media marketing"
      });
      setGeneratedImage(imageUrl);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Image generation failed."
      );
    }
  };
  const charLimit = platform.charLimit;
  const overLimit = charLimit && generatedPost && generatedPost.length > charLimit;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "social_media.generator", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl sm:text-2xl font-bold text-foreground leading-tight flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-white" })
            }
          ),
          "Social Media Post Generator"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "AI writes platform-perfect posts with creatives for every channel" })
      ] }),
      hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide",
        role: "tablist",
        "aria-label": "Select social media platform",
        "data-ocid": "social_media.platform_tabs",
        children: PLATFORMS.map((p) => {
          const Icon = p.icon;
          const active = activePlatform === p.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": active,
              onClick: () => {
                setActivePlatform(p.id);
                setGeneratedPost(null);
                setGeneratedImage(null);
              },
              className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[38px] border",
              style: active ? {
                background: p.color,
                color: "white",
                borderColor: p.color
              } : {
                background: p.accent,
                color: "oklch(0.3 0.08 264)",
                borderColor: "oklch(0.88 0.02 264)"
              },
              "data-ocid": `social_media.platform_tab.${p.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "w-3.5 h-3.5 shrink-0",
                    style: { color: active ? "white" : p.color }
                  }
                ),
                p.label,
                p.charLimit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                    style: active ? { background: "rgba(255,255,255,0.25)", color: "white" } : {
                      background: "oklch(0.88 0.02 264)",
                      color: "oklch(0.4 0.05 264)"
                    },
                    children: p.charLimit
                  }
                )
              ]
            },
            p.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.05)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { platform: activePlatform, size: 16 }),
              "Generate a ",
              platform.label,
              " Post"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Describe your topic and AI writes a ready-to-publish post",
              charLimit ? ` (optimized for ${charLimit}-character limit)` : ""
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-topic", className: "text-sm font-semibold", children: "Post Topic / Promotion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "post-topic",
              value: topic,
              onChange: (e) => setTopic(e.target.value),
              placeholder: "Describe your post topic, promotion, or announcement...",
              rows: 3,
              className: "resize-none text-sm",
              disabled: !hasAccess,
              "data-ocid": "social_media.topic_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGeneratePost,
            disabled: !topic.trim() || generatePost.isPending,
            className: "flex-1 font-bold min-h-[44px] gap-2 text-white text-sm",
            style: topic.trim() && true ? { background: platform.color } : {},
            "data-ocid": "social_media.generate_post_button",
            children: generatedPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate Post"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
              "Generate Post"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center gap-2.5 p-3 rounded-xl border border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upgrade to the $95/month Pro + Ads plan to generate social media posts." }) }) })
      ] })
    ] }),
    generatePost.isPending,
    generatePost.isError,
    generatedPost && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm",
        "data-ocid": "social_media.post_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 px-5 py-4 border-b border-border flex-wrap",
              style: { background: "oklch(0.22 0.12 264 / 0.05)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { platform: activePlatform, size: 16 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-foreground", children: [
                    "Your ",
                    platform.label,
                    " Post"
                  ] }),
                  charLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-[11px] font-semibold px-2 py-0.5 rounded-full ${overLimit ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
                      children: [
                        generatedPost.length,
                        "/",
                        charLimit,
                        " chars"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyButton,
                    {
                      text: generatedPost,
                      ocid: "social_media.copy_post_button"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleButton, {})
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words", children: generatedPost }) })
        ]
      }
    ),
    generatedPost && true && hasAccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 py-4 border-b border-border",
          style: { background: "oklch(0.22 0.12 264 / 0.05)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 shrink-0" }),
              "AI Creative"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Generate a visual to pair with your post (costs 1 tAI token)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGenerateCreative,
            disabled: generateImage.isPending,
            variant: "outline",
            className: "w-full min-h-[44px] gap-2 font-semibold text-sm",
            "data-ocid": "social_media.generate_creative_button",
            children: generatedImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Regenerate Creative"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
              "Generate Creative Image"
            ] })
          }
        ),
        generateImage.isPending,
        generateImage.isError,
        generatedImage && true && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "social_media.creative_preview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: generatedImage,
                  alt: "AI-generated social media creative",
                  className: "w-full object-cover",
                  style: { maxHeight: "360px" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: generatedImage,
                  download: "social-creative.png",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[40px] text-foreground",
                  "data-ocid": "social_media.download_image_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                    "Download Image"
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
function MobileAccountsDrawer() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        className: "flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm min-h-[40px]",
        "data-ocid": "social_media.open_accounts_drawer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 shrink-0" }),
          "My Accounts"
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex flex-col justify-end",
        style: { background: "oklch(0 0 0 / 0.5)" },
        onClick: (e) => {
          if (e.target === e.currentTarget) setOpen(false);
        },
        onKeyDown: (e) => {
          if (e.key === "Escape") setOpen(false);
        },
        "data-ocid": "social_media.accounts_drawer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-t-2xl bg-background border-t border-border overflow-y-auto",
            style: { maxHeight: "80dvh" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 shrink-0" }),
                  "My Social Accounts"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setOpen(false),
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
                    "aria-label": "Close drawer",
                    "data-ocid": "social_media.close_accounts_drawer",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialAccountsSidebar, {}) })
            ]
          }
        )
      }
    )
  ] });
}
function SocialMediaPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const hasFeatureAccess = !accessLoading && hasAccess;
  if (accessLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-6 py-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8 relative overflow-hidden",
      "data-ocid": "social_media.page",
      children: [
        !hasAccess && !accessLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureLockOverlay, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAccountsDrawer, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "hidden lg:flex flex-col gap-0 shrink-0",
                style: { width: "280px" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialAccountsSidebar, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostGenerator, { hasAccess: hasFeatureAccess }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  SocialMediaPage as default
};
