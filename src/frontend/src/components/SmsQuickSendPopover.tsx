/**
 * SmsQuickSendPopover — bottom sheet for quick SMS sends from lead cards.
 *
 * Step 1: Ask "New Message" or "Use Template"
 * Step 2: If template chosen, show template picker; if new, show textarea
 * Step 3: iMessage checkbox + send (iMessage hidden when Phone Link is ON)
 *
 * Layout contract: modal is display:flex flex-direction:column with:
 * - header (shrink-0) always visible
 * - body (flex-1 overflow-y-auto) scrollable
 * - footer (shrink-0) always pinned at the bottom inside the sheet
 * The outer container caps height so it never covers the bottom nav bar.
 */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, MessageSquare, Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SmsTemplate } from "../backend";
import {
  getIMessagePreference,
  setIMessagePreference,
} from "../hooks/useIMessagePreference";
import { useSmsTemplates } from "../hooks/useLeads";
import {
  getPhoneLinkPreference,
  isWindowsDesktop,
} from "../hooks/usePhoneLinkPreference";
import { handleSmsSend } from "../utils/phoneActions";
import { IMessageCheckbox } from "./IMessageCheckbox";

type SendStep = "choice" | "template" | "compose";

interface SmsQuickSendPopoverProps {
  leadName: string;
  phone: string;
  onClose: () => void;
  /** Called after the send action fires so the parent can log it */
  onSent?: (message: string, useIMessage: boolean) => void;
  /** If true, show DNC block and no send button */
  isDnc?: boolean;
}

