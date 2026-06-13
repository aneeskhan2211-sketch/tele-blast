import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSearch } from "@tanstack/react-router";
import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  RefreshCw,
  Save,
  ScrollText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TokenBalance } from "../components/TokenBalance";
import { useAiGenerateColdCallScriptForLead } from "../hooks/useAi";
import {
  type ColdCallScriptConfig,
  useColdCallConfig,
  useSaveColdCallConfig,
} from "../hooks/useColdCallConfig";
import { useLeads } from "../hooks/useLeads";
import { tierHasFeature, useSubscription } from "../hooks/useSubscription";
import type { Lead } from "../types";

/* ─── Script section parser ─────────────────────────────────────── */

interface ScriptSection {
  title: string;
  content: string;
}

function parseScriptSections(text: string): ScriptSection[] {
  const regex = /===\s*([^=]+?)\s*===/g;
  const sections: ScriptSection[] = [];
  const parts = text.split(regex);

  // parts: [beforeFirst, title1, content1, title2, content2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const content = (parts[i + 1] ?? "").trim();
    if (title) sections.push({ title, content });
  }

  // If no sections found, return the whole text as a single section
  if (sections.length === 0 && text.trim()) {
    sections.push({ title: "Script", content: text.trim() });
  }

  return sections;
}

const SECTION_COLORS: Record<string, string> = {
  GREETING: "border-primary/40 bg-primary/5",
  "PRE-QUALIFYING": "border-amber-500/40 bg-amber-500/5",
  "THE PITCH": "border-sky-500/40 bg-sky-500/5",
  "A/B CHOICE CLOSE": "border-emerald-500/40 bg-emerald-500/5",
};

const SECTION_HEADER_COLORS: Record<string, string> = {
  GREETING: "text-primary",
  "PRE-QUALIFYING": "text-amber-600",
  "THE PITCH": "text-sky-600",
  "A/B CHOICE CLOSE": "text-emerald-600",
};

function getSectionColor(title: string, prop: "border" | "header"): string {
  const key = title.toUpperCase().trim();
  if (prop === "border") {
    return SECTION_COLORS[key] ?? "border-border bg-muted/20";
  }
  return SECTION_HEADER_COLORS[key] ?? "text-foreground";
}

/* ─── LeadSelector ──────────────────────────────────────────────── */

