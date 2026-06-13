import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { c as useNavigate, j as useParams, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { g as getBlogPost, a as getRelatedPosts, B as BlogCard } from "./blogPosts-ge7YiFDG.js";
import { d as useSubscription, a5 as useSEO, a7 as SiteFooter } from "./index-DsrDu9m3.js";
import { N as ArrowLeft, T as TrendingUp, aK as ChevronRight, U as User, az as Calendar, b9 as Clock } from "./vendor-DT3DREzx.js";
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogPostPage() {
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
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = getBlogPost(slug);
  useSEO(
    post ? {
      title: post.metaTitle,
      description: post.metaDescription,
      canonical: post.canonicalUrl,
      ogTitle: post.ogTitle,
      ogDescription: post.ogDescription,
      ogUrl: post.ogUrl,
      ogType: "article",
      jsonLd: post.jsonLdSchema
    } : {
      title: "Article Not Found | Tele-Blast Blog",
      description: "This article could not be found on the Tele-Blast blog.",
      canonical: "https://www.tele-blast.com/blog"
    }
  );
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Article Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-sm", children: "The article you are looking for does not exist or has been moved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog",
          className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-colors",
          style: { background: "oklch(0.56 0.16 44)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Blog"
          ]
        }
      )
    ] });
  }
  const related = getRelatedPosts(post.relatedPosts).slice(0, 2);
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
              "data-ocid": "blog-post.nav.home_link",
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
                "data-ocid": "blog-post.nav.blog_link",
                className: "text-white/70 hover:text-white transition-colors duration-200",
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
                className: "text-sm font-medium text-white/70 hover:text-white px-3 py-2 transition-colors min-h-[40px] disabled:opacity-60",
                children: authInProgress ? "Opening…" : "Log In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/pre-signup" }),
                "data-ocid": "blog-post.nav.cta_button",
                className: "px-4 py-2 rounded-lg text-white text-sm font-semibold min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95",
                style: { background: "oklch(0.56 0.16 44)" },
                children: "Get Started"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1 text-sm text-muted-foreground flex-wrap",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/blog",
              className: "hover:text-foreground transition-colors",
              children: "Blog"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px] sm:max-w-xs", children: post.title })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-12 sm:py-16",
        style: { backgroundColor: post.heroColor },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog",
              "data-ocid": "blog-post.back_link",
              className: "inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "All Articles"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-white/75 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: post.author })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: post.datePublished, children: formatDate(post.datePublished) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              post.readTime
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none", children: post.sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
        section.headingLevel === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border", children: section.heading }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: section.heading }),
        section.paragraphs.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-foreground/90 leading-relaxed mb-4 text-base sm:text-lg",
            dangerouslySetInnerHTML: { __html: para }
          },
          para.slice(0, 40)
        )),
        section.bullets && section.bullets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 mb-4 space-y-2.5 pl-0", children: section.bullets.map((bullet) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-foreground/90 text-base sm:text-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "mt-1.5 shrink-0 w-2 h-2 rounded-full",
                  style: { background: "oklch(0.56 0.16 44)" }
                }
              ),
              bullet
            ]
          },
          bullet
        )) })
      ] }, section.heading)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-10 rounded-2xl p-6 border",
          style: {
            background: "oklch(0.22 0.12 264 / 0.05)",
            borderColor: "oklch(0.22 0.12 264 / 0.12)"
          },
          "data-ocid": "blog-post.explore_cta",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-base font-bold mb-2",
                style: { color: "oklch(0.22 0.12 264)" },
                children: "Ready to put this into action?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Tele-Blast gives sales teams a power dialer, SMS blast, and CRM pipeline — all for $15/month." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/pricing",
                  className: "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90",
                  style: { background: "oklch(0.56 0.16 44)" },
                  "data-ocid": "blog-post.explore_cta.pricing_link",
                  children: "See Pricing →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/#features",
                  className: "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-80",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.08)",
                    color: "oklch(0.22 0.12 264)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.15)"
                  },
                  "data-ocid": "blog-post.explore_cta.features_link",
                  children: "Explore Features →"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-xl overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/insurance-agent-mobile-leads.dim_800x600.jpg",
              alt: "Professional sales agent using cell phone CRM app to manage leads and follow-ups",
              className: "w-full h-44 object-cover object-center",
              loading: "lazy",
              width: "800",
              height: "275"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales agent using Tele-Blast cell phone CRM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-xl overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/sales-manager-sms-blast-phone.dim_800x600.jpg",
              alt: "Sales manager reviewing SMS blast campaign results on smartphone using Tele-Blast CRM",
              className: "w-full h-44 object-cover object-center",
              loading: "lazy",
              width: "800",
              height: "275"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "sr-only", children: "Sales manager reviewing SMS blast on Tele-Blast" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 font-medium", children: "Topics:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: post.keywords.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border",
            children: kw
          },
          kw
        )) })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-12 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-8", children: "Related Articles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: related.map((rp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BlogCard,
        {
          title: rp.title,
          excerpt: rp.excerpt,
          slug: rp.slug,
          date: rp.datePublished,
          readTime: rp.readTime,
          author: rp.author,
          index: i
        },
        rp.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-border text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog",
          className: "text-sm font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity",
          style: { color: "oklch(0.46 0.16 44)" },
          children: "View all articles →"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14",
        style: {
          background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white mb-4", children: "Ready to Put This Into Action?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-8 leading-relaxed",
              style: { color: "oklch(0.98 0 0 / 0.65)" },
              children: "Start automating your sales outreach today with Tele-Blast — power dialer, SMS blast, and CRM in one platform."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/pre-signup" }),
                "data-ocid": "blog-post.cta.primary_button",
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
  BlogPostPage as default
};
