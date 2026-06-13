import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { H as useBackend, d as useSubscription, u as useLeads, S as Skeleton, L as Label, T as Textarea, B as Button, t as tierHasFeature } from "./index-DsrDu9m3.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B4Jc19UW.js";
import { a as useQuery, u as useQueryClient, b as useMutation, k as useSearch } from "./vendor-router-gX3Sk5jz.js";
import { aA as ScrollText, aB as LoaderCircle, H as Check, ah as Save, aT as Copy, a4 as RefreshCw, t as ue, J as CircleCheck } from "./vendor-DT3DREzx.js";
import { T as TokenBalance } from "./TokenBalance-DS0BtRUo.js";
import { b as useAiGenerateColdCallScriptForLead } from "./useAi-BlR_ZtV6.js";
import "./vendor-ic-W9L5KZ_F.js";
function useColdCallConfig() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["coldCallConfig"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const actorAny = actor;
        const result = await actorAny.getColdCallConfig();
        if (Array.isArray(result) && result.length > 0) {
          return result[0];
        }
        return null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveColdCallConfig() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const actorAny = actor;
      await actorAny.saveColdCallConfig(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coldCallConfig"] });
    }
  });
}
function parseScriptSections(text) {
  const regex = /===\s*([^=]+?)\s*===/g;
  const sections = [];
  const parts = text.split(regex);
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const content = (parts[i + 1] ?? "").trim();
    if (title) sections.push({ title, content });
  }
  if (sections.length === 0 && text.trim()) {
    sections.push({ title: "Script", content: text.trim() });
  }
  return sections;
}
const SECTION_COLORS = {
  GREETING: "border-primary/40 bg-primary/5",
  "PRE-QUALIFYING": "border-amber-500/40 bg-amber-500/5",
  "THE PITCH": "border-sky-500/40 bg-sky-500/5",
  "A/B CHOICE CLOSE": "border-emerald-500/40 bg-emerald-500/5"
};
const SECTION_HEADER_COLORS = {
  GREETING: "text-primary",
  "PRE-QUALIFYING": "text-amber-600",
  "THE PITCH": "text-sky-600",
  "A/B CHOICE CLOSE": "text-emerald-600"
};
function getSectionColor(title, prop) {
  const key = title.toUpperCase().trim();
  if (prop === "border") {
    return SECTION_COLORS[key] ?? "border-border bg-muted/20";
  }
  return SECTION_HEADER_COLORS[key] ?? "text-foreground";
}
function LeadSelector({
  leads,
  selectedId,
  onSelect
}) {
  const [search, setSearch] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const filtered = search.trim() ? leads.filter((l) => {
    const q = search.toLowerCase();
    return l.name?.toLowerCase().includes(q) || `${l.firstName ?? ""} ${l.lastName ?? ""}`.toLowerCase().includes(q);
  }) : leads;
  const selectedLead = leads.find((l) => l.id === selectedId) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "cold-call-script.lead_selector", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Select a Lead" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search leads by name…",
        className: "w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] transition-all",
        "data-ocid": "cold-call-script.lead_search_input",
        "aria-label": "Search leads"
      }
    ),
    selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium truncate min-w-0", children: selectedLead.name || `${selectedLead.firstName ?? ""} ${selectedLead.lastName ?? ""}`.trim() || "Unnamed Lead" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onSelect(null),
          className: "ml-auto text-muted-foreground hover:text-foreground transition-colors shrink-0 text-xs",
          "data-ocid": "cold-call-script.clear_lead_button",
          children: "Change"
        }
      )
    ] }),
    !selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-h-52 overflow-y-auto rounded-lg border border-border bg-card divide-y divide-border",
        "data-ocid": "cold-call-script.lead_list",
        children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-8 text-center text-sm text-muted-foreground",
            "data-ocid": "cold-call-script.lead_list_empty_state",
            children: search ? "No leads match your search" : "No leads available"
          }
        ) : filtered.slice(0, 50).map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onSelect(lead.id);
              setSearch("");
            },
            className: "w-full flex flex-col px-3 py-2.5 text-left hover:bg-muted/50 active:bg-muted transition-colors min-h-[48px] justify-center",
            "data-ocid": `cold-call-script.lead_item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: lead.name || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "Unnamed Lead" }),
              (lead.firstName || lead.lastName) && lead.name && lead.name !== `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() })
            ]
          },
          String(lead.id)
        ))
      }
    )
  ] });
}
function ScriptSectionCard({
  section,
  index
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(section.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      ue.error("Could not copy to clipboard.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-4 space-y-2 ${getSectionColor(section.title, "border")}`,
      "data-ocid": `cold-call-script.section_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: `text-sm font-bold uppercase tracking-wider ${getSectionColor(section.title, "header")}`,
              children: section.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCopy,
              className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition-colors min-h-[32px] shrink-0 text-muted-foreground hover:text-foreground",
              "data-ocid": `cold-call-script.copy_section_button.${index + 1}`,
              "aria-label": `Copy ${section.title} section`,
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                "Copied"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                "Copy"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: section.content })
      ]
    }
  );
}
function ColdCallScriptPage() {
  const searchParams = useSearch({ strict: false });
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: savedConfig, isLoading: configLoading } = useColdCallConfig();
  const saveColdCallConfig = useSaveColdCallConfig();
  const generateScript = useAiGenerateColdCallScriptForLead();
  const [whatYouAreSelling, setWhatYouAreSelling] = reactExports.useState("");
  const [preQualifyingNeeds, setPreQualifyingNeeds] = reactExports.useState("");
  const [packagesOrServices, setPackagesOrServices] = reactExports.useState("");
  const [goalType, setGoalType] = reactExports.useState("Get an Appointment");
  const [configSaved, setConfigSaved] = reactExports.useState(false);
  const [selectedLeadId, setSelectedLeadId] = reactExports.useState(null);
  const [scriptSections, setScriptSections] = reactExports.useState([]);
  const [rawScript, setRawScript] = reactExports.useState(null);
  const [copiedFull, setCopiedFull] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (savedConfig) {
      setWhatYouAreSelling(savedConfig.whatYouAreSelling ?? "");
      setPreQualifyingNeeds(savedConfig.preQualifyingNeeds ?? "");
      setPackagesOrServices(savedConfig.packagesOrServices ?? "");
      setGoalType(savedConfig.goalType ?? "Get an Appointment");
    }
  }, [savedConfig]);
  reactExports.useEffect(() => {
    if (searchParams.leadId && leads.length > 0) {
      try {
        const parsed = BigInt(searchParams.leadId);
        const exists = leads.find((l) => l.id === parsed);
        if (exists) setSelectedLeadId(parsed);
      } catch {
      }
    }
  }, [searchParams.leadId, leads]);
  const handleSaveConfig = async () => {
    const config = {
      whatYouAreSelling,
      preQualifyingNeeds,
      packagesOrServices,
      goalType
    };
    try {
      await saveColdCallConfig.mutateAsync(config);
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3e3);
      ue.success("Script settings saved!");
    } catch {
      ue.error("Failed to save settings. Please try again.");
    }
  };
  const handleGenerate = async () => {
    setScriptSections([]);
    setRawScript(null);
    try {
      const leadId = selectedLeadId ?? BigInt(0);
      const result = await generateScript.mutateAsync(leadId);
      setRawScript(result);
      setScriptSections(parseScriptSections(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to generate script.";
      if (msg.includes("API key") || msg.includes("not configured") || msg.includes("administrator")) {
        ue.error(
          "AI not configured — please add your Anthropic API key in the Admin Panel > AI Settings."
        );
      } else if (msg.includes("tokens")) {
        ue.error(msg, {
          action: {
            label: "Buy Credits",
            onClick: () => window.open("/pricing", "_blank")
          }
        });
      } else {
        ue.error(msg);
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
      ue.error("Could not copy to clipboard.");
    }
  };
  if (configLoading || leadsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3",
        "data-ocid": "cold-call-script.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              style: { background: "oklch(0.22 0.12 264)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "Cold Call Script Builder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: hasAi ? "Configure your script settings and generate personalized scripts for each lead" : "Use the form to write and save your own cold call script" })
          ] })
        ]
      }
    ),
    hasAi && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TokenBalance, { showLtai: false }) }),
    !hasAi && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card px-5 py-4 flex items-start gap-3",
        "data-ocid": "cold-call-script.plan_notice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-5 h-5 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Cold Call Script Builder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Use the form to write your own script. AI script generation is available on the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/pricing",
                  className: "font-semibold hover:underline",
                  style: { color: "oklch(0.56 0.16 44)" },
                  children: "Pro+AI plan ($45/month)"
                }
              ),
              "."
            ] })
          ] })
        ]
      }
    ),
    hasAi && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
        "data-ocid": "cold-call-script.ai_setup_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
              style: { background: "oklch(0.22 0.12 264 / 0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                    style: { background: "oklch(0.56 0.16 44)" },
                    children: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Script Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Saved settings will be used when generating scripts" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "whatYouAreSelling",
                  className: "text-sm font-semibold text-foreground",
                  children: "What are you selling?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Describe your product or service in plain terms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "whatYouAreSelling",
                  value: whatYouAreSelling,
                  onChange: (e) => setWhatYouAreSelling(e.target.value),
                  placeholder: "e.g. Business loans for small businesses, fast approvals up to $500k…",
                  rows: 3,
                  className: "resize-none text-sm min-h-[80px]",
                  "data-ocid": "cold-call-script.what_selling_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "preQualifyingNeeds",
                  className: "text-sm font-semibold text-foreground",
                  children: "What type of pre-qualifying does your calls need?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "e.g. monthly revenue minimum, time in business, credit score threshold" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "preQualifyingNeeds",
                  value: preQualifyingNeeds,
                  onChange: (e) => setPreQualifyingNeeds(e.target.value),
                  placeholder: "e.g. Must be in business 2+ years, $20k/month revenue, owner must be available…",
                  rows: 3,
                  className: "resize-none text-sm min-h-[80px]",
                  "data-ocid": "cold-call-script.pre_qualifying_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "packagesOrServices",
                  className: "text-sm font-semibold text-foreground",
                  children: "What packages or services do you sell?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "List your main offerings so they can be referenced in the script" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "packagesOrServices",
                  value: packagesOrServices,
                  onChange: (e) => setPackagesOrServices(e.target.value),
                  placeholder: "e.g. Term loans ($10k–$500k), merchant cash advances, SBA loans, equipment financing…",
                  rows: 3,
                  className: "resize-none text-sm min-h-[80px]",
                  "data-ocid": "cold-call-script.packages_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "goalType",
                  className: "text-sm font-semibold text-foreground",
                  children: "Is your goal to get an appointment or close them on the call?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: goalType, onValueChange: setGoalType, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "goalType",
                    className: "w-full min-h-[44px]",
                    "data-ocid": "cold-call-script.goal_type_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your goal…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Get an Appointment", children: "Get an Appointment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Close on the Call", children: "Close on the Call" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSaveConfig,
                disabled: saveColdCallConfig.isPending,
                className: "w-full sm:w-auto gap-2 font-semibold min-h-[44px]",
                style: !saveColdCallConfig.isPending ? { background: "oklch(0.22 0.12 264)" } : {},
                "data-ocid": "cold-call-script.save_config_button",
                children: saveColdCallConfig.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Saving…"
                ] }) : configSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                  "Settings Saved!"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save Settings"
                ] })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
        "data-ocid": "cold-call-script.lead_selector_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 px-5 py-4 border-b border-border",
              style: { background: "oklch(0.22 0.12 264 / 0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                    style: { background: "oklch(0.56 0.16 44)" },
                    children: hasAi ? "2" : "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Choose a Lead" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-muted-foreground font-normal", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              LeadSelector,
              {
                leads,
                selectedId: selectedLeadId,
                onSelect: setSelectedLeadId
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: hasAi ? "Skip lead selection to generate a generic script based on your settings above." : "Select a lead to reference their details when writing your script." })
          ] })
        ]
      }
    ),
    hasAi && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "cold-call-script.generate_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleGenerate,
          disabled: generateScript.isPending,
          className: "w-full font-bold text-base min-h-[52px] gap-2 text-white",
          style: { background: "oklch(0.56 0.16 44)" },
          "data-ocid": "cold-call-script.generate_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-5 h-5" }),
            selectedLeadId ? "Generate Cold Call Script" : "Generate Generic Script"
          ] })
        }
      ),
      !selectedLeadId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-2", children: "No lead selected — a generic script will be generated based on your settings." })
    ] }),
    scriptSections.length > 0 && rawScript && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded-2xl shadow-sm overflow-hidden",
        "data-ocid": "cold-call-script.output_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 px-5 py-4 border-b border-border",
              style: { background: "oklch(0.22 0.12 264 / 0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                      style: { background: "oklch(0.56 0.16 44)" },
                      children: "3"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground", children: "Your Cold Call Script" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleCopyFull,
                      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-foreground",
                      "data-ocid": "cold-call-script.copy_full_button",
                      children: copiedFull ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }),
                        "Copied!"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                        "Copy All"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleGenerate,
                      disabled: generateScript.isPending,
                      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors min-h-[36px] text-muted-foreground hover:text-foreground disabled:opacity-50",
                      "data-ocid": "cold-call-script.regenerate_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Regenerate" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-4 sm:p-5 space-y-3",
              "data-ocid": "cold-call-script.sections_list",
              children: scriptSections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ScriptSectionCard,
                {
                  section,
                  index: i
                },
                `${section.title}-${i}`
              ))
            }
          )
        ]
      }
    ),
    generateScript.isPending
  ] });
}
export {
  ColdCallScriptPage as default
};
