// Augments the generated `cloudflare-env.d.ts` (run `npm run cf-typegen`)
// with secret bindings that aren't declared in wrangler.jsonc: they're set
// via `wrangler secret put` in production and `.dev.vars` locally, so
// wrangler's typegen can't see them. Declaration merging combines this with
// the generated `interface CloudflareEnv`.
interface CloudflareEnv {
  ANTHROPIC_API_KEY?: string;
  RECHAT_LEAD_CHANNEL_ID?: string;
}
