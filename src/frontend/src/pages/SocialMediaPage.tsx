import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BookmarkPlus,
  CalendarClock,
  Check,
  Copy,
  Download,
  ExternalLink,
  Facebook,
  Globe,
  Image,
  Instagram,
  Linkedin,
  Loader2,
  RefreshCw,
  Share2,
  Trash2,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FeatureLockOverlay } from "../components/FeatureLockOverlay";
import { TokenBalance } from "../components/TokenBalance";
import { useAiGenerateImage, useAiGenerateSocialPost } from "../hooks/useAi";
import { useFeatureAccess } from "../hooks/useFeatureAccess";

/* ─── Types ──────────────────────────────────────────────────────── */

type Platform = "facebook" | "instagram" | "linkedin" | "x" | "google";

interface SocialAccount {
  id: string;
  label: string;
  url: string;
  platform: Platform;
}

const PLATFORMS: {
  id: Platform;
  label: string;
  icon: React.ElementType;
  charLimit?: number;
  color: string;
  accent: string;
}[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    color: "oklch(0.52 0.18 264)",
    accent: "oklch(0.92 0.05 264)",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "oklch(0.56 0.20 16)",
    accent: "oklch(0.96 0.04 16)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    color: "oklch(0.48 0.16 230)",
    accent: "oklch(0.93 0.04 230)",
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: Twitter,
    charLimit: 280,
    color: "oklch(0.18 0.01 264)",
    accent: "oklch(0.94 0 264)",
  },
  {
    id: "google",
    label: "Google Business",
    icon: Globe,
    color: "oklch(0.52 0.18 44)",
    accent: "oklch(0.96 0.05 44)",
  },
];

/* ─── Platform detection from URL ───────────────────────────────── */

function detectPlatform(url: string): Platform {
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
  size = 16,
}: {
  platform: Platform;
  size?: number;
}) {
  const found = PLATFORMS.find((p) => p.id === platform);
  if (!found) return <Globe style={{ width: size, height: size }} />;
  const Icon = found.icon;
  return (
    <Icon
      style={{ width: size, height: size, color: found.color, flexShrink: 0 }}
    />
  );
}

/* ─── Account storage helpers (localStorage fallback) ───────────── */

const ACCOUNTS_KEY = "tele-blast:social-accounts";

function loadAccounts(): SocialAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SocialAccount[];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: SocialAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

/* ─── Sidebar — My Social Accounts ──────────────────────────────── */

