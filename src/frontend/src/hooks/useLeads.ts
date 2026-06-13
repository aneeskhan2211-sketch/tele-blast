import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CallOutcome,
  CsvLeadInput,
  EmailTemplate,
  Lead,
  LeadInput,
  LeadUpdate,
  Pipeline,
  SmsTemplate,
} from "../types";
import type { PipelineStage } from "../types";
import { useBackend } from "./useBackend";

export function useLeads(pipelineId?: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Lead[]>({
    queryKey: ["leads", pipelineId?.toString() ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getLeads();
      if (pipelineId == null) return all;
      return all.filter((l) => l.pipelineId === pipelineId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLead(id: bigint) {
  const { actor, isFetching } = useBackend();
  return useQuery<Lead | null>({
    queryKey: ["lead", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLead(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddLead() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lead: LeadInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addLead(lead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useUpdateLead() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: { id: bigint; updates: LeadUpdate }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateLead(id, updates);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["lead", id.toString()] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteLead() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteLead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useBulkImportLeads() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      csvLeads,
      stage,
      pipelineId,
    }: {
      csvLeads: CsvLeadInput[];
      stage: PipelineStage;
      pipelineId?: bigint | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bulkImportLeads(csvLeads, stage, pipelineId ?? null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAddCallRecord() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      outcome,
    }: {
      leadId: bigint;
      outcome: CallOutcome;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCallRecord(leadId, outcome);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useAddTextRecord() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      messageBody,
    }: {
      leadId: bigint;
      messageBody: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTextRecord(leadId, messageBody);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useAddEmailRecord() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      timestamp,
    }: {
      leadId: bigint;
      timestamp: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEmailRecord(leadId, timestamp);
    },
    onSuccess: (_data, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useEmailTemplates() {
  const { actor, isFetching } = useBackend();
  return useQuery<EmailTemplate[]>({
    queryKey: ["emailTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmailTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSmsTemplates() {
  const { actor, isFetching } = useBackend();
  return useQuery<SmsTemplate[]>({
    queryKey: ["smsTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSmsTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateLeadDnc() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      leadId,
      isDnc,
    }: { leadId: bigint; isDnc: boolean }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateLeadDnc(leadId, isDnc);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId.toString()] });
    },
  });
}

export function useBulkDeleteLeads() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: bigint[]) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.bulkDeleteLeads(ids);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// ── Pipeline CRUD hooks ────────────────────────────────────────────────────────

export function useGetPipelines() {
  const { actor, isFetching } = useBackend();
  return useQuery<Pipeline[]>({
    queryKey: ["pipelines"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPipelines();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePipeline() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createPipeline(name);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
    },
  });
}

export function useUpdatePipeline() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: bigint; name: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updatePipeline(id, name);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
    },
  });
}

export function useDeletePipeline() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deletePipeline(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
