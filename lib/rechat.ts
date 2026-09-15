import type { LeadRecord } from "./types";

/**
 * Pushes a lead to ReChat (real estate CRM/marketing MCP). Not wired up yet —
 * credentials aren't issued. Every lead is durably stored in D1 first
 * (see migrations/0001_init.sql), so this can be retried later without data
 * loss; it never blocks the form response.
 *
 * TODO once RECHAT_API_KEY / RECHAT_MCP_URL are available:
 *   - POST the lead to `${env.RECHAT_MCP_URL}/contacts` (or the appropriate
 *     ReChat MCP endpoint) with `Authorization: Bearer ${env.RECHAT_API_KEY}`
 *   - On success, UPDATE leads SET synced_to_rechat = 1 WHERE id = ?
 *   - Consider a Cloudflare Cron Trigger (see wrangler.jsonc) that retries
 *     every row where synced_to_rechat = 0
 */
export async function sendLeadToRechat(
  lead: LeadRecord,
  env: { RECHAT_API_KEY?: string; RECHAT_MCP_URL?: string }
): Promise<{ synced: boolean }> {
  if (!env.RECHAT_API_KEY || !env.RECHAT_MCP_URL) {
    console.log("[rechat] stub: no credentials configured, skipping sync", {
      leadId: lead.id,
      email: lead.email,
    });
    return { synced: false };
  }

  console.log("[rechat] stub: would sync lead to ReChat", lead);
  return { synced: false };
}
