import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Menu, TrendingUp, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

// ── Section data ───────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "overview",
    number: "1",
    title: "Overview",
    content: (
      <>
        <p>
          <strong>Effective Date: August 18, 2025</strong>
        </p>
        <p>
          This Privacy Policy describes how MSB Consultants, Inc. and its
          worldwide affiliates and subsidiaries ("Tele-Blast," "we," "our," or
          "us") process the Personal Data related to your ("User," "you," or
          "your") use of our services. This Policy covers all interactions with
          Tele-Blast services, such as directly via the website, mobile or
          desktop application, web application, extensions, desk phone, or
          indirectly through interactions with companies that use Tele-Blast
          services (collectively, "Services"). We are committed to protecting
          your privacy when you use our Services.
        </p>
        <p>
          To exercise your data protection rights or for more information about
          Tele-Blast's data protection practices, please contact us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
        <p>
          Your use of Tele-Blast's Services is also subject to the Terms of
          Service or the General Terms and Conditions associated with the Master
          Services Agreement that governs your account, each of which may be
          amended from time to time and are effective as of the date posted. Any
          terms used in this Policy without definition have the definitions
          given to them in the Terms of Service or the Applicable Data
          Protection Laws.
        </p>
        <p>
          <strong>"Applicable Data Protection Laws"</strong> means all laws and
          regulations that are applicable to the processing of Personal Data
          under the Agreement, including European Data Protection Laws and the
          CCPA, as well as any future amending acts of the above-mentioned data
          protection laws and any other applicable international, federal,
          national, and state privacy and data protection laws, rules, and
          regulations pertaining to privacy, data processing and use, data
          protection, data security, encryption, or confidentiality.
        </p>
        <p>
          <strong>"Personal Data"</strong> means all data which is defined as
          'Personal Data,' 'personal information,' or 'personally identifiable
          information' (or analogous terms) under the Applicable Data Protection
          Laws.
        </p>
      </>
    ),
  },
  {
    id: "types-of-data",
    number: "2",
    title: "Types of Data We Collect",
    content: (
      <>
        <ul>
          <li>
            <strong>Contact:</strong> Information that facilitates communication
            between you and Tele-Blast, such as name, email and physical
            address, telephone number, and password.
          </li>
          <li>
            <strong>Billing:</strong> Payment information.
          </li>
          <li>
            <strong>Location:</strong> Information about a specific location,
            such as physical address or IP address.
          </li>
          <li>
            <strong>Identifiers:</strong> Information that may identify a
            specific individual, such as name, profile picture, and birthdate.
          </li>
          <li>
            <strong>Device and Session:</strong> Information about your browser
            or device, which may include your IP address, device IDs, or other
            unique identifiers, cookie information, the type of browser and/or
            device you're using to access our Services, and the page or feature
            you requested.
          </li>
          <li>
            <strong>Telephony:</strong> Information concerning customer call
            records such as time, duration, and the number of the called party.
          </li>
          <li>
            <strong>Session audio, video, and messaging:</strong> The audio,
            video, and messaging (including SMS, in-app chat, and other
            messaging channels) that you send through Tele-Blast, and the
            information contained therein, should you opt-in to recording or
            otherwise storing that information.
          </li>
          <li>
            <strong>Integrations:</strong> Information regarding integrating
            third-party services such as Google, Salesforce, Zendesk, HubSpot,
            and others, including credentialing information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "when-how-collected",
    number: "3",
    title: "When and How Tele-Blast Collects Data",
    content: (
      <>
        <p>
          Tele-Blast may collect Personal Data through our communications with
          you or through your use of the Services. Consequently, Personal Data
          can be directly provided by you or indirectly collected by us from,
          for example, user interactions and use of the Services. You can always
          opt not to disclose information to us, but keep in mind that some
          information may be needed to register with us or to take advantage of
          some of our features within the Services.
        </p>

        <h3>When you create an account with Tele-Blast</h3>
        <p>
          <em>Data you provide:</em> Contact, Billing.
        </p>

        <h3>When you integrate with a third-party service</h3>
        <p>
          <em>Data you provide / Tele-Blast collects:</em> Integration details.
        </p>

        <h3>When you use our Services</h3>
        <p>
          <em>Data Tele-Blast collects:</em> Device and session information,
          telephony information, session audio, video, and messaging, location,
          integrations.
        </p>

        <h3>When you use Tele-Blast AI</h3>
        <p>
          <em>Data Tele-Blast collects:</em> Device and session information,
          telephony information, session audio, video, and messaging,
          integrations.
        </p>

        <h3>When you browse pages of our website</h3>
        <p>
          <em>Data Tele-Blast collects:</em> Device and session information,
          location.
        </p>

        <h3>When you request information from us</h3>
        <p>
          <em>Data you provide / Tele-Blast collects:</em> Contact.
        </p>

        <h3>When you opt-in for marketing messages</h3>
        <p>
          <em>Data you provide / Tele-Blast collects:</em> Contact, Identifying
          information.
        </p>

        <p>
          All permanent data, such as contact lists, call records, recordings,
          and transcripts, are stored in the United States via Google Cloud
          Storage unless your Tele-Blast Services Administrator has selected a
          different region. Tele-Blast may also temporarily process Personal
          Data in other regions for purposes such as technical support, customer
          support, and sales. In-transit and temporary data associated with
          calls is processed through Tele-Blast's Data Centers and may be stored
          there for no more than 72 hours.
        </p>
      </>
    ),
  },
  {
    id: "use-of-data",
    number: "4",
    title: "How Does Tele-Blast Use Personal Data?",
    content: (
      <>
        <p>
          The following table summarizes the purposes for which Tele-Blast
          processes Personal Data, along with the applicable legal basis under
          GDPR, the affected data subjects, the categories of Personal Data
          involved, and Tele-Blast's role.
        </p>

        <h3>Service Delivery</h3>
        <p>
          Deliver the services, including placing and receiving voice and video
          calls, providing recordings, transcriptions, and analytics of calls,
          determining your geographic location for efficient call routing, and
          organizing your contacts.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Contract
          </li>
          <li>
            <em>Data Subjects:</em> Customers, End-Users
          </li>
          <li>
            <em>Personal Data:</em> Location, Identifying Information, Device
            and Session Information, Telephony, Session Audio, Video, and
            Messaging, Communication
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Account Management</h3>
        <p>
          Manage your account and billing, enable secure login and single
          sign-on, and allow third-party integrations.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Contract
          </li>
          <li>
            <em>Data Subjects:</em> Customers
          </li>
          <li>
            <em>Personal Data:</em> Contact Information, Billing Information,
            Integrations
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Communications</h3>
        <p>
          Communicate with you. If you do not want to receive marketing
          communications from us, you can always opt-out by unsubscribing
          through the link at the bottom of our emails.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Contract, Consent
          </li>
          <li>
            <em>Data Subjects:</em> Customers
          </li>
          <li>
            <em>Personal Data:</em> Contact Information, Communication
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Fraud Prevention and Compliance</h3>
        <p>
          Prevent, detect, and investigate potentially prohibited or illegal
          activities, including fraud and violations of our Terms of Service and
          Acceptable Use Policy.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Compliance, Public Interest
          </li>
          <li>
            <em>Data Subjects:</em> Customers, End-Users
          </li>
          <li>
            <em>Personal Data:</em> Location, Identifying Information, Device
            and Session Information, Telephony, Session Audio, Video, and
            Messaging, Communication, Billing
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>System Monitoring and Backups</h3>
        <p>Perform backups, disaster recovery, and system status monitoring.</p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Contract
          </li>
          <li>
            <em>Data Subjects:</em> Customers, End-Users
          </li>
          <li>
            <em>Personal Data:</em> Telephony, Session Audio, Video, and
            Messaging
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Marketing</h3>
        <p>Market our Services.</p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Consent
          </li>
          <li>
            <em>Data Subjects:</em> Customers
          </li>
          <li>
            <em>Personal Data:</em> Communication, Identifying Information,
            Location
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Third-Party Integrations</h3>
        <p>
          Integrate with third parties. We will share your Personal Data with
          affiliated businesses only if you or your Tele-Blast Services
          Administrator set up an integration, and we will only share your
          information to the extent that it is related to the transaction or
          service.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Contract, Consent
          </li>
          <li>
            <em>Data Subjects:</em> Customers, End-Users
          </li>
          <li>
            <em>Personal Data:</em> Integration Information
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Processor
          </li>
        </ul>

        <h3>Service Improvement</h3>
        <p>
          Improve the Services, including A/B testing of new features,
          improvement of AI speech recognition and language processing, and
          performance monitoring.
        </p>
        <ul>
          <li>
            <em>Legal Basis (GDPR):</em> Legitimate Interest
          </li>
          <li>
            <em>Data Subjects:</em> Customers, End-Users
          </li>
          <li>
            <em>Personal Data:</em> Location, Identifying Information, Device
            and Session Information, Telephony, Session Audio, Video, and
            Messaging, Communication, Billing
          </li>
          <li>
            <em>Tele-Blast's Role:</em> Controller
          </li>
        </ul>

        <p>
          We may anonymize, de-identify, and/or aggregate your Personal Data so
          that you are not individually identifiable ("De-Identified Personal
          Data"), and provide De-Identified Personal Data to certain of our
          partners to help us improve our Service. We may also provide aggregate
          usage information to our partners to understand how often and in what
          ways people use our Services. However, we never disclose aggregate
          usage information to a partner in a manner that would identify you
          personally, as an individual.
        </p>
      </>
    ),
  },
  {
    id: "messaging-mfa",
    number: "5",
    title: "Messaging & MFA",
    content: (
      <>
        <p>
          If you opt-in to receive text messages from Tele-Blast for
          multi-factor authentication (MFA), any opt-in data is not shared or
          sold to third parties or affiliates for marketing purposes. Messages
          will only come from Tele-Blast. MFA message frequency will vary and
          message and data rates may apply. Replying to an MFA message with STOP
          will disable MFA text messages.
        </p>
      </>
    ),
  },
  {
    id: "ai-training",
    number: "6",
    title: "Tele-Blast AI Training",
    content: (
      <>
        <p>
          Tele-Blast's AI features are uniquely useful because they are based on
          real business conversations by real Tele-Blast users. By allowing
          Tele-Blast AI to learn from your conversations — such as segments of
          call audio, video, transcriptions, and messaging — you can help us
          improve communication through enhanced call quality, more accurate
          transcriptions, and real-time insights. Allowing your data to be used
          to improve Tele-Blast AI is not necessary for using AI features, and
          you may set your AI training preferences at any time.
        </p>
      </>
    ),
  },
  {
    id: "automated-decisions",
    number: "7",
    title: "Automated Decision Making",
    content: (
      <>
        <p>
          Tele-Blast does <strong>not</strong> use Personal Data to make
          automated decisions.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    number: "8",
    title: 'What Is "Legal Basis"?',
    content: (
      <>
        <p>
          When we process Personal Data about you in connection with our
          Services, our legal basis for processing depends on the Personal Data
          involved and the specific context in which we collect it.
        </p>
        <p>
          Generally, we collect Personal Data from you to perform a contract for
          you (such as when you order a Service), or where the processing is in
          our legitimate interests (i.e., consistent with your use of the
          Service and not overridden by your data protection interests or
          fundamental rights and freedoms, such as to market and provide our
          Services). We may also have a legal obligation to process Personal
          Data, or we may request your consent to do so. You may withdraw your
          consent at any time as explained in communications from us, in the
          Services, or by contacting us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "data-subject-rights",
    number: "9",
    title: "Data Subject Rights",
    content: (
      <>
        <p>
          You have various rights related to the Personal Data we process and
          may exercise those rights by utilizing our Data Subject Access Request
          (DSAR) Portal. Following the submission of your request, Tele-Blast
          will verify your identity and respond to you within 30 days of the
          receipt of the request. When you update information, we may maintain a
          copy of the unrevised information in our records.
        </p>
        <p>
          If you have a concern about our privacy practices, you can report it
          to the data protection authority that is authorized to hear those
          concerns, but we hope you will contact us first so that we may address
          any issues.
        </p>

        <h3>1. Right of Access</h3>
        <p>
          You can request access to the Personal Data we hold about you,
          including the categories of data we process, the purposes of the data
          processing, the period during which we retain that data, and third
          parties to which we disclose that data. Upon request, we can provide
          an overview of the data we hold or a copy of your Personal Data.
        </p>

        <h3>2. Right to Rectification</h3>
        <p>
          If your Personal Data is inaccurate or incomplete, you are entitled to
          ask that we correct or complete it. If we shared your Personal Data
          with others, we will tell them about the correction where possible.
        </p>

        <h3>3. Right to Erasure</h3>
        <p>
          You may ask us to erase your Personal Data in the following
          circumstances: (i) your Personal Data is no longer needed for the
          purposes for which it was collected; (ii) you have withdrawn your
          consent and there is no other legal basis for the processing; (iii)
          you have filed an objection to our processing and there are no
          overriding legitimate reasons for continued processing; (iv) your
          Personal Data is being processed unlawfully; or (v) your Personal Data
          must be deleted to fulfil a legal obligation.
        </p>

        <h3>4. Right to Restrict Processing</h3>
        <p>
          You may ask us to restrict or block the processing of your Personal
          Data where: we processed or will process inaccurate Personal Data; we
          processed your Personal Data unlawfully; we don't need to process your
          Personal Data but you need to keep it to establish, exercise, or
          defend a legal claim; or you exercised your right to object processing
          and we are still validating your request.
        </p>

        <h3>5. Right to Data Portability</h3>
        <p>
          You have the right to obtain your Personal Data from us that you
          consented to give us or that was provided to us as necessary in
          connection with our contract with you where we process that Personal
          Data in an automated way. We will provide your Personal Data in a
          structured, commonly used, and machine-readable format.
        </p>

        <h3>6. Right to Object</h3>
        <p>
          You may ask us at any time to stop processing your Personal Data, and
          we will do so if we are relying on a legitimate interest to process
          your Personal Data — unless we demonstrate compelling legitimate
          grounds for the processing. If your objection relates to receiving
          marketing communications, please use the unsubscribe link on the
          communication you no longer wish to receive.
        </p>

        <h3>
          7. Rights in Relation to Automated Decision-Making and Profiling
        </h3>
        <p>
          You have the right to be free from decisions based solely on automated
          processing of your Personal Data, including profiling, unless this is
          necessary in relation to a contract between you and us or you provide
          your explicit consent. Tele-Blast does not perform automated
          decision-making.
        </p>

        <h3>8. Right to Withdraw Consent</h3>
        <p>
          If we rely on your consent to process your Personal Data, you have the
          right to withdraw that consent at any time, but this will not affect
          any processing of your data that has already taken place.
        </p>

        <h3>Account Settings Access</h3>
        <p>
          Through your account settings, you may access, and for some
          information edit or delete, the following information you've provided
          to us: name and password, email address, phone number(s), location,
          time zone, place of employment, devices, recorded/transcribed messages
          and calls, call history, user profile information (including uploaded
          images), billing information, contacts, and other third-party account
          information you have linked.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    number: "10",
    title: "How We Keep Your Data Secure",
    content: (
      <>
        <h3>Compliance</h3>
        <p>
          Tele-Blast strives to comply with the controls set out in Applicable
          Data Protection Laws.
        </p>

        <h3>Infrastructure Security</h3>
        <p>
          Tele-Blast has implemented appropriate technical and organizational
          security measures to protect your data, including:
        </p>
        <ul>
          <li>Data encryption in transit and at rest</li>
          <li>SOC 2 Type II Certification</li>
          <li>Certification under ISO Standards 27001, 27017, and 27018</li>
        </ul>

        <h3>Internal Best Practices</h3>
        <p>
          Tele-Blast has implemented practices in line with industry standards,
          including role-based access, single sign-on, and internal security and
          privacy training.
        </p>
      </>
    ),
  },
  {
    id: "data-disclosures",
    number: "11",
    title: "Personal Data Disclosures",
    content: (
      <>
        <p>
          To provide, maintain, improve, secure, and promote our Services,
          Tele-Blast needs to disclose certain Personal Data to third parties.
          We do not license or sell your Personal Data to third parties,
          including advertisers, without your consent. When we share information
          about you with third parties, we pseudonymize and aggregate any
          information about you before we share it unless more detail is
          necessary to the function of the Services.
        </p>

        <h3>Sub-Processors (Processors)</h3>
        <p>
          Certain Personal Data may be disclosed to our vendors who are
          essential for the functioning of the Services. Vendors that have
          access to Personal Data are considered sub-processors and nearly all
          our sub-processors are categorized by law as processors. This means
          that these sub-processors may process Personal Data on our behalf
          solely in accordance with our instructions and pursuant to a written
          agreement. Disclosure of Personal Data to these sub-processors is
          limited to what is strictly required for the sub-processor to perform
          the service it provides.
        </p>

        <h3>Sub-Processors (Controllers)</h3>
        <p>
          In a few rare circumstances, our sub-processors may act as an
          independent controller of Personal Data. This means that these
          sub-processors process Personal Data in accordance with their own
          privacy policies; however, our contracts with such sub-processors
          require them to comply with applicable data protection laws when
          processing any Personal Data they receive from us.
        </p>

        <h3>Governmental Authorities</h3>
        <p>
          Various authorities such as regulators, tax authorities, law
          enforcement agencies, courts of law, and others may legally require us
          to produce information that may include Personal Data, for example
          through a subpoena or warrant. If Tele-Blast becomes aware of any
          government data demands requesting Personal Data, Tele-Blast will:
        </p>
        <ul>
          <li>
            Immediately notify the Customer of the government data demand unless
            such notification is legally prohibited;
          </li>
          <li>
            Take all reasonable steps to ensure the validity and enforceability
            of any governmental data demand;
          </li>
          <li>
            Disclose Personal Data only in response to a valid and enforceable
            government data demand; and
          </li>
          <li>
            Disclose the minimum amount of Personal Data to the extent legally
            required and in accordance with the applicable legal process.
          </li>
        </ul>

        <h3>Corporate Restructuring</h3>
        <p>
          If we (or our assets) are acquired, or if we go out of business, enter
          bankruptcy, or go through some other change of control, Personal Data
          could be one of the assets transferred to or acquired by a third
          party.
        </p>
      </>
    ),
  },
  {
    id: "disclosure-consent",
    number: "12",
    title: "Disclosure With Your Consent",
    content: (
      <>
        <p>
          Where we are processing your information as a processor on behalf of a
          Customer, the Customer determines their own policies and practices for
          the sharing and disclosure of your information. Where we are
          processing your information on our own behalf as a controller, we may
          disclose your information with your consent, which we may obtain in
          writing, verbally, online (by clicking a link or button), or through
          other mechanisms.
        </p>
      </>
    ),
  },
  {
    id: "disclosure-no-consent",
    number: "13",
    title: "Disclosure Without Your Consent",
    content: (
      <>
        <p>
          In general, we may disclose or transfer your information without your
          consent when we reasonably believe disclosure is appropriate to:
        </p>
        <ul>
          <li>Comply with the law (e.g., lawful subpoena or court order);</li>
          <li>
            Cooperate with or report to law enforcement agencies in
            investigations that involve users who use our Services for
            activities that are or seem illegal or illegitimate;
          </li>
          <li>Enforce or apply agreements for our Services; or</li>
          <li>
            Protect our rights or property or that of our affiliates, including
            respective officers, directors, employees, agents, third-party
            content providers, suppliers, sponsors, or licensors.
          </li>
        </ul>
        <p>
          We may also disclose without consent in connection with a merger,
          acquisition, public offering, sale of company assets, insolvency,
          bankruptcy, or receivership, subject to standard confidentiality
          requirements.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    number: "14",
    title: "International Data Transfers",
    content: (
      <>
        <p>
          Tele-Blast operates at a global level and therefore Personal Data may
          need to be transferred to countries outside of where it was originally
          collected. In such a case, Tele-Blast only makes such cross-border
          transfers according to applicable laws. For example, to transfer data
          outside of the EEA or the UK, our Data Processing Agreement (available
          for signature within the Admin Portal of existing customers)
          incorporates the EU and UK Standard Contractual Clauses and supporting
          documents, as applicable, or other inter-company agreements. For
          transfers out of other jurisdictions operating transfer restriction
          regimes, we take similar steps to ensure compliance with local law.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: "15",
    title: "Data Retention",
    content: (
      <>
        <p>
          In accordance with applicable data protection laws, we do not store
          your Personal Data for longer than needed for the purposes of the
          respective processing activity.
        </p>
        <p>
          Tele-Blast, by default, will retain your data for as long as your
          account is active. Upon closure of your account, Tele-Blast will
          automatically delete your data within 180 days of account termination.
          You always have the right to implement a customizable retention policy
          that will delete data routinely based on your specific retention
          requests.
        </p>
        <p>
          This retention policy ensures that Tele-Blast is completely deleting
          your data if it is no longer needed, unless its further temporary
          storage is still necessary to: (i) fulfil Tele-Blast's obligations
          pursuant to the agreement between Tele-Blast and you; (ii) establish,
          exercise, and defend a legal claim; or (iii) fulfil statutory
          obligations to which Tele-Blast is subject.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "16",
    title: "Cookie Policy, Third Party Analytics, and Tracking",
    content: (
      <>
        <p>
          Tele-Blast uses third-party service providers to understand how users
          enter, navigate, and leave the website and Services. Tele-Blast and
          its third-party providers gather this data using cookies, web beacons,
          tags, video and chat windows, and other similar techniques.
        </p>

        <h3>Google Analytics and Google Adwords</h3>
        <p>
          These cookies help Tele-Blast understand who is visiting Tele-Blast's
          websites and to show relevant ads on other websites to people who have
          visited Tele-Blast's websites. You can control what ads you see
          through the Google Ad Settings Manager.
        </p>

        <h3>Adobe Marketo Engage</h3>
        <p>
          Marketo is a marketing automation tool that handles various marketing
          tasks, such as contacting visitors who provide their contact
          information. You can read more about Marketo's Privacy Policy and
          opt-out options via Marketo's Privacy Notice.
        </p>

        <h3>Nextroll</h3>
        <p>
          Nextroll is a marketing automation tool that handles various marketing
          tasks. You can read more about Nextroll's Privacy Policy and opt-out
          options via Nextroll's Privacy Policy.
        </p>

        <h3>Qualified</h3>
        <p>
          Qualified provides in-page chat services that connect potential
          customers with Tele-Blast personnel. By sending a message, you agree
          that this session may be monitored, recorded, and shared with our
          third-party service providers for personalization, analytics, and
          other business purposes.
        </p>

        <p>
          Most web browsers automatically accept cookies, but you can modify
          your browser settings to disable cookies if you prefer. If you choose
          to decline cookies, you may not be able to experience all the features
          of the Website and Services.
        </p>
      </>
    ),
  },
  {
    id: "google-workspace",
    number: "17",
    title: "Other Vendor-Specific Privacy Terms — Google Workspace",
    content: (
      <>
        <p>
          Tele-Blast users may enable Google Workspace integrations with some
          Tele-Blast products. Neither Google user data nor Google APIs are used
          by Tele-Blast to develop, improve, or train generalized or
          non-personalized AI and/or ML models. No Google user data is used for
          training and/or improving such third-party models. Tele-Blast does not
          transfer Google user data to third parties for prohibited purposes
          such as targeted advertising, selling to data brokers, or determining
          credit-worthiness. Any data transferred to third-party AI tools, as
          enabled by the user, is exclusively for the purpose of providing the
          requested service and is not used to train or improve those
          third-party models.
        </p>
      </>
    ),
  },
  {
    id: "data-privacy-framework",
    number: "18",
    title: "Data Privacy Framework",
    content: (
      <>
        <p>
          MSB Consultants, Inc. / Tele-Blast complies with the EU-U.S. Data
          Privacy Framework (EU-U.S. DPF) and the UK Extension to the EU-U.S.
          DPF, and the Swiss-U.S. Data Privacy Framework (Swiss-U.S. DPF) as set
          forth by the U.S. Department of Commerce. MSB Consultants, Inc. /
          Tele-Blast has certified to the U.S. Department of Commerce that it
          adheres to the EU-U.S. Data Privacy Framework Principles (EU-U.S. DPF
          Principles) with regard to the processing of personal data received
          from the European Union and the United Kingdom in reliance on the
          EU-U.S. DPF and the UK Extension to the EU-U.S. DPF. MSB Consultants,
          Inc. / Tele-Blast has certified to the U.S. Department of Commerce
          that it adheres to the Swiss-U.S. Data Privacy Framework Principles
          (Swiss-U.S. DPF Principles) with regard to the processing of personal
          data received from Switzerland in reliance on the Swiss-U.S. DPF.
        </p>
        <p>
          If there is any conflict between the terms in this privacy policy and
          the EU-U.S. DPF Principles and/or the Swiss-U.S. DPF Principles, the
          Principles shall govern. To learn more about the Data Privacy
          Framework (DPF) Program, and to view our certification, please visit{" "}
          <a
            href="https://www.dataprivacyframework.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.dataprivacyframework.gov/
          </a>
          .
        </p>

        <h3>FTC Enforcement</h3>
        <p>
          The Federal Trade Commission has jurisdiction over Tele-Blast's
          compliance with the EU-U.S. Data Privacy Framework (EU-U.S. DPF), the
          UK Extension to the EU-U.S. DPF, and the Swiss-U.S. Data Privacy
          Framework (Swiss-U.S. DPF). Failing to follow the Data Privacy
          Framework principles could result in U.S. FTC enforcement measures
          against Tele-Blast.
        </p>

        <h3>Binding Arbitration</h3>
        <p>
          Under certain conditions, and as a last resort, individuals may invoke
          binding arbitration to resolve complaints not resolved by other DPF
          mechanisms. Tele-Blast is obligated to arbitrate claims and follow the
          terms as set forth in Annex I of the DPF Principles, provided that an
          individual has invoked binding arbitration by delivering notice to
          Tele-Blast and following the procedures and conditions outlined in
          Annex I of the Principles.
        </p>

        <h3>Onward Transfers and Liability</h3>
        <p>
          Tele-Blast remains liable under the DPF Principles if a subprocessor
          processes your information on our behalf in a manner that is
          inconsistent with the DPF Principles, unless Tele-Blast proves that it
          is not responsible for the event giving rise to the damage.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    number: "19",
    title: "Privacy of Minors",
    content: (
      <>
        <p>
          Tele-Blast does not provide services designed for use by children
          under the age of 18, nor does it knowingly collect or solicit Personal
          Data from anyone under the age of 18. If we learn that we have
          collected such information, we will delete that information as quickly
          as possible. If you believe that a child under 18 has provided us with
          Personal Data, please contact us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    number: "20",
    title: "Changes and Amendments",
    content: (
      <>
        <p>
          We're constantly trying to improve our Services, so we may need to
          change this Privacy Policy from time to time as well. We will alert
          you to changes by placing a notice on the Tele-Blast website, by
          sending you an email, and/or by some other means. Please note that if
          you've opted not to receive legal notice emails from us (or you
          haven't provided us with your email address), those legal notices will
          still govern your use of the Services, and you are still responsible
          for reading and understanding them.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: "21",
    title: "Contact & Questions",
    content: (
      <>
        <p>
          If you have any questions, concerns, or complaints about this Privacy
          Policy or our data protection practices, please do not hesitate to
          contact our Data Protection Officer:
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
            MSB Consultants, Inc.
          </p>
          <p className="text-sm mt-1">Attn: Data Protection Officer</p>
          <p className="text-sm">6040 NW 60th Ave</p>
          <p className="text-sm">Parkland, FL 33067</p>
          <p className="text-sm mt-2">
            Email: <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "acceptance",
    number: "22",
    title: "Acceptance of This Privacy Policy",
    content: (
      <>
        <p>
          By using the Website or its Services, you agree to be bound by this
          Privacy Policy.
        </p>
        <p>
          If you do not agree to abide by the terms of this Privacy Policy, you
          are not authorized to use or access the Website and its Services.
        </p>
      </>
    ),
  },
  {
    id: "region-specific",
    number: "23",
    title: "Region Specific Provisions",
    content: (
      <>
        <h3>California and US States</h3>
        <p>
          Under some U.S. state laws, including the California Consumer Privacy
          Act of 2018 (as amended by the California Consumer Privacy Rights Act)
          (CCPA), businesses that collect personal data of residents are
          required to make certain disclosures regarding how they collect, use
          and disclose such information, as well as rights available to
          residents. This section addresses those requirements.
        </p>
        <p>
          Tele-Blast does not sell or share your Personal Data. Tele-Blast will
          only disclose your Personal Data as detailed in this Privacy Policy.
        </p>
        <p>
          Residents have the right to make requests with regard to certain
          information we collect about them, at no charge, two times every 12
          months, including the right to request disclosure and/or a copy of
          data collected by Tele-Blast, as well as the right to delete any such
          data and/or opt-out of the sale or sharing of such data. At all times,
          you have the right not to be discriminated against when exercising any
          of these rights. You may exercise those rights by utilizing our Data
          Subject Access Request (DSAR) Portal or by contacting us at{" "}
          <a href="mailto:info@tele-blast.com">info@tele-blast.com</a>.
        </p>
      </>
    ),
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────

export default function DetailedPrivacyPolicyPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Full Privacy Policy | Tele-Blast";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.97 0 0)" }}
      data-ocid="detailed_privacy.page"
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
              Full Privacy Policy
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
            Privacy Policy
          </h1>
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.82 0.14 44)" }}
          >
            Effective Date: August 18, 2025 · MSB Consultants, Inc. d/b/a
            Tele-Blast
          </p>
        </div>
      </section>

      {/* Document Body */}
      <main
        className="flex-1 px-5 py-12"
        style={{ background: "oklch(0.97 0 0)" }}
        data-ocid="detailed_privacy.content"
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
                data-ocid={`detailed_privacy.section.${id}`}
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
              Privacy Policy (Summary)
            </Link>
            <Link
              to="/terms"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Terms &amp; Conditions
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
        .prose-content em { font-style: italic; }
      `}</style>
    </div>
  );
}
