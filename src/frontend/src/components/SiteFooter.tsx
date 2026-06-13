import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/insurance-leads-ai/",
    label: "LinkedIn",
    abbr: "in",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61589120873004",
    label: "Facebook",
    abbr: "f",
  },
  {
    href: "https://www.instagram.com/insuranceleadsai/",
    label: "Instagram",
    abbr: "ig",
  },
  {
    href: "https://x.com/insleadsAI",
    label: "X",
    abbr: "𝕏",
  },
];

const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Affiliate Program", href: "/affiliate-signup" },
];

const RESOURCE_LINKS = [
  { label: "Support Center", href: "/support" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Blog", href: "/blog" },
];

export function SiteFooter() {
  return (
    <footer
      className="pt-12 pb-6 px-5"
      style={{ background: "oklch(0.22 0.12 264)" }}
      data-ocid="site-footer"
    >
      <div className="max-w-6xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.56 0.16 44)" }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Tele-Blast
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-[220px]"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Power Dialer, SMS Blast &amp; CRM for Sales Teams
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.75 0.16 44)" }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href as "/"}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "oklch(0.98 0 0 / 0.6)" }}
                    data-ocid={`footer.product.${label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.75 0.16 44)" }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href as "/"}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "oklch(0.98 0 0 / 0.6)" }}
                    data-ocid={`footer.resources.${label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.75 0.16 44)" }}
            >
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ href, label, abbr }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.98 0 0 / 0.08)",
                    border: "1px solid oklch(0.98 0 0 / 0.12)",
                    color: "oklch(0.98 0 0 / 0.7)",
                  }}
                  data-ocid={`footer.social.${label.toLowerCase()}`}
                >
                  {abbr}
                </a>
              ))}
            </div>
            <p
              className="mt-4 text-xs leading-relaxed"
              style={{ color: "oklch(0.98 0 0 / 0.4)" }}
            >
              Follow us for tips on lead generation, SMS marketing, and sales
              productivity.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: "oklch(0.98 0 0 / 0.1)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span style={{ color: "oklch(0.98 0 0 / 0.4)" }}>
            &copy; {new Date().getFullYear()} Tele-Blast. All rights reserved.
          </span>
          <span style={{ color: "oklch(0.98 0 0 / 0.35)" }}>
            Built with ❤️ for sales teams &nbsp;·&nbsp;{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "oklch(0.98 0 0 / 0.35)" }}
            >
              Powered by caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
