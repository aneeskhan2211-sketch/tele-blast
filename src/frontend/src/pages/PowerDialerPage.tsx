import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Info,
  MessageSquare,
  Pause,
  Phone,
  PhoneCall,
  Play,
  RefreshCw,
  Send,
  ShieldOff,
  SkipForward,
  Voicemail,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { SmsTemplate } from "../backend";
import {
  useAddCallRecord,
  useAddTextRecord,
  useLeads,
  useSmsTemplates,
  useUpdateLead,
} from "../hooks/useLeads";
import { CallOutcome, PipelineStage } from "../types";
import type { Lead } from "../types";
import {
  handlePhoneCall,
  handleSmsSend,
  isGoogleVoiceEnabled,
} from "../utils/phoneActions";
import { mergeTags, spinText } from "../utils/textSpinner";
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

function loadTwilioNumbers(): TwilioNumber[] {
  try {
    const raw = localStorage.getItem(LS_NUMBERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TwilioNumber[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

function isRoundRobinEnabled(): boolean {
  try {
    return localStorage.getItem(LS_ROUND_ROBIN_KEY) === "true";
  } catch {
    return false;
  }
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type SessionMode = "call" | "text";
type Step =
  | "mode"
  | "template"
  | "select"
  | "session"
  | "disposition"
  | "summary";
type PhoneLinkHint = "call" | "text" | "gv-call" | "gv-text" | null;

interface OutcomeCounts {
  [CallOutcome.reached]: number;
  [CallOutcome.noAnswer]: number;
  [CallOutcome.leftVoicemail]: number;
}

const DISPOSITIONS = [
  "Answered",
  "No Answer",
  "Left Voicemail",
  "Callback Requested",
  "Not Interested",
  "Closed / Won",
] as const;

type Disposition = (typeof DISPOSITIONS)[number];

const DISPOSITION_COLORS: Record<Disposition, string> = {
  Answered:
    "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20",
  "No Answer":
    "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/20",
  "Left Voicemail":
    "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
  "Callback Requested":
    "bg-sky-500/10 text-sky-700 border-sky-500/30 hover:bg-sky-500/20",
  "Not Interested":
    "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Closed / Won":
    "bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25",
};

const DISPOSITION_ACTIVE_COLORS: Record<Disposition, string> = {
  Answered: "bg-emerald-500 text-white border-emerald-500",
  "No Answer": "bg-amber-500 text-white border-amber-500",
  "Left Voicemail": "bg-primary text-primary-foreground border-primary",
  "Callback Requested": "bg-sky-500 text-white border-sky-500",
  "Not Interested":
    "bg-destructive text-destructive-foreground border-destructive",
  "Closed / Won": "bg-emerald-600 text-white border-emerald-600",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STAGE_LABELS: Record<PipelineStage, string> = {
  [PipelineStage.Prospect]: "Prospect",
  [PipelineStage.Contacted]: "Contacted",
  [PipelineStage.Qualified]: "Qualified",
  [PipelineStage.ClosedWon]: "Closed Won",
  [PipelineStage.ClosedLost]: "Closed Lost",
};

const STAGE_COLORS: Record<PipelineStage, string> = {
  [PipelineStage.Prospect]: "bg-secondary text-secondary-foreground",
  [PipelineStage.Contacted]: "bg-primary/10 text-primary",
  [PipelineStage.Qualified]: "bg-accent/10 text-accent-foreground",
  [PipelineStage.ClosedWon]: "bg-accent/20 text-accent-foreground",
  [PipelineStage.ClosedLost]: "bg-destructive/10 text-destructive",
};

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

function wasCalledToday(lead: Lead): boolean {
  if (!lead.callHistory || lead.callHistory.length === 0) return false;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  return lead.callHistory.some((record) => {
    const tsMs = Number(record.timestamp) / 1_000_000;
    return tsMs >= todayStartMs;
  });
}

function formatNoteDate(date: Date): string {
  return date.toLocaleString(undefined, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function prependNote(existing: string, line: string): string {
  return existing ? `${line}\n${existing}` : line;
}

// ─── LeadRow ──────────────────────────────────────────────────────────────────

function LeadRow({
  lead,
  checked,
  onToggle,
  index,
}: {
  lead: Lead;
  checked: boolean;
  onToggle: (id: bigint) => void;
  index: number;
}) {
  const isDnc = lead.isDnc;
  return (
    <button
      type="button"
      className={`w-full flex items-center gap-3 px-4 py-3 min-h-[52px] border-b border-border last:border-0 transition-colors text-left ${
        isDnc
          ? "opacity-60 cursor-not-allowed bg-destructive/5"
          : checked
            ? "bg-primary/5 hover:bg-primary/8 active:bg-primary/10"
            : "hover:bg-muted/40 active:bg-muted/60"
      }`}
      onClick={() => !isDnc && onToggle(lead.id)}
      disabled={isDnc}
      title={isDnc ? "This lead is on the Do Not Call list" : undefined}
      data-ocid={`dialer.lead.${index}`}
    >
      <Checkbox
        checked={isDnc ? false : checked}
        onCheckedChange={() => !isDnc && onToggle(lead.id)}
        onClick={(e) => e.stopPropagation()}
        disabled={isDnc}
        className="shrink-0"
        data-ocid={`dialer.checkbox.${index}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <p className="font-medium text-foreground text-sm truncate">
            {lead.name}
          </p>
          {isDnc && (
            <span className="shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white">
              <ShieldOff className="w-3 h-3" />
              DNC
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {isDnc ? "Do Not Call — cannot be selected" : lead.industry}
          {!isDnc && (
            <span className="hidden xs:inline">
              {" "}
              · {formatPhone(lead.phone)}
            </span>
          )}
        </p>
      </div>
      {!isDnc && (
        <span className="text-sm text-foreground font-mono hidden sm:block shrink-0">
          {formatPhone(lead.phone)}
        </span>
      )}
      {!isDnc && (
        <Badge
          className={`text-xs ${STAGE_COLORS[lead.pipelineStage]} border-0 hidden md:inline-flex shrink-0`}
        >
          {STAGE_LABELS[lead.pipelineStage]}
        </Badge>
      )}
    </button>
  );
}

// ─── ModeCard ─────────────────────────────────────────────────────────────────

function ModeCard({
  selected,
  onClick,
  icon,
  label,
  description,
  ocid,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`flex-1 flex items-center gap-3 px-4 py-5 rounded-xl border-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[72px] ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-primary/40 active:bg-muted/40"
      }`}
    >
      <span
        className={`shrink-0 ${selected ? "text-primary" : "text-muted-foreground"}`}
      >
        {icon}
      </span>
      <div>
        <p className="font-semibold text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {selected && (
        <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />
      )}
    </button>
  );
}

// ─── DispositionStep ──────────────────────────────────────────────────────────

function DispositionStep({
  lead,
  mode,
  defaultDisposition,
  onSave,
  onSkip,
  isSaving,
}: {
  lead: Lead;
  mode: SessionMode;
  defaultDisposition?: Disposition;
  onSave: (disposition: Disposition, followUpDate: string) => void;
  onSkip: () => void;
  isSaving: boolean;
}) {
  const [selected, setSelected] = useState<Disposition | null>(
    defaultDisposition ?? null,
  );
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    if (defaultDisposition) setSelected(defaultDisposition);
  }, [defaultDisposition]);

  const modeLabel = mode === "call" ? "call" : "text";

  return (
    <Card
      className="shadow-sm border-border"
      data-ocid="dialer.disposition_card"
    >
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-base font-semibold">
          How did the {modeLabel} go?
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          {lead.name} · {formatPhone(lead.phone)}
        </p>
      </CardHeader>
      <CardContent className="pt-5 pb-5 space-y-5">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Disposition
          </p>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
            data-ocid="dialer.disposition_options"
          >
            {DISPOSITIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelected(d)}
                data-ocid={`dialer.disposition_chip.${d.toLowerCase().replace(/[\s/]+/g, "_")}`}
                className={[
                  "px-3 py-2.5 rounded-lg border text-sm font-medium transition-all min-h-[44px] text-left",
                  selected === d
                    ? DISPOSITION_ACTIVE_COLORS[d]
                    : DISPOSITION_COLORS[d],
                ].join(" ")}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="dialer-followup-date"
            className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-2"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Set a follow-up date (optional)
          </label>
          <input
            id="dialer-followup-date"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring min-h-[44px]"
            data-ocid="dialer.followup_date_input"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1 gap-2 min-h-[48px] text-sm text-muted-foreground hover:text-foreground"
            onClick={onSkip}
            disabled={isSaving}
            data-ocid="dialer.disposition_skip_button"
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </Button>
          <Button
            className="flex-2 flex-1 gap-2 bg-primary text-white hover:bg-primary/90 min-h-[48px] text-sm font-semibold"
            onClick={() => onSave(selected ?? "No Answer", followUpDate)}
            disabled={isSaving}
            data-ocid="dialer.disposition_save_button"
          >
            {isSaving ? (
              <>Saving…</>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Save &amp; Next
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PowerDialerPage() {
  const { data: leads = [], isLoading } = useLeads();
  const { data: smsTemplates = [], isLoading: smsTplLoadingRaw } =
    useSmsTemplates();
  const smsTplTimedOutRef = useRef(false);
  const smsTplTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [smsTplTimedOut, setSmsTplTimedOut] = useState(false);
  useEffect(() => {
    if (smsTplLoadingRaw && !smsTplTimedOutRef.current) {
      smsTplTimerRef.current = setTimeout(() => {
        smsTplTimedOutRef.current = true;
        setSmsTplTimedOut(true);
      }, 10_000);
    } else if (!smsTplLoadingRaw) {
      if (smsTplTimerRef.current) clearTimeout(smsTplTimerRef.current);
      smsTplTimedOutRef.current = false;
      setSmsTplTimedOut(false);
    }
    return () => {
      if (smsTplTimerRef.current) clearTimeout(smsTplTimerRef.current);
    };
  }, [smsTplLoadingRaw]);
  const smsTplLoading = smsTplLoadingRaw && !smsTplTimedOut;
  const addCallRecord = useAddCallRecord();
  const addTextRecord = useAddTextRecord();
  const updateLead = useUpdateLead();

  const twilioNumbers = useMemo(() => loadTwilioNumbers(), []);
  const roundRobinEnabled = isRoundRobinEnabled() && twilioNumbers.length > 1;
  const rrIndexRef = useRef(0);

  const [mode, setMode] = useState<SessionMode>("call");
  const [step, setStep] = useState<Step>("mode");

  const [selectedSmsTemplate, setSelectedSmsTemplate] =
    useState<SmsTemplate | null>(null);
  const SMS_CUSTOM = "__custom__";
  const [smsTemplateChoice, setSmsTemplateChoice] =
    useState<string>(SMS_CUSTOM);

  const [spinVariations, setSpinVariations] = useState<string[]>([]);
  const [showSpinPanel, setShowSpinPanel] = useState(false);
  const [chosenVariation, setChosenVariation] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const [sessionLeads, setSessionLeads] = useState<Lead[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionTotalCount, setSessionTotalCount] = useState(0);
  const [outcomeCounts, setOutcomeCounts] = useState<OutcomeCounts>({
    [CallOutcome.reached]: 0,
    [CallOutcome.noAnswer]: 0,
    [CallOutcome.leftVoicemail]: 0,
  });
  const [textsSent, setTextsSent] = useState(0);

  const [messageBody, setMessageBody] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [awaitingOutcome, setAwaitingOutcome] = useState(false);

  const [pendingOutcome, setPendingOutcome] = useState<CallOutcome | null>(
    null,
  );
  const [pendingNotePrefix, setPendingNotePrefix] = useState("");
  const [isSavingDisposition, setIsSavingDisposition] = useState(false);

  // Detect web-only mode: non-standalone AND screen >= 768px
  const isWebOnly =
    typeof window !== "undefined" &&
    !window.matchMedia("(display-mode: standalone)").matches &&
    !(navigator as { standalone?: boolean }).standalone &&
    window.innerWidth >= 768;

  const [phoneLinkHint, setPhoneLinkHint] = useState<PhoneLinkHint>(null);

  const filteredLeads = useMemo(() => {
    // Always exclude leads called today from the selection list
    const notCalledToday = leads.filter((l) => !wasCalledToday(l));
    if (!searchQuery.trim()) return notCalledToday;
    const q = searchQuery.toLowerCase();
    return notCalledToday.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q) ||
        l.phone.includes(q),
    );
  }, [leads, searchQuery]);

  const toggleSelect = useCallback((id: bigint) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const key = id.toString();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const selectableLeads = filteredLeads.filter((l) => !l.isDnc);

  const toggleSelectAll = () => {
    if (
      selectedIds.size === selectableLeads.length &&
      selectableLeads.length > 0
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(selectableLeads.map((l) => l.id.toString())));
    }
  };

  // ── Navigation helpers ────────────────────────────────────────────────────

  const goToTemplate = () => {
    if (mode === "call") {
      setStep("select");
    } else {
      setStep("template");
    }
  };

  const goToSelect = () => setStep("select");

  const startSession = () => {
    const picked = leads.filter(
      (l) => selectedIds.has(l.id.toString()) && !l.isDnc && !wasCalledToday(l),
    );
    if (picked.length === 0) {
      setSessionLeads([]);
      setSessionIndex(0);
      setSessionTotalCount(0);
      setStep("session");
      return;
    }
    setSessionLeads(picked);
    setSessionTotalCount(picked.length);
    setSessionIndex(0);
    setOutcomeCounts({
      [CallOutcome.reached]: 0,
      [CallOutcome.noAnswer]: 0,
      [CallOutcome.leftVoicemail]: 0,
    });
    setTextsSent(0);

    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
    if (mode === "text" && smsTemplateChoice !== SMS_CUSTOM) {
      // Use chosen spin variation if the user picked one, otherwise use the template body
      const tpl = smsTemplates.find((t) => t.id === smsTemplateChoice);
      setMessageBody(chosenVariation ?? tpl?.body ?? lastMessage);
    } else {
      setMessageBody(lastMessage);
    }
    setStep("session");
  };

  const endSession = () => {
    setStep("mode");
    setSelectedIds(new Set());
    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
    setMessageBody("");
    setSelectedSmsTemplate(null);
    setSmsTemplateChoice(SMS_CUSTOM);
    setSpinVariations([]);
    setShowSpinPanel(false);
    setChosenVariation(null);
  };

  // Show summary — called when user explicitly clicks End Session during an active session
  const showSummaryAndEnd = () => {
    setStep("summary");
    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
  };

  const currentLead = sessionLeads[sessionIndex] ?? null;

  const advanceOrFinish = () => {
    // Remove the current lead from the session queue (it was just called/texted today)
    setSessionLeads((prev) => prev.filter((_, i) => i !== sessionIndex));
    // After removing, adjust index: if we removed the last item, clamp back.
    // Simplest: keep index the same — the next item slides into position.
    // If removed item was the last, sessionLeads will be empty and currentLead becomes null.
    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
    if (mode === "text" && smsTemplateChoice !== SMS_CUSTOM) {
      const tpl = smsTemplates.find((t) => t.id === smsTemplateChoice);
      if (tpl) setMessageBody(chosenVariation ?? tpl.body);
    }
    setStep("session");
  };

  // ── Note appending helper ──────────────────────────────────────────────────

  const appendNoteToLead = async (lead: Lead, noteLine: string) => {
    const updatedNotes = prependNote(lead.notes ?? "", noteLine);
    await updateLead.mutateAsync({
      id: lead.id,
      updates: { notes: updatedNotes },
    });
  };

  // ── Call flow ──────────────────────────────────────────────────────────────

  const handleCall = () => {
    if (!currentLead) return;
    const gvOn = isGoogleVoiceEnabled();
    handlePhoneCall(currentLead.phone, false, gvOn);
    setAwaitingOutcome(true);
    if (gvOn) setPhoneLinkHint("gv-call");
  };

  const handleOutcome = (outcome: CallOutcome) => {
    if (!currentLead) return;
    setOutcomeCounts((prev) => ({ ...prev, [outcome]: prev[outcome] + 1 }));
    const outcomeLabel =
      outcome === CallOutcome.reached
        ? "Reached"
        : outcome === CallOutcome.noAnswer
          ? "No Answer"
          : "Left Voicemail";
    setPendingOutcome(outcome);
    setPendingNotePrefix(outcomeLabel);
    setStep("disposition");
  };

  const handleDispositionSave = async (
    disposition: Disposition,
    followUpDate: string,
  ) => {
    if (!currentLead || pendingOutcome === null) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Call] Outcome: ${pendingNotePrefix} · Disposition: ${disposition} — ${formatNoteDate(new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: currentLead.id,
        outcome: pendingOutcome,
      });
      const updates: Record<string, unknown> = {
        notes: prependNote(currentLead.notes ?? "", noteLine),
      };
      if (followUpDate) updates.followUpDate = followUpDate;
      await updateLead.mutateAsync({
        id: currentLead.id,
        updates: updates as Parameters<
          typeof updateLead.mutateAsync
        >[0]["updates"],
      });
    } finally {
      setIsSavingDisposition(false);
      advanceOrFinish();
    }
  };

  const handleDispositionSkipCall = async () => {
    if (!currentLead || pendingOutcome === null) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Call] Outcome: ${pendingNotePrefix} — ${formatNoteDate(new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: currentLead.id,
        outcome: pendingOutcome,
      });
      await appendNoteToLead(currentLead, noteLine);
    } finally {
      setIsSavingDisposition(false);
      advanceOrFinish();
    }
  };

  // ── Text flow ──────────────────────────────────────────────────────────────

  const handleSendText = async () => {
    if (!currentLead || !messageBody.trim()) return;
    // Replace merge tags with real lead data before sending
    const body = mergeTags(messageBody.trim(), currentLead);
    const gvOn = isGoogleVoiceEnabled();

    if (gvOn) {
      handleSmsSend(currentLead.phone, body, false, true, false);
      setPhoneLinkHint("gv-text");
    } else {
      let fromNumber: string | null = null;
      if (roundRobinEnabled && twilioNumbers.length > 1) {
        fromNumber =
          twilioNumbers[rrIndexRef.current % twilioNumbers.length].phoneNumber;
        rrIndexRef.current += 1;
      } else if (twilioNumbers.length === 1) {
        fromNumber = twilioNumbers[0].phoneNumber;
      }
      handleSmsSend(currentLead.phone, body, false, false, false);
      const fromNote = fromNumber ? ` (from ${fromNumber})` : "";
      const preview = body.length > 60 ? `${body.slice(0, 60)}...` : body;
      const noteLine = `[Text] ${preview}${fromNote} — ${formatNoteDate(new Date())}`;
      await addTextRecord.mutateAsync({
        leadId: currentLead.id,
        messageBody: body,
      });
      await appendNoteToLead(currentLead, noteLine);
      setTextsSent((n) => n + 1);
      advanceOrFinish();
      return;
    }

    setLastMessage(body);
    const preview = body.length > 60 ? `${body.slice(0, 60)}...` : body;
    const via = gvOn ? " (Google Voice)" : "";
    const noteLine = `[Text] ${preview}${via} — ${formatNoteDate(new Date())}`;
    await addTextRecord.mutateAsync({
      leadId: currentLead.id,
      messageBody: body,
    });
    await appendNoteToLead(currentLead, noteLine);
    setTextsSent((n) => n + 1);
    advanceOrFinish();
  };

  // Progress: how many have been removed (contacted) out of original total
  const contactedCount = sessionTotalCount - sessionLeads.length;
  const progressPercent =
    sessionTotalCount > 0 ? (contactedCount / sessionTotalCount) * 100 : 0;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-5 relative overflow-hidden">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Power Dialer
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a mode, configure, select leads, then run your session
          </p>
        </div>
      </div>

      {/* ── Step indicator ──────────────────────────────────────────────────── */}
      {step !== "summary" && step !== "disposition" && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          {(["mode", "template", "select", "session"] as Step[])
            .filter((s) => {
              if (s === "template" && mode !== "text") return false;
              return true;
            })
            .map((s, i, arr) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  className={`font-medium capitalize ${step === s ? "text-primary" : ""}`}
                >
                  {s === "template"
                    ? "Template"
                    : s === "select"
                      ? "Leads"
                      : s === "session"
                        ? "Session"
                        : "Mode"}
                </span>
                {i < arr.length - 1 && (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </span>
            ))}
        </div>
      )}

      {/* ── STEP: Mode Selection ──────────────────────────────────────────── */}
      {step === "mode" && (
        <Card className="shadow-sm border-border" data-ocid="dialer.mode_panel">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold">
              Choose Session Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 pb-5 space-y-4">
            <div className="flex flex-col gap-3">
              <ModeCard
                selected={mode === "call"}
                onClick={() => setMode("call")}
                icon={<Phone className="w-5 h-5" />}
                label="Call Session"
                description="Opens dialer for each lead, logs outcome"
                ocid="dialer.call_mode_toggle"
              />
              {!isWebOnly && (
                <ModeCard
                  selected={mode === "text"}
                  onClick={() => setMode("text")}
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="Text Session"
                  description="Pre-fills SMS for each lead with optional template"
                  ocid="dialer.text_mode_toggle"
                />
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button
                onClick={goToTemplate}
                data-ocid="dialer.mode_next_button"
                className="w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── STEP: Template Selection ─────────────────────────────────────── */}
      {step === "template" && mode === "text" && (
        <Card
          className="shadow-sm border-border"
          data-ocid="dialer.template_panel"
        >
          <CardHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base font-semibold">
                Select SMS Template
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("mode")}
                className="text-muted-foreground hover:text-foreground gap-1 shrink-0 h-9"
                data-ocid="dialer.template_back_button"
              >
                ← Back
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-5 pb-5 space-y-4">
            {smsTplLoading ? (
              <div
                className="space-y-3"
                data-ocid="dialer.sms_template_loading_state"
              >
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : smsTplTimedOut && smsTemplates.length === 0 ? (
              <div
                className="text-center py-6 text-muted-foreground"
                data-ocid="dialer.sms_template_error_state"
              >
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">Couldn't load templates.</p>
                <p className="text-xs mt-1">
                  You can still continue with a custom message.
                </p>
              </div>
            ) : (
              <div className="space-y-2" data-ocid="dialer.sms_template_list">
                <button
                  type="button"
                  onClick={() => {
                    setSmsTemplateChoice(SMS_CUSTOM);
                    setSelectedSmsTemplate(null);
                    setSpinVariations([]);
                    setShowSpinPanel(false);
                    setChosenVariation(null);
                  }}
                  data-ocid="dialer.sms_template_custom"
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    smsTemplateChoice === SMS_CUSTOM
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Custom Message
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Type a fresh message for each lead
                      </p>
                    </div>
                    {smsTemplateChoice === SMS_CUSTOM && (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </div>
                </button>
                {smsTemplates.map((tpl, i) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      setSmsTemplateChoice(tpl.id);
                      setSelectedSmsTemplate(tpl);
                      setSpinVariations([]);
                      setShowSpinPanel(false);
                      setChosenVariation(null);
                    }}
                    data-ocid={`dialer.sms_template.${i + 1}`}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      smsTemplateChoice === tpl.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {tpl.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {tpl.body}
                        </p>
                      </div>
                      {smsTemplateChoice === tpl.id && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <Button
                onClick={goToSelect}
                data-ocid="dialer.sms_template_next_button"
                className="w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold"
              >
                Next: Choose Leads
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── STEP: Lead Selection ─────────────────────────────────────────── */}
      {step === "select" && (
        <>
          {mode === "text" && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                Text Mode
              </Badge>
              {smsTemplateChoice !== SMS_CUSTOM && selectedSmsTemplate && (
                <Badge className="bg-muted text-foreground border-0 text-xs font-normal truncate max-w-[200px]">
                  Template: {selectedSmsTemplate.name}
                </Badge>
              )}
              {smsTemplateChoice === SMS_CUSTOM && (
                <Badge className="bg-muted text-muted-foreground border-0 text-xs font-normal">
                  Custom Message
                </Badge>
              )}
              {chosenVariation && (
                <Badge className="bg-primary/10 text-primary border-0 text-xs font-normal flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Spun version
                </Badge>
              )}
              <button
                type="button"
                onClick={() => setStep("template")}
                className="text-xs text-primary hover:underline"
                data-ocid="dialer.change_template_button"
              >
                Change
              </button>
            </div>
          )}

          <Card
            className="shadow-sm border-border"
            data-ocid="dialer.selection_panel"
          >
            <CardHeader className="pb-3 border-b border-border">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStep("mode")}
                      className="text-xs text-muted-foreground hover:text-foreground"
                      data-ocid="dialer.select_back_button"
                    >
                      ← Back
                    </button>
                    <CardTitle className="text-base font-semibold">
                      Choose Leads
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {selectedIds.size}
                      </span>{" "}
                      selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSelectAll}
                      className="shrink-0 h-9"
                      data-ocid="dialer.select_all_toggle"
                    >
                      {selectedIds.size === selectableLeads.length &&
                      selectableLeads.length > 0
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, industry, phone…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring h-11"
                  data-ocid="dialer.search_input"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-3" data-ocid="dialer.loading_state">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-14 w-full rounded" />
                  ))}
                </div>
              ) : filteredLeads.length === 0 ? (
                <div
                  className="py-12 text-center"
                  data-ocid="dialer.empty_state"
                >
                  <p className="text-muted-foreground text-sm">
                    No leads found. Add leads from the Leads page.
                  </p>
                </div>
              ) : (
                <div
                  className="max-h-[380px] sm:max-h-[420px] overflow-y-auto"
                  data-ocid="dialer.lead_list"
                >
                  {filteredLeads.map((lead, i) => (
                    <LeadRow
                      key={lead.id.toString()}
                      lead={lead}
                      checked={selectedIds.has(lead.id.toString())}
                      onToggle={toggleSelect}
                      index={i + 1}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedIds.size > 0 && (
            <div className="flex justify-end">
              <Button
                onClick={startSession}
                data-ocid="dialer.start_session_button"
                className="w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold"
              >
                <Zap className="w-4 h-4" />
                Start {mode === "call" ? "Call" : "Text"} Session (
                {selectedIds.size})
              </Button>
            </div>
          )}
        </>
      )}

      {/* ── STEP: Active Session ─────────────────────────────────────────── */}
      {step === "session" && sessionLeads.length === 0 && (
        <Card
          className="shadow-sm border-border"
          data-ocid="dialer.all_called_today_empty_state"
        >
          <CardContent className="pt-10 pb-10 flex flex-col items-center text-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.56 0.16 44 / 0.12)" }}
            >
              <Phone
                className="w-7 h-7"
                style={{ color: "oklch(0.46 0.16 44)" }}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                No leads remaining
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                All leads in this session have been contacted. Click End Session
                to see your summary, or go back to select more leads.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                variant="outline"
                onClick={() => setStep("select")}
                className="gap-2 min-h-[44px]"
                data-ocid="dialer.back_to_select_button"
              >
                ← Back to Lead Selection
              </Button>
              <Button
                onClick={() => setStep("summary")}
                className="gap-2 min-h-[44px] bg-primary text-white hover:bg-primary/90 font-semibold"
                data-ocid="dialer.view_summary_button"
              >
                <CheckCircle2 className="w-4 h-4" />
                View Session Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "session" && currentLead && (
        <div className="space-y-4" data-ocid="dialer.session_panel">
          {/* Progress + End Session bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {sessionLeads.length} remaining
              </span>
              {sessionTotalCount > 0 && contactedCount > 0 && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-semibold text-foreground">
                    {contactedCount}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">
                    contacted of {sessionTotalCount} —{" "}
                    {mode === "call" ? "Call" : "Text"} Session
                  </span>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={showSummaryAndEnd}
              data-ocid="dialer.end_session_button"
              className="text-muted-foreground hover:text-destructive gap-1.5 shrink-0 h-9"
            >
              <X className="w-3.5 h-3.5" />
              End Session
            </Button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Lead card */}
          <Card
            className="shadow-sm border-border"
            data-ocid="dialer.current_lead_card"
          >
            <CardContent className="pt-5 pb-5">
              {/* Lead info */}
              <div className="flex flex-col gap-1 mb-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-foreground leading-snug min-w-0 break-words">
                    {currentLead.name}
                  </h2>
                  <Badge
                    className={`${STAGE_COLORS[currentLead.pipelineStage]} border-0 shrink-0 mt-0.5`}
                  >
                    {STAGE_LABELS[currentLead.pipelineStage]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentLead.industry}
                </p>
                <p className="text-base font-mono font-semibold text-foreground">
                  {formatPhone(currentLead.phone)}
                </p>
              </div>

              {/* ── Call Mode ──────────────────────────────── */}
              {mode === "call" && (
                <div className="space-y-4">
                  {phoneLinkHint === "call" && awaitingOutcome && (
                    <div
                      className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                      style={{
                        background: "oklch(0.22 0.12 264 / 0.07)",
                        border: "1px solid oklch(0.22 0.12 264 / 0.18)",
                        color: "oklch(0.28 0.12 264)",
                      }}
                      data-ocid="dialer.phone_link_call_hint"
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">
                          Phone Link is opening on your PC
                        </strong>{" "}
                        — complete the call there, then return here to log the
                        outcome.
                      </span>
                    </div>
                  )}
                  {phoneLinkHint === "gv-call" && awaitingOutcome && (
                    <div
                      className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.07)",
                        border: "1px solid oklch(0.55 0.18 145 / 0.25)",
                        color: "oklch(0.35 0.12 145)",
                      }}
                      data-ocid="dialer.gv_call_hint"
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">
                          Google Voice opened in a new tab
                        </strong>{" "}
                        — complete the call there, then return here to log the
                        outcome.
                      </span>
                    </div>
                  )}
                  {/* zoom-call hint removed — Zoom Phone no longer available */}

                  {!awaitingOutcome ? (
                    <Button
                      size="lg"
                      className="w-full gap-2 bg-primary text-white hover:bg-primary/90 text-base font-semibold h-14"
                      onClick={handleCall}
                      data-ocid="dialer.call_button"
                    >
                      <PhoneCall className="w-5 h-5" />
                      Call {currentLead.name}
                    </Button>
                  ) : (
                    <div
                      data-ocid="dialer.outcome_picker"
                      className="space-y-3"
                    >
                      <p className="text-sm font-medium text-foreground">
                        Log call outcome:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 border-accent/40 hover:bg-accent/10 text-sm h-12 sm:h-10"
                          onClick={() => handleOutcome(CallOutcome.reached)}
                          data-ocid="dialer.outcome_reached"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                          Reached
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 text-sm h-12 sm:h-10"
                          onClick={() => handleOutcome(CallOutcome.noAnswer)}
                          data-ocid="dialer.outcome_no_answer"
                        >
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          No Answer
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 text-sm h-12 sm:h-10"
                          onClick={() =>
                            handleOutcome(CallOutcome.leftVoicemail)
                          }
                          data-ocid="dialer.outcome_voicemail"
                        >
                          <Voicemail className="w-4 h-4 text-muted-foreground" />
                          Voicemail
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Text Mode ──────────────────────────────── */}
              {mode === "text" && (
                <div className="space-y-3">
                  {roundRobinEnabled && twilioNumbers.length > 1 && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-accent/10 text-accent-foreground"
                      data-ocid="dialer.round_robin_indicator"
                    >
                      <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                      Sending via:{" "}
                      {twilioNumbers[rrIndexRef.current % twilioNumbers.length]
                        ?.label ||
                        twilioNumbers[rrIndexRef.current % twilioNumbers.length]
                          ?.phoneNumber}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <label
                      className="text-sm font-medium text-foreground"
                      htmlFor="message-body"
                    >
                      Message
                    </label>
                    {lastMessage && messageBody !== lastMessage && (
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline shrink-0 min-h-[36px] px-1"
                        onClick={() => setMessageBody(lastMessage)}
                        data-ocid="dialer.reuse_last_message_button"
                      >
                        Reuse last message
                      </button>
                    )}
                  </div>
                  <Textarea
                    id="message-body"
                    placeholder="Type your message here…"
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    rows={4}
                    className="resize-none text-base w-full"
                    style={{ fontSize: "16px" }}
                    data-ocid="dialer.message_textarea"
                  />

                  {/* Inline spin panel — visible while composing, per-message */}
                  {messageBody.trim() && (
                    <div
                      className="rounded-lg border border-border bg-muted/30 px-4 py-3 space-y-3"
                      data-ocid="dialer.spin_panel"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <RefreshCw className="w-3.5 h-3.5 text-primary shrink-0" />
                          Spin — get 3 reworded versions
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const vars = spinText(messageBody);
                            setSpinVariations(vars);
                            setShowSpinPanel(true);
                          }}
                          className="h-8 px-3 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shrink-0 flex items-center gap-1.5"
                          data-ocid="dialer.spin_button"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Spin
                        </button>
                      </div>

                      {showSpinPanel && spinVariations.length > 0 && (
                        <div
                          className="space-y-2"
                          data-ocid="dialer.spin_variations_list"
                        >
                          {spinVariations.map((v, vIdx) => {
                            const versionNum = vIdx + 1;
                            // Show preview with merge tags replaced so user sees real first name
                            const preview = currentLead
                              ? mergeTags(v, currentLead)
                              : v;
                            return (
                              <div
                                key={v.slice(0, 60)}
                                className="rounded-md border border-border bg-background px-3 py-2.5 space-y-1.5"
                                data-ocid={`dialer.spin_variation.${versionNum}`}
                              >
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                  Version {versionNum}
                                </p>
                                <p className="text-xs text-foreground whitespace-pre-wrap">
                                  {preview}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Fill textarea with raw text (tags merged on send)
                                    setMessageBody(v);
                                    setShowSpinPanel(false);
                                    setSpinVariations([]);
                                  }}
                                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                                  data-ocid={`dialer.spin_use_button.${versionNum}`}
                                >
                                  Use this version →
                                </button>
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => {
                              setShowSpinPanel(false);
                              setSpinVariations([]);
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground"
                            data-ocid="dialer.spin_close_button"
                          >
                            × Close variations
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {phoneLinkHint === "text" && (
                    <div
                      className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                      style={{
                        background: "oklch(0.22 0.12 264 / 0.07)",
                        border: "1px solid oklch(0.22 0.12 264 / 0.18)",
                        color: "oklch(0.28 0.12 264)",
                      }}
                      data-ocid="dialer.phone_link_sms_hint"
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">
                          Phone Link is opening on your PC
                        </strong>{" "}
                        — press <strong className="font-semibold">Send</strong>{" "}
                        in Phone Link to complete the text.
                      </span>
                    </div>
                  )}
                  {phoneLinkHint === "gv-text" && (
                    <div
                      className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.07)",
                        border: "1px solid oklch(0.55 0.18 145 / 0.25)",
                        color: "oklch(0.35 0.12 145)",
                      }}
                      data-ocid="dialer.gv_sms_hint"
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">
                          Google Voice opened in a new tab
                        </strong>{" "}
                        — find{" "}
                        <strong className="font-semibold">
                          {currentLead?.name}
                        </strong>{" "}
                        and send the message there, then return here to advance
                        to the next lead.
                      </span>
                    </div>
                  )}
                  {/* zoom-text hint removed — Zoom Phone no longer available */}

                  <Button
                    size="lg"
                    className="w-full gap-2 bg-primary text-white hover:bg-primary/90 text-base font-semibold h-14"
                    onClick={handleSendText}
                    disabled={
                      !messageBody.trim() ||
                      addTextRecord.isPending ||
                      updateLead.isPending
                    }
                    data-ocid="dialer.send_text_button"
                  >
                    <Send className="w-5 h-5" />
                    Send Text to {currentLead.name}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── STEP: Disposition ──────────────────────────────────────────────── */}
      {step === "disposition" && currentLead && (
        <div className="space-y-4" data-ocid="dialer.disposition_panel">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {sessionLeads.length} lead{sessionLeads.length !== 1 ? "s" : ""}{" "}
              remaining
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={showSummaryAndEnd}
              className="text-muted-foreground hover:text-destructive gap-1.5 h-9"
              data-ocid="dialer.disposition_end_session_button"
            >
              <X className="w-3.5 h-3.5" />
              End Session
            </Button>
          </div>

          <DispositionStep
            lead={currentLead}
            mode={mode}
            onSave={handleDispositionSave}
            onSkip={handleDispositionSkipCall}
            isSaving={isSavingDisposition}
          />
        </div>
      )}

      {/* ── STEP: Summary ─────────────────────────────────────────────────── */}
      {step === "summary" && (
        <Card
          className="shadow-sm border-border"
          data-ocid="dialer.summary_panel"
        >
          <CardContent className="pt-10 pb-10 flex flex-col items-center text-center gap-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Session Complete
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {sessionLeads.length} lead{sessionLeads.length !== 1 ? "s" : ""}{" "}
                contacted
              </p>
            </div>

            {mode === "call" && (
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-accent/30">
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  <span className="text-xl font-bold text-foreground">
                    {outcomeCounts[CallOutcome.reached]}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    Reached
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xl font-bold text-foreground">
                    {outcomeCounts[CallOutcome.noAnswer]}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    No Answer
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border">
                  <Voicemail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xl font-bold text-foreground">
                    {outcomeCounts[CallOutcome.leftVoicemail]}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    Voicemail
                  </span>
                </div>
              </div>
            )}

            {mode === "text" && (
              <div className="flex flex-col items-center gap-1 p-5 rounded-lg bg-primary/5 border border-primary/20">
                <Send className="w-6 h-6 text-primary mb-1" />
                <span className="text-3xl font-bold text-foreground">
                  {textsSent}
                </span>
                <span className="text-sm text-muted-foreground">
                  Text{textsSent !== 1 ? "s" : ""} sent
                </span>
              </div>
            )}

            <Button
              onClick={endSession}
              className="w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold"
              data-ocid="dialer.new_session_button"
            >
              <Zap className="w-4 h-4" />
              Start New Session
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
