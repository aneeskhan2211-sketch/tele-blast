import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Cake,
  CalendarClock,
  Check,
  CheckCheck,
  ExternalLink,
  GitBranch,
  Mail,
  MessageCircle,
  Phone,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IMessageCheckbox } from "../components/IMessageCheckbox";
import {
  getIMessagePreference,
  setIMessagePreference,
} from "../hooks/useIMessagePreference";
import {
  useAddCallRecord,
  useAddEmailRecord,
  useAddTextRecord,
  useEmailTemplates,
  useGetPipelines,
  useLeads,
  useSmsTemplates,
  useUpdateLead,
} from "../hooks/useLeads";
import {
  getPhoneLinkPreference,
  isWindowsDesktop,
} from "../hooks/usePhoneLinkPreference";
import type { EmailTemplate, Lead, Pipeline, SmsTemplate } from "../types";
import { CallOutcome, PipelineStage } from "../types";
import {
  handlePhoneCall,
  handleSmsSend,
  isGoogleVoiceEnabled,
} from "../utils/phoneActions";

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseBirthday(
  birthday: string,
): { month: number; day: number } | null {
  const parts = birthday.split(/[-/]/);
  if (parts.length === 3) {
    return {
      month: Number.parseInt(parts[1], 10),
      day: Number.parseInt(parts[2], 10),
    };
  }
  if (parts.length === 2) {
    return {
      month: Number.parseInt(parts[0], 10),
      day: Number.parseInt(parts[1], 10),
    };
  }
  return null;
}

function daysUntilBirthday(birthday: string): number | null {
  const parsed = parseBirthday(birthday);
  if (!parsed) return null;
  const today = new Date();
  const thisYear = today.getFullYear();
  let next = new Date(thisYear, parsed.month - 1, parsed.day);
  if (next.getMonth() !== parsed.month - 1 || next.getDate() !== parsed.day)
    return null;
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  if (next < todayMidnight)
    next = new Date(thisYear + 1, parsed.month - 1, parsed.day);
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const nextDate = new Date(
    next.getFullYear(),
    next.getMonth(),
    next.getDate(),
  );
  return Math.round((nextDate.getTime() - todayDate.getTime()) / 86_400_000);
}

function formatBirthdayDisplay(birthday: string): string {
  const parsed = parseBirthday(birthday);
  if (!parsed) return birthday;
  const d = new Date(2000, parsed.month - 1, parsed.day);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

function formatFollowUpDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntilFollowUp(dateStr: string): number {
  const d = new Date(dateStr);
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((target.getTime() - todayDate.getTime()) / 86_400_000);
}

function formatDateNote(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function prependNote(existing: string, note: string): string {
  return existing ? `${note}\n\n${existing}` : note;
}

function getLeadDisplayName(lead: Lead): string {
  const parts = [lead.firstName, lead.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return lead.name || "";
}

function getStageBadgeStyle(stage: PipelineStage): string {
  const map: Record<PipelineStage, string> = {
    [PipelineStage.Prospect]: "bg-muted text-muted-foreground",
    [PipelineStage.Contacted]:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    [PipelineStage.Qualified]:
      "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    [PipelineStage.ClosedWon]:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    [PipelineStage.ClosedLost]:
      "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };
  return map[stage] ?? "bg-muted text-muted-foreground";
}

/** Relative time — "just now", "2 hours ago", "3 days ago" */
function relativeTime(createdAt: bigint): string {
  const ms = Number(createdAt);
  const diffMs = Date.now() - ms;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? "min" : "mins"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? "hour" : "hours"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
}

/** A lead counts as "new" if it has no outreach history and was created in
 *  the last 30 days (typically from a sign-up form or recent manual add). */
function isNewLead(lead: Lead): boolean {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const createdMs = Number(lead.createdAt);
  return (
    !lead.isImported &&
    lead.callHistory.length === 0 &&
    lead.textHistory.length === 0 &&
    lead.emailHistory.length === 0 &&
    createdMs >= thirtyDaysAgo
  );
}

// ── Modals ─────────────────────────────────────────────────────────────────────

type ModalMode = "text" | "email" | null;

interface SmsModalProps {
  lead: Lead;
  templates: SmsTemplate[];
  onClose: () => void;
  onSend: (message: string, useIMessage: boolean) => void;
}

function SmsModal({ lead, templates, onClose, onSend }: SmsModalProps) {
  const [selected, setSelected] = useState<string | null>(
    templates.length > 0 ? templates[0].id : null,
  );
  const [custom, setCustom] = useState("");
  const [useIMessage, setUseIMessage] = useState(getIMessagePreference);
  const message = selected
    ? (templates.find((t) => t.id === selected)?.body ?? "")
    : custom;
  const displayName = getLeadDisplayName(lead);

  const handleIMessageToggle = (v: boolean) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="queue.text_modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <p className="font-semibold text-foreground">Send Text</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              to {displayName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="queue.text_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
          {templates.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Choose Template
              </p>
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelected(t.id);
                    setCustom("");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                    selected === t.id
                      ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
                      : "border-border hover:border-orange-300 hover:bg-muted/50"
                  }`}
                  data-ocid="queue.sms_template.item"
                >
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                    {t.body.slice(0, 60)}
                    {t.body.length > 60 ? "…" : ""}
                  </p>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                  selected === null
                    ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
                    : "border-border hover:border-orange-300 hover:bg-muted/50"
                }`}
              >
                <p className="font-medium text-foreground">Custom message</p>
              </button>
            </div>
          )}
          {(selected === null || templates.length === 0) && (
            <Textarea
              placeholder="Type your message…"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="min-h-24 resize-none"
              data-ocid="queue.text_modal.textarea"
            />
          )}
          {/* iMessage preference */}
          <div className="flex items-center rounded-xl border border-border bg-muted/30 px-4 py-3">
            <IMessageCheckbox
              checked={useIMessage}
              onChange={handleIMessageToggle}
            />
          </div>
        </div>
        <div
          className="flex gap-3 px-5 py-4 border-t border-border shrink-0"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="queue.text_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-semibold text-white bg-accent hover:bg-accent/90"
            onClick={() => message.trim() && onSend(message, useIMessage)}
            disabled={!message.trim()}
            data-ocid="queue.text_modal.confirm_button"
          >
            Send Text
          </Button>
        </div>
      </div>
    </div>
  );
}

