# Design Brief — Tele-Blast

**Tone & Purpose:** Professional, refined fintech interface. Minimalist, no-nonsense lead management and sales platform for loan officers. Serious, trustworthy, efficient. Landing page balances confidence-building visual richness with app consistency.

**Differentiation:** Deep navy primary accent with crisp whites, warm orange highlights, and subtle grays. Card-based layout with soft shadows and generous whitespace. Clean, modern typography emphasizing clarity over decoration. Landing page hero and feature showcase designed to convert while maintaining app consistency.

## Color Palette

| Use | Token | OKLCH | RGB Approx |
|-----|-------|-------|-----------|
| Primary (Navy) | `--primary` | `0.32 0.15 264` | `#0A2342` |
| Primary Accent (Dark Amber) | `--accent` | `0.56 0.16 44` | `#8B6914` |
| Text on Light | `--foreground` | `0.15 0 0` | `#262626` |
| Card Background | `--card` | `0.99 0 0` | `#FCFCFC` |
| Muted Surface | `--muted` | `0.92 0 0` | `#EBEBEB` |
| Destructive (Red) | `--destructive` | `0.58 0.23 27` | `#C23B3B` |

## Typography

| Tier | Font | Usage |
|------|------|-------|
| Display | DM Sans, 700 | Page titles, section headers |
| Body | DM Sans, 400–500 | Body text, labels, form inputs |
| Mono | Geist Mono, 400 | Code, transaction IDs |

**Scale:** 14–16px body, 20–24px small headings, 28–32px page titles.

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header (fixed) | `bg-primary` (deep navy) with white text and logo, fixed top, z-50, shadow-md. Home/Features/Pricing/FAQ links. |
| Hero Section (landing) | Full-width `bg-background`, centered headline, subheadline, CTA "Get Started" button (navy), padding 64px mobile / 96px desktop. |
| Feature Grid | `bg-muted` background, 6 cards in 2-col mobile / 3-col tablet / 3-col desktop. Each card: `bg-card` with rounded-lg, shadow-md, icon + headline + description. Padding 24px vertical/horizontal gaps. |
| Testimonial Section | `bg-background`, horizontal scroll/carousel on mobile, grid on desktop. 3–4 quote cards with `bg-card`, star rating icons (orange accent), name/title. |
| Pricing Section | `bg-muted`, single Pro plan card centered, `bg-card`, prominent feature list, "Subscribe Now" button opens Stripe Payment Link. |
| FAQ Section | `bg-background`, accordion-style Q&A items. Expandable cards with `bg-card`, navy heading text, orange `+` icon toggle. |
| Footer | `bg-card` with `border-t border-border`, 2-col mobile / 4-col desktop, company info + legal links (Privacy, Terms), light text. |
| Mobile Bottom Nav | Fixed bottom bar on sm breakpoint, `bg-primary` with white text, anchor links: Home, Features, Pricing, FAQ (centered). |
| Blog Index | `bg-background`, 2-col mobile / 3-col desktop card grid. Each article card: `bg-card` with shadow-md, orange date badge, title (DM Sans 700, 20px), excerpt (16px), orange author name + read time. Card padding 20px, grid gap 24px. |
| Blog Post Article | `bg-background`, max-width 768px container centered. H1 title (32px bold), orange author byline with thumbnail + date + read time, body text (16px / 1.6 line-height). H2 headings (24px bold), H3 (20px bold), proper semantic `<article>` and `<section>` tags. Related articles (3-col grid) at bottom with `.bg-card` cards. |

## Spacing & Rhythm

- **Horizontal padding:** 24px (mobile), 32px (desktop)
- **Vertical rhythm:** 24px gaps between sections, 16px between components
- **Card padding:** 20px interior, 12px radius
- **Whitespace:** Generous margins around focal content

## Motion & Interaction

- **Hover feedback:** `.card-elevated` lifts shadow-md to shadow-lg, 0.3s smooth transition. Feature cards and testimonials lift on hover.
- **Button hover:** Shadow lift with text opacity shift. CTAs include subtle shadow elevation.
- **Focus state:** ring-2 ring-ring (navy outline) on inputs and interactive elements.
- **Accordion toggle:** FAQ items expand/collapse with `accordion-down`/`accordion-up` animations (0.2s ease-out).
- **No entrance animations:** Static, instant render; interaction-triggered only (hover, click, focus).
- **Mobile bottom nav:** Smooth scroll-to anchor behavior for landing page sections.

## Component Patterns

- **Buttons:** `btn-primary` (navy bg, white text, shadow-md hover), `btn-secondary` (light gray bg, dark text), `btn-ghost` (transparent, hover:bg-muted).
- **Inputs:** `.input-field` (light gray bg, navy focus ring, 8px radius).
- **Cards:** `.card-elevated` (white bg, shadow-md, hover lift to shadow-lg), feature cards with icon + headline + description, testimonial cards with quote + stars + name.
- **Navigation:** Fixed header with logo + links + logout (app) / fixed header + mobile bottom nav (landing). Navy primary for active state.
- **Accordion:** FAQ items expand/collapse with smooth height animation, orange `+` icon rotates.
- **Feature Grid:** 2-col mobile, 3-col desktop, icon badges in orange accent color.
- **Pricing Card:** Single plan card, feature checkmarks, prominent Subscribe CTA opening Stripe Payment Link in new tab.
- **Pipeline board:** Vertical card stacks per stage, drag-drop ready, minimal visual noise (app only).
- **Blog Article Card:** `.card-elevated` with orange date badge (12px, accent color), title (20px bold), excerpt (14px muted), orange author name (14px bold). Hover lifts with shadow-lg transition.
- **Blog Post Byline:** Inline author thumbnail (40px circle), orange accent name, date, read time (14px). Sticky on scroll (optional).
- **Blog Post Body:** H1 (32px bold, navy), H2 (24px bold), H3 (20px bold), body (16px, 1.6 line-height). Blockquotes styled with left border (4px orange). Code blocks (mono font, bg-muted, 12px).
- **Related Articles Section:** 3-col grid (2-col mobile), same article card pattern, no badges.

## Dark Mode

- **Background:** `0.13 0 0` (deep charcoal)
- **Card:** `0.16 0 0` (slightly lighter charcoal)
- **Text:** `0.95 0 0` (crisp white)
- **Primary:** `0.75 0.12 264` (lifted navy for contrast)
- **Shadows:** `rgba(10, 35, 66, 0.15)` scaled for dark bg
- **Same interaction patterns:** Buttons, inputs, cards, hover states unchanged

## Signature Detail

**Subtle shadow hierarchy on cards + navy primary as trust signal.** Light gray muted surfaces reduce cognitive load on landing page feature showcase. Orange accent used sparingly for highlights, icons, and CTAs. Every pixel serves information, interaction, or visual hierarchy — no gratuitous decoration. Consistency between landing page and app creates seamless brand experience.

## SEO & Schema

Per-page meta injection via TanStack Router (`<title>`, `<meta name="description">`, canonical URLs). Blog index schema: `@type: "Blog"`, collection of `BlogPosting` items with publisher Organization. Individual posts: `BlogPosting` with headline, description, image, datePublished, author Person. Canonical links prevent duplicate indexing. Open Graph: `og:title`, `og:description`, `og:image`, `og:type: article`. Twitter: `twitter:card: summary_large_image`. Zero asterisks anywhere.

