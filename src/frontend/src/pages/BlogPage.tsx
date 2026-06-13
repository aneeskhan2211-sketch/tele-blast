import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Rss, TrendingUp } from "lucide-react";
import { useRef, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { SiteFooter } from "../components/SiteFooter";
import { blogPosts } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";
import { useSubscription } from "../hooks/useSubscription";

const blogPageSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Tele-Blast Blog",
  description:
    "Expert guides on SMS automation, lead follow-up, appointment reminders, and business communication tools for small businesses.",
  url: "https://www.tele-blast.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Tele-Blast",
    url: "https://www.tele-blast.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.tele-blast.com/icons/icon-192.svg",
    },
  },
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://www.tele-blast.com/blog/${p.slug}`,
    datePublished: p.datePublished,
    author: { "@type": "Organization", name: p.author },
  })),
});

const FEATURED_RESOURCES = [
  {
    label: "View Pricing — $15/mo",
    href: "/pricing",
    accent: true,
    isLink: true,
  },
  {
    label: "Explore Features",
    href: "/#features",
    accent: false,
    isLink: false,
  },
  { label: "Support Center", href: "/support", accent: false, isLink: true },
  {
    label: "Affiliate Program",
    href: "/affiliate-signup",
    accent: false,
    isLink: true,
  },
];

