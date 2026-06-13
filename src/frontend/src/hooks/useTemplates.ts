import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmailTemplate, SmsTemplate } from "../types";
import { useBackend } from "./useBackend";

// ─── Email Templates ─────────────────────────────────────────────────────────

export function useEmailTemplates() {
  const { actor } = useBackend();
  return useQuery<EmailTemplate[]>({
    queryKey: ["emailTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmailTemplates();
    },
    enabled: !!actor,
  });
}

export function useAddEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      subject,
      body,
    }: {
      name: string;
      subject: string;
      body: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEmailTemplate(name, subject, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
  });
}

export function useUpdateEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      subject,
      body,
    }: {
      id: string;
      name?: string;
      subject?: string;
      body?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEmailTemplate(
        id,
        name ?? null,
        subject ?? null,
        body ?? null,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
  });
}

export function useDeleteEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEmailTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    },
  });
}

// ─── SMS Templates ────────────────────────────────────────────────────────────

export function useSmsTemplates() {
  const { actor } = useBackend();
  return useQuery<SmsTemplate[]>({
    queryKey: ["smsTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSmsTemplates();
    },
    enabled: !!actor,
  });
}

export function useAddSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, body }: { name: string; body: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSmsTemplate(name, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    },
  });
}

export function useUpdateSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      body,
    }: {
      id: string;
      name?: string;
      body?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSmsTemplate(id, name ?? null, body ?? null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    },
  });
}

export function useDeleteSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSmsTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    },
  });
}
