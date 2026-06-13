/**
 * textSpinner.ts — local text spinning utility, no AI/API required.
 *
 * Produces 3 GENUINELY distinct variations of a message:
 *  - Variation 1 (Friendly/Casual): soft greeting, natural flow, low-pressure close
 *  - Variation 2 (Direct/Professional): professional opener, swapped sentences, action CTA
 *  - Variation 3 (Urgent/Value-first): urgency opener, power words injected, CTA front-loaded
 *
 * Also exports mergeTags() to replace {{first_name}} and {{company}}
 * with actual lead data before sending.
 */

// ─── Greeting banks (by tone) ────────────────────────────────────────────────
// Each tone pulls from a non-overlapping set so V1/V2/V3 always open differently.

const GREETINGS_CASUAL = [
  "Hey there 👋",
  "Hi! Hope your week is going well.",
  "Hey, hope you're having a great day!",
  "Hi! Just a quick note from me.",
  "Hey — wanted to reach out real quick.",
];

const GREETINGS_PROFESSIONAL = [
  "Hi, I wanted to connect with you directly.",
  "Good morning — reaching out about something important.",
  "Hello, I'd like a moment of your time.",
  "Hi — I'm following up with a quick message.",
  "Good day — I have something relevant to share with you.",
];

const GREETINGS_URGENT = [
  "Quick heads-up for you —",
  "Don't miss this opportunity —",
  "Time-sensitive message for you:",
  "Important update — read this quickly:",
  "This could save you a lot — take 30 seconds:",
];

// ─── Closer banks (by tone) ──────────────────────────────────────────────────

const CLOSERS_SOFT = [
  "No rush — just wanted to reach out. Reply whenever works for you! 😊",
  "Totally no pressure. I'm here whenever you're ready to chat.",
  "Just putting it on your radar. Feel free to text me back when you get a chance.",
  "Hope this finds you well! Reach out whenever — I'm easy to get hold of.",
  "No obligation at all — just thought you'd want to know.",
];

const CLOSERS_ACTION = [
  "Give me a call or text me back — I'd love to set up a quick 10-minute call.",
  "Text me back with a good time and I'll make it work around your schedule.",
  "Let me know a good time this week and I'll call you then.",
  "Reply with 'YES' and I'll send over the details right away.",
  "Can we connect for a quick call? Just say the word and I'll reach out.",
];

const CLOSERS_URGENT = [
  "Reply TODAY and I'll get you started this week — spots are limited.",
  "Don't wait on this one. Text me back ASAP and let's make it happen.",
  "This week only — text me back NOW and lock in your spot.",
  "Act fast — message me back today and I'll take care of the rest.",
  "Response needed ASAP. Text me back right now and let's talk.",
];

// ─── Synonym slots (3 non-overlapping sets) ──────────────────────────────────
// Slot A → casual/soft substitutions
// Slot B → professional/neutral substitutions
// Slot C → power/urgent substitutions

type SynonymSlot = Array<[RegExp, string]>;

const SYNONYM_SLOT_A: SynonymSlot = [
  [/\bcall\b/gi, "chat"],
  [/\bopportunity\b/gi, "chance"],
  [/\binterested\b/gi, "curious"],
  [/\blet me know\b/gi, "shoot me a text"],
  [/\bthank you\b/gi, "thanks so much"],
  [/\bI wanted to\b/g, "I just wanted to"],
  [/\bcheck out\b/gi, "take a look at"],
  [/\bappointment\b/gi, "quick call"],
  [/\bplease\b/gi, "feel free to"],
  [/\bsoon\b/g, "whenever works for you"],
];

const SYNONYM_SLOT_B: SynonymSlot = [
  [/\bcall\b/gi, "connect"],
  [/\bopportunity\b/gi, "opening"],
  [/\binterested\b/gi, "open to learning more"],
  [/\blet me know\b/gi, "reach back out to me"],
  [/\bthank you\b/gi, "I appreciate your time"],
  [/\bI wanted to\b/g, "I'm reaching out to"],
  [/\bcheck out\b/gi, "review"],
  [/\bappointment\b/gi, "meeting"],
  [/\bplease\b/gi, "kindly"],
  [/\bsoon\b/g, "at your earliest convenience"],
];

const SYNONYM_SLOT_C: SynonymSlot = [
  [/\bcall\b/gi, "reach out"],
  [/\bopportunity\b/gi, "exclusive deal"],
  [/\binterested\b/gi, "ready to grow"],
  [/\blet me know\b/gi, "text me back now"],
  [/\bthank you\b/gi, "appreciate it"],
  [/\bI wanted to\b/g, "You need to hear this —"],
  [/\bcheck out\b/gi, "take advantage of"],
  [/\bappointment\b/gi, "fast call"],
  [/\bplease\b/gi, ""],
  [/\bsoon\b/g, "today"],
];

// ─── Power words for Variation 3 ─────────────────────────────────────────────

