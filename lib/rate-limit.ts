type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

const globalStore = globalThis as typeof globalThis & {
  __rateLimitStore?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalStore.__rateLimitStore ?? new Map<string, RateLimitEntry>();

if (!globalStore.__rateLimitStore) {
  globalStore.__rateLimitStore = rateLimitStore;
}

export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): { success: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return { success: true, retryAfterSeconds: Math.ceil(options.windowMs / 1000) };
  }

  if (current.count >= options.limit) {
    return {
      success: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    success: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function buildRateLimitHeaders(retryAfterSeconds: number) {
  return {
    "Retry-After": String(retryAfterSeconds),
  };
}
