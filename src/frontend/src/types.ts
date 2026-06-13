export type {
  Lead,
  LeadInput,
  LeadUpdate,
  SampleBusiness,
  DashboardStats,
  CsvLeadInput,
  CallRecord,
  TextRecord,
  EmailRecord,
  EmailTemplate,
  SmsTemplate,
  UserProfile,
  ProfileInput,
  Pipeline,
} from "./backend";
export { PipelineStage, CallOutcome } from "./backend";

// ── Frontend-only extensions to backend types ──────────────────────────────

/** Extends SignUpForm with a frontend-side pipelineId selection.
 *  The backend SignUpForm type does not yet carry pipelineId, so we augment
 *  it here for use in the form builder and submission flow. */
export interface SignUpFormWithPipeline {
  pipelineId?: string | null;
}

/** Extends Lead with a flag indicating it entered via the New Lead Queue.
 *  Used by queue components to track queue membership without a separate call. */
export interface LeadQueueMeta {
  isNewLeadQueued?: boolean;
}

// ── Lead source (maps to backend "source" field via LeadUpdate/LeadInput)
export type LeadSource =
  | "manual"
  | "csv_import"
  | "sign_up_form"
  | "referral"
  | "cold_call"
  | "website"
  | "social_media"
  | "other";

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  manual: "Manual Entry",
  csv_import: "CSV Import",
  sign_up_form: "Sign-Up Form",
  referral: "Referral",
  cold_call: "Cold Call",
  website: "Website",
  social_media: "Social Media",
  other: "Other",
};

export const ALL_LEAD_SOURCES: LeadSource[] = [
  "manual",
  "csv_import",
  "sign_up_form",
  "referral",
  "cold_call",
  "website",
  "social_media",
  "other",
];
