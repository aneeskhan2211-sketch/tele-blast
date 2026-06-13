import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Cake,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  ScrollText,
  ShieldOff,
  SkipForward,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IMessageCheckbox } from "../components/IMessageCheckbox";
import { PIPELINE_STAGES } from "../constants";
import { useAiResearchLead } from "../hooks/useAi";
import {
  getIMessagePreference,
  setIMessagePreference,
} from "../hooks/useIMessagePreference";
import {
  useAddCallRecord,
  useAddEmailRecord,
  useAddTextRecord,
  useLead,
  useUpdateLead,
  useUpdateLeadDnc,
} from "../hooks/useLeads";
import {
  getPhoneLinkPreference,
  isWindowsDesktop,
} from "../hooks/usePhoneLinkPreference";
import { tierHasFeature, useSubscription } from "../hooks/useSubscription";
import type { CallRecord, EmailRecord, TextRecord } from "../types";
import { CallOutcome } from "../types";
import type { Lead, LeadUpdate, PipelineStage } from "../types";
import {
  handlePhoneCall,
  handleSmsSend,
  isGoogleVoiceEnabled,
} from "../utils/phoneActions";

// ─── Disposition config ───────────────────────────────────────────────────────

const DISPOSITIONS = [
  "Answered",
  "No Answer",
  "Left Voicemail",
  "Callback Requested",
  "Not Interested",
  "Closed / Won",
] as const;

type Disposition = (typeof DISPOSITIONS)[number];

const DISPOSITION_BADGE_STYLES: Record<Disposition, string> = {
  Answered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "No Answer": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "Left Voicemail": "bg-primary/10 text-primary border-primary/20",
  "Callback Requested": "bg-sky-500/10 text-sky-700 border-sky-500/20",
  "Not Interested": "bg-destructive/10 text-destructive border-destructive/20",
  "Closed / Won": "bg-emerald-600/15 text-emerald-800 border-emerald-600/20",
};

const DISPOSITION_CHIP_COLORS: Record<Disposition, string> = {
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

const DISPOSITION_CHIP_ACTIVE: Record<Disposition, string> = {
  Answered: "bg-emerald-500 text-white border-emerald-500",
  "No Answer": "bg-amber-500 text-white border-amber-500",
  "Left Voicemail": "bg-primary text-primary-foreground border-primary",
  "Callback Requested": "bg-sky-500 text-white border-sky-500",
  "Not Interested":
    "bg-destructive text-destructive-foreground border-destructive",
  "Closed / Won": "bg-emerald-600 text-white border-emerald-600",
};

/** Extract disposition from a note line like "... · Disposition: Answered — ..." */
function extractDisposition(noteText: string): Disposition | null {
  const match = noteText.match(/Disposition:\s*([^—\n]+)/);
  if (!match) return null;
  const candidate = match[1].trim() as Disposition;
  return (DISPOSITIONS as readonly string[]).includes(candidate)
    ? candidate
    : null;
}

// ─── InlineDispositionCapture ─────────────────────────────────────────────────

function InlineDispositionCapture({
  actionLabel,
  onSave,
  onSkip,
  isSaving,
}: {
  actionLabel: string;
  onSave: (disposition: Disposition, followUpDate: string) => void;
  onSkip: () => void;
  isSaving: boolean;
}) {
  const [selected, setSelected] = useState<Disposition | null>(null);
  const [followUpDate, setFollowUpDate] = useState("");

  return (
    <div
      className="mt-3 rounded-xl border border-border bg-muted/30 p-4 space-y-4"
      data-ocid="lead-detail.disposition_capture"
    >
      <p className="text-sm font-semibold text-foreground">
        How did the {actionLabel} go?
      </p>

      {/* Disposition chips */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        data-ocid="lead-detail.disposition_options"
      >
        {DISPOSITIONS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelected(d)}
            data-ocid={`lead-detail.disposition_chip.${d.toLowerCase().replace(/[\s/]+/g, "_")}`}
            className={[
              "px-3 py-2 rounded-lg border text-sm font-medium transition-all min-h-[40px] text-left",
              selected === d
                ? DISPOSITION_CHIP_ACTIVE[d]
                : DISPOSITION_CHIP_COLORS[d],
            ].join(" ")}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Follow-up date */}
      <div>
        <label
          htmlFor="detail-followup-date"
          className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1.5"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Follow-up date (optional)
        </label>
        <input
          id="detail-followup-date"
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring min-h-[40px]"
          data-ocid="lead-detail.followup_date_input"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground min-h-[40px] flex-1"
          onClick={onSkip}
          disabled={isSaving}
          data-ocid="lead-detail.disposition_skip_button"
        >
          <SkipForward className="w-3.5 h-3.5" />
          Skip
        </Button>
        <Button
          size="sm"
          className="gap-1.5 bg-primary text-white hover:bg-primary/90 min-h-[40px] flex-1 font-semibold"
          onClick={() => onSave(selected ?? "No Answer", followUpDate)}
          disabled={isSaving}
          data-ocid="lead-detail.disposition_save_button"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}

// ─── Qualification tags ───────────────────────────────────────────────────────

const QUAL_TAGS = [
  "Ready to Contact",
  "High Interest",
  "Needs Follow-Up",
  "Not Qualified",
] as const;
type QualTag = (typeof QUAL_TAGS)[number];

function toQualTags(raw: string[]): QualTag[] {
  return raw.filter((t): t is QualTag =>
    (QUAL_TAGS as readonly string[]).includes(t),
  );
}

function useLeadLocalState(lead: Lead | null | undefined) {
  const [stage, setStage] = useState<PipelineStage | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [followUpDate, setFollowUpDate] = useState<string>("");
  const [qualTags, setQualTags] = useState<QualTag[]>([]);
  const [birthday, setBirthday] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    if (!lead) return;
    setStage(lead.pipelineStage);
    setNotes(lead.notes ?? "");
    setFollowUpDate(lead.followUpDate ?? "");
    setQualTags(toQualTags(lead.qualificationTags ?? []));
    setBirthday(lead.birthday ?? "");
    setFirstName(lead.firstName ?? "");
    setLastName(lead.lastName ?? "");
  }, [lead]);

  return {
    stage,
    setStage,
    notes,
    setNotes,
    followUpDate,
    setFollowUpDate,
    qualTags,
    setQualTags,
    birthday,
    setBirthday,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  };
}

