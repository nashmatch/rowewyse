import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkRateLimit } from "@/lib/rate-limit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const CACHE_TTL_SECONDS = 60 * 30; // 30 min of short-term conversation memory

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });

  const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
  const { allowed } = await checkRateLimit(env.RATE_LIMIT_KV, `assistant:${clientIp}`, {
    limit: 20,
    windowSeconds: 60,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as {
    sessionId?: string;
    messages?: ChatMessage[];
  } | null;
  const sessionId = body?.sessionId;
  const messages = body?.messages;

  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Cache recent turns per session so the assistant has short-term memory
  // without a database round-trip. Real Anthropic call (below) would read
  // this back in as prior turns.
  await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(messages.slice(-20)), {
    expirationTtl: CACHE_TTL_SECONDS,
  });

  if (!env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: getStubbedReply(messages) });
  }

  // TODO: call the Anthropic Messages API here once ANTHROPIC_API_KEY is set
  // (via `wrangler secret put ANTHROPIC_API_KEY` in production, or
  // `.dev.vars` locally). Something like:
  //
  //   import Anthropic from "@anthropic-ai/sdk";
  //   const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  //   const response = await anthropic.messages.create({
  //     model: "claude-sonnet-4-6", // or later
  //     max_tokens: 500,
  //     system: `You are "Ask ROWE | WYSE", the on-site assistant for ROWE | WYSE
  //       Partners, a Nashville & Memphis, TN real estate team operating under
  //       Onward Real Estate. Answer visitor questions about neighborhoods, the
  //       buying/selling process, and down payment assistance in a warm,
  //       confident, concise tone. When a visitor seems like a qualified lead
  //       (ready to buy, sell, or get a valuation), direct them to /contact.`,
  //     messages: messages.map((m) => ({ role: m.role, content: m.content })),
  //   });
  //   const reply = response.content[0].type === "text" ? response.content[0].text : "";
  //   return NextResponse.json({ reply });

  return NextResponse.json({ reply: getStubbedReply(messages) });
}

function getStubbedReply(messages: ChatMessage[]): string {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() ?? "";

  if (/neighborhood|area|east nashville|memphis|donelson|midtown/.test(lastUserMessage)) {
    return "We work across East Nashville, Donelson, Central Gardens, and East Memphis, among other neighborhoods. Head to our Residential page to explore Strategic Areas, or share what you're looking for and I can point you in the right direction.";
  }
  if (/down payment|dpa|assistance|grant/.test(lastUserMessage)) {
    return "We help buyers navigate Shelby County down payment assistance programs. Visit our Down Payment Assistance page to check a specific address, or fill out our contact form for a free consultation.";
  }
  if (/sell|list|value|worth/.test(lastUserMessage)) {
    return "Selling in Nashville or Memphis starts with an accurate home valuation. I'd recommend booking a Listing Consultation through our Contact page — a member of our team will follow up directly.";
  }
  if (/buy|purchase|home search/.test(lastUserMessage)) {
    return "We'd love to help you find the right home. The fastest next step is our Contact page — tell us your service area and goals and our team will reach out.";
  }

  return "Thanks for reaching out! I can help with questions about Nashville & Memphis neighborhoods, buying, selling, or down payment assistance. For anything more specific, our team is best reached through the Contact page.";
}
