import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DripCampaignView } from "../backend";
import { useBackend } from "./useBackend";

export type { DripCampaignView };

/* ─── Campaign Queries ────────────────────────────────────────────── */

export function useDripCampaigns() {
  const { actor, isFetching } = useBackend();
  return useQuery<DripCampaignView[]>({
    queryKey: ["dripCampaigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDripCampaigns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDripCampaign(id: bigint) {
  const { actor, isFetching } = useBackend();
  return useQuery<DripCampaignView | null>({
    queryKey: ["dripCampaign", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getDripCampaign(id);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

/* ─── Campaign Mutations ──────────────────────────────────────────── */

export function useCreateDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      templateId,
      templateBody,
      leadIds,
    }: {
      name: string;
      templateId: string;
      templateBody: string;
      leadIds: bigint[];
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createDripCampaign(
        name,
        templateId,
        templateBody,
        leadIds,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function usePauseDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.pauseDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function useResumeDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.resumeDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function useStopDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.stopDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function useDeleteDripCampaign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteDripCampaign(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function useMarkLeadSent() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      campaignId,
      leadId,
    }: {
      campaignId: bigint;
      leadId: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markLeadSent(campaignId, leadId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

export function useMarkLeadFailed() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      campaignId,
      leadId,
    }: {
      campaignId: bigint;
      leadId: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markLeadFailed(campaignId, leadId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripCampaigns"] });
    },
  });
}

/* ─── Birthday Drip ───────────────────────────────────────────────── */

export interface BirthdayDripConfig {
  isActive: boolean;
  template: string;
}

export function useGetBirthdayDripConfig() {
  const { actor, isFetching } = useBackend();
  return useQuery<BirthdayDripConfig>({
    queryKey: ["birthdayDripConfig"],
    queryFn: async () => {
      if (!actor) return { isActive: false, template: "" };
      try {
        // backend.d.ts: getBirthdayDripConfig returns {__kind__:"ok",ok:BirthdayDripConfigView}|{__kind__:"err",err:string}
        const result = await actor.getBirthdayDripConfig();
        if (result.__kind__ === "err") return { isActive: false, template: "" };
        // Remap backend's "templateBody" to the frontend interface field "template"
        return {
          isActive: result.ok.isActive,
          template: result.ok.templateBody,
        };
      } catch {
        return { isActive: false, template: "" };
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetBirthdayDripConfig() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: BirthdayDripConfig) => {
      if (!actor) throw new Error("Not connected");
      // backend.d.ts: setBirthdayDripConfig(templateBody: string, isActive: boolean)
      // returns {__kind__:"ok",ok:string}|{__kind__:"err",err:string}
      const result = await actor.setBirthdayDripConfig(
        config.template,
        config.isActive,
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birthdayDripConfig"] });
    },
  });
}

/* ─── SMS Spin ────────────────────────────────────────────────────── */

export function useSpinSms() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    string[],
    Error,
    { originalMessage: string; numVersions: number }
  >({
    mutationFn: async ({ originalMessage, numVersions }) => {
      if (!actor) throw new Error("Not connected");
      // backend.d.ts: spinSms returns {__kind__:"ok",ok:Array<string>}|{__kind__:"err",err:string}
      const result = await actor.spinSms(originalMessage, BigInt(numVersions));

      if (result.__kind__ === "ok") return result.ok;
      const errMsg = result.err;
      if (errMsg.includes("INSUFFICIENT_TOKENS")) {
        throw new Error(
          "You've used all your AI tokens for this period. Buy more to continue.",
        );
      }
      if (
        errMsg.toLowerCase().includes("api key") ||
        errMsg.includes("not configured")
      ) {
        throw new Error(
          "AI features require an API key. Contact your administrator to configure the Anthropic API key in Admin Panel > AI Settings.",
        );
      }
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokenBalances"] });
    },
  });
}
