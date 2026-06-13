import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Image,
  Loader2,
  Megaphone,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FeatureLockOverlay } from "../components/FeatureLockOverlay";
import { TokenBalance } from "../components/TokenBalance";
import {
  type GeneratedAdCreatives,
  useAiGenerateAdCopy,
  useAiGenerateAdCreatives,
  useAiGenerateImage,
} from "../hooks/useAi";
import { useFeatureAccess } from "../hooks/useFeatureAccess";
import { useProfile } from "../hooks/useProfile";

/* ─── Types ─────────────────────────────────────────────────────── */

type Platform = "meta" | "google";
type PageTab = "ad_copy" | "ai_creatives";

interface AdCopy {
  headline: string;
  bodyCopy: string;
  cta: string;
}

/* ─── Helpers ────────────────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ─── Step Indicator ─────────────────────────────────────────────── */

function StepIndicator({ step }: { step: number }) {
  const steps = ["Platform & Offer", "Ad Copy", "Launch"];
  return (
    <div
      className="flex items-center gap-0"
      data-ocid="advertise.step_indicator"
    >
      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isDone = step > num;
        return (
          <div key={num} className="flex items-center gap-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? "text-white"
                    : isActive
                      ? "text-white"
                      : "text-muted-foreground border border-border bg-background"
                }`}
                style={
                  isDone || isActive
                    ? { background: "oklch(0.56 0.16 44)" }
                    : {}
                }
                data-ocid={`advertise.step_indicator.${num}`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : num}
              </div>
              <span
                className={`text-[10px] font-medium whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-10 sm:w-16 h-0.5 mb-4 mx-1"
                style={{
                  background:
                    step > i + 1 ? "oklch(0.56 0.16 44)" : "oklch(0.85 0 0)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Platform Card ──────────────────────────────────────────────── */

function PlatformCard({
  platform,
  selected,
  onSelect,
}: {
  platform: Platform;
  selected: boolean;
  onSelect: () => void;
}) {
  const isMeta = platform === "meta";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-left ${
        selected
          ? "border-primary shadow-md"
          : "border-border hover:border-border/80 hover:shadow-sm"
      }`}
      style={selected ? { borderColor: "oklch(0.56 0.16 44)" } : {}}
      data-ocid={`advertise.platform_card.${platform}`}
      aria-pressed={selected}
    >
      {selected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-sm"
        style={{
          background: isMeta
            ? "linear-gradient(135deg, #1877F2, #42A5F5)"
            : "linear-gradient(135deg, #4285F4, #34A853)",
        }}
      >
        {isMeta ? "f" : "G"}
      </div>
      <div className="text-center">
        <p className="font-bold text-foreground text-base">
          {isMeta ? "Meta Ads" : "Google Ads"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {isMeta
            ? "Facebook & Instagram campaigns"
            : "Search & display campaigns"}
        </p>
      </div>
    </button>
  );
}

/* ─── CopyField ──────────────────────────────────────────────────── */

function CopyField({
  label,
  value,
  ocid,
  multiline,
}: {
  label: string;
  value: string;
  ocid: string;
  multiline?: boolean;
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
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
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
        <p className="text-sm font-semibold text-foreground p-3 rounded-lg bg-muted/40 border border-border truncate">
          {value}
        </p>
      )}
    </div>
  );
}

/* ─── AI Creatives Section ───────────────────────────────────────── */

function CreativeField({
  label,
  value,
  ocid,
  multiline,
}: {
  label: string;
  value: string;
  ocid: string;
  multiline?: boolean;
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
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
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

interface AdCreativesSectionProps {
  platform: Platform;
  companyName: string;
}

function AdCreativesSection({
  platform,
  companyName,
}: AdCreativesSectionProps) {
  const generateCreatives = useAiGenerateAdCreatives();
  const [conceptDescription, setConceptDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [visualStyle, setVisualStyle] = useState("");
  const [result, setResult] = useState<GeneratedAdCreatives | null>(null);

  const handleGenerate = async () => {
    if (!conceptDescription.trim()) {
      toast.error("Please describe your creative concept.");
      return;
    }
    setResult(null);
    try {
      const res = await generateCreatives.mutateAsync({
        platform,
        conceptDescription,
        targetAudience,
        visualStyle,
        companyName,
      });
      setResult(res);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate creatives.",
      );
    }
  };

  return (
    <section
      className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
      data-ocid="advertise.creatives_card"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
        style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <Image className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-foreground">AI Creatives</h2>
          <p className="text-xs text-muted-foreground">
            Generate a visual creative brief for your{" "}
            {platform === "meta" ? "Meta" : "Google"} ad
          </p>
        </div>
        {result && (
          <button
            type="button"
            onClick={() => {
              setResult(null);
              handleGenerate();
            }}
            disabled={generateCreatives.isPending}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[32px] text-muted-foreground hover:text-foreground disabled:opacity-50"
            data-ocid="advertise.creatives_retry_button"
          >
            {generateCreatives.isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">Retry</span>
          </button>
        )}
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="conceptDescription"
            className="text-sm font-semibold text-foreground"
          >
            Describe your creative concept{" "}
            <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            What are you advertising? What feeling or message should the visual
            convey?
          </p>
          <Textarea
            id="conceptDescription"
            value={conceptDescription}
            onChange={(e) => setConceptDescription(e.target.value)}
            placeholder="e.g. A confident sales rep closing a deal on their phone, modern office setting…"
            rows={3}
            className="resize-none text-sm"
            data-ocid="advertise.creatives_concept_input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="targetAudience"
              className="text-sm font-semibold text-foreground"
            >
              Target audience
            </Label>
            <Textarea
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Small business owners aged 30-55…"
              rows={2}
              className="resize-none text-sm"
              data-ocid="advertise.creatives_audience_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="visualStyle"
              className="text-sm font-semibold text-foreground"
            >
              Visual style
            </Label>
            <Textarea
              id="visualStyle"
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              placeholder="e.g. Professional blue theme, bold orange CTA…"
              rows={2}
              className="resize-none text-sm"
              data-ocid="advertise.creatives_style_input"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!conceptDescription.trim() || generateCreatives.isPending}
          className="w-full font-bold text-sm min-h-[48px] gap-2 text-white"
          style={
            conceptDescription.trim() && !generateCreatives.isPending
              ? { background: "oklch(0.56 0.16 44)" }
              : {}
          }
          data-ocid="advertise.creatives_generate_button"
        >
          {generateCreatives.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Creative Brief…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Creative Brief
            </>
          )}
        </Button>

        {/* Loading state */}
        {generateCreatives.isPending && !result && (
          <div
            className="flex flex-col items-center gap-3 py-6 text-center"
            data-ocid="advertise.creatives_loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Crafting your creative brief…
            </p>
            <p className="text-xs text-muted-foreground">
              AI is designing your visual ad concept
            </p>
          </div>
        )}

        {/* Error state */}
        {generateCreatives.isError && !result && (
          <div
            className="flex flex-col items-center gap-3 py-6 text-center"
            data-ocid="advertise.creatives_error_state"
          >
            <AlertCircle className="w-8 h-8 text-destructive" />
            <p className="text-sm font-semibold text-foreground">
              Failed to generate creative brief
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              {generateCreatives.error?.message ??
                "Please try again — if this keeps happening, check that your Theta API key is set in Admin > AI Settings."}
            </p>
            <Button
              onClick={handleGenerate}
              size="sm"
              variant="outline"
              className="gap-2 mt-1"
              data-ocid="advertise.creatives_retry_error_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div
            className="space-y-4 pt-2 border-t border-border"
            data-ocid="advertise.creatives_results"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
              Your Creative Brief
            </p>

            <CreativeField
              label="Image Description"
              value={result.imageDescription}
              ocid="advertise.creatives_image_desc_field"
              multiline
            />

            <div
              className="space-y-1.5"
              data-ocid="advertise.creatives_headlines_field"
            >
              <div className="flex items-center justify-between gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Headline Variations
                </Label>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        result.headlines.join("\n"),
                      );
                      toast.success("Headlines copied!");
                    } catch {
                      toast.error("Could not copy to clipboard.");
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[30px] shrink-0 text-muted-foreground hover:text-foreground"
                  data-ocid="advertise.creatives_headlines_copy_button"
                >
                  <Copy className="w-3 h-3" />
                  Copy All
                </button>
              </div>
              <div className="space-y-2">
                {result.headlines.map((h) => (
                  <div
                    key={h}
                    className="flex items-center justify-between gap-2 p-3 rounded-lg bg-muted/40 border border-border"
                    data-ocid="advertise.creatives_headline"
                  >
                    <span className="text-sm font-semibold text-foreground break-words flex-1">
                      {h}
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(h);
                          toast.success("Headline copied!");
                        } catch {
                          toast.error("Could not copy.");
                        }
                      }}
                      className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      aria-label="Copy headline"
                      data-ocid="advertise.creatives_headline_copy_button"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="space-y-1.5"
              data-ocid="advertise.creatives_palette_field"
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Suggested Color Palette
              </Label>
              <div className="flex gap-3 flex-wrap">
                {result.colorPalette.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(hex);
                        toast.success(`${hex} copied!`);
                      } catch {
                        toast.error("Could not copy.");
                      }
                    }}
                    title={`Copy ${hex}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-xs font-mono font-medium text-foreground min-h-[40px]"
                    data-ocid={`advertise.creatives_color.${hex}`}
                  >
                    <span
                      className="w-5 h-5 rounded-md border border-border shrink-0"
                      style={{ background: hex }}
                    />
                    {hex}
                  </button>
                ))}
              </div>
            </div>

            <CreativeField
              label="Image Overlay Text"
              value={result.overlayText}
              ocid="advertise.creatives_overlay_field"
            />

            <CreativeField
              label="Call to Action"
              value={result.cta}
              ocid="advertise.creatives_cta_field"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */

export default function AdvertisePage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const generateAdCopy = useAiGenerateAdCopy();
  const generateImage = useAiGenerateImage();

  const [activeTab, setActiveTab] = useState<PageTab>("ad_copy");
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform>("meta");
  const [offerDescription, setOfferDescription] = useState("");
  const [adCopy, setAdCopy] = useState<AdCopy | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );

  const companyName = profile?.companyName ?? "";
  const repName = profile?.name ?? "";
  const slug = companyName ? slugify(companyName) : "";
  const contactFormUrl = slug
    ? `https://tele-blast.com/lead-forms/public/${slug}`
    : null;

  const handleGenerateAndAdvance = async () => {
    if (!offerDescription.trim()) {
      toast.error("Please describe your offer before continuing.");
      return;
    }
    setAdCopy(null);
    setGeneratedImageUrl(null);
    try {
      const result = await generateAdCopy.mutateAsync({
        platform,
        offerDescription,
        repName,
        companyName,
      });
      setAdCopy(result);
      setStep(2);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate ad copy.",
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
        companyName,
      });
      setAdCopy(result);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate ad copy.",
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
        style: "marketing",
      });
      setGeneratedImageUrl(url);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Image generation is temporarily unavailable. Please try again in a moment.",
      );
    }
  };

  const metaAdsUrl = "https://www.facebook.com/adsmanager";
  const googleAdsUrl = "https://ads.google.com/home/";

  if (profileLoading) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden"
      data-ocid="advertise.page"
    >
      {/* Admin-revoked overlay */}
      {!accessLoading && !hasAccess && <FeatureLockOverlay />}{" "}
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <Megaphone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Advertise
          </h1>
          <p className="text-sm text-muted-foreground">
            Create AI-generated ad copy or creative briefs for Meta or Google
          </p>
        </div>
      </div>
      <TokenBalance showLtai={false} />
      {/* Tab switcher */}
      <div
        className="flex gap-1 p-1 rounded-xl bg-muted/40 border border-border"
        role="tablist"
        data-ocid="advertise.tab_switcher"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "ad_copy"}
          onClick={() => setActiveTab("ad_copy")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "ad_copy"
              ? "text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={
            activeTab === "ad_copy"
              ? { background: "oklch(0.22 0.12 264)" }
              : {}
          }
          data-ocid="advertise.ad_copy.tab"
        >
          <Megaphone className="w-4 h-4" />
          Ad Copy
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "ai_creatives"}
          onClick={() => setActiveTab("ai_creatives")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "ai_creatives"
              ? "text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={
            activeTab === "ai_creatives"
              ? { background: "oklch(0.22 0.12 264)" }
              : {}
          }
          data-ocid="advertise.ai_creatives.tab"
        >
          <Image className="w-4 h-4" />
          AI Creatives
        </button>
      </div>
      {/* ── Ad Copy tab ─────────────────────────────────────────────── */}
      {activeTab === "ad_copy" && (
        <>
          {/* Step indicator */}
          <div className="flex justify-center">
            <StepIndicator step={step} />
          </div>

          {/* ── Step 1: Platform & Offer ──────────────────────────────── */}
          {step === 1 && (
            <section
              className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
              data-ocid="advertise.step1_card"
            >
              <div
                className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
                style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                >
                  1
                </div>
                <h2 className="text-sm font-bold text-foreground">
                  Choose Platform & Describe Your Offer
                </h2>
              </div>

              <div className="p-5 space-y-5">
                {/* Platform selector */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Which ad platform?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <PlatformCard
                      platform="meta"
                      selected={platform === "meta"}
                      onSelect={() => setPlatform("meta")}
                    />
                    <PlatformCard
                      platform="google"
                      selected={platform === "google"}
                      onSelect={() => setPlatform("google")}
                    />
                  </div>
                </div>

                {/* Offer description */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offerDescription"
                    className="text-sm font-semibold text-foreground"
                  >
                    Describe your offer
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    What are you promoting? Who is it for? What's the key
                    benefit or call to action?
                  </p>
                  <Textarea
                    id="offerDescription"
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                    placeholder="e.g. Sales consulting services for small business owners, free 30-min strategy call…"
                    rows={4}
                    className="resize-none text-sm min-h-[100px]"
                    data-ocid="advertise.offer_description_input"
                  />
                </div>

                <Button
                  onClick={handleGenerateAndAdvance}
                  disabled={
                    !offerDescription.trim() || generateAdCopy.isPending
                  }
                  className="w-full font-bold text-sm min-h-[48px] gap-2 text-white"
                  style={
                    offerDescription.trim() && !generateAdCopy.isPending
                      ? { background: "oklch(0.56 0.16 44)" }
                      : {}
                  }
                  data-ocid="advertise.generate_button"
                >
                  {generateAdCopy.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Ad Copy…
                    </>
                  ) : (
                    <>
                      Generate Ad Copy
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </section>
          )}

          {/* ── Step 2: Ad Copy Output ──────────────────────────────────── */}
          {step === 2 && (
            <section
              className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
              data-ocid="advertise.step2_card"
            >
              <div
                className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
                style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                >
                  2
                </div>
                <h2 className="text-sm font-bold text-foreground">
                  Your {platform === "meta" ? "Meta" : "Google"} Ad Copy
                </h2>
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={generateAdCopy.isPending}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[32px] text-muted-foreground hover:text-foreground disabled:opacity-50"
                  data-ocid="advertise.retry_button"
                >
                  {generateAdCopy.isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  <span className="hidden sm:inline">Retry</span>
                </button>
              </div>

              <div className="p-5 space-y-4">
                {generateAdCopy.isPending && !adCopy ? (
                  <div
                    className="flex flex-col items-center gap-3 py-8 text-center"
                    data-ocid="advertise.loading_state"
                  >
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      Crafting your ad copy…
                    </p>
                    <p className="text-xs text-muted-foreground">
                      AI is writing a high-converting ad for your offer
                    </p>
                  </div>
                ) : generateAdCopy.isError && !adCopy ? (
                  <div
                    className="flex flex-col items-center gap-3 py-8 text-center"
                    data-ocid="advertise.error_state"
                  >
                    <AlertCircle className="w-8 h-8 text-destructive" />
                    <p className="text-sm font-semibold text-foreground">
                      Failed to generate ad copy
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {generateAdCopy.error?.message ?? "Please try again."}
                    </p>
                    <Button
                      onClick={handleRetry}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      data-ocid="advertise.retry_error_button"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Try Again
                    </Button>
                  </div>
                ) : adCopy ? (
                  <>
                    <CopyField
                      label="Headline"
                      value={adCopy.headline}
                      ocid="advertise.headline_field"
                    />
                    <CopyField
                      label="Body Copy"
                      value={adCopy.bodyCopy}
                      ocid="advertise.body_copy_field"
                      multiline
                    />
                    <CopyField
                      label="Call to Action"
                      value={adCopy.cta}
                      ocid="advertise.cta_field"
                    />

                    {/* ── Generate Creative Image ──────────────────── */}
                    <div
                      className="pt-3 border-t border-border space-y-3"
                      data-ocid="advertise.generate_image_section"
                    >
                      <Button
                        onClick={handleGenerateImage}
                        disabled={generateImage.isPending}
                        className="w-full font-bold text-sm min-h-[48px] gap-2 text-white"
                        style={
                          !generateImage.isPending
                            ? { background: "oklch(0.22 0.12 264)" }
                            : {}
                        }
                        data-ocid="advertise.generate_creative_button"
                      >
                        {generateImage.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating image…
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Creative
                          </>
                        )}
                      </Button>

                      {/* Loading indicator */}
                      {generateImage.isPending && (
                        <div
                          className="flex flex-col items-center gap-2 py-4 text-center"
                          data-ocid="advertise.image_loading_state"
                        >
                          <Loader2 className="w-7 h-7 animate-spin text-primary" />
                          <p className="text-sm font-semibold text-foreground">
                            Generating image…
                          </p>
                          <p className="text-xs text-muted-foreground">
                            AI is creating your ad visual
                          </p>
                        </div>
                      )}

                      {/* Error state */}
                      {generateImage.isError && !generatedImageUrl && (
                        <div
                          className="flex items-start gap-2.5 p-3 rounded-lg border border-destructive/30 bg-destructive/5"
                          data-ocid="advertise.image_error_state"
                        >
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <p className="text-sm text-destructive font-medium">
                              Image generation failed.
                            </p>
                            <p className="text-xs text-destructive/80">
                              {generateImage.error?.message &&
                              !generateImage.error.message.includes(
                                "temporarily unavailable",
                              )
                                ? generateImage.error.message
                                : "Please try again — if this keeps happening, check that your Theta API key is set in Admin > AI Settings."}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Generated image preview */}
                      {generatedImageUrl && (
                        <div
                          className="space-y-2"
                          data-ocid="advertise.generated_image_preview"
                        >
                          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Generated Creative
                          </Label>
                          <div className="rounded-xl overflow-hidden border border-border bg-muted/30">
                            <img
                              src={generatedImageUrl}
                              alt="AI-generated ad creative"
                              className="w-full h-auto block"
                            />
                          </div>
                          <a
                            href={generatedImageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition-colors min-h-[44px]"
                            data-ocid="advertise.download_image_button"
                          >
                            <Download className="w-4 h-4" />
                            Download Image
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
              </div>

              {adCopy && (
                <div className="px-5 pb-5 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="gap-1.5"
                    data-ocid="advertise.back_to_step1_button"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setStep(3)}
                    className="gap-1.5 text-white font-semibold"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                    data-ocid="advertise.next_to_step3_button"
                  >
                    Next: Launch
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* ── Step 3: Launch Instructions ────────────────────────────── */}
          {step === 3 && (
            <section
              className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
              data-ocid="advertise.step3_card"
            >
              <div
                className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
                style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "oklch(0.56 0.16 44)" }}
                >
                  3
                </div>
                <h2 className="text-sm font-bold text-foreground">
                  Launch on{" "}
                  {platform === "meta" ? "Meta Ads Manager" : "Google Ads"}
                </h2>
              </div>

              <div className="p-5 space-y-5">
                {/* Landing page URL */}
                <div
                  className="space-y-2"
                  data-ocid="advertise.landing_page_section"
                >
                  <Label className="text-sm font-semibold text-foreground">
                    Your Landing Page URL
                  </Label>
                  {contactFormUrl ? (
                    <CopyField
                      label="Contact Form URL"
                      value={contactFormUrl}
                      ocid="advertise.contact_form_url_field"
                    />
                  ) : (
                    <div
                      className="flex items-start gap-2.5 p-3 rounded-lg border border-amber-500/40 bg-amber-50 dark:bg-amber-900/10"
                      data-ocid="advertise.no_company_notice"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        Your contact form URL isn't ready yet. Please{" "}
                        <Link
                          to="/profile"
                          className="font-semibold underline hover:no-underline"
                        >
                          update your profile
                        </Link>{" "}
                        with your company name to generate your unique form
                        link.
                      </p>
                    </div>
                  )}
                </div>

                {/* Step-by-step instructions */}
                <div
                  className="space-y-2"
                  data-ocid="advertise.instructions_section"
                >
                  <Label className="text-sm font-semibold text-foreground">
                    Step-by-Step Instructions
                  </Label>
                  <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2">
                    {platform === "meta" ? (
                      <ol className="space-y-2.5 list-none">
                        {[
                          "Go to Meta Ads Manager and click Create.",
                          "Choose a Campaign Objective (e.g. Leads or Traffic).",
                          "Set your audience, budget, and schedule, then click Next.",
                          "Under Ad Creative, in Primary Text paste your body copy.",
                          "In the Headline field paste your headline.",
                          "Set your CTA button to match the suggested Call to Action text.",
                          "Add the Landing Page URL from above as the destination link.",
                          "Review your ad and click Publish.",
                        ].map((stepText, i) => (
                          <li
                            key={stepText}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                            data-ocid={`advertise.instruction_step.${i + 1}`}
                          >
                            <span
                              className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "oklch(0.22 0.12 264)" }}
                            >
                              {i + 1}
                            </span>
                            {stepText}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ol className="space-y-2.5 list-none">
                        {[
                          "Go to Google Ads and click New Campaign.",
                          "Select Search as your campaign type.",
                          "Choose your goal (e.g. Leads or Website Traffic).",
                          "Set your budget, bidding, and targeting, then continue.",
                          "Under Ad Creation, in the Headlines fields add your headline.",
                          "In the Descriptions fields paste your body copy.",
                          "Set the Final URL to the Landing Page URL from above.",
                          "Review your responsive search ad and click Save and Continue.",
                        ].map((stepText, i) => (
                          <li
                            key={stepText}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                            data-ocid={`advertise.instruction_step.${i + 1}`}
                          >
                            <span
                              className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "oklch(0.22 0.12 264)" }}
                            >
                              {i + 1}
                            </span>
                            {stepText}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>

                {/* CTA + back */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(2)}
                    className="gap-1.5"
                    data-ocid="advertise.back_to_step2_button"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Ad Copy
                  </Button>
                  <a
                    href={platform === "meta" ? metaAdsUrl : googleAdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all min-h-[44px] shadow-sm"
                    style={{ background: "oklch(0.56 0.16 44)" }}
                    data-ocid="advertise.open_ads_manager_button"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open{" "}
                    {platform === "meta" ? "Meta Ads Manager" : "Google Ads"}
                  </a>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      {/* ── AI Creatives tab ─────────────────────────────────────────── */}
      {activeTab === "ai_creatives" && (
        <AdCreativesSection platform={platform} companyName={companyName} />
      )}
    </div>
  );
}
