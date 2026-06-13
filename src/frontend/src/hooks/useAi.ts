/**
 * useAi.ts — Stub file. All AI features have been removed from Tele-Blast.
 * Only ThetaVideoCredentials and admin API key hooks are kept for import compatibility.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

/* ─── Theta Video Services Credentials ──────────────────────────── */

export interface ThetaVideoCredentials {
  apiKey: string;
  apiSecret: string;
  partnerId: string;
  partnerApiKey: string;
  partnerApiSecret: string;
}

export function useSetThetaVideoCredentials() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ThetaVideoCredentials>({
    mutationFn: async (creds: ThetaVideoCredentials) => {
      try {
        localStorage.setItem(
          "tele-blast:theta-video-creds",
          JSON.stringify(creds),
        );
      } catch {
        // non-fatal
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thetaVideoCredentials"] });
      queryClient.invalidateQueries({ queryKey: ["thetaVideoApiStatus"] });
    },
  });
}

export function useGetThetaVideoCredentials() {
  const { actor, isFetching } = useBackend();
  return useQuery<ThetaVideoCredentials | null, Error>({
    queryKey: ["thetaVideoCredentials"],
    queryFn: async () => {
      void actor; // actor retained for hook dependency
      try {
        const raw = localStorage.getItem("tele-blast:theta-video-creds");
        if (!raw) return null;
        return JSON.parse(raw) as ThetaVideoCredentials;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetThetaVideoApiStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery<{ configured: boolean }, Error>({
    queryKey: ["thetaVideoApiStatus"],
    queryFn: async () => {
      void actor;
      try {
        const raw = localStorage.getItem("tele-blast:theta-video-creds");
        if (!raw) return { configured: false };
        const creds = JSON.parse(raw) as Partial<ThetaVideoCredentials>;
        return {
          configured: !!(
            creds.apiKey?.trim() &&
            creds.apiSecret?.trim() &&
            creds.partnerId?.trim()
          ),
        };
      } catch {
        return { configured: false };
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

/* ─── Admin: API Key Management (kept for import compatibility) ── */

export function useSetAnthropicApiKey() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (_apiKey: string) => {
      // AI features removed — no-op stub
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anthropicApiStatus"] });
    },
  });
}

export function useSetThetaApiKey() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (_apiKey: string) => {
      // AI features removed — no-op stub
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thetaApiStatus"] });
    },
  });
}

export function useGetAnthropicApiStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery<{ configured: boolean }, Error>({
    queryKey: ["anthropicApiStatus"],
    queryFn: async () => {
      void actor;
      return { configured: false };
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetThetaApiStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery<{ configured: boolean }, Error>({
    queryKey: ["thetaApiStatus"],
    queryFn: async () => {
      void actor;
      return { configured: false };
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

/* ─── Stub exports — kept for import compatibility with other pages ── */
/* These pages (Advertise, ColdCall, LocalSeo, SocialMedia, etc.) import from
   useAi.ts. They will be hidden from navigation but still exist in the codebase.
   These stubs prevent TypeScript errors without requiring a full page rewrite. */

import type { Lead } from "../types";

export interface GeneratedTemplate {
  subject?: string;
  body: string;
}

export interface GeneratedAdCopy {
  headline: string;
  bodyCopy: string;
  cta: string;
}

export interface GeneratedAdCreatives {
  imageDescription: string;
  headlines: string[];
  colorPalette: string[];
  overlayText: string;
  cta: string;
}

export interface GbpPost {
  type: string;
  title: string;
  content: string;
}

export interface GeneratedGbpProfile {
  businessDescription: string;
  tagline: string;
  categories: string[];
  attributes: string[];
  posts: GbpPost[];
}

export interface GeneratedOnPageSeo {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  h2s: string[];
  introParagraph: string;
  ctaText: string;
  keywords: string[];
}

export interface BacklinkSource {
  name: string;
  url: string;
  description: string;
  category: string;
  domainAuthority: string;
}

export interface GeneratedBacklinkSuggestions {
  sources: BacklinkSource[];
  strategy: string;
}

export interface CustomizedTemplate {
  headline: string;
  subheadline: string;
  bodyParagraph: string;
  ctaText: string;
  formFields: string[];
  trustBadge: string;
  benefitBullets: string[];
}

export interface BrandedFormResult {
  html: string;
  headline: string;
  ctaText: string;
  formFields: string[];
  colorPrimary: string;
  colorAccent: string;
}

export interface LeadResearchResult {
  leadId: bigint;
  summary: string;
  socialProfiles: string[];
  contactVerification: string;
  businessOverview: string;
}

function notAvailable(): never {
  throw new Error("AI features are not available on the $30 Pro plan.");
}

const NULL_ERROR: Error | null = null;

export function useAiGenerateTemplate() {
  return {
    mutateAsync: async (_args: unknown) => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiSearchLeads() {
  return {
    mutateAsync: async (_args: { searchQuery: string; leads: Lead[] }): Promise<
      Lead[]
    > => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateColdCallScript(_lead: Lead | null) {
  return {
    mutateAsync: async (_lead: Lead): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateColdCallScriptForLead() {
  return {
    mutateAsync: async (_leadId: bigint): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateAdCopy() {
  return {
    mutateAsync: async (_args: unknown): Promise<GeneratedAdCopy> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateAdCreatives() {
  return {
    mutateAsync: async (_args: unknown): Promise<GeneratedAdCreatives> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateGbpProfile() {
  return {
    mutateAsync: async (_args: unknown): Promise<GeneratedGbpProfile> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateBacklinkSuggestions() {
  return {
    mutateAsync: async (
      _args: unknown,
    ): Promise<GeneratedBacklinkSuggestions> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiCustomizeLandingTemplate() {
  return {
    mutateAsync: async (_args: unknown): Promise<CustomizedTemplate> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateBrandedForm() {
  return {
    mutateAsync: async (_args: unknown): Promise<BrandedFormResult> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateImage() {
  return {
    mutateAsync: async (_args: unknown): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateVideo() {
  return {
    mutateAsync: async (_args: unknown): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateSocialPost() {
  return {
    mutateAsync: async (_args: unknown): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGenerateOnPageSeo() {
  return {
    mutateAsync: async (_args: unknown): Promise<GeneratedOnPageSeo> =>
      notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiResearchLead() {
  return {
    mutateAsync: async (_leadId: bigint): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useAiGeneratePromoImage() {
  return {
    mutateAsync: async (_args: unknown): Promise<string> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}

export function useBatchAiResearchLeads() {
  return {
    mutateAsync: async (
      _leadIds: bigint[],
    ): Promise<Array<{ leadId: bigint; result: string }>> => notAvailable(),
    isPending: false,
    isError: false,
    error: NULL_ERROR,
  };
}
