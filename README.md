# ROWE | WYSE Partners — Website

Next.js (App Router) rebuild of rowewyse.com for ROWE | WYSE Partners, a Nashville & Memphis,
TN real estate team operating under Onward Real Estate. Deployed to **Cloudflare Workers**
using the **OpenNext Cloudflare adapter**.

## A note on the deployment target

The original brief for this project assumed **Cloudflare Pages + `@cloudflare/next-on-pages`**.
This build instead uses **Cloudflare Workers + `@opennextjs/cloudflare`** (OpenNext), for two
reasons found while scaffolding:

1. `@cloudflare/next-on-pages` caps out at Next.js 15.5.2, which currently has open security
   advisories, and Cloudflare's own docs (as of Aug 2026) now say: _"Cloudflare recommends
   vinext on Workers for full-stack Next.js applications... For Next.js on Workers, refer to
   the OpenNext adapter guide"_ — Pages + next-on-pages is positioned for static exports only.
2. OpenNext is mature, well-documented, and runs the full Next.js server (Server Actions,
   Route Handlers, ISR) inside a Worker with `nodejs_compat` enabled — so API routes don't need
   the `export const runtime = "edge"` restriction the original Pages Functions model required.
   D1, KV, and R2 bindings work identically either way.

Practically, nothing else about the brief changes: same pages, same brand system, same D1
table, same KV namespaces, same stubbed integration points. "Cloudflare Pages dashboard" in
your head should just become "Cloudflare Workers dashboard" — the project still deploys with
one `wrangler` command and still uses the same bindings.

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare` + Wrangler
- **Styling**: Tailwind CSS v4 (CSS-first theme in `app/globals.css`)
- **Fonts**: Prata (display), Albert Sans (UI/subhead), Open Sans (long-form body) — self-hosted via `next/font/google`
- **Forms**: React Hook Form + Zod
- **Data**: Cloudflare D1 (leads), Cloudflare KV (chat session cache + rate limiting)
- **Icons**: `lucide-react`, plus a few hand-drawn social icons (lucide dropped brand glyphs)

## Project structure

```
app/
  page.tsx                 Home
  about/                    About (Austin Rowe & Eric Wyse bios)
  residential/               Residential
  property-management/       Property Management
  resources/                  Resources (newsletter signup, CMS-ready article list)
  dpa/                         Down Payment Assistance
  contact/                      Contact (lead form)
  neighborhoods/[slug]/          Neighborhood detail stub
  api/lead/route.ts             Shared lead-capture endpoint -> D1 -> ReChat stub
  api/assistant/route.ts        "Ask ROWE | WYSE" chat endpoint (stubbed)
  api/dpa-eligibility/route.ts  DPA eligibility stub
components/
  layout/                   Header, Footer
  ui/                       Hero, SectionEyebrow/Heading, NumberedFeatureCard, StatCallout,
                             TestimonialCard, ThreeUpCTAGrid, NeighborhoodCard, BioCard,
                             PricingPhilosophyCard, Button, SocialIcons, EqualHousingIcon
  forms/                    LeadForm (contact + newsletter variants), AddressEligibilityChecker
  chat/                     ChatWidget
lib/
  site-config.ts            Nav links, contact info, social links (single source of truth)
  types.ts                  Shared LeadPayload / LeadRecord types
  schemas.ts                Zod validation schemas
  rechat.ts                 ReChat sync stub — see "Future integrations" below
  rate-limit.ts             KV-backed rate limiter
  neighborhoods.ts          Neighborhood data (Residential page + sitemap + [slug] pages)
  articles.ts               Empty CMS-ready article list for /resources
  cloudflare-image-loader.ts Custom next/image loader (pass-through)
migrations/0001_init.sql   D1 schema for the `leads` table
public/images/placeholders/ Branded SVG placeholders, named for what real photography replaces
```

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in ANTHROPIC_API_KEY if you want the real assistant
npm run db:migrate:local          # creates the `leads` table in local D1
npm run dev                       # next dev, with getCloudflareContext() polyfilled for local bindings
```

To test against the actual Workers runtime (closer to production) instead of `next dev`:

```bash
npm run preview   # builds with OpenNext, then runs `wrangler dev` against .open-next/worker.js
```

## First-time Cloudflare setup