const POWER_WORD_PAIRS: Array<[RegExp, string]> = [
  [/\bgood\b/gi, "great"],
  [/\bhelp\b/gi, "grow"],
  [/\bsave\b/gi, "save big"],
  [/\bfree\b/gi, "100% free"],
  [/\bquick\b/gi, "lightning-fast"],
  [/\beasy\b/gi, "simple and fast"],
  [/\bimprove\b/gi, "dramatically improve"],
  [/\bnew\b/gi, "brand-new"],
  [/\bresults\b/gi, "real results"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pickGreeting(tone: "casual" | "professional" | "urgent"): string {
  const bank =
    tone === "casual"
      ? GREETINGS_CASUAL
      : tone === "professional"
        ? GREETINGS_PROFESSIONAL
        : GREETINGS_URGENT;
  // Deterministic spread across options — use hash of the tone string length
  return bank[tone.length % bank.length];
}

function pickCloser(tone: "soft" | "action" | "urgent"): string {
  const bank =
    tone === "soft"
      ? CLOSERS_SOFT
      : tone === "action"
        ? CLOSERS_ACTION
        : CLOSERS_URGENT;
  return bank[tone.length % bank.length];
}

/** Remove a leading greeting line so we can inject our own. */
function stripLeadingGreeting(text: string): string {
  return text
    .replace(/^(Hi|Hey|Hello|Good\s\w+|Hope)[^\n]*[,!.]?\s*/i, "")
    .trim();
}

/**
 * Apply a specific synonym slot — each slot always picks the same replacement
 * so a given slot is fully deterministic and non-overlapping with other slots.
 */
function applySynonymSlot(text: string, slot: SynonymSlot): string {
  let out = text;
  for (const [pattern, replacement] of slot) {
    out = out.replace(pattern, (match) => {
      if (!replacement) return "";
      if (match[0] === match[0].toUpperCase() && /[A-Z]/.test(match[0])) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  return out.replace(/ {2,}/g, " ").trim();
}

/** Swap the first two sentences so structure differs from the original. */
function swapFirstTwo(text: string): string {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (parts.length < 2) return text;
  return [parts[1], parts[0], ...parts.slice(2)].join(" ");
}

/** Inject power words from the dedicated bank. */
function injectPowerWords(text: string): string {
  let out = text;
  for (const [pattern, replacement] of POWER_WORD_PAIRS) {
    out = out.replace(pattern, (match) => {
      if (match[0] === match[0].toUpperCase() && /[A-Z]/.test(match[0])) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  return out;
}

// ─── Main export: spinText ───────────────────────────────────────────────────

/**
 * Returns exactly 3 distinct variations of the input text.
 *
 * Version 0 — light greeting rotation + small synonym swaps (slot 1)
 * Version 1 — deeper synonym swaps (slot 2) + swap first two sentences
 * Version 2 — most different: greeting slot 3 + synonym slot 3 + CTA front-loaded + different closer
 */
export function spinText(body: string): string[] {
  const trimmed = body.trim();

  // ── Variation 1: Friendly / Casual ──────────────────────────────────────────
  // Soft greeting, natural sentence order, low-pressure close
  const v1Greeting = pickGreeting("casual");
  let v1Body = stripLeadingGreeting(trimmed);
  v1Body = applySynonymSlot(v1Body, SYNONYM_SLOT_A);
  const v1Closer = pickCloser("soft");
  const v1 = `${v1Greeting}\n\n${v1Body}\n\n${v1Closer}`;

  // ── Variation 2: Direct / Professional ──────────────────────────────────────
  // Professional opener, swapped sentence structure, specific action request
  const v2Greeting = pickGreeting("professional");
  let v2Body = stripLeadingGreeting(trimmed);
  v2Body = applySynonymSlot(v2Body, SYNONYM_SLOT_B);
  v2Body = swapFirstTwo(v2Body);
  const v2Closer = pickCloser("action");
  const v2 = `${v2Greeting}\n\n${v2Body}\n\n${v2Closer}`;

  // ── Variation 3: Urgent / Value-first ───────────────────────────────────────
  // Urgency opener, power words injected, CTA front-loaded
  const v3Greeting = pickGreeting("urgent");
  let v3Body = stripLeadingGreeting(trimmed);
  v3Body = applySynonymSlot(v3Body, SYNONYM_SLOT_C);
  v3Body = injectPowerWords(v3Body);
  // Front-load the last sentence (the CTA) to feel action-driven
  const v3Parts = v3Body.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (v3Parts.length >= 2) {
    const last = v3Parts[v3Parts.length - 1];
    const rest = v3Parts.slice(0, -1).join(" ");
    v3Body = `${last} ${rest}`;
  }
  const v3Closer = pickCloser("urgent");
  const v3 = `${v3Greeting}\n\n${v3Body}\n\n${v3Closer}`;

  return [v1, v2, v3];
}

// ─── mergeTags ───────────────────────────────────────────────────────────────

interface LeadLike {
  name?: string;
  firstName?: string;
  company?: string;
}

/**
 * Replaces {{first_name}} and {{company}} with actual lead data.
 * If a field is empty/missing the placeholder is removed entirely (not 'undefined').
 */
export function mergeTags(text: string, lead: LeadLike): string {
  // Derive first name: use dedicated firstName field, else first word of name
  const firstName =
    lead.firstName?.trim() || (lead.name?.trim().split(/\s+/)[0] ?? "");

  const company = lead.company?.trim() ?? "";

  return (
    text
      .replace(/\{\{first_name\}\}/g, firstName)
      .replace(/\{\{company\}\}/g, company)
      // Clean up any leftover empty placeholders from other tags
      .replace(/\{\{[a-z_]+\}\}/g, "")
  );
}
