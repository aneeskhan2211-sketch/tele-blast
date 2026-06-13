import { j as jsxRuntimeExports, r as reactExports } from "./vendor-react-CYgLKadW.js";
import { c as cn, H as useBackend, u as useLeads, d as useSubscription, q as useAddTextRecord, B as Button, C as Card, A as CardHeader, D as CardTitle, E as CardContent, S as Skeleton, t as tierHasFeature, a as useGetPipelines, I as Input, F as Checkbox, L as Label, v as Badge } from "./index-DsrDu9m3.js";
import { bo as Root, bp as Thumb, bq as Droplets, a3 as Plus, Z as Zap, R as Smartphone, aL as Info, t as ue, J as CircleCheck, br as ChevronLeft, ao as Search, q as Users, aK as ChevronRight, bs as Hash, ap as Sparkles, b9 as Clock, W as TriangleAlert, au as ChevronUp, m as ChevronDown, aB as LoaderCircle, bt as Pause, bu as Play, bv as Square, av as Trash2, a0 as CircleX } from "./vendor-DT3DREzx.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./vendor-router-gX3Sk5jz.js";
import { u as useSmsTemplates } from "./useTemplates-wZAhJOj1.js";
import "./vendor-ic-W9L5KZ_F.js";
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function useDripCampaigns() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["dripCampaigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDripCampaigns();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      templateId,
      templateBody,
      leadIds
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createDripCampaign(
        name,
        templateId,
        templateBody,
        leadIds
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function usePauseDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.pauseDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useResumeDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.resumeDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useStopDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.stopDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useDeleteDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useMarkLeadSent() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      campaignId,
      leadId
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markLeadSent(campaignId, leadId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useMarkLeadFailed() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      campaignId,
      leadId
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markLeadFailed(campaignId, leadId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    }
  });
}
function useGetBirthdayDripConfig() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["birthdayDripConfig"],
    queryFn: async () => {
      if (!actor) return { isActive: false, template: "" };
      try {
        const result = await actor.getBirthdayDripConfig();
        if (result.__kind__ === "err") return { isActive: false, template: "" };
        return {
          isActive: result.ok.isActive,
          template: result.ok.templateBody
        };
      } catch {
        return { isActive: false, template: "" };
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useSetBirthdayDripConfig() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.setBirthdayDripConfig(
        config.template,
        config.isActive
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birthdayDripConfig"] });
    }
  });
}
function useSpinSms() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ originalMessage, numVersions }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.spinSms(originalMessage, BigInt(numVersions));
      if (result.__kind__ === "ok") return result.ok;
      const errMsg = result.err;
      if (errMsg.includes("INSUFFICIENT_TOKENS")) {
        throw new Error(
          "You've used all your AI tokens for this period. Buy more to continue."
        );
      }
      if (errMsg.toLowerCase().includes("api key") || errMsg.includes("not configured")) {
        throw new Error(
          "AI features require an API key. Contact your administrator to configure the Anthropic API key in Admin Panel > AI Settings."
        );
      }
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokenBalances"] });
    }
  });
}
const LS_NUMBERS_KEY = "twilio_numbers";
const LS_SEND_METHOD_KEY = "drip_send_method";
function loadSendMethod(twilioNumbers) {
  try {
    const stored = localStorage.getItem(LS_SEND_METHOD_KEY);
    if (stored === "twilio" || stored === "cell_phone") return stored;
  } catch {
  }
  return twilioNumbers.length > 0 ? "twilio" : "cell_phone";
}
function saveSendMethod(method) {
  try {
    localStorage.setItem(LS_SEND_METHOD_KEY, method);
  } catch {
  }
}
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
function personalize(template, lead) {
  const firstName = lead.firstName ?? lead.name?.split(" ")[0] ?? "";
  const businessName = lead.name ?? "";
  const city = lead.city ?? "";
  return template.replace(/\{\{first_name\}\}/gi, firstName).replace(/\{\{business_name\}\}/gi, businessName).replace(/\{\{city\}\}/gi, city);
}
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  return digits.startsWith("+") ? raw : `+${digits}`;
}
function getRandomDelay() {
  return Math.floor(Math.random() * (3e5 - 6e4 + 1)) + 6e4;
}
function estimateTime(leadCount, numNumbers) {
  const parallel = Math.max(1, numNumbers);
  const perQueue = Math.ceil(leadCount / parallel);
  const minMin = perQueue * 1;
  const maxMin = perQueue * 5;
  if (maxMin < 60) return `${minMin}–${maxMin} min`;
  const minH = (minMin / 60).toFixed(1);
  const maxH = (maxMin / 60).toFixed(1);
  return `${minH}–${maxH} hrs`;
}
function StatusBadge({ status }) {
  const styles = {
    running: { bg: "oklch(0.55 0.16 145)", label: "Running" },
    paused: { bg: "oklch(0.65 0.15 85)", label: "Paused" },
    completed: { bg: "oklch(0.55 0.02 264)", label: "Completed" },
    stopped: { bg: "oklch(0.5 0.18 27)", label: "Stopped" }
  };
  const s = styles[status];
  if (s) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        className: "text-xs font-medium",
        style: { background: s.bg, color: "white" },
        children: s.label
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: status });
}
function TokenChip({ token }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "code",
    {
      className: "px-2 py-0.5 rounded-md text-xs font-mono cursor-pointer select-all",
      style: {
        background: "oklch(0.94 0.03 264)",
        color: "oklch(0.32 0.15 264)",
        border: "1px solid oklch(0.85 0.06 264)"
      },
      children: token
    }
  );
}
function BirthdayDripCard() {
  const { data: config, isLoading } = useGetBirthdayDripConfig();
  const saveMut = useSetBirthdayDripConfig();
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const [localTemplate, setLocalTemplate] = reactExports.useState("");
  const [localActive, setLocalActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (config) {
      setLocalTemplate(config.template);
      setLocalActive(config.isActive);
    }
  }, [config]);
  const handleToggleActive = async (checked) => {
    setLocalActive(checked);
    try {
      await saveMut.mutateAsync({ isActive: checked, template: localTemplate });
      ue.success(
        checked ? "Birthday Drip activated" : "Birthday Drip paused"
      );
    } catch (err) {
      setLocalActive(!checked);
      ue.error(err.message);
    }
  };
  const handleSaveTemplate = async () => {
    try {
      await saveMut.mutateAsync({
        isActive: localActive,
        template: localTemplate
      });
      ue.success("Birthday template saved!");
    } catch (err) {
      ue.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border",
      style: { borderColor: "oklch(0.88 0.06 27)" },
      "data-ocid": "drip.birthday_drip.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            style: { background: "oklch(0.97 0.02 27)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-3 flex-1 text-left min-w-0",
                  onClick: () => setIsExpanded((v) => !v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        style: { background: "oklch(0.56 0.16 44)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", "aria-hidden": "true", children: "🎂" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Birthday Drip" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-send a birthday text to leads on their special day" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 shrink-0",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  role: "presentation",
                  children: [
                    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-5 rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: localActive,
                        onCheckedChange: (checked) => {
                          handleToggleActive(checked);
                        },
                        "data-ocid": "drip.birthday_drip.toggle",
                        "aria-label": "Toggle Birthday Drip"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground p-1", "aria-hidden": "true", children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
                  ]
                }
              )
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 pt-3 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg px-3 py-2 text-xs",
              style: {
                background: localActive ? "oklch(0.96 0.04 145)" : "oklch(0.96 0 0)",
                color: localActive ? "oklch(0.35 0.15 145)" : "oklch(0.45 0 0)",
                border: `1px solid ${localActive ? "oklch(0.88 0.08 145)" : "oklch(0.88 0 0)"}`
              },
              children: [
                "Birthday Drip is",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: localActive ? "active" : "inactive" }),
                ".",
                " ",
                localActive ? "When active, Tele-Blast sends your birthday message to each lead on their birthday at a random time during the day to keep it looking natural." : "Enable the toggle above to start sending birthday texts automatically."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-1.5 block", children: "Birthday SMS Template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                rows: 3,
                placeholder: "Hey {{first_name}}, wishing you a wonderful birthday! 🎂 — [Your Name]",
                value: localTemplate,
                onChange: (e) => setLocalTemplate(e.target.value),
                className: "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "drip.birthday_drip.template_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Personalization:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TokenChip, { token: "{{first_name}}" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TokenChip, { token: "{{last_name}}" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TokenChip, { token: "{{business_name}}" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSaveTemplate,
              disabled: saveMut.isPending || !localTemplate.trim(),
              size: "sm",
              style: { background: "oklch(0.56 0.16 44)", color: "white" },
              className: "self-start",
              "data-ocid": "drip.birthday_drip.save_button",
              children: saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }),
                "Saving…"
              ] }) : "Save Birthday Template"
            }
          )
        ] })
      ]
    }
  );
}
function SpinPanel({
  originalMessage,
  onSelectVersion,
  hasAi
}) {
  const [enabled, setEnabled] = reactExports.useState(false);
  const [numVersions, setNumVersions] = reactExports.useState(3);
  const [versions, setVersions] = reactExports.useState([]);
  const spinMut = useSpinSms();
  if (!hasAi) return null;
  const handleGenerate = async () => {
    if (!originalMessage.trim()) {
      ue.error("Please write or select a message first");
      return;
    }
    try {
      const result = await spinMut.mutateAsync({
        originalMessage,
        numVersions
      });
      setVersions(result);
      ue.success(`${result.length} versions generated!`);
    } catch (err) {
      ue.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border overflow-hidden",
      style: { borderColor: "oklch(0.88 0.04 264)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            style: { background: "oklch(0.97 0.015 264)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "spin-checkbox",
                  className: "flex items-center gap-2.5 cursor-pointer select-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: "spin-checkbox",
                        checked: enabled,
                        onCheckedChange: (v) => {
                          setEnabled(!!v);
                          if (!v) setVersions([]);
                        },
                        "data-ocid": "drip.builder.spin_checkbox"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-semibold",
                          style: { color: "oklch(0.22 0.12 264)" },
                          children: "Spin this SMS"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Generate multiple variations with Claude AI (1 tAI token)" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Sparkles,
                {
                  className: "w-4 h-4 shrink-0",
                  style: { color: "oklch(0.56 0.16 44)" }
                }
              )
            ]
          }
        ),
        enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex flex-col gap-3 border-t",
            style: { borderColor: "oklch(0.88 0.04 264)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "num-versions", className: "text-sm whitespace-nowrap", children: "How many versions?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "num-versions",
                    type: "number",
                    min: 2,
                    max: 10,
                    value: numVersions,
                    onChange: (e) => setNumVersions(
                      Math.max(2, Math.min(10, Number(e.target.value)))
                    ),
                    className: "w-20",
                    "data-ocid": "drip.builder.spin_count_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(max 10)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleGenerate,
                  disabled: spinMut.isPending || !originalMessage.trim(),
                  size: "sm",
                  style: { background: "oklch(0.32 0.15 264)", color: "white" },
                  className: "self-start",
                  "data-ocid": "drip.builder.spin_generate_button",
                  children: spinMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }),
                    "Generating ",
                    numVersions,
                    " variations with Claude…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "Generate Versions with AI"
                  ] })
                }
              ),
              versions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
                  versions.length,
                  " versions — click to use"
                ] }),
                versions.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-lg border p-3 text-sm",
                    style: {
                      borderColor: "oklch(0.91 0 0)",
                      background: "oklch(0.99 0 0)"
                    },
                    "data-ocid": `drip.builder.spin_version.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: [
                          "Version ",
                          i + 1
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap break-words", children: v })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          onClick: () => onSelectVersion(v),
                          className: "shrink-0 text-xs",
                          "data-ocid": `drip.builder.spin_use_version.${i + 1}`,
                          children: "Use this"
                        }
                      )
                    ] })
                  },
                  `spin-version-${i}-${v.slice(0, 20)}`
                ))
              ] })
            ]
          }
        )
      ]
    }
  );
}
function startDripQueue(state) {
  const {
    campaignId,
    queues,
    twilioNumbers,
    templateBody,
    templateVersions,
    leads,
    onSent,
    onFailed,
    onDone
  } = state;
  let stopped = false;
  let globalIndex = 0;
  const leadMap = new Map(leads.map((l) => [l.id.toString(), l]));
  function getBodyForIndex(idx) {
    if (templateVersions.length > 1) {
      return templateVersions[idx % templateVersions.length];
    }
    return templateBody;
  }
  async function processQueue(queueIndex) {
    const queue = queues[queueIndex];
    const number = twilioNumbers[queueIndex];
    if (!number || !queue) return;
    while (queue.length > 0 && !stopped) {
      const leadId = queue.shift();
      if (leadId === void 0) break;
      const lead = leadMap.get(leadId.toString());
      if (!lead || !lead.phone) {
        onFailed(campaignId, leadId);
        continue;
      }
      const myIndex = globalIndex++;
      const body = personalize(getBodyForIndex(myIndex), lead);
      const to = formatPhone(lead.phone);
      const from = formatPhone(number.phoneNumber);
      try {
        const formData = new URLSearchParams();
        formData.append("To", to);
        formData.append("From", from);
        formData.append("Body", body);
        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${number.accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${number.accountSid}:${number.authToken}`)}`,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
          }
        );
        if (res.ok) {
          onSent(campaignId, leadId, body);
        } else {
          const errText = await res.text().catch(() => "unknown");
          console.error("Twilio error:", errText);
          onFailed(campaignId, leadId);
        }
      } catch (err) {
        console.error("Drip send error:", err);
        onFailed(campaignId, leadId);
      }
      if (queue.length > 0 && !stopped) {
        await new Promise((resolve) => {
          setTimeout(resolve, getRandomDelay());
        });
      }
    }
  }
  const promises = queues.map((_, i) => processQueue(i));
  Promise.all(promises).then(() => {
    if (!stopped) onDone();
  });
  return () => {
    stopped = true;
  };
}
function CampaignDetail({
  campaign,
  leads,
  onClose
}) {
  const pauseMut = usePauseDripCampaign();
  const resumeMut = useResumeDripCampaign();
  const stopMut = useStopDripCampaign();
  const deleteMut = useDeleteDripCampaign();
  const leadMap = reactExports.useMemo(
    () => new Map(leads.map((l) => [l.id.toString(), l])),
    [leads]
  );
  const sentSet = new Set(campaign.sentLeadIds.map((n) => n.toString()));
  const failedSet = new Set(campaign.failedLeadIds.map((n) => n.toString()));
  const allLeadIds = [
    ...campaign.leadIds,
    ...campaign.sentLeadIds,
    ...campaign.failedLeadIds
  ];
  const handleDelete = async () => {
    if (!confirm("Delete this campaign? This cannot be undone.")) return;
    await deleteMut.mutateAsync(campaign.id);
    onClose();
    ue.success("Campaign deleted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "absolute inset-0 w-full h-full cursor-default",
        style: { background: "rgba(0,0,0,0.5)" },
        onClick: onClose,
        "aria-label": "Close campaign detail"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative mt-auto md:m-auto w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col max-h-[85vh]",
        style: { background: "white" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 border-b",
              style: { borderColor: "oklch(0.91 0 0)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "shrink-0 text-muted-foreground hover:text-foreground",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground truncate", children: campaign.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: campaign.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  campaign.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => pauseMut.mutate(campaign.id),
                      disabled: pauseMut.isPending,
                      "data-ocid": "drip.campaign.pause_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5 mr-1" }),
                        "Pause"
                      ]
                    }
                  ),
                  campaign.status === "paused" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => resumeMut.mutate(campaign.id),
                      disabled: resumeMut.isPending,
                      style: { background: "oklch(0.32 0.15 264)", color: "white" },
                      "data-ocid": "drip.campaign.resume_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1" }),
                        "Resume"
                      ]
                    }
                  ),
                  (campaign.status === "running" || campaign.status === "paused") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      onClick: () => stopMut.mutate(campaign.id),
                      disabled: stopMut.isPending,
                      "data-ocid": "drip.campaign.stop_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5 mr-1" }),
                        "Stop"
                      ]
                    }
                  ),
                  (campaign.status === "completed" || campaign.status === "stopped") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive",
                      onClick: handleDelete,
                      disabled: deleteMut.isPending,
                      "data-ocid": "drip.campaign.delete_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-3 gap-3 px-5 py-4 border-b",
              style: { borderColor: "oklch(0.91 0 0)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-2xl font-bold",
                      style: { color: "oklch(0.32 0.15 264)" },
                      children: allLeadIds.length
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Leads" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-2xl font-bold",
                      style: { color: "oklch(0.55 0.16 145)" },
                      children: campaign.sentLeadIds.length
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sent" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-2xl font-bold",
                      style: { color: "oklch(0.5 0.18 27)" },
                      children: campaign.failedLeadIds.length
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Failed" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 overflow-y-auto divide-y",
              style: { borderColor: "oklch(0.93 0 0)" },
              children: allLeadIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-10 text-sm", children: "No leads in this campaign." }) : allLeadIds.map((lid, i) => {
                const lead = leadMap.get(lid.toString());
                const isSent = sentSet.has(lid.toString());
                const isFailed = failedSet.has(lid.toString());
                const isPending = !isSent && !isFailed;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between px-5 py-3",
                    "data-ocid": `drip.lead_row.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: lead?.name || [lead?.firstName, lead?.lastName].filter(Boolean).join(" ") || lead?.phone || `Lead #${lid.toString()}` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead?.phone ?? "—" })
                      ] }),
                      isSent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1 text-xs shrink-0",
                          style: { color: "oklch(0.55 0.16 145)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sent" })
                          ]
                        }
                      ),
                      isFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1 text-xs shrink-0",
                          style: { color: "oklch(0.5 0.18 27)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed" })
                          ]
                        }
                      ),
                      isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs shrink-0 text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending" })
                      ] })
                    ]
                  },
                  lid.toString()
                );
              })
            }
          )
        ]
      }
    )
  ] });
}
function CampaignBuilder({
  onCancel,
  onLaunched,
  leads,
  templates,
  twilioNumbers,
  hasAi
}) {
  const [step, setStep] = reactExports.useState(1);
  const [state, setState] = reactExports.useState({
    selectedLeadIds: /* @__PURE__ */ new Set(),
    templateId: "",
    templateBody: "",
    campaignName: "",
    spinVersions: []
  });
  const [search, setSearch] = reactExports.useState("");
  const [pipelineFilter, setPipelineFilter] = reactExports.useState("all");
  const { data: pipelines = [] } = useGetPipelines();
  const createMut = useCreateDripCampaign();
  const filteredLeads = reactExports.useMemo(() => {
    let list = leads.filter((l) => l.phone);
    if (pipelineFilter !== "all") {
      const pid = BigInt(pipelineFilter);
      list = list.filter((l) => l.pipelineId === pid);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) => (l.name ?? "").toLowerCase().includes(q) || (l.firstName ?? "").toLowerCase().includes(q) || (l.phone ?? "").includes(q)
      );
    }
    return list;
  }, [leads, search, pipelineFilter]);
  const toggleLead = (id) => {
    setState((prev) => {
      const next = new Set(prev.selectedLeadIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, selectedLeadIds: next };
    });
  };
  const toggleAll = () => {
    const allFiltered = new Set(filteredLeads.map((l) => l.id.toString()));
    const allSelected = filteredLeads.every(
      (l) => state.selectedLeadIds.has(l.id.toString())
    );
    setState((prev) => {
      const next = new Set(prev.selectedLeadIds);
      if (allSelected) {
        for (const id of allFiltered) next.delete(id);
      } else {
        for (const id of allFiltered) next.add(id);
      }
      return { ...prev, selectedLeadIds: next };
    });
  };
  const activeBody = state.templateId ? templates.find((t) => t.id === state.templateId)?.body ?? "" : state.templateBody;
  const selectedTemplate = templates.find((t) => t.id === state.templateId);
  const firstSelectedLead = reactExports.useMemo(() => {
    for (const id of state.selectedLeadIds) {
      const l = leads.find((lead) => lead.id.toString() === id);
      if (l) return l;
    }
    return null;
  }, [state.selectedLeadIds, leads]);
  const previewBody = selectedTemplate ? personalize(selectedTemplate.body, firstSelectedLead ?? {}) : "";
  const handleLaunch = async () => {
    if (!state.campaignName.trim()) {
      ue.error("Please enter a campaign name");
      return;
    }
    const leadIds = Array.from(state.selectedLeadIds).map((id) => BigInt(id));
    const tmpl = templates.find((t) => t.id === state.templateId);
    try {
      const campaign = await createMut.mutateAsync({
        name: state.campaignName,
        templateId: state.templateId,
        templateBody: tmpl?.body ?? state.templateBody,
        leadIds
      });
      ue.success(`Campaign "${campaign.name}" created!`);
      onLaunched(campaign, state.spinVersions);
    } catch (err) {
      ue.error(`Failed to create campaign: ${err.message}`);
    }
  };
  const canGoNext = () => {
    if (step === 1) return state.selectedLeadIds.size > 0;
    if (step === 2)
      return !!state.templateId || state.templateBody.trim().length > 0;
    return true;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-2 px-4 py-3 border-b",
        style: { borderColor: "oklch(0.91 0 0)" },
        children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
              style: {
                background: step >= s ? "oklch(0.32 0.15 264)" : "oklch(0.92 0 0)",
                color: step >= s ? "white" : "oklch(0.48 0 0)"
              },
              children: s
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-medium hidden sm:block",
              style: {
                color: step === s ? "oklch(0.32 0.15 264)" : "oklch(0.48 0 0)"
              },
              children: s === 1 ? "Select Leads" : s === 2 ? "Choose Template" : "Review & Launch"
            }
          ),
          s < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground mx-1" })
        ] }, s))
      }
    ),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search leads…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "drip.builder.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: pipelineFilter,
            onChange: (e) => setPipelineFilter(e.target.value),
            className: "input-field text-sm",
            style: { minWidth: 120 },
            "data-ocid": "drip.builder.pipeline_select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Pipelines" }),
              pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.name }, p.id.toString()))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: toggleAll,
            className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
            "data-ocid": "drip.builder.select_all_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: filteredLeads.length > 0 && filteredLeads.every(
                    (l) => state.selectedLeadIds.has(l.id.toString())
                  ),
                  onCheckedChange: toggleAll
                }
              ),
              "Select all (",
              filteredLeads.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "text-xs",
            "data-ocid": "drip.builder.selected_count",
            children: [
              state.selectedLeadIds.size,
              " selected"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "border rounded-xl overflow-y-auto divide-y divide-border",
          style: { maxHeight: 320, borderColor: "oklch(0.91 0 0)" },
          "data-ocid": "drip.builder.lead_list",
          children: filteredLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-10 text-muted-foreground gap-2",
              "data-ocid": "drip.builder.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No leads with phone numbers found." })
              ]
            }
          ) : filteredLeads.map((lead, i) => {
            const isChecked = state.selectedLeadIds.has(lead.id.toString());
            const checkboxId = `drip-lead-${lead.id.toString()}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: checkboxId,
                className: "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors",
                "data-ocid": `drip.builder.lead_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: checkboxId,
                      checked: isChecked,
                      onCheckedChange: () => toggleLead(lead.id.toString())
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: lead.name || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || lead.phone || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead.phone })
                  ] })
                ]
              },
              lead.id.toString()
            );
          })
        }
      )
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-2 block", children: "Choose a Saved SMS Template" }),
        templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border p-4 text-center text-muted-foreground text-sm",
            style: { borderColor: "oklch(0.91 0 0)" },
            "data-ocid": "drip.builder.no_templates_state",
            children: "No SMS templates yet. Write a custom message below, or create one in the Templates tab first."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "border rounded-xl overflow-y-auto divide-y",
            style: { maxHeight: 180, borderColor: "oklch(0.91 0 0)" },
            "data-ocid": "drip.builder.template_list",
            children: templates.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors",
                "data-ocid": `drip.builder.template_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "drip-template",
                      value: t.id,
                      checked: state.templateId === t.id,
                      onChange: () => setState((prev) => ({
                        ...prev,
                        templateId: t.id,
                        templateBody: t.body,
                        spinVersions: []
                      })),
                      className: "mt-1 accent-primary",
                      "data-ocid": `drip.builder.template_radio.${i + 1}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: t.body })
                  ] })
                ]
              },
              t.id
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-1.5 block", children: templates.length > 0 ? "Or write a custom message" : "Custom message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 4,
            placeholder: "Hi {{first_name}}, this is [Your Name] from [Company]…",
            value: state.templateId ? "" : state.templateBody,
            disabled: !!state.templateId,
            onChange: (e) => setState((prev) => ({
              ...prev,
              templateId: "",
              templateBody: e.target.value,
              spinVersions: []
            })),
            className: "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
            "data-ocid": "drip.builder.custom_message_input"
          }
        ),
        state.templateId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setState((prev) => ({
              ...prev,
              templateId: "",
              templateBody: "",
              spinVersions: []
            })),
            className: "text-xs text-primary hover:underline mt-1",
            "data-ocid": "drip.builder.clear_template_button",
            children: "Clear selected template and write custom"
          }
        )
      ] }),
      selectedTemplate && firstSelectedLead && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-4 border",
          style: {
            background: "oklch(0.97 0.015 264)",
            borderColor: "oklch(0.88 0.04 264)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: [
              "Preview for",
              " ",
              firstSelectedLead.name ?? firstSelectedLead.firstName ?? "first lead"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: previewBody })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border flex items-start gap-2",
          style: {
            background: "oklch(0.97 0.01 85)",
            borderColor: "oklch(0.90 0.04 85)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Info,
              {
                className: "w-4 h-4 mt-0.5 shrink-0",
                style: { color: "oklch(0.56 0.16 44)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Use",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-xs", children: "{{first_name}}" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-xs", children: "{{business_name}}" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded text-xs", children: "{{city}}" }),
              " ",
              "for personalization."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SpinPanel,
        {
          originalMessage: activeBody,
          hasAi,
          onSelectVersion: (v) => setState((prev) => ({
            ...prev,
            templateId: "",
            templateBody: v,
            spinVersions: prev.spinVersions.length > 0 ? [...prev.spinVersions, v] : [v]
          }))
        }
      )
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-1.5 block", children: "Campaign Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "e.g. Q2 Roofing Follow-up",
            value: state.campaignName,
            onChange: (e) => setState((prev) => ({ ...prev, campaignName: e.target.value })),
            "data-ocid": "drip.builder.campaign_name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-3 border",
            style: {
              borderColor: "oklch(0.91 0 0)",
              background: "oklch(0.98 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Users,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.32 0.15 264)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Leads" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-2xl font-bold",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: state.selectedLeadIds.size
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-3 border",
            style: {
              borderColor: "oklch(0.91 0 0)",
              background: "oklch(0.98 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Hash,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.56 0.16 44)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Twilio #s" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-2xl font-bold",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: twilioNumbers.length
                }
              )
            ]
          }
        )
      ] }),
      state.spinVersions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border flex items-center gap-2.5",
          style: {
            background: "oklch(0.97 0.015 264)",
            borderColor: "oklch(0.88 0.04 264)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Sparkles,
              {
                className: "w-4 h-4 shrink-0",
                style: { color: "oklch(0.56 0.16 44)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "oklch(0.22 0.12 264)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                state.spinVersions.length,
                " SMS spin versions"
              ] }),
              " ",
              "will rotate through leads — each lead gets a different variation."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border flex items-center gap-3",
          style: {
            background: "oklch(0.97 0.015 264)",
            borderColor: "oklch(0.88 0.04 264)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Clock,
              {
                className: "w-4 h-4 shrink-0",
                style: { color: "oklch(0.32 0.15 264)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs font-medium",
                  style: { color: "oklch(0.22 0.12 264)" },
                  children: [
                    "Estimated time:",
                    " ",
                    estimateTime(state.selectedLeadIds.size, twilioNumbers.length)
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Random 1–5 min delay between each text" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border flex items-start gap-2",
          style: {
            background: "oklch(0.97 0.01 85)",
            borderColor: "oklch(0.90 0.04 85)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Info,
              {
                className: "w-4 h-4 mt-0.5 shrink-0",
                style: { color: "oklch(0.56 0.16 44)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
              twilioNumbers.length <= 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1 Twilio number:" }),
                " texts go out one at a time with a random 1–5 min delay."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  twilioNumbers.length,
                  " Twilio numbers:"
                ] }),
                " leads split across all numbers in parallel."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The campaign runs in your browser. Keep this tab open while active." })
            ] })
          ]
        }
      ),
      twilioNumbers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border flex items-center gap-2",
          style: {
            background: "oklch(0.97 0.02 27)",
            borderColor: "oklch(0.88 0.06 27)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                className: "w-4 h-4 shrink-0",
                style: { color: "oklch(0.5 0.18 27)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "oklch(0.4 0.15 27)" }, children: [
              "No Twilio numbers configured.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/twilio-setup", className: "underline font-medium", children: "Go to Phone/SMS Setup" }),
              " ",
              "to add one."
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3 border-t gap-3",
        style: { borderColor: "oklch(0.91 0 0)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              onClick: step === 1 ? onCancel : () => setStep((s) => s - 1),
              "data-ocid": "drip.builder.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                step === 1 ? "Cancel" : "Back"
              ]
            }
          ),
          step < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              disabled: !canGoNext(),
              onClick: () => setStep((s) => s + 1),
              style: { background: "oklch(0.32 0.15 264)", color: "white" },
              "data-ocid": "drip.builder.next_button",
              children: [
                "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              disabled: createMut.isPending || !state.campaignName.trim() || twilioNumbers.length === 0 || !state.templateId && !state.templateBody.trim(),
              onClick: handleLaunch,
              style: { background: "oklch(0.56 0.16 44)", color: "white" },
              "data-ocid": "drip.builder.launch_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-1.5" }),
                createMut.isPending ? "Launching…" : "Launch Campaign"
              ]
            }
          )
        ]
      }
    )
  ] });
}
function CellPhoneContactList({
  leads,
  templates,
  onBack
}) {
  const [selectedLeadIds, setSelectedLeadIds] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [selectedTemplateId, setSelectedTemplateId] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const { data: pipelines = [] } = useGetPipelines();
  const [pipelineFilter, setPipelineFilter] = reactExports.useState("all");
  const [step, setStep] = reactExports.useState(1);
  const filteredLeads = reactExports.useMemo(() => {
    let list = leads.filter((l) => l.phone);
    if (pipelineFilter !== "all") {
      const pid = BigInt(pipelineFilter);
      list = list.filter((l) => l.pipelineId === pid);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) => (l.name ?? "").toLowerCase().includes(q) || (l.firstName ?? "").toLowerCase().includes(q) || (l.phone ?? "").includes(q)
      );
    }
    return list;
  }, [leads, search, pipelineFilter]);
  const toggleLead = (id) => {
    setSelectedLeadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
  const selectedLeads = filteredLeads.filter(
    (l) => selectedLeadIds.has(l.id.toString())
  );
  if (step === 2 && selectedLeads.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
          "Contact List (",
          selectedLeads.length,
          " leads)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setStep(1),
            "data-ocid": "drip.cell_phone.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
              "Back"
            ]
          }
        )
      ] }),
      selectedTemplate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 border text-sm",
          style: {
            background: "oklch(0.97 0.01 264)",
            borderColor: "oklch(0.88 0.04 264)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide", children: "Message template" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: selectedTemplate.body })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "border rounded-xl divide-y",
          style: { borderColor: "oklch(0.91 0 0)" },
          "data-ocid": "drip.cell_phone.contact_list",
          children: selectedLeads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-3",
              "data-ocid": `drip.cell_phone.contact.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: lead.name || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `sms:${lead.phone}`,
                      className: "text-sm font-mono hover:underline",
                      style: { color: "oklch(0.32 0.15 264)" },
                      children: lead.phone
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `sms:${lead.phone}${selectedTemplate ? `?body=${encodeURIComponent(personalize(selectedTemplate.body, lead))}` : ""}`,
                    className: "shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        "data-ocid": `drip.cell_phone.text_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5 mr-1" }),
                          "Open in SMS"
                        ]
                      }
                    )
                  }
                )
              ]
            },
            lead.id.toString()
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Tap a phone number or the Text button to open your messaging app. Each message must be sent manually." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Select Leads & Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onBack,
          "data-ocid": "drip.cell_phone.cancel_button",
          children: "Cancel"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search leads…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "drip.cell_phone.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: pipelineFilter,
          onChange: (e) => setPipelineFilter(e.target.value),
          className: "input-field text-sm",
          style: { minWidth: 120 },
          "data-ocid": "drip.cell_phone.pipeline_select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Pipelines" }),
            pipelines.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id.toString(), children: p.name }, p.id.toString()))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border rounded-xl overflow-y-auto divide-y",
        style: { maxHeight: 240, borderColor: "oklch(0.91 0 0)" },
        "data-ocid": "drip.cell_phone.lead_list",
        children: filteredLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-8 text-muted-foreground gap-2",
            "data-ocid": "drip.cell_phone.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No leads with phone numbers." })
            ]
          }
        ) : filteredLeads.map((lead, i) => {
          const isChecked = selectedLeadIds.has(lead.id.toString());
          const cbId = `cell-phone-lead-${lead.id.toString()}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: cbId,
              className: "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors",
              "data-ocid": `drip.cell_phone.lead_item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: cbId,
                    checked: isChecked,
                    onCheckedChange: () => toggleLead(lead.id.toString())
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: lead.name || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lead.phone })
                ] })
              ]
            },
            lead.id.toString()
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-1.5 block", children: "Choose a template (optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: selectedTemplateId,
          onChange: (e) => setSelectedTemplateId(e.target.value),
          className: "input-field text-sm w-full",
          "data-ocid": "drip.cell_phone.template_select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No template — just contact list" }),
            templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.id, children: t.name }, t.id))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        disabled: selectedLeadIds.size === 0,
        onClick: () => setStep(2),
        style: { background: "oklch(0.32 0.15 264)", color: "white" },
        "data-ocid": "drip.cell_phone.view_list_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-1.5" }),
          "View Contact List (",
          selectedLeadIds.size,
          ")"
        ]
      }
    )
  ] });
}
function MethodCard({
  value,
  selected,
  onSelect,
  icon,
  title,
  description,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: onSelect,
      className: "flex-1 text-left rounded-xl border-2 p-4 transition-all",
      style: {
        borderColor: selected ? "oklch(0.32 0.15 264)" : "oklch(0.88 0 0)",
        background: selected ? "oklch(0.97 0.015 264)" : "white"
      },
      "data-ocid": ocid,
      "aria-pressed": selected,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            style: {
              background: selected ? "oklch(0.32 0.15 264)" : "oklch(0.94 0 0)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: selected ? "white" : "oklch(0.45 0 0)" }, children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-semibold",
                style: {
                  color: selected ? "oklch(0.22 0.12 264)" : "oklch(0.35 0 0)"
                },
                children: title
              }
            ),
            selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                style: { background: "oklch(0.32 0.15 264)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-white" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: description })
        ] })
      ] })
    }
  );
}
function DripPage() {
  const { data: campaigns = [], isLoading: campaignsLoading } = useDripCampaigns();
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: templates = [] } = useSmsTemplates();
  const { subscriptionTier } = useSubscription();
  const hasAi = tierHasFeature(subscriptionTier, "ai");
  const twilioNumbers = reactExports.useMemo(() => loadTwilioNumbers(), []);
  const [sendMethod, setSendMethod] = reactExports.useState(
    () => loadSendMethod(twilioNumbers)
  );
  const handleSetSendMethod = (method) => {
    setSendMethod(method);
    saveSendMethod(method);
  };
  const [view, setView] = reactExports.useState(
    "dashboard"
  );
  const [selectedCampaign, setSelectedCampaign] = reactExports.useState(null);
  const stopFnRef = reactExports.useRef(null);
  const markSentMut = useMarkLeadSent();
  const markFailedMut = useMarkLeadFailed();
  const addTextRecord = useAddTextRecord();
  const { data: dripCampaigns } = useDripCampaigns();
  const startCampaignExecution = reactExports.useCallback(
    (campaign, spinVersions = []) => {
      if (stopFnRef.current) {
        stopFnRef.current();
        stopFnRef.current = null;
      }
      const numNumbers = Math.max(1, twilioNumbers.length);
      const pending = [...campaign.leadIds];
      const queues = Array.from({ length: numNumbers }, () => []);
      pending.forEach((lid, i) => {
        queues[i % numNumbers].push(lid);
      });
      const stop = startDripQueue({
        campaignId: campaign.id,
        queues,
        twilioNumbers,
        templateBody: campaign.templateBody,
        templateVersions: spinVersions,
        leads,
        onSent: (campaignId, leadId, body) => {
          markSentMut.mutate({ campaignId, leadId });
          addTextRecord.mutate({ leadId, messageBody: body });
        },
        onFailed: (campaignId, leadId) => {
          markFailedMut.mutate({ campaignId, leadId });
        },
        onDone: () => {
          ue.success("SMS Drip campaign completed!");
        }
      });
      stopFnRef.current = stop;
    },
    [twilioNumbers, leads, markSentMut, markFailedMut, addTextRecord]
  );
  reactExports.useEffect(() => {
    const running = dripCampaigns?.find((c) => c.status === "running");
    if (running && running.leadIds.length > 0) {
      startCampaignExecution(running);
    }
    return () => {
      if (stopFnRef.current) {
        stopFnRef.current();
        stopFnRef.current = null;
      }
    };
  }, []);
  const handleLaunched = (campaign, versions) => {
    setView("dashboard");
    startCampaignExecution(campaign, versions);
    ue.info("SMS Drip campaign running! Keep this tab open.", {
      duration: 6e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-5", "data-ocid": "drip.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
            style: { background: "oklch(0.32 0.15 264)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-5 h-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground leading-tight", children: "SMS Drip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Automated SMS sequences with randomized timing" })
        ] })
      ] }),
      view === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setView(sendMethod === "twilio" ? "builder" : "cell_phone_list"),
          style: { background: "oklch(0.56 0.16 44)", color: "white" },
          className: "shrink-0",
          "data-ocid": "drip.new_campaign_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
            "New Campaign"
          ]
        }
      )
    ] }),
    view === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-5 flex flex-col gap-3",
        "data-ocid": "drip.send_method_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Sending Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", "data-ocid": "drip.send_method_toggle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MethodCard,
              {
                value: "twilio",
                selected: sendMethod === "twilio",
                onSelect: () => handleSetSendMethod("twilio"),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                title: "Twilio (Automated)",
                description: "Texts sent automatically with randomized delays",
                ocid: "drip.method.twilio"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MethodCard,
              {
                value: "cell_phone",
                selected: sendMethod === "cell_phone",
                onSelect: () => handleSetSendMethod("cell_phone"),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
                title: "Cell Phone (Manual)",
                description: "You send each text manually from your phone",
                ocid: "drip.method.cell_phone"
              }
            )
          ] }),
          sendMethod === "cell_phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 border flex items-start gap-3",
              style: {
                background: "oklch(0.97 0.02 240)",
                borderColor: "oklch(0.85 0.05 240)"
              },
              "data-ocid": "drip.cell_phone.info_box",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Info,
                  {
                    className: "w-4 h-4 mt-0.5 shrink-0",
                    style: { color: "oklch(0.4 0.15 240)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-medium",
                      style: { color: "oklch(0.3 0.12 240)" },
                      children: "Manual sending via Cell Phone"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cell phone mode requires you to send each text manually." }),
                    " ",
                    `After selecting your leads and template, you'll get a contact list. Tap the "Open in SMS" button next to each lead to open your messages app with the text ready to send — then hit send yourself.`
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "This is useful when you don't have a Twilio account, prefer iMessage delivery, or want full control over each message before it goes out." })
                ] })
              ]
            }
          )
        ]
      }
    ),
    view === "cell_phone_list" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "drip.cell_phone.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Smartphone,
          {
            className: "w-4 h-4",
            style: { color: "oklch(0.32 0.15 264)" }
          }
        ),
        "Cell Phone — Manual Send"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CellPhoneContactList,
        {
          leads,
          templates,
          onBack: () => setView("dashboard")
        }
      ) })
    ] }),
    view === "builder" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "drip.builder.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Plus,
          {
            className: "w-4 h-4",
            style: { color: "oklch(0.56 0.16 44)" }
          }
        ),
        "New SMS Drip Campaign"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CampaignBuilder,
        {
          onCancel: () => setView("dashboard"),
          onLaunched: handleLaunched,
          leads,
          templates,
          twilioNumbers,
          hasAi
        }
      ) })
    ] }),
    view === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: sendMethod === "twilio" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col gap-3 mb-5",
          "data-ocid": "drip.campaign_list",
          children: campaignsLoading || leadsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : campaigns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border flex flex-col items-center justify-center py-16 text-center gap-4",
              style: {
                borderColor: "oklch(0.91 0 0)",
                borderStyle: "dashed"
              },
              "data-ocid": "drip.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                    style: { background: "oklch(0.32 0.15 264 / 0.08)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Droplets,
                      {
                        className: "w-7 h-7",
                        style: { color: "oklch(0.32 0.15 264)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No campaigns yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first SMS Drip campaign to start sending automated text sequences." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => setView("builder"),
                    style: {
                      background: "oklch(0.56 0.16 44)",
                      color: "white"
                    },
                    "data-ocid": "drip.empty_state_create_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                      "Create Campaign"
                    ]
                  }
                )
              ]
            }
          ) : campaigns.map((campaign, i) => {
            const totalLeads = campaign.leadIds.length + campaign.sentLeadIds.length + campaign.failedLeadIds.length;
            const sent = campaign.sentLeadIds.length;
            const pct = totalLeads > 0 ? Math.round(sent / totalLeads * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full text-left rounded-2xl border transition-all hover:shadow-md active:scale-[0.99]",
                style: {
                  borderColor: "oklch(0.91 0 0)",
                  background: "white"
                },
                onClick: () => setSelectedCampaign(campaign),
                "data-ocid": `drip.campaign_item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: campaign.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        sent,
                        "/",
                        totalLeads,
                        " sent",
                        campaign.startedAt != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                          "· Started",
                          " ",
                          new Date(
                            Number(campaign.startedAt) / 1e6
                          ).toLocaleDateString()
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: campaign.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-1.5 rounded-full overflow-hidden",
                      style: { background: "oklch(0.92 0 0)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full transition-all",
                          style: {
                            width: `${pct}%`,
                            background: campaign.status === "stopped" ? "oklch(0.5 0.18 27)" : campaign.status === "completed" ? "oklch(0.55 0.16 145)" : "oklch(0.32 0.15 264)"
                          }
                        }
                      )
                    }
                  )
                ] })
              },
              campaign.id.toString()
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BirthdayDripCard, {})
    ] }) }),
    selectedCampaign && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CampaignDetail,
      {
        campaign: selectedCampaign,
        leads,
        onClose: () => setSelectedCampaign(null)
      }
    )
  ] });
}
export {
  DripPage as default
};
