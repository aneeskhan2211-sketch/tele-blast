import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  TrendingUp,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { SiteFooter } from "../components/SiteFooter";
import { getBlogPost, getRelatedPosts } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";
import { useSubscription } from "../hooks/useSubscription";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
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

  const { slug } = useParams({ from: "/blog/$slug" });
  const post = getBlogPost(slug);

  useSEO(
    post
      ? {
          title: post.metaTitle,
          description: post.metaDescription,
          canonical: post.canonicalUrl,
          ogTitle: post.ogTitle,
          ogDescription: post.ogDescription,
          ogUrl: post.ogUrl,
          ogType: "article",
          jsonLd: post.jsonLdSchema,
        }
      : {
          title: "Article Not Found | Tele-Blast Blog",
          description:
            "This article could not be found on the Tele-Blast blog.",
          canonical: "https://www.tele-blast.com/blog",
        },
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">
          Article Not Found
        </h1>
        <p className="text-muted-foreground text-center max-w-sm">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-colors"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const related = getRelatedPosts(post.relatedPosts).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Branded nav — matches landing page */}
      <header
        className="sticky top-0 z-40 border-b shadow-sm"
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link
            to="/"
            data-ocid="blog-post.nav.home_link"
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

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium flex-1 ml-8">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/blog"
              data-ocid="blog-post.nav.blog_link"
              className="text-white/70 hover:text-white transition-colors duration-200"
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
              className="text-sm font-medium text-white/70 hover:text-white px-3 py-2 transition-colors min-h-[40px] disabled:opacity-60"
            >
              {authInProgress ? "Opening…" : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/pre-signup" })}
              data-ocid="blog-post.nav.cta_button"
              className="px-4 py-2 rounded-lg text-white text-sm font-semibold min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav
            className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              to="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div
        className="py-12 sm:py-16"
        style={{ backgroundColor: post.heroColor }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            data-ocid="blog-post.back_link"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/75 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span className="font-medium text-white">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.datePublished}>
                {formatDate(post.datePublished)}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="prose prose-lg max-w-none">
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              {section.headingLevel === 2 ? (
                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                  {section.heading}
                </h2>
              ) : (
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {section.heading}
                </h3>
              )}

              {section.paragraphs.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="text-foreground/90 leading-relaxed mb-4 text-base sm:text-lg"
                  // paragraphs may contain anchor tags for internal/external linking
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 mb-4 space-y-2.5 pl-0">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-foreground/90 text-base sm:text-lg"
                    >
                      <span
                        className="mt-1.5 shrink-0 w-2 h-2 rounded-full"
                        style={{ background: "oklch(0.56 0.16 44)" }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Explore Tele-Blast CTA — inline after article */}
        <div
          className="mt-10 rounded-2xl p-6 border"
          style={{
            background: "oklch(0.22 0.12 264 / 0.05)",
            borderColor: "oklch(0.22 0.12 264 / 0.12)",
          }}
          data-ocid="blog-post.explore_cta"
        >
          <h3
            className="text-base font-bold mb-2"
            style={{ color: "oklch(0.22 0.12 264)" }}
          >
            Ready to put this into action?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tele-Blast gives sales teams a power dialer, SMS blast, and CRM
            pipeline — all for $15/month.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "oklch(0.56 0.16 44)" }}
              data-ocid="blog-post.explore_cta.pricing_link"
            >
              See Pricing →
            </Link>
            <a
              href="/#features"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
              style={{
                background: "oklch(0.22 0.12 264 / 0.08)",
                color: "oklch(0.22 0.12 264)",
                border: "1px solid oklch(0.22 0.12 264 / 0.15)",
              }}
              data-ocid="blog-post.explore_cta.features_link"
            >
              Explore Features →
            </a>
          </div>
        </div>

        {/* Sales agent images for visual engagement and image SEO */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <figure className="rounded-xl overflow-hidden shadow-sm">
            <img
              src="/assets/generated/insurance-agent-mobile-leads.dim_800x600.jpg"
              alt="Professional sales agent using cell phone CRM app to manage leads and follow-ups"
              className="w-full h-44 object-cover object-center"
              loading="lazy"
              width="800"
              height="275"
            />
            <figcaption className="sr-only">
              Sales agent using Tele-Blast cell phone CRM
            </figcaption>
          </figure>
          <figure className="rounded-xl overflow-hidden shadow-sm">
            <img
              src="/assets/generated/sales-manager-sms-blast-phone.dim_800x600.jpg"
              alt="Sales manager reviewing SMS blast campaign results on smartphone using Tele-Blast CRM"
              className="w-full h-44 object-cover object-center"
              loading="lazy"
              width="800"
              height="275"
            />
            <figcaption className="sr-only">
              Sales manager reviewing SMS blast on Tele-Blast
            </figcaption>
          </figure>
        </div>

        {/* Keywords */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3 font-medium">
            Topics:
          </p>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-muted/30 border-t border-border py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rp, i) => (
                <BlogCard
                  key={rp.id}
                  title={rp.title}
                  excerpt={rp.excerpt}
                  slug={rp.slug}
                  date={rp.datePublished}
                  readTime={rp.readTime}
                  author={rp.author}
                  index={i}
                />
              ))}
            </div>
            {/* Links to more blog content */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <Link
                to="/blog"
                className="text-sm font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.46 0.16 44)" }}
              >
                View all articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-14"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Put This Into Action?
          </h2>
          <p
            className="mb-8 leading-relaxed"
            style={{ color: "oklch(0.98 0 0 / 0.65)" }}
          >
            Start automating your sales outreach today with Tele-Blast — power
            dialer, SMS blast, and CRM in one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/pre-signup" })}
              data-ocid="blog-post.cta.primary_button"
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
