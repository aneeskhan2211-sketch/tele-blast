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

export default function ComparePostPage() {
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

  const { slug } = useParams({ from: "/compare/$slug" });
  const fullSlug = `compare/${slug}`;
  const post = getBlogPost(fullSlug);

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
          title: "Comparison Not Found | Tele-Blast",
          description: "This comparison page could not be found on Tele-Blast.",
          canonical: "https://www.tele-blast.com/blog",
        },
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground text-center max-w-sm">
          The comparison you are looking for does not exist or has been moved.
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

  const heroBg =
    post.heroColor === "orange"
      ? "oklch(0.56 0.16 44)"
      : post.heroColor === "blue"
        ? "oklch(0.45 0.14 250)"
        : "oklch(0.28 0.08 250)";

  const relatedPosts = getRelatedPosts(post.relatedPosts);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero */}
      <div className="w-full py-16 px-4" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.datePublished)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-foreground">
          {post.sections.map((section, i) => (
            <section key={section.heading || String(i)} className="mb-10">
              {section.headingLevel === 2 ? (
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {section.heading}
                </h2>
              ) : (
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  {section.heading}
                </h3>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={`p-${String(j)}`}
                  className="text-muted-foreground leading-relaxed mb-3"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  {section.bullets.map((b, k) => (
                    <li
                      key={`b-${String(k)}`}
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.slice(0, 2).map((rp) => (
                <BlogCard
                  key={rp.slug}
                  title={rp.title}
                  excerpt={rp.excerpt}
                  slug={rp.slug}
                  date={rp.datePublished}
                  readTime={rp.readTime}
                  author={rp.author}
                  index={0}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-white text-center"
          style={{ background: heroBg }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
              Ready to Switch?
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Try Tele-Blast for $15/Month
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Power dialer, SMS blast, {"{{first_name}}"} templates, and native
            text spin — all on your cell phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              style={{ color: heroBg }}
              data-ocid="compare.cta_pricing_link"
            >
              See Pricing
              <ChevronRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleAuth}
              disabled={authInProgress}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-60"
              data-ocid="compare.cta_start_button"
            >
              {authInProgress ? "Starting..." : "Get Started Free"}
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
