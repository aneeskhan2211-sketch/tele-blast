import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Cake, Mail, MessageCircle, Phone, X } from "lucide-react";
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
  useLeads,
  useSmsTemplates,
} from "../hooks/useLeads";
import { useUpdateLead } from "../hooks/useLeads";
import type { EmailTemplate, Lead, SmsTemplate } from "../types";
import { CallOutcome } from "../types";
import { buildGoogleVoiceUrl } from "./TwilioSetupPage";

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseBirthday(
  birthday: string,
): { month: number; day: number } | null {
  // Trim whitespace and normalise separators
  const v = birthday.trim();
  if (!v) return null;

  // Accept YYYY-MM-DD, MM-DD, MM/DD — split on / or -
  const parts = v.split(/[-/]/);
  let month: number;
  let day: number;

  if (parts.length === 3) {
    // YYYY-MM-DD (4-digit first part)
    if (parts[0].length === 4) {
      month = Number.parseInt(parts[1], 10);
      day = Number.parseInt(parts[2], 10);
    } else {
      // MM-DD-YYYY or ambiguous — take first two as month/day
      month = Number.parseInt(parts[0], 10);
      day = Number.parseInt(parts[1], 10);
    }
  } else if (parts.length === 2) {
    // MM-DD or MM/DD
    month = Number.parseInt(parts[0], 10);
    day = Number.parseInt(parts[1], 10);
  } else {
    return null;
  }

  if (
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return { month, day };
}

function daysUntilBirthday(birthday: string): number | null {
  const parsed = parseBirthday(birthday);
  if (!parsed) return null;

  const today = new Date();
  const thisYear = today.getFullYear();

  let next = new Date(thisYear, parsed.month - 1, parsed.day);
  if (next.getMonth() !== parsed.month - 1 || next.getDate() !== parsed.day) {
    return null; // invalid date (e.g. Feb 30)
  }

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  if (next < todayMidnight) {
    next = new Date(thisYear + 1, parsed.month - 1, parsed.day);
  }

  // Normalise to date only
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

// ── Template Modal ─────────────────────────────────────────────────────────────

type ModalMode = "text" | "email" | null;

interface TemplateSmsModalProps {
  lead: Lead;
  templates: SmsTemplate[];
  onClose: () => void;
  onSend: (message: string, useIMessage: boolean) => void;
}

function SmsTemplateModal({
  lead,
  templates,
  onClose,
  onSend,
}: TemplateSmsModalProps) {
  const [selected, setSelected] = useState<string | null>(
    templates.length > 0 ? templates[0].id : null,
  );
  const [custom, setCustom] = useState("");
  const [useIMessage, setUseIMessage] = useState(getIMessagePreference);

  const message = selected
    ? (templates.find((t) => t.id === selected)?.body ?? "")
    : custom;

  const handleIMessageToggle = (v: boolean) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="birthday.text_modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: "oklch(0.28 0.12 264 / 0.15)" }}
        >
          <div>
            <p className="font-semibold text-foreground">Send Text</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              to {lead.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="birthday.text_modal.close_button"
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
                  data-ocid="birthday.sms_template.item"
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
                onClick={() => {
                  setSelected(null);
                }}
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
              data-ocid="birthday.text_modal.textarea"
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
          className="flex gap-3 px-5 py-4 border-t shrink-0"
          style={{
            borderColor: "oklch(0.28 0.12 264 / 0.15)",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="birthday.text_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-semibold text-white"
            style={{ background: "oklch(0.56 0.16 44)" }}
            onClick={() => message.trim() && onSend(message, useIMessage)}
            disabled={!message.trim()}
            data-ocid="birthday.text_modal.confirm_button"
          >
            Send Text
          </Button>
        </div>
      </div>
    </div>
  );
}

interface EmailTemplateModalProps {
  lead: Lead;
  templates: EmailTemplate[];
  onClose: () => void;
  onSend: (template: EmailTemplate) => void;
}

function EmailTemplateModal({
  lead,
  templates,
  onClose,
  onSend,
}: EmailTemplateModalProps) {
  const [selected, setSelected] = useState<string | null>(
    templates.length > 0 ? templates[0].id : null,
  );

  const selectedTemplate = templates.find((t) => t.id === selected) ?? null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="birthday.email_modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: "oklch(0.28 0.12 264 / 0.15)" }}
        >
          <div>
            <p className="font-semibold text-foreground">Send Email</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              to {lead.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="birthday.email_modal.close_button"
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
                data-ocid="birthday.email_template.item"
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
          className="flex gap-3 px-5 py-4 border-t shrink-0"
          style={{
            borderColor: "oklch(0.28 0.12 264 / 0.15)",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="birthday.email_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-semibold text-white"
            style={{ background: "oklch(0.56 0.16 44)" }}
            onClick={() => selectedTemplate && onSend(selectedTemplate)}
            disabled={!selectedTemplate}
            data-ocid="birthday.email_modal.confirm_button"
          >
            Open Email
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Lead Card ─────────────────────────────────────────────────────────────────

interface BirthdayCardProps {
  lead: Lead;
  days: number;
  index: number;
  onCall: () => void;
  onText: () => void;
  onEmail: () => void;
}

function BirthdayCard({
  lead,
  days,
  index,
  onCall,
  onText,
  onEmail,
}: BirthdayCardProps) {
  const birthdayLabel = lead.birthday
    ? formatBirthdayDisplay(lead.birthday)
    : "";

  return (
    <div
      className="bg-card rounded-xl border p-4 flex flex-col gap-3"
      style={{ borderColor: "oklch(0.22 0.12 264 / 0.25)" }}
      data-ocid={`birthday.item.${index}`}
    >
      {/* Top row: name + days badge */}
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-base leading-snug truncate">
            {lead.name}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {birthdayLabel}
          </p>
        </div>
        {days === 0 ? (
          <Badge
            className="shrink-0 text-white font-semibold px-2.5 py-1"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            Today! 🎂
          </Badge>
        ) : (
          <Badge variant="secondary" className="shrink-0">
            in {days} {days === 1 ? "day" : "days"}
          </Badge>
        )}
      </div>

      {/* Contact info */}
      <div className="flex flex-col gap-1">
        {lead.phone && (
          <p className="text-xs text-muted-foreground">{lead.phone}</p>
        )}
        {lead.email && (
          <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCall}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] bg-muted hover:bg-muted/80 text-foreground active:opacity-70"
          data-ocid={`birthday.call_button.${index}`}
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
        <button
          type="button"
          onClick={onText}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] bg-muted hover:bg-muted/80 text-foreground active:opacity-70"
          data-ocid={`birthday.text_button.${index}`}
        >
          <MessageCircle className="w-4 h-4" />
          Text
        </button>
        <button
          type="button"
          onClick={onEmail}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] bg-muted hover:bg-muted/80 text-foreground active:opacity-70"
          data-ocid={`birthday.email_button.${index}`}
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function BirthdayQueuePage() {
  const { data: leads = [], isLoading } = useLeads();
  const { data: smsTemplates = [] } = useSmsTemplates();
  const { data: emailTemplates = [] } = useEmailTemplates();
  const addCall = useAddCallRecord();
  const addText = useAddTextRecord();
  const addEmail = useAddEmailRecord();
  const updateLead = useUpdateLead();

  const [modal, setModal] = useState<{ mode: ModalMode; lead: Lead } | null>(
    null,
  );

  // Filter + sort: birthday within next 60 days
  const birthdayLeads = leads
    .filter((l) => {
      if (!l.birthday) return false;
      const days = daysUntilBirthday(l.birthday);
      return days !== null && days <= 60;
    })
    .map((l) => ({ lead: l, days: daysUntilBirthday(l.birthday!)! }))
    .sort((a, b) => a.days - b.days);

  // ── Handlers ────────────────────────────────────────────────────────────────

  async function handleCall(lead: Lead) {
    const gvEnabled =
      localStorage.getItem("googleVoiceEnabled") === "true" ||
      localStorage.getItem("google_voice_enabled") === "true" ||
      !!localStorage.getItem("google_voice_url");
    if (lead.phone) {
      if (gvEnabled) {
        window.open(
          buildGoogleVoiceUrl(lead.phone),
          "_blank",
          "noopener,noreferrer",
        );
      } else {
        window.open(`tel:${lead.phone}`, "_self");
      }
    }
    const note = `Called on ${formatDateNote()} from Birthday Queue`;
    await Promise.allSettled([
      addCall.mutateAsync({ leadId: lead.id, outcome: CallOutcome.reached }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Call logged for ${lead.name}`);
  }

  async function handleTextSend(
    lead: Lead,
    message: string,
    useIMessage: boolean,
  ) {
    setModal(null);
    const snippet = message.length > 40 ? `${message.slice(0, 40)}…` : message;
    if (lead.phone) {
      window.open(
        `sms:${lead.phone}?body=${encodeURIComponent(message)}`,
        "_self",
      );
    }
    const via = useIMessage ? " (iMessage)" : "";
    const note = `Texted on ${formatDateNote()} from Birthday Queue${via}: ${snippet}`;
    await Promise.allSettled([
      addText.mutateAsync({ leadId: lead.id, messageBody: message }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Text logged for ${lead.name}`);
  }

  async function handleEmailSend(lead: Lead, template: EmailTemplate) {
    setModal(null);
    if (lead.email) {
      const normalizedBody = template.body
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
      const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(normalizedBody)}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = mailtoUrl;
      } else {
        window.open(mailtoUrl, "_blank");
      }
    }
    const note = `Emailed on ${formatDateNote()} from Birthday Queue`;
    await Promise.allSettled([
      addEmail.mutateAsync({ leadId: lead.id, timestamp: BigInt(Date.now()) }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) },
      }),
    ]);
    toast.success(`Email logged for ${lead.name}`);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3" data-ocid="birthday.page">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.22 0.12 264)" }}
          >
            <Cake className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              Birthday Queue
            </h1>
            <p className="text-sm text-muted-foreground">Next 60 days</p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3" data-ocid="birthday.loading_state">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && birthdayLeads.length === 0 && (
          <div
            className="flex flex-col items-center gap-4 py-16 text-center"
            data-ocid="birthday.empty_state"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.22 0.12 264 / 0.08)" }}
            >
              <Cake className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                No birthdays in the next 60 days
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Add birthdays to your leads to get started.
              </p>
            </div>
          </div>
        )}

        {/* Lead cards */}
        {!isLoading && birthdayLeads.length > 0 && (
          <div className="space-y-3" data-ocid="birthday.list">
            {birthdayLeads.map(({ lead, days }, index) => (
              <BirthdayCard
                key={lead.id.toString()}
                lead={lead}
                days={days}
                index={index + 1}
                onCall={() => handleCall(lead)}
                onText={() => setModal({ mode: "text", lead })}
                onEmail={() => setModal({ mode: "email", lead })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.mode === "text" && (
        <SmsTemplateModal
          lead={modal.lead}
          templates={smsTemplates}
          onClose={() => setModal(null)}
          onSend={(msg, iMsg) => handleTextSend(modal.lead, msg, iMsg)}
        />
      )}
      {modal?.mode === "email" && (
        <EmailTemplateModal
          lead={modal.lead}
          templates={emailTemplates}
          onClose={() => setModal(null)}
          onSend={(tpl) => handleEmailSend(modal.lead, tpl)}
        />
      )}
    </>
  );
}
