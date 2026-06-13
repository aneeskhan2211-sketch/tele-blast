import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Film,
  Image,
  Loader2,
  Lock,
  MapPin,
  RefreshCw,
  Search,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FeatureLockOverlay } from "../components/FeatureLockOverlay";
import { TokenBalance } from "../components/TokenBalance";
import {
  type GeneratedGbpProfile,
  type GeneratedOnPageSeo,
  useAiGenerateBacklinkSuggestions,
  useAiGenerateGbpProfile,
  useAiGenerateOnPageSeo,
  useAiGeneratePromoImage,
  useAiGenerateVideo,
} from "../hooks/useAi";
import { useFeatureAccess } from "../hooks/useFeatureAccess";
import { useProfile } from "../hooks/useProfile";

/* ─── CopyField ──────────────────────────────────────────────────── */

function CopyField({
  label,
  value,
  ocid,
  multiline,
  charCount,
}: {
  label: string;
  value: string;
  ocid: string;
  multiline?: boolean;
  charCount?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <div className="space-y-1.5" data-ocid={ocid}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </Label>
          {charCount && (
            <span
              className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
                value.length > 160
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {value.length} chars
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground"
          aria-label={`Copy ${label}`}
          data-ocid={`${ocid}_copy_button`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      {multiline ? (
        <p className="text-sm text-foreground leading-relaxed p-3 rounded-lg bg-muted/40 border border-border whitespace-pre-wrap break-words">
          {value}
        </p>
      ) : (
        <p className="text-sm font-semibold text-foreground p-3 rounded-lg bg-muted/40 border border-border break-words">
          {value}
        </p>
      )}
    </div>
  );
}

/* ─── Keywords Chips ─────────────────────────────────────────────── */

function KeywordsField({
  keywords,
  ocid,
}: {
  keywords: string[];
  ocid: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(keywords.join(", "));
      setCopied(true);
      toast.success("Keywords copied!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <div className="space-y-1.5" data-ocid={ocid}>
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Target Keywords
        </Label>
        <button
          type="button"
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground"
          data-ocid={`${ocid}_copy_button`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy All
            </>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted/40 border border-border">
        {keywords.map((kw) => (
          <Badge
            key={kw}
            variant="secondary"
            className="text-xs px-2.5 py-1 font-medium"
          >
            {kw}
          </Badge>
        ))}
      </div>
    </div>
  );
}

/* ─── List Copy Field ────────────────────────────────────────────── */

function ListCopyField({
  label,
  items,
  ocid,
}: {
  label: string;
  items: string[];
  ocid: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(items.join("\n"));
      setCopied(true);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <div className="space-y-1.5" data-ocid={ocid}>
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground"
          data-ocid={`${ocid}_copy_button`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy All
            </>
          )}
        </button>
      </div>
      <ul className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border">
        {items.map((item, idx) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-foreground"
          >
            <span className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5 bg-orange-500">
              {idx + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Instruction Banner ─────────────────────────────────────────── */

function InstructionBanner({
  text,
  href,
  linkLabel,
}: {
  text: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl border"
      style={{
        background: "oklch(0.22 0.12 264 / 0.06)",
        borderColor: "oklch(0.22 0.12 264 / 0.2)",
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: "oklch(0.22 0.12 264 / 0.15)" }}
      >
        <ExternalLink
          className="w-4 h-4"
          style={{ color: "oklch(0.56 0.16 44)" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{text}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold mt-1 hover:underline"
          style={{ color: "oklch(0.56 0.16 44)" }}
        >
          {linkLabel}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ─── GBP Tab ────────────────────────────────────────────────────── */

function GbpTab({
  hasAccess,
  companyName,
}: {
  hasAccess: boolean;
  companyName: string;
}) {
  const [businessName, setBusinessName] = useState(companyName);
  const [services, setServices] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("Mon–Fri 9am–5pm");
  const [uniqueValue, setUniqueValue] = useState("");
  const [result, setResult] = useState<GeneratedGbpProfile | null>(null);
  const generateGbp = useAiGenerateGbpProfile();

  // Sync company name from profile when it loads (only sync if user hasn't typed yet)
  const [nameSynced, setNameSynced] = useState(false);
  useEffect(() => {
    if (companyName && !nameSynced) {
      setBusinessName(companyName);
      setNameSynced(true);
    }
  }, [companyName, nameSynced]);

  const handleGenerate = async () => {
    if (!businessName.trim() || !services.trim()) {
      toast.error("Business name and services are required.");
      return;
    }
    setResult(null);
    try {
      const out = await generateGbp.mutateAsync({
        businessName: businessName.trim(),
        services: services.trim(),
        location: location.trim(),
        hours: hours.trim(),
        uniqueValue: uniqueValue.trim(),
      });
      setResult(out);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate profile.",
      );
    }
  };

  return (
    <div className="space-y-5" data-ocid="local_seo.gbp_tab">
      {/* Input form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <h2 className="text-sm font-bold text-foreground">
            Build Your Google Business Profile
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Fill in your details to generate your complete GBP listing content
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="gbp-biz-name" className="text-sm font-semibold">
                Business Name
              </Label>
              <Input
                id="gbp-biz-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Acme Sales Co."
                data-ocid="local_seo.gbp_business_name_input"
                disabled={!hasAccess}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gbp-location" className="text-sm font-semibold">
                City, State
              </Label>
              <Input
                id="gbp-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Miami, FL"
                data-ocid="local_seo.gbp_location_input"
                disabled={!hasAccess}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gbp-services" className="text-sm font-semibold">
              Services / What You Offer
            </Label>
            <Textarea
              id="gbp-services"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="e.g. sales consulting, CRM setup, lead generation, outbound calling strategy"
              rows={3}
              className="resize-none text-sm"
              data-ocid="local_seo.gbp_services_input"
              disabled={!hasAccess}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="gbp-hours" className="text-sm font-semibold">
                Business Hours
              </Label>
              <Input
                id="gbp-hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Mon–Fri 9am–5pm"
                data-ocid="local_seo.gbp_hours_input"
                disabled={!hasAccess}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gbp-unique" className="text-sm font-semibold">
                What Makes You Unique
              </Label>
              <Input
                id="gbp-unique"
                value={uniqueValue}
                onChange={(e) => setUniqueValue(e.target.value)}
                placeholder="Same-day responses, 10+ years experience"
                data-ocid="local_seo.gbp_unique_input"
                disabled={!hasAccess}
              />
            </div>
          </div>

          {hasAccess ? (
            <Button
              onClick={handleGenerate}
              disabled={
                !businessName.trim() ||
                !services.trim() ||
                generateGbp.isPending
              }
              className="w-full font-bold min-h-[48px] gap-2 text-white"
              style={
                businessName.trim() && services.trim() && !generateGbp.isPending
                  ? { background: "oklch(0.56 0.16 44)" }
                  : {}
              }
              data-ocid="local_seo.gbp_generate_button"
            >
              {generateGbp.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Profile…
                </>
              ) : result ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Profile
                </>
              ) : (
                "Generate Profile"
              )}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20"
              data-ocid="local_seo.gbp_tier_gate"
            >
              <Lock className="w-4 h-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Subscribe to access GBP profile generation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading state */}
      {generateGbp.isPending && (
        <div
          className="flex flex-col items-center gap-3 py-10 text-center"
          data-ocid="local_seo.gbp_loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Writing your Google Business Profile…
          </p>
          <p className="text-xs text-muted-foreground">
            AI is crafting your description, categories, and post templates
          </p>
        </div>
      )}

      {/* Error state */}
      {generateGbp.isError && !result && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="local_seo.gbp_error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            {generateGbp.error?.message ??
              "Failed to generate. Please try again."}
          </p>
        </div>
      )}

      {/* Results */}
      {result && !generateGbp.isPending && (
        <>
          <InstructionBanner
            text="Copy and paste each section directly into your Google Business Profile dashboard at business.google.com"
            href="https://business.google.com"
            linkLabel="Open Google Business Profile"
          />

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-border"
              style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
            >
              <h3 className="text-sm font-bold text-foreground">
                Your GBP Content
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <CopyField
                label="Business Description"
                value={result.businessDescription}
                ocid="local_seo.gbp_description_field"
                multiline
              />
              <CopyField
                label="Tagline"
                value={result.tagline}
                ocid="local_seo.gbp_tagline_field"
              />
              <ListCopyField
                label="Suggested Categories"
                items={result.categories}
                ocid="local_seo.gbp_categories_field"
              />
              <ListCopyField
                label="Key Attributes"
                items={result.attributes}
                ocid="local_seo.gbp_attributes_field"
              />
            </div>
          </div>

          {/* Post Templates */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-border"
              style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
            >
              <h3 className="text-sm font-bold text-foreground">
                Ready-to-Post Templates
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy and paste into Google Posts for immediate publishing
              </p>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {result.posts.map((post, i) => (
                <PostCard key={`${post.type}-${i}`} post={post} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PostCard({
  post,
  index,
}: {
  post: { type: string; title: string; content: string };
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${post.title}\n\n${post.content}`);
      setCopied(true);
      toast.success("Post copied!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy.");
    }
  };

  const typeColors = [
    "bg-primary/20 text-primary-foreground",
    "bg-orange-500/20 text-orange-200",
    "bg-accent/20 text-accent-foreground",
    "bg-muted text-muted-foreground",
  ];

  return (
    <div
      className="bg-muted/30 border border-border rounded-xl p-4 space-y-3"
      data-ocid={`local_seo.gbp_post.${index + 1}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeColors[index % typeColors.length]}`}
        >
          {post.type}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          data-ocid={`local_seo.gbp_post_copy.${index + 1}`}
        >
          {copied ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          Copy
        </button>
      </div>
      <p className="text-sm font-semibold text-foreground">{post.title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
        {post.content}
      </p>
    </div>
  );
}

/* ─── On-Page SEO Tab ────────────────────────────────────────────── */

function OnPageSeoTab({
  hasAccess,
  companyName,
  initialSlug,
  initialName,
}: {
  hasAccess: boolean;
  companyName: string;
  initialSlug: string;
  initialName: string;
}) {
  const [businessName, setBusinessName] = useState(initialName || companyName);
  const [services, setServices] = useState("");
  const [location, setLocation] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [result, setResult] = useState<GeneratedOnPageSeo | null>(null);
  const generateSeo = useAiGenerateOnPageSeo();

  // Pre-select form from URL params
  useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
    if (initialName) setBusinessName(initialName);
  }, [initialSlug, initialName]);

  const handleGenerate = async () => {
    if (!businessName.trim() || !services.trim()) {
      toast.error("Business name and services are required.");
      return;
    }
    setResult(null);
    try {
      const out = await generateSeo.mutateAsync({
        businessName: businessName.trim(),
        services: services.trim(),
        location: location.trim(),
        targetAudience: targetAudience.trim(),
        formSlug: selectedSlug,
      });
      setResult(out);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate SEO copy.",
      );
    }
  };

  return (
    <div className="space-y-5" data-ocid="local_seo.onpage_tab">
      {/* Input form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <h2 className="text-sm font-bold text-foreground">
            On-Page SEO Generator
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Generate all on-page SEO copy for your landing page — title tags,
            meta, headings, and more
          </p>
        </div>
        <div className="p-5 space-y-4">
          {/* Page slug input */}
          <div className="space-y-1.5">
            <Label htmlFor="seo-form-select" className="text-sm font-semibold">
              Page Slug (optional)
            </Label>
            <Input
              id="seo-form-select"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              placeholder="e.g. my-landing-page"
              className="text-sm"
              data-ocid="local_seo.onpage_form_select"
              disabled={!hasAccess}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="seo-biz-name" className="text-sm font-semibold">
                Business Name
              </Label>
              <Input
                id="seo-biz-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Acme Sales Co."
                data-ocid="local_seo.onpage_business_name_input"
                disabled={!hasAccess}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seo-location" className="text-sm font-semibold">
                Location / City, State
              </Label>
              <Input
                id="seo-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Miami, FL"
                data-ocid="local_seo.onpage_location_input"
                disabled={!hasAccess}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-services" className="text-sm font-semibold">
              Services / Keywords
            </Label>
            <Textarea
              id="seo-services"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="e.g. sales consulting, CRM setup, lead generation, outbound sales training"
              rows={3}
              className="resize-none text-sm"
              data-ocid="local_seo.onpage_services_input"
              disabled={!hasAccess}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-audience" className="text-sm font-semibold">
              Target Audience
            </Label>
            <Input
              id="seo-audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. small business owners in Miami looking to grow sales"
              data-ocid="local_seo.onpage_audience_input"
              disabled={!hasAccess}
            />
          </div>

          {hasAccess ? (
            <Button
              onClick={handleGenerate}
              disabled={
                !businessName.trim() ||
                !services.trim() ||
                generateSeo.isPending
              }
              className="w-full font-bold min-h-[48px] gap-2 text-white"
              style={
                businessName.trim() && services.trim() && !generateSeo.isPending
                  ? { background: "oklch(0.56 0.16 44)" }
                  : {}
              }
              data-ocid="local_seo.onpage_generate_button"
            >
              {generateSeo.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating SEO Copy…
                </>
              ) : result ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate SEO Copy
                </>
              ) : (
                "Generate SEO Copy"
              )}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20"
              data-ocid="local_seo.onpage_tier_gate"
            >
              <Lock className="w-4 h-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Subscribe to access on-page SEO copy generation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading state */}
      {generateSeo.isPending && (
        <div
          className="flex flex-col items-center gap-3 py-10 text-center"
          data-ocid="local_seo.onpage_loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Writing your on-page SEO copy…
          </p>
          <p className="text-xs text-muted-foreground">
            AI is optimizing titles, headings, meta tags, and keyword strategy
          </p>
        </div>
      )}

      {/* Error state */}
      {generateSeo.isError && !result && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="local_seo.onpage_error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            {generateSeo.error?.message ??
              "Failed to generate. Please try again."}
          </p>
        </div>
      )}

      {/* Results */}
      {result && !generateSeo.isPending && (
        <>
          <InstructionBanner
            text="Copy and paste these into your landing page builder settings. Apply each field to the corresponding section of your page."
            href="https://tele-blast.com/lead-forms"
            linkLabel="Open Lead Forms"
          />

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-border"
              style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
            >
              <h3 className="text-sm font-bold text-foreground">
                Your On-Page SEO Copy
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <CopyField
                label="Page Title"
                value={result.pageTitle}
                ocid="local_seo.seo_page_title"
                charCount
              />
              <CopyField
                label="Meta Description"
                value={result.metaDescription}
                ocid="local_seo.seo_meta_description"
                charCount
                multiline
              />
              <CopyField
                label="H1 Heading"
                value={result.h1}
                ocid="local_seo.seo_h1"
              />
              <ListCopyField
                label="Section Headings (H2s)"
                items={result.h2s}
                ocid="local_seo.seo_h2s"
              />
              <CopyField
                label="Intro Paragraph"
                value={result.introParagraph}
                ocid="local_seo.seo_intro"
                multiline
              />
              <CopyField
                label="CTA Button Text"
                value={result.ctaText}
                ocid="local_seo.seo_cta"
              />
              <KeywordsField
                keywords={result.keywords}
                ocid="local_seo.seo_keywords"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Backlink Suggestions Tab ───────────────────────────────────── */

function BacklinkTab({ hasAccess }: { hasAccess: boolean }) {
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const generateBacklinks = useAiGenerateBacklinkSuggestions();
  const [result, setResult] = useState<{
    sources: {
      name: string;
      url: string;
      description: string;
      category: string;
      domainAuthority: string;
    }[];
    strategy: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!businessType.trim()) {
      toast.error("Please describe your business type.");
      return;
    }
    setResult(null);
    try {
      const out = await generateBacklinks.mutateAsync({
        businessType: businessType.trim(),
        industry: industry.trim(),
      });
      setResult(out);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to generate suggestions. Please try again.",
      );
    }
  };

  // Group sources by category
  const grouped = result
    ? result.sources.reduce<
        Record<
          string,
          {
            name: string;
            url: string;
            description: string;
            domainAuthority: string;
          }[]
        >
      >((acc, src) => {
        const cat = src.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(src);
        return acc;
      }, {})
    : {};

  return (
    <div className="space-y-5" data-ocid="local_seo.backlink_tab">
      {/* Input form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <h2 className="text-sm font-bold text-foreground">
            Backlink Suggestions
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tell us about your business and we'll recommend quality backlink
            sources tailored to your industry
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="backlink-biztype"
                className="text-sm font-semibold"
              >
                Business Type
              </Label>
              <Input
                id="backlink-biztype"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. sales consulting firm, local agency"
                data-ocid="local_seo.backlink_business_type_input"
                disabled={!hasAccess}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="backlink-industry"
                className="text-sm font-semibold"
              >
                Industry (optional)
              </Label>
              <Input
                id="backlink-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. B2B sales, real estate, healthcare"
                data-ocid="local_seo.backlink_industry_input"
                disabled={!hasAccess}
              />
            </div>
          </div>

          {hasAccess ? (
            <Button
              onClick={handleGenerate}
              disabled={!businessType.trim() || generateBacklinks.isPending}
              className="w-full font-bold min-h-[48px] gap-2 text-white"
              style={
                businessType.trim() && !generateBacklinks.isPending
                  ? { background: "oklch(0.56 0.16 44)" }
                  : {}
              }
              data-ocid="local_seo.backlink_generate_button"
            >
              {generateBacklinks.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Finding Backlink Sources…
                </>
              ) : result ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Suggestions
                </>
              ) : (
                "Get Backlink Suggestions"
              )}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20"
              data-ocid="local_seo.backlink_tier_gate"
            >
              <Lock className="w-4 h-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Subscribe to access AI backlink suggestions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading state */}
      {generateBacklinks.isPending && (
        <div
          className="flex flex-col items-center gap-3 py-10 text-center"
          data-ocid="local_seo.backlink_loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Finding quality backlink sources…
          </p>
          <p className="text-xs text-muted-foreground">
            AI is researching the best link-building opportunities for your
            business
          </p>
        </div>
      )}

      {/* Error state */}
      {generateBacklinks.isError && !result && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="local_seo.backlink_error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            {generateBacklinks.error?.message ??
              "Failed to generate. Please try again."}
          </p>
        </div>
      )}

      {/* Results */}
      {result && !generateBacklinks.isPending && (
        <>
          {result.strategy && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{
                background: "oklch(0.56 0.16 44 / 0.08)",
                borderColor: "oklch(0.56 0.16 44 / 0.25)",
              }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-sm">
                💡
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Your Link-Building Strategy
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {result.strategy}
                </p>
              </div>
            </div>
          )}

          {Object.entries(grouped).map(([category, sources]) => (
            <div
              key={category}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              <div
                className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
                style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
              >
                <h3 className="text-sm font-bold text-foreground">
                  {category}
                </h3>
              </div>
              <div className="divide-y divide-border">
                {sources.map((source, idx) => (
                  <div
                    key={`${source.name}-${idx}`}
                    className="flex items-start gap-3 px-5 py-4"
                    data-ocid={`local_seo.backlink_source.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">
                          {source.name}
                        </p>
                        {source.domainAuthority && (
                          <Badge
                            variant="secondary"
                            className={`text-[10px] px-1.5 py-0 ${
                              source.domainAuthority
                                .toLowerCase()
                                .includes("very high")
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            DA: {source.domainAuthority}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {source.description}
                      </p>
                    </div>
                    {source.url && source.url !== "#" && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-muted-foreground hover:text-foreground"
                        data-ocid={`local_seo.backlink_link.${idx + 1}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Get Listed
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Empty state — no result yet and not loading */}
      {!result && !generateBacklinks.isPending && hasAccess && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center"
          data-ocid="local_seo.backlink_empty_state"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.22 0.12 264 / 0.12)" }}
          >
            <ExternalLink className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Enter your business type above
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Enter your business type and industry to find the best backlink
              opportunities for your niche
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Image Creator Tab ──────────────────────────────────────────── */

const PROMO_STYLES = [
  { value: "Modern & Clean", label: "Modern & Clean" },
  { value: "Bold & Vibrant", label: "Bold & Vibrant" },
  { value: "Professional", label: "Professional" },
  { value: "Warm & Friendly", label: "Warm & Friendly" },
] as const;

type PromoStyle = (typeof PROMO_STYLES)[number]["value"];

// Load an image from a data URL and return an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Wrap text to fit canvas width
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
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

// Compress uploaded file to a data URL
async function compressUpload(
  file: File,
  maxDim = 1200,
  quality = 0.85,
): Promise<string> {
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
          resolve(ev.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = ev.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Build the composite promo image on a canvas and return data URL
async function buildPromoCanvas(
  backgroundSrc: string,
  logoSrc: string | null,
  sentence: string,
  ctaText: string,
  brandingColors?: { primary: string; secondary: string; accent: string },
): Promise<string> {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // 1. Draw background image (cover-fill)
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

  // 2. Semi-transparent dark gradient over bottom 45% for text readability
  const overlayColor = brandingColors?.secondary ?? "rgba(0,0,0,0)";
  const grad = ctx.createLinearGradient(0, H * 0.45, 0, H);
  grad.addColorStop(
    0,
    overlayColor === "rgba(0,0,0,0)" ? "rgba(0,0,0,0)" : `${overlayColor}00`,
  );
  grad.addColorStop(0.35, "rgba(0,0,0,0.55)");
  grad.addColorStop(1, "rgba(0,0,0,0.82)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, H * 0.45, W, H * 0.55);

  // 3. Draw logo top-left (max 120×60px)
  if (logoSrc) {
    try {
      const logoImg = await loadImage(logoSrc);
      const maxW = 120;
      const maxH = 60;
      const logoScale = Math.min(
        maxW / logoImg.width,
        maxH / logoImg.height,
        1,
      );
      const lw = Math.round(logoImg.width * logoScale);
      const lh = Math.round(logoImg.height * logoScale);
      // White pill background for logo readability
      const pad = 8;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.beginPath();
      ctx.roundRect(24 - pad, 24 - pad, lw + pad * 2, lh + pad * 2, 8);
      ctx.fill();
      ctx.drawImage(logoImg, 24, 24, lw, lh);
    } catch {
      /* ignore logo load errors */
    }
  }

  // 4. Draw sentence text (white, bold, centered, bottom third)
  const textPad = 60;
  const maxTextW = W - textPad * 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";

  // Measure and wrap sentence
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  const sentenceLines = wrapText(ctx, sentence, maxTextW);
  const lineH = 42;
  const ctaH = 32;
  const ctaGap = 16;
  const totalTextH = sentenceLines.length * lineH + ctaGap + ctaH;
  let textY = H - 48 - totalTextH;

  // Shadow for readability
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  for (const line of sentenceLines) {
    ctx.fillText(line, W / 2, textY + lineH);
    textY += lineH;
  }

  // 5. Draw CTA text (use brand accent or orange fallback)
  ctx.fillStyle = brandingColors?.accent ?? "#F97316";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(ctaText, W / 2, textY + ctaGap + ctaH);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  return canvas.toDataURL("image/png");
}

/* ─── Styled Promo Card (3 display variants) ─────────────────────── */

interface PromoCardProps {
  variant: "clean" | "bold" | "vibrant";
  imageUrl: string;
  title: string;
}

function PromoCard({ variant, imageUrl, title }: PromoCardProps) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `promo-${variant}.png`;
    a.click();
  }

  if (variant === "clean") {
    return (
      <div
        className="rounded-xl overflow-hidden shadow-sm border border-border flex flex-col"
        data-ocid="local_seo.image_creator.card.clean"
      >
        <div className="bg-card px-4 pt-4 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Clean
          </span>
        </div>
        <div className="bg-card px-4 pb-4">
          <img
            src={imageUrl}
            alt="Clean style promo"
            className="w-full rounded-lg border border-border shadow-sm"
            style={{ aspectRatio: "1200/630", objectFit: "cover" }}
          />
          <p className="text-sm font-semibold text-foreground mt-2 text-center truncate">
            {title}
          </p>
          <button
            type="button"
            onClick={handleDownload}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold border border-border bg-background hover:bg-muted text-foreground transition-colors min-h-[36px]"
            data-ocid="local_seo.image_creator.card.clean.download_button"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>
    );
  }

  if (variant === "bold") {
    return (
      <div
        className="rounded-xl overflow-hidden flex flex-col"
        style={{ background: "#1a1a2e" }}
        data-ocid="local_seo.image_creator.card.bold"
      >
        <div className="px-4 pt-4 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Bold
          </span>
        </div>
        <div className="px-4 pb-4">
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: "2px solid #F97316" }}
          >
            <img
              src={imageUrl}
              alt="Bold style promo"
              className="w-full"
              style={{ aspectRatio: "1200/630", objectFit: "cover" }}
            />
          </div>
          <p className="text-sm font-bold text-white mt-2 text-center truncate">
            {title}
          </p>
          <button
            type="button"
            onClick={handleDownload}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-colors min-h-[36px]"
            style={{ background: "#F97316" }}
            data-ocid="local_seo.image_creator.card.bold.download_button"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>
    );
  }

  // vibrant
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, #F97316 0%, #1e2a5a 100%)",
      }}
      data-ocid="local_seo.image_creator.card.vibrant"
    >
      <div className="px-4 pt-4 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
          Vibrant
        </span>
      </div>
      <div className="px-4 pb-4">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 20px rgba(249,115,22,0.5)" }}
        >
          <img
            src={imageUrl}
            alt="Vibrant style promo"
            className="w-full"
            style={{ aspectRatio: "1200/630", objectFit: "cover" }}
          />
        </div>
        <p className="text-sm font-bold text-white mt-2 text-center truncate">
          {title}
        </p>
        <button
          type="button"
          onClick={handleDownload}
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 min-h-[36px]"
          style={{ background: "rgba(255,255,255,0.2)" }}
          data-ocid="local_seo.image_creator.card.vibrant.download_button"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
    </div>
  );
}

export function ImageCreatorTab({ hasAccess }: { hasAccess: boolean }) {
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [sentence, setSentence] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [style, setStyle] = useState<PromoStyle>("Modern & Clean");
  const [compositing, setCompositing] = useState(false);
  const [promoImage, setPromoImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoDrag, setLogoDrag] = useState(false);
  const [photoDrag, setPhotoDrag] = useState(false);

  // Branding match state
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [fetchingBranding, setFetchingBranding] = useState(false);
  const [brandingColors, setBrandingColors] = useState<{
    primary: string;
    secondary: string;
    accent: string;
  } | null>(null);

  const generatePromoImage = useAiGeneratePromoImage();

  const canGenerate =
    !!logoFile &&
    !!photoFile &&
    sentence.trim().length > 0 &&
    ctaText.trim().length > 0 &&
    !compositing;

  async function handleLogoFile(files: FileList | null) {
    if (!files?.[0] || !files[0].type.startsWith("image/")) return;
    const compressed = await compressUpload(files[0], 600, 0.85);
    setLogoFile(compressed);
  }

  async function handlePhotoFile(files: FileList | null) {
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
      // Use a CORS proxy or direct fetch — extract meta theme-color or OG image colors
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
      const json = (await res.json()) as { contents?: string };
      const html = json.contents ?? "";
      // Extract theme-color meta tag
      const themeMatch = html.match(
        /name=["']theme-color["'][^>]+content=["']([^"']+)["']/i,
      );
      const themeColor = themeMatch?.[1] ?? null;
      // Extract first og:image prominent color as secondary (we just use a dark overlay)
      if (themeColor) {
        setBrandingColors({
          primary: themeColor,
          secondary: "rgba(0,0,0,0)",
          accent: themeColor,
        });
        toast.success("Brand color detected from your website!");
      } else {
        toast.info("Couldn't detect a brand color — using default styling.");
      }
    } catch {
      toast.info(
        "Could not reach that website — using default styling instead.",
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
      let backgroundSrc = photoFile!;

      // If no photo, try to generate a background from Theta
      if (!photoFile) {
        try {
          const generated = await generatePromoImage.mutateAsync({
            promoText: sentence.trim(),
            ctaText: ctaText.trim(),
            style,
          });
          backgroundSrc = generated;
        } catch {
          throw new Error(
            "Please upload a background photo to create your promo image.",
          );
        }
      }

      const dataUrl = await buildPromoCanvas(
        backgroundSrc,
        logoFile,
        sentence.trim(),
        ctaText.trim(),
        brandingColors ?? undefined,
      );
      setPromoImage(dataUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to compose promo image. Please try again.",
      );
    } finally {
      setCompositing(false);
    }
  }

  return (
    <div className="space-y-5" data-ocid="local_seo.image_creator_tab">
      {/* Input form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <h2 className="text-sm font-bold text-foreground">
            Promo Image Creator
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload your logo and a photo, write your message, and we'll compose
            a professional 1200×630 promo image in 3 styles
          </p>
        </div>

        <div className="p-5 space-y-5">
          {/* Upload row: Logo + Photo */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Your Logo <span className="text-destructive">*</span>
              </Label>
              {logoFile ? (
                <div className="relative flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                  <img
                    src={logoFile}
                    alt="Logo preview"
                    className="w-16 h-10 object-contain rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      Logo uploaded ✓
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Placed top-left of image
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLogoFile(null)}
                    className="shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    aria-label="Remove logo"
                    data-ocid="local_seo.image_creator.logo_remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label
                  onDrop={(e) => {
                    e.preventDefault();
                    setLogoDrag(false);
                    handleLogoFile(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setLogoDrag(true);
                  }}
                  onDragLeave={() => setLogoDrag(false)}
                  className={`flex flex-col items-center justify-center gap-2 w-full min-h-[110px] rounded-xl border-2 border-dashed cursor-pointer transition-colors ${logoDrag ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"} ${!hasAccess ? "opacity-50 pointer-events-none" : ""}`}
                  data-ocid="local_seo.image_creator.logo_dropzone"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleLogoFile(e.target.files)}
                    disabled={!hasAccess}
                  />
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground text-center px-3">
                    Drop logo or{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.56 0.16 44)" }}
                    >
                      click to browse
                    </span>
                  </p>
                </label>
              )}
            </div>

            {/* Background Photo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Background Photo <span className="text-destructive">*</span>
              </Label>
              {photoFile ? (
                <div className="relative flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                  <img
                    src={photoFile}
                    alt="Selected background"
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      Photo uploaded ✓
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Used as background
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhotoFile(null)}
                    className="shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    aria-label="Remove photo"
                    data-ocid="local_seo.image_creator.photo_remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label
                  onDrop={(e) => {
                    e.preventDefault();
                    setPhotoDrag(false);
                    handlePhotoFile(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setPhotoDrag(true);
                  }}
                  onDragLeave={() => setPhotoDrag(false)}
                  className={`flex flex-col items-center justify-center gap-2 w-full min-h-[110px] rounded-xl border-2 border-dashed cursor-pointer transition-colors ${photoDrag ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"} ${!hasAccess ? "opacity-50 pointer-events-none" : ""}`}
                  data-ocid="local_seo.image_creator.photo_dropzone"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handlePhotoFile(e.target.files)}
                    disabled={!hasAccess}
                  />
                  <Image className="w-5 h-5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground text-center px-3">
                    Drop photo or{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.56 0.16 44)" }}
                    >
                      click to browse
                    </span>
                  </p>
                </label>
              )}
            </div>
          </div>

          {/* Your Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="promo-sentence" className="text-sm font-semibold">
                Your Message <span className="text-destructive">*</span>
              </Label>
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${sentence.length > 100 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}
              >
                {sentence.length}/100
              </span>
            </div>
            <Input
              id="promo-sentence"
              value={sentence}
              onChange={(e) => setSentence(e.target.value.slice(0, 100))}
              placeholder="e.g. We help homeowners save thousands on insurance"
              data-ocid="local_seo.image_creator.sentence_input"
              disabled={!hasAccess}
              className="text-sm"
            />
          </div>

          {/* Call to Action */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="promo-cta" className="text-sm font-semibold">
                Call to Action <span className="text-destructive">*</span>
              </Label>
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${ctaText.length > 50 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}
              >
                {ctaText.length}/50
              </span>
            </div>
            <Input
              id="promo-cta"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value.slice(0, 50))}
              placeholder="e.g. Call us today! Free quote available."
              data-ocid="local_seo.image_creator.cta_input"
              disabled={!hasAccess}
              className="text-sm"
            />
          </div>

          {/* Style Selector */}
          <div className="space-y-1.5">
            <Label htmlFor="promo-style" className="text-sm font-semibold">
              Style
            </Label>
            <select
              id="promo-style"
              value={style}
              onChange={(e) => setStyle(e.target.value as PromoStyle)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px]"
              data-ocid="local_seo.image_creator.style_select"
              disabled={!hasAccess}
            >
              {PROMO_STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Match Website Branding — collapsible */}
          <div
            className="rounded-xl border border-border overflow-hidden"
            data-ocid="local_seo.image_creator.branding_section"
          >
            <button
              type="button"
              onClick={() => setBrandingOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors min-h-[44px]"
              data-ocid="local_seo.image_creator.branding_toggle"
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]"
                  style={{
                    background: "oklch(0.56 0.16 44 / 0.12)",
                    color: "oklch(0.56 0.16 44)",
                  }}
                >
                  🎨
                </span>
                Match Website Branding{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (optional)
                </span>
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {brandingColors && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "oklch(0.96 0.04 160)",
                      color: "oklch(0.38 0.14 160)",
                    }}
                  >
                    Brand detected
                  </span>
                )}
                <ChevronDown
                  className="w-4 h-4 text-muted-foreground transition-transform duration-200"
                  style={{
                    transform: brandingOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </button>

            {brandingOpen && (
              <div
                className="px-4 pb-4 space-y-3 border-t border-border"
                style={{ background: "oklch(0.98 0 0)" }}
              >
                <p className="text-xs text-muted-foreground pt-3 leading-relaxed">
                  We'll analyze your website's colors and style to match the
                  design of your promo image.
                </p>
                <div className="flex gap-2">
                  <Input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="flex-1 text-sm"
                    disabled={!hasAccess || fetchingBranding}
                    data-ocid="local_seo.image_creator.branding_url_input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFetchBranding();
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleFetchBranding}
                    disabled={
                      !websiteUrl.trim() || fetchingBranding || !hasAccess
                    }
                    className="shrink-0 text-white min-h-[40px]"
                    style={
                      websiteUrl.trim() && !fetchingBranding
                        ? { background: "oklch(0.56 0.16 44)" }
                        : {}
                    }
                    data-ocid="local_seo.image_creator.branding_fetch_button"
                  >
                    {fetchingBranding ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Analyze"
                    )}
                  </Button>
                </div>
                {brandingColors && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      Detected brand color:
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-mono border border-border"
                      style={{
                        background: brandingColors.accent,
                        color: "#fff",
                      }}
                    >
                      {brandingColors.accent}
                    </span>
                    <button
                      type="button"
                      onClick={() => setBrandingColors(null)}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                      data-ocid="local_seo.image_creator.branding_clear"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Requirements hint */}
          {(!logoFile || !photoFile || !sentence.trim() || !ctaText.trim()) && (
            <div className="flex flex-wrap gap-2 text-[11px]">
              {!logoFile && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Missing: logo
                </span>
              )}
              {!photoFile && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Missing: photo
                </span>
              )}
              {!sentence.trim() && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Missing: message
                </span>
              )}
              {!ctaText.trim() && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Missing: CTA
                </span>
              )}
            </div>
          )}

          {/* Generate Button or gate */}
          {hasAccess ? (
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full font-bold min-h-[48px] gap-2 text-white"
              style={canGenerate ? { background: "oklch(0.56 0.16 44)" } : {}}
              data-ocid="local_seo.image_creator.generate_button"
            >
              {compositing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Composing your promo image…
                </>
              ) : promoImage ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Promo Image
                </>
              ) : (
                <>
                  <Image className="w-4 h-4" />
                  Create Promo Image
                </>
              )}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20"
              data-ocid="local_seo.image_creator.tier_gate"
            >
              <Lock className="w-4 h-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Subscribe to access the Image Creator.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compositing loading state */}
      {compositing && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center"
          data-ocid="local_seo.image_creator.loading_state"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.22 0.12 264 / 0.12)" }}
          >
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            Composing your promo image…
          </p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Placing your logo, overlaying text, and rendering in 3 styles
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !compositing && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="local_seo.image_creator.error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={!canGenerate}
            data-ocid="local_seo.image_creator.retry_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Try Again
          </Button>
        </div>
      )}

      {/* Results — 3 styled cards */}
      {promoImage && !compositing && (
        <div className="space-y-4" data-ocid="local_seo.image_creator.result">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Your Promo Image — 3 Styles
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Download your preferred presentation style below
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <PromoCard variant="clean" imageUrl={promoImage} title={sentence} />
            <PromoCard variant="bold" imageUrl={promoImage} title={sentence} />
            <PromoCard
              variant="vibrant"
              imageUrl={promoImage}
              title={sentence}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!promoImage && !compositing && !error && hasAccess && (
        <div
          className="flex flex-col items-center gap-3 py-12 text-center"
          data-ocid="local_seo.image_creator.empty_state"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.22 0.12 264 / 0.12)" }}
          >
            <Image className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Create your first promo image
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Upload your logo and a background photo, add your message and CTA,
              then hit "Create Promo Image" — you'll get 3 styled versions to
              choose from
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Video Generator Tab ────────────────────────────────────────── */

function VideoGeneratorTab({ hasAccess }: { hasAccess: boolean }) {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const generateVideo = useAiGenerateVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  const canGenerate = prompt.trim().length > 0 && !generateVideo.isPending;

  async function handleGenerate() {
    if (!canGenerate) return;
    setVideoUrl(null);
    try {
      const urls = imageUrl.trim() ? [imageUrl.trim()] : [];
      const result = await generateVideo.mutateAsync({
        promoText: prompt.trim(),
        imageUrls: urls,
        logoUrl: logoUrl.trim() || undefined,
      });
      setVideoUrl(result);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Video generation failed.",
      );
    }
  }

  return (
    <div className="space-y-5" data-ocid="local_seo.video_tab">
      {/* Info banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl border"
        style={{
          background: "oklch(0.22 0.12 264 / 0.06)",
          borderColor: "oklch(0.22 0.12 264 / 0.2)",
        }}
      >
        <Film
          className="w-5 h-5 shrink-0 mt-0.5"
          style={{ color: "oklch(0.56 0.16 44)" }}
        />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Video generation uses{" "}
          <span className="font-semibold text-foreground">
            Theta EdgeCloud's video API
          </span>
          . Generation typically takes{" "}
          <span className="font-semibold text-foreground">1–2 minutes</span>.
          Make sure your Theta Video credentials are saved in the Admin &gt; AI
          Settings panel.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <h2 className="text-sm font-bold text-foreground">Video Generator</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Describe your video, optionally add a background image and logo URL
          </p>
        </div>
        <div className="p-5 space-y-4">
          {/* Prompt */}
          <div className="space-y-1.5">
            <Label htmlFor="video-prompt" className="text-sm font-semibold">
              Describe your video <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="video-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A professional sales agent making calls, upbeat and energetic, with logo overlay and contact info"
              rows={3}
              className="resize-none text-sm"
              disabled={!hasAccess}
              data-ocid="local_seo.video.prompt_input"
            />
          </div>

          {/* Background image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="video-image-url" className="text-sm font-semibold">
              Background image URL{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="video-image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={!hasAccess}
              className="text-sm font-mono"
              data-ocid="local_seo.video.image_url_input"
            />
          </div>

          {/* Logo URL */}
          <div className="space-y-1.5">
            <Label htmlFor="video-logo-url" className="text-sm font-semibold">
              Logo URL{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="video-logo-url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              disabled={!hasAccess}
              className="text-sm font-mono"
              data-ocid="local_seo.video.logo_url_input"
            />
          </div>

          {/* Generate button or gate */}
          {hasAccess ? (
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full font-bold min-h-[48px] gap-2 text-white"
              style={canGenerate ? { background: "oklch(0.56 0.16 44)" } : {}}
              data-ocid="local_seo.video.generate_button"
            >
              {generateVideo.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating your video… this may take 1–2 minutes
                </>
              ) : videoUrl ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Generate New Video
                </>
              ) : (
                <>
                  <Film className="w-4 h-4" />
                  Generate Video
                </>
              )}
            </Button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-4 rounded-xl border border-border bg-muted/20"
              data-ocid="local_seo.video.tier_gate"
            >
              <Lock className="w-4 h-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Subscribe to access Video Generator.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading state */}
      {generateVideo.isPending && (
        <div
          className="flex flex-col items-center gap-4 py-12 text-center"
          data-ocid="local_seo.video.loading_state"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.22 0.12 264 / 0.12)" }}
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Generating your video…
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This typically takes 1–2 minutes. Please wait.
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {generateVideo.isError && !generateVideo.isPending && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="local_seo.video.error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            {generateVideo.error?.message ?? "Video generation failed."}
          </p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Make sure your Theta Video credentials are saved in Admin &gt; AI
            Settings, and that your Theta account has video generation enabled.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={!canGenerate}
            data-ocid="local_seo.video.retry_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Try Again
          </Button>
        </div>
      )}

      {/* Video result */}
      {videoUrl && !generateVideo.isPending && (
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
          data-ocid="local_seo.video.result"
        >
          <div
            className="px-5 py-4 border-b border-border flex items-center justify-between gap-3"
            style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
          >
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Your Generated Video
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Powered by Theta EdgeCloud
              </p>
            </div>
            <a
              href={videoUrl}
              download="promo-video.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white min-h-[40px] shrink-0 transition-opacity hover:opacity-90"
              style={{ background: "oklch(0.56 0.16 44)" }}
              data-ocid="local_seo.video.download_button"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
          <div className="p-5">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full rounded-xl border border-border"
              style={{ maxHeight: "360px" }}
              data-ocid="local_seo.video.player"
            >
              <track kind="captions" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!videoUrl &&
        !generateVideo.isPending &&
        !generateVideo.isError &&
        hasAccess && (
          <div
            className="flex flex-col items-center gap-3 py-12 text-center"
            data-ocid="local_seo.video.empty_state"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.22 0.12 264 / 0.12)" }}
            >
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Generate a promo video
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Describe your video above and hit Generate. Optionally add a
                background image and logo URL for a branded result.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

/* ─── Tab Bar ────────────────────────────────────────────────────── */

type SeoTab = "gbp" | "onpage" | "backlinks" | "videogen";

const TABS: { id: SeoTab; label: string; icon: typeof Search }[] = [
  { id: "gbp", label: "Google Business", icon: MapPin },
  { id: "onpage", label: "On-Page SEO", icon: Search },
  { id: "backlinks", label: "Backlink Sources", icon: ExternalLink },
  { id: "videogen", label: "Video Generator", icon: Film },
];

/* ─── Main Page ──────────────────────────────────────────────────── */

export default function LocalSeoPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const { data: profile, isLoading: profileLoading } = useProfile();

  // Read URL search params for deep-link from LeadFormsPage (strict: false = no throw)
  const search = useSearch({ strict: false }) as {
    tab?: string;
    slug?: string;
    name?: string;
  };

  const initialTab: SeoTab =
    search?.tab === "onpage"
      ? "onpage"
      : search?.tab === "backlinks"
        ? "backlinks"
        : "gbp";
  const [activeTab, setActiveTab] = useState<SeoTab>(initialTab);

  const companyName = profile?.companyName ?? "";
  const hasFeatureAccess = !accessLoading && hasAccess;

  if (profileLoading) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-5 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden"
      data-ocid="local_seo.page"
    >
      {/* Admin-revoked overlay */}
      {!accessLoading && !hasAccess && <FeatureLockOverlay />}

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Local SEO
          </h1>
          <p className="text-sm text-muted-foreground">
            Google Business Profile, on-page SEO, backlink guidance, image
            creator, and video generation
          </p>
        </div>
      </div>
      {hasFeatureAccess && <TokenBalance showLtai={false} />}

      {/* Tabs */}
      <div
        className="flex rounded-xl overflow-x-auto border border-border"
        data-ocid="local_seo.tabs"
        role="tablist"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 text-xs sm:text-sm font-semibold transition-colors min-h-[44px] whitespace-nowrap"
              style={
                active
                  ? {
                      background: "oklch(0.22 0.12 264)",
                      color: "white",
                    }
                  : {}
              }
              data-ocid={`local_seo.tab.${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.id === "gbp"
                  ? "GBP"
                  : tab.id === "onpage"
                    ? "On-Page"
                    : tab.id === "videogen"
                      ? "Video"
                      : "Backlinks"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "gbp" && (
        <GbpTab hasAccess={hasFeatureAccess} companyName={companyName} />
      )}
      {activeTab === "onpage" && (
        <OnPageSeoTab
          hasAccess={hasFeatureAccess}
          companyName={companyName}
          initialSlug={search?.slug ?? ""}
          initialName={search?.name ?? ""}
        />
      )}
      {activeTab === "backlinks" && (
        <BacklinkTab hasAccess={hasFeatureAccess} />
      )}
      {activeTab === "videogen" && (
        <VideoGeneratorTab hasAccess={hasFeatureAccess} />
      )}
    </div>
  );
}
