import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { a as useGetPipelines, b as useCreatePipeline, u as useLeads, i as useUpdateLead, P as PIPELINE_STAGES, B as Button, j as useUpdatePipeline, k as useDeletePipeline, I as Input, S as Skeleton, l as handlePhoneCall, m as isGoogleVoiceEnabled, n as SmsQuickSendPopover } from "./index-DsrDu9m3.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-qGLr7JS2.js";
import { k as useSearch, L as Link } from "./vendor-router-gX3Sk5jz.js";
import { a7 as FolderKanban, a3 as Plus, t as ue, m as ChevronDown, aq as EyeOff, ar as Eye, an as Settings2, X, W as TriangleAlert, P as Phone, Y as MessageSquare, M as Mail } from "./vendor-DT3DREzx.js";
import { i as isWindowsDesktop } from "./usePhoneLinkPreference-DxhpuVQj.js";
import "./vendor-ic-W9L5KZ_F.js";
const STAGE_HEADER_CLASSES = {
  Prospect: "from-primary/90 to-primary",
  Contacted: "from-[oklch(0.58_0.16_44)] to-[oklch(0.52_0.18_44)]",
  Qualified: "from-[oklch(0.5_0.15_160)] to-[oklch(0.44_0.17_160)]",
  ClosedWon: "from-[oklch(0.45_0.16_145)] to-[oklch(0.39_0.18_145)]",
  ClosedLost: "from-[oklch(0.5_0.18_27)] to-[oklch(0.44_0.2_27)]"
};
function PipelineHeader({
  pipelines,
  selectedId,
  onChange,
  onManage,
  onNewPipeline,
  hideDnc,
  onToggleHideDnc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: selectedId?.toString() ?? "all",
          onChange: (e) => {
            const val = e.target.value;
            onChange(val === "all" ? null : BigInt(val));
          },
          className: "appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px] min-w-[150px] transition-colors hover:border-primary/40",
          "data-ocid": "pipeline-filter-selector",
          "aria-label": "Select pipeline to view",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Pipelines" }),
            pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.name }, p.id.toString()))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        size: "sm",
        onClick: onNewPipeline,
        className: "gap-1.5 min-h-[44px] font-semibold shrink-0",
        "data-ocid": "pipeline-new-button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Pipeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "New" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onToggleHideDnc,
        className: `flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold min-h-[44px] transition-colors ${hideDnc ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
        title: hideDnc ? "Show DNC leads" : "Hide DNC leads",
        "aria-label": hideDnc ? "Show DNC leads" : "Hide DNC leads",
        "data-ocid": "pipeline-hide-dnc-toggle",
        children: hideDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "DNC Hidden" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Show DNC" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onManage,
        className: "p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
        title: "Manage pipelines",
        "aria-label": "Manage pipelines",
        "data-ocid": "pipeline-manage-button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-4 h-4" })
      }
    )
  ] });
}
function ManagePipelinesDialog({
  open,
  onClose,
  pipelines
}) {
  const createPipeline = useCreatePipeline();
  const updatePipeline = useUpdatePipeline();
  const deletePipeline = useDeletePipeline();
  const [newName, setNewName] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editName, setEditName] = reactExports.useState("");
  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    try {
      await createPipeline.mutateAsync(name);
      setNewName("");
      ue.success(`Pipeline "${name}" created`);
    } catch {
      ue.error("Failed to create pipeline");
    }
  };
  const handleUpdate = async (id) => {
    const name = editName.trim();
    if (!name) return;
    try {
      await updatePipeline.mutateAsync({ id, name });
      setEditingId(null);
      ue.success("Pipeline renamed");
    } catch {
      ue.error("Failed to rename pipeline");
    }
  };
  const handleDelete = async (id, name) => {
    if (!confirm(
      `Delete pipeline "${name}"? Leads will remain but lose their pipeline assignment.`
    ))
      return;
    try {
      await deletePipeline.mutateAsync(id);
      ue.success("Pipeline deleted");
    } catch {
      ue.error("Failed to delete pipeline");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-md max-h-[80vh] overflow-y-auto p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-base font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "w-5 h-5 text-primary" }),
      "Manage Pipelines"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "New pipeline name…",
          value: newName,
          onChange: (e) => setNewName(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") handleCreate();
          },
          className: "flex-1 min-h-[44px]",
          "data-ocid": "new-pipeline-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleCreate,
          disabled: !newName.trim() || createPipeline.isPending,
          className: "shrink-0 min-h-[44px]",
          "data-ocid": "create-pipeline-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            "Add"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-3", children: pipelines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-8 text-sm text-muted-foreground",
        "data-ocid": "pipelines-empty-state",
        children: "No pipelines yet. Create one above."
      }
    ) : pipelines.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-2 bg-muted/30 rounded-xl px-3 py-2.5 border border-border",
        "data-ocid": `pipeline-item.${i + 1}`,
        children: editingId === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editName,
              onChange: (e) => setEditName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") handleUpdate(p.id);
              },
              className: "flex-1 h-9",
              autoFocus: true,
              "data-ocid": `pipeline-rename-input.${i + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => handleUpdate(p.id),
              disabled: updatePipeline.isPending,
              className: "shrink-0 h-9",
              "data-ocid": `pipeline-save-button.${i + 1}`,
              children: "Save"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => setEditingId(null),
              className: "shrink-0 h-9",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "w-4 h-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium text-foreground truncate min-w-0", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditingId(p.id);
                setEditName(p.name);
              },
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded min-h-[32px]",
              "data-ocid": `pipeline-edit-button.${i + 1}`,
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleDelete(p.id, p.name),
              className: "text-xs text-destructive hover:text-destructive/80 transition-colors p-1.5 rounded min-h-[32px]",
              "data-ocid": `pipeline-delete-button.${i + 1}`,
              children: "Delete"
            }
          )
        ] })
      },
      p.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        onClick: onClose,
        className: "w-full mt-2 min-h-[44px]",
        "data-ocid": "manage-pipelines-close",
        children: "Done"
      }
    )
  ] }) });
}
function LeadCard({
  lead,
  onStageChange
}) {
  const [showSmsSend, setShowSmsSend] = reactExports.useState(false);
  const otherStages = PIPELINE_STAGES.filter(
    (s) => s.value !== lead.pipelineStage
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bg-card border rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group ${lead.isDnc ? "border-destructive/30 bg-destructive/3" : "border-border"}`,
        "data-ocid": "pipeline-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/leads/$id",
                params: { id: lead.id.toString() },
                className: "font-semibold text-sm text-foreground hover:text-primary transition-colors block break-words leading-snug flex-1 min-w-0",
                children: lead.name
              }
            ),
            lead.isDnc && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-destructive text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
              "DNC"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3 truncate", children: [
            lead.industry,
            lead.city ? ` · ${lead.city}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            lead.isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
              "DNC — No Contact"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const phoneLinkOn = isWindowsDesktop();
                    handlePhoneCall(
                      lead.phone,
                      phoneLinkOn,
                      isGoogleVoiceEnabled()
                    );
                  },
                  className: "p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors",
                  title: `Call ${lead.name}`,
                  "aria-label": `Call ${lead.name}`,
                  "data-ocid": "call-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors",
                  title: `Text ${lead.name}`,
                  "aria-label": `Text ${lead.name}`,
                  "data-ocid": "text-btn",
                  onClick: () => setShowSmsSend(true),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
                }
              ),
              lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${encodeURIComponent(lead.email)}`,
                  className: "p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors",
                  title: `Email ${lead.name}`,
                  "aria-label": `Email ${lead.name}`,
                  "data-ocid": "email-btn",
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "text-xs border border-border rounded-lg px-2 py-2 bg-background text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer min-w-0 min-h-[44px] flex-shrink",
                value: "",
                onChange: (e) => {
                  if (e.target.value)
                    onStageChange(lead.id, e.target.value);
                },
                "data-ocid": "stage-move-select",
                "aria-label": "Move to stage",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Move…" }),
                  otherStages.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
                ]
              }
            )
          ] })
        ]
      }
    ),
    showSmsSend && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsQuickSendPopover,
      {
        leadName: lead.name,
        phone: lead.phone,
        isDnc: lead.isDnc,
        onClose: () => setShowSmsSend(false)
      }
    )
  ] });
}
function ColumnSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) });
}
function MobilePipeline({
  leads,
  isLoading,
  activeStage,
  onStageChange: onActiveStageChange,
  onLeadStageChange,
  hideDnc
}) {
  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const stageLeads = visibleLeads.filter(
    (l) => l.pipelineStage === activeStage
  );
  const gradientClass = STAGE_HEADER_CLASSES[activeStage] ?? "from-primary/90 to-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex overflow-x-auto gap-2 px-4 py-3 scroll-touch shrink-0",
        style: { scrollbarWidth: "none" },
        "data-ocid": "pipeline-stage-tabs",
        children: PIPELINE_STAGES.map((stage) => {
          const count = visibleLeads.filter(
            (l) => l.pipelineStage === stage.value
          ).length;
          const isActive = activeStage === stage.value;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onActiveStageChange(stage.value),
              className: `flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shrink-0 min-h-[44px] active:opacity-80 ${isActive ? "text-white shadow-md" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`,
              style: isActive ? { background: "oklch(0.22 0.12 264)" } : void 0,
              "data-ocid": `pipeline-stage-tab-${stage.value.toLowerCase()}`,
              "aria-current": isActive ? "true" : void 0,
              children: [
                stage.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`,
                    children: count
                  }
                )
              ]
            },
            stage.value
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `mx-4 mb-3 rounded-xl bg-gradient-to-r ${gradientClass} px-4 py-3 flex items-center justify-between`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm uppercase tracking-wide", children: PIPELINE_STAGES.find((s) => s.value === activeStage)?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white/20 text-white text-xs font-bold rounded-full px-2.5 py-0.5", children: [
            stageLeads.length,
            " lead",
            stageLeads.length !== 1 ? "s" : ""
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 scroll-touch", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ColumnSkeleton, {}) : stageLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center bg-card rounded-xl border border-border",
        "data-ocid": "pipeline-stage-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No leads in this stage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: 'Use "Move…" on a lead card to move leads here' })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: stageLeads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadCard,
      {
        lead,
        onStageChange: onLeadStageChange
      },
      lead.id.toString()
    )) }) })
  ] });
}
function DesktopKanban({
  leads,
  isLoading,
  highlightStage,
  onLeadStageChange,
  hideDnc
}) {
  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const columnRefs = reactExports.useRef({});
  const boardRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (highlightStage && columnRefs.current[highlightStage]) {
      columnRefs.current[highlightStage]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }, [highlightStage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: boardRef,
      className: "flex-1 overflow-x-auto p-6 scroll-touch",
      style: { touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" },
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-4 min-w-[820px]", children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ColumnSkeleton, {}, s.value)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-4 min-w-[820px] items-start", children: PIPELINE_STAGES.map((stage) => {
        const stageLeads = visibleLeads.filter(
          (l) => l.pipelineStage === stage.value
        );
        const isHighlighted = highlightStage === stage.value;
        const gradientClass = STAGE_HEADER_CLASSES[stage.value] ?? "from-primary/90 to-primary";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: (el) => {
              columnRefs.current[stage.value] = el;
            },
            className: `flex flex-col rounded-xl overflow-hidden border transition-all duration-300 ${isHighlighted ? "border-primary ring-2 ring-primary/30 shadow-lg" : "border-border shadow-sm"}`,
            "data-ocid": "pipeline-column",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `bg-gradient-to-br ${gradientClass} px-3 py-3 flex items-center justify-between gap-2`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-xs font-bold tracking-wide uppercase truncate min-w-0", children: stage.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center shrink-0", children: stageLeads.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 flex-1 flex flex-col gap-2 p-2.5 min-h-[140px]", children: stageLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-1 items-center justify-center py-8",
                  "data-ocid": "empty-column",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center leading-relaxed", children: [
                    "No leads",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "in this stage"
                  ] })
                }
              ) : stageLeads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LeadCard,
                {
                  lead,
                  onStageChange: onLeadStageChange
                },
                lead.id.toString()
              )) })
            ]
          },
          stage.value
        );
      }) })
    }
  );
}
function PipelinePage() {
  const { data: pipelines = [] } = useGetPipelines();
  const createPipeline = useCreatePipeline();
  const [selectedPipelineId, setSelectedPipelineId] = reactExports.useState(
    null
  );
  const [showManage, setShowManage] = reactExports.useState(false);
  const [showNewPipeline, setShowNewPipeline] = reactExports.useState(false);
  const [newPipelineName, setNewPipelineName] = reactExports.useState("");
  const [hideDnc, setHideDnc] = reactExports.useState(() => {
    try {
      return localStorage.getItem("tele-blast-hide-dnc") === "true";
    } catch {
      return false;
    }
  });
  const toggleHideDnc = () => {
    setHideDnc((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("tele-blast-hide-dnc", next ? "true" : "false");
      } catch {
      }
      return next;
    });
  };
  const { data: leads = [], isLoading } = useLeads(selectedPipelineId);
  const updateLead = useUpdateLead();
  const search = useSearch({ strict: false });
  const highlightStage = search?.stage;
  const [mobileActiveStage, setMobileActiveStage] = reactExports.useState(
    highlightStage ?? PIPELINE_STAGES[0].value
  );
  reactExports.useEffect(() => {
    if (highlightStage) setMobileActiveStage(highlightStage);
  }, [highlightStage]);
  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const totalLeads = visibleLeads.length;
  const handleLeadStageChange = async (id, stage) => {
    await updateLead.mutateAsync({ id, updates: { pipelineStage: stage } });
    ue.success(
      `Lead moved to ${PIPELINE_STAGES.find((s) => s.value === stage)?.label}`
    );
  };
  const handleCreatePipeline = async () => {
    const name = newPipelineName.trim();
    if (!name) return;
    try {
      const newP = await createPipeline.mutateAsync(name);
      setNewPipelineName("");
      setShowNewPipeline(false);
      ue.success(`Pipeline "${name}" created`);
      if (newP && typeof newP === "object" && "id" in newP) {
        setSelectedPipelineId(newP.id);
      }
    } catch {
      ue.error("Failed to create pipeline");
    }
  };
  const selectedPipelineName = selectedPipelineId === null ? "All Pipelines" : pipelines.find((p) => p.id === selectedPipelineId)?.name ?? "All Pipelines";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 pt-5 pb-4 border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground tracking-tight", children: "Pipeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading…" : `${totalLeads} lead${totalLeads !== 1 ? "s" : ""} in ${selectedPipelineName}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PipelineHeader,
        {
          pipelines,
          selectedId: selectedPipelineId,
          onChange: setSelectedPipelineId,
          onManage: () => setShowManage(true),
          onNewPipeline: () => setShowNewPipeline(true),
          hideDnc,
          onToggleHideDnc: toggleHideDnc
        }
      ) })
    ] }) }),
    showNewPipeline && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4",
        "data-ocid": "new-pipeline-overlay",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Create New Pipeline" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: newPipelineName,
              onChange: (e) => setNewPipelineName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") void handleCreatePipeline();
                if (e.key === "Escape") {
                  setShowNewPipeline(false);
                  setNewPipelineName("");
                }
              },
              placeholder: "Pipeline name…",
              className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]",
              ref: (el) => {
                if (el) el.focus();
              },
              "data-ocid": "new-pipeline-name-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowNewPipeline(false);
                  setNewPipelineName("");
                },
                className: "flex-1 min-h-[44px] rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": "new-pipeline-cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => void handleCreatePipeline(),
                disabled: !newPipelineName.trim() || createPipeline.isPending,
                className: "flex-1 min-h-[44px] rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5",
                "data-ocid": "new-pipeline-create-button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  createPipeline.isPending ? "Creating…" : "Create"
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MobilePipeline,
      {
        leads,
        isLoading,
        activeStage: mobileActiveStage,
        onStageChange: setMobileActiveStage,
        onLeadStageChange: handleLeadStageChange,
        hideDnc
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-1 overflow-x-auto overflow-y-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DesktopKanban,
      {
        leads,
        isLoading,
        highlightStage,
        onLeadStageChange: handleLeadStageChange,
        hideDnc
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManagePipelinesDialog,
      {
        open: showManage,
        onClose: () => setShowManage(false),
        pipelines
      }
    )
  ] });
}
export {
  PipelinePage as default
};
