import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { u as useLeads, z as useSmsTemplates, p as useAddCallRecord, q as useAddTextRecord, i as useUpdateLead, C as Card, A as CardHeader, D as CardTitle, E as CardContent, B as Button, S as Skeleton, v as Badge, T as Textarea, m as isGoogleVoiceEnabled, l as handlePhoneCall, y as handleSmsSend, F as Checkbox } from "./index-DsrDu9m3.js";
import { C as CallOutcome, P as PipelineStage } from "./vendor-ic-W9L5KZ_F.js";
import { s as spinText, m as mergeTags } from "./textSpinner-7_PX0Sl3.js";
import { Z as Zap, aK as ChevronRight, P as Phone, Y as MessageSquare, J as CircleCheck, a4 as RefreshCw, X, aL as Info, ai as PhoneCall, aM as Voicemail, aN as Send, at as ShieldOff, aC as CalendarDays, aD as SkipForward } from "./vendor-DT3DREzx.js";
import "./vendor-router-gX3Sk5jz.js";
const LS_NUMBERS_KEY = "twilio_numbers";
const LS_ROUND_ROBIN_KEY = "twilio_round_robin";
function loadTwilioNumbers() {
  try {
    const raw = localStorage.getItem(LS_NUMBERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
  }
  return [];
}
function isRoundRobinEnabled() {
  try {
    return localStorage.getItem(LS_ROUND_ROBIN_KEY) === "true";
  } catch {
    return false;
  }
}
const DISPOSITIONS = [
  "Answered",
  "No Answer",
  "Left Voicemail",
  "Callback Requested",
  "Not Interested",
  "Closed / Won"
];
const DISPOSITION_COLORS = {
  Answered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20",
  "No Answer": "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/20",
  "Left Voicemail": "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
  "Callback Requested": "bg-sky-500/10 text-sky-700 border-sky-500/30 hover:bg-sky-500/20",
  "Not Interested": "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Closed / Won": "bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25"
};
const DISPOSITION_ACTIVE_COLORS = {
  Answered: "bg-emerald-500 text-white border-emerald-500",
  "No Answer": "bg-amber-500 text-white border-amber-500",
  "Left Voicemail": "bg-primary text-primary-foreground border-primary",
  "Callback Requested": "bg-sky-500 text-white border-sky-500",
  "Not Interested": "bg-destructive text-destructive-foreground border-destructive",
  "Closed / Won": "bg-emerald-600 text-white border-emerald-600"
};
const STAGE_LABELS = {
  [PipelineStage.Prospect]: "Prospect",
  [PipelineStage.Contacted]: "Contacted",
  [PipelineStage.Qualified]: "Qualified",
  [PipelineStage.ClosedWon]: "Closed Won",
  [PipelineStage.ClosedLost]: "Closed Lost"
};
const STAGE_COLORS = {
  [PipelineStage.Prospect]: "bg-secondary text-secondary-foreground",
  [PipelineStage.Contacted]: "bg-primary/10 text-primary",
  [PipelineStage.Qualified]: "bg-accent/10 text-accent-foreground",
  [PipelineStage.ClosedWon]: "bg-accent/20 text-accent-foreground",
  [PipelineStage.ClosedLost]: "bg-destructive/10 text-destructive"
};
function formatPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}
function wasCalledToday(lead) {
  if (!lead.callHistory || lead.callHistory.length === 0) return false;
  const todayStart = /* @__PURE__ */ new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  return lead.callHistory.some((record) => {
    const tsMs = Number(record.timestamp) / 1e6;
    return tsMs >= todayStartMs;
  });
}
function formatNoteDate(date) {
  return date.toLocaleString(void 0, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function prependNote(existing, line) {
  return existing ? `${line}
${existing}` : line;
}
function LeadRow({
  lead,
  checked,
  onToggle,
  index
}) {
  const isDnc = lead.isDnc;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `w-full flex items-center gap-3 px-4 py-3 min-h-[52px] border-b border-border last:border-0 transition-colors text-left ${isDnc ? "opacity-60 cursor-not-allowed bg-destructive/5" : checked ? "bg-primary/5 hover:bg-primary/8 active:bg-primary/10" : "hover:bg-muted/40 active:bg-muted/60"}`,
      onClick: () => !isDnc && onToggle(lead.id),
      disabled: isDnc,
      title: isDnc ? "This lead is on the Do Not Call list" : void 0,
      "data-ocid": `dialer.lead.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: isDnc ? false : checked,
            onCheckedChange: () => !isDnc && onToggle(lead.id),
            onClick: (e) => e.stopPropagation(),
            disabled: isDnc,
            className: "shrink-0",
            "data-ocid": `dialer.checkbox.${index}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: lead.name }),
            isDnc && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3 h-3" }),
              "DNC"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
            isDnc ? "Do Not Call — cannot be selected" : lead.industry,
            !isDnc && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden xs:inline", children: [
              " ",
              "· ",
              formatPhone(lead.phone)
            ] })
          ] })
        ] }),
        !isDnc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-mono hidden sm:block shrink-0", children: formatPhone(lead.phone) }),
        !isDnc && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `text-xs ${STAGE_COLORS[lead.pipelineStage]} border-0 hidden md:inline-flex shrink-0`,
            children: STAGE_LABELS[lead.pipelineStage]
          }
        )
      ]
    }
  );
}
function ModeCard({
  selected,
  onClick,
  icon,
  label,
  description,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `flex-1 flex items-center gap-3 px-4 py-5 rounded-xl border-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[72px] ${selected ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40 active:bg-muted/40"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `shrink-0 ${selected ? "text-primary" : "text-muted-foreground"}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: description })
        ] }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary ml-auto shrink-0" })
      ]
    }
  );
}
function DispositionStep({
  lead,
  mode,
  defaultDisposition,
  onSave,
  onSkip,
  isSaving
}) {
  const [selected, setSelected] = reactExports.useState(
    defaultDisposition ?? null
  );
  const [followUpDate, setFollowUpDate] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (defaultDisposition) setSelected(defaultDisposition);
  }, [defaultDisposition]);
  const modeLabel = mode === "call" ? "call" : "text";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-sm border-border",
      "data-ocid": "dialer.disposition_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold", children: [
            "How did the ",
            modeLabel,
            " go?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            lead.name,
            " · ",
            formatPhone(lead.phone)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Disposition" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                "data-ocid": "dialer.disposition_options",
                children: DISPOSITIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelected(d),
                    "data-ocid": `dialer.disposition_chip.${d.toLowerCase().replace(/[\s/]+/g, "_")}`,
                    className: [
                      "px-3 py-2.5 rounded-lg border text-sm font-medium transition-all min-h-[44px] text-left",
                      selected === d ? DISPOSITION_ACTIVE_COLORS[d] : DISPOSITION_COLORS[d]
                    ].join(" "),
                    children: d
                  },
                  d
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "dialer-followup-date",
                className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                  "Set a follow-up date (optional)"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "dialer-followup-date",
                type: "date",
                value: followUpDate,
                onChange: (e) => setFollowUpDate(e.target.value),
                className: "w-full px-3 py-2.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring min-h-[44px]",
                "data-ocid": "dialer.followup_date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 gap-2 min-h-[48px] text-sm text-muted-foreground hover:text-foreground",
                onClick: onSkip,
                disabled: isSaving,
                "data-ocid": "dialer.disposition_skip_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4" }),
                  "Skip"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-2 flex-1 gap-2 bg-primary text-white hover:bg-primary/90 min-h-[48px] text-sm font-semibold",
                onClick: () => onSave(selected ?? "No Answer", followUpDate),
                disabled: isSaving,
                "data-ocid": "dialer.disposition_save_button",
                children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Saving…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "Save & Next"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PowerDialerPage() {
  const { data: leads = [], isLoading } = useLeads();
  const { data: smsTemplates = [], isLoading: smsTplLoadingRaw } = useSmsTemplates();
  const smsTplTimedOutRef = reactExports.useRef(false);
  const smsTplTimerRef = reactExports.useRef(null);
  const [smsTplTimedOut, setSmsTplTimedOut] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (smsTplLoadingRaw && !smsTplTimedOutRef.current) {
      smsTplTimerRef.current = setTimeout(() => {
        smsTplTimedOutRef.current = true;
        setSmsTplTimedOut(true);
      }, 1e4);
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
  const twilioNumbers = reactExports.useMemo(() => loadTwilioNumbers(), []);
  const roundRobinEnabled = isRoundRobinEnabled() && twilioNumbers.length > 1;
  const rrIndexRef = reactExports.useRef(0);
  const [mode, setMode] = reactExports.useState("call");
  const [step, setStep] = reactExports.useState("mode");
  const [selectedSmsTemplate, setSelectedSmsTemplate] = reactExports.useState(null);
  const SMS_CUSTOM = "__custom__";
  const [smsTemplateChoice, setSmsTemplateChoice] = reactExports.useState(SMS_CUSTOM);
  const [spinVariations, setSpinVariations] = reactExports.useState([]);
  const [showSpinPanel, setShowSpinPanel] = reactExports.useState(false);
  const [chosenVariation, setChosenVariation] = reactExports.useState(null);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sessionLeads, setSessionLeads] = reactExports.useState([]);
  const [sessionIndex, setSessionIndex] = reactExports.useState(0);
  const [sessionTotalCount, setSessionTotalCount] = reactExports.useState(0);
  const [outcomeCounts, setOutcomeCounts] = reactExports.useState({
    [CallOutcome.reached]: 0,
    [CallOutcome.noAnswer]: 0,
    [CallOutcome.leftVoicemail]: 0
  });
  const [textsSent, setTextsSent] = reactExports.useState(0);
  const [messageBody, setMessageBody] = reactExports.useState("");
  const [lastMessage, setLastMessage] = reactExports.useState("");
  const [awaitingOutcome, setAwaitingOutcome] = reactExports.useState(false);
  const [pendingOutcome, setPendingOutcome] = reactExports.useState(
    null
  );
  const [pendingNotePrefix, setPendingNotePrefix] = reactExports.useState("");
  const [isSavingDisposition, setIsSavingDisposition] = reactExports.useState(false);
  const isWebOnly = typeof window !== "undefined" && !window.matchMedia("(display-mode: standalone)").matches && !navigator.standalone && window.innerWidth >= 768;
  const [phoneLinkHint, setPhoneLinkHint] = reactExports.useState(null);
  const filteredLeads = reactExports.useMemo(() => {
    const notCalledToday = leads.filter((l) => !wasCalledToday(l));
    if (!searchQuery.trim()) return notCalledToday;
    const q = searchQuery.toLowerCase();
    return notCalledToday.filter(
      (l) => l.name.toLowerCase().includes(q) || l.industry.toLowerCase().includes(q) || l.phone.includes(q)
    );
  }, [leads, searchQuery]);
  const toggleSelect = reactExports.useCallback((id) => {
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
    if (selectedIds.size === selectableLeads.length && selectableLeads.length > 0) {
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setSelectedIds(new Set(selectableLeads.map((l) => l.id.toString())));
    }
  };
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
      (l) => selectedIds.has(l.id.toString()) && !l.isDnc && !wasCalledToday(l)
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
      [CallOutcome.leftVoicemail]: 0
    });
    setTextsSent(0);
    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
    if (mode === "text" && smsTemplateChoice !== SMS_CUSTOM) {
      const tpl = smsTemplates.find((t) => t.id === smsTemplateChoice);
      setMessageBody(chosenVariation ?? tpl?.body ?? lastMessage);
    } else {
      setMessageBody(lastMessage);
    }
    setStep("session");
  };
  const endSession = () => {
    setStep("mode");
    setSelectedIds(/* @__PURE__ */ new Set());
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
  const showSummaryAndEnd = () => {
    setStep("summary");
    setAwaitingOutcome(false);
    setPendingOutcome(null);
    setPendingNotePrefix("");
    setPhoneLinkHint(null);
  };
  const currentLead = sessionLeads[sessionIndex] ?? null;
  const advanceOrFinish = () => {
    setSessionLeads((prev) => prev.filter((_, i) => i !== sessionIndex));
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
  const appendNoteToLead = async (lead, noteLine) => {
    const updatedNotes = prependNote(lead.notes ?? "", noteLine);
    await updateLead.mutateAsync({
      id: lead.id,
      updates: { notes: updatedNotes }
    });
  };
  const handleCall = () => {
    if (!currentLead) return;
    const gvOn = isGoogleVoiceEnabled();
    handlePhoneCall(currentLead.phone, false, gvOn);
    setAwaitingOutcome(true);
    if (gvOn) setPhoneLinkHint("gv-call");
  };
  const handleOutcome = (outcome) => {
    if (!currentLead) return;
    setOutcomeCounts((prev) => ({ ...prev, [outcome]: prev[outcome] + 1 }));
    const outcomeLabel = outcome === CallOutcome.reached ? "Reached" : outcome === CallOutcome.noAnswer ? "No Answer" : "Left Voicemail";
    setPendingOutcome(outcome);
    setPendingNotePrefix(outcomeLabel);
    setStep("disposition");
  };
  const handleDispositionSave = async (disposition, followUpDate) => {
    if (!currentLead || pendingOutcome === null) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Call] Outcome: ${pendingNotePrefix} · Disposition: ${disposition} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: currentLead.id,
        outcome: pendingOutcome
      });
      const updates = {
        notes: prependNote(currentLead.notes ?? "", noteLine)
      };
      if (followUpDate) updates.followUpDate = followUpDate;
      await updateLead.mutateAsync({
        id: currentLead.id,
        updates
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
      const noteLine = `[Call] Outcome: ${pendingNotePrefix} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: currentLead.id,
        outcome: pendingOutcome
      });
      await appendNoteToLead(currentLead, noteLine);
    } finally {
      setIsSavingDisposition(false);
      advanceOrFinish();
    }
  };
  const handleSendText = async () => {
    if (!currentLead || !messageBody.trim()) return;
    const body = mergeTags(messageBody.trim(), currentLead);
    const gvOn = isGoogleVoiceEnabled();
    if (gvOn) {
      handleSmsSend(currentLead.phone, body, false, true, false);
      setPhoneLinkHint("gv-text");
    } else {
      let fromNumber = null;
      if (roundRobinEnabled && twilioNumbers.length > 1) {
        fromNumber = twilioNumbers[rrIndexRef.current % twilioNumbers.length].phoneNumber;
        rrIndexRef.current += 1;
      } else if (twilioNumbers.length === 1) {
        fromNumber = twilioNumbers[0].phoneNumber;
      }
      handleSmsSend(currentLead.phone, body, false, false, false);
      const fromNote = fromNumber ? ` (from ${fromNumber})` : "";
      const preview2 = body.length > 60 ? `${body.slice(0, 60)}...` : body;
      const noteLine2 = `[Text] ${preview2}${fromNote} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
      await addTextRecord.mutateAsync({
        leadId: currentLead.id,
        messageBody: body
      });
      await appendNoteToLead(currentLead, noteLine2);
      setTextsSent((n) => n + 1);
      advanceOrFinish();
      return;
    }
    setLastMessage(body);
    const preview = body.length > 60 ? `${body.slice(0, 60)}...` : body;
    const via = gvOn ? " (Google Voice)" : "";
    const noteLine = `[Text] ${preview}${via} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
    await addTextRecord.mutateAsync({
      leadId: currentLead.id,
      messageBody: body
    });
    await appendNoteToLead(currentLead, noteLine);
    setTextsSent((n) => n + 1);
    advanceOrFinish();
  };
  const contactedCount = sessionTotalCount - sessionLeads.length;
  const progressPercent = sessionTotalCount > 0 ? contactedCount / sessionTotalCount * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-5 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground tracking-tight", children: "Power Dialer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose a mode, configure, select leads, then run your session" })
      ] })
    ] }),
    step !== "summary" && step !== "disposition" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap", children: ["mode", "template", "select", "session"].filter((s) => {
      if (s === "template" && mode !== "text") return false;
      return true;
    }).map((s, i, arr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `font-medium capitalize ${step === s ? "text-primary" : ""}`,
          children: s === "template" ? "Template" : s === "select" ? "Leads" : s === "session" ? "Session" : "Mode"
        }
      ),
      i < arr.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 shrink-0" })
    ] }, s)) }),
    step === "mode" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-sm border-border", "data-ocid": "dialer.mode_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Choose Session Mode" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeCard,
            {
              selected: mode === "call",
              onClick: () => setMode("call"),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
              label: "Call Session",
              description: "Opens dialer for each lead, logs outcome",
              ocid: "dialer.call_mode_toggle"
            }
          ),
          !isWebOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeCard,
            {
              selected: mode === "text",
              onClick: () => setMode("text"),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
              label: "Text Session",
              description: "Pre-fills SMS for each lead with optional template",
              ocid: "dialer.text_mode_toggle"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: goToTemplate,
            "data-ocid": "dialer.mode_next_button",
            className: "w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold",
            children: [
              "Continue",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        ) })
      ] })
    ] }),
    step === "template" && mode === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-sm border-border",
        "data-ocid": "dialer.template_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Select SMS Template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => setStep("mode"),
                className: "text-muted-foreground hover:text-foreground gap-1 shrink-0 h-9",
                "data-ocid": "dialer.template_back_button",
                children: "← Back"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
            smsTplLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-3",
                "data-ocid": "dialer.sms_template_loading_state",
                children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, i))
              }
            ) : smsTplTimedOut && smsTemplates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-6 text-muted-foreground",
                "data-ocid": "dialer.sms_template_error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Couldn't load templates." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "You can still continue with a custom message." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "dialer.sms_template_list", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSmsTemplateChoice(SMS_CUSTOM);
                    setSelectedSmsTemplate(null);
                    setSpinVariations([]);
                    setShowSpinPanel(false);
                    setChosenVariation(null);
                  },
                  "data-ocid": "dialer.sms_template_custom",
                  className: `w-full text-left px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${smsTemplateChoice === SMS_CUSTOM ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Custom Message" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Type a fresh message for each lead" })
                    ] }),
                    smsTemplateChoice === SMS_CUSTOM && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" })
                  ] })
                }
              ),
              smsTemplates.map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSmsTemplateChoice(tpl.id);
                    setSelectedSmsTemplate(tpl);
                    setSpinVariations([]);
                    setShowSpinPanel(false);
                    setChosenVariation(null);
                  },
                  "data-ocid": `dialer.sms_template.${i + 1}`,
                  className: `w-full text-left px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${smsTemplateChoice === tpl.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: tpl.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-1", children: tpl.body })
                    ] }),
                    smsTemplateChoice === tpl.id && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" })
                  ] })
                },
                tpl.id
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: goToSelect,
                "data-ocid": "dialer.sms_template_next_button",
                className: "w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold",
                children: [
                  "Next: Choose Leads",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    step === "select" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 text-xs", children: "Text Mode" }),
        smsTemplateChoice !== SMS_CUSTOM && selectedSmsTemplate && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted text-foreground border-0 text-xs font-normal truncate max-w-[200px]", children: [
          "Template: ",
          selectedSmsTemplate.name
        ] }),
        smsTemplateChoice === SMS_CUSTOM && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted text-muted-foreground border-0 text-xs font-normal", children: "Custom Message" }),
        chosenVariation && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-0 text-xs font-normal flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
          "Spun version"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep("template"),
            className: "text-xs text-primary hover:underline",
            "data-ocid": "dialer.change_template_button",
            children: "Change"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-sm border-border",
          "data-ocid": "dialer.selection_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setStep("mode"),
                      className: "text-xs text-muted-foreground hover:text-foreground",
                      "data-ocid": "dialer.select_back_button",
                      children: "← Back"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Choose Leads" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: selectedIds.size }),
                    " ",
                    "selected"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: toggleSelectAll,
                      className: "shrink-0 h-9",
                      "data-ocid": "dialer.select_all_toggle",
                      children: selectedIds.size === selectableLeads.length && selectableLeads.length > 0 ? "Deselect All" : "Select All"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search by name, industry, phone…",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "w-full px-3 py-2.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring h-11",
                  "data-ocid": "dialer.search_input"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", "data-ocid": "dialer.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded" }, i)) }) : filteredLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "py-12 text-center",
                "data-ocid": "dialer.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No leads found. Add leads from the Leads page." })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "max-h-[380px] sm:max-h-[420px] overflow-y-auto",
                "data-ocid": "dialer.lead_list",
                children: filteredLeads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LeadRow,
                  {
                    lead,
                    checked: selectedIds.has(lead.id.toString()),
                    onToggle: toggleSelect,
                    index: i + 1
                  },
                  lead.id.toString()
                ))
              }
            ) })
          ]
        }
      ),
      selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: startSession,
          "data-ocid": "dialer.start_session_button",
          className: "w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
            "Start ",
            mode === "call" ? "Call" : "Text",
            " Session (",
            selectedIds.size,
            ")"
          ]
        }
      ) })
    ] }),
    step === "session" && sessionLeads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-sm border-border",
        "data-ocid": "dialer.all_called_today_empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-10 flex flex-col items-center text-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-full flex items-center justify-center",
              style: { background: "oklch(0.56 0.16 44 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Phone,
                {
                  className: "w-7 h-7",
                  style: { color: "oklch(0.46 0.16 44)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "No leads remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm mx-auto", children: "All leads in this session have been contacted. Click End Session to see your summary, or go back to select more leads." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setStep("select"),
                className: "gap-2 min-h-[44px]",
                "data-ocid": "dialer.back_to_select_button",
                children: "← Back to Lead Selection"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setStep("summary"),
                className: "gap-2 min-h-[44px] bg-primary text-white hover:bg-primary/90 font-semibold",
                "data-ocid": "dialer.view_summary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "View Session Summary"
                ]
              }
            )
          ] })
        ] })
      }
    ),
    step === "session" && currentLead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "dialer.session_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            sessionLeads.length,
            " remaining"
          ] }),
          sessionTotalCount > 0 && contactedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: contactedCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground hidden sm:inline", children: [
              "contacted of ",
              sessionTotalCount,
              " —",
              " ",
              mode === "call" ? "Call" : "Text",
              " Session"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: showSummaryAndEnd,
            "data-ocid": "dialer.end_session_button",
            className: "text-muted-foreground hover:text-destructive gap-1.5 shrink-0 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
              "End Session"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full bg-primary transition-all duration-500",
          style: { width: `${progressPercent}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-sm border-border",
          "data-ocid": "dialer.current_lead_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground leading-snug min-w-0 break-words", children: currentLead.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${STAGE_COLORS[currentLead.pipelineStage]} border-0 shrink-0 mt-0.5`,
                    children: STAGE_LABELS[currentLead.pipelineStage]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: currentLead.industry }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-mono font-semibold text-foreground", children: formatPhone(currentLead.phone) })
            ] }),
            mode === "call" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              phoneLinkHint === "call" && awaitingOutcome && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.07)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.18)",
                    color: "oklch(0.28 0.12 264)"
                  },
                  "data-ocid": "dialer.phone_link_call_hint",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Phone Link is opening on your PC" }),
                      " ",
                      "— complete the call there, then return here to log the outcome."
                    ] })
                  ]
                }
              ),
              phoneLinkHint === "gv-call" && awaitingOutcome && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
                  style: {
                    background: "oklch(0.55 0.18 145 / 0.07)",
                    border: "1px solid oklch(0.55 0.18 145 / 0.25)",
                    color: "oklch(0.35 0.12 145)"
                  },
                  "data-ocid": "dialer.gv_call_hint",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Google Voice opened in a new tab" }),
                      " ",
                      "— complete the call there, then return here to log the outcome."
                    ] })
                  ]
                }
              ),
              !awaitingOutcome ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "w-full gap-2 bg-primary text-white hover:bg-primary/90 text-base font-semibold h-14",
                  onClick: handleCall,
                  "data-ocid": "dialer.call_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-5 h-5" }),
                    "Call ",
                    currentLead.name
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "dialer.outcome_picker",
                  className: "space-y-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Log call outcome:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          className: "flex-1 gap-2 border-accent/40 hover:bg-accent/10 text-sm h-12 sm:h-10",
                          onClick: () => handleOutcome(CallOutcome.reached),
                          "data-ocid": "dialer.outcome_reached",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent-foreground" }),
                            "Reached"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          className: "flex-1 gap-2 text-sm h-12 sm:h-10",
                          onClick: () => handleOutcome(CallOutcome.noAnswer),
                          "data-ocid": "dialer.outcome_no_answer",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-muted-foreground" }),
                            "No Answer"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          className: "flex-1 gap-2 text-sm h-12 sm:h-10",
                          onClick: () => handleOutcome(CallOutcome.leftVoicemail),
                          "data-ocid": "dialer.outcome_voicemail",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Voicemail, { className: "w-4 h-4 text-muted-foreground" }),
                            "Voicemail"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ] }),
            mode === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              roundRobinEnabled && twilioNumbers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-accent/10 text-accent-foreground",
                  "data-ocid": "dialer.round_robin_indicator",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 shrink-0" }),
                    "Sending via:",
                    " ",
                    twilioNumbers[rrIndexRef.current % twilioNumbers.length]?.label || twilioNumbers[rrIndexRef.current % twilioNumbers.length]?.phoneNumber
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "message-body",
                    children: "Message"
                  }
                ),
                lastMessage && messageBody !== lastMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-primary hover:underline shrink-0 min-h-[36px] px-1",
                    onClick: () => setMessageBody(lastMessage),
                    "data-ocid": "dialer.reuse_last_message_button",
                    children: "Reuse last message"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "message-body",
                  placeholder: "Type your message here…",
                  value: messageBody,
                  onChange: (e) => setMessageBody(e.target.value),
                  rows: 4,
                  className: "resize-none text-base w-full",
                  style: { fontSize: "16px" },
                  "data-ocid": "dialer.message_textarea"
                }
              ),
              messageBody.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-muted/30 px-4 py-3 space-y-3",
                  "data-ocid": "dialer.spin_panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                        "Spin — get 3 reworded versions"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            const vars = spinText(messageBody);
                            setSpinVariations(vars);
                            setShowSpinPanel(true);
                          },
                          className: "h-8 px-3 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shrink-0 flex items-center gap-1.5",
                          "data-ocid": "dialer.spin_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                            "Spin"
                          ]
                        }
                      )
                    ] }),
                    showSpinPanel && spinVariations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "space-y-2",
                        "data-ocid": "dialer.spin_variations_list",
                        children: [
                          spinVariations.map((v, vIdx) => {
                            const versionNum = vIdx + 1;
                            const preview = currentLead ? mergeTags(v, currentLead) : v;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "rounded-md border border-border bg-background px-3 py-2.5 space-y-1.5",
                                "data-ocid": `dialer.spin_variation.${versionNum}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
                                    "Version ",
                                    versionNum
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground whitespace-pre-wrap", children: preview }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => {
                                        setMessageBody(v);
                                        setShowSpinPanel(false);
                                        setSpinVariations([]);
                                      },
                                      className: "text-xs font-semibold text-primary hover:text-primary/80 transition-colors",
                                      "data-ocid": `dialer.spin_use_button.${versionNum}`,
                                      children: "Use this version →"
                                    }
                                  )
                                ]
                              },
                              v.slice(0, 60)
                            );
                          }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setShowSpinPanel(false);
                                setSpinVariations([]);
                              },
                              className: "text-xs text-muted-foreground hover:text-foreground",
                              "data-ocid": "dialer.spin_close_button",
                              children: "× Close variations"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              phoneLinkHint === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
                  style: {
                    background: "oklch(0.22 0.12 264 / 0.07)",
                    border: "1px solid oklch(0.22 0.12 264 / 0.18)",
                    color: "oklch(0.28 0.12 264)"
                  },
                  "data-ocid": "dialer.phone_link_sms_hint",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Phone Link is opening on your PC" }),
                      " ",
                      "— press ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Send" }),
                      " ",
                      "in Phone Link to complete the text."
                    ] })
                  ]
                }
              ),
              phoneLinkHint === "gv-text" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
                  style: {
                    background: "oklch(0.55 0.18 145 / 0.07)",
                    border: "1px solid oklch(0.55 0.18 145 / 0.25)",
                    color: "oklch(0.35 0.12 145)"
                  },
                  "data-ocid": "dialer.gv_sms_hint",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Google Voice opened in a new tab" }),
                      " ",
                      "— find",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: currentLead?.name }),
                      " ",
                      "and send the message there, then return here to advance to the next lead."
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "w-full gap-2 bg-primary text-white hover:bg-primary/90 text-base font-semibold h-14",
                  onClick: handleSendText,
                  disabled: !messageBody.trim() || addTextRecord.isPending || updateLead.isPending,
                  "data-ocid": "dialer.send_text_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" }),
                    "Send Text to ",
                    currentLead.name
                  ]
                }
              )
            ] })
          ] })
        }
      )
    ] }),
    step === "disposition" && currentLead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "dialer.disposition_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          sessionLeads.length,
          " lead",
          sessionLeads.length !== 1 ? "s" : "",
          " ",
          "remaining"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: showSummaryAndEnd,
            className: "text-muted-foreground hover:text-destructive gap-1.5 h-9",
            "data-ocid": "dialer.disposition_end_session_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
              "End Session"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DispositionStep,
        {
          lead: currentLead,
          mode,
          onSave: handleDispositionSave,
          onSkip: handleDispositionSkipCall,
          isSaving: isSavingDisposition
        }
      )
    ] }),
    step === "summary" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-sm border-border",
        "data-ocid": "dialer.summary_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-10 flex flex-col items-center text-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full flex items-center justify-center bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Session Complete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              sessionLeads.length,
              " lead",
              sessionLeads.length !== 1 ? "s" : "",
              " ",
              "contacted"
            ] })
          ] }),
          mode === "call" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 w-full max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground", children: outcomeCounts[CallOutcome.reached] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: "Reached" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground", children: outcomeCounts[CallOutcome.noAnswer] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: "No Answer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Voicemail, { className: "w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground", children: outcomeCounts[CallOutcome.leftVoicemail] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: "Voicemail" })
            ] })
          ] }),
          mode === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 p-5 rounded-lg bg-primary/5 border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-6 h-6 text-primary mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-foreground", children: textsSent }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "Text",
              textsSent !== 1 ? "s" : "",
              " sent"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: endSession,
              className: "w-full sm:w-auto gap-2 bg-primary text-white hover:bg-primary/90 h-12 sm:h-10 text-base sm:text-sm font-semibold",
              "data-ocid": "dialer.new_session_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                "Start New Session"
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  PowerDialerPage as default
};
