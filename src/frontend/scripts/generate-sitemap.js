#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates public/sitemap.xml at build time.
 * Run via: node scripts/generate-sitemap.js
 * Called automatically by the build script before vite build.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.tele-blast.com";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// Blog post lastmod dates — keep in sync with src/data/blogPosts.ts
const BLOG_POSTS = [
  { slug: "sms-broadcast-automation", dateModified: "2024-01-15" },
  { slug: "automated-follow-ups", dateModified: "2024-01-22" },
  { slug: "appointment-reminders", dateModified: "2024-01-29" },
  { slug: "centralized-communication-dashboard", dateModified: "2024-02-05" },
  { slug: "telemarketing-crm", dateModified: "2026-04-29" },
  { slug: "text-blast-service", dateModified: "2026-04-29" },
  { slug: "sms-broadcast-software-comparison", dateModified: "2026-04-29" },
  { slug: "insurance-agent-dialer", dateModified: "2026-04-29" },
  { slug: "power-dialer-app", dateModified: "2026-05-19" },
  { slug: "cheap-power-dialer", dateModified: "2026-05-19" },
  { slug: "lead-management-app-for-sales", dateModified: "2026-05-19" },
  { slug: "tele-blast-vs-simpletexting", dateModified: "2026-05-19" },
  { slug: "tele-blast-vs-aloware", dateModified: "2026-05-19" },
  { slug: "tele-blast-vs-cloudtalk", dateModified: "2026-05-19" },
  { slug: "sales-pipeline-app-for-agents", dateModified: "2026-05-19" },
  { slug: "automated-follow-up-software", dateModified: "2026-05-19" },
  { slug: "power-dialer-for-real-estate-agents", dateModified: "2026-05-19" },
  { slug: "crm-for-loan-officers", dateModified: "2026-05-19" },
  { slug: "sms-blast-for-mortgage-brokers", dateModified: "2026-05-19" },
  { slug: "dnc-management-software", dateModified: "2026-05-19" },
  { slug: "birthday-sms-for-sales", dateModified: "2026-05-19" },
  { slug: "best-crm-for-sales-agents", dateModified: "2026-05-19" },
  { slug: "small-business-power-dialer", dateModified: "2026-05-19" },
  // New vertical/guide posts (2026-05-20)
  { slug: "crm-for-business-funding-brokers", dateModified: "2026-05-20" },
  { slug: "crm-for-insurance-agents", dateModified: "2026-05-20" },
  { slug: "crm-for-outside-sales-reps", dateModified: "2026-05-20" },
  { slug: "sms-templates-for-insurance-agents", dateModified: "2026-05-20" },
  { slug: "sms-templates-for-funding-brokers", dateModified: "2026-05-20" },
  { slug: "how-to-import-leads-into-crm", dateModified: "2026-05-20" },
  { slug: "power-dialer-app-for-sales-agents", dateModified: "2026-05-20" },
  { slug: "birthday-sms-blast-for-sales-agents", dateModified: "2026-05-20" },
  { slug: "best-crm-for-small-business-sales", dateModified: "2026-05-20" },
];

// Comparison pages — live at /compare/[slug]
const COMPARISON_PAGES = [
  { slug: "tele-blast-vs-hubspot", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-pipedrive", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-zendesk-sell", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-freshworks", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-insightly", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-sugarcrm", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-bigcontacts", dateModified: "2026-05-20" },
  { slug: "tele-blast-vs-pocket-crm", dateModified: "2026-05-20" },
];

/** Build a single <url> block */
function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

const entries = [
  // Homepage
  urlEntry(`${BASE_URL}/`, TODAY, "weekly", "1.0"),
  // High-value public pages
  urlEntry(`${BASE_URL}/pricing`, TODAY, "weekly", "0.9"),
  urlEntry(`${BASE_URL}/video`, TODAY, "weekly", "0.9"),
  urlEntry(`${BASE_URL}/affiliate-signup`, TODAY, "weekly", "0.9"),
  urlEntry(`${BASE_URL}/support`, TODAY, "weekly", "0.9"),
  // Blog index
  urlEntry(`${BASE_URL}/blog`, TODAY, "weekly", "0.9"),
  // Blog posts (23 original + 9 new verticals/guides)
  ...BLOG_POSTS.map((p) =>
    urlEntry(`${BASE_URL}/blog/${p.slug}`, p.dateModified, "monthly", "0.8")
  ),
  // Comparison pages at /compare/[slug]
  ...COMPARISON_PAGES.map((p) =>
    urlEntry(`${BASE_URL}/compare/${p.slug}`, p.dateModified, "monthly", "0.8")
  ),
  // Legal pages
  urlEntry(`${BASE_URL}/privacy-policy`, TODAY, "monthly", "0.5"),
  urlEntry(`${BASE_URL}/privacy-policy-full`, TODAY, "monthly", "0.5"),
  urlEntry(`${BASE_URL}/terms`, TODAY, "monthly", "0.5"),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  "</urlset>",
].join("\n");

// Write to public/ so Vite copies it verbatim to dist/
const outDir = join(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "sitemap.xml");
writeFileSync(outPath, xml, "utf-8");

console.log(`sitemap.xml written to ${outPath} (${entries.length} URLs)`);