export function SmsQuickSendPopover({
  leadName,
  phone,
  onClose,
  onSent,
  isDnc = false,
}: SmsQuickSendPopoverProps) {
  const [useIMessage, setUseIMessage] = useState(getIMessagePreference);
  const [step, setStep] = useState<SendStep>(isDnc ? "choice" : "choice");
  const [customMessage, setCustomMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(
    null,
  );
  const overlayRef = useRef<HTMLDivElement>(null);

  const { data: templates = [] } = useSmsTemplates();

  // Read Phone Link state
  const phoneLinkOn = isWindowsDesktop() && getPhoneLinkPreference();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleToggle = (v: boolean) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };

  const messageBody = selectedTemplate ? selectedTemplate.body : customMessage;
  const canSend = messageBody.trim().length > 0;

  const handleSend = () => {
    if (isDnc || !canSend) return;
    handleSmsSend(phone, messageBody.trim(), phoneLinkOn);
    onSent?.(messageBody.trim(), useIMessage);
    onClose();
  };

  const handleChooseNew = () => {
    setSelectedTemplate(null);
    setStep("compose");
  };

  const handleChooseTemplate = () => {
    if (templates.length === 0) {
      // No templates available — fall through to compose
      setStep("compose");
    } else {
      setStep("template");
    }
  };

  const handleSelectTemplate = (tpl: SmsTemplate) => {
    setSelectedTemplate(tpl);
    setStep("compose");
  };

  const handleBackToChoice = () => {
    setStep("choice");
    setSelectedTemplate(null);
    setCustomMessage("");
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      data-ocid="sms_quick_send.dialog"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/*
        Modal sheet — flex column, capped height so footer is always reachable.
        64px = bottom nav bar height, safe-area adds extra on notched phones.
        We subtract 64px from dvh so the sheet NEVER overlaps the nav bar.
      */}
      <div
        className="bg-card w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{
          maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* ── Header — always visible ───────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDnc ? "bg-destructive/10" : "bg-primary/10"
              }`}
            >
              {isDnc ? (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              ) : (
                <MessageSquare className="w-4 h-4 text-primary" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {isDnc ? "Do Not Contact" : "Send Text"}
              </p>
              <p className="text-xs text-muted-foreground">to {leadName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="sms_quick_send.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body — scrollable flex-1 ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 min-h-0">
          {isDnc ? (
            <div
              className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3"
              data-ocid="sms_quick_send.dnc_banner"
            >
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive font-medium">
                This lead is on the Do Not Call list. Texting is blocked.
              </p>
            </div>
          ) : step === "choice" ? (
            /* ── Step 1: New or Template ── */
            <div className="space-y-3" data-ocid="sms_quick_send.choice_step">
              <p className="text-sm font-medium text-foreground">
                How would you like to compose your message?
              </p>
              <button
                type="button"
                onClick={handleChooseNew}
                className="w-full text-left px-4 py-3.5 rounded-xl border-2 border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="sms_quick_send.new_message_button"
              >
                <p className="font-semibold text-sm text-foreground">
                  New Message
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Type a fresh message
                </p>
              </button>
              <button
                type="button"
                onClick={handleChooseTemplate}
                className="w-full text-left px-4 py-3.5 rounded-xl border-2 border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="sms_quick_send.use_template_button"
              >
                <p className="font-semibold text-sm text-foreground">
                  Use Template
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {templates.length > 0
                    ? `Choose from ${templates.length} saved template${templates.length !== 1 ? "s" : ""}`
                    : "No templates saved yet"}
                </p>
              </button>
            </div>
          ) : step === "template" ? (
            /* ── Step 2: Template Picker ── */
            <div className="space-y-3" data-ocid="sms_quick_send.template_step">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBackToChoice}
                  className="text-xs text-primary hover:underline"
                  data-ocid="sms_quick_send.back_button"
                >
                  ← Back
                </button>
                <p className="text-sm font-medium text-foreground">
                  Choose a template
                </p>
              </div>
              {templates.map((tpl, i) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selectedTemplate?.id === tpl.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                  data-ocid={`sms_quick_send.template.${i + 1}`}
                >
                  <p className="font-semibold text-sm text-foreground">
                    {tpl.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {tpl.body.slice(0, 80)}
                    {tpl.body.length > 80 ? "…" : ""}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            /* ── Step 3: Compose + iMessage ── */
            <div className="space-y-4" data-ocid="sms_quick_send.compose_step">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBackToChoice}
                  className="text-xs text-primary hover:underline"
                  data-ocid="sms_quick_send.back_to_choice_button"
                >
                  ← Back
                </button>
                <p className="text-sm font-medium text-foreground">
                  {selectedTemplate
                    ? `Template: ${selectedTemplate.name}`
                    : "New Message"}
                </p>
              </div>
              {selectedTemplate ? (
                <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedTemplate.body}
                  </p>
                </div>
              ) : (
                <Textarea
                  placeholder="Type your message…"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-24 resize-none text-base"
                  style={{ fontSize: "16px" }}
                  autoFocus
                  data-ocid="sms_quick_send.message_textarea"
                />
              )}
              {/* iMessage preference — hidden when Phone Link is ON */}
              {!phoneLinkOn && (
                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                  <IMessageCheckbox
                    checked={useIMessage}
                    onChange={handleToggle}
                  />
                </div>
              )}
              {phoneLinkOn ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  Message will open in Phone Link on your PC
                </div>
              ) : (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {useIMessage
                    ? "Opens your native Messages app (iMessage on iPhone). Blue bubbles confirm delivery."
                    : "Opens your native Messages app with the message pre-filled."}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Footer — always pinned inside the sheet ───────────────────── */}
        <div
          className="flex gap-3 px-5 border-t border-border shrink-0"
          style={{
            paddingTop: "1rem",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Button
            variant="outline"
            className="flex-1 min-h-[48px]"
            onClick={isDnc || step === "choice" ? onClose : handleBackToChoice}
            data-ocid="sms_quick_send.cancel_button"
          >
            {isDnc || step === "choice" ? "Cancel" : "Back"}
          </Button>
          {!isDnc && step === "compose" && (
            <Button
              className="flex-1 min-h-[48px] font-semibold text-white bg-primary hover:bg-primary/90"
              onClick={handleSend}
              disabled={!canSend}
              data-ocid="sms_quick_send.confirm_button"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Text
            </Button>
          )}
          {!isDnc && step === "template" && selectedTemplate && (
            <Button
              className="flex-1 min-h-[48px] font-semibold text-white bg-primary hover:bg-primary/90"
              onClick={() => handleSelectTemplate(selectedTemplate)}
              data-ocid="sms_quick_send.use_selected_button"
            >
              Use Template
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
