import { j as jsxRuntimeExports, r as reactExports } from "./vendor-react-CYgLKadW.js";
import { c as cn, S as Skeleton, B as Button, C as Card, A as CardHeader, D as CardTitle, E as CardContent, v as Badge, F as Checkbox, L as Label, I as Input, T as Textarea } from "./index-DsrDu9m3.js";
import { aO as Root2, aP as List, aQ as Trigger, aR as Content, Y as MessageSquare, M as Mail, a3 as Plus, a4 as RefreshCw, aS as Pencil, av as Trash2, X, aT as Copy, t as ue } from "./vendor-DT3DREzx.js";
import { u as useSmsTemplates, a as useAddSmsTemplate, b as useUpdateSmsTemplate, c as useDeleteSmsTemplate, d as useEmailTemplates, e as useAddEmailTemplate, f as useUpdateEmailTemplate, g as useDeleteEmailTemplate } from "./useTemplates-wZAhJOj1.js";
import { s as spinText } from "./textSpinner-7_PX0Sl3.js";
import "./vendor-ic-W9L5KZ_F.js";
import "./vendor-router-gX3Sk5jz.js";
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const VERSION_LABELS = ["version-one", "version-two", "version-three"];
function SpinVersionsModal({ body, templateName, onClose }) {
  const versions = spinText(body);
  const [copied, setCopied] = reactExports.useState(null);
  function handleCopy(text, idx) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      ue.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4",
      style: { background: "rgba(0,0,0,0.6)" },
      role: "presentation",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "data-ocid": "spin.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          open: true,
          className: "relative bg-card rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-lg m-0 p-0 border-0 overflow-y-auto",
          style: {
            maxHeight: "min(90vh, calc(100dvh - env(safe-area-inset-bottom, 0px) - 80px))"
          },
          "aria-label": "Spin text variations",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-5 py-4 flex items-center justify-between",
                style: { background: "oklch(0.22 0.12 264)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-white" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-white", children: "Spin — 3 Variations" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "text-white/70 hover:text-white transition-colors rounded-md p-1",
                      "aria-label": "Close",
                      "data-ocid": "spin.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "3 variations of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: templateName }),
              ". Each is genuinely reworded. Copy any version to use it."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 space-y-3", children: versions.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-border bg-background p-4 space-y-2",
                "data-ocid": `spin.version.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-bold uppercase tracking-wider",
                        style: { color: "oklch(0.22 0.12 264)" },
                        children: [
                          "Version ",
                          i + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleCopy(v, i),
                        className: "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors hover:bg-muted min-h-[32px]",
                        style: {
                          color: copied === i ? "oklch(0.46 0.14 160)" : "oklch(0.22 0.12 264)"
                        },
                        "data-ocid": `spin.copy_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                          copied === i ? "Copied!" : "Copy"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed", children: v })
                ]
              },
              VERSION_LABELS[i] ?? `version-${i}`
            )) })
          ]
        }
      )
    }
  );
}
const emailEmpty = { name: "", subject: "", body: "" };
function EmailTemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving
}) {
  const [form, setForm] = reactExports.useState(initial ?? emailEmpty);
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const valid = form.name.trim() && form.subject.trim() && form.body.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "email-template-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "et-name", children: "Template name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "et-name",
            placeholder: "e.g. Follow-up Introduction",
            value: form.name,
            onChange: set("name"),
            "data-ocid": "email-template.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "et-subject", children: "Subject line" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "et-subject",
            placeholder: "e.g. Quick question about your business",
            value: form.subject,
            onChange: set("subject"),
            "data-ocid": "email-template.subject_input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "et-body", children: "Message body" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "et-body",
          placeholder: "Write your email template here...",
          value: form.body,
          onChange: set("body"),
          rows: 6,
          className: "resize-y",
          "data-ocid": "email-template.body_textarea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onCancel,
          "data-ocid": "email-template.cancel_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
            "Cancel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: () => valid && onSave(form),
          disabled: !valid || isSaving,
          "data-ocid": "email-template.save_button",
          children: isSaving ? "Saving…" : "Save template"
        }
      )
    ] })
  ] });
}
const smsEmpty = { name: "", body: "" };
function SmsTemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving
}) {
  const [form, setForm] = reactExports.useState(initial ?? smsEmpty);
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const valid = form.name.trim() && form.body.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "sms-template-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-name", children: "Template name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "sms-name",
          placeholder: "e.g. Initial Outreach",
          value: form.name,
          onChange: set("name"),
          "data-ocid": "sms-template.name_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-body", children: "Message body" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "sms-body",
          placeholder: "Write your SMS template here...",
          value: form.body,
          onChange: set("body"),
          rows: 4,
          className: "resize-y",
          "data-ocid": "sms-template.body_textarea"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          form.body.length,
          "/160 characters"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded border border-primary/30 hover:bg-primary/5",
            onClick: () => setForm((prev) => ({
              ...prev,
              body: `${prev.body}{{first_name}}`
            })),
            title: "Insert first name placeholder",
            children: "+ Insert {{first_name}}"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onCancel,
          "data-ocid": "sms-template.cancel_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
            "Cancel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: () => valid && onSave(form),
          disabled: !valid || isSaving,
          "data-ocid": "sms-template.save_button",
          children: isSaving ? "Saving…" : "Save template"
        }
      )
    ] })
  ] });
}
function EmailTemplatesList() {
  const { data: templates = [], isLoading, isError } = useEmailTemplates();
  const [timedOut, setTimedOut] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLoading) {
      timerRef.current = setTimeout(() => setTimedOut(true), 1e4);
    } else {
      setTimedOut(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);
  const addMut = useAddEmailTemplate();
  const updateMut = useUpdateEmailTemplate();
  const deleteMut = useDeleteEmailTemplate();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const handleAdd = async (form) => {
    try {
      await addMut.mutateAsync(form);
      ue.success("Email template saved");
      setShowAdd(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to save email template. Please try again."
      );
    }
  };
  const handleUpdate = async (id, form) => {
    try {
      await updateMut.mutateAsync({ id, ...form });
      ue.success("Template updated");
      setEditId(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update email template. Please try again."
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteMut.mutateAsync(id);
      ue.success("Template deleted");
      setConfirmDeleteId(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete email template. Please try again."
      );
    }
  };
  if (isLoading && !timedOut) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "email-templates.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) });
  }
  if (timedOut || isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "email-templates.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Couldn't load templates." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Check your connection and try refreshing the page." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    !showAdd && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setShowAdd(true),
        className: "border-dashed flex-1 sm:flex-none",
        "data-ocid": "email-template.add_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
          "New Template"
        ]
      }
    ) }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-foreground", children: "New Email Template" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmailTemplateForm,
        {
          initial: emailEmpty,
          onSave: handleAdd,
          onCancel: () => setShowAdd(false),
          isSaving: addMut.isPending
        }
      ) })
    ] }),
    templates.length === 0 && !showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "email-templates.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No templates yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Create one to get started." })
        ]
      }
    ),
    templates.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `email-template.item.${idx + 1}`, children: editId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-3 text-foreground", children: "Edit Email Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmailTemplateForm,
        {
          initial: { name: t.name, subject: t.subject, body: t.body },
          onSave: (form) => handleUpdate(t.id, form),
          onCancel: () => setEditId(null),
          isSaving: updateMut.isPending
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: "Email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Subject:" }),
          " ",
          t.subject
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: t.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0", children: confirmDeleteId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Delete?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "destructive",
            className: "h-6 text-xs px-2",
            onClick: () => handleDelete(t.id),
            disabled: deleteMut.isPending,
            "data-ocid": `email-template.confirm_button.${idx + 1}`,
            children: "Yes"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-6 text-xs px-2",
            onClick: () => setConfirmDeleteId(null),
            "data-ocid": `email-template.cancel_button.${idx + 1}`,
            children: "No"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 text-muted-foreground hover:text-foreground",
            onClick: () => setEditId(t.id),
            "aria-label": "Edit template",
            "data-ocid": `email-template.edit_button.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 text-muted-foreground hover:text-destructive",
            onClick: () => setConfirmDeleteId(t.id),
            "aria-label": "Delete template",
            "data-ocid": `email-template.delete_button.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        )
      ] }) })
    ] }) }) }, t.id)),
    templates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-1", children: "Tip: Use the Spin feature on SMS templates to generate 3 variations of a message." })
  ] });
}
function SmsTemplatesList() {
  const { data: templates = [], isLoading, isError } = useSmsTemplates();
  const [timedOut, setTimedOut] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLoading) {
      timerRef.current = setTimeout(() => setTimedOut(true), 1e4);
    } else {
      setTimedOut(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);
  const addMut = useAddSmsTemplate();
  const updateMut = useUpdateSmsTemplate();
  const deleteMut = useDeleteSmsTemplate();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editId, setEditId] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const [spinTemplate, setSpinTemplate] = reactExports.useState(null);
  const [spinChecked, setSpinChecked] = reactExports.useState({});
  const handleAdd = async (form) => {
    try {
      await addMut.mutateAsync(form);
      ue.success("SMS template saved");
      setShowAdd(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to save SMS template. Please try again."
      );
    }
  };
  const handleUpdate = async (id, form) => {
    try {
      await updateMut.mutateAsync({ id, ...form });
      ue.success("Template updated");
      setEditId(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update SMS template. Please try again."
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteMut.mutateAsync(id);
      ue.success("Template deleted");
      setConfirmDeleteId(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete SMS template. Please try again."
      );
    }
  };
  function toggleSpin(id, checked) {
    setSpinChecked((prev) => ({ ...prev, [id]: checked }));
    if (checked) {
      const template = templates.find((t) => t.id === id);
      if (template) setSpinTemplate(template);
    } else {
      setSpinTemplate(null);
    }
  }
  if (isLoading && !timedOut) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "sms-templates.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) });
  }
  if (timedOut || isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "sms-templates.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Couldn't load templates." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Check your connection and try refreshing the page." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    spinTemplate && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SpinVersionsModal,
      {
        body: spinTemplate.body,
        templateName: spinTemplate.name,
        onClose: () => {
          setSpinTemplate(null);
          setSpinChecked({});
        }
      }
    ),
    !showAdd && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setShowAdd(true),
        className: "border-dashed flex-1 sm:flex-none",
        "data-ocid": "sms-template.add_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
          "New Template"
        ]
      }
    ) }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-foreground", children: "New SMS Template" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SmsTemplateForm,
        {
          initial: smsEmpty,
          onSave: handleAdd,
          onCancel: () => setShowAdd(false),
          isSaving: addMut.isPending
        }
      ) })
    ] }),
    templates.length === 0 && !showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "sms-templates.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No templates yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Create one to get started." })
        ]
      }
    ),
    templates.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `sms-template.item.${idx + 1}`, children: editId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-3 text-foreground", children: "Edit SMS Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SmsTemplateForm,
        {
          initial: { name: t.name, body: t.body },
          onSave: (form) => handleUpdate(t.id, form),
          onCancel: () => setEditId(null),
          isSaving: updateMut.isPending
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs shrink-0 border-accent/50 text-accent",
              children: "SMS"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: t.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 mt-1", children: [
          t.body.length,
          " chars"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 mt-2.5 pt-2 border-t border-border/60",
            "data-ocid": `sms-template.spin_checkbox.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `spin-${t.id}`,
                  checked: spinChecked[t.id] ?? false,
                  onCheckedChange: (checked) => toggleSpin(t.id, checked === true),
                  className: "w-4 h-4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: `spin-${t.id}`,
                  className: "text-xs font-medium cursor-pointer select-none flex items-center gap-1.5",
                  style: { color: "oklch(0.38 0.10 264)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    "Spin into 3 versions"
                  ]
                }
              ),
              spinChecked[t.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: "— dialog will open" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0", children: confirmDeleteId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Delete?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "destructive",
            className: "h-6 text-xs px-2",
            onClick: () => handleDelete(t.id),
            disabled: deleteMut.isPending,
            "data-ocid": `sms-template.confirm_button.${idx + 1}`,
            children: "Yes"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-6 text-xs px-2",
            onClick: () => setConfirmDeleteId(null),
            "data-ocid": `sms-template.cancel_button.${idx + 1}`,
            children: "No"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 text-muted-foreground hover:text-foreground",
            onClick: () => setEditId(t.id),
            "aria-label": "Edit template",
            "data-ocid": `sms-template.edit_button.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 text-muted-foreground hover:text-destructive",
            onClick: () => setConfirmDeleteId(t.id),
            "aria-label": "Delete template",
            "data-ocid": `sms-template.delete_button.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        )
      ] }) })
    ] }) }) }, t.id))
  ] });
}
function TemplatesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative overflow-hidden",
      "data-ocid": "templates.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground", children: "Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Manage reusable email and SMS message templates. Use",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-1 rounded", children: "{{first_name}}" }),
            " ",
            `to personalize messages with each lead's first name. Check "Spin" to generate 3 unique, genuinely reworded variations instantly.`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "sms", "data-ocid": "templates.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "sms",
                className: "flex items-center gap-1.5 min-h-[48px] text-sm",
                "data-ocid": "templates.sms_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                  "SMS"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "email",
                className: "flex items-center gap-1.5 min-h-[48px] text-sm",
                "data-ocid": "templates.email_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                  "Email"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sms", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SmsTemplatesList, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "email", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailTemplatesList, {}) })
        ] })
      ]
    }
  );
}
export {
  TemplatesPage as default
};
