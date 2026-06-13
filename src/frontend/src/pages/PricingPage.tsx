import { useNavigate } from "@tanstack/react-router";
import { Check, TrendingUp } from "lucide-react";
import { PublicNavBar } from "../components/PublicNavBar";
import { STRIPE_PAYMENT_LINK } from "../constants";
import { useSEO } from "../hooks/useSEO";

// ── Pro plan features ─────────────────────────────────────────────────────────

const PRO_FEATURES = [
  "Leads & Pipeline Management",
  "Power Dialer — calls & texts only",
  "Manual SMS Templates",
  "CSV Lead Import (up to 500 leads)",
  "Lead Queues (New Lead, Follow-Up, Birthday)",
  "Multiple Pipelines",
  "Do Not Call (DNC) Management",
  "Google Voice & cell phone integration",
  "Affiliate Program — 25% commission",
] as const;

// ── Main page ──────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Pricing | Tele-Blast — $15/Month Cell Phone CRM for Sales Teams",
    description:
      "Tele-Blast utilizes your cell phone & turns into your own personal business CRM. Get full access to power dialer, SMS blast, lead management, and more for just $15/month. No contracts. Cancel anytime.",
    canonical: "https://www.tele-blast.com/pricing",
    ogTitle: "Tele-Blast Pricing — $15/Month Cell Phone CRM",
    ogDescription:
      "Everything you need to automate your business communication for $15/month. Leads, Pipeline, Power Dialer, SMS Blast, and more.",
    ogUrl: "https://www.tele-blast.com/pricing",
    ogType: "website",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Tele-Blast Pro",
      description:
        "Cell phone CRM with power dialer, SMS blast, lead management, pipeline tracking, and automated follow-up queues for sales teams.",
      brand: {
        "@type": "Brand",
        name: "Tele-Blast",
      },
      offers: {
        "@type": "Offer",
        price: "15",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://www.tele-blast.com/pricing",
        seller: {
          "@type": "Organization",
          name: "Tele-Blast",
        },
      },
    }),
  });

  function handleGetStarted() {
    const link = STRIPE_PAYMENT_LINK;
    if (!link || link.startsWith("#") || link.includes("REPLACE")) {
      navigate({ to: "/pre-signup" });
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.97 0 0)" }}
    >
      {/* Unified public nav — matches all other public pages */}
      <PublicNavBar activePath="/pricing" ocidPrefix="pricing" />

      {/* Hero headline */}
      <section
        className="py-14 px-5 text-center pt-28"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.12 264) 100%)",
        }}
        data-ocid="pricing.hero.section"
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider"
            style={{
              background: "oklch(0.56 0.16 44 / 0.18)",
              color: "oklch(0.82 0.14 44)",
              border: "1px solid oklch(0.56 0.16 44 / 0.3)",
            }}
          >
            Simple, Transparent Pricing
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
            data-ocid="pricing.hero.headline"
          >
            One Plan. Everything Included. — $15/mo Cell Phone CRM
          </h1>
          <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
            All the tools a sales team needs to close more deals — for a flat
            $15/month. No contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section
        className="px-5 py-12 sm:py-16"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="pricing.cards.section"
      >
        <div className="max-w-lg mx-auto">
          <div
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{
              border: "2.5px solid oklch(0.56 0.16 44)",
              background: "oklch(0.99 0 0)",
            }}
            data-ocid="pricing.tier_card.1"
          >
            {/* Header */}
            <div
              className="px-7 pt-7 pb-5"
              style={{ borderBottom: "1px solid oklch(0.93 0 0)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "oklch(0.22 0.12 264 / 0.08)" }}
              >
                <TrendingUp
                  className="w-5 h-5"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                />
              </div>

              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.56 0.16 44)" }}
              >
                Pro Plan
              </p>

              <div className="flex items-end gap-1 mb-2">
                <span
                  className="text-5xl font-extrabold leading-none"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                >
                  $15
                </span>
                <span
                  className="text-base font-medium pb-1"
                  style={{ color: "oklch(0.52 0 0)" }}
                >
                  /month
                </span>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.48 0 0)" }}
              >
                Your cell phone becomes your own personal business CRM — power
                dialer, SMS blast, and lead pipeline in one.
              </p>
            </div>

            {/* Features */}
            <ul className="px-7 py-5 space-y-2.5">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "oklch(0.56 0.16 44 / 0.12)" }}
                  >
                    <Check
                      className="w-3 h-3"
                      style={{ color: "oklch(0.46 0.16 44)" }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium leading-snug"
                    style={{ color: "oklch(0.28 0 0)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="px-7 pb-7 pt-2">
              <button
                type="button"
                className="w-full font-bold text-base py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white shadow-md min-h-[48px]"
                style={{ background: "oklch(0.22 0.12 264)" }}
                onClick={handleGetStarted}
                data-ocid="pricing.tier_cta.1"
              >
                Get Started — $15/mo
              </button>
              <p
                className="text-xs text-center mt-2.5"
                style={{ color: "oklch(0.58 0 0)" }}
              >
                Cancel anytime · Powered by Stripe
              </p>
            </div>
          </div>

          {/* Sales agent images */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <figure className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="/assets/generated/sales-agent-cell-phone-crm.dim_800x600.jpg"
                alt="Sales agent using cell phone CRM to manage leads and SMS blast campaigns on Tele-Blast"
                className="w-full h-44 object-cover object-center"
                loading="lazy"
                width="800"
                height="275"
              />
              <figcaption className="sr-only">
                Professional sales agent using Tele-Blast cell phone CRM
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="/assets/generated/sales-rep-mobile-crm-calls.dim_800x600.jpg"
                alt="Professional sales representative using mobile CRM on smartphone for power dialer and lead pipeline management"
                className="w-full h-44 object-cover object-center"
                loading="lazy"
                width="800"
                height="275"
              />
              <figcaption className="sr-only">
                Sales rep using Tele-Blast mobile CRM for power dialing
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-5 py-8 text-center mt-auto"
        style={{ background: "oklch(0.22 0.12 264)" }}
        data-ocid="pricing.footer"
      >
        <p className="text-sm" style={{ color: "oklch(0.98 0 0 / 0.5)" }}>
          © {new Date().getFullYear()} Tele-Blast. All rights reserved. ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.98 0 0 / 0.5)" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
