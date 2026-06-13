import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  HelpCircle,
  Loader2,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PublicNavBar } from "../components/PublicNavBar";
import { useBackend } from "../hooks/useBackend";
import { useSEO } from "../hooks/useSEO";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  body: React.ReactNode;
  tips?: string[];
  related?: string[];
}

// ── Article content ───────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  // ── Getting Started ──────────────────────────────────────────────────────
  {
    id: "creating-your-account",
    title: "Creating Your Account",
    description:
      "Learn how to sign up for Tele-Blast and get your account ready in minutes.",
    category: "Getting Started",
    tips: [
      "Internet Identity is a secure, password-free authentication system — you never create a username or password.",
      "Your account is tied to a cryptographic key, making it much harder to compromise than a password.",
      "After sign-up you'll be redirected to the subscription section — choose the $15/month Pro plan to unlock the app.",
    ],
    related: ["choosing-a-subscription-plan", "setting-up-your-profile"],
    body: (
      <>
        <p>
          Tele-Blast uses <strong>Internet Identity</strong> for secure,
          password-free authentication. Here's how to get started:
        </p>
        <ol>
          <li>
            Visit <strong>www.tele-blast.com</strong> and click{" "}
            <strong>Make an Account</strong> in the top navigation.
          </li>
          <li>
            Click <strong>Create Your Account</strong> — you'll be taken
            directly to Internet Identity to create your secure passkey.
          </li>
          <li>
            Follow the Internet Identity prompts to create a secure passkey (via
            Face ID, fingerprint, or device PIN).
          </li>
          <li>
            Once authenticated, you'll be redirected back to Tele-Blast and
            prompted to choose the $15/month Pro plan.
          </li>
          <li>
            After subscribing, fill in your <strong>Profile</strong> (name,
            company, phone, email) to complete onboarding.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "choosing-a-subscription-plan",
    title: "Choosing a Subscription Plan",
    description:
      "Tele-Blast offers the $15/month Pro plan — everything a solo sales agent needs to manage leads and outreach.",
    category: "Getting Started",
    tips: [
      "The $15 Pro plan covers everything most solo sales agents need.",
      "Your subscription renews monthly — cancel anytime from your account settings.",
      "All your data is preserved if you ever pause or cancel your subscription.",
    ],
    related: ["managing-your-subscription", "navigating-the-app"],
    body: (
      <>
        <p>
          Tele-Blast currently offers the <strong>Pro — $15/month</strong> plan.
          Visit{" "}
          <Link to="/pricing" style={{ color: "oklch(0.56 0.16 44)" }}>
            tele-blast.com/pricing
          </Link>{" "}
          to subscribe.
        </p>
        <ol>
          <li>
            <strong>Pro — $15/month:</strong> All core features — lead
            management, pipeline board view, power dialer (calls &amp; texts),
            manual SMS/call templates with local text spinning, CSV import (up
            to 500 leads per upload), Birthday Queue, Follow-Up Queue, New Lead
            Queue, and Google Voice or cell phone for calling and texting.
          </li>
        </ol>
        <p>
          Click <strong>Subscribe</strong> on the{" "}
          <Link to="/pricing" style={{ color: "oklch(0.56 0.16 44)" }}>
            Pricing page
          </Link>{" "}
          to get started with the $15/month plan.
        </p>
      </>
    ),
  },
  {
    id: "setting-up-your-profile",
    title: "Setting Up Your Profile",
    description:
      "Fill in your profile to personalize your outreach and enable app features.",
    category: "Getting Started",
    tips: [
      "Your profile name and company are used to personalize your templates and outreach.",
      "Adding your phone number here ensures calls and texts route correctly.",
    ],
    related: ["navigating-the-app", "creating-and-managing-templates"],
    body: (
      <>
        <p>
          Your profile stores key info used throughout the app. To set it up:
        </p>
        <ol>
          <li>
            Click your <strong>user icon</strong> in the top-right corner of the
            app header.
          </li>
          <li>
            Select <strong>Profile</strong> from the dropdown.
          </li>
          <li>
            Fill in the following fields:
            <ul>
              <li>
                <strong>Name</strong> — your full name
              </li>
              <li>
                <strong>Company Name</strong> — the name of your business
              </li>
              <li>
                <strong>Phone Number</strong> — your contact number
              </li>
              <li>
                <strong>Email</strong> — your business email
              </li>
              <li>
                <strong>Website</strong> (optional) — your business website URL
              </li>
              <li>
                <strong>Who Referred You</strong> (optional) — your referral
                source
              </li>
            </ul>
          </li>
          <li>
            Click <strong>Save Profile</strong>.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "navigating-the-app",
    title: "Navigating the App",
    description:
      "A quick tour of the mobile bottom bar, More menu, desktop nav, and profile dropdown.",
    category: "Getting Started",
    tips: [
      "On mobile, the bottom nav bar has direct access to Dashboard, Leads, Pipeline, Queues, and Dialer.",
      "The profile dropdown (user icon, top-right) contains Profile, Support, and Sign Out.",
      "Tele-Blast is designed for mobile first — install it as a PWA from your browser for a native-app feel.",
    ],
    related: ["creating-your-account", "choosing-a-subscription-plan"],
    body: (
      <>
        <p>Tele-Blast has two navigation patterns depending on your device:</p>
        <ol>
          <li>
            <strong>Mobile (bottom nav bar):</strong> Primary tabs — Dashboard,
            Leads, Pipeline, Queues, Dialer, and SMS Drip — appear in the bottom
            navigation bar for one-tap access.
          </li>
          <li>
            <strong>Desktop (top/sidebar nav):</strong> All main sections are
            visible in the navigation bar — Dashboard, Leads, Pipeline, Power
            Dialer, Templates, Queue, and more.
          </li>
          <li>
            <strong>Profile dropdown:</strong> Tap the user icon in the
            top-right corner on any screen. Options include Profile, Support,
            and Sign Out.
          </li>
        </ol>
      </>
    ),
  },

  // ── Leads & Pipeline ─────────────────────────────────────────────────────
  {
    id: "adding-leads-manually",
    title: "Adding Leads Manually",
    description:
      "Add individual leads with all 20+ available fields including custom fields.",
    category: "Leads & Pipeline",
    tips: [
      "Either Business Name or Contact Name is required to save a lead.",
      "Use the 5 custom fields (Custom1–Custom5) for any info unique to your workflow, like 'Budget' or 'Decision Maker'.",
      "Adding a birthday enables the Birthday Queue feature for that lead.",
    ],
    related: [
      "importing-leads-via-csv",
      "editing-and-deleting-leads",
      "birthday-queue",
    ],
    body: (
      <>
        <p>To add a lead manually:</p>
        <ol>
          <li>
            Navigate to the <strong>Leads</strong> section from the nav.
          </li>
          <li>
            Tap or click the <strong>+ Add Lead</strong> button.
          </li>
          <li>
            Fill in any of the available fields:
            <ul>
              <li>First Name, Last Name</li>
              <li>Business Name, Contact Name, Title</li>
              <li>Website, Address, City, State, Zip Code</li>
              <li>Phone, Email</li>
              <li>Notes, Industry, Birthday, Source</li>
              <li>Custom1 through Custom5</li>
            </ul>
          </li>
          <li>
            Assign to a <strong>Pipeline Stage</strong> (Prospect, Contacted,
            Qualified, or Closed/Lost).
          </li>
          <li>
            Tap <strong>Save Lead</strong>.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "importing-leads-via-csv",
    title: "Importing Leads via CSV",
    description:
      "Bulk upload up to 500 leads from a spreadsheet with column mapping and pipeline assignment. For larger files, pick which batch of 500 to upload.",
    category: "Leads & Pipeline",
    tips: [
      "Your CSV doesn't need to have headers that match exactly — the column mapping step lets you match any column name.",
      "Either Business Name or Contact Name must be present in your file (or mapped) for each row to import successfully.",
      "You can skip any column you don't want to import by selecting 'Skip' in the mapping step.",
      "For files larger than 500 rows, select '1st 500', '2nd 500', etc. — the app marks which batches you've already uploaded.",
    ],
    related: [
      "adding-leads-manually",
      "managing-pipeline-stages",
      "switching-lead-views",
    ],
    body: (
      <>
        <p>To import leads from a CSV file:</p>
        <ol>
          <li>
            Navigate to the <strong>Leads</strong> section.
          </li>
          <li>
            Tap the <strong>Import CSV</strong> button.
          </li>
          <li>
            Select your <code>.csv</code> file from your device.
          </li>
          <li>
            <strong>Large files (500+ rows):</strong> A batch picker appears
            showing "1st 500", "2nd 500", etc. Batches you've already uploaded
            show a green checkmark. Select the batch you want to import.
          </li>
          <li>
            <strong>Column Mapping:</strong> The app shows your file's column
            headers. Use the dropdown next to each column to match it to the
            correct app field (e.g. "First Name", "Phone", "Email"). Select{" "}
            <em>Skip</em> for columns you don't want to import.
          </li>
          <li>
            <strong>Pipeline Assignment:</strong> Choose a pipeline stage to
            assign all imported leads to (defaults to <em>Prospect</em>). You
            can create a new pipeline here if needed.
          </li>
          <li>
            Review the <strong>data preview table</strong>. Rows with errors are
            highlighted — common issues include missing required fields.
          </li>
          <li>
            Click <strong>Import</strong> to complete. Leads appear in your
            Leads section immediately.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "switching-lead-views",
    title: "Switching Lead Views",
    description:
      "Toggle between tile, card, and list views to match your workflow.",
    category: "Leads & Pipeline",
    tips: [
      "List view shows all columns and quick-action icons (phone, SMS) on each row — great for rapid outreach.",
      "Card view shows more context per lead — useful when you need to scan notes or industry at a glance.",
      "Your selected view is remembered the next time you open the Leads section.",
    ],
    related: ["adding-leads-manually", "filtering-and-searching-leads"],
    body: (
      <>
        <p>The Leads section supports three layouts. To switch between them:</p>
        <ol>
          <li>
            Navigate to the <strong>Leads</strong> section.
          </li>
          <li>
            Look for the <strong>view toggle</strong> buttons near the top-right
            of the leads list (three small icons: grid tiles, cards, list rows).
          </li>
          <li>
            Click the icon for the view you want:
            <ul>
              <li>
                <strong>Tile view</strong> — compact tiles for a quick overview.
              </li>
              <li>
                <strong>Card view</strong> (default) — info-rich cards showing
                key details per lead.
              </li>
              <li>
                <strong>List/column view</strong> — all fields visible in rows
                with phone and SMS icons on every row for one-tap outreach.
              </li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "managing-pipeline-stages",
    title: "Managing Pipeline Stages",
    description:
      "Move leads through Prospect → Contacted → Qualified → Closed/Lost on a visual board.",
    category: "Leads & Pipeline",
    tips: [
      "On mobile, swipe a pipeline card left or right to move it to the next or previous stage.",
      "You can filter the Leads section by a specific pipeline to focus your outreach.",
      "Leads assigned during CSV import can be bulk-reassigned to any pipeline at any time.",
    ],
    related: ["adding-leads-manually", "importing-leads-via-csv"],
    body: (
      <>
        <p>Tele-Blast uses four pipeline stages:</p>
        <ol>
          <li>
            <strong>Prospect</strong> — new, uncontacted leads.
          </li>
          <li>
            <strong>Contacted</strong> — leads you've reached out to.
          </li>
          <li>
            <strong>Qualified</strong> — leads who've shown interest.
          </li>
          <li>
            <strong>Closed/Lost</strong> — deals won or lost.
          </li>
        </ol>
        <p>To move a lead between stages:</p>
        <ol>
          <li>
            Navigate to the <strong>Pipeline</strong> section to see the visual
            board.
          </li>
          <li>
            Drag and drop a lead card to a new column, or open the lead and
            change the Stage field.
          </li>
          <li>
            On mobile, <strong>swipe left or right</strong> on a pipeline card
            to advance or revert the stage.
          </li>
        </ol>
        <p>To filter by pipeline in the Leads section:</p>
        <ol>
          <li>
            Use the <strong>pipeline filter</strong> dropdown or tab at the top
            of the Leads list.
          </li>
          <li>Select a stage to show only leads in that stage.</li>
        </ol>
      </>
    ),
  },
  {
    id: "editing-and-deleting-leads",
    title: "Editing and Deleting Leads",
    description: "Update lead information or permanently remove leads.",
    category: "Leads & Pipeline",
    tips: [
      "Edits are saved immediately — there's no undo, so double-check before saving.",
      "Deleting a lead also removes its communication history and notes.",
      "For bulk delete, use 'Select All' in the Leads section, then the Delete action.",
    ],
    related: ["adding-leads-manually", "communication-history"],
    body: (
      <>
        <p>To edit a lead:</p>
        <ol>
          <li>
            Tap or click a lead card, tile, or row to open the lead detail page.
          </li>
          <li>
            Click the <strong>Edit</strong> button.
          </li>
          <li>Update any fields you need.</li>
          <li>
            Click <strong>Save</strong>.
          </li>
        </ol>
        <p>To delete a lead:</p>
        <ol>
          <li>Open the lead detail page.</li>
          <li>
            Click the <strong>Delete Lead</strong> button (usually at the bottom
            of the page or in an actions menu).
          </li>
          <li>Confirm the deletion in the prompt that appears.</li>
        </ol>
        <p>To bulk delete:</p>
        <ol>
          <li>
            In the Leads section, tap <strong>Select All</strong> or check
            individual leads.
          </li>
          <li>
            Choose <strong>Delete</strong> from the bulk actions bar.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "filtering-and-searching-leads",
    title: "Filtering and Searching Leads",
    description:
      "Use the search bar and pipeline stage filters to find any lead quickly.",
    category: "Leads & Pipeline",
    tips: [
      "Combine pipeline stage filter + search for the most focused list.",
      "Search matches against name, business, phone, email, city, state, and industry.",
    ],
    related: ["managing-pipeline-stages", "switching-lead-views"],
    body: (
      <>
        <p>Tele-Blast offers several ways to find leads:</p>
        <ol>
          <li>
            <strong>Standard Search:</strong> Type in the search bar at the top
            of the Leads section. Matches against name, business, phone, email,
            city, state, and industry.
          </li>
          <li>
            <strong>Pipeline Stage Filter:</strong> Use the stage tabs or
            dropdown to show only leads in a specific stage (Prospect,
            Contacted, Qualified, Closed/Lost).
          </li>
        </ol>
      </>
    ),
  },

  // ── Outreach & Communication ─────────────────────────────────────────────
  {
    id: "using-click-to-call",
    title: "Using Click-to-Call",
    description:
      "Tap the phone icon on any lead to open your device dialer or Phone Link pre-filled with their number.",
    category: "Outreach & Communication",
    tips: [
      "On desktop (Windows), click-to-call opens Phone Link if you have it set up — your Android phone makes the call.",
      "On mobile, tapping the phone icon opens your native phone dialer with the number pre-filled.",
    ],
    related: [
      "using-android-phone-link-for-desktop-calling",
      "using-the-power-dialer",
    ],
    body: (
      <>
        <p>To place a call to a lead:</p>
        <ol>
          <li>
            Tap the <strong>phone icon</strong> next to any lead in the Leads
            list, pipeline board, or lead detail page.
          </li>
          <li>
            Your device dialer (or Phone Link on Windows) opens with the lead's
            number pre-filled. Tap Call.
          </li>
          <li>
            After the call, return to Tele-Blast. A{" "}
            <strong>note is automatically created</strong> logging the call with
            a timestamp.
          </li>
          <li>
            Optionally, enter a <strong>disposition</strong> (outcome) and set a{" "}
            <strong>follow-up date</strong>.
          </li>
        </ol>
        <p>
          <strong>Desktop calling (Windows):</strong> See the{" "}
          <em>Android Phone Link</em> article to route calls through your phone
          from your Windows PC.
        </p>
      </>
    ),
  },
  {
    id: "sending-a-text-message",
    title: "Sending a Text Message",
    description:
      "Send SMS from your cell phone using Phone Link, with the message pre-filled from a template.",
    category: "Outreach & Communication",
    tips: [
      "On the $30 plan, texts open through Phone Link (Windows) or your device's native SMS app.",
      "Sending a text auto-creates a note on the lead — no manual logging needed.",
      "Select a template before tapping the SMS icon to have your message ready to go.",
    ],
    related: [
      "creating-and-managing-templates",
      "using-android-phone-link-for-desktop-calling",
    ],
    body: (
      <>
        <p>To send a text to a lead:</p>
        <ol>
          <li>
            Tap the <strong>SMS icon</strong> next to a lead.
          </li>
          <li>
            On <strong>mobile</strong>, your native SMS app opens with the
            lead's number and any selected template text pre-filled. Tap Send.
          </li>
          <li>
            On <strong>Windows desktop</strong>, Phone Link opens with the
            lead's number and template text. Complete the send there.
          </li>
          <li>The text is logged immediately as a note on the lead.</li>
        </ol>
      </>
    ),
  },
  {
    id: "using-the-power-dialer",
    title: "Using the Power Dialer",
    description:
      "Work through a list of leads with sequential call or text sessions with auto-advance.",
    category: "Outreach & Communication",
    tips: [
      "Select a template before starting a session so every message is ready to go.",
      "You can end the session at any time — completed leads keep their communication history.",
      "Use the Power Dialer for focused outreach blocks (e.g., 30 minutes of calls).",
    ],
    related: [
      "sending-a-text-message",
      "creating-and-managing-templates",
      "using-android-phone-link-for-desktop-calling",
    ],
    body: (
      <>
        <p>
          The Power Dialer lets you work through multiple leads in a session:
        </p>
        <ol>
          <li>
            Go to the <strong>Power Dialer</strong> section from the nav.
          </li>
          <li>
            Select the leads you want to include (checkboxes), or use{" "}
            <strong>Select All</strong>.
          </li>
          <li>
            Choose your session mode: <strong>Call</strong> or{" "}
            <strong>Text</strong>.
          </li>
          <li>
            Select a <strong>template</strong> to use for the session (required
            for Text mode).
          </li>
          <li>
            Click <strong>Start Session</strong>. The first lead appears.
          </li>
          <li>
            Take the action (call or text via Phone Link or your device). Enter
            a <strong>disposition</strong> and optionally set a{" "}
            <strong>follow-up date</strong>.
          </li>
          <li>
            Click <strong>Next Lead</strong> — the app auto-advances to the next
            lead in your queue.
          </li>
          <li>
            Repeat until done. Click <strong>End Session</strong> to finish.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "communication-history",
    title: "Communication History",
    description:
      "View per-lead call and text logs — created automatically after every action.",
    category: "Outreach & Communication",
    tips: [
      "Every call and text action creates a note automatically — you never have to log manually.",
      "Notes include the action type, timestamp, and any disposition you entered.",
      "Communication history helps you prepare for follow-up calls — review it before calling.",
    ],
    related: [
      "using-click-to-call",
      "sending-a-text-message",
      "editing-and-deleting-leads",
    ],
    body: (
      <>
        <p>To view a lead's communication history:</p>
        <ol>
          <li>
            Open the <strong>lead detail page</strong> by tapping/clicking the
            lead.
          </li>
          <li>
            Scroll to the <strong>Notes / Communication History</strong>{" "}
            section.
          </li>
          <li>
            Each entry shows:
            <ul>
              <li>Action type (Call or Text)</li>
              <li>Date and time (timestamp)</li>
              <li>Disposition (outcome you entered after the call)</li>
              <li>Message text (for texts)</li>
            </ul>
          </li>
        </ol>
        <p>
          Notes are created <strong>automatically</strong> whenever you tap a
          call or text icon — no manual entry required.
        </p>
      </>
    ),
  },
  {
    id: "creating-and-managing-templates",
    title: "Creating and Managing Templates",
    description:
      "Create, edit, and delete SMS and call templates for fast outreach.",
    category: "Outreach & Communication",
    tips: [
      "Create separate templates for initial outreach vs. follow-up for better personalization.",
      "Keep SMS templates concise — under 160 characters sends as a single message.",
      "Name your templates clearly (e.g. 'Follow-Up #1', 'Introduction') so you can find them quickly in the Power Dialer.",
    ],
    related: ["using-the-power-dialer", "sending-a-text-message"],
    body: (
      <>
        <p>To create a new template:</p>
        <ol>
          <li>
            Navigate to the <strong>Templates</strong> section from the nav.
          </li>
          <li>
            Click <strong>+ New Template</strong>.
          </li>
          <li>
            Choose the template type: <strong>Call Script</strong> or{" "}
            <strong>SMS</strong>.
          </li>
          <li>
            Enter a <strong>Template Name</strong> (for your reference only).
          </li>
          <li>
            Write the message body. Use placeholder variables if available.
          </li>
          <li>
            Click <strong>Save Template</strong>.
          </li>
        </ol>
        <p>To edit or delete a template:</p>
        <ol>
          <li>Find the template in the Templates list.</li>
          <li>
            Click the <strong>Edit</strong> icon to modify it, or{" "}
            <strong>Delete</strong> to remove it permanently.
          </li>
        </ol>
      </>
    ),
  },

  // ── Queues ────────────────────────────────────────────────────────────────
  {
    id: "birthday-queue",
    title: "Birthday Queue",
    description:
      "See leads with birthdays in the next 30 days and get notified at 9am on their birthday.",
    category: "Queues",
    tips: [
      "Add birthday dates when importing leads or editing them individually.",
      "Birthday outreach is one of the highest-converting reconnect opportunities — a quick text goes a long way.",
      "Tap Dismiss on a birthday card after you've reached out to remove it from the queue.",
    ],
    related: ["follow-up-queue", "adding-leads-manually"],
    body: (
      <>
        <p>The Birthday Queue surfaces leads with upcoming birthdays:</p>
        <ol>
          <li>
            Navigate to the <strong>Queue</strong> section.
          </li>
          <li>
            Select the <strong>Birthday</strong> tab.
          </li>
          <li>
            Leads with birthdays in the <strong>next 30 days</strong> appear,
            sorted by soonest birthday first.
          </li>
          <li>
            At <strong>9am local time</strong> on a lead's birthday, you receive
            an in-app notification.
          </li>
          <li>Tap the lead to open their detail page and reach out.</li>
          <li>
            Tap <strong>Dismiss</strong> on the birthday card after you've
            contacted them.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "follow-up-queue",
    title: "Follow-Up Queue",
    description:
      "Track every lead with a scheduled follow-up date, sorted by soonest due.",
    category: "Queues",
    tips: [
      "Always set a follow-up date after every call or text — it keeps your pipeline moving.",
      "Sort by soonest due to stay on top of your hottest leads.",
      "Once you've followed up, remove the date or set a new one.",
    ],
    related: ["birthday-queue", "using-the-power-dialer"],
    body: (
      <>
        <p>
          The Follow-Up Queue shows all leads with upcoming follow-up dates:
        </p>
        <ol>
          <li>
            Navigate to the <strong>Queue</strong> section → select the{" "}
            <strong>Follow-Up</strong> tab.
          </li>
          <li>
            Leads with a follow-up date set appear here, sorted by{" "}
            <strong>soonest date first</strong>.
          </li>
          <li>Tap a lead to open their detail page and take action.</li>
          <li>
            Follow-up dates are set:
            <ul>
              <li>
                Manually from the lead detail page (edit the Follow-Up Date
                field).
              </li>
              <li>
                After each call or text in the <strong>Power Dialer</strong> —
                there's a prompt to set a follow-up date before advancing to the
                next lead.
              </li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "new-lead-queue",
    title: "New Lead Queue",
    description:
      "New leads added to the app appear here — send a welcome text or queue them for follow-up.",
    category: "Queues",
    tips: [
      "Respond to new leads within 5 minutes for the highest conversion rates.",
      "Set up a welcome SMS template in advance so you can send it in one tap.",
      "New leads can be moved to any pipeline stage from here.",
    ],
    related: ["follow-up-queue", "creating-and-managing-templates"],
    body: (
      <>
        <p>New leads added to your account appear in the New Lead Queue:</p>
        <ol>
          <li>
            Navigate to the <strong>Queue</strong> section → select the{" "}
            <strong>New Leads</strong> tab.
          </li>
          <li>Each new lead card shows their name, phone, and email.</li>
          <li>
            Tap <strong>Send Welcome Text</strong> to open a compose window
            pre-filled with your welcome template.
          </li>
          <li>
            Edit the message if needed, then tap <strong>Send</strong> or{" "}
            <strong>Queue for Later</strong>.
          </li>
          <li>Tap the lead's name to open their full lead detail page.</li>
        </ol>
      </>
    ),
  },

  // ── Account & Billing ─────────────────────────────────────────────────────
  {
    id: "managing-your-subscription",
    title: "Managing Your Subscription",
    description:
      "Understand your $30/month Pro plan and what happens if a subscription lapses.",
    category: "Account & Billing",
    tips: [
      "Your $30/month plan renews automatically each month.",
      "If your subscription lapses, your data is preserved. Features become inaccessible until renewed.",
      "Contact support@tele-blast.com for any billing questions.",
    ],
    related: ["choosing-a-subscription-plan"],
    body: (
      <>
        <p>
          Tele-Blast offers the <strong>Pro — $30/month</strong> plan. To
          subscribe or manage your plan:
        </p>
        <ol>
          <li>
            Visit the{" "}
            <Link to="/pricing" style={{ color: "oklch(0.56 0.16 44)" }}>
              Pricing page
            </Link>{" "}
            to subscribe.
          </li>
          <li>
            Click <strong>Subscribe</strong> — you'll be taken to the secure
            Stripe checkout.
          </li>
          <li>After payment, your plan is active immediately.</li>
        </ol>
        <p>
          <strong>If your subscription lapses:</strong> Your leads, templates,
          and data are all preserved. Renew at any time to restore full access.
        </p>
        <p>
          For billing issues, contact{" "}
          <a
            href="mailto:support@tele-blast.com"
            style={{ color: "oklch(0.56 0.16 44)" }}
          >
            support@tele-blast.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "using-android-phone-link-for-desktop-calling",
    title: "Using Android Phone Link for Desktop Calling",
    description:
      "Connect your Android phone to Windows to make and receive calls and texts from your computer.",
    category: "Account & Billing",
    tips: [
      "Phone Link requires Bluetooth to be enabled on both your phone and PC.",
      "The Phone Link app is pre-installed on most Windows 11 devices.",
      "Keep your phone nearby and charged for the best connection.",
    ],
    related: ["using-click-to-call", "sending-a-text-message"],
    body: (
      <>
        <p>
          Phone Link (formerly Your Phone) connects your Android to Windows for
          calls and texts:
        </p>
        <ol>
          <li>
            On your <strong>Windows PC</strong>: Open the{" "}
            <strong>Phone Link</strong> app (search for it in Start). Click
            "Android" and follow the setup steps.
          </li>
          <li>
            On your <strong>Android</strong>: Install the{" "}
            <strong>Link to Windows</strong> app from the Google Play Store (it
            may already be installed on Samsung devices).
          </li>
          <li>
            Follow the on-screen prompts to pair your phone with your PC via QR
            code or Microsoft account.
          </li>
          <li>
            Enable <strong>Bluetooth</strong> on both devices and grant the
            required permissions (calls, messages).
          </li>
          <li>
            Once connected, click a phone icon in Tele-Blast on your PC — Phone
            Link initiates the call through your Android.
          </li>
          <li>
            For texts, the SMS icon in Tele-Blast opens Phone Link with the
            lead's number and template text pre-filled — press Send in Phone
            Link to complete the text.
          </li>
        </ol>
      </>
    ),
  },
];

// ── Categories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Getting Started",
  "Leads & Pipeline",
  "Outreach & Communication",
  "Queues",
  "Account & Billing",
];

// ── Sub-components ────────────────────────────────────────────────────────────

const NAVY = "oklch(0.22 0.12 264)";
const ORANGE = "oklch(0.56 0.16 44)";
const ORANGE_DIM = "oklch(0.82 0.14 44)";

function ArticleCard({
  article,
  isOpen,
  onToggle,
}: {
  article: Article;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-shadow duration-200"
      style={{
        background: "oklch(0.99 0 0)",
        borderColor: isOpen ? ORANGE : "oklch(0.9 0 0)",
        boxShadow: isOpen
          ? `0 0 0 2px ${ORANGE}33`
          : "0 1px 4px oklch(0 0 0 / 0.07)",
      }}
      data-ocid={`support.article.${article.id}`}
    >
      {/* Header row */}
      <button
        type="button"
        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-gray-50 min-h-[64px]"
        style={isOpen ? { background: `${NAVY}08` } : undefined}
        onClick={onToggle}
        aria-expanded={isOpen}
        data-ocid={`support.article.${article.id}.toggle`}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${NAVY}12` }}
        >
          <HelpCircle className="w-4 h-4" style={{ color: NAVY }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${NAVY}12`, color: NAVY }}
            >
              {article.category}
            </span>
          </div>
          <p
            className="text-base font-semibold leading-snug"
            style={{ color: NAVY }}
          >
            {article.title}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "oklch(0.48 0 0)" }}>
            {article.description}
          </p>
        </div>
        <ChevronDown
          className="w-5 h-5 shrink-0 mt-2 transition-transform duration-200"
          style={{
            color: ORANGE,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div
          ref={contentRef}
          className="px-5 pb-6 pt-1"
          style={{ borderTop: "1px solid oklch(0.9 0 0)" }}
        >
          {/* Article body */}
          <div className="article-body mt-4">{article.body}</div>

          {/* Pro tips */}
          {article.tips && article.tips.length > 0 && (
            <div
              className="mt-5 rounded-lg p-4"
              style={{
                background: `${ORANGE}10`,
                border: `1px solid ${ORANGE}30`,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: ORANGE }}
              >
                💡 Pro Tips
              </p>
              <ul className="space-y-2">
                {article.tips.map((tip, i) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "oklch(0.32 0 0)" }}
                  >
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{ background: ORANGE, color: "white" }}
                    >
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related articles */}
          {article.related && article.related.length > 0 && (
            <div className="mt-4">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Related Articles
              </p>
              <div className="flex flex-wrap gap-2">
                {article.related.map((relId) => {
                  const rel = ARTICLES.find((a) => a.id === relId);
                  if (!rel) return null;
                  return (
                    <span
                      key={relId}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: `${NAVY}10`,
                        color: NAVY,
                      }}
                    >
                      {rel.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Contact Support modal state ──────────────────────────────────────────
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactIssue, setContactIssue] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const { actor } = useBackend();

  const closeContactModal = useCallback(() => {
    setContactOpen(false);
    setContactName("");
    setContactEmail("");
    setContactIssue("");
    setContactLoading(false);
    setContactSuccess(false);
    setContactError("");
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [contactOpen, closeContactModal]);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) {
      setContactError("Connection not ready. Please try again in a moment.");
      return;
    }
    setContactLoading(true);
    setContactError("");
    try {
      const result = await actor.sendSupportContactEmail(
        contactName.trim(),
        contactEmail.trim(),
        contactIssue.trim(),
      );
      if ("ok" in result) {
        setContactSuccess(true);
        setTimeout(() => closeContactModal(), 3000);
      } else {
        setContactError(
          "Something went wrong. Please try again or email us directly at ppc.livecontactleads@gmail.com",
        );
      }
    } catch {
      setContactError(
        "Something went wrong. Please try again or email us directly at ppc.livecontactleads@gmail.com",
      );
    } finally {
      setContactLoading(false);
    }
  }

  useSEO({
    title: "Support Center | Tele-Blast — Help and How-To Guides",
    description:
      "Find answers to all your Tele-Blast questions. Step-by-step guides for Power Dialer, CSV import, Queues, Templates, Phone Link, and the Affiliate Program.",
    canonical: "https://www.tele-blast.com/support",
    ogTitle: "Tele-Blast Support Center",
    ogDescription:
      "Step-by-step guides for every Tele-Blast feature. Power Dialer, CSV import, Queues, Templates, Phone Link, and the Affiliate Program.",
    ogUrl: "https://www.tele-blast.com/support",
    ogType: "website",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Tele-Blast?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tele-Blast is a mobile-first sales pipeline and lead management platform for small businesses and sales agents. It includes SMS broadcast automation, automated follow-ups, appointment reminders, a power dialer, and a centralized communication dashboard — all for $30/month.",
          },
        },
        {
          "@type": "Question",
          name: "How do I import leads into Tele-Blast?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Go to the Leads section and tap Import CSV. Select your .csv file, map your columns to the correct fields (name, phone, email, etc.), assign leads to a pipeline stage, and click Import. You can import up to 500 leads per upload. For larger files, a batch picker lets you choose which 500 to import.",
          },
        },
        {
          "@type": "Question",
          name: "How does the Power Dialer work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Power Dialer lets you work through a list of leads in a focused session. Select leads, choose Call or Text mode, pick a template, and start the session. After each action, log a disposition and set a follow-up date. The app auto-advances to the next lead.",
          },
        },
        {
          "@type": "Question",
          name: "What is Phone Link and how do I use it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Phone Link connects your Android phone to your Windows PC so you can make calls and send texts from your computer. Install the Phone Link app on Windows and the Link to Windows app on your Android, pair them via QR code, and Tele-Blast click-to-call and click-to-text links will route through your phone.",
          },
        },
        {
          "@type": "Question",
          name: "How does the Tele-Blast affiliate program work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every Tele-Blast user automatically gets an affiliate account. Visit your Affiliate Dashboard, enter your PayPal email to activate, and share your unique referral link. You earn 25% commission ($7.50/month) on every subscriber you refer, paid via PayPal 30 days after each sale.",
          },
        },
      ],
    }),
  });

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ARTICLES.filter((a) => {
      const matchesCategory =
        activeCategory === "All" || a.category === activeCategory;
      if (!q) return matchesCategory;
      const bodyText = typeof a.body === "string" ? a.body : "";
      const haystack = [
        a.title,
        a.description,
        a.category,
        bodyText,
        ...(a.tips ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && haystack.includes(q);
    });
  }, [searchQuery, activeCategory]);

  function handleToggle(id: string) {
    setOpenArticleId((prev) => (prev === id ? null : id));
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setOpenArticleId(null);
  }

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.97 0 0)" }}
      data-ocid="support.page"
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <PublicNavBar activePath="/support" ocidPrefix="support" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="pt-14"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)",
        }}
        data-ocid="support.hero.section"
      >
        <div className="max-w-4xl mx-auto px-5 py-14 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ background: `${ORANGE}22`, color: ORANGE_DIM }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Support Center
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Tele-Blast Support Center
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Find answers to all your questions about using Tele-Blast.
          </p>

          {/* Search bar */}
          <div
            className="relative max-w-xl mx-auto"
            data-ocid="support.search_input"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: "oklch(0.55 0 0)" }}
            />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search articles… e.g. 'import leads' or 'Phone Link'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl text-base outline-none transition-all duration-200"
              style={{
                background: "oklch(0.99 0 0)",
                color: "oklch(0.18 0 0)",
                border: `2px solid ${searchQuery ? ORANGE : "transparent"}`,
                boxShadow: "0 4px 24px oklch(0 0 0 / 0.18)",
              }}
              aria-label="Search support articles"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-gray-200"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
                data-ocid="support.search_clear_button"
              >
                <X
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.45 0 0)" }}
                />
              </button>
            )}
          </div>
          <p
            className="mt-3 text-sm"
            style={{ color: "oklch(0.98 0 0 / 0.4)" }}
          >
            {ARTICLES.length} articles across {CATEGORIES.length - 1} categories
          </p>
        </div>
      </section>

      {/* ── Category tabs ─────────────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-30 border-b"
        style={{
          background: "oklch(0.98 0 0)",
          borderColor: "oklch(0.9 0 0)",
          boxShadow: "0 2px 8px oklch(0 0 0 / 0.05)",
        }}
        data-ocid="support.category_tabs"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className="whitespace-nowrap text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 shrink-0 min-h-[36px]"
                  style={
                    isActive
                      ? {
                          background: ORANGE,
                          color: "white",
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.42 0 0)",
                        }
                  }
                  data-ocid={`support.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Article list ─────────────────────────────────────────────────── */}
      <main className="flex-1 py-8" data-ocid="support.articles_section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Results summary */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm" style={{ color: "oklch(0.5 0 0)" }}>
              {searchQuery
                ? `${filteredArticles.length} result${filteredArticles.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : activeCategory === "All"
                  ? `${filteredArticles.length} articles`
                  : `${filteredArticles.length} article${filteredArticles.length !== 1 ? "s" : ""} in ${activeCategory}`}
            </p>
            {(searchQuery || activeCategory !== "All") && (
              <button
                type="button"
                className="text-xs font-medium transition-colors duration-150 hover:underline"
                style={{ color: ORANGE }}
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                data-ocid="support.clear_filters_button"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Articles */}
          {filteredArticles.length > 0 ? (
            <div className="space-y-3" data-ocid="support.articles_list">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isOpen={openArticleId === article.id}
                  onToggle={() => handleToggle(article.id)}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border"
              style={{
                background: "oklch(0.99 0 0)",
                borderColor: "oklch(0.9 0 0)",
              }}
              data-ocid="support.empty_state"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${NAVY}0f` }}
              >
                <Search className="w-8 h-8" style={{ color: NAVY }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: NAVY }}>
                No articles found
              </h3>
              <p
                className="text-sm max-w-sm"
                style={{ color: "oklch(0.5 0 0)" }}
              >
                No articles match your search. Try different keywords or{" "}
                <a
                  href="mailto:support@tele-blast.com"
                  className="font-medium hover:underline"
                  style={{ color: ORANGE }}
                >
                  contact support
                </a>{" "}
                directly.
              </p>
              <button
                type="button"
                className="mt-5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ background: ORANGE }}
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                data-ocid="support.empty_state.clear_button"
              >
                Browse all articles
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Need more help? ────────────────────────────────────────────────── */}
      <section
        className="py-14 px-5"
        style={{
          background: "oklch(0.96 0 0)",
          borderTop: "1px solid oklch(0.9 0 0)",
        }}
        data-ocid="support.contact_section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: `${NAVY}10` }}
          >
            <HelpCircle className="w-7 h-7" style={{ color: NAVY }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>
            Still need help?
          </h2>
          <p className="text-base mb-7" style={{ color: "oklch(0.42 0 0)" }}>
            Our support team is ready to assist. Email us and we'll get back to
            you as quickly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@tele-blast.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
              style={{ background: ORANGE }}
              data-ocid="support.contact.email_button"
            >
              Email Support
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 hover:opacity-80"
              style={{
                background: `${NAVY}10`,
                color: NAVY,
              }}
              data-ocid="support.contact.pricing_button"
            >
              View Plans &amp; Pricing
            </Link>
          </div>

          {/* ── Still Having Trouble CTA ──────────────────────────────── */}
          <div
            className="mt-8 pt-8 border-t"
            style={{ borderColor: "oklch(0.88 0 0)" }}
          >
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ background: ORANGE }}
              data-ocid="support.contact_support.open_modal_button"
            >
              <MessageCircle className="w-5 h-5" />
              Still Having Trouble? Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-8 border-t"
        style={{
          background: "oklch(0.18 0.12 264)",
          borderColor: "oklch(0.28 0.12 264)",
        }}
        data-ocid="support.footer"
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
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Pricing
            </Link>
            <Link
              to="/privacy-policy"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs transition-colors duration-200 hover:text-white"
              style={{ color: "oklch(0.98 0 0 / 0.5)" }}
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </footer>

      {/* ── Contact Support Modal ─────────────────────────────────────────── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0 0 0 / 0.55)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeContactModal();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeContactModal();
          }}
          aria-modal="true"
          tabIndex={-1}
          data-ocid="support.contact_support.dialog"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl shadow-2xl"
            style={{ background: "white" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b rounded-t-2xl"
              style={{
                borderColor: "oklch(0.9 0 0)",
                background: "oklch(0.98 0 0)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${ORANGE}18` }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: ORANGE }}
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold" style={{ color: NAVY }}>
                    Contact Support
                  </h2>
                  <p className="text-xs" style={{ color: "oklch(0.5 0 0)" }}>
                    We'll get back to you as soon as possible
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeContactModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 hover:opacity-70"
                style={{
                  background: "oklch(0.92 0 0)",
                  color: "oklch(0.4 0 0)",
                }}
                aria-label="Close"
                data-ocid="support.contact_support.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleContactSubmit}
              className="px-6 py-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: NAVY }}
                >
                  Your Name <span style={{ color: ORANGE }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150"
                  style={{
                    border: "1.5px solid oklch(0.87 0 0)",
                    background: "oklch(0.99 0 0)",
                    color: "oklch(0.2 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                  }}
                  disabled={contactLoading || contactSuccess}
                  data-ocid="support.contact_support.input"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: NAVY }}
                >
                  Email on Account <span style={{ color: ORANGE }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150"
                  style={{
                    border: "1.5px solid oklch(0.87 0 0)",
                    background: "oklch(0.99 0 0)",
                    color: "oklch(0.2 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                  }}
                  disabled={contactLoading || contactSuccess}
                  data-ocid="support.contact_support.email_input"
                />
              </div>

              {/* Issue */}
              <div>
                <label
                  htmlFor="contact-issue"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: NAVY }}
                >
                  Describe Your Issue <span style={{ color: ORANGE }}>*</span>
                </label>
                <textarea
                  id="contact-issue"
                  required
                  rows={4}
                  value={contactIssue}
                  onChange={(e) => setContactIssue(e.target.value)}
                  placeholder="Tell us what's happening and we'll help you resolve it..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 resize-none"
                  style={{
                    border: "1.5px solid oklch(0.87 0 0)",
                    background: "oklch(0.99 0 0)",
                    color: "oklch(0.2 0 0)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = ORANGE;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                  }}
                  disabled={contactLoading || contactSuccess}
                  data-ocid="support.contact_support.textarea"
                />
              </div>

              {/* Success message */}
              {contactSuccess && (
                <div
                  className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: "oklch(0.95 0.08 145)",
                    color: "oklch(0.3 0.12 145)",
                  }}
                  data-ocid="support.contact_support.success_state"
                >
                  ✓ Your message has been sent! We'll get back to you shortly.
                </div>
              )}

              {/* Error message */}
              {contactError && (
                <div
                  className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "oklch(0.95 0.08 25)",
                    color: "oklch(0.35 0.14 25)",
                  }}
                  data-ocid="support.contact_support.error_state"
                >
                  {contactError}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 gap-3">
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 hover:opacity-80"
                  style={{
                    background: "oklch(0.93 0 0)",
                    color: "oklch(0.35 0 0)",
                  }}
                  disabled={contactLoading}
                  data-ocid="support.contact_support.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 hover:opacity-90 disabled:opacity-60"
                  style={{ background: ORANGE }}
                  disabled={
                    contactLoading ||
                    contactSuccess ||
                    !contactName.trim() ||
                    !contactEmail.trim() ||
                    !contactIssue.trim()
                  }
                  data-ocid="support.contact_support.submit_button"
                >
                  {contactLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Article body styles ───────────────────────────────────────────── */}
      <style>{`
        .article-body p {
          margin-bottom: 0.75rem;
          line-height: 1.75;
          font-size: 0.9375rem;
          color: oklch(0.32 0 0);
        }
        .article-body p:last-child { margin-bottom: 0; }
        .article-body ol {
          margin: 0.5rem 0 0.75rem 0;
          padding-left: 1.5rem;
          counter-reset: article-ol;
          list-style: none;
        }
        .article-body ol li {
          counter-increment: article-ol;
          position: relative;
          padding-left: 0.25rem;
          margin-bottom: 0.65rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: oklch(0.32 0 0);
        }
        .article-body ol li::before {
          content: counter(article-ol);
          position: absolute;
          left: -1.5rem;
          top: 0.1em;
          width: 1.25rem;
          height: 1.25rem;
          background: oklch(0.56 0.16 44);
          color: white;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .article-body ul {
          margin: 0.5rem 0 0.75rem 0;
          padding-left: 1.25rem;
          list-style: disc;
        }
        .article-body ul li {
          margin-bottom: 0.4rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: oklch(0.35 0 0);
        }
        .article-body strong {
          font-weight: 700;
          color: oklch(0.22 0.12 264);
        }
        .article-body em { font-style: italic; }
        .article-body code {
          font-family: monospace;
          font-size: 0.85em;
          background: oklch(0.22 0.12 264 / 0.08);
          color: oklch(0.22 0.12 264);
          padding: 0.1em 0.4em;
          border-radius: 4px;
        }
        .article-body a {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .article-body a:hover { opacity: 0.8; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
