import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Droplets,
  Hash,
  Info,
  Loader2,
  Pause,
  Phone,
  Play,
  Plus,
  Search,
  Smartphone,
  Sparkles,
  Square,
  Trash2,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { DripCampaignView } from "../hooks/useDrip";
import {
  useCreateDripCampaign,
  useDeleteDripCampaign,
  useDripCampaigns,
  useGetBirthdayDripConfig,
  useMarkLeadFailed,
  useMarkLeadSent,
  usePauseDripCampaign,
  useResumeDripCampaign,
  useSetBirthdayDripConfig,
  useSpinSms,
  useStopDripCampaign,
} from "../hooks/useDrip";
import { useAddTextRecord, useGetPipelines, useLeads } from "../hooks/useLeads";
import { tierHasFeature, useSubscription } from "../hooks/useSubscription";
import { useSmsTemplates } from "../hooks/useTemplates";
import type { Lead, SmsTemplate } from "../types";
// TwilioNumber type kept locally — TwilioSetupPage no longer exports it
interface TwilioNumber {
  id: string;
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  label: string;
}

const LS_NUMBERS_KEY = "twilio_numbers";
const LS_ROUND_ROBIN_KEY = "twilio_round_robin";
const LS_SEND_METHOD_KEY = "drip_send_method";

// ── Sending method type (defined early for use in helpers) ───────────────────
type SendMethod = "twilio" | "cell_phone";

function loadSendMethod(twilioNumbers: TwilioNumber[]): SendMethod {
  try {
    const stored = localStorage.getItem(LS_SEND_METHOD_KEY);
    if (stored === "twilio" || stored === "cell_phone") return stored;
  } catch {
    /* ignore */
  }
  return twilioNumbers.length > 0 ? "twilio" : "cell_phone";
}

function saveSendMethod(method: SendMethod) {
  try {
    localStorage.setItem(LS_SEND_METHOD_KEY, method);
  } catch {
    /* ignore */
  }
}