/** Returns display name — blank when both business and contact are blank. */
function getDetailDisplayName(lead: Lead): string {
  const contact = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  if (lead.name && contact) return lead.name; // show business name as h1, contact in subline
  if (lead.name) return lead.name;
  if (contact) return contact;
  return "";
}

/** Safely format a birthday string (YYYY-MM-DD, MM-DD, MM/DD) for display. */
function formatBirthdayDisplay(raw: string): string {
  if (!raw) return "";
  const v = raw.trim();
  const parts = v.split(/[-/]/);

  let month: number;
  let day: number;

  if (parts.length === 3) {
    // YYYY-MM-DD or MM-DD-YYYY
    if (parts[0].length === 4) {
      month = Number.parseInt(parts[1], 10);
      day = Number.parseInt(parts[2], 10);
    } else {
      month = Number.parseInt(parts[0], 10);
      day = Number.parseInt(parts[1], 10);
    }
  } else if (parts.length === 2) {
    // MM-DD or MM/DD
    month = Number.parseInt(parts[0], 10);
    day = Number.parseInt(parts[1], 10);
  } else {
    return v; // can't parse — return as-is
  }

  if (
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return v;
  }

  const hasYear =
    parts.length === 3 && (parts[0].length === 4 || parts[2].length === 4);
  const year = hasYear
    ? parts[0].length === 4
      ? Number.parseInt(parts[0], 10)
      : Number.parseInt(parts[2], 10)
    : 2000;

  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return v;

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    ...(hasYear ? { year: "numeric" } : {}),
  });
}

/**
 * Convert a stored birthday (YYYY-MM-DD, MM-DD) to a value safe for
 * input[type='date'] which requires YYYY-MM-DD. Returns empty string if
 * the stored format has no year.
 */
function birthdayToDateInputValue(raw: string): string {
  if (!raw) return "";
  const v = raw.trim();
  const parts = v.split(/[-/]/);
  // Only YYYY-MM-DD (4-digit first segment) works in date inputs
  if (parts.length === 3 && parts[0].length === 4) return v;
  // MM-DD or MM/DD cannot represent as a date input value — return empty
  return "";
}

