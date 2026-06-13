import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileUp,
  FolderKanban,
  LayoutDashboard,
  LayoutGrid,
  List,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldOff,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { SmsQuickSendPopover } from "../components/SmsQuickSendPopover";
import { TokenBalance } from "../components/TokenBalance";
import { INDUSTRIES, PIPELINE_STAGES, REVENUE_RANGES } from "../constants";
import { useAiSearchLeads } from "../hooks/useAi";
import {
  useAddLead,
  useBulkDeleteLeads,
  useBulkImportLeads,
  useCreatePipeline,
  useDeletePipeline,
  useGetPipelines,
  useLeads,
  useUpdateLead,
  useUpdateLeadDnc,
  useUpdatePipeline,
} from "../hooks/useLeads";
import {
  getPhoneLinkPreference,
  isWindowsDesktop,
} from "../hooks/usePhoneLinkPreference";
import { tierHasFeature, useSubscription } from "../hooks/useSubscription";
import { PipelineStage } from "../types";
import type { CsvLeadInput, Lead, LeadInput, Pipeline } from "../types";
import { handlePhoneCall, isGoogleVoiceEnabled } from "../utils/phoneActions";

/* ─── View Mode ────────────────────────────────────────────────── */

type ViewMode = "tile" | "card" | "list";

function getStoredView(): ViewMode {
  try {
    const v = localStorage.getItem("leads-view-mode");
    if (v === "tile" || v === "card" || v === "list") return v;
  } catch {
    // ignore
  }
  return "card";
}

function setStoredView(v: ViewMode) {
  try {
    localStorage.setItem("leads-view-mode", v);
  } catch {
    // ignore
  }
}

/* ─── Helpers ─────────────────────────────────────────────────── */

function StageBadge({ stage }: { stage: PipelineStage }) {
  const found = PIPELINE_STAGES.find((s) => s.value === stage);
  if (!found) return null;
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${found.color}`}
    >
      {found.label}
    </span>
  );
}

function IndustryBadge({ industry }: { industry: string }) {
  if (!industry) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 max-w-full">
      <Building2 className="w-3 h-3 shrink-0" />
      <span className="truncate">{industry}</span>
    </span>
  );
}

function getLeadDisplayName(lead: Lead): string {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  if (fullName) return fullName;
  if (lead.name) return lead.name;
  return "";
}

/* ─── Pipeline Selector ────────────────────────────────────────── */

function PipelineSelector({
  pipelines,
  selectedId,
  onChange,
  onManage,
}: {
  pipelines: Pipeline[];
  selectedId: bigint | null;
  onChange: (id: bigint | null) => void;
  onManage: () => void;
}) {
  const selectedName =
    selectedId === null
      ? "All Pipelines"
      : (pipelines.find((p) => p.id === selectedId)?.name ?? "All Pipelines");

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={selectedId?.toString() ?? "all"}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === "all" ? null : BigInt(val));
          }}
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px] min-w-[160px] transition-colors hover:border-primary/40"
          data-ocid="pipeline-selector"
          aria-label="Select pipeline"
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
      <span className="sr-only">{selectedName}</span>
      <button
        type="button"
        onClick={onManage}
        className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        title="Manage pipelines"
        aria-label="Manage pipelines"
        data-ocid="manage-pipelines-button"
      >
        <Settings2 className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ─── Manage Pipelines Dialog ──────────────────────────────────── */

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

        {/* Create new */}
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

        {/* Pipeline list */}
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
                      data-ocid={`pipeline-cancel-button.${i + 1}`}
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

/* ─── CSV Parser ───────────────────────────────────────────────── */

// Extended CSV field keys — includes "industry" which is handled separately
// (industry is stored via a post-import updateLead call since CsvLeadInput
// does not include it in the backend contract)
type ExtendedCsvField = keyof CsvLeadInput | "industry" | "skip";

const CSV_COLUMN_ALIASES: Record<string, ExtendedCsvField> = {
  "business name": "name",
  business_name: "name",
  company: "name",
  company_name: "name",
  name: "name",
  "contact name": "contactName",
  contact_name: "contactName",
  contactname: "contactName",
  contact: "contactName",
  "first name": "contactName",
  first_name: "contactName",
  firstname: "contactName",
  "last name": "contactName",
  last_name: "contactName",
  lastname: "contactName",
  address: "address",
  phone: "phone",
  "phone number": "phone",
  ph: "phone",
  tel: "phone",
  email: "email",
  notes: "notes",
  note: "notes",
  birthday: "birthday",
  "birth date": "birthday",
  birthdate: "birthday",
  dob: "birthday",
  "date of birth": "birthday",
  industry: "industry",
  "industry type": "industry",
  sector: "industry",
  "business type": "industry",
  city: "city",
  state: "state",
  province: "state",
  region: "state",
};

const FIELD_LABELS: Record<ExtendedCsvField, string> = {
  name: "Business Name",
  contactName: "Contact / First & Last Name",
  phone: "Phone",
  email: "Email",
  address: "Address",
  city: "City",
  state: "State / Province",
  notes: "Notes",
  birthday: "Birthday",
  industry: "Industry",
  skip: "— Skip this column —",
};

type CsvFieldKey = ExtendedCsvField;

interface RawCSVData {
  rawHeaders: string[];
  normHeaders: string[];
  dataRows: string[][];
}

interface ParsedRow {
  data: CsvLeadInput;
  industry: string; // captured separately for post-import updateLead
  valid: boolean;
  rawIndex: number;
}

interface ParseResult {
  rows: ParsedRow[];
  error: string | null;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSVRaw(text: string): { data: RawCSVData; error: string | null } {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    return {
      data: { rawHeaders: [], normHeaders: [], dataRows: [] },
      error: "CSV file appears to be empty or has no data rows.",
    };
  }

  const rawHeaders = parseCSVLine(lines[0]).map((h) =>
    h.replace(/^["']|["']$/g, "").trim(),
  );
  const normHeaders = rawHeaders.map((h) => h.toLowerCase());
  const dataRows: string[][] = [];
  for (let i = 1; i < lines.length; i++) {
    dataRows.push(parseCSVLine(lines[i]));
  }

  return { data: { rawHeaders, normHeaders, dataRows }, error: null };
}

/**
 * Normalize a birthday string from CSV to a canonical format.
 * - MM/DD/YYYY or MM-DD-YYYY → YYYY-MM-DD
 * - MM/DD or MM-DD → MM-DD (no year, valid for birthday-only purposes)
 * - YYYY-MM-DD → YYYY-MM-DD (pass through)
 * Returns null if the value is completely unparseable.
 */
function normalizeBirthdayValue(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;

  // Split on / or -
  const parts = v.split(/[-/]/);

  if (parts.length === 3) {
    const [a, b, c] = parts.map((p) => p.trim());
    // Detect YYYY-MM-DD (first part is 4 digits)
    if (a.length === 4) {
      const year = Number.parseInt(a, 10);
      const month = Number.parseInt(b, 10);
      const day = Number.parseInt(c, 10);
      if (isValidMonthDay(month, day) && year >= 1900 && year <= 2100) {
        return `${a}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      }
      return null;
    }
    // MM/DD/YYYY or MM-DD-YYYY (last part is 4 digits)
    if (c.length === 4) {
      const month = Number.parseInt(a, 10);
      const day = Number.parseInt(b, 10);
      const year = Number.parseInt(c, 10);
      if (isValidMonthDay(month, day) && year >= 1900 && year <= 2100) {
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      }
      return null;
    }
    // Ambiguous 3-part without 4-digit year — skip
    return null;
  }

  if (parts.length === 2) {
    // MM/DD or MM-DD — store as MM-DD (no year, valid for birthday queue)
    const [a, b] = parts.map((p) => p.trim());
    const month = Number.parseInt(a, 10);
    const day = Number.parseInt(b, 10);
    if (isValidMonthDay(month, day)) {
      return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return null;
  }

  return null;
}

function isValidMonthDay(month: number, day: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  // Month-specific day limits
  const maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= maxDays[month - 1];
}

