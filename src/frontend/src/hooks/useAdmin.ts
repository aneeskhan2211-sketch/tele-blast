import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PayoutFilter, type UserExportRecord } from "../backend";
import type { UserAdminView } from "../backend";
import { useBackend } from "./useBackend";

export function useIsAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["admin", "isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 1,
    retryDelay: 2_000,
  });
}

export function useGetUserCount() {
  const { actor } = useBackend();
  return useQuery<{ ok: number } | { err: string }>({
    queryKey: ["admin", "userCount"],
    queryFn: async () => {
      if (!actor) return { err: "Not connected" };
      try {
        const result = await actor.getUserCount();
        if (result.__kind__ === "ok") {
          return { ok: Number(result.ok) };
        }
        return { err: result.err };
      } catch (e) {
        return {
          err: e instanceof Error ? e.message : "Failed to get user count",
        };
      }
    },
    enabled: !!actor,
    staleTime: 0,
    refetchOnMount: true,
    retry: (failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 =
        msg.includes("ic0508") ||
        msg.includes("is stopped") ||
        msg.includes("canister stopped");
      if (isIC0508) return failureCount < 12;
      return failureCount < 5;
    },
    retryDelay: (_failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 =
        msg.includes("ic0508") ||
        msg.includes("is stopped") ||
        msg.includes("canister stopped");
      if (isIC0508) return 10_000;
      return Math.min(1_000 * 2 ** _failureCount, 30_000);
    },
  });
}

export function useAllUsers() {
  const { actor } = useBackend();
  return useQuery<UserAdminView[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAdminUserList();
    },
    enabled: !!actor,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: false,
    retry: (failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 =
        msg.includes("ic0508") ||
        msg.includes("is stopped") ||
        msg.includes("canister stopped");
      if (isIC0508) return failureCount < 3;
      return failureCount < 1;
    },
    retryDelay: (_failureCount, error) => {
      const msg = error instanceof Error ? error.message.toLowerCase() : "";
      const isIC0508 =
        msg.includes("ic0508") ||
        msg.includes("is stopped") ||
        msg.includes("canister stopped");
      if (isIC0508) return 3_000;
      return 1_000;
    },
  });
}

export function useAllAffiliates() {
  const { actor } = useBackend();
  return useQuery({
    queryKey: ["admin", "affiliates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAffiliates();
    },
    enabled: !!actor,
  });
}
export function useAdminEnrichedPayouts() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["admin", "enrichedPayouts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetEnrichedPayouts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useAdminEnsureAffiliateRecord() {
  const { actor } = useBackend();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      name,
      email,
    }: { target?: Principal; name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      const resolvedTarget: Principal = target ?? identity!.getPrincipal();
      const result = await actor.adminEnsureAffiliateRecord(
        resolvedTarget,
        name,
        email,
      );
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "affiliates"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
    },
  });
}

export function usePayouts(filter: string) {
  const { actor, isFetching } = useBackend();
  const payoutFilter =
    filter === "pending"
      ? PayoutFilter.pending
      : filter === "paid"
        ? PayoutFilter.paid
        : filter === "ready"
          ? PayoutFilter.ready
          : PayoutFilter.all;

  return useQuery({
    queryKey: ["admin", "payouts", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPayouts(payoutFilter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGrantAdmin() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.grantAdmin(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useRevokeUserAccess() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.revokeUserAccess(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useRestoreUserAccess() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.restoreUserAccess(principal);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useMarkPayoutPaid() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commissionId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markPayoutPaid(commissionId);
      if ("err" in result) throw new Error(String(result.err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "payouts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "enrichedPayouts"] });
    },
  });
}

export function useAdminDeleteAllLeads() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<number> => {
      if (!actor) throw new Error("Not connected");
      const leads = await actor.getLeads();
      if (leads.length === 0) return 0;
      const ids = leads.map((l) => l.id);
      const result = await actor.bulkDeleteLeads(ids);
      if (result.__kind__ === "err") throw new Error(result.err);
      return ids.length;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// ── Package Config ────────────────────────────────────────────────────────────
export interface PackageConfigEntry {
  tier: string;
  enabled: boolean;
}

export function useGetPackageConfig() {
  const { actor } = useBackend();
  return useQuery<PackageConfigEntry[]>({
    queryKey: ["admin", "packageConfig"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as {
            getPackageConfig: () => Promise<PackageConfigEntry[]>;
          }
        ).getPackageConfig();
        return result;
      } catch {
        // Backend method not yet deployed — use localStorage
        const tiers = ["pro"];
        return tiers.map((tier) => {
          try {
            const stored = localStorage.getItem(
              `tele-blast:pkg-enabled:${tier}`,
            );
            if (stored !== null) return { tier, enabled: stored === "true" };
          } catch {
            /* ignore */
          }
          return { tier, enabled: true };
        });
      }
    },
    enabled: !!actor,
    staleTime: 5_000,
  });
}

export function useSetPackageEnabled() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tier,
      enabled,
    }: { tier: string; enabled: boolean }) => {
      if (!actor) throw new Error("Not connected");
      try {
        await (
          actor as unknown as {
            setPackageEnabled: (
              tier: string,
              enabled: boolean,
            ) => Promise<void>;
          }
        ).setPackageEnabled(tier, enabled);
      } catch {
        try {
          const key = `tele-blast:pkg-enabled:${tier}`;
          localStorage.setItem(key, String(enabled));
        } catch {
          /* ignore */
        }
      }
      return { tier, enabled };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packageConfig"] });
    },
  });
}