export default function LeadDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const id = BigInt(params.id ?? "0");
  const { data: lead, isLoading } = useLead(id);
  const updateLead = useUpdateLead();
  const updateLeadDnc = useUpdateLeadDnc();
  const addCallRecord = useAddCallRecord();
  const addTextRecord = useAddTextRecord();
  const addEmailRecord = useAddEmailRecord();
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const [showDncConfirm, setShowDncConfirm] = useState(false);
  const [isDncSaving, setIsDncSaving] = useState(false);

  const {
    stage,
    setStage,
    notes,
    setNotes,
    followUpDate,
    setFollowUpDate,
    qualTags,
    setQualTags,
    birthday,
    setBirthday,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  } = useLeadLocalState(lead);

  const [notesEditing, setNotesEditing] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // Inline disposition state — "call" | "email" | null
  const [showDispositionFor, setShowDispositionFor] = useState<
    "call" | "email" | null
  >(null);
  const [isSavingDisposition, setIsSavingDisposition] = useState(false);

  // iMessage preference
  const [useIMessage, setUseIMessage] = useState(getIMessagePreference);
  const handleIMessageToggle = (v: boolean) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };

  const save = async (patch: LeadUpdate) => {
    try {
      await updateLead.mutateAsync({ id, updates: patch });
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDncToggle = async () => {
    if (!lead) return;
    setIsDncSaving(true);
    try {
      await updateLeadDnc.mutateAsync({ leadId: id, isDnc: !lead.isDnc });
      toast.success(
        lead.isDnc ? "DNC status removed" : "Lead marked as Do Not Contact",
      );
      setShowDncConfirm(false);
    } catch {
      toast.error("Failed to update DNC status");
    } finally {
      setIsDncSaving(false);
    }
  };

  const formatNoteDate = (date: Date) =>
    date.toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const appendNote = async (noteLine: string) => {
    const existing = notes ?? "";
    const updated = existing ? `${noteLine}\n${existing}` : noteLine;
    setNotes(updated);
    await save({ notes: updated });
  };

  // ─── Outreach handlers ────────────────────────────────────────────────────

  const handleCallClick = async () => {
    if (!lead) return;
    const phoneLinkOn = isWindowsDesktop() && getPhoneLinkPreference();
    const gvOn = isGoogleVoiceEnabled();
    handlePhoneCall(lead.phone, phoneLinkOn, gvOn);
    setShowDispositionFor("call");
  };

  const handleCallDispositionSave = async (
    disposition: Disposition,
    followUpDateVal: string,
  ) => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Call] Outcome: Reached · Disposition: ${disposition} — ${formatNoteDate(new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: id,
        outcome: CallOutcome.reached,
      });
      const currentNotes = notes ?? "";
      const newNotes = currentNotes ? `${noteLine}\n${currentNotes}` : noteLine;
      const patch: LeadUpdate = { notes: newNotes };
      if (followUpDateVal) patch.followUpDate = followUpDateVal;
      await save(patch);
      setNotes(newNotes);
      if (followUpDateVal) setFollowUpDate(followUpDateVal);
    } catch {
      // silently skip
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };

  const handleCallDispositionSkip = async () => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      await addCallRecord.mutateAsync({
        leadId: id,
        outcome: CallOutcome.reached,
      });
      await appendNote(
        `[Call] Outcome: Reached — ${formatNoteDate(new Date())}`,
      );
    } catch {
      // silently skip
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };

  const handleTextClick = async () => {
    if (!lead) return;
    const phoneLinkOn = isWindowsDesktop() && getPhoneLinkPreference();
    // Open SMS via Phone Link or native sms: URI
    handleSmsSend(lead.phone, "", phoneLinkOn);
    const via = phoneLinkOn
      ? " (Phone Link)"
      : useIMessage
        ? " (iMessage)"
        : "";
    const noteLine = `[Text] Text message sent${via} — ${formatNoteDate(new Date())}`;
    try {
      await addTextRecord.mutateAsync({
        leadId: id,
        messageBody: "Text message sent",
      });
      await appendNote(noteLine);
    } catch {
      // Intent already opened; silently skip record failure
    }
  };

  const handleEmailClick = async () => {
    if (!lead?.email) return;
    // Open mailto: with a generic subject so the user just needs to edit body
    const subject = lead.name
      ? `Hi ${lead.name} — following up`
      : "Following up";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}`;
    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      window.open(mailtoUrl, "_blank");
    }
    setShowDispositionFor("email");
  };

  const handleEmailDispositionSave = async (
    disposition: Disposition,
    followUpDateVal: string,
  ) => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Email] Email sent · Disposition: ${disposition} — ${formatNoteDate(new Date())}`;
      await addEmailRecord.mutateAsync({
        leadId: id,
        timestamp: BigInt(Date.now()),
      });
      const currentNotes = notes ?? "";
      const newNotes = currentNotes ? `${noteLine}\n${currentNotes}` : noteLine;
      const patch: LeadUpdate = { notes: newNotes };
      if (followUpDateVal) patch.followUpDate = followUpDateVal;
      await save(patch);
      setNotes(newNotes);
      if (followUpDateVal) setFollowUpDate(followUpDateVal);
    } catch {
      // silently skip
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };

  const handleEmailDispositionSkip = async () => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      await addEmailRecord.mutateAsync({
        leadId: id,
        timestamp: BigInt(Date.now()),
      });
      await appendNote(`[Email] Email sent — ${formatNoteDate(new Date())}`);
    } catch {
      // silently skip
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };

  const handleStageChange = async (v: string) => {
    const newStage = v as PipelineStage;
    setStage(newStage);
    await save({ pipelineStage: newStage });
    toast.success("Stage updated");
  };

  const handleNotesBlur = async () => {
    setNotesEditing(false);
    if (!lead || notes === (lead.notes ?? "")) return;
    await save({ notes });
    toast.success("Notes saved");
  };

  const handleFollowUpChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    setFollowUpDate(val);
    await save({ followUpDate: val || undefined });
    toast.success("Follow-up date saved");
  };

  const handleBirthdayChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    setBirthday(val);
    await save({ birthday: val || undefined });
    toast.success("Birthday saved");
  };

  const toggleQualTag = async (tag: QualTag) => {
    const next = qualTags.includes(tag)
      ? qualTags.filter((t) => t !== tag)
      : [...qualTags, tag];
    setQualTags(next);
    await save({ qualificationTags: next });
  };

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-48 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div
        className="max-w-5xl mx-auto px-3 sm:px-6 py-16 text-center"
        data-ocid="lead-not-found"
      >
        <p className="text-lg font-semibold text-foreground mb-2">
          Lead not found
        </p>
        <p className="text-muted-foreground mb-6">
          This lead may have been removed or doesn't exist.
        </p>
        <Link to="/leads">
          <Button variant="outline" className="min-h-[44px]">
            ← Back to leads
          </Button>
        </Link>
      </div>
    );
  }

  const currentStage = stage ?? lead.pipelineStage;
  const stageConfig =
    PIPELINE_STAGES.find((s) => s.value === currentStage) ?? PIPELINE_STAGES[0];
  const displayName = getDetailDisplayName(lead);
  const contactFullName = [lead.firstName, lead.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <Link
        to="/leads"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 min-h-[44px]"
        data-ocid="back-to-leads"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to leads
      </Link>

      {/* DNC Banner */}
      {lead.isDnc && (
        <div
          className="flex items-center gap-3 bg-destructive/10 border border-destructive/40 rounded-2xl px-4 py-3 mb-4"
          data-ocid="lead-detail.dnc-banner"
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-destructive text-sm">
              DO NOT CONTACT — This lead is on the Do Not Call list
            </p>
            <p className="text-xs text-destructive/80 mt-0.5">
              All outreach actions are blocked. Remove DNC status to re-enable.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDncConfirm(true)}
            className="shrink-0 text-xs font-semibold text-destructive hover:text-destructive/80 underline underline-offset-2 min-h-[32px] px-2"
            data-ocid="lead-detail.remove-dnc-button"
          >
            Remove DNC
          </button>
        </div>
      )}

      {/* Hero card */}
      <div
        className={`bg-card border rounded-2xl shadow-sm p-4 sm:p-6 mb-5 ${lead.isDnc ? "border-destructive/30" : "border-border"}`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1
              className="text-lg sm:text-2xl font-bold text-foreground break-words leading-snug"
              data-ocid="lead-name"
            >
              {displayName || (
                <span className="text-muted-foreground italic font-normal text-base">
                  Unnamed Lead
                </span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              {/* Contact name subline (only if different from display name) */}
              {contactFullName && lead.name && (
                <span className="text-sm text-muted-foreground">
                  {contactFullName}
                </span>
              )}
              {lead.industry && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  {lead.industry}
                </span>
              )}
              {(lead.city || lead.state || lead.address) && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="break-words">
                    {[lead.address, lead.city, lead.state]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </span>
              )}
            </div>
          </div>
          <Badge className="shrink-0 self-start px-3 py-1 text-xs font-semibold rounded-full border-0 bg-primary/10 text-primary hover:bg-primary/10">
            {stageConfig.label}
          </Badge>
        </div>

        {/* Outreach buttons — hidden/blocked for DNC leads */}
        {lead.isDnc ? (
          <div className="mt-4 pt-4 border-t border-destructive/20">
            <div
              className="flex items-center justify-center gap-2 py-3 bg-destructive/5 rounded-xl border border-destructive/20"
              data-ocid="lead-detail.dnc-block"
            >
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-sm font-semibold text-destructive">
                DNC — No Contact Allowed
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
            <Button
              className="w-full gap-1.5 font-semibold min-h-[48px] text-sm sm:text-base"
              size="lg"
              onClick={handleCallClick}
              data-ocid="call-btn"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-1.5 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base"
              onClick={handleTextClick}
              data-ocid="text-btn"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Text</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`w-full gap-1.5 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base ${!lead.email ? "opacity-40 cursor-not-allowed" : ""}`}
              onClick={handleEmailClick}
              disabled={!lead.email}
              data-ocid="email-btn"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email</span>
            </Button>
          </div>
        )}

        {/* iMessage preference — shown when lead has a phone */}
        {lead.phone && (
          <div className="flex items-center rounded-lg border border-border bg-muted/30 px-4 py-3 mt-2">
            <IMessageCheckbox
              checked={useIMessage}
              onChange={handleIMessageToggle}
            />
          </div>
        )}

        {/* Inline disposition capture */}
        {showDispositionFor === "call" && (
          <InlineDispositionCapture
            actionLabel="call"
            onSave={handleCallDispositionSave}
            onSkip={handleCallDispositionSkip}
            isSaving={isSavingDisposition}
          />
        )}
        {showDispositionFor === "email" && (
          <InlineDispositionCapture
            actionLabel="email"
            onSave={handleEmailDispositionSave}
            onSkip={handleEmailDispositionSkip}
            isSaving={isSavingDisposition}
          />
        )}

        {/* Cold Call Script shortcut */}
        <div className="mt-3 pt-3 border-t border-border space-y-2">
          <Link
            to="/cold-call-script"
            search={{ leadId: String(id) }}
            data-ocid="lead-detail.open_script_generator_button"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base"
            >
              <ScrollText className="w-4 h-4 shrink-0" />
              Open Cold Call Script Generator
            </Button>
          </Link>
          {/* DNC toggle */}
          <button
            type="button"
            onClick={() => setShowDncConfirm(true)}
            className={`w-full flex items-center justify-center gap-2 min-h-[44px] text-sm font-medium rounded-xl border transition-colors ${
              lead.isDnc
                ? "border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10"
                : "border-border text-muted-foreground hover:border-destructive/40 hover:text-destructive"
            }`}
            data-ocid="lead-detail.dnc-toggle-button"
          >
            <ShieldOff className="w-4 h-4 shrink-0" />
            {lead.isDnc ? "Remove Do Not Call Status" : "Mark as Do Not Call"}
          </button>
        </div>
      </div>

      {/* DNC Confirmation Dialog */}
      {showDncConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4"
          data-ocid="lead-detail.dnc-confirm-dialog"
          onClick={(e) =>
            e.target === e.currentTarget && setShowDncConfirm(false)
          }
          onKeyDown={(e) => e.key === "Escape" && setShowDncConfirm(false)}
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">
                  {lead.isDnc ? "Remove DNC Status" : "Mark as Do Not Call"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {displayName || "This lead"}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lead.isDnc
                ? `Remove DNC status from ${displayName || "this lead"}? They will become contactable again.`
                : `Mark ${displayName || "this lead"} as Do Not Call? They will be blocked from all outreach and moved to the DNC section.`}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 min-h-[44px]"
                onClick={() => setShowDncConfirm(false)}
                disabled={isDncSaving}
                data-ocid="lead-detail.dnc-confirm-cancel"
              >
                Cancel
              </Button>
              <Button
                className={`flex-1 min-h-[44px] font-semibold ${lead.isDnc ? "bg-primary text-white hover:bg-primary/90" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}`}
                onClick={handleDncToggle}
                disabled={isDncSaving}
                data-ocid="lead-detail.dnc-confirm-button"
              >
                {isDncSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : lead.isDnc ? (
                  "Remove DNC"
                ) : (
                  "Mark DNC"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* LEFT — Contact details */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Contact Details
          </h2>
          {(firstName || lastName) && (
            <InfoRow icon={<Phone className="w-4 h-4" />} label="Name">
              <span>{[firstName, lastName].filter(Boolean).join(" ")}</span>
            </InfoRow>
          )}
          <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone">
            <a
              href={`tel:${lead.phone}`}
              className="text-foreground hover:text-primary transition-colors break-all"
            >
              {lead.phone}
            </a>
          </InfoRow>
          {lead.email && (
            <InfoRow icon={<Mail className="w-4 h-4" />} label="Email">
              <a
                href={`mailto:${encodeURIComponent(lead.email)}`}
                className="text-foreground hover:text-primary transition-colors break-all"
              >
                {lead.email}
              </a>
            </InfoRow>
          )}
          <InfoRow icon={<MapPin className="w-4 h-4" />} label="Address">
            <span className="break-words">
              {[lead.address, lead.city, lead.state]
                .filter(Boolean)
                .join(", ") || "—"}
            </span>
          </InfoRow>
          <InfoRow icon={<Building2 className="w-4 h-4" />} label="Industry">
            <span>{lead.industry || "—"}</span>
          </InfoRow>
          <InfoRow
            icon={<TrendingUp className="w-4 h-4" />}
            label="Revenue Range"
          >
            <span>{lead.revenueRange || "—"}</span>
          </InfoRow>
          <InfoRow
            icon={<CalendarDays className="w-4 h-4" />}
            label="Years in Business"
          >
            <span>
              {lead.yearsInBusiness !== undefined &&
              lead.yearsInBusiness !== null
                ? `${Number(lead.yearsInBusiness)} yrs`
                : "—"}
            </span>
          </InfoRow>
          <InfoRow icon={<Cake className="w-4 h-4" />} label="Birthday">
            <span>
              {lead.birthday
                ? formatBirthdayDisplay(lead.birthday) || "—"
                : "—"}
            </span>
          </InfoRow>
        </div>

        {/* RIGHT — Pipeline + Tags + Follow-up */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Pipeline Stage
            </h2>
            <Select value={currentStage} onValueChange={handleStageChange}>
              <SelectTrigger
                className="w-full min-h-[44px]"
                data-ocid="stage-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Qualification
            </h2>
            <div className="flex flex-wrap gap-2" data-ocid="qual-tags">
              {QUAL_TAGS.map((tag) => {
                const active = qualTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleQualTag(tag)}
                    className={[
                      "px-3 py-2 rounded-full text-sm font-medium border transition-all min-h-[44px]",
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                    ].join(" ")}
                    data-ocid={`tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6">
            <Label
              htmlFor="followup-date"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3"
            >
              Follow-Up Date
            </Label>
            <Input
              id="followup-date"
              type="date"
              value={followUpDate}
              onChange={handleFollowUpChange}
              className="w-full min-h-[44px]"
              data-ocid="followup-date"
            />
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6">
            <Label
              htmlFor="birthday-date"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3 flex items-center gap-1.5"
            >
              <Cake className="w-3.5 h-3.5" />
              Birthday
            </Label>
            <Input
              id="birthday-date"
              type="date"
              value={birthdayToDateInputValue(birthday)}
              onChange={handleBirthdayChange}
              className="w-full min-h-[44px]"
              data-ocid="birthday-date"
            />
            {birthday && !birthdayToDateInputValue(birthday) && (
              <p className="text-xs text-muted-foreground mt-1.5">
                Stored as: {formatBirthdayDisplay(birthday) || birthday}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* First/Last name edit rows — always visible for all leads */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Name Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="first-name"
              className="text-xs text-muted-foreground mb-1 block"
            >
              First Name
            </Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={async () => {
                if (firstName !== (lead.firstName ?? "")) {
                  await save({ firstName: firstName || undefined });
                  toast.success("First name saved");
                }
              }}
              placeholder="First name"
              className="min-h-[44px]"
              data-ocid="first-name-input"
            />
          </div>
          <div>
            <Label
              htmlFor="last-name"
              className="text-xs text-muted-foreground mb-1 block"
            >
              Last Name
            </Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={async () => {
                if (lastName !== (lead.lastName ?? "")) {
                  await save({ lastName: lastName || undefined });
                  toast.success("Last name saved");
                }
              }}
              placeholder="Last name"
              className="min-h-[44px]"
              data-ocid="last-name-input"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Notes
          </h2>
          {notesEditing && (
            <Button
              size="sm"
              className="min-h-[36px]"
              onClick={() => notesRef.current?.blur()}
              data-ocid="save-notes-btn"
            >
              Save
            </Button>
          )}
        </div>
        <Textarea
          ref={notesRef}
          rows={5}
          className="resize-none w-full border-dashed focus:border-solid transition-all text-sm min-h-[120px]"
          placeholder="Click to add notes about this lead…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onFocus={() => setNotesEditing(true)}
          onBlur={handleNotesBlur}
          data-ocid="notes-input"
        />
      </div>

      {/* AI Research — only shown for tiers with AI access */}
      {hasAi && (
        <AiResearchSection
          lead={lead}
          onResearchSaved={async (result: string) => {
            const researchNote = `[AI Research] ${result}\n— ${new Date().toLocaleString()}`;
            await appendNote(researchNote);
          }}
        />
      )}

      {/* Communication History */}
      <CommunicationHistory
        callHistory={lead.callHistory}
        textHistory={lead.textHistory}
        emailHistory={lead.emailHistory}
        leadNotes={notes}
      />
    </div>
  );
}

// ─── AI Research Section ─────────────────────────────────────────────────────

function AiResearchSection({
  lead,
  onResearchSaved,
}: {
  lead: Lead;
  onResearchSaved: (result: string) => Promise<void>;
}) {
  const researchLead = useAiResearchLead();
  const [researchResult, setResearchResult] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Check if previous research is in notes
  const existingResearch = lead.notes
    ?.split("\n")
    .find((l) => l.startsWith("[AI Research]"))
    ?.replace("[AI Research] ", "");

  const handleRunResearch = async () => {
    try {
      const result = await researchLead.mutateAsync(lead.id);
      setResearchResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI research failed.";
      toast.error(msg);
    }
  };

  const handleSave = async () => {
    if (!researchResult) return;
    setIsSaving(true);
    try {
      await onResearchSaved(researchResult);
      toast.success("Research saved to notes");
      setResearchResult(null);
    } catch {
      toast.error("Failed to save research");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5"
      data-ocid="ai-research.section"
    >
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI Research
          </h2>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          $0.05 per research
        </span>
      </div>

      {existingResearch && !researchResult && (
        <div
          className="bg-muted/30 rounded-xl p-3 text-sm text-foreground mb-3 border border-border"
          data-ocid="ai-research.existing-result"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Previous Research
          </p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words line-clamp-6">
            {existingResearch}
          </p>
        </div>
      )}

      {researchResult && (
        <div
          className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-3 space-y-3"
          data-ocid="ai-research.result"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Research Complete
          </div>
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {researchResult}
          </p>
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="min-h-[40px]"
              data-ocid="ai-research.save-button"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              )}
              Save to Notes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setResearchResult(null)}
              className="min-h-[40px]"
              data-ocid="ai-research.dismiss-button"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={handleRunResearch}
        disabled={researchLead.isPending}
        variant="outline"
        size="sm"
        className="gap-2 border-primary/40 text-primary hover:bg-primary/5 min-h-[44px]"
        data-ocid="ai-research.run-button"
      >
        {researchLead.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Researching…
          </>
        ) : (
          <>
            <ExternalLink className="w-4 h-4" />
            Run AI Research ($0.05)
          </>
        )}
      </Button>
    </div>
  );
}

// ─── CommunicationHistory ────────────────────────────────────────────────────

type TimelineEntry =
  | { kind: "call"; timestamp: bigint; outcome: CallOutcome }
  | { kind: "text"; timestamp: bigint; messageBody: string }
  | { kind: "email"; timestamp: bigint };

const OUTCOME_LABELS: Record<CallOutcome, string> = {
  [CallOutcome.reached]: "Reached",
  [CallOutcome.noAnswer]: "No Answer",
  [CallOutcome.leftVoicemail]: "Left Voicemail",
};

const OUTCOME_COLORS: Record<CallOutcome, string> = {
  [CallOutcome.reached]:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  [CallOutcome.noAnswer]: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  [CallOutcome.leftVoicemail]: "bg-primary/10 text-primary border-primary/20",
};

function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildTimeline(
  calls: CallRecord[],
  texts: TextRecord[],
  emails: EmailRecord[],
): TimelineEntry[] {
  const callEntries: TimelineEntry[] = calls.map((c) => ({
    kind: "call",
    timestamp: c.timestamp,
    outcome: c.outcome,
  }));
  const textEntries: TimelineEntry[] = texts.map((t) => ({
    kind: "text",
    timestamp: t.timestamp,
    messageBody: t.messageBody,
  }));
  const emailEntries: TimelineEntry[] = emails.map((e) => ({
    kind: "email",
    timestamp: e.timestamp,
  }));
  return [...callEntries, ...textEntries, ...emailEntries].sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0,
  );
}

/** Find disposition by scanning note lines for matching action type */
function findDispositionForEntry(
  entry: TimelineEntry,
  leadNotes: string,
  entryIndex: number,
): Disposition | null {
  if (entry.kind !== "call" && entry.kind !== "email") return null;
  const prefix = entry.kind === "call" ? "[Call]" : "[Email]";
  const lines = leadNotes
    .split("\n")
    .filter((l) => l.startsWith(prefix) && l.includes("Disposition:"));
  // Match by position: first disposition line for first entry, etc.
  const line = lines[entryIndex];
  return line ? extractDisposition(line) : null;
}

function CommunicationHistory({
  callHistory,
  textHistory,
  emailHistory,
  leadNotes,
}: {
  callHistory: CallRecord[];
  textHistory: TextRecord[];
  emailHistory: EmailRecord[];
  leadNotes: string;
}) {
  const timeline = buildTimeline(callHistory, textHistory, emailHistory);

  // Track per-kind counters for disposition matching
  const kindCounters: Record<string, number> = {};

  return (
    <div
      className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5"
      data-ocid="comm-history.section"
    >
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 sm:mb-5">
        Communication History
      </h2>

      {timeline.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 py-8 sm:py-10 text-center"
          data-ocid="comm-history.empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            No calls, texts, or emails logged yet
          </p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Use the Call, Text, or Email buttons above to reach out. Your
            outreach activity will appear here.
          </p>
        </div>
      ) : (
        <ol className="relative space-y-0" data-ocid="comm-history.list">
          {timeline.map((entry, i) => {
            const kindKey = entry.kind;
            kindCounters[kindKey] = kindCounters[kindKey] ?? 0;
            const kindIndex = kindCounters[kindKey];
            kindCounters[kindKey] = kindIndex + 1;
            const disposition = findDispositionForEntry(
              entry,
              leadNotes,
              kindIndex,
            );

            return (
              <li
                key={`${entry.kind}-${entry.timestamp.toString()}`}
                className="flex gap-3 pb-5 last:pb-0"
                data-ocid={`comm-history.item.${i + 1}`}
              >
                {/* Icon + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center border shrink-0",
                      entry.kind === "call"
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : entry.kind === "email"
                          ? "bg-sky-500/10 border-sky-500/30 text-sky-600"
                          : "bg-muted border-border text-muted-foreground",
                    ].join(" ")}
                  >
                    {entry.kind === "call" ? (
                      <PhoneCall className="w-3.5 h-3.5" />
                    ) : entry.kind === "email" ? (
                      <Mail className="w-3.5 h-3.5" />
                    ) : (
                      <MessageSquare className="w-3.5 h-3.5" />
                    )}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">
                      {entry.kind === "call"
                        ? "Call"
                        : entry.kind === "email"
                          ? "Email sent"
                          : "Text"}
                    </span>
                    {/* Outcome badge (calls) */}
                    {entry.kind === "call" && (
                      <span
                        className={[
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                          OUTCOME_COLORS[entry.outcome],
                        ].join(" ")}
                      >
                        {OUTCOME_LABELS[entry.outcome]}
                      </span>
                    )}
                    {/* Disposition badge */}
                    {disposition && (
                      <span
                        className={[
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                          DISPOSITION_BADGE_STYLES[disposition],
                        ].join(" ")}
                        data-ocid={`comm-history.disposition_badge.${i + 1}`}
                      >
                        {disposition}
                      </span>
                    )}
                  </div>
                  {entry.kind === "text" && (
                    <p className="text-sm text-foreground break-words mb-1">
                      {entry.messageBody.length > 120
                        ? `${entry.messageBody.slice(0, 120)}…`
                        : entry.messageBody}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(entry.timestamp)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

// ─── InfoRow helper ─────────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <div className="text-sm font-medium break-words text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