```bash
# 1. Create the D1 database, then paste the returned database_id into wrangler.jsonc
npx wrangler d1 create rowewyse-leads

# 2. Create the two KV namespaces, then paste their ids into wrangler.jsonc
npx wrangler kv namespace create CHAT_KV
npx wrangler kv namespace create RATE_LIMIT_KV

# 3. Apply the leads table schema to the remote D1 database
npm run db:migrate:remote

# 4. Set production secrets (never committed — see .dev.vars.example for local dev)
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put RECHAT_API_KEY
npx wrangler secret put RECHAT_MCP_URL
```

`wrangler.jsonc` ships with placeholder IDs (`REPLACE_WITH_...`) for the D1 database and both
KV namespaces — replace them with the real IDs from the commands above before deploying.

## Deploy

```bash
npm run deploy   # opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

### Custom domain

In the Cloudflare dashboard: **Workers & Pages → rowewyse-site → Settings → Domains & Routes**,
add `rowewyse.com` and `www.rowewyse.com`. If the domain's DNS is already on Cloudflare, this
is a couple of clicks; if not, point the domain's nameservers at Cloudflare first.

## Where each future integration lives

### Claude API assistant ("Ask ROWE | WYSE")

- UI: `components/chat/ChatWidget.tsx` — floating widget, already calling `/api/assistant`
  with `{ sessionId, messages }`. No frontend changes needed when the real API is wired up.
- Backend: `app/api/assistant/route.ts` — currently returns keyword-matched canned replies via
  `getStubbedReply()`. The exact `Anthropic.messages.create(...)` call to swap in is written out
  in a comment at the top of the real-call branch. Reads `env.ANTHROPIC_API_KEY` via
  `getCloudflareContext()` (a Cloudflare binding, not `process.env`).
- Session memory: recent turns are cached per session in `CHAT_KV` for 30 minutes
  (`app/api/assistant/route.ts`), so the real implementation can read prior turns back in
  without a database round-trip.

### ReChat CRM

- `lib/rechat.ts` — `sendLeadToRechat()` currently just logs the payload and returns
  `{ synced: false }`. Every lead-generating form (Contact, Resources newsletter, DPA follow-up)
  goes through the same `LeadPayload` type (`lib/types.ts`) and the same `/api/lead` route
  (`app/api/lead/route.ts`), so the real ReChat call only needs to be written once, in
  `lib/rechat.ts`. Reads `env.RECHAT_API_KEY` / `env.RECHAT_MCP_URL`.
- D1 is the source of truth: every submission is written to the `leads` table first
  (`migrations/0001_init.sql`), with `synced_to_rechat` defaulting to `0`. Once real credentials
  exist, add a Cloudflare Cron Trigger (commented out in `wrangler.jsonc`) that retries rows
  where `synced_to_rechat = 0`.

### DPA eligibility

- `app/api/dpa-eligibility/route.ts` currently returns 4 static program categories for any
  address. Swap the handler body for a real Shelby County DPA dataset/API call — the response
  shape (`{ address, programs }`) is stable, so `components/forms/AddressEligibilityChecker.tsx`
  needs no changes.

### Real photography

`public/images/placeholders/` is a mix of real and placeholder assets:

- **Real photos** (pulled from the live rowewyse.com and resized/compressed for web): both
  headshots, the homepage/residential/property-management/resources hero images, and the three
  residential gallery photos. These can be swapped for newer photography at any time — same
  filename, same path, no component code changes needed.
- **Still branded SVG placeholders**: the four neighborhood cards (no photo on the original site
  is actually tagged to East Nashville, Central Gardens, Donelson, or East Memphis specifically,
  so a real one was not substituted in to avoid mislabeling a property's location), the DPA hero
  (no Memphis-specific photo exists on the source site), and the OG share image.

For on-the-fly resizing once more/newer photography lands, replace the pass-through in
`lib/cloudflare-image-loader.ts` with a [Cloudflare Images](https://developers.cloudflare.com/images/)
URL builder (`/cdn-cgi/image/...`) — the current images are pre-sized with `sips` since the
pass-through loader does no server-side resizing.

Cloudflare R2 is the intended long-term home for the media library (property photography,
headshots) once the client has a fuller asset library — a commented-out `r2_buckets` binding is
ready in `wrangler.jsonc`.

## SEO

Per-page metadata (title/description/OG/Twitter) is set via each page's `export const metadata`.
`app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from the same
route list and `lib/neighborhoods.ts`.
