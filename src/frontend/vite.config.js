import { fileURLToPath, URL } from "url";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

// Critical-path page names that MUST be bundled into the main index chunk.
// These are statically imported in App.tsx. They must NOT be split into
// separate files because any chunk with a new content-hash disappears after
// a deploy, causing "Failed to fetch dynamically imported module" errors.
const CRITICAL_PATH_PAGES = new Set([
  "LandingPage",
  "LoginPage",
  "PaymentPage",
  "AgreementPage",
  "ProfilePage",
  "OnboardingPage",
  "DashboardPage",
  "LeadFormsPage",
]);

// ---------------------------------------------------------------------------
// Sitemap plugin — generates public/sitemap.xml at build time.
// Vite copies everything in publicDir ('public/') to dist/ automatically,
// so placing the file in public/ is all that is needed.
// ---------------------------------------------------------------------------
const BASE_URL = "https://www.tele-blast.com";

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
];

function buildSitemapXml() {
  const today = new Date().toISOString().split("T")[0];

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
    urlEntry(`${BASE_URL}/`, today, "weekly", "1.0"),
    urlEntry(`${BASE_URL}/pricing`, today, "weekly", "0.9"),
    urlEntry(`${BASE_URL}/video`, today, "weekly", "0.9"),
    urlEntry(`${BASE_URL}/affiliate-signup`, today, "weekly", "0.9"),
    urlEntry(`${BASE_URL}/support`, today, "weekly", "0.9"),
    urlEntry(`${BASE_URL}/blog`, today, "weekly", "0.9"),
    ...BLOG_POSTS.map((p) =>
      urlEntry(`${BASE_URL}/blog/${p.slug}`, p.dateModified, "monthly", "0.8")
    ),
    urlEntry(`${BASE_URL}/privacy-policy`, today, "monthly", "0.5"),
    urlEntry(`${BASE_URL}/privacy-policy-full`, today, "monthly", "0.5"),
    urlEntry(`${BASE_URL}/terms`, today, "monthly", "0.5"),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n");
}

function sitemapPlugin() {
  return {
    name: "generate-sitemap",
    buildStart() {
      // Write sitemap into public/ so Vite copies it to dist/ during build.
      const publicDir = join(__dirname, "public");
      mkdirSync(publicDir, { recursive: true });
      writeFileSync(join(publicDir, "sitemap.xml"), buildSitemapXml(), "utf-8");
    },
  };
}

export default defineConfig({
  logLevel: "error",
  // Explicitly declare publicDir so _redirects and other public assets
  // are always copied into dist/ during `vite build`.
  publicDir: "public",
  build: {
    // es2020 ensures consistent module syntax across all chunks.
    target: "es2020",
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        // Stable, predictable chunk file names.
        // Hash changes only when a chunk's content changes — not randomly.
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          // Critical-path pages must stay in the main bundle.
          // Do NOT return a chunk name for these — Rollup will keep them
          // in the index entry chunk by default.
          for (const page of CRITICAL_PATH_PAGES) {
            if (id.includes(`/pages/${page}`)) {
              return undefined;
            }
          }

          // All dfinity/IC/declarations code → single stable vendor chunk
          if (
            id.includes("@dfinity") ||
            id.includes("declarations") ||
            id.includes("backend.ts")
          ) {
            return "vendor-ic";
          }
          // React ecosystem → one stable chunk
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }
          // TanStack / routing → one chunk
          if (
            id.includes("@tanstack") ||
            id.includes("node_modules/router")
          ) {
            return "vendor-router";
          }
          // All remaining node_modules → single vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    sitemapPlugin(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
});
