import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Menu, TrendingUp, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useSEO } from "../hooks/useSEO";

// ── Section data ───────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "agreement",
    number: "1",
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          These Terms and Conditions (the "Terms") constitute a legally binding
          agreement between you ("User," "you," or "your") and MSB Consultants,
          Inc. d/b/a Tele-Blast ("Tele-Blast," "Company," "we," "us," or "our").
          By accessing, registering for, or using the Tele-Blast platform,
          website, or any of its associated services (collectively, the
          "Services"), you acknowledge that you have read, understood, and agree
          to be bound by these Terms in their entirety.
        </p>
        <p>
          If you do not agree to these Terms, you must immediately discontinue
          use of the Services and must not create an account or otherwise access
          the platform. Your continued use of the Services following any
          amendment to these Terms constitutes your acceptance of the amended
          Terms.
        </p>
      </>
    ),
  },
  {
    id: "services",
    number: "2",
    title: "Description of Services",
    content: (
      <>
        <p>
          Tele-Blast is a cloud-based sales pipeline and lead management
          platform operated by MSB Consultants, Inc. The Services include, but
          are not limited to:
        </p>
        <ul>
          <li>
            Lead management, storage, and organization with customizable fields
            and pipeline stages;
          </li>
          <li>
            Outreach tools including a power dialer, click-to-call,
            click-to-text, and click-to-email functionality;
          </li>
          <li>
            AI-powered tools including smart search, cold call script
            generation, email and SMS template generation, and ad copy
            generation;
          </li>
          <li>
            Sign-up form builders and AI-developed landing pages for lead
            capture;
          </li>
          <li>Affiliate program management and referral tracking;</li>
          <li>
            Advertising guidance tools for Meta (Facebook/Instagram) and Google
            Ads, including AI creative generation.
          </li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of
          the Services at any time, with or without notice. We shall not be
          liable to you or any third party for any such modification,
          suspension, or discontinuation.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    number: "3",
    title: "Eligibility",
    content: (
      <>
        <p>
          To access and use the Services, you must: (a) be at least 18 years of
          age; (b) have the legal authority to enter into a binding contract
          with Tele-Blast; (c) be using the Services for lawful business
          purposes only; and (d) be authorized to use the Services on behalf of
          your organization or business, if applicable.
        </p>
        <p>
          By using the Services, you represent and warrant that you meet all of
          the foregoing eligibility requirements. If you do not meet these
          requirements, you must not access or use the Services.
        </p>
      </>
    ),
  },
  {
    id: "account-registration",
    number: "4",
    title: "Account Registration",
    content: (
      <>
        <p>
          To access the full functionality of the Services, you must create an
          account. You agree to: (a) provide accurate, current, and complete
          information during the registration process; (b) maintain and promptly
          update your account information to keep it accurate, current, and
          complete; (c) maintain the security and confidentiality of your
          account credentials; and (d) immediately notify Tele-Blast of any
          unauthorized use of your account or any other breach of security.
        </p>
        <p>
          You are solely responsible for all activities that occur under your
          account, whether or not you authorized such activities. Tele-Blast
          will not be liable for any loss or damage arising from your failure to
          safeguard your account credentials.
        </p>
      </>
    ),
  },
  {
    id: "subscription-billing",
    number: "5",
    title: "Subscription and Billing",
    content: (
      <>
        <p>
          Tele-Blast offers the following subscription plans, billed monthly:
        </p>
        <ul>
          <li>
            <strong>Pro — $30/month:</strong> Core lead management, pipeline,
            power dialer, templates, cold call scripts, queues, CSV import,
            Twilio SMS integration, AI smart search, and communication history.
          </li>
          <li>
            <strong>Pro + Landing Page — $45/month:</strong> All Pro features,
            plus an AI-developed landing page with contact submission form, lead
            database integration, new lead queue, and welcome email setup.
          </li>
          <li>
            <strong>Pro + Landing Page + Ads — $95/month:</strong> All features
            in Pro + Landing Page, plus the Advertise section with AI ad copy
            generation, AI creative generation, and guided campaign setup for
            Meta and Google Ads.
          </li>
          <li>
            <strong>Ultimate — $200/month:</strong> All features in all lower
            tiers, plus the Social Media Post Generator, Text-to-Video Promo
            Creator, AI Google Business Profile Builder, and additional AI
            tools.
          </li>
        </ul>
        <p>
          All subscriptions automatically renew at the end of each billing
          period unless cancelled prior to the renewal date. Subscription fees
          are charged in advance on a monthly basis. No refunds shall be issued
          for partial months of service, unused features, or early cancellation.
        </p>
        <p>
          You may cancel your subscription at any time through your account
          settings or by contacting us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>. Your
          access to paid features will continue until the end of the current
          billing period. All billing is processed through Stripe, and you agree
          to Stripe's terms of service in addition to these Terms.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    number: "6",
    title: "Acceptable Use Policy",
    content: (
      <>
        <p>
          You agree to use the Services only for lawful purposes and in
          accordance with these Terms. You expressly agree that you shall not,
          in connection with your use of the Services:
        </p>
        <ul>
          <li>
            Send unsolicited communications (spam) to any person or entity;
          </li>
          <li>
            Violate the Telephone Consumer Protection Act (TCPA), CAN-SPAM Act,
            or any other applicable federal, state, or local law governing
            electronic communications, telemarketing, or outreach;
          </li>
          <li>
            Contact any individual who has opted out, requested removal, or is
            registered on the National Do Not Call Registry, without proper
            consent as required by applicable law;
          </li>
          <li>
            Scrape, harvest, or collect personal data from any third-party
            source in violation of that source's terms of service or applicable
            law;
          </li>
          <li>
            Engage in any deceptive, fraudulent, misleading, or illegal
            activity;
          </li>
          <li>
            Use the Services to harass, abuse, or harm any individual or group;
            or
          </li>
          <li>
            Attempt to gain unauthorized access to any portion of the Services
            or any related systems or networks.
          </li>
        </ul>
        <p>
          You acknowledge that you are solely responsible for ensuring that all
          outreach conducted using the Services complies with applicable law,
          including but not limited to the TCPA and CAN-SPAM Act. Tele-Blast
          assumes no responsibility for your compliance with such laws.
        </p>
      </>
    ),
  },
  {
    id: "ai-features",
    number: "7",
    title: "AI Features",
    content: (
      <>
        <p>
          Tele-Blast offers AI-powered features, including but not limited to
          smart search, cold call script generation, email and SMS template
          generation, ad copy generation, AI creative generation, Google
          Business Profile content generation, and on-page SEO generation
          (collectively, "AI Features").
        </p>
        <p>
          All output generated by AI Features is provided on an "as-is" basis
          and is intended for informational and productivity purposes only. You
          are solely responsible for reviewing, editing, approving, and
          verifying all AI-generated content before use or dissemination. AI
          Features do not constitute legal, compliance, financial, or
          professional advice of any kind.
        </p>
        <p>
          Tele-Blast makes no representations or warranties regarding the
          accuracy, completeness, appropriateness, or fitness for a particular
          purpose of any AI-generated output. You assume all risks associated
          with the use of AI-generated content.
        </p>
      </>
    ),
  },
  {
    id: "lead-data",
    number: "8",
    title: "Lead Data and Privacy",
    content: (
      <>
        <p>
          You retain ownership of all lead data, notes, templates, and other
          content you upload, create, or store within the Services ("User
          Content"). By using the Services, you grant Tele-Blast a limited,
          non-exclusive, worldwide, royalty-free license to store, process, and
          display your User Content solely for the purpose of providing the
          Services to you.
        </p>
        <p>
          You represent and warrant that: (a) you have all necessary rights,
          consents, and permissions to upload and use the lead data and other
          User Content within the Services; (b) your use of such data complies
          with all applicable privacy laws and regulations, including but not
          limited to the CCPA, GDPR, and any applicable state privacy laws; and
          (c) the collection and use of such lead data was lawfully obtained and
          any required consents have been obtained.
        </p>
        <p>
          Tele-Blast processes your User Content in accordance with its Privacy
          Policy, which is incorporated herein by reference.
        </p>
      </>
    ),
  },
  {
    id: "affiliate-program",
    number: "9",
    title: "Affiliate Program",
    content: (
      <>
        <p>
          Tele-Blast offers an affiliate program pursuant to which approved
          affiliates may earn commissions for referring new paying subscribers
          to the Services. The following terms apply to participation in the
          affiliate program:
        </p>
        <ul>
          <li>
            <strong>Commission Rate:</strong> Affiliates earn a commission equal
            to twenty-five percent (25%) of the first month's subscription fee
            paid by each referred subscriber.
          </li>
          <li>
            <strong>Payout Timing:</strong> Commissions become payable thirty
            (30) days after the date of the qualifying sale, subject to
            verification.
          </li>
          <li>
            <strong>Payout Method:</strong> Commissions are paid via PayPal to
            the email address on file for your affiliate account.
          </li>
          <li>
            <strong>Modification or Termination:</strong> Tele-Blast reserves
            the right to modify the commission structure, eligibility
            requirements, or any other terms of the affiliate program, or to
            terminate the affiliate program entirely, upon reasonable notice to
            affiliates.
          </li>
          <li>
            <strong>Prohibited Conduct:</strong> Affiliates may not use
            deceptive, misleading, or fraudulent methods to generate referrals.
            Tele-Blast reserves the right to withhold or reverse commissions
            associated with fraudulent or invalid referrals and to terminate
            affiliate accounts for violations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "10",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The Tele-Blast name, logo, platform, and all features, content,
          technology, and functionality of the Services — including but not
          limited to software, source code, user interface design, graphics,
          text, and data compilations — are owned by or licensed to MSB
          Consultants, Inc. and are protected by applicable intellectual
          property laws, including copyright, trademark, patent, and trade
          secret laws.
        </p>
        <p>
          Your subscription grants you a limited, non-exclusive,
          non-transferable, revocable license to access and use the Services
          solely for your internal business purposes, subject to these Terms. No
          other rights are granted. You may not reproduce, modify, distribute,
          create derivative works from, publicly display, or otherwise exploit
          any portion of the Services without the prior written consent of
          Tele-Blast.
        </p>
        <p>
          User Content (including leads, notes, templates, and other materials
          you create) remains your property. You grant Tele-Blast only the
          limited license described in Section 8 above.
        </p>
      </>
    ),
  },
  {
    id: "limitation-liability",
    number: "11",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          THE SERVICES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS
          WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
          LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, TITLE, OR NON-INFRINGEMENT.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
          TELE-BLAST, MSB CONSULTANTS, INC., OR THEIR RESPECTIVE OFFICERS,
          DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
          DAMAGES ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE
          OF THE SERVICES, EVEN IF TELE-BLAST HAS BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          IN NO EVENT SHALL TELE-BLAST'S TOTAL AGGREGATE LIABILITY ARISING OUT
          OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICES
          EXCEED THE TOTAL FEES PAID BY YOU TO TELE-BLAST IN THE THREE (3)
          MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    number: "12",
    title: "Indemnification",
    content: (
      <>
        <p>
          You agree to defend, indemnify, and hold harmless Tele-Blast, MSB
          Consultants, Inc., and their respective officers, directors,
          employees, agents, affiliates, and successors from and against any and
          all claims, liabilities, damages, losses, costs, expenses, and fees
          (including reasonable attorneys' fees) arising out of or relating to:
          (a) your use of the Services in violation of these Terms; (b) your
          violation of any applicable law, rule, or regulation; (c) your
          infringement or misappropriation of the intellectual property or other
          rights of any third party; or (d) any User Content you upload, submit,
          or otherwise make available through the Services.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    number: "13",
    title: "Termination",
    content: (
      <>
        <p>
          Tele-Blast reserves the right to suspend or terminate your account and
          access to the Services, at its sole discretion, with or without
          notice, for any of the following reasons: (a) violation of these
          Terms; (b) conduct that Tele-Blast determines, in its sole discretion,
          is harmful to other users, third parties, or the reputation of
          Tele-Blast; (c) non-payment of subscription fees; or (d) compliance
          with applicable law or a lawful government request.
        </p>
        <p>
          You may cancel your subscription and terminate your account at any
          time through your account settings or by contacting us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>. Upon
          termination, your right to access the Services will immediately cease.
          Tele-Blast will retain and/or delete your data in accordance with its
          Privacy Policy and applicable law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    number: "14",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the State of Florida, without regard to its conflict of law
          principles. Any legal action or proceeding arising out of or relating
          to these Terms or the Services shall be brought exclusively in the
          state or federal courts located in Miami-Dade County, Florida, and you
          hereby consent to the personal jurisdiction and venue of such courts.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    number: "15",
    title: "Changes to Terms",
    content: (
      <>
        <p>
          Tele-Blast reserves the right to modify these Terms at any time. When
          we make material changes to these Terms, we will provide notice to you
          by posting an updated version on the Tele-Blast website and, where
          practicable, by sending an email to the address associated with your
          account. The revised Terms will be effective upon posting unless
          otherwise specified.
        </p>
        <p>
          Your continued use of the Services following the effective date of any
          revised Terms constitutes your acceptance of such changes. If you do
          not agree to the revised Terms, you must discontinue use of the
          Services and cancel your account.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: "16",
    title: "Contact Information",
    content: (
      <>
        <p>
          If you have any questions regarding these Terms and Conditions, please
          contact us:
        </p>
        <div
          className="mt-4 p-5 rounded-xl border"
          style={{
            background: "oklch(0.22 0.12 264 / 0.05)",
            borderColor: "oklch(0.22 0.12 264 / 0.15)",
          }}
        >
          <p
            className="font-semibold"
            style={{ color: "oklch(0.22 0.12 264)" }}
          >
            MSB Consultants, Inc. d/b/a Tele-Blast
          </p>
          <p className="text-sm mt-1">6040 NW 60th Ave</p>
          <p className="text-sm">Parkland, FL 33067</p>
          <p className="text-sm mt-2">
            Email: <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>
          </p>
        </div>
      </>
    ),
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────

export default function TermsPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO({
    title: "Terms and Conditions | Tele-Blast",
    description:
      "Read the Tele-Blast Terms and Conditions. Understand your rights and responsibilities when using Tele-Blast SMS automation services.",
    canonical: "https://www.tele-blast.com/terms",
    robots: "noindex, follow",
    ogTitle: "Tele-Blast Terms and Conditions",
    ogDescription:
      "Tele-Blast Terms and Conditions — understand your rights and responsibilities.",
    ogUrl: "https://www.tele-blast.com/terms",
    ogType: "website",
  });

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.97 0 0)" }}
      data-ocid="terms.page"
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex items-center gap-2 shrink-0"
            onClick={() => navigate({ to: "/" })}
          >
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.56 0.16 44)" }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Tele-Blast
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 flex-1 ml-8">
            <button
              type="button"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              onClick={() => navigate({ to: "/" })}
            >
              Home
            </button>
            <Link
              to="/privacy-policy"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-sm font-medium text-white">
              Terms &amp; Conditions
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors min-h-[40px]"
              onClick={() => navigate({ to: "/login" })}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all hover:opacity-90 active:scale-95 shadow-md"
              style={{ background: "oklch(0.56 0.16 44)" }}
              onClick={() => navigate({ to: "/login" })}
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Get Started</span>
            </button>
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{
              background: "oklch(0.25 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)",
            }}
          >
            <button
              type="button"
              className="text-left text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ to: "/" });
              }}
            >
              Home
            </button>
            <div
              className="mt-2 pt-3 flex flex-col gap-2 border-t"
              style={{ borderColor: "oklch(0.98 0 0 / 0.1)" }}
            >
              <button
                type="button"
                className="flex items-center gap-2 text-white/80 text-sm font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors min-h-[44px]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate({ to: "/login" });
                }}
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all hover:opacity-90"
                style={{ background: "oklch(0.56 0.16 44)" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate({ to: "/login" });
                }}
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section
        className="pt-14 px-5 py-12 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto pt-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Terms &amp; Conditions
          </h1>
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.82 0.14 44)" }}
          >
            Last Updated: August 18, 2025 · MSB Consultants, Inc. d/b/a
            Tele-Blast
          </p>
        </div>
      </section>

      {/* Document Body */}
      <main
        className="flex-1 px-5 py-12"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="terms.content"
      >
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <nav
            className="mb-10 p-6 rounded-xl border"
            style={{
              background: "oklch(0.22 0.12 264 / 0.04)",
              borderColor: "oklch(0.22 0.12 264 / 0.12)",
            }}
            aria-label="Table of Contents"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.56 0.16 44)" }}
            >
              Table of Contents
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {SECTIONS.map(({ id, number, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "oklch(0.38 0.12 264)" }}
                  >
                    <span
                      className="font-semibold mr-1"
                      style={{ color: "oklch(0.22 0.12 264)" }}
                    >
                      {number}.
                    </span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-0">
            {SECTIONS.map(({ id, number, title, content }, idx) => (
              <section
                key={id}
                id={id}
                className="py-8"
                style={
                  idx < SECTIONS.length - 1
                    ? { borderBottom: "1px solid oklch(0.88 0 0)" }
                    : undefined
                }
                data-ocid={`terms.section.${id}`}
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.56 0.16 44 / 0.12)",
                      color: "oklch(0.56 0.16 44)",
                    }}
                  >
                    §{number}
                  </span>
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "oklch(0.22 0.12 264)" }}
                  >
                    {title}
                  </h2>
                </div>
                <div
                  className="prose-content"
                  style={{ color: "oklch(0.35 0 0)" }}
                >
                  {content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-5 py-8 border-t"
        style={{
          background: "oklch(0.18 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.98 0 0 / 0.4)" }}>
            © {new Date().getFullYear()} Tele-Blast. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Home
            </Link>
            <Link
              to="/privacy-policy"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/privacy-policy-full"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Full Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>

      {/* Inline prose styles */}
      <style>{`
        .prose-content p { margin-bottom: 0.875rem; line-height: 1.75; font-size: 0.9375rem; }
        .prose-content p:last-child { margin-bottom: 0; }
        .prose-content ul, .prose-content ol { margin: 0.75rem 0 1rem 0; padding-left: 1.5rem; }
        .prose-content li { margin-bottom: 0.4rem; line-height: 1.7; font-size: 0.9375rem; }
        .prose-content h3 { margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1rem; font-weight: 700; color: oklch(0.22 0.12 264); }
        .prose-content a { color: oklch(0.56 0.16 44); text-decoration: underline; text-underline-offset: 2px; }
        .prose-content a:hover { color: oklch(0.46 0.16 44); }
        .prose-content strong { font-weight: 700; color: oklch(0.25 0 0); }
      `}</style>
    </div>
  );
}
