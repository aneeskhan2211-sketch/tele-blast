import { a as useQuery, u as useQueryClient, b as useMutation } from "./vendor-router-gX3Sk5jz.js";
import { H as useBackend } from "./index-DsrDu9m3.js";
function useEmailTemplates() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["emailTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmailTemplates();
    },
    enabled: !!actor
  });
}
function useAddEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      subject,
      body
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEmailTemplate(name, subject, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });
}
function useUpdateEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      subject,
      body
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEmailTemplate(
        id,
        name ?? null,
        subject ?? null,
        body ?? null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });
}
function useDeleteEmailTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEmailTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailTemplates"] });
    }
  });
}
function useSmsTemplates() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["smsTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSmsTemplates();
    },
    enabled: !!actor
  });
}
function useAddSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, body }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSmsTemplate(name, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    }
  });
}
function useUpdateSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      body
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSmsTemplate(id, name ?? null, body ?? null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    }
  });
}
function useDeleteSmsTemplate() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSmsTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smsTemplates"] });
    }
  });
}
export {
  useAddSmsTemplate as a,
  useUpdateSmsTemplate as b,
  useDeleteSmsTemplate as c,
  useEmailTemplates as d,
  useAddEmailTemplate as e,
  useUpdateEmailTemplate as f,
  useDeleteEmailTemplate as g,
  useSmsTemplates as u
};
