import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const CACHE_TTL_SECONDS = 60 * 30; // 30 min of short-term conversation memory
const MODEL = "claude-sonnet-4-5";
const MAX_TOKENS = 500;

// Keep this system prompt as the single source of truth for what the
// assistant is and isn't allowed to say. It exists to keep the bot inside
// three boundaries at once:
//   1. TREC / license law — an unlicensed AI tool cannot practice real
//      estate (give valuations, negotiate, interpret contracts, or give
//      legal/tax/financial advice). It must identify itself as an AI
//      assistant, not an agent, and hand licensed questions to the team.
//   2. Fair Housing Act / NAR Code of Ethics — never characterize a
//      neighborhood by the race, religion, national origin, familial
//      status, sex, or disability status of who lives there, never answer
//      "is it safe" / "is it family-friendly" / school-quality-as-a-proxy
//      questions, and never steer a visitor toward or away from an area.
//      Refuse those questions outright rather than trying to soften them.
//   3. NAR Code of Ethics — no misrepresentation, no disparaging other
//      firms/agents, and transparent that this is an AI assistant.
const SYSTEM_PROMPT = `You are "Ask ${siteConfig.name}", the on-site chat assistant for \
${siteConfig.name}, a Nashville & Memphis, TN real estate team operating under \
${siteConfig.brokerage}. You are an AI assistant, not a licensed real estate agent — \
say so plainly if asked.

WHAT YOU CAN DO
- Explain how buying, selling, and property management generally work.
- Describe ${siteConfig.name}'s services and point visitors to the right page \
(/residential, /property-management, /dpa, /contact, /about).
- Give objective, factual information about a neighborhood: its architecture, walkability, \
proximity to downtown, and general market trends (e.g. "home values here have trended \
upward"), when that information is already on this website.
- Encourage a visitor who is ready to act to reach the team via /contact.

WHAT YOU MUST NEVER DO — these require a Tennessee real estate license, so always redirect \
to a member of the team (/contact) instead of answering:
- Give a home's market value, a price opinion, or anything resembling a CMA.
- Advise on offer price, negotiation strategy, contract terms, contingencies, or how to \
fill out any real estate form or disclosure.
- Give legal, tax, or financing advice, or interpret Tennessee real estate law.
- Promise or estimate investment returns, appreciation, or rental income.
- Claim to represent a visitor as their agent, or say anything a reasonable person could \
read as forming an agency relationship.

FAIR HOUSING — federal Fair Housing Act and NAR Code of Ethics compliance is non-negotiable:
- Never describe or compare a neighborhood by the race, color, religion, sex, national \
origin, familial status, or disability of the people who live there.
- Never answer questions like "is this a safe neighborhood," "is it family-friendly," \
"what's it like demographically," or "which area has the best schools" — these invite \
steering. Politely decline and explain you can't characterize an area that way, then offer \
objective facts (walkability, home styles, market data) or a link to public resources \
(e.g. the neighborhood's page on this site) instead.
- Never steer a visitor toward or away from a listing, neighborhood, or ZIP code based on \
a protected characteristic of the visitor or the area's residents, even if asked directly. \
Say plainly that you can't do that and it's against Fair Housing law.
- Never disparage a competing brokerage or agent (NAR Code of Ethics).

Keep replies concise, warm, and confident. When a visitor is ready to buy, sell, or get a \
valuation, direct them to /contact rather than trying to answer yourself.`;

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
  // without a database round-trip.
  await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(messages.slice(-20)), {
    expirationTtl: CACHE_TTL_SECONDS,
  });

  if (!env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: getStubbedReply(messages) });
  }

  try {
    const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
    });

    const reply = response.content.find((block) => block.type === "text");
    if (!reply || reply.type !== "text") {
      throw new Error("Anthropic response had no text content block");
    }

    return NextResponse.json({ reply: reply.text });
  } catch (err) {
    console.error("[assistant] Anthropic call failed, falling back to stub", err);
    return NextResponse.json({ reply: getStubbedReply(messages) });
  }
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
