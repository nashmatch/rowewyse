/**
 * Minimal fixed-window rate limiter backed by KV, used to protect
 * /api/lead and /api/assistant from spam/abuse. Not meant to be precise —
 * just cheap and good enough at the edge.
 */
export async function checkRateLimit(
  kv: KVNamespace,
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number }
): Promise<{ allowed: boolean; remaining: number }> {
  const windowKey = `${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
  const current = Number((await kv.get(windowKey)) ?? "0");

  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await kv.put(windowKey, String(current + 1), { expirationTtl: windowSeconds * 2 });
  return { allowed: true, remaining: limit - current - 1 };
}