function applyMappings(
  raw: RawCSVData,
  mappings: Record<string, CsvFieldKey>,
): ParseResult {
  const rows: ParsedRow[] = [];
  for (let i = 0; i < raw.dataRows.length; i++) {
    const cols = raw.dataRows[i];
    const entry: CsvLeadInput = {
      name: "",
      contactName: "",
      address: "",
      phone: "",
      email: "",
      notes: "",
    };
    let rowIndustry = "";
    raw.rawHeaders.forEach((header, idx) => {
      const field = mappings[header];
      if (!field || field === "skip") return;
      const value = (cols[idx] ?? "").trim();
      if (field === "industry") {
        rowIndustry = value;
      } else if (field === "birthday") {
        // Normalize birthday to a canonical format before storing
        if (value) {
          const normalized = normalizeBirthdayValue(value);
          if (normalized) {
            entry.birthday = normalized;
          }
          // If completely unparseable, skip silently
        }
      } else {
        (entry as unknown as Record<string, string>)[field] = value;
      }
    });
    rows.push({
      data: entry,
      industry: rowIndustry,
      valid:
        entry.name.trim().length > 0 || entry.contactName.trim().length > 0,
      rawIndex: i + 1,
    });
  }

  if (rows.length === 0) {
    return { rows: [], error: "No data rows found in the CSV." };
  }

  return { rows, error: null };
}

/* ─── Batch History ────────────────────────────────────────────── */

const BATCH_HISTORY_KEY = "tele_blast_csv_batch_history";
const BATCH_SIZE = 500;

interface BatchRecord {
  fileName: string;
  totalRows: number;
  uploadedBatches: number[];
}

