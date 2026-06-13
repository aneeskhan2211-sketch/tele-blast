import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useInternetIdentity } from "./vendor-ic-W9L5KZ_F.js";
import { c as useNavigate, j as useParams, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { g as getBlogPost, a as getRelatedPosts, B as BlogCard } from "./blogPosts-ge7YiFDG.js";
import { d as useSubscription, a5 as useSEO, a7 as SiteFooter } from "./index-DsrDu9m3.js";
import { N as ArrowLeft, U as User, az as Calendar, b9 as Clock, T as TrendingUp, aK as ChevronRight } from "./vendor-DT3DREzx.js";
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function ComparePostPage() {
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
  const { slug } = useParams({ from: "/compare/$slug" });
  const fullSlug = `compare/${slug}`;
  const post = getBlogPost(fullSlug);
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
      title: "Comparison Not Found | Tele-Blast",
      description: "This comparison page could not be found on Tele-Blast.",
      canonical: "https://www.tele-blast.com/blog"
    }
  );
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Page Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-sm", children: "The comparison you are looking for does not exist or has been moved." }),
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
  const heroBg = post.heroColor === "orange" ? "oklch(0.56 0.16 44)" : post.heroColor === "blue" ? "oklch(0.45 0.14 250)" : "oklch(0.28 0.08 250)";
  const relatedPosts = getRelatedPosts(post.relatedPosts);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full py-16 px-4", style: { background: heroBg }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog",
          className: "inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Blog"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-4xl font-bold text-white leading-tight mb-4", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-white/80 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
          post.author
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          formatDate(post.datePublished)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
          post.readTime
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full max-w-4xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none text-foreground", children: post.sections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
        section.headingLevel === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-foreground mb-4", children: section.heading }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-semibold text-foreground mb-3", children: section.heading }),
        section.paragraphs.map((p, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-muted-foreground leading-relaxed mb-3",
            dangerouslySetInnerHTML: { __html: p }
          },
          `p-${String(j)}`
        )),
        section.bullets && section.bullets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 space-y-1.5 text-muted-foreground", children: section.bullets.map((b, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "li",
          {
            dangerouslySetInnerHTML: { __html: b }
          },
          `b-${String(k)}`
        )) })
      ] }, section.heading || String(i))) }),
      relatedPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 border-t border-border pt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Related Articles" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: relatedPosts.slice(0, 2).map((rp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BlogCard,
          {
            title: rp.title,
            excerpt: rp.excerpt,
            slug: rp.slug,
            date: rp.datePublished,
            readTime: rp.readTime,
            author: rp.author,
            index: 0
          },
          rp.slug
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-16 rounded-2xl p-8 text-white text-center",
          style: { background: heroBg },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold uppercase tracking-wider opacity-80", children: "Ready to Switch?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Try Tele-Blast for $15/Month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 mb-6 max-w-md mx-auto", children: [
              "Power dialer, SMS blast, ",
              "{{first_name}}",
              " templates, and native text spin — all on your cell phone."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/pricing",
                  className: "inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors",
                  style: { color: heroBg },
                  "data-ocid": "compare.cta_pricing_link",
                  children: [
                    "See Pricing",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAuth,
                  disabled: authInProgress,
                  className: "inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-60",
                  "data-ocid": "compare.cta_start_button",
                  children: authInProgress ? "Starting..." : "Get Started Free"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ComparePostPage as default
};