export function useSetUserTier() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principal,
      tier,
    }: {
      principal: Principal;
      tier: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.setUserTier(principal, tier);
      if (result.__kind__ === "err") throw new Error(String(result.err));
      return result.ok.tier;
    },
    onSuccess: (_returnedTier) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionTier"] });
      queryClient.invalidateQueries({ queryKey: ["featureAccess"] });
      queryClient.invalidateQueries({ queryKey: ["tokenBalance"] });

      window.setTimeout(() => {
        void queryClient.refetchQueries({
          queryKey: ["subscriptionTier"],
          exact: true,
        });
        void queryClient.refetchQueries({
          queryKey: ["featureAccess"],
          exact: true,
        });
        void queryClient.refetchQueries({
          queryKey: ["tokenBalance"],
          exact: true,
        });
        void queryClient.refetchQueries({ queryKey: ["admin", "users"] });
      }, 200);
    },
  });
}

// ── Pre-Registered Accounts ────────────────────────────────────────────────────

const PRE_REG_LS_KEY = "tele-blast:pre-registered";

export type { PreRegisteredUser } from "../backend";

interface LocalPreRegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: bigint;
}

function getLocalPreRegistered(): LocalPreRegisteredUser[] {
  try {
    const raw = localStorage.getItem(PRE_REG_LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalPreRegisteredUser[];
  } catch {
    return [];
  }
}

export function useCreatePreRegisteredUser() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
    }: {
      name: string;
      email: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await actor.adminCreatePreRegisteredUser(
          name,
          email,
          phone,
        );
        if ("err" in result) throw new Error(String(result.err));
        const stored = getLocalPreRegistered();
        const newEntry: LocalPreRegisteredUser = {
          id: `pre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          email,
          phone,
          createdAt: BigInt(Date.now() * 1_000_000),
        };
        stored.push(newEntry);
        try {
          localStorage.setItem(PRE_REG_LS_KEY, JSON.stringify(stored));
        } catch {
          /* ignore */
        }
        return newEntry;
      } catch (err) {
        if (err instanceof Error && err.message === "Not connected") throw err;
        const stored = getLocalPreRegistered();
        const newEntry: LocalPreRegisteredUser = {
          id: `pre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          email,
          phone,
          createdAt: BigInt(Date.now() * 1_000_000),
        };
        stored.push(newEntry);
        try {
          localStorage.setItem(PRE_REG_LS_KEY, JSON.stringify(stored));
        } catch {
          /* ignore */
        }
        return newEntry;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "preRegistered"] });
    },
  });
}

export function useDeletePreRegisteredUser() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await (
          actor as unknown as {
            adminDeletePreRegisteredUser: (
              email: string,
            ) => Promise<{ ok: null } | { err: string }>;
          }
        ).adminDeletePreRegisteredUser(email);
        if (result && "err" in result) throw new Error(String(result.err));
      } catch (backendErr) {
        if (
          backendErr instanceof Error &&
          backendErr.message !== "Not connected"
        ) {
          // Swallow method-not-found errors — update localStorage only
        } else {
          throw backendErr;
        }
      }
      try {
        const stored = getLocalPreRegistered();
        const updated = stored.filter((u) => u.email !== email);
        localStorage.setItem(PRE_REG_LS_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "preRegistered"] });
    },
  });
}

export function useGetPreRegisteredUsers() {
  const { actor } = useBackend();
  return useQuery<LocalPreRegisteredUser[]>({
    queryKey: ["admin", "preRegistered"],
    queryFn: async () => {
      if (!actor) return getLocalPreRegistered();
      try {
        const result = await actor.adminGetPreRegisteredUsers();
        return result.map((u, i) => ({
          id: `backend-${i}-${u.email}`,
          name: u.name,
          email: u.email,
          phone: u.phone,
          createdAt: u.createdAt,
        }));
      } catch {
        return getLocalPreRegistered();
      }
    },
    enabled: !!actor,
    staleTime: 30_000,
  });
}

// ── User Export ──────────────────────────────────────────────────────────────

export function useExportUsers() {
  const { actor } = useBackend();
  return useQuery<UserExportRecord[]>({
    queryKey: ["admin", "exportUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.generateUserExport();
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled: false,
    staleTime: 0,
    retry: false,
  });
}

// ── Coming Soon Teaser Config ─────────────────────────────────────────────────

const COMING_SOON_KEY = "tele-blast:show-coming-soon-teaser";

export function useGetShowComingSoonTeaser() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["admin", "showComingSoonTeaser"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        const result = await (
          actor as unknown as {
            getShowComingSoonTeaser: () => Promise<boolean>;
          }
        ).getShowComingSoonTeaser();
        return result;
      } catch {
        try {
          const stored = localStorage.getItem(COMING_SOON_KEY);
          return stored === "true";
        } catch {
          return false;
        }
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSetShowComingSoonTeaser() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (show: boolean) => {
      if (!actor) throw new Error("Not connected");
      try {
        await (
          actor as unknown as {
            setShowComingSoonTeaser: (show: boolean) => Promise<void>;
          }
        ).setShowComingSoonTeaser(show);
      } catch {
        try {
          localStorage.setItem(COMING_SOON_KEY, String(show));
        } catch {
          /* ignore */
        }
      }
      return show;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "showComingSoonTeaser"],
      });
    },
  });
}
