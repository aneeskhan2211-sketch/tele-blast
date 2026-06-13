import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { c as useNavigate, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { b as blogPosts, B as BlogCard } from "./blogPosts-ge7YiFDG.js";
import { d as useSubscription, a5 as useSEO, a7 as SiteFooter } from "./index-DsrDu9m3.js";
import { T as TrendingUp, bw as Rss, aK as ChevronRight, b6 as BookOpen } from "./vendor-DT3DREzx.js";
const blogPageSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Tele-Blast Blog",
  description: "Expert guides on SMS automation, lead follow-up, appointment reminders, and business communication tools for small businesses.",
  url: "https://www.tele-blast.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Tele-Blast",
    url: "https://www.tele-blast.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.tele-blast.com/icons/icon-192.svg"
    }
  },
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://www.tele-blast.com/blog/${p.slug}`,
    datePublished: p.datePublished,
    author: { "@type": "Organization", name: p.author }
  }))
});
const FEATURED_RESOURCES = [
  {
    label: "View Pricing — $15/mo",
    href: "/pricing",
    accent: true,
    isLink: true
  },
  {
    label: "Explore Features",
    href: "/#features",
    accent: false,
    isLink: false
  },
  { label: "Support Center", href: "/support", accent: false, isLink: true },
  {
    label: "Affiliate Program",
    href: "/affiliate-signup",
    accent: false,
    isLink: true
  }
];
function BlogPage() {
  const navigate = useNavigate();
  const { login } = useInternetIdentity();
  const { subscriptionTier, isLoading: subLoading } = useSubscription();
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
        navigate({ to: "/pre-signup" });
      }
    } catch {
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }
  useSEO({
    title: "Tele-Blast Blog | Cell Phone CRM, SMS Blast & Power Dialer Tips",
    description: "Tele-Blast utilizes your cell phone & turns into your own personal business CRM. Expert guides on SMS broadcast, power dialer, and lead management.",
    canonical: "https://www.tele-blast.com/blog",
    ogTitle: "Tele-Blast Blog — Business Communication & SMS Automation Tips",
    ogDescription: "Discover how SMS automation, automated follow-ups, and appointment reminders can save your business time and money.",
    ogUrl: "https://www.tele-blast.com/blog",
    ogType: "website",
    ogImage: "https://www.tele-blast.com/og-image.png",
    jsonLd: blogPageSchema
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-40 border-b shadow-sm",
        style: {
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "data-ocid": "blog.nav.home_link",
              className: "flex items-center gap-2 shrink-0",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden sm:flex items-center gap-6 text-sm font-medium flex-1 ml-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: "text-white/70 hover:text-white transition-colors duration-200",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/blog",
                className: "text-white font-semibold",
                style: { color: "oklch(0.75 0.16 44)" },
                children: "Blog"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pricing",
                className: "text-white/70 hover:text-white transition-colors duration-200",
                children: "Pricing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/support",
                className: "text-white/70 hover:text-white transition-colors duration-200",
                children: "Support"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/affiliate-signup",
                className: "text-white/70 hover:text-white transition-colors duration-200",
                children: "Affiliate"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleAuth,
                disabled: authInProgress,
                "data-ocid": "blog.nav.login_button",
                className: "text-sm font-medium text-white/70 hover:text-white px-3 py-2 transition-colors duration-200 min-h-[40px] disabled:opacity-60",
                children: authInProgress ? "Opening…" : "Log In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/pre-signup" }),
                "data-ocid": "blog.nav.cta_button",
                className: "px-4 py-2 rounded-lg text-white text-sm font-semibold min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95",
                style: { background: "oklch(0.56 0.16 44)" },
                children: "Get Started"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 sm:py-20 text-white",
        style: {
          background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border",
              style: {
                background: "oklch(0.56 0.16 44 / 0.18)",
                border: "1px solid oklch(0.56 0.16 44 / 0.3)",
                color: "oklch(0.82 0.14 44)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Rss, { className: "w-3.5 h-3.5" }),
                "Small Business Resources"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight", children: "Tele-Blast Blog — Cell Phone CRM & SMS Blast Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed",
              style: { color: "oklch(0.98 0 0 / 0.65)" },
              children: [
                "Expert guides on",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/blog/sms-broadcast-automation",
                    className: "underline underline-offset-2 hover:opacity-80 transition-opacity",
                    style: { color: "oklch(0.82 0.14 44)" },
                    children: "SMS automation"
                  }
                ),
                ", lead follow-ups, and business communication tools that actually work for sales teams."
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1 text-sm text-muted-foreground",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Blog" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Latest Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-sm text-muted-foreground", children: [
          blogPosts.length,
          " articles"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "blog.list",
          className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
          children: blogPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            BlogCard,
            {
              title: post.title,
              excerpt: post.excerpt,
              slug: post.slug,
              date: post.datePublished,
              readTime: post.readTime,
              author: post.author,
              index: i
            },
            post.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl overflow-hidden shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/sales-agent-cell-phone-crm.dim_800x600.jpg",
              alt: "Sales agent using cell phone CRM to manage leads and SMS blast campaigns",
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
              alt: "Professional sales representative using mobile CRM on smartphone for power dialer and lead management",
              className: "w-full h-48 object-cover object-center",
              loading: "lazy",
              width: "800",
              height: "300"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales representative using Tele-Blast mobile CRM" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-8 rounded-2xl p-8 border",
          style: {
            background: "oklch(0.22 0.12 264 / 0.04)",
            borderColor: "oklch(0.22 0.12 264 / 0.1)"
          },
          "data-ocid": "blog.featured_resources",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "text-lg font-bold mb-2",
                style: { color: "oklch(0.22 0.12 264)" },
                children: "Explore Tele-Blast"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Power Dialer, SMS Blast & CRM for sales teams — starting at $15/mo." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: FEATURED_RESOURCES.map(
              ({ label, href, accent, isLink }) => isLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: href,
                  className: "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95",
                  style: accent ? { background: "oklch(0.56 0.16 44)", color: "white" } : {
                    background: "oklch(0.22 0.12 264 / 0.08)",
                    color: "oklch(0.22 0.12 264)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.15)"
                  },
                  "data-ocid": `blog.resources.${label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
                  children: label
                },
                label
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href,
                  className: "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.08)",
                    color: "oklch(0.22 0.12 264)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.15)"
                  },
                  "data-ocid": `blog.resources.${label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
                  children: label
                },
                label
              )
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14",
        style: {
          background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white mb-4", children: "Ready to Automate Your Business Communication?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-8 leading-relaxed",
              style: { color: "oklch(0.98 0 0 / 0.65)" },
              children: "Join sales teams saving 5–10 hours every week with Tele-Blast power dialer, SMS blast, and CRM pipeline."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/pre-signup" }),
                "data-ocid": "blog.cta.primary_button",
                className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-colors text-base",
                style: { background: "oklch(0.56 0.16 44)" },
                children: "Get Started — $15/mo"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pricing",
                className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-colors hover:bg-white/15",
                style: {
                  color: "oklch(0.98 0 0 / 0.8)",
                  border: "1.5px solid oklch(0.98 0 0 / 0.25)"
                },
                children: "View Pricing"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  BlogPage as default
};
