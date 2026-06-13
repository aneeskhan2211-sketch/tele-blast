import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  Eye,
  EyeOff,
  FolderKanban,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Settings2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SmsQuickSendPopover } from "../components/SmsQuickSendPopover";
import { PIPELINE_STAGES } from "../constants";
import {
  useCreatePipeline,
  useDeletePipeline,
  useGetPipelines,
  useLeads,
  useUpdateLead,
  useUpdatePipeline,
} from "../hooks/useLeads";
import {
  getPhoneLinkPreference,
  isWindowsDesktop,
} from "../hooks/usePhoneLinkPreference";
import type { Lead, Pipeline, PipelineStage } from "../types";
import { handlePhoneCall, isGoogleVoiceEnabled } from "../utils/phoneActions";

// Stage accent gradient classes
const STAGE_HEADER_CLASSES: Record<string, string> = {
  Prospect: "from-primary/90 to-primary",
  Contacted: "from-[oklch(0.58_0.16_44)] to-[oklch(0.52_0.18_44)]",
  Qualified: "from-[oklch(0.5_0.15_160)] to-[oklch(0.44_0.17_160)]",
  ClosedWon: "from-[oklch(0.45_0.16_145)] to-[oklch(0.39_0.18_145)]",
  ClosedLost: "from-[oklch(0.5_0.18_27)] to-[oklch(0.44_0.2_27)]",
};

// ─── Pipeline Selector ───────────────────────────────────────────────────────