interface EmailModalProps {
  lead: Lead;
  templates: EmailTemplate[];
  onClose: () => void;
  onSend: (template: EmailTemplate) => void;
}

function EmailModal({ lead, templates, onClose, onSend }: EmailModalProps) {
  const [selected, setSelected] = useState<string | null>(
    templates.length > 0 ? templates[0].id : null,
  );
  const selectedTemplate = templates.find((t) => t.id === selected) ?? null;
  const displayName = getLeadDisplayName(lead);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="queue.email_modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <p className="font-semibold text-foreground">Send Email</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              to {displayName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="queue.email_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-2">
          {templates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No email templates yet. Create one on the Templates page.
            </p>
          ) : (
            templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                  selected === t.id
                    ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
                    : "border-border hover:border-orange-300 hover:bg-muted/50"
                }`}
                data-ocid="queue.email_template.item"
              >
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                  {t.body.slice(0, 60)}
                  {t.body.length > 60 ? "…" : ""}
                </p>
              </button>
            ))
          )}
        </div>
        <div
          className="flex gap-3 px-5 py-4 border-t border-border shrink-0"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="queue.email_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-semibold text-white bg-accent hover:bg-accent/90"
            onClick={() => selectedTemplate && onSend(selectedTemplate)}
            disabled={!selectedTemplate}
            data-ocid="queue.email_modal.confirm_button"
          >
            Open Email
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Welcome Email Modal ─────────────────────────────────────────────────────────

interface WelcomeEmailModalProps {
  lead: Lead;
  onClose: () => void;
  onSendNow: (subject: string, body: string) => void;
  onAddToQueue: (subject: string, body: string) => void;
}

function WelcomeEmailModal({
  lead,
  onClose,
  onSendNow,
  onAddToQueue,
}: WelcomeEmailModalProps) {
  const displayName = getLeadDisplayName(lead);
  const [subject, setSubject] = useState("Welcome!");
  const [body, setBody] = useState(
    `Hi ${displayName},\n\nThank you for your interest! I'd love to connect and show you how Tele-Blast can help you track prospects, manage outreach, and close more deals.\n\nWould you be available for a quick call this week?\n\nLooking forward to connecting,\n[Your Name]`,
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="queue.welcome_email_modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <p className="font-semibold text-foreground">Send Welcome Email</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              to {lead.email || displayName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="queue.welcome_email_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
              To
            </span>
            <p className="text-sm text-foreground px-3 py-2 bg-muted rounded-lg">
              {lead.email || "(no email on file)"}
            </p>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="welcome-subject"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Subject
            </label>
            <input
              id="welcome-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              data-ocid="queue.welcome_email_modal.subject_input"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="welcome-body"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Message
            </label>
            <Textarea
              id="welcome-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-40 resize-none text-sm"
              data-ocid="queue.welcome_email_modal.textarea"
            />
          </div>
        </div>

        <div
          className="flex gap-3 px-5 py-4 border-t border-border shrink-0"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="queue.welcome_email_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-accent text-accent hover:bg-accent/10"
            onClick={() => onAddToQueue(subject, body)}
            disabled={!body.trim()}
            data-ocid="queue.welcome_email_modal.add_to_queue_button"
          >
            Add to Queue
          </Button>
          <Button
            className="flex-1 font-semibold text-white bg-accent hover:bg-accent/90"
            onClick={() => onSendNow(subject, body)}
            disabled={!body.trim()}
            data-ocid="queue.welcome_email_modal.send_now_button"
          >
            Send Now
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Action Buttons ──────────────────────────────────────────────────────

interface ActionButtonsProps {
  index: number;
  prefix: string;
  onCall: () => void;
  onText: () => void;
  onEmail: () => void;
}

function ActionButtons({
  index,
  prefix,
  onCall,
  onText,
  onEmail,
}: ActionButtonsProps) {
  const enabledCls =
    "bg-muted hover:bg-muted/80 text-foreground active:opacity-70";
  const actions = [
    {
      label: "Call",
      icon: <Phone className="w-4 h-4" />,
      handler: onCall,
      suffix: "call_button",
    },
    {
      label: "Text",
      icon: <MessageCircle className="w-4 h-4" />,
      handler: onText,
      suffix: "text_button",
    },
    {
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
      handler: onEmail,
      suffix: "email_button",
    },
  ];
  return (
    <div className="flex gap-2 pt-1">
      {actions.map(({ label, icon, handler, suffix }) => (
        <button
          key={label}
          type="button"
          onClick={handler}
          title={label}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${enabledCls}`}
          data-ocid={`${prefix}.${suffix}.${index}`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Birthday Tab ───────────────────────────────────────────────────────────────

interface BirthdayTabProps {
  leads: Lead[];
  isLoading: boolean;
  onAction: (lead: Lead, mode: ModalMode) => void;
}

function BirthdayTab({ leads, isLoading, onAction }: BirthdayTabProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const birthdayLeads = leads
    .filter((l) => {
      if (!l.birthday) return false;
      const days = daysUntilBirthday(l.birthday);
      return days !== null && days <= 60;
    })
    .map((l) => ({ lead: l, days: daysUntilBirthday(l.birthday!)! }))
    .sort((a, b) => a.days - b.days);

  const todayBirthdays = birthdayLeads.filter(({ days }) => days === 0);

  return (
    <>
      {todayBirthdays
        .filter(({ lead }) => !dismissed.has(lead.id.toString()))
        .map(({ lead }) => (
          <div
            key={lead.id.toString()}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white bg-accent/90"
            data-ocid="queue.birthday_banner"
          >
            <span>
              🎂 Today is {getLeadDisplayName(lead)}'s birthday! Reach out now.
            </span>
            <button
              type="button"
              onClick={() =>
                setDismissed((prev) => new Set([...prev, lead.id.toString()]))
              }
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss"
              data-ocid="queue.birthday_banner.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

      {isLoading && (
        <div className="space-y-3" data-ocid="queue.birthday.loading_state">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && birthdayLeads.length === 0 && (
        <div
          className="flex flex-col items-center gap-4 py-16 text-center"
          data-ocid="queue.birthday.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <Cake className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              No upcoming birthdays found
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Import leads with birthday dates to see them here. Leads with
              birthdays in the next 60 days will appear in this queue.
            </p>
          </div>
        </div>
      )}

      {!isLoading && birthdayLeads.length > 0 && (
        <div className="space-y-3" data-ocid="queue.birthday.list">
          {birthdayLeads.map(({ lead, days }, index) => (
            <div
              key={lead.id.toString()}
              className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3"
              data-ocid={`queue.birthday.item.${index + 1}`}
            >
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-base leading-snug truncate">
                    {getLeadDisplayName(lead)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {lead.birthday ? formatBirthdayDisplay(lead.birthday) : ""}
                  </p>
                </div>
                {days === 0 ? (
                  <Badge className="shrink-0 text-white font-semibold px-2.5 py-1 bg-accent border-0">
                    Today! 🎂
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="shrink-0">
                    in {days} {days === 1 ? "day" : "days"}
                  </Badge>
                )}
              </div>
              {(lead.phone || lead.email) && (
                <div className="flex flex-col gap-1">
                  {lead.phone && (
                    <p className="text-xs text-muted-foreground">
                      {lead.phone}
                    </p>
                  )}
                  {lead.email && (
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.email}
                    </p>
                  )}
                </div>
              )}
              <ActionButtons
                index={index + 1}
                prefix="queue.birthday"
                onCall={() => onAction(lead, null)}
                onText={() => onAction(lead, "text")}
                onEmail={() => onAction(lead, "email")}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── Follow-Up Tab ──────────────────────────────────────────────────────────────

interface FollowUpTabProps {
  leads: Lead[];
  isLoading: boolean;
  onAction: (lead: Lead, mode: ModalMode) => void;
}

function FollowUpTab({ leads, isLoading, onAction }: FollowUpTabProps) {
  const followUpLeads = leads
    .filter((l) => !!l.followUpDate)
    .map((l) => ({ lead: l, days: daysUntilFollowUp(l.followUpDate!) }))
    .sort((a, b) => a.days - b.days);

  return (
    <>
      {isLoading && (
        <div className="space-y-3" data-ocid="queue.followup.loading_state">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && followUpLeads.length === 0 && (
        <div
          className="flex flex-col items-center gap-4 py-16 text-center"
          data-ocid="queue.followup.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <CalendarClock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              No follow-ups scheduled
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Set a follow-up date after a call or email to see leads here.
            </p>
          </div>
        </div>
      )}

      {!isLoading && followUpLeads.length > 0 && (
        <div className="space-y-3" data-ocid="queue.followup.list">
          {followUpLeads.map(({ lead, days }, index) => {
            const isOverdue = days < 0;
            const isToday = days === 0;
            return (
              <div
                key={lead.id.toString()}
                className={`bg-card rounded-xl border p-4 flex flex-col gap-3 ${
                  isOverdue
                    ? "border-orange-300 dark:border-orange-800/60"
                    : "border-border"
                }`}
                data-ocid={`queue.followup.item.${index + 1}`}
              >
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-base leading-snug truncate">
                      {getLeadDisplayName(lead)}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStageBadgeStyle(lead.pipelineStage)}`}
                      >
                        {lead.pipelineStage}
                      </span>
                      {lead.followUpDate && (
                        <span className="text-xs text-muted-foreground">
                          {formatFollowUpDate(lead.followUpDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  {isOverdue ? (
                    <Badge className="shrink-0 font-semibold px-2.5 py-1 text-white bg-accent border-0">
                      Overdue
                    </Badge>
                  ) : isToday ? (
                    <Badge className="shrink-0 font-semibold px-2.5 py-1 text-white bg-primary border-0">
                      Today
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">
                      in {days} {days === 1 ? "day" : "days"}
                    </Badge>
                  )}
                </div>

                {(lead.phone || lead.email) && (
                  <div className="flex flex-col gap-0.5">
                    {lead.phone && (
                      <p className="text-xs text-muted-foreground">
                        {lead.phone}
                      </p>
                    )}
                    {lead.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.email}
                      </p>
                    )}
                  </div>
                )}

                <ActionButtons
                  index={index + 1}
                  prefix="queue.followup"
                  onCall={() => onAction(lead, null)}
                  onText={() => onAction(lead, "text")}
                  onEmail={() => onAction(lead, "email")}
                />

                <Link
                  to="/leads/$id"
                  params={{ id: lead.id.toString() }}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors self-start"
                  data-ocid={`queue.followup.view_lead.${index + 1}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Lead
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// ── New Leads Tab ──────────────────────────────────────────────────────────────

interface QueuedEmail {
  leadId: string;
  leadName: string;
  email: string;
  subject: string;
  body: string;
}

interface NewLeadsTabProps {
  leads: Lead[];
  isLoading: boolean;
  onAction: (lead: Lead, mode: ModalMode) => void;
  pipelines: Pipeline[];
}

function NewLeadsTab({
  leads,
  isLoading,
  onAction,
  pipelines,
}: NewLeadsTabProps) {
  /** Track leads marked as reviewed — they disappear from the queue in this session */
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const newLeads = leads
    .filter(isNewLead)
    .filter((l) => !reviewedIds.has(l.id.toString()))
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  const [welcomeModalLead, setWelcomeModalLead] = useState<Lead | null>(null);
  const [queuedEmails, setQueuedEmails] = useState<QueuedEmail[]>([]);
  const [sentLeadIds, setSentLeadIds] = useState<Set<string>>(new Set());
  const [queuedLeadIds, setQueuedLeadIds] = useState<Set<string>>(new Set());
  const [queuedOpen, setQueuedOpen] = useState(false);

  const addEmail = useAddEmailRecord();
  const updateLead = useUpdateLead();

  function handleSendNow(subject: string, body: string) {
    const lead = welcomeModalLead;
    if (!lead) return;
    setWelcomeModalLead(null);
    if (lead.email) {
      const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = mailtoUrl;
      } else {
        window.open(mailtoUrl, "_blank", "noopener,noreferrer");
      }
    }
    Promise.allSettled([
      addEmail.mutateAsync({ leadId: lead.id, timestamp: BigInt(Date.now()) }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: {
          notes: prependNote(
            lead.notes,
            `Welcome email sent on ${formatDateNote()}`,
          ),
        },
      }),
    ]);
    setSentLeadIds((prev) => new Set([...prev, lead.id.toString()]));
    toast.success(`Welcome email opened for ${getLeadDisplayName(lead)}`);
  }

  function handleAddToQueue(subject: string, body: string) {
    const lead = welcomeModalLead;
    if (!lead) return;
    setWelcomeModalLead(null);
    setQueuedEmails((prev) => [
      ...prev,
      {
        leadId: lead.id.toString(),
        leadName: getLeadDisplayName(lead),
        email: lead.email ?? "",
        subject,
        body,
      },
    ]);
    setQueuedLeadIds((prev) => new Set([...prev, lead.id.toString()]));
    toast.success(
      `Welcome email added to queue for ${getLeadDisplayName(lead)}`,
    );
  }

  function handleSendQueued(q: QueuedEmail) {
    if (q.email) {
      const mailtoUrl = `mailto:${q.email}?subject=${encodeURIComponent(q.subject)}&body=${encodeURIComponent(q.body)}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = mailtoUrl;
      } else {
        window.open(mailtoUrl, "_blank", "noopener,noreferrer");
      }
    }
    setQueuedEmails((prev) => prev.filter((e) => e.leadId !== q.leadId));
    setSentLeadIds((prev) => new Set([...prev, q.leadId]));
    setQueuedLeadIds((prev) => {
      const next = new Set(prev);
      next.delete(q.leadId);
      return next;
    });
    toast.success(`Welcome email opened for ${q.leadName}`);
  }

  return (
    <>
      {isLoading && (
        <div className="space-y-3" data-ocid="queue.newleads.loading_state">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && newLeads.length === 0 && (
        <div
          className="flex flex-col items-center gap-4 py-16 text-center"
          data-ocid="queue.newleads.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10">
            <UserPlus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No new leads yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              New sign-ups from your forms will appear here.
            </p>
          </div>
        </div>
      )}

      {!isLoading && newLeads.length > 0 && (
        <div className="space-y-3" data-ocid="queue.newleads.list">
          {newLeads.map((lead, index) => {
            const isSent = sentLeadIds.has(lead.id.toString());
            const isQueued = queuedLeadIds.has(lead.id.toString());
            const pipelineName = lead.pipelineId
              ? pipelines.find((p) => p.id === lead.pipelineId)?.name
              : null;
            return (
              <div
                key={lead.id.toString()}
                className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3"
                data-ocid={`queue.newleads.item.${index + 1}`}
              >
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-base leading-snug truncate">
                      {getLeadDisplayName(lead)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Submitted {relativeTime(lead.createdAt)}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-xs bg-accent/10 text-accent border-accent/20"
                  >
                    New Lead
                  </Badge>
                </div>

                {/* Contact details */}
                {(lead.phone || lead.email) && (
                  <div className="flex flex-col gap-0.5">
                    {lead.phone && (
                      <p className="text-xs text-muted-foreground">
                        {lead.phone}
                      </p>
                    )}
                    {lead.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.email}
                      </p>
                    )}
                  </div>
                )}

                {/* Pipeline badge */}
                {pipelineName && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GitBranch className="w-3.5 h-3.5 shrink-0" />
                    <span>{pipelineName}</span>
                  </div>
                )}

                {/* Welcome email button */}
                {isSent ? (
                  <div className="flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 py-1">
                    <Check className="w-3.5 h-3.5" />
                    Welcome email sent
                  </div>
                ) : isQueued ? (
                  <div className="flex items-center gap-2 text-xs font-medium text-accent py-1">
                    <Check className="w-3.5 h-3.5" />
                    Added to queue
                  </div>
                ) : (
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-white min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95 bg-accent"
                    onClick={() => setWelcomeModalLead(lead)}
                    data-ocid={`queue.newleads.welcome_button.${index + 1}`}
                  >
                    <Mail className="w-4 h-4" />
                    Send Welcome Email
                  </button>
                )}

                <ActionButtons
                  index={index + 1}
                  prefix="queue.newleads"
                  onCall={() => onAction(lead, null)}
                  onText={() => onAction(lead, "text")}
                  onEmail={() => onAction(lead, "email")}
                />

                {/* Bottom row: View Lead + Mark Reviewed */}
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to="/leads/$id"
                    params={{ id: lead.id.toString() }}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid={`queue.newleads.view_lead.${index + 1}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Lead
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      setReviewedIds(
                        (prev) => new Set([...prev, lead.id.toString()]),
                      );
                      // Log a note that the lead was reviewed from the queue
                      await updateLead.mutateAsync({
                        id: lead.id,
                        updates: {
                          notes: prependNote(
                            lead.notes,
                            `Reviewed from New Lead Queue on ${formatDateNote()}`,
                          ),
                        },
                      });
                      toast.success(
                        `${getLeadDisplayName(lead)} marked as reviewed`,
                      );
                    }}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    data-ocid={`queue.newleads.mark_reviewed_button.${index + 1}`}
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark Reviewed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Queued emails collapsible section */}
      {queuedEmails.length > 0 && (
        <div className="mt-4 border border-border rounded-xl overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted transition-colors text-sm font-semibold text-foreground min-h-[44px]"
            onClick={() => setQueuedOpen((v) => !v)}
            data-ocid="queue.newleads.queued_emails_toggle"
          >
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              Queued Emails
              <Badge className="text-white bg-accent border-0 text-xs px-2 py-0.5">
                {queuedEmails.length}
              </Badge>
            </span>
            <span className="text-muted-foreground text-xs">
              {queuedOpen ? "Hide" : "Show"}
            </span>
          </button>
          {queuedOpen && (
            <div className="divide-y divide-border">
              {queuedEmails.map((q) => (
                <div
                  key={q.leadId}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                  data-ocid={`queue.newleads.queued_email.${q.leadId}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {q.leadName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {q.email || "(no email)"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0 text-white bg-accent hover:bg-accent/90 text-xs"
                    onClick={() => handleSendQueued(q)}
                    data-ocid={`queue.newleads.send_queued_button.${q.leadId}`}
                  >
                    Send
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Welcome email modal */}
      {welcomeModalLead && (
        <WelcomeEmailModal
          lead={welcomeModalLead}
          onClose={() => setWelcomeModalLead(null)}
          onSendNow={handleSendNow}
          onAddToQueue={handleAddToQueue}
        />
      )}
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

type TabKey = "birthday" | "followup" | "newleads";

export default function QueuePage() {
  const { data: leads = [], isLoading } = useLeads();
  const { data: smsTemplates = [] } = useSmsTemplates();
  const { data: emailTemplates = [] } = useEmailTemplates();
  const { data: pipelines = [] } = useGetPipelines();
  const addCall = useAddCallRecord();
  const addText = useAddTextRecord();
  const addEmail = useAddEmailRecord();
  const updateLead = useUpdateLead();

  const [activeTab, setActiveTab] = useState<TabKey>("birthday");
  const [modal, setModal] = useState<{
    mode: Exclude<ModalMode, null>;
    lead: Lead;
  } | null>(null);

  const newLeadsCount = leads.filter(isNewLead).length;

  async function handleCall(lead: Lead) {
    const phoneLinkOn = isWindowsDesktop() && getPhoneLinkPreference();
    const gvOn = isGoogleVoiceEnabled();
    if (lead.phone) {
      handlePhoneCall(lead.phone, phoneLinkOn, gvOn);
    }
    const note = `Called on ${formatDateNote()} from Queue`;
    await Promise.allSettled([
      addCall.mutateAsync({ leadId: lead.id, outcome: CallOutcome.reached }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Call logged for ${getLeadDisplayName(lead)}`);
  }

  async function handleTextSend(
    lead: Lead,
    message: string,
    useIMessage: boolean,
  ) {
    setModal(null);
    const snippet = message.length > 40 ? `${message.slice(0, 40)}…` : message;
    if (lead.phone) {
      const phoneLinkOn = isWindowsDesktop() && getPhoneLinkPreference();
      handleSmsSend(lead.phone, message, phoneLinkOn);
    }
    const via = useIMessage ? " (iMessage)" : "";
    const note = `Texted on ${formatDateNote()} from Queue${via}: ${snippet}`;
    await Promise.allSettled([
      addText.mutateAsync({ leadId: lead.id, messageBody: message }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Text logged for ${getLeadDisplayName(lead)}`);
  }

  async function handleEmailSend(lead: Lead, template: EmailTemplate) {
    setModal(null);
    if (lead.email) {
      const subject = encodeURIComponent(template.subject);
      const normalizedBody = template.body
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
      const body = encodeURIComponent(normalizedBody);
      const mailtoUrl = `mailto:${lead.email}?subject=${subject}&body=${body}`;
      // On mobile use location.href so the native email app opens correctly
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = mailtoUrl;
      } else {
        window.open(mailtoUrl, "_blank", "noopener,noreferrer");
      }
    }
    const note = `Emailed on ${formatDateNote()} from Queue`;
    await Promise.allSettled([
      addEmail.mutateAsync({ leadId: lead.id, timestamp: BigInt(Date.now()) }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Email logged for ${getLeadDisplayName(lead)}`);
  }

  function handleAction(lead: Lead, mode: ModalMode) {
    if (mode === null) {
      handleCall(lead);
    } else {
      setModal({ mode, lead });
    }
  }

  return (
    <>
      <div
        className="max-w-2xl mx-auto px-4 py-6 space-y-5"
        data-ocid="queue.page"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary">
            <CalendarClock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              Queue
            </h1>
            <p className="text-sm text-muted-foreground">
              Birthdays, follow-ups & new leads
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div
          className="flex gap-1 p-1 rounded-xl bg-primary/10"
          role="tablist"
          data-ocid="queue.tab"
        >
          {(
            [
              {
                key: "birthday" as TabKey,
                fullLabel: "Birthday Queue",
                shortLabel: "Birthdays",
                icon: <Cake className="w-4 h-4" />,
                count: null,
              },
              {
                key: "followup" as TabKey,
                fullLabel: "Follow-Up Queue",
                shortLabel: "Follow-Ups",
                icon: <CalendarClock className="w-4 h-4" />,
                count: null,
              },
              {
                key: "newleads" as TabKey,
                fullLabel: "New Leads",
                shortLabel: "New",
                icon: <UserPlus className="w-4 h-4" />,
                count: newLeadsCount > 0 ? newLeadsCount : null,
              },
            ] as const
          ).map(({ key, fullLabel, shortLabel, icon, count }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? "text-white shadow-sm bg-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`queue.${key}.tab`}
            >
              {icon}
              <span className="hidden sm:inline">{fullLabel}</span>
              <span className="sm:hidden">{shortLabel}</span>
              {count !== null && (
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                    activeTab === key
                      ? "bg-white/30 text-white"
                      : "bg-accent text-white"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "birthday" && (
          <BirthdayTab
            leads={leads}
            isLoading={isLoading}
            onAction={handleAction}
          />
        )}
        {activeTab === "followup" && (
          <FollowUpTab
            leads={leads}
            isLoading={isLoading}
            onAction={handleAction}
          />
        )}
        {activeTab === "newleads" && (
          <NewLeadsTab
            leads={leads}
            isLoading={isLoading}
            onAction={handleAction}
            pipelines={pipelines}
          />
        )}
      </div>

      {modal?.mode === "text" && (
        <SmsModal
          lead={modal.lead}
          templates={smsTemplates}
          onClose={() => setModal(null)}
          onSend={(msg, iMsg) => handleTextSend(modal.lead, msg, iMsg)}
        />
      )}

      {modal?.mode === "email" && (
        <EmailModal
          lead={modal.lead}
          templates={emailTemplates}
          onClose={() => setModal(null)}
          onSend={(tpl) => handleEmailSend(modal.lead, tpl)}
        />
      )}
    </>
  );
}