function loadTwilioNumbers(): TwilioNumber[] {
  try {
    const raw = localStorage.getItem(LS_NUMBERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TwilioNumber[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [];
}

const _isRoundRobinEnabled = (): boolean => {
  try {
    return localStorage.getItem(LS_ROUND_ROBIN_KEY) === "true";
  } catch {
    return false;
  }
};
void _isRoundRobinEnabled;

function personalize(template: string, lead: Lead): string {
  const firstName = lead.firstName ?? lead.name?.split(" ")[0] ?? "";
  const businessName = lead.name ?? "";
  const city = lead.city ?? "";
  return template
    .replace(/\{\{first_name\}\}/gi, firstName)
    .replace(/\{\{business_name\}\}/gi, businessName)
    .replace(/\{\{city\}\}/gi, city);
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  return digits.startsWith("+") ? raw : `+${digits}`;
}

function getRandomDelay(): number {
  return Math.floor(Math.random() * (300_000 - 60_000 + 1)) + 60_000;
}

function estimateTime(leadCount: number, numNumbers: number): string {
  const parallel = Math.max(1, numNumbers);
  const perQueue = Math.ceil(leadCount / parallel);
  const minMin = perQueue * 1;
  const maxMin = perQueue * 5;
  if (maxMin < 60) return `${minMin}–${maxMin} min`;
  const minH = (minMin / 60).toFixed(1);
  const maxH = (maxMin / 60).toFixed(1);
  return `${minH}–${maxH} hrs`;
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; label: string }> = {
    running: { bg: "oklch(0.55 0.16 145)", label: "Running" },
    paused: { bg: "oklch(0.65 0.15 85)", label: "Paused" },
    completed: { bg: "oklch(0.55 0.02 264)", label: "Completed" },
    stopped: { bg: "oklch(0.5 0.18 27)", label: "Stopped" },
  };
  const s = styles[status];
  if (s) {
    return (
      <Badge
        className="text-xs font-medium"
        style={{ background: s.bg, color: "white" }}
      >
        {s.label}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="text-xs">
      {status}
    </Badge>
  );
}

// ── Token chip component ──────────────────────────────────────────────────────

function TokenChip({ token }: { token: string }) {
  return (
    <code
      className="px-2 py-0.5 rounded-md text-xs font-mono cursor-pointer select-all"
      style={{
        background: "oklch(0.94 0.03 264)",
        color: "oklch(0.32 0.15 264)",
        border: "1px solid oklch(0.85 0.06 264)",
      }}
    >
      {token}
    </code>
  );
}

// ── Birthday Drip Card ────────────────────────────────────────────────────────

function BirthdayDripCard() {
  const { data: config, isLoading } = useGetBirthdayDripConfig();
  const saveMut = useSetBirthdayDripConfig();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localTemplate, setLocalTemplate] = useState("");
  const [localActive, setLocalActive] = useState(false);

  // Sync from server once loaded
  useEffect(() => {
    if (config) {
      setLocalTemplate(config.template);
      setLocalActive(config.isActive);
    }
  }, [config]);

  const handleToggleActive = async (checked: boolean) => {
    setLocalActive(checked);
    try {
      await saveMut.mutateAsync({ isActive: checked, template: localTemplate });
      toast.success(
        checked ? "Birthday Drip activated" : "Birthday Drip paused",
      );
    } catch (err) {
      setLocalActive(!checked);
      toast.error((err as Error).message);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      await saveMut.mutateAsync({
        isActive: localActive,
        template: localTemplate,
      });
      toast.success("Birthday template saved!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <Card
      className="border"
      style={{ borderColor: "oklch(0.88 0.06 27)" }}
      data-ocid="drip.birthday_drip.card"
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "oklch(0.97 0.02 27)" }}
      >
        <button
          type="button"
          className="flex items-center gap-3 flex-1 text-left min-w-0"
          onClick={() => setIsExpanded((v) => !v)}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            <span className="text-base" aria-hidden="true">
              🎂
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Birthday Drip
            </p>
            <p className="text-xs text-muted-foreground">
              Auto-send a birthday text to leads on their special day
            </p>
          </div>
        </button>
        <div
          className="flex items-center gap-3 shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          {isLoading ? (
            <Skeleton className="w-10 h-5 rounded-full" />
          ) : (
            <Switch
              checked={localActive}
              onCheckedChange={(checked) => {
                handleToggleActive(checked);
              }}
              data-ocid="drip.birthday_drip.toggle"
              aria-label="Toggle Birthday Drip"
            />
          )}
          <span className="text-muted-foreground p-1" aria-hidden="true">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </div>
      </div>

      {isExpanded && (
        <CardContent className="px-4 pb-4 pt-3 flex flex-col gap-3">
          {/* Status */}
          <div
            className="rounded-lg px-3 py-2 text-xs"
            style={{
              background: localActive
                ? "oklch(0.96 0.04 145)"
                : "oklch(0.96 0 0)",
              color: localActive ? "oklch(0.35 0.15 145)" : "oklch(0.45 0 0)",
              border: `1px solid ${localActive ? "oklch(0.88 0.08 145)" : "oklch(0.88 0 0)"}`,
            }}
          >
            Birthday Drip is{" "}
            <strong>{localActive ? "active" : "inactive"}</strong>.{" "}
            {localActive
              ? "When active, Tele-Blast sends your birthday message to each lead on their birthday at a random time during the day to keep it looking natural."
              : "Enable the toggle above to start sending birthday texts automatically."}
          </div>

          {/* Template textarea */}
          <div>
            <Label className="text-sm font-medium mb-1.5 block">
              Birthday SMS Template
            </Label>
            <textarea
              rows={3}
              placeholder="Hey {{first_name}}, wishing you a wonderful birthday! 🎂 — [Your Name]"
              value={localTemplate}
              onChange={(e) => setLocalTemplate(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="drip.birthday_drip.template_input"
            />
          </div>

          {/* Token chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              Personalization:
            </span>
            <TokenChip token="{{first_name}}" />
            <TokenChip token="{{last_name}}" />
            <TokenChip token="{{business_name}}" />
          </div>

          <Button
            onClick={handleSaveTemplate}
            disabled={saveMut.isPending || !localTemplate.trim()}
            size="sm"
            style={{ background: "oklch(0.56 0.16 44)", color: "white" }}
            className="self-start"
            data-ocid="drip.birthday_drip.save_button"
          >
            {saveMut.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Saving…
              </>
            ) : (
              "Save Birthday Template"
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

// ── SMS Spin Panel (Step 2) ───────────────────────────────────────────────────

interface SpinPanelProps {
  originalMessage: string;
  onSelectVersion: (version: string) => void;
  hasAi: boolean;
}

function SpinPanel({
  originalMessage,
  onSelectVersion,
  hasAi,
}: SpinPanelProps) {
  const [enabled, setEnabled] = useState(false);
  const [numVersions, setNumVersions] = useState(3);
  const [versions, setVersions] = useState<string[]>([]);
  const spinMut = useSpinSms();

  // Only available on $45+ AI plans — hide entirely for $30 users
  if (!hasAi) return null;

  const handleGenerate = async () => {
    if (!originalMessage.trim()) {
      toast.error("Please write or select a message first");
      return;
    }
    try {
      const result = await spinMut.mutateAsync({
        originalMessage,
        numVersions,
      });
      setVersions(result);
      toast.success(`${result.length} versions generated!`);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "oklch(0.88 0.04 264)" }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "oklch(0.97 0.015 264)" }}
      >
        <label
          htmlFor="spin-checkbox"
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <Checkbox
            id="spin-checkbox"
            checked={enabled}
            onCheckedChange={(v) => {
              setEnabled(!!v);
              if (!v) setVersions([]);
            }}
            data-ocid="drip.builder.spin_checkbox"
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.22 0.12 264)" }}
            >
              Spin this SMS
            </p>
            <p className="text-xs text-muted-foreground">
              Generate multiple variations with Claude AI (1 tAI token)
            </p>
          </div>
        </label>
        <Sparkles
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.56 0.16 44)" }}
        />
      </div>

      {/* Controls */}
      {enabled && (
        <div
          className="px-4 py-3 flex flex-col gap-3 border-t"
          style={{ borderColor: "oklch(0.88 0.04 264)" }}
        >
          <div className="flex items-center gap-3">
            <Label htmlFor="num-versions" className="text-sm whitespace-nowrap">
              How many versions?
            </Label>
            <Input
              id="num-versions"
              type="number"
              min={2}
              max={10}
              value={numVersions}
              onChange={(e) =>
                setNumVersions(
                  Math.max(2, Math.min(10, Number(e.target.value))),
                )
              }
              className="w-20"
              data-ocid="drip.builder.spin_count_input"
            />
            <span className="text-xs text-muted-foreground">(max 10)</span>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={spinMut.isPending || !originalMessage.trim()}
            size="sm"
            style={{ background: "oklch(0.32 0.15 264)", color: "white" }}
            className="self-start"
            data-ocid="drip.builder.spin_generate_button"
          >
            {spinMut.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Generating {numVersions} variations with Claude…
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Generate Versions with AI
              </>
            )}
          </Button>

          {/* Generated versions */}
          {versions.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {versions.length} versions — click to use
              </p>
              {versions.map((v, i) => (
                <div
                  key={`spin-version-${i}-${v.slice(0, 20)}`}
                  className="rounded-lg border p-3 text-sm"
                  style={{
                    borderColor: "oklch(0.91 0 0)",
                    background: "oklch(0.99 0 0)",
                  }}
                  data-ocid={`drip.builder.spin_version.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Version {i + 1}
                      </p>
                      <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                        {v}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectVersion(v)}
                      className="shrink-0 text-xs"
                      data-ocid={`drip.builder.spin_use_version.${i + 1}`}
                    >
                      Use this
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Drip Execution Engine ─────────────────────────────────────────────────────

interface QueueState {
  campaignId: bigint;
  queues: bigint[][];
  twilioNumbers: TwilioNumber[];
  templateBody: string;
  templateVersions: string[];
  leads: Lead[];
  onSent: (campaignId: bigint, leadId: bigint, body: string) => void;
  onFailed: (campaignId: bigint, leadId: bigint) => void;
  onDone: () => void;
}

function startDripQueue(state: QueueState): () => void {
  const {
    campaignId,
    queues,
    twilioNumbers,
    templateBody,
    templateVersions,
    leads,
    onSent,
    onFailed,
    onDone,
  } = state;
  let stopped = false;
  let globalIndex = 0;

  const leadMap = new Map<string, Lead>(leads.map((l) => [l.id.toString(), l]));

  function getBodyForIndex(idx: number): string {
    if (templateVersions.length > 1) {
      return templateVersions[idx % templateVersions.length];
    }
    return templateBody;
  }

  async function processQueue(queueIndex: number): Promise<void> {
    const queue = queues[queueIndex];
    const number = twilioNumbers[queueIndex];
    if (!number || !queue) return;

    while (queue.length > 0 && !stopped) {
      const leadId = queue.shift();
      if (leadId === undefined) break;

      const lead = leadMap.get(leadId.toString());
      if (!lead || !lead.phone) {
        onFailed(campaignId, leadId);
        continue;
      }

      const myIndex = globalIndex++;
      const body = personalize(getBodyForIndex(myIndex), lead);
      const to = formatPhone(lead.phone);
      const from = formatPhone(number.phoneNumber);

      try {
        const formData = new URLSearchParams();
        formData.append("To", to);
        formData.append("From", from);
        formData.append("Body", body);

        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${number.accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${number.accountSid}:${number.authToken}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          },
        );

        if (res.ok) {
          onSent(campaignId, leadId, body);
        } else {
          const errText = await res.text().catch(() => "unknown");
          console.error("Twilio error:", errText);
          onFailed(campaignId, leadId);
        }
      } catch (err) {
        console.error("Drip send error:", err);
        onFailed(campaignId, leadId);
      }

      if (queue.length > 0 && !stopped) {
        await new Promise<void>((resolve) => {
          const timer = setTimeout(resolve, getRandomDelay());
          void timer;
        });
      }
    }
  }

  const promises = queues.map((_, i) => processQueue(i));
  Promise.all(promises).then(() => {
    if (!stopped) onDone();
  });

  return () => {
    stopped = true;
  };
}

// ── Campaign Detail Panel ─────────────────────────────────────────────────────

function CampaignDetail({
  campaign,
  leads,
  onClose,
}: {
  campaign: DripCampaignView;
  leads: Lead[];
  onClose: () => void;
}) {
  const pauseMut = usePauseDripCampaign();
  const resumeMut = useResumeDripCampaign();
  const stopMut = useStopDripCampaign();
  const deleteMut = useDeleteDripCampaign();

  const leadMap = useMemo(
    () => new Map<string, Lead>(leads.map((l) => [l.id.toString(), l])),
    [leads],
  );

  const sentSet = new Set(campaign.sentLeadIds.map((n) => n.toString()));
  const failedSet = new Set(campaign.failedLeadIds.map((n) => n.toString()));
  const allLeadIds = [
    ...campaign.leadIds,
    ...campaign.sentLeadIds,
    ...campaign.failedLeadIds,
  ];

  const handleDelete = async () => {
    if (!confirm("Delete this campaign? This cannot be undone.")) return;
    await deleteMut.mutateAsync(campaign.id);
    onClose();
    toast.success("Campaign deleted");
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
        aria-label="Close campaign detail"
      />
      <div
        className="relative mt-auto md:m-auto w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
        style={{ background: "white" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "oklch(0.91 0 0)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-foreground truncate">
              {campaign.name}
            </h2>
            <StatusBadge status={campaign.status} />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {campaign.status === "running" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => pauseMut.mutate(campaign.id)}
                disabled={pauseMut.isPending}
                data-ocid="drip.campaign.pause_button"
              >
                <Pause className="w-3.5 h-3.5 mr-1" />
                Pause
              </Button>
            )}
            {campaign.status === "paused" && (
              <Button
                size="sm"
                onClick={() => resumeMut.mutate(campaign.id)}
                disabled={resumeMut.isPending}
                style={{ background: "oklch(0.32 0.15 264)", color: "white" }}
                data-ocid="drip.campaign.resume_button"
              >
                <Play className="w-3.5 h-3.5 mr-1" />
                Resume
              </Button>
            )}
            {(campaign.status === "running" ||
              campaign.status === "paused") && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => stopMut.mutate(campaign.id)}
                disabled={stopMut.isPending}
                data-ocid="drip.campaign.stop_button"
              >
                <Square className="w-3.5 h-3.5 mr-1" />
                Stop
              </Button>
            )}
            {(campaign.status === "completed" ||
              campaign.status === "stopped") && (
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={handleDelete}
                disabled={deleteMut.isPending}
                data-ocid="drip.campaign.delete_button"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-3 px-5 py-4 border-b"
          style={{ borderColor: "oklch(0.91 0 0)" }}
        >
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "oklch(0.32 0.15 264)" }}
            >
              {allLeadIds.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Leads</p>
          </div>
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "oklch(0.55 0.16 145)" }}
            >
              {campaign.sentLeadIds.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Sent</p>
          </div>
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: "oklch(0.5 0.18 27)" }}
            >
              {campaign.failedLeadIds.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Failed</p>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto divide-y"
          style={{ borderColor: "oklch(0.93 0 0)" }}
        >
          {allLeadIds.length === 0 ? (
            <p className="text-center text-muted-foreground py-10 text-sm">
              No leads in this campaign.
            </p>
          ) : (
            allLeadIds.map((lid, i) => {
              const lead = leadMap.get(lid.toString());
              const isSent = sentSet.has(lid.toString());
              const isFailed = failedSet.has(lid.toString());
              const isPending = !isSent && !isFailed;
              return (
                <div
                  key={lid.toString()}
                  className="flex items-center justify-between px-5 py-3"
                  data-ocid={`drip.lead_row.${i + 1}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {lead?.name ||
                        [lead?.firstName, lead?.lastName]
                          .filter(Boolean)
                          .join(" ") ||
                        lead?.phone ||
                        `Lead #${lid.toString()}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lead?.phone ?? "—"}
                    </p>
                  </div>
                  {isSent && (
                    <div
                      className="flex items-center gap-1 text-xs shrink-0"
                      style={{ color: "oklch(0.55 0.16 145)" }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Sent</span>
                    </div>
                  )}
                  {isFailed && (
                    <div
                      className="flex items-center gap-1 text-xs shrink-0"
                      style={{ color: "oklch(0.5 0.18 27)" }}
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Failed</span>
                    </div>
                  )}
                  {isPending && (
                    <div className="flex items-center gap-1 text-xs shrink-0 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Pending</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ── Campaign Builder ──────────────────────────────────────────────────────────

type BuilderStep = 1 | 2 | 3;

interface BuilderState {
  selectedLeadIds: Set<string>;
  templateId: string;
  templateBody: string;
  campaignName: string;
  spinVersions: string[];
}

function CampaignBuilder({
  onCancel,
  onLaunched,
  leads,
  templates,
  twilioNumbers,
  hasAi,
}: {
  onCancel: () => void;
  onLaunched: (campaign: DripCampaignView, versions: string[]) => void;
  leads: Lead[];
  templates: SmsTemplate[];
  twilioNumbers: TwilioNumber[];
  hasAi: boolean;
}) {
  const [step, setStep] = useState<BuilderStep>(1);
  const [state, setState] = useState<BuilderState>({
    selectedLeadIds: new Set(),
    templateId: "",
    templateBody: "",
    campaignName: "",
    spinVersions: [],
  });
  const [search, setSearch] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState<string>("all");
  const { data: pipelines = [] } = useGetPipelines();
  const createMut = useCreateDripCampaign();

  const filteredLeads = useMemo(() => {
    let list = leads.filter((l) => l.phone);
    if (pipelineFilter !== "all") {
      const pid = BigInt(pipelineFilter);
      list = list.filter((l) => l.pipelineId === pid);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          (l.name ?? "").toLowerCase().includes(q) ||
          (l.firstName ?? "").toLowerCase().includes(q) ||
          (l.phone ?? "").includes(q),
      );
    }
    return list;
  }, [leads, search, pipelineFilter]);

  const toggleLead = (id: string) => {
    setState((prev) => {
      const next = new Set(prev.selectedLeadIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, selectedLeadIds: next };
    });
  };

  const toggleAll = () => {
    const allFiltered = new Set(filteredLeads.map((l) => l.id.toString()));
    const allSelected = filteredLeads.every((l) =>
      state.selectedLeadIds.has(l.id.toString()),
    );
    setState((prev) => {
      const next = new Set(prev.selectedLeadIds);
      if (allSelected) {
        for (const id of allFiltered) next.delete(id);
      } else {
        for (const id of allFiltered) next.add(id);
      }
      return { ...prev, selectedLeadIds: next };
    });
  };

  const activeBody = state.templateId
    ? (templates.find((t) => t.id === state.templateId)?.body ?? "")
    : state.templateBody;

  const selectedTemplate = templates.find((t) => t.id === state.templateId);
  const firstSelectedLead = useMemo(() => {
    for (const id of state.selectedLeadIds) {
      const l = leads.find((lead) => lead.id.toString() === id);
      if (l) return l;
    }
    return null;
  }, [state.selectedLeadIds, leads]);

  const previewBody = selectedTemplate
    ? personalize(selectedTemplate.body, firstSelectedLead ?? ({} as Lead))
    : "";

  const handleLaunch = async () => {
    if (!state.campaignName.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }
    const leadIds = Array.from(state.selectedLeadIds).map((id) => BigInt(id));
    const tmpl = templates.find((t) => t.id === state.templateId);
    try {
      const campaign = await createMut.mutateAsync({
        name: state.campaignName,
        templateId: state.templateId,
        templateBody: tmpl?.body ?? state.templateBody,
        leadIds,
      });
      toast.success(`Campaign "${campaign.name}" created!`);
      onLaunched(campaign, state.spinVersions);
    } catch (err) {
      toast.error(`Failed to create campaign: ${(err as Error).message}`);
    }
  };

  const canGoNext = () => {
    if (step === 1) return state.selectedLeadIds.size > 0;
    if (step === 2)
      return !!state.templateId || state.templateBody.trim().length > 0;
    return true;
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Progress steps */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "oklch(0.91 0 0)" }}
      >
        {([1, 2, 3] as BuilderStep[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{
                background:
                  step >= s ? "oklch(0.32 0.15 264)" : "oklch(0.92 0 0)",
                color: step >= s ? "white" : "oklch(0.48 0 0)",
              }}
            >
              {s}
            </div>
            <span
              className="text-xs font-medium hidden sm:block"
              style={{
                color: step === s ? "oklch(0.32 0.15 264)" : "oklch(0.48 0 0)",
              }}
            >
              {s === 1
                ? "Select Leads"
                : s === 2
                  ? "Choose Template"
                  : "Review & Launch"}
            </span>
            {s < 3 && (
              <ChevronRight className="w-3 h-3 text-muted-foreground mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Lead Selection */}
      {step === 1 && (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leads…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="drip.builder.search_input"
              />
            </div>
            <select
              value={pipelineFilter}
              onChange={(e) => setPipelineFilter(e.target.value)}
              className="input-field text-sm"
              style={{ minWidth: 120 }}
              data-ocid="drip.builder.pipeline_select"
            >
              <option value="all">All Pipelines</option>
              {pipelines.map((p) => (
                <option key={p.id.toString()} value={p.id.toString()}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleAll}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              data-ocid="drip.builder.select_all_toggle"
            >
              <Checkbox
                checked={
                  filteredLeads.length > 0 &&
                  filteredLeads.every((l) =>
                    state.selectedLeadIds.has(l.id.toString()),
                  )
                }
                onCheckedChange={toggleAll}
              />
              Select all ({filteredLeads.length})
            </button>
            <Badge
              variant="secondary"
              className="text-xs"
              data-ocid="drip.builder.selected_count"
            >
              {state.selectedLeadIds.size} selected
            </Badge>
          </div>

          <div
            className="border rounded-xl overflow-y-auto divide-y divide-border"
            style={{ maxHeight: 320, borderColor: "oklch(0.91 0 0)" }}
            data-ocid="drip.builder.lead_list"
          >
            {filteredLeads.length === 0 ? (
              <div
                className="flex flex-col items-center py-10 text-muted-foreground gap-2"
                data-ocid="drip.builder.empty_state"
              >
                <Users className="w-8 h-8 opacity-30" />
                <p className="text-sm">No leads with phone numbers found.</p>
              </div>
            ) : (
              filteredLeads.map((lead, i) => {
                const isChecked = state.selectedLeadIds.has(lead.id.toString());
                const checkboxId = `drip-lead-${lead.id.toString()}`;
                return (
                  <label
                    key={lead.id.toString()}
                    htmlFor={checkboxId}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                    data-ocid={`drip.builder.lead_item.${i + 1}`}
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={isChecked}
                      onCheckedChange={() => toggleLead(lead.id.toString())}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {lead.name ||
                          `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() ||
                          lead.phone ||
                          "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lead.phone}
                      </p>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Step 2 — Template + Spin */}
      {step === 2 && (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Choose a Saved SMS Template
            </Label>
            {templates.length === 0 ? (
              <div
                className="rounded-xl border p-4 text-center text-muted-foreground text-sm"
                style={{ borderColor: "oklch(0.91 0 0)" }}
                data-ocid="drip.builder.no_templates_state"
              >
                No SMS templates yet. Write a custom message below, or create
                one in the Templates tab first.
              </div>
            ) : (
              <div
                className="border rounded-xl overflow-y-auto divide-y"
                style={{ maxHeight: 180, borderColor: "oklch(0.91 0 0)" }}
                data-ocid="drip.builder.template_list"
              >
                {templates.map((t, i) => (
                  <label
                    key={t.id}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                    data-ocid={`drip.builder.template_item.${i + 1}`}
                  >
                    <input
                      type="radio"
                      name="drip-template"
                      value={t.id}
                      checked={state.templateId === t.id}
                      onChange={() =>
                        setState((prev) => ({
                          ...prev,
                          templateId: t.id,
                          templateBody: t.body,
                          spinVersions: [],
                        }))
                      }
                      className="mt-1 accent-primary"
                      data-ocid={`drip.builder.template_radio.${i + 1}`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {t.body}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Custom message */}
          <div>
            <Label className="text-sm font-medium mb-1.5 block">
              {templates.length > 0
                ? "Or write a custom message"
                : "Custom message"}
            </Label>
            <textarea
              rows={4}
              placeholder="Hi {{first_name}}, this is [Your Name] from [Company]…"
              value={state.templateId ? "" : state.templateBody}
              disabled={!!state.templateId}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  templateId: "",
                  templateBody: e.target.value,
                  spinVersions: [],
                }))
              }
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              data-ocid="drip.builder.custom_message_input"
            />
            {state.templateId && (
              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    templateId: "",
                    templateBody: "",
                    spinVersions: [],
                  }))
                }
                className="text-xs text-primary hover:underline mt-1"
                data-ocid="drip.builder.clear_template_button"
              >
                Clear selected template and write custom
              </button>
            )}
          </div>

          {selectedTemplate && firstSelectedLead && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.97 0.015 264)",
                borderColor: "oklch(0.88 0.04 264)",
              }}
            >
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Preview for{" "}
                {firstSelectedLead.name ??
                  firstSelectedLead.firstName ??
                  "first lead"}
              </p>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {previewBody}
              </p>
            </div>
          )}

          {/* Personalization tokens */}
          <div
            className="rounded-xl p-3 border flex items-start gap-2"
            style={{
              background: "oklch(0.97 0.01 85)",
              borderColor: "oklch(0.90 0.04 85)",
            }}
          >
            <Info
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "oklch(0.56 0.16 44)" }}
            />
            <p className="text-xs text-muted-foreground">
              Use{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                {"{{first_name}}"}
              </code>
              ,{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                {"{{business_name}}"}
              </code>
              ,{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                {"{{city}}"}
              </code>{" "}
              for personalization.
            </p>
          </div>

          {/* SMS Spin — only for $45+ AI plans */}
          <SpinPanel
            originalMessage={activeBody}
            hasAi={hasAi}
            onSelectVersion={(v) =>
              setState((prev) => ({
                ...prev,
                templateId: "",
                templateBody: v,
                spinVersions:
                  prev.spinVersions.length > 0
                    ? [...prev.spinVersions, v]
                    : [v],
              }))
            }
          />
        </div>
      )}

      {/* Step 3 — Review & Launch */}
      {step === 3 && (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <Label className="text-sm font-medium mb-1.5 block">
              Campaign Name
            </Label>
            <Input
              placeholder="e.g. Q2 Roofing Follow-up"
              value={state.campaignName}
              onChange={(e) =>
                setState((prev) => ({ ...prev, campaignName: e.target.value }))
              }
              data-ocid="drip.builder.campaign_name_input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3 border"
              style={{
                borderColor: "oklch(0.91 0 0)",
                background: "oklch(0.98 0 0)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Users
                  className="w-4 h-4"
                  style={{ color: "oklch(0.32 0.15 264)" }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  Leads
                </span>
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: "oklch(0.22 0.12 264)" }}
              >
                {state.selectedLeadIds.size}
              </p>
            </div>
            <div
              className="rounded-xl p-3 border"
              style={{
                borderColor: "oklch(0.91 0 0)",
                background: "oklch(0.98 0 0)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Hash
                  className="w-4 h-4"
                  style={{ color: "oklch(0.56 0.16 44)" }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  Twilio #s
                </span>
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: "oklch(0.22 0.12 264)" }}
              >
                {twilioNumbers.length}
              </p>
            </div>
          </div>

          {state.spinVersions.length > 0 && (
            <div
              className="rounded-xl p-3 border flex items-center gap-2.5"
              style={{
                background: "oklch(0.97 0.015 264)",
                borderColor: "oklch(0.88 0.04 264)",
              }}
            >
              <Sparkles
                className="w-4 h-4 shrink-0"
                style={{ color: "oklch(0.56 0.16 44)" }}
              />
              <p className="text-xs" style={{ color: "oklch(0.22 0.12 264)" }}>
                <strong>{state.spinVersions.length} SMS spin versions</strong>{" "}
                will rotate through leads — each lead gets a different
                variation.
              </p>
            </div>
          )}

          <div
            className="rounded-xl p-3 border flex items-center gap-3"
            style={{
              background: "oklch(0.97 0.015 264)",
              borderColor: "oklch(0.88 0.04 264)",
            }}
          >
            <Clock
              className="w-4 h-4 shrink-0"
              style={{ color: "oklch(0.32 0.15 264)" }}
            />
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: "oklch(0.22 0.12 264)" }}
              >
                Estimated time:{" "}
                {estimateTime(state.selectedLeadIds.size, twilioNumbers.length)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Random 1–5 min delay between each text
              </p>
            </div>
          </div>

          <div
            className="rounded-xl p-3 border flex items-start gap-2"
            style={{
              background: "oklch(0.97 0.01 85)",
              borderColor: "oklch(0.90 0.04 85)",
            }}
          >
            <Info
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "oklch(0.56 0.16 44)" }}
            />
            <div className="text-xs text-muted-foreground space-y-1">
              {twilioNumbers.length <= 1 ? (
                <p>
                  <strong>1 Twilio number:</strong> texts go out one at a time
                  with a random 1–5 min delay.
                </p>
              ) : (
                <p>
                  <strong>{twilioNumbers.length} Twilio numbers:</strong> leads
                  split across all numbers in parallel.
                </p>
              )}
              <p>
                The campaign runs in your browser. Keep this tab open while
                active.
              </p>
            </div>
          </div>

          {twilioNumbers.length === 0 && (
            <div
              className="rounded-xl p-3 border flex items-center gap-2"
              style={{
                background: "oklch(0.97 0.02 27)",
                borderColor: "oklch(0.88 0.06 27)",
              }}
            >
              <AlertTriangle
                className="w-4 h-4 shrink-0"
                style={{ color: "oklch(0.5 0.18 27)" }}
              />
              <p className="text-xs" style={{ color: "oklch(0.4 0.15 27)" }}>
                No Twilio numbers configured.{" "}
                <a href="/twilio-setup" className="underline font-medium">
                  Go to Phone/SMS Setup
                </a>{" "}
                to add one.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer nav */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t gap-3"
        style={{ borderColor: "oklch(0.91 0 0)" }}
      >
        <Button
          variant="ghost"
          onClick={
            step === 1 ? onCancel : () => setStep((s) => (s - 1) as BuilderStep)
          }
          data-ocid="drip.builder.back_button"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {step === 1 ? "Cancel" : "Back"}
        </Button>

        {step < 3 ? (
          <Button
            disabled={!canGoNext()}
            onClick={() => setStep((s) => (s + 1) as BuilderStep)}
            style={{ background: "oklch(0.32 0.15 264)", color: "white" }}
            data-ocid="drip.builder.next_button"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            disabled={
              createMut.isPending ||
              !state.campaignName.trim() ||
              twilioNumbers.length === 0 ||
              (!state.templateId && !state.templateBody.trim())
            }
            onClick={handleLaunch}
            style={{ background: "oklch(0.56 0.16 44)", color: "white" }}
            data-ocid="drip.builder.launch_button"
          >
            <Zap className="w-4 h-4 mr-1.5" />
            {createMut.isPending ? "Launching…" : "Launch Campaign"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Cell Phone Contact List ───────────────────────────────────────────────────

function CellPhoneContactList({
  leads,
  templates,
  onBack,
}: {
  leads: Lead[];
  templates: SmsTemplate[];
  onBack: () => void;
}) {
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(
    new Set(),
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [search, setSearch] = useState("");
  const { data: pipelines = [] } = useGetPipelines();
  const [pipelineFilter, setPipelineFilter] = useState<string>("all");
  const [step, setStep] = useState<1 | 2>(1);

  const filteredLeads = useMemo(() => {
    let list = leads.filter((l) => l.phone);
    if (pipelineFilter !== "all") {
      const pid = BigInt(pipelineFilter);
      list = list.filter((l) => l.pipelineId === pid);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          (l.name ?? "").toLowerCase().includes(q) ||
          (l.firstName ?? "").toLowerCase().includes(q) ||
          (l.phone ?? "").includes(q),
      );
    }
    return list;
  }, [leads, search, pipelineFilter]);

  const toggleLead = (id: string) => {
    setSelectedLeadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
  const selectedLeads = filteredLeads.filter((l) =>
    selectedLeadIds.has(l.id.toString()),
  );

  if (step === 2 && selectedLeads.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">
            Contact List ({selectedLeads.length} leads)
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep(1)}
            data-ocid="drip.cell_phone.back_button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        {selectedTemplate && (
          <div
            className="rounded-xl p-3 border text-sm"
            style={{
              background: "oklch(0.97 0.01 264)",
              borderColor: "oklch(0.88 0.04 264)",
            }}
          >
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
              Message template
            </p>
            <p className="text-sm text-foreground">{selectedTemplate.body}</p>
          </div>
        )}

        <div
          className="border rounded-xl divide-y"
          style={{ borderColor: "oklch(0.91 0 0)" }}
          data-ocid="drip.cell_phone.contact_list"
        >
          {selectedLeads.map((lead, i) => (
            <div
              key={lead.id.toString()}
              className="flex items-center justify-between px-4 py-3"
              data-ocid={`drip.cell_phone.contact.${i + 1}`}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {lead.name ||
                    `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() ||
                    "—"}
                </p>
                <a
                  href={`sms:${lead.phone}`}
                  className="text-sm font-mono hover:underline"
                  style={{ color: "oklch(0.32 0.15 264)" }}
                >
                  {lead.phone}
                </a>
              </div>
              <a
                href={`sms:${lead.phone}${selectedTemplate ? `?body=${encodeURIComponent(personalize(selectedTemplate.body, lead))}` : ""}`}
                className="shrink-0"
              >
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid={`drip.cell_phone.text_button.${i + 1}`}
                >
                  <Smartphone className="w-3.5 h-3.5 mr-1" />
                  Open in SMS
                </Button>
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Tap a phone number or the Text button to open your messaging app. Each
          message must be sent manually.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Select Leads & Template
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          data-ocid="drip.cell_phone.cancel_button"
        >
          Cancel
        </Button>
      </div>

      {/* Lead selection */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="drip.cell_phone.search_input"
          />
        </div>
        <select
          value={pipelineFilter}
          onChange={(e) => setPipelineFilter(e.target.value)}
          className="input-field text-sm"
          style={{ minWidth: 120 }}
          data-ocid="drip.cell_phone.pipeline_select"
        >
          <option value="all">All Pipelines</option>
          {pipelines.map((p) => (
            <option key={p.id.toString()} value={p.id.toString()}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div
        className="border rounded-xl overflow-y-auto divide-y"
        style={{ maxHeight: 240, borderColor: "oklch(0.91 0 0)" }}
        data-ocid="drip.cell_phone.lead_list"
      >
        {filteredLeads.length === 0 ? (
          <div
            className="flex flex-col items-center py-8 text-muted-foreground gap-2"
            data-ocid="drip.cell_phone.empty_state"
          >
            <Users className="w-8 h-8 opacity-30" />
            <p className="text-sm">No leads with phone numbers.</p>
          </div>
        ) : (
          filteredLeads.map((lead, i) => {
            const isChecked = selectedLeadIds.has(lead.id.toString());
            const cbId = `cell-phone-lead-${lead.id.toString()}`;
            return (
              <label
                key={lead.id.toString()}
                htmlFor={cbId}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                data-ocid={`drip.cell_phone.lead_item.${i + 1}`}
              >
                <Checkbox
                  id={cbId}
                  checked={isChecked}
                  onCheckedChange={() => toggleLead(lead.id.toString())}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {lead.name ||
                      `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() ||
                      "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">{lead.phone}</p>
                </div>
              </label>
            );
          })
        )}
      </div>

      {/* Template selection */}
      <div>
        <Label className="text-sm font-medium mb-1.5 block">
          Choose a template (optional)
        </Label>
        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="input-field text-sm w-full"
          data-ocid="drip.cell_phone.template_select"
        >
          <option value="">No template — just contact list</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        disabled={selectedLeadIds.size === 0}
        onClick={() => setStep(2)}
        style={{ background: "oklch(0.32 0.15 264)", color: "white" }}
        data-ocid="drip.cell_phone.view_list_button"
      >
        <Users className="w-4 h-4 mr-1.5" />
        View Contact List ({selectedLeadIds.size})
      </Button>
    </div>
  );
}

// ── Sending Method Selector ───────────────────────────────────────────────────

interface MethodCardProps {
  value: SendMethod;
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  ocid: string;
}

function MethodCard({
  value,
  selected,
  onSelect,
  icon,
  title,
  description,
  ocid,
}: MethodCardProps) {
  void value;
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex-1 text-left rounded-xl border-2 p-4 transition-all"
      style={{
        borderColor: selected ? "oklch(0.32 0.15 264)" : "oklch(0.88 0 0)",
        background: selected ? "oklch(0.97 0.015 264)" : "white",
      }}
      data-ocid={ocid}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: selected ? "oklch(0.32 0.15 264)" : "oklch(0.94 0 0)",
          }}
        >
          <span style={{ color: selected ? "white" : "oklch(0.45 0 0)" }}>
            {icon}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p
              className="text-sm font-semibold"
              style={{
                color: selected ? "oklch(0.22 0.12 264)" : "oklch(0.35 0 0)",
              }}
            >
              {title}
            </p>
            {selected && (
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.32 0.15 264)" }}
              >
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DripPage() {
  const { data: campaigns = [], isLoading: campaignsLoading } =
    useDripCampaigns();
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: templates = [] } = useSmsTemplates();
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");

  const twilioNumbers = useMemo(() => loadTwilioNumbers(), []);

  // Sending method — persisted to localStorage
  const [sendMethod, setSendMethod] = useState<SendMethod>(() =>
    loadSendMethod(twilioNumbers),
  );

  const handleSetSendMethod = (method: SendMethod) => {
    setSendMethod(method);
    saveSendMethod(method);
  };

  const [view, setView] = useState<"dashboard" | "builder" | "cell_phone_list">(
    "dashboard",
  );
  const [selectedCampaign, setSelectedCampaign] =
    useState<DripCampaignView | null>(null);

  // Active drip queue execution
  const stopFnRef = useRef<(() => void) | null>(null);
  const markSentMut = useMarkLeadSent();
  const markFailedMut = useMarkLeadFailed();
  const addTextRecord = useAddTextRecord();
  const { data: dripCampaigns } = useDripCampaigns();

  const startCampaignExecution = useCallback(
    (campaign: DripCampaignView, spinVersions: string[] = []) => {
      if (stopFnRef.current) {
        stopFnRef.current();
        stopFnRef.current = null;
      }

      const numNumbers = Math.max(1, twilioNumbers.length);
      const pending = [...campaign.leadIds];
      const queues: bigint[][] = Array.from({ length: numNumbers }, () => []);
      pending.forEach((lid, i) => {
        queues[i % numNumbers].push(lid);
      });

      const stop = startDripQueue({
        campaignId: campaign.id,
        queues,
        twilioNumbers,
        templateBody: campaign.templateBody,
        templateVersions: spinVersions,
        leads,
        onSent: (campaignId, leadId, body) => {
          markSentMut.mutate({ campaignId, leadId });
          addTextRecord.mutate({ leadId, messageBody: body });
        },
        onFailed: (campaignId, leadId) => {
          markFailedMut.mutate({ campaignId, leadId });
        },
        onDone: () => {
          toast.success("SMS Drip campaign completed!");
        },
      });

      stopFnRef.current = stop;
    },
    [twilioNumbers, leads, markSentMut, markFailedMut, addTextRecord],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: run on mount only
  useEffect(() => {
    const running = dripCampaigns?.find((c) => c.status === "running");
    if (running && running.leadIds.length > 0) {
      startCampaignExecution(running);
    }
    return () => {
      if (stopFnRef.current) {
        stopFnRef.current();
        stopFnRef.current = null;
      }
    };
  }, []);

  const handleLaunched = (campaign: DripCampaignView, versions: string[]) => {
    setView("dashboard");
    startCampaignExecution(campaign, versions);
    toast.info("SMS Drip campaign running! Keep this tab open.", {
      duration: 6000,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-5" data-ocid="drip.page">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.32 0.15 264)" }}
          >
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              SMS Drip
            </h1>
            <p className="text-xs text-muted-foreground">
              Automated SMS sequences with randomized timing
            </p>
          </div>
        </div>
        {view === "dashboard" && (
          <Button
            onClick={() =>
              setView(sendMethod === "twilio" ? "builder" : "cell_phone_list")
            }
            style={{ background: "oklch(0.56 0.16 44)", color: "white" }}
            className="shrink-0"
            data-ocid="drip.new_campaign_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Campaign
          </Button>
        )}
      </div>

      {/* ── Sending Method Selector ── */}
      {view === "dashboard" && (
        <div
          className="mb-5 flex flex-col gap-3"
          data-ocid="drip.send_method_section"
        >
          <p className="text-sm font-semibold text-foreground">
            Sending Method
          </p>
          <div className="flex gap-3" data-ocid="drip.send_method_toggle">
            <MethodCard
              value="twilio"
              selected={sendMethod === "twilio"}
              onSelect={() => handleSetSendMethod("twilio")}
              icon={<Zap className="w-4 h-4" />}
              title="Twilio (Automated)"
              description="Texts sent automatically with randomized delays"
              ocid="drip.method.twilio"
            />
            <MethodCard
              value="cell_phone"
              selected={sendMethod === "cell_phone"}
              onSelect={() => handleSetSendMethod("cell_phone")}
              icon={<Smartphone className="w-4 h-4" />}
              title="Cell Phone (Manual)"
              description="You send each text manually from your phone"
              ocid="drip.method.cell_phone"
            />
          </div>

          {/* Cell Phone info box */}
          {sendMethod === "cell_phone" && (
            <div
              className="rounded-xl p-4 border flex items-start gap-3"
              style={{
                background: "oklch(0.97 0.02 240)",
                borderColor: "oklch(0.85 0.05 240)",
              }}
              data-ocid="drip.cell_phone.info_box"
            >
              <Info
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: "oklch(0.4 0.15 240)" }}
              />
              <div className="text-sm text-muted-foreground space-y-1.5">
                <p
                  className="font-medium"
                  style={{ color: "oklch(0.3 0.12 240)" }}
                >
                  Manual sending via Cell Phone
                </p>
                <p>
                  <strong>
                    Cell phone mode requires you to send each text manually.
                  </strong>{" "}
                  After selecting your leads and template, you'll get a contact
                  list. Tap the "Open in SMS" button next to each lead to open
                  your messages app with the text ready to send — then hit send
                  yourself.
                </p>
                <p className="text-xs">
                  This is useful when you don't have a Twilio account, prefer
                  iMessage delivery, or want full control over each message
                  before it goes out.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Cell Phone Contact List View ── */}
      {view === "cell_phone_list" && (
        <Card data-ocid="drip.cell_phone.card">
          <CardHeader className="pb-0 pt-4 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone
                className="w-4 h-4"
                style={{ color: "oklch(0.32 0.15 264)" }}
              />
              Cell Phone — Manual Send
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 mt-2">
            <CellPhoneContactList
              leads={leads}
              templates={templates}
              onBack={() => setView("dashboard")}
            />
          </CardContent>
        </Card>
      )}

      {/* ── Twilio Campaign Builder ── */}
      {view === "builder" && (
        <Card data-ocid="drip.builder.card">
          <CardHeader className="pb-0 pt-4 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus
                className="w-4 h-4"
                style={{ color: "oklch(0.56 0.16 44)" }}
              />
              New SMS Drip Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <CampaignBuilder
              onCancel={() => setView("dashboard")}
              onLaunched={handleLaunched}
              leads={leads}
              templates={templates}
              twilioNumbers={twilioNumbers}
              hasAi={hasAi}
            />
          </CardContent>
        </Card>
      )}

      {/* ── Dashboard ── */}
      {view === "dashboard" && (
        <>
          {/* Twilio campaign list */}
          {sendMethod === "twilio" && (
            <>
              <div
                className="flex flex-col gap-3 mb-5"
                data-ocid="drip.campaign_list"
              >
                {campaignsLoading || leadsLoading ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                  </div>
                ) : campaigns.length === 0 ? (
                  <div
                    className="rounded-2xl border flex flex-col items-center justify-center py-16 text-center gap-4"
                    style={{
                      borderColor: "oklch(0.91 0 0)",
                      borderStyle: "dashed",
                    }}
                    data-ocid="drip.empty_state"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "oklch(0.32 0.15 264 / 0.08)" }}
                    >
                      <Droplets
                        className="w-7 h-7"
                        style={{ color: "oklch(0.32 0.15 264)" }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        No campaigns yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Create your first SMS Drip campaign to start sending
                        automated text sequences.
                      </p>
                    </div>
                    <Button
                      onClick={() => setView("builder")}
                      style={{
                        background: "oklch(0.56 0.16 44)",
                        color: "white",
                      }}
                      data-ocid="drip.empty_state_create_button"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Create Campaign
                    </Button>
                  </div>
                ) : (
                  campaigns.map((campaign, i) => {
                    const totalLeads =
                      campaign.leadIds.length +
                      campaign.sentLeadIds.length +
                      campaign.failedLeadIds.length;
                    const sent = campaign.sentLeadIds.length;
                    const pct =
                      totalLeads > 0
                        ? Math.round((sent / totalLeads) * 100)
                        : 0;
                    return (
                      <button
                        key={campaign.id.toString()}
                        type="button"
                        className="w-full text-left rounded-2xl border transition-all hover:shadow-md active:scale-[0.99]"
                        style={{
                          borderColor: "oklch(0.91 0 0)",
                          background: "white",
                        }}
                        onClick={() => setSelectedCampaign(campaign)}
                        data-ocid={`drip.campaign_item.${i + 1}`}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate">
                                {campaign.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {sent}/{totalLeads} sent
                                {campaign.startedAt != null && (
                                  <span className="ml-2">
                                    · Started{" "}
                                    {new Date(
                                      Number(campaign.startedAt) / 1_000_000,
                                    ).toLocaleDateString()}
                                  </span>
                                )}
                              </p>
                            </div>
                            <StatusBadge status={campaign.status} />
                          </div>
                          <div
                            className="w-full h-1.5 rounded-full overflow-hidden"
                            style={{ background: "oklch(0.92 0 0)" }}
                          >
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                background:
                                  campaign.status === "stopped"
                                    ? "oklch(0.5 0.18 27)"
                                    : campaign.status === "completed"
                                      ? "oklch(0.55 0.16 145)"
                                      : "oklch(0.32 0.15 264)",
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Birthday Drip (Twilio only) */}
              <BirthdayDripCard />
            </>
          )}
        </>
      )}

      {/* Campaign detail modal */}
      {selectedCampaign && (
        <CampaignDetail
          campaign={selectedCampaign}
          leads={leads}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
}
