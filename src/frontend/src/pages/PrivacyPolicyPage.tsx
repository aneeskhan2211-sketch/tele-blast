import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Menu, TrendingUp, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useSEO } from "../hooks/useSEO";

// ── Section data ──────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    content: (
      <>
        <p>
          MSB Consultants, Inc. ("Tele-Blast," "Company," "we," "us," or "our")
          respects your privacy and is committed to protecting it through our
          compliance with this Privacy Policy (this "Policy").
        </p>
        <p>
          This Policy describes the types of information we may collect from
          you, or that you may provide, when you visit our website or mobile
          applications (collectively, our "Website"), and our practices for
          collecting, using, maintaining, protecting, and disclosing that
          information.
        </p>
        <p>This Policy applies to information we collect:</p>
        <ul>
          <li>On this Website.</li>
          <li>
            In email, text, and other electronic communications between you and
            this Website.
          </li>
          <li>
            Through our mobile and desktop applications, which provide dedicated
            non-browser-based interaction between you and this Website.
          </li>
          <li>
            When you interact with our advertising and applications on
            third-party websites and services, if those applications or
            advertising include links to this Policy.
          </li>
        </ul>
        <p>
          This Policy does <strong>NOT</strong> apply to information collected
          by:
        </p>
        <ul>
          <li>
            Us, offline or through any other means, including on any other
            website operated by Tele-Blast or any third party; or
          </li>
          <li>
            Any third party, including through any application or content
            (including advertising) that may link to or be accessible from or on
            our Website.
          </li>
        </ul>
        <p className="font-semibold">
          PLEASE READ THIS POLICY CAREFULLY. If you do not agree with our
          policies and practices, you must not use our Website. By accessing or
          using this Website, you acknowledge that you have read, understood,
          and agree to be bound by this Policy. This Policy may change from time
          to time. Your continued use of this Website after we make changes
          constitutes your acceptance of those changes.
        </p>
      </>
    ),
  },
  {
    id: "children",
    number: "2",
    title: "Children Under the Age of 16",
    content: (
      <>
        <p>
          Our Website is not intended for, nor directed to, children under 16
          years of age. No person under the age of 16 may provide any personal
          information to or on our Website. We do not knowingly collect personal
          information from children under the age of 16. If you are under 16, do
          not use or provide any information on this Website or through any of
          its features or functionality.
        </p>
        <p>
          If we learn that we have collected or received personal information
          from a child under the age of 16 without verification of parental
          consent, we will take prompt steps to delete that information. If you
          believe we may have any information from or about a child under the
          age of 16, please contact us immediately at{" "}
          <a href="mailto:privacy@tele-blast.com">privacy@tele-blast.com</a>.
        </p>
        <p>
          California residents under 16 years of age may have additional rights
          regarding the collection and sale of their personal information.
          Please see the "Your State Privacy Rights" section below for more
          information.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    number: "3",
    title: "Information We Collect About You and How We Collect It",
    content: (
      <>
        <p>
          We collect several types of information from and about users of our
          Website, including:
        </p>
        <ul>
          <li>
            Information by which you may be personally identified, such as your
            name, postal address, email address, telephone number, or any other
            identifier by which you may be contacted online or offline
            ("Personal Information");
          </li>
          <li>
            Information that is about you but that does not individually
            identify you; and/or
          </li>
          <li>
            Information about your internet connection, the equipment you use to
            access our Website, and usage details.
          </li>
        </ul>
        <p>
          We collect this information: (A) directly from you when you provide it
          to us; (B) automatically as you navigate through our Website
          (information collected automatically may include usage details, IP
          addresses, and information collected through cookies, web beacons, and
          other tracking technologies); and/or (C) from third parties, such as
          our business partners and service providers.
        </p>

        <h3>Information You Provide to Us</h3>
        <p>The information we collect on or through our Website may include:</p>
        <ul>
          <li>
            Information that you provide by filling in forms on our Website,
            including information provided at the time of registering to use our
            Website, subscribing to our services, or requesting further
            services. We may also ask you for information when you report a
            problem with our Website.
          </li>
          <li>
            Records and copies of your correspondence (including email
            addresses) if you contact us.
          </li>
          <li>
            Your responses to surveys that we may ask you to complete for
            research purposes.
          </li>
          <li>
            Details of transactions you carry out through our Website and the
            fulfillment of your orders. You may be required to provide financial
            information before placing an order through our Website.
          </li>
        </ul>

        <h3>
          Information We Collect Through Automatic Data Collection Technologies
        </h3>
        <p>
          As you navigate through and interact with our Website, we may use
          cookies and other automatic data collection technologies to collect
          certain information about your equipment, browsing actions, and usage
          patterns. A "cookie" is a small piece of data stored on your browser
          and used by web servers to identify your browser over time, including
          your preferences and other session information.
        </p>
        <p>
          Information we collect through automatic data collection technologies
          may include:
        </p>
        <ul>
          <li>
            Details of your visits to our Website, including traffic data,
            location data, and other communication data and the resources that
            you access and use on the Website.
          </li>
          <li>
            Information about your computer and internet connection, including
            your IP address, operating system, and browser type.
          </li>
        </ul>
        <p>
          This automatically collected information may include Personal
          Information and helps us improve our Website and deliver a better and
          more personalized experience by enabling us to:
        </p>
        <ul>
          <li>Estimate our audience size and usage patterns.</li>
          <li>
            Store information about your preferences, allowing us to customize
            our Website according to your individual interests.
          </li>
          <li>Recognize you when you return to our Website.</li>
        </ul>
        <p>
          You may refuse to accept browser cookies by activating the appropriate
          setting on your browser. However, if you configure your browser to
          reject cookies, you may be unable to access certain parts of our
          Website or features of our online services. Unless you adjust your
          browser settings to refuse cookies, our system will issue cookies when
          you direct your browser to our Website.
        </p>

        <h3>Third-Party Use of Cookies and Other Tracking Technologies</h3>
        <p>
          Certain content or applications on our Website are served by third
          parties, including our business partners and service providers, which
          may use cookies alone or in conjunction with web beacons or other
          tracking technologies to collect information about you when you use
          our Website. The information they collect may be associated with your
          Personal Information, or they may collect information — including
          Personal Information — about your online activities over time and
          across different websites and other online services. They may use this
          information to provide you with interest-based (behavioral)
          advertising or other targeted content.
        </p>
        <p>
          We do not control these third parties' tracking technologies or how
          they may be used. If you have any questions about an advertisement or
          other targeted content, you should contact the responsible provider
          directly. For information about how you can opt out of receiving
          targeted advertising from many providers, see the "Choices About How
          We Use and Disclose Your Information" section below.
        </p>
      </>
    ),
  },
  {
    id: "use-of-information",
    number: "4",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          We use information that we collect about you or that you provide to
          us, including any Personal Information:
        </p>
        <ul>
          <li>To present our Website and its contents to you.</li>
          <li>
            To provide you with information, products, or services that you
            request from us.
          </li>
          <li>To fulfill any other purpose for which you provide it.</li>
          <li>
            To provide you with notices about your account, including expiration
            and renewal notices.
          </li>
          <li>
            To carry out our obligations and enforce our rights arising from any
            contracts entered into between you and us, including for billing and
            collection purposes.
          </li>
          <li>
            To notify you about changes to our Website or any products or
            services we offer or provide through it.
          </li>
          <li>
            In any other manner we may describe when you provide the
            information.
          </li>
          <li>For any other purpose with your prior consent.</li>
        </ul>
        <p>
          We may also use your information to contact you about our own products
          and services and those of third parties that may be of interest to
          you. If you do not wish for us to use your information in this way,
          please send a written opt-out request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>. For more
          information, see "Choices About How We Use and Disclose Your
          Information."
        </p>
      </>
    ),
  },
  {
    id: "disclosure",
    number: "5",
    title: "Disclosure of Your Information",
    content: (
      <>
        <p>
          We may disclose aggregated information about our users, and
          information that does not identify any individual, without
          restriction.
        </p>
        <p>
          We may disclose Personal Information that we collect or that you
          provide as described in this Policy:
        </p>
        <ul>
          <li>
            To our contractors, service providers, and other third parties we
            engage to support our business operations.
          </li>
          <li>
            To a buyer or other successor entity in the event of a merger,
            divestiture, restructuring, reorganization, dissolution, or other
            sale or transfer of some or all of Tele-Blast's assets, whether as a
            going concern or as part of bankruptcy, liquidation, or similar
            proceeding, in which Personal Information held by Tele-Blast is
            among the assets transferred.
          </li>
          <li>To fulfill the purpose for which you provided it.</li>
          <li>
            For any other purpose disclosed by us at the time you provide the
            information.
          </li>
          <li>With your consent.</li>
        </ul>
        <p>We may also disclose your Personal Information:</p>
        <ul>
          <li>
            To comply with any court order, applicable law, or legal process,
            including in response to any government or regulatory request.
          </li>
          <li>
            To enforce or apply our Terms of Use and other agreements, including
            for billing and collection purposes.
          </li>
          <li>
            If we believe disclosure is necessary or appropriate to protect the
            rights, property, or safety of Tele-Blast, our customers, or others,
            including for purposes of fraud protection and credit risk
            reduction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "choices",
    number: "6",
    title: "Choices About How We Use and Disclose Your Information",
    content: (
      <>
        <p>
          We are committed to providing you with meaningful choices regarding
          your Personal Information. We have established the following
          mechanisms to help you exercise control over your information:
        </p>
        <p>
          <strong>Tracking Technologies and Advertising.</strong> You may
          configure your browser to refuse all or some browser cookies, or to
          alert you when cookies are being sent. If you disable or refuse
          cookies, please note that some parts of our Website may be
          inaccessible or may not function properly.
        </p>
        <p>
          <strong>Disclosure to Third Parties for Advertising.</strong> If you
          do not want us to share your Personal Information with unaffiliated or
          non-agent third parties for promotional purposes, you may opt out by
          submitting a written request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
        <p>
          <strong>Promotional Communications from Tele-Blast.</strong> If you do
          not wish to have your contact information used by Tele-Blast to
          promote our own or third parties' products or services, you may opt
          out by submitting a written request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>. If we
          have sent you a promotional email, you may send a return email
          requesting to be removed from future distributions. This opt-out does
          not apply to information provided to Tele-Blast as a result of a
          product or service purchase, warranty registration, product service
          experience, or similar transaction.
        </p>
        <p>
          <strong>Targeted Advertising.</strong> If you do not want us to use
          information we collect or that you provide to us to deliver
          advertisements based on advertisers' target-audience preferences, you
          may opt out by submitting a written request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
        <p>
          We do not control third parties' collection or use of your information
          for interest-based advertising purposes. However, these third parties
          may provide you with ways to opt out of having your information
          collected or used in this manner. You may also opt out of receiving
          targeted advertisements from members of the Network Advertising
          Initiative ("NAI") by visiting the NAI's website.
        </p>
        <p>
          Residents of certain states, including California, Nevada, Colorado,
          Virginia, and Utah, may have additional personal information rights
          and choices. Please see "Your State Privacy Rights" below for more
          information.
        </p>
      </>
    ),
  },
  {
    id: "state-rights",
    number: "7",
    title: "Your State Privacy Rights",
    content: (
      <>
        <p>
          State consumer privacy laws may provide residents with additional
          rights regarding our use of their Personal Information. To appeal a
          decision regarding a request placed pursuant to the consumer rights
          described in this section, please contact us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>

        <h3>California</h3>
        <p>
          If you are a California resident, California law may provide you with
          additional rights regarding our use of your Personal Information. To
          learn more about your California privacy rights, visit our CCPA
          Privacy Notice for California Residents.
        </p>
        <p>
          California's "Shine the Light" law (Cal. Civ. Code § 1798.83) permits
          users of our Website who are California residents to request certain
          information regarding our disclosure of Personal Information to third
          parties for their direct marketing purposes. To make such a request,
          please send a written request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>

        <h3>Utah</h3>
        <p>
          Utah residents are afforded the following rights under applicable
          state privacy law:
        </p>
        <ul>
          <li>
            The right to confirm whether we process their Personal Information.
          </li>
          <li>
            The right to access and request deletion of certain Personal
            Information.
          </li>
          <li>The right to data portability.</li>
          <li>
            The right to opt out of the processing of Personal Information for
            targeted advertising and sales.
          </li>
        </ul>
        <p>
          To exercise any of these rights, Utah residents may submit a request
          to <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>

        <h3>Colorado, Connecticut &amp; Virginia</h3>
        <p>
          Residents of Colorado, Connecticut, and Virginia are afforded the
          following rights under applicable state privacy laws:
        </p>
        <ul>
          <li>
            The right to confirm whether we process their Personal Information.
          </li>
          <li>
            The right to access and request deletion of certain Personal
            Information.
          </li>
          <li>The right to data portability.</li>
          <li>
            The right to opt out of the processing of Personal Information for
            targeted advertising and sales.
          </li>
          <li>
            The right to correct inaccuracies in their Personal Information,
            taking into account the nature of the information and the purposes
            of its processing.
          </li>
          <li>
            The right to opt out of profiling in furtherance of decisions that
            produce legal or similarly significant effects.
          </li>
        </ul>
        <p>
          To exercise any of these rights, residents of Colorado, Connecticut,
          or Virginia may submit a request to{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>

        <h3>Nevada</h3>
        <p>
          Nevada residents have a limited right to opt out of certain sales of
          Personal Information. Residents who wish to exercise this opt-out
          right may submit a request to:{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    number: "8",
    title: "Data Security",
    content: (
      <>
        <p>
          We have implemented commercially reasonable technical and
          organizational measures designed to secure your Personal Information
          against accidental loss and unauthorized access, use, alteration, and
          disclosure. All information you provide to us is stored on our secure
          servers behind firewalls. Any payment transactions will be encrypted
          using Secure Sockets Layer (SSL) or equivalent technology.
        </p>
        <p>
          The security of your information also depends on your own practices.
          Where we have provided you (or where you have chosen) a password for
          access to certain parts of our Website, you are responsible for
          maintaining the confidentiality of that password. We urge you not to
          share your password with anyone.
        </p>
        <p>
          Unfortunately, the transmission of information over the Internet is
          not completely secure. Although we endeavor to protect your Personal
          Information, we cannot guarantee the security of your Personal
          Information transmitted to our Website. Any transmission of Personal
          Information is at your own risk. We are not responsible for
          circumvention of any privacy settings or security measures contained
          on our Website.
        </p>
      </>
    ),
  },
  {
    id: "policy-changes",
    number: "9",
    title: "Changes to Our Privacy Policy",
    content: (
      <>
        <p>
          It is our policy to post any changes we make to this Policy on this
          page with a notice that the Policy has been updated, and to update the
          "Last Updated" date at the top of this page. If we make material
          changes to how we treat our users' Personal Information, we will
          notify you by posting a notice on our Website's home page. You are
          responsible for periodically visiting our Website and reviewing this
          Policy for any changes. Your continued use of our Website following
          the posting of changes constitutes your acceptance of such changes.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: "10",
    title: "Contact Information",
    content: (
      <>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          privacy practices, please contact us at:
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
          <p className="mt-2 text-sm">
            General inquiries:{" "}
            <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>
          </p>
          <p className="mt-1 text-sm">
            Privacy inquiries:{" "}
            <a href="mailto:privacy@tele-blast.com">privacy@tele-blast.com</a>
          </p>
        </div>
      </>
    ),
  },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO({
    title: "Privacy Policy | Tele-Blast",
    description:
      "Tele-Blast Privacy Policy. Learn how we collect, use, and protect your personal data.",
    canonical: "https://www.tele-blast.com/privacy-policy",
    robots: "noindex, follow",
    ogTitle: "Tele-Blast Privacy Policy",
    ogDescription:
      "Learn how Tele-Blast collects, uses, and protects your personal data.",
    ogUrl: "https://www.tele-blast.com/privacy-policy",
    ogType: "website",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy",
      url: "https://www.tele-blast.com/privacy-policy",
      description:
        "Privacy Policy for Tele-Blast (MSB Consultants, Inc.), describing data collection, use, and user rights.",
      publisher: {
        "@type": "Organization",
        name: "Tele-Blast",
        url: "https://www.tele-blast.com",
      },
    }),
  });

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.97 0 0)" }}
      data-ocid="privacy_policy.page"
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "oklch(0.22 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
        data-ocid="privacy_policy.header"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex items-center gap-2 shrink-0"
            onClick={() => navigate({ to: "/" })}
            data-ocid="privacy_policy.header.logo_button"
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
              className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
              onClick={() => navigate({ to: "/" })}
              data-ocid="privacy_policy.nav.home_link"
            >
              Home
            </button>
            <span className="text-sm font-medium text-white">
              Privacy Policy
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 min-h-[40px]"
              onClick={() => navigate({ to: "/login" })}
              data-ocid="privacy_policy.header.login_button"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 sm:px-4 py-2 rounded-lg min-h-[40px] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
              style={{ background: "oklch(0.56 0.16 44)" }}
              onClick={() => navigate({ to: "/login" })}
              data-ocid="privacy_policy.header.get_started_button"
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Get Started</span>
            </button>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="privacy_policy.header.mobile_menu_toggle"
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
              data-ocid="privacy_policy.mobile_nav.home_link"
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
                data-ocid="privacy_policy.mobile_nav.login_button"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-3 rounded-lg min-h-[44px] transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "oklch(0.56 0.16 44)" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate({ to: "/login" });
                }}
                data-ocid="privacy_policy.mobile_nav.get_started_button"
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section
        className="pt-14 px-5 py-12 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)",
        }}
        data-ocid="privacy_policy.hero.section"
      >
        <div className="max-w-4xl mx-auto pt-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.82 0.14 44)" }}
          >
            Last Updated: June 27, 2023
          </p>
        </div>
      </section>

      {/* ── Document Body ────────────────────────────────────────────────── */}
      <main
        className="flex-1 px-5 py-12"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="privacy_policy.content"
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
            data-ocid="privacy_policy.toc"
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
                    className="text-sm transition-colors duration-200 hover:underline"
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
                    ? {
                        borderBottom: "1px solid oklch(0.88 0 0)",
                      }
                    : undefined
                }
                data-ocid={`privacy_policy.section.${id}`}
              >
                {/* Section heading */}
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

                {/* Section body — prose styles applied via wrapper */}
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

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-8 border-t"
        style={{
          background: "oklch(0.18 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
        data-ocid="privacy_policy.footer"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.98 0 0 / 0.4)" }}>
            © {new Date().getFullYear()} Tele-Blast. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
              data-ocid="privacy_policy.footer.home_link"
            >
              Home
            </Link>
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.98 0 0 / 0.7)" }}
            >
              Privacy Policy
            </span>
            <Link
              to="/privacy-policy-full"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.82 0.14 44)" }}
              data-ocid="privacy_policy.footer.full_privacy_link"
            >
              Full Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
              data-ocid="privacy_policy.footer.terms_link"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </footer>

      {/* ── Inline prose styles ──────────────────────────────────────────── */}
      <style>{`
        .prose-content p {
          margin-bottom: 0.875rem;
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .prose-content p:last-child {
          margin-bottom: 0;
        }
        .prose-content ul,
        .prose-content ol {
          margin: 0.75rem 0 1rem 0;
          padding-left: 1.5rem;
        }
        .prose-content li {
          margin-bottom: 0.4rem;
          line-height: 1.7;
          font-size: 0.9375rem;
        }
        .prose-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: oklch(0.22 0.12 264);
        }
        .prose-content a {
          color: oklch(0.56 0.16 44);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-content a:hover {
          color: oklch(0.46 0.16 44);
        }
        .prose-content strong {
          font-weight: 700;
          color: oklch(0.25 0 0);
        }
      `}</style>
    </div>
  );
}