function SocialAccountsSidebar() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(() =>
    loadAccounts(),
  );
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    const trimLabel = label.trim();
    const trimUrl = url.trim();
    if (!trimLabel || !trimUrl) {
      toast.error("Please enter both a label and a URL.");
      return;
    }
    if (accounts.length >= 10) {
      toast.error("You can save up to 10 social accounts.");
      return;
    }
    const newAccount: SocialAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      label: trimLabel,
      url: trimUrl.startsWith("http") ? trimUrl : `https://${trimUrl}`,
      platform: detectPlatform(trimUrl),
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    saveAccounts(updated);
    setLabel("");
    setUrl("");
    toast.success("Account saved!");
  };

  const handleDelete = (id: string) => {
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    saveAccounts(updated);
    toast.success("Account removed.");
  };

  return (
    <aside
      className="flex flex-col gap-4"
      data-ocid="social_media.accounts_sidebar"
    >
      {/* Header */}
      <div
        className="px-4 py-3 rounded-xl border border-border"
        style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
      >
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Share2 className="w-4 h-4 shrink-0" />
          My Social Accounts
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Save links to open your profiles instantly
        </p>
      </div>

      {/* Add new account form */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-sm">
        <div className="space-y-1.5">
          <Label htmlFor="social-label" className="text-xs font-semibold">
            Account Label
          </Label>
          <Input
            id="social-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Business Facebook Page"
            className="text-sm h-9"
            data-ocid="social_media.account_label_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="social-url" className="text-xs font-semibold">
            Profile URL
          </Label>
          <Input
            id="social-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://facebook.com/yourbusiness"
            className="text-sm h-9"
            data-ocid="social_media.account_url_input"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={!label.trim() || !url.trim()}
          className="w-full h-9 text-sm font-semibold gap-1.5 text-white"
          style={
            label.trim() && url.trim()
              ? { background: "oklch(0.22 0.12 264)" }
              : {}
          }
          data-ocid="social_media.save_account_button"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          Save Account
        </Button>
      </div>

      {/* Account list */}
      {accounts.length > 0 ? (
        <div className="space-y-2" data-ocid="social_media.accounts_list">
          {accounts.map((account, idx) => (
            <div
              key={account.id}
              className="bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md transition-shadow"
              data-ocid={`social_media.account.${idx + 1}`}
            >
              <PlatformIcon platform={account.platform} size={15} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {account.label}
                </p>
              </div>
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[30px] text-muted-foreground hover:text-foreground"
                data-ocid={`social_media.account_link.${idx + 1}`}
                aria-label={`Open ${account.label}`}
              >
                <ExternalLink className="w-3 h-3" />
                Open
              </a>
              <button
                type="button"
                onClick={() => handleDelete(account.id)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors min-h-[30px] min-w-[30px] flex items-center justify-center"
                aria-label={`Remove ${account.label}`}
                data-ocid={`social_media.delete_account.${idx + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center gap-2 py-6 text-center text-muted-foreground"
          data-ocid="social_media.accounts_empty_state"
        >
          <Share2 className="w-8 h-8 opacity-30" />
          <p className="text-xs">
            No accounts saved yet.
            <br />
            Add your first above.
          </p>
        </div>
      )}
    </aside>
  );
}

/* ─── Schedule button (coming soon) ─────────────────────────────── */

function ScheduleButton() {
  const [showTip, setShowTip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowTip(true), 300);
  };
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowTip(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        disabled
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-muted text-muted-foreground opacity-60 cursor-not-allowed min-h-[36px]"
        aria-disabled="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        data-ocid="social_media.schedule_button"
      >
        <CalendarClock className="w-3.5 h-3.5" />
        Schedule to Calendar
      </button>
      {showTip && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-52 rounded-lg px-3 py-2 text-xs text-center shadow-xl border border-border"
          style={{ background: "oklch(0.22 0.12 264)", color: "white" }}
          role="tooltip"
          data-ocid="social_media.schedule_tooltip"
        >
          Coming soon — Facebook API integration
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid oklch(0.22 0.12 264)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Copy button helper ─────────────────────────────────────────── */

function CopyButton({
  text,
  ocid,
}: {
  text: string;
  ocid: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Post copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[34px] text-muted-foreground hover:text-foreground"
      data-ocid={ocid}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy Post
        </>
      )}
    </button>
  );
}

/* ─── Post Generator — Main Content ─────────────────────────────── */

function PostGenerator({ hasAccess }: { hasAccess: boolean }) {
  const [activePlatform, setActivePlatform] = useState<Platform>("facebook");
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generatePost = useAiGenerateSocialPost();
  const generateImage = useAiGenerateImage();

  const platform = PLATFORMS.find((p) => p.id === activePlatform)!;

  const handleGeneratePost = async () => {
    if (!topic.trim()) {
      toast.error("Please describe your post topic first.");
      return;
    }
    setGeneratedPost(null);
    setGeneratedImage(null);
    try {
      const result = await generatePost.mutateAsync({
        platform: platform.label,
        topic: topic.trim(),
      });
      setGeneratedPost(result);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate post.",
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
        style: "modern professional social media marketing",
      });
      setGeneratedImage(imageUrl);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Image generation failed.",
      );
    }
  };

  const charLimit = platform.charLimit;
  const overLimit =
    charLimit && generatedPost && generatedPost.length > charLimit;

  return (
    <div className="flex flex-col gap-5" data-ocid="social_media.generator">
      {/* Title + token balance */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.22 0.12 264)" }}
            >
              <Share2 className="w-4 h-4 text-white" />
            </div>
            Social Media Post Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            AI writes platform-perfect posts with creatives for every channel
          </p>
        </div>
        {hasAccess && <TokenBalance showLtai={false} />}
      </div>

      {/* Platform selector */}
      <div
        className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide"
        role="tablist"
        aria-label="Select social media platform"
        data-ocid="social_media.platform_tabs"
      >
        {PLATFORMS.map((p) => {
          const Icon = p.icon;
          const active = activePlatform === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setActivePlatform(p.id);
                setGeneratedPost(null);
                setGeneratedImage(null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[38px] border"
              style={
                active
                  ? {
                      background: p.color,
                      color: "white",
                      borderColor: p.color,
                    }
                  : {
                      background: p.accent,
                      color: "oklch(0.3 0.08 264)",
                      borderColor: "oklch(0.88 0.02 264)",
                    }
              }
              data-ocid={`social_media.platform_tab.${p.id}`}
            >
              <Icon
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: active ? "white" : p.color }}
              />
              {p.label}
              {p.charLimit && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={
                    active
                      ? { background: "rgba(255,255,255,0.25)", color: "white" }
                      : {
                          background: "oklch(0.88 0.02 264)",
                          color: "oklch(0.4 0.05 264)",
                        }
                  }
                >
                  {p.charLimit}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Input area */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.05)" }}
        >
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <PlatformIcon platform={activePlatform} size={16} />
            Generate a {platform.label} Post
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Describe your topic and AI writes a ready-to-publish post
            {charLimit ? ` (optimized for ${charLimit}-character limit)` : ""}
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="post-topic" className="text-sm font-semibold">
              Post Topic / Promotion
            </Label>
            <Textarea
              id="post-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Describe your post topic, promotion, or announcement..."
              rows={3}
              className="resize-none text-sm"
              disabled={!hasAccess}
              data-ocid="social_media.topic_textarea"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {hasAccess ? (
              <Button
                onClick={handleGeneratePost}
                disabled={!topic.trim() || generatePost.isPending}
                className="flex-1 font-bold min-h-[44px] gap-2 text-white text-sm"
                style={
                  topic.trim() && !generatePost.isPending
                    ? { background: platform.color }
                    : {}
                }
                data-ocid="social_media.generate_post_button"
              >
                {generatePost.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Writing Post…
                  </>
                ) : generatedPost ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Regenerate Post
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Generate Post
                  </>
                )}
              </Button>
            ) : (
              <div className="flex-1 flex items-center gap-2.5 p-3 rounded-xl border border-border bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  Upgrade to the $95/month Pro + Ads plan to generate social
                  media posts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {generatePost.isPending && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="social_media.post_loading_state"
        >
          <Loader2
            className="w-8 h-8 animate-spin"
            style={{ color: platform.color }}
          />
          <p className="text-sm font-semibold text-foreground">
            Writing your {platform.label} post…
          </p>
          <p className="text-xs text-muted-foreground">
            AI is crafting platform-perfect copy for your audience
          </p>
        </div>
      )}

      {/* Error */}
      {generatePost.isError && !generatedPost && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-center"
          data-ocid="social_media.post_error_state"
        >
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            {generatePost.error?.message ??
              "Failed to generate. Please try again."}
          </p>
        </div>
      )}

      {/* Generated post card */}
      {generatedPost && !generatePost.isPending && (
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
          data-ocid="social_media.post_card"
        >
          <div
            className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border flex-wrap"
            style={{ background: "oklch(0.22 0.12 264 / 0.05)" }}
          >
            <div className="flex items-center gap-2">
              <PlatformIcon platform={activePlatform} size={16} />
              <h3 className="text-sm font-bold text-foreground">
                Your {platform.label} Post
              </h3>
              {charLimit && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    overLimit
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {generatedPost.length}/{charLimit} chars
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <CopyButton
                text={generatedPost}
                ocid="social_media.copy_post_button"
              />
              <ScheduleButton />
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
              {generatedPost}
            </p>
          </div>
        </div>
      )}

      {/* Generate Creative button */}
      {generatedPost && !generatePost.isPending && hasAccess && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div
            className="px-5 py-4 border-b border-border"
            style={{ background: "oklch(0.22 0.12 264 / 0.05)" }}
          >
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Image className="w-4 h-4 shrink-0" />
              AI Creative
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Generate a visual to pair with your post (costs 1 tAI token)
            </p>
          </div>
          <div className="p-5 space-y-4">
            <Button
              onClick={handleGenerateCreative}
              disabled={generateImage.isPending}
              variant="outline"
              className="w-full min-h-[44px] gap-2 font-semibold text-sm"
              data-ocid="social_media.generate_creative_button"
            >
              {generateImage.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Creative…
                </>
              ) : generatedImage ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Creative
                </>
              ) : (
                <>
                  <Image className="w-4 h-4" />
                  Generate Creative Image
                </>
              )}
            </Button>

            {/* Creative loading */}
            {generateImage.isPending && (
              <div
                className="flex flex-col items-center gap-3 py-6 text-center"
                data-ocid="social_media.creative_loading_state"
              >
                <Loader2
                  className="w-7 h-7 animate-spin"
                  style={{ color: platform.color }}
                />
                <p className="text-xs text-muted-foreground">
                  Generating your visual creative…
                </p>
              </div>
            )}

            {/* Creative error */}
            {generateImage.isError && !generatedImage && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl border border-destructive/30 bg-destructive/5"
                data-ocid="social_media.creative_error_state"
              >
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <p className="text-xs text-destructive">
                  {generateImage.error?.message ??
                    "Image generation failed. Please try again."}
                </p>
              </div>
            )}

            {/* Generated image */}
            {generatedImage && !generateImage.isPending && (
              <div
                className="space-y-3"
                data-ocid="social_media.creative_preview"
              >
                <div className="rounded-xl overflow-hidden border border-border">
                  <img
                    src={generatedImage}
                    alt="AI-generated social media creative"
                    className="w-full object-cover"
                    style={{ maxHeight: "360px" }}
                  />
                </div>
                <a
                  href={generatedImage}
                  download="social-creative.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[40px] text-foreground"
                  data-ocid="social_media.download_image_button"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Mobile Accounts Drawer ─────────────────────────────────────── */

function MobileAccountsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm min-h-[40px]"
        data-ocid="social_media.open_accounts_drawer"
      >
        <Share2 className="w-4 h-4 shrink-0" />
        My Accounts
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ background: "oklch(0 0 0 / 0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          data-ocid="social_media.accounts_drawer"
        >
          <div
            className="rounded-t-2xl bg-background border-t border-border overflow-y-auto"
            style={{ maxHeight: "80dvh" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background z-10">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4 shrink-0" />
                My Social Accounts
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close drawer"
                data-ocid="social_media.close_accounts_drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <SocialAccountsSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function SocialMediaPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();
  const hasFeatureAccess = !accessLoading && hasAccess;

  if (accessLoading) {
    return (
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-5 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      className="max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8 relative overflow-hidden"
      data-ocid="social_media.page"
    >
      {/* Admin-revoked overlay */}
      {!hasAccess && !accessLoading && <FeatureLockOverlay />}

      <div className="flex flex-col gap-6">
        {/* Mobile: accounts drawer trigger */}
        <div className="lg:hidden">
          <MobileAccountsDrawer />
        </div>

        {/* Desktop two-column layout */}
        <div className="flex gap-6 items-start">
          {/* Left sidebar — desktop only */}
          <div
            className="hidden lg:flex flex-col gap-0 shrink-0"
            style={{ width: "280px" }}
          >
            <SocialAccountsSidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <PostGenerator hasAccess={hasFeatureAccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
