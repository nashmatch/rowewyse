import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { leadPayloadSchema } from "@/lib/schemas";
import { sendLeadToRechat } from "@/lib/rechat";
import { checkRateLimit } from "@/lib/rate-limit";
import type { LeadRecord } from "@/lib/types";

/**
 * Single shared entry point for every lead-generating form (Contact,
 * Resources newsletter signup, DPA eligibility follow-up). Writes to D1
 * first so we always have a durable record, then attempts a ReChat sync
 * (currently stubbed — see lib/rechat.ts) without blocking the response.
 */
export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });

  const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
  const { allowed } = await checkRateLimit(env.RATE_LIMIT_KV, `lead:${clientIp}`, {
    limit: 8,
    windowSeconds: 60,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead: LeadRecord = {
    ...parsed.data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    syncedToRechat: false,
  };

  await env.DB.prepare(
    `INSERT INTO leads
      (id, created_at, source_page, source_type, first_name, last_name, email, phone, service_area, message, synced_to_rechat)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`
  )
    .bind(
      lead.id,
      lead.createdAt,
      lead.sourcePage,
      lead.sourceType,
      lead.firstName ?? null,
      lead.lastName ?? null,
      lead.email,
      lead.phone ?? null,
      lead.serviceArea ?? null,
      lead.message ?? null
    )
    .run();

  const { synced } = await sendLeadToRechat(lead, {
    RECHAT_API_KEY: env.RECHAT_API_KEY,
    RECHAT_MCP_URL: env.RECHAT_MCP_URL,
  });

  if (synced) {
    await env.DB.prepare(`UPDATE leads SET synced_to_rechat = 1 WHERE id = ?`).bind(lead.id).run();
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
