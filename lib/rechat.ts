import type { LeadRecord } from "./types";
import { siteConfig } from "./site-config";

/**
 * Pushes a lead to Rechat via its Lead Capture webhook:
 *   POST https://api.rechat.com/leads/channels/{lead_channel}/webhook
 * The lead_channel UUID (from Rechat > Settings > Lead Routing > Lead
 * Channels) is both the endpoint identifier and the auth key — no OAuth
 * token needed. Docs: https://help.rechat.com/appendix/website-integration/lead-capture-api-docs
 *
 * Every lead is durably stored in D1 first (see migrations/0001_init.sql),
 * so a failed sync here never loses data and can be retried later; it never
 * blocks the form response to the visitor.
 */
const RECHAT_WEBHOOK_BASE = "https://api.rechat.com/leads/channels";

const sourceLabel: Record<LeadRecord["sourceType"], string> = {
  contact: "Contact form",
  newsletter: "Newsletter signup",
  dpa: "DPA eligibility follow-up",
};

export async function sendLeadToRechat(
  lead: LeadRecord,
  env: { RECHAT_LEAD_CHANNEL_ID?: string }
): Promise<{ synced: boolean }> {
  if (!env.RECHAT_LEAD_CHANNEL_ID) {
    console.log("[rechat] no RECHAT_LEAD_CHANNEL_ID configured, skipping sync", {
      leadId: lead.id,
    });
    return { synced: false };
  }

  const notes = [sourceLabel[lead.sourceType], lead.serviceArea, lead.message]
    .filter(Boolean)
    .join(" — ");

  const body = {
    first_name: lead.firstName,
    last_name: lead.lastName,
    email: lead.email,
    phone_number: lead.phone,
    tag: [lead.sourceType, lead.serviceArea].filter(
      (t): t is NonNullable<typeof t> => Boolean(t)
    ),
    lead_source: "rowewyse.com",
    note: notes || undefined,
    referer_url: `${siteConfig.url}${lead.sourcePage}`,
  };

  try {
    const res = await fetch(
      `${RECHAT_WEBHOOK_BASE}/${env.RECHAT_LEAD_CHANNEL_ID}/webhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok && res.status !== 204) {
      console.error("[rechat] webhook returned an error", {
        leadId: lead.id,
        status: res.status,
        body: await res.text().catch(() => ""),
      });
      return { synced: false };
    }

    return { synced: true };
  } catch (err) {
    console.error("[rechat] webhook request failed", { leadId: lead.id, err });
    return { synced: false };
  }
}
