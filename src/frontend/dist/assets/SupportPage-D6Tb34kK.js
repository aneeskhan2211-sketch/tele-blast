import { r as reactExports, j as jsxRuntimeExports } from "./vendor-react-CYgLKadW.js";
import { L as Link } from "./vendor-router-gX3Sk5jz.js";
import { P as PublicNavBar } from "./PublicNavBar-Dh9EDIh3.js";
import { H as useBackend, a5 as useSEO } from "./index-DsrDu9m3.js";
import { k as CircleHelp, ao as Search, X, V as MessageCircle, aB as LoaderCircle, m as ChevronDown } from "./vendor-DT3DREzx.js";
import "./vendor-ic-W9L5KZ_F.js";
const ARTICLES = [
  // ── Getting Started ──────────────────────────────────────────────────────
  {
    id: "creating-your-account",
    title: "Creating Your Account",
    description: "Learn how to sign up for Tele-Blast and get your account ready in minutes.",
    category: "Getting Started",
    tips: [
      "Internet Identity is a secure, password-free authentication system — you never create a username or password.",
      "Your account is tied to a cryptographic key, making it much harder to compromise than a password.",
      "After sign-up you'll be redirected to the subscription section — choose the $15/month Pro plan to unlock the app."
    ],
    related: ["choosing-a-subscription-plan", "setting-up-your-profile"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Tele-Blast uses ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Internet Identity" }),
        " for secure, password-free authentication. Here's how to get started:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Visit ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "www.tele-blast.com" }),
          " and click",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Make an Account" }),
          " in the top navigation."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Create Your Account" }),
          " — you'll be taken directly to Internet Identity to create your secure passkey."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Follow the Internet Identity prompts to create a secure passkey (via Face ID, fingerprint, or device PIN)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Once authenticated, you'll be redirected back to Tele-Blast and prompted to choose the $15/month Pro plan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "After subscribing, fill in your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Profile" }),
          " (name, company, phone, email) to complete onboarding."
        ] })
      ] })
    ] })
  },
  {
    id: "choosing-a-subscription-plan",
    title: "Choosing a Subscription Plan",
    description: "Tele-Blast offers the $15/month Pro plan — everything a solo sales agent needs to manage leads and outreach.",
    category: "Getting Started",
    tips: [
      "The $15 Pro plan covers everything most solo sales agents need.",
      "Your subscription renews monthly — cancel anytime from your account settings.",
      "All your data is preserved if you ever pause or cancel your subscription."
    ],
    related: ["managing-your-subscription", "navigating-the-app"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Tele-Blast currently offers the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pro — $15/month" }),
        " plan. Visit",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", style: { color: "oklch(0.56 0.16 44)" }, children: "tele-blast.com/pricing" }),
        " ",
        "to subscribe."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pro — $15/month:" }),
        " All core features — lead management, pipeline board view, power dialer (calls & texts), manual SMS/call templates with local text spinning, CSV import (up to 500 leads per upload), Birthday Queue, Follow-Up Queue, New Lead Queue, and Google Voice or cell phone for calling and texting."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Click ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Subscribe" }),
        " on the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", style: { color: "oklch(0.56 0.16 44)" }, children: "Pricing page" }),
        " ",
        "to get started with the $15/month plan."
      ] })
    ] })
  },
  {
    id: "setting-up-your-profile",
    title: "Setting Up Your Profile",
    description: "Fill in your profile to personalize your outreach and enable app features.",
    category: "Getting Started",
    tips: [
      "Your profile name and company are used to personalize your templates and outreach.",
      "Adding your phone number here ensures calls and texts route correctly."
    ],
    related: ["navigating-the-app", "creating-and-managing-templates"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your profile stores key info used throughout the app. To set it up:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "user icon" }),
          " in the top-right corner of the app header."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Profile" }),
          " from the dropdown."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Fill in the following fields:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Name" }),
              " — your full name"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Company Name" }),
              " — the name of your business"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Phone Number" }),
              " — your contact number"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email" }),
              " — your business email"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Website" }),
              " (optional) — your business website URL"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Who Referred You" }),
              " (optional) — your referral source"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save Profile" }),
          "."
        ] })
      ] })
    ] })
  },
  {
    id: "navigating-the-app",
    title: "Navigating the App",
    description: "A quick tour of the mobile bottom bar, More menu, desktop nav, and profile dropdown.",
    category: "Getting Started",
    tips: [
      "On mobile, the bottom nav bar has direct access to Dashboard, Leads, Pipeline, Queues, and Dialer.",
      "The profile dropdown (user icon, top-right) contains Profile, Support, and Sign Out.",
      "Tele-Blast is designed for mobile first — install it as a PWA from your browser for a native-app feel."
    ],
    related: ["creating-your-account", "choosing-a-subscription-plan"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tele-Blast has two navigation patterns depending on your device:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Mobile (bottom nav bar):" }),
          " Primary tabs — Dashboard, Leads, Pipeline, Queues, Dialer, and SMS Drip — appear in the bottom navigation bar for one-tap access."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Desktop (top/sidebar nav):" }),
          " All main sections are visible in the navigation bar — Dashboard, Leads, Pipeline, Power Dialer, Templates, Queue, and more."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Profile dropdown:" }),
          " Tap the user icon in the top-right corner on any screen. Options include Profile, Support, and Sign Out."
        ] })
      ] })
    ] })
  },
  // ── Leads & Pipeline ─────────────────────────────────────────────────────
  {
    id: "adding-leads-manually",
    title: "Adding Leads Manually",
    description: "Add individual leads with all 20+ available fields including custom fields.",
    category: "Leads & Pipeline",
    tips: [
      "Either Business Name or Contact Name is required to save a lead.",
      "Use the 5 custom fields (Custom1–Custom5) for any info unique to your workflow, like 'Budget' or 'Decision Maker'.",
      "Adding a birthday enables the Birthday Queue feature for that lead."
    ],
    related: [
      "importing-leads-via-csv",
      "editing-and-deleting-leads",
      "birthday-queue"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To add a lead manually:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Leads" }),
          " section from the nav."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap or click the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "+ Add Lead" }),
          " button."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Fill in any of the available fields:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "First Name, Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Business Name, Contact Name, Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Website, Address, City, State, Zip Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Phone, Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Notes, Industry, Birthday, Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Custom1 through Custom5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Assign to a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pipeline Stage" }),
          " (Prospect, Contacted, Qualified, or Closed/Lost)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save Lead" }),
          "."
        ] })
      ] })
    ] })
  },
  {
    id: "importing-leads-via-csv",
    title: "Importing Leads via CSV",
    description: "Bulk upload up to 500 leads from a spreadsheet with column mapping and pipeline assignment. For larger files, pick which batch of 500 to upload.",
    category: "Leads & Pipeline",
    tips: [
      "Your CSV doesn't need to have headers that match exactly — the column mapping step lets you match any column name.",
      "Either Business Name or Contact Name must be present in your file (or mapped) for each row to import successfully.",
      "You can skip any column you don't want to import by selecting 'Skip' in the mapping step.",
      "For files larger than 500 rows, select '1st 500', '2nd 500', etc. — the app marks which batches you've already uploaded."
    ],
    related: [
      "adding-leads-manually",
      "managing-pipeline-stages",
      "switching-lead-views"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To import leads from a CSV file:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Leads" }),
          " section."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Import CSV" }),
          " button."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: ".csv" }),
          " file from your device."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Large files (500+ rows):" }),
          ` A batch picker appears showing "1st 500", "2nd 500", etc. Batches you've already uploaded show a green checkmark. Select the batch you want to import.`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Column Mapping:" }),
          ` The app shows your file's column headers. Use the dropdown next to each column to match it to the correct app field (e.g. "First Name", "Phone", "Email"). Select`,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Skip" }),
          " for columns you don't want to import."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pipeline Assignment:" }),
          " Choose a pipeline stage to assign all imported leads to (defaults to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Prospect" }),
          "). You can create a new pipeline here if needed."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Review the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "data preview table" }),
          ". Rows with errors are highlighted — common issues include missing required fields."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Import" }),
          " to complete. Leads appear in your Leads section immediately."
        ] })
      ] })
    ] })
  },
  {
    id: "switching-lead-views",
    title: "Switching Lead Views",
    description: "Toggle between tile, card, and list views to match your workflow.",
    category: "Leads & Pipeline",
    tips: [
      "List view shows all columns and quick-action icons (phone, SMS) on each row — great for rapid outreach.",
      "Card view shows more context per lead — useful when you need to scan notes or industry at a glance.",
      "Your selected view is remembered the next time you open the Leads section."
    ],
    related: ["adding-leads-manually", "filtering-and-searching-leads"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Leads section supports three layouts. To switch between them:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Leads" }),
          " section."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Look for the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "view toggle" }),
          " buttons near the top-right of the leads list (three small icons: grid tiles, cards, list rows)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click the icon for the view you want:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tile view" }),
              " — compact tiles for a quick overview."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Card view" }),
              " (default) — info-rich cards showing key details per lead."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "List/column view" }),
              " — all fields visible in rows with phone and SMS icons on every row for one-tap outreach."
            ] })
          ] })
        ] })
      ] })
    ] })
  },
  {
    id: "managing-pipeline-stages",
    title: "Managing Pipeline Stages",
    description: "Move leads through Prospect → Contacted → Qualified → Closed/Lost on a visual board.",
    category: "Leads & Pipeline",
    tips: [
      "On mobile, swipe a pipeline card left or right to move it to the next or previous stage.",
      "You can filter the Leads section by a specific pipeline to focus your outreach.",
      "Leads assigned during CSV import can be bulk-reassigned to any pipeline at any time."
    ],
    related: ["adding-leads-manually", "importing-leads-via-csv"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tele-Blast uses four pipeline stages:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Prospect" }),
          " — new, uncontacted leads."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Contacted" }),
          " — leads you've reached out to."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Qualified" }),
          " — leads who've shown interest."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Closed/Lost" }),
          " — deals won or lost."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To move a lead between stages:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pipeline" }),
          " section to see the visual board."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Drag and drop a lead card to a new column, or open the lead and change the Stage field." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "On mobile, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "swipe left or right" }),
          " on a pipeline card to advance or revert the stage."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To filter by pipeline in the Leads section:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Use the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "pipeline filter" }),
          " dropdown or tab at the top of the Leads list."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Select a stage to show only leads in that stage." })
      ] })
    ] })
  },
  {
    id: "editing-and-deleting-leads",
    title: "Editing and Deleting Leads",
    description: "Update lead information or permanently remove leads.",
    category: "Leads & Pipeline",
    tips: [
      "Edits are saved immediately — there's no undo, so double-check before saving.",
      "Deleting a lead also removes its communication history and notes.",
      "For bulk delete, use 'Select All' in the Leads section, then the Delete action."
    ],
    related: ["adding-leads-manually", "communication-history"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To edit a lead:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tap or click a lead card, tile, or row to open the lead detail page." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Edit" }),
          " button."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Update any fields you need." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To delete a lead:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open the lead detail page." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Delete Lead" }),
          " button (usually at the bottom of the page or in an actions menu)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Confirm the deletion in the prompt that appears." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To bulk delete:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "In the Leads section, tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Select All" }),
          " or check individual leads."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Choose ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Delete" }),
          " from the bulk actions bar."
        ] })
      ] })
    ] })
  },
  {
    id: "filtering-and-searching-leads",
    title: "Filtering and Searching Leads",
    description: "Use the search bar and pipeline stage filters to find any lead quickly.",
    category: "Leads & Pipeline",
    tips: [
      "Combine pipeline stage filter + search for the most focused list.",
      "Search matches against name, business, phone, email, city, state, and industry."
    ],
    related: ["managing-pipeline-stages", "switching-lead-views"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tele-Blast offers several ways to find leads:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Standard Search:" }),
          " Type in the search bar at the top of the Leads section. Matches against name, business, phone, email, city, state, and industry."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pipeline Stage Filter:" }),
          " Use the stage tabs or dropdown to show only leads in a specific stage (Prospect, Contacted, Qualified, Closed/Lost)."
        ] })
      ] })
    ] })
  },
  // ── Outreach & Communication ─────────────────────────────────────────────
  {
    id: "using-click-to-call",
    title: "Using Click-to-Call",
    description: "Tap the phone icon on any lead to open your device dialer or Phone Link pre-filled with their number.",
    category: "Outreach & Communication",
    tips: [
      "On desktop (Windows), click-to-call opens Phone Link if you have it set up — your Android phone makes the call.",
      "On mobile, tapping the phone icon opens your native phone dialer with the number pre-filled."
    ],
    related: [
      "using-android-phone-link-for-desktop-calling",
      "using-the-power-dialer"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To place a call to a lead:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "phone icon" }),
          " next to any lead in the Leads list, pipeline board, or lead detail page."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your device dialer (or Phone Link on Windows) opens with the lead's number pre-filled. Tap Call." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "After the call, return to Tele-Blast. A",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "note is automatically created" }),
          " logging the call with a timestamp."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Optionally, enter a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "disposition" }),
          " (outcome) and set a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "follow-up date" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Desktop calling (Windows):" }),
        " See the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Android Phone Link" }),
        " article to route calls through your phone from your Windows PC."
      ] })
    ] })
  },
  {
    id: "sending-a-text-message",
    title: "Sending a Text Message",
    description: "Send SMS from your cell phone using Phone Link, with the message pre-filled from a template.",
    category: "Outreach & Communication",
    tips: [
      "On the $30 plan, texts open through Phone Link (Windows) or your device's native SMS app.",
      "Sending a text auto-creates a note on the lead — no manual logging needed.",
      "Select a template before tapping the SMS icon to have your message ready to go."
    ],
    related: [
      "creating-and-managing-templates",
      "using-android-phone-link-for-desktop-calling"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To send a text to a lead:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "SMS icon" }),
          " next to a lead."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "On ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "mobile" }),
          ", your native SMS app opens with the lead's number and any selected template text pre-filled. Tap Send."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "On ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Windows desktop" }),
          ", Phone Link opens with the lead's number and template text. Complete the send there."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The text is logged immediately as a note on the lead." })
      ] })
    ] })
  },
  {
    id: "using-the-power-dialer",
    title: "Using the Power Dialer",
    description: "Work through a list of leads with sequential call or text sessions with auto-advance.",
    category: "Outreach & Communication",
    tips: [
      "Select a template before starting a session so every message is ready to go.",
      "You can end the session at any time — completed leads keep their communication history.",
      "Use the Power Dialer for focused outreach blocks (e.g., 30 minutes of calls)."
    ],
    related: [
      "sending-a-text-message",
      "creating-and-managing-templates",
      "using-android-phone-link-for-desktop-calling"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Power Dialer lets you work through multiple leads in a session:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Go to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Power Dialer" }),
          " section from the nav."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select the leads you want to include (checkboxes), or use",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Select All" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Choose your session mode: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Call" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Text" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "template" }),
          " to use for the session (required for Text mode)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Start Session" }),
          ". The first lead appears."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Take the action (call or text via Phone Link or your device). Enter a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "disposition" }),
          " and optionally set a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "follow-up date" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Next Lead" }),
          " — the app auto-advances to the next lead in your queue."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Repeat until done. Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "End Session" }),
          " to finish."
        ] })
      ] })
    ] })
  },
  {
    id: "communication-history",
    title: "Communication History",
    description: "View per-lead call and text logs — created automatically after every action.",
    category: "Outreach & Communication",
    tips: [
      "Every call and text action creates a note automatically — you never have to log manually.",
      "Notes include the action type, timestamp, and any disposition you entered.",
      "Communication history helps you prepare for follow-up calls — review it before calling."
    ],
    related: [
      "using-click-to-call",
      "sending-a-text-message",
      "editing-and-deleting-leads"
    ],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To view a lead's communication history:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Open the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "lead detail page" }),
          " by tapping/clicking the lead."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Scroll to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Notes / Communication History" }),
          " ",
          "section."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Each entry shows:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Action type (Call or Text)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Date and time (timestamp)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Disposition (outcome you entered after the call)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Message text (for texts)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Notes are created ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "automatically" }),
        " whenever you tap a call or text icon — no manual entry required."
      ] })
    ] })
  },
  {
    id: "creating-and-managing-templates",
    title: "Creating and Managing Templates",
    description: "Create, edit, and delete SMS and call templates for fast outreach.",
    category: "Outreach & Communication",
    tips: [
      "Create separate templates for initial outreach vs. follow-up for better personalization.",
      "Keep SMS templates concise — under 160 characters sends as a single message.",
      "Name your templates clearly (e.g. 'Follow-Up #1', 'Introduction') so you can find them quickly in the Power Dialer."
    ],
    related: ["using-the-power-dialer", "sending-a-text-message"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To create a new template:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Templates" }),
          " section from the nav."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "+ New Template" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Choose the template type: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Call Script" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "SMS" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Enter a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Template Name" }),
          " (for your reference only)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Write the message body. Use placeholder variables if available." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Save Template" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To edit or delete a template:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Find the template in the Templates list." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Edit" }),
          " icon to modify it, or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Delete" }),
          " to remove it permanently."
        ] })
      ] })
    ] })
  },
  // ── Queues ────────────────────────────────────────────────────────────────
  {
    id: "birthday-queue",
    title: "Birthday Queue",
    description: "See leads with birthdays in the next 30 days and get notified at 9am on their birthday.",
    category: "Queues",
    tips: [
      "Add birthday dates when importing leads or editing them individually.",
      "Birthday outreach is one of the highest-converting reconnect opportunities — a quick text goes a long way.",
      "Tap Dismiss on a birthday card after you've reached out to remove it from the queue."
    ],
    related: ["follow-up-queue", "adding-leads-manually"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Birthday Queue surfaces leads with upcoming birthdays:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Queue" }),
          " section."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Birthday" }),
          " tab."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Leads with birthdays in the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "next 30 days" }),
          " appear, sorted by soonest birthday first."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "At ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "9am local time" }),
          " on a lead's birthday, you receive an in-app notification."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tap the lead to open their detail page and reach out." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dismiss" }),
          " on the birthday card after you've contacted them."
        ] })
      ] })
    ] })
  },
  {
    id: "follow-up-queue",
    title: "Follow-Up Queue",
    description: "Track every lead with a scheduled follow-up date, sorted by soonest due.",
    category: "Queues",
    tips: [
      "Always set a follow-up date after every call or text — it keeps your pipeline moving.",
      "Sort by soonest due to stay on top of your hottest leads.",
      "Once you've followed up, remove the date or set a new one."
    ],
    related: ["birthday-queue", "using-the-power-dialer"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Follow-Up Queue shows all leads with upcoming follow-up dates:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Queue" }),
          " section → select the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Follow-Up" }),
          " tab."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Leads with a follow-up date set appear here, sorted by",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "soonest date first" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tap a lead to open their detail page and take action." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Follow-up dates are set:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Manually from the lead detail page (edit the Follow-Up Date field)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "After each call or text in the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Power Dialer" }),
              " — there's a prompt to set a follow-up date before advancing to the next lead."
            ] })
          ] })
        ] })
      ] })
    ] })
  },
  {
    id: "new-lead-queue",
    title: "New Lead Queue",
    description: "New leads added to the app appear here — send a welcome text or queue them for follow-up.",
    category: "Queues",
    tips: [
      "Respond to new leads within 5 minutes for the highest conversion rates.",
      "Set up a welcome SMS template in advance so you can send it in one tap.",
      "New leads can be moved to any pipeline stage from here."
    ],
    related: ["follow-up-queue", "creating-and-managing-templates"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "New leads added to your account appear in the New Lead Queue:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Navigate to the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Queue" }),
          " section → select the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "New Leads" }),
          " tab."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Each new lead card shows their name, phone, and email." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Send Welcome Text" }),
          " to open a compose window pre-filled with your welcome template."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Edit the message if needed, then tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Send" }),
          " or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Queue for Later" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tap the lead's name to open their full lead detail page." })
      ] })
    ] })
  },
  // ── Account & Billing ─────────────────────────────────────────────────────
  {
    id: "managing-your-subscription",
    title: "Managing Your Subscription",
    description: "Understand your $30/month Pro plan and what happens if a subscription lapses.",
    category: "Account & Billing",
    tips: [
      "Your $30/month plan renews automatically each month.",
      "If your subscription lapses, your data is preserved. Features become inaccessible until renewed.",
      "Contact support@tele-blast.com for any billing questions."
    ],
    related: ["choosing-a-subscription-plan"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Tele-Blast offers the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pro — $30/month" }),
        " plan. To subscribe or manage your plan:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Visit the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", style: { color: "oklch(0.56 0.16 44)" }, children: "Pricing page" }),
          " ",
          "to subscribe."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Click ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Subscribe" }),
          " — you'll be taken to the secure Stripe checkout."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "After payment, your plan is active immediately." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "If your subscription lapses:" }),
        " Your leads, templates, and data are all preserved. Renew at any time to restore full access."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "For billing issues, contact",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:support@tele-blast.com",
            style: { color: "oklch(0.56 0.16 44)" },
            children: "support@tele-blast.com"
          }
        ),
        "."
      ] })
    ] })
  },
  {
    id: "using-android-phone-link-for-desktop-calling",
    title: "Using Android Phone Link for Desktop Calling",
    description: "Connect your Android phone to Windows to make and receive calls and texts from your computer.",
    category: "Account & Billing",
    tips: [
      "Phone Link requires Bluetooth to be enabled on both your phone and PC.",
      "The Phone Link app is pre-installed on most Windows 11 devices.",
      "Keep your phone nearby and charged for the best connection."
    ],
    related: ["using-click-to-call", "sending-a-text-message"],
    body: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Phone Link (formerly Your Phone) connects your Android to Windows for calls and texts:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "On your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Windows PC" }),
          ": Open the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Phone Link" }),
          ' app (search for it in Start). Click "Android" and follow the setup steps.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "On your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Android" }),
          ": Install the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Link to Windows" }),
          " app from the Google Play Store (it may already be installed on Samsung devices)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Follow the on-screen prompts to pair your phone with your PC via QR code or Microsoft account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Enable ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bluetooth" }),
          " on both devices and grant the required permissions (calls, messages)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Once connected, click a phone icon in Tele-Blast on your PC — Phone Link initiates the call through your Android." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "For texts, the SMS icon in Tele-Blast opens Phone Link with the lead's number and template text pre-filled — press Send in Phone Link to complete the text." })
      ] })
    ] })
  }
];
const CATEGORIES = [
  "All",
  "Getting Started",
  "Leads & Pipeline",
  "Outreach & Communication",
  "Queues",
  "Account & Billing"
];
const NAVY = "oklch(0.22 0.12 264)";
const ORANGE = "oklch(0.56 0.16 44)";
const ORANGE_DIM = "oklch(0.82 0.14 44)";
function ArticleCard({
  article,
  isOpen,
  onToggle
}) {
  const contentRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border overflow-hidden transition-shadow duration-200",
      style: {
        background: "oklch(0.99 0 0)",
        borderColor: isOpen ? ORANGE : "oklch(0.9 0 0)",
        boxShadow: isOpen ? `0 0 0 2px ${ORANGE}33` : "0 1px 4px oklch(0 0 0 / 0.07)"
      },
      "data-ocid": `support.article.${article.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-start gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-gray-50 min-h-[64px]",
            style: isOpen ? { background: `${NAVY}08` } : void 0,
            onClick: onToggle,
            "aria-expanded": isOpen,
            "data-ocid": `support.article.${article.id}.toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  style: { background: `${NAVY}12` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4", style: { color: NAVY } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: { background: `${NAVY}12`, color: NAVY },
                    children: article.category
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base font-semibold leading-snug",
                    style: { color: NAVY },
                    children: article.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: "oklch(0.48 0 0)" }, children: article.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: "w-5 h-5 shrink-0 mt-2 transition-transform duration-200",
                  style: {
                    color: ORANGE,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: contentRef,
            className: "px-5 pb-6 pt-1",
            style: { borderTop: "1px solid oklch(0.9 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article-body mt-4", children: article.body }),
              article.tips && article.tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-5 rounded-lg p-4",
                  style: {
                    background: `${ORANGE}10`,
                    border: `1px solid ${ORANGE}30`
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold uppercase tracking-widest mb-3",
                        style: { color: ORANGE },
                        children: "💡 Pro Tips"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: article.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 text-sm",
                        style: { color: "oklch(0.32 0 0)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                              style: { background: ORANGE, color: "white" },
                              children: i + 1
                            }
                          ),
                          tip
                        ]
                      },
                      tip
                    )) })
                  ]
                }
              ),
              article.related && article.related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold uppercase tracking-wider mb-2",
                    style: { color: "oklch(0.55 0 0)" },
                    children: "Related Articles"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: article.related.map((relId) => {
                  const rel = ARTICLES.find((a) => a.id === relId);
                  if (!rel) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs px-3 py-1 rounded-full font-medium",
                      style: {
                        background: `${NAVY}10`,
                        color: NAVY
                      },
                      children: rel.title
                    },
                    relId
                  );
                }) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SupportPage() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [openArticleId, setOpenArticleId] = reactExports.useState(null);
  const searchInputRef = reactExports.useRef(null);
  const [contactOpen, setContactOpen] = reactExports.useState(false);
  const [contactName, setContactName] = reactExports.useState("");
  const [contactEmail, setContactEmail] = reactExports.useState("");
  const [contactIssue, setContactIssue] = reactExports.useState("");
  const [contactLoading, setContactLoading] = reactExports.useState(false);
  const [contactSuccess, setContactSuccess] = reactExports.useState(false);
  const [contactError, setContactError] = reactExports.useState("");
  const { actor } = useBackend();
  const closeContactModal = reactExports.useCallback(() => {
    setContactOpen(false);
    setContactName("");
    setContactEmail("");
    setContactIssue("");
    setContactLoading(false);
    setContactSuccess(false);
    setContactError("");
  }, []);
  reactExports.useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeContactModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [contactOpen, closeContactModal]);
  async function handleContactSubmit(e) {
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
        contactIssue.trim()
      );
      if ("ok" in result) {
        setContactSuccess(true);
        setTimeout(() => closeContactModal(), 3e3);
      } else {
        setContactError(
          "Something went wrong. Please try again or email us directly at ppc.livecontactleads@gmail.com"
        );
      }
    } catch {
      setContactError(
        "Something went wrong. Please try again or email us directly at ppc.livecontactleads@gmail.com"
      );
    } finally {
      setContactLoading(false);
    }
  }
  useSEO({
    title: "Support Center | Tele-Blast — Help and How-To Guides",
    description: "Find answers to all your Tele-Blast questions. Step-by-step guides for Power Dialer, CSV import, Queues, Templates, Phone Link, and the Affiliate Program.",
    canonical: "https://www.tele-blast.com/support",
    ogTitle: "Tele-Blast Support Center",
    ogDescription: "Step-by-step guides for every Tele-Blast feature. Power Dialer, CSV import, Queues, Templates, Phone Link, and the Affiliate Program.",
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
            text: "Tele-Blast is a mobile-first sales pipeline and lead management platform for small businesses and sales agents. It includes SMS broadcast automation, automated follow-ups, appointment reminders, a power dialer, and a centralized communication dashboard — all for $30/month."
          }
        },
        {
          "@type": "Question",
          name: "How do I import leads into Tele-Blast?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Go to the Leads section and tap Import CSV. Select your .csv file, map your columns to the correct fields (name, phone, email, etc.), assign leads to a pipeline stage, and click Import. You can import up to 500 leads per upload. For larger files, a batch picker lets you choose which 500 to import."
          }
        },
        {
          "@type": "Question",
          name: "How does the Power Dialer work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Power Dialer lets you work through a list of leads in a focused session. Select leads, choose Call or Text mode, pick a template, and start the session. After each action, log a disposition and set a follow-up date. The app auto-advances to the next lead."
          }
        },
        {
          "@type": "Question",
          name: "What is Phone Link and how do I use it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Phone Link connects your Android phone to your Windows PC so you can make calls and send texts from your computer. Install the Phone Link app on Windows and the Link to Windows app on your Android, pair them via QR code, and Tele-Blast click-to-call and click-to-text links will route through your phone."
          }
        },
        {
          "@type": "Question",
          name: "How does the Tele-Blast affiliate program work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every Tele-Blast user automatically gets an affiliate account. Visit your Affiliate Dashboard, enter your PayPal email to activate, and share your unique referral link. You earn 25% commission ($7.50/month) on every subscriber you refer, paid via PayPal 30 days after each sale."
          }
        }
      ]
    })
  });
  const filteredArticles = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ARTICLES.filter((a) => {
      const matchesCategory = activeCategory === "All" || a.category === activeCategory;
      if (!q) return matchesCategory;
      const bodyText = typeof a.body === "string" ? a.body : "";
      const haystack = [
        a.title,
        a.description,
        a.category,
        bodyText,
        ...a.tips ?? []
      ].join(" ").toLowerCase();
      return matchesCategory && haystack.includes(q);
    });
  }, [searchQuery, activeCategory]);
  function handleToggle(id) {
    setOpenArticleId((prev) => prev === id ? null : id);
  }
  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    setOpenArticleId(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col overflow-x-hidden",
      style: { minHeight: "100dvh", background: "oklch(0.97 0 0)" },
      "data-ocid": "support.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavBar, { activePath: "/support", ocidPrefix: "support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "pt-14",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.12 264) 0%, oklch(0.18 0.14 264) 60%, oklch(0.14 0.10 280) 100%)"
            },
            "data-ocid": "support.hero.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5 py-14 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5",
                  style: { background: `${ORANGE}22`, color: ORANGE_DIM },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3.5 h-3.5" }),
                    "Support Center"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight", children: "Tele-Blast Support Center" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-white/70 mb-8 max-w-xl mx-auto", children: "Find answers to all your questions about using Tele-Blast." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative max-w-xl mx-auto",
                  "data-ocid": "support.search_input",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Search,
                      {
                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none",
                        style: { color: "oklch(0.55 0 0)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: searchInputRef,
                        type: "search",
                        placeholder: "Search articles… e.g. 'import leads' or 'Phone Link'",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        className: "w-full pl-12 pr-12 py-3.5 rounded-xl text-base outline-none transition-all duration-200",
                        style: {
                          background: "oklch(0.99 0 0)",
                          color: "oklch(0.18 0 0)",
                          border: `2px solid ${searchQuery ? ORANGE : "transparent"}`,
                          boxShadow: "0 4px 24px oklch(0 0 0 / 0.18)"
                        },
                        "aria-label": "Search support articles"
                      }
                    ),
                    searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-gray-200",
                        onClick: () => {
                          setSearchQuery("");
                          searchInputRef.current?.focus();
                        },
                        "aria-label": "Clear search",
                        "data-ocid": "support.search_clear_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          X,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "oklch(0.45 0 0)" }
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-3 text-sm",
                  style: { color: "oklch(0.98 0 0 / 0.4)" },
                  children: [
                    ARTICLES.length,
                    " articles across ",
                    CATEGORIES.length - 1,
                    " categories"
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-14 z-30 border-b",
            style: {
              background: "oklch(0.98 0 0)",
              borderColor: "oklch(0.9 0 0)",
              boxShadow: "0 2px 8px oklch(0 0 0 / 0.05)"
            },
            "data-ocid": "support.category_tabs",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 overflow-x-auto py-3 scrollbar-none", children: CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCategoryChange(cat),
                  className: "whitespace-nowrap text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 shrink-0 min-h-[36px]",
                  style: isActive ? {
                    background: ORANGE,
                    color: "white"
                  } : {
                    background: "transparent",
                    color: "oklch(0.42 0 0)"
                  },
                  "data-ocid": `support.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                  children: cat
                },
                cat
              );
            }) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 py-8", "data-ocid": "support.articles_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.5 0 0)" }, children: searchQuery ? `${filteredArticles.length} result${filteredArticles.length !== 1 ? "s" : ""} for "${searchQuery}"` : activeCategory === "All" ? `${filteredArticles.length} articles` : `${filteredArticles.length} article${filteredArticles.length !== 1 ? "s" : ""} in ${activeCategory}` }),
            (searchQuery || activeCategory !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs font-medium transition-colors duration-150 hover:underline",
                style: { color: ORANGE },
                onClick: () => {
                  setSearchQuery("");
                  setActiveCategory("All");
                },
                "data-ocid": "support.clear_filters_button",
                children: "Clear filters"
              }
            )
          ] }),
          filteredArticles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "support.articles_list", children: filteredArticles.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArticleCard,
            {
              article,
              isOpen: openArticleId === article.id,
              onToggle: () => handleToggle(article.id)
            },
            article.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 text-center rounded-2xl border",
              style: {
                background: "oklch(0.99 0 0)",
                borderColor: "oklch(0.9 0 0)"
              },
              "data-ocid": "support.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
                    style: { background: `${NAVY}0f` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8", style: { color: NAVY } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-2", style: { color: NAVY }, children: "No articles found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm max-w-sm",
                    style: { color: "oklch(0.5 0 0)" },
                    children: [
                      "No articles match your search. Try different keywords or",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "mailto:support@tele-blast.com",
                          className: "font-medium hover:underline",
                          style: { color: ORANGE },
                          children: "contact support"
                        }
                      ),
                      " ",
                      "directly."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "mt-5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90",
                    style: { background: ORANGE },
                    onClick: () => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    },
                    "data-ocid": "support.empty_state.clear_button",
                    children: "Browse all articles"
                  }
                )
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-14 px-5",
            style: {
              background: "oklch(0.96 0 0)",
              borderTop: "1px solid oklch(0.9 0 0)"
            },
            "data-ocid": "support.contact_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5",
                  style: { background: `${NAVY}10` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-7 h-7", style: { color: NAVY } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-3", style: { color: NAVY }, children: "Still need help?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base mb-7", style: { color: "oklch(0.42 0 0)" }, children: "Our support team is ready to assist. Email us and we'll get back to you as quickly as possible." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "mailto:support@tele-blast.com",
                    className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90",
                    style: { background: ORANGE },
                    "data-ocid": "support.contact.email_button",
                    children: "Email Support"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/pricing",
                    className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 hover:opacity-80",
                    style: {
                      background: `${NAVY}10`,
                      color: NAVY
                    },
                    "data-ocid": "support.contact.pricing_button",
                    children: "View Plans & Pricing"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-8 pt-8 border-t",
                  style: { borderColor: "oklch(0.88 0 0)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setContactOpen(true),
                      className: "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95",
                      style: { background: ORANGE },
                      "data-ocid": "support.contact_support.open_modal_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                        "Still Having Trouble? Contact Support"
                      ]
                    }
                  )
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "px-5 py-8 border-t",
            style: {
              background: "oklch(0.18 0.12 264)",
              borderColor: "oklch(0.28 0.12 264)"
            },
            "data-ocid": "support.footer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "oklch(0.98 0 0 / 0.4)" }, children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " Tele-Blast. All rights reserved."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-4 flex-wrap justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    className: "text-xs transition-colors duration-200 hover:text-white",
                    style: { color: "oklch(0.98 0 0 / 0.5)" },
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/pricing",
                    className: "text-xs transition-colors duration-200 hover:text-white",
                    style: { color: "oklch(0.98 0 0 / 0.5)" },
                    children: "Pricing"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/privacy-policy",
                    className: "text-xs transition-colors duration-200 hover:text-white",
                    style: { color: "oklch(0.98 0 0 / 0.5)" },
                    children: "Privacy Policy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/terms",
                    className: "text-xs transition-colors duration-200 hover:text-white",
                    style: { color: "oklch(0.98 0 0 / 0.5)" },
                    children: "Terms & Conditions"
                  }
                )
              ] })
            ] })
          }
        ),
        contactOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: { background: "oklch(0 0 0 / 0.55)" },
            onClick: (e) => {
              if (e.target === e.currentTarget) closeContactModal();
            },
            onKeyDown: (e) => {
              if (e.key === "Escape") closeContactModal();
            },
            "aria-modal": "true",
            tabIndex: -1,
            "data-ocid": "support.contact_support.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative w-full max-w-lg rounded-2xl shadow-2xl",
                style: { background: "white" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between px-6 py-5 border-b rounded-t-2xl",
                      style: {
                        borderColor: "oklch(0.9 0 0)",
                        background: "oklch(0.98 0 0)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-9 h-9 rounded-xl flex items-center justify-center",
                              style: { background: `${ORANGE}18` },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                MessageCircle,
                                {
                                  className: "w-5 h-5",
                                  style: { color: ORANGE }
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold", style: { color: NAVY }, children: "Contact Support" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.5 0 0)" }, children: "We'll get back to you as soon as possible" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: closeContactModal,
                            className: "w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 hover:opacity-70",
                            style: {
                              background: "oklch(0.92 0 0)",
                              color: "oklch(0.4 0 0)"
                            },
                            "aria-label": "Close",
                            "data-ocid": "support.contact_support.close_button",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleContactSubmit,
                      className: "px-6 py-6 space-y-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "contact-name",
                              className: "block text-sm font-semibold mb-1.5",
                              style: { color: NAVY },
                              children: [
                                "Your Name ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-name",
                              type: "text",
                              required: true,
                              value: contactName,
                              onChange: (e) => setContactName(e.target.value),
                              placeholder: "Full name",
                              className: "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150",
                              style: {
                                border: "1.5px solid oklch(0.87 0 0)",
                                background: "oklch(0.99 0 0)",
                                color: "oklch(0.2 0 0)"
                              },
                              onFocus: (e) => {
                                e.currentTarget.style.borderColor = ORANGE;
                              },
                              onBlur: (e) => {
                                e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                              },
                              disabled: contactLoading || contactSuccess,
                              "data-ocid": "support.contact_support.input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "contact-email",
                              className: "block text-sm font-semibold mb-1.5",
                              style: { color: NAVY },
                              children: [
                                "Email on Account ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-email",
                              type: "email",
                              required: true,
                              value: contactEmail,
                              onChange: (e) => setContactEmail(e.target.value),
                              placeholder: "email@example.com",
                              className: "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150",
                              style: {
                                border: "1.5px solid oklch(0.87 0 0)",
                                background: "oklch(0.99 0 0)",
                                color: "oklch(0.2 0 0)"
                              },
                              onFocus: (e) => {
                                e.currentTarget.style.borderColor = ORANGE;
                              },
                              onBlur: (e) => {
                                e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                              },
                              disabled: contactLoading || contactSuccess,
                              "data-ocid": "support.contact_support.email_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "contact-issue",
                              className: "block text-sm font-semibold mb-1.5",
                              style: { color: NAVY },
                              children: [
                                "Describe Your Issue ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ORANGE }, children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "textarea",
                            {
                              id: "contact-issue",
                              required: true,
                              rows: 4,
                              value: contactIssue,
                              onChange: (e) => setContactIssue(e.target.value),
                              placeholder: "Tell us what's happening and we'll help you resolve it...",
                              className: "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 resize-none",
                              style: {
                                border: "1.5px solid oklch(0.87 0 0)",
                                background: "oklch(0.99 0 0)",
                                color: "oklch(0.2 0 0)"
                              },
                              onFocus: (e) => {
                                e.currentTarget.style.borderColor = ORANGE;
                              },
                              onBlur: (e) => {
                                e.currentTarget.style.borderColor = "oklch(0.87 0 0)";
                              },
                              disabled: contactLoading || contactSuccess,
                              "data-ocid": "support.contact_support.textarea"
                            }
                          )
                        ] }),
                        contactSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium",
                            style: {
                              background: "oklch(0.95 0.08 145)",
                              color: "oklch(0.3 0.12 145)"
                            },
                            "data-ocid": "support.contact_support.success_state",
                            children: "✓ Your message has been sent! We'll get back to you shortly."
                          }
                        ),
                        contactError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex items-start gap-2 px-4 py-3 rounded-xl text-sm",
                            style: {
                              background: "oklch(0.95 0.08 25)",
                              color: "oklch(0.35 0.14 25)"
                            },
                            "data-ocid": "support.contact_support.error_state",
                            children: contactError
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: closeContactModal,
                              className: "px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 hover:opacity-80",
                              style: {
                                background: "oklch(0.93 0 0)",
                                color: "oklch(0.35 0 0)"
                              },
                              disabled: contactLoading,
                              "data-ocid": "support.contact_support.cancel_button",
                              children: "Cancel"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "submit",
                              className: "flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 hover:opacity-90 disabled:opacity-60",
                              style: { background: ORANGE },
                              disabled: contactLoading || contactSuccess || !contactName.trim() || !contactEmail.trim() || !contactIssue.trim(),
                              "data-ocid": "support.contact_support.submit_button",
                              children: contactLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                                "Sending..."
                              ] }) : "Send Message"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
      ]
    }
  );
}
export {
  SupportPage as default
};
