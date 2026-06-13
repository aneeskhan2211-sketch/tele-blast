import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { u as useLeads, z as useSmsTemplates, G as useEmailTemplates, a as useGetPipelines, p as useAddCallRecord, q as useAddTextRecord, r as useAddEmailRecord, i as useUpdateLead, y as handleSmsSend, S as Skeleton, v as Badge, B as Button, s as getIMessagePreference, T as Textarea, w as IMessageCheckbox, m as isGoogleVoiceEnabled, l as handlePhoneCall, x as setIMessagePreference } from "./index-DsrDu9m3.js";
import { L as Link } from "./vendor-router-gX3Sk5jz.js";
import { aU as CalendarClock, C as Cake, aa as UserPlus, t as ue, X, Q as ExternalLink, G as GitBranch, H as Check, M as Mail, aV as CheckCheck, P as Phone, V as MessageCircle } from "./vendor-DT3DREzx.js";
import { i as isWindowsDesktop } from "./usePhoneLinkPreference-DxhpuVQj.js";
import { C as CallOutcome, P as PipelineStage } from "./vendor-ic-W9L5KZ_F.js";
function parseBirthday(birthday) {
  const parts = birthday.split(/[-/]/);
  if (parts.length === 3) {
    return {
      month: Number.parseInt(parts[1], 10),
      day: Number.parseInt(parts[2], 10)
    };
  }
  if (parts.length === 2) {
    return {
      month: Number.parseInt(parts[0], 10),
      day: Number.parseInt(parts[1], 10)
    };
  }
  return null;
}
function daysUntilBirthday(birthday) {
  const parsed = parseBirthday(birthday);
  if (!parsed) return null;
  const today = /* @__PURE__ */ new Date();
  const thisYear = today.getFullYear();
  let next = new Date(thisYear, parsed.month - 1, parsed.day);
  if (next.getMonth() !== parsed.month - 1 || next.getDate() !== parsed.day)
    return null;
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (next < todayMidnight)
    next = new Date(thisYear + 1, parsed.month - 1, parsed.day);
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const nextDate = new Date(
    next.getFullYear(),
    next.getMonth(),
    next.getDate()
  );
  return Math.round((nextDate.getTime() - todayDate.getTime()) / 864e5);
}
function formatBirthdayDisplay(birthday) {
  const parsed = parseBirthday(birthday);
  if (!parsed) return birthday;
  const d = new Date(2e3, parsed.month - 1, parsed.day);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}
function formatFollowUpDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function daysUntilFollowUp(dateStr) {
  const d = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((target.getTime() - todayDate.getTime()) / 864e5);
}
function formatDateNote() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function prependNote(existing, note) {
  return existing ? `${note}

${existing}` : note;
}
function getLeadDisplayName(lead) {
  const parts = [lead.firstName, lead.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return lead.name || "";
}
function getStageBadgeStyle(stage) {
  const map = {
    [PipelineStage.Prospect]: "bg-muted text-muted-foreground",
    [PipelineStage.Contacted]: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    [PipelineStage.Qualified]: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    [PipelineStage.ClosedWon]: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    [PipelineStage.ClosedLost]: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
  };
  return map[stage] ?? "bg-muted text-muted-foreground";
}
function relativeTime(createdAt) {
  const ms = Number(createdAt);
  const diffMs = Date.now() - ms;
  const diffMin = Math.floor(diffMs / 6e4);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? "min" : "mins"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? "hour" : "hours"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
}
function isNewLead(lead) {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1e3;
  const createdMs = Number(lead.createdAt);
  return !lead.isImported && lead.callHistory.length === 0 && lead.textHistory.length === 0 && lead.emailHistory.length === 0 && createdMs >= thirtyDaysAgo;
}
function SmsModal({ lead, templates, onClose, onSend }) {
  const [selected, setSelected] = reactExports.useState(
    templates.length > 0 ? templates[0].id : null
  );
  const [custom, setCustom] = reactExports.useState("");
  const [useIMessage, setUseIMessage] = reactExports.useState(getIMessagePreference);
  const message = selected ? templates.find((t) => t.id === selected)?.body ?? "" : custom;
  const displayName = getLeadDisplayName(lead);
  const handleIMessageToggle = (v) => {
    setUseIMessage(v);
    setIMessagePreference(v);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4",
      "data-ocid": "queue.text_modal",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col",
          style: {
            maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Send Text" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "to ",
                  displayName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
                  "aria-label": "Close",
                  "data-ocid": "queue.text_modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto overscroll-contain p-5 space-y-4", children: [
              templates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Choose Template" }),
                templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSelected(t.id);
                      setCustom("");
                    },
                    className: `w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${selected === t.id ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20" : "border-border hover:border-orange-300 hover:bg-muted/50"}`,
                    "data-ocid": "queue.sms_template.item",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5 line-clamp-2", children: [
                        t.body.slice(0, 60),
                        t.body.length > 60 ? "…" : ""
                      ] })
                    ]
                  },
                  t.id
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelected(null),
                    className: `w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${selected === null ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20" : "border-border hover:border-orange-300 hover:bg-muted/50"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Custom message" })
                  }
                )
              ] }),
              (selected === null || templates.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Type your message…",
                  value: custom,
                  onChange: (e) => setCustom(e.target.value),
                  className: "min-h-24 resize-none",
                  "data-ocid": "queue.text_modal.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center rounded-xl border border-border bg-muted/30 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IMessageCheckbox,
                {
                  checked: useIMessage,
                  onChange: handleIMessageToggle
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 px-5 py-4 border-t border-border shrink-0",
                style: {
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      "data-ocid": "queue.text_modal.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 font-semibold text-white bg-accent hover:bg-accent/90",
                      onClick: () => message.trim() && onSend(message, useIMessage),
                      disabled: !message.trim(),
                      "data-ocid": "queue.text_modal.confirm_button",
                      children: "Send Text"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function EmailModal({ lead, templates, onClose, onSend }) {
  const [selected, setSelected] = reactExports.useState(
    templates.length > 0 ? templates[0].id : null
  );
  const selectedTemplate = templates.find((t) => t.id === selected) ?? null;
  const displayName = getLeadDisplayName(lead);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4",
      "data-ocid": "queue.email_modal",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col",
          style: {
            maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Send Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "to ",
                  displayName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
                  "aria-label": "Close",
                  "data-ocid": "queue.email_modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto overscroll-contain p-5 space-y-2", children: templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No email templates yet. Create one on the Templates page." }) : templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelected(t.id),
                className: `w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${selected === t.id ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20" : "border-border hover:border-orange-300 hover:bg-muted/50"}`,
                "data-ocid": "queue.email_template.item",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5 line-clamp-2", children: [
                    t.body.slice(0, 60),
                    t.body.length > 60 ? "…" : ""
                  ] })
                ]
              },
              t.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 px-5 py-4 border-t border-border shrink-0",
                style: {
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      "data-ocid": "queue.email_modal.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 font-semibold text-white bg-accent hover:bg-accent/90",
                      onClick: () => selectedTemplate && onSend(selectedTemplate),
                      disabled: !selectedTemplate,
                      "data-ocid": "queue.email_modal.confirm_button",
                      children: "Open Email"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function WelcomeEmailModal({
  lead,
  onClose,
  onSendNow,
  onAddToQueue
}) {
  const displayName = getLeadDisplayName(lead);
  const [subject, setSubject] = reactExports.useState("Welcome!");
  const [body, setBody] = reactExports.useState(
    `Hi ${displayName},

Thank you for your interest! I'd love to connect and show you how Tele-Blast can help you track prospects, manage outreach, and close more deals.

Would you be available for a quick call this week?

Looking forward to connecting,
[Your Name]`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4",
      "data-ocid": "queue.welcome_email_modal",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col",
          style: {
            maxHeight: "calc(100dvh - 64px - env(safe-area-inset-bottom, 0px))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Send Welcome Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "to ",
                  lead.email || displayName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
                  "aria-label": "Close",
                  "data-ocid": "queue.welcome_email_modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto overscroll-contain p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide block", children: "To" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground px-3 py-2 bg-muted rounded-lg", children: lead.email || "(no email on file)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "welcome-subject",
                    className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                    children: "Subject"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "welcome-subject",
                    type: "text",
                    value: subject,
                    onChange: (e) => setSubject(e.target.value),
                    className: "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40",
                    "data-ocid": "queue.welcome_email_modal.subject_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "welcome-body",
                    className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                    children: "Message"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "welcome-body",
                    value: body,
                    onChange: (e) => setBody(e.target.value),
                    className: "min-h-40 resize-none text-sm",
                    "data-ocid": "queue.welcome_email_modal.textarea"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 px-5 py-4 border-t border-border shrink-0",
                style: {
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      "data-ocid": "queue.welcome_email_modal.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1 border-accent text-accent hover:bg-accent/10",
                      onClick: () => onAddToQueue(subject, body),
                      disabled: !body.trim(),
                      "data-ocid": "queue.welcome_email_modal.add_to_queue_button",
                      children: "Add to Queue"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 font-semibold text-white bg-accent hover:bg-accent/90",
                      onClick: () => onSendNow(subject, body),
                      disabled: !body.trim(),
                      "data-ocid": "queue.welcome_email_modal.send_now_button",
                      children: "Send Now"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function ActionButtons({
  index,
  prefix,
  onCall,
  onText,
  onEmail
}) {
  const enabledCls = "bg-muted hover:bg-muted/80 text-foreground active:opacity-70";
  const actions = [
    {
      label: "Call",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
      handler: onCall,
      suffix: "call_button"
    },
    {
      label: "Text",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
      handler: onText,
      suffix: "text_button"
    },
    {
      label: "Email",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
      handler: onEmail,
      suffix: "email_button"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-1", children: actions.map(({ label, icon, handler, suffix }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handler,
      title: label,
      className: `flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${enabledCls}`,
      "data-ocid": `${prefix}.${suffix}.${index}`,
      children: [
        icon,
        label
      ]
    },
    label
  )) });
}
function BirthdayTab({ leads, isLoading, onAction }) {
  const [dismissed, setDismissed] = reactExports.useState(/* @__PURE__ */ new Set());
  const birthdayLeads = leads.filter((l) => {
    if (!l.birthday) return false;
    const days = daysUntilBirthday(l.birthday);
    return days !== null && days <= 60;
  }).map((l) => ({ lead: l, days: daysUntilBirthday(l.birthday) })).sort((a, b) => a.days - b.days);
  const todayBirthdays = birthdayLeads.filter(({ days }) => days === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    todayBirthdays.filter(({ lead }) => !dismissed.has(lead.id.toString())).map(({ lead }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white bg-accent/90",
        "data-ocid": "queue.birthday_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "🎂 Today is ",
            getLeadDisplayName(lead),
            "'s birthday! Reach out now."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDismissed((prev) => /* @__PURE__ */ new Set([...prev, lead.id.toString()])),
              className: "shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors",
              "aria-label": "Dismiss",
              "data-ocid": "queue.birthday_banner.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ]
      },
      lead.id.toString()
    )),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.birthday.loading_state", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-xl" }, i)) }),
    !isLoading && birthdayLeads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "queue.birthday.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No upcoming birthdays found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Import leads with birthday dates to see them here. Leads with birthdays in the next 60 days will appear in this queue." })
          ] })
        ]
      }
    ),
    !isLoading && birthdayLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.birthday.list", children: birthdayLeads.map(({ lead, days }, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 flex flex-col gap-3",
        "data-ocid": `queue.birthday.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base leading-snug truncate", children: getLeadDisplayName(lead) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lead.birthday ? formatBirthdayDisplay(lead.birthday) : "" })
            ] }),
            days === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 text-white font-semibold px-2.5 py-1 bg-accent border-0", children: "Today! 🎂" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
              "in ",
              days,
              " ",
              days === 1 ? "day" : "days"
            ] })
          ] }),
          (lead.phone || lead.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead.phone }),
            lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButtons,
            {
              index: index + 1,
              prefix: "queue.birthday",
              onCall: () => onAction(lead, null),
              onText: () => onAction(lead, "text"),
              onEmail: () => onAction(lead, "email")
            }
          )
        ]
      },
      lead.id.toString()
    )) })
  ] });
}
function FollowUpTab({ leads, isLoading, onAction }) {
  const followUpLeads = leads.filter((l) => !!l.followUpDate).map((l) => ({ lead: l, days: daysUntilFollowUp(l.followUpDate) })).sort((a, b) => a.days - b.days);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.followup.loading_state", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }, i)) }),
    !isLoading && followUpLeads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "queue.followup.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No follow-ups scheduled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Set a follow-up date after a call or email to see leads here." })
          ] })
        ]
      }
    ),
    !isLoading && followUpLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.followup.list", children: followUpLeads.map(({ lead, days }, index) => {
      const isOverdue = days < 0;
      const isToday = days === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-card rounded-xl border p-4 flex flex-col gap-3 ${isOverdue ? "border-orange-300 dark:border-orange-800/60" : "border-border"}`,
          "data-ocid": `queue.followup.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base leading-snug truncate", children: getLeadDisplayName(lead) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-medium px-2 py-0.5 rounded-full ${getStageBadgeStyle(lead.pipelineStage)}`,
                      children: lead.pipelineStage
                    }
                  ),
                  lead.followUpDate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatFollowUpDate(lead.followUpDate) })
                ] })
              ] }),
              isOverdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 font-semibold px-2.5 py-1 text-white bg-accent border-0", children: "Overdue" }) : isToday ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 font-semibold px-2.5 py-1 text-white bg-primary border-0", children: "Today" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
                "in ",
                days,
                " ",
                days === 1 ? "day" : "days"
              ] })
            ] }),
            (lead.phone || lead.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead.phone }),
              lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionButtons,
              {
                index: index + 1,
                prefix: "queue.followup",
                onCall: () => onAction(lead, null),
                onText: () => onAction(lead, "text"),
                onEmail: () => onAction(lead, "email")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/leads/$id",
                params: { id: lead.id.toString() },
                className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors self-start",
                "data-ocid": `queue.followup.view_lead.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "View Lead"
                ]
              }
            )
          ]
        },
        lead.id.toString()
      );
    }) })
  ] });
}
function NewLeadsTab({
  leads,
  isLoading,
  onAction,
  pipelines
}) {
  const [reviewedIds, setReviewedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const newLeads = leads.filter(isNewLead).filter((l) => !reviewedIds.has(l.id.toString())).sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  const [welcomeModalLead, setWelcomeModalLead] = reactExports.useState(null);
  const [queuedEmails, setQueuedEmails] = reactExports.useState([]);
  const [sentLeadIds, setSentLeadIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [queuedLeadIds, setQueuedLeadIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [queuedOpen, setQueuedOpen] = reactExports.useState(false);
  const addEmail = useAddEmailRecord();
  const updateLead = useUpdateLead();
  function handleSendNow(subject, body) {
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
            `Welcome email sent on ${formatDateNote()}`
          )
        }
      })
    ]);
    setSentLeadIds((prev) => /* @__PURE__ */ new Set([...prev, lead.id.toString()]));
    ue.success(`Welcome email opened for ${getLeadDisplayName(lead)}`);
  }
  function handleAddToQueue(subject, body) {
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
        body
      }
    ]);
    setQueuedLeadIds((prev) => /* @__PURE__ */ new Set([...prev, lead.id.toString()]));
    ue.success(
      `Welcome email added to queue for ${getLeadDisplayName(lead)}`
    );
  }
  function handleSendQueued(q) {
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
    setSentLeadIds((prev) => /* @__PURE__ */ new Set([...prev, q.leadId]));
    setQueuedLeadIds((prev) => {
      const next = new Set(prev);
      next.delete(q.leadId);
      return next;
    });
    ue.success(`Welcome email opened for ${q.leadName}`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.newleads.loading_state", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-xl" }, i)) }),
    !isLoading && newLeads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center",
        "data-ocid": "queue.newleads.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No new leads yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "New sign-ups from your forms will appear here." })
          ] })
        ]
      }
    ),
    !isLoading && newLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "queue.newleads.list", children: newLeads.map((lead, index) => {
      const isSent = sentLeadIds.has(lead.id.toString());
      const isQueued = queuedLeadIds.has(lead.id.toString());
      const pipelineName = lead.pipelineId ? pipelines.find((p) => p.id === lead.pipelineId)?.name : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-4 flex flex-col gap-3",
          "data-ocid": `queue.newleads.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base leading-snug truncate", children: getLeadDisplayName(lead) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Submitted ",
                  relativeTime(lead.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "shrink-0 text-xs bg-accent/10 text-accent border-accent/20",
                  children: "New Lead"
                }
              )
            ] }),
            (lead.phone || lead.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead.phone }),
              lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.email })
            ] }),
            pipelineName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: pipelineName })
            ] }),
            isSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
              "Welcome email sent"
            ] }) : isQueued ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-accent py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
              "Added to queue"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-white min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95 bg-accent",
                onClick: () => setWelcomeModalLead(lead),
                "data-ocid": `queue.newleads.welcome_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                  "Send Welcome Email"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionButtons,
              {
                index: index + 1,
                prefix: "queue.newleads",
                onCall: () => onAction(lead, null),
                onText: () => onAction(lead, "text"),
                onEmail: () => onAction(lead, "email")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/leads/$id",
                  params: { id: lead.id.toString() },
                  className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": `queue.newleads.view_lead.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                    "View Lead"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: async () => {
                    setReviewedIds(
                      (prev) => /* @__PURE__ */ new Set([...prev, lead.id.toString()])
                    );
                    await updateLead.mutateAsync({
                      id: lead.id,
                      updates: {
                        notes: prependNote(
                          lead.notes,
                          `Reviewed from New Lead Queue on ${formatDateNote()}`
                        )
                      }
                    });
                    ue.success(
                      `${getLeadDisplayName(lead)} marked as reviewed`
                    );
                  },
                  className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors",
                  "data-ocid": `queue.newleads.mark_reviewed_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }),
                    "Mark Reviewed"
                  ]
                }
              )
            ] })
          ]
        },
        lead.id.toString()
      );
    }) }),
    queuedEmails.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted transition-colors text-sm font-semibold text-foreground min-h-[44px]",
          onClick: () => setQueuedOpen((v) => !v),
          "data-ocid": "queue.newleads.queued_emails_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-accent" }),
              "Queued Emails",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-white bg-accent border-0 text-xs px-2 py-0.5", children: queuedEmails.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: queuedOpen ? "Hide" : "Show" })
          ]
        }
      ),
      queuedOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: queuedEmails.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between gap-3 px-4 py-3",
          "data-ocid": `queue.newleads.queued_email.${q.leadId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: q.leadName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: q.email || "(no email)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "shrink-0 text-white bg-accent hover:bg-accent/90 text-xs",
                onClick: () => handleSendQueued(q),
                "data-ocid": `queue.newleads.send_queued_button.${q.leadId}`,
                children: "Send"
              }
            )
          ]
        },
        q.leadId
      )) })
    ] }),
    welcomeModalLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WelcomeEmailModal,
      {
        lead: welcomeModalLead,
        onClose: () => setWelcomeModalLead(null),
        onSendNow: handleSendNow,
        onAddToQueue: handleAddToQueue
      }
    )
  ] });
}
function QueuePage() {
  const { data: leads = [], isLoading } = useLeads();
  const { data: smsTemplates = [] } = useSmsTemplates();
  const { data: emailTemplates = [] } = useEmailTemplates();
  const { data: pipelines = [] } = useGetPipelines();
  const addCall = useAddCallRecord();
  const addText = useAddTextRecord();
  const addEmail = useAddEmailRecord();
  const updateLead = useUpdateLead();
  const [activeTab, setActiveTab] = reactExports.useState("birthday");
  const [modal, setModal] = reactExports.useState(null);
  const newLeadsCount = leads.filter(isNewLead).length;
  async function handleCall(lead) {
    const phoneLinkOn = isWindowsDesktop();
    const gvOn = isGoogleVoiceEnabled();
    if (lead.phone) {
      handlePhoneCall(lead.phone, phoneLinkOn, gvOn);
    }
    const note = `Called on ${formatDateNote()} from Queue`;
    await Promise.allSettled([
      addCall.mutateAsync({ leadId: lead.id, outcome: CallOutcome.reached }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) }
      })
    ]);
    ue.success(`Call logged for ${getLeadDisplayName(lead)}`);
  }
  async function handleTextSend(lead, message, useIMessage) {
    setModal(null);
    const snippet = message.length > 40 ? `${message.slice(0, 40)}…` : message;
    if (lead.phone) {
      handleSmsSend(lead.phone, message);
    }
    const via = useIMessage ? " (iMessage)" : "";
    const note = `Texted on ${formatDateNote()} from Queue${via}: ${snippet}`;
    await Promise.allSettled([
      addText.mutateAsync({ leadId: lead.id, messageBody: message }),
      updateLead.mutateAsync({
        id: lead.id,
        updates: { notes: prependNote(lead.notes, note) }
      })
    ]);
    ue.success(`Text logged for ${getLeadDisplayName(lead)}`);
  }
  async function handleEmailSend(lead, template) {
    setModal(null);
    if (lead.email) {
      const subject = encodeURIComponent(template.subject);
      const normalizedBody = template.body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      const body = encodeURIComponent(normalizedBody);
      const mailtoUrl = `mailto:${lead.email}?subject=${subject}&body=${body}`;
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
        updates: { notes: prependNote(lead.notes, note) }
      })
    ]);
    ue.success(`Email logged for ${getLeadDisplayName(lead)}`);
  }
  function handleAction(lead, mode) {
    if (mode === null) {
      handleCall(lead);
    } else {
      setModal({ mode, lead });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-6 space-y-5",
        "data-ocid": "queue.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground leading-tight", children: "Queue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Birthdays, follow-ups & new leads" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-1 p-1 rounded-xl bg-primary/10",
              role: "tablist",
              "data-ocid": "queue.tab",
              children: [
                {
                  key: "birthday",
                  fullLabel: "Birthday Queue",
                  shortLabel: "Birthdays",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "w-4 h-4" }),
                  count: null
                },
                {
                  key: "followup",
                  fullLabel: "Follow-Up Queue",
                  shortLabel: "Follow-Ups",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4" }),
                  count: null
                },
                {
                  key: "newleads",
                  fullLabel: "New Leads",
                  shortLabel: "New",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  count: newLeadsCount > 0 ? newLeadsCount : null
                }
              ].map(({ key, fullLabel, shortLabel, icon, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeTab === key,
                  onClick: () => setActiveTab(key),
                  className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all ${activeTab === key ? "text-white shadow-sm bg-primary" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `queue.${key}.tab`,
                  children: [
                    icon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: fullLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: shortLabel }),
                    count !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${activeTab === key ? "bg-white/30 text-white" : "bg-accent text-white"}`,
                        children: count
                      }
                    )
                  ]
                },
                key
              ))
            }
          ),
          activeTab === "birthday" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            BirthdayTab,
            {
              leads,
              isLoading,
              onAction: handleAction
            }
          ),
          activeTab === "followup" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            FollowUpTab,
            {
              leads,
              isLoading,
              onAction: handleAction
            }
          ),
          activeTab === "newleads" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            NewLeadsTab,
            {
              leads,
              isLoading,
              onAction: handleAction,
              pipelines
            }
          )
        ]
      }
    ),
    modal?.mode === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsModal,
      {
        lead: modal.lead,
        templates: smsTemplates,
        onClose: () => setModal(null),
        onSend: (msg, iMsg) => handleTextSend(modal.lead, msg, iMsg)
      }
    ),
    modal?.mode === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmailModal,
      {
        lead: modal.lead,
        templates: emailTemplates,
        onClose: () => setModal(null),
        onSend: (tpl) => handleEmailSend(modal.lead, tpl)
      }
    )
  ] });
}
export {
  QueuePage as default
};
