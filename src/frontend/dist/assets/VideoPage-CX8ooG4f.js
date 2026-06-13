import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { c as useNavigate } from "./vendor-router-gX3Sk5jz.js";
import { F as FileText, ae as Upload, P as Phone, az as Calendar, Y as MessageSquare, b6 as BookOpen, b7 as Hls } from "./vendor-DT3DREzx.js";
import { P as PublicNavBar } from "./PublicNavBar-Dh9EDIh3.js";
import { d as useSubscription, J as STRIPE_PAYMENT_LINK } from "./index-DsrDu9m3.js";
const HLS_SRC = "https://media.thetavideoapi.com/org_sqfd4gn1xenwt9f7g2ky2746bu5u/srvacc_zysyi9xj5a5irfy0gge605gk2/video_zwdbe99u4mbvf69r5w6hgwvdcv/master.m3u8";
const LEARN_ITEMS = [
  {
    icon: Upload,
    title: "Lead Import via CSV",
    desc: "Bulk import hundreds of prospects in seconds with column mapping and error preview."
  },
  {
    icon: Phone,
    title: "Power Dialer in Action",
    desc: "Run call, text, and email sessions — auto-advancing through your lead list."
  },
  {
    icon: Calendar,
    title: "Birthday & Follow-Up Queues",
    desc: "Never miss a birthday or follow-up date with smart queue management."
  },
  {
    icon: MessageSquare,
    title: "Cold Call Script Generator",
    desc: "Generate structured scripts — Greeting, Pre-Qualifying, Pitch, and A/B Close."
  },
  {
    icon: BookOpen,
    title: "Pipeline Management",
    desc: "Move prospects through Prospect → Contacted → Qualified → Closed with a visual board."
  }
];
function VideoPlayer() {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl",
      style: {
        background: "oklch(0.18 0.12 264)",
        border: "1px solid oklch(0.32 0.12 264 / 0.6)"
      },
      "data-ocid": "video.player_wrapper",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "video",
        {
          ref: videoRef,
          controls: true,
          playsInline: true,
          className: "absolute inset-0 w-full h-full",
          poster: "https://www.tele-blast.com/og-image.png",
          "data-ocid": "video.player",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }),
            "Your browser does not support the video tag."
          ]
        }
      ) })
    }
  );
}
function VideoPage() {
  const navigate = useNavigate();
  const { login } = useInternetIdentity();
  const { subscriptionTier, isLoading: subLoading } = useSubscription();
  const [authInProgress, setAuthInProgress] = reactExports.useState(false);
  const loginCalledRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const prevTitle = document.title;
    document.title = "How to Use Tele-Blast | Sales Pipeline & Outreach Demo Video";
    const metas = [];
    const ogLinks = [];
    function addMeta(name, content, isProperty = false) {
      const el = document.createElement("meta");
      if (isProperty) {
        el.setAttribute("property", name);
      } else {
        el.setAttribute("name", name);
      }
      el.content = content;
      document.head.appendChild(el);
      metas.push(el);
    }
    addMeta(
      "description",
      "Watch our step-by-step video walkthrough of Tele-Blast — the mobile-first sales tool for managing leads, running a power dialer, and closing more deals."
    );
    addMeta(
      "og:title",
      "How to Use Tele-Blast | Sales Pipeline & Outreach Demo Video",
      true
    );
    addMeta(
      "og:description",
      "Watch our step-by-step video walkthrough of Tele-Blast — the mobile-first sales tool for managing leads, running a power dialer, and closing more deals.",
      true
    );
    addMeta("og:type", "video.other", true);
    addMeta("og:url", "https://www.tele-blast.com/video", true);
    addMeta("twitter:card", "summary_large_image");
    addMeta(
      "twitter:title",
      "How to Use Tele-Blast | Sales Pipeline & Outreach Demo Video"
    );
    addMeta(
      "twitter:description",
      "Watch our step-by-step video walkthrough of Tele-Blast — the mobile-first sales tool for managing leads, running a power dialer, and closing more deals."
    );
    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Tele-Blast Demo — How to Use the Sales Pipeline & Power Dialer",
      description: "A complete walkthrough of Tele-Blast: importing leads via CSV, managing your sales pipeline, using the power dialer for calls/texts/emails, the birthday queue, follow-up queue, cold call script generator, and AI smart search.",
      thumbnailUrl: "https://www.tele-blast.com/og-image.png",
      uploadDate: "2025-01-01T00:00:00+00:00",
      contentUrl: HLS_SRC,
      embedUrl: "https://www.tele-blast.com/video"
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.title = prevTitle;
      for (const m of metas) {
        if (m.parentNode) m.parentNode.removeChild(m);
      }
      for (const l of ogLinks) {
        if (l.parentNode) l.parentNode.removeChild(l);
      }
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
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
  function handleSubscribe() {
    window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col bg-background overflow-x-hidden",
      style: { minHeight: "100dvh" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/video", ocidPrefix: "video" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "flex flex-col items-center justify-center text-center px-5 pt-28 pb-12",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)"
            },
            "data-ocid": "video.hero.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                    "Product Demo"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white",
                  "data-ocid": "video.hero.headline",
                  children: "See Tele-Blast in Action — Cell Phone CRM Demo"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed",
                  style: { color: "oklch(0.98 0 0 / 0.65)" },
                  children: "Watch an overview of everything Tele-Blast can do."
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-4 sm:px-6 py-10 -mt-6 relative z-10",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "video.player.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, {}) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-4 sm:px-6 py-10",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "video.agents.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/sales-agent-cell-phone-crm.dim_800x600.jpg",
                    alt: "Sales agent using cell phone CRM Tele-Blast to manage outbound calls and SMS blasts",
                    className: "w-full h-48 object-cover object-center",
                    loading: "lazy",
                    width: "800",
                    height: "300"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales agent using Tele-Blast cell phone CRM" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/sales-rep-mobile-crm-calls.dim_800x600.jpg",
                    alt: "Professional sales representative using Tele-Blast mobile CRM on smartphone to run power dialer",
                    className: "w-full h-48 object-cover object-center",
                    loading: "lazy",
                    width: "800",
                    height: "300"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales representative using Tele-Blast mobile CRM for power dialing" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-14 sm:py-16",
            style: { background: "oklch(0.97 0 0)" },
            "data-ocid": "video.learn.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-2xl sm:text-3xl font-bold text-center mb-8",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: "What you'll learn in this video"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: LEARN_ITEMS.map(({ icon: Icon, title, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
                  style: { borderColor: "oklch(0.91 0 0)" },
                  "data-ocid": `video.learn.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        style: { background: "oklch(0.22 0.12 264 / 0.08)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Icon,
                          {
                            className: "w-4.5 h-4.5",
                            style: { color: "oklch(0.56 0.16 44)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-semibold text-sm mb-1",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm leading-relaxed",
                          style: { color: "oklch(0.48 0 0)" },
                          children: desc
                        }
                      )
                    ] })
                  ]
                },
                title
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "px-5 py-16 sm:py-20 text-center",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)"
            },
            "data-ocid": "video.cta.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white mb-3", children: "Ready to get started?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-base mb-8",
                  style: { color: "oklch(0.98 0 0 / 0.65)" },
                  children: "Join 100+ sales agents using Tele-Blast to close more deals with less effort."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full sm:w-auto font-bold text-base text-white px-10 py-4 rounded-xl min-h-[52px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg",
                  style: { background: "oklch(0.56 0.16 44)" },
                  onClick: handleSubscribe,
                  "data-ocid": "video.cta.subscribe_button",
                  children: "Subscribe Now — $15/month"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "mt-5 text-sm font-medium transition-colors duration-200 underline underline-offset-2",
                  style: { color: "oklch(0.98 0 0 / 0.55)" },
                  onClick: handleAuth,
                  "data-ocid": "video.cta.login_link",
                  children: "Already have an account? Log In"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "px-5 py-6 text-center border-t",
            style: {
              background: "oklch(0.18 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            "data-ocid": "video.footer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "oklch(0.98 0 0 / 0.4)" }, children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " Tele-Blast. All rights reserved."
            ] })
          }
        )
      ]
    }
  );
}
export {
  VideoPage as default
};