export default function BlogPage() {
  const navigate = useNavigate();
  const { login } = useInternetIdentity();
  const { subscriptionTier, isLoading: subLoading } = useSubscription();
  const [authInProgress, setAuthInProgress] = useState(false);
  const loginCalledRef = useRef(false);

  async function handleAuth() {
    if (loginCalledRef.current || authInProgress) return;
    loginCalledRef.current = true;
    setAuthInProgress(true);
    try {
      await login();
      try {
        sessionStorage.setItem("tele_blast_just_logged_in", "true");
      } catch {
        /* ignore */
      }
      if (!subLoading && subscriptionTier && subscriptionTier !== "none") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/pre-signup" });
      }
    } catch {
      /* user cancelled */
    } finally {
      loginCalledRef.current = false;
      setAuthInProgress(false);
    }
  }

  useSEO({
    title: "Tele-Blast Blog | Cell Phone CRM, SMS Blast & Power Dialer Tips",
    description:
      "Tele-Blast utilizes your cell phone & turns into your own personal business CRM. Expert guides on SMS broadcast, power dialer, and lead management.",
    canonical: "https://www.tele-blast.com/blog",
    ogTitle: "Tele-Blast Blog — Business Communication & SMS Automation Tips",
    ogDescription:
      "Discover how SMS automation, automated follow-ups, and appointment reminders can save your business time and money.",
    ogUrl: "https://www.tele-blast.com/blog",
    ogType: "website",
    ogImage: "https://www.tele-blast.com/og-image.png",
    jsonLd: blogPageSchema,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Branded nav bar — matches landing page style */}
      <header
        className="sticky top-0 z-40 border-b shadow-sm"
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo — same as landing page */}
          <Link
            to="/"
            data-ocid="blog.nav.home_link"
            className="flex items-center gap-2 shrink-0"
          >
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Tele-Blast
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium flex-1 ml-8">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-white font-semibold"
              style={{ color: "oklch(0.75 0.16 44)" }}
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/support"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Support
            </Link>
            <Link
              to="/affiliate-signup"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Affiliate
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAuth}
              disabled={authInProgress}
              data-ocid="blog.nav.login_button"
              className="text-sm font-medium text-white/70 hover:text-white px-3 py-2 transition-colors duration-200 min-h-[40px] disabled:opacity-60"
            >
              {authInProgress ? "Opening…" : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/pre-signup" })}
              data-ocid="blog.nav.cta_button"
              className="px-4 py-2 rounded-lg text-white text-sm font-semibold min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section
        className="py-16 sm:py-20 text-white"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{
              background: "oklch(0.56 0.16 44 / 0.18)",
              border: "1px solid oklch(0.56 0.16 44 / 0.3)",
              color: "oklch(0.82 0.14 44)",
            }}
          >
            <Rss className="w-3.5 h-3.5" />
            Small Business Resources
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Tele-Blast Blog — Cell Phone CRM &amp; SMS Blast Platform
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.98 0 0 / 0.65)" }}
          >
            Expert guides on{" "}
            <a
              href="/blog/sms-broadcast-automation"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: "oklch(0.82 0.14 44)" }}
            >
              SMS automation
            </a>
            , lead follow-ups, and business communication tools that actually
            work for sales teams.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav
            className="flex items-center gap-1 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Articles grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-5 h-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">
            Latest Articles
          </h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {blogPosts.length} articles
          </span>
        </div>

        <div
          data-ocid="blog.list"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {blogPosts.map((post, i) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.datePublished}
              readTime={post.readTime}
              author={post.author}
              index={i}
            />
          ))}
        </div>

        {/* Featured Resources section */}
        {/* Sales agent images — SEO and engagement */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <figure className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/assets/generated/sales-agent-cell-phone-crm.dim_800x600.jpg"
              alt="Sales agent using cell phone CRM to manage leads and SMS blast campaigns"
              className="w-full h-48 object-cover object-center"
              loading="lazy"
              width="800"
              height="300"
            />
            <figcaption className="sr-only">
              Sales agent using Tele-Blast cell phone CRM
            </figcaption>
          </figure>
          <figure className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/assets/generated/sales-rep-mobile-crm-calls.dim_800x600.jpg"
              alt="Professional sales representative using mobile CRM on smartphone for power dialer and lead management"
              className="w-full h-48 object-cover object-center"
              loading="lazy"
              width="800"
              height="300"
            />
            <figcaption className="sr-only">
              Sales representative using Tele-Blast mobile CRM
            </figcaption>
          </figure>
        </div>

        <div
          className="mt-8 rounded-2xl p-8 border"
          style={{
            background: "oklch(0.22 0.12 264 / 0.04)",
            borderColor: "oklch(0.22 0.12 264 / 0.1)",
          }}
          data-ocid="blog.featured_resources"
        >
          <h2
            className="text-lg font-bold mb-2"
            style={{ color: "oklch(0.22 0.12 264)" }}
          >
            Explore Tele-Blast
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Power Dialer, SMS Blast &amp; CRM for sales teams — starting at
            $15/mo.
          </p>
          <div className="flex flex-wrap gap-3">
            {FEATURED_RESOURCES.map(({ label, href, accent, isLink }) =>
              isLink ? (
                <Link
                  key={label}
                  to={href as "/"}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={
                    accent
                      ? { background: "oklch(0.56 0.16 44)", color: "white" }
                      : {
                          background: "oklch(0.22 0.12 264 / 0.08)",
                          color: "oklch(0.22 0.12 264)",
                          border: "1px solid oklch(0.22 0.12 264 / 0.15)",
                        }
                  }
                  data-ocid={`blog.resources.${label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: "oklch(0.22 0.12 264 / 0.08)",
                    color: "oklch(0.22 0.12 264)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.15)",
                  }}
                  data-ocid={`blog.resources.${label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </div>
      </main>

      {/* CTA section */}
      <section
        className="py-14"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Automate Your Business Communication?
          </h2>
          <p
            className="mb-8 leading-relaxed"
            style={{ color: "oklch(0.98 0 0 / 0.65)" }}
          >
            Join sales teams saving 5–10 hours every week with Tele-Blast power
            dialer, SMS blast, and CRM pipeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/pre-signup" })}
              data-ocid="blog.cta.primary_button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-colors text-base"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              Get Started — $15/mo
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-colors hover:bg-white/15"
              style={{
                color: "oklch(0.98 0 0 / 0.8)",
                border: "1.5px solid oklch(0.98 0 0 / 0.25)",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