function LeadSelector({
  leads,
  selectedId,
  onSelect,
}: {
  leads: Lead[];
  selectedId: bigint | null;
  onSelect: (id: bigint | null) => void;
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? leads.filter((l) => {
        const q = search.toLowerCase();
        return (
          l.name?.toLowerCase().includes(q) ||
          `${l.firstName ?? ""} ${l.lastName ?? ""}`.toLowerCase().includes(q)
        );
      })
    : leads;

  const selectedLead = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="space-y-2" data-ocid="cold-call-script.lead_selector">
      <Label className="text-sm font-semibold text-foreground">
        Select a Lead
      </Label>
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search leads by name…"
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] transition-all"
        data-ocid="cold-call-script.lead_search_input"
        aria-label="Search leads"
      />

      {selectedLead && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/5 text-sm">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-primary font-medium truncate min-w-0">
            {selectedLead.name ||
              `${selectedLead.firstName ?? ""} ${selectedLead.lastName ?? ""}`.trim() ||
              "Unnamed Lead"}
          </span>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors shrink-0 text-xs"
            data-ocid="cold-call-script.clear_lead_button"
          >
            Change
          </button>
        </div>
      )}

      {!selectedLead && (
        <div
          className="max-h-52 overflow-y-auto rounded-lg border border-border bg-card divide-y divide-border"
          data-ocid="cold-call-script.lead_list"
        >
          {filtered.length === 0 ? (
            <div
              className="py-8 text-center text-sm text-muted-foreground"
              data-ocid="cold-call-script.lead_list_empty_state"
            >
              {search ? "No leads match your search" : "No leads available"}
            </div>
          ) : (
            filtered.slice(0, 50).map((lead, i) => (
              <button
                key={String(lead.id)}
                type="button"
                onClick={() => {
                  onSelect(lead.id);
                  setSearch("");
                }}
                className="w-full flex flex-col px-3 py-2.5 text-left hover:bg-muted/50 active:bg-muted transition-colors min-h-[48px] justify-center"
                data-ocid={`cold-call-script.lead_item.${i + 1}`}
              >
                <span className="text-sm font-medium text-foreground truncate">
                  {lead.name ||
                    `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() ||
                    "Unnamed Lead"}
                </span>
                {(lead.firstName || lead.lastName) &&
                  lead.name &&
                  lead.name !==
                    `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() && (
                    <span className="text-xs text-muted-foreground truncate">
                      {`${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim()}
                    </span>
                  )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─── ScriptSectionCard ─────────────────────────────────────────── */

function ScriptSectionCard({
  section,
  index,
}: {
  section: ScriptSection;
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(section.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <div
      className={`rounded-xl border p-4 space-y-2 ${getSectionColor(section.title, "border")}`}
      data-ocid={`cold-call-script.section_card.${index + 1}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3
          className={`text-sm font-bold uppercase tracking-wider ${getSectionColor(section.title, "header")}`}
        >
          {section.title}
        </h3>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[32px] shrink-0 text-muted-foreground hover:text-foreground"
          data-ocid={`cold-call-script.copy_section_button.${index + 1}`}
          aria-label={`Copy ${section.title} section`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
        {section.content}
      </p>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */

type SearchParams = { leadId?: string };

export default function ColdCallScriptPage() {
  const searchParams = useSearch({ strict: false }) as SearchParams;
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");

  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: savedConfig, isLoading: configLoading } = useColdCallConfig();
  const saveColdCallConfig = useSaveColdCallConfig();
  const generateScript = useAiGenerateColdCallScriptForLead();

  // Config form state
  const [whatYouAreSelling, setWhatYouAreSelling] = useState("");
  const [preQualifyingNeeds, setPreQualifyingNeeds] = useState("");
  const [packagesOrServices, setPackagesOrServices] = useState("");
  const [goalType, setGoalType] = useState<string>("Get an Appointment");
  const [configSaved, setConfigSaved] = useState(false);

  // Lead & script state
  const [selectedLeadId, setSelectedLeadId] = useState<bigint | null>(null);
  const [scriptSections, setScriptSections] = useState<ScriptSection[]>([]);
  const [rawScript, setRawScript] = useState<string | null>(null);
  const [copiedFull, setCopiedFull] = useState(false);

  // Populate config form from saved config
  useEffect(() => {
    if (savedConfig) {
      setWhatYouAreSelling(savedConfig.whatYouAreSelling ?? "");
      setPreQualifyingNeeds(savedConfig.preQualifyingNeeds ?? "");
      setPackagesOrServices(savedConfig.packagesOrServices ?? "");
      setGoalType(savedConfig.goalType ?? "Get an Appointment");
    }
  }, [savedConfig]);

  // Pre-select lead from URL param
  useEffect(() => {
    if (searchParams.leadId && leads.length > 0) {
      try {
        const parsed = BigInt(searchParams.leadId);
        const exists = leads.find((l) => l.id === parsed);
        if (exists) setSelectedLeadId(parsed);
      } catch {
        // invalid leadId param — ignore
      }
    }
  }, [searchParams.leadId, leads]);

  const handleSaveConfig = async () => {
    const config: ColdCallScriptConfig = {
      whatYouAreSelling,
      preQualifyingNeeds,
      packagesOrServices,
      goalType,
    };
    try {
      await saveColdCallConfig.mutateAsync(config);
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
      toast.success("Script settings saved!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handleGenerate = async () => {
    setScriptSections([]);
    setRawScript(null);
    try {
      // If a lead is selected, generate personalized script; otherwise use a placeholder lead ID (0n = generic)
      const leadId = selectedLeadId ?? BigInt(0);
      const result = await generateScript.mutateAsync(leadId);
      setRawScript(result);
      setScriptSections(parseScriptSections(result));
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to generate script.";
      if (
        msg.includes("API key") ||
        msg.includes("not configured") ||
        msg.includes("administrator")
      ) {
        toast.error(
          "AI not configured — please add your Anthropic API key in the Admin Panel > AI Settings.",
        );
      } else if (msg.includes("tokens")) {
        toast.error(msg, {
          action: {
            label: "Buy Credits",
            onClick: () => window.open("/pricing", "_blank"),
          },
        });
      } else {
        toast.error(msg);
      }
    }
  };

  const handleCopyFull = async () => {
    if (!rawScript) return;
    try {
      await navigator.clipboard.writeText(rawScript);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  if (configLoading || leadsLoading) {
    return (
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden">
      {/* Page header */}
      <div
        className="flex items-center gap-3"
        data-ocid="cold-call-script.page"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <ScrollText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Cold Call Script Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            {hasAi
              ? "Configure your script settings and generate personalized scripts for each lead"
              : "Use the form to write and save your own cold call script"}
          </p>
        </div>
      </div>
      {hasAi && (
        <div>
          <TokenBalance showLtai={false} />
        </div>
      )}

      {/* ── $30 plan: informational notice ──────────────────────── */}
      {!hasAi && (
        <div
          className="rounded-xl border border-border bg-card px-5 py-4 flex items-start gap-3"
          data-ocid="cold-call-script.plan_notice"
        >
          <ScrollText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground">
              Cold Call Script Builder
            </p>
            <p className="text-sm text-muted-foreground">
              Use the form to write your own script. AI script generation is
              available on the{" "}
              <a
                href="/pricing"
                className="font-semibold hover:underline"
                style={{ color: "oklch(0.56 0.16 44)" }}
              >
                Pro+AI plan ($45/month)
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* ── Section A: AI Setup (AI plans only) ─────────────────── */}
      {hasAi && (
        <section
          className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
          data-ocid="cold-call-script.ai_setup_card"
        >
          <div
            className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
            style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              1
            </div>
            <h2 className="text-sm font-bold text-foreground">
              Script Settings
            </h2>
            <span className="ml-auto text-xs text-muted-foreground">
              Saved settings will be used when generating scripts
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* What are you selling */}
            <div className="space-y-1.5">
              <Label
                htmlFor="whatYouAreSelling"
                className="text-sm font-semibold text-foreground"
              >
                What are you selling?
              </Label>
              <p className="text-xs text-muted-foreground">
                Describe your product or service in plain terms
              </p>
              <Textarea
                id="whatYouAreSelling"
                value={whatYouAreSelling}
                onChange={(e) => setWhatYouAreSelling(e.target.value)}
                placeholder="e.g. Business loans for small businesses, fast approvals up to $500k…"
                rows={3}
                className="resize-none text-sm min-h-[80px]"
                data-ocid="cold-call-script.what_selling_input"
              />
            </div>

            {/* Pre-qualifying needs */}
            <div className="space-y-1.5">
              <Label
                htmlFor="preQualifyingNeeds"
                className="text-sm font-semibold text-foreground"
              >
                What type of pre-qualifying does your calls need?
              </Label>
              <p className="text-xs text-muted-foreground">
                e.g. monthly revenue minimum, time in business, credit score
                threshold
              </p>
              <Textarea
                id="preQualifyingNeeds"
                value={preQualifyingNeeds}
                onChange={(e) => setPreQualifyingNeeds(e.target.value)}
                placeholder="e.g. Must be in business 2+ years, $20k/month revenue, owner must be available…"
                rows={3}
                className="resize-none text-sm min-h-[80px]"
                data-ocid="cold-call-script.pre_qualifying_input"
              />
            </div>

            {/* Packages or services */}
            <div className="space-y-1.5">
              <Label
                htmlFor="packagesOrServices"
                className="text-sm font-semibold text-foreground"
              >
                What packages or services do you sell?
              </Label>
              <p className="text-xs text-muted-foreground">
                List your main offerings so they can be referenced in the script
              </p>
              <Textarea
                id="packagesOrServices"
                value={packagesOrServices}
                onChange={(e) => setPackagesOrServices(e.target.value)}
                placeholder="e.g. Term loans ($10k–$500k), merchant cash advances, SBA loans, equipment financing…"
                rows={3}
                className="resize-none text-sm min-h-[80px]"
                data-ocid="cold-call-script.packages_input"
              />
            </div>

            {/* Goal type */}
            <div className="space-y-1.5">
              <Label
                htmlFor="goalType"
                className="text-sm font-semibold text-foreground"
              >
                Is your goal to get an appointment or close them on the call?
              </Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger
                  id="goalType"
                  className="w-full min-h-[44px]"
                  data-ocid="cold-call-script.goal_type_select"
                >
                  <SelectValue placeholder="Select your goal…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Get an Appointment">
                    Get an Appointment
                  </SelectItem>
                  <SelectItem value="Close on the Call">
                    Close on the Call
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Save button */}
            <Button
              onClick={handleSaveConfig}
              disabled={saveColdCallConfig.isPending}
              className="w-full sm:w-auto gap-2 font-semibold min-h-[44px]"
              style={
                !saveColdCallConfig.isPending
                  ? { background: "oklch(0.22 0.12 264)" }
                  : {}
              }
              data-ocid="cold-call-script.save_config_button"
            >
              {saveColdCallConfig.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : configSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  Settings Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </section>
      )}

      {/* ── Section B: Lead Selector ─────────────────────────────── */}
      <section
        className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
        data-ocid="cold-call-script.lead_selector_card"
      >
        <div
          className="flex items-center gap-2.5 px-5 py-4 border-b border-border"
          style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "oklch(0.56 0.16 44)" }}
          >
            {hasAi ? "2" : "1"}
          </div>
          <h2 className="text-sm font-bold text-foreground">Choose a Lead</h2>
          <span className="ml-1 text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </div>
        <div className="p-5">
          <LeadSelector
            leads={leads}
            selectedId={selectedLeadId}
            onSelect={setSelectedLeadId}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {hasAi
              ? "Skip lead selection to generate a generic script based on your settings above."
              : "Select a lead to reference their details when writing your script."}
          </p>
        </div>
      </section>

      {/* ── Section C: Generate Button (AI plans only) ───────────── */}
      {hasAi && (
        <div data-ocid="cold-call-script.generate_section">
          <Button
            onClick={handleGenerate}
            disabled={generateScript.isPending}
            className="w-full font-bold text-base min-h-[52px] gap-2 text-white"
            style={
              !generateScript.isPending
                ? { background: "oklch(0.56 0.16 44)" }
                : {}
            }
            data-ocid="cold-call-script.generate_button"
          >
            {generateScript.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Script…
              </>
            ) : (
              <>
                <ScrollText className="w-5 h-5" />
                {selectedLeadId
                  ? "Generate Cold Call Script"
                  : "Generate Generic Script"}
              </>
            )}
          </Button>

          {!selectedLeadId && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              No lead selected — a generic script will be generated based on
              your settings.
            </p>
          )}
        </div>
      )}

      {/* ── Section D: Script Output ─────────────────────────────── */}
      {scriptSections.length > 0 && rawScript && (
        <section
          className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
          data-ocid="cold-call-script.output_card"
        >
          <div
            className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border"
            style={{ background: "oklch(0.22 0.12 264 / 0.06)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: "oklch(0.56 0.16 44)" }}
              >
                3
              </div>
              <h2 className="text-sm font-bold text-foreground">
                Your Cold Call Script
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyFull}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-foreground"
                data-ocid="cold-call-script.copy_full_button"
              >
                {copiedFull ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generateScript.isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-muted-foreground hover:text-foreground disabled:opacity-50"
                data-ocid="cold-call-script.regenerate_button"
              >
                {generateScript.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            </div>
          </div>

          <div
            className="p-4 sm:p-5 space-y-3"
            data-ocid="cold-call-script.sections_list"
          >
            {scriptSections.map((section, i) => (
              <ScriptSectionCard
                key={`${section.title}-${i}`}
                section={section}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Loading state while generating */}
      {generateScript.isPending && (
        <div
          className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-3 text-center"
          data-ocid="cold-call-script.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Crafting your personalized script…
          </p>
          <p className="text-xs text-muted-foreground">
            AI is analyzing the lead profile and building your script
          </p>
        </div>
      )}
    </div>
  );
}