function PipelineHeader({
  pipelines,
  selectedId,
  onChange,
  onManage,
  onNewPipeline,
  hideDnc,
  onToggleHideDnc,
}: {
  pipelines: Pipeline[];
  selectedId: bigint | null;
  onChange: (id: bigint | null) => void;
  onManage: () => void;
  onNewPipeline: () => void;
  hideDnc: boolean;
  onToggleHideDnc: () => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative">
        <select
          value={selectedId?.toString() ?? "all"}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === "all" ? null : BigInt(val));
          }}
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px] min-w-[150px] transition-colors hover:border-primary/40"
          data-ocid="pipeline-filter-selector"
          aria-label="Select pipeline to view"
        >
          <option value="all">All Pipelines</option>
          {pipelines.map((p) => (
            <option key={p.id.toString()} value={p.id.toString()}>
              {p.name}
            </option>
          ))}
        </select>
        <FolderKanban className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      </div>
      <Button
        type="button"
        size="sm"
        onClick={onNewPipeline}
        className="gap-1.5 min-h-[44px] font-semibold shrink-0"
        data-ocid="pipeline-new-button"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New Pipeline</span>
        <span className="sm:hidden">New</span>
      </Button>
      <button
        type="button"
        onClick={onToggleHideDnc}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold min-h-[44px] transition-colors ${
          hideDnc
            ? "border-destructive/40 bg-destructive/10 text-destructive"
            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
        }`}
        title={hideDnc ? "Show DNC leads" : "Hide DNC leads"}
        aria-label={hideDnc ? "Show DNC leads" : "Hide DNC leads"}
        data-ocid="pipeline-hide-dnc-toggle"
      >
        {hideDnc ? (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DNC Hidden</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Show DNC</span>
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onManage}
        className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        title="Manage pipelines"
        aria-label="Manage pipelines"
        data-ocid="pipeline-manage-button"
      >
        <Settings2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Manage Pipelines Dialog ─────────────────────────────────────────────────

function ManagePipelinesDialog({
  open,
  onClose,
  pipelines,
}: {
  open: boolean;
  onClose: () => void;
  pipelines: Pipeline[];
}) {
  const createPipeline = useCreatePipeline();
  const updatePipeline = useUpdatePipeline();
  const deletePipeline = useDeletePipeline();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    try {
      await createPipeline.mutateAsync(name);
      setNewName("");
      toast.success(`Pipeline "${name}" created`);
    } catch {
      toast.error("Failed to create pipeline");
    }
  };

  const handleUpdate = async (id: bigint) => {
    const name = editName.trim();
    if (!name) return;
    try {
      await updatePipeline.mutateAsync({ id, name });
      setEditingId(null);
      toast.success("Pipeline renamed");
    } catch {
      toast.error("Failed to rename pipeline");
    }
  };

  const handleDelete = async (id: bigint, name: string) => {
    if (
      !confirm(
        `Delete pipeline "${name}"? Leads will remain but lose their pipeline assignment.`,
      )
    )
      return;
    try {
      await deletePipeline.mutateAsync(id);
      toast.success("Pipeline deleted");
    } catch {
      toast.error("Failed to delete pipeline");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-md max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <FolderKanban className="w-5 h-5 text-primary" />
            Manage Pipelines
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mt-2">
          <Input
            placeholder="New pipeline name…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            className="flex-1 min-h-[44px]"
            data-ocid="new-pipeline-input"
          />
          <Button
            onClick={handleCreate}
            disabled={!newName.trim() || createPipeline.isPending}
            className="shrink-0 min-h-[44px]"
            data-ocid="create-pipeline-button"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2 mt-3">
          {pipelines.length === 0 ? (
            <div
              className="text-center py-8 text-sm text-muted-foreground"
              data-ocid="pipelines-empty-state"
            >
              No pipelines yet. Create one above.
            </div>
          ) : (
            pipelines.map((p, i) => (
              <div
                key={p.id.toString()}
                className="flex items-center gap-2 bg-muted/30 rounded-xl px-3 py-2.5 border border-border"
                data-ocid={`pipeline-item.${i + 1}`}
              >
                {editingId === p.id ? (
                  <>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdate(p.id);
                      }}
                      className="flex-1 h-9"
                      autoFocus
                      data-ocid={`pipeline-rename-input.${i + 1}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(p.id)}
                      disabled={updatePipeline.isPending}
                      className="shrink-0 h-9"
                      data-ocid={`pipeline-save-button.${i + 1}`}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                      className="shrink-0 h-9"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <FolderKanban className="w-4 h-4 text-primary shrink-0" />
                    <span className="flex-1 text-sm font-medium text-foreground truncate min-w-0">
                      {p.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(p.id);
                        setEditName(p.name);
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded min-h-[32px]"
                      data-ocid={`pipeline-edit-button.${i + 1}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.name)}
                      className="text-xs text-destructive hover:text-destructive/80 transition-colors p-1.5 rounded min-h-[32px]"
                      data-ocid={`pipeline-delete-button.${i + 1}`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <Button
          variant="outline"
          onClick={onClose}
          className="w-full mt-2 min-h-[44px]"
          data-ocid="manage-pipelines-close"
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ─── Lead card (shared between desktop kanban + mobile list) ──────────────────

function LeadCard({
  lead,
  onStageChange,
}: {
  lead: Lead;
  onStageChange: (id: bigint, stage: PipelineStage) => void;
}) {
  const [showSmsSend, setShowSmsSend] = useState(false);
  const otherStages = PIPELINE_STAGES.filter(
    (s) => s.value !== lead.pipelineStage,
  );

  return (
    <>
      <div
        className={`bg-card border rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group ${
          lead.isDnc
            ? "border-destructive/30 bg-destructive/3"
            : "border-border"
        }`}
        data-ocid="pipeline-card"
      >
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <Link
            to="/leads/$id"
            params={{ id: lead.id.toString() }}
            className="font-semibold text-sm text-foreground hover:text-primary transition-colors block break-words leading-snug flex-1 min-w-0"
          >
            {lead.name}
          </Link>
          {lead.isDnc && (
            <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-destructive text-white">
              <AlertTriangle className="w-3 h-3" />
              DNC
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3 truncate">
          {lead.industry}
          {lead.city ? ` · ${lead.city}` : ""}
        </p>

        <div className="flex items-center justify-between gap-2">
          {lead.isDnc ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              DNC — No Contact
            </span>
          ) : (
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => {
                  const phoneLinkOn =
                    isWindowsDesktop() && getPhoneLinkPreference();
                  handlePhoneCall(
                    lead.phone,
                    phoneLinkOn,
                    isGoogleVoiceEnabled(),
                  );
                }}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                title={`Call ${lead.name}`}
                aria-label={`Call ${lead.name}`}
                data-ocid="call-btn"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                title={`Text ${lead.name}`}
                aria-label={`Text ${lead.name}`}
                data-ocid="text-btn"
                onClick={() => setShowSmsSend(true)}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              {lead.email && (
                <a
                  href={`mailto:${encodeURIComponent(lead.email)}`}
                  className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                  title={`Email ${lead.name}`}
                  aria-label={`Email ${lead.name}`}
                  data-ocid="email-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          )}

          <select
            className="text-xs border border-border rounded-lg px-2 py-2 bg-background text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer min-w-0 min-h-[44px] flex-shrink"
            value=""
            onChange={(e) => {
              if (e.target.value)
                onStageChange(lead.id, e.target.value as PipelineStage);
            }}
            data-ocid="stage-move-select"
            aria-label="Move to stage"
          >
            <option value="">Move…</option>
            {otherStages.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {showSmsSend && (
        <SmsQuickSendPopover
          leadName={lead.name}
          phone={lead.phone}
          isDnc={lead.isDnc}
          onClose={() => setShowSmsSend(false)}
        />
      )}
    </>
  );
}

function ColumnSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-28 rounded-xl" />
      ))}
    </div>
  );
}

// ─── Mobile: Stage tabs view ──────────────────────────────────────────────────

function MobilePipeline({
  leads,
  isLoading,
  activeStage,
  onStageChange: onActiveStageChange,
  onLeadStageChange,
  hideDnc,
}: {
  leads: Lead[];
  isLoading: boolean;
  activeStage: string;
  onStageChange: (stage: string) => void;
  onLeadStageChange: (id: bigint, stage: PipelineStage) => void;
  hideDnc: boolean;
}) {
  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const stageLeads = visibleLeads.filter(
    (l) => l.pipelineStage === activeStage,
  );
  const gradientClass =
    STAGE_HEADER_CLASSES[activeStage] ?? "from-primary/90 to-primary";

  return (
    <div className="flex flex-col">
      {/* Stage tab pills */}
      <div
        className="flex overflow-x-auto gap-2 px-4 py-3 scroll-touch shrink-0"
        style={{ scrollbarWidth: "none" }}
        data-ocid="pipeline-stage-tabs"
      >
        {PIPELINE_STAGES.map((stage) => {
          const count = visibleLeads.filter(
            (l) => l.pipelineStage === stage.value,
          ).length;
          const isActive = activeStage === stage.value;
          return (
            <button
              key={stage.value}
              type="button"
              onClick={() => onActiveStageChange(stage.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shrink-0 min-h-[44px] active:opacity-80 ${
                isActive
                  ? "text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              style={
                isActive ? { background: "oklch(0.22 0.12 264)" } : undefined
              }
              data-ocid={`pipeline-stage-tab-${stage.value.toLowerCase()}`}
              aria-current={isActive ? "true" : undefined}
            >
              {stage.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active stage header */}
      <div
        className={`mx-4 mb-3 rounded-xl bg-gradient-to-r ${gradientClass} px-4 py-3 flex items-center justify-between`}
      >
        <span className="text-white font-bold text-sm uppercase tracking-wide">
          {PIPELINE_STAGES.find((s) => s.value === activeStage)?.label}
        </span>
        <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2.5 py-0.5">
          {stageLeads.length} lead{stageLeads.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Lead list */}
      <div className="px-4 pb-4 scroll-touch">
        {isLoading ? (
          <ColumnSkeleton />
        ) : stageLeads.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-xl border border-border"
            data-ocid="pipeline-stage-empty"
          >
            <p className="text-sm font-medium text-muted-foreground">
              No leads in this stage
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Use "Move…" on a lead card to move leads here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {stageLeads.map((lead) => (
              <LeadCard
                key={lead.id.toString()}
                lead={lead}
                onStageChange={onLeadStageChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Desktop: Horizontal kanban ───────────────────────────────────────────────

function DesktopKanban({
  leads,
  isLoading,
  highlightStage,
  onLeadStageChange,
  hideDnc,
}: {
  leads: Lead[];
  isLoading: boolean;
  highlightStage: string | undefined;
  onLeadStageChange: (id: bigint, stage: PipelineStage) => void;
  hideDnc: boolean;
}) {
  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightStage && columnRefs.current[highlightStage]) {
      columnRefs.current[highlightStage]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [highlightStage]);

  return (
    <div
      ref={boardRef}
      className="flex-1 overflow-x-auto p-6 scroll-touch"
      style={{ touchAction: "pan-x pan-y", overscrollBehaviorX: "contain" }}
    >
      {isLoading ? (
        <div className="grid grid-cols-5 gap-4 min-w-[820px]">
          {PIPELINE_STAGES.map((s) => (
            <ColumnSkeleton key={s.value} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 min-w-[820px] items-start">
          {PIPELINE_STAGES.map((stage) => {
            const stageLeads = visibleLeads.filter(
              (l) => l.pipelineStage === stage.value,
            );
            const isHighlighted = highlightStage === stage.value;
            const gradientClass =
              STAGE_HEADER_CLASSES[stage.value] ?? "from-primary/90 to-primary";

            return (
              <div
                key={stage.value}
                ref={(el) => {
                  columnRefs.current[stage.value] = el;
                }}
                className={`flex flex-col rounded-xl overflow-hidden border transition-all duration-300 ${
                  isHighlighted
                    ? "border-primary ring-2 ring-primary/30 shadow-lg"
                    : "border-border shadow-sm"
                }`}
                data-ocid="pipeline-column"
              >
                <div
                  className={`bg-gradient-to-br ${gradientClass} px-3 py-3 flex items-center justify-between gap-2`}
                >
                  <span className="text-primary-foreground text-xs font-bold tracking-wide uppercase truncate min-w-0">
                    {stage.label}
                  </span>
                  <span className="bg-white/20 text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center shrink-0">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="bg-muted/30 flex-1 flex flex-col gap-2 p-2.5 min-h-[140px]">
                  {stageLeads.length === 0 ? (
                    <div
                      className="flex flex-1 items-center justify-center py-8"
                      data-ocid="empty-column"
                    >
                      <p className="text-xs text-muted-foreground text-center leading-relaxed">
                        No leads
                        <br />
                        in this stage
                      </p>
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <LeadCard
                        key={lead.id.toString()}
                        lead={lead}
                        onStageChange={onLeadStageChange}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const { data: pipelines = [] } = useGetPipelines();
  const createPipeline = useCreatePipeline();
  const [selectedPipelineId, setSelectedPipelineId] = useState<bigint | null>(
    null,
  );
  const [showManage, setShowManage] = useState(false);
  const [showNewPipeline, setShowNewPipeline] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");

  // Persist hide-DNC preference across pages via shared localStorage key
  const [hideDnc, setHideDnc] = useState(() => {
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
        // ignore
      }
      return next;
    });
  };

  const { data: leads = [], isLoading } = useLeads(selectedPipelineId);
  const updateLead = useUpdateLead();
  const search = useSearch({ strict: false }) as { stage?: string };
  const highlightStage = search?.stage;

  const [mobileActiveStage, setMobileActiveStage] = useState<string>(
    highlightStage ?? PIPELINE_STAGES[0].value,
  );

  // Sync mobile active stage from URL param
  useEffect(() => {
    if (highlightStage) setMobileActiveStage(highlightStage);
  }, [highlightStage]);

  const visibleLeads = hideDnc ? leads.filter((l) => !l.isDnc) : leads;
  const totalLeads = visibleLeads.length;

  const handleLeadStageChange = async (id: bigint, stage: PipelineStage) => {
    await updateLead.mutateAsync({ id, updates: { pipelineStage: stage } });
    toast.success(
      `Lead moved to ${PIPELINE_STAGES.find((s) => s.value === stage)?.label}`,
    );
  };

  const handleCreatePipeline = async () => {
    const name = newPipelineName.trim();
    if (!name) return;
    try {
      const newP = await createPipeline.mutateAsync(name);
      setNewPipelineName("");
      setShowNewPipeline(false);
      toast.success(`Pipeline "${name}" created`);
      // Auto-select the new pipeline
      if (newP && typeof newP === "object" && "id" in newP) {
        setSelectedPipelineId((newP as Pipeline).id);
      }
    } catch {
      toast.error("Failed to create pipeline");
    }
  };

  const selectedPipelineName =
    selectedPipelineId === null
      ? "All Pipelines"
      : (pipelines.find((p) => p.id === selectedPipelineId)?.name ??
        "All Pipelines");

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-border bg-card">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Pipeline
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isLoading
                ? "Loading…"
                : `${totalLeads} lead${totalLeads !== 1 ? "s" : ""} in ${selectedPipelineName}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PipelineHeader
              pipelines={pipelines}
              selectedId={selectedPipelineId}
              onChange={setSelectedPipelineId}
              onManage={() => setShowManage(true)}
              onNewPipeline={() => setShowNewPipeline(true)}
              hideDnc={hideDnc}
              onToggleHideDnc={toggleHideDnc}
            />
          </div>
        </div>
      </div>

      {/* Quick-create pipeline dialog */}
      {showNewPipeline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
          data-ocid="new-pipeline-overlay"
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-primary shrink-0" />
              <h2 className="text-base font-semibold text-foreground">
                Create New Pipeline
              </h2>
            </div>
            <input
              type="text"
              value={newPipelineName}
              onChange={(e) => setNewPipelineName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleCreatePipeline();
                if (e.key === "Escape") {
                  setShowNewPipeline(false);
                  setNewPipelineName("");
                }
              }}
              placeholder="Pipeline name…"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
              ref={(el) => {
                if (el) el.focus();
              }}
              data-ocid="new-pipeline-name-input"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowNewPipeline(false);
                  setNewPipelineName("");
                }}
                className="flex-1 min-h-[44px] rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="new-pipeline-cancel-button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleCreatePipeline()}
                disabled={!newPipelineName.trim() || createPipeline.isPending}
                className="flex-1 min-h-[44px] rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5"
                data-ocid="new-pipeline-create-button"
              >
                <Plus className="w-4 h-4" />
                {createPipeline.isPending ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile view — stage tabs + vertical list */}
      <div className="md:hidden flex-1 flex flex-col">
        <MobilePipeline
          leads={leads}
          isLoading={isLoading}
          activeStage={mobileActiveStage}
          onStageChange={setMobileActiveStage}
          onLeadStageChange={handleLeadStageChange}
          hideDnc={hideDnc}
        />
      </div>

      {/* Desktop view — horizontal kanban */}
      <div className="hidden md:flex flex-1 overflow-x-auto overflow-y-hidden">
        <DesktopKanban
          leads={leads}
          isLoading={isLoading}
          highlightStage={highlightStage}
          onLeadStageChange={handleLeadStageChange}
          hideDnc={hideDnc}
        />
      </div>

      <ManagePipelinesDialog
        open={showManage}
        onClose={() => setShowManage(false)}
        pipelines={pipelines}
      />
    </div>
  );
}
