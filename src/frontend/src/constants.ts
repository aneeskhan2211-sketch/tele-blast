import { PipelineStage } from "./types";

export const PIPELINE_STAGES: {
  value: PipelineStage;
  label: string;
  color: string;
}[] = [
  {
    value: PipelineStage.Prospect,
    label: "Prospect",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: PipelineStage.Contacted,
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: PipelineStage.Qualified,
    label: "Qualified",
    color: "bg-green-100 text-green-800",
  },
  {
    value: PipelineStage.ClosedWon,
    label: "Closed Won",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    value: PipelineStage.ClosedLost,
    label: "Closed Lost",
    color: "bg-red-100 text-red-800",
  },
];

export const REVENUE_RANGES = [
  "Under $100K",
  "$100K – $250K",
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M+",
];

export const INDUSTRIES = [
  "Restaurant / Food Service",
  "Retail",
  "Construction",
  "Healthcare",
  "Professional Services",
  "Auto Repair",
  "Beauty / Salon",
  "Fitness / Gym",
  "Real Estate",
  "Manufacturing",
  "Transportation / Logistics",
  "Technology",
  "Education",
  "Other",
];

/**
 * Stripe Payment Link for the Pro plan ($30/month).
 */
export const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/fZu9AS7l31bR38A51RaIM1d";

/**
 * Stripe Payment Link for the Pro + Landing Page plan ($45/month).
 * Replace the placeholder with the real link when available.
 */
export const STRIPE_PAYMENT_LINK_LANDING = "#upgrade-landing-page";

/**
 * Stripe Payment Link for the Pro + Landing Page + Ads plan ($95/month).
 * Replace the placeholder with the real link when available.
 */
export const STRIPE_PAYMENT_LINK_ADS = "#";

/**
 * Stripe Payment Link for the Pro + Local SEO (Ultimate) plan ($200/month).
 * Replace the placeholder with the real link when available.
 */
export const STRIPE_PAYMENT_LINK_SEO = "#upgrade-seo";

/**
 * Subscription tiers used throughout the app.
 * - "none"        — not subscribed
 * - "pro"         — $30/month Pro plan
 * - "pro_landing" — $45/month Pro + Landing Page plan
 * - "pro_ads"     — $95/month Pro + Landing Page + Ads plan (includes Advertise section)
 * - "pro_seo"     — $200/month Ultimate plan (includes everything + Local SEO tools)
 */
export type SubscriptionTier =
  | "none"
  | "pro"
  | "pro_landing"
  | "pro_ads"
  | "pro_seo";

/** localStorage key for persisting the tier on this device. */
export const SUBSCRIPTION_TIER_KEY = "tele_blast_subscription_tier";
