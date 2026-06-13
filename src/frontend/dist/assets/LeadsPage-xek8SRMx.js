import { j as jsxRuntimeExports, r as reactExports } from "./vendor-react-CYgLKadW.js";
import { c as cn, u as useLeads, a as useGetPipelines, b as useCreatePipeline, B as Button, d as useSubscription, e as useBulkDeleteLeads, f as useUpdateLeadDnc, I as Input, P as PIPELINE_STAGES, S as Skeleton, g as useAddLead, L as Label, R as REVENUE_RANGES, h as useBulkImportLeads, i as useUpdateLead, j as useUpdatePipeline, k as useDeletePipeline, t as tierHasFeature, l as handlePhoneCall, m as isGoogleVoiceEnabled, n as SmsQuickSendPopover } from "./index-DsrDu9m3.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-qGLr7JS2.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B4Jc19UW.js";
import { A as cva, al as Root2, am as Item2, a7 as FolderKanban, a3 as Plus, t as ue, m as ChevronDown, an as Settings2, J as CircleCheck, X, ao as Search, ap as Sparkles, aq as EyeOff, ar as Eye, as as FileUp, a8 as Building2, at as ShieldOff, au as ChevronUp, av as Trash2, ae as Upload, aj as CircleAlert, W as TriangleAlert, a5 as ArrowRight, aw as LayoutGrid, p as LayoutDashboard, ax as List, P as Phone, Y as MessageSquare, M as Mail, ay as MapPin, az as Calendar } from "./vendor-DT3DREzx.js";
import { L as Link, c as useNavigate } from "./vendor-router-gX3Sk5jz.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { u as useAiSearchLeads } from "./useAi-BlR_ZtV6.js";
import { i as isWindowsDesktop } from "./usePhoneLinkPreference-DxhpuVQj.js";
import { P as PipelineStage } from "./vendor-ic-W9L5KZ_F.js";
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = reactExports.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      className: cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = reactExports.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      children
    }
  );
}
function getStoredView() {
  try {
    const v = localStorage.getItem("leads-view-mode");
    if (v === "tile" || v === "card" || v === "list") return v;
  } catch {
  }
  return "card";
}
function setStoredView(v) {
  try {
    localStorage.setItem("leads-view-mode", v);
  } catch {
  }
}
function StageBadge({ stage }) {
  const found = PIPELINE_STAGES.find((s) => s.value === stage);
  if (!found) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${found.color}`,
      children: found.label
    }
  );
}
function IndustryBadge({ industry }) {
  if (!industry) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 max-w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: industry })
  ] });
}
function getLeadDisplayName(lead) {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  if (fullName) return fullName;
  if (lead.name) return lead.name;
  return "";
}
function PipelineSelector({
  pipelines,
  selectedId,
  onChange,
  onManage
}) {
  const selectedName = selectedId === null ? "All Pipelines" : pipelines.find((p) => p.id === selectedId)?.name ?? "All Pipelines";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: selectedId?.toString() ?? "all",
          onChange: (e) => {
            const val = e.target.value;
            onChange(val === "all" ? null : BigInt(val));
          },
          className: "appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px] min-w-[160px] transition-colors hover:border-primary/40",
          "data-ocid": "pipeline-selector",
          "aria-label": "Select pipeline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Pipelines" }),
            pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.name }, p.id.toString()))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: selectedName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onManage,
        className: "p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
        title: "Manage pipelines",
        "aria-label": "Manage pipelines",
        "data-ocid": "manage-pipelines-button",
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
              "data-ocid": `pipeline-cancel-button.${i + 1}`,
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
const CSV_COLUMN_ALIASES = {
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
  region: "state"
};
const FIELD_LABELS = {
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
  skip: "— Skip this column —"
};
function parseCSVLine(line) {
  const result = [];
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
function parseCSVRaw(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length < 2) {
    return {
      data: { rawHeaders: [], normHeaders: [], dataRows: [] },
      error: "CSV file appears to be empty or has no data rows."
    };
  }
  const rawHeaders = parseCSVLine(lines[0]).map(
    (h) => h.replace(/^["']|["']$/g, "").trim()
  );
  const normHeaders = rawHeaders.map((h) => h.toLowerCase());
  const dataRows = [];
  for (let i = 1; i < lines.length; i++) {
    dataRows.push(parseCSVLine(lines[i]));
  }
  return { data: { rawHeaders, normHeaders, dataRows }, error: null };
}
function normalizeBirthdayValue(raw) {
  const v = raw.trim();
  if (!v) return null;
  const parts = v.split(/[-/]/);
  if (parts.length === 3) {
    const [a, b, c] = parts.map((p) => p.trim());
    if (a.length === 4) {
      const year = Number.parseInt(a, 10);
      const month = Number.parseInt(b, 10);
      const day = Number.parseInt(c, 10);
      if (isValidMonthDay(month, day) && year >= 1900 && year <= 2100) {
        return `${a}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      }
      return null;
    }
    if (c.length === 4) {
      const month = Number.parseInt(a, 10);
      const day = Number.parseInt(b, 10);
      const year = Number.parseInt(c, 10);
      if (isValidMonthDay(month, day) && year >= 1900 && year <= 2100) {
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      }
      return null;
    }
    return null;
  }
  if (parts.length === 2) {
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
function isValidMonthDay(month, day) {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= maxDays[month - 1];
}
function applyMappings(raw, mappings) {
  const rows = [];
  for (let i = 0; i < raw.dataRows.length; i++) {
    const cols = raw.dataRows[i];
    const entry = {
      name: "",
      contactName: "",
      address: "",
      phone: "",
      email: "",
      notes: ""
    };
    let rowIndustry = "";
    raw.rawHeaders.forEach((header, idx) => {
      const field = mappings[header];
      if (!field || field === "skip") return;
      const value = (cols[idx] ?? "").trim();
      if (field === "industry") {
        rowIndustry = value;
      } else if (field === "birthday") {
        if (value) {
          const normalized = normalizeBirthdayValue(value);
          if (normalized) {
            entry.birthday = normalized;
          }
        }
      } else {
        entry[field] = value;
      }
    });
    rows.push({
      data: entry,
      industry: rowIndustry,
      valid: entry.name.trim().length > 0 || entry.contactName.trim().length > 0,
      rawIndex: i + 1
    });
  }
  if (rows.length === 0) {
    return { rows: [], error: "No data rows found in the CSV." };
  }
  return { rows, error: null };
}
const BATCH_HISTORY_KEY = "tele_blast_csv_batch_history";
const BATCH_SIZE = 500;
function loadBatchHistory() {
  try {
    const raw = localStorage.getItem(BATCH_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveBatchHistory(history) {
  try {
    localStorage.setItem(BATCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
  }
}
function recordBatchImported(history, fileName, totalRows, batchNumber) {
  const existing = history.find((r) => r.fileName === fileName);
  if (existing) {
    if (!existing.uploadedBatches.includes(batchNumber)) {
      return history.map(
        (r) => r.fileName === fileName ? { ...r, uploadedBatches: [...r.uploadedBatches, batchNumber] } : r
      );
    }
    return history;
  }
  return [...history, { fileName, totalRows, uploadedBatches: [batchNumber] }];
}
const STEP_LABELS = {
  upload: "Upload",
  batch: "Select Batch",
  mapping: "Map Columns",
  preview: "Preview",
  success: "Done"
};
const STEP_ORDER_BATCHED = [
  "upload",
  "batch",
  "mapping",
  "preview",
  "success"
];
const STEP_ORDER_SIMPLE = [
  "upload",
  "mapping",
  "preview",
  "success"
];
function CsvImportDialog({
  open,
  onClose,
  onSuccess,
  pipelines: pipelinesProp,
  defaultPipelineId
}) {
  const { data: livePipelines } = useGetPipelines();
  const pipelines = livePipelines ?? pipelinesProp;
  const [step, setStep] = reactExports.useState("upload");
  const [rawData, setRawData] = reactExports.useState(null);
  const [allDataRows, setAllDataRows] = reactExports.useState([]);
  const [columnMappings, setColumnMappings] = reactExports.useState({});
  const [mappingError, setMappingError] = reactExports.useState(null);
  const [parseResult, setParseResult] = reactExports.useState(null);
  const [fileName, setFileName] = reactExports.useState("");
  const [stage, setStage] = reactExports.useState(PipelineStage.Prospect);
  const [importPipelineId, setImportPipelineId] = reactExports.useState(
    defaultPipelineId
  );
  const [importedCount, setImportedCount] = reactExports.useState(0);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  const [uploadError, setUploadError] = reactExports.useState(null);
  const [pipelineError, setPipelineError] = reactExports.useState(null);
  const [selectedBatch, setSelectedBatch] = reactExports.useState(null);
  const [batchHistory, setBatchHistory] = reactExports.useState([]);
  const [batchReuploadWarning, setBatchReuploadWarning] = reactExports.useState(null);
  const [showNewPipeline, setShowNewPipeline] = reactExports.useState(false);
  const [newPipelineName, setNewPipelineName] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const bulkImport = useBulkImportLeads();
  const createPipeline = useCreatePipeline();
  const totalRows = allDataRows.length;
  const isBatched = totalRows > BATCH_SIZE;
  const STEP_ORDER = isBatched ? STEP_ORDER_BATCHED : STEP_ORDER_SIMPLE;
  const totalBatches = Math.ceil(totalRows / BATCH_SIZE);
  const uploadedBatchesForFile = batchHistory.find((r) => r.fileName === fileName)?.uploadedBatches ?? [];
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
  const handleSelectBatch = (batchNum) => {
    const alreadyUploaded = uploadedBatchesForFile.includes(batchNum);
    if (alreadyUploaded) {
      setBatchReuploadWarning(batchNum);
      return;
    }
    confirmBatchSelection(batchNum);
  };
  const confirmBatchSelection = (batchNum) => {
    setBatchReuploadWarning(null);
    setSelectedBatch(batchNum);
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
      const pipelineId = newPipeline != null && typeof newPipeline === "object" && "id" in newPipeline ? newPipeline.id : null;
      if (pipelineId != null) {
        setImportPipelineId(pipelineId);
        setPipelineError(null);
      }
      setShowNewPipeline(false);
      setNewPipelineName("");
      ue.success(`Pipeline "${name}" created`);
    } catch {
      ue.error("Failed to create pipeline");
    }
  };
  const processFile = reactExports.useCallback((file) => {
    setUploadError(null);
    if (!file.name.endsWith(".csv")) {
      setUploadError("Only .csv files are accepted. Please choose a CSV file.");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      const { data, error } = parseCSVRaw(text);
      if (error) {
        setUploadError(error);
        return;
      }
      const initial = {};
      data.rawHeaders.forEach((header, idx) => {
        const norm = data.normHeaders[idx];
        initial[header] = CSV_COLUMN_ALIASES[norm] ?? "skip";
      });
      setAllDataRows(data.dataRows);
      if (data.dataRows.length > BATCH_SIZE) {
        const history = loadBatchHistory();
        setBatchHistory(history);
        setSelectedBatch(null);
        setBatchReuploadWarning(null);
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
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleProceedToPreview = () => {
    if (!rawData) return;
    const nameIsMapped = Object.values(columnMappings).includes("name");
    const contactNameIsMapped = Object.values(columnMappings).includes("contactName");
    if (!nameIsMapped && !contactNameIsMapped) {
      setMappingError(
        'Map at least one column to "Business Name" or "Contact Name" before proceeding.'
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
        "Please select a pipeline or create a new one before importing."
      );
      return;
    }
    setPipelineError(null);
    try {
      const ids = await bulkImport.mutateAsync({
        csvLeads: validRows.map((r) => r.data),
        stage,
        pipelineId: importPipelineId
      });
      const industryUpdates = validRows.map((r, i) => ({ id: ids[i], industry: r.industry })).filter((u) => u.id !== void 0 && u.industry);
      if (industryUpdates.length > 0) {
        await Promise.allSettled(
          industryUpdates.map(
            (u) => updateLead.mutateAsync({
              id: u.id,
              updates: { industry: u.industry }
            })
          )
        );
      }
      if (isBatched && selectedBatch !== null) {
        const updated = recordBatchImported(
          batchHistory,
          fileName,
          totalRows,
          selectedBatch
        );
        setBatchHistory(updated);
        saveBatchHistory(updated);
      }
      setImportedCount(ids.length);
      setStep("success");
      onSuccess(ids.length);
    } catch {
      ue.error("Import failed. Please try again.");
    }
  };
  const stepIndex = STEP_ORDER.indexOf(step);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-base sm:text-lg font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "w-5 h-5 text-primary shrink-0" }),
      "Import Leads from CSV"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-1 shrink-0 overflow-x-auto pb-1",
        style: { scrollbarWidth: "none" },
        "data-ocid": "csv-steps",
        children: STEP_ORDER.map((s, i) => {
          const active = s === step;
          const done = i < stepIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 sm:w-5 h-px bg-border shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-medium px-2 py-1 rounded-full transition-colors whitespace-nowrap ${active ? "bg-primary text-primary-foreground" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                children: [
                  i + 1,
                  ". ",
                  STEP_LABELS[s]
                ]
              }
            )
          ] }, s);
        })
      }
    ),
    step === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 py-1 overflow-y-auto flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `w-full border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors ${isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`,
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onClick: () => fileInputRef.current?.click(),
          "data-ocid": "csv-dropzone",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Drop your CSV file here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "or tap to browse — .csv files only" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: (e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                },
                className: "min-h-[44px] px-6",
                "data-ocid": "csv-browse-button",
                children: "Browse File"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: ".csv",
                className: "hidden",
                onChange: handleFileChange,
                "data-ocid": "csv-file-input"
              }
            )
          ]
        }
      ),
      uploadError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2.5 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive",
          "data-ocid": "csv-upload-error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: uploadError })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 border border-border text-xs text-muted-foreground space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm mb-1", children: "Any column headers work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "After uploading, you'll match your columns to the right fields — no need to rename anything in your spreadsheet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Required:" }),
          " ",
          "Business Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "or" }),
          " ",
          "Contact Name (at least one)  · ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Optional:" }),
          " ",
          "Phone, Email, Address, Industry, Notes"
        ] })
      ] })
    ] }),
    step === "batch" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 py-1 overflow-y-auto flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm truncate", children: fileName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs shrink-0", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground shrink-0", children: [
            totalRows.toLocaleString(),
            " rows total"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select which 500 rows to import. Checkmarks show batches already uploaded from this file." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: Array.from({ length: totalBatches }, (_, i) => {
        const batchNum = i + 1;
        const start = (batchNum - 1) * BATCH_SIZE + 1;
        const end = Math.min(batchNum * BATCH_SIZE, totalRows);
        const alreadyUploaded = uploadedBatchesForFile.includes(batchNum);
        const isSelected = selectedBatch === batchNum;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleSelectBatch(batchNum),
            className: `relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all min-h-[80px] ${isSelected ? "border-primary ring-2 ring-primary/20 bg-primary/5" : alreadyUploaded ? "border-green-400/60 bg-green-50/40 hover:border-green-500/70" : "border-border hover:border-primary/40 hover:bg-muted/30 bg-card"}`,
            "data-ocid": `csv-batch-card.${batchNum}`,
            children: [
              alreadyUploaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center",
                  title: "Already uploaded",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wide", children: [
                "Batch ",
                batchNum
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                batchNum === 1 ? "1st" : batchNum === 2 ? "2nd" : batchNum === 3 ? "3rd" : `${batchNum}th`,
                " ",
                "500"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "rows ",
                start.toLocaleString(),
                "–",
                end.toLocaleString()
              ] }),
              alreadyUploaded && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-green-700 mt-0.5", children: "✓ Uploaded" })
            ]
          },
          batchNum
        );
      }) }),
      batchReuploadWarning !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-amber-50 border border-amber-300 rounded-xl p-4 flex flex-col gap-3 shrink-0",
          "data-ocid": "csv-batch-reupload-warning",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-amber-900", children: [
                "Batch ",
                batchReuploadWarning,
                " was already uploaded — upload again?"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-1 min-h-[40px]",
                  onClick: () => setBatchReuploadWarning(null),
                  "data-ocid": "csv-batch-reupload-cancel",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "flex-1 min-h-[40px]",
                  onClick: () => confirmBatchSelection(batchReuploadWarning),
                  "data-ocid": "csv-batch-reupload-confirm",
                  children: "Upload Again"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "shrink-0 min-h-[44px]",
          onClick: () => {
            setStep("upload");
            setRawData(null);
            setAllDataRows([]);
            setSelectedBatch(null);
            setBatchReuploadWarning(null);
          },
          "data-ocid": "csv-batch-back-button",
          children: "← Back"
        }
      )
    ] }),
    step === "mapping" && rawData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 min-h-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: fileName }),
        " ",
        "— ",
        rawData.rawHeaders.length,
        " column",
        rawData.rawHeaders.length !== 1 ? "s" : "",
        " detected. Match each column to the correct field."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto -mx-1 px-1 space-y-2", children: rawData.rawHeaders.map((header, idx) => {
        const sample = rawData.dataRows[0]?.[idx] ?? "";
        const currentVal = columnMappings[header] ?? "skip";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-3 flex flex-col gap-2",
            "data-ocid": `csv-mapping-row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: header }),
                sample && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
                  "e.g. ",
                  sample
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: currentVal,
                    onValueChange: (v) => {
                      setColumnMappings((prev) => ({
                        ...prev,
                        [header]: v
                      }));
                      if (v === "name" || v === "contactName")
                        setMappingError(null);
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "flex-1 min-h-[44px] text-sm",
                          "data-ocid": `csv-mapping-select.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "skip", children: "— Skip this column —" }),
                        Object.entries(FIELD_LABELS).filter(
                          ([k]) => k !== "skip"
                        ).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: key, children: label }, key))
                      ] })
                    ]
                  }
                )
              ] })
            ]
          },
          header
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Required:" }),
          " ",
          "Either",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Business Name" }),
          " ",
          "or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Contact Name" }),
          " ",
          "must be mapped for each row to be imported."
        ] })
      ] }),
      mappingError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2.5 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive shrink-0",
          "data-ocid": "csv-mapping-error",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: mappingError })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex-1 min-h-[44px]",
            onClick: () => {
              if (isBatched) {
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
            },
            "data-ocid": "csv-mapping-back-button",
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "flex-1 min-h-[44px]",
            onClick: handleProceedToPreview,
            "data-ocid": "csv-preview-button",
            children: "Preview Import"
          }
        )
      ] })
    ] }),
    step === "preview" && parseResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 min-h-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 shrink-0 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate max-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: fileName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          parseResult.rows.length,
          " rows"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-700 font-medium ml-auto", children: [
          validRows.length,
          " valid"
        ] }),
        parseResult.rows.filter((r) => !r.valid).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600 font-medium", children: [
          parseResult.rows.filter((r) => !r.valid).length,
          " skipped"
        ] })
      ] }),
      isBatched && selectedBatch !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-foreground shrink-0",
          "data-ocid": "csv-batch-info",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Importing batch ",
              selectedBatch,
              " of ",
              totalBatches,
              " —",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                rawData?.dataRows.length ?? 0,
                " rows"
              ] }),
              " ",
              "from ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fileName }),
              "."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto flex-1 rounded-lg border border-border min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[480px] w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/80 backdrop-blur-sm z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground w-8", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-medium text-muted-foreground hidden sm:table-cell", children: "Industry" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: previewRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-t border-border ${row.valid ? "" : "opacity-50 bg-amber-50/30"}`,
            "data-ocid": `csv-preview-row.${row.rawIndex}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: row.valid ? row.rawIndex : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[120px] truncate font-medium text-foreground", children: row.data.name || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: "empty" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[100px] truncate text-foreground", children: row.data.contactName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[100px] truncate text-foreground", children: row.data.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[120px] truncate text-foreground hidden sm:table-cell", children: row.industry || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) })
            ]
          },
          row.rawIndex
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 shrink-0 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground mb-1 block", children: "Stage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: stage,
                onValueChange: (v) => setStage(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-full",
                      "data-ocid": "csv-stage-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-muted-foreground mb-1 block", children: [
              "Assign to Pipeline",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            showNewPipeline ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: newPipelineName,
                  onChange: (e) => setNewPipelineName(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") void handleCreateNewPipeline();
                  },
                  placeholder: "New pipeline name…",
                  className: "flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring min-h-[38px]",
                  "data-ocid": "csv-new-pipeline-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => void handleCreateNewPipeline(),
                  disabled: !newPipelineName.trim() || createPipeline.isPending,
                  className: "px-2 py-1 rounded-md bg-primary text-white text-xs font-semibold disabled:opacity-50 min-h-[38px]",
                  "data-ocid": "csv-new-pipeline-save",
                  children: createPipeline.isPending ? "…" : "Add"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowNewPipeline(false);
                    setNewPipelineName("");
                  },
                  className: "px-2 py-1 rounded-md border border-border text-xs text-muted-foreground min-h-[38px]",
                  "data-ocid": "csv-new-pipeline-cancel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: importPipelineId?.toString() ?? "",
                  onValueChange: (v) => {
                    setImportPipelineId(v ? BigInt(v) : null);
                    if (v) setPipelineError(null);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: `w-full ${pipelineError ? "border-destructive ring-1 ring-destructive" : ""}`,
                        "data-ocid": "csv-pipeline-select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "— Select a pipeline —" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: p.id.toString(),
                          children: p.name
                        },
                        p.id.toString()
                      )),
                      pipelines.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-xs text-muted-foreground", children: "No pipelines yet — create one below." })
                    ] })
                  ]
                }
              ),
              pipelineError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs text-destructive flex items-center gap-1",
                  "data-ocid": "csv-pipeline-error",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 shrink-0" }),
                    pipelineError
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowNewPipeline(true),
                  className: "text-xs text-primary hover:underline flex items-center gap-1 mt-0.5",
                  "data-ocid": "csv-create-pipeline-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    "Create new pipeline"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1 min-h-[44px]",
              onClick: () => setStep("mapping"),
              "data-ocid": "csv-back-button",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "flex-1 min-h-[44px]",
              disabled: validRows.length === 0 || bulkImport.isPending || importPipelineId === null,
              onClick: handleImport,
              "data-ocid": "csv-import-button",
              title: importPipelineId === null ? "Select or create a pipeline first" : void 0,
              children: bulkImport.isPending ? "Importing…" : `Import ${validRows.length} Lead${validRows.length !== 1 ? "s" : ""}`
            }
          )
        ] })
      ] })
    ] }),
    step === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-5 py-10",
        "data-ocid": "csv-success-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-green-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
              importedCount,
              " lead",
              importedCount !== 1 ? "s" : "",
              " imported successfully"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your pipeline has been updated with the new leads." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleClose,
              className: "min-h-[44px] px-8",
              "data-ocid": "csv-done-button",
              children: "View My Pipeline"
            }
          )
        ]
      }
    )
  ] }) });
}
function AddLeadDialog({
  open,
  onClose,
  pipelines,
  defaultPipelineId
}) {
  const addLead = useAddLead();
  const createPipelineInline = useCreatePipeline();
  const [form, setForm] = reactExports.useState({
    pipelineStage: PipelineStage.Prospect,
    qualificationTags: [],
    notes: "",
    pipelineId: defaultPipelineId ?? void 0
  });
  const [showNewPipelineInline, setShowNewPipelineInline] = reactExports.useState(false);
  const [newPipelineNameInline, setNewPipelineNameInline] = reactExports.useState("");
  const handleAddLeadSubmit = async (e) => {
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
        pipelineId: form.pipelineId
      });
      ue.success("Lead added to your pipeline");
      onClose();
      setForm({
        pipelineStage: PipelineStage.Prospect,
        qualificationTags: [],
        notes: "",
        pipelineId: defaultPipelineId ?? void 0
      });
      setShowNewPipelineInline(false);
      setNewPipelineNameInline("");
    } catch {
      ue.error("Failed to add lead");
    }
  };
  const handleCreatePipelineInline = async () => {
    const name = newPipelineNameInline.trim();
    if (!name) return;
    try {
      const newP = await createPipelineInline.mutateAsync(name);
      if (newP && typeof newP === "object" && "id" in newP) {
        setForm((f) => ({ ...f, pipelineId: newP.id }));
      }
      setShowNewPipelineInline(false);
      setNewPipelineNameInline("");
      ue.success(`Pipeline "${name}" created`);
    } catch {
      ue.error("Failed to create pipeline");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-lg max-h-[92vh] overflow-y-auto p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base sm:text-lg font-semibold", children: "Add New Lead" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleAddLeadSubmit,
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.firstName ?? "",
                onChange: (e) => setForm({ ...form, firstName: e.target.value }),
                placeholder: "Jane",
                "data-ocid": "lead-first-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.lastName ?? "",
                onChange: (e) => setForm({ ...form, lastName: e.target.value }),
                placeholder: "Smith",
                "data-ocid": "lead-last-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.name ?? "",
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                placeholder: "Acme Plumbing Co.",
                "data-ocid": "lead-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.phone ?? "",
                onChange: (e) => setForm({ ...form, phone: e.target.value }),
                placeholder: "(555) 000-0000",
                "data-ocid": "lead-phone-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                type: "email",
                value: form.email ?? "",
                onChange: (e) => setForm({ ...form, email: e.target.value }),
                placeholder: "owner@business.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.city ?? "",
                onChange: (e) => setForm({ ...form, city: e.target.value }),
                placeholder: "Chicago"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "mt-1 min-h-[44px]",
                value: form.state ?? "",
                onChange: (e) => setForm({ ...form, state: e.target.value }),
                placeholder: "IL",
                maxLength: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Revenue Range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.revenueRange ?? "",
                onValueChange: (v) => setForm({ ...form, revenueRange: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1 min-h-[44px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select range" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REVENUE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                ]
              }
            )
          ] }),
          (pipelines.length > 0 || true) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Assign to Pipeline (optional)" }),
            showNewPipelineInline ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "flex-1 min-h-[44px]",
                  value: newPipelineNameInline,
                  onChange: (e) => setNewPipelineNameInline(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void handleCreatePipelineInline();
                    }
                  },
                  placeholder: "New pipeline name…",
                  "data-ocid": "add-lead-new-pipeline-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: () => void handleCreatePipelineInline(),
                  disabled: !newPipelineNameInline.trim() || createPipelineInline.isPending,
                  className: "shrink-0 min-h-[44px]",
                  "data-ocid": "add-lead-new-pipeline-save",
                  children: createPipelineInline.isPending ? "…" : "Add"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: () => {
                    setShowNewPipelineInline(false);
                    setNewPipelineNameInline("");
                  },
                  className: "shrink-0 min-h-[44px]",
                  "data-ocid": "add-lead-new-pipeline-cancel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.pipelineId?.toString() ?? "none",
                  onValueChange: (v) => setForm({
                    ...form,
                    pipelineId: v === "none" ? void 0 : BigInt(v)
                  }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "min-h-[44px]",
                        "data-ocid": "lead-pipeline-select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "No Pipeline" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No Pipeline" }),
                      pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: p.id.toString(),
                          children: p.name
                        },
                        p.id.toString()
                      ))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowNewPipelineInline(true),
                  className: "text-xs text-primary hover:underline flex items-center gap-1",
                  "data-ocid": "add-lead-create-pipeline-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    "Create new pipeline"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                className: "w-full sm:w-auto min-h-[44px]",
                "data-ocid": "add-lead-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: addLead.isPending,
                className: "w-full sm:w-auto min-h-[44px]",
                "data-ocid": "add-lead-submit",
                children: addLead.isPending ? "Adding…" : "Add Lead"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function AiSearchBar({
  leads,
  onResults,
  onClear
}) {
  const [query, setQuery] = reactExports.useState("");
  const aiSearch = useAiSearchLeads();
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const results = await aiSearch.mutateAsync({ searchQuery: query, leads });
      onResults(results, query);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI search failed.";
      ue.error(msg);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 space-y-3",
      "data-ocid": "ai-search-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            "AI Search",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground normal-case tracking-normal ml-0.5", children: "— natural language search across your leads" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "flex-1 min-h-[44px] bg-card border-border focus:ring-primary/40",
              placeholder: "Try: contractors in Austin, leads not yet contacted…",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onKeyDown: handleKeyDown,
              disabled: aiSearch.isPending,
              "data-ocid": "ai-search-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "default",
              onClick: handleSearch,
              disabled: !query.trim() || aiSearch.isPending,
              className: "shrink-0 min-h-[44px]",
              "data-ocid": "ai-search-button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                "Search"
              ] })
            }
          )
        ] }),
        aiSearch.isPending,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors",
            "data-ocid": "ai-search-close",
            children: "Hide AI Search"
          }
        )
      ]
    }
  );
}
function ViewToggle({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ToggleGroup,
    {
      type: "single",
      value,
      onValueChange: (v) => {
        if (v) onChange(v);
      },
      variant: "outline",
      size: "sm",
      className: "shrink-0",
      "data-ocid": "leads-view-toggle",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToggleGroupItem,
          {
            value: "tile",
            "aria-label": "Tile view",
            className: "min-h-[44px] px-3",
            "data-ocid": "leads-view-tile",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToggleGroupItem,
          {
            value: "card",
            "aria-label": "Card view",
            className: "min-h-[44px] px-3",
            "data-ocid": "leads-view-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToggleGroupItem,
          {
            value: "list",
            "aria-label": "List view",
            className: "min-h-[44px] px-3",
            "data-ocid": "leads-view-list",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
function TileCard({
  lead,
  selectionMode,
  selected,
  onSelect
}) {
  const [showSmsSend, setShowSmsSend] = reactExports.useState(false);
  const isDnc = lead.isDnc;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative group ${isDnc ? "opacity-75" : ""}`, children: [
      selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            onSelect(lead.id);
          },
          className: "absolute top-2 left-2 z-10 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-colors bg-card min-h-[24px]",
          style: {
            borderColor: selected ? "oklch(0.56 0.16 44)" : void 0,
            backgroundColor: selected ? "oklch(0.56 0.16 44)" : void 0
          },
          "aria-label": selected ? "Deselect lead" : "Select lead",
          "data-ocid": "lead-select-checkbox",
          children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/leads/$id",
          params: { id: lead.id.toString() },
          className: "block",
          "data-ocid": "pipeline-card",
          onClick: (e) => selectionMode && e.preventDefault(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-card border rounded-xl p-3 h-full flex flex-col gap-2 hover:border-primary/40 hover:shadow-md transition-all duration-200 active:scale-[0.99] ${isDnc ? "border-destructive/30" : selected ? "border-primary ring-2 ring-primary/20" : "border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors flex-1 min-w-0", children: getLeadDisplayName(lead) }),
                  isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white", children: "DNC" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stage: lead.pipelineStage })
                ] }),
                lead.industry && /* @__PURE__ */ jsxRuntimeExports.jsx(IndustryBadge, { industry: lead.industry }),
                lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.phone }),
                isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-auto pt-2 border-t border-destructive/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-destructive", children: "No Contact" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-auto pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        const phoneLinkOn = isWindowsDesktop();
                        handlePhoneCall(
                          lead.phone,
                          phoneLinkOn,
                          isGoogleVoiceEnabled()
                        );
                      },
                      className: "flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary",
                      title: "Call",
                      "data-ocid": "call-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSmsSend(true);
                      },
                      className: "flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary",
                      title: "Text",
                      "data-ocid": "text-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
                    }
                  ),
                  lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `mailto:${encodeURIComponent(lead.email)}`,
                      onClick: (e) => e.stopPropagation(),
                      className: "flex-1 flex items-center justify-center py-2 rounded-lg hover:bg-primary/10 transition-colors min-h-[40px] text-muted-foreground hover:text-primary",
                      title: "Email",
                      "data-ocid": "email-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ]
            }
          )
        }
      )
    ] }),
    showSmsSend && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsQuickSendPopover,
      {
        leadName: getLeadDisplayName(lead),
        phone: lead.phone,
        isDnc,
        onClose: () => setShowSmsSend(false)
      }
    )
  ] });
}
function LeadCard({
  lead,
  selectionMode,
  selected,
  onSelect
}) {
  const [showSmsSend, setShowSmsSend] = reactExports.useState(false);
  const isDnc = lead.isDnc;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative group ${isDnc ? "opacity-80" : ""}`, children: [
      selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            onSelect(lead.id);
          },
          className: "absolute top-3 left-3 z-10 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-colors bg-card",
          style: {
            borderColor: selected ? "oklch(0.56 0.16 44)" : void 0,
            backgroundColor: selected ? "oklch(0.56 0.16 44)" : void 0
          },
          "aria-label": selected ? "Deselect lead" : "Select lead",
          "data-ocid": "lead-select-checkbox",
          children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/leads/$id",
          params: { id: lead.id.toString() },
          className: "group block",
          "data-ocid": "pipeline-card",
          onClick: (e) => selectionMode && e.preventDefault(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-card border rounded-xl p-4 h-full flex flex-col gap-3 hover:border-primary/40 hover:shadow-md transition-all duration-200 active:scale-[0.99] ${isDnc ? "border-destructive/30" : selected ? "border-primary ring-2 ring-primary/20" : "border-border"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors", children: getLeadDisplayName(lead) }),
                    (lead.firstName || lead.lastName) && lead.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: lead.name })
                  ] }),
                  isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full bg-destructive text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3 h-3" }),
                    "DNC"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stage: lead.pipelineStage })
                ] }),
                lead.industry && /* @__PURE__ */ jsxRuntimeExports.jsx(IndustryBadge, { industry: lead.industry }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: lead.phone })
                  ] }),
                  lead.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: lead.email })
                  ] })
                ] }),
                (lead.city || lead.state) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: [lead.city, lead.state].filter(Boolean).join(", ") })
                ] }),
                lead.followUpDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                    "Follow-up: ",
                    lead.followUpDate
                  ] })
                ] }),
                isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-auto pt-2 border-t border-destructive/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-destructive", children: "DNC — No Contact Allowed" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-auto pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const phoneLinkOn = isWindowsDesktop();
                        handlePhoneCall(
                          lead.phone,
                          phoneLinkOn,
                          isGoogleVoiceEnabled()
                        );
                      },
                      className: "flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]",
                      title: "Call",
                      "data-ocid": "call-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Call" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSmsSend(true);
                      },
                      className: "flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]",
                      title: "Text",
                      "data-ocid": "text-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Text" })
                      ]
                    }
                  ),
                  lead.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `mailto:${encodeURIComponent(lead.email)}`,
                      onClick: (e) => e.stopPropagation(),
                      className: "flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary py-2.5 rounded-lg hover:bg-primary/10 transition-colors min-h-[44px]",
                      title: "Email",
                      "data-ocid": "email-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email" })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        }
      )
    ] }),
    showSmsSend && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsQuickSendPopover,
      {
        leadName: getLeadDisplayName(lead),
        phone: lead.phone,
        isDnc,
        onClose: () => setShowSmsSend(false)
      }
    )
  ] });
}
function LeadListRow({
  lead,
  index,
  selectionMode,
  selected,
  onSelect
}) {
  const navigate = useNavigate();
  const [showSmsSend, setShowSmsSend] = reactExports.useState(false);
  const isDnc = lead.isDnc;
  const handleRowClick = () => {
    if (selectionMode) {
      onSelect(lead.id);
      return;
    }
    navigate({ to: "/leads/$id", params: { id: lead.id.toString() } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: `border-t border-border transition-colors cursor-pointer group ${isDnc ? "bg-destructive/3 hover:bg-destructive/5" : selected ? "bg-primary/5 hover:bg-primary/8" : "hover:bg-muted/30"}`,
        onClick: handleRowClick,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") handleRowClick();
        },
        tabIndex: 0,
        "data-ocid": `leads-list.item.${index + 1}`,
        children: [
          selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
              style: {
                borderColor: selected ? "oklch(0.56 0.16 44)" : void 0,
                backgroundColor: selected ? "oklch(0.56 0.16 44)" : void 0
              },
              children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-white" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[140px] max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors", children: getLeadDisplayName(lead) }),
              (lead.firstName || lead.lastName) && lead.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.name })
            ] }),
            isDnc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-destructive text-white", children: "DNC" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[120px] max-w-[160px] hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate block", children: lead.name || "" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[120px] whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: lead.phone || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[160px] max-w-[200px] hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate block", children: lead.email || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: [lead.city, lead.state].filter(Boolean).join(", ") || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[100px] hidden xl:table-cell", children: lead.industry ? /* @__PURE__ */ jsxRuntimeExports.jsx(IndustryBadge, { industry: lead.industry }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stage: lead.pipelineStage }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[100px] whitespace-nowrap hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: lead.followUpDate || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 whitespace-nowrap", children: isDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-destructive px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5 shrink-0" }),
            "DNC"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  const phoneLinkOn = isWindowsDesktop();
                  handlePhoneCall(
                    lead.phone,
                    phoneLinkOn,
                    isGoogleVoiceEnabled()
                  );
                },
                className: "p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center",
                title: "Call",
                "data-ocid": "call-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowSmsSend(true);
                },
                className: "p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center",
                title: "Text",
                "data-ocid": "text-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
              }
            ),
            lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `mailto:${encodeURIComponent(lead.email)}`,
                onClick: (e) => e.stopPropagation(),
                className: "p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center",
                title: "Email",
                "data-ocid": "email-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ]
      }
    ),
    showSmsSend && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SmsQuickSendPopover,
      {
        leadName: getLeadDisplayName(lead),
        phone: lead.phone,
        isDnc,
        onClose: () => setShowSmsSend(false)
      }
    )
  ] });
}
function LeadListView({
  leads,
  selectionMode,
  selectedIds,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 w-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[140px]", children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell min-w-[120px]", children: "Business" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[120px]", children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell min-w-[160px]", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]", children: "City/State" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell min-w-[100px]", children: "Industry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]", children: "Stage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell min-w-[100px]", children: "Follow-Up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right min-w-[120px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadListRow,
      {
        lead,
        index: i,
        selectionMode,
        selected: selectedIds.has(lead.id.toString()),
        onSelect
      },
      lead.id.toString()
    )) })
  ] }) });
}
function MyPipelineTab({
  onAddLead,
  onImportCsv,
  selectedPipelineId
}) {
  const { data: leads, isLoading } = useLeads(selectedPipelineId);
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const [search, setSearch] = reactExports.useState("");
  const [stageFilter, setStageFilter] = reactExports.useState("all");
  const [industryFilter, setIndustryFilter] = reactExports.useState("all");
  const [showAiSearch, setShowAiSearch] = reactExports.useState(false);
  const [aiResults, setAiResults] = reactExports.useState(null);
  const [aiQuery, setAiQuery] = reactExports.useState("");
  const [viewMode, setViewMode] = reactExports.useState(getStoredView);
  const [selectionMode, setSelectionMode] = reactExports.useState(false);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [showDncConfirm, setShowDncConfirm] = reactExports.useState(false);
  const bulkDelete = useBulkDeleteLeads();
  const updateLeadDnc = useUpdateLeadDnc();
  const [hideDnc, setHideDnc] = reactExports.useState(() => {
    try {
      return localStorage.getItem("tele-blast-hide-dnc") === "true";
    } catch {
      return false;
    }
  });
  const [dncExpanded, setDncExpanded] = reactExports.useState(true);
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
  const handleViewChange = (v) => {
    setViewMode(v);
    setStoredView(v);
  };
  const allLeadsData = leads ?? [];
  const nonDncLeads = allLeadsData.filter((l) => !l.isDnc);
  const dncLeads = allLeadsData.filter((l) => l.isDnc);
  const availableIndustries = reactExports.useMemo(() => {
    return [
      ...new Set(allLeadsData.map((l) => l.industry).filter(Boolean))
    ].sort();
  }, [allLeadsData]);
  const filtered = reactExports.useMemo(() => {
    if (aiResults !== null) return aiResults.filter((l) => !l.isDnc);
    return nonDncLeads.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch = l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.industry.toLowerCase().includes(q);
      const matchStage = stageFilter === "all" || l.pipelineStage === stageFilter;
      const matchIndustry = industryFilter === "all" || l.industry === industryFilter;
      return matchSearch && matchStage && matchIndustry;
    });
  }, [nonDncLeads, search, stageFilter, industryFilter, aiResults]);
  const handleAiResults = (results, query) => {
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
  const toggleSelect = reactExports.useCallback((id) => {
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
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setSelectedIds(new Set(filtered.map((l) => l.id.toString())));
    }
  };
  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds).map((s) => BigInt(s));
    try {
      await bulkDelete.mutateAsync(ids);
      ue.success(`${ids.length} lead${ids.length !== 1 ? "s" : ""} deleted`);
      exitSelectionMode();
      setShowDeleteConfirm(false);
    } catch {
      ue.error("Failed to delete leads");
    }
  };
  const handleBulkDnc = async () => {
    const ids = Array.from(selectedIds).map((s) => BigInt(s));
    try {
      await Promise.all(
        ids.map((id) => updateLeadDnc.mutateAsync({ leadId: id, isDnc: true }))
      );
      ue.success(
        `${ids.length} lead${ids.length !== 1 ? "s" : ""} marked as Do Not Call`
      );
      exitSelectionMode();
      setShowDncConfirm(false);
    } catch {
      ue.error("Failed to mark leads as DNC");
    }
  };
  const renderLeads = (leadsToShow, forDnc = false) => {
    if (viewMode === "list") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        LeadListView,
        {
          leads: leadsToShow,
          selectionMode: selectionMode && !forDnc,
          selectedIds,
          onSelect: toggleSelect
        }
      );
    }
    if (viewMode === "tile") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: leadsToShow.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TileCard,
        {
          lead,
          selectionMode: selectionMode && !forDnc,
          selected: selectedIds.has(lead.id.toString()),
          onSelect: toggleSelect
        },
        lead.id.toString()
      )) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: leadsToShow.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadCard,
      {
        lead,
        selectionMode: selectionMode && !forDnc,
        selected: selectedIds.has(lead.id.toString()),
        onSelect: toggleSelect
      },
      lead.id.toString()
    )) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pb-24 sm:pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 items-center", children: selectionMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleSelectAll,
          className: "flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 transition-colors min-h-[44px]",
          "data-ocid": "leads-select-all-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
                style: {
                  borderColor: selectedIds.size === filtered.length && filtered.length > 0 ? "oklch(0.56 0.16 44)" : void 0,
                  backgroundColor: selectedIds.size === filtered.length && filtered.length > 0 ? "oklch(0.56 0.16 44)" : void 0
                },
                children: selectedIds.size === filtered.length && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: selectedIds.size === filtered.length && filtered.length > 0 ? "Deselect All" : "Select All" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground flex-1", children: selectedIds.size > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        selectedIds.size,
        " selected"
      ] }) : "Tap leads to select" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: exitSelectionMode,
          className: "flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground min-h-[44px] px-3",
          "data-ocid": "leads-cancel-selection",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
            "Cancel"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9 min-h-[44px]",
            placeholder: "Search name, phone, city, industry…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "pipeline-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ViewToggle, { value: viewMode, onChange: handleViewChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelectionMode(true),
          className: "shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px]",
          "data-ocid": "leads-selection-mode-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Select" })
          ]
        }
      )
    ] }) }),
    hasAi && !showAiSearch && !selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowAiSearch(true),
        className: "flex items-center gap-1.5 text-xs font-medium transition-colors py-1 text-primary hover:text-primary/80",
        "data-ocid": "ai-search-toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "Try AI Search"
        ]
      }
    ),
    showAiSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AiSearchBar,
      {
        leads: allLeadsData,
        onResults: handleAiResults,
        onClear: hideAiSearch
      }
    ),
    aiResults !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between gap-2 bg-primary/8 border border-primary/20 rounded-lg px-3 py-2",
        "data-ocid": "ai-results-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              aiResults.length,
              " match",
              aiResults.length !== 1 ? "es" : "",
              " found"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground hidden sm:inline truncate max-w-[240px]", children: [
              'for "',
              aiQuery,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: clearAiResults,
              className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 min-h-[32px] px-2",
              "data-ocid": "ai-results-clear",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                "Clear"
              ]
            }
          )
        ]
      }
    ),
    aiResults === null && !selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-1",
        style: { scrollbarWidth: "none" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: stageFilter, onValueChange: setStageFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "min-w-[130px] min-h-[44px] shrink-0",
                "data-ocid": "stage-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Stages" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Stages" }),
              PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: industryFilter, onValueChange: setIndustryFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "min-w-[140px] min-h-[44px] shrink-0",
                "data-ocid": "industry-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Industries" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Industries" }),
              availableIndustries.map((ind) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ind, children: ind }, ind))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleHideDnc,
              className: `shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold min-h-[44px] transition-colors ${hideDnc ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
              title: hideDnc ? "Show DNC leads" : "Hide DNC leads",
              "data-ocid": "leads-hide-dnc-toggle",
              children: hideDnc ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "DNC Hidden" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "DNC" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "default",
              onClick: onImportCsv,
              className: "shrink-0 min-h-[44px]",
              "data-ocid": "import-csv-button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "w-4 h-4 sm:mr-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Import CSV" })
              ]
            }
          )
        ]
      }
    ),
    isLoading ? viewMode === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `grid gap-4 ${viewMode === "tile" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`,
        children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: viewMode === "tile" ? "h-32 rounded-xl" : "h-44 rounded-xl"
          },
          k
        ))
      }
    ) : filtered.length === 0 && aiResults !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3 bg-card rounded-xl border border-primary/20",
        "data-ocid": "ai-no-results",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No matches found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              `The AI search didn't find any leads matching "`,
              aiQuery,
              '". Try rephrasing your query.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: clearAiResults,
              className: "min-h-[44px]",
              "data-ocid": "ai-no-results-clear",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
                "Clear AI Search"
              ]
            }
          )
        ]
      }
    ) : filtered.length === 0 && nonDncLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 gap-4 bg-card rounded-xl border border-border",
        "data-ocid": "pipeline-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-12 h-12 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No leads yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: selectedPipelineId !== null ? "No leads in this pipeline. Import a CSV or add leads manually." : "Upload a CSV or add leads manually to get started." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch gap-2 w-full px-6 sm:flex-row sm:w-auto sm:px-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: onImportCsv,
                className: "min-h-[44px]",
                "data-ocid": "empty-import-csv",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "w-4 h-4 mr-1.5" }),
                  "Import CSV"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: onAddLead,
                size: "sm",
                className: "min-h-[44px]",
                "data-ocid": "empty-add-lead",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                  "Add Lead"
                ]
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      filtered.length > 0 ? renderLeads(filtered) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 gap-3 bg-card rounded-xl border border-border",
          "data-ocid": "pipeline-filtered-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-10 h-10 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No leads match your filters" })
          ]
        }
      ),
      !hideDnc && dncLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", "data-ocid": "leads-dnc-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDncExpanded((v) => !v),
            className: "flex items-center gap-3 w-full px-4 py-3 rounded-xl border-l-4 border-destructive bg-destructive/5 border-t border-r border-b border-destructive/20 mb-0 text-left",
            "data-ocid": "leads-dnc-section-header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-4 h-4 text-destructive shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-destructive text-sm flex-1", children: "Do Not Call" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-destructive bg-destructive/15 rounded-full px-2.5 py-0.5", children: dncLeads.length }),
              dncExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-destructive shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-destructive shrink-0" })
            ]
          }
        ),
        dncExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 border-l-4 border-destructive/30 pl-2", children: renderLeads(dncLeads, true) })
      ] })
    ] }),
    selectionMode && selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+8px)] sm:bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50 flex items-center gap-2 bg-foreground text-background px-4 py-3 rounded-2xl shadow-2xl",
        "data-ocid": "leads-bulk-action-bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold shrink-0", children: [
            selectedIds.size,
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center justify-end gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowDncConfirm(true),
                className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold min-h-[40px] transition-colors",
                style: { background: "oklch(0.56 0.16 44)", color: "white" },
                "data-ocid": "leads-bulk-dnc-button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5" }),
                  "Mark DNC (",
                  selectedIds.size,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowDeleteConfirm(true),
                className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-destructive text-white text-xs font-semibold min-h-[40px] transition-colors hover:bg-destructive/90",
                "data-ocid": "leads-bulk-delete-button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  "Delete (",
                  selectedIds.size,
                  ")"
                ]
              }
            )
          ] })
        ]
      }
    ),
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 px-4",
        "data-ocid": "leads-delete-confirm-dialog",
        onClick: (e) => e.target === e.currentTarget && setShowDeleteConfirm(false),
        onKeyDown: (e) => e.key === "Escape" && setShowDeleteConfirm(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-foreground text-base", children: [
                "Delete ",
                selectedIds.size,
                " Lead",
                selectedIds.size !== 1 ? "s" : "",
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This cannot be undone." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Are you sure you want to permanently delete ",
            selectedIds.size,
            " ",
            "lead",
            selectedIds.size !== 1 ? "s" : "",
            "? This action cannot be undone."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 min-h-[44px]",
                onClick: () => setShowDeleteConfirm(false),
                disabled: bulkDelete.isPending,
                "data-ocid": "leads-delete-cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 min-h-[44px] bg-destructive text-white hover:bg-destructive/90 font-semibold",
                onClick: handleBulkDelete,
                disabled: bulkDelete.isPending,
                "data-ocid": "leads-delete-confirm-button",
                children: bulkDelete.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    showDncConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 px-4",
        "data-ocid": "leads-dnc-confirm-dialog",
        onClick: (e) => e.target === e.currentTarget && setShowDncConfirm(false),
        onKeyDown: (e) => e.key === "Escape" && setShowDncConfirm(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-5 h-5 text-amber-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-foreground text-base", children: [
                "Mark ",
                selectedIds.size,
                " Lead",
                selectedIds.size !== 1 ? "s" : "",
                " as DNC?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Do Not Call" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Mark ",
            selectedIds.size,
            " lead",
            selectedIds.size !== 1 ? "s" : "",
            " as Do Not Call? They will be moved to the DNC section and blocked from all outreach."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 min-h-[44px]",
                onClick: () => setShowDncConfirm(false),
                disabled: updateLeadDnc.isPending,
                "data-ocid": "leads-dnc-cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1 min-h-[44px]",
                onClick: handleBulkDnc,
                disabled: updateLeadDnc.isPending,
                "data-ocid": "leads-dnc-confirm-button",
                children: updateLeadDnc.isPending ? "Marking…" : "Mark DNC"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function LeadsPage() {
  const { data: allLeads } = useLeads();
  const { data: pipelines = [] } = useGetPipelines();
  const createPipelinePage = useCreatePipeline();
  const [selectedPipelineId, setSelectedPipelineId] = reactExports.useState(
    null
  );
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showCsvImport, setShowCsvImport] = reactExports.useState(false);
  const [showManagePipelines, setShowManagePipelines] = reactExports.useState(false);
  const [showQuickPipeline, setShowQuickPipeline] = reactExports.useState(false);
  const [quickPipelineName, setQuickPipelineName] = reactExports.useState("");
  const handleQuickCreatePipeline = async () => {
    const name = quickPipelineName.trim();
    if (!name) return;
    try {
      const newP = await createPipelinePage.mutateAsync(name);
      const pipelineId = newP != null && typeof newP === "object" && "id" in newP ? newP.id : null;
      if (pipelineId != null) setSelectedPipelineId(pipelineId);
      setQuickPipelineName("");
      setShowQuickPipeline(false);
      ue.success(`Pipeline "${name}" created`);
    } catch {
      ue.error("Failed to create pipeline");
    }
  };
  const handleCsvSuccess = (count) => {
    ue.success(
      `${count} lead${count !== 1 ? "s" : ""} imported successfully`
    );
  };
  const displayCount = selectedPipelineId === null ? allLeads?.length ?? 0 : (allLeads ?? []).filter((l) => l.pipelineId === selectedPipelineId).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 sm:mb-5 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground", children: "Leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          displayCount,
          " leads",
          selectedPipelineId !== null && pipelines.length > 0 ? ` in ${pipelines.find((p) => p.id === selectedPipelineId)?.name ?? "pipeline"}` : " in your pipeline"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setShowQuickPipeline(true),
            className: "hidden sm:flex min-h-[44px] px-3 gap-1.5",
            "data-ocid": "leads-new-pipeline-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "w-4 h-4" }),
              "New Pipeline"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowAdd(true),
            className: "hidden sm:flex min-h-[44px] px-4 gap-1.5",
            "data-ocid": "add-lead-trigger",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Lead"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PipelineSelector,
      {
        pipelines,
        selectedId: selectedPipelineId,
        onChange: setSelectedPipelineId,
        onManage: () => setShowManagePipelines(true)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MyPipelineTab,
      {
        onAddLead: () => setShowAdd(true),
        onImportCsv: () => setShowCsvImport(true),
        selectedPipelineId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddLeadDialog,
      {
        open: showAdd,
        onClose: () => setShowAdd(false),
        pipelines,
        defaultPipelineId: selectedPipelineId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CsvImportDialog,
      {
        open: showCsvImport,
        onClose: () => setShowCsvImport(false),
        onSuccess: handleCsvSuccess,
        pipelines,
        defaultPipelineId: selectedPipelineId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManagePipelinesDialog,
      {
        open: showManagePipelines,
        onClose: () => setShowManagePipelines(false),
        pipelines
      }
    ),
    showQuickPipeline && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4",
        "data-ocid": "leads-new-pipeline-overlay",
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            setShowQuickPipeline(false);
            setQuickPipelineName("");
          }
        },
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            setShowQuickPipeline(false);
            setQuickPipelineName("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Create New Pipeline" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: quickPipelineName,
              onChange: (e) => setQuickPipelineName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") void handleQuickCreatePipeline();
                if (e.key === "Escape") {
                  setShowQuickPipeline(false);
                  setQuickPipelineName("");
                }
              },
              placeholder: "Pipeline name…",
              className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]",
              ref: (el) => {
                if (el) el.focus();
              },
              "data-ocid": "leads-quick-pipeline-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowQuickPipeline(false);
                  setQuickPipelineName("");
                },
                className: "flex-1 min-h-[44px] rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": "leads-quick-pipeline-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => void handleQuickCreatePipeline(),
                disabled: !quickPipelineName.trim() || createPipelinePage.isPending,
                className: "flex-1 min-h-[44px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 transition-opacity flex items-center justify-center gap-1.5",
                "data-ocid": "leads-quick-pipeline-create",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  createPipelinePage.isPending ? "Creating…" : "Create"
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setShowAdd(true),
        className: "sm:hidden fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px)+16px)] right-4 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform",
        style: { background: "oklch(0.56 0.16 44)" },
        "aria-label": "Add lead",
        "data-ocid": "leads-fab",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6 text-white" })
      }
    )
  ] });
}
export {
  LeadsPage as default
};