function loadBatchHistory(): BatchRecord[] {
  try {
    const raw = localStorage.getItem(BATCH_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BatchRecord[];
  } catch {
    return [];
  }
}

function saveBatchHistory(history: BatchRecord[]): void {
  try {
    localStorage.setItem(BATCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

function recordBatchImported(
  history: BatchRecord[],
  fileName: string,
  totalRows: number,
  batchNumber: number,
): BatchRecord[] {
  const existing = history.find((r) => r.fileName === fileName);
  if (existing) {
    if (!existing.uploadedBatches.includes(batchNumber)) {
      return history.map((r) =>
        r.fileName === fileName
          ? { ...r, uploadedBatches: [...r.uploadedBatches, batchNumber] }
          : r,
      );
    }
    return history;
  }
  return [...history, { fileName, totalRows, uploadedBatches: [batchNumber] }];
}

/* ─── CSV Import Dialog ────────────────────────────────────────── */

type ImportStep = "upload" | "batch" | "mapping" | "preview" | "success";

const STEP_LABELS: Record<ImportStep, string> = {
  upload: "Upload",
  batch: "Select Batch",
  mapping: "Map Columns",
  preview: "Preview",
  success: "Done",
};

// Steps for files > 500 rows (5 steps)
const STEP_ORDER_BATCHED: ImportStep[] = [
  "upload",
  "batch",
  "mapping",
  "preview",
  "success",
];
// Steps for files ≤ 500 rows (4 steps, skips batch)
const STEP_ORDER_SIMPLE: ImportStep[] = [
  "upload",
  "mapping",
  "preview",
  "success",
];

function CsvImportDialog({
  open,
  onClose,
  onSuccess,
  pipelines: pipelinesProp,
  defaultPipelineId,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (count: number) => void;
  pipelines: Pipeline[];
  defaultPipelineId: bigint | null;
}) {
  // Use live pipeline query so newly created pipelines appear immediately
  const { data: livePipelines } = useGetPipelines();
  const pipelines = livePipelines ?? pipelinesProp;
  const [step, setStep] = useState<ImportStep>("upload");
  const [rawData, setRawData] = useState<RawCSVData | null>(null);
  const [allDataRows, setAllDataRows] = useState<string[][]>([]); // full unsliced rows
  const [columnMappings, setColumnMappings] = useState<
    Record<string, CsvFieldKey>
  >({});
  const [mappingError, setMappingError] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [stage, setStage] = useState<PipelineStage>(PipelineStage.Prospect);
  const [importPipelineId, setImportPipelineId] = useState<bigint | null>(
    defaultPipelineId,
  );
  const [importedCount, setImportedCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  // Batch state
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const [batchHistory, setBatchHistory] = useState<BatchRecord[]>([]);
  const [batchReuploadWarning, setBatchReuploadWarning] = useState<
    number | null
  >(null);
  // Inline pipeline creation state
  const [showNewPipeline, setShowNewPipeline] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkImport = useBulkImportLeads();
  const createPipeline = useCreatePipeline();

  // Determine if this file needs batch selection
  const totalRows = allDataRows.length;
  const isBatched = totalRows > BATCH_SIZE;
  const STEP_ORDER = isBatched ? STEP_ORDER_BATCHED : STEP_ORDER_SIMPLE;
  const totalBatches = Math.ceil(totalRows / BATCH_SIZE);

  // Batches already uploaded for current file
  const uploadedBatchesForFile =
    batchHistory.find((r) => r.fileName === fileName)?.uploadedBatches ?? [];

  const handleClose = () => {
    setStep("upload");
    setRawData(null);
    setAllDataRows([]);
    setColumnMappings({});
    setMappingError(null);
    setParseResult(null);
    setFileName("");
    setStage(PipelineStage.Prospect);
    setImportPipelineId(defaultPipelineId);
    setImportedCount(0);
    setUploadError(null);
    setPipelineError(null);
    setShowNewPipeline(false);
    setNewPipelineName("");
    setSelectedBatch(null);
    setBatchReuploadWarning(null);
    onClose();
  };

  const handleSelectBatch = (batchNum: number) => {
    const alreadyUploaded = uploadedBatchesForFile.includes(batchNum);
    if (alreadyUploaded) {
      setBatchReuploadWarning(batchNum);
      return;
    }
    confirmBatchSelection(batchNum);
  };

  const confirmBatchSelection = (batchNum: number) => {
    setBatchReuploadWarning(null);
    setSelectedBatch(batchNum);
    // Slice the data rows for this batch (batchNum is 1-based)
    const start = (batchNum - 1) * BATCH_SIZE;
    const end = batchNum * BATCH_SIZE;
    const slicedRows = allDataRows.slice(start, end);
    if (rawData) {
      setRawData({ ...rawData, dataRows: slicedRows });
    }
    setStep("mapping");
  };

  const handleCreateNewPipeline = async () => {
    const name = newPipelineName.trim();
    if (!name) return;
    try {
      const newPipeline = await createPipeline.mutateAsync(name);
      // result.ok is Pipeline | undefined — guard before using .id
      const pipelineId =
        newPipeline != null &&
        typeof newPipeline === "object" &&
        "id" in newPipeline
          ? (newPipeline as Pipeline).id
          : null;
      if (pipelineId != null) {
        setImportPipelineId(pipelineId);
        setPipelineError(null);
      }
      setShowNewPipeline(false);
      setNewPipelineName("");
      toast.success(`Pipeline "${name}" created`);
    } catch {
      toast.error("Failed to create pipeline");
    }
  };

  const processFile = useCallback((file: File) => {
    setUploadError(null);
    if (!file.name.endsWith(".csv")) {
      setUploadError("Only .csv files are accepted. Please choose a CSV file.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { data, error } = parseCSVRaw(text);
      if (error) {
        setUploadError(error);
        return;
      }
      const initial: Record<string, CsvFieldKey> = {};
      data.rawHeaders.forEach((header, idx) => {
        const norm = data.normHeaders[idx];
        initial[header] = CSV_COLUMN_ALIASES[norm] ?? "skip";
      });
      setAllDataRows(data.dataRows);
      // If file has more than BATCH_SIZE rows, show batch picker first
      if (data.dataRows.length > BATCH_SIZE) {
        // Load batch history for this file
        const history = loadBatchHistory();
        setBatchHistory(history);
        setSelectedBatch(null);
        setBatchReuploadWarning(null);
        // Store full raw structure but with empty dataRows — sliced on batch selection
        setRawData({ ...data, dataRows: [] });
        setColumnMappings(initial);
        setMappingError(null);
        setStep("batch");
      } else {
        setRawData(data);
        setColumnMappings(initial);
        setMappingError(null);
        setStep("mapping");
      }
    };
    reader.readAsText(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleProceedToPreview = () => {
    if (!rawData) return;
    const nameIsMapped = Object.values(columnMappings).includes("name");
    const contactNameIsMapped =
      Object.values(columnMappings).includes("contactName");
    if (!nameIsMapped && !contactNameIsMapped) {
      setMappingError(
        'Map at least one column to "Business Name" or "Contact Name" before proceeding.',
      );
      return;
    }
    setMappingError(null);
    const result = applyMappings(rawData, columnMappings);
    setParseResult(result);
    setStep("preview");
  };

  const validRows = parseResult?.rows.filter((r) => r.valid) ?? [];
  const previewRows = (parseResult?.rows ?? []).slice(0, 20);
  const updateLead = useUpdateLead();

  const handleImport = async () => {
    if (validRows.length === 0) return;
    if (importPipelineId === null) {
      setPipelineError(
        "Please select a pipeline or create a new one before importing.",
      );
      return;
    }
    setPipelineError(null);
    try {
      const ids = await bulkImport.mutateAsync({
        csvLeads: validRows.map((r) => r.data),
        stage,
        pipelineId: importPipelineId,
      });
      // Apply industry values via individual updateLead calls (post-import)
      const industryUpdates = validRows
        .map((r, i) => ({ id: ids[i], industry: r.industry }))
        .filter((u) => u.id !== undefined && u.industry);
      if (industryUpdates.length > 0) {
        await Promise.allSettled(
          industryUpdates.map((u) =>
            updateLead.mutateAsync({
              id: u.id,
              updates: { industry: u.industry },
            }),
          ),
        );
      }
      // Record batch as uploaded in localStorage
      if (isBatched && selectedBatch !== null) {
        const updated = recordBatchImported(
          batchHistory,
          fileName,
          totalRows,
          selectedBatch,
        );
        setBatchHistory(updated);
        saveBatchHistory(updated);
      }
      setImportedCount(ids.length);
      setStep("success");
      onSuccess(ids.length);
    } catch {
      toast.error("Import failed. Please try again.");
    }
  };

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col p-4 sm:p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <FileUp className="w-5 h-5 text-primary shrink-0" />
            Import Leads from CSV
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div
          className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
          data-ocid="csv-steps"
        >
          {STEP_ORDER.map((s, i) => {
            const active = s === step;
            const done = i < stepIndex;
            return (
              <div key={s} className="flex items-center gap-1 shrink-0">
                {i > 0 && (
                  <div className="w-3 sm:w-5 h-px bg-border shrink-0" />
                )}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full transition-colors whitespace-nowrap ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : done
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}. {STEP_LABELS[s]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="flex flex-col gap-3 py-1 overflow-y-auto flex-1 min-h-0">
            <button
              type="button"
              className={`w-full border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              data-ocid="csv-dropzone"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">
                  Drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or tap to browse — .csv files only
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="min-h-[44px] px-6"
                data-ocid="csv-browse-button"
              >
                Browse File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="csv-file-input"
              />
            </button>

            {uploadError && (
              <div
                className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive"
                data-ocid="csv-upload-error"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="break-words">{uploadError}</span>
              </div>
            )}

            <div className="bg-muted/40 rounded-lg p-3 border border-border text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground text-sm mb-1">
                Any column headers work
              </p>
              <p>
                After uploading, you'll match your columns to the right fields —
                no need to rename anything in your spreadsheet.
              </p>
              <p className="pt-1">
                <span className="font-medium text-foreground">Required:</span>{" "}
                Business Name <span className="text-muted-foreground">or</span>{" "}
                Contact Name (at least one) &nbsp;·&nbsp;{" "}
                <span className="font-medium text-foreground">Optional:</span>{" "}
                Phone, Email, Address, Industry, Notes
              </p>
            </div>
          </div>
        )}

        {/* Batch step — shown when file > 500 rows */}
        {step === "batch" && (
          <div className="flex flex-col gap-4 py-1 overflow-y-auto flex-1 min-h-0">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm truncate">
                  {fileName}
                </span>
                <span className="text-muted-foreground text-xs shrink-0">
                  ·
                </span>
                <span className="text-xs font-medium text-foreground shrink-0">
                  {totalRows.toLocaleString()} rows total
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Select which 500 rows to import. Checkmarks show batches already
                uploaded from this file.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: totalBatches }, (_, i) => {
                const batchNum = i + 1;
                const start = (batchNum - 1) * BATCH_SIZE + 1;
                const end = Math.min(batchNum * BATCH_SIZE, totalRows);
                const alreadyUploaded =
                  uploadedBatchesForFile.includes(batchNum);
                const isSelected = selectedBatch === batchNum;

                return (
                  <button
                    key={batchNum}
                    type="button"
                    onClick={() => handleSelectBatch(batchNum)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all min-h-[80px] ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                        : alreadyUploaded
                          ? "border-green-400/60 bg-green-50/40 hover:border-green-500/70"
                          : "border-border hover:border-primary/40 hover:bg-muted/30 bg-card"
                    }`}
                    data-ocid={`csv-batch-card.${batchNum}`}
                  >
                    {alreadyUploaded && (
                      <span
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                        title="Already uploaded"
                      >
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      Batch {batchNum}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {batchNum === 1
                        ? "1st"
                        : batchNum === 2
                          ? "2nd"
                          : batchNum === 3
                            ? "3rd"
                            : `${batchNum}th`}{" "}
                      500
                    </span>
                    <span className="text-xs text-muted-foreground">
                      rows {start.toLocaleString()}–{end.toLocaleString()}
                    </span>
                    {alreadyUploaded && (
                      <span className="text-xs font-semibold text-green-700 mt-0.5">
                        ✓ Uploaded
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Re-upload warning */}
            {batchReuploadWarning !== null && (
              <div
                className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex flex-col gap-3 shrink-0"
                data-ocid="csv-batch-reupload-warning"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-amber-900">
                    Batch {batchReuploadWarning} was already uploaded — upload
                    again?
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 min-h-[40px]"
                    onClick={() => setBatchReuploadWarning(null)}
                    data-ocid="csv-batch-reupload-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 min-h-[40px]"
                    onClick={() => confirmBatchSelection(batchReuploadWarning)}
                    data-ocid="csv-batch-reupload-confirm"
                  >
                    Upload Again
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="shrink-0 min-h-[44px]"
              onClick={() => {
                setStep("upload");
                setRawData(null);
                setAllDataRows([]);
                setSelectedBatch(null);
                setBatchReuploadWarning(null);
              }}
              data-ocid="csv-batch-back-button"
            >
              ← Back
            </Button>
          </div>
        )}

        {/* Step 2: Map Columns */}
        {step === "mapping" && rawData && (
          <div className="flex flex-col gap-3 min-h-0 flex-1">
            <div className="shrink-0">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{fileName}</span>{" "}
                — {rawData.rawHeaders.length} column
                {rawData.rawHeaders.length !== 1 ? "s" : ""} detected. Match
                each column to the correct field.
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 space-y-2">
              {rawData.rawHeaders.map((header, idx) => {
                const sample = rawData.dataRows[0]?.[idx] ?? "";
                const currentVal = columnMappings[header] ?? "skip";
                return (
                  <div
                    key={header}
                    className="bg-card border border-border rounded-xl p-3 flex flex-col gap-2"
                    data-ocid={`csv-mapping-row.${idx + 1}`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {header}
                      </p>
                      {sample && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          e.g. {sample}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Select
                        value={currentVal}
                        onValueChange={(v) => {
                          setColumnMappings((prev) => ({
                            ...prev,
                            [header]: v as CsvFieldKey,
                          }));
                          if (v === "name" || v === "contactName")
                            setMappingError(null);
                        }}
                      >
                        <SelectTrigger
                          className="flex-1 min-h-[44px] text-sm"
                          data-ocid={`csv-mapping-select.${idx + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skip">
                            — Skip this column —
                          </SelectItem>
                          {(
                            Object.entries(FIELD_LABELS).filter(
                              ([k]) => k !== "skip",
                            ) as [ExtendedCsvField, string][]
                          ).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground shrink-0">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/70" />
              <span>
                <span className="font-medium text-foreground">Required:</span>{" "}
                Either{" "}
                <span className="font-medium text-foreground">
                  Business Name
                </span>{" "}
                or{" "}
                <span className="font-medium text-foreground">
                  Contact Name
                </span>{" "}
                must be mapped for each row to be imported.
              </span>
            </div>

            {mappingError && (
              <div
                className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive shrink-0"
                data-ocid="csv-mapping-error"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="break-words">{mappingError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 shrink-0 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-h-[44px]"
                onClick={() => {
                  if (isBatched) {
                    // Go back to batch picker, keep column mappings
                    setStep("batch");
                    setMappingError(null);
                  } else {
                    setStep("upload");
                    setRawData(null);
                    setAllDataRows([]);
                    setColumnMappings({});
                    setMappingError(null);
                    setUploadError(null);
                  }
                }}
                data-ocid="csv-mapping-back-button"
              >
                Back
              </Button>
              <Button
                size="sm"
                className="flex-1 min-h-[44px]"
                onClick={handleProceedToPreview}
                data-ocid="csv-preview-button"
              >
                Preview Import
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === "preview" && parseResult && (
          <div className="flex flex-col gap-3 min-h-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 shrink-0 text-sm">
              <span className="text-muted-foreground truncate max-w-[160px]">
                <span className="font-medium text-foreground">{fileName}</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="font-medium text-foreground">
                {parseResult.rows.length} rows
              </span>
              <span className="text-green-700 font-medium ml-auto">
                {validRows.length} valid
              </span>
              {parseResult.rows.filter((r) => !r.valid).length > 0 && (
                <span className="text-amber-600 font-medium">
                  {parseResult.rows.filter((r) => !r.valid).length} skipped
                </span>
              )}
            </div>

            {/* Batch info notice */}
            {isBatched && selectedBatch !== null && (
              <div
                className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-foreground shrink-0"
                data-ocid="csv-batch-info"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span>
                  Importing batch {selectedBatch} of {totalBatches} —{" "}
                  <span className="font-semibold">
                    {rawData?.dataRows.length ?? 0} rows
                  </span>{" "}
                  from <span className="font-semibold">{fileName}</span>.
                </span>
              </div>
            )}

            <div className="overflow-auto flex-1 rounded-lg border border-border min-h-0">
              <table className="min-w-[480px] w-full text-xs">
                <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground w-8">
                      #
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                      Business
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                      Contact
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                      Phone
                    </th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground hidden sm:table-cell">
                      Industry
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row) => (
                    <tr
                      key={row.rawIndex}
                      className={`border-t border-border ${row.valid ? "" : "opacity-50 bg-amber-50/30"}`}
                      data-ocid={`csv-preview-row.${row.rawIndex}`}
                    >
                      <td className="px-3 py-2 text-muted-foreground">
                        {row.valid ? (
                          row.rawIndex
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-[120px] truncate font-medium text-foreground">
                        {row.data.name || (
                          <span className="italic text-muted-foreground">
                            empty
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-[100px] truncate text-foreground">
                        {row.data.contactName}
                      </td>
                      <td className="px-3 py-2 max-w-[100px] truncate text-foreground">
                        {row.data.phone}
                      </td>
                      <td className="px-3 py-2 max-w-[120px] truncate text-foreground hidden sm:table-cell">
                        {row.industry || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 shrink-0 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Stage
                  </Label>
                  <Select
                    value={stage}
                    onValueChange={(v) => setStage(v as PipelineStage)}
                  >
                    <SelectTrigger
                      className="w-full"
                      data-ocid="csv-stage-select"
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
                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Assign to Pipeline{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  {showNewPipeline ? (
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newPipelineName}
                        onChange={(e) => setNewPipelineName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") void handleCreateNewPipeline();
                        }}
                        placeholder="New pipeline name…"
                        className="flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring min-h-[38px]"
                        data-ocid="csv-new-pipeline-input"
                      />
                      <button
                        type="button"
                        onClick={() => void handleCreateNewPipeline()}
                        disabled={
                          !newPipelineName.trim() || createPipeline.isPending
                        }
                        className="px-2 py-1 rounded-md bg-primary text-white text-xs font-semibold disabled:opacity-50 min-h-[38px]"
                        data-ocid="csv-new-pipeline-save"
                      >
                        {createPipeline.isPending ? "…" : "Add"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewPipeline(false);
                          setNewPipelineName("");
                        }}
                        className="px-2 py-1 rounded-md border border-border text-xs text-muted-foreground min-h-[38px]"
                        data-ocid="csv-new-pipeline-cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Select
                        value={importPipelineId?.toString() ?? ""}
                        onValueChange={(v) => {
                          setImportPipelineId(v ? BigInt(v) : null);
                          if (v) setPipelineError(null);
                        }}
                      >
                        <SelectTrigger
                          className={`w-full ${pipelineError ? "border-destructive ring-1 ring-destructive" : ""}`}
                          data-ocid="csv-pipeline-select"
                        >
                          <SelectValue placeholder="— Select a pipeline —" />
                        </SelectTrigger>
                        <SelectContent>
                          {pipelines.map((p) => (
                            <SelectItem
                              key={p.id.toString()}
                              value={p.id.toString()}
                            >
                              {p.name}
                            </SelectItem>
                          ))}
                          {pipelines.length === 0 && (
                            <div className="px-3 py-2 text-xs text-muted-foreground">
                              No pipelines yet — create one below.
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {pipelineError && (
                        <p
                          className="text-xs text-destructive flex items-center gap-1"
                          data-ocid="csv-pipeline-error"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {pipelineError}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowNewPipeline(true)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                        data-ocid="csv-create-pipeline-button"
                      >
                        <Plus className="w-3 h-3" />
                        Create new pipeline
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-h-[44px]"
                  onClick={() => setStep("mapping")}
                  data-ocid="csv-back-button"
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  className="flex-1 min-h-[44px]"
                  disabled={
                    validRows.length === 0 ||
                    bulkImport.isPending ||
                    importPipelineId === null
                  }
                  onClick={handleImport}
                  data-ocid="csv-import-button"
                  title={
                    importPipelineId === null
                      ? "Select or create a pipeline first"
                      : undefined
                  }
                >
                  {bulkImport.isPending
                    ? "Importing…"
                    : `Import ${validRows.length} Lead${validRows.length !== 1 ? "s" : ""}`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div
            className="flex flex-col items-center justify-center gap-5 py-10"
            data-ocid="csv-success-state"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {importedCount} lead{importedCount !== 1 ? "s" : ""} imported
                successfully
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your pipeline has been updated with the new leads.
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="min-h-[44px] px-8"
              data-ocid="csv-done-button"
            >
              View My Pipeline
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─── Add Lead Dialog ──────────────────────────────────────────── */

function AddLeadDialog({
  open,
  onClose,
  pipelines,
  defaultPipelineId,
}: {
  open: boolean;
  onClose: () => void;
  pipelines: Pipeline[];
  defaultPipelineId: bigint | null;
}) {
  const addLead = useAddLead();
  const createPipelineInline = useCreatePipeline();
  const [form, setForm] = useState<Partial<LeadInput>>({
    pipelineStage: PipelineStage.Prospect,
    qualificationTags: [],
    notes: "",
    pipelineId: defaultPipelineId ?? undefined,
  });
  const [showNewPipelineInline, setShowNewPipelineInline] = useState(false);
  const [newPipelineNameInline, setNewPipelineNameInline] = useState("");

  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead.mutateAsync({
        name: form.name ?? "",
        industry: form.industry ?? "",
        phone: form.phone ?? "",
        email: form.email ?? "",
        address: form.address ?? "",
        city: form.city ?? "",
        state: form.state ?? "",
        revenueRange: form.revenueRange ?? "",
        yearsInBusiness: BigInt(form.yearsInBusiness ?? 0),
        pipelineStage: form.pipelineStage ?? PipelineStage.Prospect,
        notes: form.notes ?? "",
        qualificationTags: [],
        firstName: form.firstName,
        lastName: form.lastName,
        pipelineId: form.pipelineId,
      });
      toast.success("Lead added to your pipeline");
      onClose();
      setForm({
        pipelineStage: PipelineStage.Prospect,
        qualificationTags: [],
        notes: "",
        pipelineId: defaultPipelineId ?? undefined,
      });
      setShowNewPipelineInline(false);
      setNewPipelineNameInline("");
    } catch {
      toast.error("Failed to add lead");
    }
  };

  const handleCreatePipelineInline = async () => {
    const name = newPipelineNameInline.trim();
    if (!name) return;
    try {
      const newP = await createPipelineInline.mutateAsync(name);
      if (newP && typeof newP === "object" && "id" in newP) {
        setForm((f) => ({ ...f, pipelineId: (newP as Pipeline).id }));
      }
      setShowNewPipelineInline(false);
      setNewPipelineNameInline("");
      toast.success(`Pipeline "${name}" created`);
    } catch {
      toast.error("Failed to create pipeline");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-lg max-h-[92vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg font-semibold">
            Add New Lead
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleAddLeadSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
        >
          <div>
            <Label className="text-sm font-medium">First Name</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.firstName ?? ""}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="Jane"
              data-ocid="lead-first-name-input"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Last Name</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.lastName ?? ""}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Smith"
              data-ocid="lead-last-name-input"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-sm font-medium">Business Name</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Acme Plumbing Co."
              data-ocid="lead-name-input"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Phone</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.phone ?? ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(555) 000-0000"
              data-ocid="lead-phone-input"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input
              className="mt-1 min-h-[44px]"
              type="email"
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="owner@business.com"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">City</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.city ?? ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Chicago"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">State</Label>
            <Input
              className="mt-1 min-h-[44px]"
              value={form.state ?? ""}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="IL"
              maxLength={2}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Revenue Range</Label>
            <Select
              value={form.revenueRange ?? ""}
              onValueChange={(v) => setForm({ ...form, revenueRange: v })}
            >
              <SelectTrigger className="mt-1 min-h-[44px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {REVENUE_RANGES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(pipelines.length > 0 || true) && (
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium">
                Assign to Pipeline (optional)
              </Label>
              {showNewPipelineInline ? (
                <div className="flex gap-1.5 mt-1">
                  <Input
                    className="flex-1 min-h-[44px]"
                    value={newPipelineNameInline}
                    onChange={(e) => setNewPipelineNameInline(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleCreatePipelineInline();
                      }
                    }}
                    placeholder="New pipeline name…"
                    data-ocid="add-lead-new-pipeline-input"
                  />
                  <Button
                    type="button"
                    onClick={() => void handleCreatePipelineInline()}
                    disabled={
                      !newPipelineNameInline.trim() ||
                      createPipelineInline.isPending
                    }
                    className="shrink-0 min-h-[44px]"
                    data-ocid="add-lead-new-pipeline-save"
                  >
                    {createPipelineInline.isPending ? "…" : "Add"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowNewPipelineInline(false);
                      setNewPipelineNameInline("");
                    }}
                    className="shrink-0 min-h-[44px]"
                    data-ocid="add-lead-new-pipeline-cancel"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-1 mt-1">
                  <Select
                    value={form.pipelineId?.toString() ?? "none"}
                    onValueChange={(v) =>
                      setForm({
                        ...form,
                        pipelineId: v === "none" ? undefined : BigInt(v),
                      })
                    }
                  >
                    <SelectTrigger
                      className="min-h-[44px]"
                      data-ocid="lead-pipeline-select"
                    >
                      <SelectValue placeholder="No Pipeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Pipeline</SelectItem>
                      {pipelines.map((p) => (
                        <SelectItem
                          key={p.id.toString()}
                          value={p.id.toString()}
                        >
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => setShowNewPipelineInline(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                    data-ocid="add-lead-create-pipeline-button"
                  >
                    <Plus className="w-3 h-3" />
                    Create new pipeline
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto min-h-[44px]"
              data-ocid="add-lead-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addLead.isPending}
              className="w-full sm:w-auto min-h-[44px]"
              data-ocid="add-lead-submit"
            >
              {addLead.isPending ? "Adding…" : "Add Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ─── AI Search Bar ───────────────────────────────────────────── */

function AiSearchBar({
  leads,
  onResults,
  onClear,
}: {
  leads: Lead[];
  onResults: (results: Lead[], query: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const aiSearch = useAiSearchLeads();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const results = await aiSearch.mutateAsync({ searchQuery: query, leads });
      onResults(results, query);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI search failed.";
      toast.error(msg);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 space-y-3"
      data-ocid="ai-search-panel"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          AI Search
          <span className="font-normal text-muted-foreground normal-case tracking-normal ml-0.5">
            — natural language search across your leads
          </span>
        </div>
        <TokenBalance showLtai={false} />
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1 min-h-[44px] bg-card border-border focus:ring-primary/40"
          placeholder="Try: contractors in Austin, leads not yet contacted…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={aiSearch.isPending}
          data-ocid="ai-search-input"
        />
        <Button
          size="default"
          onClick={handleSearch}
          disabled={!query.trim() || aiSearch.isPending}
          className="shrink-0 min-h-[44px]"
          data-ocid="ai-search-button"
        >
          {aiSearch.isPending ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              Searching…
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Search
            </span>
          )}
        </Button>
      </div>
      {aiSearch.isPending && (
        <div
          className="flex items-center gap-2 text-xs text-primary/80"
          data-ocid="ai-search-loading"
        >
          <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          AI is searching your leads…
        </div>
      )}
      <button
        type="button"
        onClick={onClear}
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        data-ocid="ai-search-close"
      >
        Hide AI Search
      </button>
    </div>
  );
}

/* ─── View Toggle ─────────────────────────────────────────────── */

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) onChange(v as ViewMode);
      }}
      variant="outline"
      size="sm"
      className="shrink-0"
      data-ocid="leads-view-toggle"
    >
      <ToggleGroupItem
        value="tile"
        aria-label="Tile view"
        className="min-h-[44px] px-3"
        data-ocid="leads-view-tile"
      >
        <LayoutGrid className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="card"
        aria-label="Card view"
        className="min-h-[44px] px-3"
        data-ocid="leads-view-card"
      >
        <LayoutDashboard className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        aria-label="List view"
        className="min-h-[44px] px-3"
        data-ocid="leads-view-list"
      >
        <List className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

/* ─── Tile Card (compact) ──────────────────────────────────────── */

function TileCard({
  lead,
  selectionMode,
  selected,
  onSelect,
}: {
  lead: Lead;
  selectionMode: boolean;
  selected: boolean;
  onSelect: (id: bigint) => void;
}) {
  const [showSmsSend, setShowSmsSend] = useState(false);
  const isDnc = lead.isDnc;

  return (
    <>
      <div className={`relative group ${isDnc ? "opacity-75" : ""}`}>
        {/* Selection checkbox overlay */}
        {selectionMode && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSelect(lead.id);
            }}
            className="absolute top-2 left-2 z-10 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-colors bg-card min-h-[24px]"
            style={{
              borderColor: selected ? "oklch(0.56 0.16 44)" : undefined,
              backgroundColor: selected ? "oklch(0.56 0.16 44)" : undefined,
            }}
            aria-label={selected ? "Deselect lead" : "Select lead"}
            data-ocid="lead-select-checkbox"
          >
            {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>
        )}
        <Link
          to="/leads/$id"
          params={{ id: lead.id.toString() }}
          className="block"
          data-ocid="pipeline-card"
          onClick={(e) => selectionMode && e.preventDefault()}
        >
          <div
            className={`bg-card border rounded-xl p-3 h-full flex flex-col gap-2 hover:border-primary/40 hover:shadow-md transition-all duration-200 active:scale-[0.99] ${
              isDnc
                ? "border-destructive/30"
                : selected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors flex-1 min-w-0">
                {getLeadDisplayName(lead)}
              </p>
              {isDnc ? (
                <span className="shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white">
                  DNC
                </span>
              ) : (
                <StageBadge stage={lead.pipelineStage} />
              )}
            </div>
            {lead.industry && <IndustryBadge industry={lead.industry} />}
            {lead.phone && (
              <p className="text-xs text-muted-foreground truncate">
                {lead.phone}
              </p>
            )}
            {isDnc ? (
              <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-destructive/20">
                <ShieldOff className="w-3.5 h-3.5 text-destructive shrink-0" />
                <span className="text-xs font-semibold text-destructive">
                  No Contact
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-auto pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const phoneLinkOn =
                      isWindowsDesktop() && getPhoneLinkPreference();
                    handlePhoneCall(
                      lead.phone,
                      phoneLinkOn,
                      isGoogleVoiceEnabled(),
                    );
                  }}
                  className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary"
                  title="Call"
                  data-ocid="call-btn"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSmsSend(true);
                  }}
                  className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary"
                  title="Text"
                  data-ocid="text-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                {lead.email && (
                  <a
                    href={`mailto:${encodeURIComponent(lead.email)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary"
                    title="Email"
                    data-ocid="email-btn"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </Link>
      </div>
      {showSmsSend && (
        <SmsQuickSendPopover
          leadName={getLeadDisplayName(lead)}
          phone={lead.phone}
          isDnc={isDnc}
          onClose={() => setShowSmsSend(false)}
        />
      )}
    </>
  );
}

/* ─── Rich Card (default) ──────────────────────────────────────── */

function LeadCard({
  lead,
  selectionMode,
  selected,
  onSelect,
}: {
  lead: Lead;
  selectionMode: boolean;
  selected: boolean;
  onSelect: (id: bigint) => void;
}) {
  const [showSmsSend, setShowSmsSend] = useState(false);
  const isDnc = lead.isDnc;

  return (
    <>
      <div className={`relative group ${isDnc ? "opacity-80" : ""}`}>
        {selectionMode && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSelect(lead.id);
            }}
            className="absolute top-3 left-3 z-10 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-colors bg-card"
            style={{
              borderColor: selected ? "oklch(0.56 0.16 44)" : undefined,
              backgroundColor: selected ? "oklch(0.56 0.16 44)" : undefined,
            }}
            aria-label={selected ? "Deselect lead" : "Select lead"}
            data-ocid="lead-select-checkbox"
          >
            {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>
        )}
        <Link
          to="/leads/$id"
          params={{ id: lead.id.toString() }}
          className="group block"
          data-ocid="pipeline-card"
          onClick={(e) => selectionMode && e.preventDefault()}
        >
          <div
            className={`bg-card border rounded-xl p-4 h-full flex flex-col gap-3 hover:border-primary/40 hover:shadow-md transition-all duration-200 active:scale-[0.99] ${
              isDnc
                ? "border-destructive/30"
                : selected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {getLeadDisplayName(lead)}
                </p>
                {(lead.firstName || lead.lastName) && lead.name && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {lead.name}
                  </p>
                )}
              </div>
              {isDnc ? (
                <span className="shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full bg-destructive text-white">
                  <ShieldOff className="w-3 h-3" />
                  DNC
                </span>
              ) : (
                <StageBadge stage={lead.pipelineStage} />
              )}
            </div>

            {lead.industry && <IndustryBadge industry={lead.industry} />}

            <div className="space-y-1">
              {lead.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3 shrink-0" />
                  <span className="truncate">{lead.phone}</span>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
              )}
            </div>

            {(lead.city || lead.state) && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {[lead.city, lead.state].filter(Boolean).join(", ")}
                </span>
              </div>
            )}

            {lead.followUpDate && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 shrink-0" />
                <span className="truncate">Follow-up: {lead.followUpDate}</span>
              </div>
            )}

            {isDnc ? (
              <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-destructive/20">
                <ShieldOff className="w-3.5 h-3.5 text-destructive shrink-0" />
                <span className="text-xs font-semibold text-destructive">
                  DNC — No Contact Allowed
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-auto pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const phoneLinkOn =
                      isWindowsDesktop() && getPhoneLinkPreference();
                    handlePhoneCall(
                      lead.phone,
                      phoneLinkOn,
                      isGoogleVoiceEnabled(),
                    );
                  }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]"
                  title="Call"
                  data-ocid="call-btn"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSmsSend(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]"
                  title="Text"
                  data-ocid="text-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Text</span>
                </button>
                {lead.email && (
                  <a
                    href={`mailto:${encodeURIComponent(lead.email)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]"
                    title="Email"
                    data-ocid="email-btn"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </Link>
      </div>
      {showSmsSend && (
        <SmsQuickSendPopover
          leadName={getLeadDisplayName(lead)}
          phone={lead.phone}
          isDnc={isDnc}
          onClose={() => setShowSmsSend(false)}
        />
      )}
    </>
  );
}

/* ─── List View ──────────────────────────────────────────────── */

function LeadListRow({
  lead,
  index,
  selectionMode,
  selected,
  onSelect,
}: {
  lead: Lead;
  index: number;
  selectionMode: boolean;
  selected: boolean;
  onSelect: (id: bigint) => void;
}) {
  const navigate = useNavigate();
  const [showSmsSend, setShowSmsSend] = useState(false);
  const isDnc = lead.isDnc;

  const handleRowClick = () => {
    if (selectionMode) {
      onSelect(lead.id);
      return;
    }
    navigate({ to: "/leads/$id", params: { id: lead.id.toString() } });
  };

  return (
    <>
      <tr
        className={`border-t border-border transition-colors cursor-pointer group ${
          isDnc
            ? "bg-destructive/3 hover:bg-destructive/5"
            : selected
              ? "bg-primary/5 hover:bg-primary/8"
              : "hover:bg-muted/30"
        }`}
        onClick={handleRowClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleRowClick();
        }}
        tabIndex={0}
        data-ocid={`leads-list.item.${index + 1}`}
      >
        {selectionMode && (
          <td className="px-3 py-2.5 w-10">
            <div
              className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
              style={{
                borderColor: selected ? "oklch(0.56 0.16 44)" : undefined,
                backgroundColor: selected ? "oklch(0.56 0.16 44)" : undefined,
              }}
            >
              {selected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </div>
          </td>
        )}
        <td className="px-3 py-2.5 min-w-[140px] max-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {getLeadDisplayName(lead)}
              </p>
              {(lead.firstName || lead.lastName) && lead.name && (
                <p className="text-xs text-muted-foreground truncate">
                  {lead.name}
                </p>
              )}
            </div>
            {isDnc && (
              <span className="shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white">
                DNC
              </span>
            )}
          </div>
        </td>
        <td className="px-3 py-2.5 min-w-[120px] max-w-[160px] hidden sm:table-cell">
          <span className="text-sm text-foreground truncate block">
            {lead.name || ""}
          </span>
        </td>
        <td className="px-3 py-2.5 min-w-[120px] whitespace-nowrap">
          <span className="text-sm text-foreground">{lead.phone || "—"}</span>
        </td>
        <td className="px-3 py-2.5 min-w-[160px] max-w-[200px] hidden md:table-cell">
          <span className="text-sm text-foreground truncate block">
            {lead.email || "—"}
          </span>
        </td>
        <td className="px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell">
          <span className="text-sm text-muted-foreground">
            {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
          </span>
        </td>
        <td className="px-3 py-2.5 min-w-[100px] hidden xl:table-cell">
          {lead.industry ? (
            <IndustryBadge industry={lead.industry} />
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </td>
        <td className="px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell">
          <StageBadge stage={lead.pipelineStage} />
        </td>
        <td className="px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell">
          <span className="text-xs text-muted-foreground">
            {lead.followUpDate || "—"}
          </span>
        </td>
        <td className="px-3 py-2.5 whitespace-nowrap">
          {isDnc ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-destructive px-2">
              <ShieldOff className="w-3.5 h-3.5 shrink-0" />
              DNC
            </span>
          ) : (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const phoneLinkOn =
                    isWindowsDesktop() && getPhoneLinkPreference();
                  handlePhoneCall(
                    lead.phone,
                    phoneLinkOn,
                    isGoogleVoiceEnabled(),
                  );
                }}
                className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Call"
                data-ocid="call-btn"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSmsSend(true);
                }}
                className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Text"
                data-ocid="text-btn"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              {lead.email && (
                <a
                  href={`mailto:${encodeURIComponent(lead.email)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                  title="Email"
                  data-ocid="email-btn"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </td>
      </tr>
      {showSmsSend && (
        <SmsQuickSendPopover
          leadName={getLeadDisplayName(lead)}
          phone={lead.phone}
          isDnc={isDnc}
          onClose={() => setShowSmsSend(false)}
        />
      )}
    </>
  );
}

function LeadListView({
  leads,
  selectionMode,
  selectedIds,
  onSelect,
}: {
  leads: Lead[];
  selectionMode: boolean;
  selectedIds: Set<string>;
  onSelect: (id: bigint) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm min-w-[600px]">
        <thead className="sticky top-0 z-10 bg-card border-b border-border">
          <tr>
            {selectionMode && <th className="px-3 py-3 w-10" />}
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[140px]">
              Name
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell min-w-[120px]">
              Business
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[120px]">
              Phone
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell min-w-[160px]">
              Email
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]">
              City/State
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell min-w-[100px]">
              Industry
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]">
              Stage
            </th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]">
              Follow-Up
            </th>
            <th className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right min-w-[120px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <LeadListRow
              key={lead.id.toString()}
              lead={lead}
              index={i}
              selectionMode={selectionMode}
              selected={selectedIds.has(lead.id.toString())}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── My Pipeline Tab ──────────────────────────────────────────── */

function MyPipelineTab({
  onAddLead,
  onImportCsv,
  selectedPipelineId,
}: {
  onAddLead: () => void;
  onImportCsv: () => void;
  selectedPipelineId: bigint | null;
}) {
  const { data: leads, isLoading } = useLeads(selectedPipelineId);
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiResults, setAiResults] = useState<Lead[] | null>(null);
  const [aiQuery, setAiQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>(getStoredView);

  // Selection mode
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDncConfirm, setShowDncConfirm] = useState(false);
  const bulkDelete = useBulkDeleteLeads();
  const updateLeadDnc = useUpdateLeadDnc();

  // Hide DNC preference — shared with Pipeline page
  const [hideDnc, setHideDnc] = useState(() => {
    try {
      return localStorage.getItem("tele-blast-hide-dnc") === "true";
    } catch {
      return false;
    }
  });

  // DNC section collapse state
  const [dncExpanded, setDncExpanded] = useState(true);

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

  const handleViewChange = (v: ViewMode) => {
    setViewMode(v);
    setStoredView(v);
  };

  const allLeadsData = leads ?? [];
  const nonDncLeads = allLeadsData.filter((l) => !l.isDnc);
  const dncLeads = allLeadsData.filter((l) => l.isDnc);

  // Build a unique industry list from actual loaded leads only (no fallback constants)
  const availableIndustries = useMemo(() => {
    return [
      ...new Set(allLeadsData.map((l) => l.industry).filter(Boolean)),
    ].sort();
  }, [allLeadsData]);

  const filtered = useMemo(() => {
    if (aiResults !== null) return aiResults.filter((l) => !l.isDnc);
    return nonDncLeads.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch =
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q);
      const matchStage =
        stageFilter === "all" || l.pipelineStage === stageFilter;
      const matchIndustry =
        industryFilter === "all" || l.industry === industryFilter;
      return matchSearch && matchStage && matchIndustry;
    });
  }, [nonDncLeads, search, stageFilter, industryFilter, aiResults]);

  const handleAiResults = (results: Lead[], query: string) => {
    setAiResults(results);
    setAiQuery(query);
  };

  const clearAiResults = () => {
    setAiResults(null);
    setAiQuery("");
  };

  const hideAiSearch = () => {
    setShowAiSearch(false);
    clearAiResults();
  };

  const toggleSelect = useCallback((id: bigint) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const key = id.toString();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleSelectAll = () => {
    if (selectedIds.size === filtered.length && filtered.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((l) => l.id.toString())));
    }
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds).map((s) => BigInt(s));
    try {
      await bulkDelete.mutateAsync(ids);
      toast.success(`${ids.length} lead${ids.length !== 1 ? "s" : ""} deleted`);
      exitSelectionMode();
      setShowDeleteConfirm(false);
    } catch {
      toast.error("Failed to delete leads");
    }
  };

  const handleBulkDnc = async () => {
    const ids = Array.from(selectedIds).map((s) => BigInt(s));
    try {
      await Promise.all(
        ids.map((id) => updateLeadDnc.mutateAsync({ leadId: id, isDnc: true })),
      );
      toast.success(
        `${ids.length} lead${ids.length !== 1 ? "s" : ""} marked as Do Not Call`,
      );
      exitSelectionMode();
      setShowDncConfirm(false);
    } catch {
      toast.error("Failed to mark leads as DNC");
    }
  };

  const renderLeads = (leadsToShow: Lead[], forDnc = false) => {
    if (viewMode === "list") {
      return (
        <LeadListView
          leads={leadsToShow}
          selectionMode={selectionMode && !forDnc}
          selectedIds={selectedIds}
          onSelect={toggleSelect}
        />
      );
    }
    if (viewMode === "tile") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {leadsToShow.map((lead) => (
            <TileCard
              key={lead.id.toString()}
              lead={lead}
              selectionMode={selectionMode && !forDnc}
              selected={selectedIds.has(lead.id.toString())}
              onSelect={toggleSelect}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leadsToShow.map((lead) => (
          <LeadCard
            key={lead.id.toString()}
            lead={lead}
            selectionMode={selectionMode && !forDnc}
            selected={selectedIds.has(lead.id.toString())}
            onSelect={toggleSelect}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3 pb-24 sm:pb-4">
      {/* Search + view toggle row */}
      <div className="flex gap-2 items-center">
        {selectionMode ? (
          <>
            <button
              type="button"
              onClick={handleSelectAll}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 transition-colors min-h-[44px]"
              data-ocid="leads-select-all-button"
            >
              <div
                className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0"
                style={{
                  borderColor:
                    selectedIds.size === filtered.length && filtered.length > 0
                      ? "oklch(0.56 0.16 44)"
                      : undefined,
                  backgroundColor:
                    selectedIds.size === filtered.length && filtered.length > 0
                      ? "oklch(0.56 0.16 44)"
                      : undefined,
                }}
              >
                {selectedIds.size === filtered.length &&
                  filtered.length > 0 && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  )}
              </div>
              <span className="hidden sm:inline">
                {selectedIds.size === filtered.length && filtered.length > 0
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </button>
            <span className="text-sm text-muted-foreground flex-1">
              {selectedIds.size > 0 ? (
                <span className="font-semibold text-foreground">
                  {selectedIds.size} selected
                </span>
              ) : (
                "Tap leads to select"
              )}
            </span>
            <button
              type="button"
              onClick={exitSelectionMode}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground min-h-[44px] px-3"
              data-ocid="leads-cancel-selection"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 min-h-[44px]"
                placeholder="Search name, phone, city, industry…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="pipeline-search"
              />
            </div>
            <ViewToggle value={viewMode} onChange={handleViewChange} />
            <button
              type="button"
              onClick={() => setSelectionMode(true)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px]"
              data-ocid="leads-selection-mode-button"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Select</span>
            </button>
          </>
        )}
      </div>

      {/* AI Search toggle button */}
      {hasAi && !showAiSearch && !selectionMode && (
        <button
          type="button"
          onClick={() => setShowAiSearch(true)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors py-1 text-primary hover:text-primary/80"
          data-ocid="ai-search-toggle"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Try AI Search
        </button>
      )}

      {showAiSearch && (
        <AiSearchBar
          leads={allLeadsData}
          onResults={handleAiResults}
          onClear={hideAiSearch}
        />
      )}

      {/* AI results banner */}
      {aiResults !== null && (
        <div
          className="flex items-center justify-between gap-2 bg-primary/8 border border-primary/20 rounded-lg px-3 py-2"
          data-ocid="ai-results-banner"
        >
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">
              {aiResults.length} match{aiResults.length !== 1 ? "es" : ""} found
            </span>
            <span className="text-muted-foreground hidden sm:inline truncate max-w-[240px]">
              for "{aiQuery}"
            </span>
          </div>
          <button
            type="button"
            onClick={clearAiResults}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 min-h-[32px] px-2"
            data-ocid="ai-results-clear"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      )}

      {/* Filter + import row */}
      {aiResults === null && !selectionMode && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger
              className="min-w-[130px] min-h-[44px] shrink-0"
              data-ocid="stage-filter"
            >
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {PIPELINE_STAGES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger
              className="min-w-[140px] min-h-[44px] shrink-0"
              data-ocid="industry-filter"
            >
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {availableIndustries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={toggleHideDnc}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold min-h-[44px] transition-colors ${
              hideDnc
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
            title={hideDnc ? "Show DNC leads" : "Hide DNC leads"}
            data-ocid="leads-hide-dnc-toggle"
          >
            {hideDnc ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DNC Hidden</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DNC</span>
              </>
            )}
          </button>
          <Button
            variant="outline"
            size="default"
            onClick={onImportCsv}
            className="shrink-0 min-h-[44px]"
            data-ocid="import-csv-button"
          >
            <FileUp className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Import CSV</span>
          </Button>
        </div>
      )}

      {/* Lead grid/list rendering */}
      {isLoading ? (
        viewMode === "list" ? (
          <div className="space-y-2">
            {["a", "b", "c", "d", "e"].map((k) => (
              <Skeleton key={k} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-4 ${viewMode === "tile" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton
                key={k}
                className={
                  viewMode === "tile" ? "h-32 rounded-xl" : "h-44 rounded-xl"
                }
              />
            ))}
          </div>
        )
      ) : filtered.length === 0 && aiResults !== null ? (
        <div
          className="flex flex-col items-center justify-center py-12 gap-3 bg-card rounded-xl border border-primary/20"
          data-ocid="ai-no-results"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary/60" />
          </div>
          <div className="text-center px-4">
            <p className="font-semibold text-foreground">No matches found</p>
            <p className="text-sm text-muted-foreground mt-1">
              The AI search didn&apos;t find any leads matching &quot;{aiQuery}
              &quot;. Try rephrasing your query.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAiResults}
            className="min-h-[44px]"
            data-ocid="ai-no-results-clear"
          >
            <X className="w-4 h-4 mr-1.5" />
            Clear AI Search
          </Button>
        </div>
      ) : filtered.length === 0 && nonDncLeads.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-4 bg-card rounded-xl border border-border"
          data-ocid="pipeline-empty"
        >
          <Building2 className="w-12 h-12 text-muted-foreground/40" />
          <div className="text-center px-4">
            <p className="font-semibold text-foreground">No leads yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedPipelineId !== null
                ? "No leads in this pipeline. Import a CSV or add leads manually."
                : "Upload a CSV or add leads manually to get started."}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 w-full px-6 sm:flex-row sm:w-auto sm:px-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onImportCsv}
              className="min-h-[44px]"
              data-ocid="empty-import-csv"
            >
              <FileUp className="w-4 h-4 mr-1.5" />
              Import CSV
            </Button>
            <Button
              onClick={onAddLead}
              size="sm"
              className="min-h-[44px]"
              data-ocid="empty-add-lead"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Lead
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Regular leads */}
          {filtered.length > 0 ? (
            renderLeads(filtered)
          ) : (
            <div
              className="flex flex-col items-center justify-center py-10 gap-3 bg-card rounded-xl border border-border"
              data-ocid="pipeline-filtered-empty"
            >
              <Search className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No leads match your filters
              </p>
            </div>
          )}

          {/* DNC Section */}
          {!hideDnc && dncLeads.length > 0 && (
            <div className="mt-6" data-ocid="leads-dnc-section">
              <button
                type="button"
                onClick={() => setDncExpanded((v) => !v)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-l-4 border-destructive bg-destructive/5 border-t border-r border-b border-destructive/20 mb-0 text-left"
                data-ocid="leads-dnc-section-header"
              >
                <ShieldOff className="w-4 h-4 text-destructive shrink-0" />
                <span className="font-semibold text-destructive text-sm flex-1">
                  Do Not Call
                </span>
                <span className="text-xs font-bold text-destructive bg-destructive/15 rounded-full px-2.5 py-0.5">
                  {dncLeads.length}
                </span>
                {dncExpanded ? (
                  <ChevronUp className="w-4 h-4 text-destructive shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-destructive shrink-0" />
                )}
              </button>
              {dncExpanded && (
                <div className="mt-2 border-l-4 border-destructive/30 pl-2">
                  {renderLeads(dncLeads, true)}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Bulk action floating bar */}
      {selectionMode && selectedIds.size > 0 && (
        <div
          className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+8px)] sm:bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50 flex items-center gap-2 bg-foreground text-background px-4 py-3 rounded-2xl shadow-2xl"
          data-ocid="leads-bulk-action-bar"
        >
          <span className="text-sm font-semibold shrink-0">
            {selectedIds.size} selected
          </span>
          <div className="flex-1 flex items-center justify-end gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowDncConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold min-h-[40px] transition-colors"
              style={{ background: "oklch(0.56 0.16 44)", color: "white" }}
              data-ocid="leads-bulk-dnc-button"
            >
              <ShieldOff className="w-3.5 h-3.5" />
              Mark DNC ({selectedIds.size})
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-destructive text-white text-xs font-semibold min-h-[40px] transition-colors hover:bg-destructive/90"
              data-ocid="leads-bulk-delete-button"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete ({selectedIds.size})
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm dialog */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 px-4"
          data-ocid="leads-delete-confirm-dialog"
          onClick={(e) =>
            e.target === e.currentTarget && setShowDeleteConfirm(false)
          }
          onKeyDown={(e) => e.key === "Escape" && setShowDeleteConfirm(false)}
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">
                  Delete {selectedIds.size} Lead
                  {selectedIds.size !== 1 ? "s" : ""}?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently delete {selectedIds.size}{" "}
              lead{selectedIds.size !== 1 ? "s" : ""}? This action cannot be
              undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 min-h-[44px]"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={bulkDelete.isPending}
                data-ocid="leads-delete-cancel-button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 min-h-[44px] bg-destructive text-white hover:bg-destructive/90 font-semibold"
                onClick={handleBulkDelete}
                disabled={bulkDelete.isPending}
                data-ocid="leads-delete-confirm-button"
              >
                {bulkDelete.isPending ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DNC confirm dialog */}
      {showDncConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 px-4"
          data-ocid="leads-dnc-confirm-dialog"
          onClick={(e) =>
            e.target === e.currentTarget && setShowDncConfirm(false)
          }
          onKeyDown={(e) => e.key === "Escape" && setShowDncConfirm(false)}
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <ShieldOff className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">
                  Mark {selectedIds.size} Lead
                  {selectedIds.size !== 1 ? "s" : ""} as DNC?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Do Not Call
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mark {selectedIds.size} lead{selectedIds.size !== 1 ? "s" : ""} as
              Do Not Call? They will be moved to the DNC section and blocked
              from all outreach.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 min-h-[44px]"
                onClick={() => setShowDncConfirm(false)}
                disabled={updateLeadDnc.isPending}
                data-ocid="leads-dnc-cancel-button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 min-h-[44px]"
                onClick={handleBulkDnc}
                disabled={updateLeadDnc.isPending}
                data-ocid="leads-dnc-confirm-button"
              >
                {updateLeadDnc.isPending ? "Marking…" : "Mark DNC"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function LeadsPage() {
  const { data: allLeads } = useLeads();
  const { data: pipelines = [] } = useGetPipelines();
  const createPipelinePage = useCreatePipeline();
  const [selectedPipelineId, setSelectedPipelineId] = useState<bigint | null>(
    null,
  );
  const [showAdd, setShowAdd] = useState(false);
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [showManagePipelines, setShowManagePipelines] = useState(false);
  // Quick-create pipeline from header
  const [showQuickPipeline, setShowQuickPipeline] = useState(false);
  const [quickPipelineName, setQuickPipelineName] = useState("");

  const handleQuickCreatePipeline = async () => {
    const name = quickPipelineName.trim();
    if (!name) return;
    try {
      const newP = await createPipelinePage.mutateAsync(name);
      const pipelineId =
        newP != null && typeof newP === "object" && "id" in newP
          ? (newP as Pipeline).id
          : null;
      if (pipelineId != null) setSelectedPipelineId(pipelineId);
      setQuickPipelineName("");
      setShowQuickPipeline(false);
      toast.success(`Pipeline "${name}" created`);
    } catch {
      toast.error("Failed to create pipeline");
    }
  };

  const handleCsvSuccess = (count: number) => {
    toast.success(
      `${count} lead${count !== 1 ? "s" : ""} imported successfully`,
    );
  };

  const displayCount =
    selectedPipelineId === null
      ? (allLeads?.length ?? 0)
      : (allLeads ?? []).filter((l) => l.pipelineId === selectedPipelineId)
          .length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Leads
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {displayCount} leads
            {selectedPipelineId !== null && pipelines.length > 0
              ? ` in ${pipelines.find((p) => p.id === selectedPipelineId)?.name ?? "pipeline"}`
              : " in your pipeline"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowQuickPipeline(true)}
            className="hidden sm:flex min-h-[44px] px-3 gap-1.5"
            data-ocid="leads-new-pipeline-button"
          >
            <FolderKanban className="w-4 h-4" />
            New Pipeline
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAdd(true)}
            className="hidden sm:flex min-h-[44px] px-4 gap-1.5"
            data-ocid="add-lead-trigger"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Pipeline selector */}
      <div className="mb-4">
        <PipelineSelector
          pipelines={pipelines}
          selectedId={selectedPipelineId}
          onChange={setSelectedPipelineId}
          onManage={() => setShowManagePipelines(true)}
        />
      </div>

      <MyPipelineTab
        onAddLead={() => setShowAdd(true)}
        onImportCsv={() => setShowCsvImport(true)}
        selectedPipelineId={selectedPipelineId}
      />

      <AddLeadDialog
        open={showAdd}
        onClose={() => setShowAdd(false)}
        pipelines={pipelines}
        defaultPipelineId={selectedPipelineId}
      />
      <CsvImportDialog
        open={showCsvImport}
        onClose={() => setShowCsvImport(false)}
        onSuccess={handleCsvSuccess}
        pipelines={pipelines}
        defaultPipelineId={selectedPipelineId}
      />
      <ManagePipelinesDialog
        open={showManagePipelines}
        onClose={() => setShowManagePipelines(false)}
        pipelines={pipelines}
      />

      {/* Quick-create pipeline overlay */}
      {showQuickPipeline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
          data-ocid="leads-new-pipeline-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowQuickPipeline(false);
              setQuickPipelineName("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowQuickPipeline(false);
              setQuickPipelineName("");
            }
          }}
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
              value={quickPipelineName}
              onChange={(e) => setQuickPipelineName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleQuickCreatePipeline();
                if (e.key === "Escape") {
                  setShowQuickPipeline(false);
                  setQuickPipelineName("");
                }
              }}
              placeholder="Pipeline name…"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
              ref={(el) => {
                if (el) el.focus();
              }}
              data-ocid="leads-quick-pipeline-input"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowQuickPipeline(false);
                  setQuickPipelineName("");
                }}
                className="flex-1 min-h-[44px] rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="leads-quick-pipeline-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleQuickCreatePipeline()}
                disabled={
                  !quickPipelineName.trim() || createPipelinePage.isPending
                }
                className="flex-1 min-h-[44px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5"
                data-ocid="leads-quick-pipeline-create"
              >
                <Plus className="w-4 h-4" />
                {createPipelinePage.isPending ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB (mobile only) */}
      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="sm:hidden fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+16px)] right-4 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        style={{ background: "oklch(0.56 0.16 44)" }}
        aria-label="Add lead"
        data-ocid="leads-fab"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
