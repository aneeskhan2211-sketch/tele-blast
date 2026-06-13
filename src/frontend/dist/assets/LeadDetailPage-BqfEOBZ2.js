import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { o as useLead, i as useUpdateLead, f as useUpdateLeadDnc, p as useAddCallRecord, q as useAddTextRecord, r as useAddEmailRecord, d as useSubscription, s as getIMessagePreference, S as Skeleton, B as Button, P as PIPELINE_STAGES, v as Badge, w as IMessageCheckbox, L as Label, I as Input, T as Textarea, t as tierHasFeature, x as setIMessagePreference, m as isGoogleVoiceEnabled, l as handlePhoneCall, y as handleSmsSend } from "./index-DsrDu9m3.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B4Jc19UW.js";
import { j as useParams, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { N as ArrowLeft, W as TriangleAlert, a8 as Building2, ay as MapPin, P as Phone, Y as MessageSquare, M as Mail, aA as ScrollText, at as ShieldOff, aB as LoaderCircle, T as TrendingUp, aC as CalendarDays, C as Cake, t as ue, aD as SkipForward, J as CircleCheck, ap as Sparkles, Q as ExternalLink, V as MessageCircle, ai as PhoneCall } from "./vendor-DT3DREzx.js";
import { a as useAiResearchLead } from "./useAi-BlR_ZtV6.js";
import { i as isWindowsDesktop } from "./usePhoneLinkPreference-DxhpuVQj.js";
import { C as CallOutcome } from "./vendor-ic-W9L5KZ_F.js";
const DISPOSITIONS = [
  "Answered",
  "No Answer",
  "Left Voicemail",
  "Callback Requested",
  "Not Interested",
  "Closed / Won"
];
const DISPOSITION_BADGE_STYLES = {
  Answered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "No Answer": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "Left Voicemail": "bg-primary/10 text-primary border-primary/20",
  "Callback Requested": "bg-sky-500/10 text-sky-700 border-sky-500/20",
  "Not Interested": "bg-destructive/10 text-destructive border-destructive/20",
  "Closed / Won": "bg-emerald-600/15 text-emerald-800 border-emerald-600/20"
};
const DISPOSITION_CHIP_COLORS = {
  Answered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20",
  "No Answer": "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/20",
  "Left Voicemail": "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
  "Callback Requested": "bg-sky-500/10 text-sky-700 border-sky-500/30 hover:bg-sky-500/20",
  "Not Interested": "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Closed / Won": "bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25"
};
const DISPOSITION_CHIP_ACTIVE = {
  Answered: "bg-emerald-500 text-white border-emerald-500",
  "No Answer": "bg-amber-500 text-white border-amber-500",
  "Left Voicemail": "bg-primary text-primary-foreground border-primary",
  "Callback Requested": "bg-sky-500 text-white border-sky-500",
  "Not Interested": "bg-destructive text-destructive-foreground border-destructive",
  "Closed / Won": "bg-emerald-600 text-white border-emerald-600"
};
function extractDisposition(noteText) {
  const match = noteText.match(/Disposition:\s*([^—\n]+)/);
  if (!match) return null;
  const candidate = match[1].trim();
  return DISPOSITIONS.includes(candidate) ? candidate : null;
}
function InlineDispositionCapture({
  actionLabel,
  onSave,
  onSkip,
  isSaving
}) {
  const [selected, setSelected] = reactExports.useState(null);
  const [followUpDate, setFollowUpDate] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-3 rounded-xl border border-border bg-muted/30 p-4 space-y-4",
      "data-ocid": "lead-detail.disposition_capture",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
          "How did the ",
          actionLabel,
          " go?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
            "data-ocid": "lead-detail.disposition_options",
            children: DISPOSITIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelected(d),
                "data-ocid": `lead-detail.disposition_chip.${d.toLowerCase().replace(/[\s/]+/g, "_")}`,
                className: [
                  "px-3 py-2 rounded-lg border text-sm font-medium transition-all min-h-[40px] text-left",
                  selected === d ? DISPOSITION_CHIP_ACTIVE[d] : DISPOSITION_CHIP_COLORS[d]
                ].join(" "),
                children: d
              },
              d
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "detail-followup-date",
              className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                "Follow-up date (optional)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "detail-followup-date",
              type: "date",
              value: followUpDate,
              onChange: (e) => setFollowUpDate(e.target.value),
              className: "w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring min-h-[40px]",
              "data-ocid": "lead-detail.followup_date_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-muted-foreground hover:text-foreground min-h-[40px] flex-1",
              onClick: onSkip,
              disabled: isSaving,
              "data-ocid": "lead-detail.disposition_skip_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-3.5 h-3.5" }),
                "Skip"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "gap-1.5 bg-primary text-white hover:bg-primary/90 min-h-[40px] flex-1 font-semibold",
              onClick: () => onSave(selected ?? "No Answer", followUpDate),
              disabled: isSaving,
              "data-ocid": "lead-detail.disposition_save_button",
              children: [
                isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                "Save"
              ]
            }
          )
        ] })
      ]
    }
  );
}
const QUAL_TAGS = [
  "Ready to Contact",
  "High Interest",
  "Needs Follow-Up",
  "Not Qualified"
];
function toQualTags(raw) {
  return raw.filter(
    (t) => QUAL_TAGS.includes(t)
  );
}
function useLeadLocalState(lead) {
  const [stage, setStage] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState("");
  const [followUpDate, setFollowUpDate] = reactExports.useState("");
  const [qualTags, setQualTags] = reactExports.useState([]);
  const [birthday, setBirthday] = reactExports.useState("");
  const [firstName, setFirstName] = reactExports.useState("");
  const [lastName, setLastName] = reactExports.useState("");
  reactExports.useEffect(() => {
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
    setLastName
  };
}
function getDetailDisplayName(lead) {
  const contact = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  if (lead.name && contact) return lead.name;
  if (lead.name) return lead.name;
  if (contact) return contact;
  return "";
}
function formatBirthdayDisplay(raw) {
  if (!raw) return "";
  const v = raw.trim();
  const parts = v.split(/[-/]/);
  let month;
  let day;
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      month = Number.parseInt(parts[1], 10);
      day = Number.parseInt(parts[2], 10);
    } else {
      month = Number.parseInt(parts[0], 10);
      day = Number.parseInt(parts[1], 10);
    }
  } else if (parts.length === 2) {
    month = Number.parseInt(parts[0], 10);
    day = Number.parseInt(parts[1], 10);
  } else {
    return v;
  }
  if (Number.isNaN(month) || Number.isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return v;
  }
  const hasYear = parts.length === 3 && (parts[0].length === 4 || parts[2].length === 4);
  const year = hasYear ? parts[0].length === 4 ? Number.parseInt(parts[0], 10) : Number.parseInt(parts[2], 10) : 2e3;
  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return v;
  return date.toLocaleDateString(void 0, {
    month: "long",
    day: "numeric",
    ...hasYear ? { year: "numeric" } : {}
  });
}
function birthdayToDateInputValue(raw) {
  if (!raw) return "";
  const v = raw.trim();
  const parts = v.split(/[-/]/);
  if (parts.length === 3 && parts[0].length === 4) return v;
  return "";
}
function LeadDetailPage() {
  const params = useParams({ strict: false });
  const id = BigInt(params.id ?? "0");
  const { data: lead, isLoading } = useLead(id);
  const updateLead = useUpdateLead();
  const updateLeadDnc = useUpdateLeadDnc();
  const addCallRecord = useAddCallRecord();
  const addTextRecord = useAddTextRecord();
  const addEmailRecord = useAddEmailRecord();
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const [showDncConfirm, setShowDncConfirm] = reactExports.useState(false);
  const [isDncSaving, setIsDncSaving] = reactExports.useState(false);
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
    setLastName
  } = useLeadLocalState(lead);
  const [notesEditing, setNotesEditing] = reactExports.useState(false);
  const notesRef = reactExports.useRef(null);
  const [showDispositionFor, setShowDispositionFor] = reactExports.useState(null);
  const [isSavingDisposition, setIsSavingDisposition] = reactExports.useState(false);
  const [useIMessage, setUseIMessage] = reactExports.useState(getIMessagePreference);
  const handleIMessageToggle = (v) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };
  const save = async (patch) => {
    try {
      await updateLead.mutateAsync({ id, updates: patch });
    } catch {
      ue.error("Failed to save");
    }
  };
  const handleDncToggle = async () => {
    if (!lead) return;
    setIsDncSaving(true);
    try {
      await updateLeadDnc.mutateAsync({ leadId: id, isDnc: !lead.isDnc });
      ue.success(
        lead.isDnc ? "DNC status removed" : "Lead marked as Do Not Contact"
      );
      setShowDncConfirm(false);
    } catch {
      ue.error("Failed to update DNC status");
    } finally {
      setIsDncSaving(false);
    }
  };
  const formatNoteDate = (date) => date.toLocaleString(void 0, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
  const appendNote = async (noteLine) => {
    const existing = notes ?? "";
    const updated = existing ? `${noteLine}
${existing}` : noteLine;
    setNotes(updated);
    await save({ notes: updated });
  };
  const handleCallClick = async () => {
    if (!lead) return;
    const phoneLinkOn = isWindowsDesktop();
    const gvOn = isGoogleVoiceEnabled();
    handlePhoneCall(lead.phone, phoneLinkOn, gvOn);
    setShowDispositionFor("call");
  };
  const handleCallDispositionSave = async (disposition, followUpDateVal) => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Call] Outcome: Reached · Disposition: ${disposition} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
      await addCallRecord.mutateAsync({
        leadId: id,
        outcome: CallOutcome.reached
      });
      const currentNotes = notes ?? "";
      const newNotes = currentNotes ? `${noteLine}
${currentNotes}` : noteLine;
      const patch = { notes: newNotes };
      if (followUpDateVal) patch.followUpDate = followUpDateVal;
      await save(patch);
      setNotes(newNotes);
      if (followUpDateVal) setFollowUpDate(followUpDateVal);
    } catch {
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
        outcome: CallOutcome.reached
      });
      await appendNote(
        `[Call] Outcome: Reached — ${formatNoteDate(/* @__PURE__ */ new Date())}`
      );
    } catch {
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };
  const handleTextClick = async () => {
    if (!lead) return;
    handleSmsSend(lead.phone, "");
    const via = useIMessage ? " (iMessage)" : "";
    const noteLine = `[Text] Text message sent${via} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
    try {
      await addTextRecord.mutateAsync({
        leadId: id,
        messageBody: "Text message sent"
      });
      await appendNote(noteLine);
    } catch {
    }
  };
  const handleEmailClick = async () => {
    if (!lead?.email) return;
    const subject = lead.name ? `Hi ${lead.name} — following up` : "Following up";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}`;
    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      window.open(mailtoUrl, "_blank");
    }
    setShowDispositionFor("email");
  };
  const handleEmailDispositionSave = async (disposition, followUpDateVal) => {
    if (!lead) return;
    setIsSavingDisposition(true);
    try {
      const noteLine = `[Email] Email sent · Disposition: ${disposition} — ${formatNoteDate(/* @__PURE__ */ new Date())}`;
      await addEmailRecord.mutateAsync({
        leadId: id,
        timestamp: BigInt(Date.now())
      });
      const currentNotes = notes ?? "";
      const newNotes = currentNotes ? `${noteLine}
${currentNotes}` : noteLine;
      const patch = { notes: newNotes };
      if (followUpDateVal) patch.followUpDate = followUpDateVal;
      await save(patch);
      setNotes(newNotes);
      if (followUpDateVal) setFollowUpDate(followUpDateVal);
    } catch {
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
        timestamp: BigInt(Date.now())
      });
      await appendNote(`[Email] Email sent — ${formatNoteDate(/* @__PURE__ */ new Date())}`);
    } catch {
    } finally {
      setIsSavingDisposition(false);
      setShowDispositionFor(null);
    }
  };
  const handleStageChange = async (v) => {
    const newStage = v;
    setStage(newStage);
    await save({ pipelineStage: newStage });
    ue.success("Stage updated");
  };
  const handleNotesBlur = async () => {
    setNotesEditing(false);
    if (!lead || notes === (lead.notes ?? "")) return;
    await save({ notes });
    ue.success("Notes saved");
  };
  const handleFollowUpChange = async (e) => {
    const val = e.target.value;
    setFollowUpDate(val);
    await save({ followUpDate: val || void 0 });
    ue.success("Follow-up date saved");
  };
  const handleBirthdayChange = async (e) => {
    const val = e.target.value;
    setBirthday(val);
    await save({ birthday: val || void 0 });
    ue.success("Birthday saved");
  };
  const toggleQualTag = async (tag) => {
    const next = qualTags.includes(tag) ? qualTags.filter((t) => t !== tag) : [...qualTags, tag];
    setQualTags(next);
    await save({ qualificationTags: next });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" })
      ] })
    ] });
  }
  if (!lead) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-3 sm:px-6 py-16 text-center",
        "data-ocid": "lead-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground mb-2", children: "Lead not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This lead may have been removed or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leads", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "min-h-[44px]", children: "← Back to leads" }) })
        ]
      }
    );
  }
  const currentStage = stage ?? lead.pipelineStage;
  const stageConfig = PIPELINE_STAGES.find((s) => s.value === currentStage) ?? PIPELINE_STAGES[0];
  const displayName = getDetailDisplayName(lead);
  const contactFullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/leads",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 min-h-[44px]",
        "data-ocid": "back-to-leads",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to leads"
        ]
      }
    ),
    lead.isDnc && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 bg-destructive/10 border border-destructive/40 rounded-2xl px-4 py-3 mb-4",
        "data-ocid": "lead-detail.dnc-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-destructive text-sm", children: "DO NOT CONTACT — This lead is on the Do Not Call list" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80 mt-0.5", children: "All outreach actions are blocked. Remove DNC status to re-enable." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowDncConfirm(true),
              className: "shrink-0 text-xs font-semibold text-destructive hover:text-destructive/80 underline underline-offset-2 min-h-[32px] px-2",
              "data-ocid": "lead-detail.remove-dnc-button",
              children: "Remove DNC"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bg-card border rounded-2xl shadow-sm p-4 sm:p-6 mb-5 ${lead.isDnc ? "border-destructive/30" : "border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-lg sm:text-2xl font-bold text-foreground break-words leading-snug",
                  "data-ocid": "lead-name",
                  children: displayName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic font-normal text-base", children: "Unnamed Lead" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5", children: [
                contactFullName && lead.name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: contactFullName }),
                lead.industry && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 shrink-0" }),
                  lead.industry
                ] }),
                (lead.city || lead.state || lead.address) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: [lead.address, lead.city, lead.state].filter(Boolean).join(", ") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 self-start px-3 py-1 text-xs font-semibold rounded-full border-0 bg-primary/10 text-primary hover:bg-primary/10", children: stageConfig.label })
          ] }),
          lead.isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-2 py-3 bg-destructive/5 rounded-xl border border-destructive/20",
              "data-ocid": "lead-detail.dnc-block",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-destructive", children: "DNC — No Contact Allowed" })
              ]
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-1.5 font-semibold min-h-[48px] text-sm sm:text-base",
                size: "lg",
                onClick: handleCallClick,
                "data-ocid": "call-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Call" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "lg",
                className: "w-full gap-1.5 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base",
                onClick: handleTextClick,
                "data-ocid": "text-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Text" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "lg",
                className: `w-full gap-1.5 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base ${!lead.email ? "opacity-40 cursor-not-allowed" : ""}`,
                onClick: handleEmailClick,
                disabled: !lead.email,
                "data-ocid": "email-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email" })
                ]
              }
            )
          ] }),
          lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center rounded-lg border border-border bg-muted/30 px-4 py-3 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            IMessageCheckbox,
            {
              checked: useIMessage,
              onChange: handleIMessageToggle
            }
          ) }),
          showDispositionFor === "call" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InlineDispositionCapture,
            {
              actionLabel: "call",
              onSave: handleCallDispositionSave,
              onSkip: handleCallDispositionSkip,
              isSaving: isSavingDisposition
            }
          ),
          showDispositionFor === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InlineDispositionCapture,
            {
              actionLabel: "email",
              onSave: handleEmailDispositionSave,
              onSkip: handleEmailDispositionSkip,
              isSaving: isSavingDisposition
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/cold-call-script",
                search: { leadId: String(id) },
                "data-ocid": "lead-detail.open_script_generator_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "lg",
                    className: "w-full gap-2 font-semibold border-primary/40 text-primary hover:bg-primary/5 min-h-[48px] text-sm sm:text-base",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-4 h-4 shrink-0" }),
                      "Open Cold Call Script Generator"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowDncConfirm(true),
                className: `w-full flex items-center justify-center gap-2 min-h-[44px] text-sm font-medium rounded-xl border transition-colors ${lead.isDnc ? "border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10" : "border-border text-muted-foreground hover:border-destructive/40 hover:text-destructive"}`,
                "data-ocid": "lead-detail.dnc-toggle-button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-4 h-4 shrink-0" }),
                  lead.isDnc ? "Remove Do Not Call Status" : "Mark as Do Not Call"
                ]
              }
            )
          ] })
        ]
      }
    ),
    showDncConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4",
        "data-ocid": "lead-detail.dnc-confirm-dialog",
        onClick: (e) => e.target === e.currentTarget && setShowDncConfirm(false),
        onKeyDown: (e) => e.key === "Escape" && setShowDncConfirm(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground text-base", children: lead.isDnc ? "Remove DNC Status" : "Mark as Do Not Call" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: displayName || "This lead" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: lead.isDnc ? `Remove DNC status from ${displayName || "this lead"}? They will become contactable again.` : `Mark ${displayName || "this lead"} as Do Not Call? They will be blocked from all outreach and moved to the DNC section.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 min-h-[44px]",
                onClick: () => setShowDncConfirm(false),
                disabled: isDncSaving,
                "data-ocid": "lead-detail.dnc-confirm-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: `flex-1 min-h-[44px] font-semibold ${lead.isDnc ? "bg-primary text-white hover:bg-primary/90" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}`,
                onClick: handleDncToggle,
                disabled: isDncSaving,
                "data-ocid": "lead-detail.dnc-confirm-button",
                children: isDncSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : lead.isDnc ? "Remove DNC" : "Mark DNC"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Contact Details" }),
        (firstName || lastName) && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }), label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: [firstName, lastName].filter(Boolean).join(" ") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }), label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `tel:${lead.phone}`,
            className: "text-foreground hover:text-primary transition-colors break-all",
            children: lead.phone
          }
        ) }),
        lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }), label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `mailto:${encodeURIComponent(lead.email)}`,
            className: "text-foreground hover:text-primary transition-colors break-all",
            children: lead.email
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }), label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: [lead.address, lead.city, lead.state].filter(Boolean).join(", ") || "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }), label: "Industry", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lead.industry || "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
            label: "Revenue Range",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lead.revenueRange || "—" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
            label: "Years in Business",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lead.yearsInBusiness !== void 0 && lead.yearsInBusiness !== null ? `${Number(lead.yearsInBusiness)} yrs` : "—" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "w-4 h-4" }), label: "Birthday", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lead.birthday ? formatBirthdayDisplay(lead.birthday) || "—" : "—" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Pipeline Stage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentStage, onValueChange: handleStageChange, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full min-h-[44px]",
                "data-ocid": "stage-select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Qualification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "qual-tags", children: QUAL_TAGS.map((tag) => {
            const active = qualTags.includes(tag);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleQualTag(tag),
                className: [
                  "px-3 py-2 rounded-full text-sm font-medium border transition-all min-h-[44px]",
                  active ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                ].join(" "),
                "data-ocid": `tag-${tag.toLowerCase().replace(/\s+/g, "-")}`,
                children: tag
              },
              tag
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "followup-date",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3",
              children: "Follow-Up Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "followup-date",
              type: "date",
              value: followUpDate,
              onChange: handleFollowUpChange,
              className: "w-full min-h-[44px]",
              "data-ocid": "followup-date"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "birthday-date",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3 flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "w-3.5 h-3.5" }),
                "Birthday"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "birthday-date",
              type: "date",
              value: birthdayToDateInputValue(birthday),
              onChange: handleBirthdayChange,
              className: "w-full min-h-[44px]",
              "data-ocid": "birthday-date"
            }
          ),
          birthday && !birthdayToDateInputValue(birthday) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
            "Stored as: ",
            formatBirthdayDisplay(birthday) || birthday
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Name Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "first-name",
              className: "text-xs text-muted-foreground mb-1 block",
              children: "First Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "first-name",
              value: firstName,
              onChange: (e) => setFirstName(e.target.value),
              onBlur: async () => {
                if (firstName !== (lead.firstName ?? "")) {
                  await save({ firstName: firstName || void 0 });
                  ue.success("First name saved");
                }
              },
              placeholder: "First name",
              className: "min-h-[44px]",
              "data-ocid": "first-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "last-name",
              className: "text-xs text-muted-foreground mb-1 block",
              children: "Last Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "last-name",
              value: lastName,
              onChange: (e) => setLastName(e.target.value),
              onBlur: async () => {
                if (lastName !== (lead.lastName ?? "")) {
                  await save({ lastName: lastName || void 0 });
                  ue.success("Last name saved");
                }
              },
              placeholder: "Last name",
              className: "min-h-[44px]",
              "data-ocid": "last-name-input"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Notes" }),
        notesEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "min-h-[36px]",
            onClick: () => notesRef.current?.blur(),
            "data-ocid": "save-notes-btn",
            children: "Save"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          ref: notesRef,
          rows: 5,
          className: "resize-none w-full border-dashed focus:border-solid transition-all text-sm min-h-[120px]",
          placeholder: "Click to add notes about this lead…",
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          onFocus: () => setNotesEditing(true),
          onBlur: handleNotesBlur,
          "data-ocid": "notes-input"
        }
      )
    ] }),
    hasAi && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiResearchSection,
      {
        lead,
        onResearchSaved: async (result) => {
          const researchNote = `[AI Research] ${result}
— ${(/* @__PURE__ */ new Date()).toLocaleString()}`;
          await appendNote(researchNote);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommunicationHistory,
      {
        callHistory: lead.callHistory,
        textHistory: lead.textHistory,
        emailHistory: lead.emailHistory,
        leadNotes: notes
      }
    )
  ] });
}
function AiResearchSection({
  lead,
  onResearchSaved
}) {
  const researchLead = useAiResearchLead();
  const [researchResult, setResearchResult] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const existingResearch = lead.notes?.split("\n").find((l) => l.startsWith("[AI Research]"))?.replace("[AI Research] ", "");
  const handleRunResearch = async () => {
    try {
      const result = await researchLead.mutateAsync(lead.id);
      setResearchResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI research failed.";
      ue.error(msg);
    }
  };
  const handleSave = async () => {
    if (!researchResult) return;
    setIsSaving(true);
    try {
      await onResearchSaved(researchResult);
      ue.success("Research saved to notes");
      setResearchResult(null);
    } catch {
      ue.error("Failed to save research");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5",
      "data-ocid": "ai-research.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "AI Research" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "$0.05 per research" })
        ] }),
        existingResearch && !researchResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/30 rounded-xl p-3 text-sm text-foreground mb-3 border border-border",
            "data-ocid": "ai-research.existing-result",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Previous Research" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap break-words line-clamp-6", children: existingResearch })
            ]
          }
        ),
        researchResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-primary/5 border border-primary/20 rounded-xl p-4 mb-3 space-y-3",
            "data-ocid": "ai-research.result",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                "Research Complete"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words", children: researchResult }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: handleSave,
                    disabled: isSaving,
                    className: "min-h-[40px]",
                    "data-ocid": "ai-research.save-button",
                    children: [
                      isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                      "Save to Notes"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => setResearchResult(null),
                    className: "min-h-[40px]",
                    "data-ocid": "ai-research.dismiss-button",
                    children: "Dismiss"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleRunResearch,
            disabled: researchLead.isPending,
            variant: "outline",
            size: "sm",
            className: "gap-2 border-primary/40 text-primary hover:bg-primary/5 min-h-[44px]",
            "data-ocid": "ai-research.run-button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
              "Run AI Research ($0.05)"
            ] })
          }
        )
      ]
    }
  );
}
const OUTCOME_LABELS = {
  [CallOutcome.reached]: "Reached",
  [CallOutcome.noAnswer]: "No Answer",
  [CallOutcome.leftVoicemail]: "Left Voicemail"
};
const OUTCOME_COLORS = {
  [CallOutcome.reached]: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  [CallOutcome.noAnswer]: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  [CallOutcome.leftVoicemail]: "bg-primary/10 text-primary border-primary/20"
};
function formatTimestamp(ns) {
  const ms = Number(ns / BigInt(1e6));
  const date = new Date(ms);
  return date.toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function buildTimeline(calls, texts, emails) {
  const callEntries = calls.map((c) => ({
    kind: "call",
    timestamp: c.timestamp,
    outcome: c.outcome
  }));
  const textEntries = texts.map((t) => ({
    kind: "text",
    timestamp: t.timestamp,
    messageBody: t.messageBody
  }));
  const emailEntries = emails.map((e) => ({
    kind: "email",
    timestamp: e.timestamp
  }));
  return [...callEntries, ...textEntries, ...emailEntries].sort(
    (a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
  );
}
function findDispositionForEntry(entry, leadNotes, entryIndex) {
  if (entry.kind !== "call" && entry.kind !== "email") return null;
  const prefix = entry.kind === "call" ? "[Call]" : "[Email]";
  const lines = leadNotes.split("\n").filter((l) => l.startsWith(prefix) && l.includes("Disposition:"));
  const line = lines[entryIndex];
  return line ? extractDisposition(line) : null;
}
function CommunicationHistory({
  callHistory,
  textHistory,
  emailHistory,
  leadNotes
}) {
  const timeline = buildTimeline(callHistory, textHistory, emailHistory);
  const kindCounters = {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-6 mt-4 sm:mt-5",
      "data-ocid": "comm-history.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 sm:mb-5", children: "Communication History" }),
        timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-8 sm:py-10 text-center",
            "data-ocid": "comm-history.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No calls, texts, or emails logged yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Use the Call, Text, or Email buttons above to reach out. Your outreach activity will appear here." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative space-y-0", "data-ocid": "comm-history.list", children: timeline.map((entry, i) => {
          const kindKey = entry.kind;
          kindCounters[kindKey] = kindCounters[kindKey] ?? 0;
          const kindIndex = kindCounters[kindKey];
          kindCounters[kindKey] = kindIndex + 1;
          const disposition = findDispositionForEntry(
            entry,
            leadNotes,
            kindIndex
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex gap-3 pb-5 last:pb-0",
              "data-ocid": `comm-history.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: [
                        "w-8 h-8 rounded-full flex items-center justify-center border shrink-0",
                        entry.kind === "call" ? "bg-primary/10 border-primary/30 text-primary" : entry.kind === "email" ? "bg-sky-500/10 border-sky-500/30 text-sky-600" : "bg-muted border-border text-muted-foreground"
                      ].join(" "),
                      children: entry.kind === "call" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-3.5 h-3.5" }) : entry.kind === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  i < timeline.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px flex-1 bg-border mt-1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pt-1 pb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: entry.kind === "call" ? "Call" : entry.kind === "email" ? "Email sent" : "Text" }),
                    entry.kind === "call" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: [
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                          OUTCOME_COLORS[entry.outcome]
                        ].join(" "),
                        children: OUTCOME_LABELS[entry.outcome]
                      }
                    ),
                    disposition && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: [
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                          DISPOSITION_BADGE_STYLES[disposition]
                        ].join(" "),
                        "data-ocid": `comm-history.disposition_badge.${i + 1}`,
                        children: disposition
                      }
                    )
                  ] }),
                  entry.kind === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground break-words mb-1", children: entry.messageBody.length > 120 ? `${entry.messageBody.slice(0, 120)}…` : entry.messageBody }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatTimestamp(entry.timestamp) })
                ] })
              ]
            },
            `${entry.kind}-${entry.timestamp.toString()}`
          );
        }) })
      ]
    }
  );
}
function InfoRow({
  icon,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mt-0.5 shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium break-words text-foreground", children })
    ] })
  ] });
}
export {
  LeadDetailPage as default
};
